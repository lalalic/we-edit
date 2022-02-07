import React from "react"
import PropTypes from "prop-types"
import dom from "../src/dom"

describe("normalize props",()=>{
    const {UnitShape:{normalize:unit, denormalize:deunit, deprecision}, Geometry}=dom.Unknown   
    it("PropTypes is memorized",()=>{
        expect(PropTypes.shape({}).Type).toBeDefined()
    })

    it("page size should be normalized to {height,width}",()=>{
        expect((<dom.Page size="A4"/>).props)
            .toMatchObject({width:dom.Page.Size.A4[0], height:dom.Page.Size.A4[1]})
        expect((<dom.Page size="A4" width="1mm"/>).props)
            .toMatchObject({width:dom.Page.Size.A4[0], height:dom.Page.Size.A4[1]})
    })

    it("page size should be ignored when page {width,height} shows",()=>{
        const cmpx=unit("1cm")
        expect((<dom.Page width="1cm" height="1cm" margin="1cm" size="A4"/>).props)
            .toMatchObject({width:cmpx,height:cmpx,margin:{left:cmpx}})
    })

    it(".isRequired should also be normalized",()=>{
        const Type=class extends dom.Unknown{
            static propTypes={
                x:this.UnitShape.isRequired
            }
        }
        const {props:{x}}=<Type x="5mm"/>
        expect(x).toBe(unit("5mm"))
    })

    it("null should not be normalized",()=>{
        const {props:{width,height}}=<dom.Page size={null}/>
        expect({width,height}).toMatchObject({width:undefined,height:undefined})
    })

    it("default props should be normalized",()=>{
        const {props:{width,height}}=<dom.Page/>
        expect([width,height]).toMatchObject(dom.Page.Size[dom.Page.defaultProps.size])
    })

    it("15% unit should not be normalized",()=>{
        expect(unit("15%")).toBe("15%")
    })

    it("shape has default normalize and denormalize",()=>{
        expect(PropTypes.shape({a:PropTypes.number}).normalize).toBeDefined()
    })

    it("any shape can be extended",()=>{
        expect(unit).not.toBe(dom.Unknown.UnitShape.$({},{normalize:a=>this.UnitShape.normalize(a,"deg")}))
    })

    it("subclass should be normalized",()=>{
        const TypedPage=class extends dom.Page{
            static normalizeProps(props){
                props=super.normalizeProps(props)
                return {...props, normalized:true}
            }
        }

        const {props:{width,height,normalized,size}}=<TypedPage/>
        expect({width,height,normalized,size}).toMatchObject({
            size:dom.Page.defaultProps.size,
            normalized:true,
        })

    })

    it("switched type should be normalized to target and source types",()=>{
        const n1=dom.Section.normalizeProps=jest.fn()
        const n2=jest.spyOn(dom.Page,"normalizeProps")
        n2.mockClear()
        const Type=class extends dom.Page{
            static displayName=this.switchTypeTo(dom.Section)
        }
        const n3=jest.spyOn(Type,"normalizeProps")
        const p=<Type/>
        expect(n3).toHaveBeenCalledTimes(1)
        expect(n1).toHaveBeenCalledTimes(1)
        expect(n2).toHaveBeenCalledTimes(1)
    })

    it("unit convert to px",()=>{
        const {normalize}=dom.Unknown.UnitShape
        expect(normalize("5cm")).toBe(unit("5cm"))
        expect(normalize("5 cm")).toBe(unit("5cm"))
        expect(normalize(" 5 cm ")).toBe(unit("5cm"))
        expect(normalize("5.2cm")).toBe(unit("52mm"))
        expect(normalize(".2cm")).toBe(unit("2mm")) 
        expect(normalize(5)).toBe(5)
        expect(normalize("5")).toBe(5)
    })

    it("color",()=>{
        const {normalize}=dom.Unknown.ColorShape
        expect(normalize("#FF0A0B")).toBe("#FF0A0B")
    })

    it("margin",()=>{
        const {normalize}=dom.Unknown.MarginShape
        expect(normalize(5)).toMatchObject({left:5,right:5,top:5,bottom:5})
        const value=dom.Unknown.UnitShape.normalize("1mm")
        expect(normalize("1mm")).toMatchObject({left:value,right:value,top:value,bottom:value})
        const margin=normalize({left:"1mm",bottom:"1cm"})
        expect(margin).toMatchObject({left:value,bottom:unit("1cm")})
        expect(margin.right).not.toBeDefined()
    })

    it("border:5 , 5mm, {left:5,right:5mm,...}",()=>{
        const {BorderShape:{normalize}}=dom.Unknown
        let value={width:5}
        expect(normalize(5)).toMatchObject({left:value,right:value,top:value,bottom:value})
        
        value.width=unit("1mm")
        expect(normalize("1mm")).toMatchObject({left:value,right:value,top:value,bottom:value})

        const border=normalize({left:"1mm",bottom:"1cm"})

        expect(border).toMatchObject({left:{width:unit("1mm")},bottom:{width:unit("1cm")}})
        expect(border.right).not.toBeDefined()
    })

    it("line:5, 5mm, {width:5,...}, {width:5mm,...}",()=>{
        const {LineShape:{normalize}}=dom.Unknown
        expect(normalize(5)).toMatchObject({width:5})
        expect(normalize("5mm")).toMatchObject({width:unit("5mm")})
        expect(normalize({width:5})).toMatchObject({width:5})
        expect(normalize({width:"5mm"})).toMatchObject({width:unit("5mm")})
    })

    it("fill: white, {color:white,...}, {picture:{margin:5},...}",()=>{
        const {FillShape:{normalize}}=dom.Unknown
        expect(normalize("white")).toMatchObject({color:"white"})
        expect(normalize({color:"white"})).toMatchObject({color:"white"})
        expect(normalize({picture:{margin:5}})).toMatchObject({picture:{margin:{left:5,right:5}}})
        expect(normalize({picture:{margin:"5cm"}})).toMatchObject({picture:{margin:{left:unit("5cm")}}})
    })
    
    it("x/y=5=>{base:'offset',offset:5,align}",()=>{
        const {Anchor}=dom
        expect((<Anchor x={5} y={5}/>).props).toMatchObject({x:{offset:5}, y:{offset:5}})
        expect((<Anchor wrap="square"/>).props).toMatchObject({wrap:{mode:"square"}})
        const {wrap:{distance, geometry}}=(<Anchor wrap={{distance:5, geometry:{width:10,height:5}}}/>).props
        expect(typeof(distance)).toBe("function")
        expect(geometry.bounds()).toBeDefined()
        expect(distance(geometry).bounds())
            .toMatchObject({width:20,height:15,left:-5,right:15,top:-5,bottom:10})
    })

    it("geometry",()=>{
        const {GeometryShape:{normalize}}=dom.Unknown
        expect(normalize("M0,0 L1,0")).toMatchObject(new Geometry("M0,0 L1,0"))
        const size={width:5,height:5}
        expect(normalize(size)).toMatchObject(Geometry.create(size))
        expect(normalize({type:"RECT",...size})).toMatchObject(Geometry.create(size))
    })

    it("paragraph",()=>{
        const {props:{defaultStyle}}=<dom.Paragraph defaultStyle={{size:"12pt",fonts:"A"}}/>
        expect(defaultStyle.size).toBe(unit("12pt"))
        const {propTypes:{spacing:{normalize}}}=dom.Paragraph
        expect(normalize({top:"1cm",bottom:"1mm"})).toMatchObject({top:unit("1cm"),bottom:unit("1mm")})
        expect(normalize({lineHeight:"1cm"})).toMatchObject({lineHeight:{height:unit("1cm")}})
        expect(normalize({lineHeight:"15%"})).toMatchObject({lineHeight:{height:"15%"}})
        expect(normalize({lineHeight:{height:"15%",offset:"1cm"}})).toMatchObject({lineHeight:{height:"15%",offset:unit("1cm")}})
    })

    describe("denormalize",()=>{
        it("UnitShape",()=>{
            expect(deunit(5,10)).toBe(10)
            expect(parseFloat(deunit("5mm",100))).toBe(unit("100px","mm"))
            expect(deunit(5, "15%")).toBe("15%")
        })

        it("MarginShape",()=>{
            let v=100, margin={left:v,right:v,top:v,bottom:v}
            const {MarginShape:{denormalize}}=dom.Unknown
            expect(parseFloat(denormalize("5mm",margin))).toBe(unit("100px","mm"))
            expect(denormalize("5mm",{...margin, right:v+1})).toMatchObject({...margin, right:v+1})
            expect(denormalize({...margin, left:"5mm"},{...margin,left:v,right:v+1})).toMatchObject({...margin,left:unit(v+"px","mm")+" mm",right:v+1})
        })

        it("LineShape",()=>{
            const {LineShape:{denormalize}}=dom.Unknown
            expect(parseFloat(denormalize("1mm",{width:50}))).toBe(unit("50px","mm"))
            expect(parseFloat(denormalize("1mm",{width:50}))).toBe(unit("50px","mm"))
            expect(denormalize("1mm",{width:50,color:"white"})).toMatchObject({width:50,color:"white"})
        })
        
        it("BorderShape",()=>{
            const border=v=>({left:v,right:v,top:v,bottom:v})
            const {BorderShape:{denormalize}}=dom.Unknown
            expect(parseFloat(denormalize("5mm",border({width:100})))).toBe(unit("100px","mm"))

            const a={...border({width:100}),left:{width:101}}
            expect(denormalize("5mm",a)).toMatchObject(a)
            expect(denormalize({...a,left:"5mm"},a)).toMatchObject({...a,left:unit("101px","mm")+" mm"})
        })
        
        it("FillShape",()=>{
            const {FillShape:{denormalize}}=dom.Unknown
            expect(denormalize("white",{color:"red"})).toBe("red")
            expect(denormalize("white",{color:"white",transparency:1})).toMatchObject({color:"white",transparency:1})
            expect(denormalize({color:"white"},{color:"red"})).toMatchObject({color:'red'})

            const margin=v=>({left:v, right:v, top:v, bottom:v})
            expect(denormalize(
                {color:"white",picture:{margin:"5mm"}},
                {color:"red", picture:{margin:margin(100)}})
                ).toMatchObject({
                    color:'red',
                    picture:{
                        margin:unit("100px","mm")+" mm"
                    }
                })

            expect(denormalize(
                {color:"white",picture:{margin:"5mm"}},
                {color:"red", picture:{margin:{...margin(100), left:"5mm"}}})
                ).toMatchObject({
                    color:'red',
                    picture:{
                        margin:{...margin(100), left:"5mm"}
                    }
                })
            
            expect(denormalize(
                {color:"white",picture:{margin:{...margin(100), left:"5mm"}}},
                {color:"red", picture:{margin:margin(100)}})
                ).toMatchObject({
                    color:'red',
                    picture:{
                        margin:{...margin(100), left:unit("100px","mm")+" mm"}
                    }
                })
                
        })

        it("GeometryShape",()=>{
            const {GeometryShape:{denormalize}}=dom.Unknown
            const path=new Geometry("M0,0 L1,10")
            expect(denormalize(path.toString(),path)).toBe(path.toString())
            expect(denormalize({width:10,height:10},Geometry.create({width:20,height:10}))).toMatchObject({width:20,height:10})
        })

        it("Anchor",()=>{
            const {x,y,wrap}=dom.Anchor.propTypes;
            [x,y].forEach(x=>{
                expect(parseFloat(x.denormalize("5mm",{offset:100}))).toBe(unit("100px","mm"))
                expect(parseFloat(x.denormalize("5mm",{offset:100,base:"current"}))).toBe(unit("100px","mm"))
                expect(x.denormalize("5mm",{offset:100,base:"page"})).toMatchObject({base:"page",offset:unit("100px","mm")+" mm"})
            })

            expect(wrap.denormalize("square",{mode:"tight"})).toBe("tight")
            expect(wrap.denormalize("square",{mode:"tight",side:"larger"})).toMatchObject({mode:"tight",side:"larger"})
            const distance=v=>({left:v,right:v,top:v,bottom:v})
            expect(wrap.denormalize({mode:"square",distance:"5mm"},{mode:"tight", distance:{...distance(100)}}))
                .toMatchObject({mode:"tight",distance:"5mm"})

            expect(wrap.denormalize(
                    {mode:"square",distance:{...distance(100),left:"5mm"}},
                    {mode:"tight", distance:{...distance(100)}})
                ).toMatchObject({mode:"tight",distance:{...distance(100),left:"5mm"}})
        })
    })

    describe("deprecision",()=>{
        it("UnitShape can be deprecision",()=>{
            expect(deprecision).toBeDefined()
            expect(deprecision(500,100)).toBe(5)
        })

        fit("Shape({a:UnitShape}) should support deprecision",()=>{debugger
            const shape=dom.Unknown.shape({a:dom.Unknown.UnitShape,b:dom.Unknown.string})
            expect(shape.deprecision).toBeDefined()
            expect(shape.deprecision({a:500,b:"hello"},100)).toMatchObject({a:5,b:"hello"})
            const oneOfType=dom.Unknown.oneOfType([dom.Unknown.string,shape],{$shape:1})
            expect(oneOfType.deprecision).toBeDefined()
            expect(oneOfType.deprecision({a:500,b:"hello"},100)).toMatchObject({a:5,b:"hello"})
/*

            const arrayOf=dom.Unknown.arrayOf(shape)
            expect(arrayOf.deprecision).toBeDefined()
            expect(arrayOf.deprecision([{a:500,b:"hello"}],100)).toMatchObject([{a:5,b:"hello"}])
*/
        })
    })
})
