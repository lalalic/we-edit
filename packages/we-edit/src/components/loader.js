import React, {Component,PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {Readable} from "readable-stream"
import {DOMAIN, ACTION, getReducer} from "./we-edit"
import {getWorkers,getSelection,getFile, getUndos} from "../state/selector"
import Input from "../input"
import extendible from "../tools/extendible"


/**
 * Loader is used to load document
 *
 */
class Loader extends PureComponent{
    static displayName="loader"
    static propTypes={
        type: PropTypes.string.isRequired,
        reducer: PropTypes.func,
        onLoad: PropTypes.func,
    }

    static defaultProps={
        onLoad:a=>a
    }

    static contextTypes={
        store:PropTypes.object
    }

    static childContextTypes={
        onLoad: PropTypes.func
    }

    constructor(){
        super(...arguments)
        this.state={file:null}
        this.onLoad=this.onLoad.bind(this)
    }

    getChildContext(){
        return {onLoad:this.onLoad}
    }

    isInWeEditDomain(){
        const {store}=this.context
        if(store){
            const state=store.getState()
            return !!state[DOMAIN]
        }

        return false
    }

	render(){
        const {file,doc}=this.state
        if(!this.isInWeEditDomain() && file && doc){
			const {readonly,release}=this.props
            return <doc.Store {...{readonly,release}} key={doc.id}>{this.props.children}</doc.Store>
        }

		const {type,children, ...props}=this.props
        if(type){
    		const Type=this.constructor.get(type,true)
    		if(Type){
    			return <Type {...this.props} onLoad={this.onLoad.bind(this)}/>
    		}
        }

		return (<Fragment>{children||null}</Fragment>)
    }

    onLoad({error, ...file}){
		const {onLoad, reducer,type}=this.props
		if(error){
			console.error(error)
			if(this.isInWeEditDomain()){
				this.context.store
					.dispatch(ACTION.MESSAGE({type:"error", message:error.message}))
			}else{
				throw error
			}
			onLoad()
			return
		}

        return Input.parse(file)
            .then(doc=>{
                if(this.isInWeEditDomain()){
                    this.context.store.dispatch(ACTION.ADD(doc,reducer))
                }else{
                    this.setState({file,doc})
                }
                let {data,stream, ...props}=file
                onLoad({type,...props})
            })
			.catch(error=>{
				console.error(error)
				this.context.store
					.dispatch(ACTION.MESSAGE({type:"error", message:error.message}))
			})
	}
	
	static Base=class TypeLoaderBase extends Component{
		static install(conf){
			Loader.install(this,conf)
		}

		static uninstall(){
			Loader.uninstall(this)
		}

		static propTypes={
			type: PropTypes.string.isRequired
		}

		static contextTypes={
			inRender: PropTypes.bool
		}

		constructor(){
			super(...arguments)
			this.state={}
			if(this.context.inRender||typeof(document)=="undefined"){
				this.render=()=>{
					return null
				}
				this.componentDidMount=()=>{
					this.doLoad()
				}
			}
		}

		render(){
			return this.state.loaded ? null : "loading..." 
		}

		doLoad(){
			return Promise
				.resolve(this.load())
				.then(file=>{
					this.onLoad(file)
					this.setState({loaded:true})
                    return file
                })
		}

		/**
		 * chance to transform file, and then load into store
		 * @param {*} file 
		 */
		onLoad(file){
			this.props.onLoad(file)
			this.setState({loaded:true})
		}

		/**
		 * it's to load real data
		 */
		load(){
			return new Readable({})
		}
	}

	static Collaborative=class Collaborative extends this.Base{
		static contextTypes={
			...super.contextTypes,
			store: PropTypes.any,
		}

		static propTypes={
			...super.propTypes,
			actions: PropTypes.arrayOf(PropTypes.string),
			ignore: PropTypes.arrayOf(PropTypes.string),
		}

		onLoad({data,id,uid,workers,doc=this.props.doc, onClose, needPatchAll, ...props}){
			let uuid=uid
			super.onLoad({
				data,
				id,
				name:doc,
				ext:doc.split(".").pop(),
				reduce:this.createReducer({workers,onClose, needPatchAll, ...props}),
				makeId(){
					return uuid++
				},
				resetUUID(workerUUID){
					const myUUID=uuid
					uuid=workerUUID
					return myUUID
				},
				getCurrentUUID(){
					return uuid
				}
			})
		}

		patch(state, action){
			return Promise.resolve(getFile(state)?.getPatch(action?.payload))
		}

		onNext(action, worker){
			this.context.store.dispatch({type:'we-edit/REMOTE', payload:{...action,worker}})
		}
	
		createReducer({workers,onClose=a=>a, needPatchAll}){
			return (state, action)=>{
				if(action.isRemote)
					return state
				const {
					actions:Remote_ACTION=["selection","cursor","text","entity"], 
					ignore:Ignore=['selection/STYLE','cursor/CANVAS']
				}=this.props
				switch(action.type){
					case 'we-edit/CLOSE':
						onClose()
						return state
					case 'we-edit/init':{
						if(needPatchAll){
							setImmediate(()=>this.patch(state))
						}
						setImmediate(()=>{
							this.remoteDispatch(action)
							const {start,end}=getSelection(state)
							this.remoteDispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
						})
						return state.set('workers',workers||[])
					}
					case 'we-edit/REMOTE':{
						switch(action.payload.type){
							case 'we-edit/collaborative/patch':
								setImmediate(()=>this.patch(state,action.payload))
								return state
							case 'we-edit/init':
								setImmediate(()=>{
									const {start,end}=getSelection(state)
									this.remoteDispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
								})
								return state
							default:
								return this.reduceRemoteAction(state, action.payload)
						}
					}
					case 'we-edit/collaborative/patch':{
						setImmediate(()=>this.patch(state,action))
						return state
					}
					default:{
						const workers=getWorkers(state)
						const shouldSync=workers.length 
							&& Remote_ACTION.find(a=>action.type.startsWith(`we-edit/${a}/`))
							&& !Ignore.find(a=>action.type.endsWith(a))
						if(!shouldSync)
							return state

						
						const remoteAction={...this.stringifyAction(action,true), uuid:state.get('uuid')}
						state=state.set('uuid',getFile(state).props.getCurrentUUID())
						
						const undos=getUndos(state), {selection,content,...last}=undos[undos.length-1]||{}
						const contentChangedByAction=last.action==action && !content.equals(state.get('content'))
						if(contentChangedByAction){
							remoteAction.selection=selection?.toJS()
							state=this.resolveConflict({action,content, state,selection:remoteAction.selection})
						}
						setImmediate(()=>this.remoteDispatch(remoteAction))
					}
				}
				return state
			}
		}
	
		reduceRemoteAction(state, {worker,uuid, selection, ...action}){
			const {props:{resetUUID}}=getFile(state)
			const myUUID=uuid && resetUUID(uuid)
			try{
				const workers=[...getWorkers(state)]
				const i=workers.findIndex(a=>a._id==worker._id)
				if(i==-1){
					workers.push(worker)
				}else{
					worker=workers[i]
				}
				selection=selection||worker.selection
				let workerState=state.mergeIn(['selection'],selection)
				const reducer=getReducer(state)
				action.isRemote=true
				workerState=reducer(workerState,this.stringifyAction(action, false))
				workers.splice(i,1,{...worker, selection:getSelection(workerState)})
				workerState=workerState.set('workers',[...workers]).set('selection', state.get('selection'))

				const content=state.get('content')
				if(workerState.get('content').equals(content))
					return workerState
				
				return this.resolveConflict({
					action, selection, content, 
					worker,
					state:workerState, 
				})
			}finally{
				uuid && resetUUID(myUUID)
			}
		}

		resolveConflict({action, selection, content, state, worker={_id:"me",selection:getSelection(state)}}){
			
			const doc=getFile(state), fakeState=state.mergeIn(['selection'],selection).set('_content',content)
			const workers=[...getWorkers(state),{_id:"me",selection:getSelection(state)}]
			let changed=false
			workers.forEach(a=>{
				if(a._id==worker._id // current worker
					|| !a.selection?.end?.id)//no selection
					return 
				try{
					const resolved=doc.onChange(
						fakeState,
						{
							type:'we-edit/collaborative/conflict',
							payload:{action,conflict:a.selection,content:state.get('content')}
						})
					if(resolved && resolved!=a.selection){
						if(a._id=='me'){
							state=state.mergeIn(['selection'], resolved)
						}else{
							a.selection=resolved
							changed=true
						}
					}
				}catch(e){
					console.debug(a)
					console.warn(e)
				}
			})
			workers.pop()//remove me
			
			return changed ? state.set('workers', workers) : state
		}

		remoteDispatch(action){
			console.error(`Collaborative Loader doesn't implement remoteDispatch`)
		}
	
		componentDidMount(){
			this.doLoad()
		}

		stringifyAction(action,stringify){
			const f='on'+action.type.split("/").slice(1).map(a=>a[0].toUpperCase()+a.substr(1).toLowerCase()).join("")
			return this[f] && this[f](action, stringify) ||action
		}
	}

}

export default extendible(Loader, "loader")
