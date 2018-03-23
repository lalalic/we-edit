import React, {Component} from "react"
import PropTypes from "prop-types"
import Viewer from "./viewer"

/**
<emiter channel={<Pagination/>}>
	<PDF/>
	<PCL/>
	<APF/>
</emiter>
<emiter channel={<Html/>}>
	<HTML/>
	<StylessHtml/>
	<APF/>
</emiter>
<emiter channel={<Text/>}>
	<PlainText/>
</emiter>
*/
const supports=[]
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
	
	static support(node){
		supports.push(node)
	}
	
	static get supports(){
		return supports
	}
	
	render(){
		const {channel, children, input, ...props}=this.props
		const docElement=input.render(createElement,channel.props.ViewerTypes)
		return (
			<Fragment>
				{
					Children.toArray(children)
						.map(output=>React.cloneElement(output, {channel, ...props}, docElement))
				}
			</Fragment>
		)
	}
}