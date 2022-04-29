import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,context} from "../context"
import {define} from "./index"

define("layout exceptions",({dom})=>{
    const {Document, Section, Frame, Paragraph, Text}=dom

    function test(){

    }
    it("text error should be layouted with error style",()=>{
        const layouted=test(
            <Document>
                <Section>
                    <Paragraph>
                        <Text>Hello</Text>
                        <Text>World</Text>
                    </Paragraph>
                </Section>
            </Document>
        )
        //expect(Text.prototype.render).toThrow()
        //expect(layouted).toBe("Hello")
        
    })

    it("image error should show placeholder",()=>{

    })

    it("paragraph error should show error hint with style",()=>{

    })  
})