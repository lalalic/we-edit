import React,{Component} from "react"
import {whenSelectionChange} from "we-edit"

export default whenSelectionChange()(
    class CursorShape extends Component{
        constructor(){
            super(...arguments)
            this.shape=React.createRef()
        }
        render(){
            const {selection, style }=this.props
            const {position:{y = 0, x = 0, height = 0, color = "black"}, isCursor}=selection||{position:{}}
            return (<path ref={this.shape} d={`M${x} ${y} v${isCursor ? height: 0}`} strokeWidth={1} stroke={color} style={style} />)
        }

        componentDidMount(){
            this.componentDidUpdate({})
        }

        componentDidUpdate({selection}){
            if(selection!=this.props.selection && this.props.selection.isCursor){
                const shape=this.shape.current
                if(shape.scrollIntoViewIfNeeded)
                    shape.scrollIntoViewIfNeeded(true)
                else
                    shape.scrollIntoView()
            }
        }
    }
)
