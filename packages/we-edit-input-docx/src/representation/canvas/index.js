import React,{Component} from "react"
import memoize from "memoize-one"

import {whenSelectionChange,ACTION, stateSafe} from "we-edit"

import {Responsible} from "./base"
import Reducer from "../../event"

export default class DocxCanvas extends Responsible{
    render(){
        const rendered=super.render()
        return React.cloneElement(rendered, {children:[
            <ToCSelection key="tocSelection"/>,
            <FieldSelection key="fieldSelection"/>,
            rendered.props.children, 
            <style key="style">{`svg g[data-type=hyperlink] text{cursor:pointer!important}`}</style>,
        ]})
    }

    componentDidUpdate(){
        const {props:{document}}=this
        if(document.state.composeAll && document.tocNeedPage()){
            this.dispatch(ACTION.Entity.UPDATE({document:{numpages:{canvas:stateSafe(this)}},id:'root'}))
        }
        super.componentDidUpdate(...arguments)
    }

    static SelectionStyle=class extends Responsible.SelectionStyle{
        isInField=memoize(()=>{
            if(this.isCursor){
                const state=this.positioning.responsible.context.activeDocStore.getState()
                const reducer=new Reducer(state.set('_content',state.get('content')))
                const field=reducer.isInRegion('field')
                if(field)
                    return field
            }
        })

        isInTOC=memoize(()=>{
            let $target=this.getContent(this.start.id)
            if($target.is('ToC') || ($target=$target.closest('ToC')).length==1){
                return $target
            }
        })
    }
}

const FieldSelection=whenSelectionChange(({selection},state)=>{
    const field=selection?.isInField()
    if(field){
        let rects=null
        const id=field.attr('id')
        if(field.attr('type')=='field'){
            rects=selection.positioning.getRangeRects({id,at:0},{id,at:1})
        }else{//complex field
            rects=selection.positioning.getRangeRects({id,at:0},{id:`end${id}`,at:1})
        }
        const d=(rects||[]).map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ");
        return {d}
    }
    return {}
})(({d})=><path fill="lightgray" style={{fillOpacity:0.5}} d={d}/>)

const ToCSelection=whenSelectionChange(({selection},state)=>{
    const toc=selection?.isInTOC()
    if(toc){
        const id=toc.attr('id')
        const rects=selection.positioning.getRangeRects({id,at:0},{id,at:1})
        const d=(rects||[]).map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ");
        return {d}
    }
    return {}
})(({d})=><path fill="lightgray" style={{fillOpacity:0.5}} d={d}/>)