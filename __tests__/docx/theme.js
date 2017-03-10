import docx4js from "docx4js"
import getTheme from "../../src/input/docx/theme"

describe("theme retriever", function(){
	let theme=null
	
	beforeAll(()=>{
		return docx4js.create().then(docx=>{
			docx.parts["word/settings.xml"]=docx4js.parseXml(settings)
			docx.parts["word/theme/theme1.xml"]=docx4js.parseXml(theme1)
			return theme=getTheme(docx)
		})
	})
	
	describe("font",()=>{
		it("majorHAnsi/majorAscii",function(){
			expect(theme.font("majorHAnsi")).toBe("Cambria")
			expect(theme.font("majorAscii")).toBe("Cambria")
		})
		
		it("majorBidi",function(){
			expect(theme.font("majorBidi")).toBe("Arial")
		})
		
		it("majorEastAsia",function(){
			expect(theme.font("majorEastAsia")).toBe("宋体")
		})
		
		it("minorHAnsi/minorAscii",function(){
			expect(theme.font("minorHAnsi")).toBe("Calibri")
			expect(theme.font("minorAscii")).toBe("Calibri")
		})
		
		it("minorBidi",function(){
			expect(theme.font("minorBidi")).toBe("")
		})
		
		it("minorEastAsia",function(){
			expect(theme.font("minorEastAsia")).toBe("宋体1")
		})
		
	})
	
	describe("color",()=>{
		it("phClr: placeholder will left to direct style", ()=>{
			expect(theme.color("phClr")).toBe("phClr")
		})
		
		it("dk2: no map", ()=>{
			expect(theme.color("dk2")).toBe("#1F497D")
		})
		
		it("t1=>dark1", ()=>{
			expect(theme.color("t1")).toBe("#EEECE1")
		})
		
		it("t1=>dark1", ()=>{
			expect(theme.color("t1")).toBe("#EEECE1")
		})
		
		it("lt1: no map, system color", ()=>{
			expect(theme.color("lt1")).toBe("#FFFFFF")
		})
	})
	
	describe("format",()=>{
		it.skip("not done",()=>1)
	})
	
	const settings=`
<w:settings>
	<w:themeFontLang w:val="en-US" w:eastAsia="zh-CN"/>
	<w:clrSchemeMapping w:bg1="light1" w:t1="dark1" w:bg2="light2" w:t2="dark2" w:accent1="accent1" w:accent2="accent2" w:accent3="accent3" w:accent4="accent4" w:accent5="accent5" w:accent6="accent6" w:hyperlink="hyperlink" w:followedHyperlink="followedHyperlink"/>
</w:settings>
	`
	const theme1=`
<a:theme>
	<a:themeElements>
		<a:clrScheme name="Office">
			<a:dk1>
				<a:sysClr val="windowText" lastClr="000000"/>
			</a:dk1>
			<a:lt1>
				<a:sysClr val="window" lastClr="FFFFFF"/>
			</a:lt1>
			<a:dk2>
				<a:srgbClr val="1F497D"/>
			</a:dk2>
			<a:dark1>
				<a:srgbClr val="EEECE1"/>
			</a:dark1>
			<a:accent1>
				<a:srgbClr val="4F81BD"/>
			</a:accent1>
			<a:accent2>
				<a:srgbClr val="C0504D"/>
			</a:accent2>
			<a:accent3>
				<a:srgbClr val="9BBB59"/>
			</a:accent3>
			<a:accent4>
				<a:srgbClr val="8064A2"/>
			</a:accent4>
			<a:accent5>
				<a:srgbClr val="4BACC6"/>
			</a:accent5>
			<a:accent6>
				<a:srgbClr val="F79646"/>
			</a:accent6>
			<a:hlink>
				<a:srgbClr val="0000FF"/>
			</a:hlink>
			<a:folHlink>
				<a:srgbClr val="800080"/>
			</a:folHlink>
		</a:clrScheme>
		<a:fontScheme name="Office">
			<a:majorFont>
				<a:latin typeface="Cambria"/>
				<a:ea typeface=""/>
				<a:cs typeface="Arial"/>
				<a:font script="Jpan" typeface="ＭＳ ゴシック"/>
				<a:font script="Hang" typeface="맑은 고딕"/>
				<a:font script="Hans" typeface="宋体"/>
				<a:font script="Hant" typeface="新細明體"/>
				<a:font script="Arab" typeface="Times New Roman"/>
				<a:font script="Hebr" typeface="Times New Roman"/>
				<a:font script="Thai" typeface="Angsana New"/>
				<a:font script="Ethi" typeface="Nyala"/>
			</a:majorFont>
			<a:minorFont>
				<a:latin typeface="Calibri"/>
				<a:ea typeface=""/>
				<a:cs typeface=""/>
				<a:font script="Jpan" typeface="ＭＳ 明朝"/>
				<a:font script="Hang" typeface="맑은 고딕"/>
				<a:font script="Hans" typeface="宋体1"/>
				<a:font script="Hant" typeface="新細明體"/>
				<a:font script="Arab" typeface="Arial"/>
				<a:font script="Hebr" typeface="Arial"/>
				<a:font script="Thai" typeface="Cordia New"/>
				<a:font script="Ethi" typeface="Nyala"/>
			</a:minorFont>
		</a:fontScheme>
		<a:fmtScheme name="Office">
			<a:fillStyleLst>
				<a:solidFill>
					<a:schemeClr val="phClr"/>
				</a:solidFill>
				<a:gradFill rotWithShape="1">
					<a:gsLst>
						<a:gs pos="0">
							<a:schemeClr val="phClr">
								<a:tint val="50000"/>
								<a:satMod val="300000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="35000">
							<a:schemeClr val="phClr">
								<a:tint val="37000"/>
								<a:satMod val="300000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="100000">
							<a:schemeClr val="phClr">
								<a:tint val="15000"/>
								<a:satMod val="350000"/>
							</a:schemeClr>
						</a:gs>
					</a:gsLst>
					<a:lin ang="16200000" scaled="1"/>
				</a:gradFill>
				<a:gradFill rotWithShape="1">
					<a:gsLst>
						<a:gs pos="0">
							<a:schemeClr val="phClr">
								<a:shade val="51000"/>
								<a:satMod val="130000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="80000">
							<a:schemeClr val="phClr">
								<a:shade val="93000"/>
								<a:satMod val="130000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="100000">
							<a:schemeClr val="phClr">
								<a:shade val="94000"/>
								<a:satMod val="135000"/>
							</a:schemeClr>
						</a:gs>
					</a:gsLst>
					<a:lin ang="16200000" scaled="0"/>
				</a:gradFill>
			</a:fillStyleLst>
			<a:lnStyleLst>
				<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">
					<a:solidFill>
						<a:schemeClr val="phClr">
							<a:shade val="95000"/>
							<a:satMod val="105000"/>
						</a:schemeClr>
					</a:solidFill>
					<a:prstDash val="solid"/>
				</a:ln>
				<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr">
					<a:solidFill>
						<a:schemeClr val="phClr"/>
					</a:solidFill>
					<a:prstDash val="solid"/>
				</a:ln>
				<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr">
					<a:solidFill>
						<a:schemeClr val="phClr"/>
					</a:solidFill>
					<a:prstDash val="solid"/>
				</a:ln>
			</a:lnStyleLst>
			<a:effectStyleLst>
				<a:effectStyle>
					<a:effectLst>
						<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0">
							<a:srgbClr val="000000">
								<a:alpha val="38000"/>
							</a:srgbClr>
						</a:outerShdw>
					</a:effectLst>
				</a:effectStyle>
				<a:effectStyle>
					<a:effectLst>
						<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0">
							<a:srgbClr val="000000">
								<a:alpha val="35000"/>
							</a:srgbClr>
						</a:outerShdw>
					</a:effectLst>
				</a:effectStyle>
				<a:effectStyle>
					<a:effectLst>
						<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0">
							<a:srgbClr val="000000">
								<a:alpha val="35000"/>
							</a:srgbClr>
						</a:outerShdw>
					</a:effectLst>
					<a:scene3d>
						<a:camera prst="orthographicFront">
							<a:rot lat="0" lon="0" rev="0"/>
						</a:camera>
						<a:lightRig rig="threePt" dir="t">
							<a:rot lat="0" lon="0" rev="1200000"/>
						</a:lightRig>
					</a:scene3d>
					<a:sp3d>
						<a:bevelT w="63500" h="25400"/>
					</a:sp3d>
				</a:effectStyle>
			</a:effectStyleLst>
			<a:bgFillStyleLst>
				<a:solidFill>
					<a:schemeClr val="phClr"/>
				</a:solidFill>
				<a:gradFill rotWithShape="1">
					<a:gsLst>
						<a:gs pos="0">
							<a:schemeClr val="phClr">
								<a:tint val="40000"/>
								<a:satMod val="350000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="40000">
							<a:schemeClr val="phClr">
								<a:tint val="45000"/>
								<a:shade val="99000"/>
								<a:satMod val="350000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="100000">
							<a:schemeClr val="phClr">
								<a:shade val="20000"/>
								<a:satMod val="255000"/>
							</a:schemeClr>
						</a:gs>
					</a:gsLst>
					<a:path path="circle">
						<a:fillToRect l="50000" t="-80000" r="50000" b="180000"/>
					</a:path>
				</a:gradFill>
				<a:gradFill rotWithShape="1">
					<a:gsLst>
						<a:gs pos="0">
							<a:schemeClr val="phClr">
								<a:tint val="80000"/>
								<a:satMod val="300000"/>
							</a:schemeClr>
						</a:gs>
						<a:gs pos="100000">
							<a:schemeClr val="phClr">
								<a:shade val="30000"/>
								<a:satMod val="200000"/>
							</a:schemeClr>
						</a:gs>
					</a:gsLst>
					<a:path path="circle">
						<a:fillToRect l="50000" t="50000" r="50000" b="50000"/>
					</a:path>
				</a:gradFill>
			</a:bgFillStyleLst>
		</a:fmtScheme>
	</a:themeElements>
	<a:objectDefaults/>
	<a:extraClrSchemeLst/>
</a:theme>	
	`
})