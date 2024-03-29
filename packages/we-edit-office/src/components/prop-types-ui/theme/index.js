import React, {Fragment} from "react"
import {dom, PropTypes} from "we-edit"
import { Tab, Tabs ,Divider, SvgIcon} from "material-ui"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

import IconVanish from "material-ui/svg-icons/editor/format-clear"
import IconStrike from "material-ui/svg-icons/editor/strikethrough-s"
import IconBackground from "material-ui/svg-icons/editor/format-color-fill"
import IconTextColor from "material-ui/svg-icons/editor/format-color-text"
import IconRotate from "material-ui/svg-icons/image/crop-rotate"
import IconWrapMode from "material-ui/svg-icons/editor/wrap-text"
import IconWrapSide from "material-ui/svg-icons/communication/business"

import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"
import IconAlignJustify from "material-ui/svg-icons/editor/format-align-justify"


import IconVertAlign from "material-ui/svg-icons/action/swap-vert"
import IconVertAlignBottom from "material-ui/svg-icons/editor/vertical-align-bottom"
import IconVertAlignMiddle from "material-ui/svg-icons/editor/vertical-align-center"
import IconVertAlignTop from "material-ui/svg-icons/editor/vertical-align-top"

import IconFillShape from "material-ui/svg-icons/editor/format-color-fill"
import IconOutlineShape from "material-ui/svg-icons/editor/border-color"

import IconImage from "material-ui/svg-icons/editor/insert-photo"
import IconMore from "material-ui/svg-icons/navigation/more-horiz"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconListOutline from "material-ui/svg-icons/editor/pie-chart-outlined"

import IconLineWeight from "material-ui/svg-icons/editor/format-list-bulleted"
import IconLineDash from "material-ui/svg-icons/editor/format-list-bulleted"
import IconLineSketched from "material-ui/svg-icons/editor/format-list-bulleted"

import IconShadding from "material-ui/svg-icons/editor/format-color-fill"
import IconColor from "material-ui/svg-icons/editor/format-color-fill"
import IconDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

import { IconColumn, Column, IconTextBorder, IconSubscript, IconSuperscript, IconSize, IconOrientation, IconMargin } from "./icons"
import {FontSetting} from "../../../text"
import {ParagraphSetting, ListSetting} from "../../../paragraph"
import {Setting as ShapeSetting, TextFrameSetting} from "../../../shape"
import {Setting as PictureSetting} from "../../../picture"
import DocumentTree from "../../../developer/filter-document-tree"
import Tester from "../../../developer/tester"
import Diff from "../../../developer/diff"
import Link from "../link"
import {MenuItem} from "../../menu"
import FontList from "../../fonts"
import Dialog from "../../dialog"
import CheckIconButton from "../../check-icon-button"
import ColorSelector from "../../color-selector"

import * as Wrappers from "../wrappers"
import PropTypesUI from "../index"
import OneOf from "../one-of"
import SizableIconButton from "../../size-icon-button"
import FormatPanel from "../../format-panel"

import {NumberingFormats, Numberings, Bullets, Outlines, DemoList, BulletWrapper1,NumberingWrapper1,OutlineWrapper1,OutlineLayout, DocumentLists} from "./list"
import { LineWeights, LineDashes, LineSketches, FillGradients, Gradient, FillPatterns, Pattern, FillTextures } from "./geometry"
import UnitShape from "../unit-shape"


export let uuid=new Date().getTime()

