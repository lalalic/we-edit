import React, {Component, PropTypes} from "react"

export default function(Models){
	return class extends Component{
		static displayName="docx-table"
		static namedStyle="*table"
		
		static contextTypes={
			styles: PropTypes.object
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

			let rows=children.map((row,i)=>{
				let cells=row.props.children.map((cell,j)=>{
					let {cnfStyle:cellCnfStyle=0}=cell.props||{}
					let {cnfStyle:rowCnfStyle=0}=row.props||{}
					let cnfStyle=rowCnfStyle|cellCnfStyle
					
					let cellStyle=style.merge({...cell.props,cnfStyle})
					return React.cloneElement(cell,{...cellStyle,cnfStyle:undefined})
				})
				return React.cloneElement(row,null,cells)
			})
			
			this.style={...tblStyle, ...direct, children:rows}
		}

		render(){
			return <Models.Table {...this.style}/>
		}
	}
}
