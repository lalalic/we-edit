import {Cacheable} from "../composable"
import editable from "./editable"
import Base from "../cell"
import {ReactQuery,connect,ACTION} from "we-edit"

export default class extends editable(Base){
    appendLastComposed(){
        this.computed.lastComposed=[]
        this.appendComposed(this.frame)
    }

    composeFrames(){
        return [...super.composeFrames(),this.props.id]
    }

    getRangeRects(p0,p1,pageXY){
		if(p0.id==this.props.id && p1.id==this.props.id){
			return super.getRangeRects(...arguments)
		}
        const pages=this.getPages()
        p0.page=pages.find(a=>a.props.I==p0.page)
        p1.page=pages.find(a=>a.props.I==p1.page)

        p0.frame=this.computed.composed.findIndex(a=>(p0.line=a.lineIndexOf(p0))!=-1)
        p1.frame=this.computed.composed.findLastIndex(a=>(p1.line=a.lineIndexOf(p1))!=-1)

        const frameXY=page=>{
            const {x,y}=pageXY(page)
            const {first,parents}=new ReactQuery(page.render())
                .findFirstAndParents(a=>a.props["data-content"]==this.props.id||undefined)
			return parents.reduce((p,{props:{x=0,y=0}})=>(p.x+=x,p.y+=y,p),{x,y})
        }

        const rects=[]
		const lineRectsInPage=(page,frame,start=0,end)=>{
			const {x,y}=frameXY(page)
            frame=this.computed.composed[frame]
            frame.lines.slice(start,end).forEach((a,i)=>{
				const {left,top,width,height}=frame.lineRect(start+i)
				rects.push({left:left+x,top:top+y,right:left+width+x,bottom:top+height+y})
			})
		}

        const [start,end]=(()=>{
            if(p0.page.props.I>p1.page.props.I){
                return [p1,p0]
            }else if(p0.page.props.I==p1.page.props.I){
                if(p0.line>p1.line){
                    return [p1,p0]
                }
            }
            return [p0,p1]
        })();

		if(start.page==end.page){
			lineRectsInPage(start.page, start.frame, start.line, end.line+1)
		}else{
			lineRectsInPage(start.page, start.frame, start.line)
			pages.slice(start.page.props.I+1, end.page.props.I).forEach((page,i)=>lineRects(page,i+start.frame+1))
			lineRectsInPage(end.page,end.frame, 0,end.line+1)
		}
        if(rects.length){
    		Object.assign(rects[0],{left:pageXY(start.page).x+start.x})

    		Object.assign(rects[rects.length-1], {right:pageXY(end.page).x+end.x})
        }
		return rects
    }
}
