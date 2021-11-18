import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import dom from "../src/dom"

describe("record react component prop types",()=>{
    function makeComponent(types){
        class A extends Component{
            static propTypes=types
            render(){
                return null
            }
        }
        return A.propTypes
    }

    it("propTypes.string.Type",()=>{
        expect(PropTypes.string.Type).toMatchObject({type:"string"})
    })

    it.each([
        ["string"],
        ["bool"],
        ["number"],
    ])("should record %s type",(type)=>{
        expect(makeComponent({name:PropTypes[type]}).name.Type).toMatchObject({type})
        expect(makeComponent({name:PropTypes[type].isRequired}).name.Type).toMatchObject({type})
    })

    it("should record oneOf type",()=>{
        expect(makeComponent({name:PropTypes.oneOf(["A","B"])}).name.Type)
            .toMatchObject({type:"oneOf", props:{values:["A","B"]}})
        expect(makeComponent({name:PropTypes.oneOf(["A","B"]).isRequired}).name.Type)
            .toMatchObject({type:"oneOf",props:{required:true,values:["A","B"]}})
    })

    it("should record oneOfType",()=>{
        expect(makeComponent({name:PropTypes.oneOfType([PropTypes.string,PropTypes.bool])}).name.Type)
            .toMatchObject({type:"oneOfType", props:{types:[PropTypes.string,PropTypes.bool]}})
        expect(makeComponent({name:PropTypes.oneOfType([PropTypes.string,PropTypes.bool]).isRequired}).name.Type)
            .toMatchObject({type:"oneOfType", props:{required:true,types:[PropTypes.string,PropTypes.bool]}})
    })

    it("should record shape type",()=>{
        expect(makeComponent({name:PropTypes.shape({first:PropTypes.string})}).name.Type)
            .toMatchObject({type:"shape", props:{schema:{first:PropTypes.string}}})
        expect(makeComponent({name:PropTypes.shape({first:PropTypes.string}).isRequired}).name.Type)
            .toMatchObject({type:"shape", props:{schema:{first:PropTypes.string},required:true}})
    })

    it("should record arrayOf",()=>{
        expect(makeComponent({name:PropTypes.arrayOf(PropTypes.string)}).name.Type)
            .toMatchObject({type:"arrayOf", props:{type:PropTypes.string}})
        expect(makeComponent({name:PropTypes.arrayOf(PropTypes.string).isRequired}).name.Type)
            .toMatchObject({type:"arrayOf", props:{required:true,type:PropTypes.string}})
    })
})