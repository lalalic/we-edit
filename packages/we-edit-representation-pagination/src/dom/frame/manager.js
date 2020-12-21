
import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

/**
 * To make a frame compose on-demand, such as
 * content with variables
 * autofit frame
 */
export default class AsyncManager extends Component{
    static displayName="async-manager"
    static childContextTypes={
        parent: PropTypes.object,
        shouldContinueCompose: PropTypes.func,
    }

    static contextTypes={
        parent: PropTypes.object,
        debug: PropTypes.bool,
        getComposer: PropTypes.func,
    }

    static getDerivedStateFromProps({children:{props:{hash}}},state){
        return {hash,asyncManaged:hash!=state.hash ? undefined : state.asyncManaged}
    }

    constructor(){
        super(...arguments)
        this.state={}
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

    get managedComposer(){
        return this.context.getComposer(this.managed.props.id)
    }

    _text(element){
        return new ReactQuery(element).find('text,[data-type=text]').toArray().map(a=>a.props.children).join(",")
    }

    shouldComponentUpdate({children:{props:{hash,}}}){
        const changed=hash!=this.props.children.props.hash
        if(changed){
            this.lastComposed=[]
            this.queue.splice(0,this.queue.length)
        }
        return true
    }

    getChildContext(){
        return {
            shouldContinueCompose:a=>true,
            parent:new Proxy(this.context.parent,{
                get:(parent, k, proxy)=>k=="appendComposed" ? this.appendComposed : Reflect.get(parent,k,proxy)
            }),
        }
    }

    /**
     * manager needs rewrite this function to hold composed result
     * @param {*} a 
     */
    appendComposed(a){
        this.context.parent.appendComposed(a)
    }

    render(){
        const {state:{asyncManaged}, props:{children:template}}=this
        return React.cloneElement(asyncManaged||template,{manager:this})
    }

    /**
     * to create async element, and will update the composed to document's composed tree
     * @param {*} composed 
     */
    createAsyncComposed2Parent(composed, asyncProps) {
        const replaceableComposed = []
        replaceableComposed[0] = (<this.constructor.Async {...{
            compose:(asyncManaged,onComposed)=>{
                this.queue.push(Object.assign(()=>{
                    return new Promise((resolve)=>{
                        this.setState({asyncManaged},()=>{
                            try{
                                onComposed(replaceableComposed[0] = this.lastComposed[this.lastComposed.length-1])
                            }finally{
                                resolve()
                            }
                        })
                    })
                }),{id:asyncProps.id})
            },
            ...asyncProps,
        }} />)
        return React.cloneElement(composed,{children:replaceableComposed})
    }

    /**
     * Async Trigger to render managed content with special props/varibles
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
            this.log(`creating`)
        }

        get content(){
            return this.props.children
        }

        render(){
            this.log(`render with${this.state.composed?"":"out"} composed`)
            return this.state.composed?.props.children||null
        }

        componentDidMount(){
            this.log(`mounting`)
            if(!this.state.composed){
                this.log(`force compose`)
                this.props.compose(
                    this.props.children,
                    this.onComposed,
                    this.context.responsible
                )
            }
        }

        onComposed(composed, variables){
            if(this.unmounted)
                return
            this.setState({composed})
            const {getComposer, responsible}=this.context

            if(this.props.whenUpdateSelectionStyle?.call(this,variables, responsible)&&
                getComposer(responsible.cursor.id)?.closest(a=>a.props.id==this.content.props.id)){
                responsible.updateSelectionStyle()
            }
        }

        componentWillUnmount(){
            this.unmounted=true
            this.log(`unmounting with${this.state.composed?"":"out"} composed`)
        }

        log(m){
            console.debug(`[${this.content.props.id}.async]: ${m}`)
        }
    }
}