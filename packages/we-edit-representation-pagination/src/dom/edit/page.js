import Page from "../page"
import Frame from "./frame"

export default class __$1 extends Page.factory(Frame){
	getPages(){
		return [this.createComposed2Parent()]
	}
}