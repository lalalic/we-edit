import React from "react"
import PropTypes from "prop-types"

import {context,render as testRender, defaultProps} from "../context"

import {Editors} from "../../src"
import Responsible from "../../src/composed/responsible"
import Positioning from "../../src/composed/positioning"


export default function define(feature, tests){
    const {Document, Section, Container,Frame, Paragraph, Text, Image,Anchor, Table, Row, Cell, Shape}=Editors
    var uuid=10000
	const size={width:20,height:500}
	const pgGap=12
    const mockQuery=(key,value)=>{
            Paragraph.prototype.query=jest.fn(()=>{
                return {
                    [key]:()=>{
                        return {
                            attr(){
                                return value
                            }
                        }
                    }
                }
            })
    }
    const render=(content,{state,page={}}={}, byCreate=true)=>{
            var sectionProps={}
            if(byCreate){
                const Page=Section.fissureLike(Frame)
                sectionProps.create=(a,b)=>new Page({...a,...size,...page},b)
            }else{
                sectionProps={page:{...size,...page}}
            }

            const Context=context({dom:Editors,state,contextTypes:{numbering:PropTypes.func}, context:{numbering:()=>'*'}})

            const renderer=testRender(
                <Context>
                    <Document viewport={{width:500,height:500,node:{scrollTop:0}}}>
                        <Editors.Section id={`${++uuid}`} {...sectionProps}>
                        {content}
                        </Editors.Section>
                    </Document>
                </Context>
            )

            const doc=renderer.root.findByType(Document).instance
            const responsible=renderer.root.findByType(Responsible).instance
            return {
                renderer,
                doc,
                responsible,
                get(id){
                    return doc.getComposer(id)
                }
            }
    }

    beforeAll(()=>{
        defaultProps(Editors)()
		Document.prototype.shouldContinueCompose=jest.fn(a=>true)
	})

    describe.each([

        ["section", render],

        ["page", (a,b)=>render(a,b,false)],

        ["in shape", (a,...args)=>{
            const {page:{width=size.width,height=size.height}={}}=args[0]||{}
            const shape=(<Shape {...{children:a,id:"container", ...size,width,height}}/>)
            return render(
                <Paragraph id={++uuid}>
                    {shape}
                </Paragraph>,
                ...args
            )
        }],
        
        ["in table", (a,...args)=>{
            const Zero={sz:0}
            const {page:{width=size.width,height=size.height}={}}=args[0]||{}
            return render(
                <Table id={++uuid} width={width}>
                    <Row id={++uuid} cols={[{x:0,width}]}>
                        <Cell id={"container"} border={{left:Zero,right:Zero,top:Zero,bottom:Zero}}>
                            {a}
                        </Cell>
                    </Row>
                </Table>,
                ...args
            )
        }]

    ]//.filter(([a])=>a=="section")
    )("%s",(TESTING, render)=>{
        describe(feature, ()=>{
            tests({dom:Editors,TESTING, render, mockQuery, pgGap, size, uuid,Responsible, Positioning})
        })
    })
}
