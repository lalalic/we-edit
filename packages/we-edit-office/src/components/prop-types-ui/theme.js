import React, { Fragment } from "react"
import {dom} from "we-edit"
import SvgIcon from "material-ui/SvgIcon"
import { MenuItem } from "material-ui/Menu"
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


import ShapeAsMenu from "./shape-as-menu"
import PropTypesUI from "."

const IconSuperscript = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 3) scale(0.7)">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		</g>
		<text x="15" y="9" style={{ fontSize: 9 }}>2</text>
	</SvgIcon>
);
const IconSubscript = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 3) scale(0.7)">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		</g>
		<text x="15" y="20" style={{ fontSize: 9 }}>2</text>
	</SvgIcon>
);
const IconTextBorder = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
		</g>
		<path d="M2 2 h20v20h-20z" fill="none" stroke="black" />
	</SvgIcon>
);

const IconBlank=props=><path {...props} d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>

const IconSize=()=>(
	<SvgIcon>
		<g transform="translate(-3,-3)">
			<IconBlank transform="scale(0.6) translate(10,10)"/>
			<path d="M8 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue"/>
			<path d="M9 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue" transform="translate(9.5 -1) rotate(90)"/>
		</g>
	</SvgIcon>
)


const IconOrientation=props=>(
	<SvgIcon {...props}>
		<g transform="scale(0.8) translate(4 4)">
			<IconBlank transform="translate(-3 -1) scale(0.9)"/>
			<IconBlank transform="translate(24 4.5) scale(0.9) rotate(90)"/>
		</g>
	</SvgIcon>
)

const IconMargin=({children, ...props})=>(
	<SvgIcon {...props}>
		<path d="M4 2h16v20H4z" fill="none" stroke="black"/>
		
		{children || 
			<Fragment>
				<H/>
				<H transform="translate(10 0)"/>
				<V/>
				<V transform="translate(0 14)"/>
			</Fragment>
		}
	</SvgIcon>
)

const H=props=><path d="M7 2.5 v19" fill="none" stroke="blue" {...props}/>
const V=props=><path d="M4.5 5 h15" fill="none" stroke="blue" {...props}/>

const Column=props=><path d="M8.5 6.5v12" fill="none" stroke="blue" strokeWidth="5" strokeDasharray="1.5" {...props}/>
const IconColumn=({size=20, d=(24-size)/2, children,...props})=>(
	<SvgIcon {...props}>
		<path d="M4 2h16v20H4z" fill="none" stroke="black"/>
		{children}
	</SvgIcon>
)
const ColumnIcons=[
    <IconColumn>
        <Column d="M12 6.5v12" strokeWidth="12"/>
    </IconColumn>,
    <IconColumn>
        <Column/>
        <Column transform="translate(7 0)"/>
    </IconColumn>,
    <IconColumn>
        <Column strokeWidth="3"/>
        <Column strokeWidth="3" transform="translate(3.5 0)"/>
        <Column strokeWidth="3" transform="translate(7 0)"/>
    </IconColumn>,
    <IconColumn>
        <Column strokeWidth="3"/>
        <Column strokeWidth="7" transform="translate(6 0)"/>
    </IconColumn>,
    <IconColumn>
        <Column strokeWidth="7" transform="translate(1 0)"/>
        <Column strokeWidth="3" transform="translate(7 0)"/>
    </IconColumn>,
]

const LineWeights=[0.25,0.5,0.75,1,1.5,2.25,3,4.5,6]
const LineDashes=["","1", "4 2", "4 2 2 2", "6 2", "6 2 2 2","6 2 2 2 2 2"]
const LineSketches=["M0 5h30","M0 5h30"]

const FillGradients=[{type:"no",gradients:[]},{type:"light",gradients:[[1,"red",0.2],[]]},{type:"dark",gradients:[]}]
const FillTextures=[{type:"",textures:[]}]
const FillPatterns=[{type:"",patterns:[]}]

//shape input only be on root level
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
            vanish: false,
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
                children={<MenuItem primaryText="Custom Margins..." />}
                />,
            cols:<oneOf
                onClick={false}
                DropDown={true}
                values={[[1],[2],[3],[1,2],[2,1]]}
                labels={["One", "Two", "Three", "Left", "Right"]}
                icons={ColumnIcons}
                icon={
                    <IconColumn>
                        <Column/>
                        <Column transform="translate(7 0)"/>
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

    },
	Row:{

    },
	Cell:{

    },
	Frame:{

    },
	Anchor:{
        Ribbon:{
            x:false,
            y:<oneOf {...{
                    icon:<IconVertAlign/>,
                    label:"Align Text",
                    DropDown:true,
                    onClick:false,
                    values:dom.Anchor.VertAlignShape.Type.props.values,
                    icons:[<IconVertAlignTop/>,<IconVertAlignMiddle/>,<IconVertAlignBottom/>]
                }}/>,
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
                join:false,
                dashOffset:false,
                cap: false,
                miterLimit: false,
                
                opacity: false,
                
                style: false,
                compound: false,
            },
            fill: {
                i:0,
                icon:<IconFillShape/>,
                Wrapper:ShapeAsMenu,

                transparency:false,
                gradient:<oneOf label="Gradient" 
                    values={[...FillGradients,"-"]}
                    Item={({value, set, ...props})=>{
                        return (
                            <div style={{}}>
                                {value.gradients.map(a=><Gradient value={a} onClick={e=>set(a)}/>)}
                            </div>
                        )
                    }}
                    children={<MenuItem primaryText="More Gradients..."/>}
                    />,
                picture:{
                    spread:true,
                    $type0:<string label="Picture..." accept="image/*"/>,
                    $type1:<oneOf label="Texture" 
                        values={[...FillTextures,"-"]}
                        Item={({value,set,...props})=>{
                            return (
                                <div style={{}}>
                                    {value.textures.map(a=><Texture value={a} onClick={e=>set(a)}/>)}
                                </div>
                            )
                        }}
                        children={<MenuItem primaryText="More Textures..."/>}
                        />
                },
                pattern: <oneOf label="Pattern" 
                    values={[...FillPatterns,"-"]}
                    Item={({value,set,...props})=>{
                        return (
                            <div style={{}}>
                                {value.patterns.map(a=><Pattern value={a} onClick={e=>set(a)}/>)}
                            </div>
                        )
                    }}
                    children={<MenuItem primaryText="More Patterns..."/>}
                    />
            },
            rotate: <oneOf 
                values={[90,-90,"-"]} 
                DropDown={true} 
                onClick={false} 
                icon={<IconRotate/>} 
                children={<MenuItem primaryText="More Rotation Options..."/>}
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

const Gradient=props=>null
const Texture=props=>null
const Pattern=props=>null

export default Theme