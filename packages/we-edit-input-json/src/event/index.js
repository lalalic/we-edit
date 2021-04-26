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
import Editors from "./editors"

export default (class Events extends Input.Editable.Reducer{
    static createExtendedQuery=memoize($=>extendQuery($.constructor))
    static Editors=Editors
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
        })(this.$);

        const getNode=id=>this.$('#'+id)
        const file$=(...args)=>this.$(...args)
        this._file=new Proxy(this._file,{
            get(file, key){
                if(key=="getNode"){
                    return getNode
                }
                if(key=="$"){
                    return file$
                }
                return Reflect.get(...arguments)
            }
        })
    }

    createEditor(type){
        const {Unknown, [type]:Typed=Unknown}=this.constructor.Editors
        const editor=new Typed(this)
        editor.__type__=type
        return editor
    }

    shouldRemoveSelectionWhenCreate({type}){
        return !["textbox","shape"].includes(type)
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
                this.content.setIn([$anchor.attr('id'),'props',k,'offset'],d+value.get('offset'))
            }
        }
        dx && change('x',dx)
        dy && change('y',dy)
    }

    create_first_paragraph(){
        
    }
}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)