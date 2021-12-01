import React, {Component} from "react"
import PropTypes from "prop-types"
import {Map, fromJS} from "immutable"

import any from "./base"
import string from "./string"
import number from "./number"
import bool from "./bool"
import oneOf from "./one-of"
import oneOfType from "./one-of-type"
import arrayOf from "./array-of"
import shape from "./shape"
import UnitShape from "./unit-shape"
import ColorShape from "./color-shape"
import FontsShape from "./fonts-shape"
import NumberingShape from "./numbering-shape"

import BaseTheme from "./theme"

/**
 * <PropTypesUI component={this}/>
 */
export default class PropTypesUI extends Component{
    static Theme=BaseTheme

    static Types=(types=>(Object.assign(this,types),types))({
        any,string,number,bool,shape,oneOf,oneOfType,arrayOf,
        UnitShape,ColorShape, FontsShape,NumberingShape,
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
        const BaseTheme=this.constructor.Theme
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