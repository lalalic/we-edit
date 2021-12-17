import React, {Fragment} from "react"
import PropTypes, { oneOf } from "prop-types"
import {dom} from "we-edit"
import { Tab, Tabs } from "material-ui"
import Divider from 'material-ui/Divider'

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

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconListOutline from "material-ui/svg-icons/editor/pie-chart-outlined"

import textures from "./textures"
import { IconColumn, Column, IconTextBorder, IconSubscript, IconSuperscript, IconSize, IconOrientation, IconMargin } from "./icons"
import {FontSetting} from "../../../text"
import {ParagraphSetting, ListSetting} from "../../../paragraph"
import {Setting as ShapeSetting} from "../../../shape"
import {Setting as PictureSetting} from "../../../picture"
import DocumentTree from "../../../developer/filter-document-tree"
import Tester from "../../../developer/tester"
import Diff from "../../../developer/diff"
import Show from "../show"
import {MenuItem} from "../../menu"
import FontList from "../../fonts"
import Dialog from "../../dialog"


import * as Wrappers from "../wrappers"
import PropTypesUI from ".."

let uuid=new Date().getTime()
const WithSetting=Object.assign(({children},{setting})=>children(setting),{contextTypes:{setting:PropTypes.func}})
const LineWeights=[0.25,0.5,0.75,1,1.5,2.25,3,4.5,6]
const LineDashes=["","1", "4 2", "4 2 2 2", "6 2", "6 2 2 2","6 2 2 2 2 2"]
const LineSketches=["M0 5h30","M0 5h30"]

const FillGradients=[
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
    {type:"linear",angle:90,stops:[{offset:"0%",color:"blue"},{offset:"100%",color:"red"}]},
]
const FillTextures=textures
const FillPatterns=[
    <polygon points={"0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"}/>,
    <circle r={1} cx={5} cy={5}/>,
    <line {...{x1:0,y1:10,x2:10,y2:0,strokeLinecap:"round",strokeWidth:1, strokeDasharray:"3,5",stroke:"black"}}/>,
]

const Bullets=[
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25CF)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25CB)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25A0)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x2666)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x263A)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x263B)},
]

const Numberings=[
    {format:"decimal",label:"%1."},
    {format:"lowerLetter",label:"%1."},
    {format:"upperLetter",label:"%1."},
    {format:"lowerRoman",label:"%1."},
    {format:"upperRoman",label:"%1."},
    {format:"chinese",label:"%1"},
]

const Outlines=[
    [{format:"decimal",label:"%1."},{format:"decimal",label:"%1.%2."},{format:"decimal",label:"%1.%2.%3."}],
    [{format:"decimal",label:"%1."},{format:"lowerLetter",label:"%1."},{format:"lowerRoman",label:"%1."},],
    [{format:"decimal",label:"%1."},{format:"lowerLetter",label:"%1."},{format:"lowerRoman",label:"%1."},],
]

//shape input only be on root level
/**
 * configure 
 *  1. show or not for a prop
 *  2. default props for component, theme domain, or a prop
 *  3. priority: props>theme>component
 *  
 */
