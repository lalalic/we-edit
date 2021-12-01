import React from "react"
import {dom, ACTION} from "we-edit"
import { MenuItem } from "material-ui/Menu"
import ShapeAsMenu from "../shape-as-menu"
import textures from "../textures"

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
import { IconColumn, Column, IconTextBorder, IconSubscript, IconSuperscript, IconSize, IconOrientation, IconMargin } from "./icons"

let uuid=new Date().getTime()
const setting=type=>void 0

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

//shape input only be on root level
/**
 * configure 
 *  1. show or not for a prop
 *  2. default props for component, theme domain, or a prop
 *  3. priority: props>theme>component
 *  
 */
const Theme={
    UnitShape:{
        Ribbon:{
            style:{
                width:50,
                marginLeft:2,
                marginRight:2,
            }
        },
        style:{
            width:100,
        }
    },
    shape:{
        Dialog:{
            Wrapper:({shape:{$props:{name,label=name}}, children})=>(
                <div style={{borderBottom:"1px solid lightgray", marginTop:5}}>
                    <h3 style={{fontSize:"bigger"}}>{label}</h3>
                    {children}
                </div>
            )
        }
    },

    VertAlignShape:{
        Ribbon:{
            label:"Align Text",
            DropDown:true,
            icon:<IconVertAlign/>,
            icons:[<IconVertAlignTop/>,<IconVertAlignMiddle/>,<IconVertAlignBottom/>],
        }
    },

    LineShape:{
        Ribbon:{
            i:2,

            join:false,
            dashOffset:false,
            cap: false,
            miterLimit: false,
            
            opacity: false,
            
            style: false,
            compound: false,
            gradient:false,
        }
    },

    Text:{
        fonts: {
            style:{
                width: 100
            }
        },
		size: {
            FieldWrapper:({children})=>children,
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
            icon: <IconTextBorder/>
        },
		underline: {
            icon: <IconUnderlined/>
        },
		strike: {
            icon: <IconStrike/>
        },
		vertAlign: {
            icons:[<IconSubscript/>, <IconSuperscript/>],
        },
        Ribbon:{
            scale:false,
            spacing:false,
            position:false,
            kerning:false,
            emphasizeMark:false,
            vanish: false
        },
        Dialog:{
            emphasizeMark:<oneOf values={["."]} style={{width:100}}/>,
            underline:<oneOf values={[]}/>,
            strike:<oneOf values={[]}/>,
            border:<oneOf values={[]}/>,
        }
    },
    Paragraph:{
        End:false,
        defaultStyle:false,
        wrap:false,
        
        Ribbon:{
            spacing:{
                lineHeight:false,
                top:{
                    label:"spacing top",
                    placeholder:"top",
                    defaultValue:"0cm"
                },
                bottom:{
                    defaultValue:"0cm"
                }
            },
            indent:{
                firstLine:false,
                left:{
                    label:"intent left",
                    placeholder:"left",
                }
            },
            align:{
                icons:[<IconAlignLeft/>,<IconAlignRight/>,<IconAlignCenter/>,<IconAlignJustify/>]
            }
        },
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
                DropDown={true} 
                onClick={false} 
                icon={<IconSize/>}
                />,
            orientation:{
                DropDown: true,
                onClick:false,
                icon: <IconOrientation/>,
            },
            margin:<oneOf 
                values={["2.54cm","1.27cm",{top:"2.54cm",bottom:"2.54",left:"1.91cm",right:"1.91cm"},{top:"2.54cm",bottom:"2.54",left:"5.08cm",right:"5.08cm"},{top:"2.54cm",bottom:"2.54",left:"3.18cm",right:"2.54cm"},"-"]}
                labels={["Normal","Narrow","Moderate","Wide","Mirrored"]} 
                onClick={false} 
                DropDown={true} 
                icon={<IconMargin/>}
                children={<MenuItem primaryText="Custom Margins..." onClick={e=>setting("page")}/>}
                />,
            cols:<oneOf
                onClick={false}
                DropDown={true}
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

    },
	Table:{
        Ribbon:{
            width:false,
            headers:false,
            footers:false,
            cols:false,
            indent:false,
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
            margin:false,
            rowSpan:false,
            colSpan:false,
            border:{
                width:<oneOf label="Line Weights" 
                    values={[...LineWeights]}
                    DropDown={true}
                    icon={<IconOutlineShape/>}
                    labels={LineWeights.map(a=><span><i style={{fontSize:9}}>{a}pt</i><hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/></span>)}
                    />,
                dashArray:<oneOf label="Line Styles"
                    values={[...LineDashes]}
                    DropDown={true}
                    icon={<IconOutlineShape/>}
                    labels={LineDashes.map(a=><svg viewBox="0 0 30 10"><line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/></svg>)}
                    />,
                sketched:false,

                children:<oneOf DropDown={true}
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
                        children={<MenuItem primaryText="Borders And Shadings..." onClick={e=>setting('table')}/>}
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
                    DropDown:true,
                    onClick:false,
                    label:"Wrap Mode"
                },
                side:{
                    icon:<IconWrapSide/>,
                    DropDown:true,
                    onClick:false,
                    label:"Wrap Side"
                },
                distance:false,
            }
        }
    },
    Shape:{
        Ribbon:{
            geometry:<shape schema={{width:dom.Shape.UnitShape,height:dom.Shape.UnitShape}}/>,
            outline:{
                i:2,
                icon:<IconOutlineShape/>,
                Wrapper:ShapeAsMenu,

                width:<oneOf label="Weight" 
                    values={[...LineWeights,"-"]}
                    labels={LineWeights.map(a=><span><i style={{fontSize:9}}>{a}pt</i><hr style={{width:"100%",border:0, borderTop:`${a}pt solid lightgray`}}/></span>)}
                    children={<MenuItem primaryText="More Lines..."/>}
                    />,
                dashArray:<oneOf label="Dashes"
                    values={[...LineDashes,"-"]}
                    labels={LineDashes.map(a=><svg viewBox="0 0 30 10"><line {...{x1:0,x2:30,y1:5,y2:5,strokeDasharray:a,stroke:"black"}}/></svg>)}
                    children={<MenuItem primaryText="More Lines..."/>}
                    />,
                sketched:<oneOf label="Sketch"
                    values={[...LineSketches,"-"]}
                    labels={LineSketches.map(d=><svg viewBox="0 0 30 10"><path {...{stroke:"black",d}}/></svg>)}
                    children={<MenuItem primaryText="More Lines..."/>}
                    />,
            },
            fill: {
                i:0,
                icon:<IconFillShape/>,
                Wrapper:ShapeAsMenu,

                transparency:false,
                gradient:<oneOf label="Gradient" 
                    values={[...FillGradients,"-"]}
                    Layout="grid"
                    Item={({value, onClick})=><Gradient value={value} onClick={onClick}/>}
                    children={<MenuItem primaryText="More Gradients..." onClick={e=>setting("shape")}/>}
                    />,
                picture:{
                    spread:true,
                    $type0:<string label="Picture..." accept="image/*"/>,
                    $type1:<oneOf label="Texture" 
                        values={[...FillTextures,"-"]}
                        Layout="grid"
                        Item={({value,onClick})=><img src={value} onClick={onClick} style={{width:45,height:45}}/>}
                        children={<MenuItem primaryText="More Textures..." onClick={e=>setting("shape")}/>}
                        />
                },
                pattern: <oneOf label="Pattern" 
                    values={[...FillPatterns,"-"]}
                    Layout="grid"
                    Item={({value,onClick})=><Pattern value={value} onClick={onClick}/>}
                    children={<MenuItem primaryText="More Patterns..." onClick={e=>setting("shape")}/>}
                    />
            },
            rotate: <oneOf 
                values={[90,-90,"-"]} 
                DropDown={true} 
                onClick={false} 
                icon={<IconRotate/>} 
                children={<MenuItem primaryText="More Rotation Options..." onClick={e=>setting("shape")}/>}
                />,
            scale: {
                style:{
                    width:50
                }
            },

            editableSpots: false,
            clip: false,
            autofit: false,
            autofitHeight: false,
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
const Pattern=({value, onClick, id=`ptn_${uuid++}`})=>(
    <svg style={{width:45,height:45}} onClick={onClick}>
        <defs>
            <pattern id={id} viewBox="0,0,10,10" width="20%" height="20%">
                {value}
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
    </svg>
)

export default Theme