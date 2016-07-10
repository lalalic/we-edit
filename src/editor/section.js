import {Section} from "../content"
import editable from "./editable"

export default class extends editable(Section){
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
			const index=currentColumn.children[found].props.index
			currentColumn.children.splice(found)

			const removed=this.children.splice(index)

			const composedTime=new Date().toString()
			removed.forEach((a,i)=>{
				a._clearComposed4reCompose()
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
