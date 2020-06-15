import React,{Component} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange} from "we-edit"

export default whenSelectionChange()(
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
