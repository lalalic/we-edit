import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery,ContentQuery} from "we-edit"
import memoize from "memoize-one"


export default ({Table,Container})=>class __$1 extends Component{
	static displayName="table"
	static namedStyle="*table"

	static contextTypes={
		style: PropTypes.object,
		styles: PropTypes.object,
		activeDocStore: PropTypes.object,
	}

	static childContextTypes={
		style: PropTypes.object,
		cols: PropTypes.arrayOf(PropTypes.number)
	}

	childStyle=memoize((direct,context)=>{
		return direct ? direct.inherit(context) : context
	})

	getChildContext(){
		return {
			style: this.childStyle(this.props.style, this.context.style)
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

	/**
	 * @deprecated
	 * older Word table layout
	 */
	getIndent=memoize((indent=0, tblMargin, children)=>{
		const query=new ContentQuery(this.context.activeDocStore.getState(),`#${this.props.id}`)
		if(query.parents("table").length>0){
			return indent
		}
		const firstCell=new ReactQuery(<Fragment>{children}</Fragment>).findFirst("cell")
		const {right=0}=firstCell.attr("margin")||tblMargin||{}
		return indent-right
	})

	getConditionalChildren=memoize((condition,children)=>{
		return children
	})

	render(){
		var {cols,width, children, style:tblStyle, ...props}=this.props
		const childStyle=this.childStyle(this.props.style, this.context.style)
		const {indent,...style}=childStyle.flat4Table()
		
		const condition=tblStyle.get("tbl.conditional")
		if(undefined!=condition){
			children=this.getConditionalChildren(condition,children)
		}

		if(tblStyle.get('tbl.layout')=="fixed"){
			width=cols.reduce((s,a)=>s+a,0)
		}

		cols=cols.reduce((state,w)=>{
			state.cols.push({x:state.x,width:w})
			state.x+=w
			return state
		},{x:0,cols:[]}).cols

		return <Table {...{...props,...style,width,indent, children, cols}}/>
	}
}
