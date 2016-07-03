import HtmlWordWrapper from "./html"

/**
 *
 * why it's slower than html
 */
export default class SVGWordWrapper extends HtmlWordWrapper{
    _createTester(){
        let container=document.createElement("div")
        container.style="position:absolute;top:-1000"
        document.body.appendChild(container)
        const {screenX, screenY}=window
        container.innerHTML=
        `
        <svg width="${screenX}" height="${screenY}" viewBox="0 0 ${screenX} ${screenY}" xmlns="http://www.w3.org/2000/svg">
            <text>*</text>
        </svg>
        `

        return container.querySelector('text')
    }

    _textMetrics(word){
        let tester=this.constructor.tester
        tester.firstChild.data=word
        return tester.getBBox()
    }
}
