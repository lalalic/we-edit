import React from "react"
import {dom, Loader} from "we-edit"
import TestRender from "react-test-renderer"
import {withVariant, Provider} from "../src"
import data from "./fixture"

describe("variant",()=>{
    const {Text, Image, $exp, $if, $for, $script, $type, $sub}=withVariant(dom)

    const render=(content, value=data)=>{
        const rendered=TestRender.create(
            <Provider value={value}>
                {content}
            </Provider>
        )
        return rendered.root
    }

    beforeAll(()=>{
        const defaultStyle={fonts:"arial",size:10}
        Text.defaultProps=Object.assign(Text.defaultProps||{},defaultStyle)
    })

    it("$exp() supports property, constant, expression",()=>{
        expect(render(<$exp expression="firstName"/>).findByType(Text).props.children).toBe(data.firstName)
        expect(render(<$exp expression="'good'"/>).findByType(Text).props.children).toBe("good")
        expect(render(<$exp expression="children.length"/>).findByType(Text).props.children).toBe(data.children.length+"")

    })

    it("unknown $exp should evaled as empty",()=>{
        expect(render(<$exp expression="notExist"/>).findByType(Text).props.children).toBe("")
    })

    it("$if supports property, constant, expression",()=>{
        const text=<Text children="h"/>
        expect(()=>render(<$if children={text} condition="firstName=='A'"/>).findByType(Text)).toThrow()
        expect(()=>render(<$if children={text} condition={`firstName=='${data.firstName}'`}/>).findByType(Text)).not.toThrow()
        expect(()=>render(<$if children={text} condition="'good'"/>).findByType(Text)).not.toThrow()
        expect(()=>render(<$if children={text} condition="children.length"/>).findByType(Text)).not.toThrow()
    })

    it("unknown $if should evaled as empty",()=>{
        expect(()=>render(<$if children={text} condition="children.length1"/>).findByType(Text)).toThrow()
    })

    describe("for",()=>{
        it("$for(var i=0;i<3;i++)",()=>{
            const text=<Text children="h"/>
            expect(render(<$for children={text} init="var i=0" test="i<3" update="i++"/>).findAllByType(Text).length).toBe(3)
            expect(render(<$for children={text} init="var i=0" test="i<children.length" update="i++"/>).findAllByType(Text).length).toBe(data.children.length)
        })

        it("$for context passed to children, let can't ",()=>{
            const text=<$exp expression="i"/>
            expect(render(<$for children={text} init="var i=0" test="i<3" update="i++"/>).findAllByType(Text)[2].props.children).toBe("2")
            expect(render(<$for children={text} init="let i=0" test="i<3" update="i++"/>).findAllByType(Text)[2].props.children).toBe("")
        })

        it("nested $for", ()=>{
            const text=<$exp expression="j"/>
            const dom=render(
                <$for init="var i=0" test="i<3" update="i++">
                    <$for children={text} init="var j=0" test="j<4" update="j++"/>
                </$for>
            )

            const texts=dom.findAllByType(Text)
            expect(texts.length).toBe(3*4)
            expect(texts.map(a=>a.props.children).join("")).toBe("012301230123")
        })

        it("change on counter can't affect next for block",()=>{

        })
    })

    it("$script can change data,variable",()=>{
        const dom=render(
            <div>
                <$script script={`var myName="tester"`}></$script>
                <$exp expression="myName"/>
                <$script script={`myName="tester1"`}></$script>
                <$exp expression="myName"/>
            </div>
        )

        const texts=dom.findAllByType(Text)
        expect(texts.length).toBe(2)
        expect(texts[0].props.children).toBe("tester")
        expect(texts[1].props.children).toBe("tester1")
    })



    it("$type can set any prop as expression",()=>{
        const dom=render(
            <div>
                <$script script={`var color="red", url="http://myi.com/a.jpg", width=100, height=200`}></$script>
                <$type color="$(color)">
                    <Text children="hello"/>
                </$type>

                <$type src="$(url)" size="$({width, height})">
                    <Image size={{width:0,height:0}}/>
                </$type>
            </div>
        )

        expect(dom.findByType(Text).props.color).toBe("red")
        expect(dom.findByType(Image).props.size).toMatchObject({width:100,height:200})
    })

    describe("let definition",()=>{
        xit("$script can change data,let",()=>{
            const dom=render(
                <div>
                    <$script script={`let myName="tester"`}></$script>
                    <$exp expression="myName"/>
                    <$script script={`myName="tester1"`}></$script>
                    <$exp expression="myName"/>
                </div>
            )

            const texts=dom.findAllByType(Text)
            expect(texts.length).toBe(2)
            expect(texts[0].props.children).toBe("tester")
            expect(texts[1].props.children).toBe("tester1")
        })
    })

    it("$sub can load external document",()=>{
        Loader.get=jest.fn()
        const dom=render(<$sub path="./test.docx" type="file"/>)
        expect(Loader.get).toHaveBeenCalledWith("file",true)
    })
})
