import React,{PureComponent,Fragment} from "react"
import {connect} from 'react-redux'
import {FontManager} from "we-edit-representation-pagination"
import ObjectTree from "../components/object-tree"
import selectFile from "../components/file-select"


export default connect()(class __$1 extends PureComponent{
    constructor(){
        super(...arguments)
        this.state={}
    }

    get fonts(){
        return FontManager.names.reduce((fonts,a)=>{
            fonts[a]=new Font(FontManager.get(a))
            return fonts
        },{})
    }

    render(){
        return (
            <Fragment>
                <div>
                    <button onClick={e=>selectFile({multiple:true,accept:".ttf,.ttc,.otf",returnInput:true}).then(input=>this.load(input))}>
                        load more local fonts
                    </button>
                </div>
                <ObjectTree value={this.fonts} filter={["stream"]} order={["tables"]}/>
            </Fragment>
        )
    }

    load(input){
        FontManager.fromInput(input)
            .then(e=>this.setState({loaded:Date.now()}))
    }
})

class Font{
    constructor(font){
        this.tables=font._tables
        "postscriptName,fullName,familyName,subfamilyName,copyright,version,unitsPerEm,ascent,descent,lineGap,underlinePosition,underlineThickness,italicAngle,capHeight,xHeight,bbox,numGlyphs,characterSet,availableFeatures"
            .split(",").reduce((me, key)=>{
                Object.defineProperty(me,key,{
                    get:()=>font[key],
                    enumerable:true,
                })
                return me
            },this)
    }
}