import React from "react"

export default {
    create_page(){
        const target=this.$target
        const page=target.closest('page')
        const {props:{width,height}}=page.toJS()
        const {id}=this.file.renderChanged(<page {...{width,height}}/>)
        this.$('#'+id).appendTo('#root')
        this.cursorAt(id)
    },

    create_textbox({geometry}){
        this.create_shape(...arguments)
        const {width,height}=geometry.bounds()
        const {id}=this.file.renderChanged(
            <frame {...{width,height,margin:{left:5,right:5,top:5,bottom:5}}}>
                <paragraph>
                    <text>hello</text>
                </paragraph>
            </frame>
        )
        this.$target
            .attr("fill",null)
            .append('#'+id)
        this.cursorAt(this.$('#'+id).find("text").attr('id'),0)
    },

    create_shape({geometry}){
        this.emit("create_anchor", this.conds, arguments[0])
        const {id}=this.file.renderChanged(
            <shape 
                geometry={geometry.round(2).toString()} 
                outline={{width:1, color:"green"}}
                fill={{color:"green"}}
                />
        )
        this.$target.append('#'+id)
        this.cursorAt(id)
    },

    create_anchor({x,y}){
        const {id}=this.file.renderChanged(<anchor x={x} y={y}/>)
        this.$target.closest("frame, page").append('#'+id)
        this.cursorAt(id)
    },

    create_anchor_at_shape({anchor:{current:{x,y}}}){
        const shape=this.target
        this.create_anchor({x:{base:'current',offset:x},y:{base:'current',offset:y}})
        this.target.appendTo(shape.findFirst('frame'))
    },

    create_anchor_at_page({anchor:{page:{x,y}}}){
        this.create_anchor({x:{base:'page',offset:x},y:{base:'page',offset:y}})
    }
}