import {dom} from "we-edit"
import tck from "we-edit/__tests__/input-event-tck"
import JSXDocument from "../src/type/jsx"

tck(JSXDocument, `${__dirname}/doc.wejsx`, undefined, getEditor=>{
    const {Shape:{Path}, Unknown:{UnitShape}}=dom
    const shape={geometry:Path.fromRect({width:50,height:50})}
    const anchor={current:{x:5, y:5}}
    const frame={margin:5}
    describe("structure",()=>{
        let editor=null
        function create(parent, element){
            const current=editor.$(parent)
            editor.cursorAt(current.attr('id'))
            editor.create(element)
            return editor.$target
        }

        beforeEach(()=>editor=getEditor())

        describe("create",()=>{
            it.each([["page"],["frame"]])("anchor in %s", parent=>{debugger
                const $anchor=create(parent, {type:"anchor", ...anchor})
                expect($anchor.parent().is(parent)).toBe(true)
                expect($anchor.toJS()).toMatchObject({type:'anchor', props:{x:{offset:anchor.current.x},y:{offset:anchor.current.y}}})
            })
    
            it.each([["page"],["frame"]])("shape in %s",parent=>{
                const $shape=create(parent, {type:"shape", anchor, shape, frame}), $anchor=$shape.parent()
                expect($anchor.parent().is(parent)).toBe(true)
                expect($shape.toJS()).toMatchObject({type:'shape', props:{geometry:shape.geometry.toString()}})
                expect($anchor.toJS()).toMatchObject({type:'anchor', props:{x:{offset:anchor.current.x},y:{offset:anchor.current.y}}})
                expect($shape.children().length).toBe(0)
            })
    
            it.each([["page"],["frame"]])("textbox in %s",parent=>{
                const $shape=create(parent, {type:"textbox", anchor, shape, frame}).closest("shape")
                const $anchor=$shape.parent(),  $frame=$shape.children()
                expect($anchor.parent().is(parent)).toBe(true)
                expect($shape.toJS()).toMatchObject({type:'shape', props:{geometry:shape.geometry.toString()}})
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
                    x:{offset:UnitShape.normalize("2cm")},
                    y:{offset:anchor.current.y},
                    z:1,
                    wrap:"square"
                }})
                debugger
                editor.update({type:"anchor",wrap:{mode:"tight",side:"larger",distance:"1cm"}})
                const elAnchor=$anchor.toJS()
                expect(elAnchor).toMatchObject({props:{
                    x:{offset:UnitShape.normalize("2cm")},
                    y:{offset:anchor.current.y},
                    z:1,
                    wrap:{
                        mode:"tight",
                        side:"larger"
                    }
                }})

                expect(typeof(elAnchor.props.wrap.distance)=="function").toBe(true)
                editor.update({type:"anchor",wrap:{distance:"2"}})
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

            let path=Path.fromRect({width:100,height:100})
            editor.update({type:"shape", geometry:path})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,geometry:path.toString()}})

            path=Path.fromCircle({r:10})
            editor.update({type:"shape", geometry:path})
            expect($shape.toJS()).toMatchObject({type:"shape", props:props={...props,geometry:path.toString()}})

            editor.update({type:"shape", anchor:{...anchor,wrap:"square"}, shape:{scale:0.5}})
            expect($anchor.toJS()).toMatchObject({type:"anchor",props:{wrap:"square"}})
            
        })

        it("update textbox: {anchor, shape, frame}",()=>{
            const $shape=create("page",{type:"textbox",anchor,shape,frame}).closest("shape")
            const $anchor=$shape.parent(), $frame=$shape.children()
            let props={}
            jest.spyOn(editor,'update_textbox')
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
            expect($shape.attr('geometry')).toBe(Path.fromRect({width:200,height:200}).toString())
            expect($frame.toJS()).toMatchObject({type:'frame',props:{width:200,height:200}})
        })
    })
})