import WordWrapper from "./"

let tester=null
let DEFAULT_STYLE="margin:0;padding:0;border:0;position:absolute;left:-1000px;white-space: pre;"
export default class HtmlWordWrapper extends WordWrapper{
	lineHeight(){
		if(!tester){
			tester=document.createElement('span')
			document.body.appendChild(tester)
		}
		
		var p=document.createElement('p')
		document.body.appendChild(p)
		tester.style=p.style=`${DEFAULT_STYLE};font-family:${this.fontFamily};font-size:${this.size}px`
		p.innerHTML="A"
		let height=p.getBoundingClientRect().height
		document.body.removeChild(p)
		return height
	}

    stringWidth(word){
        tester.innerHTML=word
        return tester.getBoundingClientRect().width
    }
}
