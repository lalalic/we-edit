import React, {Component} from "react"

export default ({Section})=>class __$1 extends Component{
    static displayName="section"
    static extractProps({left, right, top, bottom, header, footer, width,height,...props}){
        return {
            layout:{
                margin:{
                    left:parseInt(left), 
                    right:parseInt(right), 
                    top:parseInt(top), 
                    bottom:parseInt(bottom), 
                    header:parseInt(header), 
                    footer:parseInt(footer),
                },
                width:parseInt(width),
                height:parseInt(height),
            }, ...props}
    }
    render(){
        return <Section {...this.props}/>
    }
}
