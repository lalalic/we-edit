import React from "react"
import SvgIcon from "material-ui/SvgIcon"
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

export default {
    Text:{
        fonts: {
            style:{
                width: 100
            }
        },
		size: {
            style:{
                width: 50
            }
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
            Ribbon:false
        },
		indent: {
            Ribbon:false
        },

		align:{

        },
		
		numbering: {
            Ribbon:true,
            Dialog:false,
        },
		
		defaultStyle:{
            Ribbon:false
        },

		widow:{
            Ribbon:false
        },
		orphan: {
            Ribbon:false
        },
		keepLines: {
            Ribbon:false
        },
		keepWithNext: {
            Ribbon:false
        },
		wrap: {
            Ribbon:false
        },
        End: {
            Ribbon:false,
        }
    },
    Section:{

    },
	Page:{

    },
	Shape:{

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

    },
}