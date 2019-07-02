import React from "react"
import {context, $, State, render, defaultProps} from "../context"
import {Editors} from "../../src"
import {ReactQuery} from "we-edit"

describe("editor",()=>{
    const {Document, Section,Paragraph, Text}=Editors
    const Context=context({dom:Editors})
    var uuid=1000

    beforeAll(()=>{
		defaultProps(Editors)()
		Paragraph.prototype.children=jest.fn(function(){
			return this.props.children
		})
    })
    
    var doc, element
    const page={width:40,height:25}, gap=12, viewport={width:500,height:30,}
    beforeEach(()=>{
        ReactQuery.Selector.type=jest.fn(type=>element=>{
            return element.type && 
                element.type==type || 
                element.type.displayName==type ||
                (element.type.getType && element.type.getType()==type)
        })
        const renderer=render(element=
            <Context>
                <Document id="root"
                    pageGap={gap}
                    viewport={{...viewport, node:{scrollTop:0}}}
                    screenBuffer={0}
                    scale={1}>
                    <Section id={++uuid} page={page} key="1">
                        <Paragraph id={++uuid}>
                            <Text id={++uuid}>
                                Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. 
                            </Text>
                        </Paragraph>
                    </Section>
                    <Section id={++uuid} page={page} key="2">
                        <Paragraph id={++uuid}>
                            <Text id={++uuid}>
                            Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. 
                            </Text>
                        </Paragraph>
                    </Section>               
                </Document>
            </Context>
        )
        const instance=renderer.root.findByType(Document).instance
        doc={
            get pages(){
                return instance.computed.composed
            },
            get root(){
                return instance
            },
            update(selector, props){
                const $=new ReactQuery(element)
                const found=$.findFirst(selector)
                if(found.length>0){
                    element=$.replace(found,React.cloneElement(found.get(0), props),{changed:true}).get(0)
                    renderer.update(element)
                }
                return doc
            },
            scroll2Y(y=0){
                instance.setState({mode:"scroll",y})
                return doc
            },
        }
    })
    it("can arbitrarily recompose after editing",()=>{
        expect(doc.pages.length).toBe(2)
        doc.update('text',{children:"hello"})
        expect(doc.pages.length).toBe(1)
        doc.scroll2Y(gap+page.height)
        expect(doc.pages.length).toBe(3)
    })
})