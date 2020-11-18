import {Input} from "we-edit"

import seperate from "./seperate"
import create from "./create"
import update from "./update"
import enter from "./enter"
import type from "./type"
import backspace from "./backspace"
import tab from "./tab"
import paste from "./paste"
import serialize from "./serialize"
import remove from "./remove"
import * as dom from "./dom"

export default (class Actions extends Input.Editable.EventHandler.xml{
    static editors=dom
    constructor(){
        super(...arguments)
        this.PR="w\\:rPr,w\\:pPr,w\\:tblPr,w\\:sdtPr,w\\:tcPr,w\\:trPr"
        this.PARAGRAPH="w:p"
        this.TEXT="w:t"
        this.InlineContainers="w\\:r, w\\:sdt"
        //const file=this._file
        this._file=new Proxy(this._file,{
            get:(file,k, receiver)=>{
                if(k==="renderChanged"){
                    return (node)=>{
                        node=file._unwrap(node)
                        const id=file.makeId(node)
                        const $target=this.$(`#${id}`)
                        const field=$target.attr('field')
                        if(field){
                            const begin=file.getNode(field)
                            const end=file.getNode(`end${field}`)
                            const parents=end.parents()
                            const parent=begin.closest(parents)
                            const i=parents.index(parent), p=parents.index(parents.filter("w\\:p"))
                            if(i<=p){
                                file.renderChanged(parent)
                            }else if(i>p){
                                throw new Error("not supported yet")
                            }   

                        }else{
                            return file.renderChanged(node)
                        }
                    }
                }
                return Reflect.get(file,k,receiver)
            }
        })
    }

    emit(action, conds, ...others){
        if(this.$target.attr('type')=="text"){
            const name=this.target.prop('name')
            if(!name.endsWith(":t")){
                const type=name.split(":").pop()
                conds=[...conds.filter(a=>a.indexOf('text')!=-1).map(a=>a.replace('text',type)),...conds]
            }
        }

        if(this.$target.attr('field')){
            conds=[...conds.map(a=>`${a}_in_field`),...conds]
        }

        if(this.$target.attr('bookmark')){
            conds=[...conds.map(a=>`${a}_in_bookmark`),...conds]
        }
        
        super.emit(action, conds, ...others)
    }

    init(){
        //set start of first paragraph in content as selection
        const firstParagraphId=this.file.makeId(this.file.$('w\\:p').get(0))
        if(firstParagraphId){
            this.cursorAt(firstParagraphId,0)
            this.forward()
            this.backward()
        }
    }

    get fieldParent(){
        const id=this.$target.attr('field')
        const begin=this.file.getNode(id)
        const end=this.file.getNode(`end${id}`)
        const parent=begin.closest(end.parents())
        return parent
    }

    paragraphHasIndentSetting(){
        return this.target.closest(this.PARAGRAPH_).children(this.PR).find("w\\:ind").length>0
    }

    isNumberingParagraph(){
        return !!this.$target.closest("paragraph").attr("numId")
    }

    create_first_paragraph(){
        const $body=this.file.$('w\\:body').prepend(`<w:p><w:r><w:t/></w:r></w:p>`)
        const a=this.file.renderChanged($body.children().first())
        this.$().findFirst('section').prepend(`#${a.id}`)
        this.cursorAt(a.id,0)
    }

    clean(){
        super.clean(()=>{
            this.$target.closest('paragraph')
                .find("run")
                .filter(a=>this.$(a).children().length==0)
                .each((i,a)=>{
                    this.$(a).remove()
                    this.file.getNode(a.get('id')).remove()
                })
        })
    }

    cursorable(n){
        if(super.cursorable(n)){
            if(this.InlineContainers){
                return !this.file.getNode(n.get('id')).is(this.InlineContainers)||undefined
            }
            return true
        }
    }

    move_at_up_to_anchor({dx,dy}){
        const $anchor=this.$target.closest('anchor')
        const id=$anchor.attr('id')
        const anchor=this.file.getNode(id)
        
        dx && this.content.updateIn([id,"props","x","offset"], a=>a+dx)
        dy && this.content.updateIn([id,"props","y","offset"], a=>a+dy)
        
        if(anchor.attr("simplePos")=="0"){
            const $x=anchor.find("wp\\:positionH>wp\\:posOffset")
            const $y=anchor.find("wp\\:positionV>wp\\:posOffset")
            dx && $x.text(this.file.px2emu($anchor.attr("x.offset")))
            dy && $y.text(this.file.px2emu($anchor.attr("y.offset")))
        }else if(anchor.attr("simplePos")=="1"){
            const simplePos=anchor.find("wp\\:simplePos")
            dx && simplePos.attr('x', this.file.px2emu($anchor.attr("x.offset")))
            dy && simplePos.attr('y', this.file.px2emu($anchor.attr("y.offset")))
        }
    }

    update(){
        return super.update(...arguments)
    }
}).extends(seperate,create,update,enter,type,backspace,tab,paste,serialize,remove)

