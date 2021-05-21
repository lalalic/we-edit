import React,{Fragment} from "react"
import {Editor,getFile,connect} from "we-edit"
import {modes, themes} from "we-edit-representation-plain"

import IconWrap from "material-ui/svg-icons/editor/wrap-text"
import IconNumber from "material-ui/svg-icons/editor/format-list-numbered"

import {getOffice} from "../state/action"
import FontList from "../text/fonts"
import Workspace from "../workspace"
import Ribbon,{ToolbarSeparator} from "../ribbon"
import ComboBox from "../components/combo-box"
import CheckIconButton from "../components/check-icon-button"

const DOMAIN="we-edit/default(accept=*)"

function reducer(state={
    mode:"",theme:"eclipse",font:"Calibri",size:12,wrap:false,number:true
    },{type,payload}){
	switch(type){
	case `${DOMAIN}/mode`:
		return {...state,mode:payload}
	case `${DOMAIN}/theme`:
        return {...state,theme:payload}	
    case `${DOMAIN}/font`:
        return {...state,font:payload}
    case `${DOMAIN}/size`:
        return {...state,size:payload}	
    case `${DOMAIN}/wrap`:
        return {...state,wrap:payload}
    case `${DOMAIN}/number`:
        return {...state,number:payload}	
	}
	return state
}

const Setting=connect(state=>{
    const {mode,theme,font,size,wrap,number}=getOffice(state)
    return {theme,font,size,wrap,number,mode:getFile(state).doc.mode||mode}
})(({dispatch,mode,theme,font,size,wrap,number})=>{
	return (
		<Fragment>
            <FontList 
                value={font}
                changeFont={payload=>dispatch({type:`${DOMAIN}/font`,payload})}
                style={{paddingRight:15,width:80}}
                />
            <ComboBox
                style={{width:50,paddingRight:15}}
                inputStyle={{border:"1px solid lightgray"}}
                value={size}
                onChange={size=>dispatch({type:`${DOMAIN}/size`,payload:parseInt(size)})}
                dataSource={[8,9,10,11,12,14,16,20,22,24,26,28,36,72].map(a=>a+"")}
                underlineShow={false}
                />
            <ToolbarSeparator/>    
			<ComboBox //label="文件类型" 
				style={{width:80,paddingRight:15}}
				title="文件类型"
				inputStyle={{border:"1px solid lightgray",paddingLeft:5}}
				underlineShow={false}
				value={mode}
				onChange={payload=>dispatch({type:`${DOMAIN}/mode`,payload})}
				dataSource={modes.map(({mode})=>mode)}
				/>
			<ComboBox //label="风格" 
				style={{width:100,paddingRight:15}}
				title="风格"
				inputStyle={{border:"1px solid lightgray",paddingLeft:5}}
				underlineShow={false}
				value={theme}
				onChange={payload=>dispatch({type:`${DOMAIN}/theme`,payload})}
				dataSource={Object.keys(themes)}
				/>
            <ToolbarSeparator/>
            <CheckIconButton label="wrap"
                status={wrap ? "checked" : "unchecked"}
                onClick={()=>dispatch({type:`${DOMAIN}/wrap`,payload:!wrap})}
                children={<IconWrap/>}
                />
            <CheckIconButton label="show number"
                status={number ? "checked" : "unchecked"}
                onClick={()=>dispatch({type:`${DOMAIN}/number`,payload:!number})}
                children={<IconNumber/>}
                />
		</Fragment>
	)
})

const PlainEditor=connect(state=>{
    const {mode,theme,font,size,wrap,number}=getOffice(state)
    return {mode,theme,font,size,wrap,number}
})(({mode,theme,font,size,wrap,number})=>(
	<Editor representation="plain" setting={{mode,theme,font,size,wrap,number}}/>
))

export default (
    <Workspace
        accept="*"
        name="Default Plaintext"
        key={DOMAIN}
        ruler={false}
        statusBar={false}
        reducer={reducer}
        toolBar={
            <Ribbon commands={{
                home:{
                    text:false,
                    paragraph:false,
                    clipboard:false,
                    more:(<Setting/>)
                },
                insert:false,
                layout:false,
                when:false,

            }}>
            </Ribbon>
        }
        >
        <PlainEditor/>
    </Workspace>
)