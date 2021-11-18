import React from "react"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

import IconVanish from "material-ui/svg-icons/editor/format-clear"
import IconStrike from "material-ui/svg-icons/editor/strikethrough-s"
import IconBackground from "material-ui/svg-icons/editor/format-color-fill"
import IconTextColor from "material-ui/svg-icons/editor/format-color-text"
import {IconSubscript, IconSuperscript, IconTextBorder } from "../../text/icons"

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