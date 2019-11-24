import PropTypes from "prop-types"
import Balanceable from "./balanceable"
//<line pagination={orphan,widow,keepWithNext,keepLines, [i:line no within paragraph]}/>
export default class PaginationControllable extends Balanceable{
	static PaginationControllable=PaginationControllable
	static contextTypes={
		...Balanceable.contextTypes,
		prevLayout:PropTypes.func,
	}

	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			prev:{
				enumerable:false,
				configurable:true,
				get(){
					return this.context.prevLayout && this.context.prevLayout(this)
				}
			}
		})
	}

	orphanCount(line=this.lastLine){
		const pid=this.getFlowableComposerId(line,'[data-type="paragraph"]')
		if(!pid)
			return 0
		const lines=this.lines
		const i=lines.findLastIndex(a=>this.getFlowableComposerId(a)!==pid)
		return i==-1 ? lines.length : i+1
	}

	appendComposed(line){
		if(this.isEmpty() && this.prev){
			const {pagination={}}=line.props
			const {widow,orphan,keepLines,last}=pagination
			if(keepLines){
				if(this.prev.shouldKeepLinesWith(line)){//i!=1
					let lineCount=this.prev.orphanCount()
					this.prev.rollbackLines(lineCount)
					return lineCount+1
				}
			}else{
				if(orphan){
					if(this.prev.orphanCount(line)==1 && this.prev.lines.length>1){
						this.prev.rollbackLines(1)
						return 1+1
					}
				}

				if(widow){
					if(last){
						const orphanCount=this.prev.orphanCount(line)
						if(orphanCount>0 && this.prev.lines.length>orphanCount){
							this.prev.rollbackLines(1)
							if(orphan){
								if(orphanCount==2){
									this.prev.rollbackLines(1)
									return 2+1
								}
							}
							return 1+1
						}
					}
				}
			}

			if(this.prev.shouldKeepWithNext(line)){
				let removedLines=this.prev.rollbackLines(this.prev.orphanCount())
				//re-submit last paragraph
				const pid=this.getFlowableComposerId(removedLines[0])
				this.context.getComposer(pid).recommit()
				return 0+1
			}
		}

		return super.appendComposed(...arguments)
	}

	shouldKeepLinesWith(line){
		const pid=this.getFlowableComposerId(line)
		return this.getFlowableComposerId(this.lastLine)==pid &&
			this.getFlowableComposerId(this.firstLine)!=pid
	}

	shouldKeepWithNext(line){
		const should=
			(this.lastLine.props.pagination||{}).keepWithNext &&
			this.orphanCount(line)==0 &&
			this.getFlowableComposerId(this.firstLine)!==this.getFlowableComposerId(this.lastLine)
		return should
	}
}