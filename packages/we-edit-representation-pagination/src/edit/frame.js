import editable from "./editable"
import TestRenderer from 'react-test-renderer'
import {Cacheable} from "../composable"
import Base from "../frame"

export default Cacheable(class extends editable(Base){
    clearComposed(){
        this.columns=[]
        return super.clearComposed(...arguments)
    }

    removeChangedPart(changedChildIndex){
        const children=Children.toArray(this.props.children)
		const changed=children[changedChildIndex]

		const removedChildren=children.slice(changedChildIndex).map(a=>a.props.id).filter(a=>a!==undefined)

		const findChangedContentId=line=>{
			const id=this.findContentId(line)
			return (id!==undefined && removedChildren.includes(id))
		}

        const lineIndex=this.lines.findIndex(line=>findChangedContentId(line))
        this.rollbackLines(this.lines.slice(lineIndex))
        return true
    }

    findLastChildIndexOfLastComposed(){
        return this.findContentId(this.lastLine)
    }

    //locatable
	includeContent(id){
		if(!!this.columns.find(a=>a.id==id)){
			return true
		}
		return !![...this.lines,...this.anchors].find(a=>this.belongsTo(a,id))
	}

	caretPositionFromPoint(x,y){
		const include=({x:x0=0,y:y0=0,width,height})=>x0<=x && y0<=y && (x0+width)>=x && (y0+height)>=y
		var lineX,lineY
		var line=this.columns.filter(a=>include({x:a.x,y:a.y,width:a.width,height:a.currentY}))
			.reduce((found,{children:lines,x=0,y=0,Y=y})=>{
				return found || lines.find(({props:{width,height}})=>{
					if(include({x,y:Y,width,height})){
						lineX=x
						lineY=Y
						return true
					}
					Y+=height
				})
			},null)
		if(!line){
			//this.columns.filter()
		}

		if(line){
			return this.caretPositionInLine(x,this.lines.indexOf(line))
		}

		return {}
	}

	caretPositionInLine(x, line){
		line=this.lines[line]
		const lineX=this.columns.find(a=>a.children.includes(line)).x
		const paragraphId=this.getParagraph(line)
		const i=line.props.pagination.i-1

		return this.context.getComposer(paragraphId).caretPositionFromPoint(i,x-lineX)
	}

	lineRect(line){
		line=this.lines[line]
		const left=this.columns.find(a=>a.children.includes(line)).x
		const top=this.lineY(line)-line.props.height
		return {left,top,width:line.props.width,height:line.props.height}
	}

	getClientRects(id){
		const RE_TRANSLATE=/translate\((.*)\s+(.*)\)/
		const clean=(props,excludes=["undefined","object"])=>Object.keys(props).reduce((o,k)=>{
			if(!excludes.includes(typeof(props[k]))){
				o[k]=props[k]
			}
			if(k=="data-endat")
				o.endat=parseInt(props[k])
			return o
		},{})
		const rendered=TestRenderer.create(
				React.cloneElement(this.createComposed2Parent(),{x:0,y:0})
			).toJSON()

		const traverse=({props:{transform="",x=0,y=0,...props},children=[]})=>{
			if(props["data-content"]==id){
				props=clean(props)
				if(typeof(children)=="string"){
					props.text=children
				}else if(Array.isArray(children) && typeof(children[0])=="string"){
					props.text=children.join("")
				}

				return [Object.assign(props,{x,y})]
			}
			if(Array.isArray(children) && typeof(children[0])!="string"){
				let rects=children.map(traverse).filter(a=>!!a).reduce((rects,a)=>[...rects,...a],[])
				if(rects.length){
					if(transform){
						let [,x=0,y=0]=transform.match(RE_TRANSLATE)
						rects.forEach(a=>{
							a.x+=parseFloat(x)
							a.y+=parseFloat(y)
						})
					}
				}
				return rects
			}
		}

		return traverse(rendered)
	}

	removeFrom(lineIndex){
		//remove content
		return super.rollbackLines(this.lines.length-lineIndex,false)
	}

})
