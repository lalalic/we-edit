import React, {Component} from "react"
import PropTypes from "prop-types"
import Viewer from "./viewer"

/**
<emiter presentation={<Pagination/>}>
	<PDF/>
	<PCL/>
	<APF/>
</emiter>
<emiter presentation={<Html/>}>
	<HTML/>
	<StylessHtml/>
	<APF/>
</emiter>
<emiter presentation={<Text/>}>
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
		const {presentation, children, input, ...props}=this.props
		const docElement=input.render(createElement,presentation.props.ViewerTypes)
		return (
			<Fragment>
				{
					Children.toArray(children)
						.map(output=>React.cloneElement(output, {presentation, ...props}, docElement))
				}
			</Fragment>
		)
	}
}