import React, {Fragment} from "react"
import PropTypes from "prop-types"
import base from "./base"

export default class shape extends base{
    static displayName="shape"
    static propTypes={
        ...super.propTypes,
        schema: PropTypes.object,
    }
    get schema(){
        const {schema={}}=this.props
        return schema
    }

    get value(){
        const {value={}}=this.props
        return value
    }

    getKeyTheme(key){
        if(React.isValidElement(this.theme[key]))
            return {}
        return super.getKeyTheme(key)
    }

    renderDialog(){
        const {theme, context:{uiContext="Dialog"}, $props:{Wrapper}}=this

        const content=Object.keys(this.schema).map(key=>{
            const {type, props,value=this.value[key],UIType=this.getUIType(type)}=(()=>{
                if(React.isValidElement(theme[key]))
                    return theme[key]
                return this.schema[key]?.Type||{}
            })();
            
            if(!UIType || theme[key]===false || theme[key]?.[uiContext]===false)
                return null
            
            return <UIType {...{...props, theme:this.getKeyTheme(key), value, key, name:key, path:`${this.makePath(key)}`}}/>
        })
        
        if(!Wrapper || content.length==0){
            return content
        }

        return (
            <Wrapper shape={this}>
                {content}
            </Wrapper>
        )
        
    }

    renderRibbon(){
        return this.renderDialog()
    }

    renderTree(){
        return this.renderDialog()
    }

    renderMenu(){
        return this.renderDialog()
    }
}