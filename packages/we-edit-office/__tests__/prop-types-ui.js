import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"
import PropTypesUI from "../src/components/prop-types-ui"
import TestRenderer from "react-test-renderer"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
jest.mock("material-ui/internal/Tooltip",()=>props=><span/>)

describe("propTypes UI",()=>{
    beforeAll(()=>dom.Unknown.memorize(PropTypes))
    it("recordify",()=>{
        expect(PropTypes.string.Type).toMatchObject({type:"string"})
        expect(dom.Text.propTypes.italic.Type).toMatchObject({type:"bool"})
    })

    it("should create for {name:string}",()=>{
        const testRenderer=TestRenderer.create(<PropTypesUI propTypes={{name:PropTypes.string}} props={{name:"test"}}/>)
        const testInstance=testRenderer.root
        expect(testInstance.findAllByType(PropTypesUI.string).length).toBe(1)
    })

    it("should create for {name:PropTypes.shape({first:PropTypes.string, last:PropTypes.string})}",()=>{
        const testRenderer=TestRenderer.create(
                <PropTypesUI 
                    propTypes={{
                        age: PropTypes.number,
                        name:PropTypes.shape({
                            first:PropTypes.string,
                            last:PropTypes.string
                        })}} 
                    props={{
                        name:{
                            first:"h",
                            last:'w'
                        }}}
                    />
            )
        const testInstance=testRenderer.root
        expect(testInstance.findAllByType(PropTypesUI.string).length).toBe(2)
        expect(testInstance.findAllByType(PropTypesUI.number).length).toBe(1)
    })

    it("should create for nested shape",()=>{
        const testRenderer=TestRenderer.create(
                <PropTypesUI 
                    propTypes={{
                        age: PropTypes.number,
                        name:PropTypes.shape({
                            first:PropTypes.string,
                            last:PropTypes.shape({
                                middle: PropTypes.string,
                                surname: PropTypes.string,
                            })
                        })}} 
                    props={{
                        name:{
                            first:"h",
                            last:{
                                surname:"l"
                            }
                        }}}
                    />
            )
        const testInstance=testRenderer.root
        expect(testInstance.findAllByType(PropTypesUI.string).length).toBe(3)
        expect(testInstance.findAllByType(PropTypesUI.number).length).toBe(1)

        expect(testInstance.findByType(PropTypesUI.number).props.path).toBe("age")
        expect(testInstance.findByProps({name:"surname"}).props.path).toBe("name.last.surname")
        expect(testInstance.findByProps({name:"surname"}).props.value).toBe("l")
    })

    it("should support controlled change",()=>{
        const onChange=jest.fn()
        const el=<PropTypesUI propTypes={{name:PropTypes.string,age: PropTypes.number}} props={{name:"test",age:1}} onChange={onChange}/>
        const testRenderer=TestRenderer.create(el)
        const nameInstance=testRenderer.root.findByType(PropTypesUI.string)
        expect(nameInstance.props).toMatchObject({path:"name"})
        nameInstance.findByType("input").props.onChange({target:{value:"A"}})
        expect(onChange).toHaveBeenCalledWith({name:"A"},{name:"A",age:1})

    })

    it("should support uncontrolled change",()=>{
        const el=<PropTypesUI propTypes={{name:PropTypes.string,age: PropTypes.number}} props={{name:"test",age:1}}/>
        const testRenderer=TestRenderer.create(el)
        const nameInstance=testRenderer.root.findByType(PropTypesUI.string)
        const setState=testRenderer.root.instance.setState=jest.fn()

        expect(nameInstance.props).toMatchObject({path:"name"})
        nameInstance.findByType("input").props.onChange({target:{value:"A"}})
        expect(setState).toHaveBeenCalledTimes(1)
    })

    xit("should trigger change with all array items",()=>{
        const onChange=jest.fn()
        const el=<PropTypesUI propTypes={{
                    accounts: PropTypes.arrayOf(PropTypes.number),
                    name:PropTypes.string,
                }} 
                props={{
                    name:"test",
                    accounts:[1,2]
                }} 
                onChange={onChange}/>
        const testRenderer=TestRenderer.create(el)
        const nameInstance=testRenderer.root.findByType(PropTypesUI.number)
        expect(nameInstance.props).toMatchObject({path:"name"})
        nameInstance.findByType("input").props.onChange({target:{value:"A"}})
        expect(onChange).toHaveBeenCalledWith({name:"A"},{name:"A",accounts:[1,2]})
    })

    describe("oneOfType",()=>{
        it("uiContext[Ribbon] default use first type",()=>{

        })

        it("uiContext[Dialog] default use last type",()=>{

        })

        it("uiContext[Ribbon][spread=true] make it as buttons",()=>{

        })
    })

    describe("oneOf",()=>{
        it("defaultValue can be picked up",()=>{
            const {root}=TestRenderer.create(<PropTypesUI.oneOf values={[1,2]} defaultValue={2}/>)
            expect(root.findByProps({value:2})).toBeDefined()
        })
    })

    describe("shape",()=>{
        it("can be wrapped",()=>{

        })
    })

    describe("arrayOf",()=>{

    })

    it("should render UnitShape",()=>{
        const el=(<PropTypesUI uiContext="Dialog"
                propTypes={{
                    width: dom.Unknown.UnitShape,
                }}
                props={{
                    width:"12cm"
                }}
            />)
        
        const testRenderer=TestRenderer.create(el)
        expect(testRenderer.root.findByType(PropTypesUI.UnitShape).props).toMatchObject({name:"width"})
    })

    it("should render {fonts,size, italic}",()=>{
        const testRenderer=TestRenderer.create(
            <MuiThemeProvider>
                <PropTypesUI uiContext="Ribbon"
                    propTypes={{
                        fonts: dom.Unknown.FontsShape.isRequired,
                        size: dom.Unknown.UnitShape.isRequired,
                        italic: PropTypes.bool,
                    }}
                />
            </MuiThemeProvider>
        )
        expect(testRenderer.root.findByType(PropTypesUI.UnitShape).props).toMatchObject({name:"size"})
        expect(testRenderer.root.findByType(PropTypesUI.FontsShape).props).toMatchObject({name:"fonts"})
        expect(testRenderer.root.findByType(PropTypesUI.bool).props).toMatchObject({name:"italic"})

        expect(testRenderer.toJSON()).toMatchSnapshot()
    })

    describe("theme",()=>{
        function test(content){
            const renderer=TestRenderer.create(content)
            return renderer.root.instance
        }
        it("should support direct theme on shape",()=>{
            const theme={first:true,x:true}
            expect(test(<PropTypesUI.shape theme={theme}/>).theme)
                .toMatchObject(theme)
        })

        it("should support shape theme, but not theme.UnitShape",()=>{
            
        })

        it("uiContext theme",()=>{

        })

        it("no theme",()=>{

        })

        it("theme.style always be picked up",()=>{

        })
    })

    describe("every dom can create PropTypesUI",()=>{
        function test(content){
            const testRenderer=TestRenderer.create(
                <MuiThemeProvider>
                    {content}
                </MuiThemeProvider>
            )
            testRenderer.toJSON()
        }

        describe.each([
            ["Ribbon"],
            ["Dialog"],
            ["Tree"],
            ["Tab"],
        ])("%s", (uiContext)=>{
            it.each(
                Object.values(dom)
                .map(a=>([a.getType(),a]))
                //.filter(a=>a[0]=="paragraph")
            )("PropTypesUI for %s", (type, A)=>{
                const Type=type.replace(/(^\w)/,(a,b)=>a.toUpperCase())
                expect(()=>test(<PropTypesUI propTypes={A.propTypes||{}} uiContext={uiContext} theme={Type}/>)).not.toThrow()
            })
        })
    })


})