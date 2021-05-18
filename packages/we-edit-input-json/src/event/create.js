import React from "react"

export default {
    create_page(){
        const target=this.$target
        const currentPage=target.closest('page')
        const {props}=currentPage.toJS()

        const {id}=this.file.renderChanged(<page/>)
        this.$('#'+id).appendTo('#root')
        this.cursorAt(id)
        this.createEditor('page').update(props)
    },

    create_textbox({anchor, frame, shape, ...props}){
        anchor && this.emit("create_anchor",this.conds, anchor)
        shape && this.emit("create_shape",this.conds, shape)
        if(frame){
            const {width,height}=shape.geometry.bounds()
            props={width,height, ...frame, }
        }
        
        const {id}=this.file.renderChanged(
            <frame>
                <paragraph>
                    <text>hello</text>
                </paragraph>
            </frame>
        )
        this.$target.append('#'+id)
        this.cursorAt(id)
        this.createEditor('frame').update(props)

        this.cursorAt(this.$('#'+id).find("text").attr('id'),0)
    },

    create_shape({anchor, shape, ...props}){
        anchor && this.emit("create_anchor",this.conds, anchor)
        shape && (props=shape)
        
        const {id}=this.file.renderChanged(
            <shape geometry={props.geometry.round(2).toString()} />
        )
        this.$target.append('#'+id)
        this.cursorAt(id)
        this.createEditor('shape').update(props)
    },

    create_anchor({current:{x,y, id:host},page, paragraph, inline, ...props}){//dom.Anchor.propTypes
        const {id}=this.file.renderChanged(<anchor/>)
        this.$('#'+host).append('#'+id)
        this.cursorAt(id)
        this.createEditor('anchor').update({x:{base:'current',offset:x},y:{base:'current',offset:y},...props,})
    }
}