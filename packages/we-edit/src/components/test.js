import React, {PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import FloatingActionButton from "material-ui/FloatingActionButton"
import IconTest from "material-ui/svg-icons/notification/adb"

import {connect} from "../state"
import {getStatistics, getSelectionStyle} from "../state/selector"

export const Test=connect(state=>getStatistics(state))(class Test extends PureComponent{
    static contextTypes={
        activeDocStore: PropTypes.any,
    }
    constructor(){
        super(...arguments)
        this.state={show:!!this.props.show}
    }

    render(){
        const {tests, current,show, tested, testing, start, status}=this.state
        const {reporterStyle={}, buttonStyle={}, auto, ...props}=this.props
        if(!tests)
            return null
        const showStyle={textAlign:"initial",position:"fixed",width:"100%",height:"100%",background:"lightblue",top:0,left:0,opacity:0.9}
        return (
            <Fragment>
                {show && <div  id="test" style={{...showStyle,...reporterStyle}}>
                    <CurrentContext.Provider value={{current,test1:(id)=>this.test(id)}}>
                        {show && tests.topSuite().children.map((a,i)=>a.id.startsWith("spec") ? <Spec key={i} spec={a}/> : <Suite key={i} suite={a}/>)}
                    </CurrentContext.Provider>
                </div>}
                <FloatingActionButton mini={true}
                    style={{bottom:80,left:10,position:"fixed",...buttonStyle}}
                    onClick={e=>this.setState({show:!show})}
                    >
                    <IconTest style={{fill:!status ? (testing ? "blue" : "white") : (status=="failed" ? "red" : "green")}}/>
                    {!tested && !testing && !auto && !start && (
                        <span style={{position:"absolute",width:0,height:0,top:0,left:0}}>
                            <input type="radio" defaultChecked={false} style={{margin:0}} 
                                onClick={e=>{
                                    e.stopPropagation()
                                    this.setState({start:true})
                                }}/>
                        </span>
                    )}
                </FloatingActionButton>
            </Fragment>
        )
    }

    test(id){
        !this.state.testing && this.setState({tested:false,test1:id})
    }

    componentDidMount(){
        const {fixture}=this.props
        if(!fixture)
            return
        Promise.resolve(fixture())
            .then(tests=>{
                import(/*jasmine*/"jasmine-core/lib/jasmine-core/jasmine")
                .then(jasmineRequire=>this.setState({tests:this.createEnv(tests.default, jasmineRequire)}))
            })
    }

    createEnv(specs,jasmineRequire){
        const {TestEmulator}=this.props
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
        specs(Object.assign(jasmineRequire.interface(jasmine, env),{
            doc:new TestEmulator(this.context.activeDocStore),
            tick(duration, a, b, fn){
                return new Promise((resolve)=>{
                    let starttime, dist=a-b
                    function step(timestamp){
                        let runtime = timestamp - starttime
                        fn(a-dist * Math.min(runtime / duration, 1))
                        if (runtime < duration){
                            requestAnimationFrame(step)
                        }else{
                            resolve()
                        }
                    }
                    
                    requestAnimationFrame(timestamp=>{
                        starttime = timestamp
                        step(timestamp)
                    })
                })
            },
            every(t, fn, data){
                data=Array.from(data)
                return new Promise(resolve=>{
                    let last, i=-1
                    function step(timestamp){
                        if((timestamp-last)>=t && i<data.length-1){
                            fn(data[++i])
                            last=performance.now()
                        }
                        if(i<data.length-1){
                            requestAnimationFrame(step)
                        }else{
                            resolve()
                        }
                    }

                    requestAnimationFrame(timestamp=>{
                        last=timestamp-t
                        step(timestamp)
                    })
                })
            }
        }))
        return env
    }

    componentDidUpdate(){
        const {pages,words, auto}=this.props
        const {testing,tests,tested, start=auto}=this.state
        if(tests && !testing &&!tested && (pages || words) && start){
            this.run()
        }
    }

    run(){
        const {tests,test1}=this.state
        tests.addReporter({
            jasmineStarted:()=>this.setState({testing:true}),
            jasmineDone:(a)=>{
                this.setState({
                    testing:undefined,current:undefined, test1:undefined,start:undefined,
                    tested:true,
                    status:a.overallStatus,
                })
            },
            specStarted:(a)=>this.setState({current:a.id})
        })
        try{
        tests.execute(test1 ? [test1] : undefined)
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
                <div onDoubleClick={e=>test1(spec.id)}>{spec.description}</div>
                
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
        this.store=store
    }

    get selection(){
        return getSelectionStyle(this.store.getState())
    }

    click(){

    }

    doubleClick(){
        
    }
}
