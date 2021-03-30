import Shape from "./shape"

export class Image extends Shape.Inline{
    apply({data, mime, ...props}){
        if(this.node.prop('name')!=='pic:pic'){
            this.node=this.node.find("pic\\:pic")
        }

        if(data){
            if(typeof(data)=='string'){//file name
                props.rid=this.file.doc.officeDocument.addExternalImage(data)
            }else{
                props.rid=this.file.doc.officeDocument.addImage(data, mime)
                if(!props.name){
                  props.name=`unknown.${mime.ext}`
                }
            }
        }

        super.apply(props)

        return this.node.closest("w\\:drawing")
    }

    size({width,height}){
        let ext0=this.node.find("a\\:xfrm>a\\:ext")
        let inline=this.node.closest("wp\\:inline")

        const update=(x,target)=>{
            if(x){
                let cx=this.file.px2emu(x)
                let cx0=parseInt(ext0.attr(target))
                ext0.attr(target,cx)

                if(inline.length){
                    let ext1=inline.children("wp\\:extent")
                    let cx1=parseInt(ext1.attr(target))
                    ext1.attr(target,cx+cx1-cx0)
                }
            }
        }

        update(width,"cx")
        update(height,"cy")
    }

    rotate(degree){
      const rot=parseInt(degree*60000)
      const xfrm=this.node.find("a\\:xfrm")

      xfrm.attr("rot",rot)
    }

    effectExtent(props){
        return null
    }

    offset(props){
        return null
    }

    rid(rid){
        this.node.find("a\\:blip").attr("r:embed",rid)
        const ids=this.$("wp\\:docPr").map((i,a)=>parseInt(a.attribs.id)).get()
        const id=Math.max(0,...ids)+1
        this.node
            .closest("wp\\:inline")
            .find("wp\\:docPr")
            .attr("id", id)
            .attr("name", "Picture "+id)
        this.node
          .find("pic\\:cNvPr")
          .attr('id',id)
    }

    name(name){
        this.node
            .find("pic\\:cNvPr")
            .attr("name", name)
    }
}
