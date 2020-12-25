
import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery, shallowEqual} from "we-edit"

/**
 * To make a frame compose on-demand, such as
 * content with variables
 * autofit frame
 * 
 * **AsyncManager can't be unmount since Async may call it to compose in any time**
 * we can register manager, and don't use Cache for its parents
 * * avoid registering by checking composer.props.manager
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
        console.debug(`${this.constructor.displayName}[${this.managed.props.id}] created`)
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

    componentWillUnmount(){
        this.queue.length=0
        this.unmounted=true
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
     * ** Use Array as children, so async composed can be injected into positioning tree
     * @param {*} composed: default composed result
     * @param {*} asyncProps: aync component props
     */
    createAsyncComposed2Parent(composed, asyncProps, asyncManaged) {
        const replaceableComposed = new this.constructor.ObserveableArray(1)
        replaceableComposed[0] = (<this.constructor.Async {...{
            compose:asyncer=>{
                asyncManaged=this.asyncManagedNext(asyncManaged,asyncer)
                this.queue.push(Object.assign(()=>{
                    return new Promise((resolve)=>{
                        asyncer.log(`going to update for ${asyncManaged.props.message}`)
                        this.setState({asyncManaged},()=>{
                            try{
                                asyncer.log(`composed for for ${asyncManaged.props.message}, and ready to update UI`)
                                const composed=this.asyncManagedLastComposed(asyncManaged)
                                if(composed){
                                    replaceableComposed.set(composed.props.children)
                                }
                                this.asyncManagedDidCompose(
                                    asyncManaged, 
                                    asyncer,
                                    composed, 
                                )
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

    asyncManagedDidCompose(asyncManaged, asyncer, composed, updater=()=>({composed})){
        if(asyncer.unmounted)
            return

        asyncer.log(`updating UI for for ${asyncManaged.props.message}`)    
        asyncer.setState(updater,()=>asyncer.log(`updated UI for for ${asyncManaged.props.message}`))
        const {responsible}=asyncer.context

        const {props:{shouldUpdateSelectionStyle=a=>true}, managed:{props:{id}}}=this
        if(shouldUpdateSelectionStyle(asyncer)&&
            responsible?.getComposer(responsible.cursor.id)?.closest(a=>a.props.id==id)){
            responsible.updateSelectionStyle()
        }
    }
    //last composed result for asyncManaged
    asyncManagedLastComposed(asyncManaged){
        return this.lastComposed[this.lastComposed.length-1].props.children
    }

    //next asyncManaged to compose
    asyncManagedNext(asyncManaged,asyncer){
        return asyncManaged
    }

    /**
     * Async Trigger to render managed content with special props/varibles
     */
    static Async=class extends Component{
        static displayName="async"
        static propTypes={
            id: PropTypes.any.isRequired,
        }
        static contextTypes={
            debug: PropTypes.bool,
            responsible: PropTypes.object,
        }

        constructor(...args){
            super(...args)
            this.state={composed:null}
            this.log(`created`)
        }

        render(){
            this.log(`render with${this.state.composed?"":"out"} composed`)
            return this.state.composed?.props.children||null
        }

        componentDidMount(...args){
            this.componentDidUpdate(...args)
        }

        componentDidUpdate(lastProps, lastState){
            if(this.state.composed || shallowEqual(lastState, this.state)){
                return
            }
            this.props.compose(this)
        }

        componentWillUnmount(){
            this.unmounted=true
            this.log(`unmounted with${this.state.composed?"":"out"} composed`)
        }

        log(m){
            if(this.context.debug)
                console.debug(`[${this.props.id}.async]: ${m}`)
        }
    }

    static ObserveableArray=class extends Array{
        constructor(...args){
            super(...args)
            this.isObserveableArray=true
            const listeners=[]
            this.subscribe=a=>!listeners.includes(a) && listeners.push(a)
            this.unsubscribe=a=>{
                const i=listeners.indexOf(a)
                i!=-1 && listeners.splice(i,1)
            }
            this.set=v=>(this[0]=v) && listeners.forEach(a=>a(v))
        }
    }
}