import {Input} from "we-edit"

import type from "./type"
import backspace from "./backspace"
import create from "./create"
import update from "./update"
import remove from "./remove"
import Delete from "./delete"
import enter from "./enter"
import tab from "./tab"
import seperate from "./seperate"
import forward from "./forward"
import backward from "./backward"

export default (class Events extends Input.Editable.EventHandler{
    constructor(){
        super(...arguments)
        Object.defineProperties(this,{
            target:{
                get(){
                    return this.$target
                }
            }
        })
        this.debug=true
    }

    isNumberingParagraph(){
        
    }

    paragraphHasIndentSetting(){
        return false
    }

    
    
}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)