import React from "react"
import ComposedText from "./text"
import ComposedLine from "./line"
import Text from "pagination/text"

import FindLast from "tools/array-find-last"
import getClientRect from "tools/get-client-rect"

export default class Query{
	constructor(document,state){
		this.document=document
		this.state=state
		this.pages=document.computed.composed
		this.pgGap=document.context.pgGap
	}

	get ratio(){
		return this.document.canvas.ratio
	}

	get y(){
		let {pages,pgGap}=this
		return pages.slice(0,pages.length-1)
			.reduce((w,{size:{height}})=>w+height+pgGap,(last=>{
				if(!last)
					return 0
				let lastColumnLines=last.columns[last.columns.length-1].children
				let lastLine=lastColumnLines[lastColumnLines.length-1]
				let height=last.margin.top
				if(lastLine)
					height+=lastLine.props.y+lastLine.props.height
				return height
			})(pages[pages.length-1]))
	}

	pageY(which){
		let {pages,pgGap}=this
		return pages.slice(0,which)
			.reduce((h,{size:{height}})=>h+height+pgGap,-pgGap)
	}

	getClientRect(node){
		return "left,right,top,bottom,height,width".split(",")
			.reduce((rect,k)=>{
				rect[k]*=this.ratio
				return rect
			},getClientRect(node))
	}
/*
	at(x,y){
		let {pages,pgGap}=this
		let pageNo=(()=>{
			switch(pages.length){
				case 0: return -1
				case 1: return 0
				default: {
					let h=pages[0].size.height
					return pages.slice(1).findIndex(({size:{height}})=>h<y<(h+=height))+1
				}
			}
		})();
		let page=pages[pageNo]

		let columnNo=(columns=>{
			switch(columns.length){
				case 0: return -1
				case 1: return 0
				default: {
					return columns.find(({x:x0,width})=>x0<x<x0+width)
				}
			}
		})(page.columns);
		let column=page.columns[columnNo]

		let lineNo=((lines,pY)=>{
			return lines.findIndex(({props:{y:y0,height}})=>y0<=pY<=y0+height)
		})(column.children,
			y-pages.slice(0,pages.indexOf(page)).reduce((h,{size:{height}})=>h+=height,0)-page.margin.top
		);

		let line=this.traverse(column.children[lineNo],el=>{
			if(el.type==Line){
				return true
			}
		})

		let pieces=line.props.children
		let offsetX=x-page.margin.right-column.x
		let piece=pieces.find((offsetX,piece)=>{
			if(0<=offsetX<=piece.props.width){
				return true
			}else{
				offsetX-=piece.props.width
			}
		})

		piece=this.traverse(piece,el=>{
			if('data-content' in el.props && 'data-endAt' in el.props){
				return true
			}
		})

		let id=piece.props["data-content"]
		let from=piece.props["data-endAt"]


		let wordwrapper=new Text.WordWrapper(this.getComposer(id).props)
		let content=this.state.getIn(["content",id]).toJS()
		let end=wordwrapper.widthString(offsetX, content.children.substr(from))
		offsetX=wordwrapper.stringWidth(content.children.substr(from,end))
		return {
			page: pageNo,
			column: columnNo,
			line: lineNo,
			id,
			at: from+end,
			style
		}
	}

	getStyle({props:{fontFamily, fontSize, fontWeigth, fontStyle}}){
		return {fontFamily, fontSize, fontWeigth, fontStyle}
	}
*/
	getComposer(id){
		return this.document.composers.get(id)
	}

	_locate(id,at){
		let {pages,pgGap}=this
		let columnNo,lineNo,node, path=[]
		let pageNo=pages.findIndex(page=>{
			this.traverse(page,function({type,props},parent,index,pi){
				if((pi=path.indexOf(parent))!=-1){
					path.splice(pi+1)
				}else{
					path.push(parent)
				}

				if(parent.type=="column"){
					lineNo=index
					path.splice(1,path.length-1,parent)
				}else if(parent.type=="page"){
					columnNo=index
					path.splice(0,path.length,parent)
				}
				if(type==ComposedText){
					let {"data-content":dataId,"data-endAt":dataEndAt}=props
					if(dataId==id && at<=dataEndAt){
						node=arguments[0]
						path.push(node)
						return true
					}
				}
			})
			return !!node
		})

		return {pageNo,columnNo,lineNo,node, path}
	}

	_xy(id,path){
		let [page,column]=path
		let {pages,pgGap}=this
		let pageNo=pages.indexOf(page)

		const e=(a,w='x')=>{
			if(w in a)
				return a[w]
			else if(a.props && w in a.props)
				return a.props[w]
			else
				return 0
		}

		let svg=this.document.canvas.root.querySelector("svg")
		let [,,width,]=svg.getAttribute("viewBox").split(" ").map(a=>parseInt(a))
		let offsetX=path.filter(a=>a.type==ComposedLine)
			.reduce((x,line)=>{
				let lineItem=path[path.indexOf(line)+1]
				let itemIndex=line.props.children
					.findIndex(a=>a==lineItem ||
						(a.props["data-content"]==lineItem.props["data-content"] &&
						a.props["data-endAt"]==lineItem.props["data-endAt"])
					)
				console.assert(itemIndex!=-1)
				return x+=line.props.children.slice(0,itemIndex)
					.reduce((w,li)=>w+=li.props.width,0)
			},0)
		return path.reduce((state,a)=>{
				state.x+=e(a,'x')
				state.y+=e(a,'y')
				return state
			},{
				x:(width-page.size.width)/2
					+page.margin.left+offsetX,

				y:pages.slice(0,pageNo)
					.reduce((y,{size:{height}})=>y+=(pgGap+height),0)
					+pgGap+page.margin.top
					+path.findLast(a=>a.type==ComposedLine).props.height
			})
	}

