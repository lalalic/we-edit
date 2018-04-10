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
		if(!loader.support || loader.support()){
			supports[loader.defaultProps.type]=loader
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
            return <doc.Store>{this.props.children}</doc.Store>
        }else{
            if(this.constructor==Loader){
                const {type, ...props}=this.props;
        		const Type=supports[type]
                return <Type {...props} onLoad={this.onLoad.bind(this)}/>
            }
        }
    }

    onLoad({error, ...file}){
		const {onLoad, reducer,type}=this.props
		if(error){
			this.context.store
				.dispatch(ACTION.MESSAGE({type:"error", message:error.message}))
			onLoad()
			return 
		}
		
        return Input.load(file)
            .then(doc=>{
                
                if(this.isInWeEditDomain()){
                    this.context.store.dispatch(ACTION.ADD(doc,reducer))
                }else{
                    this.setState({file,doc})
                }
                let {data,stream, ...props}=file
                onLoad({type,...props})
            })
    }
}
