import {HasParentAndChild,Fissionable} from "../composable"
import {dom} from "we-edit"
import memoize from "memoize-one"

const Super=Fissionable(HasParentAndChild(dom.Section))
export default class Section extends Super{
	static defaultProps={
		...Super.defaultProps,
		create(props,context){
			const {page}=this.props
			if(page){
				return new this.Fission({...page, ...props},context)
			}else{
				throw new Error("section has no create")
			}
		}
	}

    getDocument=memoize(()=>{
		var current=this.context.parent
		while(current){
			if(current.getComposeType()=="document")
				return current
            current=current.context.parent
		}
		return current
	})

	get totals(){
		return this.getDocument().computed.composed.length
	}

    create(){
        return super.create({I:this.totals})
    }
}
