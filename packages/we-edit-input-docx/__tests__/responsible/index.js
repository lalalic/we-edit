import {getSelection, ACTION} from "we-edit"
export default ({doc, tick,every, describe,it,xdescribe,xit,fit,fdescribe,expect,beforeEach,afterEach, wait})=>{
    const {store}=doc, dispatch=store.dispatch.bind(store)
    
    afterEach(()=>wait(300))

    describe("scroll",()=>{
        it("to cursor",()=>{
            dispatch(ACTION.Cursor.AT('95{word/document.xml}',9),doc=>doc.selectionStyle)
        })

        it("to range",()=>{
            dispatch(ACTION.Selection.SELECT('12{word/document.xml}',0,'12{word/document.xml}',1))
        })
    })

    describe("text",()=>{
        const id="15{word/document.xml}", at=2

        beforeEach(()=>dispatch(ACTION.Cursor.AT(id, at)))

        it("cursor At 2",()=>{
            doc.click()
            expect(getSelection(store.getState())).toMatchObject({start:{id,at},end:{id,at}})
        })

        it("extend",()=>{
            doc.doubleClick()
            expect(getSelection(store.getState()))
                .toMatchObject({start:{id,at:0}, end:{id,at:5}})
        })

        it("change style",()=>{
            return every(400, dispatch,[
                ACTION.Selection.SELECT('17{word/document.xml}',7,undefined,15),
                ...([["size",24],["bold",true],["italic",true],["color",'red']].map(([k,v])=>({
                    type: 'we-edit/selection/UPDATE',
                    payload: {
                      text: {
                        [k]: v,
                      }
                    }
                })))
            ])
        })

        it("type", ()=>{
            every(200, dispatch,[
                  ACTION.Cursor.AT('190{word/document.xml}',32),
                  {
                    type: 'we-edit/selection/UPDATE',
                    payload: {
                      text: {
                        bold: true
                      }
                    }
                  }
            ])

            every(200, ch=>dispatch({type: 'we-edit/text/TYPE',payload: ch}),"good morning")
        })
    })

    describe("image",()=>{
       beforeEach(()=>dispatch(ACTION.Selection.SELECT('12{word/document.xml}',0,'12{word/document.xml}',1)))

        it("rotate image",()=>{
            return tick(4000, 138,720, rotate=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                        id: '12{word/document.xml}',
                        type: 'image',
                        rotate
                    }
                })
            })
        })

        it("resize image height", ()=>{
            return tick(4000, 60,100,height=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                      id: '12{word/document.xml}',
                      type: 'image',
                      size: {
                        height
                      }
                    }
                  })
            })
        })

        it("resize image width", ()=>{
            return tick(4000, 120,200,width=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                      id: '12{word/document.xml}',
                      type: 'image',
                      size: {
                        width
                      }
                    }
                  })
            })
        })
    })

    describe("table",()=>{
        it("can resize column",()=>{
            dispatch(ACTION.Cursor.AT('95{word/document.xml}',9))
            return tick(4000, 200,100,value=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                        id: '157{word/document.xml}',
                        type: 'table',
                        width: {
                            value,
                            row: '90{word/document.xml}',
                            cell: '87{word/document.xml}',
                            i: 1
                        }
                    }
                })
            })
        })

        it("can resize row",()=>{
            dispatch(ACTION.Cursor.AT('138{word/document.xml}',0))
            return tick(4000, 48, 300, value=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                      id: '157{word/document.xml}',
                      type: 'table',
                      height: {
                        value,
                        row: '142{word/document.xml}',
                        cell: '139{word/document.xml}',
                        i: 1
                      }
                    }
                  })
            })
        })
    })


}