import React, {Component} from "react"
import PropTypes from "prop-types"
import {Map, fromJS} from "immutable"

import string from "./string"
import number from "./number"
import bool from "./bool"
import oneOf from "./one-of"
import oneOfType from "./one-of-type"
import arrayOf from "./array-of"
import shape from "./shape"
import UnitShape from "./unit-shape"
import AlignShape from "./align-shape"
import AutoFitShape from "./auto-fit-shape"
import BorderShape from "./border-shape"
import ColorShape from "./color-shape"
import EffectShape from "./effect-shape"
import FillPictureShape from "./fill-picture-shape"
import FillShape from "./fill-shape"
import FontsShape from "./fonts-shape"
import GeometryShape from "./geometry-shape"
import GradientShape from "./gradient-shape"
import GradientStopShape from "./gradient-stop-shape"
import LineShape from "./line-shape"
import MarginShape from "./margin-shape"
import NumberingShape from "./numbering-shape"
import PaddingShape from "./padding-shape"
import PatternShape from "./pattern-shape"
import TextStyleShape from "./text-style-shape"
import UrlShape from "./url-shape"
import VertialAlignShape from "./vertical-align-shape"
import WrapModeShape from "./wrap-mode-shape"
import WrapSideShape from "./wrap-side-shape"
import ColumnShape from "./column-shape"
import AnchorBaseShape from "./anchor-base-shape"
import {ListShape, BulletListShape,NumberListShape,OutlineListShape} from "./list-shape"

import BaseTheme from "./theme"

/**
 * <PropTypesUI component={this}/>
 */
export default class PropTypesUI extends Component{
    static Types=(types=>(Object.assign(this,types),types))({
        string,number,bool,shape,oneOf,oneOfType,arrayOf,
        UnitShape,AlignShape,AutoFitShape,BorderShape,ColorShape,
        EffectShape,FillPictureShape,FillShape, FontsShape,
        GeometryShape,GradientShape,GradientStopShape,
        LineShape,MarginShape,PaddingShape,
        NumberingShape, ListShape, BulletListShape,NumberListShape,OutlineListShape,

        PatternShape,TextStyleShape,UrlShape,VertialAlignShape,
        WrapModeShape,WrapSideShape,ColumnShape,AnchorBaseShape
    });

    static childContextTypes={
        uiContext: PropTypes.oneOf(["Ribbon","Dialog","Tree"]),
        set: PropTypes.func,
        PropTypes: PropTypes.object,
        theme: PropTypes.object,
        onEvent: PropTypes.func,
    }
    static contextTypes={
        uiContext: PropTypes.oneOf(["Ribbon","Dialog","Tree"])
    }

    get theme(){
        const {theme}=this.props
        if(!theme)
            return fromJS({})
        switch(typeof(theme)) {
            case "string":
                return fromJS(BaseTheme[theme])
            case "object":
                const domain=Object.keys(theme)[0]
                return fromJS(BaseTheme[domain]).mergeDeep(fromJS(theme[domain]))
        }
        return fromJS({})
        
    }

    get uiContext(){
        return this.props.uiContext||this.context.uiContext   
    }

    getChildContext(){
        return {
            uiContext: this.uiContext,
            set: this.set,
            PropTypes: this.constructor.Types,
            theme: this.theme,
            onEvent:this.onEvent,
        }
    }

    constructor({props={}}){
        super(...arguments)
        this.state={props:new Map(props)}
        this.set=this.set.bind(this)
        this.onEvent=this.onEvent.bind(this)
    }
    
    render(){
        const {props:{propTypes}, state:{props}, constructor:{Types}}=this
        return <Types.shape schema={propTypes.Type?.schema||propTypes} value={props.toJS()}/>
    }

    set(path, value){
        const {props:{onChange}, state:{props}}=this, keyPath=path.split(".")
        const changed=props.setIn(keyPath,value)
        if(!onChange){
             this.setState({props:changed})
        }else{
            let patch=new Map()
            for(let i=0, len=keyPath.length;i<len;i++){
                const currentKeyPath=keyPath.slice(0,i+1)
                const currentKeyValue=changed.getIn(currentKeyPath)
                patch=patch.setIn(currentKeyPath,currentKeyValue)
                if(!Map.isMap(currentKeyValue)){
                    break   
                }
            }
            onChange(patch.toJS(), changed.toJS())
        }
    }

    onEvent(){
        this.props.onEvent?.(...arguments)
    }
}