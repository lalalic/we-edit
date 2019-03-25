import Base from "./base"

export class Image extends Base{
    apply({id, data, ...props}){
        if(this.node.prop('name')!=='pic:pic'){
            this.node=this.node.find("pic\\:pic")
        }

        if(data){
            if(typeof(data)=='string'){//file name
                props.rid=this.file.doc.officeDocument.addExternalImage(data)
            }else{
                props.rid=this.file.doc.officeDocument.addImage(data)
            }
        }

        super.apply(props)

        return this.node.closest("w\\:drawing")
    }

    remove(){
        const drawing=this.node.closest("w\\:r")
        drawing.remove()
        return drawing
    }

    empty(){

    }

    size({width,height}){
        let ext0=this.node.find("a\\:xfrm>a\\:ext")
        let inline=this.node.closest("wp\\:inline")

        const update=(x,target)=>{
            if(x){
                let cx=this.file.px2cm(x)
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
    }

    name(name, {rid}){
        this.node
            .find("pic\\:cNvPr")
            .attr("name", name)
        this.node
            .closest("wp\\:inline")
            .find("wp\\:docPr")
            .attr("id", rid)
            .attr("name", name)
    }

	create(props,{id,at=0}){
        var cursor
        super.create(props)
        const r=this.node.closest("w\\:drawing").wrap("<w:r></w:r>").parent()
        this.file.renderChanged(r,($,el)=>{
            const r0=this.file.getNode(id).closest("w\\:r")
            if(r0.length){
                r0[`${at==0 ? "before" : "after"}`](r)
            }else{
                r.appendTo(this.file.getNode(id))
            }
            this.file.renderChanged(r.parent().closest(`[xxid]`))
            cursor=this.node.attr("xxid")
        })

		return {id:cursor,at:0}
	}

    template(props){
        return `
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="1636295" cy="920416"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:docPr/>
            <wp:cNvGraphicFramePr>
              <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                  <pic:nvPicPr>
                    <pic:cNvPr/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rId9"/>
                    <a:stretch>
                      <a:fillRect/>
                    </a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm>
                      <a:off x="0" y="0"/>
                      <a:ext cx="1636295" cy="920416"/>
                    </a:xfrm>
                    <a:prstGeom prst="rect">
                      <a:avLst/>
                    </a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
        `
    }
}
