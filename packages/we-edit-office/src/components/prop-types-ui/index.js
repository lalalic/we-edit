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
import WrapModeShape from "./wrap-mode-shape"
import WrapSideShape from "./wrap-side-shape"
import ColumnShape from "./column-shape"
import AnchorBaseShape from "./anchor-base-shape"

import BaseTheme from "./theme"

/**
 * <PropTypesUI component={this}/>
 */
export default class PropTypesUI extends Component{
    static Types=(types=>(Object.assign(this,types),types))({
        string,number,bool,shape,oneOf,oneOfType,arrayOf,
        UnitShape,AutoFitShape,BorderShape,ColorShape,
        EffectShape,FillPictureShape,FillShape, FontsShape,
        GeometryShape,GradientShape,GradientStopShape,
        LineShape,MarginShape,PaddingShape,
        NumberingShape, 

        PatternShape,TextStyleShape,UrlShape,
        ColumnShape,
    });

    static childContextTypes={
        uiContext: PropTypes.oneOf(["Ribbon","Dialog","Tree","Tab"]),
        set: PropTypes.func,
        PropTypes: PropTypes.object,
        onEvent: PropTypes.func,
    }
    static contextTypes={
        uiContext: this.childContextTypes.uiContext,
    }

    static propTypes={
        theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        uiContext: PropTypes.string,
        onEvent: PropTypes.func,
        propTypes: PropTypes.object, //->shape.schema
        props: PropTypes.object,//->shape.value
    }

    get theme(){
        const {theme}=this.props
        if(theme){
            switch(typeof(theme)) {
                case "string":
                    return BaseTheme[theme]
                case "object":
                    const domain=Object.keys(theme)[0]
                    return fromJS(BaseTheme[domain]).mergeDeep(fromJS(theme[domain])).toJS()
            }
        }
        return {}
        
    }

    get uiContext(){
        return this.props.uiContext||this.context.uiContext   
    }

    getChildContext(){
        return {
            uiContext: this.uiContext,
            set: this.set,
            PropTypes: this.constructor.Types,
            onEvent:this.onEvent,
        }
    }

    constructor({props={}}){
        super(...arguments)
        this.state={props:fromJS(props)}
        this.set=this.set.bind(this)
        this.onEvent=this.onEvent.bind(this)
    }

    get value(){
        return this.state.props.toJS()
    }
    
    render(){
        const {props:{propTypes}, state:{props}, constructor:{Types}}=this
        return <Types.shape schema={propTypes.Type?.props.schema||propTypes} theme={this.theme} value={props.toJS()} Wrapper={null}/>
    }

    set(path, value){
        const {props:{onChange}, state:{props}}=this, keyPath=path.split(".")
        const changed=props.setIn(keyPath,value)
        if(!onChange){
             this.setState({props:changed})
        }else{
            onChange(new Map().setIn(keyPath,value).toJS(), changed.toJS())
        }
    }

    onEvent(){
        this.props.onEvent?.(...arguments)
    }
}

const Wrapper=({children})=>children