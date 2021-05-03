import {Input,dom} from "we-edit"

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

    createNumbering(numbering, {id=this.file.makeId()+"",level=0}={}){
        this.file.getNode('root').attr('numberings',{[id]:[numbering]})
        return {id,level}
    }

    updateNumbering({id,level=0,...numbering}){
        const root=this.file.getNode('root')
        let numberings=root.attr('numberings')
        if(!numberings.hasIn([id,level]) && numberings.hasIn([id,level-1])){
            numberings=numberings.setIn([id,level], numberings.getIn([id,level-1]))
            const indent=numberings.getIn([id,level-1,'indent'])
            const UnitShape=dom.Unknown.UnitShape
            numberings=numberings.setIn([id,level,'indent'],UnitShape.denormalize(indent, UnitShape.normalize(indent)*(level+1)))
        }
        numberings=numberings.mergeIn([id,level],numbering)
        root.attr('numberings',numberings)
    }

    getNumbering({id,level=0}){
        return this.file.getNode('root').attr('numberings').getIn([id,level])?.toJS()
    }

    update({type,...props}){
        if(type=="textbox"){
            this.emit("update_textbox",this.conds, props)
        }else{
            super.update(...arguments)
        }
    }
}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)