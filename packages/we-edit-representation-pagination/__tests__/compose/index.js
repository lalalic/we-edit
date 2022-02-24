import {provider, Measure, defaultProps} from "../context"

import {Viewers, Editors} from "../../src"
import ConstraintSpace from "../../src/composable/layout/constraint-space"

export function define(feature, tests){
    describe.each([
    	["viewer",Viewers],
    	//["editor", Editors,{shouldContinueCompose:()=>true}]//viewer and editor are same, so it's not neccessary 
    ])("%s",(testing,dom,CONTEXT={})=>{
		defaultProps(dom)()
        const {Document, Section, Frame, Paragraph, Text, Image,Table,Row,Cell, Shape}=dom

    	const WithTextContext=provider(Text,{Measure})
    	const WithParagraphContext=provider(Paragraph)
    	const Context={parent:{context:{}},Measure,hintMeasure:new Measure(Document.defaultProps.hintStyle)}
        
        describe(feature, ()=>{
            tests({dom, CONTEXT, Context, WithTextContext, WithParagraphContext, testing,ConstraintSpace })
        })
    })
}