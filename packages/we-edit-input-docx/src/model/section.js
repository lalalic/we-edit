import React, {Component} from "react"
import PropTypes from "prop-types"

import get from "lodash.get"

export default ({Template,Frame})=>{
	class Section extends Template{
		createPageTemplate(){
			const {pgSz:size,  pgMar:margin}=this.props
	        const pageNo=this.computed.composed.length+1
			const typed=type=>[(pageNo==1 ? "first" :false),(pageNo%2==0 ? "even" : "odd"),'default']
				.filter(a=>!!a)
				.reduce((found,a)=>found || this.computed.named[`${type}.${a}`],null)

			const header=typed("header")
			const footer=typed("footer")
			
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

			const {width, height}=size
			const {top, bottom, left, right}=margin
			const {cols=[{space:0,width:width-left-right}],allowedColumns=cols ? cols.length : 1}=this.props

	        const page={
	            size,
	            margin,
	            padding,
				columns:[],
				anchors:[],
	            header,
	            footer,
	            isDirtyIn(rect){
	                const isIntersect=(A,B)=>!(
	                        ((A.x+A.width)<B.x) ||
	                        (A.x>(B.x+B.width)) ||
	                        (A.y>(B.y+B.height))||
	                        ((A.y+A.height)<B.y)
	                    )

	                return !!this.anchors.find(({props:{x,y,width,height}})=>isIntersect(rect,{x,y,width,height}))
	            },

	            addAnchor(anchor){
	                this.anchors.push(anchor)
	            },

	            includes(anchor){
	                return !!this.anchors.find(a=>a.props["data-content"]==anchor.props["data-content"])
	            },
	            get currentColumn(){
	                return this.columns[this.columns.length-1]
	            },

			    nextAvailableSpace(required={}){
			        const {width:minRequiredW=0,height:minRequiredH=0}=required
					if(minRequiredH-this.currentColumn.availableHeight>1){
			            if(allowedColumns>this.columns.length){// new column
			                this.createColumn()
			            }else{
			                return false
			            }
			        }
			        return this.currentColumn.nextAvailableSpace(required)
			    },

			    appendComposed(line){
			        const {height:contentHeight}=line.props

					if(contentHeight-this.currentColumn.availableHeight>1){
			            if(allowedColumns>this.columns.length){// new column
			                this.createColumn()
			            }else{
			                return false
			            }
			        }

					return this.currentColumn.appendComposed(line)
			    },
				createColumn(){
			        const i=this.columns.length
			        const columnFrame=new Frame({
						y:0,
						height:height-bottom-top-(padding.top||0)-(padding.bottom||0),
			            children:[],
						x: cols.reduce((p, a, j)=>(j<i ? p+a.width+a.space : p),0),
						width: cols[i].width,
			            type:"column",
					},{parent:this})
					this.columns.push(columnFrame)
			    }
	        }

			page.createColumn()
			return page
		}
	}


	return class extends Component{
		static displayName=`docx-section`
		static propTypes={
			cols: PropTypes.shape({
				num: PropTypes.number.isRequired,
				space: PropTypes.number,
				data: PropTypes.arrayOf(PropTypes.shape({
					width: PropTypes.number,
					space: PropTypes.number
				}))
			}),
			titlePg:PropTypes.bool
		}

		static defaultProps={
			cols:{
				num:1
			}
		}

		static contextTypes={
			evenAndOddHeaders: PropTypes.bool
		}

		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props)
		}

		componentWillReceiveProps({pgSz:{width},  pgMar:{left, right}, cols:{num=1, space=0, data}}){
			let availableWidth=width-left-right
			this.cols=data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space})
		}

		render(){
			return (
				<Section {...this.props} cols={this.cols}/>
			)
		}
	}
}
