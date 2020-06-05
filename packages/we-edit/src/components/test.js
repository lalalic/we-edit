import React, {Component,} from "react"
import PropTypes from "prop-types"

import {connect, isDocumentReady} from "../state"
import {ACTION, getActive, getAll} from "./we-edit"
import Input from "../input"
import {getSelectionStyle, getSelection, getFile} from "../state/selector"
import * as timeout from "../tools/timeout"

export const Test=connect(state=>({ready:isDocumentReady(state)}))(class extends Component{
    static contextTypes={
        store: PropTypes.any,
    }

    static propTypes={
        auto: PropTypes.bool,
        onStart: PropTypes.func,
        onEnd: PropTypes.func,
        fixture: PropTypes.oneOfType([PropTypes.func,PropTypes.string])
    }

    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        const {state:{tests, current},props:{style={}, on1Chosen}}=this
        if(!tests)
            return null
        return (
            <div style={style}>
                <CurrentContext.Provider value={{current,test1:on1Chosen}}>
                    {tests.topSuite().children.map((a,i)=>a.id.startsWith("spec") ? <Spec key={i} spec={a}/> : <Suite key={i} suite={a}/>)}
                </CurrentContext.Provider>
            </div>
        )
    }

    shouldComponentUpdate(){
        return !this.state.tested
    }

    componentDidMount(){
        const {fixture, onChange=a=>a}=this.props
        if(!fixture)
            return
        this.loadFixture(fixture)
            .then(specs=>{
                import(/*jasmine*/"jasmine-core/lib/jasmine-core/jasmine")
                .then(jasmineRequire=>{
                    this.jasmine=jasmineRequire
                    this.setState({tests:this.createEnv(specs, jasmineRequire)},()=>onChange(this.state))
                })
            })
    }

    loadFixture(fixture){
        switch(typeof(fixture)){
            case "function":
                return Promise.resolve(fixture.length ? fixture : fixture())
                    .then(a=>a.default||a)
            case "string":
                return Promise.resolve(fixture.match(/^(blob\:)?http(s)?\:\/\//) ? fetch(fixture).then(res=>res.text()) : fixture)
                    .then(js=>{
                        const isFunction=(code)=>{
                            return code.match(/(export\s+default)|(module.exports\s+=)/)
                        }
                        if(isFunction(js)){
                            return jasmine=>(new Function('j',`(${js.replace(/(export\s+default)|(module.exports\s+=)/,"")})(j)`))(jasmine)
                        }else{
                            return (js=>jasmine=>{
                                const apis=Object.keys(jasmine).filter(k=>typeof(jasmine[k])=="function");
                                (new Function('jasmine',`
                                    (({doc, ${apis.join(",")}})=>{
                                        ${js}
                                    })(jasmine);
                                `))(jasmine)
                            })(js)
                        }
                    })
            default:
                return Promise.reject()
        }
    }

    createEnv(specs,jasmineRequire){
        const {store}=this.context
        const jasmine=jasmineRequire.core(jasmineRequire)
        jasmine.matchers.toMatchObject=(j$=>{
            var getErrorMsg = j$.formatErrorMsg('<toMatchObject>', 'expect(<expectation>).toMatch(<object>)');
            function toMatch() {
                return {
                compare: function(actual, expected) {
                    if (!j$.isObject_(expected)) {
                    throw new Error(getErrorMsg('Expected is not an object'));
                    }
                    const test=(act,exp)=>{
                        for(let k in exp){
                            const a=exp[k],b=act[k]
                            if(a===b)
                                continue
                            if(!(j$.isObject_(a) && j$.isObject_(b) && test(a,b)))
                                return false
                        }
                        return true
                    }
                    
                    
                    return {
                    pass: test(actual,expected)
                    };
                }
                };
            }
            
            return toMatch;
        })(jasmine);
        const env = jasmine.getEnv()
        env.configure({random:false})
        const doc=getSelectionStyle(getActive(store.getState()).state).getTestDocument(store)||new Test.Emulator(store)
        specs(Object.assign(jasmineRequire.interface(jasmine, env),{
            doc,
            ...timeout
        }))
        return env
    }

    componentDidUpdate(){
        const {ready, auto}=this.props
        const {testing,tests,tested, start=auto}=this.state
        if(tests && !testing &&!tested && ready && start){
            this.run()
        }
    }

    run(){
        const {tests}=this.state
        const {onStart=a=>a, onEnd=a=>a, onChange=a=>a, focus}=this.props
        const failed=[]
        tests.addReporter({
            jasmineStarted:a=>{
                this.setState({testing:true},()=>{
                    onStart(a)
                    onChange(this.state)
                })
            },
            jasmineDone:a=>{
                this.setState({
                    testing:undefined,current:undefined, start:undefined,
                    tested:true,
                    status:a.overallStatus,
                },()=>{
                    onEnd({status:a.overallStatus, failed})
                    onChange(this.state)
                })
            },
            specStarted:(a)=>this.setState({current:a.id}, ()=>onChange(this.state)),
            specDone:a=>{
                if(a.status=="failed"){
                    failed.push(a.id)
                }
            }
        })
        try{
            tests.execute(focus&&focus.length ? focus : undefined)
        }catch(e){
            debugger
        }
    }
})
const Styles={
    pending:{color:"yellow"},
    passed:{color:"green"},
    failed:{color:"red"},
    running: {color:"blue"},
}

const Suite=({suite, items=suite.children})=>(
    <ul>
        <li style={Styles[suite.result.status]}>{suite.description}</li>
        {items.length>0 && (
        <ul>
            {items.map((a,k)=>a.id.startsWith("spec") ? <Spec key={k} spec={a}/> : <Suite key={k} suite={a}/>)}
        </ul>)}
    </ul>
)

const CurrentContext=React.createContext({})

const Spec=({spec, result:{status,throwOnExpectationFailure,failedExpectations}=spec.result})=>(
    <CurrentContext.Consumer>
        {({current,test1})=>(
            <li style={Styles[status||(current==spec.id && "running")||""]}>
                <div onDoubleClick={e=>test1(spec.id)} style={{cursor:"default"}}>
                    {spec.description}
                </div>
                
                {throwOnExpectationFailure && (
                <div>{failedExpectations}</div>
                )}

                {failedExpectations.length>0 && 
                failedExpectations.map(({message,stack},i)=><div key={`e${i}`}><div>{message}</div><pre>{stack}</pre></div>)
                }
            </li>
        )}
    </CurrentContext.Consumer>
)

Test.Emulator=class{
    constructor(store){
        this.dispatch=store.dispatch
        this.ACTION=ACTION
        Object.defineProperties(this,{
            state:{
                get(){
                    return getActive(store.getState()).state
                }
            },
        })

        this.load=(url,props={})=>{
            let unsubscribe=a=>a
            return new Promise((resolve,reject)=>{
                fetch(url)
                .then(res=>res.blob())
                .then(data=>{
                    const file={data,src:url,...props}
                    return Input.parse(file)
                })
                .then(doc=>{
                    const id=doc.id
                    unsubscribe=store.subscribe((a,b,c)=>{
                        const docState=getAll(store.getState())[id]
                        if(docState && isDocumentReady(docState)){
                            unsubscribe()
                            resolve()
                        }
                    })
                    store.dispatch(ACTION.ADD(doc,a=>a))
                    return unsubscribe
                })
                .finally(unsubscribe)
            })
        }

        this.unload=()=>{
            store.dispatch(ACTION.CLOSE())
        }

        this.dispatch=(action,check=isDocumentReady, time=3000)=>{
            if(typeof(check)!="function")
                return Promise.resolve(store.dispatch(action))
            
            let unsubscribe=a=>a, resolved=false
            return new Promise((resolve, reject)=>{
                unsubscribe=store.subscribe((a,b,c)=>{
                    if(check(this.state) && !resolved){
                        resolved=true
                        unsubscribe()
                        resolve()
                    }
                })
                store.dispatch(action)
                if(time){
                    timeout.requestTimeout(()=>{
                        if(!resolved)
                            reject(`timeout for action:${JSON.stringify(action)} within ${time}ms`)
                    }, time)
                }
            })
            .finally(unsubscribe)
        }
    }

    get selectionStyle(){
        return getSelectionStyle(this.state)
    }

    get selection(){
        return getSelection(this.state)
    }

    get file(){
        return getFile(this.state)
    }

    click(){

    }

    doubleClick(){
        
    }

    isInView(id){
        return true
    }
}
