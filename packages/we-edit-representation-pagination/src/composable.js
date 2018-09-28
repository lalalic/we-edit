import React, {Children,Fragment,Component} from "react"
import PropTypes from "prop-types"
import {Group} from "./composed"


export class ComposedAllTrigger extends Component{
    static contextTypes={
        parent: PropTypes.object
    }

    render(){
        this.context.parent.onAllChildrenComposed()
        return null
    }
}

function HasChild(Component){
    return class extends Component{
        static displayName=`composable-${Component.displayName}`
		static contextTypes={
			...Component.contextTypes,
			events: PropTypes.shape({emit:PropTypes.func.isRequired}),
			debug: PropTypes.bool,
		}

        static childContextTypes = {
            ...(Component.childContextTypes||{}),
            parent: PropTypes.object,
            prevSibling: PropTypes.func
        }


        constructor(){
            super(...arguments)
            this.computed = { children: [], composed: [] , allComposed:false}
        }
        getChildContext() {
            let self = this
            let superChildContext=super.getChildContext ? super.getChildContext() : {}
            return {
                ...superChildContext,
                parent: this,
                prevSibling(me) {
                    const {children: siblings} = self.computed
                    let found = siblings.indexOf(me)
                    if (found == -1) {//not found, current should not be composed
                        return siblings[siblings.length - 1]
                    } else {
                        return siblings[found - 1]
                    }
                }
            }
        }

        /**
         * usually NoChild content should be composed according to nextAvailableSpace,
         * and then append to itself.composed[] and parent.appendComposed
         */
        render(){
            return (
                <Fragment>
                    {this.props.children}
                    {<ComposedAllTrigger/>}
                </Fragment>
            )
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */
        appendComposed(line) {

        }

        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */
        nextAvailableSpace(required = { width: 0, height: 0 }) {

        }

        isAllChildrenComposed() {
            return this.computed.allComposed
        }

        onAllChildrenComposed() {//
            this.computed.allComposed=true
        }

        createComposed2Parent(props) {

        }

		emit(type, args){
			try{
				if(this.context.events){
					this.context.events.emit(...arguments)
				}
			}catch(e){

			}
		}

		get debug(){
			return !!this.context.debug
		}
    }
}

function HasParentAndChild(Component){
	const Super=HasChild(Component)
    return class extends Super{
        static contextTypes = {
            ...Super.contextTypes,
            parent: PropTypes.object,
            prevSibling: PropTypes.func
        }
        /**
         * children should call before composing line,
         * return next line rect {*width, [height], [greedy(text)=true], [wordy(text)=true]}
         */
        nextAvailableSpace() {
            return this.availableSpace = this.context.parent.nextAvailableSpace(...arguments)
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */
        appendComposed() {
            return this.context.parent.appendComposed(...arguments)
        }
    }
}

function NoChild(Component){
    const Super=HasParentAndChild(Component)
    return class extends Super{
		static contextTypes={
            ...Super.contextTypes,
            getMyBreakOpportunities: PropTypes.func
        }

		get noChild(){
			return true
		}

        render() {
            this.context.getMyBreakOpportunities(null)
            this.appendComposed(this.createComposed2Parent())
            return null
        }
    }
}


function Locatable(A){
	return class extends A{
		static displayName=`locatable-${A.displayName}`
		static propTypes={
			...A.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}
		
		splittable=true

		createComposed2Parent(){
			return React.cloneElement(super.createComposed2Parent(...arguments),{
					"data-content":this.props.id,
					"data-type":this.getComposeType()
				})
		}

        nextCursorable(){
            return this.props.nextCursorable ? this.props.nextCursorable() : false
        }

        prevCursorable(){
            return this.props.prevCursorable ? this.props.prevCursorable() : false
        }

        nextSelectable(){
            return this.props.nextSelectable ? this.props.nextSelectable(...arguments) : this.nextCursorable(...arguments)
        }

        prevSelectable(){
            return this.props.prevSelectable ? this.props.prevSelectable(...arguments) : this.prevCursorable(...arguments)
        }
		
		distanceAt(x,node){
			return 0
		}
		
		position(locator, at){
			const {id}=this.props
			if(at==0){
                const {x,y,width,height,node}=locator.getClientRect(id)
                return {x,y,width,height,node}
            }else{
                const {x,y,width,height,node}=locator.getClientRects(id).pop()
                return {
                    x:x+width,
					y,
					width,
                    height,
                    node
                }
            }
		}
		
		getCursor(){
			return null
		}
	}
}


export const enablify=func=>(targets, excludes)=>Object.keys(targets)
	.reduce((enabled, k)=>{
		if(!enabled[k]){
			enabled[k]=func(targets[k])
		}
		return enabled
	},{...excludes});


[HasChild,HasParentAndChild,NoChild,Locatable]
	.forEach(a=>{
		a.enable=enablify(a)
	})

export {HasChild,HasParentAndChild,NoChild,Locatable}
