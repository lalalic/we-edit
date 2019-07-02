import Style from "../../render/styles/numbering"
export default class{
    static Template=(id,aid)=>`
        <w:num w:numId="${id}">
          <w:abstractNumId w:val="${aid}"/>
        </w:num>
    `
    static Numeric=id=>`
        <w:abstractNum w:abstractNumId="${id}" w15:restartNumberingAfterBreak="0">
          <w:nsid w:val="4EB77DE4"/>
          <w:multiLevelType w:val="hybridMultilevel"/>
          <w:tmpl w:val="DE9ED1E8"/>
          <w:lvl w:ilvl="0" w:tplc="8250C364">
            <w:start w:val="1"/>
            <w:numFmt w:val="decimal"/>
            <w:lvlText w:val="%1."/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="720" w:hanging="360"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="1" w:tplc="04090019" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="lowerLetter"/>
            <w:lvlText w:val="%2."/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="1440" w:hanging="360"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="2" w:tplc="0409001B" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="lowerRoman"/>
            <w:lvlText w:val="%3."/>
            <w:lvlJc w:val="right"/>
            <w:pPr>
              <w:ind w:left="2160" w:hanging="180"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="3" w:tplc="0409000F" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="decimal"/>
            <w:lvlText w:val="%4."/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="2880" w:hanging="360"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="4" w:tplc="04090019" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="lowerLetter"/>
            <w:lvlText w:val="%5."/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="3600" w:hanging="360"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="5" w:tplc="0409001B" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="lowerRoman"/>
            <w:lvlText w:val="%6."/>
            <w:lvlJc w:val="right"/>
            <w:pPr>
              <w:ind w:left="4320" w:hanging="180"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="6" w:tplc="0409000F" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="decimal"/>
            <w:lvlText w:val="%7."/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="5040" w:hanging="360"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="7" w:tplc="04090019" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="lowerLetter"/>
            <w:lvlText w:val="%8."/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="5760" w:hanging="360"/>
            </w:pPr>
          </w:lvl>
          <w:lvl w:ilvl="8" w:tplc="0409001B" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="lowerRoman"/>
            <w:lvlText w:val="%9."/>
            <w:lvlJc w:val="right"/>
            <w:pPr>
              <w:ind w:left="6480" w:hanging="180"/>
            </w:pPr>
          </w:lvl>
        </w:abstractNum>
    `
    static Bullet=id=>`
        <w:abstractNum w:abstractNumId="${id}" w15:restartNumberingAfterBreak="0">
          <w:nsid w:val="75004FB5"/>
          <w:multiLevelType w:val="hybridMultilevel"/>
          <w:tmpl w:val="760C20E4"/>
          <w:lvl w:ilvl="0" w:tplc="04090003">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val="o"/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="720" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Courier New" w:hAnsi="Courier New" w:cs="Courier New" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="1" w:tplc="04090003" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val="o"/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="1440" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Courier New" w:hAnsi="Courier New" w:cs="Courier New" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="2" w:tplc="04090005" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val=""/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="2160" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Wingdings" w:hAnsi="Wingdings" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="3" w:tplc="04090001" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val=""/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="2880" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="4" w:tplc="04090003" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val="o"/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="3600" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Courier New" w:hAnsi="Courier New" w:cs="Courier New" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="5" w:tplc="04090005" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val=""/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="4320" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Wingdings" w:hAnsi="Wingdings" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="6" w:tplc="04090001" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val=""/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="5040" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="7" w:tplc="04090003" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val="o"/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="5760" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Courier New" w:hAnsi="Courier New" w:cs="Courier New" w:hint="default"/>
            </w:rPr>
          </w:lvl>
          <w:lvl w:ilvl="8" w:tplc="04090005" w:tentative="1">
            <w:start w:val="1"/>
            <w:numFmt w:val="bullet"/>
            <w:lvlText w:val=""/>
            <w:lvlJc w:val="left"/>
            <w:pPr>
              <w:ind w:left="6480" w:hanging="360"/>
            </w:pPr>
            <w:rPr>
              <w:rFonts w:ascii="Wingdings" w:hAnsi="Wingdings" w:hint="default"/>
            </w:rPr>
          </w:lvl>
        </w:abstractNum>
    `
}
