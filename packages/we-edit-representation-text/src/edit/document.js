import React from "react"
import PropTypes from "prop-types"
import {HTMLMeasure as Measure} from "we-edit-representation-pagination/measure"
import {Cursor} from "we-edit"

import Base from "../document"

export default class Document extends Base{
	static childContextTypes={
		measure:PropTypes.object,
		lineWidth: PropTypes.number.isRequired
	}
	
	getMeasure(fonts, size){
		return new Measure({fonts,size})
	}
	
	getChildContext(){
		return {
			measure: this.getMeasure(this.props.fonts||"Arial",  this.props.size||11),
			lineWidth:600
		}
	}
	
	render(){
		const {fonts="Arial", size=11}=this.props
		const {height}=this.getMeasure(this.props.fonts||"Arial",  this.props.size||11)
		return (
			<div style={{whiteSpace:"pre", fontFamily: fonts, fontSize:`${size}pt`}}>
				{this.props.children}
				<Cursor
                    ref={a=>this.cursor=a}
                    render={({top=0,left=0,height=1,color})=>(
                        <div style={{position:"absolute", top, left:100, height:24,width:1}}/>
                    )}
                    />
			</div>
		)
	}
}