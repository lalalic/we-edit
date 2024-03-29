import React, {Component, Fragment} from "react"
import {compose, mapProps} from "recompose"

import { Popover,Subheader} from "material-ui"
import IconTable from "material-ui/svg-icons/editor/border-all"

import {ACTION, whenSelectionChangeDiscardable} from "we-edit"
import SizeIconButton from "../components/size-icon-button"

import Active from "./when-active"

const Create=whenSelectionChangeDiscardable()(class  extends Component{
	state={show:false}
	render(){
		const {selection, children}=this.props
		const {show,anchor}=this.state
		let setting=null
		if(selection && show){
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
			<Fragment>
				<SizeIconButton
					label="table"
					disabled={!selection}
					onClick={e=>this.setState({show:!this.state.show,anchor:e.target})}>
					<IconTable/>
				</SizeIconButton>
				{setting}
				{children}
			</Fragment>
		)
	}
})

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
	whenSelectionChangeDiscardable(),
	mapProps(({onAction,selection,dispatch})=>({
		create(rows, col){
			const layoutWidth=(()=>{
				let {column=0,cols}=selection.props("page")
				return cols[column].width
			})();

			const cols=new Array(col-1).fill(parseInt(layoutWidth/col))
			cols.push(layoutWidth-cols.reduce((sum,a)=>sum+=a,0))
			const element={type:"table", rows, cols}
			dispatch(ACTION.Entity.CREATE(element))
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


export default Object.assign(Active,{Create})