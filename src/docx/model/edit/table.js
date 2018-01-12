import Base from "./base"

//{type:"entity/CREATE", payload:{type:"table", rows:3, cols:3}}
export class Table extends Base{
    apply({rows, cols, ...props}, $){
        if(rows){
			this.rows(rows, arguments[0])
		}
        return super.apply(props)
    }

    style({namedStyle}){
        return namedStyle
    }

    tblLook({tblLook}){
        if(!tblLook)
            return null
    }

    rows(rows,{cols}){
		this.node.find("w\\:tblGrid")
            .append(cols.map(w=>`<w:gridCol w:w="${w}"/>`).join(""))
			
        let elRows=new Array(rows).fill(0)
                .map(a=>{
                    return [
                        "<w:tr>",
                        cols.map(w=>`
                			<w:tc>
                				<w:tcPr>
                					<w:tcW w:w="${w}" w:type="dxa"/>
                				</w:tcPr>
                				<w:p><w:r><w:t> </w:t></w:r></w:p>
                			</w:tc>
                		`).join(""),
                        "</w:tr>"
                    ].join("")
                }
            )
        this.node.append(this.trim(elRows.join("")))
    }

    template(props){
        return `
            <w:tbl>
                <w:tblPr>
                    <w:tblStyle w:val="TableGrid"/>
                    <w:tblW w:w="0" w:type="auto"/>
                    <w:tblLook w:val="04A0" w:noVBand="1" w:noHBand="0" w:lastColumn="0" w:firstColumn="1" w:lastRow="0" w:firstRow="1"/>
                </w:tblPr>
                <w:tblGrid>
                </w:tblGrid>
            </w:tbl>
        `
    }
}
