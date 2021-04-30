import React from "react"
import ReactDOM from 'react-dom'
import TestRenderer from "react-test-renderer"
import Overlay from "../../src/composed/responsible-canvas/overlay"
import Resizable from "../../src/composed/responsible-canvas/resizable"
import Movable from "../../src/composed/responsible-canvas/movable"
import Rotatable from "../../src/composed/responsible-canvas/rotatable"
import Focusable from "../../src/composed/responsible-canvas/focusable"
import {createEmptyStore, dom} from "we-edit"

ReactDOM.createPortal = jest.fn(node => node)

describe("overlay",()=>{
    function render(element){
        Overlay.WhenMouseDown.prototype.toCanvasPoint=jest.fn((p)=>p)
        Overlay.WhenMousePressedMove.prototype.toCanvasPoint=jest.fn((p)=>p)
        const rendered=TestRenderer.create(element)
        const root=rendered.root
        const container=root.findByType('g')
        const $root=rendered.getInstance()
        const event={buttons:1,stopPropagation:jest.fn()}
        return {
            rendered, $root, root, container,event,
            mouseDown(e){
                container.props.onMouseDown({...event,...e})
                return this
            },
            mouseMove(e){
                const overlay=rendered.root.findByType(Overlay)
                overlay.props.onMouseMove({...event,...e})
                return this
            },
            mouseUp(e){
                const overlay=rendered.root.findByType(Overlay)
                overlay.props.onMouseUp({...event,...e})
                return this
            },
            onMouseMove(e){
                container.props.onMouseMove({...event,...e})
                return this
            },
            get overlay(){
                return rendered.root.findByType(Overlay)
            },

            get mouseDownOverlay(){
                return rendered.root.findByType(Overlay.WhenMouseDown)
            },
            get mouseMoveOverlay(){
                return rendered.root.findByType(Overlay.WhenMousePressedMove)
            }
        }
    }
    describe("WhenMouseDown",()=>{
        it("should have no overlay when created",()=>{
            const overlay=render(<Overlay.WhenMouseDown/>)
            expect(()=>rendered.root.findByType(Overlay)).toThrowError()
        })

        it("should show an overlay when mouse down",()=>{
            const overlay=render(<Overlay.WhenMouseDown/>).mouseDown()
            expect(overlay.overlay).toBeDefined()
        })

        it("should have motionPoint when mouse down, and call onStart",()=>{
            const onStart=jest.fn(), onMouseMove=jest.fn()
            const overlay=render(<Overlay.WhenMouseDown onStart={onStart} onMouseMove={onMouseMove}/>)
            overlay.mouseDown({clientX:1,clientY:2})
            expect(onStart).toHaveBeenCalled()
            expect(overlay.$root.motionPoint).toMatchObject({x:1,y:2})
        })

        it("should call onMouseMove when mousemove, and motionPoint is on last point, motionRect",()=>{
            const onMouseMove=jest.fn()
            const overlay=render(<Overlay.WhenMouseDown onMouseMove={onMouseMove}/>)
            overlay.mouseDown({clientX:1,clientY:2})
            overlay.mouseMove({clientX:5,clientY:10})
            expect(onMouseMove.mock.calls[0]).toMatchObject([{},{dx:4,dy:8}])
            expect(overlay.$root.motionPoint).toMatchObject({x:5,y:10})
            expect(overlay.$root.motionRect).toMatchObject({left:1,top:2,right:5,bottom:10})
        })

        it("should have no overlay when mouseup, and motionPoint/Rect should reset when restart",()=>{
            const onMouseMove=jest.fn()
            const overlay=render(<Overlay.WhenMouseDown onMouseMove={onMouseMove}/>)
            overlay.mouseDown({clientX:1,clientY:2})
            expect(overlay.$root.motionPoint).toMatchObject({x:1,y:2})
            overlay.mouseUp({clientX:5,clientY:10})
            expect(overlay.$root.motionPoint).toMatchObject({x:5,y:10})
            
            expect(()=>rendered.root.findByType(Overlay)).toThrowError()
            overlay.mouseDown({clientX:10,clientY:20})
            expect(overlay.$root.motionPoint).toMatchObject({x:10,y:20})
            expect(overlay.$root.motionRect).toMatchObject({left:10,top:20,right:10,bottom:20})
        })
    })

    describe("WhenMousePressedMove",()=>{
        it("should have no overlay",()=>{
            const overlay=render(<Overlay.WhenMousePressedMove/>)
            expect(()=>rendered.root.findByType(Overlay)).toThrowError()
        })

        it("should show an overlay when mouse move, and call onStart",()=>{
            const onStart=jest.fn()
            const overlay=render(<Overlay.WhenMousePressedMove onStart={onStart}/>).onMouseMove()
            expect(onStart).toHaveBeenCalled()
            expect(overlay.overlay).toBeDefined()
        })

        it("should have motionPoint when mouse pressed move",()=>{
            const onMouseMove=jest.fn()
            const overlay=render(<Overlay.WhenMousePressedMove onMouseMove={onMouseMove}/>).onMouseMove()
            expect(onMouseMove).not.toHaveBeenCalled()
            overlay.mouseMove({clientX:1,clientY:2})
            expect(onMouseMove).toHaveBeenCalled()
            expect(overlay.$root.motionPoint).toMatchObject({x:1,y:2})
        })

        it("should call onMouseMove when mousemove, and motionPoint is on last point, motionRect",()=>{
            const onMouseMove=jest.fn()
            const overlay=render(<Overlay.WhenMousePressedMove onMouseMove={onMouseMove}/>).onMouseMove({clientX:1,clientY:2})
            overlay.mouseMove({clientX:5,clientY:10})
            expect(onMouseMove.mock.calls[0]).toMatchObject([{},{dx:4,dy:8}])
            expect(overlay.$root.motionPoint).toMatchObject({x:5,y:10})
            expect(overlay.$root.motionRect).toMatchObject({left:1,top:2,right:5,bottom:10})
        })

        it("should have no overlay when mouseup, and motionPoint/Rect should be reset when restart",()=>{
            const onMouseMove=jest.fn()
            const overlay=render(<Overlay.WhenMousePressedMove onMouseMove={onMouseMove}/>).onMouseMove()
            overlay.mouseUp({clientX:5,clientY:10})
            expect(()=>rendered.overlay).toThrowError()
            expect(overlay.$root.motionPoint).toMatchObject({x:5,y:10})

            overlay.onMouseMove({clientX:10,clientY:20})
            expect(overlay.$root.motionPoint).toMatchObject({x:10,y:20})
            expect(overlay.$root.motionRect).toMatchObject({left:10,top:20,right:10,bottom:20})
        })
    })

    describe("Resizable",()=>{
        it("should have not overlay when create",()=>{
            const resizable=render(<Resizable onResize={jest.fn()} />)
            expect(()=>resizable.root.findByType(Overlay)).toThrowError()
        })

        it("should have all spots",()=>{
            const resizable=render(<Resizable onResize={jest.fn()} spots={[{x:0,y:1,direction:"ns"},{x:2,y:11,direction:"ew"}]}/>)
            expect(resizable.root.findByProps({"data-direction":"ns"})).toBeDefined()
            expect(resizable.root.findByProps({"data-direction":"ew"})).toBeDefined()
        })

        it("should have overlay and call onStart when move on spot",()=>{
            const onStart=jest.fn()
            const resizable=render(<Resizable onResize={jest.fn()} onStart={onStart} spots={[{x:0,y:1,direction:"ns"}]}/>)
            resizable.onMouseMove({clientX:0,clientY:0,nativeEvent:{target:{dataset:{direction:"ns"},style:{cursor:"ns"}}}})
            expect(resizable.overlay).toBeDefined()
            expect(onStart).toHaveBeenCalled()
        })
        
        it.each([
            ["ns",{y:-(7-1),x:undefined}, {y:-10}],
            ["-ns",{y:(7-1),x:undefined}, {y:10}],
            ["ew",{x:5-0,y:undefined},{x:10}],
            ["-ew",{x:-(5-0),y:undefined},{x:-10}],
            ["nwse",{x:5,y:6},{x:10,y:10}],
            ["-nwse",{x:-5,y:-6},{x:-10,y:-10}],
            ["nesw",{x:5,y:-6},{x:10,y:-10}],
            ["-nesw",{x:-5,y:6},{x:-10,y:10}],
        ],"should move on %s",(direction, result1, result2,)=>{
            const onResize=jest.fn()
            const resizable=render(<Resizable onResize={onResize} spots={[{x:0,y:1,direction}]}/>)
            resizable.onMouseMove({clientX:0,clientY:1,nativeEvent:{target:{dataset:{direction},style:{cursor:"ns"}}}})
            resizable.mouseMove({clientX:5,clientY:7})
            expect(onResize).toHaveBeenCalledWith(result)
            resizable.mouseMove({clientX:15,clientY:17})
            expect(onResize).toHaveBeenCalledWith(result)
            
        })
    })

    describe("Movable",()=>{
        it("should have no overlay when created",()=>{
            const movable=render(<Movable/>)
            expect(()=>movable.root.findByType(Overlay)).toThrowError()
        })

        it("should have overlay, and call onStart when mouse move",()=>{
            const onStart=jest.fn()
            const movable=render(<Movable onStart={onStart}/>)
            movable.onMouseMove()
            expect(onStart).toHaveBeenCalled()
            expect(movable.overlay).toBeDefined()
        })

        it("should call onMove when mouse move anchor, call onMove and onEnd when mouse up", ()=>{
            const onMove=jest.fn(), onEnd=jest.fn()
            const movable=render(<Movable onMove={onMove} onEnd={onEnd} isAnchor={true}/>)
            movable.onMouseMove({clientX:1,clientY:1})
            movable.mouseMove({clientX:5,clientY:10})
            expect(onMove).toHaveBeenCalledWith({dest:{dx:4,dy:9}})
            
            movable.mouseUp({clientX:6,clientY:10})
            expect(onMove).toHaveBeenCalledWith({dest:{dx:1,dy:0}})
            expect(onEnd).toHaveBeenCalledWith({dest:{dx:5,dy:9}})

            movable.onMouseMove({clientX:100,clientY:100})
            movable.mouseMove({clientX:115,clientY:110})
            expect(onMove).toHaveBeenCalledWith({dest:{dx:15,dy:10}})
        })

        it("should NOT call onMove when mouse move NON-Anchor, call onEnd only when mouse up", ()=>{
            const onMove=jest.fn(), onEnd=jest.fn()
            const movable=render(<Movable onMove={onMove} onEnd={onEnd} isAnchor={false}/>)
            movable.$root.context.positioning={around:jest.fn(()=>({id:"1",at:5})),position:jest.fn(()=>({x:4,y:6}))}
            movable.onMouseMove({clientX:1,clientY:1})
            movable.mouseMove({clientX:5,clientY:10})
            expect(onMove).not.toHaveBeenCalled()
            movable.mouseUp({clientX:6,clientY:10})
            expect(onMove).not.toHaveBeenCalled()
            expect(onEnd).toHaveBeenCalledWith({dest:{id:"1",at:5,x:4,y:6}})
        })

        it("should have placeholder when move NON-Anchor",()=>{
            const movable=render(<Movable isAnchor={false}/>)
            movable.$root.context.positioning={around:jest.fn(()=>({id:"1",at:5})),position:jest.fn(()=>({x:4,y:6}))}
            expect(()=>movable.root.findByType(Movable.MovingPlaceholder)).toThrowError()
            movable.onMouseMove({clientX:1,clientY:1})
            movable.mouseMove({clientX:5,clientY:10})
            expect(movable.root.findByType(Movable.MovingPlaceholder)).toBeDefined()
        })

        it("should haven't placeholder when moving anchor",()=>{
            const movable=render(<Movable isAnchor={true}/>)
            expect(()=>movable.root.findByType(Movable.MovingPlaceholder)).toThrowError()
            movable.onMouseMove({clientX:1,clientY:1})
            movable.mouseMove({clientX:5,clientY:10})
            expect(()=>movable.root.findByType(Movable.MovingPlaceholder)).toThrowError()
        })
    })

    describe("Rotatable",()=>{
        it("should have no overlay when created",()=>{
            const rotatable=render(<Rotatable x={0} y={0}/>)
            expect(()=>rotatable.root.findByType(Overlay)).toThrowError()
        })

        it("should have overlay and call onStart when first mouse move",()=>{
            const onStart=jest.fn()
            const rotatable=render(<Rotatable x={0} y={0} onStart={onStart}/>)
            rotatable.onMouseMove({clientX:1,clientY:1})
            expect(rotatable.overlay).toBeDefined()
            expect(onStart).toHaveBeenCalled()
        })

        it("should call onRotate when mouse move",()=>{
            const onRotate=jest.fn()
            const rotatable=render(<Rotatable x={0} y={0} onRotate={onRotate}/>)
            rotatable.onMouseMove({clientX:1,clientY:1})
            rotatable.mouseMove({clientX:5,clientY:10})
            expect(onRotate).toHaveBeenCalledWith({degree:156.03})
        })
    })

    describe("Focusable",()=>{
        const render=(props)=>{
            const activeDocStore=createEmptyStore()
            const dispatch=activeDocStore.dispatch=jest.fn()
            const dprops={activeDocStore,path:dom.Shape.Path.fromRect({width:100,height:100}).toString(),children:<span key="content" id="content"/>}
            const rendered=TestRenderer.create(<Focusable {...dprops} {...props}/>)
            const root=rendered.root, $root=rendered.getInstance()
            expect(rendered.root.findByProps({id:"content"})).toBeDefined()
            return {
                rendered,
                root,
                $root,
                dispatch,
                get backend(){
                    return root.findByProps({__backend4:'focusable'}).instance
                },
                get movable(){
                    return new Proxy(root.findByType(Movable),{
                        get(target,key){
                            if(key=="container")
                                return target.findByType('g')
                            if(key=="overlay")
                                return target.findByType(Overlay)
                            return Reflect.get(...arguments)
                        }
                    })
                },
                get resizable(){
                    return root.findByType(Resizable)
                },
                get rotatable(){
                    return root.findByType(Rotatable)
                },
                move(e0,e1){
                    this.movable.container.props.onMouseMove(e0)
                    this.movable.overlay.props.onMouseMove(e1)
                },
                resize(){

                },
                rotate(){

                }
            }
        }

        const hasOverlays=(focusable)=>{
            expect(focusable.movable).toBeDefined()
            expect(focusable.resizable).toBeDefined()
            expect(focusable.rotatable).toBeDefined()
        }

        const hasNotOverlayers=(focusable)=>{
            expect(()=>focusable.movable).toThrowError()
            expect(()=>focusable.resizable).toThrowError()
            expect(()=>focusable.rotatable).toThrowError()
        }

        it("should init with backend",()=>{
            const focusable=render()
            expect(focusable.backend).toBeDefined()
            expect(focusable.backend.state).toMatchObject({status:"unactive"})
        })

        it.each([
            ["unactive"],
            ["focus"],
            ["editing"]
        ], "should not show movable, resizable and rotatabler when editable=false and status=%s",(status)=>{
            const focusable=render()
            focusable.backend.getDerivedStateFromProps=jest.fn((props,state)=>state)
            focusable.backend.context.editable=false 

            focusable.backend.setState({status})
            hasNotOverlays(focusable)
        })

        describe("editable=true",()=>{

            describe("status control",()=>{
                let focusable
                beforeEach(()=>{
                    focusable=render()
                    focusable.backend.getDerivedStateFromProps=jest.fn((props,state)=>state)
                    focusable.backend.context.editable=true         
                })
                
                it("should not show movable, resizable and rotatable when unactive",()=>{
                    expect(focusable.backend.state).toMatchObject({status:"unactive"})
                    hasNotOverlayers(focusable)
                })
        
                it("should show movable, resizable and rotatabler when focus",()=>{
                    focusable.backend.setState({status:"focus"})
                    hasOverlays(focusable)
                })
    
                it("should show movable, resizable and rotatabler when editing",()=>{
                    focusable.backend.setState({status:"editing"})
                    hasOverlays(focusable)
                })
            })
            
            const test=(props, status)=>{
                const focusable=render(props)
                focusable.backend.getDerivedStateFromProps=jest.fn((props,state)=>state)
                focusable.backend.context.editable=true 
                status && focusable.backend.setState({status})
                return focusable
            }

            it.each([["focus"],["editing"]],
                "should get rotate when rotation transform given and status=%s",(status)=>{
                const focusable=test({transform:"rotate(30)"}, status)
                expect(focusable.rotatable.props.degree).toBe(30)
            })
    
            it.each([["focus"],["editing"]],
                "should have no movable when {movable=false} status=%s",(status)=>{
                const focusable=test({movable:false}, status)
                expect(()=>focusable.movable).toThrowError()    
            })

            it.each([["focus"],["editing"]],
                "should have no movable when {rotatable=false} status=%s",(status)=>{
                const focusable=test({rotatable:false}, status)
                expect(()=>focusable.rotatable).toThrowError()    
            })

            it.each([["focus"],["editing"]],
                "should have no movable when {resizable=false} status=%s",(status)=>{
                const focusable=test({resizable:false}, status)
                expect(()=>focusable.resizable).toThrowError()    
            })

            it("can extend editable spots",()=>{
                let focusable=test({}, "focus")
                const len=focusable.resizable.props.spots.length
                expect(len).toBe(8)
                focusable=test({editableSpots:[{direction:"ns",x:1,y:1}]}, "focus")
                expect(focusable.resizable.props.spots.length-len).toBe(1)
            })
        })
        
        describe("status",()=>{
            it("should be focus when itself is selected",()=>{

            })

            it("should be editing when its descendent is selected",()=>{

            })

            it("should be inactive when selection is out of itself",()=>{

            })
        })
    })
})