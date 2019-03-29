import Editors from "../src/dom/edit"
import {dom} from "we-edit"

import testEditableDocument from "../../we-edit/__tests__/input-reducer-tck"

import docx4js from "../src/docx"
import DocxDocument from "../src"

describe("reduce docx",()=>{
    let doc=null
    beforeAll(()=>{
        const insert=DocxDocument.Reducer.prototype.insert
        DocxDocument.Reducer.prototype.insert=jest.fn(function({data:inserting}){
            const createContent=this.file.constructor.createContent
            if(Array.isArray(inserting)){//merge content
                inserting=inserting.map(node=>createContent({},null,node))
            }
            return insert.bind(this)({data:inserting})
        })

        return docx4js.create().then(docx=>{
            docx.officeDocument.content('w\\:p').remove()
            doc=docx
        })
    })

    beforeEach(()=>{
        Editors.Container1=Editors.Container0=class extends Editors.Unknown{
            empty(){
                this.node.find("w\\:sdtContent").empty()
            }
        }
    })

    testEditableDocument(class extends DocxDocument{
        static createContent(content, id, node=content[id]){
            if(!node)
                return ""
            return (()=>{
                switch(node.type){
                case "paragraph":
                    return `<w:p ${node.id ? `xxid="${node.id}"` : ""}>${(node.children||[]).map(a=>this.createContent(content,a)).join('')}</w:p>`
                case "image":
                    return `
                    <w:r w:rsidR="00D76211">
                      <w:rPr>
                        <w:noProof/>
                      </w:rPr>
                      <w:drawing>
                        <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="10F53B14" wp14:editId="13558A84">
                          <wp:extent cx="1565507" cy="978535"/>
                          <wp:effectExtent l="0" t="0" r="0" b="0"/>
                          <wp:docPr id="2" name="Picture 2"/>
                          <wp:cNvGraphicFramePr>
                            <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
                          </wp:cNvGraphicFramePr>
                          <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                            <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                              <pic:pic xxid="${node.id}" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                                <pic:nvPicPr>
                                  <pic:cNvPr id="2" name="NatGeo01.jpg"/>
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
                                    <a:ext cx="1575846" cy="984997"/>
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
                    </w:r>
                    `
                case "text":
                    return `
                    <w:r>
                        <w:rPr>
                            ${node.props && node.props.size!=undefined ? `<w:sz w:val="${node.props.size*2}"/>` : ""}
                        </w:rPr>
                        <w:t ${node.id ? `xxid="${node.id}"` : ""}>${node.children||""}</w:t>
                    </w:r>
                    `
                case "container0":
                case "container1":
                    return `
                    <w:sdt type="${node.type}" ${node.id ? `xxid="${node.id}"` : ""}>
                        <w:sdtPr>
                            <w:${node.type}/>
                        </w:sdtPr>
                        <w:sdtContent>
                            ${(node.children||[]).map(a=>this.createContent(content,a)).join('')}
                        </w:sdtContent>
                    </w:sdt>`
                default:
                    return ""
                }
            })().replace(/>\s+/g,">").replace(/\s+</g,"<")
        }
        constructor(content,_content, {immutable, $}){
            super()
            this.doc=doc.clone()
            this.doc.officeDocument.content("w\\:document").attr('xxid','root')
            const body=this.doc.officeDocument.content("w\\:body")
            content=content.toJS()
            content.root.children.reverse()
                .forEach(id=>{
                    body.prepend(this.constructor.createContent(content,id))
                })

            dom.Section.fissureLike=jest.fn(()=>class{})
            const components=this.transform(dom)

            const getRel=this.doc.officeDocument.getRel.bind(this.doc.officeDocument)
            this.doc.officeDocument.getRel=jest.fn(function(rid){
                if(rid=="rId9"){
                    return {url:""}
                }
                return getRel(...arguments)
            })

            const identify=this.doc.constructor.OfficeDocument.identify
            this.doc.constructor.OfficeDocument.identify=jest.fn(function(wXml){
                const element=identify(...arguments)
                if(element && typeof(element)=="object" &&
                    !"p,t,picture,inline,block".split(",").includes(element.type)){
                    element.type="ignored"
                }
                return element
            })



            this.render(()=>{},components)

            const createElement=(type,props, children,raw)=>{
                let node={type:type.displayName,props,children:!Array.isArray(children) ? children : children.map(a=>a.id)}
                if(node.type=="container"){
                    node.type=raw.attribs.type
                }
                const id=node.id=this.makeId(raw)
                node.parent=_content.getIn([id,"parent"])||"root"
                _content.set(id,immutable.fromJS(node))
                if(Array.isArray(children)){
            		//set parent make map as a double direction tree structure
            		children.forEach(k=>_content.mergeIn([k.id],{parent:id}))
            	}
                return node
            }

            this.renderChanged=(node,callback)=>{
                if(node.cheerio)
                    node=node.get(0)

                const element=this.renderNode(node,createElement,components)
                if(callback){
                    callback($,element,_content)
                }

                return element
            }
        }
    })
})
