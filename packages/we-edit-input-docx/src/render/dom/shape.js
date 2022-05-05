import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Shape, Frame, Template})=>class __$1 extends Component{
    static displayName="shape"
    static contextTypes={
		styles: PropTypes.object,
        representation: PropTypes.string,
    }

    static childContextTypes={
        style: PropTypes.object,
    }

    getChildContext(){
        return {
            style:this.context.styles['*']
        }
    }
    
    render(){
        if(this.context.representation!="pagination")
            return (<Shape {...this.props}/>)

        const {
            children:frame, 
            xfrm:{width,height, rotate},
            geometry,
            ln:{w:lineWidth=0,solidFill:color="black", gradFill:lnGradFill, noFill,...outline}={},
            bodyPr:{lIns:left=0,rIns:right=0,bIns:bottom=0,tIns:top=0}={},
            pattFill,blipFill,gradFill,solidFill,
            autofit, 
            anchor,
            id,hash,
            ...props}=this.props

        const children= frame?.[0] && React.cloneElement(frame?.[0],{
            x:left+lineWidth/2,y:top+lineWidth/2,
            width:width-lineWidth-left-right,
            height:height-lineWidth-top-bottom,
            vertAlign:({b:"bottom",ctr:"middle",t:"top", dist:"distributed",just:"justified"}[anchor]),
        })

        return (
            <Shape {...{
                    id,hash,
                    geometry:this.getGeometry(geometry,{width,height}),
                    outline:{
                        color, 
                        width:lineWidth,
                        gradient:this.shapeGradient(lnGradFill),
                        ...this.shapeLine(outline),
                    },
                    fill:{
                        color:solidFill,
                        pattern:this.shapePattern(pattFill), 
                        picture:this.shapePicture(blipFill),
                        gradient:this.shapeGradient(gradFill),
                    },
                    autofit,
                    autofitHeight:height-lineWidth-top-bottom,
                    children,
                    rotate
                }}/>
        )


        switch(autofit?.type){
            case "block":
                return (<Shape {...props}/>)
            case "font":{
                return <Shape.AutoFitManager><Shape {...this.props}/></Shape.AutoFitManager>
            }
        }
    }

    getGeometry(geometry,size){
        if(-1!=geometry.trim().indexOf(" "))
            return geometry
        const {width,height}=size
        switch(geometry){
            case "ellipse":
                return {type:"ellipse",rx:width/2, ry:height/2,cx:width/2,cy:height/2}
            default:
                return {type:"rect",...size}
        }
    }

    shapeLine({cap, miter, bevel, round, }){
        return {cap, join: bevel ? "bevel" : !miter ? "round" : "miter"}
    }

    shapePattern(pattern){
        if(!arguments[0])
            return 
        const {bgClr:{color:background}, fgClr:{color:foreground}, prst}=pattern
        return {
            background,
            foreground,
            pattern:{
                path:Shape.Geometry.create({width:5,height:5}).translate(5,5).toString(),
                viewBox:'0 0 15 15', 
                width:'10%',
                height:'10%'
            }
        }
    }

    shapeGradient(gradient){
        if(!arguments[0])
            return 
        const props={}
        const {lin,path,type=lin?"linear":"radial", gsLst=[]}=gradient
        props.type=type
        props.angle=parseInt(lin?.ang||0)/60000
        props.stops=gsLst.map(({color,pos})=>({color,position:`${pos/1000}%`}))
        return props
    }

    shapePicture(blipFill){
        if(!arguments[0])
            return 
        const {blip:{url}, stretch:{fillRect:{l,r,t,b}={}}={}}=blipFill
        const percent=a=>`${parseInt(l)/1000}%`
        return {
            url,
            margin:{left:percent(l),right:percent(r),top:percent(t),bottom:percent(b)}
        }
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
        },"geometry","solidFill","rotate", "textStyle","autofit")
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

    ln({w:width,solidFill:color,...props}){
        return {width,color,...props}
    }

    bodyPr({autofit, ...style}, props){
		const {margin,}=new TextBoxStyle(style).flat()
        props.margin=margin
        props.autofit=autofit
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
