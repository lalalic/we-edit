export default ({doc, tick,every,describe,it,xdescribe,xit,fit,fdescribe,expect,beforeEach,afterEach, wait})=>{
    const {dispatch,ACTION}=doc
    const TIME=400

    afterEach(()=>wait(TIME))

    describe("scroll",()=>{
        it("to content out of viewport",()=>{
            return dispatch(ACTION.Cursor.AT('95{word/document.xml}',9))
                .then(()=>expect(doc.isInView('95{word/document.xml}')).toBe(true))
        })

        it("to focusable image out of viewport",()=>{
            return dispatch(ACTION.Selection.SELECT('12{word/document.xml}',0,'12{word/document.xml}',1))
                .then(()=>expect(doc.isInView('12{word/document.xml}')).toBe(true))
        })
    })

    describe("text",()=>{
        const id="15{word/document.xml}", at=2

        beforeEach(()=>dispatch(ACTION.Cursor.AT(id, at)).then(()=>expect(doc.isInView(id)).toBe(true)))

        it("cursor At 2",()=>{
            doc.click()
            expect(doc.selection).toMatchObject({start:{id,at},end:{id,at}})
        })

        it("extend",()=>{
            doc.doubleClick()
            expect(doc.selection)
                .toMatchObject({start:{id,at:0}, end:{id,at:5}})
        })

        it("change style",()=>{
            return dispatch(ACTION.Selection.SELECT('15{word/document.xml}',7,undefined,15))
                .then(()=>every(TIME, dispatch,[
                ...([["size",24],["bold",true],["italic",true],["color","red"]].map(([k,v])=>({
                        type: 'we-edit/selection/UPDATE',
                        payload: {
                        text: {
                            [k]: v,
                        }
                        }
                    })))
                ])).then(()=>{
                    const style=doc.selectionStyle.props("text",false)
                    expect(style).toBeTruthy()
                    expect(style.size).toBe(24)
                    expect(style.bold).toBe(true)
                    expect(style.italic).toBe(true)
                    expect(style.color).toBe("red")
                })
        })

        it("bold type 'good morning'", ()=>{
            return every(TIME, dispatch,[
                  ACTION.Cursor.AT('189{word/document.xml}',32),
                  {
                    type: 'we-edit/selection/UPDATE',
                    payload: {
                      text: {
                        bold: true
                      }
                    }
                  }
            ]).then(()=>every(TIME, ch=>dispatch({type: 'we-edit/text/TYPE',payload: ch}),"good morning"))
        },10000)
    })



    describe("image",()=>{
        const id='12{word/document.xml}', type="image"
        beforeEach(()=>
            dispatch(ACTION.Selection.SELECT(id,0,id,1))
                .then(()=>expect(doc.isInView(id)).toBe(true))
        )

        it("rotate image",()=>{
            return tick(4000, 138,720, rotate=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                        id,
                        type,
                        rotate
                    }
                })
            }).then(()=>{
                const {outline:{rotate}={}}=doc.selectionStyle.props("image")||{}
                expect(rotate).toBe(720)
            })
        })

        it("resize image height", ()=>{
            return tick(4000, 60,100,height=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                      id,
                      type,
                      size: {
                        height
                      }
                    }
                  })
            }).then(()=>{
                const {outline:{height}={}}=doc.selectionStyle.props("image")||{}
                expect(height).toBe(100*doc.precision)
            })
        })

        it("resize image width", ()=>{
            return tick(4000, 120,200,width=>{
                dispatch({
                    type: 'we-edit/entity/UPDATE',
                    payload: {
                      id,
                      type,
                      size: {
                        width
                      }
                    }
                  })
            }).then(()=>{
                const {outline:{width}={}}=doc.selectionStyle.props("image")||{}
                expect(width).toBe(200*doc.precision)
            })
        })
    })

    describe("table",()=>{
        it("can resize column",()=>{
            return dispatch(ACTION.Cursor.AT('95{word/document.xml}',2))
                    .then(()=>tick(4000, 200,300,value=>{
                        dispatch({
                            type: 'we-edit/entity/UPDATE',
                            payload: {
                                id: '153{word/document.xml}',
                                type: 'table',
                                width: {
                                    value,
                                    row: '131{word/document.xml}',
                                    cell: '128{word/document.xml}',
                                    i: 1
                                }
                            }
                        })
                    })).then(()=>{
                        const cell=doc.selectionStyle.props("cell",false)
                        expect(cell.width).toBe(300*doc.precision)
                    })
        },10000)

        it("can resize row",()=>{
            return dispatch(ACTION.Cursor.AT('135{word/document.xml}',1))
                .then(()=>tick(4000, 48, 350, value=>{
                    dispatch({
                        type: 'we-edit/entity/UPDATE',
                        payload: {
                        id: '153{word/document.xml}',
                        type: 'table',
                        height: {
                            value,
                            row: '138{word/document.xml}',
                            cell: '135{word/document.xml}',
                            i: 1
                        }
                        }
                    })
                })).then(()=>{
                    const row=doc.selectionStyle.props("row",false)
                    expect(row.height).toBe(350*doc.precision)
                })
        })
    })
}