import React, {Component} from "react"
import {connect,ACTION} from "we-edit"
import {compose} from "recompose"

/**
 * To update cursor, selection, and focus shape only when
 * canvas is ready, which means document composed, and be updated in canvas
 * 
 * there are 3 states: [next, current, and last][content,selection]
 * if any of next is different from last or current, should update
 */
export default compose(
    connect(
        state=>({
            content:state.get("content").hashCode(),
            selection:state.get("selection"),
        }),
        undefined,
        undefined,
        {
            withRef:true,
            areStatePropsEqual(a,b){
                return a.content===b.content && a.selection.equals(b.selection)
            }
        }
    ),
)(class WhenSelectionChangeNotifier extends Component{
    constructor(){
        super(...arguments)
        this.state={composedContent:null}
    }

	render(){
        return null
    }

    shouldComponentUpdate({shouldNotify, SelectionStyle, content,selection, canvas, positioning=canvas.positioning},{composedContent}){
        const composedContentIsSynced=content===composedContent
        if(!composedContentIsSynced)
            return false

        const contentAndSelectionIsNotChanged=
            content===this.props.content &&
            selection.equals(this.props.selection) && 
            content===this.last.content &&
            selection.equals(this.last.selection)

        if(contentAndSelectionIsNotChanged)
            return false

        //initialize
        this.style=null

        if(!shouldNotify()){
            return true
        }

        const {cursorAt, ...a}=selection.toJS()
        const {id,at}=a[cursorAt]
        if(!id)
            return true
        this.style=new SelectionStyle(positioning.position(id, at, true), a.start, a.end,positioning)
        return true
    }

    componentDidUpdate(){
        const {props:{dispatch,content,selection}, style}=this
        dispatch(ACTION.Selection.STYLE(style))
        this.last={content, selection}
    }
})


