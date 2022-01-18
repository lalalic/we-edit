import Geometry from "../src/tools/geometry"

describe("geometry",()=>{
    describe("create",()=>{
        it("should create path from string",()=>{
            expect(Geometry.create("M1,0 h10 v20z")).toMatchObject({type:"path", props:{d:"M1 0h10v20z"}})
            expect(Geometry.create("M1 0 h10 v20z")).toMatchObject({type:"path", props:{d:"M1 0h10v20z"}})

            expect(()=>Geometry.create("M1,0 w10 v20z")).toThrow()
        })
    
        it("should create rect from {x,y,width,height,rx,ry}",()=>{
            expect(Geometry.create({width:20,height:10,x:1,y:1,rx:2,ry:4}))
                .toMatchObject({type:"rect",props:{width:20,height:10,x:1,y:1,rx:2,ry:4}})

            expect(Geometry.create({width:20,height:10,x:1,y:1,rx:2,ry:4, type:"rEct"}))
                .toMatchObject({type:"rect",props:{width:20,height:10,x:1,y:1,rx:2,ry:4}})
        })
    
        it("should create ellipse from {type:ellipse, cx,cy, rx, ry}",()=>{
            expect(Geometry.create({type:"elLipse",cx:1,cy:1,rx:2, ry:4}))
                .toMatchObject({type:"ellipse",props:{cx:1,cy:1,rx:2, ry:4}})
        })

        it("should create path from a Path",()=>{
            const a=Geometry.create({width:10,height:20})
            expect(Geometry.create(a)).toMatchObject({props:{width:10,height:20}})
            expect(Geometry.create(a)!=a).toBe(true)
        })
    })
    
    describe("interface",()=>{
        describe.each([
            ["path", Geometry.create("M1,10h10v10h-10z")],
            ["rect", Geometry.create({width:10,height:10,x:1,y:10})],
        ])("%s", (target, shape)=>{
            let geometry
            beforeEach(()=>geometry=shape.clone())
            it("should return bounds",()=>{
                expect(geometry.bounds()).toMatchObject({left:1,top:10,bottom:20,right:11,width:10,height:10})
            })

            it("should support clone",()=>{
                expect(geometry.clone().toString()).toBe(geometry.toString())
                expect(geometry.clone()!=geometry).toBe(true)
            })

            it("should support translate(x[,y])",()=>{
                expect(geometry.clone().translate(1,2).bounds()).toMatchObject({left:2,top:12,width:10,height:10})
                expect(geometry.clone().translate(1,2).translate(-1,-2).bounds()).toMatchObject({left:1,top:10,bottom:20,right:11,width:10,height:10})
            })

            it("should support rotate(angle[,cx,cy])",()=>{
                expect(geometry.clone().rotate(10).round().toString()).not.toBe(geometry.toString())
                expect(geometry.clone().rotate(10).rotate(-10).round().toString()).toBe(geometry.toString())
                expect(geometry.clone().rotate(10).round().toString()).not.toBe(geometry.clone().rotate(10,1,1).round().toString())
            })

            it("should support scale(x[,y])",()=>{
                expect(geometry.clone().scale(3,5).bounds()).toMatchObject({left:1*3,top:10*5,width:10*3,height:10*5})
                expect(geometry.clone().scale(3).bounds()).toMatchObject({left:1*3,top:10*3,width:10*3,height:10*3})
            })

            it("should return intersects",()=>{
                expect(geometry.intersects({x1:0,y1:5,x2:20,y2:5}).length).toBe(0)
                if(target=="rect")
                    expect(geometry.intersects({x1:0,y1:15,x2:20,y2:15})).toMatchObject([{x:1,y:15},{x:11,y:15}])
            })
        })

        describe("ellipse",()=>{
            let geometry
            beforeEach(()=>geometry=Geometry.create({type:"ellipse",rx:10,ry:20}))
            
            it("bounds",()=>{
                expect(geometry.bounds()).toMatchObject({left:-10,right:10,top:-20,bottom:20})
                expect(geometry.clone().translate(1,2).bounds()).toMatchObject({left:-9,right:11,top:-18,bottom:22})
                expect(geometry.clone().translate(1,2).translate(-1,-2).bounds()).toMatchObject({left:-10,right:10,top:-20,bottom:20})
                expect(geometry.clone().rotate(90).bounds(0)).toMatchObject({left:-20,right:20,top:-10,bottom:10})
            })
        })
    })
})