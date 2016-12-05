import React, {Component, PropTypes} from "react"
import Any from "../any"
import Group from "../../composed/group"

const Super=Any
/**
 *
 *
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */
export default class Table extends Super{
	static displayName="table"
	render(){
		return <table><tbody>{this.getContent()}</tbody></table>
	}
	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}
/*
	appendComposed(colGroups){
		if(this.computed.composed.length==0)
			this.computed.composed.push([])
		const currentRow=this.computed.composed[this.computed.composed.length-1]
		currentCell.push(line)

		const {width, tblGrid:cols}=this.props
		let height=0, self=this

		let x=0, rowNo=this.computed.children.length-1
		let groupsWithXY=colGroups.map((linesWithStyle,colNo)=>{
			let {border, margin, spacing, background}=linesWithStyle.style
			let y=0
			let grouped=linesWithStyle.map(line=>{
					let a=<Group y={y}>{line}</Group>
					y+=line.props.height
					return a
				})
			y+=(spacing*.5
				+border.top.sz
				+margin.top
				+margin.bottom
				+border.bottom.sz
				+spacing*.5)
			let cell=(
				<Cell height={y} x={x} width={cols[colNo]} background={background}>
					<Spacing x={spacing/2} y={spacing/2}>
						<Border border={border} spacing={spacing}>
							<Margin x={margin.left} y={margin.top}>
								{grouped}
							</Margin>
						</Border>
					</Spacing>
				</Cell>
			);
			x+=cols[colNo]
			height=Math.max(height,y)
			return cell
		})

		this.context.parent.appendComposed(this.createComposed2Parent({width,height,children:groupsWithXY}))
	}
*/

	onAllChildrenComposed(){
		const {children:rows}=this.computed
		const {parent}=this.context
		let y=0, width=0

		let positionedRows=rows.reduce((state,row, i)=>{
			let {height}=state.space
			const lines=state.lines
			let composedLine=row.createComposed2Parent(state)
			lines.push(composedLine)
			return state
		},{space:parent.nextAvailableSpace(),lines:[],row:0, cell:0})
			.lines.map((lineRow,i)=>{
				const {height,width:rowWidth}=lineRow.props
				let positionedLineRow=(<Group y={y} key={i}>{lineRow}</Group>)
				y+=height
				width=Math.max(width,rowWidth)
				return positionedLineRow
			})

		let table=(
			<Group height={y} width={width}>
				{positionedRows}
			</Group>
		)

		parent.appendComposed(table)

		super.onAllChildrenComposed()
	}

	createComposed2Parent(props){
		return <Row {...props}/>
	}

	getHeaderRowCount(){
		const {firstRow}=(this.props.directStyle||self.defaultStyle).get('tblPr.tblLook')||{}
		if(firstRow!=="1")
			return 0

		return React.Children.toArray(this.props.children).filter(a=>{
			let style=a.props.directStyle
			if(style && style.tblHeader)
				return true
			return false
		}).length
	}

	static childContextTypes=Object.assign({
		tableStyle: PropTypes.object,
		isFirstRow: PropTypes.func,
		isLastRow: PropTypes.func,
		isFirstRowAbsolute: PropTypes.func,
		isLastRowAbsolute: PropTypes.func,
		isBand1Horz: PropTypes.func,
		isBand2Horz: PropTypes.func
	}, Super.childContextTypes)

	getChildContext(){
		let self=this
		const {firstRow, lastRow, noHBand}=(self.props.directStyle||self.defaultStyle).get('tblPr.tblLook')||{}
		return Object.assign(super.getChildContext(),{
			tableStyle: this.props.directStyle||this.defaultStyle,
			isFirstRow(){
				return firstRow=="1" && this.isFirstRowAbsolute()
			},
			isFirstRowAbsolute(){
				return self.computed.children.length==0
			},

			isLastRow(){
				return lastRow=="1" && this.isLastRowAbsolute()
			},

			isLastRowAbsolute(){
				return self.computed.children.length==self.getContentCount()-1
			},

			isBand1Horz(){
				return noHBand=="0" && !this.isFirstRow() && !this.isLastRow() && (self.computed.children.length-self.getHeaderRowCount())%2==1
			},

			isBand2Horz(){
				return noHBand=="0"&& !this.isFirstRow() && !this.isLastRow() && (self.computed.children.length-self.getHeaderRowCount())%2==0
			}
		})
	}
}