	position(id,at){
		let {pages,pgGap}=this
		let {pageNo,columnNo,lineNo,node, path}=this._locate(id,at)

		if(!node) return;

		let from=node.props["data-endAt"]-node.props.children.join("").length
		let composer=this.getComposer(id)
		let {children:text,...props}=composer.props
		let wordwrapper=new Text.WordWrapper(props)
		let style=wordwrapper.defaultStyle

		let {x,y}=this._xy(id,path)

		x+=wordwrapper.stringWidth(text.substring(from,at))
		y=y-style.height

		style.height=style.height/this.ratio
		style.descent=style.descent/this.ratio

		return {
			page: pageNo,
			column: columnNo,
			line: lineNo,
			left:Math.ceil(x/this.ratio),
			top:Math.ceil(y/this.ratio),
			id,
			at,
			...style
		}
	}

	nextLine({page:pageNo,column:colNo,line:lineNo,left}){
		left=left*this.ratio
		let {pages,pgGap}=this
		let page=pages[pageNo]
		let columns=page.columns
		let lines=columns[colNo].children

		if(lineNo==lines.length-1){
			if(colNo==columns.length-1){
				if(pageNo==pages.length-1){
					return arguments[0]
				}else{
					page=pages[++pageNo]
					colNo=0
					lineNo=0
				}
			}else{
				colNo++
				lineNo=0
			}
		}else{
			lineNo++
		}

		page=pages[pageNo]
		let column=page.columns[colNo]
		let line=null
		this.traverse(column.children[lineNo], function(node,parent,i){
			if(node.type==ComposedLine){
				line=node
				return true
			}
		})
		console.assert(!!line)

		let svg=this.document.canvas.root.querySelector("svg")
		let [,,width,]=svg.getAttribute("viewBox").split(" ").map(a=>parseInt(a))
		let x=(width-page.size.width)/2+page.margin.left+column.x
		let index=line.props.children.findIndex(a=>{
			if(x+a.props.width>=left){
				return true
			}else{
				x+=a.props.width
			}
		})

		if(index==-1){
			let item=line.props.children[0]
			if(item.type==ComposedText){
				let id=item.props["data-content"]
				let at=item.props["data-endAt"]
				return {id,at}
			}
		}else{
			let item=line.props.children[index]
			if(item.type==ComposedText){
				let id=item.props["data-content"]
				let composer=this.getComposer(id)
				let text=item.props.children.join("")
				let wordwrapper=new Text.WordWrapper(composer.props)
				let len=wordwrapper.widthString(left-x,text)
				let at=item.props["data-endAt"]-text.length+len
				return {id,at}
			}
		}
	}

	prevLine({page:pageNo,column:colNo,line:lineNo,left}){
		left=left*this.ratio
		let {pages,pgGap}=this
		let page,column
		if(lineNo==0){
			if(colNo==0){
				if(pageNo==0){
					return arguments[0]
				}else{
					page=pages[--pageNo]
					colNo=page.columns.length-1
					lineNo=page.columns[colNo].children.length-1
				}
			}else{
				lineNo=pages[pageNo].columns[--colNo].children.length-1
			}
		}else{
			--lineNo
		}

		page=pages[pageNo]
		column=page.columns[colNo]
		let line=null
		this.traverse(column.children[lineNo], function(node,parent,i){
			if(node.type==ComposedLine){
				line=node
				return true
			}
		})
		console.assert(!!line)

		let svg=this.document.canvas.root.querySelector("svg")
		let [,,width,]=svg.getAttribute("viewBox").split(" ").map(a=>parseInt(a))
		let x=(width-page.size.width)/2+page.margin.left+column.x
		let index=line.props.children.findIndex(a=>{
			if(x+a.props.width>=left){
				return true
			}else{
				x+=a.props.width
			}
		})

		if(index==-1){
			let item=line.props.children[0]
			if(item.type==ComposedText){
				let id=item.props["data-content"]
				let at=item.props["data-endAt"]
				return {id,at}
			}
		}else{
			let item=line.props.children[index]
			if(item.type==ComposedText){
				let id=item.props["data-content"]
				let composer=this.getComposer(id)
				let text=item.props.children.join("")
				let wordwrapper=new Text.WordWrapper(composer.props)
				let len=wordwrapper.widthString(left-x,text)
				let at=item.props["data-endAt"]-text.length+len
				return {id,at}
			}
		}
	}

	traverse(node, f, right=false){
		let children
		switch(node.type){
		case "page":
			children=node.columns
			break
		case "column":
			children=node.children
			break
		default:
			if(node.type==ComposedText){
				return
			}else if(node.props && node.props.children){
				children=React.Children.toArray(node.props.children)
			}else
				return
		}

		return !!children[`find${right ? "Last" :""}`]((child,i)=>{
			let result=f(child,node,i)
			if(result===true){
				return true
			}else if(result===false){
				return false
			}else{
				return !!this.traverse(child,f,right)
			}
		})
	}
}
