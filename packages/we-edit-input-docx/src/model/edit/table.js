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
	
	insert({type, at}){
		return this[`insert_${type}`](at)
	}
	
	insert_row(at){
		let target=this.node.find("w\\:tr").eq(at)
		let newRow=target.clone()
		target.after(newRow)
	}
	
	insert_col(at){
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
				.after(`<w:tc><w:p></w:p></w:tc>`)
		}
	}

    rows(rows,{cols}){
		cols=cols.map(w=>this.px2dxa(w))
		this.node.find("w\\:tblGrid")
            .append(cols.map(w=>`<w:gridCol w:w="${w}"/>`).join(""))
			
        let elRows=new Array(rows).fill(0)
                .map(a=>{
                    return [
                        "<w:tr>",
                        cols.map(w=>`
                			<w:tc>
                				<w:p>
									<w:pPr>
										<w:rPr>
											<w:rFonts w:ascii="Verdana" w:hAnsi="Verdana"/>
										</w:rPr>
									</w:pPr>
								</w:p>
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
	
	create(props,reducer,target){
		const [p0,p1]=reducer.splitAtUpto(reducer.selection.start,"paragraph")
		const createdNode=super.create(...arguments)
		const {id:createdId}=reducer.renderChanged(createdNode)
		
		let created=reducer.$(`#${createdId}`).insertAfter(p0)
		
		reducer.renderChangedChildren(p0.parent().attr('id'))
		let cursor=created.findFirst('text').attr('id')
		return {id:cursor,at:0}
	}
}
