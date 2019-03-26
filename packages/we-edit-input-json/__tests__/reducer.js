import {testEditableDocument, dom} from "we-edit"

import Document from "../src"

describe("native json doc",()=>{
    testEditableDocument(class extends Document{
        renderChanged(node){
			if(!node){
				debugger
			}
            return node.toJS()
        }

		getNode(){
			return Object.assign(super.getNode(...arguments),{
				text(){
					return this.get('children')
				}
			})
		}
    })
})
