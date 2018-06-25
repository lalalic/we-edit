import React, {Component,PureComponent} from "react"
import PropTypes from "prop-types"
import {DOMAIN, ACTION} from "./we-edit"
import Input from "../input"
import extendible from "../tools/extendible"

const supports={}

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
	
	static Base=class extends Component{
		static install(config){
			Loader.install(this)
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
			if(this.context.inRender){
				this.doLoad()
			}
		}
		
		render(){
			return null
		}
		
		doLoad(){
			Promise
				.resolve(this.load())
				.then(file=>this.props.onLoad(file))
		}
		
		load(){
			throw new Error("no implementation")
		}
	}

    state={file:null}

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
            return <doc.Store {...{readonly,release}}>{this.props.children}</doc.Store>
        }
		
		const {type, ...props}=this.props
		const Type=this.constructor.get(type,true)
		if(Type){
			return <Type {...this.props} onLoad={this.onLoad.bind(this)}/>
		}
		
		return null
    }

    onLoad({error, ...file}){
		const {onLoad, reducer,type}=this.props
		if(error){
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
                    this.setState({file,doc},()=>this.forceUpdate())
                }
                let {data,stream, ...props}=file
                onLoad({type,...props})
            })
    }
}

export default extendible(Loader, "loader")
