import React, { Fragment } from "react"
import PropTypes from "prop-types"
import base from "./base"
import { ShapeGrid, ShapeTree } from "./wrappers"

const clean=base.clean
export default class shape extends base{
    static displayName="shape"
    static propTypes={
        ...super.propTypes,
        schema: PropTypes.object,
    }
    static defaultWrappers={
        Dialog:<ShapeGrid/>,
        Panel: <ShapeGrid grid={1}/>,
        Tree:<ShapeTree/>,
    }
    get schema(){
        const {schema={}}=this.props
        return schema
    }

    get value(){
        const {value={}}=this.props
        return value
    }

    getDefaultWrapper(){
        return this.constructor.defaultWrappers[this.uiContext]
    }

    iterate(){
        const {theme,uiContext, $props:{children, $presets,}}=this
        
        const schema=this.schema
        const content=Object.keys(schema).map((key,i)=>{
            let keyTheme=theme[key]
            if((theme['*']===false && keyTheme===undefined) ||
                keyTheme===false || 
                (typeof(keyTheme)=="object" && (
                    keyTheme[uiContext]===false ||
                    (uiContext=="Panel" && keyTheme.Panel==undefined && keyTheme.Dialog===false)))
                ){
                return null
            }
            
            const {type, props,value=this.value[key]}=(()=>{
                if(React.isValidElement(keyTheme)){
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

            return <UIType {...{theme:keyTheme,...clean(props,Object.keys(keyTheme||[])), value, key, name:key, path:`${this.makePath(key)}`}}/>
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

        if($presets){
            const {value,name}=this.$props
            const UIType=this.getUIType($presets.type)
            content.unshift(React.createElement(UIType, {value,name,path:this.path,label:`Preset ${name}s`,key:"$presets", isPresets:true,...$presets.props}))
        }

        return content
    }

    renderTree(){
        return this.iterate()
    }

    renderDialog(){
        const {name,label=name, choices}=this.$props
        if(!choices)
            return super.renderDialog()

        const choice=this.choice
        return (
            <Fragment>
                <div style={{borderBottom:"1px solid lightgray"}}>
                    {choices.map(a=>(
                        <div key={a}>
                            <input type="radio" name={`${name}_choices`} checked={a==choice} 
                                onChange={e=>a!=choice && this.set(this.path,true)}/>
                            <span>{a} {label}</span>
                        </div>
                    ))}
                </div>
                <div>
                    {this.iterate().filter(a=>!choices.includes(a.props.name)||a.props.name==choice)}
                </div>
            </Fragment>
        )
    }

    get choice(){
        const {value, choices}=this.$props
        return choices.findLast(a=>!!value?.[a])||choices[0]
    }
}