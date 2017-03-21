import React from "react"
import Base from "../section"

import {editable} from "model/edit"
import recomposable from "./recomposable"

export default class Section extends editable(recomposable(Base)){
    _reComposeFrom(content){
		const targetId=content.props.id
		const contentIndex=column=>column.children.findIndex(a=>a.props.children.props["data-content"]==targetId)

        const {composed}=this.computed
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let found=-1
        while((found=contentIndex(currentColumn))==-1){
            columns.pop() //not found in current column, remove current column
            if(columns.length){
                currentColumn=columns[columns.length-1]
            }else{//not found in current page, remove page
                composed.pop()
                if(composed.length){
                    currentPage=composed[composed.length-1]
                    columns=currentPage.columns
                    currentColumn=columns[columns.length-1]
                }else {//all page removed because can' find in composed
                    break
                    //throw new Error("you should find the line from section, but not")
                }
            }
        }

        if(found!=-1){
            currentColumn.children.splice(found)

            let index=this.computed.children.findIndex(a=>a.props.id==targetId)
			let removed=this.computed.children.splice(index)

			this.context.parent._reComposeFrom(this)

            let done=removed.map((a,i)=>new Promise((resolve,reject)=>{
                a._clearComposed4reCompose(i==0)
                //a.forceUpdate(resolve)
            }))

			//Promise.all(done).then(a=>this.context.parent.refreshComposed())
        }else{
            throw new Error("you should find the line from section, but not")
        }
    }
}
