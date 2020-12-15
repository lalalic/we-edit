
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import Frame from "./frame"
import Group from "../composed/group"

const {Locatable:{Locatorize}}=Frame.composables
const locatorize=Locatorize(class{}).prototype.locatorize

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
 */
export default class Template extends Frame{
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
     * Manager is as a composer by setState({templateWithValues})
     * templateWithValues composed when show
     */
    static Manager=class Manager extends Component{
        static displayName="template-manager"
        static childContextTypes={
            notifyVariable:PropTypes.func,
            parent: PropTypes.object,
            variables: PropTypes.object,
            shouldContinueCompose: PropTypes.func,
        }

        static contextTypes={
            parent: PropTypes.object,
            debug: PropTypes.bool,
            getComposer: PropTypes.func,
        }

        static getDerivedStateFromProps({children:{props:{hash}}},state){
            return {hash,templateWithValues:hash!=state.hash ? null : state.templateWithValues}
        }
    
        constructor(){
            super(...arguments)
            this.state={...this.state}
            this.variables=this.props.variables||new Variables()
            this.notifyVariable=this.notifyVariable.bind(this)
            this.lastComposed=[]
            this.appendComposed=this.appendComposed.bind(this)
        }

        get template(){
            return this.props.children
        }

        get templateComposer(){
            return this._templateComposer
        }

        _text(element){
            return new ReactQuery(element).find('text,[data-type=text]').toArray().map(a=>a.props.children).join(",")
        }

        shouldComponentUpdate({children:{props:{hash,}}},{templateWithValues}){
            const changed=hash!=this.props.children.props.hash
            if(changed){
                this.lastComposed=[]
                //this.variables.clear()
                return true
            }
            return !!(templateWithValues && !this.lastComposed[this.variables.id(templateWithValues.props.values)])
        }
    
        notifyVariable(variable){
            if(!this.state.templateWithValues){
                this.variables.add(variable)
            }
        }
    
        getChildContext(){
            return {
                notifyVariable:this.notifyVariable,
                variables: this.state.values,
                shouldContinueCompose:a=>true,
                parent:new Proxy(this.context.parent,{
                    get:(parent, k, proxy)=>k=="appendComposed" ? this.appendComposed : Reflect.get(parent,k,proxy)
                }),
            }
        }

        appendComposed(a){
            const {values}=a.props
            const composed=a.createComposed2Parent()
            if(values){
                this.lastComposed[this.variables.id(values)]=composed
                if(this.context.debug)
                    console.debug(`[${a.props.uuid}.manager.composed]: ${this._text(composed)}`)
            }else{
                this.context.parent.appendComposed(a)
                this.lastComposed.default=composed
            }
            this._templateComposer=a
        }
    
        render(){
            const {state:{templateWithValues}, props:{children:template}}=this
            return React.cloneElement(templateWithValues||template,{manager:this})
        }

        createComposed2Parent(variables){
            if(this.variables.size==0){
                return this.lastComposed.default
            }
            
            const id=this.variables.id(variables)
            if(this.variables.equals(variables)){
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
    
            return this._renderVariables(variables, replaced, this.lastComposed.default, )
        }

        _renderVariables(variables, replaced, defaultComposed) {
            const replaceableComposed = [], id=this.variables.id(variables)
            const uuid=`${id}.${Date.now()}`
            replaceableComposed[0] = (<this.constructor.Async {...{
                id:uuid,
                children: React.cloneElement(replaced, {values:variables, uuid}),
                compose:(templateWithValues,onComposed, responsible)=>{
                    this.setState({templateWithValues},()=>{
                        if(this.templateComposer.props.values==templateWithValues.props.values){
                            const composed=this.templateComposer.createComposed2Parent()
                            this.lastComposed[id]=composed
                            console.log(`[${uuid}.manager]: forced update async with${composed?"":"out"} composed`) 
                            replaceableComposed[0] = composed
                            this.onTemplated(variables,responsible)
                            onComposed(composed)
                        }else{
                            console.log(`[${uuid}.manager]: forced update async for ${uuid}, but template is ${this.templateComposer.props.uuid}`) 
                        }
                    })
                },
                childContext: locatorize.call({}, new Map()),
            }} />)
            console.log(`[${uuid}.manager]: use Async`)    
    
            return React.cloneElement(defaultComposed,{children:replaceableComposed})
        }

        replaceVariables(composed, values){
            return Array.from(this.variables).reduce((element,a)=>
                a.replaceVariable(element,values,composed)
            ,this.template)
        }
    
        onTemplated(variables,responsible){
            if(!responsible)
                return 
            if(this.context.getComposer(responsible.cursor.id)?.closest(a=>a.props.id==this.props.id)){
                responsible.__updateSelectionStyle()
            }
        }

        /**
         * A template re-render trigger by setState
         */
        static Async=class extends Component{
            static displayName="async"
            static getDerivedStateFromProps({children:{props:{hash}}}, state){
                return {hash, composed:state.hash!=hash ? null : state.composed}
            }

            static contextTypes={
                responsible: PropTypes.object,
            }

            constructor(...args){
                super(...args)
                this.state={}
                console.log(`[${this.props.id}.async]: creating`)
            }

            get template(){
                return this.props.children
            }

            render(){
                console.log(`[${this.props.id}.async]: render with${this.state.composed?"":"out"} composed`)
                return <Group>{this.state.composed?.props.children||null}</Group>
            }

            componentDidMount(){
                console.log(`[${this.props.id}.async]: mounting`)
                if(!this.state.composed){
                    console.log(`[${this.props.id}.async]: force compose`)
                    this.props.compose(
                        this.props.children,
                        composed=>{
                            if(this.unmounted)
                                return 
                            this.setState({composed})
                        },
                        this.context.responsible
                    )
                }
            }

            componentDidUpdate(){
                console.log(`[${this.props.id}.async]: updated with${this.state.composed?"":"out"} composed`)
            }

            componentWillUnmount(){
                this.unmounted=true
                console.log(`[${this.props.id}.async]: unmounting with${this.state.composed?"":"out"} composed`)
            }
        }
    }

    
}

class Variables extends Set{
    equals(variables){
        return true
    }

    getValues(variables){
        return {}
    }

    id(variables){
        return 1
    }
}
