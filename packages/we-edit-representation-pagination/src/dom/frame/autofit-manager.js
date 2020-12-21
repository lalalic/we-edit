import React from "react"
import {shallowEqual} from "we-edit"
import Manager from "./manager"
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

    render(){
        const {props:{children:template},state:{asyncManaged=template}}=this
        const {props:{id,hash,autofit:{fontScale:scale=PRECISION}}}=asyncManaged
        console.debug(`autofit shape[${id}] rendering for scale ${scale}`)
        return (
            <this.constructor.Context.Provider value={{scale}}>
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
            if(this.getPerfect()){
                return this.context.parent.appendComposed(composed)
            }
            this.context.parent.appendComposed(this.createAsyncComposed2Parent(composed))
        } 
    }

    createAsyncComposed2Parent(defaultComposed){
        const current=(a=this.lastComposed,{scale,height}=a[a.length-1])=>({scale,height})
        const replaceableComposed = []
        replaceableComposed[0] = (<this.constructor.Async {...{
            id:`${this.managed.props.id}.${Date.now()}`,
            children: this.managed,
            limit: this.limit,
            ...current(),
            compose:(asyncManaged,onComposed)=>{
                this.queue.push(()=>{
                    return new Promise((resolve)=>{
                        this.setState({asyncManaged},()=>{
                            try{
                                const perfect=this.getPerfect()
                                if(perfect){
                                    /**
                                     * to render with perfect scale at least to cheerup correct composers
                                     * It's ok to cheerup again to make logic more of appendComposed simple 
                                     */
                                    asyncManaged=React.cloneElement(asyncManaged, {autofit:{...asyncManaged.props.autofit,fontScale:perfect.scale}})
                                    this.setState({asyncManaged,perfect},()=>{
                                        onComposed(replaceableComposed[0]=perfect.composed, {})
                                    })
                                }else{
                                    onComposed(replaceableComposed[0]=perfect?.composed, current())
                                }
                            }finally{
                                resolve()
                            }
                        })
                    })
                })
            }
        }} />)
        
        return React.cloneElement(defaultComposed,{children:replaceableComposed})
    }

    getPerfect(){
        const {limit, lastComposed:tried}=this
        let perfect=tried.find(a=>a.scale==PRECISION && a.height<limit)//not scaled but can hold
                        ||tried.find(a=>Math.abs(limit-a.height)<3)//almost equals
                        ||(new Set(tried.map(a=>a.height)).size<tried.length && tried[tried.length-1])//somehow height not changed when scale changed
        if(!perfect){
            const all=[...tried,{height:limit}].sort((a,b)=>a.height-b.height)
            const i=all.map(a=>a.height).indexOf(limit)
            perfect=all[i+1] && all[i-1]//bigger and smaller
        }
        return perfect
    }

    get limit(){
        return this.managedComposer.getSpace().height
    }

    static Async=class extends super.Async{
        static getDerivedStateFromProps({scale,height},state){
            return {scale,height,...state}
        }
        onComposed(composed, variables){
            if(this.unmounted)
                return 
            this.setState({composed, ...variables})
            const {getComposer, responsible}=this.context

            if(getComposer(responsible.cursor.id)?.closest(a=>a.props.id==this.content.props.id)){
                responsible.updateSelectionStyle()
            }
        }

        componentDidMount(...args){
            this.componentDidUpdate(...args)
        }

        componentDidUpdate(a, lastState){
            if(this.state.composed || shallowEqual(lastState, this.state))
                return 
            const {
                props:{limit, compose}, 
                state:{scale, height}, 
                context:{responsible},
                content:{props:{autofit}}}=this
            
            const fontScale=height>limit ? Math.max(scale-7500, 7500) : Math.min(PRECISION, scale+7500)
            compose(React.cloneElement(this.content, {autofit:{...autofit,fontScale}}),this.onComposed,responsible)
        }
    }
}

const PRECISION=100000 
