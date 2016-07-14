import React from "react"

import Group from "../composed/group"

import {Section} from "../content"
import editable from "./editable"

export default class extends editable(Section){
	createComposed2Parent(props){
		return <Group {...props} index={this.children.length}/>
	}
	
	_reComposeFrom(content){
        const {composed}=this
		const {_id: targetId}=content
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
		let found=-1
		while(-1==(found=currentColumn.children.findIndex(group=>{//group/Line
			return group.props.children.props._id==targetId
		}))){
			columns.pop()
			if(columns.length){
				currentColumn=columns[columns.length-1]
				found=-1
			}else{
				composed.pop()
				console.log("a page is removed")
				if(composed.length){
					currentPage=composed[composed.length-1];
					({columns}=currentPage);
					currentColumn=columns[columns.length-1];
					found=-1
				}else {
					break
					//throw new Error("you should find the line from section, but not")
				}
			}
		}

		if(found!=-1){
			//we need know from which child each line composes from for re-compose
			//that's why overwrite createComposed2Parent
			const index=currentColumn.children[found].props.index
			
			currentColumn.children.splice(found)

			const removed=this.children.splice(index)

			const composedTime=new Date().toString()
			
			removed.forEach((a,i)=>{
				a._clearComposed4reCompose(i==0)
				/**
				 *  do re-compose job
				 */
				a.setState({composedTime})
			})
		}else{
			throw new Error("you should find the line from section, but not")
		}
	}
}
