import {Input} from "we-edit"

import type from "./type"

export default class extends Input.EventReducer{
    constructor(){
        super(...arguments)
        Object.assign(this,type)
    }
}