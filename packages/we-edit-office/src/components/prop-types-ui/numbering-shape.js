import React from "react"
import {dom} from "we-edit"
import PropTypes from "prop-types"
import MenuItem from "material-ui/MenuItem"
import {Tabs, Tab} from "material-ui/Tabs"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconListOutline from "material-ui/svg-icons/editor/pie-chart-outlined"

import shape from "./shape"
import OneOf from "./one-of"
import OneOfType from "./one-of-type"


const {numberings, NumberingShape:{Type:{props:{schema}}}}=dom.Paragraph
dom.Unknown.memorize(PropTypes)
export default class NumberingShape extends OneOfType{
    static NumberFormatShape=PropTypes.oneOf(["decimal","lowerLetter","upperLetter","lowerRoman","upperRoman","chinese"])
    static BulletListShape=PropTypes.shape({...schema,format:undefined,start:undefined,id:undefined,level:undefined},{$type:class BulletListShape extends shape{
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

        renderTab(){
            return <div>list</div>
        }
    }})

    static NumberListShape=PropTypes.shape({...schema,id:undefined},{$type:class NumberListShape extends shape{
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

        renderTab(){
            return <div>list</div>
        }
    }})

    static OutlineListShape=PropTypes.shape({...schema},{$type:class OutlineListShape extends shape{
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

        renderTab(){
            return <div>list</div>
        }
    }})

    renderRibbon(){
        const {constructor:{BulletListShape, NumberListShape, OutlineListShape}}=this
        return <OneOfType {...this.props} types={[BulletListShape, NumberListShape, OutlineListShape]} spread={true}/>
    }

    renderDialog(){
        return (
            <Tabs>
                <Tab label="Bulleted">
                    <div>
                        <this.constructor.BulletListShape.Type.type uiContext="Tab" {...this.props}/>
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>
                <Tab label="Numbered">
                    <div>
                        <this.constructor.NumberListShape.Type.type uiContext="Tab" {...this.props}/>
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>
                <Tab label="Outline Numbered">
                    <div>
                        <this.constructor.OutlineListShape.Type.type uiContext="Tab" {...this.props}/>
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>

                <Tab label="List Style">
                    <div>
                        {this.renderTab()}
                    </div>
                    <div>
                        <button>customize...</button>
                    </div>
                </Tab>
            </Tabs>
        )
    }

    renderTab(){
        return <div>list</div>
    }
}