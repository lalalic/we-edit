import React,{Component} from "react"
import PropTypes from "prop-types"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "../components/check-icon-button"

import IconRecord from "material-ui/svg-icons/av/fiber-manual-record"
import IconPlay from "material-ui/svg-icons/av/play-circle-outline"
import IconStop from "material-ui/svg-icons/av/stop"
import IconNext from "material-ui/svg-icons/av/skip-next"
import IconPrev from "material-ui/svg-icons/av/skip-previous"

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
                                this.unsubscribe=store.listen(action=>this.setState(({records})=>({records:[...records,action]})))
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
            </ToolbarGroup>
        )
    }
}
