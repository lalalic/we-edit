import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery,ContentQuery} from "we-edit"
import memoize from "memoize-one"


export default ({Table,Container})=>class extends Component{
	static displayName="table"
	static namedStyle="*table"

	static contextTypes={
		styles: PropTypes.object,
		activeDocStore: PropTypes.object,
	}

	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props,this.context)
	}

	componentWillReceiveProps({children,...direct},{styles}){
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

	getIndent=memoize((id,indent=0,children)=>{
		const query=new ContentQuery(this.context.activeDocStore.getState(),`#${id}`)
		if(query.parents("table").length>0){
			return indent
		}
		const firstCell=new ReactQuery(<Fragment>{children}</Fragment>).findFirst("cell")
		const {right=0}=firstCell.attr("margin")||{}
		return indent-right
	})

	render(){
		return <Table {...this.style} indent={this.getIndent(this.props.id, this.style.tblInd,this.style.children)}/>
	}
}
