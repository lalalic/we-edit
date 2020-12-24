import React from "react"
import Manager from "./manager"

const PRECISION=100000 

/**
 * state:
 *      asyncManaged: current try
 *      perfect: last perfect matched scale, which can be used for quick test, such as if changed content's height<limit with perfect
 */
export default class extends Manager{
    static displayName="autofit-manager"
    static Context=React.createContext({})
    static getDerivedStateFromProps({children},{asyncManaged, perfect, ...state}){
        const {props:{hash,autofit}}=children
        if(hash!=state.hash && perfect){
            asyncManaged=React.cloneElement(children,{autofit:{...autofit,fontScale:perfect.scale}})
        }
        return {hash, asyncManaged}
    }

    constructor(){
        super(...arguments)
        Object.defineProperties(this,{
            perfect:{
                get:()=>{
                    const {limit, lastComposed:tried}=this
                    let perfect=tried.find(a=>a.scale==PRECISION && a.height<limit)//not scaled but can hold
                                    ||tried.find(a=>Math.abs(limit-a.height)<3)//almost equals
                                    ||(new Set(tried.map(a=>a.height)).size<tried.length-1 && tried[tried.length-1])//somehow height not changed when scale changed
                    if(!perfect){
                        const all=[...tried,{height:limit}].sort((a,b)=>a.height-b.height)
                        const i=all.map(a=>a.height).indexOf(limit)
                        perfect=all[i+1] && all[i-1]//bigger and smaller
                    }
                    return perfect
                }
            },
        
            limit:{
                get:()=>this.managedComposer.getSpace().height
            }
        })
    }

    render(){
        const {props:{children:template, fit},state:{asyncManaged=template}}=this
        const {props:{id,hash,autofit:{fontScale:scale=PRECISION}}}=asyncManaged
        console.debug(`autofit shape[${id}] rendering for scale ${scale}`)
        return (
            <this.constructor.Context.Provider value={{scale, fitFont:(size,scale)=>Math.floor(size*parseInt(scale)/PRECISION),...fit}}>
                {React.cloneElement(asyncManaged,{manager:this, allowOverflow:true, hash:`${hash}-${scale}`})}
            </this.constructor.Context.Provider>
        )
    }

    appendComposed(composed){
        const {props:{id, autofit:{fontScale:scale=PRECISION}}, contentHeight:height}=this.managedComposer
        console.debug(`autofit shape[${id}] composed for scale ${scale}`)
        const {perfect}=this.state
        if(scale==perfect?.scale && height==perfect.height){
            /**
             * use last perfect to short-cut, no matter changed or not
             */
            this.context.parent.appendComposed(composed)
            return  
        }

        this.lastComposed.push({scale, composed, height})
        if(this.lastComposed.length==1){
            if(this.perfect){
                return this.context.parent.appendComposed(composed)
            }
            const asyncible=this.createAsyncComposed2Parent(
                composed,
                {
                    id:`${this.managed.props.id}.${Date.now()}`,
                },
                this.managed)
            this.context.parent.appendComposed(asyncible)
        } 
    }

    asyncManagedDidCompose(asyncManaged,asyncer, composed){
        const updater=()=>({...this.current, composed})
        if(composed){
            const perfect=this.lastComposed.find(a=>a.composed==composed)
            /**
             * to render with perfect scale at least to cheerup correct composers
             * It's ok to cheerup again to make logic more of appendComposed simple 
             */
            asyncManaged=React.cloneElement(asyncManaged, {autofit:{...asyncManaged.props.autofit,fontScale:perfect.scale}})
            this.setState({asyncManaged,perfect},()=>{
                asyncer.log(`finally perfect for ${asyncManaged.props.message} with scale=${perfect.scale} and height=${perfect.height}`)
                super.asyncManagedDidCompose(asyncManaged, asyncer, composed, updater)
            })
        }else{
            super.asyncManagedDidCompose(asyncManaged, asyncer, composed, updater)
        }
    }

    asyncManagedLastComposed(asyncManaged){
        return this.perfect?.composed
    }

    asyncManagedNext(asyncManaged, asyncer){
        const {limit, current:{scale, height}}=this
        const {props:{autofit}}=asyncManaged
        const fontScale=height>limit ? Math.max(scale-7500, 7500) : Math.min(PRECISION, scale+7500)
        return React.cloneElement(asyncManaged, {autofit:{...autofit,fontScale},message:`autfit.scale=${fontScale}`})
    }

    get current(){
        return ((a=this.lastComposed,{scale,height}=a[a.length-1])=>({scale,height}))()
    }
}