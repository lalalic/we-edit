export default ({doc, tick,every,describe,it,xdescribe,xit,fit,fdescribe,expect,beforeEach,afterEach, wait})=>{
    const {dispatch,ACTION}=doc
    const TIME=400, TIMEOUT=60*1000
    const IMAGE=doc.querySelector('image').attr('id')

    afterEach(()=>wait(TIME))

    describe("scroll",()=>{
        it("to content out of viewport",()=>{
            const text=doc.querySelector('table text')
            const id=text.attr('id')
            return dispatch(ACTION.Cursor.AT(id,0),undefined, TIMEOUT)
                .then(()=>expect(doc.isInView(id)).toBe(true))
        },TIMEOUT)

        it("to focusable image out of viewport",()=>{
            return dispatch(ACTION.Selection.SELECT(IMAGE,0,IMAGE,1))
                .then(()=>expect(doc.isInView(IMAGE)).toBe(true))
        })
    })

    describe("text",()=>{
        const firstText=doc.querySelector('section>paragraph').findFirst('text'), len=firstText.text().length
        const id=firstText.attr('id'), at=Math.min(len-1,2)

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
            return dispatch(ACTION.Selection.SELECT(id,0,id,len-1))
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
        },TIMEOUT)

        it("bold type 'good morning'", ()=>{
            const text=doc.querySelector('section>paragraph').eq(1).findFirst('text'),len=text.text().length
            const id=text.attr('id')
            return every(50, dispatch,[
                  ACTION.Cursor.AT(id,Math.min(len-1,5)),
                  {
                    type: 'we-edit/selection/UPDATE',
                    payload: {
                      text: {
                        bold: true
                      }
                    }
                  }
            ]).then(()=>every(TIME, ch=>dispatch({type: 'we-edit/text/TYPE',payload: ch}),"good morning"))
        },TIMEOUT)
    })



    describe("image",()=>{
        const id=doc.querySelector().findFirst('image').attr('id'), type="image"
        beforeEach(()=>
            dispatch(ACTION.Selection.SELECT(id,0,id,1))
                .then(()=>expect(doc.isInView(id)).toBe(true))
        )

        it("rotate image",()=>{
            return tick(10*1000, 138,720, rotate=>{
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
        },TIMEOUT)

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
        const table=doc.querySelector('table')
        it("can resize column",()=>{
            const i=1
            const row=table.find('row').eq(i)
            const cell=row.find('cell').eq(i)
            const p=cell.findFirst('paragraph')
            return dispatch(ACTION.Cursor.AT(p.attr('id'),0), undefined, TIMEOUT)
                    .then(()=>tick(4000, 200,300,value=>{
                        dispatch({
                            type: 'we-edit/entity/UPDATE',
                            payload: {
                                id: table.attr('id'),
                                type: 'table',
                                width: {
                                    value,
                                    row: row.attr('id'),
                                    cell: cell.attr('id'),
                                    i,
                                }
                            }
                        })
                    })).then(()=>{
                        const cell=doc.selectionStyle.props("cell",false)
                        expect(cell.width).toBe(300*doc.precision)
                    })
        },TIMEOUT)

        it("can resize row",()=>{
            const row=table.find('row').eq(2)
            const cell=row.find('cell').eq(1)
            const p=cell.findFirst('paragraph')
            return dispatch(ACTION.Cursor.AT(p.attr('id'),0),undefined, TIMEOUT)
                .then(()=>tick(4000, 48, 350, value=>{
                    dispatch({
                        type: 'we-edit/entity/UPDATE',
                        payload: {
                            id: table.attr('id'),
                            type: 'table',
                            height: {
                                value,
                                row: row.attr('id'),
                                cell: cell.attr('id'),
                                i:1,
                            }
                        }
                    })
                })).then(()=>{
                    const row=doc.selectionStyle.props("row",false)
                    expect(row.height).toBe(350*doc.precision)
                })
        },TIMEOUT)
    })
}

it("",()=>{})