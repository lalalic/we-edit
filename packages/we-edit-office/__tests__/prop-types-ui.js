import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import {dom, immutableReviver, PropTypes} from "we-edit"
import PropTypesUI from "../src/components/prop-types-ui"
import TestRenderer from "react-test-renderer"
import {fromJS} from "immutable"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
jest.mock("material-ui/internal/Tooltip",()=>props=><span/>)
jest.mock("material-ui/MenuItem/MenuItem",()=>props=><span/>)
jest.mock("../src/components/prop-types-ui/theme/textures",()=>[])
jest.mock("../src/developer/diff",()=>class{static Setting=props=>null})
ReactDOM.createPortal = jest.fn(node => node)

describe("propTypes UI",()=>{
    it("recordify",()=>{
        expect(PropTypes.string.Type).toMatchObject({type:"string"})
        expect(dom.Text.propTypes.italic.Type).toMatchObject({type:"bool"})
    })

    it("react element and json should be replaced each other when merge",()=>{
        const fromJS1=props=>fromJS(props,immutableReviver)
        const element={a:<div/>}, json={a:{b:1}}
        expect(fromJS1(element).mergeDeep(fromJS1(json)).toJS()).toMatchObject(json)
        expect(fromJS1(element).mergeDeep(fromJS1(json)).toJS().a.type).toBe(undefined)
        expect(fromJS1(element).mergeDeep(fromJS1(json)).toJS().a.props).toBe(undefined)

        expect(fromJS1(json).mergeDeep(fromJS1(element)).toJS()).toMatchObject(element)
        expect(fromJS1(json).mergeDeep(fromJS1(element)).toJS().a.b).toBe(undefined)
    })

    it("uiContext as react element",()=>{
        const TestShape=PropTypes.shape({
            a:PropTypes.string,
            b:PropTypes.bool,
        },{$type:"TestShape"})
        PropTypesUI.Theme.TestShape={
            Dialog:<div id="test"/>,
            wrapper:null,
        }

        const renderer=TestRenderer.create(<PropTypesUI propTypes={{tr:TestShape}} props={{tr:{a:'1',b:true}}} uiContext="Dialog"/>)
        expect(()=>renderer.root.findByProps({name:"a"})).toThrow()
        expect(()=>renderer.root.findByProps({id:"test"})).not.toThrow()
    })

    it("should create for {name:string}",()=>{
        const testRenderer=TestRenderer.create(<PropTypesUI propTypes={{name:PropTypes.string}} props={{name:"test"}}/>)
        const testInstance=testRenderer.root
        expect(testInstance.findAllByType(PropTypesUI.string).length).toBe(1)
    })

    it("should support custmized theme",()=>{
        const testRenderer=TestRenderer.create(<PropTypesUI 
            propTypes={{name:PropTypes.string}} 
            props={{name:"test"}} 
            theme={{name:{good:true}}}
            />)
        const nameEl=testRenderer.root.findByType(PropTypesUI.string)
        expect(nameEl.props.theme.good).toBe(true)
    })

    it("should support wrapper",()=>{
        const Wrapper=props=>null
        const testRenderer=TestRenderer.create(<PropTypesUI 
            propTypes={{name:PropTypes.string}} 
            props={{name:"test"}} 
            theme={{name:{wrapper:<Wrapper/>}}}
            />)
        expect(()=>testRenderer.root.findByType(Wrapper)).not.toThrow()
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
        
    })

    describe("oneOfType",()=>{
        it("uiContext[Ribbon] default use first type",()=>{

        })

        it("uiContext[Dialog] default use last type",()=>{

        })

        it("can render for i=x",()=>{

        })

        it("can render all types to tabs",()=>{

        })
    })

    describe("oneOf",()=>{
        it("defaultValue can be picked up",()=>{
            const {root}=TestRenderer.create(<PropTypesUI.oneOf values={[1,2]} defaultValue={2}/>)
            expect(root.findByProps({value:2})).toBeDefined()
        })
    })

    describe("shape",()=>{
        const schema={
            fname: PropTypes.string,
            age: PropTypes.number,
        }
        const el=<PropTypesUI.shape schema={schema}/>

        xit("shape support $preset for quick selection",()=>{
            expect(()=>TestRenderer.create(React.cloneElement(el,{$preset:[{fname:"test0"},{fname:"test1"}]})).root.findByType(PropTypesUI.oneOf)).not.toThrow()
        })

        it("shape support theme {'*':false}",()=>{
            expect(()=>TestRenderer.create(el).root.findByType(PropTypesUI.string)).not.toThrow()
            expect(()=>TestRenderer.create(React.cloneElement(el,{theme:{'*':false}})).root.findByType(PropTypesUI.string)).toThrow()
            expect(()=>TestRenderer.create(React.cloneElement(el,{theme:{'*':false,age:{}}})).root.findByType(PropTypesUI.number)).not.toThrow()
        })

        xit("shape Wrapper",()=>{
            const Wrapper=jest.fn(({children,host})=>{
                expect(children.length).toBe(2)
                return null
            })
            TestRenderer.create(React.cloneElement(el,{wrapper:<Wrapper/>}))
            expect(Wrapper).toHaveBeenCalledTimes(1)
        })

        it("can customize a field with el </>",()=>{
            const renderer=TestRenderer.create(React.cloneElement(el,{theme:{fname:<div good={true}/>}}))
            expect(renderer.root.findAllByProps({good:true}).length).toBe(1)
        })

        it("schema {name,path} should not overwrite props{name,path}",()=>{
            const renderer=TestRenderer.create(React.cloneElement(el,{schema:{name:PropTypes.string},theme:{name:<div good={true}/>}}))
            expect(renderer.root.findAllByProps({good:true}).length).toBe(1)
        })
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
    })

    describe("theme",()=>{
        function test(content){
            const renderer=TestRenderer.create(content)
            return renderer.root.instance
        }

        it("no theme without exception",()=>{
            expect(()=>test(<PropTypesUI.any/>)).not.toThrow()
        })

        it("should support direct theme on shape",()=>{
            const theme={first:true,x:true}
            expect(test(<PropTypesUI.any theme={theme}/>).theme).toMatchObject(theme)
        })
    })

    describe("every dom can create PropTypesUI",()=>{
        function test(content){
            const testRenderer=TestRenderer.create(
                <MuiThemeProvider>
                    {content}
                </MuiThemeProvider>
            ,{
                createNodeMock(element){
                    if(element.type=="button"){
                        return {
                            blur:jest.fn(),
                        }
                    }
                }
            })
            testRenderer.toJSON()
        }

        describe.each([
            ["Ribbon"],
            ["Dialog"],
            ["Tree"],
            ["Tab"],
            ["Panel"]
        ]
        //.filter(a=>a[0]=="Panel")
        )("%s", (uiContext)=>{
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