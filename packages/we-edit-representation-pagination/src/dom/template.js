
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery, dom} from "we-edit"

import Frame from "./frame"

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
export default class extends dom.Unknown{
    static displayName="template"
    static already(){
        return this.Frame.already(...arguments)
    }

    get composables(){
        return this.Frame.composables
    }

    get Use(){
        return this.Frame.Use
    }

    render(){
        const {variables, ...props}=this.props
        const Template=this.constructor.Frame
        const Manager=this.constructor.Manager
        Manager.Async=this.constructor.Async
        if(!variables){
            return <Frame {...props}/>
        }
        return (
            <Manager {...{variables}}>
                <Template {...props}/>
            </Manager>
        )
    }

    static Frame=class extends Frame{
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
    }

    /**
     * Manager is as a composer by setState({asyncManaged})
     * asyncManaged composed when show
     */
    static Manager=class extends Component{
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
            return {hash,asyncManaged:hash!=state.hash ? null : state.asyncManaged}
        }
    
        constructor(){
            super(...arguments)
            this.state={...this.state}
            this.variables=this.props.variables||new Variables()
            this.notifyVariable=this.notifyVariable.bind(this)
            this.lastComposed=[]
            this.appendComposed=this.appendComposed.bind(this)

            this.queue=(()=>{
                const queue=[]
                let current=null
                const compose=start=>start().then(()=>(current=queue.shift()) && compose(current))
                
                return new Proxy(queue,{
                    get:(arr, k, proxy)=>{
                        if(k=="push"){
                            return message=>{
                                for(let i=arr.length-1;i>-1;i--){
                                    if(arr[i].id==message.id){
                                        arr.splice(i,1)
                                    }
                                }
                                arr.push(message)
                                !current && compose(current=arr.shift())
                            }
                        }
                        return Reflect.get(arr,k,proxy)
                    }
                })
            })();
        }

        get managed(){
            return this.props.children
        }

        _text(element){
            return new ReactQuery(element).find('text,[data-type=text]').toArray().map(a=>a.props.children).join(",")
        }

        shouldComponentUpdate({children:{props:{hash,}}},{asyncManaged}){
            const changed=hash!=this.props.children.props.hash
            if(changed){
                this.lastComposed=[]
                this.queue.splice(0,this.queue.length)
                /**
                 * clear variables if content changed
                 * there is issue with cache, so don't clear, and there's no problem
                 */
                //this.variables.clear()
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
            if(!this.managedComposer){
                Object.defineProperties(this,{
                    managedComposer:{
                        get(){
                            return a
                        }
                    }
                })
            }
        }
    
        render(){
            const {state:{asyncManaged}, props:{children:template}}=this
            return React.cloneElement(asyncManaged||template,{manager:this})
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
    
            return this.createAsyncComposed2Parent(variables, replaced, this.lastComposed.default, )
        }

        /**
         * to create async element, and will update the composed to document's composed tree
         * @param {*} variables 
         * @param {*} replaced 
         * @param {*} defaultComposed 
         */
        createAsyncComposed2Parent(variables, replaced, defaultComposed) {
            const replaceableComposed = [], id=this.variables.id(variables)
            const uuid=`${id}.${Date.now()}`
            replaceableComposed[0] = (<this.constructor.Async {...{
                id,
                uuid,
                children: React.cloneElement(replaced, {values:variables, uuid}),
                compose:(asyncManaged,onComposed)=>{
                    this.queue.push(Object.assign(()=>{
                        return new Promise((resolve)=>{
                            this.setState({asyncManaged},()=>{
                                try{
                                    onComposed(replaceableComposed[0] = this.lastComposed[id], variables, this)
                                }finally{
                                    resolve()
                                }
                            })
                        })
                    }),{id})
                },
                childContext: locatorize.call({}, new Map()),
            }} />)
            console.log(`[${uuid}.manager]: use Async`)    
    
            return React.cloneElement(defaultComposed,{children:replaceableComposed})
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
    }

    /**
     * A template re-render trigger by setState
     */
    static Async=class extends Component{
        static displayName="async"
        static contextTypes={
            responsible: PropTypes.object,
            getComposer: PropTypes.func,
        }

        constructor(...args){
            super(...args)
            this.state={}
            this.onComposed=this.onComposed.bind(this)
            console.log(`[${this.props.uuid}.async]: creating`)
        }

        get content(){
            return this.props.children
        }

        render(){
            console.log(`[${this.props.uuid}.async]: render with${this.state.composed?"":"out"} composed`)
            return this.state.composed?.props.children||null
        }

        componentDidMount(){
            console.log(`[${this.props.uuid}.async]: mounting`)
            if(!this.state.composed){
                console.log(`[${this.props.uuid}.async]: force compose`)
                this.props.compose(
                    this.props.children,
                    this.onComposed,
                    this.context.responsible
                )
            }
        }

        onComposed(composed, variables, manager){
            if(this.unmounted)
                return
            this.setState({composed})
            const {getComposer, responsible}=this.context

            if(this.props.whenUpdateSelectionStyle?.call(this,)&&
                getComposer(responsible.cursor.id)?.closest(a=>a.props.id==this.content.props.id)){
                responsible.updateSelectionStyle()
            }
        }

        componentWillUnmount(){
            this.unmounted=true
            console.log(`[${this.props.uuid}.async]: unmounting with${this.state.composed?"":"out"} composed`)
        }
    }

    static Variables=class{
        constructor(){
            this.length=this.size=0
        }

        equals(variables){
            return true
        }
    
        getValues(variables){
            return {}
        }
    
        id(variables){
            return 1
        }

        add(){

        }

        clear(){

        }
    }
}




