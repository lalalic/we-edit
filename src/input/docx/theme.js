export default function getTheme(docx, props){
	Object.assign(docx.officeDocument.theme.prototype,{
		font(name){
			let [first,...second]=name.split(/(?=[A-Z])/g)
			second={HAnsi:'latin',Ascii:'latin',Bidi:'cs',EastAsia:'ea'}[second.join("")]
			let font=this.find(`a\\:fontScheme>a\\:${first}Font>a\\:${second}`).attr("typeface")
			if(!font && (second=='cs' || second=='ea')){
				let lang=docx.officeDocument.settings("w\\:themeFontLang").attr(`w:${{cs:'bidi',ea:'eastAsia'}[second]}`)
				font=this.find(`a\\:fontScheme>a\\:${first}Font>a\\:font[script=${{'zh-CN':'Hans'}[lang]}]`).attr("typeface")
			}
			return font
		},
		
		color(name){
			if(name=='phClr')
				return name
			let key=docx.officeDocument.settings("w\\:clrSchemeMapping").attr(`w:${name}`)||name
			let found=this.find(`a\\:clrScheme>a\\:${key}`)
			let color=found.find("a\\:srgbClr").attr("w:val") || found.find("a\\:sysClr").attr("w:lastClr") || "000000"
			return `#${color}`
		},
		
		format(type,idx){
			let kind={line:'ln',fill:'bgFillStyleLst',bgFill:'bgFillStyleLst',effect:'effectStyle',font:'fontScheme'}[type]
			return this.find(`a\\:fmtScheme a\\:${kind}:nth-child(${parseInt(idx)+1})`)
		}
	})
	
	return docx.officeDocument.theme.root()
}