import React,{Fragment} from "react"
import {Editor,getFile,connect, PropTypes, dom} from "we-edit"
import {ToolbarSeparator} from "material-ui"
import {modes, themes, options} from "we-edit-representation-plain"

import IconWrap from "material-ui/svg-icons/editor/wrap-text"
import IconNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconMore from "material-ui/svg-icons/navigation/more-horiz"

import IconMode from "material-ui/svg-icons/editor/mode-edit"
import IconTheme from "material-ui/svg-icons/editor/drag-handle"

import ACTION, {getOffice} from "../state/action"
import Workspace from "../workspace"
import Ribbon from "../ribbon"
import CheckIconButton from "../components/check-icon-button"
import PropTypesUI from "../components/prop-types-ui"

const DOMAIN="we-edit/default(accept=*)"

function reducer(state={ theme:{...options,mode:undefined}},{type,payload}){
	return state
}

const getTheme=state=>{
    const {theme:{mode=getFile(state).mode,...theme}}=getOffice(state)
    return {theme:{mode,...theme}}
}

const unique=array=>Array.from(new Set(array))
const OptionShape={
    font: PropTypes.oneOf(["Calibri", "Arial", "Times New Roman"],{defaultValue:options.font}),
    size: PropTypes.number.$({defaultValue:12}),
    ...PropTypes.from(options),
    mode: PropTypes.oneOf(unique(modes.map(({mode})=>mode)),{defaultValue:options.mode}),
    theme: PropTypes.oneOf(Object.keys(themes),{defaultValue:options.theme}),
}

const Setting=connect(getTheme)(Object.assign(({dispatch,theme,uiContext}, {setting})=>{
    return (
        <Fragment>
            <PropTypesUI 
                theme="Option"
                propTypes={OptionShape} 
                props={theme} 
                uiContext={uiContext}
                onChange={theme=>dispatch(ACTION.theme(theme))}
                />
            { uiContext=="Ribbon" ?
                <Fragment>
                    <ToolbarSeparator/>
                    <CheckIconButton label="setting..."
                        onClick={()=>setting('theme')}
                        children={<IconMore/>}
                        />
                </Fragment> :
                null
            }
        </Fragment>
    )
},{
    contextTypes:{
        setting:PropTypes.func
    }
}))

const Canvas=connect(getTheme)(({theme, children})=>(React.cloneElement(children,{theme})))

export default (
    <Workspace
        accept="*"
        name="Default Plaintext"
        key={DOMAIN}
        ruler={false}
        statusBar={false}
        reducer={reducer}
        officeUITheme={PropTypesUI.getTheme({
            $settingPanels:{
                theme:<Setting title="options"/>,
            },

            Option:{
                Ribbon:{
                    '*':false,
                    font:{
                        
                    },
                    size:{
                        notUILabel:false,
                    },
                    lineWrapping:{
                        icon:<IconWrap/>,
                        label:"wrap"
                    },
                    mode:{
                        label:"file type",
                        icon:<IconMode/>
                    },
                    theme:{
                        label:"theme",
                        icon:<IconTheme/>
                    },
                },
                Tree:{
                    labelStyle:{fontSize:9}
                }
            }
        })}
        toolBar={
            <Ribbon commands={{
                home:{
                    text:false,
                    paragraph:false,
                    clipboard:false,
                    more:(<Setting uiContext="Ribbon"/>)
                },
                insert:false,
                layout:false,
                when:false,

            }}>
            </Ribbon>
        }
        layout={
            <Workspace.Layout 
                right={<Workspace.PanelContainer name="right" style={{width:300}}/>}
                />
        }
        >
        <Editor representation="plain" canvas={<Canvas/>}/>
    </Workspace>
)