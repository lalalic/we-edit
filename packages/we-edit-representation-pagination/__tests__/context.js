import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import TestRender from "react-test-renderer"
import ReactDOMServer from 'react-dom/server'
import cheerio from "cheerio"
import ReactDOM from 'react-dom'

ReactDOM.createPortal = jest.fn(node => node)
jest.mock("../src/composed/responsible-canvas/when-selection-change-notifier")

import Locator from "../src/composed/responsible-canvas/when-selection-change-notifier"
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
	const html=ReactDOMServer.renderToString(<svg>{pages.map(a=>a.createComposed2Parent())}</svg>)
	const $=cheerio.load(html)
	return $("svg")
}

export const render=A=>TestRender.create(A,{
    createNodeMock(el){
        if(el.type=="input")
            return {
                focus(){

                }
            }
    }
})

export const defaultProps=({Document,Paragraph,Text,Container})=>()=>{
    const defaultStyle={fonts:"arial",size:10}
    Document.defaultProps=Object.assign(Document.defaultProps||{},{id:"root"})
    Paragraph.defaultProps=Object.assign(Paragraph.defaultProps||{},{defaultStyle,id:"p"})
    Text.defaultProps=Object.assign(Text.defaultProps||{},defaultStyle,{id:"t"})
    Container.defaultProps=Object.assign(Container.defaultProps||{},{id:"c"})
}

it("compose context loaded",()=>{})
