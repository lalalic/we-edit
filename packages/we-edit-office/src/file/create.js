import React,{PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {Input,ACTION, getAll} from "we-edit"
import {RaisedButton} from "material-ui"

import ComboBox from "../components/combo-box"
import reducer from "../state/reducer"

export default class Create extends PureComponent{
    static contextTypes={
        store: PropTypes.object
    }
	
	static childContextTypes={
		create:PropTypes.func
	}

    getSupportedFormats(){
        return Array.from(Input.supports.values())
			.filter(Type=>Type.prototype.onChange && Type.defaultProps.template)
            .map(({defaultProps})=>{
				let {template, type}=defaultProps
				if(React.isValidElement(template)){
					return React.cloneElement(template,{key:type})
				} else if(typeof(template)=="string"){
					return <URLFetcher key={type} {...defaultProps} url={template} template={undefined}/>
				}
			})
    }

    render(){
		let templates=this.getSupportedFormats()
		if(templates.length==0)
			templates=<center style={{color:"red"}}>no templates</center>
        return (
            <div>
				{templates}
            </div>
        )
    }

    create({url,...props}){
		fetch(url)
			.then(res=>res.blob())
			.then(data=>({data,...props,name:`Document${getAll(this.context.store.getState()).length+1}.${props.ext}`}))
			.then(file=>Input.parse(file))
			.then(doc=>{
				const {onCreate}=this.props
                this.context.store.dispatch(ACTION.ADD(doc,reducer))
                onCreate()
			})
    }
	
	getChildContext(){
		return {
			create:this.create.bind(this)
		}
	}
}

class URLFetcher extends PureComponent{
	static contextTypes={
		create: PropTypes.func
	}

	render(){
		const {type,...props}=this.props
		const {create}=this.context
		return (
			<div style={{display:"inline-block"}}>
				<svg onClick={()=>create({...props,type})} 
					style={{width:50,height:75,background:"white"}}/>
				<center style={{fontSize:"smaller"}}>{type}</center>
			</div>
		)
	}
}
