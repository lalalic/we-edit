import WordWrapper from "."

export default class HtmlWordWrapper extends WordWrapper{
    _createTester(){
        let tester=document.createElement('span')
        document.body.appendChild(tester)
        tester.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
        return tester
    }

    _textMetrics(word,style){
        let tester=this.constructor.tester
        tester.innerHTML=word
        return tester.getBoundingClientRect()
    }
}
