import Base from "./base"

export class Image extends Base{
    apply({id, data, ...props}){
        if(this.node.prop('name')!=='pic:pic'){
            this.node=this.node.find("pic\\:pic")
        }

        if(data){
            if(typeof(data)=='string'){//file name
                props.rid=this.file.officeDocument.addExternalImage(data)
            }else{
                props.rid=this.file.officeDocument.addImage(data)
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
        const target=this.file.getNode(id)
        var r=target.closest("w\\:r")
        if(r.length==0){
            r=target.find("w\\:r").eq(0)
        }
        var container=r.clone().empty()

		this.node=this.parseXml(this.template(props))

        container.append(this.node)

        if(at==0){
            container=container.insertBefore(r)
        }else{
            container=container.insertAfter(r)
        }

		this.file.renderChanged(r.parent().closest(`[xxid]`))

		return {id:container.find(`[xxid]`).attr('xxid'),at:0}
	}

    template(props){
        return `
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="38FBBD73" wp14:editId="2CF6FDD6">
            <wp:extent cx="1636295" cy="920416"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:docPr id="1" name="Picture 1"/>
            <wp:cNvGraphicFramePr>
              <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                  <pic:nvPicPr>
                    <pic:cNvPr id="0" name="20160313_142032.jpg"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rId9">
                      <a:extLst>
                        <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
                          <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
                        </a:ext>
                      </a:extLst>
                    </a:blip>
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
