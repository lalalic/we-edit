import Path from "../src/tools/path"

describe("geometry",()=>{
    describe("create",()=>{
        it("should create path from string",()=>{
            expect(Path.create("M1,0 h10 v20z")).toMatchObject({type:"path", props:{d:"M1 0h10v20z"}})
            expect(Path.create("M1 0 h10 v20z")).toMatchObject({type:"path", props:{d:"M1 0h10v20z"}})

            expect(()=>Path.create("M1,0 w10 v20z")).toThrow()
        })
    
        it("should create rect from {x,y,width,height,rx,ry}",()=>{
            expect(Path.create({width:20,height:10,x:1,y:1,rx:2,ry:4}))
                .toMatchObject({type:"rect",props:{width:20,height:10,x:1,y:1,rx:2,ry:4}})

            expect(Path.create({width:20,height:10,x:1,y:1,rx:2,ry:4, type:"rEct"}))
                .toMatchObject({type:"rect",props:{width:20,height:10,x:1,y:1,rx:2,ry:4}})
        })
    
        it("should create circle from {type:circle,r, cx,cy}",()=>{
            expect(Path.create({type:"ciRcle",cx:1,cy:1,r:2}))
                .toMatchObject({type:"circle",props:{cx:1,cy:1,r:2}})
        })
    
        it("should create ellipse from {type:ellipse, cx,cy, rx, ry}",()=>{
            expect(Path.create({type:"elLipse",cx:1,cy:1,rx:2, ry:4}))
                .toMatchObject({type:"ellipse",props:{cx:1,cy:1,rx:2, ry:4}})
        })

        it("should create path from a Path",()=>{
            const a=Path.create({width:10,height:20})
            expect(Path.create(a)).toMatchObject({props:{width:10,height:20}})
            expect(Path.create(a)!=a).toBe(true)
        })
    })
    
    describe("interface",()=>{
        describe("path",()=>{
            let path
            beforeEach(()=>path=Path.create("M1,10h10v10h-10z"))
            it("should return bounds",()=>{
                expect(path.bounds()).toMatchObject({left:1,top:10,bottom:20,right:11,width:10,height:10})
            })

            it("should support clone",()=>{
                expect(path.clone().toString()).toBe(path.toString())
                expect(path.clone()!=path).toBe(true)
            })

            it("should support translate(x[,y])",()=>{
                expect(path.translate(1,2).bounds())
                    .toMatchObject({left:2,top:12,width:10,height:10})
            })

            it("should support rotate(angle[,cx,cy])",()=>{
                expect(path.clone().rotate(10).round().toString()).not.toBe(path.toString())
                expect(path.clone().rotate(10).rotate(-10).round().toString()).toBe(path.toString())
                expect(path.clone().rotate(10).round().toString()).not.toBe(path.clone().rotate(10,1,1).round().toString())
            })

            it("should support scale(x[,y])",()=>{
                expect(path.clone().scale(3,5).bounds()).toMatchObject({left:1*3,top:10*5,width:10*3,height:10*5})
                expect(path.clone().scale(3).bounds()).toMatchObject({left:1*3,top:10*3,width:10*3,height:10*3})
            })

            xit("should return intersects",()=>{
                expect(path.intersects({x1:0,y1:5,x2:20,y2:5}).length).toBe(0)
                expect(path.intersects({x1:0,y1:15,x2:20,y2:15})).toMatchObject([{x:1,y:15},{x:11,y:15}])
            })
        })

        describe("rect",()=>{

        })

        describe("circle",()=>{

        })

        describe("ellipse",()=>{

        })
    })
})