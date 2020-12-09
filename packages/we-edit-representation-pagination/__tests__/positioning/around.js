import React from "react"

import define from "./index"

define("range", ({dom:{Document,Paragraph, Text, Image, Table, Row, Cell,Container, Frame,Anchor,Shape},
    TESTING, render, mockQuery,size,uuid,Positioning,Responsible})=>{

	const test=(content,state)=>{
        const {responsible, doc, getLines}=render(content,state)
        return {
            responsible,
            click(clientX,clientY,shiftKey=false){
                responsible.onClick({clientX,clientY,shiftKey})
            },
            get lines(){
                return getLines(TESTING)
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

        doc.click(5,0)
        expect(around).toHaveLastReturnedWith({page:0,id:"2"})
                
        new Array(5-1).fill(0).forEach((a,x)=>{
			new Array(20-1).fill(0).forEach((a,y)=>{
                doc.click(5+x,y)
				expect(around).toHaveLastReturnedWith({page:0,id:"2"})
			})
		})

        doc.click(1,10)
		expect(around).toHaveLastReturnedWith({page:0,id:"0",at:1})

		doc.click(10,10)
		expect(around).toHaveLastReturnedWith({page:0,id:"3",at:1})
    })

    it("anchor can be located",()=>{
        if(["in shape","in table"].includes(TESTING))
            return 
        const doc=test(
			<Paragraph id={"1"}>
				<Text id={"0"}>text</Text>
                <Anchor id="anchor" 
                    x={{base:"page",offset:50}} 
                    y={{base:"page", offset:50}} 
                    wrap={{}}>
                    <Image id="2" {...{width:20,height:20}}/>
                </Anchor>
				<Text id={"3"}>text</Text>
            </Paragraph>,
             {page:{width:100,height:100}}
		)
        const around=jest.spyOn(doc.responsible.positioning,"around")
        doc.click(60,60)
        expect(around).toHaveLastReturnedWith({page:0,id:"2"})
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
        expect(around).toHaveLastReturnedWith({page:0,id:"1",at:1})

        doc.click(1,12)
        expect(around).toHaveLastReturnedWith({page:0,id:"2",at:1})
    })

    it("clicking on first line space of line should locate at start of paragraph",()=>{
        const doc=test(
			<Paragraph id={"0"} indent={{firstLine:2}}>
				<Text id="1">text </Text>
                <Text id="2">hello</Text>
            </Paragraph>,
            {page:{width:9}}
		)
        expect(doc.lines.length).toBe(2)
        const around=jest.spyOn(doc.responsible.positioning,"around")
        doc.click(1,1)
        expect(around).toHaveLastReturnedWith({page:0,id:"1",at:0})
    })

    it("clicking on empty end space of first line should locate at end location of line",()=>{
        const doc=test(
			<Paragraph id={"0"} indent={{firstLine:2}}>
				<Text id="1">text </Text>
                <Text id="2">hello</Text>
            </Paragraph>,
            {page:{width:9}}
		)
        expect(doc.lines.length).toBe(2)
        const around=jest.spyOn(doc.responsible.positioning,"around")
        doc.click(8,1)
        expect(around).toHaveLastReturnedWith({page:0,id:"1",at:5})
    })

    it("clicking on empty end space of last line of paragraph should locate at end location of paragraph",()=>{
        const doc=test(
			<Paragraph id={"0"}>
				<Text id="1">text </Text>
                <Text id="2">hello</Text>
            </Paragraph>,
            {page:{width:9}}
		)
        expect(doc.lines.length).toBe(2)
        const around=jest.spyOn(doc.responsible.positioning,"around")
        doc.click(8,11)
        expect(around).toHaveLastReturnedWith({page:0,id:"2",at:5})
    })

    it("clicking empty space of frame, below last line, should locate at last line of frame",()=>{
        const doc=test(
			<Paragraph id={"0"}>
				<Text id="1">text </Text>
                <Shape width={7} height={17} id="shape">
                    <Paragraph id="0.10">
                        <Text id="0.1">text </Text>
                    </Paragraph>
                </Shape>
                <Text id="2">hello</Text>
            </Paragraph>,
            {page:{width:15}}
		)
        expect(doc.lines.length).toBe(2)
        const around=jest.spyOn(doc.responsible.positioning,"around")
        
        doc.click(8,1)
        expect(around).toHaveLastReturnedWith({page:0,id:"0.1",at:3})
        doc.click(12,15)
        expect(around).toHaveLastReturnedWith({page:0,id:"0.1",at:5})
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
        expect(around).toHaveLastReturnedWith({page:0,id:"1",at:1})
/*
        doc.click(5,11)
        if(TESTING=="in shape"){//shape should be selected
            expect(around).toHaveLastReturnedWith({page:0,id:"container"})
        }else{
            expect(around).toHaveLastReturnedWith({page:0,at:1})
        }
        */
    })

})
