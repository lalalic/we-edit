import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render, provider, Measure, defaultProps,context,$} from "../context"

import {Viewers, Editors} from "../../src"

export function define(feature, tests){
    describe.each([
    	["viewer",Viewers],
    	//["editor", Editors,{shouldContinueCompose:()=>true}]
    ])("%s",(testing,dom,CONTEXT={})=>{
    	const {Document, Section, Frame, Paragraph, Text, Image,Table,Row,Cell, Shape}=dom

    	const WithTextContext=provider(Text,{Measure})
    	const WithParagraphContext=provider(Paragraph)
    	const Context={parent:{},Measure}

    	beforeAll(()=>{
    		defaultProps(dom)()
    	})

        describe(feature, ()=>{
            tests({dom, CONTEXT, Context, WithTextContext, WithParagraphContext, testing})
        })
    })
}
