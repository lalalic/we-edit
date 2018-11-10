import React from "react"
import PropTypes from "prop-types"


import get from "lodash.get"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Section:Base}=models

import {Group} from "./composed"
import Header from "./header"
import Footer from "./footer"
import Frame from "./frame"

const Super=HasParentAndChild(Base)
export default class Section extends Super{
    constructor(){
		super(...arguments)
		this.computed.headers={}
		this.computed.footers={}
	}

    _newColumn(){
        const i=this.currentPage.columns.length
        const {size:{width, height}, margin:{top, bottom, left, right},padding}=this.currentPage
		const {cols=[{space:0,width:width-left-right}]}=this.props

		const columnFrame=new Frame({
			...Frame.defaultProps,
            y:0,
			height:height-bottom-top-(padding.top||0)-(padding.bottom||0),
            children:[],
			x: cols.reduce((p, a, j)=>(j<i ? p+a.width+a.space : p),0),
			width: cols[i].width
		},{})
		this.currentPage.columns.push(columnFrame)
    }

    /**
     * i : page No, for first, even, odd page
     */
    _newPage(){
        const {pgSz:size,  pgMar:margin}=this.props
        const pageNo=this.computed.composed.length+1
		const headerComposer=this.getPageHeaderFooter('header',pageNo)
		const footerComposer=this.getPageHeaderFooter('footer',pageNo)
        const header=headerComposer ? headerComposer.createComposed2Parent() : null
        const footer=footerComposer ? footerComposer.createComposed2Parent() : null
        const headerAvailableHeight=margin.top-margin.header
        const footerAvailableHeight=margin.bottom-margin.footer
        const headerContentHeight=header ? header.props.height : 0
        const footerContentHeight=footer ? footer.props.height : 0
        const padding={top:0, bottom:0}
        if(headerContentHeight>headerAvailableHeight){
            padding.top=margin.header+headerContentHeight-margin.top
        }

        if(footerContentHeight>footerAvailableHeight){
            padding.bottom=margin.footer+footerContentHeight-margin.bottom
        }

        const info={
            size,
            margin,
            padding,
            columns:[],
            header,
            footer,
        }
        this.computed.composed.push(info)
		this._newColumn()
		this.context.parent.appendComposed(this.createComposed2Parent(info))
		return info
    }

	get currentPage(){
		return this.computed.composed[this.computed.composed.length-1]
	}

	get currentColumn(){
		const {columns}=this.currentPage
		return columns[columns.length-1]
	}

    nextAvailableSpace(required={}){
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this.computed
		if(composed.length==0){
			this._newPage()
		}
		const {cols,allowedColumns=cols ? cols.length : 1}=this.props

		let looped=0
        //@TODO: what if never can find min area
        while(minRequiredH-this.currentColumn.availableHeight>1){
            if(allowedColumns>this.currentPage.columns.length){// new column
                this._newColumn()
            }else{//new page
				this._newPage()
            }

			if(looped++>1){
				console.warn("section can't find required space")
				break
			}
        }
        return this.currentColumn.nextAvailableSpace(required)//{width:this.currentColumn.props.width, height:this.currentColumn.availableHeight}
    }

    appendComposed(line){
        const {composed}=this.computed
		if(!this.currentPage){
			this._newPage()
		}
		const {cols,allowedColumns=cols ? cols.length : 1}=this.props

        const {height:contentHeight}=line.props

		if(contentHeight-this.currentColumn.availableHeight>1){
            if(allowedColumns>this.currentPage.columns.length){// new column
                this._newColumn()
            }else{//new page
                this._newPage()
            }
        }

		return this.currentColumn.appendComposed(line)
    }

	/**
	 *  section needn't append to document, but give chance for extension
	 */
	createComposed2Parent(page){
		return page
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
