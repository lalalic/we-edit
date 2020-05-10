import React,{Component} from "react"
import PropTypes from "prop-types"

import CheckIconButton from "../components/check-icon-button"

import IconRecord from "material-ui/svg-icons/av/fiber-manual-record"
import IconPlay from "material-ui/svg-icons/av/play-circle-outline"
import IconStop from "material-ui/svg-icons/av/stop"
import IconNext from "material-ui/svg-icons/av/skip-next"
import IconPrev from "material-ui/svg-icons/av/skip-previous"
import IconSave from "material-ui/svg-icons/action/get-app"
import IconUpload from "material-ui/svg-icons/editor/publish"

import {ToolbarGroup } from "material-ui/Toolbar"


export default class Recorder extends Component{
    static contextTypes={
        activeDocStore: PropTypes.any
    }
    constructor(){
        super(...arguments)
        this.state={recording:false, playing:false, records:[], i:-1}
    }

    shouldComponentUpdate(){
        if(this.state.playing)
            return false
        return true
    }

    render(){
        const {recording, playing, i, records}=this.state
        const store=this.context.activeDocStore, dispatch=store.dispatch
        return (
            <ToolbarGroup>
                <CheckIconButton
                    status={recording ? "checked": (playing ? "disabled" : "unchecked")}
                    onClick={e=>{
                        if(recording){
                            this.setState({recording:false})
                            this.unsubscribe()
                        }else{
                            this.setState({recording:true, records:[]}, ()=>{
                                this.unsubscribe=store.listen(action=>{
                                    if(!Ignores.includes(action.type)){
                                        this.setState(({records})=>({records:[...records,action]}))
                                    }
                                })
                            })
                        }
                    }}
                    children={<IconRecord color={recording ? "red" : ""}/>}
                    />

                <CheckIconButton
                    status={recording || records.length==0 || i<=0 ? "disabled" : "unchecked"}
                    onClick={e=>this.setState({i:i-1}, ()=>dispatch(records[i-1]))}
                    children={<IconPrev/>}
                    />
                
                <CheckIconButton
                    status={recording||records.length==0 ? "disabled" : (playing ? "checked" : "unchecked")}
                    onClick={e=>{
                        if(playing){
                            this.setState({playing:false},)
                        }else{
                            this.setState({playing:true},()=>{
                                records.forEach(dispatch)
                            })
                        }
                    }}
                    children={playing ? <IconStop/> : <IconPlay/>}
                    />

                
                <CheckIconButton
                    status={recording || records.length==0 || i==records.length-1? "disabled":"unchecked"}
                    onClick={e=>this.setState({i:i+1}, ()=>dispatch(records[i+1]))}
                    children={<IconNext/>}
                    />
                <CheckIconButton
					status={!recording && records.length>0 ? "unchecked" : "disabled"}
					onClick={e=>{
                        const blob=new Blob([JSON.stringify(records,null,4)], {type:"application/json"})
                        const url = window.URL.createObjectURL(blob)
                        const link = document.createElement("a");
                        document.body.appendChild(link)
                        link.download = "record.json"
                        link.href = url;
                        link.click()
                        document.body.removeChild(link)
                        window.URL.revokeObjectURL(url)
                    }}>
					<IconSave/>
				</CheckIconButton>

                <CheckIconButton
					status={!recording && !playing ? "unchecked" : "disabled"}
					onClick={e=>{
                        if(!uploader){
                            uploader=document.createElement('input')
                            uploader.type="file"
                            uploader.setAttribute("accept","application/json")
                            uploader.style="position:absolute;left:-9999px"
                            uploader.onchange=()=>{
                                const file=uploader.files[0];
                                if(file){
                                    const reader=new FileReader()
                                    reader.onload=()=>{
                                        this.setState({records:JSON.parse(reader.result),i:0})
                                        uploader.value=""
                                    }
                                    reader.readAsText(file)
                                }
                            }
                            document.body.append(uploader)
                        }
                        uploader.click()
                    }}>
					<IconUpload/>
				</CheckIconButton>
            </ToolbarGroup>
        )
    }
}

const Ignores=["we-edit/selection/STYLE","we-edit/selection/CANVAS"]
var uploader