
import React,{Component, Fragment} from "react"
import Top from "../../composed/responsible-canvas/top"
import Resizable from "../../composed/responsible-canvas/resizable"

export default class Resizer extends Component{
	constructor(){
		super(...arguments)
		this.state={resizing:false}
	}
	render(){
		const {resizing}=this.state
		const {onResize,direction,d=direction=="ew" ? 'y' :'x',cursor,children,...props}=this.props
		return (
            <Fragment>
                <Resizable
                    direction={direction}
                    onStart={e=>this.setState({resizing:true})}
                    onEnd={e=>this.setState({resizing:false})}
                    onResize={onResize}>
                    <line {...props} stroke={"transparent"} strokeWidth={5} style={{cursor}}/>
                </Resizable>
                {resizing && (
                    <Top>
                        <line {...{...props,[d+'1']:"-100%", [d+'2']:"100%"}}
                            stroke="lightgray"
                            strokeWidth={1}
                            strokeDasharray="5,5"/>
                    </Top>
                )}
            </Fragment>
		)
	}
}

export const ColResizer=props=><Resizer {...props} direction="ew" cursor="col-resize"/>
export const RowResizer=props=><Resizer {...props} direction="-ns" cursor="row-resize"/>
	
	