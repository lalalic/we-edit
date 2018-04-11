import React, {Component} from "react"
import PropTypes from "prop-types"
import {DOMAIN, ACTION} from "./we-edit"
import Input from "../input"

const supports={}

/**
 * Loader is used to load document
 *
 */
export default class Loader extends Component{
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

    static support(loader){
		let type=loader.defaultProps.type
		
		if(!loader.support || loader.support()){
			console.log(`loader[${type}] installed`)
			supports[type]=loader
		}else{
			console.log(`loader[${type}] discarded because of not supported environment`)
		}
	}

	static get supports(){
		return {...supports}
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

	shouldComponentUpdate(){
		return false
	}

	render(){
        const {file,doc}=this.state
        if(!this.isInWeEditDomain() && file && doc){
			const {readonly,release}=this.props
            return <doc.Store {...{readonly,release}}>{this.props.children}</doc.Store>
        }else{
            if(this.constructor==Loader){
                const {type, ...props}=this.props;
        		const Type=supports[type]
				if(!Type){
					console.error(`loader[${type}] not installed`)
					return null
				}
				console.assert(!!Type==true)
                return <Type {...props} onLoad={this.onLoad.bind(this)}/>
            }
        }
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
		
        return Input.load(file)
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