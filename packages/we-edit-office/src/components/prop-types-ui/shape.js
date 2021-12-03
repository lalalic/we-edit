import React, {Fragment, Component} from "react"
import PropTypes from "prop-types"
import base from "./base"
import ObjectTree from "../object-tree"

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

    iterate(){
        const {theme, context:{uiContext="Dialog"}, $props:{children}}=this
        const schema={...this.schema}
        const content=Object.keys(schema).map((key,i)=>{
            if(theme[key]===false || theme[key]?.[uiContext]===false)
                return null

            let keyTheme=theme[key]

            const {type, props,value=this.value[key]}=(()=>{
                if(React.isValidElement(theme[key])){
                    keyTheme=null
                    return theme[key]
                }
                return schema[key]?.Type||{}
            })();

            const UIType=this.getUIType(type)
            
            if(!UIType)
                return null
            
            if(!keyTheme || Object.keys(keyTheme).length==0){
                keyTheme=undefined
            }

            return <UIType {...{theme:keyTheme,...props, value, key, name:key, path:`${this.makePath(key)}`}}/>
        }).filter(a=>!!a)

        if(children){
            if(React.isValidElement(children) && 
                typeof(children.type)=="string" && 
                this.Types[children.type]){
                content.push(React.createElement(this.Types[children.type], {...children.props,key:children.key||content.length}))    
            }else{
                content.push(children)
            }
        }
        return content
    }

    renderDialog(MyWrapper){
        const content=this.iterate()
        
        const {Wrapper=MyWrapper}=this.$props

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
        return this.renderDialog(this.constructor.Tree)
    }

    renderMenu(){
        return this.renderDialog()
    }

    static Tree=class extends Component{
        static contextTypes={
            propTypesUITheme: PropTypes.object,
            uiContext: PropTypes.string,
        }

        render(){
            const {children}=this.props
            return (
                <Fragment>
                    {children.map(a=>{
                        if(!React.isValidElement(a)){
                            return a
                        }

                        const {props:{path,name,},type}=a
                        if(path){
                            const props={name, value:a, key:path}
                            if(type.isPrimitive?.(a, this.context)){
                                props.value=React.cloneElement(a,{isPrimitive:true})
                            }
                            return <ObjectTree {...props}/>
                        }

                        return a
                    })}
                </Fragment>
            )
        }
    }
}