import React from "react"
import Base from "../table"

export default class Table extends Base{
	render(){
		const {cols}=this.props
		let width=cols.reduce((s,w)=>s+=w,0)
		return (
			<table style={{width:"100%",borderCollapse:"collapse"}}>
				<colgroup>
					{cols.map((w,i)=><col key={i} style={{width:`${100*w/width}%`}}/>)}
				</colgroup>
				<tbody>
					{this.props.children}
				</tbody>
			</table>
		)
	}
}