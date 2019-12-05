import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import define from "./index"

define("range", ({dom:{Document,Paragraph, Text, Image, Table, Row, Cell,Container, Frame,Anchor,Shape},
    TESTING, render, mockQuery,size,uuid,Positioning,Responsible})=>{

	beforeEach(()=>{
		Positioning.prototype.asCanvasPoint=jest.fn(({left,top})=>({x:left,y:top}))
	})
	const test=(content,state)=>{
        const {responsible, doc}=render(content,state)
        responsible.positioning.pageXY=jest.fn(()=>({x:0,y:0}))
        return {
            responsible,
            click(clientX,clientY,shiftKey=false){
                responsible.onClick({clientX,clientY,shiftKey})
            },
            get lines(){
                return doc.computed.composed[0].lines
            }
        }
    }
	it("image",()=>{
		const doc=test(
			<Paragraph id={"1"}>
				<Text id={"0"}>text</Text>
				<Image id="2" {...{width:5,height:20}}/>
				<Text id={"3"}>text</Text>
			</Paragraph>
		)
		const around=jest.spyOn(doc.responsible.positioning,"around")

        new Array(5).fill(0).forEach((a,x)=>{
			new Array(20).fill(0).forEach((a,y)=>{
                doc.click(4+x,y)
				expect(around).toHaveLastReturnedWith({id:"2"})
			})
		})

        doc.click(1,10)
		expect(around).toHaveLastReturnedWith({id:"0",at:1})

		doc.click(10,10)
		expect(around).toHaveLastReturnedWith({id:"3",at:1})
    })
    
    it("second line of paragraph can be located",()=>{
        if(!(TESTING=="page"))
            return 
        const doc=test(
			<Paragraph id={"0"}>
				<Text id="1">text </Text>
                <Text id="2">hello</Text>
            </Paragraph>,
            {page:{width:5}}
		)
        expect(doc.lines.length).toBe(2)
        const around=jest.spyOn(doc.responsible.positioning,"around")
        
        doc.click(1,1)
        expect(around).toHaveLastReturnedWith({id:"1",at:1})

        doc.click(1,12)
        expect(around).toHaveLastReturnedWith({id:"2",at:1})
    })

    it("ignore when out of content range, but shape should be selected when click on blank area ",()=>{
        const doc=test(
			<Paragraph id={"1"}>
				<Text id={"0"}>text</Text>
			</Paragraph>
		)
        const around=jest.spyOn(doc.responsible.positioning,"around")

        doc.click(1000,1000)
        expect(around).toHaveLastReturnedWith({})

        doc.click(-1000,-1000)
        expect(around).toHaveLastReturnedWith({})


        doc.click(5,5)
        expect(around).toHaveLastReturnedWith({id:"0",at:4})

        doc.click(5,11)
        if(TESTING=="in shape"){//shape should be selected
            expect(around).toHaveLastReturnedWith({id:"container"})
        }else{
            expect(around).toHaveLastReturnedWith({})
        }
    })

})
