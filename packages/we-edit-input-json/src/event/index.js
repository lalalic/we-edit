import {Input} from "we-edit"

import extendQuery from "./state-query"
import Editors from "./editors"
import memoize from "memoize-one"

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

    createEditor(type, ...args){
        const {Unknown, [type]:Typed=Unknown}=this.constructor.Editors
        const editor=new Typed(this, ...args)
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

    move_at_up_to_anchor(props){
        this.createEditor('anchor',this.target.closest('anchor')).update(props)
    }

    create_first_paragraph(){
        
    }

    update({type,...props}){
        if(type=="textbox"){
            this.emit("update_textbox",this.conds, props)
        }else{
            super.update(...arguments)
        }
    }
}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)