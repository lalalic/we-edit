import React, {Component} from "react"
import PropTypes from "prop-types"
import {shallowEqual} from "we-edit"

export default ({Document, Container,Frame})=>class extends Component{
	static displayName="document"

	static childContextTypes={
		styles: PropTypes.object,
		evenAndOddHeaders: PropTypes.bool,
		style: PropTypes.object
	}

	get styles(){
		return this.props.children[0].props.styles
	}

	getChildContext(){
		return {
			styles:this.styles,
			evenAndOddHeaders: !!this.props.evenAndOddHeaders,
			style: this.styles['*']
		}
	}

	resetNumbering(){
		let styles=this.styles

		//reset for numbering
		Object.keys(styles)
			.forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
	}

	getContent(){
		const {evenAndOddHeaders}=this.props
		var headerfooters={}

		function getHeaderFooter({props:{children, titlePg}}){
			return children.reduce((named,a)=>{
				if(named.go){
					if(a.props.named){
						if(!evenAndOddHeaders &&
							["even","odd"].find(key=>a.props.named.endsWith(key))){
							//ignore
						}else{
							if(!titlePg && a.props.named.endsWith("first")){
							//ignore
							}else{
								named[a.props.named]=a
							}
						}
					}else{
						delete named.go
					}
				}
				return named
			},{go:true})
		}

		function inheritHeaderFooter(current){
			const mine=getHeaderFooter(current)
			headerfooters={
				...headerfooters,
				...mine,
			}

			const children=current.props.children
			current=React.cloneElement(current,{
				children:Object.values(headerfooters)
					.concat(withoutHeaderFooterChildren(children)) //remove own headers & footers
			})

			//first page of section can't be inherited
			delete headerfooters["header.first"]
			delete headerfooters["footer.first"]

			return current
		}

		function withoutHeaderFooterChildren(children){
			return children.slice(Math.max(0,children.findIndex(a=>!a.props.named)))
		}

		return React.Children.toArray(this.props.children).reduce((content,current)=>{
			if(current.type.displayName!=="section"){
				content.push(current)
			}else{
				content.push(inheritHeaderFooter(current))
			}
			return content
		},[])
	}

	render(){
		//need to merge for continuous sections
		const {children,evenAndOddHeaders,...others}=this.props

		this.resetNumbering()

		return <Document {...others} children={this.getContent()}/>
	}
}
