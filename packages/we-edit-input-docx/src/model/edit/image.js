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
	
	create(props,reducer,target){
		let r=target.constructUp("run")
		const [p0,p1]=reducer.splitAtUpto(reducer.selection.start,"run")
		let createdNode=super.create(...arguments)
		
		this.file.getNode(r.attr('id'))
			.find("w\\:t")
			.replaceWith(createdNode)
		
		r.insertAfter(p0)
		
		reducer.renderChanged(p0.parent().attr('id'))

		let cursor=p1.findFirst('text').attr('id')
		return {id:cursor,at:0}
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
                    <a:blip r:embed="rId8">
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
