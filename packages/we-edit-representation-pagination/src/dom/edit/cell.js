import React, {PureComponent, Fragment} from "react"
import {connect, ACTION} from "we-edit"
import {editable} from "../../composable"
import Base from "../cell"

import Resizable from "../../composed/responsible-canvas/selection/resizable"
import Top from "../../composed/responsible-canvas/selection/top"
import {Group} from "../../composed"

export default class __$1 extends editable(Base){
    /**
     * it make table be responsible when editing, such as select/resize column/row
     */
    static Edges=class EditableEdges extends PureComponent{
        render(){
            const {isFirstRowInPage, isLastRankOfRow, table,row, cell,i,width,height}=this.props
            return (
                <Fragment>
                    <Base.Edges {...this.props}/>
                    {isFirstRowInPage && <ColSelector/>}
                    {isLastRankOfRow && <RowResizer x1={0} x2={width} y1={height} y2={height}
                        onResize={({y},dispatch)=>{
                            dispatch(ACTION.Entity.UPDATE({id:table, type:"table",height:{value:height+y,row,cell,i}}))
                        }}
                        /> || null
                    }
                    {i==0  && <RowSelector x1={0} x2={0} y1={0} y2={height}
					    onSelect={dispatch=>dispatch(ACTION.Selection.SELECT(row))}/>}
                    <ColResizer x1={width} y1={0} x2={width} y2={height}
                        onResize={({x},dispatch)=>{
                            dispatch(ACTION.Entity.UPDATE({id:table, type:"table", width:{value:width+x, row, cell,i}}))
                        }}
                        />
                </Fragment>
            )
        }
    }
}

const NoShow="transparent"
const Resizer=connect()(class __$1 extends PureComponent{
	constructor(){
		super(...arguments)
		this.state={resizing:false}
		this.resize=a=>this.props.onResize(a,this.props.dispatch)
	}
	render(){
		const {resizing}=this.state
		const {dispatch,onResize,direction="ew", cursor="col-resize", ...props}=this.props
		let y=direction=="ew" ? 'y' :'x'
		let top={[y]:0}
		let topLine={[y+'1']:"-100%", [y+'2']:"100%"}
		return (
			<Fragment>
				{resizing &&
					<Top {...top}>
						<line {...props} {...topLine}
							stroke="lightgray"
							strokeWidth={1}
							strokeDasharray="5,5"/>
					</Top>
				}
				<Resizable
					direction={direction}
					onStart={e=>this.setState({resizing:true})}
					onEnd={e=>this.setState({resizing:false})}

					onResize={this.resize}>
					<line {...props}
						stroke={NoShow}
						strokeWidth={5}
						style={{cursor}}
						/>
				</Resizable>
			</Fragment>
		)
	}
})
const ColResizer=props=><Resizer {...props} direction="ew" cursor="col-resize"/>
const RowResizer=props=><Resizer {...props} direction="-ns" cursor="row-resize"/>


const Selector=connect()(class __$1 extends PureComponent{
	render(){
		const {dispatch, onSelect, cursor, size=5,...props}=this.props
		return <line {...props}
				stroke={NoShow}
				strokeWidth={size}
				style={{cursor}}
				onClick={e=>onSelect(dispatch)}
				/>
	}
})
const RowSelector=props=><Selector {...props} cursor="e-resize"/>
const ColSelector=props=><Selector {...props} cursor="s-resize"/>

const Adder=connect()(class __$1 extends PureComponent{
	state={show:false}
	render(){
		const {show}=this.state
		let {x,y, dispatch,onAdd,type}=this.props
		return (
			<Group x={x} y={y}>
				<Group x={-12} y={-22}>
					<Group rotate={`${type=="row" ? "-90 12 22" : ""}`}>
						<use xlinkHref="#table.adder"
							stroke={show ? "black" : NoShow}
							onMouseOver={e=>this.setState({show:true})}
							onMouseLeave={e=>this.setState({show:false})}
							onClick={()=>onAdd(dispatch)}
							/>
				   	</Group>
				</Group>
			</Group>
		)
	}
})
const RowAdder=props=><Adder {...props} type="row"/>
const ColAdder=props=><Adder {...props} type="col"/>

