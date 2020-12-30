import React,{Component} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange, whenSelectionChangeDiscardable} from "we-edit"

export const CursorShape=whenSelectionChange()(
    class CursorShape extends Component{
        static contextTypes={
            precision: PropTypes.number
        }
        constructor(){
            super(...arguments)
            this.shape=React.createRef()
        }
        render(){
            const {selection, style }=this.props
            const {precision=1}=this.context
            const {position:{y = 0, x = 0, height = 0, color = "black"}, isCursor, isFocusable}=selection||{position:{}}
            return (<path ref={this.shape} d={`M${x} ${y} v${isCursor ? height: (isFocusable ? 1*precision : 0)}`} strokeWidth={1*precision} stroke={color} style={style} />)
        }

        componentDidMount(){
            this.componentDidUpdate({})
        }

        componentDidUpdate(prev){
            const selection=this.props.selection
            if(prev.selection!=selection && selection && (selection.isCursor || selection.isFocusable)){
                if(selection.isSelectionChanged(prev.selection)){
                    const shape=this.shape.current
                    const {width,height}=shape.getBoundingClientRect()
				    if(height!=0){
                        if(shape.scrollIntoViewIfNeeded)
                            shape.scrollIntoViewIfNeeded(true)
                        else
                            shape.scrollIntoView()
                    }
                }
            }
        }
    }
)

export const WorkerCursor=whenSelectionChangeDiscardable()(
    class WorkerCursor extends Component{
        static contextTypes={
            precision: PropTypes.number,
        }
        render(){
            const {props:{name,selection, start,end,dispatch, ...props}, context:{ precision}}=this
            const {x=0,y=0,height=0}=(end?.id && start?.id==end.id && start.at==end.at) && selection?.positioning.position(end) || {}
            return (
                <g {...props}>
                    <text {...{x,y,fontFamily:"Arial",fontSize:10}}>{name}</text>
                    <path d={`M${x} ${y} v${height}`} strokeWidth={1*precision}/>
                </g>
            )
        }
    }
)