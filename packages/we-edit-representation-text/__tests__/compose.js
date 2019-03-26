import {render} from "we-edit"
import dom from "../src/dom/edit"

describe("compose as text representation",()=>{
    const {Document, Section, Paragraph, Text}=dom
    Object.assign(Text.defaultStyle, Paragraph.defaultProps.defaultStyle={
        fonts:"arial",
        size:12,
    })

    it("render", ()=>{
        render(
            <Document>
                <Section page={{}}>
                    <Paragraph>
                        <Text>Hello</Text>
                    </Paragraph>
                </Section>
            </Document>
        )
    })
})
