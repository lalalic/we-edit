import {Input} from "we-edit"

import type from "./type"

export default class extends Input.EventReducer.xml{
    constructor(){
        super(...arguments)
        Object.assign(this,type)
    }
}