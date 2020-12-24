import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import TestRender from "react-test-renderer"
import ReactDOMServer from 'react-dom/server'
import cheerio from "cheerio"
import ReactDOM from 'react-dom'

ReactDOM.createPortal = jest.fn(node => node)

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
			subscribe(){
                return ()=>null
            },
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

export const render=(A,opt={})=>TestRender.create(A,{
    createNodeMock(el){
        if(el.type=="input")
            return {
                focus(){

                }
            }
    },...opt
})

export const defaultProps=({Document,Paragraph,Text,Container})=>()=>{
    const defaultStyle={fonts:"arial",size:10}
    Document.defaultProps=Object.assign(Document.defaultProps||{},{id:"root"})
    Paragraph.defaultProps=Object.assign(Paragraph.defaultProps||{},{defaultStyle,id:"p"})
    Text.defaultProps=Object.assign(Text.defaultProps||{},defaultStyle,{id:"t"})
    Container.defaultProps=Object.assign(Container.defaultProps||{},{id:"c"})
}

export const nthUseCached=(fn,n)=>{
    const isUseCached=a=>React.Children.toArray(a)
                    .reduce((useCached, a)=>{
                        return useCached && 
                            (!a || 
                                (
                                (a.type==Fragment && isUseCached(a.props.children)) || 
                                a.type.displayName=="UseCached" || 
                                a.type.displayName=="__ComposedAllTrigger"
                                ) 
                            )
                    },true)
    return isUseCached(fn.mock.results[n-1].value)
}

export function createCanvas(Doc, props){
    return React.cloneElement(Doc.defaultProps.canvas,props)
}

it("compose context loaded",()=>{})
