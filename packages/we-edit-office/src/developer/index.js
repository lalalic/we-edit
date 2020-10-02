import React, {Component,PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {DocumentTree,Test, getFile} from "we-edit"
import {createPortal} from "react-dom"

import {ToolbarGroup, ToolbarSeparator} from "material-ui/Toolbar"
import IconButton from "../components/size-icon-button"

import IconDoc from "material-ui/svg-icons/action/assignment"
import IconDiff from "material-ui/svg-icons/device/storage"
import IconTest from "material-ui/svg-icons/action/bug-report"
import CircularProgress from 'material-ui/CircularProgress'

import IconFile from "material-ui/svg-icons/file/create-new-folder"
import IconRun from "material-ui/svg-icons/av/play-circle-outline"
import IconRunFails from "material-ui/svg-icons/av/slow-motion-video"

import selectFile from "../components/file-select"

export class Ribbon extends Component{
    static contextTypes={
        panelManager:PropTypes.any
    }
    
    render(){
        const {panelManager}=this.context
        return (
            <ToolbarGroup>
                <IconButton 
                    hint="document tree"
                    onClick={()=>{
                        panelManager.toggle(
                            <FilterDocumentTree title="Document Tree" toNodeProps={({id,type})=>({name:`${type}(${parseInt(id)})`})}/>
                        )}
                    } >
                    <IconDoc/>
                </IconButton>

                <DiffButton/>

                <IconButton hint="test" 
                    onClick={()=>{
                        panelManager.toggle(
                            <Tester title="Test"/>
                        )
                    }}
                    >
                    <IconTest/>
                </IconButton>
                <ToolbarSeparator/>
            </ToolbarGroup>
        )
    }
}

class FilterDocumentTree extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }
    render(){
        const {state:{filter},props}=this
        return (
            <Fragment>
                <input style={{width:"100%",display:"block"}} 
                    value={filter||""} 
                    onChange={e=>{
                        this.setState({filter:e.target.value})
                    }}/>
                <DocumentTree {...props} filter={({id,type})=>{
                    return !filter ? true : `${type}(${parseInt(id)})`.indexOf(filter)!=-1
                }}/>
            </Fragment>
        )
    }
}
   
const Diff=React.lazy(()=>import("./diff"))

class DiffButton extends PureComponent{
    static contextTypes={
        activeDocStore:PropTypes.any
    }

    constructor(){
        super(...arguments)
        this.state={open:false}
    }

    get activeFile(){
        const doc=getFile(this.context.activeDocStore.getState()).doc
        const files=doc.parts
        return new Proxy(files,{
            get(target, k){
                if(k in target){
                    const f=target[k]
                    return {
                        asText(){
                            if('asText' in f)
                                return f.asText()
                            else if('html' in f){
                                return f.html()
                            }
                            return "[]"
                        }
                    }
                }
            }
        })
    }

    render(){
        const {open}=this.state
        return (
            <Fragment>
                <IconButton hint="Content" onClick={e=>this.setState({open:!open})}>
                    <IconDiff/>
                </IconButton>
                {open && 
                createPortal(
                    <div style={{position:"fixed",width:"100%", height:"100%",zIndex:9999}}>
                        <React.Suspense fallback={<CircularProgress/>}>
                            <Diff files={[{name:"[Active]",parts:this.activeFile}]}
                                onRequestClose={e=>this.setState({open:false})}
                                style={{
                                    width:"80%",height:"80%",
                                    margin:"80px auto 0px auto",background:"white",
                                    border:"1px solid lightgray",
                                    overflow:"hidden",top:80,
                                }}/>
                        </React.Suspense>
                    </div>, 
                    document.body
                )}
            </Fragment>
        )
    }
}

class Tester extends PureComponent{
    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        const {src, key, testing, target, lastFailed}=this.state
        const style={padding:2}
        return (
            <div>
                <div style={{borderBottom:"1px solid lightgray"}}>
                        <IconButton 
                            disabled={testing ? true : false}
                            style={style}
                            onClick={e=>{
                                selectFile(".js")
                                    .then(url=>{
                                        if(src){
                                            URL.revokeObjectURL(src)
                                        }
                                        this.setState({src:url, key:url, target:undefined})
                                    })
                            }}
                            children={<IconFile/>}
                            />
                        
                        {src && <IconButton label={"start"} 
                            disabled={testing ? true : false}
                            style={style} 
                            children={<IconRun/>}
                            onClick={e=>{
                                this.setState({key:Date.now(), target:undefined})
                            }}
                        />}

                        {lastFailed && lastFailed.length && <IconButton label={"test fails"} 
                            disabled={testing ? true : false}
                            style={style} 
                            children={<IconRunFails/>}
                            onClick={e=>{
                                this.setState({key:Date.now(), target:[...lastFailed]})
                            }}
                        />}
                </div>
                <Test ref={this.tester} fixture={src} key={key} auto={key!=src} focus={target}
                    onEnd={({status, failed})=>{
                        if(status=="failed"){
                            this.setState({lastFailed:failed})
                        }
                    }}

                    onChange={({testing})=>{
                       this.setState({testing})
                    }}

                    on1Chosen={id=>{
                        this.setState({key:Date.now(), target:[id]})
                    }}
                    />
            </div>
        )
    }
}