import React,{Component} from "react"
import JSZip from "jszip"
import format from "xml-formatter"
import {ReactGhLikeDiff} from "react-gh-like-diff"
import 'react-gh-like-diff/dist/css/diff2html.min.css'

const ICON=a=>`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 24 24" width="18" height="14">
    <text font-weight="700" text-anchor="middle" dominant-baseline="middle" x="14" y="16">${a}</text>
</svg>`
export default class Diff extends Component{
    static getDerivedStateFromProps({files=[]},state){
        return {...state, files:Array.from(new Set([...files,...state.files]))}
    }

    constructor(){
        super(...arguments)
        this.state={files:[], comparing:[]}
        this.selector=React.createRef()
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
                                            let raw=new JSZip(e.target.result),parts={}
                                            raw.filter((path,file)=>parts[path]=file)
                                            const file={
                                                name:inputFile.name,
                                                lastModified:inputFile.lastModified,
                                                parts,
                                            }
                                            this.setState(({files=[]})=>({files:[...files, file]}))
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
                            a={a && a.parts[path] && a.parts[path].asText()} 
                            b={b && b.parts[path] && b.parts[path].asText()} 
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
}

class Compare extends Component{
    render(){
        const {a,b, options={}}=this.props
        const formattedA=a && a.startsWith("<?xml") ? format(a) : a
        const formattedB=b && b.startsWith("<?xml") ? format(b) : b
        if(formattedA && formattedB && formattedA!==formattedB){
            return (<ReactGhLikeDiff past={formattedA} 
                current={formattedB} 
                options={{
                    outputFormat: "side-by-side",
                    ...options
                }}/>)
        }else{
            return (<pre>{formattedA||formattedB}</pre>)
        }
    }
}

