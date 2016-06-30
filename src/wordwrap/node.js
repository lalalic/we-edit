import WordWrapper from "."
import Fonts from "./fonts"

export default class NodeWordWraper extends WordWrapper{
    constructor(text,style){
        super(...arguments)
        this.tester=Fonts.get(style.fontFamily)
    }
    _creatTester(){
        return this.tester
    }

    textMetrics(word, style){
        


    }
}
