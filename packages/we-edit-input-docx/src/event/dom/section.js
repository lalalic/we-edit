import {dom} from "we-edit"
import Base from "./base"

export class Section extends Base{
	got(nodeName){
		return this.node.children(nodeName.replace(":", "\\:"))
	}

	layout(layout){
		this.apply(layout)
	}

	colGap({i,dx, atEnd}){
		dx=this.file.px2dxa(dx)
		const wCols=this.got("w:cols")
		const num=wCols.attr('w:num')
		if(!num)//no cols
			return 
		const cols=wCols.children('w\\:col')
		let col=cols.eq(i)
		if(col.length){
			col.attr('w:space', parseInt(col.attr('w:space'))+dx)
			atEnd && (col=cols.eq(i+1));
			col.attr('w:w', parseInt(col.attr('w:w'))-dx)
		}else{//equal column
			wCols.attr('w:space', dx+parseInt(wCols.attr('w:space')))
		}
	}

	colGapMove({i,dx}){//only unequal columns support moving
		dx=this.file.px2dxa(dx)
		const wCols=this.got("w:cols")
		const num=wCols.attr('w:num')
		if(!num)
			return 
		const cols=wCols.children('w\\:col')
		if(cols.length==0)
			return 
		let col=cols.eq(i)
		col.attr('w:w',parseInt(col.attr('w:w'))-dx)

		col=cols.eq(i+1)
		col.attr('w:w',parseInt(col.attr('w:w'))+dx)
	}

	cols(cols){
		if(cols.length>1 && new Set(cols).size==1){
			cols=[cols.length]
		}

		if(cols.length==1 && cols[0]==1){
			cols=[]
		}

		const wCols=this.got("w:cols")
		const space=720
		switch(cols.length){
		case 0:
			wCols.removeAttr('w:num').removeAttr('w:equalWidth').children().remove()
		break	
		case 1:
			wCols.attr('w:num',cols[0]).attr('w:space',space).children().remove()
		break
		default:
			wCols.empty()
			wCols.attr('w:equalWidth',"0")
			wCols.attr('w:num',cols.length)
			const w=parseInt(this.node.children("w\\:pgSz").attr('w:w'))
			const {"w:left":l, "w:right":r, left=parseInt(l), right=parseInt(r)}=this.node.children("w\\:pgMar")[0].attribs
			const w1=(w-right-left-(cols.length-1)*space)/cols.reduce((n,i)=>n+i,0)
			wCols.append(cols.map(i=>`<w:col w:w="${parseInt(w1*i)}" w:space="${space}"/>`))
			wCols.children().last().removeAttr("w:space")
		break
		}
	}

	size({width,height}){
		this.got("w:pgSz").attr('w:w',this.file.cm2dxa(width)).attr('w:h',this.file.cm2dxa(height))
	}

	margin({top,right,bottom,left}){
		const pgMar=this.got("w:pgMar")
		top!=undefined && pgMar.attr('w:top',this.file.px2dxa(top))
		bottom!=undefined && pgMar.attr('w:bottom',this.file.px2dxa(bottom))
		if(right!=undefined){
			right=this.file.px2dxa(right)

			const lastCol=this.got('w:cols').children('w\\:col').last()
			if(lastCol.length){
				const dx=right-parseInt(pgMar.attr('w:right'))
				lastCol.attr('w:w', parseInt(lastCol.attr('w:w'))-dx)
			}
			pgMar.attr('w:right',right)

		}

		if(left!=undefined){
			left=this.file.px2dxa(left)

			const firstCol=this.got('w:cols').children('w\\:col').first()
			if(firstCol.length){
				const dx=left-parseInt(pgMar.attr('w:left'))
				firstCol.attr('w:w',parseInt(firstCol.attr('w:w'))-dx)
			}

			pgMar.attr('w:left',left)
		}


	}

	orientation(o){
		const $sz=this.got("w:pgSz")
		const {"w:w":w, "w:h":h}=$sz[0].attribs
		if((parseInt(w)<parseInt(h) && o=="landscape")||(parseInt(w)>parseInt(h) && o=="portrait")){
			if(o=="portrait"){
				$sz.removeAttr("w:orient")
			}else{
				$sz.attr("w:orient",o)
			}
			$sz.attr("w:h",w).attr("w:w",h)
			const $mar=this.got("w:pgMar")
			const {"w:top":t,"w:bottom":b,"w:left":l,"w:right":r}=$mar[0].attribs
			$mar.attr("w:top",r).attr("w:right",b).attr("w:bottom",l).attr("w:left",t)
		}
	}

	template(props){
		return `
		<w:p>
			<w:pPr>
				<w:sectPr w:rsidR="002C1430">
					<w:pgSz w:w="12240" w:h="15840"/>
					<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
					<w:cols w:space="708"/>
					<w:docGrid w:linePitch="360"/>
				</w:sectPr>
			</w:pPr>
		</w:p>
		`
	}
}