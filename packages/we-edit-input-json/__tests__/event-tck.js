import {dom} from "we-edit"
import tck from "we-edit/__tests__/input-event-tck"
import JSXDocument from "../src/type/jsx"

tck(JSXDocument, `${__dirname}/doc.wejsx`, true, getEditor=>{
    const {Shape:{Geometry}, Unknown:{UnitShape}}=dom
    const shape={geometry:Geometry.create({width:50,height:50})}
    const anchor={current:{x:5, y:5, id:null}}
    const frame={margin:5}
    describe("structure",()=>{
        let editor=null
        function create(parent, element){
            const current=editor.$(parent)
            editor.cursorAt(current.attr('id'))
            if(element.anchor && element.anchor.current && !element.anchor.current.id){
                element.anchor={...element.anchor, current:{...element.anchor.current, id:current.attr('id')}}
            }else if(element.type=="anchor" && element.current&& !element.current.id){
                element={...element,current:{...element.current,id:current.attr('id')}}
            }
            editor.create(element)
            return editor.$target
        }

        beforeEach(()=>editor=getEditor())

        describe("create",()=>{
            it.each([["page"],["frame"]])("anchor in %s", parent=>{
                const $anchor=create(parent, {type:"anchor", ...anchor})
                expect($anchor.parent().is(parent)).toBe(true)
                expect($anchor.toJS()).toMatchObject({type:'anchor', props:{x:{offset:anchor.current.x},y:{offset:anchor.current.y}}})
            })
    
            it.each([["page"],["frame"]])("shape in %s",parent=>{
                const $shape=create(parent, {type:"shape", anchor, shape, frame}), $anchor=$shape.parent()
                expect($anchor.parent().is(parent)).toBe(true)
                expect($shape.toJS()).toMatchObject({type:'shape', props:{geometry:{type:"rect",width:50,height:50}}})
                expect($anchor.toJS()).toMatchObject({type:'anchor', props:{x:{offset:anchor.current.x},y:{offset:anchor.current.y}}})
                expect($shape.children().length).toBe(0)
            })
    
            it.each([["page"],["frame"]])("textbox in %s",parent=>{
                const $shape=create(parent, {type:"textbox", anchor, shape, frame}).closest("shape")
                const $anchor=$shape.parent(),  $frame=$shape.children()
                expect($anchor.parent().is(parent)).toBe(true)
                expect($shape.toJS()).toMatchObject({type:'shape', props:{geometry:{type:"rect",width:50,height:50}}})
                expect($anchor.toJS()).toMatchObject({type:'anchor', props:{x:{offset:anchor.current.x},y:{offset:anchor.current.y}}})
                expect($frame.toJS()).toMatchObject({type:'frame', props:{...frame}})
                expect(editor.$target.toJS()).toMatchObject({type:"text"})
            })
        })
    
        describe("update anchor",()=>{
            let $anchor=null, $shape=null
            beforeEach(()=>{
                $shape=create("page", {type:"shape", anchor, shape, frame})
                $anchor=$shape.parent()
            })
            it("move",()=>{
                editor.move({dest:{dx:5,dy:10}})
                expect($anchor.toJS()).toMatchObject({props:{
                    x:{offset:anchor.current.x+5},
                    y:{offset:anchor.current.y+10},
                }})
            })

            it("x=>2cm, wrap, z",()=>{
                editor.update({type:"anchor",x:"2cm",wrap:"square",z:1})
                expect($anchor.toJS()).toMatchObject({props:{
                    x:'2cm',
                    y:{offset:anchor.current.y},
                    z:1,
                    wrap:"square"
                }})
                debugger
                editor.update({type:"anchor",wrap:{mode:"tight",side:"larger",distance:"1cm"}})
                const elAnchor=$anchor.toJS()
                expect(elAnchor).toMatchObject({props:{
                    x:'2cm',
                    y:{offset:anchor.current.y},
                    z:1,
                    wrap:{
                        mode:"tight",
                        side:"larger",
                        distance:"1cm",
                    }
                }})
            })
        })

        it("update shape: {fill, outline, geometry, rotate, scale}",()=>{
            const $shape=create("page",{type:"shape",anchor,shape,frame})
            const $anchor=$shape.parent()
            let props={}
            editor.update({type:"shape", rotate:30, scale:2})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={rotate:30,scale:2}})
            editor.update({type:"shape", rotate:15, scale:1})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={rotate:15,scale:1}})

            editor.update({type:"shape", fill:"red"})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,fill:"red"}})
            editor.update({type:"shape", fill:{transparency:0.1}})

            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,fill:{color:"red", transparency:0.1}}})
            
            editor.update({type:"shape", outline:2})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,outline:2}})
            editor.update({type:"shape", outline:{color:"red"}})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,outline:{width:2,color:"red"}}})

            let path=Geometry.create({width:100,height:100})
            editor.update({type:"shape", geometry:path})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,geometry:{type:"rect",width:100,height:100}}})

            path=Geometry.create({type:"circle",r:10})
            editor.update({type:"shape", geometry:path})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,geometry:{type:"circle",r:10}}})

            editor.update({type:"shape", anchor:{...anchor,wrap:"square"}, shape:{scale:0.5}})
            expect($anchor.toJS()).toMatchObject({type:"anchor",props:{wrap:"square"}})
            
        })

        it("update textbox: {anchor, shape, frame}",()=>{
            const $shape=create("page",{type:"textbox",anchor,shape,frame}).closest("shape")
            const $anchor=$shape.parent(), $frame=$shape.children()
            jest.spyOn(editor,'update_textbox')
            debugger
            editor.update({type:"textbox", anchor:{...anchor,wrap:"square"},shape:{outline:5},frame:{margin:5}})
            expect(editor.update_textbox).toHaveBeenCalledTimes(1)
            expect($anchor.toJS()).toMatchObject({type:"anchor",props:{wrap:"square"}})
            expect($frame.toJS()).toMatchObject({type:"frame",props:{margin:5}})
            expect($shape.toJS()).toMatchObject({type:"shape",props:{outline:5}})
        })

        it("shape should be resized by payload {size:{width,height}}",()=>{
            const $shape=create("page",{type:"textbox",anchor,shape,frame}).closest("shape")
            const $anchor=$shape.parent(), $frame=$shape.findFirst('frame')
            editor.update({type:"shape", size:{width:200,height:200}})
            expect($shape.toJS()).toMatchObject({props:{geometry:{type:"rect",width:200,height:200}}})
            expect($frame.toJS()).toMatchObject({type:'frame',props:{width:200,height:200}})
        })

        describe("numbering",()=>{
            it("can create numbering style, and can get by id and level",()=>{
                const style={indent:"5mm",hanging:"3mm",style:{fonts:"Arial"}, label:"*"}
                const numbering=editor.createNumbering(style)
                expect(numbering.id).toBeDefined()
                expect(numbering.level).toBeDefined()
                expect(editor.getNumbering(numbering)).toMatchObject(style)
            })

            it("can create numbering level style by updateNumbering",()=>{
                const style={indent:"5mm",hanging:"3mm",style:{fonts:"Arial"}, label:"*"}
                const {id}=editor.createNumbering(style)
                editor.updateNumbering({id,level:1})
                const level1=editor.getNumbering({id,level:1})
                expect({...level1,indent:undefined}).toMatchObject({...style,indent:undefined})
                expect(Math.round(parseFloat(level1.indent))).toBe(10)
            })

            it("can set numbering{id} when first set numbering style at any position of paragraph",()=>{
                const p=editor.$().findFirst('paragraph')
                const text= p.findFirst('text')
                editor.cursorAt(text.attr('id'),2)
                editor.update({type:"paragraph",numbering:{style:{fonts:"Arial"},label:"*"}})
                expect(p.attr('numbering').toJS().id).toBeDefined()
            })

            describe("operation",()=>{
                it("should use immediate prev paragraph sibling's numbering id and level when creating same style numbering",()=>{
                    const p=editor.$().findFirst('paragraph[numbering]')
                    const next=p.next()
                    expect(next.attr('numbering')).toBeFalsy()
                    expect(next.prev().attr('id')).toBe(p.attr('id'))
                    editor.cursorAt(next.attr('id'))
                    editor.update({type:"paragraph",numbering:editor.getNumbering(p.attr('numbering').toJS())})
                    expect(next.attr("numbering").toJS()).toMatchObject(p.attr('numbering').toJS())
                })

                it("should use last non-empty prev paragraph silibing's numbering when creating same style numbering",()=>{
                    const p=editor.$().findFirst('paragraph[numbering]')
                    const next=p.nextAll().filter(a=>editor.$(a).text())
                    expect(next.length).toBe(1)
                    expect(p.next().attr('id')).not.toBe(next.attr('id'))
                    editor.cursorAt(next.attr('id'))
                    editor.update({type:"paragraph",numbering:editor.getNumbering(p.attr('numbering').toJS())})
                    expect(next.attr("numbering").toJS()).toMatchObject(p.attr('numbering').toJS())
                })

                it("should increase level when tab at begining of numbering paragraph",()=>{
                    const p=editor.$().findFirst('paragraph[numbering]')
                    editor.cursorAt(p.attr("id"))
                    editor.tab()
                    expect(p.attr('numbering').toJS().level).toBe(1)
                })

                it("should decrease level when backspace at beginning of numbering paragraph, and level>1",()=>{
                    const p=editor.$().findFirst('paragraph[numbering]')
                    editor.cursorAt(p.attr("id"))
                    editor.tab()
                    expect(p.attr('numbering').toJS().level).toBe(1)
                    editor.backspace()
                    expect(p.attr('numbering').toJS().level).toBe(0)
                })

                it("should remove numbering when backspace at 0 level numbering paragraph",()=>{
                    const p=editor.$().findFirst('paragraph[numbering]')
                    editor.cursorAt(p.attr("id"))
                    editor.backspace()
                    expect(p.attr('numbering')).not.toBeDefined()
                })

                it("should create numbering paragrahp when enter at end of numbering paragraph",()=>{
                    const p=editor.$().findFirst('paragraph[numbering]')
                    editor.cursorAt(p.attr("id"),1)
                    editor.enter()
                    expect(editor.target.closest('paragraph').attr('id')).not.toBe(p.attr('id'))
                    expect(editor.target.closest('paragraph').attr('numbering').toJS()).toMatchObject(p.attr('numbering').toJS())
                })
            })

        })
    })
})