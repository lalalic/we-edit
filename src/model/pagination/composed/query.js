import React from "react"

export default class Query{
	constructor(pages, pgGap){
		this.pages=pages
		this.pgGap=pgGap
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

	at(x,y){
		let {pages,pgGap}=this
		let page=(()=>{
			switch(pages.length){
				case 0: return null
				case 1: return pages[0]
				default: {
					let h=pages[0].size.height
					return pages.slice(1).find(({size:{height}})=>h<y<(h+=height))
				}
			}
		})();
		let column=(columns=>{
			switch(columns.length){
				case 0: return null
				case 1: return columns[0]
				default: {
					return columns.find(({x:x0,width})=>x0<x<x0+width)
				}
			}
		})(page.columns);

		let line=((lines,pY)=>{
			return lines.find(({props:{y:y0,height}})=>y0<=pY<=y0+height)
		})(column.children,
			y-pages.slice(0,pages.indexOf(page)).reduce((h,{size:{height}})=>h+=height,0)-page.margin.top
		);

	}

	nextLineAt(x,y){
		let {pages,pgGap}=this
	}

	prevLineAt(x,y){
		let {pages,pgGap}=this
	}
	
	traverse(node, f, right=false){
		let children=React.Children.toArray(node.props.children)
		return !!children[`find${right ? "Last" :""}`](child=>{
			let result=f(child)
			if(result===true){
				return true
			}else if(result===false){
				return false
			}else{
				return !!traverse(child,f,right)
			}
		})
	}
	
	traverseUp(node,f){
		
	}
}
