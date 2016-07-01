import WordWrapper from "."

export default class CanvasWordWrapper extends WordWrapper{
    _createTester(){
        var tester=document.createElement('canvas')
        document.body.appendChild(tester)
        tester.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
        return tester.getContext('2d')
    }

    _textMetrics(word){
        let tester=this.constructor.tester
        let {width}=tester.measureText(word)
        let height=25

        return {width, height}
    }
}
