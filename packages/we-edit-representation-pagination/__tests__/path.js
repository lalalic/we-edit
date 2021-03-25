import Geometry from "../src/tool/path"

describe("geometry",()=>{
    describe("line intersect",()=>{
        const geometry=new Geometry("M5 0 L5 10")
        
        it("line at top of line should be intersected at top",()=>{
            expect(geometry.intersects({x1:0,y1:0,x2:10,y2:0})).toMatchObject([{x:5,y:-0}])
            expect(geometry.intersects({x1:5,y1:0,x2:0,y2:10})).toMatchObject([{x:5,y:0}])
        })

        it("line at bottom of line should be intersected at bottom",()=>{
            expect(geometry.intersects({x1:0,y1:10,x2:10,y2:10})).toMatchObject([{x:5,y:10}])
            expect(geometry.intersects({x1:0,y1:0,x2:5,y2:10})).toMatchObject([{x:5,y:10}])
        })

        it("any point between should  be intersected", ()=>{
            expect(geometry.intersects({x1:0,y1:5,x2:10,y2:5})).toMatchObject([{x:5,y:5}])
            expect(geometry.intersects({x1:0,y1:0,x2:10,y2:10})).toMatchObject([{x:5,y:5}])
            expect(geometry.intersects({x1:0,y1:0,x2:10,y2:5})).toMatchObject([{x:5,y:2.5}])
        })

        it("part of  geometry also should not be intersected", ()=>{
            expect(geometry.intersects({x1:5,y1:0,x2:5,y2:5}).length).toBe(0)
            expect(geometry.intersects({x1:3,y1:0,x2:3,y2:5}).length).toBe(0)
        })


        it("any point outside should  not be intersected", ()=>{
            expect(geometry.intersects({x1:0,y1:-5,x2:10,y2:-5}).length).toBe(0)
        })
    })


})