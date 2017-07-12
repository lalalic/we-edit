import Base from "./base"

export class Table extends Base{
    apply(props){
        if(!props.id){
            return new Creating(this.file, this.node).apply(props)
        }

        return super.apply(...arguments)
    }

    attachCreated(node, locationId){
        let locationNode=this.file.getNode(locationId)
        let p=locationNode.closest("w\\:p")
        p.after(node)
        return node
    }

    style({namedStyle}){
        return namedStyle
    }

    tblLook({tblLook}){
        if(!tblLook)
            return null
    }

    cols(cols){

    }

    rows(rows){

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

class Creating extends Table{
    constructor(file,node){
        super(file)
        this.node=node
    }

    apply({cols, width, ...props}){
        let aColWidth=parseInt(width/cols)
        props.cols=new Array(cols-1).fill(aColWidth)
        props.cols.push(width-(cols-1)*aColWidth)
    }

    cols(cols){
        this.node.find("w\\:tblGrid")
            .append(cols.map(w=>`<w:gridCol w:w="${w}"/>`).join(""))
    }

    rows(rows,{cols}){
        let elRows=new Array(rows).fill(0)
                .map(a=>{
                    return [
                        "<w:tr>",
                        cols.map(w=>w=>`
                			<w:tc>
                				<w:tcPr>
                					<w:tcW w:w="${w}" w:type="dxa"/>
                				</w:tcPr>
                				<w:p><w:r><w:t></w:t></w:r></w:p>
                			</w:tc>
                		`).join(""),
                        "</w:tr>"
                    ].join("")
                }
            )
        this.node.append(elRows.join(""))
    }
}

class ColInserting extends Table{

}

class RowInserting extends Table{

}

class ColResizing extends Table{

}
