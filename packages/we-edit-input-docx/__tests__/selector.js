import Selector from "../src/styles/properties"
import docx4js from "docx4js"

describe("model properties selector", function(){
	const select=(content,type)=>docx4js.create().then(docx=>{
		let relDoc=docx.main.getRelTarget("officeDocument")
		let $=docx.parts[relDoc]=docx4js.parseXml(content)
		let node=$.root().get(0).children[0]

		return [new Selector(docx),$]
	})
	
	it("select value",function(){
		
	})
	
	
	const contents={
		document:`
			<w:document><w:background w:color="black"/></w:document>`,
		section:`
			<w:sectPr>
				<w:pgSz w:w="12240" w:h="15840" w:code="1"/>
				<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
				<w:cols w:space="720"/>
				<w:docGrid w:linePitch="360"/>
			</w:sectPr>`,
		table:`
			<w:tbl>
				<w:tblPr>
					<w:tblStyle w:val="PlainTable3"/>
					<w:tblW w:w="0" w:type="auto"/>
					<w:tblLook w:val="00A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="0"/>
				</w:tblPr>
				<w:tblGrid>
					<w:gridCol w:w="1870"/>
					<w:gridCol w:w="1870"/>
					<w:gridCol w:w="1870"/>
					<w:gridCol w:w="1870"/>
					<w:gridCol w:w="1870"/>
				</w:tblGrid>
			</w:tbl>`,
		paragraph:`
			<w:p>
				<w:pPr>
					<w:jc w:val="center"/>
				</w:pPr>
			</w:p>`,
		inline:`
			<w:r>
				<w:rPr>
					<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorEastAsia" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>
					<w:b/>
					<w:i/>
					<w:vanish/>
					<w:strike/>
					<w:color w:val="00B050"/>
					<w:sz w:val="24"/>
				</w:rPr>
				<w:t>a keyword to</w:t>
			</w:r>`
	}
})