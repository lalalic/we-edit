import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {getSelection,getContentStyle,getNode} from "state/selector"

import {Text} from "model/pagination"

import offset from "mouse-event-offset"
import getClientRect from "tools/get-client-rect"

export class Selection extends Component{
	static displayName="selection"
	static propTypes={
		start:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}).isRequired,
		end:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}).isRequired,
		getRatio: PropTypes.func
	}

	static contextTypes={
		docId: PropTypes.any,
		store: PropTypes.any,
		getRatio: PropTypes.func
	}
	path=""
	render(){
		return <path
				d={this.path}
				fill="lightblue"
				style={{fillOpacity:0.5}}
				onClick={e=>{
					let path=e.target

					let [x,y]=offset(e,path)
					let o=getClientRect(path)
					x+=o.left
					y+=o.top

					path.setAttribute("d","")
					let found=document.elementFromPoint(x,y)
					found.dispatchEvent(new MouseEvent("click",{
						clientX:x,clientY:y,
						view:window,
						bubbles:true,
						cancelable:true
					}))
				}}
				/>
	}

	componentWillReceiveProps({start,end},{docId,store,getRatio}){
		if(start.id==end.id && start.at==end.at){
			this.path=""
			return
		}

		let ratio=getRatio()
		let state=store.getState()

		const x=(node,id,at)=>{
			let left=getClientRect(node).left
			let style=getContentStyle(state,docId,id)
			let text=node.textContent
			let from=node.dataset.endAt-text.length

			let wordwrapper=new Text.WordWrapper(style)
			let width=wordwrapper.stringWidth(text.substring(0,at-from))
			if(ratio)
				width=width/ratio
			return left+width
		}

		let firstNode=getNode(docId, start.id, start.at)
		let lastNode=getNode(docId, end.id, end.at)

		const line=n=>{
			while(n.getAttribute("class")!="line")
				n=n.parentNode
			return n
		}
		let firstLine=line(firstNode)
		let lastLine=line(lastNode)
		while(firstLine.parentNode!=lastLine.parentNode){
			firstLine=firstLine.parentNode
			lastLine=lastLine.parentNode
		}

		if(firstLine==lastLine){
			let x0=x(firstNode,start.id,start.at)
			let x1=x(lastNode, end.id, end.at)
			let {top,height}=getClientRect(firstLine)
			return `M${x0} ${top} L${x1} ${top} L${x1} ${top+height} L${x0} ${top+height} L${x0} ${top}`
		}else{
			let all=firstLine.parentNode.children
			const indexOf=(aa,a)=>{
				for(let i=0,len=aa.length;i<len;i++)
					if(aa[i]==a)
						return i
				return -1
			}

			let lines=[]
			for(let i=indexOf(all,firstLine),l=indexOf(all,lastLine);i<=l;i++){
				lines.push(all[i])
			}

			let {path,l}=lines.reduce((route, l, i)=>{
				let {left,top,right,bottom}=getClientRect(l)
				let t
				switch(i){
				case 0:
					t=x(firstNode,start.id, start.at)
					route.path.push(`M${t} ${top}`)
					route.path.push(`L${right} ${top} L${right} ${bottom}`)
					route.l.unshift(`L${t} ${bottom} L${t} ${top}`)
				break
				case lines.length-1:
					t=x(lastNode,end.id, end.at)
					route.path.push(`L${t} ${top} L${t} ${bottom}`)
					route.l.unshift(`L${left} ${bottom} L${left} ${top}`)
				break
				default:
					route.path.push(`L${right} ${top} L${right} ${bottom}`)
					route.l.unshift(`L${left} ${bottom} L${left} ${top}`)
				break
				}

				return route
			},{path:[],l:[]})

			path.splice(path.length,0,...l)
			this.path=path.join(" ")
		}
	}

}

export default connect(state=>getSelection(state))(Selection)
