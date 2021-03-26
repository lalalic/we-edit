import {dom} from "we-edit"
import {NoChild,editable} from "../composable"
import Shape from "./shape"

export default class Image extends editable(NoChild(dom.Image)){
	focusable=true
	getShape(){
		const {width,height,id,src}=this.props
		return new Shape({
				id,
				children:null,
				geometry:Shape.Path.fromRect({width,height}).toString(),
				fill:{picture:{url:src}}
			},
			{...this.context,mount:false,unmount:false}
		)
	}

	createComposed2Parent(){
		return this.getShape().createComposed2Parent()
	}
}
