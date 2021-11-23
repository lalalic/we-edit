import React, { Fragment } from "react"
import SvgIcon from "material-ui/SvgIcon"
import { MenuItem } from "material-ui/Menu"
import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

import IconVanish from "material-ui/svg-icons/editor/format-clear"
import IconStrike from "material-ui/svg-icons/editor/strikethrough-s"
import IconBackground from "material-ui/svg-icons/editor/format-color-fill"
import IconTextColor from "material-ui/svg-icons/editor/format-color-text"

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

const IconPage=props=><path {...props} d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
const IconBlank=props=><path {...props} d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>

const Column=props=><path d="M8.5 6.5v12" fill="none" stroke="blue" strokeWidth="5" strokeDasharray="1.5" {...props}/>
const IconColumn=({size=20, d=(24-size)/2, children,...props})=>(
	<SvgIcon {...props}>
		<path d="M4 2h16v20H4z" fill="none" stroke="black"/>
		{children}
	</SvgIcon>
)

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

const IconLayout=({...props})=>(
    <SvgIcon {...props}>
        <IconPage transform="translate(0 -12)"/>
        <line strokeDasharray="2" stroke="blue" x1="0" x2="24" y1="12" y2="12" strokeWidth="2"/>
        <IconPage transform="translate(0 12)"/>
    </SvgIcon>
)

//shape input only be on root level
export default {
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
            Ribbon:false,
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
        scale:{
            Ribbon:false,
        },
		spacing: {
            Ribbon: false,
        },
		position: {
            Ribbon: false,
        },
		kerning: {
            Ribbon:false, 
        },
		emphasizeMark: {
            Ribbon:false,
        },
    },
    Paragraph:{
        spacing: {
            Ribbon:{
                lineHeight:false,
                top:{
                    label:"spacing top",
                    placeholder:"top",
                }
            },
        },
		indent: {
            Ribbon:{
                firstLine:false,
                left:{
                    label:"intent left",
                    placeholder:"left",
                }
            }
        },
    },
    Section:{
        Ribbon:{
            layout:<oneOf values={["Page","Column","Next Page", "Continuous", "Even Page", "Odd Page"]}
                DropDown={true}
                icon={<IconLayout/>}
                onClick={false}
                />
        }
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
                values={["Normal","Narrow","Moderate","Wide","Mirrored"]} 
                onClick={false} 
                DropDown={true} 
                icon={<IconMargin/>}
                children={<MenuItem primaryText="Custom Margins..." leftIcon={<SvgIcon/>} />}
                />
        },
    },
	Shape:{
        Ribbon:{
            geometry:false,
            outline:false,
            fill: false,
            //rotate: this.UnitShape,
            scale: {
                style:{
                    width:50
                }
            },
            //clip: PropTypes.bool,
            editableSpots: false,

            autofit: false,
            autofitHeight: false,
        }
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
        //wrap:false
    },
}