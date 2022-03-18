import Base from "./base"

//{type:"entity/CREATE", payload:{type:"table", rows:3, cols:3}}
export class Table extends Base{
    apply({rows, cols, ...props}, $){
        if(rows){
			this.make(rows, cols)
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

	cols(cols){
		cols=cols.map(w=>this.file.px2dxa(w))
		this.node.find("w\\:tblGrid").empty()
            .append(cols.map(w=>`<w:gridCol w:w="${w}"/>`).join(""))
	}

	height(height, {where:{row, cell}}){
        let tr=this.node.find(`[xxid="${row}"]`)
        let pr=tr.find("w\\:trPr")
        if(pr.length==0){
            tr.prepend("<w:trPr/>")
            pr=tr.find("w\\:trPr")
        }

        let trHeight=pr.find("w\\:trHeight")
        if(trHeight.length==0){
            pr.append("<w:trHeight/>")
            trHeight=pr.find("w\\:trHeight")
        }

		height=this.file.px2dxa(height)

        trHeight.attr("w:val",height)
	}

	width(width, {where:{row, cell,i}}){
        if(width<=0){
            return
        }
        //change col width
        const gridCol=this.node.find("w\\:tblGrid").first().find("w\\:gridCol")
        const cols=gridCol.map((j,a)=>parseInt(a.attribs["w:w"])).toArray()

        const tr=this.node.find(`[xxid="${row}"]`)
		const tc=tr.find(`[xxid="${cell}"]`)
		const tcW=tc.find("w\\:tcPr>w\\:tcW")
		width=this.file.px2dxa(width)
		const delta=width-parseInt(tcW.attr("w:w")||cols[i])

        if(cols.length>i+1){
            if(cols[i+1]-delta>0){
                cols[i+1]=cols[i+1]-delta
            }else{
                return
            }
        }
        cols[i]=width
        gridCol.each((j,col)=>{
            col.attribs["w:w"]=cols[j]
        })

		//change each row's {i}th col's width
		const trs=this.node.find("w\\:tr")
        trs.toArray().forEach((a,j)=>{
			let tcs=trs.eq(j).find(`w\\:tc`)
            tcs.eq(i).find("w\\:tcPr>w\\:tcW").attr("w:w",cols[i])
            if(cols.length>i+1){
                tcs.eq(i+1).find("w\\:tcPr>w\\:tcW").attr("w:w",cols[i+1])
            }
		})
	}

    make(rows,cols){
		cols=cols.map(w=>this.file.px2dxa(w))
		this.node.find("w\\:tblGrid").empty()
            .append(cols.map(w=>`<w:gridCol w:w="${w}"/>`).join(""))

        let elRows=new Array(rows).fill(0)
                .map(a=>{
                    return [
                        "<w:tr>",
                        cols.map(w=>this.template_tc(w)).join(""),
                        "</w:tr>"
                    ].join("")
                }
            )
        this.node.append(this.trim(elRows.join("")))

        this.makeStyleReady()
    }

    makeStyleReady(){
        const $=this.file.doc.officeDocument.styles
		if($('w\\:style[w\\:styleId="TableNormal"]').length==0){
            const styleNode=$(this.trim(TABLE_STYLE_Normal)).insertAfter($(`w\\:style[w\\:default="1"]`).last())
            this.file.renderChanged(styleNode)
        }

        if($(`w\\:style[w\\:styleId="TableGrid"]`).length==0){
            const styleNode=$(this.trim(TABLE_STYLE_Grid)).appendTo($(`w\\:styles`))
            this.file.renderChanged(styleNode)
        }
    }

    template_tc(w){
        return `<w:tc>${w!=undefined ? `<w:tcPr><w:tcW w:w="${w}" w:type="dxa"/></w:tcPr>` : ""}<w:p><w:r><w:t></w:t></w:r></w:p></w:tc>`
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

const TABLE_STYLE_Normal=`
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
`

const TABLE_STYLE_Grid=`
    <w:style w:type="table" w:styleId="TableGrid">
        <w:name w:val="Table Grid"/>
        <w:basedOn w:val="TableNormal"/>
        <w:uiPriority w:val="39"/>
        <w:rsid w:val="000164E0"/>
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
`
