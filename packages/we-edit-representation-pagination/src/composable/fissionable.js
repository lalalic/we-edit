import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ReactQuery} from "we-edit"

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

	static fissureLike(){
		throw new Error("Fission should be implemented in static fissureLike()")
    }
    
	constructor(){
		super(...arguments)
		this.computed.named={}
    }
    
    get isFissionable(){
        return true
    }

	get Fission(){
		return memoize((Base)=>this.constructor.fissureLike(Base))(this.context.ModelTypes.Frame)
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
}
