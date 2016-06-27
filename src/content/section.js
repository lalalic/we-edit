import React, {Component, PropTypes} from "react"
import Any from "./any"

import Page from "../compose/page"
import Group from "../compose/group"

export default class Section extends Any{
    static contextTypes=Object.assign({
        canvas: PropTypes.object
    }, Any.contextTypes)

    render(){
        const {composed}=this.state
        const {canvas}=this.context
        let y=0
        return (
            <Group>
                <Group ref="content">
                    {this.props.children}
                </Group>
                <Group ref="composed">
                    {composed.map((page,i)=>{
                        let {width,height}=page
                        let newPage=(<Group x={(canvas.width-width)/2} y={y+=canvas.pageGap} key={i}><Page {...page}/></Group>)
                        y+=height
                        return newPage
                    })}
                </Group>
            </Group>
        )
    }

    compose(){
        const {composed}=this.state
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
        const {composed}=this.state
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

    append(line){
        const {composed}=this.state
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
		
		children.push(<Group y={height-availableHeight} height={contentHeight}>{line}</Group>)
        //@TODO: what if contentHeight still > availableHeight
    }

    finished(){
        if(super.finished()){
			const {composed}=this.state
			const {canvas}=this.context
			const {page:{width}}=this.props
			this.context.parent.append({
				width: width,
				height:composed.reduce((prev,a)=>prev+a.height+canvas.pageGap,0)
			})
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
