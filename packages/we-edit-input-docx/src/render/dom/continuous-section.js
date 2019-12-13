import React, {Component} from "react"
import DocxBaseSection from "./section"

export default ({Section,Frame})=>class ContinuousSection extends Component{
    createPage(){

    }
    
    render(){

        return <DocxSection create={this.createPage}/>
    }
}