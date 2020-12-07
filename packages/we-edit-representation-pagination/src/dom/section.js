import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import {HasParentAndChild, editable} from "../composable"
import Frame from "./frame"


const Super=HasParentAndChild(dom.Section)
class Section extends Super{
	static defaultProps={
		...Super.defaultProps,
		createLayout(props,...args){
			return new this.constructor.Layout({...this.props.layout, ...props},...args)
		}
	}

	static childContextTypes={
		...Super.childContextTypes,
        prevLayout: PropTypes.func,
	}

	static Layout=class LayoutSection extends Frame{
		static displayName="frame-section"
		constructor(props, context){
			super(props,{...context,mount:undefined,unmount:undefined})
			delete this.computed.composedUUID
		}

		createComposed2Parent(){
			const {props:{i,I,margin}}=this
			const props={margin,i,key:i}
			if(I!=undefined)
				props.I=I
			return React.cloneElement(super.createComposed2Parent(),props)
		}

		clone4Space(layout){
			if(layout.context.frame==this.context.frame)
				return this
			const cloned=this.clone({space:layout.props.space})
			cloned.context.frame=layout.context.frame
			return cloned
		}
	}

	get isSection(){
		return true
	}

	get current(){
        if(this.computed.composed.length==0){
			const layout=this.createLayout()
			if(layout){
				this.computed.composed.push(layout)
				this.context.parent.appendComposed(this.createComposed2Parent(layout))
			}
        }
		return this.computed.composed[this.computed.composed.length-1]
	} 

    getChildContext(){
        const self=this
        return {
            ...super.getChildContext(),
            prevLayout(ref){
                const {composed}=self.computed
                return composed[composed.indexOf(ref)-1]
            }
        }
    }

	/**page index, or undefined */
	get topIndex(){
		var current=this.context.parent
		while(current){
			if(current.isFrame || current.isSection)
				return 
			if(!current.context || !current.context.parent)
				return current.computed.composed.length
			current=current.context.parent
		}
	}

    /**
     * ** create is pure, so you have to append to your composed and parent manually every time create called***
     * create a block layout engine with a ensured space {left,right,blockOffset,height,wrappees}
     * when current space is full, it would be called
     * @param {*} props
     * @param {*} context 
     * @param {*} requiredSpace 
     */
    createLayout(props={},context={},requiredSpace){
		const allProps={...props,
			id:this.props.id, 
			i:this.computed.composed.length,
		}
		const I=this.topIndex
		if(typeof(I)=="number")
			allProps.I=I
		return this.props.createLayout.bind(this)(
			allProps,
            {...context,parent:this,getComposer:id=>this.context.getComposer(id)}
        )
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
			const layout=this.createLayout(undefined,{frame:space.frame},required)
			if(layout){
				this.computed.composed.push(layout)
				this.context.parent.appendComposed(this.createComposed2Parent(layout))
				return this.nextAvailableSpace(...arguments)
			}
        }
        return space
    }

    /**
     * named is supported to be kept
     * @param {*} composedChildenContent 
     * @returns
     * number: to rollback last number of lines
     */
    appendComposed({props:{height}}){
		const appended=this.current.appendComposed(...arguments)
		if(appended===false){
			if(this.nextAvailableSpace({height})){
				return 1//recompose current line in case different availableSpace
			}
			return Frame.IMMEDIATE_STOP
		}else if(Number.isInteger(appended)){
			return appended
		}
	}

	onAllChildrenComposed(){
		//last one should check balanceable
		const last=this.computed.composed[this.computed.composed.length-1]
		if(last.balanceable){
			last.balance()
		}
		super.onAllChildrenComposed()
	}
}

export default class EditableSection extends editable(Section,{stoppable:true}){
	/**
	 * lastComposed==composed
	 */
	cancelUnusableLastComposed(nextProps){
		const changed=nextProps.hash!=this.props.hash
		if(changed){
			this._cancelChangedPart(...arguments)
		}
		this._cancelUntilLastAllChildrenComposed(...arguments)
	}

	/**
	 * both composed and lastComposed refer to fissions, check createComposed2Parent
	 * 
	 */
	appendLastComposed(){
		const lastComposed=this.computed.lastComposed
		//clear last composed
		this.computed.composed=[]
		this.computed.lastComposed=[]
		
		//append last composed fissions one by one
		const spaceChangedAt=lastComposed.findIndex((fission,i,_,$,isLast=i==lastComposed.length-1)=>{
			if(isLast&&fission.isEmpty()){
				//last empty fission is useless for cache
				return true
			}
				
			const current=this.createLayout()
			if(fission.getSpace().equals(current.getSpace())){
				fission=fission.clone4Space(current)
				this.computed.composed.splice(i,1,fission)
				this.context.parent.appendComposed(this.createComposed2Parent(fission))
				return false
			}
			return true
		})


		if(spaceChangedAt==0){
			//clear all computed
			this.anchors=[]
			super.cancelUnusableLastComposed({changed:true})
			return false
		}else if(spaceChangedAt==-1){
			if(this.isAllChildrenComposed()){
				return true
			}
			//continue from last
		}else{
			delete this.computed.allComposed
			//continue from last
		}
		if(this.current.lastLine){
			const lastId=this.current.lastLine.props["data-content"]
			return this.childrenArray(this.props.children).findIndex(a=>a && a.props.id==lastId)
		}
		return false
	}

	_cancelChangedPart(next){
		var lineIndex=-1
		const childrenNeedRecompose=this.childrenNeedRecompose(next,this.props)
		const fissionIndex=this.computed.lastComposed.findIndex(({lines})=>{
			return (lineIndex=lines.findIndex(a=>childrenNeedRecompose.includes(this.childIdOf(a))))!=-1
		})

		this._keepLastComposedUntil(fissionIndex,lineIndex)
	}

	
    /**
     * cacheable API
     * compose rule: always compose all children, and content composing is stoppable 
     * both composed and lastComposed refer to fissions
     */
	_cancelUntilLastAllChildrenComposed(){
		var lineIndex=-1
        const fissionIndex=this.computed.lastComposed.findLastIndex(({lines})=>{
			return (lineIndex=lines.findLastIndex((a,i,_,$,id=this.childIdOf(a))=>{
				const composer=this.context.getComposer(id)
				return composer && composer.isAllChildrenComposed()
			}))!=-1
		})
		this._keepLastComposedUntil(fissionIndex,lineIndex+1)
	}

	_keepLastComposedUntil(fissionIndex,lineIndex){
		const {lastComposed}=this.computed
		if(fissionIndex==-1 || 
			(fissionIndex==lastComposed.length-1 && lineIndex>=lastComposed[fissionIndex].lines.length)){
			return 
		}
		delete this.computed.allComposed
		this.computed.lastComposed=lastComposed.slice(0,fissionIndex+1)
		this.computed.lastComposed[fissionIndex].removeFrom(lineIndex)
	}
}
