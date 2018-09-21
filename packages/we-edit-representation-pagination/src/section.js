import React from "react"
import PropTypes from "prop-types"


import get from "lodash.get"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Section:Base}=models

import {Group} from "./composed"
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
		const {pgSz:{width, height},  pgMar:{top, bottom, left, right}, cols=[{space:0,width:width-left-right}]}=this.props
		let info={
            type:"column",
			y:0,
			height:height-bottom-top,
            children:[],
			x: cols.reduce((p, a, j)=>(j<i ? p+a.width+a.space : p),0),
			width: cols[i].width
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
            type:"page",
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
		const {cols,allowedColumns=cols ? cols.length : 1}=this.props
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

		let looped=0
        //@TODO: what if never can find min area
        while(minRequiredH-availableHeight>1 || minRequiredW-width>1){
            if(allowedColumns>columns.length){// new column
                columns.push(currentColumn=this._newColumn(columns.length))
            }else{//new page
				composed.push(currentPage=this._newPage(composed.length))
                currentColumn=currentPage.columns[0]
            }
            width=currentColumn.width
            height=currentColumn.height
            availableHeight=currentColumn.height
			if(looped++>3){
				console.warn("section can't find required space")
				break
			}
        }
        return {width, height:availableHeight}
    }

    appendComposed(line){
        const {composed}=this.computed
		if(composed.length==0)
			this.computed.composed.push(this._newPage())
		const {cols,allowedColumns=cols ? cols.length : 1}=this.props
        let currentPage=composed[composed.length-1]
        let {columns}=currentPage
        let currentColumn=columns[columns.length-1]
        let {width,height, children}=currentColumn
        let availableHeight=children.reduce((prev, a)=>prev-a.props.height,height)

        const {height:contentHeight}=line.props

		if(contentHeight-availableHeight>1){
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

    appendComposedHeader(header,type){
        this.computed.headers[type]=header
    }

    appendComposedFooter(footer,type){
        this.computed.footers[type]=footer
    }
}
