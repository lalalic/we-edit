import React from "react"
import {PropTypesUI} from "we-edit-office"
import {parseFile} from "../util"
import {dom} from "we-edit"
import * as Tabs from "../tabs"
const BaseTheme=PropTypesUI.Theme

const fontSize=value=>value ? dom.Unknown.UnitShape.normalize(value+'px','pt')+'pt' : value
export default {
    //$Types:{ColorShape}
    $settingDialogs:{
        diff:React.cloneElement(BaseTheme.$settingDialogs.diff,{parseFile}),
        tabs: <Tabs.Setting/>
    },
    TextStyleShape:{
        size:{
            normalize: fontSize
        }
    },
    TabsShape:{//can't edit tab, but add/remove
        label1:value=>value.pos,
        Dialog:{
            wrapper: <PropTypesUI.wrappers.ArrayOf layout={({actions,collection,active})=>(
                        <div style={{display:"flex", flexDirection:"row", marginBottom:10}}>
                            <div style={{flex:1}}>
                                {collection}
                                {actions}
                            </div>
                            <div style={{flex:1}}>{active}</div>
                        </div>
                    )}/>,

            onAdd(host){
                const {values=[],activeValue}=host.state
                const newValue=activeValue.toJS()
                const i=values.findIndex(a=>a.pos==newValue.pos)
                const cloned=[...values]
                if(i==-1){
                    cloned.push(newValue)
                }else{
                    cloned.splice(i,1,newValue)
                }
                cloned.sort((a,b)=>a.pos-b.pos)
                host.set(host.path, cloned)
                host.setState({values:cloned, active:cloned.indexOf(newValue)})
            }
        }
    },
    TabShape:{
        grid:1,
        bottomBorder:false,
        pos:{
            label:"tab stop at"
        }
    },
    Text:{
        size:{
            normalize: fontSize
        }
    },
    Paragraph:{
        tabs:<link dialog="tabs" label="tabs"/>
    }
}