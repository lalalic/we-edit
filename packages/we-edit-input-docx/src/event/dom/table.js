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

	height({value:height, row, cell}){
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

	width({value:width, row, cell,i}){
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
