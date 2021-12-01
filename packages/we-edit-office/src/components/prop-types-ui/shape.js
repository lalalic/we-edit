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

    renderDialog(){
        const {theme, context:{uiContext="Dialog"}, $props:{Wrapper, children}}=this
        const schema={...this.schema}
        const content=Object.keys(schema).map((key,i)=>{
            let keyTheme=theme[key]

            const {type, props,value=this.value[key]}=(()=>{
                if(React.isValidElement(theme[key])){
                    keyTheme=null
                    return theme[key]
                }
                return schema[key]?.Type||{}
            })();

            const UIType=this.getUIType(type)
            
            if(!UIType || theme[key]===false || theme[key]?.[uiContext]===false)
                return null
            
            if(!keyTheme || Object.keys(keyTheme).length==0){
                keyTheme=undefined
            }

            return <UIType {...{theme:keyTheme,...props, value, key, name:key, path:`${this.makePath(key)}`}}/>
        })

        if(children){
            if(React.isValidElement(children) && 
                typeof(children.type)=="string" && 
                this.Types[children.type]){
                content.push(React.createElement(this.Types[children.type], children.props))    
            }else{
                content.push(children)
            }
        }

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