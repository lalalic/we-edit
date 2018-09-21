import React from "react"
import {Document as ComposedDocument,Text as ComposedText, Line as ComposedLine} from "../composed"
import {ContentQuery, getClientRect} from "we-edit"
import memoize from "memoize-one"

const NOT_FOUND={left:-9999,top:0}
export default class Query{
	constructor(document,state,pageGap,scale){
		this.document=document
		this.state=state
		this.pgGap=pageGap
		this.scale=scale
		this.pages=document.computed.composed
		this.canvasWidth=this.pages.reduce((a,{size:{width}})=>Math.max(a,width),0)
	}

	get svg(){
		if(!this._svg){
			let canvas=this.document.canvas
			if(canvas && canvas.svg)//it must be dynamic for viewport render
				return this._svg=canvas.svg.getBoundingClientRect()
			else
				return this._svg={left:0,top:0}
		}

		return this._svg
	}

	/**already composed content y*/
	get y(){
		return this._y=this._y||(()=>{
			const {pages,pgGap}=this
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
			})();
	}

	toCanvasCoordinate(...viewportNumbers){
		const to=a=>a/this.scale
		return viewportNumbers.length==1 ? to(viewportNumbers) : viewportNumbers.map(to)
	}

	toViewportCoordinate(...canvasNumbers){
		const to=a=>a*this.scale
		return canvasNumbers.length==1 ? to(canvasNumbers) : canvasNumbers.map(to)
	}

	pageY(which){
		let {pages,pgGap}=this
		return pages.slice(0,which)
			.reduce((h,{size:{height}})=>h+height+pgGap,pgGap)
	}

	getComposeType(id){
		const composer=this.getComposer(id)
		if(composer){
			return composer.getComposeType()
		}
		return null
	}

	getCanvasRect(id){
		let node=this.document.canvas.svg.querySelector(`[data-content="${id}"]`)
		if(node==null)
			return null
		let {left,right,top,bottom,height,width}=getClientRect(node)
		left=left-this.svg.left
		top=top-this.svg.top
		right=right-this.svg.left
		bottom=bottom-this.svg.top;

		[left,right,top,bottom,height,width]=this.toCanvasCoordinate(left,right,top,bottom,height,width);

		return {left,right,top,bottom,height,width}
	}

	_pageMarginRight(n){
		let width=this.canvasWidth
		let page=this.pages[n]
		return (width-page.size.width)/2+page.margin.left
	}

	at(x,y/*clientX, clientY*/){
		x=this.toCanvasCoordinate(x-this.svg.left)
		y=this.toCanvasCoordinate(y-this.svg.top)
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

		let top=this.pageY(pageNo)+page.margin.top+line.props.y

		let id=piece.props["data-content"]
		let from=piece.props["data-endat"]
		let text=piece.props.children.join("")


		let measure=this.getComposer(id).measure
		let end=measure.widthString(offsetX, text)
		offsetX=offsetX-measure.stringWidth(text.substr(0,end))
		let left=x-offsetX
		return {
			id,
			at: from+end,
			page: pageNo,
			column: columnNo,
			line: lineNo,
			left: left,
			top: top,
		}
	}

	getComposer(id){
		return this.document.composers.get(id)
	}

	isTextNode(id){
		return this.getComposeType(id)==="text"
	}

	_locate(id,at){
		const isComposableNode=id=>!!this.getComposeType(id)
		const isTextNode=this.isTextNode(id)
		const isContainerNode=id=>!(this.getComposer()||{noChild:false}).noChild

		if(isContainerNode(id)){
			const $=this.getContent(id)
			if(at==0){
				//get first composed node
				let found=$.findFirst(a=>isComposableNode(a.get("id")))
				if(found){
					id=found.attr('id')
				}
			}else if(at==1){
				//get last composed node
				let found=$.findLast(a=>isComposableNode(a.get("id")))

				if(found){
					id=found.attr("id")
				}
			}
		}

		let columnNo,lineNo,node, path=[]
		let pageNo=this.pages.findIndex(page=>{
			this.traverse(page,function({type,props},parent,index){
				let pi=path.indexOf(parent)
				if(pi!=-1){
					const isSameParantAsLastTraverse=pi==path.length-1
					if(!isSameParantAsLastTraverse){//not same level, it must go back to upper level, so move path
						path.splice(pi)
					}
				}else{//go to next level
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
				}else{
					if(!isTextNode){
						if(props && props["data-content"]==id){
							node=arguments[0]
							path.push(node)
							return true
						}
					}
				}
			})
			return !!node
		})

		if(!isComposableNode(id) &&  at==1){//if it has multiple lines, it has to be the last line location
			//to find the same path level's next siblings
			const [page, column]=path

		}

		return {page:pageNo,column:columnNo,line:lineNo, inline:node, path}
	}

