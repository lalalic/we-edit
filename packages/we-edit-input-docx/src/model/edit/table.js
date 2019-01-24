import Base from "./base"

//{type:"entity/CREATE", payload:{type:"table", rows:3, cols:3}}
export class Table extends Base{
    apply({rows, ...props}, $){
        if(rows){
			delete props.cols
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

	cols(cols){
		cols=cols.map(w=>this.px2dxa(w))
		this.node.find("w\\:tblGrid").empty()
            .append(cols.map(w=>`<w:gridCol w:w="${w}"/>`).join(""))
	}

	height({value:height, row, cell}){
        let tr=this.node.find(`#${row}`)
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

		height=this.px2dxa(height)

        trHeight.attr("w:val",height)
	}

	width({value:width, row, cell,i}){
        if(width<=0){
            return
        }
		const tr=this.node.find(`#${row}`)
		const tc=tr.find(`#${cell}`)
		const tcW=tc.find("w\\:tcPr>w\\:tcW")
		width=this.px2dxa(width)
		const delta=width-parseInt(tcW.attr("w:w"))

        //change col width
        const gridCol=this.node.find("w\\:tblGrid").first().find("w\\:gridCol")
        const cols=gridCol.map((j,a)=>parseInt(a.attribs["w:w"])).toArray()
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

	col({at}){
		let grid=this.node.first("w\\:tblGrid")
		let cols=grid.find("w\\:gridCol")
		let len=cols.length
		let width=cols.toArray().reduce((w,a)=>w+parseInt(a.attribs["w:w"]),0)
		let ratio=len/(len+1)
		for(let i=0;i<len;i++){
			let col=cols.eq(i)
			let w=parseInt(parseInt(col.attr("w:w"))*ratio)
			col.attr("w:w",w)
			width-=w
		}

		cols.eq(at)
			.after(
				cols.eq(at)
					.clone()
					.attr("w:w",width)
			)

		let rows=this.node.find("w\\:tr")
		for(let i=0;i<rows.length;i++){
			rows.eq(i)
				.find("w\\:tc")
				.eq(at)
				.after(this.template_tc(width))
		}
	}

	row({at}){
		let cols=this.node.first("w\\:tblGrid").find("w\\:gridCol").length
        this.node.find("w\\:tr").eq(at)
            .after("<w:tr>"+new Array(cols).fill(0).map(w=>this.template_tc(w))+"</w:tr>")
	}

    rows(rows,{cols}){
		cols=cols.map(w=>this.px2dxa(w))
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
        return `<w:tc><w:p><w:r><w:t></w:t></w:r></w:p></w:tc>`
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

	create(props,reducer,target){
		const [p0,p1]=reducer.splitAtUpto(reducer.selection.start,"paragraph")
		const createdNode=super.create(...arguments)
		const {id:createdId}=reducer.renderChanged(createdNode)

		let created=reducer.$(`#${createdId}`).insertAfter(p0)

		let cursor=created.findFirst('text').attr('id')
		return {id:cursor,at:0}
	}
}
