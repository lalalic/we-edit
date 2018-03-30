import React, {Component} from "react"
import PropTypes from "prop-types"
import Viewer from "./viewer"

/**
<emiter representation={<Pagination/>}>
	<PDF/>
	<PCL/>
	<APF/>
</emiter>
<emiter representation={<Html/>}>
	<HTML/>
	<StylessHtml/>
	<APF/>
</emiter>
<emiter representation={<Text/>}>
	<PlainText/>
</emiter>
*/
const supports={}
const createElement=(type, props, children)=>React.createElement(type,{...props,key:uuid()},children)
export default class extends Viewer{
	static displayName="emitter"
	
	static propTypes={
		...Viewer.propTypes,
		input: PropTypes.object,
		persist: PropTypes.func
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
		const {representation, children, input, ...props}=this.props
		const docElement=input.render(createElement,representation.props.ViewerTypes)
		return (
			<Fragment>
				{
					Children.toArray(children)
						.map(output=>React.cloneElement(output, {representation, ...props}, docElement))
				}
			</Fragment>
		)
	}
}