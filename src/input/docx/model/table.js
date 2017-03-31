import React, {Component, PropTypes} from "react"
import {getStyles} from "state/selector"
export default function(Models){
	return class extends Component{
		static displayName="docx-table"

		componentWillReceiveProps(next,{store}){
			const styles=getStyles(store.getState())

			let [direct,style]=styles.tbl(props.pr)

			children=next.props.children.map((row,i)=>{
				let rowCnfStyle=row.props.cnfStyle
				let children=row.props.children.map((cell,j)=>{
					let cellStyle=style.merge(cell.props,i,j)

					return React.cloneElement(cell,{...cellStyle,cnfStyle:undefined})
				})
				return cloneElement(row,{children})
			})

		}

		render(){
			return <Models.Table {...this.props}/>
		}
	}
}
