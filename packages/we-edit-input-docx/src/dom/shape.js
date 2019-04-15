import React, {Component} from "react"


export default ({Shape})=>class extends Component{
    static displayName="shape"
    toShapeStyle(){
        return new ShapeStyle(this.props).flat()
    }

    render(){
        const {id, children, changed, ...props}=this.props
        const shapePr=this.toShapeStyle(this.props)
        return (<Shape {...{id,children,changed}} {...shapePr}/>)
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

        },"geometry","solidFill")
    }

    anchor(v){
        return {b:"bottom",ctr:"middle",t:"top", dist:"distributed",just:"justified"}[v]
    }

    xfrm=(a, props)=>Object.assign(props, a)

    blipFill=({blip, ...props})=>({...blip, ...props})
}
