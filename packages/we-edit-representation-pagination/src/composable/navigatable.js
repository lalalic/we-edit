
import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

export default function Navigatable(A){
	return class extends A{
		static displayName=`navigatable-${A.displayName}`
		static propTypes={
			...A.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}

        static contextTypes={
            ...A.contextTypes,
 			getComposer: PropTypes.func,
        }

		navigatable(op, ...args){
			if(this.props[op]){
				return this.props[op](...args)
			}else if(this.context.parent && this.context.parent[op]){
				return this.context.parent[op](...args)
			}
		}

		getPages(){
			return this.navigatable("getPages",...arguments)
		}

		nextCursorable(){
			return this.navigatable('nextCursorable',...arguments)
        }

        prevCursorable(){
			return this.navigatable('prevCursorable',...arguments)
        }

		nextLine(){
			return this.navigatable('nextLine',...arguments)
		}

		prevLine(){
			return this.navigatable('prevLine',...arguments)
		}

		composeFrames(){
			if(super.composeFrames)
				return super.composeFrames(...arguments)
				
			if(this.context && this.context.parent)
				return this.context.parent.composeFrames(...arguments)
			return []
		}

		getRangeRects(){
			if(super.getRangeRects)
				return super.getRangeRects(...arguments)

			if(this.context && this.context.parent)
				return this.context.parent.getRangeRects(...arguments)
		}

		position(id, at){
			const pages=this.getPages()
			var target,parents
			const page=pages[`find${at==0?"":"Last"}`](a=>{
				debugger
				const FirstOrLast=at==0 ? "First" : "Last"
				const found=new ReactQuery(a.render())[`find${FirstOrLast}AndParents`](`[data-content="${id}"]`)
				target=(found.first||found.last).get(0)
				if(target){
					parents=found.parents
					return true
				}
				return false
			})

			if(target){
				const {x=0,width=0,height=0,descent}=target.props
				let y=target.props.y||0
				if(descent){
					y=y-(height-descent)
				}

				const position=parents.reduce((p,{props:{x=0,y=0}})=>(p.x+=x,p.y+=y,p),{x,y,width,height,id,at,page:page.props.I})
				if(at==1){
					position.x+=width
				}
				return position
			}
		}

		getFocusShape(){
			return this.navigatable('getFocusShape',...arguments)
		}
	}
}
