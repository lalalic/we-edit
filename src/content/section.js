import React, {Component, PropTypes} from "react"
import Any from "./any"

import Page from "../composed/page"
import Group from "../composed/group"

export default class Section extends Any{
    static contextTypes=Object.assign({
        canvas: PropTypes.object
    }, Any.contextTypes)
    displayName="section"

    /**
     * i: column no
     */
    _newColumn(i){
        const {page:{width,height,margin}}=this.props
        //@TODO:

        return {
            x:margin,
            y:margin,
            width: width-2*margin,
            height:height-2*margin,
            children:[]
        }
    }

    /**
     * i : page No, for first, even, odd page
     */
    _newPage(i){
        const {page:{width,height,margin}}=this.props
        return {
            width,
            height,
            margin,
            columns:[this._newColumn(0)],
            header:null,
            footer:null
        }
    }

    nextAvailableSpace(required={}){
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this
		if(composed.length==0){
			composed.push(this._newPage())
		}
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

        //@TODO: what if never can find min area
        while(availableHeight<=minRequiredH || width<minRequiredW){
            if(this.props.page.columns>columns.length){// new column
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

	_reComposeFrom(content){
        const {composed}=this
		const {_id: targetId}=content
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
		let found=-1
		while(-1==(found=currentColumn.children.findIndex(group=>{//group/Line
			return group.props.children.props._id==targetId
		}))){
			columns.pop()
			if(columns.length){
				currentColumn=columns[columns.length-1]
				found=-1
			}else{
				composed.pop()
				if(composed.length){
					currentPage=composed[composed.length-1];
					({columns}=currentPage);
					currentColumn=columns[columns.length-1];
					found=-1
				}else {
					break
					//throw new Error("you should find the line from section, but not")
				}
			}
		}

		if(found!=-1){
			const index=currentColumn.children[found].props.index
			currentColumn.children.splice(found)

			const removed=this.children.splice(index)

			const composedTime=new Date().toString()
			removed.forEach((a,i)=>{
				a._reComposeFrom()
				/**
				 *  do re-compose job
				 */
				a.setState({composedTime})
			})
		}else{
			throw new Error("you should find the line from section, but not")
		}
	}

    appendComposed(line){
        const {composed}=this
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

        const {height:contentHeight}=line.props

		if(contentHeight>availableHeight){
            if(this.props.page.columns>columns.length){// new column
                columns.push(currentColumn=this._newColumn(columns.length))
            }else{//new page
                composed.push(currentPage=this._newPage(composed.length))
                currentColumn=currentPage.columns[0]
            }
            availableHeight=currentColumn.height

            //@TODO: what if currentColumn.width!=line.width

            children=currentColumn.children
        }

		children.push(<Group y={height-availableHeight} height={contentHeight} index={this.children.length}>{line}</Group>)
        //@TODO: what if contentHeight still > availableHeight
    }

    onAllChildrenComposed(){
		const {composed}=this
		const {canvas}=this.context
		const {page:{width}}=this.props

		let y=0
		let pages=composed.map((page,i)=>{
			let {width,height}=page
			let newPage=(<Group x={(canvas.width-width)/2} y={y+=canvas.pageGap} key={i}><Page {...page}/></Group>)
			y+=height
			return newPage
		})

		this.context.parent.appendComposed(<Group height={y} width={width} _id={this._id}>{pages}</Group>)

		super.onAllChildrenComposed()
    }

	static defaultProps={
		page: {
			width: 300,
			height: 400,
			margin: 20
		}
	}

	static propTypes={
		page: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired,
			margin: PropTypes.number.isRequired
		})
	}
}
