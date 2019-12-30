import React,{Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connect,getSelectionStyle} from "we-edit"
import {Editors} from "we-edit-representation-html"
const {Group, }=Editors

const ResponsibleCanvas=Editors.Document.defaultProps.canvas.type

class LineCanvas extends ResponsibleCanvas.Canvas{
    positionPages(){
        const {props:{margin:{top=0}}, pages:[{lines}]}=this.props.document
        return (
            <Fragment>
                {super.positionPages(...arguments)}
                <Group y={top}>
                    <LineNos count={lines.length} lineHeight={lines[0].props.height}/>
                </Group>
            </Fragment>
            
        )
    }
}

export default class LineResponsibleCanvas extends ResponsibleCanvas{
    static Canvas=LineCanvas
}

class LineNos extends Component{
    static contextTypes={
        fonts: PropTypes.string,
        size: PropTypes.number,
        lineHeight: PropTypes.string,
        activeColor: PropTypes.string,
        measure: PropTypes.object,
    }
    render(){
        const {count, lineHeight}=this.props
        const {fonts, size,activeColor,measure}=this.context
        const baseline=measure.defaultStyle.height-measure.defaultStyle.descent  
        const lineNoWidth=measure.stringWidth("999")+2
        return (
                <Fragment>
                    <ActiveLineNo height={lineHeight} fill={activeColor}/>
                    <g style={{opacity:0.5}} fontFamily={fonts} fontSize={`${size}pt`}>
                        <rect width={lineNoWidth} height={count*lineHeight} fill="lightgray"/>
                        {new Array(count).fill(0).map((a,i)=>
                            (<text key={i} x={lineNoWidth-measure.stringWidth(i+1)-2} y={i*lineHeight+baseline}>{i+1}</text>)
                        )}
                    </g>
                </Fragment>
            )
    }
}

const ActiveLineNo=connect(state=>{
    const selection=getSelectionStyle(state)
	if(selection){
        if(selection.isRange)
            return {isRange:true}
		const page=selection.props("page")
		if(page){
			return {active:page.line}
		}
	}
	return {}
})(({dispatch,active,height,isRange, ...props})=>(
    isRange ? null :
    <rect {...{...props,height,y:active*height,width:99999,style:{opacity:0.5, cursor:"text"}}}/>
))
