import PropTypes from "prop-types"
import Component from "./component"

/**
 * frame 
 * > can be a flow container
 * 	> paragraph can be child
 * > can be a positioning container
 * 	> anchor can be child
 * so in order to make both ready, should have
 * 	> paragraph always?!
 */
export default class Frame extends Component{
	static displayName="frame"
	static ColShape=this.normalizeChecker(PropTypes.shape({
		x:this.UnitShape,
		y:this.UnitShape,
		width:this.UnitShape.isRequired,
		height:this.UnitShape,
	}),{
		normalize:value=>{
			return Object.keys(value).reduce((normalized,key)=>{
				normalized[key]=this.UnitShape.normalize(value[key])
				return normalized
			},{...value})
		},
		unnormalize:(value,normalized)=>{
			return Object.keys(normalized).reduce((unnormalize,key)=>{
				unnormalize[key]=this.UnitShape.unnormalize(value[key], normalized[key])
				return unnormalize
			},{...normalized})
		}
	})
	static propTypes={
		width:this.UnitShape.isRequired,
		height:this.UnitShape,
		/**margin is in frame box*/
		margin:this.MarginShape,
		
		cols:this.normalizeChecker(PropTypes.arrayOf(this.ColShape),{
			normalize:value=>{
				return value.map(a=>this.ColShape.normalize(a))
			},
			
		}),
		
		x: this.UnitShape,
		y: this.UnitShape,
		z: PropTypes.number,//layer
		vertAlign: this.VertAlignShape,
		
		/**template id*/
		xhref: PropTypes.string,

		/**false: this frame object itself will be a composed page*/
		autoCompose2Parent:PropTypes.bool,

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
			left: this.UnitShape,//default margin.left
			right: this.UnitShape,//default margin.right
			blockOffset: this.UnitShape,//default margin.top
			height: this.UnitShape,//default height-margin.top-margin.bottom
			wrappees: PropTypes.arrayOf(PropTypes.shape({
				props:{
					x: this.UnitShape,
					y: this.UnitShape,
					geometry: PropTypes.shape({//extent
						x: this.UnitShape,
						y: this.UnitShape,
						width: this.UnitShape,
						height: this.UnitShape,		
					}),
					wrap:PropTypes.func.isRequired,
				}
			})),
			inclusive: PropTypes.string,//inclusive mode, only this inclusive area should be layouted
		}),

		/**if true: the content out of the frame should be composed too */
		allowOverflow: PropTypes.bool,

		focusable: PropTypes.bool,

		/**compose and render at same time*/
		async: PropTypes.bool,
	}

	static defaultProps={
		margin:this.MarginShape.default,
		allowOverflow:false,
		balance:false,
		equalBalanceThreshold:1,
		autoCompose2Parent:true,
	}

	get isFrame(){
		return true
	}
}
