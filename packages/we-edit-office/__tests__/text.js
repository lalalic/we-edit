import React from "react"
import TestRender from "react-test-renderer"
import {createEmptyStore, dom, ACTION} from "we-edit"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ComboBox} from "../src/components"
import Text from "../src/text"
import FontList from "../src/text/fonts"


describe("text style settings",()=>{
    const store=createEmptyStore()
    const px2pt=dom.Unknown.units.px2pt.bind(dom.Unknown.units)
    const pt2px=dom.Unknown.units.pt2px.bind(dom.Unknown.units)
    const render=(style, styles={text:style})=>{
        const state={ui:{selectionStyle:{props:type=>styles[type]}}}
        store.getState=jest.fn(()=>({get:key=>state[key]}))
        const rendered=TestRender.create(
            <MuiThemeProvider>
                <Text activeDocStore={store}/>
            </MuiThemeProvider>,
            {
                createNodeMock(element){
                    
                }
            }
        )
        return rendered
    }
    
    beforeAll(()=>{
        document.fonts=[]
        const createElement=React.createElement
        React.createElement=function(type, ...args){
            if(type?.prototype?.setRippleSize){
                return createElement("div")
            }
            return createElement(...arguments)
        }
    })

    let $payload=null
    beforeEach(()=>{
        $payload=new Proxy(store.dispatch=jest.fn(),{
            get(a,key){
                return a.mock.calls[a.mock.calls.length-1][0].payload[key]
            }
        })
    })

    const TextStyle={fonts:"A",size:pt2px(11),vertAlign:"subscript",underline:true}

    it("text style applied, and fontsize is point",()=>{
        const toolbar=render(TextStyle)
        expect(toolbar.root.findByType(ComboBox).props.value).toBe(px2pt(TextStyle.size))
        expect(toolbar.root.findByType(FontList).props.value).toBe(TextStyle.fonts)
    })
    describe("update: dispatch {text:{}}",()=>{
        it("font=14",()=>{
            const toolbar=render(TextStyle)
            const $size=toolbar.root.findByType(ComboBox)
            expect($size.props.value).toBe(11)
            $size.props.onChange(14)
            expect($payload.text).toMatchObject({size:pt2px(14)})
        })

        it("smaller font",()=>{
            const toolbar=render(TextStyle)
            const btn=toolbar.root.findByProps({label:"descrease font size"})
            btn.props.onClick()
            expect($payload.text.size).toBe(pt2px(10))
        })

        it("bigger font",()=>{
            const toolbar=render(TextStyle)
            const btn=toolbar.root.findByProps({label:"increase font size"})
            btn.props.onClick()
            expect($payload.text.size).toBe(pt2px(12))
        })

        fit("bold, italic, underline,",()=>{
            const toolbar=render(TextStyle)
            const bold=toolbar.root.findByProps({label:"bold"})
            const italic=toolbar.root.findByProps({label:"italic"})
            const underline=toolbar.root.findByProps({label:"underline"})
            const subscript=toolbar.root.findByProps({label:"Subscript"})
            const superscript=toolbar.root.findByProps({label:"Superscript"})
            expect(bold.props.status).toBe("unchecked")
            expect(italic.props.status).toBe("unchecked")
            expect(underline.props.status).toBe("checked")
            expect(subscript.props.status).toBe("checked")
            expect(superscript.props.status).toBe("unchecked")

            subscript.props.onClick()
            expect($payload.text).toMatchObject({vertAlign:null})
            
            superscript.props.onClick()
            expect($payload.text).toMatchObject({vertAlign:"superscript"})
            
        })
    })
})