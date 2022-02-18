import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Map, fromJS, Iterable} from "immutable"

import any from "./base"
import string from "./string"
import number from "./number"
import bool from "./bool"
import oneOf from "./one-of"
import oneOfType from "./one-of-type"
import arrayOf from "./array-of"
import shape from "./shape"
import link from "./link"
import UnitShape from "./unit-shape"
import FontsShape from "./fonts-shape"

import BaseTheme from "./theme"
import * as wrappers from "./wrappers"

/**
 * <PropTypesUI component={this}/>
 */
export default class PropTypesUI extends PureComponent{
    static reviver=function(key,value){
        if(React.isValidElement(this[key])){
            return this[key]
        }
        if(this[key].isGeometry){
            return this[key]
        }
        return Iterable.isKeyed(value) ? value.toMap() : value.toList()
    }
    static Theme=BaseTheme
    static wrappers=wrappers

    static getTheme=a=>{
        return fromJS(BaseTheme).mergeDeep(a).toJS()
    }
    
    static Types=(types=>(Object.assign(this,types),types))({
        any,string,number,bool,shape,oneOf,oneOfType,arrayOf,link,
        UnitShape, 
        FontsShape,
    });
    
    static childContextTypes={
        uiContext: PropTypes.oneOf(["Ribbon","Dialog","Tree","Tab", "Panel"]),
        set: PropTypes.func,
    }
    static contextTypes={
        uiContext: this.childContextTypes.uiContext,
        propTypesUITheme:PropTypes.object,
    }

    static propTypes={
        theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        uiContext: PropTypes.string,
        propTypes: PropTypes.object, //->shape.schema
        props: PropTypes.object,//->shape.value

    }
    
    get Types(){
        return {...PropTypesUI.Types,...this.Theme.$Types}
    }

    get Theme(){
        return this.context.propTypesUITheme||this.constructor.Theme
    }

    get theme(){
        const {theme,propTypes={}}=this.props
        
        if(!theme)
            return theme
        const BaseTheme=this.Theme
        switch(typeof(theme)) {
            case "string":
                return BaseTheme[theme]
            case "object":{
                const keys=Object.keys(theme)
                if(keys.length==1){
                    const isProp=keys[0] in propTypes
                    if(!isProp){
                        const domain=Object.keys(theme)[0]
                        return fromJS(BaseTheme[domain]||{})
                            .mergeDeep(fromJS({[this.uiContext]:theme[domain]},this.constructor.reviver)).toJS()
                    }
                }
                return theme
            }
        }
    }

    get uiContext(){
        return this.props.uiContext||this.context.uiContext 
    }

    getChildContext(){
        return {
            uiContext: this.uiContext,
            set: this.set
        }
    }

    constructor({props={},onChange}){
        super(...arguments)
        this.state={props:fromJS(props)}
        this.set=this.set.bind(this)
    }

    get value(){
        return this.state.props.toJS()
    }
    
    render(){
        const {props:{propTypes, uiContext, props:_, theme,...props0}, state:{props}}=this
        return <this.Types.shape schema={propTypes.Type?.props.schema||propTypes} theme={this.theme} value={props.toJS()} {...props0}/>
    }

    componentDidUpdate({onChange, props}, prevState){
        if(onChange && props!=this.props.props){
            const newProps=fromJS(this.props.props||{})
            if(!newProps.equals(fromJS(props||{}))){
                this.setState({props:newProps})
            }
        }
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
}