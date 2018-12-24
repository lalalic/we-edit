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

	getSections(){
		const {evenAndOddHeaders}=this.props
		var headerfooters={}

		function hasSamePageSize(a,b){
			return shallowEqual(a.props.pgSz,b.props.pgSz)
		}

		function hasSamePageLayout(a,b){
			return shallowEqual(a.props.pgMar,a.props.pgMar) &&
				(({data:aData,...a1},{data:bData,...b1})=>shallowEqual(a1,b1)&&shallowEqual(aData,bData))(a.props.cols,b.props.cols)
		}

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

		return React.Children.toArray(this.props.children).reduce((merged,current)=>{
			if(current.type.displayName!=="section"){
				merged.push(current)
			}else{
				if(current.props.type!=="continuous"){
					merged.push(inheritHeaderFooter(current))
				}else{
					const prev=merged[merged.length-1]
					if(!prev){
						merged.push(inheritHeaderFooter(current))
					}else{
						if(prev.type.displayName!="section"){
							merged.push(inheritHeaderFooter(current))
						}else{//continous section would be composed as a part of last section
							console.assert(hasSamePageSize(current,prev))
							if(false && hasSamePageLayout(current,prev)){
								withoutHeaderFooterChildren(current.props.children)
									.forEach(a=>prev.props.children.push(a))
							}else{
								prev.props.children.push(
									React.cloneElement(current,{
										children:withoutHeaderFooterChildren(current.props.children)
									})
								)
							}
						}
					}
				}
			}
			return merged
		},[])
	}

	render(){
		//need to merge for continuous sections
		const {children,evenAndOddHeaders,...others}=this.props

		this.resetNumbering()

		return <Document {...others} children={this.getSections()}/>
	}
}
