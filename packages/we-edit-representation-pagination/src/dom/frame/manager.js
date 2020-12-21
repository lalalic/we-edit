
import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery, shallowEqual} from "we-edit"

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
     * ** Use Array as children, so async composed can be injected into positioning tree
     * @param {*} composed: default composed result
     * @param {*} asyncProps: aync component props
     */
    createAsyncComposed2Parent(composed, asyncProps, asyncManaged) {
        const replaceableComposed = []
        replaceableComposed[0] = (<this.constructor.Async {...{
            compose:asyncer=>{
                asyncManaged=this.asyncManagedNext(asyncManaged,asyncer)
                this.queue.push(Object.assign(()=>{
                    return new Promise((resolve)=>{
                        this.setState({asyncManaged},()=>{
                            try{
                                this.asyncManagedDidCompose(
                                    asyncManaged, 
                                    asyncer,
                                    replaceableComposed[0]=this.asyncManagedLastComposed(asyncManaged), 
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
        asyncer.setState(updater)
        const {getComposer, responsible}=asyncer.context

        const {props:{shouldUpdateSelectionStyle=a=>true}, managed:{props:{id}}}=this
        if(shouldUpdateSelectionStyle(asyncer)&&
            getComposer(responsible.cursor.id)?.closest(a=>a.props.id==id)){
            responsible.updateSelectionStyle()
        }
    }
    //last composed result for asyncManaged
    asyncManagedLastComposed(asyncManaged){
        return this.lastComposed[this.lastComposed.length-1]
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
            getComposer: PropTypes.func,
        }

        constructor(...args){
            super(...args)
            this.state={}
            this.log(`creating`)
        }

        render(){
            this.log(`render with${this.state.composed?"":"out"} composed`)
            return this.state.composed?.props.children||null
        }

        componentDidMount(...args){
            this.componentDidUpdate(...args)
        }

        componentDidUpdate(lastProps, lastState){
            if(this.state.composed || shallowEqual(lastState, this.state))
                return
            this.props.compose(this)
        }

        componentWillUnmount(){
            this.unmounted=true
            this.log(`unmounting with${this.state.composed?"":"out"} composed`)
        }

        log(m){
            if(this.context.debug)
                console.debug(`[${this.props.id}.async]: ${m}`)
        }
    }
}