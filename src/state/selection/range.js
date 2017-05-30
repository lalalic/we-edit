import React, {Component, PropTypes} from "react"
import offset from "mouse-event-offset"
import getClientRect from "tools/get-client-rect"
import Overlay from "./overlay"
import Mover from "./mover"

export default class Range extends Component{
    static contextTypes={
        positionFromPoint: PropTypes.func
    }

    state={}
    render(){
        const {path}=this.props
        const {move}=this.state
        let overlay
        if(move){
            overlay=(
                <Overlay cursor="default"
                    onMouseUp={e=>this.onEndMove()}
                    onMouseMove={e=>this.move(e.clientX, e.clientY)}
                    >
                    <Mover ref={a=>this.mover=a} cursor="default"/>
                </Overlay>
            )
        }
        return (
            <g>
                <path d={path}
                    fill="lightblue"
				    style={{fillOpacity:0.5}}
                    onMouseDown={this.onStartMove.bind(this)}
                    onClick={this.click.bind(this)}
                    />
                {overlay}
            </g>
        )
    }

    onStartMove(){
        this.setState({move:true})
    }

    onEndMove(){
        let {id,at}=this.mover.state
        this.setState({move:undefined},()=>{
            if(id)
                this.props.onMove(id,at)
        })
    }

    move(x,y){
        let pos=this.context.positionFromPoint(x,y)
		if(!pos)
			pos={id:undefined,left:x, top:y}

		this.mover.setState(pos)
    }

    click(e){
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
    }
}
