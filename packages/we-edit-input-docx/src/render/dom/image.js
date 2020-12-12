import React from "react"
import Shape from "./shape"

export default dom=>{
    return class __$1 extends Shape(dom){
        static displayName="image"

        static asStyle(){
            const {blipFill:{url}={}, width,height,id,hash,changed,children,...outline}=super.asStyle(...arguments)
            return {src:url,width,height, outline:{...outline, width,height}}
        }

        render(){
            return (<dom.Image {...this.props}/>)
        }
    }
}
