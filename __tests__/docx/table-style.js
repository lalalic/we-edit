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
	
	describe("cellKey", function(){
		it("tblInd",()=>{
			let style=styles.getStyle("TableNormal")
			expect(style.cellKey("w\\:tblInd")).toBe(0)
		})
		
		it("pPr spacing",()=>{
			let style=styles.getStyle("TableGrid")
			expect(style.cellKey("w\\:pPr>w\\:spacing")).toMatchObject({lineRule:"auto"})
		})
	})
	
	
	
	fdescribe("cellBorder",()=>{
		it("tblBorders",function(){
			let {right,left,top,bottom}=styles.getStyle("TableGrid").cellBorder()
			expect(right)
				.toMatchObject({sz:1,color:"#000000",val:"single",space:0})
			expect(right).toMatchObject(left)
			expect(right).toMatchObject(top)
			expect(right).toMatchObject(bottom)
		})
	})
	
	describe("cellMargin",()=>{
		it("tblCellMar",()=>{
			let style=styles.getStyle("TableNormal")
			let {top,bottom,right,left}=style.cellMargin()
			expect(top).toBe(0)
			expect(bottom).toBe(0)
			expect(right).toBeGreaterThan(0)
			expect(left).toBeGreaterThan(0)
			expect(right===left).toBe(true)
		})
		
		it("tblCellMar inheritance",()=>{
			expect(styles.getStyle("TableNormal").cellMargin())
				.toMatchObject(styles.getStyle("TableGrid").cellMargin())
		})
	})
	
	describe("content table style tblPr+trPr+tcPr",function(){
		
	})
	
	const content=`
	<w:style w:type="table" w:default="1" w:styleId="TableNormal">
		<w:name w:val="Normal Table"/>
		<w:uiPriority w:val="99"/>
		<w:semiHidden/>
		<w:unhideWhenUsed/>
		<w:tblPr>
			<w:tblInd w:w="0" w:type="dxa"/>
			<w:tblCellMar>
				<w:top w:w="0" w:type="dxa"/>
				<w:left w:w="108" w:type="dxa"/>
				<w:bottom w:w="0" w:type="dxa"/>
				<w:right w:w="108" w:type="dxa"/>
			</w:tblCellMar>
		</w:tblPr>
	</w:style>	
	<w:style w:type="table" w:styleId="TableGrid">
		<w:name w:val="Table Grid"/>
		<w:basedOn w:val="TableNormal"/>
		<w:uiPriority w:val="59"/>
		<w:rsid w:val="002C5C36"/>
		<w:pPr>
			<w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
		</w:pPr>
		<w:tblPr>
			<w:tblBorders>
				<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
				<w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
				<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
				<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
				<w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
				<w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
			</w:tblBorders>
		</w:tblPr>
	</w:style>
	<w:style w:type="table" w:styleId="LightGrid-Accent5">
		<w:name w:val="Light Grid Accent 5"/>
		<w:basedOn w:val="TableNormal"/>
		<w:uiPriority w:val="62"/>
		<w:rsid w:val="002C5C36"/>
		<w:pPr>
			<w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
		</w:pPr>
		<w:tblPr>
			<w:tblStyleRowBandSize w:val="1"/>
			<w:tblStyleColBandSize w:val="1"/>
			<w:tblBorders>
				<w:top w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				<w:insideH w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				<w:insideV w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
			</w:tblBorders>
		</w:tblPr>
		<w:tblStylePr w:type="firstRow">
			<w:pPr>
				<w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/>
			</w:pPr>
			<w:rPr>
				<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>
				<w:b/>
				<w:bCs/>
			</w:rPr>
			<w:tblPr/>
			<w:tcPr>
				<w:tcBorders>
					<w:top w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:bottom w:val="single" w:sz="18" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:insideH w:val="nil"/>
					<w:insideV w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				</w:tcBorders>
			</w:tcPr>
		</w:tblStylePr>
		<w:tblStylePr w:type="lastRow">
			<w:pPr>
				<w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/>
			</w:pPr>
			<w:rPr>
				<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>
				<w:b/>
				<w:bCs/>
			</w:rPr>
			<w:tblPr/>
			<w:tcPr>
				<w:tcBorders>
					<w:top w:val="double" w:sz="6" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:insideH w:val="nil"/>
					<w:insideV w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				</w:tcBorders>
			</w:tcPr>
		</w:tblStylePr>
		<w:tblStylePr w:type="firstCol">
			<w:rPr>
				<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>
				<w:b/>
				<w:bCs/>
			</w:rPr>
		</w:tblStylePr>
		<w:tblStylePr w:type="lastCol">
			<w:rPr>
				<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>
				<w:b/>
				<w:bCs/>
			</w:rPr>
			<w:tblPr/>
			<w:tcPr>
				<w:tcBorders>
					<w:top w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				</w:tcBorders>
			</w:tcPr>
		</w:tblStylePr>
		<w:tblStylePr w:type="band1Vert">
			<w:tblPr/>
			<w:tcPr>
				<w:tcBorders>
					<w:top w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				</w:tcBorders>
				<w:shd w:val="clear" w:color="auto" w:fill="D2EAF1" w:themeFill="accent5" w:themeFillTint="3F"/>
			</w:tcPr>
		</w:tblStylePr>
		<w:tblStylePr w:type="band1Horz">
			<w:tblPr/>
			<w:tcPr>
				<w:tcBorders>
					<w:top w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:insideV w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				</w:tcBorders>
				<w:shd w:val="clear" w:color="auto" w:fill="D2EAF1" w:themeFill="accent5" w:themeFillTint="3F"/>
			</w:tcPr>
		</w:tblStylePr>
		<w:tblStylePr w:type="band2Horz">
			<w:tblPr/>
			<w:tcPr>
				<w:tcBorders>
					<w:top w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:left w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:right w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
					<w:insideV w:val="single" w:sz="8" w:space="0" w:color="4BACC6" w:themeColor="accent5"/>
				</w:tcBorders>
			</w:tcPr>
		</w:tblStylePr>
	</w:style>	
	`
})