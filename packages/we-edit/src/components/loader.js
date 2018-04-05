import React, {Component} from "react"
import PropTypes from "prop-types"
import {Input,DOMAIN, ACTION} from "we-edit"

const supports={}
export default class Loader extends Component{
    static displayName="loader"
    static contextTypes={
        store:PropTypes.object
    }

    static support(loader){
		supports[loader.type]=loader
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
                return <Type onLoad={this.onLoad.bind(this)} {...props}/>
            }
        }
    }

    onLoad(file){
        Input.load(file)
            .then(doc=>{
                if(this.isInWeEditDomain()){
                    this.context.store.dispatch(ACTION.ADD(doc))
                }else{
                    this.setState({file,doc})
                }
                this.props.onOpen()
            })
    }
}
