import React, {PropTypes} from "react"

import get from "lodash.get"

import {HasParentAndChild} from "./composable"
import Base from "../section"

import Group from "./composed/group"
import Header from "./header"
import Footer from "./footer"

const Super=HasParentAndChild(Base)
export default class Section extends Super{
    constructor(){
		super(...arguments)
		this.computed.headers={}
		this.computed.footers={}
	}

    /**
     * i: column no
     */
    _newColumn(i){
		const {pgSz:{width, height},  pgMar:{top, bottom, left, right}, cols:{num, space, data}}=this.props
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
		const pageNo=this.computed.composed.length+1
		let headerEl=this.getPageHeaderFooter('header',pageNo)
		let footerEl=this.getPageHeaderFooter('footer',pageNo)
        let info={
            size,
            margin,
            columns:[this._newColumn(0)],
            header: headerEl ? headerEl.createComposed2Parent() : null,
            footer: footerEl ? footerEl.createComposed2Parent() : null
        }
		this.context.parent.appendComposed(info)
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

	getPageHeaderFooter(category, pageNo){
		category=this.computed[`${category}s`]
		return get(category,`${pageNo==1 ? 'first' : pageNo%2==0 ? 'even' : 'odd'}`,get(category,`default`))
	}

	on1ChildComposed(child){
		super.on1ChildComposed(...arguments)
		if(child instanceof Footer){
			this.computed.footers[child.props.type]=child
		}else if(child instanceof Header){
			this.computed.headers[child.props.type]=child
		}
	}
}
