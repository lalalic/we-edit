import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"



export default function edit(){

}

import Document from "./content/document"
import Section from "./content/section"
import Paragraph from "./content/paragraph"
import Inline from "./content/inline"

export function test(){
    ReactDOM.render((
        <Document width={500} height={1000} style={{background:"lightgray"}}>
            <Section page={{width:300, height:400, margin:5}}>
                <Paragraph>
                    <Inline>{Array(5).fill("hello, let's edit").join(" ")}</Inline>
                    
                </Paragraph>
            </Section>
        </Document>
    ),document.querySelector('#app'))
}
