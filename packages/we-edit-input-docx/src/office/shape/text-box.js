import React, {Component, Fragment} from "react"
import {createPortal} from "react-dom"
import PropTypes from "prop-types"
import {ACTION, whenSelectionChangeDiscardable, ReactQuery} from "we-edit"

import IconTextBox from "material-ui/svg-icons/editor/format-shapes"
import {ToolbarGroup, FlatButton,MenuItem,Divider,Tabs,Tab} from "material-ui"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"
import { compose } from "recompose"
import Positioning from "../../../../we-edit-representation-pagination/src/composed/responsible-canvas/positioning/base"

export default compose(
    whenSelectionChangeDiscardable()
)(
class TextBox extends Component{
    constructor(){
        super(...arguments)
        this.state={status:undefined}
        this.create=this.create.bind(this)
    }

    render(){
        const {state:{status}, props:{selection, dispatch}}=this
        return (
            <Fragment>
                <Ribbon.CheckIconButton label="text box" onClick={e=>this.setState({status:"drawing"})}>
                    <IconTextBox/>
                </Ribbon.CheckIconButton>
                {status=="drawing" && ((canvas, {left,top,width,height}=canvas.getBoundingClientRect())=>{
                    return createPortal(<this.constructor.Drawing {...{left,top,width,height, onEnd:this.create}}/>,canvas.parentNode)
                })(selection.positioning.responsible.canvas)}
            </Fragment>
        )
    }

    /**
     * default pos is {column, paragraph}
     * @param {*} param0 
     */
    create({left,right,bottom,top}){
        this.setState({status:null})
        if(Math.abs((right-left)*(bottom-top))<1){
            return 
        }
        const {selection, dispatch}=this.props
        const positioning=selection.positioning
        const p0=selection.positioning.responsible.asCanvasPoint({left,top})
        const p1=selection.positioning.responsible.asCanvasPoint({left:right,top:bottom})
        const [x,y,width,height]=[Math.min(p0.x, p1.x), Math.min(p0.y,p1.y),Math.abs(p0.x-p1.x), Math.abs(p1.y-p0.y)]
        
        const page=positioning.pages.find(({props:{I,height,Y=positioning.pageXY(I).y}})=>p0.y>Y && p0.y<Y+height)
        const $=new ReactQuery(page.createComposed2Parent())
        
        const {id=$.findFirst('[data-type="paragraph"]').attr('data-content')}=selection.positioning.around(left,top)
        const paragraph=selection.positioning.getContent(id).closest("paragraph").attr('id')

        const {first, parents}=$.findFirstAndParents(`[data-content="${paragraph}"]`)
        const y0=[...parents,first.get(0)].filter(a=>!!a).reduce((Y,{props:{y=0}})=>Y+y,positioning.pageXY(page.props.I).y)
        const l=first.attr('pagination').i

        const line=page.lines.find(({props:{pagination:{i,id}}})=>id==paragraph && i==l)
        const {column=page.columnIndexOf(line), cols, x0=cols[column].x}=page
        
        const run=l>1 ? first.findFirst('[data-type="run"]').attr('data-content') : undefined
        dispatch(ACTION.Entity.CREATE({
            type:'textbox',
            offset:{x:x-x0,y:y-y0},
            size:{width,height}, 
            paragraph, 
            run 
        }))
    }

    static Drawing=class Drawing extends Component{
        constructor(...args){
            super(...args)
            this.state={}
            this.start=this.start.bind(this)
            this.end=this.end.bind(this)
            this.drawing=this.drawing.bind(this)
        }

        render(){
            const {left,top,bottom, right, width=Math.abs(right-left),height=Math.abs(bottom-top)}=this.state
            return (
                <div style={{cursor:"crosshair", position:"absolute", background:"red", opacity:0.6, ...this.props}} 
                    onMouseDown={this.start}
                    onMouseUp={this.end}
                    onMouseMove={this.drawing}
                    >
                {!!width && !!height && 
                        <div 
                            style={{
                                position:"absolute", background:"white", borderWidth:1,borderStyle:"solid",
                                width,height,
                                left:Math.min(left, right)-this.props.left,
                                top:Math.min(top,bottom)-this.props.top,
                            }}>
                                {top},{bottom}
                        </div>
                    }
                </div>
            )
        }

        start({clientX:left, clientY:top}){
            this.setState({left,top})
        }

        end(){
            this.props.onEnd(this.state)
        }

        drawing({clientX:right, clientY:bottom}){
            if('left' in this.state){
                this.setState({bottom,right})
            }
        }
    }
})