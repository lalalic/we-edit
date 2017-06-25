import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import Waypoint from "react-waypoint"

import Base from "../composed/document"
import {Text} from "model/pagination"

import {ACTION} from "state"
import {getContent,getSelection} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import Selection from "./selection"
import Cursor from "state/cursor"

import offset from "mouse-event-offset"
import getClientRect from "tools/get-client-rect"

export default class extends Component{
    static displayName="composed-document-with-flasher"
    static contextTypes={
        docId: PropTypes.string,
        store: PropTypes.any,
        getCursorInput: PropTypes.func,
        pgGap: PropTypes.number,
        query: PropTypes.func
    }

    static childContextTypes={
        getRatio: PropTypes.func,
        //getWordWrapper:PropTypes.func,
        //positionFromPoint:PropTypes.func
    }

    getChildContext(){
        return {}
        let self=this
        let positionFromPoint=this.positionFromPoint.bind(this)
        return {
            getRatio(){
                return self.ratio
            }

            //,
            //getWordWrapper(style){
            //    return new Text.WordWrapper(style)
            //},
            //positionFromPoint
        }
    }
/*
    positionFromPoint(x0,y0){
        const find=(node,selector)=>{
            if(!node) return null

            let all=node.querySelectorAll(selector)
            for(let i=0,len=all.length,a;i<len;i++){
                let {left,top,right,bottom}=getClientRect(all[i])
                if(left<=x0 && x0<=right && top<=y0 && y0<=bottom){
                    return all[i]
                }
            }

            return null
        }

        let target="g.page,g.line,text".split(",")
            .reduce((scope,selector)=>find(scope,selector),this.root)

        if(!target)
            return null

        const {store,docId}=this.context

        let text=target.textContent
        let {endAt:contentEndIndex, content:contentID}=target.dataset
        let from=contentEndIndex-text.length

        let box=getClientRect(target)
        let x=x0-box.left
        x=x*this.ratio

        const state=store.getState()
        const content=getContent(state, contentID).toJS()
        let style=getContentStyle(state,docId, contentID)
        let wordwrapper=new Text.WordWrapper(style)
        let end=wordwrapper.widthString(x, content.children.substr(from))
        x=wordwrapper.stringWidth(content.children.substr(from,end))
        return {id:contentID, at:from+end, top:box.top, left:box.left+x}
    }
*/
    get root(){
        return this.refs.root
    }

    render(){
        const {isAllComposed, composeMore, pages, ...props}=this.props
        let composeMoreTrigger=null
        if(!isAllComposed()){
            let y=this.context.query().pageY(-1)
            composeMoreTrigger=(
                <Waypoint onEnter={e=>composeMore()} >
                    <g transform={`translate(0 ${y})`}/>
                </Waypoint>
            )
        }else{
            delete props.minHeight
        }

        let done=null

        return (
            <div ref="root">
                <Base {...props} pages={pages}
                    onClick={e=>{
                        if(done==e.timeStamp)
                            return

                        this.onClick(e)
                    }}
                    onMouseUp={e=>{
                        let sel=this.documentSelection()
                        if(sel.type=="Range"){
                            this.onSelect(sel)
                            done=e.timeStamp
                        }
                    }}
                    onPageHide={e=>this.updateCursorAndSelection()}
                    onPageShow={e=>this.updateCursorAndSelection()}>
                    {composeMoreTrigger}

                    <Cursor onRef={a=>this.cursor=a}/>
                    <Selection onRef={a=>this.selection=a}
                        onMove={this.onMove.bind(this)}
                        onResize={this.onResize.bind(this)}
                        onRotate={this.onRotate.bind(this)}
                        />
                </Base>
            </div>
        )
    }

    documentSelection(){
        return window.getSelection()||document.getSelection()
    }

    componentDidUpdate(){
        this.updateCursorAndSelection()
    }

    componentDidMount(){
        let svg=this.root.querySelector("svg")
        let width=svg.getAttribute("width")
        let [,,viewBoxWidth]=svg.getAttribute("viewBox").split(" ").map(a=>parseInt(a))
        this.ratio=viewBoxWidth/width
        this.getClientRect=()=>svg.getBoundingClientRect()

        this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
    }

    updateCursorAndSelection(){
        this.cursor.forceUpdate()
        this.selection.forceUpdate()
    }

    active(){
        let {docId, store}=this.context
        let {active}=getSelection(store.getState())
        if(active!=docId)
            store.dispatch(ACTION.Cursor.ACTIVE(docId))
    }

    onRotate(e){
        this.context.store.dispatch(ACTION.Entity.ROTATE(e))
    }

    onResize(e){
        this.context.store.dispatch(ACTION.Entity.RESIZE(e))
    }

    onMove({id,at}){
        this.context.store.dispatch(ACTION.Selection.MOVE(id,at))
    }

    onClick(e){
        const dispatch=this.context.store.dispatch
        const docId=this.context.docId
        const $=this.context.query()
        const target=e.target

        switch(target.nodeName){
        case 'text':
            let text=target.textContent
            let {endAt, content:id}=target.dataset
            let [x]=offset(e, target)

            const wordwrapper=new Text.WordWrapper($.getComposer(id).props)
            let end=wordwrapper.widthString(x*this.ratio, text)
            let at=endAt-text.length+end

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
        break
        case "image":
            dispatch(ACTION.Selection.SELECT(target.dataset.content,-1))
        break
        }

        this.active()
    }

    onSelect(selection){
        const dispatch=this.context.store.dispatch
        const $=this.context.query()
        const locate=a=>{
            let node=selection[`${a}Node`].parentNode
            return {
                id:node.dataset.content,
                at:node.dataset.endAt-node.textContent.length+selection[`${a}Offset`]
            }
        }

        let first=locate("anchor")
        let {left:left0,top:top0}=$.position(first.id, first.at)
        let end=locate("focus")
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