	_xy(path){
		const inlineX=path.filter(a=>a.type==ComposedLine)//may be nested, so reduce
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

		let [page,column]=path
		let {pages,pgGap}=this

		let x=(this.canvasWidth-page.size.width)/2 //left svg blank
				+page.margin.left
				+inlineX

		let y=pgGap
				+page.margin.top
				+pages.slice(0,pages.indexOf(page)).reduce((y,{size:{height}})=>y+=(pgGap+height),0)

		let line=path.findLast(a=>a.type==ComposedLine)
		if(line){
			y=y+line.props.height
			let descent=line.props.children.reduce((h,{props:{descent=0}})=>Math.max(h,descent),0)
			y=y-descent
		}

		const e=(a,w='x')=>{
			if(w in a)
				return a[w]
			else if(a.props && w in a.props)
				return a.props[w]
			else
				return 0
		}

		return path.reduce((state,a)=>{
				state.x+=e(a,'x')
				state.y+=e(a,'y')
				return state
			},{x,y});
	}

	position(id,at){//return left:clientX, top:clientY
		const {page,column,line, inline, path}=this._locate(id,at)

		if(!inline){
			return;
		}

		let position={id,at,path,page,column,line}

		let {x,y}=this._xy(path)

		if(this.isTextNode(id)){
			//const {children, ["data-endat"]:endat, id}=inline.props
			let from=inline.props["data-endat"]-inline.props.children.join("").length
			let composer=this.getComposer(id)
			let {children:text,...props}=composer.props
			let measure=composer.measure
			let {height,descent,fontSize, fontFamily}=measure.defaultStyle

			x+=measure.stringWidth(text.substring(from,at))

			y=y-height+descent

			Object.assign(position,{
				height:this.toViewportCoordinate(height),
				descent:this.toViewportCoordinate(descent),
				fontFamily,
				fontSize,
			})
		}else{
			if(at==1){//end of entity
				let last=path[path.length-1]
				x+=last.props.width
				y+=last.props.height
			}
		}

		return Object.assign(position,{
			left:Math.ceil(this.toViewportCoordinate(x))+this.svg.left,
			top:Math.ceil(this.toViewportCoordinate(y))+this.svg.top,
			canvasLeft:Math.ceil(x),
			canvasTop:Math.ceil(y),
		})
	}

	nextLine({page:pageNo,column:colNo,line:lineNo,left}/*usually returned from .postion*/){
		left=this.toCanvasCoordinate(left)
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

		let width=this.canvasWidth
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
				let measure=composer.measure
				let len=measure.widthString(left-x,text)
				let at=item.props["data-endat"]-text.length+len
				return {id,at}
			}
		}
	}

	prevLine({page:pageNo,column:colNo,line:lineNo,left}/*usually returned from .postion*/){
		left=this.toCanvasCoordinate(left)
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

		let width=this.canvasWidth
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
				let measure=composer.measure
				let len=measure.widthString(left-x,text)
				let at=item.props["data-endat"]-text.length+len
				return {id,at}
			}
		}
	}

	lineRects(start,end/*usually returned from .postion*/){
		let {pages,pgGap}=this
		let width=this.canvasWidth

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

		const linesOfRangePage=(start,end)=>{
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

		const linesOfStartPage=start=>{
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

		const linesOfEndPage=end=>{
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

		const linesOfWholePage=pageNo=>{
			const {page,x,y}=pageXY(pageNo)

			return  page.columns.reduce((lines,column)=>{
				column.children.forEach(l=>lines.push(rect(x+column.x, y, l)))
				return lines
			},[])
		}

		if(start.page==end.page){
			return linesOfRangePage(start,end)
		}else{
			return linesOfStartPage(start)
				.concat(
					(lines=>{
						for(let i=start.page+1;i<end.page;i++){
							lines=lines.concat(linesOfWholePage(i))
						}
						return lines
					})([])
				)
				.concat(linesOfEndPage(end))
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

	get content(){
		return this.getContent()
	}

	getContent=memoize(id=>new ContentQuery(this.state,id ? `#${id}` : null))

	asSelection({page,column,line,id,path}){
		let self=this
		const fromContent=type=>{
			let $=self.getContent(id)
			let props=$.is(type) ? $.props() : $.closest(type).props()
			return props ? props.toJS().props : null
		}
		return self.selection={
			props(type,bContent=true){
				if(bContent){//from content in state
					return fromContent(type)
				}

				let reType=new RegExp(type,"i")
				if(reType.test("page")){
					return {
						page,
						column,
						line,
						get pageY(){
							return self.pageY(page)
						}
					}
				}

				let found=path.find(a=>!!a.props && reType.test(a.props["data-type"]))
				if(found){
					let composer=self.getComposer(found.props["data-content"])
					if(composer){
						return composer.props
					}
				}

				return fromContent(type)
			}
		}
	}
}
