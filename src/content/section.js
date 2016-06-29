import React, {Component, PropTypes} from "react"
import Any from "./any"

import Page from "../compose/page"
import Group from "../compose/group"

let suuid=0
export default class Section extends Any{
    static contextTypes=Object.assign({
        canvas: PropTypes.object
    }, Any.contextTypes)
	
	sectionId=suuid++
	
    compose(){
        super.compose()
        const {composed}=this
        if(composed.length==0)
			composed.push(this._newPage())
    }

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
                avoidInfiniteLoop++
                composed.push(currentPage=this._newPage(composed.length))
                currentColumn=currentPage.columns[0]
            }
            width=currentColumn.width
            height=currentColumn.height
            availableHeight=currentColumn.height
        }
        return {width, height:availableHeight}
    }
	
	_removeAllFrom(line){
		if(!line){
			this.composed.splice(0)
			this._finished=0
			this.children.splice(0)
			return
		}
		
		const {composed}=this
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
		let found=-1
		while(-1==(found=currentColumn.children.findIndex(group=>{//group/Line
			return group.props.children.props._id==line._id
		}))){
			columns.pop()
			if(columns.length){
				currentColumn=columns[columns.length-1]
				found=-1
			}else{
				composed.pop()
				if(composed.length){
					currentPage=composed[composed.length-1]
					({columns}=currentPage)
					currentColumn=columns[columns.length-1]
					found=-1
				}else {
					break
					//throw new Error("you should find the line from section, but not")
				}
			}
		}
		
		if(found!=-1){
			this._finished=currentColumn.children[found].props.index
			this.children.forEach((a,i)=>{
				if(i>this._finished){
					a._removeAllFrom()
				}
			})
			this.children.splice(this._finished)
			
			currentColumn.children.splice(found)
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

		children.push(<Group y={height-availableHeight} height={contentHeight} index={this._finished}>{line}</Group>)
        //@TODO: what if contentHeight still > availableHeight
    }

    finished(child){
        if(super.finished(child)){
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

			this.context.parent.appendComposed(<Group height={y} width={width} _id={this.sectionId}>{pages}</Group>)

			return true
		}

		return false
    }

	static defaultProps={
		page: {
			width: 300,
			height: 400,
			margin: 20
		}
	}
}
