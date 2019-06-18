import testEditableDocument from "../../we-edit/__tests__/input-dom-tck"

import Document from "../src/json"

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
