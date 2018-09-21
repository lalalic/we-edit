import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {enablify} from "../../composable"
import Document from "../document"
import Group from "../group"

import DB from "./db"

const isContainer=A=>A==Group
const isDocument=A=>A==Document
function locatable(A){
	if(isDocument(A)){
		return class LocatableDocument extends A{
			//static displayName=`${A.displayName}(locatable)`
			static childContextTypes={
				mount: PropTypes.func,
				unmount: PropTypes.func,
			}

			constructor(){
				super(...arguments)
				const db=new DB()
				this.mount=(id,rect)=>db.add(id, rect)
				this.unmount=(id, rect)=>db.remove(id, rect)
				this.state={db}
			}

			getChildContext(){
				const {mount, unmount}=this
				return {mount, unmount}
			}
			
			render(){
				return React.cloneElement(super.render(),{ref:a=>this.canvas=a})
			}
			
			get scale(){
				return this.props.scale||1
			}
			
			getBoundingClientRect(){
				return this.canvas.getBoundingClientRect()
			}
			
			toCanvasCoordinate(...viewportNumbers){
				const to=a=>a/this.scale
				return viewportNumbers.length==1 ? to(viewportNumbers) : viewportNumbers.map(to)
			}

			toViewportCoordinate(...canvasNumbers){
				const to=a=>a*this.scale
				return canvasNumbers.length==1 ? to(canvasNumbers) : canvasNumbers.map(to)
			}
			
			getClientRects(id){
				return this.db[id].values
			}
			
			getTextClientRect(id, at){
				const rects=this.getClientRects(id)
				let ats=rects.map(a=>a.at)
				let i=ats.indexOf(at)
				if(i==-1)
					i=[...ats,at].sort().indexOf(at)
				return rects[i]
			}
			
			get maxY(){//@TODO: to get from db 
				const {pages,pgGap}=this.props
				if(this.pages.length==0)
					return pgGap

				const lastPageHeight=(last=>{//@TODO: balanced column, last page of section
					if(last.lastSectionPage){
						return last.size.height
					}
					let lastColumnLines=last.columns[last.columns.length-1].children
					let lastLine=lastColumnLines[lastColumnLines.length-1]
					let height=last.margin.top
					if(lastLine)
						height+=lastLine.props.y+lastLine.props.height
					return height
				})(pages[pages.length-1])

				return pages.slice(0,pages.length-1)
					.reduce((w,{size:{height}})=>w+height+pgGap,lastPageHeight)
			}
		}
	}else{
		class Locatable extends A{
			//static displayName=`${A.displayName}(locatable)`
			static contextTypes={
				...A.contextTypes,
				mount: PropTypes.func,
				unmount: PropTypes.func,
				offset: PropTypes.shape({
					x:PropTypes.number,
					y:PropTypes.number,
				})
			}
			
			get offset(){
				return this.getXY(this.context.offset, this.props.x, this.props.y)
			}
			
			getXY=memoize((offset={x:0,y:0},x=0,y=0)=>({x:x+offset.x,y:y+offset.y}))
			
			mount(un=""){
				const {["data-content"]:id,["data-content"]:type, ["data-endat"]:endat=0, width, height}=this.props
				if(id && width!=undefined && height!=undefined){
					this.context[`${un}mount`](id, this.getRect(this.offset, width, height,type, type=="text" ? endat : undefined, type=="text" ? this.props.children.length :undefined))
				}
			}

			componentDidMount(){
				super.componentDidMount && super.componentDidMount(...arguments);
				this.mount()
			}
			
			componentDidUpdate(){
				super.componentDidUpdate && super.componentDidUpdate(...arguments);
				this.mount()
			}
			
			componentWillUnmount(){
				super.componentWillUnmount && super.componentWillUnmount(...arguments);
				this.mount("un")
			}
			
			getRect=memoize((offset, width, height, type, endat, length)=>({...offset,width,height,endat,length}))
		}
		if(isContainer(A)){
			return class extends Locatable{
					static childContextTypes={
						offset: PropTypes.shape({
							x:PropTypes.number,
							y:PropTypes.number,
						})
					}
					
					getChildContext(){
						return {
							...(super.getChildContext && super.getChildContext() ||{}),
							offset:this.offset
						}
					}
			}
		}else{
			return Locatable
		}
	}


	
}

locatable.enable=enablify(locatable)

export default locatable

