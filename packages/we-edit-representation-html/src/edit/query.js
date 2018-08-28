export default class Query{
    constructor(document, state){
        this.document=document
        this.state=state
    }
	
	toCanvasCoordintation({left,top}){
		if(!this.document.root)
			return arguments[0]
		let a=this.document.root.getBoundingClientRect()
		return {left:left-a.left, top:top-a.top}
	}

    position(id,at){
		if(at==-1 || !this.document.root){
			return {id,at,left:0,top:0,height:0}
		}
		
		let el=this.document.root.querySelector(`[data-content="${id}"]`)
		let range=document.createRange()
		range.setStart(el.firstChild,at)
		range.collapse()
		let {left,top,height}=range.getBoundingClientRect()
		let {left:canvasLeft,top:canvasTop}=this.toCanvasCoordintation({left,top})
		return {id,at,left,top,height, canvasLeft, canvasTop}
    }

    prevLine({id,at}){
        let {left,top}=this.position(id,at)
        let found=this.at(left,top-5)
		if(found.id==id && found.at==at){
			let prevP=(()=>{
				let p=this.document.root.querySelector(`[data-content="${id}"]`)
				while(p&& p.nodeName!=="P"){
					p=p.parentElement
				}
				if(p){
					p=p.previousElementSibling
					if(p && p.nodeName=="P" && p.dataset.content)
						return p
				}
			})();
			
			if(prevP){
				let {bottom}=prevP.getBoundingClientRect()
				return this.at(left,bottom-5)
			}
		}
		return found
    }

    nextLine({id,at}){
        let {left,top,height}=this.position(id,at)
        return this.at(left,top+height+5)
    }
	
	at(x,y){
		let notContents=this.document.root.querySelectorAll(".notContent")
		notContents.forEach(a=>a.style.visibility="hidden")
		let {endContainer:{parentElement:{dataset:{content:id}}}, endOffset:at}=document.caretRangeFromPoint(x,y)
		notContents.forEach(a=>a.style.visibility="initial")
		
		return {id,at}
	}
	
	getComposer(id){
		return this.document.composers.get(id)
	}
	
	asSelection({id,at}){
		let self=this
		let root=this.document.root
		return self.selection={
			props(type){
				type=new RegExp(type,"i")
				let found=root.querySelector(`[data-content="${id}"]`)
				while(found && !type.test(found.dataset.type)){
					found=found.parentElement
				}
				
				if(!found)
					return null
				
				let composer=self.getComposer(found.dataset.content)
				
				if(composer)
					return composer.props
				
				return null
			}
		}
	}
}
