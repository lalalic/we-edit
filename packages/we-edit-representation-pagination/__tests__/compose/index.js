import {provider, Measure, defaultProps,context,$} from "../context"

import {Viewers, Editors} from "../../src"
import ConstraintSpace from "../../src/composable/layout/constraint-space"

export function define(feature, tests){
    describe.each([
    	["viewer",Viewers],
    	["editor", Editors,{shouldContinueCompose:()=>true}]
    ])("%s",(testing,dom,CONTEXT={})=>{
    	const {Document, Section, Frame, Paragraph, Text, Image,Table,Row,Cell, Shape}=dom

    	const WithTextContext=provider(Text,{Measure})
    	const WithParagraphContext=provider(Paragraph)
    	const Context={parent:{context:{}},Measure}

    	beforeAll(()=>{
    		defaultProps(dom)()
    	})

        describe(feature, ()=>{
            tests({dom, CONTEXT, Context, WithTextContext, WithParagraphContext, testing,ConstraintSpace })
        })
    })
}
