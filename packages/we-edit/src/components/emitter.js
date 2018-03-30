import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import Viewer from "./viewer"
import {createWeDocument} from "./editor"

/**
<emiter representation={<Pagination/>}>
	<Stream>
		<PDF/>
		<PCL/>
		<APF/>
	</Stream>
</emiter>
<emiter representation={<Html/>}>
	<Stream>
		<HTML/>
		<StylessHtml/>
		<APF/>
	</Stream>
</emiter>
<emiter representation={<Text/>}>
	<Stream>
		<PlainText/>
	</Stream>
</emiter>
*/
const supports={}
export default class extends Viewer{
	static displayName="emitter"
	
	static propTypes={
		...Viewer.propTypes,
		input: PropTypes.object,
		persist: PropTypes.func,
		representation: PropTypes.node,
	}
	
	static defaultProps={
		...Viewer.defaultProps,
		media:"file"
	}
	
	static support(node,name){
		supports[name]=node
	}
	
	static get supports(){
		return {...supports}
	}
	
	render(){
		if(!this.props.representation){
			return <Fragment>{this.props.children}</Fragment>
		}else{
			return super.render()
		}
	}
	
	createDocument({canvasProps}){
		return <Root {...canvasProps}/>
	}
	
	static Format=({type, ...props})=>{
		if(type){
			const Type=supports[type]
			if(Type){
				return <Type {...props}/>
			}
		}else{
			return <div style={{color:"red"}}>Emitter type not specified</div>
		}
		return <div style={{color:"red"}}>Emitter[type={type}] not installed</div>
	}
}

class Root extends PureComponent{
	static contextTypes={
		store: PropTypes.object,
		ModelTypes: PropTypes.object
	}
	render(){
		const {store, ModelTypes}=this.context
		const content=store.getState().get("content")
		if(content){
			return createWeDocument("root",content,ModelTypes,{scale:1,...this.props})
		}else{
			return null
		}
	}
}