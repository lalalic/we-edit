import React,{Fragment, Component} from "react"
import PropTypes from "prop-types"

import Base from "../document"
import Query from "./query"

import {ACTION, Cursor, Selection, getContent, getClientRect,editify} from "we-edit"
import {HTMLMeasure} from "we-edit-representation-pagination/measure"
import offset from "mouse-event-offset"

export default class Document extends editify(Base){
	static contextTypes={
		store:PropTypes.any,
		docId:PropTypes.any
	}

	static childContextTypes={
		query: PropTypes.func
	}

	getChildContext(){
		return {
			query: this.query.bind(this)
		}
	}

	query(){
		return new Query(this, this.context.store.getState())
	}

	render(){
		const {canvas, ...props}=this.props
		const dispatch=this.context.store.dispatch

        return (
				<div
					ref={a=>this.root=a}
					onClick={e=>{
						if(this.eventAlreadyDone==e.timeStamp)
							return

						this.onClick(e)
					}}

					onMouseUp={e=>{
						let sel=this.documentSelection()
						if(sel.type=="Range"){
							this.onSelect(sel)
							this.eventAlreadyDone=e.timeStamp
						}
					}}
					>
					<Base {...props}/>
					<Cursor
						ref={a=>this.cursor=a}
						render={({top=0,left=0,height=0,color="black"})=>(
							<div style={{position:"absolute",width:1,height,top,left,background:color}}/>
						)}
						/>
					<Selection ref={a=>this.selection=a}>
						<SelectionShape/>
					</Selection>
				</div>
		)
    }

	active(){
        let {docId, store}=this.context
        let {active}=getSelection(store.getState())
        if(active!=docId)
            store.dispatch(ACTION.Cursor.ACTIVE(docId))
    }

	componentDidMount(){
		//this.root.setAttribute("contenteditable",true)
		this.active()
		this.updateCursorAndSelection()
	}

	componentDidUpdate(){
		this.updateCursorAndSelection()
	}


	updateCursorAndSelection(){
        this.cursor && this.cursor.forceUpdate()
        this.selection && this.selection.forceUpdate()
    }


	documentSelection(){
        return window.getSelection()||document.getSelection()
    }

	onClick(e){
		const dispatch=this.context.store.dispatch
		const target=e.target
		const $=this.query()
		switch(target.nodeName){
			case "img":
				dispatch(ACTION.Selection.SELECT(target.dataset.content,-1))
			break
			default:{
				let {focusOffset:at, focusNode:{parentElement:{dataset:{content:id}}}}=this.documentSelection()
				if(!e.shiftKey){
					dispatch(ACTION.Cursor.AT(id,at))
				}else{
					let {end}=getSelection(this.context.store.getState())
					let {left,top}=$.position(id,at)
					let {left:left1,top:top1}=$.position(end.id,end.at)
					if(top<top1 || (top==top1 && left<=left1)){
						dispatch(ACTION.Selection.START_AT(id,at))
					}else{
						dispatch(ACTION.Selection.SELECT(end.id, end.at, id, at))
					}
				}
			}
		}
		this.active()
	}

	onSelect(selection){
		const dispatch=this.context.store.dispatch
        const $=this.query()
        const locate=a=>{
            let node=selection[`${a}Node`].parentNode
            return {
                id:node.dataset.content,
                at:selection[`${a}Offset`]
            }
        }

        let first=locate("anchor"), end=locate("focus")
        let {left:left0,top:top0}=$.position(first.id, first.at)
        let {left:left1,top:top1}=$.position(end.id, end.at)

        const forward=a=>{
            dispatch(ACTION.Selection.SELECT(first.id,first.at,end.id,end.at))
            dispatch(ACTION.Selection.END_AT(end.id,end.at))
        }

        const backward=a=>{
            dispatch(ACTION.Selection.SELECT(end.id,end.at,first.id,first.at))
            dispatch(ACTION.Selection.START_AT(end.id,end.at))
        }

        if(top0>top1){
            backward()
        }else if(top0<top1){
            forward()
        }else if(top0==top1){
            if(first.id!=end.id){
                if(left0<left1){
                    forward()
                }else{
                    backward()
                }
            }else{
                if(first.at<end.at){
                    forward()
                }else{
                    backward()
                }
            }
        }
		this.active()
	}
}

class SelectionShape extends Component{
	static contextTypes={
		query: PropTypes.func
	}

	rects(){
		const {start,end, getContent}=this.props
		if(start.id==end.id && start.at==end.at && getContent(start.id).type=="text")
			return []
			
		let range=document.createRange()
		const set=({id,at}, A)=>{
			if(getContent(id).type=="text"){
				range[`set${A}`](document.querySelector(`[data-content="${id}"]`).firstChild,at)
			}else{
				range[`set${A}`](document.querySelector(`[data-content="${id}"]`))
			}
		}
		set(start,"Start")
		set(end, "End")
		let rects=range.getClientRects()
		let data=[]
		for(let i=0,len=rects.length;i<len;i++){
			data.push(rects[i])
		}
		return data
	}

	render(){
		const {start,end, getContent}=this.props
		if(start.id==end.id && start.at==end.at && getContent(start.id).type=="text")
			return null

		return (
			<Fragment>
				<div style={{position:"fixed",top:10,left:10,background:"red"}}>
					{JSON.stringify(start)} -- {JSON.stringify(end)}
				</div>
				{
					this.rects().map(({top,left,width,height},i)=>{
						return <div key={i} style={{position:"absolute",left,top,width,height,background:"blue",opacity:0.5}}/>
					})
				}
			</Fragment>
		)
	}

	componentDidUpdate(){
		return
		const {start,end, getContent}=this.props
		if(start.id==end.id && start.at==end.at && getContent(start.id).type=="text")
			return
		let selection=document.getSelection()
		selection.empty()
		let range=document.createRange()
		const set=({id,at}, A)=>{
			if(getContent(id).type=="text"){
				range[`set${A}`](document.querySelector(`[data-content="${id}"]`).firstChild,at)
			}else{
				range[`set${A}`](document.querySelector(`[data-content="${id}"]`))
			}
		}
		set(start,"Start")
		set(end, "End")
		let rects=range.getClientRects()
		selection.addRange(range)
	}
}
