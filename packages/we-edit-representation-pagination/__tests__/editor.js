import React from "react"
import {Map} from "immutable"
import {shallow, render, mount} from "enzyme"

import {createState} from "state"
import {Provider} from "react-redux"

import {Editor,Pagination} from "component"
import {Document, Section, Paragraph, Text} from "pagination/edit"

describe("components", function(){
    function createStore(content){
        return createState(null,new Map({
				...content,
                "root": new Map({type:"document",children:["1"]}),
                "1": new Map({type:"section", children:["2"]}),
                "2": new Map({type:"paragraph", children:["3"]}),
                "3": new Map({type:"text",children:"hello"})
            })
        )
    }

	it("<Editor><Pagination/></Editor>", function(){
        spyOn(Text.prototype,"compose").and.callThrough()
        spyOn(Paragraph.prototype,"compose").and.callThrough()
		spyOn(Paragraph.prototype,"getBreakOpportunities").and.callThrough()
        spyOn(Section.prototype,"compose").and.callThrough()
        spyOn(Document.prototype,"compose").and.callThrough()
		let node=mount(
            <Provider store={createStore()}>
    			<Editor>
    				<Pagination/>
    			</Editor>
            </Provider>
        )
        let text=node.find("text")
        expect(text.length).toBe(1)
        expect(text.prop("data-content")).toBe("3")
        expect(text.text()).toBe("hello")

        expect(Text.prototype.compose.calls.count()).toBe(1)
        expect(Paragraph.prototype.compose.calls.count()).toBe(1)
		expect(Paragraph.prototype.getBreakOpportunities.calls.count()).toBe(1)
        expect(Section.prototype.compose.calls.count()).toBe(1)
        expect(Document.prototype.compose.calls.count()).toBe(1)
	})
	
	fit("<p><t>hello</t><t> world</t></p>",function(){
		let node=mount(
            <Provider store={createState(null,new Map({
                "root": new Map({type:"document",children:["1"]}),
                "1": new Map({type:"section", children:["2"]}),
                "2": new Map({type:"paragraph", children:["3","4"]}),
                "3": new Map({type:"text",children:"hello"}),
				"4": new Map({type:"text",children:" world"})
            }))}>
    			<Editor>
    				<Pagination/>
    			</Editor>
            </Provider>
        )
        let text=node.find("text")
        expect(text.length).toBe(2)
        expect(text.at(0).prop("data-content")).toBe("3")
        expect(text.at(0).text()).toBe("hello")
		expect(text.at(1).prop("data-content")).toBe("4")
        expect(text.at(1).text()).toBe(" world")
	})
})
