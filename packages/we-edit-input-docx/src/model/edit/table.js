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

	col({cell,where}){
        cell=this.file.getNode(cell)
        const at=cell.closest("w\\:tr").find("w\\:tc").index(cell)

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
				.eq(at)[where](this.template_tc(width))
		}
	}

	row({at,where}){
        const row=this.file.getNode(at)
        if(row.length==1){
            const cols=this.node.first("w\\:tblGrid").find("w\\:gridCol")
            const tds=new Array(cols.length).fill(0).map((w,i)=>this.template_tc(w))
            row[where]("<w:tr>"+tds.join("")+"</w:tr>")
        }else{
            console.warn(`can't find row[${at}],ignore the command`)
        }
	}

    remove({id}){
        const target=this.file.getNode(id)
        if(target.get(0).name!=="w:tc"){
            target.remove()
        }

        //remove column
        const cell=target
        const at=cell.closest("w\\:tr").find("w\\:tc").index(cell)
        let grid=this.node.first("w\\:tblGrid")
		let cols=grid.find("w\\:gridCol")
		let len=cols.length
		let width=cols.toArray().reduce((w,a)=>w+parseInt(a.attribs["w:w"]),0)
		let ratio=len/(len-1)
		for(let i=0;i<len;i++){
			let col=cols.eq(i)
			let w=parseInt(parseInt(col.attr("w:w"))*ratio)
			col.attr("w:w",w)
			width-=w
		}

        cols.eq(at).remove()

		let rows=this.node.find("w\\:tr")
		for(let i=0;i<rows.length;i++){
			rows.eq(i)
				.find("w\\:tc")
				.eq(at).remove()
		}
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

	create(props,{id,at}){
        var cursor
        super.create(props)
        this.file.renderChanged(this.node,($,el)=>{
            const [p0]=$('#'+id).splitUpTo("paragraph",at)
            cursor=$(`#${el.id}`)
                .insertAfter(p0)
                .findFirst('text')
                .attr('id')
        })

		return {id:cursor,at:0}
	}
}
