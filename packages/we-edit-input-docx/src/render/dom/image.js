import React,{Component} from "react"
import PropTypes from "prop-types"
import Shape from "./shape"

export default dom=>{
    return class Image extends Shape(dom){
        static displayName="image"

        render(){
            const {xfrm:{width,height},blipFill,picture=this.shapePicture(blipFill), id, hash}=this.props
            if(this.context.representation!="pagination"){
                return (<dom.Image {...{width,height,src:picture?.url,id,hash}}/>)
            }

            return super.render()
        }
    }
}
