import {provider, Measure, defaultProps,context,$} from "../context"

import {Viewers, Editors} from "../../src"
import ConstraintSpace from "../../src/composable/layout/constraint-space"

function autoID(dom){
    let uid=0
    return Object.keys(dom).reduce((_dom,k)=>{
        const Type=dom[k], displayName=Type.displayName
		debugger
        if(displayName && displayName.indexOf("locatable")!=-1){
            const type=displayName.split("-").pop()
            _dom[k]=class extends Type{
                constructor(props,context){
                    super({id:`${type}_${++uid}`,...props},context)
                }
            }
        }else{
            _dom[k]=Type
        }
        return _dom
    },{})
}

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