function createTheme(){
    const Theme={
        $Types:{

        },
        $shortcuts:{
            "ctrl+f":"search"
        },
        $settingDialogs:{
            font:<FontSetting/>,
            paragraph: <ParagraphSetting/>,
            bullet: <ListSetting type="Bullet" defaultValue={Bullets[0]}/>,
            numbering: <ListSetting type="Number" defaultValue={Numberings[0]}/>,
            outline: <ListSetting type="Outline" title="Create Multiple Level List" defaultValue={Outlines[0]}/>,
            diff: <Diff.Setting portalContainer={document.body}/>,
            color: <ColorSelector/>,
        },
        $settingPanels:{
            format:<FormatPanel title="Format" children={[
                <ShapeSetting target="shape" icon={<IconOutlineShape/>}/>,
                <PictureSetting target="image" icon={<IconImage/>}/>,
                <TextFrameSetting target="shape" icon={<IconTextBorder/>}/>
            ]}/>,
            documentTree: <DocumentTree title="Document Tree" toNodeProps={({ id, type }) => ({ name: `${type}(${id.split("{")[0]})` })} />,
            tester: <Tester title="Test" />,
            search: React.createElement(props=><PropTypesUI 
                    propTypes={{
                        find:PropTypes.shape({
                            text: PropTypes.string.$({label:"search"}),
                            matchCase: PropTypes.bool.$({label:"match case"}),
                            matchWhole: PropTypes.bool.$({label:"match whole word"}),
                            regular: PropTypes.bool.$({label:"use regular expression"}),
                            total: PropTypes.number,
                            current: PropTypes.number,
                        }),
                        replace: PropTypes.shape({
                            text: PropTypes.string.$({label:"replace"}),
                            all: PropTypes.bool.$({label:"replace all"}),
                        })
                    }} 
                    props={{}}
                    />
            )
        },
        string:{
            style:{width:50},
            Dialog:{
                style:{width:100},
            },
            Tree:{
                style:{
                    border:"none",
                    background:"transparent",
                    outline:"none",
                    width:"auto",
                    fontSize:"smaller"
                }
            },
        },
        number:{
            style:{width:50},
            Dialog:{
                style:{width:100},
            },
            Ribbon:{
                wrapper:<Wrappers.RibbonField/>
            },
            Tree:{
                style:{
                    border:"none",
                    background:"transparent",
                    outline:"none",
                    width:30,
                    fontSize:"smaller"
                }
            },
        },
        oneOf:{
            Tree:{
                style:{
                    border:"none",
                    outline:"none",
                    background:"transparent"
                }
            }
        },
        link:{
            Dialog:React.createElement(({host:{$props:{label,style={marginRight:5,width:150},icon}},onClick})=><button {...{onClick,style,children:label}}/>),
            Menu:React.createElement(({host:{$props:{label,style,icon}},onClick})=><MenuItem {...{onClick,style,leftIcon:icon,primaryText:label}}/>),
            Tree:React.createElement(({host:{$props:{label,style={fontSize:"smaller",padding:0,border:0,background:"transparent"},icon}},onClick})=><button {...{onClick,style,title:label,children:"..."}}/>),
            Ribbon:React.createElement(({host:{$props:{label,style,icon}},onClick})=><CheckIconButton {...{onClick,style,icon,title:label}}/>)
        },
        UnitShape:{
            style:{width:50},
            Ribbon:{
                wrapper:<Wrappers.RibbonField/>,
                style:{
                    width:30,
                    marginLeft:2,
                    marginRight:2,
                    fontSize:"smaller"
                }
            },
            Dialog:{
                style:{width:100},
            },
            Tree:{
                style:{
                    border:"none",
                    background:"transparent",
                    outline:"none",
                    width:30,
                    fontSize:"smaller"
                }
            },
        },
        ColorShape:{
            Dialog:<Link dialog="color">
                    {React.createElement(({host,onClick})=><button onClick={onClick} style={{border:"none",margin:0,padding:0,width:20,height:20,background:host.$props.value}}>&nbsp;</button>)}
                </Link>,
            Tree:<Link dialog="color">
                    {React.createElement(({host,onClick})=><button onClick={onClick} style={{border:"none",margin:0,padding:0,width:10,height:10,position:"relative",top:4,background:host.$props.value}}>&nbsp;</button>)}
                </Link>,
            Menu: <Link dialog="color">
                    {React.createElement(({host:{$props:{label="Color...",style,icon}},onClick})=><MenuItem {...{onClick,style,leftIcon:icon,primaryText:label}}/>)}
                </Link>,
            Ribbon:<Link dialog="color">
                        {React.createElement(({onClick,host:{$props:{icon=<IconColor/>,name,label=name,value}}})=>
                            <span style={{whiteSpace:"nowrap"}} title={label}>
                                <SizableIconButton
                                    icon={
                                        <SvgIcon {...icon.props}>
                                            {icon}
                                            <path d="M0 20h24v4H0z" fill={value||"none"}/>
                                        </SvgIcon>
                                    }/>
                                <IconDropDown style={{height:24,width:6}} viewBox="6 -12 18 36" onClick={onClick}/>
                            </span>
                        )}
                    </Link>
        },
        VertAlignShape:{
            label:"Vertical Align Text",
            icon:<IconVertAlign/>,
            icons:[<IconVertAlignTop/>,<IconVertAlignMiddle/>,<IconVertAlignBottom/>]
        },
        AlignShape:{
            label:"Align Text",
            icons:[<IconAlignLeft/>,<IconAlignRight/>,<IconAlignCenter/>,<IconAlignJustify/>]
        },
        LineShape:{
            choices:["no","color","gradient"],
            width:{
                $presets:<OneOf label="Weight" values={LineWeights} icon={<IconLineWeight/>}
                    wrapper={<Wrappers.GridOneOf grid={1}/>}
                    wrapper1={React.createElement(({value:a,onClick})=>
                        <span key={a} onClick={onClick} style={{width:40}}>
                            <i style={{fontSize:9}}>{a}pt</i>
                            <hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/>
                        </span>)}
                    />
            },
            dashArray:{
                $presets:<OneOf label="Dashes" values={LineDashes} icon={<IconLineDash/>}
                    wrapper={<Wrappers.GridOneOf grid={1}/>}
                    wrapper1={React.createElement(({value:a,onClick})=>
                        <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40,margin:"auto"}}>
                            <line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/>
                        </svg>
                        )}
                    />
            },
            sketched:{
                $presets:<OneOf label="Sketch" values={LineSketches} icon={<IconLineSketched/>}
                    wrapper={<Wrappers.GridOneOf grid={1}/>}
                    wrapper1={React.createElement(({value:d,onClick})=>
                        <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40,margin:"auto"}}>
                            <path {...{stroke:"black",d}}/>
                        </svg>
                        )}
                     />
            },
            Ribbon:{
                '*':false,
                wrapper:<Wrappers.DropDownMenu/>,
                width:{
                    children:[<Divider key="d"/>,<Link dialog="format" key="more" label="More Lines..."/>]
                },
                dashArray:{
                    children:[<Divider key="d"/>,<Link dialog="format" key="more" label="More Lines..."/>]
                },
                sketched:{
                    children:[<Divider key="d"/>,<Link dialog="format" key="more" label="More Lines..."/>]
                },
            },
            Dialog:{
                wrapper:<Wrappers.ShapeSummary/>,
                width:{
                    selectorStyle:{height:20},
                },
                dashArray:{
                    selectorStyle:{height:20},
                },
                sketched:{
                    selectorStyle:{height:20},
                }
            },
            Tree:{
                width:{
                    selectorStyle:{width:10,height:10}
                },
                dashArray:{
                    selectorStyle:{width:10,height:10}
                },
                sketched:{
                    selectorStyle:{width:10,height:10}
                },
            },
        },
        BorderShapeTypes:{
            i:0,
            $0:{
                i:2,
                $2:{
                    '*':false,
                    width:{
                        wrapper:null,
                        label:"Border Weight"
                    },
                    dashArray:{
                        label:"Border Style"
                    },
                    sketched:false,
                }
            },
            wrapper:null,
        },
        GradientStopShape:{
            Dialog:{
                grid:1,
            }
        },
        GradientShape:{
            Tree:{
                $presets:<OneOf values={FillGradients} label="presets"
                    wrapper={<Wrappers.GridOneOf selectorStyle={{width:10,height:10}}/>}
                    wrapper1={React.createElement(({value, onClick})=><Gradient value={value} onClick={onClick}/>)}
                    />,
            },
            Dialog:{
                $presets:<OneOf values={FillGradients}
                    wrapper={[<Wrappers.LabelField/>,<Wrappers.GridOneOf/>]}
                    wrapper1={React.createElement(({value, onClick})=><Gradient value={value} onClick={onClick}/>)}
                    />,
                stops:{
                    wrapper:React.createElement(({host,children})=>{
                        const [actions, ...others]=children.props.children
                        return React.cloneElement(
                            children,{},
                            <div style={{display:"flex", flexDirection:"row", textAlign:"right"}}>
                                <span style={{width:100}}>Gradient Stops</span>
                                <span style={{flex:"auto"}}>
                                    {actions}
                                </span>
                            </div>,
                            others
                        )
                    }),
                    wrapper1:React.createElement(({value:{position=0,x=parseInt(position)},selected,onClick})=>{
                        return <line {...{x1:x,x2:x,y1:0,y2:20,stroke:selected ? "red" : "black",strokeWidth:2,onClick}} />
                    }),
                    collection: React.createElement(({style={width:"100%",height:20, border:1,margin:2,background:"lightblue"},children})=><svg viewBox="0 0 100 20" style={style}>{children}</svg>)
                },
            },
            Menu:<OneOf values={FillGradients}
                wrapper={<Wrappers.GridOneOf/>}
                wrapper1={React.createElement(({value, onClick})=><Gradient value={value} onClick={onClick}/>)}
                children={
                    <Fragment>
                        <Divider/>
                        <Link dialog="format" label="More Gradients..."/>
                    </Fragment>
                }
                />,
        },
        PatternShape:{
            Menu:<OneOf values={FillPatterns}
                wrapper={<Wrappers.GridOneOf/>}
                wrapper1={React.createElement(({value,onClick})=><Pattern value={value} onClick={onClick}/>)}
                children={
                    <Fragment>
                        <Divider/>
                        <Link dialog="format" label="More Patterns..."/>
                    </Fragment>
                }
                />,
            Dialog:{
                pattern:<OneOf values={FillPatterns}
                    wrapper={<Wrappers.GridOneOf selector={false}/>}
                    wrapper1={React.createElement(({value,onClick, checked})=><Pattern value={value} onClick={onClick}/>)}
                    />,
            },
            Tree:{
                pattern:<OneOf values={FillPatterns}
                    wrapper={<Wrappers.GridOneOf selectorStyle={{width:10,height:10}}/>}
                    wrapper1={React.createElement(({value,onClick})=><Pattern value={value} onClick={onClick}/>)}
                    />
            }
        },
        FillPictureShape:{
            $presets: <OneOf label={"textures"} 
                values={FillTextures.map(url=>({url,texture:true}))}
                wrapper={<Wrappers.GridOneOf selectorStyle={{width:20,height:20}}/>}
                wrapper1={React.createElement(({value,onClick})=><img src={value.url} onClick={onClick} style={{width:45,height:45}}/>)}
                />,
            url:{
                label:"picture",
            }
        },
        FillShape:{
            choices:["no","color","gradient","picture","pattern"],
            Ribbon:{
                wrapper:<Wrappers.DropDownMenu/>,
                transparency:false,
                picture:{
                    $1:<OneOf label="Texture" 
                        values={FillTextures.map(url=>({url,texture:true}))}
                        wrapper={<Wrappers.GridOneOf/>}
                        wrapper1={React.createElement(({value,onClick})=><img src={value.url} onClick={onClick} style={{width:45,height:45}}/>)}
                        children={[<Divider key="-"/>,<Link key="more" label="More Textures..." dialog="format"/>]}
                        />
                },
            },
            Dialog:{
                wrapper:<Wrappers.ShapeSummary/>,
                picture:{
                    label:false,
                    grid:1,
                    tile:{
                        grid:1,
                    }
                },
                pattern:{
                    grid:1,
                },
                gradient:{
                    grid:1,
                },
            },
            Tree:{
                picture:{
                    i:1
                }
            }
        },
        PathGeometryPath:{
            Tree:{
                style:{width:"auto"}
            }
        },
        GeometryShape:{
            Ribbon:{
                
            }
        },
        FillShapeTypes:{

        },
        TextStyleShape:<Link dialog="font" label="Font..."/>,
        FontsShape:{
            style:{
                width:100,
            },
            Tree:{
                style:{
                    border:"none",
                    outline:"none",
                    background:"transparent",
                    fontSize:"smaller"
                },
                label:"..."
            }
        },
        FontShape:<Link children={(a,host)=><FontList value={host.$props.value} onChange={f=>host.set(host.path,f)}/>}/>,
        BulletShape:<Link label="Bullet..." dialog={React.createElement(({value,host,...props})=>{
                const ui=React.createRef()
                return (
                    <Dialog title="Symbol" {...props} 
                        onSubmit={({font,char})=>{
                            const path=post.path.split(".")
                            path.pop()
                            host.set(path.join("."),{style:{fonts:font},label:char})
                        }}>
                        <PropTypesUI
                            propTypes={{
                                font:dom.Unknown.FontShape,
                                char:dom.Unknown.string,
                            }} 
                            theme={{
                                wrapper:<Wrappers.ShapeGrid grid={1}/>,
                                char:<OneOf values={["a","b","c"]} 
                                    wrapper1={React.createElement(({value,onClick})=><span onClick={onClick}>{value}</span>)}
                                    wrapper={<Wrappers.GridOneOf grid={1} selector={false}/>}/>
                            }}
                            props={{}} ref={ui}
                            />
                    </Dialog>
                    )
                })} 
            />,
        BlobShape:{
            Dialog:{
                wrapper:React.createElement(({children:{props:{onClick}}})=><button onClick={onClick}>Select Picture...</button>)
            },
            Tree:{
                wrapper:React.createElement(({children:{props:{onClick}}})=><button onClick={onClick} style={{background:"transparent",border:0,position:"relative",top:-2}}>...</button>)
            },
            Menu:{
                wrapper:React.createElement(({children:{props:{onClick}}})=><MenuItem primaryText="Picture..." onClick={onClick}/>)
            }
        },
        BulletListShape:{
            id:false,
            level:false,
            style:{
                wrapper:null,
            },
            
            Ribbon:<OneOf label="Bullet Character" values={Bullets} icon={<IconListBullet/>}
                wrapper1={<BulletWrapper1 onClicker={(host,{status,value})=>e=>host.set(host.path,status=="checked" ? {label:value.label} : value)}/>}
                equal={(a,b)=>a?.label==b?.label}
                wrapper={<Wrappers.GridOneOf grid={4} label="Bullet Library"/>}
                children={
                    <Fragment>
                        <DocumentLists type="Bullet" />
                        <Divider key="divider"/>
                        <Link key="bullet" label="Define New Bullet" dialog='bullet'/>
                    </Fragment>}
            />,

            Dialog:{
                $presets:<OneOf label="Bullet Character"  
                        values={Bullets}
                        equal={(a,b)=>a?.label==b?.label}
                        wrapper1={<BulletWrapper1 onClicker={(host,{status,value})=>e=>host.set(host.path,status=="checked" ? {label:value.label} : value)}/>}
                        wrapper={<Wrappers.GridOneOf selector={false} style={{display:"auto"}}/>}
                        />,
                wrapper:<Wrappers.ShapeLayout layout={
                    <div style={{display:"flex", gridColumn:"span 2", gap:5}}>
                        <div style={{flex:1}}>
                            <h3>Bullet Character</h3>
                            <div style={{marginBottom:5}}><a id="$presets"/></div>
                            <div><a id="style"/><a id="label"/></div>
                            <hr/>
                            <h3>Text Position</h3>
                            <div><a id="indent"/></div>
                            <h3>Bullet Position</h3>
                            <div><a id="hanging"/></div>
                            <div><a id="align"/></div>
                            <hr/>
                            <div role="others"/>
                        </div>
                        <DemoList defaultValue={Bullets[0]}/>
                    </div>
                }/>,
                label:{
                    notUILabel:true,
                    wrapper:null,
                },
                indent:{
                    label:"indent at"
                },
                hanging:{
                    label:"hanging at"
                }
            },
            Tree: <Link dialog="bullet"/>
        },
        NumberListShape:{
            id:false,
            level:false,
            style:{
                wrapper:null
            },
            
            Ribbon: <OneOf label="numbering list" values={Numberings} icon={<IconListNumber/>}
                equal={(a,b)=>a?.format==b?.format}
                wrapper1={<NumberingWrapper1 onClicker={(host,{status,value})=>e=>host.set(host.path,status=="checked" ? {format:value.format} : value)}/>}
                wrapper={<Wrappers.GridOneOf grid={3} label="Numbering Library"/>}
                children={<Fragment><DocumentLists type="Numbering"/><Divider key="d"/><Link key="l" label="Define New Number List" dialog="numbering"/></Fragment>}
                />
            ,
            Dialog:{
                wrapper:<Wrappers.ShapeLayout layout={
                    <div style={{display:"flex", gridColumn:"span 2", gap:5}}>
                        <div style={{flex:1}}>
                            <div>
                                <h3>Number Format</h3>
                                <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", rowGap:5, columnGap:2}}>
                                    <a id="label"/><a id="style"/>
                                    <a id="format"/><a id="start"/>    
                                </div>
                            </div>
                            <hr/>
                            <h3>Text Position</h3>
                            <div><a id="indent"/></div>
                            <h3>Number Position</h3>
                            <div><a id="hanging"/></div>
                            <div><a id="align"/></div>
                            <hr/>
                            <div role="others"/>
                        </div>
                        <DemoList 
                            defaultValue={Numberings[0]}
                            label={({label,format},i)=>label.replace('%1',dom.Unknown.numberings[format]?.(i))}/>
                    </div>
                }/>,
                label:{
                    notUILabel:true,
                    label:"format",
                },
                indent:{
                    label:"indent at"
                },
                hanging:{
                    label:"hanging at"
                }, 
                format: <OneOf label="number style" 
                    values={NumberingFormats} 
                    labels={NumberingFormats.map(k=>{
                        const a=i=>dom.Unknown.numberings[k](i)
                        return [a(1),a(2),a(3),"..."].join(",")
                    })}
                    />,
                start:{
                    label:"start at"
                }
            },

            Tree: <Link dialog="numbering"/>
        },
        OutlineListShape:{
            Ribbon:<OneOf label="Outline list" values={Outlines} icon={<IconListOutline/>}
                    wrapper1={<OutlineWrapper1/>}
                    wrapper={<Wrappers.GridOneOf grid={3} label="List Library"/>}
                    children={
                        <Fragment>
                            <DocumentLists type="Outline"/>
                            <Divider/>
                            <Link label="Define Multiple Level List" dialog="outline"/>
                            <Link label="Define List Style" dialog="listStyle"/>
                        </Fragment>
                    }
                />,
            Dialog:{
                levels:{
                    size:9,
                    label1:(value,i)=>parseInt((value.level||i)+1),
                    wrapper:<Wrappers.ArrayOf layout={<OutlineLayout/>}/>
                },
                wrapper:<Wrappers.ShapeGrid label={false}/>
            },
            Tree: <Link dialog="outline"/>
        },
        Text:{
            color: {
                icon:<IconTextColor/>
            },
            bold: {
                icon: <IconBold/>
            },
            italic: {
                icon: <IconItalic/>
            },
            vanish: {
                icon: <IconVanish/>
            },
            highlight: {
                icon:<IconBackground/>
            },
            border: {
                i:0,
                icon: <IconTextBorder/>
            },
            underline: {
                i:0,
                icon: <IconUnderlined/>
            },
            strike: {
                i:0,
                icon: <IconStrike/>
            },

            vertAlign:{
                icons:[<IconSubscript/>, <IconSuperscript/>],
            },
            
            Ribbon:{
                '*':false,
                fonts:{

                },
                size: {
                    wrapper:null,
                },
                vertAlign: {
                    wrapper:<Wrappers.HorizontalOneOf/>, 
                }
            },
            Dialog:{
                fonts:{
                    label:null,
                },
                emphasizeMark:<OneOf values={["."]} style={{width:100}}/>,
                wrapper:React.createElement(({children})=>{
                    const i=children.findIndex(a=>a.props?.name==="scale")
                    return (
                        <Tabs>
                            <Tab label="Font">
                                {children.slice(0,i)}
                            </Tab>
                            <Tab label="Advanced">
                                {children.slice(i)}
                            </Tab>
                        </Tabs>
                    )
                })
            },
            emphasizeMark:false,
        },
        Paragraph:{
            End:false,
            defaultStyle:false,
            wrap:false,
            spacing:{
                lineHeight:<UnitShape label="line height" normalize={value=>(value?.height || value)}/>,
            },
            Ribbon:{
                spacing:{
                    top:{
                        label:"spacing top",
                    }
                },
                indent:{
                    firstLine:false,
                    left:{
                        label:"intent left",
                    }
                },
                align:{
                    wrapper:<Wrappers.HorizontalOneOf/>,
                },
            },
            Dialog:{
                spacing:{
                    grid:1,
                },
                indent:{
                    grid:1,
                }
            }
        },
        Section:{
            Ribbon:{
                get layout(){
                    return {
                        ...Theme.Page.Ribbon,
                    }
                    
                }
            },
        },
        Page:{
            Ribbon:{
                width:false,
                height:false,
                size:<OneOf 
                    values={Object.keys(dom.Page.Size).sort()}
                    equal={(a,b)=>a && b && a.toLowerCase()==b.toLowerCase()}
                    onClick={false} 
                    icon={<IconSize/>}
                    />,
                orientation:{
                    onClick:false,
                    equal:(a="portrait",b="portrait")=>a&&b&&a.toLowerCase()==b.toLowerCase(),
                    icon: <IconOrientation/>,
                },
                margin:<OneOf 
                    values={[
                        "2.54cm","1.27cm",
                        {top:"2.54cm",bottom:"2.54cm",left:"1.91cm",right:"1.91cm"},
                        {top:"2.54cm",bottom:"2.54cm",left:"5.08cm",right:"5.08cm"},
                        {top:"2.54cm",bottom:"2.54cm",left:"3.18cm",right:"2.54cm"},
                        "-"]}
                    labels={["Normal","Narrow","Moderate","Wide","Mirrored"]} 
                    onClick={false} 
                    equal={(a,b)=>dom.Unknown.MarginShape.equal(a,b)}
                    icon={<IconMargin/>}
                    children={<Fragment><Divider/><Link label="Custom Margins..." dialog="page"/></Fragment>}
                    />,
                cols:<OneOf
                    onClick={false}
                    values={[[1],[2],[3],[1,2],[2,1]]}
                    labels={["One", "Two", "Three", "Left", "Right"]}
                    equal={(_,value=[],a)=>{
                        return a==(()=>{
                            switch(value.length){
                                case 2:{
                                    const r=value[0].width/value[1].width
                                    if(r==0.5)
                                        return 3
                                    if(r==2)
                                        return 4
                                }
                                default:
                                    return value.length-1
                            }
                        })();
                    }}
                    icons={[
                        <IconColumn>
                            <Column key={++uuid} d="M12 6.5v12" strokeWidth="12"/>
                        </IconColumn>,
                        <IconColumn>
                            <Column key={++uuid}/>
                            <Column key={++uuid} transform="translate(7 0)"/>
                        </IconColumn>,
                        <IconColumn>
                            <Column key={++uuid} strokeWidth="3"/>
                            <Column key={++uuid} strokeWidth="3" transform="translate(3.5 0)"/>
                            <Column key={++uuid} strokeWidth="3" transform="translate(7 0)"/>
                        </IconColumn>,
                        <IconColumn>
                            <Column key={++uuid} strokeWidth="3"/>
                            <Column key={++uuid} strokeWidth="7" transform="translate(6 0)"/>
                        </IconColumn>,
                        <IconColumn>
                            <Column key={++uuid} strokeWidth="7" transform="translate(1 0)"/>
                            <Column key={++uuid} strokeWidth="3" transform="translate(7 0)"/>
                        </IconColumn>,
                    ]}
                    icon={
                        <IconColumn>
                            <Column key={++uuid}/>
                            <Column key={++uuid} transform="translate(7 0)"/>
                        </IconColumn>
                    }
                    children={<Fragment><Divider/><Link dialog="page" label="More Columns..." /></Fragment>}
                    />
            },
        },
        Document:{
            screenBuffer:false,
        },
        Image:{
            Ribbon:{
                src:{
                    icon:<IconImage/>,
                    accept:"image/*",
                    label:"picture from file..."
                },
                outline:{
                    i:2,
                    icon:<IconOutlineShape/>,
                    label:"Picture Border",
                },
                fill: {
                    i:1,
                    icon:<IconFillShape/>,
                },
            },
            editableSpots:false,
        },
        ShapeImage:{
            Ribbon:{
                '*':false,
                fill:{
                    i:1,
                    icon:<IconImage/>,
                    label:"picture from file..."
                },
                outline:{
                    i:2,
                    icon:<IconOutlineShape/>,
                    label:"Picture Border"
                },
            }
        },
        Table:{
            Ribbon:{
                '*':false,
                //children:<span>hello</span>,
            }
        },
        Row:{
            Ribbon:{
                keepLines:false,
                minHeight:false,
            }
        },
        Cell:{
            Ribbon:{
                '*':false,
                border:{
                    $0:{
                        $2:{
                            
                        }
                    },
                    children:<OneOf 
                        label="Borders" 
                        onClick={false}
                        icon={<IconTextBorder/>}
                        values={[1,1,1,1,"-",2,2,2,2,"-",3,3,"-"]}
                        labels={[
                            ..."Bottom,Top,Left,Right".split(",").map(a=>`${a} Border`),
                            "-",
                            ...["No","All","Outside","Inside"].map(a=>`${a} Borders`),
                            "-",
                            ...["Inside Horizontal","Inside Vertical"].map(a=>`${a} Borders`),
                        ]}
                        children={<Link label="Borders And Shadings..." dialog="table"/>}
                    />
                },
                fill:{
                    i:1,
                    '*':false,
                    $1:{
                        label:"shadding",
                        icon:<IconShadding/>,
                    }
                }
            }
        },
        Frame:{
            Ribbon:{
                width:false,
                height:false,
                x:false,
                y:false,
                z:false,
                margin:false,
                xhref:false,
                autoCompose2Parent:false,
                equalBalanceThreshold:false,
                balance:false,
                allowOverflow:false,
                focusable:false,
                async:false,
                space:false,
            },
            Panel:{
                '*':false,
                margin:true,
                allowOverflow:true,
                vertAlign:true,
            }
        },
        Anchor:{
            Ribbon:{
                x:false,
                y:false,
                z:false,
                wrap:{
                    mode:{
                        icon:<IconWrapMode/>,
                        onClick:false,
                        label:"Wrap Mode"
                    },
                    side:{
                        icon:<IconWrapSide/>,
                        onClick:false,
                        label:"Wrap Side"
                    },
                    distance:false,
                    geometry:false,
                }
            }
        },
        Shape:{
            editableSpots:false,
            autofitHeight:false,
            Ribbon:{
                '*':false,
                geometry:{
                    i:0,
                    $0:{
                        '*':false,
                        width:{
                            onChange(width,host){
                                host.context.set("size",{width})
                            }
                        },
                        height:{
                            onChange(height,host){
                                host.context.set("size",{height})
                            }
                        }
                    }
                },
                outline:{
                    i:2,
                    icon:<IconOutlineShape/>,
                },
                fill: {
                    i:1,
                    icon:<IconFillShape/>,
                },
                rotate: <OneOf 
                    values={[90,-90,"-"]} 
                    onClick={false} 
                    icon={<IconRotate/>} 
                    children={<Link label="More Rotation Options..." dialog="format"/>}
                    />,
                scale: {
                    style:{
                        width:50
                    }
                },
            },
            Dialog:{
                '*':false,
                wrapper:null,
                fill:{
                    i:1
                },
                outline:{
                    i:2
                }
            },
            Tree:{
                fill:{
                    i:1
                },
                outline:{
                    i:2
                }
            }
        },
    }
    return Theme
}

export default createTheme()