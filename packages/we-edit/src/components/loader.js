import React, {Component,PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {Readable} from "readable-stream"
import {DOMAIN, ACTION, getReducer} from "./we-edit"
import {getWorkers,getSelection,getFile} from "../state/selector"
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

		onLoad({data,id,workers,doc=this.props.doc, onClose}){
			let uuid=id
			super.onLoad({
				data,
				id,
				name:doc,
				ext:doc.split(".").pop(),
				reduce:this.createReducer(workers,onClose),
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

		onNext(action, worker){
			this.context.store.dispatch({type:'we-edit/REMOTE', payload:{...action,worker}})
		}
	
		createReducer=(workers,onClose=a=>a)=>(state, action)=>{
			if(action.isRemote)
				return state
			const {
				actions:Remote_ACTION=["selection","cursor","text","entity"], 
				ignore:Ignore=['selection/STYLE','cursor/CANVAS']
			}=this.props
			switch(action.type){
				case 'we-edit/REMOTE':
					return this.reduceRemoteAction(state, action.payload)
				case 'we-edit/CLOSE':
					onClose()
					return state
				case 'we-edit/init':
					return state.set('workers',workers||[])
				default:{
					const workers=getWorkers(state)
					const shouldSync=workers.length 
						&& Remote_ACTION.find(a=>action.type.startsWith(`we-edit/${a}/`))
						&& !Ignore.find(a=>action.type.endsWith(a))
					if(!shouldSync)
						return state
					this.remoteDispatch({...this.stringifyAction(action,true), uuid:state.get('uuid')})
					state=state.set('uuid',getFile(state).props.getCurrentUUID())
				}
			}
			return state
		}
	
		reduceRemoteAction(state, {worker:{...worker},uuid, ...action}){
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
	
				let workerState=state.mergeIn(['selection'],worker.selection)
				const reducer=getReducer(state)
				action.isRemote=true
				workerState=reducer(workerState,this.stringifyAction(action, false))
				workers.splice(i,1,{...worker, selection:getSelection(workerState)})
				workerState=workerState.set('workers',[...workers])
				if(workerState.get('content').equals(state.get('content')))
					return workerState.set('selection', state.get('selection'))

				return this.resolveConflict({action, worker, state, changedState:workerState})
			}finally{
				uuid && resetUUID(myUUID)
			}
		}

		resolveConflict({worker, action, state, changedState}){
			return changedState
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

		onEntityCreate({payload:{data, ...payload},...action}, stringify){
			if(payload.type!=="image" && data)
				return arguments[0]

			action.payload=payload
			if(stringify){
				payload.data=Array.from(data).map(a=>String.fromCharCode(a)).join("")
			}else{//decoding
				payload.data=Uint8Array.from(Array.from(data).map(a=>a.charCodeAt(0)))
			}

			return action
		}
	}

}

export default extendible(Loader, "loader")
