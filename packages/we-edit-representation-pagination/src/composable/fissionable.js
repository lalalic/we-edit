import React,{Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

/**
 * To make a component fissionable by .create() for a new Layout
 * such as Page, Table Cell
 * .create(props,context,requiredSpace): to create new Layout(props,context) 
 *          with constant space(such as page) or 
 *          a required valid space from parent(such as cell slot)
 * it also support named composed result for Fission to use
 */
export default (A)=>class __$1 extends A{
	static defaultProps={
		...A.defaultProps,
		create(...args){
			return new this.Fission(...args)
		}
	}
	static contextTypes={
		...A.contextTypes,
        prevLayout: PropTypes.func,
	}

    static displayName=`fissionable-${A.displayName}`

    /**
     * why use static function to inherit??? because Frame is in instance's context
     * @param {*} Frame 
     */
	static fissureLike(Frame){
		return Frame
    }
    
	constructor(){
		super(...arguments)
        this.computed.named={}
    }
    
    get isFissionable(){
        return true
    }

	get Fission(){
		return memoize(Frame=>class extends this.constructor.fissureLike(Frame){
            createComposed2Parent(){
                const {props:{i,margin}}=this
                return React.cloneElement(super.createComposed2Parent(...arguments),{margin,i,key:i})
            }
        })(this.context.ModelTypes.Frame)
	}

	named(name){
		return this.computed.named[name]
	}

    get current(){
        if(this.computed.composed.length==0)
            this.create()
		return this.computed.composed[this.computed.composed.length-1]
	}
    /**
     * create a block layout engine with a ensured space {left,right,blockOffset,height,wrappees}
     * when current space is full, it would be called
     * @param {*} props 
     * @param {*} context 
     * @param {*} requiredSpace 
     */
    create(props={},context={},requiredSpace){
        const a=this.props.create.bind(this)(
            {...props,id:this.props.id, i:this.computed.composed.length, named:this.named.bind(this)},
            {...context,parent:this,getComposer:id=>this.context.getComposer(id)}
        )
        this.computed.composed.push(a)
        this.context.parent.appendComposed(this.createComposed2Parent(a))
        return a
    }

    createComposed2Parent(a){
        return a
    }


    /**
     * it proxy the call to current layout
     * if current layout has no required space, a new Layout will be created
     * @param {*} required 
     */
    nextAvailableSpace(required){
        const space=this.current.nextAvailableSpace(...arguments)
        if(!space){
            this.create(undefined,{frame:space.frame},required)
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

    /**
     * named is supported to be kept
     * @param {*} composedChildenContent 
     * @returns
     * number: to rollback last number of lines
     */
    appendComposed({props:{named,height}}){
        if(named){
            this.computed.named[named]=arguments[0]
            return
        }else{
            const appended=this.current.appendComposed(...arguments)
            if(appended===false){
                this.create(undefined, undefined,{height})
                return 1//recompose current line in case different availableSpace
            }else if(Number.isInteger(appended)){
                return appended
            }
        }
    }
    /**
     * cacheable API
     * compose rule: always compose all children, and content composing is stoppable 
     * both composed and lastComposed refer to fissions
     */
	keepUntilLastAllChildrenComposed(){
        const {id,fissionIndex,lineIndex}=(id=>{
			let fissionIndex=-1, lineIndex=-1
			this.computed.lastComposed.findLast(({lines},i)=>{
				fissionIndex=i
				return lines.findLast((line,i)=>{
					lineIndex=i
					if(id=this.findContentId(line)){
						const composer=this.context.getComposer(id)
						if(composer && composer.isAllChildrenComposed()){
							return true
						}
					}
					return false
				})
			})
			return {id,fissionIndex,lineIndex}
		})();

		if(id){
			this.keepComposedUntil(fissionIndex,lineIndex+1)
			return Children.toArray(this.props.children).findIndex(a=>a.props.id===id)
		}
		return -1
	}

	removeChangedPart(removedChildren){
		const findChangedContentId=line=>{
			const id=this.findContentId(line)
			return (id!==undefined && removedChildren.includes(id))
		}

		let fissionIndex=-1, lineIndex=-1
		if((fissionIndex=this.computed.lastComposed.findIndex(({lines})=>{
			return (lineIndex=lines.findIndex(line=>findChangedContentId(line)))!=-1
		}))!=-1){
			this.keepComposedUntil(fissionIndex,lineIndex)
			return true
		}

		return false
	}

	keepComposedUntil(fissionIndex,lineIndex){
		this.computed.lastComposed=this.computed.lastComposed.slice(0,fissionIndex+1)
		this.computed.lastComposed[fissionIndex].removeFrom(lineIndex)
	}

	appendLastComposed(){
        //both composed and lastComposed refer to fissions, check createComposed2Parent
		this.computed.composed=[...this.computed.lastComposed]
		this.computed.composed.forEach(a=>this.context.parent.appendComposed(a))
	}
}
