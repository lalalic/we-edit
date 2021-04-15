import React from "react"

export default {
    create_page(){
        const target=this.$target
        const page=target.closest('page')
        const {props:{width,height}}=page.toJS()
        const id=this.file.makeId()
        const newPage={type:'page',id,props:{width,height}, children:[], parent:"root"}
        this.content.mergeDeep({[id]:newPage})
        this.content.updateIn(['root','children'],children=>{
            const i=children.indexOf(page.attr('id'))
            return children.splice(i,0,id)
        })
    },

    create_shape({page:{x,y},geometry}){
        const {width,height}=geometry.bounds()
        const {id}=this.file.renderChanged(
            <anchor x={{base:'page',offset:x}} y={{base:'page',offset:y}}>
                <shape geometry={geometry.round(2).toString()} outline={{width:1, color:"red"}}>
                    <frame {...{width,height,margin:{left:5,right:5,top:5,bottom:5}}}>
                        <paragraph>
                            <text>hello</text>
                        </paragraph>
                    </frame>
                </shape>
            </anchor>
        )
        this.$target.closest("shape,page").append('#'+id)
    }
}