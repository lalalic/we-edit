import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

export default function edit(){

}

import Document from "./content/document"
import Section from "./content/section"
import Paragraph from "./content/paragraph"
import Inline from "./content/inline"

export function test(){
    ReactDOM.render((
        <Document>
            <Section>
                <Paragraph>
                    <Inline>{Array(7).fill("hello1, let's edit").join(" ")}</Inline>
                    <Inline>{Array(7).fill("hello2, let's edit").join(" ")}</Inline>
                </Paragraph>
				
				<Paragraph>
                    <Inline>{Array(7).fill("hello3, let's edit").join(" ")}</Inline>
                    <Inline>{Array(7).fill("hello4, let's edit").join(" ")}</Inline>
                </Paragraph>
            </Section>
			
			<Section page={{width:200, height:200, margin:15}}>
                <Paragraph>
                    <Inline>{Array(7).fill("hello5, let's edit").join(" ")}</Inline>
                    <Inline>{Array(7).fill("hello6, let's edit").join(" ")}</Inline>
                </Paragraph>
				
				<Paragraph>
                    <Inline>{Array(7).fill("hello7, let's edit").join(" ")}</Inline>
                    <Inline>{Array(7).fill("hello8, let's edit").join(" ")}</Inline>
                </Paragraph>
            </Section>
        </Document>
    ),document.querySelector('#app'))
}
