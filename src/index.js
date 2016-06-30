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
import Text from "./content/text"
import SVGWordWrapper from "./wordwrap/svg"

//Text.WordWrapper=SVGWordWrapper

export function test(){
    ReactDOM.render((
        <Document>
            <Section>
                <Paragraph>
                    <Inline><Text>{Array(27).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(7).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(1).fill("over").join(" ")}</Text></Inline>
                </Paragraph>
				<Paragraph>
                    <Inline><Text>{Array(27).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(7).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(1).fill("over").join(" ")}</Text></Inline>
                </Paragraph>
            </Section>

			<Section page={{width:200, height:200, margin:10}}>
                <Paragraph>
                    <Inline><Text>{Array(27).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(7).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(1).fill("over").join(" ")}</Text></Inline>
                </Paragraph>
				<Paragraph>
                    <Inline><Text>{Array(27).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(7).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(1).fill("over").join(" ")}</Text></Inline>
                </Paragraph>
            </Section>

			            <Section>
                <Paragraph>
                    <Inline><Text>{Array(27).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(7).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(1).fill("over").join(" ")}</Text></Inline>
                </Paragraph>
				<Paragraph>
                    <Inline><Text>{Array(27).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(7).fill("hello1, let's edit").join(" ")}</Text></Inline>
					<Inline><Text>{Array(1).fill("over").join(" ")}</Text></Inline>
                </Paragraph>
            </Section>

        </Document>
    ),document.querySelector('#app'))
}
