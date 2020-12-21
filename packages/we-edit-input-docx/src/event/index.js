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
import backward from "./backward"
import forward from "./forward"

import * as dom from "./dom"

export default (class Actions extends Input.Editable.EventHandler.xml{
    static editors=dom
    constructor(){
        super(...arguments)
        this.PR="w\\:rPr,w\\:pPr,w\\:tblPr,w\\:sdtPr,w\\:tcPr,w\\:trPr"
        this.PARAGRAPH="w:p"
        this.TEXT="w:t"
        this.InlineContainers="w\\:r, w\\:sdt"
    }

    isInRegion(type, $target=this.$target){
        const region=$target.closest(type)
        if(region.length==1){
            return region
        }

        if($target.is(`${type}Begin,${type}End`)){
            return $target
        }

        const end=$target.forwardFirst(`${type}End,${type}Begin`)
        const begin=$target.backwardFirst(`${type}Begin,${type}End`)
        if(end.length && begin.length && 
            end.attr('type').endsWith('End') && 
            begin.attr('type').endsWith('Begin')){
            return begin
        }
        return false
    }

    emit(action, conds, ...others){
        if(this.$target.attr('type')=="text"){
            const name=this.target.prop('name')
            if(!name.endsWith(":t")){
                const type=name.split(":").pop()
                conds=[...conds.filter(a=>a.indexOf('text')!=-1).map(a=>a.replace('text',type)),...conds]
            }
        }

        const field=this.isInRegion('field')
        if(field){//this.$target.attr('field')
            const type=field.attr('type')
            conds=[...conds.map(a=>`${a}_in_${field.attr('command')}_${type}`),...conds.map(a=>`${a}_in_${type}`),`in_${type}`,...conds]
        }

        if(this.isInRegion('bookmark')){//this.$target.attr('bookmark')
            conds=[...conds.map(a=>`${a}_in_bookmark`),'in_bookmark',...conds]
        }
        
        super.emit(action, conds, ...others)
    }
    
    init(){
		const $p=this.$().findFirst(a=>{
            const $a=this.$(a)
            return $a.is('paragraph') && $a.closest('header,footer').length==0
        })
		if($p.length>0){
			this.cursorAt($p.attr('id'),0)
		}
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

    state(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            const field=this.isInRegion('field')
            if(field && start.id!=field.attr('id')){
                this.cursorAt(field.attr('id'),0)
            }
        }else{
            
        }
        return super.state()
    }
}).extends(seperate,create,update,enter,type,backspace,tab,paste,serialize,remove,backward,forward)

