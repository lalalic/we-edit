import {testEditableDocument, dom} from "we-edit"

import Document from "../src"

describe("native json doc",()=>{
    testEditableDocument(class extends Document{
        constructor(){
            super(...arguments)


        }
        renderChanged(node){
            return node.toJS()
        }
    })
})
