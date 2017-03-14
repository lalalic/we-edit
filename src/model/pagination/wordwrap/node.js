import WordWrapper from "."
import Fonts from "../fonts"

export default class NodeWordWraper extends WordWrapper{
    lineHeight(){
		this.tester=Fonts.get(this.fontFamily)
        return {
			height : this.tester.lineHeight(this.size), 
			descent: this.tester.lineDescent(this.size)
			}
    }

    stringWidth(word){
        return this.tester.stringWidth(word, this.size)
    }
}
