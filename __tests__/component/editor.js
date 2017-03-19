import React from "react"
import {Map} from "immutable"
import {shallow, render, mount} from "enzyme"

import {createState} from "state"
import {Provider} from "react-redux"

import {Editor,Pagination} from "component"
import {Document, Section, Paragraph, Text} from "pagination/edit"

describe("components", function(){
    function createStore(){
        return createState(null,new Map({
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
        expect(Section.prototype.compose.calls.count()).toBe(1)
        expect(Document.prototype.compose.calls.count()).toBe(1)
	})
})
