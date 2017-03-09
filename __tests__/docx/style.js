import docx4js from "docx4js"

import Selector from "../../src/input/docx/selector"
import getStyles from "../../src/input/docx/style"

describe("styles",function(){
	let styles
	
	beforeAll(()=>{
		return docx4js.create().then(docx=>{
			docx.parts["word/styles.xml"]=docx4js.parseXml(content)
			return styles=getStyles(new Selector(docx))
		})
	})
	
	describe("default styles", function(){
		"document,paragraph,inline,list,table"
			.split(",")
			.forEach(type=>{
				it(type, function(){
					expect(styles.getDefault(type).length===1).toBe(true)
				})
			})
	})
	
	it("Normal, getStyle, getParentStyle,key", function(){
		let normal=styles.getStyle("Normal")
		expect(normal.attr("w:styleId")).toBe("Normal")
		expect(normal.getParentStyle()).toBe(null)
		expect(normal.key("sz")).toBe(null)
	})
	
	it("get Normal1,Normal2,Normal3",function(){
		"Normal1,Normal2,Normal3".split(",")
			.forEach(a=>expect(styles.getStyle(a).attr("w:styleId")).toBe(a))
	})
	
	it("key selected: document default style information",function(){
		expect(styles.getDefault("document").key("w\\:sz")).toBe(11)
	})
	
	it("key path", function(){
		let normal1=styles.getStyle("Normal1")
		expect(normal1.attr('w:styleId')).toBe("Normal1")
		expect(normal1.key('w\\:jc')).toBe("right")
		
		expect(styles.getStyle("Normal3").key('w\\:jc')).toBe("right")
	})
	
	
	
	const content=`
<w:styles>
	<w:docDefaults>
		<w:rPrDefault>
			<w:rPr>
				<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorEastAsia" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>
				<w:sz w:val="22"/>
				<w:szCs w:val="22"/>
				<w:lang w:val="en-US" w:eastAsia="zh-CN" w:bidi="ar-SA"/>
			</w:rPr>
		</w:rPrDefault>
		<w:pPrDefault>
			<w:pPr>
				<w:spacing w:after="160" w:line="259" w:lineRule="auto"/>
			</w:pPr>
		</w:pPrDefault>
	</w:docDefaults>
	
	<w:style w:type="paragraph" w:default="1" w:styleId="Normal">
		<w:name w:val="Normal"/>
		<w:qFormat/>
		<w:pPr>
			<w:jc w:val="right"/>
		</w:pPr>
	</w:style>
	<w:style w:type="paragraph" w:styleId="Normal1">
		<w:name w:val="Normal1"/>
		<w:basedOn w:val="Normal">
		<w:qFormat/>
	</w:style>	
	<w:style w:type="paragraph" w:styleId="Normal2">
		<w:name w:val="Normal1"/>
		<w:basedOn w:val="Normal1">
		<w:qFormat/>
	</w:style>	
	<w:style w:type="paragraph" w:styleId="Normal3">
		<w:name w:val="Normal1"/>
		<w:basedOn w:val="Normal2">
		<w:qFormat/>
	</w:style>		
	<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont">
		<w:name w:val="Default Paragraph Font"/>
		<w:uiPriority w:val="1"/>
		<w:semiHidden/>
		<w:unhideWhenUsed/>
	</w:style>
	
	<w:style w:type="table" w:default="1" w:styleId="TableNormal"/>
	
	<w:style w:type="numbering" w:default="1" w:styleId="NoList"/>
	
</w:styles>	
	`
})