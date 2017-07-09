import Base from "./base"

export class Table extends Base{
    style({namedStyle}){
        return namedStyle
    }

    tblLook({tblLook}){
        if(!tblLook)
            return null
    }

    wCols(props){
        let aColWidth=parseInt(width/cols)
		return new Array(cols-1)
			.fill(aColWidth)
			.push(width-(cols-1)*aColWidth)
    }

    grids(props){
        return this.wCols(props)
            .map(w=>`<w:gridCol w:w="${w}"/>`)
            .join("")
    }

    rows({rows}){
        let xRow=this.wCols(arguments[0])
            .map(w=>`
    			<w:tc>
    				<w:tcPr>
    					<w:tcW w:w="${w}" w:type="dxa"/>
    				</w:tcPr>
    				<w:p><w:r><w:t></w:t></w:r></w:p>
    			</w:tc>
    		`)

		return new Array(rows)
			.fill(`<w:tr>${xRow.join("")}</w:tr>`)
            .join("")
    }

    template(props){
        return `
            <w:tbl>
                <w:tblPr>
                    <w:tblStyle w:val="${this.style(props)||'TableGrid'}"/>
                    <w:tblW w:w="0" w:type="auto"/>
                    ${this.tblLook(props)||'<w:tblLook w:val="04A0" w:noVBand="1" w:noHBand="0" w:lastColumn="0" w:firstColumn="1" w:lastRow="0" w:firstRow="1"/>'}
                </w:tblPr>
                <w:tblGrid>
                    ${this.grids(props)}
                </w:tblGrid>
                ${this.rows(props)}
            </w:tbl>
        `
    }
}
