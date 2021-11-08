import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import TestRender from "react-test-renderer"
import ReactDOMServer from 'react-dom/server'
import cheerio from "cheerio"
import ReactDOM from 'react-dom'
import * as selector from "../../we-edit/src/state/selector"
import Measure from "./measure"

selector.getWorkers=jest.fn(()=>[])
ReactDOM.createPortal = jest.fn(node => node)

export {Measure}

export const provider=(A,Default={})=>withContext(A.contextTypes,({context})=>({...Default,...context}))(({children})=><Fragment>{children}</Fragment>)

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
        		Measure: PropTypes.any,
                hintMeasure: PropTypes.any,
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
		Measure:measure,
        hintMeasure: new measure({fonts:"arial",size:10}),
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

export const defaultProps=({Document,Paragraph,Text,...dom})=>()=>{
    const defaultStyle={fonts:"arial",size:10}
    Document.defaultProps=Object.assign(Document.defaultProps||{},{id:"root",Measure,hintStyle:defaultStyle})
    Paragraph.defaultProps=Object.assign(Paragraph.defaultProps||{},{defaultStyle,id:"paragraph"})
    Text.defaultProps=Object.assign(Text.defaultProps||{},defaultStyle,{id:"text"})
    Object.keys(dom).forEach(k=>{
        const Type=dom[k], type=Type.getType?.()
        if(type){
            Type.defaultProps=Object.assign(Type.defaultProps||{},{id:type})
        }
    })
    dom.Page.defaultProps.margin={left:0,right:0,top:0,bottom:0}
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

const error=console.error.bind(console)
console.error=(message,...args)=>{
	if(-1!=message.indexOf("make sure to pass up the same props that your component's constructor was passed")){
		return 
	}
	return error(message,...args)
}


it("compose context loaded",()=>{})
