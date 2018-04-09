import docx4js from "docx4js"

import Properties from "../src/styles/properties"

describe("styles",function(){
	let styles
	
	beforeAll(()=>{
		return docx4js.create().then(docx=>{
			docx.parts["word/styles.xml"]=docx4js.parseXml(content)
			return styles=new Properties(docx)
		})
	})
	
	it("r", function(){})
	
	it("p", function(){})
	
	describe("table", function(){
		it("table", function(){})
		it("tc", function(){})
		it("tr", function(){})
	})
	
	describe("list", function(){
		it("list",function(){})
		it("label",function(){})
		it("reset",function(){})
	})
	
	describe("update",function(){
		it("style",function(){})
		it("numbering", function(){})
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