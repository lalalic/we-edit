import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import TestRender from "react-test-renderer"
import ReactDOMServer from 'react-dom/server'
import cheerio from "cheerio"

jest.mock("../src/composed/responsible/locator")

import Locator from "../src/composed/responsible/locator"
Locator.prototype.shouldComponentUpdate=jest.fn(a=>true)

export const provider=(A,Default={})=>withContext(A.contextTypes,({context})=>({...Default,...context}))(({children})=><Fragment>{children}</Fragment>)

export class Measure{
    constructor({size}){
        this.defaultStyle={height:size,descent:1}
        this.height=size
    }

    widthString(x,text){
        return Math.min(x,text.length)
    }

    stringWidth(text){
        return text.length
    }
}

export const State={
    equals({start,end}){
        return false
    },
    toJS(){
        return {start:{},end:{}}
    },
    hashCode(){
        return "1234"
    }
}

export const context=({dom, state=State, measure=Measure, contextTypes={},context={}})=>{
    return provider({
            contextTypes:{
        		activeDocStore:PropTypes.any,
        		ModelTypes:PropTypes.any,
        		Measure: PropTypes.any,
                ...contextTypes,
    	   }
       },{
        activeDocStore:{
			subscribe(){},
			dispatch(){},
			getState(){
				return {
					get(){
						return state
					}
				}
			}
		},
		ModelTypes:dom,
		Measure:measure,
        ...context
	})
}


export const $=pages=>{
	const html=ReactDOMServer.renderToString(<svg>{pages.map(a=>a.render())}</svg>)
	const $=cheerio.load(html)
	return $("svg")
}

export const render=TestRender.create

const DummyCanvas=({content})=>content

export const defaultProps=({Document,Paragraph,Text})=>()=>{
    const defaultStyle={fonts:"arial",size:10}
    Document.defaultProps=Object.assign(Document.defaultProps||{},{id:"root",canvas:<DummyCanvas/>})
    Paragraph.defaultProps=Object.assign(Paragraph.defaultProps||{},{defaultStyle})
    Text.defaultProps=Object.assign(Text.defaultProps||{},defaultStyle)
}

it("compose context loaded",()=>{})
