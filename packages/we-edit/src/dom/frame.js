import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Frame extends Component{
	static displayName="frame"
	static propTypes={
		width:PropTypes.number.isRequired,
		height:PropTypes.number,
		/**margin is in frame box*/
		margin:this.MarginShape,
		
		cols:PropTypes.arrayOf(PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number,
			width:PropTypes.number.isRequired,
			height:PropTypes.number,
		})),
		
		x: PropTypes.number,
		y: PropTypes.number,
		z: PropTypes.number,
		vertAlign: this.VertAlignShape,
		
		/**template id*/
		xhref: PropTypes.string,

		/**false: this frame object itself will be a composed page*/
		autoComposed2Parent:PropTypes.bool,

		/**
		 * Balance: to make col height equal as possible
		 * if cols.length>1 ? balance[true|func as customized balance function] cols
		 * */
		balance: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		/** if max(col.width-col.width)<thisValue, equal balance cols */
		equalBalanceThreshold: PropTypes.number,

		/**
		 * Advanced: constrained space for compose
		 * blockOffset: compose starting y position
		 * wrappees: black holes(excluded areas) for composing, wrap({x1,y1,x2,y2}) should give 
		 * 	[{
		 * 		x,width,
		 * 		[type="clear", y]// if type=="clear", which means no content should around left and right until y
		 * 	},...]
		 */
		space: PropTypes.shape({
			left: PropTypes.number,//default margin.left
			right: PropTypes.number,//default margin.right
			blockOffset: PropTypes.number,//default margin.top
			height: PropTypes.number,//default height-margin.top-margin.bottom
			wrappees: PropTypes.arrayOf(PropTypes.shape({
				props:{
					x: PropTypes.number,
					y: PropTypes.number,
					geometry: PropTypes.shape({
						x: PropTypes.number,
						y: PropTypes.number,
						width: PropTypes.number,
						height: PropTypes.number,		
					}),
					wrap:PropTypes.func.isRequired,
				}
			})),
			inclusive: PropTypes.string,//inclusive mode, only this inclusive area should be layouted
		}),

		/**if true: the content out of the frame should be composed too */
		allowOverflow: PropTypes.bool,
	}

	static defaultProps={
		margin:{
			left:0,
			right:0,
			top:0,
			bottom:0,
		},
		allowOverflow:false,
		balance:false,
		equalBalanceThreshold:1,
		autoComposed2Parent:true,
	}
}
