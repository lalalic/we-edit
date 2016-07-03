import WordWrapper from "."
import Fonts from "../fonts"

export default class NodeWordWraper extends WordWrapper{
    constructor(text,style){
        super(...arguments)
        this.tester=Fonts.get("Verdana")//style.fontFamily)
    }
    _creatTester(){
        return this.tester
    }

    _textMetrics(word){
        debugger
        return this.tester.stringWidth(word)
    }
}
