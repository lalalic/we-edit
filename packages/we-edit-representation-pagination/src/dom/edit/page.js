import Page from "../page"
import Frame from "./frame"

const factory=BaseFrame=>class __$1 extends Page.factory(BaseFrame){
	static factory=factory
	getPages(){
		return [this.createComposed2Parent()]
	}

	appendLastComposed(){
        this.context.parent.appendComposed(this.createComposed2Parent())
	}
}

export default factory(Frame)