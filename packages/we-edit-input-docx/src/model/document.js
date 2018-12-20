import React, {Component} from "react"
import PropTypes from "prop-types"

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
		function hasSamePageSize(a,b){
			return ((a,b)=>a.width==b.width && a.height==b.height)(a.props.pgSz,b.props.pgSz)
		}
		
		function mergeHeaderFooter(current,prev){
			function getHeaderFooter(a){
				return a.props.children.reduce((named,child)=>{
					if(named.go){
						if(child.props.named){
							named[child.props.named]=child
						}else{
							delete named.go
						}
					}
					return named
				},{go:true})
			}
			
			return {
				...getHeaderFooter(prev),
				...getHeaderFooter(current),
			}
		} 
		
		return React.Children.toArray(this.props.children).reduce((merged,current)=>{
			if(current.props.type=="continuous"){
				const prev=merged[merged.length-1]
				if(prev){
					if(prev.props.type=="continuous"){
						if(hasSamePageSize(current,prev)){
							//different margin, columns
						}else{
							merged.push(
								React.cloneElement(current,{
									children:[
										...mergeHeaderFooter(current,prev),
										...current.props.children,
									]
								})
							)
						}
					}else{
						merged.push(current)
					}
				}else{
					merged.push(current)
				}
			}else{
				merged.push(current)
			}
			return merged
		},[])
	}

	render(){
		//need to merge for continuous sections
		const {children,evenAndOddHeaders,...others}=this.props

		this.resetNumbering()

		return <Document {...others} children={children}/>
	}
}
