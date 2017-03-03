import React, {Component, PropTypes} from "react"
import Any from "../any"
import Group from "../../composed/group"

export default class Table extends Any{
	static displayName="table"
	render(){
		return <table><tbody>{this.getContent()}</tbody></table>
	}

	onAllChildrenComposed(){
		const {children:rows}=this.computed
		const {parent}=this.context
		const {margin:{left:x}, border:{top:{sz}}}=rows[0].computed.children[0].getStyle()

		const commit=(props,lines)=>parent.appendComposed(this.createComposed2Parent({...props,x:-x,y:sz/2,children:lines}))

		const {content, lines}=rows.reduce((state,row,i)=>{
			let {space,content}=state
			let lines=state.lines
			let composedLine=row.createComposed2Parent(state)
			const {height:rowHeight, width:rowWidth}=composedLine.props

			if(space.height-content.height>=rowHeight){
				lines.push(React.cloneElement(composedLine, {y:content.height,key:state.row}))
				content.height+=rowHeight
				content.width=rowWidth
			}else{
				commit(content, lines)
				content.height=0
				lines=state.lines=[]
				state.space=parent.nextAvailableSpace({height:rowHeight})
				lines.push(React.cloneElement(composedLine, {y:content.height,key:state.row}))
				content.height+=rowHeight
				content.width=rowWidth
			}
			state.row++
			return state
		},{space:parent.nextAvailableSpace(), content:{height:0,width:0}, lines:[],row:0, cell:0})

		commit(content, lines)

		super.onAllChildrenComposed()
	}

	createComposed2Parent(props){
		return <ComposedTable {...props}/>
	}
}

class ComposedTable extends Group{
}
