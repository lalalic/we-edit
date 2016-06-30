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

var setState=Component.prototype.setState
Component.prototype.setState=function(){
    console.log(`setState on ${this.displayName}`)
    setState.call(this,...arguments)
}

export function test(){
    ReactDOM.render((
        <Document>
            <Section>
                <Paragraph>
                    <Inline>{Array(27).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(7).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(1).fill("over").join(" ")}</Inline>
                </Paragraph>
				<Paragraph>
                    <Inline>{Array(27).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(7).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(1).fill("over").join(" ")}</Inline>
                </Paragraph>
            </Section>
			
			<Section page={{width:200, height:200, margin:10}}>
                <Paragraph>
                    <Inline>{Array(27).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(7).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(1).fill("over").join(" ")}</Inline>
                </Paragraph>
				<Paragraph>
                    <Inline>{Array(27).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(7).fill("hello1, let's edit").join(" ")}</Inline>
					<Inline>{Array(1).fill("over").join(" ")}</Inline>
                </Paragraph>
            </Section>

        </Document>
    ),document.querySelector('#app'))
}
