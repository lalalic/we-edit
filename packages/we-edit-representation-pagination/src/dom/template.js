
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import Frame from "./frame"

class Use extends Component{
    static displayName="template.use"
    static contextTypes={
        getComposedTemplate:PropTypes.func.isRequired
    }
    static childContextTypes={
        editable:PropTypes.any
    }

    getChildContext(){
        return {editable:false}
    }

    render(){
        const {context:{getComposedTemplate},props:{xhref, varables}}=this
        const template=getComposedTemplate(xhref)
        if(!template)
            return null
        const {props:{master}}=template
        return (
            <Fragment>
                {master && <Use xhref={master}/>}
                {template.createComposed2Parent(varables)}
            </Fragment>
        )
    }
}

/**
 * Template should keep instances for positioning
 * @TODO: mount composers for variables, so positioning will be correct
 */
export default class extends Frame{
        static Use=Use
        static displayName=super.displayName.replace("frame","template")
        
        static defaultProps={
            ...super.defaultProps,
            autoCompose2Parent:false,
        }
    
        get isTemplate(){
            return true
        }
    
        createComposed2Parent(variables){
            if(arguments.length==0 || !this.props.manager)
                return super.createComposed2Parent()
            return this.props.manager.createComposed2Parent(...arguments)
        }
/**
     * Manager is as a composer by setState({asyncManaged})
     * asyncManaged composed when show
     */
    static Manager=class extends super.Manager{
        static displayName="template-manager"
        static childContextTypes={
            ...super.childContextTypes,
            notifyVariable:PropTypes.func,
            variables: PropTypes.object,
        }
        
        constructor(){
            super(...arguments)
            this.variables=this.props.variables||new Variables()
            this.notifyVariable=this.notifyVariable.bind(this)
        }
        shouldComponentUpdate({children:{props:{hash,}}},{asyncManaged}){
            super.shouldComponentUpdate(...arguments)
            if(hash!=this.props.children.props.hash){
                return true
            }
            
            const should=!!(asyncManaged && !this.lastComposed[this.variables.id(asyncManaged.props.values)])
            if(!should){
                this.managedComposer.context.mount(this.managedComposer)
            }
            return should
        }
    
        notifyVariable(variable){
            if(!this.state.asyncManaged){
                this.variables.add(variable)
            }
        }

        /**
         * replacing happens 
         * ** in composed, which would not trigger async compose
         * ** in this.managed, which would trigger async compose
         * @param {*} composed 
         * @param {*} values 
         */
        replaceVariables(composed, values){
            return Array.from(this.variables).reduce((element,a,i)=>{
                return a.replaceVariable(element,values,composed)||element
            },this.managed)
        }
    
        getChildContext(){
            return Object.assign(super.getChildContext(),{
                notifyVariable:this.notifyVariable,
                variables: this.state.values,
            })
        }

        appendComposed(a){
            const {values}=a.props
            const composed=a.createComposed2Parent()
            if(values){
                this.lastComposed[this.variables.id(values)]=composed
                if(this.context.debug)
                    console.debug(`[${a.props.id}.manager.composed]: ${this._text(composed)}`)
            }else{
                this.context.parent.appendComposed(a)
                this.lastComposed.default=composed
            }
        }

        createComposed2Parent(variables){
            if(this.variables.length==0){
                return this.lastComposed.default
            }
            
            const id=this.variables.id(variables)
            if(this.variables.isDefault(variables)){
                console.log(`[${id}.manager]: use cached default because of matching default`)
                return this.lastComposed.default
            }
            
            if(this.lastComposed[id]){
                console.log(`[${id}.manager]: use cached`)
                return this.lastComposed[id]
            }
            
            const values=this.variables.getValues(variables)
            const replaced=this.replaceVariables(this.lastComposed.default,values)
            if(replaced==this.props.children || replaced==this.lastComposed.default){
                console.log(`[${id}.manager]: use cached default because of no replaced`)
                return this.lastComposed.default
            }
            if(this.context.debug)
                console.log(`[${id}.manager.replaced]: ${this._text(replaced)}`)
            if(new ReactQuery(replaced).findFirst("[data-content]").length){
                /**
                 * replace variable in content, so don't need recompose
                 */
                console.log(`[${id}.manager]: use cached default because of replacing in composed`)
                return replaced
            }
    
            return this.createAsyncComposed2Parent(
                    this.lastComposed.default, 
                    {
                        id:`${this.managed.props.id}.${id}`,
                        variables,
                    }, 
                    React.cloneElement(replaced,{values:variables})
                )
        }

        //last composed result for asyncManaged
        asyncManagedLastComposed(asyncManaged){
            const id=this.variables.id(asyncManaged.props.values)
            return this.lastComposed[id]
        }
    }

    static Variables=class{
        constructor(){
            this.data=[]
            this[Symbol.iterator]=this.data[Symbol.iterator].bind(this.data)
        }
        //from varibles to display text
        getValues(variables){
            return variables   
        }
        
        //variables are same as default value in content
        isDefault(variables){
            const values=this.getValues(variables)
            return !this.data.find(a=>a.display!=values[a.id])
        }
    
        add(variable){
            const i=this.data.findIndex(a=>a.id==variable.id)
            if(i!=-1){
                this.data.splice(i,1,variable)
            }else{
                this.data.push(variable)
            }
        }
    
        clear(){
            this.data.splice(0,this.data.length)
        }
    
        id(variables){
            return variables.id
        }
    
        get length(){
            return this.data.length
        }
    }

}





