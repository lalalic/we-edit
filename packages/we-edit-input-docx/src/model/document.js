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
		const sections=React.Children.toArray(this.props.children)
		return sections
		return sections.reduce((merged,section)=>{
			if(merged[0] && section.props.type=="continuous" && merged[0].props.type=="continuous"){
				/*
				let {children, id, pgMar:{left=0,right=0}, pgSz:{width=0},cols={num=1, space=0, data}}=merged[0].props
				var cols=data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space})
				children.push(
					<Container type="section" id={id} key={id}>
						<Frame x={left} width={width-left-right} cols={cols} balance={true}>
							{children}
						</Frame>
					</Container>
				)*/
			}else{
				merged.push(section)
			}
			return merged
		},[])
	}

	render(){
		//need to merge for continuous sections
		const {evenAndOddHeaders,...others}=this.props

		this.resetNumbering()

		return <Document {...others} children={this.getSections()}/>
	}
}
