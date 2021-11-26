import React, { Fragment } from "react"
import {ACTION,dom} from "we-edit"
import {ToolbarSeparator,SvgIcon,MenuItem} from "material-ui"
import PropTypesUI from "../components/prop-types-ui"
import SelectStyle from "../components/select-style"

const IconPage=props=><path {...props} d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
const IconLayout=({...props})=>(
    <SvgIcon {...props}>
        <IconPage transform="translate(0 -12)"/>
        <line strokeDasharray="2" stroke="blue" x1="0" x2="24" y1="12" y2="12" strokeWidth="2"/>
        <IconPage transform="translate(0 12)"/>
    </SvgIcon>
)

const IconAnchorBase=IconLayout

export const Paragraph=({children})=>{
    const {indent,spacing}=dom.Paragraph.propTypes
    return (
        <Fragment>
            <SelectStyle type="paragraph">
                {({dispatch,style})=>(
                    <Fragment>
                        <PropTypesUI {...{
                                propTypes:{indent,spacing},
                                props:style, 
                                theme:"Paragraph",
                                onChange:change=>dispatch(ACTION.Selection.UPDATE({paragraph:change})),
                            }}
                        />
                        <ToolbarSeparator/>
                    </Fragment>
                )}
            </SelectStyle>
            {children}
        </Fragment>
    )
}

export const Page=({children})=>{
    return (
        <Fragment>
            <SelectStyle 
                getStyle={(selection)=>{
                    const section=selection?.props('section',false)
                    if(section)
                        return {section}
                    const page=selection?.props("page",false)
                    return {page}
                }}>
                {({style:{section, page},dispatch})=>{
                    return (
                        <Fragment>
                            {section && <Fragment>
                                <PropTypesUI.oneOf key="create section"
                                    values={[["Page","Page Break"],["column","Column Break"],"-",["nextPage","Next Page"], ["continuous","Continuous Break"], ["evenPage","Event Page"], ["oddPage","Odd Page"]]}
                                    DropDown={({value:a})=><MenuItem primaryText={a[1]} 
                                        onClick={e=>{
                                            switch(a[0]){
                                                case 'Page':
                                                    return dispatch(ACTION.Entity.CREATE({type:"pagebreak"}))
                                                default:
                                                    return dispatch(ACTION.Entity.CREATE({type:"section", kind:a[0]}))
                                            }  
                                        }}/>}
                                    icon={<IconLayout/>}
                                    onClick={false}
                                />
                                <PropTypesUI 
                                    propTypes={dom.Section.propTypes} 
                                    props={section} 
                                    theme="Section"
                                    onChange={change=>dispatch(ACTION.Entity.UPDATE({section:change}))}
                                />
                                <ToolbarSeparator/>
                            </Fragment>}
                            {page && <Fragment>
                                <PropTypesUI 
                                    propTypes={dom.Shape.propTypes} 
                                    theme="Page" 
                                    value={page}
                                    onChange={change=>dispatch(ACTION.Entity.UPDATE({page:change}))}
                                    />
                                <ToolbarSeparator/>
                            </Fragment>}
                        </Fragment>
                    )
                }}
            </SelectStyle>
            {children}
        </Fragment>
    )
}

export const Shape=({children, theme:{Shape,Anchor}={}})=>{
    return (
        <Fragment>
            <SelectStyle type="shape">
                {({style,dispatch})=>(
                    <Fragment>
                        <PropTypesUI 
                            propTypes={dom.Shape.propTypes} 
                            theme={Shape ? {Shape} : "Shape"}
                            value={style}
                            onChange={change=>dispatch(ACTION.Entity.UPDATE({shape:change}))}
                            />
                        <ToolbarSeparator/>
                    </Fragment>
                )}
            </SelectStyle>
            <SelectStyle type="anchor">
                {({style,dispatch})=>(
                    <Fragment>
                        <PropTypesUI 
                            propTypes={dom.Anchor.propTypes} 
                            theme={Anchor ? {Anchor} : "Anchor"}
                            value={style}
                            onChange={change=>dispatch(ACTION.Entity.UPDATE({anchor:change}))}
                            />
                        <PropTypesUI.oneOf label="Align"
                            values={["Left","Center","Right","-","Top","Middle","Bottom","-","horizontal","veritical","-","Page","Margin"]} 
                            labels={["Align Left","Align Center", "Align Right","","Align Top","Aligh Middle","Align Bottom","","Distribute Horizontal","Distribute Vertical","","Aligh to Page", "Align to Margin"]}
                            DropDown={({value,label,onClick})=><MenuItem primaryText={label} 
                                onClick={e=>{
                                    dispatch(ACTION.Entity.UPDATE({anchor:value}))
                                }}/>} 
                            onClick={false} 
                            icon={<IconAnchorBase/>}
                            />
                        <ToolbarSeparator/>
                    </Fragment>
                )}
            </SelectStyle>
            {children}
        </Fragment>
    )
}
