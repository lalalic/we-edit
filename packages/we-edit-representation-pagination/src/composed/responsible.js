import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {setDisplayName,compose, getContext} from "recompose"
import Waypoint from "react-waypoint"

import {getSelection, ACTION, Cursor, Selection,connect,ContentQuery} from "we-edit"
import offset from "mouse-event-offset"

import {Document as ComposedDocument,Group} from "../composed"
import SelectionShape from "./selection"
import Locator from "./locator"
import Positioning from "./positioning"

const CursorShape=({y=0,x=0,height=0,color="black"})=>(
    <Cursor.Flash color={color}><path d={`M${x} ${y} v${height}`} strokeWidth={1}/></Cursor.Flash>
)

export default connect(null,null,null,{withRef:true})(class Responsible extends Component{
    static displayName="composed-document-with-cursor"

	static childContextTypes={
        onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
	}

    scale=this.props.scale
    onMove=this.onMove.bind(this)
    onResize=this.onResize.bind(this)
    onRotate=this.onRotate.bind(this)
    selecting=React.createRef()
    positioning=new Positioning()
    getComposer=this.getComposer.bind(this)
    getContent=this.getContent.bind(this)

	getChildContext(){
		return {
			onPageHide:e=>this.updateCursorAndSelection(),
            onPageShow:e=>this.updateCursorAndSelection(),
		}
	}

    get locator(){
        if(this.refs.locator)
        return this.refs.locator.getWrappedInstance()
    }

	get dispatch(){
		return this.props.dispatch
	}

	get selection(){
        if(this.refs.locator)
		      return this.locator.props.selection.toJS()
	}

	get cursor(){
		const {cursorAt, ...a}=this.selection
        return a[cursorAt]
	}

	getComposer(id){
		return this.props.getComposer(id)
	}

	getContent(id){
        return ContentQuery.fromContent(this.props.content,  id ? `#${id}`  : undefined)
	}

    updateCursorAndSelection(){
        //this.locator.setState({})
    }

	getComposeTrigger(){
		const {continueCompose:{isAllComposed, isSelectionComposed, compose4Selection, compose4Scroll}, pages, pgGap}=this.props
		const notifyLocator=callback=>{
			if(this.locator){
				this.locator.setState({content:null,canvas:null},callback)
			}else{
				callback()
			}
		}

		return <ComposeMoreTrigger
					y={()=>ComposedDocument.composedY(pages, pgGap)}
					isSelectionComposed={isSelectionComposed}
					compose4Selection={a=>{
						if(!isAllComposed()){
							notifyLocator(compose4Selection)
						}
					}}
					compose4Scroll={y=>{
						if(!isAllComposed()){
							notifyLocator(()=>compose4Scroll(y))
						}
					}}
					/>
	}

    render(){
        const {children,docId, continueCompose, getComposer,dispatch, ...props}=this.props
        return (
            <ComposedDocument {...props}
				innerRef={a=>{this.canvas=a}}
                onClick={e=>{
                    if(this.selected){
                        this.selected=false
                    }else{
                        this.onClick(e)
                    }
                }}
				onMouseMove={e=>{
                    const {buttons, target, clientX:left,clientY:top}=e
					if(!(buttons&0x1))
						return
                    const {id,x,node}=this.positioning.around(target, left,top)
                    if(id){
                        const at=this.getComposer(id).distanceAt(x, node)
                        const end={id,at}
                        let {start=end}=this.selecting.current.state

                        const rects=start==end ? [] : this.positioning.getRangeRects(start, end)
                        this.selecting.current.setState(({start})=>({start:start||end, end, rects, selecting:true}))
                    }
				}}
                onMouseUp={e=>{
                    const {buttons}=e
					if(!(buttons&0x1))
						return
                    const {start,end}=this.selecting.current.state
                    if(start && end){
                        this.selecting.current.setState({start:undefined, end:undefined, rects:undefined,selecting:false})
                        this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
                        this.selected=true
                    }
				}}
				>
				<Fragment>
                    {children}
					{this.getComposeTrigger()}
					<Locator
                        docId={docId}
                        scale={this.props.scale}
                        positioning={this.positioning}
                        ref="locator"
                        cursor={
                            <Cursor
                                dispatch={dispatch}
                                keys={{
									37:e=>this.onKeyArrowLeft(e),//move left
									38:e=>this.onKeyArrowUp(e),//move up
									39:e=>this.onKeyArrowRight(e),//move right
									40:e=>this.onKeyArrowDown(e),//move down
								}}
								>

								<CursorShape/>

							</Cursor>
                        }
                        range={
                            <Selection onMove={this.onMove} onResize={this.onResize} onRotate={this.onRotate}>
        						<SelectionShape ref={this.selecting}
									asCanvasPoint={a=>this.positioning.asCanvasPoint(a)}
									/>
        					</Selection>
                        }
                        getComposer={getComposer}/>
				</Fragment>
            </ComposedDocument>
        )
    }

    componentDidUpdate({},state,snapshot){
        this.positioning.reset(this.getComposer, this.getContent, this.canvas, this.props.scale)
        this.locator && this.locator.setState({content:this.props.content, canvas:this.canvas})
        //this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

    componentDidMount(){
        this.positioning.reset(this.getComposer, this.getContent, this.canvas, this.props.scale)
        if(!this.selection.id){
            const {id,at}=this.locate("next","Cursorable","root")
            this.dispatch(ACTION.Cursor.AT(id,at))
        }
        this.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))
        this.locator && this.locator.setState({content:this.props.content, canvas:this.canvas})
        //this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

	componentWillMount1(){
		//this.emit(`co1mposed${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
	}

	componentWillUpdate1(){
		//this.emit(`composed${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
	}

    active(){
		this.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))
    }

    onRotate(e){
        this.dispatch(ACTION.Entity.ROTATE(e))
    }

    onResize(e){
        this.dispatch(ACTION.Entity.RESIZE(e))
    }

    onMove(id,at){
        this.dispatch(ACTION.Selection.MOVE(id,at))
    }

    onClick({shiftKey:selecting, target, clientX:left,clientY:top}){
		const {id,x,node}=this.positioning.around(target, left, top)
		if(id){
            if(this.getComposer(id).nextCursorable()===false){
                this.dispatch(ACTION.Selection.SELECT(id))
            }else{
    			const at=this.getComposer(id).distanceAt(x, node)
    			if(!selecting){
    				this.dispatch(ACTION.Cursor.AT(id,at))
    			}else{
    				let {end}=this.selection
    				let {left,top}=this.positioning.position(id,at)
    				let {left:left1,top:top1}=this.positioning.position(end.id,end.at)
    				if(top<top1 || (top==top1 && left<=left1)){
    					this.dispatch(ACTION.Selection.START_AT(id,at))
    				}else{
    					this.dispatch(ACTION.Selection.SELECT(end.id, end.at, id, at))
    				}
    			}
            }
		}

        this.active()
    }

	locate(nextOrprev, CursorableOrSelectable, id, at, inclusive=false){
		if(id==undefined){
			({id,at}=this.cursor)
		}

        const $=this.getContent(id)
        const next=(id,at)=>{
            let composer=this.getComposer(id)
            if(composer){
                return composer[`${nextOrprev}${CursorableOrSelectable}`](at,this.positioning)
            }
            return false
        }

        const location=((_id,_at)=>{
    		const check=a=>(_at=next(_id=a.get("id")))!==false
            if(inclusive){
    			$[`find${nextOrprev=="next" ? "First" :"Last"}`](check,true)
    		}else{
    			_at=next(_id,_at)
    		}

    		if(_at===false){
                $[`${nextOrprev=="next" ? "forward" : "backward"}Until`](check)
    		}
    		return {id:_id,at:_at}
        })(id,at);

        if(location.at!==false){
            const endingOrBegining=((id,at=false)=>{
                const $1=this.getContent(location.id)
                const differents=$.parentsUntil(a=>{
                    return $1.parents().has(this.getContent(a.get("id")))
                })
                differents.toArray().find(a=>{
                    return at=this.getComposer(id=a)[`${nextOrprev}${CursorableOrSelectable}`](-1,this.positioning)
                })
                if(at!==false){
                    return {id,at}
                }
            })();

            if(endingOrBegining)
                return endingOrBegining

            return location
        }

        return this.cursor
	}
	onKeyArrowLeft({shiftKey:selecting}){
        const {id,at}=this.locate("prev",selecting ? "Selectable" :"Cursorable")
        if(!selecting){
            this.dispatch(ACTION.Cursor.AT(id,at))
        }else{
            const {cursorAt}=this.selection
            if(cursorAt=="end"){
                this.dispatch(ACTION.Selection.END_AT(id,at))
            }else{
                this.dispatch(ACTION.Selection.START_AT(id,at))
            }
        }
	}

	onKeyArrowRight({shiftKey:selecting}){
        const {id,at}=this.locate("next",selecting ? "Selectable" :"Cursorable")
        if(!selecting){
            this.dispatch(ACTION.Cursor.AT(id,at))
        }else{
            const {cursorAt}=this.selection
            if(cursorAt=="start"){
                this.dispatch(ACTION.Selection.START_AT(id,at))
            }else{
                this.dispatch(ACTION.Selection.END_AT(id,at))
            }
        }
	}

	locateLine(nextOrPrev, cursorableOrSelectable){
		const cursor=this.cursor
		let {id, x, node}=this.positioning[`${nextOrPrev}Line`](cursor.id, cursor.at)
		let location=this.locate(nextOrPrev,cursorableOrSelectable,id,undefined,true)//inclusive
		if(id!==location.id){
			if(nextOrPrev=="next"){
				node=this.positioning.getClientRect(location.id).node
			}else{
				node=this.positioning.getClientRects(location.id).pop().node
			}
		}
		location.at=this.getComposer(location.id).distanceAt(x,node)
		return location
	}

	onKeyArrowUp({shiftKey:selecting}){
		const {id, at}=this.locateLine("prev", selecting ? "Selectable" : "Cursorable")
		if(!selecting){
			this.dispatch(ACTION.Cursor.AT(id,at))
		}else{
			const {start,end,cursorAt}=this.selection

			if(start.id==end.id && start.at==end.at){
				this.dispatch(ACTION.Selection.START_AT(id,at))
			}else{
				if(cursorAt=="start")
					this.dispatch(ACTION.Selection.START_AT(id,at))
				else if(cursorAt=="end"){
					let {left,top}=this.positioning.position(id,at)
					let {left:left0,top:top0}=this.positioning.position(start.id, start.at)
					if((top0==top && left<left0) //same line, new point is on the left of start
						|| (top<top0)) //above start point line
						{
						this.dispatch(ACTION.Selection.SELECT(id,at,start.id,start.at))
						this.dispatch(ACTION.Selection.START_AT(id,at))
					}else{
						this.dispatch(ACTION.Selection.END_AT(id,at))
					}
				}
			}
		}
	}

	onKeyArrowDown({shiftKey:selecting}){
		const {id, at}=this.locateLine("next", selecting ? "Selectable" : "Cursorable")
		if(!selecting){
			this.dispatch(ACTION.Cursor.AT(id,at))
		}else{
			const {start,end,cursorAt}=this.selection
			if(start.id==end.id && start.at==end.at){
				this.dispatch(ACTION.Selection.END_AT(id,at))
			}else{
				if(cursorAt=="end")
					this.dispatch(ACTION.Selection.END_AT(id,at))
				else if(cursorAt=="start"){
					let {left,top}=this.positioning.position(id,at)
					let {left:left1, top:top1}=this.positioning.position(end.id, end.at)
					if((top==top1 && left>left1) || (top>top1)){
						this.dispatch(ACTION.Selection.SELECT(end.id,end.at,id,at))
						this.dispatch(ACTION.Selection.END_AT(id,at))
					}else{
						this.dispatch(ACTION.Selection.START_AT(id,at))
					}
				}
			}
		}
	}
})

const ComposeMoreTrigger=compose(
	setDisplayName("More"),
	getContext({debug: PropTypes.bool}),
	connect(state=>({selection:getSelection(state)})),
)(class extends Component{
	shouldComponentUpdate({selection,isSelectionComposed,compose4Selection}){
		if(!isSelectionComposed(selection)){
			compose4Selection()
			return false
		}
		return true
	}

	render(){
		const {compose4Scroll,debug}=this.props
		const y=this.props.y()
		return (
			<Waypoint onEnter={()=>compose4Scroll(y)} >
                <Group y={y-100}>
                    <line x1="0" y1="0" x2="10" y2="0" strokeWidth="2" stroke={debug ? "red" : "transparent"}/>
                </Group>
			</Waypoint>
		)
	}
})
