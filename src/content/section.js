import React, {Component, PropTypes} from "react"
import Any from "./any"

import Group from "../composed/group"

export default class Section extends Any{
    static displayName="section"
	
	render(){
		const {header,footer}=this.props
		return (
			{Object.keys(header).map(a=>header[a])}
			{super.render()}
			{Object.keys(footer).map(a=>footer[a])}
		)
	}

    /**
     * i: column no
     */
    _newColumn(i){
		const {pgSz:{width, height},  pgMar:{top, bottom, left, right}, cols:{num=1, space, data}}=this.props
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

    /**
     * i : page No, for first, even, odd page
     */
    _newPage(i){
        const {pgSz:size,  pgMar:margin}=this.props
        let info={
            size,
            margin,
            columns:[this._newColumn(0)],
            header:null,
            footer:null
        }
		return info
    }

    nextAvailableSpace(required={}){
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this.computed
		if(composed.length==0)
			this.computed.composed.push(this._newPage())
		const {cols:{num:allowedColumns=1}}=this.props
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

        //@TODO: what if never can find min area
        while(availableHeight<=minRequiredH || width<minRequiredW){
            if(allowedColumns>columns.length){// new column
                columns.push(currentColumn=this._newColumn(columns.length))
            }else{//new page
				composed.push(currentPage=this._newPage(composed.length))
                currentColumn=currentPage.columns[0]
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
            }else{//new page
                this.context.parent.appendComposed(currentPage)
                composed.push(currentPage=this._newPage(composed.length))
                currentColumn=currentPage.columns[0]
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
        //don't check, and document will check against last page
        this.context.parent.appendComposed(this.computed.composed[this.computed.composed.length-1])
        super.onAllChildrenComposed()
    }

	static defaultProps={
		pgSz: {
			width: 300,
			height: 400
		},
		pgMar:{
			left:20,
			right:20,
			top:20,
			bottom:20,

			header:10,
			footer:10,

			gutter:0
		}
	}

	static propTypes={
		pgSz: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),
		pgMar: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number,

			header: PropTypes.number,
			footer: PropTypes.number,

			gutter: PropTypes.number,
		}),
		cols: PropTypes.object
	}
}
