import React,{Fragment} from "react"
import PropTypes from "prop-types"

import Base from "../document"

import {ACTION, Cursor, getContent, getClientRect,editify} from "we-edit"
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
			query(){
				return {
					position(id,at){
						return {
							top:100,
							left:300,
							id,
							at
						}
					},
					prevLine(){
						
					},
					nextLine(){
						
					}
				}
			}
		}
	}

	render(){
		const {canvas, ...props}=this.props
        return (
			<Fragment>
				<div
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
							<div style={{width:1,height,top,left,background:color}}/>
						)}
						/>
				</div>
				{canvas ? React.cloneElement(canvas,{content:<Base {...props}/>}) : null}
			</Fragment>
		)
    }
	
	documentSelection(){
        return window.getSelection()||document.getSelection()
    }
	
	onClick(e){
		const target=e.target
		switch(target.nodeName){
			case "img":
			break
			default:{
				debugger
				let text=target.textContent
				let {endat, content:id}=target.dataset
				let [x]=offset(e, target)
				this.context.store.dispatch(ACTION.Cursor.AT(id,at))
			}
		}
		
	}
	
	onSelect(e){
		let sel=this.documentSelection()
		debugger
	}
}
