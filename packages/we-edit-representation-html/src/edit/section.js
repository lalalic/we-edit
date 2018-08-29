import {Editors} from "we-edit-representation-pagination"


export default class extends Editors.Section{
	_newColumn(i){
		const {width}=this.context.parent.viewport
		return {
            type:"column",
			y:0,
			x: 0,
			children:[],
			height: Number.MAX_SAFE_INTEGER,
            width: width-40
		}
    }
	
	_newPage(i){
		let col=this._newColumn(0)
        let info={
            type:"page",
            size:{
				width: col.width, 
				height:2*this.context.parent.viewport.height
			},
            margin:{top:30,bottom:30,left:5,right:5},
            columns:[col],
            header: null,
            footer: null
        }
		this.context.parent.appendComposed(info)
		return info
    }
	
    nextAvailableSpace(required={}){
		const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this.computed
		if(composed.length==0)
			this.computed.composed.push(this._newPage())
		
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width}=currentColumn
		return {width, height: Number.MAX_VALUE}
    }
}
