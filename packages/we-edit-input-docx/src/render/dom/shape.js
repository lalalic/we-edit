import React, {Component} from "react"
import memoize from "memoize-one"
import PropTypes from "prop-types"

export default ({Shape})=>class extends Component{
    static displayName="shape"
    static contextTypes={
		style: PropTypes.object,
    }

    static childContextTypes={
        style: PropTypes.object,
    }

    childStyle=memoize((direct,context)=>{
		return direct ? direct.inherit(context) : context
	})

    getChildContext(){
        return {
            style:this.props.textStyle?this.props.textStyle.inherit(this.context.style):this.context.style
        }
    }

    render(){
        return (<Shape {...this.props}/>)
    }

    static asStyle(props){
        return Object.assign(new ShapeStyle(props).flat(),{_raw:props})
    }
}



class Style{
    constructor(style,keys,...directs){
        const drFn=k=>k
        this.flat=()=>Object.keys(style)
            .reduce((props, k)=>{
                const fn=this[k]||(directs.includes(k)&&drFn)
                if(fn){
                    let v=fn.bind(this)(style[k],props, style)
                    if(v!=undefined && v!=props){
                        const name=keys[k]||k
                        props[name]=v
                    }
                }

                return props
            },{})
    }

    got(props,key){
        return props[key]||(props[key]={})
    }
}

class ShapeStyle extends Style{
    constructor(style){
        super(style,{
            anchor:"vertAlign",
            ln:"outline",
            bodyPr:"textStyle",
        },"geometry","solidFill","rotate", "textStyle")
        const _flat=this.flat.bind(this)
        this.flat=()=>{
            const props=_flat()
            if(props.outline && props.outline.noFill){
                const {width=0,half=width/2}=props.outline
                const {left=0,right=0,bottom=0,top=0}=this.got(props,"margin")
                props.margin={left:left+half,right:right+half,bottom:bottom+half,top:top+half}
                delete props.outline
            }
            return props
        }
    }

    anchor(v){
        return {b:"bottom",ctr:"middle",t:"top", dist:"distributed",just:"justified"}[v]
    }

    xfrm=(a, props)=>Object.assign(props, a)

    blipFill=({blip, ...props})=>({...blip, ...props})

    ln({w:width,...props}){
        return {width,...props}
    }

    bodyPr(style, props){
		const {margin,}=new TextBoxStyle(style).flat()
        props.margin=margin
    }

	textStyle(style,props){
		Object.assign(this.got(props,"textStyle"),style)
	}


}

class TextBoxStyle extends Style{
    constructor(style){
        super(style,{})
        const margin=k=>((v,props)=>{this.got(props,"margin")[k]=v})
        this.rIns=margin("right")
        this.tIns=margin("top")
        this.lIns=margin("left")
        this.bIns=margin("bottom")
    }
}