const Theme={
    $Types:{

    },
    $settingDialogs:{
        font:<FontSetting/>,
        paragraph: <ParagraphSetting/>,
        bullet: <ListSetting shape={dom.Paragraph.BulletListShape} title="Create Bullet List"/>,
        numbering: <ListSetting shape={dom.Paragraph.NumberListShape} title="Create Number List"/>,
        outline: <ListSetting shape={dom.Paragraph.OutlineListShape} title="Create Outline List"/>,
        diff: <Diff.Setting portalContainer={document.body}/>,
    },
    $settingPanels:{
        shape: <ShapeSetting title="Shape Format"/>,
        picture: <PictureSetting title="Picture Format"/>,
        documentTree: <DocumentTree title="Document Tree" toNodeProps={({ id, type }) => ({ name: `${type}(${id.split("{")[0]})` })} />,
        tester: <Tester title="Test" />,
    },
    UnitShape:{
        style:{width:50},
        Ribbon:{
            wrapper:<Wrappers.RibbonField/>,
            style:{
                width:50,
                marginLeft:2,
                marginRight:2,
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
            }
        },
    },
    shape:{
        Dialog:{
            
        },
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
                width:30
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
                width:30
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

    ColorShape:{
        Tree:{
            style:{
                border:"none",
                margin:0,
                padding:0,
                width:20,
                height:20,
            }
        }
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
        Ribbon:{
            '*':false,
            wrapper:<Wrappers.DropDownMenu/>,
            gradient:true,
            width:<oneOf label="Weight" values={LineWeights}
                wrapper={<Wrappers.GridOneOf grid={1}/>}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <span key={a} onClick={onClick} style={{width:40,margin:"auto"}}>
                        <i style={{fontSize:9}}>{a}pt</i>
                        <hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/>
                    </span>)}
                children={[<Divider key="d"/>,<MenuItem key="more" primaryText="More Lines..."/>]}
                />,
            dashArray:<oneOf label="Dashes"
                values={LineDashes}
                wrapper={<Wrappers.GridOneOf grid={1}/>}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40,margin:"auto"}}>
                        <line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/>
                    </svg>
                    )}
                children={[<Divider key="d"/>,<MenuItem key="more"primaryText="More Lines..."/>]}
                />,
            sketched:<oneOf label="Sketch" values={LineSketches}
                wrapper={<Wrappers.GridOneOf grid={1}/>}
                wrapper1={React.createElement(({value:d,onClick})=>
                    <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40,margin:"auto"}}>
                        <path {...{stroke:"black",d}}/>
                    </svg>
                    )}
                children={[<Divider key="d"/>,<MenuItem key="more"primaryText="More Lines..."/>]}
                />,
        },
        Dialog:{
            wrapper:<Wrappers.ShapeSummary/>,
            width:<oneOf label="Weight" values={LineWeights}
                wrapper={[<Wrappers.LabelField/>,<Wrappers.GridOneOf grid={1} selectorStyle={{height:20}}/>]}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <span key={a} onClick={onClick} style={{width:40}}>
                        <i style={{fontSize:9}}>{a}pt</i>
                        <hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/>
                    </span>)}
                />,
            dashArray:<oneOf label="Dashes" values={LineDashes}
                wrapper={[<Wrappers.LabelField/>,<Wrappers.GridOneOf grid={1}  selectorStyle={{height:20}}/>]}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40}}>
                        <line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/>
                    </svg>
                    )}
                />,
            sketched:<oneOf label="Sketch" values={LineSketches}
                wrapper={[<Wrappers.LabelField/>,<Wrappers.GridOneOf grid={1}  selectorStyle={{height:20}}/>]}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40}}>
                        <path {...{stroke:"black",d}}/>
                    </svg>
                    )}
                />,
        },
        Tree:{
            width:<oneOf label="weight" values={LineWeights}
                wrapper={<Wrappers.GridOneOf grid={1} selectorStyle={{width:10,height:10}}/>}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <span key={a} onClick={onClick} style={{width:40}}>
                        <i style={{fontSize:9}}>{a}pt</i>
                        <hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/>
                    </span>)}
                />,
            dashArray:<oneOf label="dashes" values={LineDashes}
                wrapper={<Wrappers.GridOneOf grid={1} selectorStyle={{width:10,height:10}}/>}
                wrapper1={React.createElement(({value:a,onClick})=>
                    <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40}}>
                        <line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/>
                    </svg>
                    )}
                />,
            sketched:<oneOf label="sketch" values={LineSketches}
                wrapper={<Wrappers.GridOneOf grid={1} selectorStyle={{width:10,height:10}}/>}
                wrapper1={React.createElement(({value:d,onClick})=>
                    <svg viewBox="0 0 30 10" onClick={onClick} style={{width:40}}>
                        <path {...{stroke:"black",d}}/>
                    </svg>
                    )}
                />,
        },
    },

    GradientStopShape:{
        Dialog:{
            grid:1,
        }
    },
    GradientShape:{
        Tree:{
            $presets:<oneOf values={FillGradients} label="presets"
                wrapper={<Wrappers.GridOneOf selectorStyle={{width:10,height:10}}/>}
                wrapper1={React.createElement(({value, onClick})=><Gradient value={value} onClick={onClick}/>)}
                />,
        },
        Dialog:{
            $presets:<oneOf values={FillGradients}
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
        Menu:<oneOf values={FillGradients}
            wrapper={<Wrappers.GridOneOf/>}
            wrapper1={React.createElement(({value, onClick})=><Gradient value={value} onClick={onClick}/>)}
            children={
                <Fragment>
                    <Divider/>
                    <Show children={setting=><MenuItem primaryText="More Gradients..." onClick={e=>setting("shape")}/>}/>
                </Fragment>
            }
            />,
    },
    PatternShape:{
        Menu:<oneOf values={FillPatterns}
            wrapper={<Wrappers.GridOneOf/>}
            wrapper1={React.createElement(({value,onClick})=><Pattern value={value} onClick={onClick}/>)}
            children={
                <Fragment>
                    <Divider/>
                    <Show children={setting=><MenuItem primaryText="More Patterns..." onClick={e=>setting("shape")}/>}/>
                </Fragment>
            }
            />,
        Dialog:{
            pattern:<oneOf values={FillPatterns}
                wrapper={<Wrappers.GridOneOf selector={false}/>}
                wrapper1={React.createElement(({value,onClick, checked})=><Pattern value={value} onClick={onClick}/>)}
                />,
        },
        Tree:{
            pattern:<oneOf values={FillPatterns}
                wrapper={<Wrappers.GridOneOf selectorStyle={{width:10,height:10}}/>}
                wrapper1={React.createElement(({value,onClick})=><Pattern value={value} onClick={onClick}/>)}
                />
        }
    },

    FillPictureShape:{
        $presets: <oneOf label={"textures"} 
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
                $1:<oneOf label="Texture" 
                    values={FillTextures.map(url=>({url,texture:true}))}
                    wrapper={<Wrappers.GridOneOf/>}
                    wrapper1={React.createElement(({value,onClick})=><img src={value.url} onClick={onClick} style={{width:45,height:45}}/>)}
                    children={[<Divider key="-"/>,<Show children={setting=><MenuItem key="more" primaryText="More Textures..." onClick={e=>setting("shape")}/>}/>]}
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

    TextStyleShape:{
        $link:<Show dialog="font" children={<button style={{marginRight:5, width:100}}>Font...</button>}/>
    },

    FontsShape:{
        style:{
            width:50,
        },
        Tree:{
            style:{
                border:"none",
                outline:"none",
                width:50,
                background:"transparent",
            },
            label:"..."
        }
    },
    FontShape:{
        Dialog:<Show children={(a,host)=><FontList value={host.$props.value} onChange={f=>host.set(host.path,f)}/>}/>,
        Ribbon:<Show children={(a,host)=><FontList value={host.$props.value} onChange={f=>host.set(host.path,f)}/>}/>,
        Tree:<Show children={(a,host)=><FontList value={host.$props.value} onChange={f=>host.set(host.path,f)}/>}/>,
    },

    BulletShape:{
        Dialog:<Show dialog={React.createElement(({value,host,...props})=>{
                const ui=React.createRef()
                return (
                    <Dialog title="Symbol" {...props} 
                        onSubmit={({font,char})=>{
                            const path=post.path.split(".")
                            path.pop()
                            host.set(path.join("."),{style:{fonts:font},label:char})
                        }}>
                        <PropTypesUI uiContext="Dialog"
                            propTypes={{
                                font:dom.Unknown.FontShape,
                                char:dom.Unknown.string,
                            }} 
                            theme={{
                                wrapper:<Wrappers.ShapeGrid grid={1}/>,
                                char:<oneOf values={["a","b","c"]} 
                                    wrapper1={React.createElement(({value,onClick})=><span onClick={onClick}>{value}</span>)}
                                    wrapper={<Wrappers.GridOneOf grid={1} selector={false}/>}/>
                            }}
                            props={{}} ref={ui}
                            />
                    </Dialog>
                    )
                })} 
            children={<button  style={{marginRight:5}} >Bullet...</button>}/>,
    },
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
            
        Ribbon:<oneOf label="Bullet Character" values={Bullets} icon={<IconListBullet/>}
            wrapper1={React.createElement(({value:{label,style:{fonts}}})=><span style={{font:fonts,width:40,height:40,lineHeight:"40px",margin:4,border:"1px solid lightgray",textAlign:"center"}}>{label}</span>)}
            wrapper={[<Wrappers.DropDownMenu/>,<Wrappers.GridOneOf selector={false} grid={4}/>]}
            uiContext="Dialog"//to remove MenuItem, and use children directly
            children={
                <Fragment>
                    <Divider/>
                    <Show children={setting=><MenuItem primaryText="Define New Bullet" onClick={e=>setting('bullet')}/>}/>
                </Fragment>
            }/>,

        Dialog:{
            $presets:<oneOf label="Bullet Character"  values={Bullets}
                wrapper1={React.createElement(({value:{label,style:{fonts}}})=><span style={{font:fonts,width:40,height:40,lineHeight:"40px",margin:4,border:"1px solid lightgray",textAlign:"center"}}>{label}</span>)}
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
                        <Wrappers.ShapeGrid role="others" label={null} style={{borderBottom:0}}/>
                    </div>
                    <div style={{width:200,border:"1px solid black",padding:10}}>
                        <p> </p>
                        <p> </p>
                        <ul>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                        </ul>
                        <p> </p>
                        <p> </p>
                    </div>
                </div>
            }/>,
            style:(<Show dialog="font" children={<button style={{marginRight:5}}>Font...</button>}/>),
            label:{
                notUILabel:true,
                wrapper:null,
            },
            indent:{
                label:"indent at"
            },
            hanging:{
                label:"indent at"
            }
        }
    },
    NumberListShape:{
        id:false,
        level:false,
        Ribbon: <oneOf label="numbering list" values={Numberings} icon={<IconListNumber/>}
            wrapper1={React.createElement(({value, onClick})=>(
                <div style={{width:50,height:50,border:"1px solid lightgray",overflow:"hidden",fontSize:9}} 
                    onClick={onClick}>
                    <ol style={{paddingLeft:0}}>
                        <Li {...value} i={1}/>
                        <Li {...value} i={2}/>
                        <Li {...value} i={3}/>
                    </ol>
                </div>
            ))}
            wrapper={[<Wrappers.DropDownMenu/>,<Wrappers.GridOneOf selector={false} grid={3} style={{gap:5,padding:5}}/>]}
            uiContext="Dialog"
            children={<Fragment><Divider/><Show children={setting=><MenuItem primaryText="Define New Number List" onClick={e=>setting("numbering")}/>}/></Fragment>}
            />
        ,
        Dialog:{
            wrapper:<Wrappers.ShapeLayout layout={
                <div style={{display:"flex", gridColumn:"span 2", gap:5}}>
                    <div style={{flex:1}}>
                        <div>
                            <h3>Number Format</h3>
                            <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)"}}>
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
                        
                    </div>
                    <div style={{width:200,border:"1px solid black",padding:10}}>
                        <ol>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                        </ol>
                    </div>
                </div>
            }/>,
            style:(<Show dialog="font" children={<button style={{marginRight:5, width:100}}>Font...</button>}/>),
            label:{
                notUILabel:true,
                label:"format",
            },
            indent:{
                label:"indent at"
            },
            hanging:{
                label:"indent at"
            }, 
            format:{
                label: "number style"
            },
            start:{
                label:"start at"
            }
        }
    },

    OutlineListShape:{
        Ribbon:<oneOf label="Outline list" values={Outlines} icon={<IconListOutline/>}
                wrapper1={React.createElement(({value:[l1,l2,l3],onClick})=>
                    <div style={{width:50,height:50,border:"1px solid lightgray",overflow:"hidden",fontSize:9}} 
                        onClick={onClick}>
                        <ol style={{paddingLeft:0}}>
                            <Li {...l1}/>
                            <Li {...l2}/>
                            <Li {...l3}/>
                        </ol>
                    </div>
                )}
                wrapper={[<Wrappers.DropDownMenu/>,<Wrappers.GridOneOf selector={false} grid={3} style={{gap:5,padding:5}}/>]}
                uiContext="Dialog"
                children={<Fragment><Divider/><Show children={setting=><MenuItem primaryText="Define New Outline List" onClick={e=>setting("outline")}/>}/></Fragment>}
            />,
        Dialog:{
            collectionStyle:{width:"100%",height:"80%"},
            wrapper1:React.createElement(({i,...props})=><option {...props}>{i}</option>),
            wrapper:React.createElement(({host,children:{props:{children:[actions,collection,active]}}})=>(
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div style={{width:50,marginRight:10}}>
                        <h3>Level</h3>
                        {collection}
                    </div>
                    <div style={{flex:"auto"}}>{active}</div>
                </div>
            ))
        }
    },
    Text:{
        size: {
            wrapper:null,
        },
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
            scale:false,
            spacing:false,
            position:false,
            kerning:false,
            vanish: false,
            vertAlign: {
                wrapper:<Wrappers.HorizontalOneOf/>, 
            },
        },
        Dialog:{
            fonts:{
                label:null,
            },
            emphasizeMark:<oneOf values={["."]} style={{width:100}}/>,
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
            lineHeight:false,
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
            }
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
            size:<oneOf 
                values={["A4","A5","A6","Letter"]} 
                onClick={false} 
                icon={<IconSize/>}
                />,
            orientation:{
                onClick:false,
                icon: <IconOrientation/>,
            },
            margin:<oneOf 
                values={["2.54cm","1.27cm",{top:"2.54cm",bottom:"2.54",left:"1.91cm",right:"1.91cm"},{top:"2.54cm",bottom:"2.54",left:"5.08cm",right:"5.08cm"},{top:"2.54cm",bottom:"2.54",left:"3.18cm",right:"2.54cm"},"-"]}
                labels={["Normal","Narrow","Moderate","Wide","Mirrored"]} 
                onClick={false} 
                icon={<IconMargin/>}
                children={<Show childing={setting=><MenuItem primaryText="Custom Margins..." onClick={e=>setting("page")}/>}/>}
                />,
            cols:<oneOf
                onClick={false}
                values={[[1],[2],[3],[1,2],[2,1]]}
                labels={["One", "Two", "Three", "Left", "Right"]}
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
                children={<MenuItem primaryText="More Columns..." />}
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
            '*':false
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
                width:<oneOf label="Line Weights" 
                    values={[...LineWeights]}
                    icon={<IconOutlineShape/>}
                    labels={LineWeights.map(a=><span><i style={{fontSize:9}}>{a}pt</i><hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/></span>)}
                    />,
                dashArray:<oneOf label="Line Styles"
                    values={[...LineDashes]}
                    icon={<IconOutlineShape/>}
                    labels={LineDashes.map(a=><svg viewBox="0 0 30 10"><line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/></svg>)}
                    />,
                sketched:false,

                children:<oneOf 
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
                        children={<Show childing={setting=><MenuItem primaryText="Borders And Shadings..." onClick={e=>setting('table')}/>}/>}
                    />
            },
            fill:{
                picture:false,
                transparency:false,
                gradient:false,
                pattern:false,
                color:{
                    label:"shading"
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
                type:false,
                x:false,
                y:false,
                rx:false,
                ry:false,
            },
            outline:{
                i:2,
                icon:<IconOutlineShape/>,
            },
            fill: {
                i:1,
                icon:<IconFillShape/>,
            },
            rotate: <oneOf 
                values={[90,-90,"-"]} 
                onClick={false} 
                icon={<IconRotate/>} 
                children={<Show childing={setting=><MenuItem primaryText="More Rotation Options..." onClick={e=>setting("shape")}/>}/>}
                />,
            scale: {
                style:{
                    width:50
                }
            },
        },
        Dialog:{
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



const Gradient=({value:{type,angle=0,stops},onClick})=>(
    <div onClick={onClick} style={{width:45,height:45,}}>
        <div style={{width:"100%",height:"100%", 
            background:`${type}-gradient(${angle}deg,${stops.map(({offset,color})=>`${color} ${offset}`).join(",")})`
        }}/>
    </div>
)
const Pattern=({value, onClick, checked, id=`ptn_${uuid++}`})=>(
    <svg style={{width:45,height:45}} onClick={onClick}>
        <defs>
            <pattern id={id} viewBox="0,0,10,10" width="20%" height="20%">
                {value}
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
    </svg>
)

const Li=({indent, hanging, format, style, label, i=1})=><li style={{}}></li>

export default Theme