import React,{Component, Fragment} from "react"
import PropTypes from "prop-types"
import {getFile} from "we-edit"

import format from "xml-formatter"
import {ReactGhLikeDiff} from "react-gh-like-diff"
import 'react-gh-like-diff/dist/css/diff2html.min.css'
import Dialog from "../components/dialog"

const ICON=a=>`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 24 24" width="18" height="14">
    <text font-weight="700" text-anchor="middle" dominant-baseline="middle" x="14" y="16">${a}</text>
</svg>`
export default class Diff extends Component{
    static getDerivedStateFromProps({files=[]},state){
        return {...state, files:Array.from(new Set([...files,...state.files]))}
    }

    constructor({files=[]}){
        super(...arguments)
        this.state={files:[], comparing:[files[0]].filter(a=>!!a)}
        this.selector=React.createRef()
    }

    parse(data,e){
        const {parse}=this.props
        if(parse)
            return parse(...arguments)
        return {
            ".":{
                asText(){
                    return new TextDecoder("utf-8").decode(data)
                }
            }
        }
    }

    render(){
        const {style,onRequestClose, headStyle={},listStyle={},compareStyle={}}=this.props
        const {files=[], comparing=[],path}=this.state
        const [a,b]=comparing
        const {all=[],...specials}=this.list(a,b)
        const className=k=>Object.keys(specials).filter(a=>specials[a].includes(k))
        const STYLES={
            equals:{color:"green"},
            diffs:{color:"red"},
            onlyA:{listStyleImage:`url(data:image/svg+xml;base64,${btoa(ICON("-"))})`},
            onlyB:{listStyleImage:`url(data:image/svg+xml;base64,${btoa(ICON("+"))})`},
        }
        return (
            <div style={{width:"100%",height:"100%",...style,display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",flexDirection:"row",width:"100%",padding:5,borderBottom:"1px solid lightgray",...headStyle}}>
                    <div style={{flex:1,userSelect:"none"}}>
                        {files.map((file,i)=>
                            <button type="button" key={i} 
                                onClick={e=>{
                                    if(comparing.includes(file))
                                        this.setState({comparing:comparing.filter(a=>a!==file)})
                                    else if(comparing.length<2)
                                        this.setState({comparing:[...comparing,file].sort((a,b)=>files.indexOf(a)-files.indexOf(b))})
                                }}
                                onDoubleClick={e=>{
                                    this.setState({files:files.filter(a=>a!==file),comparing:comparing.filter(a=>a!==file)})
                                }}
                                style={{margin:"0 2px", background:file===a||file===b ? "lightblue" : ""}}>
                                {file.name}
                            </button>
                        )}
                    </div>
                    <div style={{width:100}}>
                        <button onClick={e=>this.selector.current.click()}>Select File</button>
                        <input type="file" 
                            ref={this.selector}
                            style={{display:"none"}} multiple 
                            onChange={e=>{
                                Array.from(e.target.files).forEach(inputFile=>{
                                    var reader=new FileReader()
                                    reader.onload=e=>{
                                        try{
                                            const file={
                                                name:inputFile.name,
                                                lastModified:inputFile.lastModified
                                            }
                                            Promise.resolve(this.parse(e.target.result,e))
                                                .then(parts=>{
                                                    file.parts=parts
                                                    this.setState(({files=[]})=>({files:[...files, file]}))
                                                })
                                        }catch(error){
                                            alert(error)
                                        }
                                    }
                                    reader.readAsArrayBuffer(inputFile)
                                })
                                e.target.value=""
                            }}/>
                        {onRequestClose && <span onClick={onRequestClose} 
                            style={{float:"right",marginRight:10,fontSize:9,lineHeight:"19px",cursor:"default"}}>X</span>}
                    </div>
                </div>
                
                <div style={{display:"flex",flexDirection:"row",flex:1,overflow:"scroll"}}>
                    <ul style={{cursor:"default",margin:0,borderRight:"2px dotted lightgray",paddingLeft:25,overflow:"scroll",width:"20%",...listStyle}}>
                        {all.map(k=>{
                            return (<li key={k} style={{
                                    padding:"5px 0px",
                                    ...(path===k ? {fontWeight:700} : {}),
                                    ...(STYLES[className(k)]||{}),
                                }}
                                onClick={e=>this.setState({path:k})}>{k}</li>)
                        })}
                    </ul>
                    <div style={{overflow:"scroll",flex:1,padding:5,position:"relative",...compareStyle}}>
                        <Compare 
                            a={a && a.parts[path]} 
                            b={b && b.parts[path]} 
                            style={{flex:1,overflow:"scroll"}}
                            options={{
                                originalFileName:path,
                                updatedFileName:path,
                            }}
                            />
                    </div>
                </div>
            </div>
        )
    }

    list(){
        const {comparing:[a,b]}=this.state
        if(a && b){
            const A=Object.keys(a.parts), B=Object.keys(b.parts)
            const both=A.filter(k=>B.includes(k))
            const onlyA=A.filter(k=>!B.includes(k))
            const onlyB=B.filter(k=>!A.includes(k))
            const equals=both.filter(k=>a.parts[k].asText()===b.parts[k].asText())
            const diffs=both.filter(k=>!equals.includes(k))
            const all=Array.from(new Set([...A,...B])).sort()
            return {all, equals, diffs,onlyA,onlyB}
        }else if(a){
            return {all:Object.keys(a.parts).sort()}
        }
        return {}
    }

    static Setting=Object.assign(({parseFile,parseActive},{activeDocStore})=>{
        if(!parseActive){
            parseActive=file=>(file.doc?.parts||{})
        }
        const activeFile=new Proxy(parseActive(getFile(activeDocStore.getState())), {
            get(target, k) {
                if (k in target) {
                    const f = target[k];
                    return {
                        asText() {
                            if ('asText' in f)
                                return f.asText();
                            else if ('html' in f) {
                                return f.html();
                            }
                            return "[]";
                        }
                    };
                }
            }
        })

        return (
            <Dialog
                title="File Content Inspector" 
                contentStyle={{maxWidth:"unset",width:"80%"}}
                autoScrollBodyContent={true}
                modal={true}>
                <Diff files={[{ name: "[Active]", parts: activeFile }]} parse={parseFile}
                    style={{
                        background: "white",
                        border: "1px solid lightgray",
                        overflow: "hidden", top: 80,
                    }} />
            </Dialog>
        )
    },{contextTypes:{activeDocStore: PropTypes.any}})
    
}

class Compare extends Component{
    render(){
        const {a:partA,b:partB, options={}}=this.props
        const a=partA?.asText(), b=partB?.asText()
        const isXml=a=>a && a.substring(0,10).trim().startsWith("<?xml")
        const formattedA=isXml(a) ? format(a) : a
        const formattedB=isXml(b) ? format(b) : b
        const isImage=()=>Images.includes(this.props.options.originalFileName?.split(".").pop())
        if(formattedA && formattedB && formattedA!==formattedB){
            return (<ReactGhLikeDiff past={formattedA} 
                current={formattedB} 
                options={{
                    outputFormat: "side-by-side",
                    ...options
                }}/>)
        }else{
            return (
                <Fragment>
                    {isImage() ? <img src={this.toImage(a)}/>  : <pre>{formattedA}</pre>}
                    {a&&<center><button onClick={()=>this.download(partA)}>download</button></center>}
                </Fragment>
            )
        }
    }

    download(part){
        const a=document.createElement('a')
        a.style.display="none"
        document.body.appendChild(a)
        const data=part.asArrayBuffer?.()||part.asText()
        const url=window.URL.createObjectURL(new Blob([data]))
        a.href=url
        a.download=this.props.options.originalFileName
        a.click()
        window.URL.revokeObjectURL(url)
    }

    toImage(data){
        return this.imageURL=URL.createObjectURL(new Blob([new TextEncoder("utf-8").encode(data)],{type:"image/gif"}))
    }

    shouldComponentUpdate(){
        if(this.imageURL){
            URL.revokeObjectURL(this.imageURL)
            delete this.imageURL
        }
        return true
    }
}
const Images="jpg,gif,png".split(",")


