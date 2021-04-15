import {Input} from "we-edit"

import type from "./type"
import backspace from "./backspace"
import create from "./create"
import update from "./update"
import remove from "./remove"

export default (class Events extends Input.Editable.EventHandler{
    init(){
        super.init(...arguments)
    }
    
}).extends(type,backspace,create,update,remove)