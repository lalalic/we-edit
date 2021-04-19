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
import extendQuery from "./state-query"
import memoize from "memoize-one"

export default (class Events extends Input.Editable.EventHandler{
    static createExtendedQuery=memoize($=>extendQuery($.constructor))
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
        this.$=($=>{
            let ExtendedQuery=this.constructor.ExtendedQuery
            if(!ExtendedQuery){
                ExtendedQuery=this.constructor.ExtendedQuery=this.constructor.createExtendedQuery($('#root'))
            }
            return content=>new ExtendedQuery(this._state,content)
        })(this.$)
    }

    isNumberingParagraph(){
        
    }

    paragraphHasIndentSetting(){
        return false
    }

    move_at_up_to_anchor({dx,dy}){
        const $anchor=this.$target.closest('anchor')
        const change=(k,d)=>{
            const value=$anchor.attr(k)
            if(typeof(value)=="number")
                $anchor.attr(k, value+d)
            else if(typeof(value)=="object"){
                this.content.setIn([$anchor.attr('id'),'props',k,'offset'],offset=>offset+d)
            }
        }
        change('x',dx)
        change('y',dy)
    }
}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)