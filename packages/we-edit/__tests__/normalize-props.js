import React from "react"
import dom from "../src/dom"

describe("normalize props",()=>{
    const {UnitShape:{normalize:unit}, Path}=dom.Unknown
        
    it("props should be normalized",()=>{
        const {props:{width,height}}=<dom.Page size="A4"/>
        expect([width,height]).toMatchObject(dom.Page.Size.A4)
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


    it("subclass should be normalized",()=>{
        const TypedPage=class extends dom.Page{
            static normalizePropShape(props){
                props=super.normalizePropShape(props)
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
        const n1=dom.Section.normalizePropShape=jest.fn()
        const n2=jest.spyOn(dom.Page,"normalizePropShape")
        const Type=class extends dom.Page{
            static displayName=this.switchTypeTo(dom.Section)
        }
        const n3=jest.spyOn(Type,"normalizePropShape")
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
        expect(distance(geometry).bounds()).toMatchObject({width:20,height:15,left:-5,right:15,top:-5,bottom:10})
    })

    it("geometry",()=>{
        const {GeometryShape:{normalize}}=dom.Unknown
        expect(normalize("M0,0 L1,0")).toMatchObject(new Path("M0,0 L1,0"))
        const size={width:5,height:5}
        expect(normalize(size)).toMatchObject(Path.fromRect(size))
        expect(normalize(<polyline points="0,0 3,2 5,2"/>)).toMatchObject(new Path(`M0,0 L3,2 L5,2`))
        expect(normalize(<polygon points="0,0 3,2 5,2"/>)).toMatchObject(new Path(`M0,0 L3,2 L5,2Z`))
        expect(normalize(<rect {...size} />)).toMatchObject(Path.fromRect(size))
        expect(normalize(<rect {...size} x={5} y={6}/>).toString()).toBe(Path.fromRect(size).translate(5,6).toString())
    })
})
