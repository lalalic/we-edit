import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery,ContentQuery} from "we-edit"
import memoize from "memoize-one"


export default ({Table,Container})=>class extends Component{
	static displayName="table"
	static namedStyle="*table"

	static contextTypes={
		style: PropTypes.object,
		styles: PropTypes.object,
		activeDocStore: PropTypes.object,
	}
	
	static childContextTypes={
		style: PropTypes.object,
		setTableIndent: PropTypes.func,
	}
	
	childStyle=memoize((direct,context)=>{
		return direct ? direct.inherit(context) : context
	})
	
	getChildContext(){
		return {
			style: this.childStyle(this.props.style, this.context.style),
			setTableIndent({right=0}={}){
				return this.indent=this.style(this.props.style, this.context.style).indent||0-right
			}
		}	
	}

	componentWillReceiveProps1({children,...direct},{styles}){
		let style=styles[direct.namedStyle||this.constructor.namedStyle]

		let tblStyle="indent".split(",")
			.reduce((o,key,t)=>{
				if(direct[key]==undefined && (t=style.get(`tbl.${key}`))!=undefined)
					o[key]=t
				return o
			},{})

		const edges=(i,j)=>{
			let r=[]
			if(i==0)
				r.push("firstRow")
			if(i==children.length-1)
				r.push("lastRow")

			if(j==0)
				r.push("firstCol")

			if(j==direct.cols.length-1)
				r.push("lastCol")
			return r
		}

		let rows=children.map((row,i)=>{
			let cells=row.props.children.map((cell,j)=>{
				let {cnfStyle:cellCnfStyle=0}=cell.props||{}
				let {cnfStyle:rowCnfStyle=0}=row.props||{}
				let cnfStyle=rowCnfStyle|cellCnfStyle

				let cellStyle=style.merge({...cell.props,cnfStyle},edges(i,j))
				return React.cloneElement(cell,{...cellStyle,cnfStyle:undefined})
			})
			return React.cloneElement(row,null,cells)
		})

		this.style={...tblStyle, ...direct, children:rows}
	}

	getIndent=memoize((indent=0, tblMargin, children)=>{
		const query=new ContentQuery(this.context.activeDocStore.getState(),`#${this.props.id}`)
		if(query.parents("table").length>0){
			return indent
		}
		const firstCell=new ReactQuery(<Fragment>{children}</Fragment>).findFirst("cell")
		const {right=0}=firstCell.attr("margin")||tblMargin||{}
		return indent-right
	})

	render(){
		const {cols,width=cols.reduce((w,a)=>w+a,0),children,  ...props}=this.props
		const childStyle=this.childStyle(this.props.style, this.context.style)
		const {indent:tblInd,...style}=childStyle.flat4Table()
		
		const indent=this.getIndent(tblInd,childStyle.get("tbl.margin"), children)
		return <Table {...{...props,...style,indent,width, cols,children}}/>
	}
}
