import React, {Component} from "react"
import memoize from "memoize-one"
import PropTypes from "prop-types"
import AutoFitContext from "./autofit-context"
import { shallowEqual } from "recompose"

export default ({Shape, Template})=>class __$1 extends Component{
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
        if(Shape.support('pageable')){
            const {autofit,height, ...props}=this.props
            switch(autofit?.type){
                case "block":
                    //return (<Shape {...props}/>)
                case "font":{
                    const AutoFitShape=this.constructor.AutoFitShape(Shape, Template)
                    return <AutoFitShape {...this.props}/>
                }
            }
        }
        return (<Shape {...this.props}/>)
    }   

    static AutoFitShape=memoize((Shape, Template)=>{
        const PRECISION=100000
        return class extends Template{
            static displayName="autofit"
            static defaultProps={
                ...super.defaultProps,
                variables:new this.Variables()
            }

            static Frame=class extends Shape{
                static Async=class extends Template.Frame.Async{
                    static getDerivedStateFromProps({scale,height},state){
                        return {scale,height,...state}
                    }
                    onComposed(composed, variables){
                        if(this.unmounted)
                            return 
                        this.setState({composed, ...variables})
                        const {getComposer, responsible}=this.context

                        if(getComposer(responsible.cursor.id)?.closest(a=>a.props.id==this.content.props.id)){
                            responsible.updateSelectionStyle()
                        }
                    }

                    componentDidMount(){
                        this.componentDidUpdate()
                    }

                    componentDidUpdate(a, lastState){
                        if(this.state.composed || shallowEqual(lastState, this.state))
                            return 
                        const {
                            props:{limit, compose}, 
                            state:{scale, height}, 
                            context:{responsible},
                            content:{props:{autofit}}}=this
                        
                        const fontScale=height>limit ? Math.max(scale-7500, 7500) : Math.min(PRECISION, scale+7500)
                        compose(React.cloneElement(this.content, {autofit:{...autofit,fontScale}}),this.onComposed,responsible)
                    }
                }
            }

            /**
             * state:
             *      asyncManaged: current try
             *      perfect: last perfect matched scale, which can be used for quick test, such as if changed content's height<limit with perfect
             */
            static Manager=class extends super.Manager{
                static getDerivedStateFromProps({children},{asyncManaged, perfect, ...state}){
                    const {props:{hash,autofit}}=children
                    if(hash!=state.hash && perfect){
                        asyncManaged=React.cloneElement(children,{autofit:{...autofit,fontScale:perfect.scale}})
                    }
                    return {hash, asyncManaged}
                }

                /**
                 * need identify trying, and recompose
                 */
                shouldComponentUpdate({children:{props:{hash,}}}){
                    const changed=hash!=this.props.children.props.hash
                    if(changed){//recompose
                        this.lastComposed=[]
                        this.queue.splice(0,this.queue.length)
                    }
                    return true
                }
                render(){
                    const {props:{children:template},state:{asyncManaged=template}}=this
                    const {props:{id,hash,autofit:{fontScale:scale=PRECISION}}}=asyncManaged
                    console.debug(`autofit shape[${id}] rendering for scale ${scale}`)
                    return (
                        <AutoFitContext.Provider value={{scale}}>
                            {React.cloneElement(asyncManaged,{manager:this, allowOverflow:true, hash:`${hash}-${scale}`})}
                        </AutoFitContext.Provider>
                    )
                }
                appendComposed(composed){
                    const {props:{id, autofit:{fontScale:scale=PRECISION}}, contentHeight:height}=this.managedComposer
                    console.debug(`autofit shape[${id}] composed for scale ${scale}`)
                    const {perfect}=this.state
                    if(scale==perfect?.scale && height==perfect.height){
                        this.context.parent.appendComposed(composed)
                        return  
                    }

                    this.lastComposed.push({scale, composed, height})
                    if(this.lastComposed.length==1){
                        this.context.parent.appendComposed(this.createAsyncComposed2Parent(composed))
                    } 
                }

                createAsyncComposed2Parent(defaultComposed){
                    if(this.getPerfect()){
                        return defaultComposed
                    }
                    const current=(a=this.lastComposed,{scale,height}=a[a.length-1])=>({scale,height})
                    const replaceableComposed = [], id=1, uuid=`${id}.${Date.now()}`
                    replaceableComposed[0] = (<this.managedComposer.constructor.Async {...{
                        id,
                        uuid,
                        children: this.managed,
                        limit: this.limit,
                        ...current(),
                        compose:(asyncManaged,onComposed)=>{
                            this.queue.push(()=>{
                                return new Promise((resolve)=>{
                                    this.setState({asyncManaged},()=>{
                                        try{
                                            const perfect=this.getPerfect()
                                            if(perfect){
                                                /**
                                                 * to render with perfect scale at least to cheerup correct composers
                                                 * It's ok to cheerup again to make logic more simple
                                                 */
                                                asyncManaged=React.cloneElement(asyncManaged, {autofit:{...asyncManaged.props.autofit,fontScale:perfect.scale}})
                                                this.setState({asyncManaged,perfect},()=>{
                                                    onComposed(replaceableComposed[0]=perfect.composed, {}, this)
                                                })
                                            }else{
                                                onComposed(replaceableComposed[0]=perfect?.composed, current(), this)
                                            }
                                        }finally{
                                            resolve()
                                        }
                                    })
                                })
                            })
                        }
                    }} />)
                    console.log(`[${uuid}.manager]: use Async`)    
            
                    return React.cloneElement(defaultComposed,{children:replaceableComposed})
                }

                getPerfect(){
                    const {limit, lastComposed:tried}=this
                    let perfect=tried.find(a=>a.scale==PRECISION && a.height<limit)//not scaled but can hold
                                    ||tried.find(a=>Math.abs(limit-a.height)<3)//almost equals
                                    ||(new Set(tried.map(a=>a.height)).size<tried.length && tried[tried.length-1])//somehow height not changed when scale changed
                    if(!perfect){
                        const all=[...tried,{height:limit}].sort((a,b)=>a.height-b.height)
                        const i=all.map(a=>a.height).indexOf(limit)
                        perfect=all[i+1] && all[i-1]//bigger and smaller
                    }
                    return perfect
                }

                get limit(){
                    return this.managedComposer.geometry.contentBox.height
                }
            }
        }
    })

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
