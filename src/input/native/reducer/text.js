import {text as Base} from "input/reducer"
export class text extends Base{
	update(props){
		const {start,end}=this.selection
		let path=["update"]
		if(start.id==end.id){
			if(start.at==end.at){
				path.push("withoutSelection")
				if(start.at==0){
					path.push("atHead")
				}else if(start.at==this.$('#'+start.id).children.length-1){
					path.push("atTail")
				}
			}else{
				path.push("inline")
			}
		}else{
			path.push("withSelection")
			let p0=this.$('#'+start.id).parents("paragraph").attr('id')
			let p1=this.$('#'+end.id).parents("paragraph").attr('id')
			if(p0==p1){
				path.push("inParagraph")
			}else{
				path.puah("crossParagraph")
			}
		}
		
		this[path.join("_")](...arguments)
		return this
	}
	
	update_inline(props){
		
	}
	
	update_withoutSelection(props){
		
	}
	
	update_withoutSelection_atHead(props){
		let {start:{id,at}}=this.selection
		let target=this.$('#'+id)
		let parent=target.parent()
		
		this.save4undo(parent.attr('id'))

		let created=target.clone(a=>this.renderChanged(a).id)
		created.text("")
		Object.keys(props).forEach(k=>created.attr(k, props[k]))
		created.insertBefore(target)

		this.renderChanged(parent.attr('id'))
		this.cursorAt(created.attr('id'),0)
	}
	
	update_withoutSelection_atTail(props){
		
	}
	
	update_withSelection_inParagraph(){
		
	}
	
	update_withSelection_crossParagraph(){
		
	}
}