import React, {Component, PropTypes} from "react"
import Any from "./any"
import Frame from "../composed/frame"

export default class extends Any{
    static displayName="frame"

    /**
     * i: column no
     */
    _newColumn(i){
        const {size:{width, height},  margin:{top, bottom, left, right}, cols:{num=1, space, data}}=this.props
        let info={
            y:0,
            height:height-bottom-top,
            children:[]
        }
        let availableWidth=width-left-right

        if(num==1){
            info.width=availableWidth
            info.x=0
        }else if(data){
            info.x=data.reduce((p, a, j)=>(j<i ? p+a.width+a.space : p),0)
            info.width=data[i].width
        }else{
            let colWidth=(availableWidth-(num-1)*space)/num
            info.x=i*(colWidth+space)
            info.width=colWidth
        }
        return info
    }

    compose(){
        this.computed.composed.push(this._newColumn())
    }


    nextAvailableSpace(required={}){
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this.computed
		const {cols:{num:allowedColumns=1}}=this.props
        let currentColumn=composed[composed.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

        //@TODO: what if never can find min area
        while(availableHeight<=minRequiredH || width<minRequiredW){
            if(allowedColumns>columns.length){// new column
                columns.push(currentColumn=this._newColumn(columns.length))
            }else{
                return {width:0,height:0}
            }
            width=currentColumn.width
            height=currentColumn.height
            availableHeight=currentColumn.height
        }
        return {width, height:availableHeight}
    }

    appendComposed(line){
        const {composed}=this.computed
		const {cols:{num:allowedColumns=1}}=this.props
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

        const {height:contentHeight}=line.props

		if(contentHeight>availableHeight){
            if(allowedColumns>columns.length){// new column
                columns.push(currentColumn=this._newColumn(columns.length))
            }else{
                return
            }
            availableHeight=currentColumn.height

            //@TODO: what if currentColumn.width!=line.width

            children=currentColumn.children
        }

		children.push(this.createComposed2Parent({children:line, height:contentHeight, y: height-availableHeight}))
        //@TODO: what if contentHeight still > availableHeight
    }

	/**
	 *  section needn't append to document, but give chance for extension
	 */
	createComposed2Parent(props){
		return <Group {...props}/>
	}

    onAllChildrenComposed(){
        const {size:{width,height}, margin}=this.props
        this.context.parent.appendComposed(<Frame width={width} height={height} margin={margin} columns={this.composed}/>)
        super.onAllChildrenComposed()
    }

    static propTypes={
		size: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),
		margin: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number,
		}),
		cols: PropTypes.object
	}

    static defaultProps={
		size: {
			width: 300,
			height: 400
		},
		margin:{
			left:20,
			right:20,
			top:20,
			bottom:20
		}
	}
}
