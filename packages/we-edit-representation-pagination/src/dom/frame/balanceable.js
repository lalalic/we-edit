import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"
import Columnable from "./columnable"


//<Frame balance={true}/>
export default class Balanceable extends Columnable{
	static Balanceable=Balanceable
	onAllChildrenComposed(){
		if(this.props.height==undefined && this.props.balance){
			this.balance()
		}
		super.onAllChildrenComposed(...arguments)
	}

	balance(){
		const width=this.cols[0].width
		const lines=this.lines
		if(!this.cols.find(a=>width!==a.width)){
			this.columns=[]
			this.equalBalance(lines, this.cols)
		}else{
			this.anyBalance(lines, this.cols)
		}
	}

	equalBalance(lines,cols){
		const totalHeight=lines.reduce((h,{height,y=h})=>y+height,0)
		const colHeight=totalHeight/cols.length-10
		lines.reduce((state,line)=>{
			if(state.h<colHeight){
				state.cols[state.cols.length-1].push(line)
				state.h+=line.props.height
			}else{
				state.cols.push([line])
				state.h=line.props.height
			}
			return state
		},{cols:[[]],h:0})
			.cols
			.forEach(lines=>Object.assign(this.createColumn(),{
				children:lines
			}))
	}

	anyBalance(lines, cols){
		const createColumn=this.createColumn
		const reset4Recompose=this.reset4Recompose
		try{
			//recompose into col with totalWidth to get total height
			const totalWidth=cols.reduce((w,a)=>w+a.width,0)
			this.createColumn=()=>Object.assign(createColumn.call(this),{width:totalWidth,height:Number.MAX_SAFE_INTEGER})
			this.recompose()
			const totalHeight=this.currentColumn.currentY

			this.createColumn=()=>Object.assign(createColumn.call(this),{height:totalHeight})
			this.recompose()
		}finally{
			this.createColumn=createColumn
			this.reset4Recompose=reset4Recompose
		}
	}
}