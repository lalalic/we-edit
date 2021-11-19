
import React from "react"
import MenuItem from "material-ui/MenuItem"
import {Tabs, Tab} from "material-ui/Tabs"
import {dom} from "we-edit"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconListOutline from "material-ui/svg-icons/editor/pie-chart-outlined"
import oneOfType from "./one-of-type"
import shape from "./shape"
import OneOf from "./one-of"

const numberings=dom.Paragraph.numberings
export class ListShape extends oneOfType{
    static defaultProps={
        spread:true,
    }

    renderDialog(){
        return (
            <Tabs>
                <Tab label="Bullet">
                    <div>
                        <OneOf/>
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>
                <Tab label="Number">
                    <div>
                        <OneOf/>
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>
                <Tab label="Outline">
                    <div>
                        <OneOf/>
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

export class BulletListShape extends shape{
    static defaultProps={
        defaults:[
            {style:{fonts:"Arial"},label:String.fromCharCode(0x25CF)},
            {style:{fonts:"Arial"},label:String.fromCharCode(0x25CB)},
            {style:{fonts:"Arial"},label:String.fromCharCode(0x25A0)},
            {style:{fonts:"Arial"},label:String.fromCharCode(0x2666)},
            {style:{fonts:"Arial"},label:String.fromCharCode(0x263A)},
            {style:{fonts:"Arial"},label:String.fromCharCode(0x263B)},
        ]
    }
    renderRibbon(){
        const {defaults,schema, ...props}=this.props
        return <OneOf {...props}
                    label="bullet list"
                    icon={<IconListBullet/>}
                    check={({format="bullet"})=>format=="bullet"}
                    DropDown={(({label,style:{fonts}, ...props})=><MenuItem primaryText={label} {...props} style={{fontFamily:fonts}} />)}
                    values={defaults}
                    children={<MenuItem primaryText="Define New Bullet" onClick={e=>this.fire('bullet')}/>}
                    />
    }
}

export class NumberListShape extends shape{
    static defaultProps={
        defaults:[
            {format:"decimal",label:"%1."},
            {format:"lowerLetter",label:"%1."},
            {format:"upperLetter",label:"%1."},
            {format:"lowerRoman",label:"%1."},
            {format:"upperRoman",label:"%1."},
            {format:"chinese",label:"%1"},
        ]
    }

    renderRibbon(){
        const {defaults,schema, ...props}=this.props
        return <OneOf {...props}
                    label="nubering list"
                    icon={<IconListNumber/>}
                    check={({format="bullet"})=>format!=="bullet"}
                    DropDown={(({format, label, ...props})=><MenuItem primaryText={label.replace("%1",numberings[format](0))} {...props}/>)}
                    values={defaults}
                    children={<MenuItem primaryText="Define New Number List" onClick={e=>this.fire("numbering")}/>}
                    />
    }
}

export class OutlineListShape extends shape{
    static defaultProps={
        defaults:[
            {format:"decimal",label:"%1."},
            {format:"lowerLetter",label:"%1."},
            {format:"upperLetter",label:"%1."},
            {format:"lowerRoman",label:"%1."},
            {format:"upperRoman",label:"%1."},
            {format:"chinese",label:"%1"},
        ]
    }
    renderRibbon(){
        const {defaults, schema, ...props}=this.props
        return <OneOf {...props}
                    label="Outline list"
                    icon={<IconListOutline/>}
                    check={a=>false}
                    DropDown={(({format, label, ...props})=><MenuItem primaryText={label.replace("%1",numberings[format](0))} {...props}/>)}
                    values={defaults}
                    children={<MenuItem primaryText="Define New Outline List" onClick={e=>this.fire("outline")}/>}
                    />
    }
}