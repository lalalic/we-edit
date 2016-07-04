import WordWrapper from "./"

let tester=null

export default class HtmlWordWrapper extends WordWrapper{
	lineHeight(){
		if(!tester){
			tester=document.createElement('span')
			document.body.appendChild(tester)
			tester.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
		}
		
		var p=document.createElement('p')
		document.body.appendChild(p)
		p.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
		tester.style=p.style=`font-family:${this.fontFamily};font-size:${this.size}px`
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
