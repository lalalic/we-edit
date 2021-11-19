import React, { Fragment } from "react"
import {dom} from "we-edit"
import PropTypes from "prop-types"
import base from "./one-of-type"
import MenuItem from "material-ui/MenuItem"


export default class NumberingShape extends base{
    static NumberFormatShape=PropTypes.oneOf([])
    static BulletShape=PropTypes.oneOfType([
        PropTypes.oneOf([
            {style:{fonts:"Arial"},label:String.fromCharCode(0x25CF)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x25CB)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x25A0)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x2666)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x263A)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x263B)},
        ],{
            DropDown:(({label,style:{fonts}, ...props})=><MenuItem primaryText={label} {...props} style={{fontFamily:fonts}} />)
        }),
        PropTypes.shape({
            style: this.TextStyleShape,
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    url: PropTypes.string.isRequired
                })
            ]),

            align: this.AlignShape,
            indent: this.UnitShape,
            hanging: this.UnitShape,
        })
    ])

    static NumberingShape=PropTypes.oneOfType([
        PropTypes.oneOf([
            {format:"decimal",label:"%1."},
			{format:"lowerLetter",label:"%1."},
			{format:"upperLetter",label:"%1."},
			{format:"lowerRoman",label:"%1."},
			{format:"upperRoman",label:"%1."},
			{format:"chinese",label:"%1"},
        ],{
            DropDown:(({format, label, ...props})=><MenuItem primaryText={label.replace("%1",Numberings[format](0))} {...props}/>)
        }),
        PropTypes.shape({
            style: this.TextStyleShape,
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    url: PropTypes.string.isRequired
                })
            ]),
            format: this.NumberFormatShape,
            align: this.AlignShape,
            indent: this.UnitShape,
            hanging: this.UnitShape,
        })
    ])

    static MultiLevelNumberingShape=PropTypes.oneOfType([
        PropTypes.oneOf([
            {format:"decimal",label:"%1."},
			{format:"lowerLetter",label:"%1."},
			{format:"upperLetter",label:"%1."},
			{format:"lowerRoman",label:"%1."},
			{format:"upperRoman",label:"%1."},
			{format:"chinese",label:"%1"},
        ],{ondemand:true}),

        PropTypes.shape({
            style: this.TextStyleShape,
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    url: PropTypes.string.isRequired
                })
            ]),
            format: this.NumberFormatShape,
            align: this.AlignShape,
            indent: this.UnitShape,
            hanging: this.UnitShape,
            level: PropTypes.number,
        })
    ])

    static defaultProps={
        types:[
            this.BulletShape,
            this.NumberingShape,
            this.MultiLevelNumberingShape,
        ],
        spread:true
    }

    render(){
        return null
    }
}