import React, { Fragment, PureComponent} from "react"
import {ACTION, whenSelectionChangeDiscardable, ReactQuery} from "we-edit"
import {Ribbon} from "we-edit-office"
import IconTextBox from "material-ui/svg-icons/editor/format-shapes"

export default whenSelectionChangeDiscardable()(
class DrawTextBox extends PureComponent{
    constructor(){
        super(...arguments)
        this.create=this.create.bind(this)
    }

    render(){
        const {props:{dispatch}, create, constructor:{TextBox}}=this
        return (
            <Ribbon.CheckIconButton hint="text box"
                onClick={e=>dispatch(ACTION.UI({draw:<TextBox create={create}/>}))}>
                <IconTextBox/>
            </Ribbon.CheckIconButton>
        )
    }

    /**
     * default pos is {column, paragraph}
     * @param {*} param0 
     */
    create({left,right,bottom,top}){
        const {selection:{positioning}, dispatch}=this.props
        dispatch(ACTION.UI({draw:null}))
        if(Math.abs((right-left)*(bottom-top))<1){
            return 
        }
        const p0={x:left, y:top}, p1={x:right,y:bottom}
        const [x,y,width,height]=[Math.min(p0.x, p1.x), Math.min(p0.y,p1.y),Math.abs(p0.x-p1.x), Math.abs(p1.y-p0.y)]
        
        const page=positioning.pages.find(({props:{I,height,Y=positioning.pageXY(I).y}})=>p0.y>Y && p0.y<Y+height)
        const $=new ReactQuery(page.createComposed2Parent())
        
        const {id=$.findFirst('[data-type="paragraph"]').attr('data-content')}=positioning.around(left,top)
        const paragraph=positioning.getContent(id).closest("paragraph").attr('id')

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

    static TextBox=class TextBox extends PureComponent{
        constructor(...args){
            super(...args)
            this.onMouseDown=this.onMouseDown.bind(this)
            this.onMouseMove=this.onMouseMove.bind(this)
            this.onMouseUp=this.onMouseUp.bind(this)
            this.state={drawing:false}
        }
        render(){
            const {
                onMouseDown, onMouseUp, onMouseMove,
                state:{left,top,bottom, right, width=Math.abs(right-left),height=Math.abs(bottom-top)},
                props:{style={width:"100%",height:"100%",fill:"red", cursor:"crosshair",opacity:0.6}}
            }=this
            return (
                <Fragment>
                    <rect {...{style, onMouseDown, onMouseUp, onMouseMove}}/>
                    {!!width && !!height && 
                        <g pointerEvents="none">
                            <rect 
                                style={{
                                    background:"white", 
                                    borderWidth:1,
                                    borderStyle:"solid",
                                    width,height,
                                    x:Math.min(left,right),
                                    y:Math.min(top,bottom),
                                }}/>
                            <text {...{x:Math.max(left,right),y:Math.max(top,bottom)}}>{width},{height}</text>
                        </g>
                    }
                </Fragment>
            )
        }
    
        asCanvasPoint(left,top, canvas){
            const point=canvas.createSVGPoint()
            point.x=left,point.y=top
            const {x,y}=point.matrixTransform(canvas.getScreenCTM().inverse())
            return {x, y}
        }
    
        onMouseDown(e){
            e.stopPropagation()
            const {x:left,y:top}=this.asCanvasPoint(e.clientX, e.clientY, e.currentTarget.ownerSVGElement)
            this.setState({left,top})
        }
    
        onMouseUp(e){
            e.stopPropagation()
            this.props.create(this.state)
        }
    
        onMouseMove(e){
            e.stopPropagation()
            const {x:right,y:bottom}=this.asCanvasPoint(e.clientX, e.clientY, e.currentTarget.ownerSVGElement)
            if('left' in this.state){
                this.setState({bottom,right})
            }
        }
    }
})