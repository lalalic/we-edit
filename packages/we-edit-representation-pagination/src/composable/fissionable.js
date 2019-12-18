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
		createLayout(...args){
			return new this.Fission(...args)
		}
	}
	static childContextTypes={
		...A.childContextTypes,
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

	named(name){
		return this.computed.named[name]
	}

    get current(){
        if(this.computed.composed.length==0){
            const a=this.createLayout()
            this.computed.composed.push(a)
            this.context.parent.appendComposed(this.createComposed2Parent(a))
        }
		return this.computed.composed[this.computed.composed.length-1]
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
        return this.props.createLayout.bind(this)(
            {...props,id:this.props.id, i:this.computed.composed.length, named:this.named.bind(this)},
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
            const a=this.createLayout(undefined,{frame:space.frame},required)
            this.computed.composed.push(a)
            this.context.parent.appendComposed(this.createComposed2Parent(a))
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
                const a=this.createLayout(undefined, undefined,{height})
                this.computed.composed.push(a)
                this.context.parent.appendComposed(this.createComposed2Parent(a))
                return 1//recompose current line in case different availableSpace
            }else if(Number.isInteger(appended)){
                return appended
            }
        }
    }
}
