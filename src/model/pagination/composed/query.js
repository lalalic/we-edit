import React from "react"
import ComposedText from "./text"
import ComposedLine from "./line"
import Text from "pagination/text"

import FindLast from "tools/array-find-last"
import getClientRect from "tools/get-client-rect"

const NOT_FOUND={left:-9999,top:0}
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
			.reduce((h,{size:{height}})=>h+height+pgGap,pgGap)
	}

	getClientRect(node){
		return "left,right,top,bottom,height,width".split(",")
			.reduce((rect,k)=>{
				rect[k]*=this.ratio
				return rect
			},getClientRect(node))
	}

	_pageMarginRight(n){
		let svg=this.document.canvas.root.querySelector("svg")
		let [,,width,]=svg.getAttribute("viewBox").split(" ")
			.map(a=>parseInt(a))
		let page=this.pages[n]
		return (width-page.size.width)/2+page.margin.left
	}

	at(x,y){
		x=x*this.ratio
		y=y*this.ratio
		let {pages,pgGap}=this
		let pageNo=(()=>{
			switch(pages.length){
				case 0: return -1
				default: {
					let h=0
					return pages
						.findIndex(({size:{height}})=>{
							return h<=y && y<=(h+=height+pgGap)
						})
				}
			}
		})();
		if(pageNo==-1) return NOT_FOUND
		let page=pages[pageNo]

		let columnNo=((columns,pageMargin)=>{
			switch(columns.length){
				case 0: return -1
				default: {
					return columns
						.findIndex(({x:x0,width})=>{
							return (pageMargin+x0)<=x && x<=(pageMargin+x0+width)
						})
				}
			}
		})(page.columns,this._pageMarginRight(pageNo));
		if(columnNo==-1) return NOT_FOUND
		let column=page.columns[columnNo]

		let lineNo=((lines,pY)=>{
			return lines
				.findIndex(({props:{y:y0,height}})=>{
					return y0<=pY && pY<=(y0+height)
				})
		})(column.children,y-this.pageY(pageNo)-page.margin.top);
		if(lineNo==-1) return NOT_FOUND
		let line=column.children[lineNo]

		let pieces=React.Children.toArray(line.props.children)
		let offsetX=x-this._pageMarginRight(pageNo)-column.x
		let piece=pieces.find(({props:{width}})=>{
			if(0<=offsetX && offsetX<=width){
				return true
			}else{
				offsetX-=width
			}
		})

		if(piece==null) return NOT_FOUND

		this.traverse(piece,el=>{
			if('data-content' in el.props && 'data-endat' in el.props){
				piece=el
				return true
			}
		})

		if(!('data-content' in piece.props && 'data-endat' in piece.props)){
			return NOT_FOUND
		}

		let id=piece.props["data-content"]
		let from=piece.props["data-endat"]
		let text=piece.props.children.join("")


		let wordwrapper=new Text.WordWrapper(this.getComposer(id).props)
		let end=wordwrapper.widthString(offsetX, text)
		offsetX=offsetX-wordwrapper.stringWidth(text.substr(0,end))
		return {
			page: pageNo,
			column: columnNo,
			line: lineNo,
			id,
			at: from+end,
			left: x-offsetX+window.scrollX*this.ratio,
			top: this.pageY(pageNo)+page.margin.top+line.props.y+window.scrollY*this.ratio
		}
	}

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
					let {"data-content":dataId,"data-endat":dataEndAt}=props
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
						a.props["data-endat"]==lineItem.props["data-endat"])
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

	position(id,at, ratio){
		ratio=ratio||this.ratio
		let {pages,pgGap}=this
		let {pageNo,columnNo,lineNo,node, path}=this._locate(id,at)

		if(!node) return;

		let from=node.props["data-endat"]-node.props.children.join("").length
		let composer=this.getComposer(id)
		let {children:text,...props}=composer.props
		let wordwrapper=new Text.WordWrapper(props)
		let style=wordwrapper.defaultStyle

		let {x,y}=this._xy(id,path)

		x+=wordwrapper.stringWidth(text.substring(from,at))
		y=y-style.height

		style.height=style.height/ratio
		style.descent=style.descent.ratio

		return {
			page: pageNo,
			column: columnNo,
			line: lineNo,
			left:Math.ceil(x/ratio),
			top:Math.ceil(y/ratio),
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
				let at=item.props["data-endat"]
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
				let at=item.props["data-endat"]-text.length+len
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
				let at=item.props["data-endat"]
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
				let at=item.props["data-endat"]-text.length+len
				return {id,at}
			}
		}
	}

	lineRects(start,end){
		let {pages,pgGap}=this
		let svg=this.document.canvas.root.querySelector("svg")
		let [,,width,]=svg.getAttribute("viewBox").split(" ").map(a=>parseInt(a))

		const pageXY=n=>{
			let page=pages[n]
			let x=(width-page.size.width)/2+page.margin.left
			let y=pages.slice(0,n)
				.reduce((h,{size:{height}})=>h+height+pgGap,pgGap+page.margin.top)
			return {page,x,y}
		}

		const rect=(x,y,{props:{children:{props:{contentWidth:width,height}},y:y0}})=>{
			return {
				left:Math.ceil(x),
				top:Math.ceil(y+y0),
				right:Math.ceil(x+width),
				bottom:Math.ceil(y+y0+height)
			}
		}

		const inPageLines=(start,end)=>{
			const {page,x,y}=pageXY(start.page)
			if(start.column==end.column){
				let column=page.columns[start.column]
				return column.children
					.slice(start.line,end.line+1)
					.map(l=>rect(x+column.x,y,l))
			}else{
				let column=page.columns[start.column]
				return column.children
					.slice(start.line)
					.map(l=>rect(x+column.x,y,l))
					.concat(//between columns
						page.columns.slice(start.column+1,end.column-1)
							.reduce((lines,column)=>{
								column.children
									.forEach(l=>lines.push(rect(x+column.x,y,l)))
								return lines
							},[])
					)
					.concat(//last column
						(()=>{
							let column=page.columns[end.column]
							return column.children
								.slice(0,end.line+1)
								.map(l=>rect(x+column.x,y,l))
						})()
					)
			}
		}

		const startLines=start=>{
			const {page,x,y}=pageXY(start.page)

			let column=page.columns[start.column]
			return column.children
				.slice(start.line)
				.map(l=>rect(x+column.x,y,l))
				.concat(//between columns
					page.columns.slice(start.column+1)
						.reduce((lines,column)=>{
							column.children
								.forEach(l=>lines.push(rect(x+column.x,y,l)))
							return lines
						},[])
				)
		}

		const endLines=end=>{
			const {page,x,y}=pageXY(end.page)

			return page.columns
				.slice(0,end.column)
				.reduce((lines,column)=>{
					column.children
						.forEach(l=>lines.push(rect(x+column.x,y,l)))
					return lines
				},[])
				.concat(
					(()=>{
						let column=page.columns[end.column]
						return column.children
							.slice(0,end.line+1)
							.map(l=>rect(x+column.x,y,l))
					})()
				)
		}

		const pageLines=pageNo=>{
			const {page,x,y}=pageXY(pageNo)

			return  page.columns.reduce((lines,column)=>{
				column.children.forEach(l=>lines.push(rect(x+column.x, y, l)))
				return lines
			},[])
		}

		if(start.page==end.page){
			return inPageLines(start,end)
		}else{
			return startLines(start)
				.concat(
					(lines=>{
						for(let i=start.page+1;i<end.page;i++){
							lines=lines.concat(pageLines(i))
						}
						return lines
					})([])
				)
				.concat(endLines(end))
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
