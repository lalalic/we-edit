import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import TestRenderer from "react-test-renderer"

import dom from "../src/dom/edit"

var uuid=10

describe("html", ()=>{
	const {Document, Section, Paragraph, Text}=dom

	Paragraph.defaultProps.defaultStyle={fonts:"arial",size:12}
	Text.defaultProps=Object.assign(Text.defaultProps||{},{fonts:"arial",size:12})
	
	const provider=(A,Default={})=>withContext(A.contextTypes,({context})=>({...Default,...context}))(({children})=><Fragment>{children}</Fragment>)
	const store=(state={
			equals({start,end}){
				return false
			},
			toJS(){
				return {start:{},end:{}}
			},
			hashCode(){
				return "1234"
			}
		})=>({activeDocStore:{
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
			ModelTypes:dom
		})

	const StoreContext=provider({contextTypes:{
		activeDocStore:PropTypes.any,
		ModelTypes:PropTypes.any,
	}},store())
	const TextContext=provider(Text,{
			Measure:class{
				height=10
				defaultStyle={height:10,descent:1}
				widthString(x,text){
					return x
				}

				stringWidth(text){
					return text.length
				}
			}
		})

	const WithSectionContext=provider(Section,{ModelTypes:dom})

	const size={
		width:816,
		height:1056,
		composedHeight(){
			return this.height
		}
	}

	fit("basic",function(){
		let node=TestRenderer.create(
			<StoreContext>
				<Document
					id="root"
					viewport={{width:100,height:200,node:{scrollTop:0}}}
					screenBuffer={0}
					scale={1}
					>
					<Section id={`${uuid++}`}page={{width:100,height:200}}>
						<Paragraph id={`${uuid++}`}>
							<Text id={`${uuid++}`}>Hello</Text>
						</Paragraph>
					</Section>
				</Document>
			</StoreContext>
		)
	})

	it("basic",()=>{
		let node=render(
			<Document>
				<Section>
					<Paragraph>
						<Text {...TEXT}>Hello0</Text>
					</Paragraph>
				</Section>
				<Section>
					<Paragraph>
						<Text {...TEXT}>Hello1</Text>
					</Paragraph>
				</Section>
			</Document>
		)
		expect(node.findAllByType("article").length).toBe(1)
		"p,span"
			.split(",")
			.forEach(a=>expect(node.findAllByType(a).length).toBe(2))
		node.findAllByType("span")
			.forEach((a,i)=>expect(a.props.children).toBe(`Hello${i}`))
	})

})
