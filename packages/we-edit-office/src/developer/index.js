import React, {Component,PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {DocumentTree,Test, getFile} from "we-edit"
import {createPortal} from "react-dom"

import {ToolbarSeparator} from "material-ui/Toolbar"
import IconButton from "../components/size-icon-button"

import IconDocTree from "material-ui/svg-icons/action/list"
import IconDiff from "material-ui/svg-icons/action/compare-arrows"
import IconTest from "material-ui/svg-icons/action/bug-report"

import IconFile from "material-ui/svg-icons/file/create-new-folder"
import IconRun from "material-ui/svg-icons/av/play-circle-outline"
import IconRunFails from "material-ui/svg-icons/av/slow-motion-video"

import selectFile from "../components/file-select"

import Diff from "./diff"

export class Ribbon extends PureComponent{
    render(){
        const {diff, tester, docTree, children}=this.props
        return (
            <Fragment>
                <FilterDocumentTree.Button {...docTree}/>
                <DiffInput.Button {...diff}/>
                <Tester.Button {...tester}/>
                {children}
                <ToolbarSeparator/>
            </Fragment>
        )
    }
}

export class FilterDocumentTree extends PureComponent{
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

    static panel=<FilterDocumentTree title="Document Tree"  toNodeProps={({id,type})=>({name:`${type}(${id.split("{")[0]})`})}/>
    static Button=class extends PureComponent{
        static contextTypes={
            panelManager:PropTypes.any
        }

        render(){
            const {title=FilterDocumentTree.panel.props.title, whichPanel="right", ...props}=this.props
            return (
                <IconButton 
                    {...props}
                    hint={title}
                    onClick={()=>this.context.panelManager.toggle(FilterDocumentTree.panel,whichPanel)}>
                    <IconDocTree/>
                </IconButton>
            )
        }
    }
}

export class DiffInput extends Diff{
    static Button=class DiffButton extends PureComponent{
        static contextTypes={
            activeDocStore:PropTypes.any
        }
    
        constructor(){
            super(...arguments)
            this.state={open:false}
        }
    
        get activeFile(){
            const {parseActive=(file)=>file.doc?.parts||{}}=this.props
            return new Proxy(parseActive(getFile(this.context.activeDocStore.getState())),{
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
            const {state:{open}, props:{title="Compare", parseFile}}=this
            return (
                <Fragment>
                    <IconButton hint={title} onClick={e=>this.setState({open:!open})}>
                        <IconDiff/>
                    </IconButton>
                    {open && 
                    createPortal(
                        <div style={{position:"fixed",width:"100%", height:"100%",zIndex:9999}}>
                            <Diff files={[{name:"[Active]",parts:this.activeFile}]} parse={parseFile}
                                onRequestClose={e=>this.setState({open:false})}
                                style={{
                                    width:"80%",height:"80%",
                                    margin:"80px auto 0px auto",background:"white",
                                    border:"1px solid lightgray",
                                    overflow:"hidden",top:80,
                                }}/>
                        </div>, 
                        document.body
                    )}
                </Fragment>
            )
        }
    }    
}

export class Tester extends PureComponent{
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

    static panel=<Tester title="Test"/>
    static Button=class extends PureComponent{
        static contextTypes={
            panelManager:PropTypes.any,
        }
        render(){
            const {title=Tester.panel.props.title, whichPanel="right",...props}=this.props
            return (
                <IconButton 
                    {...props}
                    hint={title} 
                    onClick={()=>this.context.panelManager.toggle(Tester.panel,whichPanel)}>
                    <IconTest/>
                </IconButton>
            )
        }
    }
}