import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps,withProps} from "recompose"
import {connect} from "react-redux"

import { Popover,Subheader } from "material-ui"
import IconTable from "material-ui/svg-icons/editor/border-all"

import {ACTION} from "we-edit"
import SizeIconButton from "../components/size-icon-button"

export class Create extends Component{
	state={show:false}
	render(){
		const {show,anchor}=this.state
		let setting=null
		if(show){
			setting=(
				<Popover
					open={true}
					anchorEl={anchor}
					onRequestClose={e=>this.setState({show:false})}
					>
					<Setting onAction={e=>this.setState({show:false})}/>
				</Popover>
			)
		}
		return (
			<span>
				<SizeIconButton
					onClick={e=>this.setState({show:!this.state.show,anchor:e.target})}>
					<IconTable/>
				</SizeIconButton>
				{setting}
			</span>
		)
	}
}

class Setting extends Component{
	render(){
		const {onAction}=this.props
		return (
			<div>
				<RCSize onAction={onAction}/>
			</div>
		)
	}
}

const RCSize=compose(
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object,
		selection: PropTypes.object
	}),
	mapProps(({store,doc, onAction,selection})=>({
		doc,
		create(rows, col){
			let layoutWidth=(()=>{
				let {cols}=selection.props("section")
				let {column}=selection.props("page")
				return cols[0].width
			})();

			let cols=new Array(col-1).fill(parseInt(layoutWidth/col))
			cols.push(layoutWidth-cols.reduce((sum,a)=>sum+=a,0))
			let element={type:"table", rows, cols}
			store.dispatch(ACTION.Entity.CREATE(element))
			onAction()
		}
	}))
)(class RCSize extends Component{
	state={row:0,col:0}
	render(){
		const {row, col}=this.state
		let title="Insert Table"
		if(row){
			title=`${row}x${col} Table`
		}

		const tr=this.tr.bind(this)

		return (
			<div>
				<Subheader>{title}</Subheader>
				<table onMouseOut={e=>this.setState({row:0,col:0})}>
					<tbody>
						{tr()}
						{tr()}
						{tr()}
						{tr()}
						{tr()}
						{tr()}
						{tr()}
						{tr()}
						{tr()}
						{tr()}
					</tbody>
				</table>
			</div>
		)
	}

	tr(){
		const {create}=this.props
		const {row, col}=this.state
		const td=()=>(<td
			style={{width:5,height:5,border:"1px solid gray"}}
			onClick={e=>create(row,col)}
			onMouseOver={e=>this.rowCol(e.target)}/>)
		return (
			<tr>
				{td()}
				{td()}
				{td()}
				{td()}
				{td()}
				{td()}
				{td()}
				{td()}
				{td()}
				{td()}
			</tr>
		)
	}

	rowCol(td){
		let tr=td.parentNode
		let tbody=tr.parentNode
		let row=-1, col=-1
		for(let i=0, trs=tbody.children, len=trs.length;i<len;i++){
			if(trs[i]==tr){
				row=i+1
				break
			}
		}

		for(let i=0, tds=tr.children, len=tds.length;i<len;i++){
			if(tds[i]==td){
				col=i+1
				break
			}
		}

		this.setState({row, col})
	}
})
