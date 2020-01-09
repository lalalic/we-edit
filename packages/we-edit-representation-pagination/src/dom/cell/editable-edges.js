import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"
import {connect, ACTION} from "we-edit"

import {ColSelector, RowSelector} from "./selector"
import {ColResizer, RowResizer} from "./resizer"
import Edges from "./edges"

export default connect()(class EditableEdges extends Component{
	static contextTypes={
		editable:PropTypes.any,
	}
	render(){
		const {isFirstRowInPage, isLastRankOfRow, table,row, cell,i,width,height,dispatch}=this.props
		if(!this.context.editable)
			return <Edges {...this.props}/>
                
        return (
            <Fragment>
                <Edges {...this.props}/>

                {isFirstRowInPage && <ColSelector/>}

                {isLastRankOfRow && <RowResizer x1={0} x2={width} y1={height} y2={height}
                    onResize={({y})=>{
                        dispatch(ACTION.Entity.UPDATE({id:table, type:"table",height:{value:height+y,row,cell,i}}))
                    }}
                    /> || null
                }

                {i==0  && <RowSelector x1={0} x2={0} y1={0} y2={height}
                    onSelect={()=>dispatch(ACTION.Selection.SELECT(row))}/>}

                <ColResizer x1={width} y1={0} x2={width} y2={height}
                    onResize={({x})=>{
						dispatch(ACTION.Entity.UPDATE({id:table, type:"table", width:{value:width+x, row, cell,i}}))
                    }}
                    />
            </Fragment>
        )
    }
})



