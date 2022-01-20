import {dom} from "we-edit"
import Base from "./base"

export class Section extends Base{
	got(nodeName){
		return this.node.children(nodeName.replace(":", "\\:"))
	}

	layout(layout){
		this.apply(layout)
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
			const w1=(w-right-left-(cols.length-1)*720)/cols.reduce((n,i)=>n+i,0)
			wCols.append(cols.map(i=>`<w:col w:w="${parseInt(w1*i)}" w:space="${space}"/>`))
			wCols.children().last().removeAttr("w:space")
		break
		}
	}

	size({width,height}){
		this.got("w:pgSz").attr('w:w',this.file.cm2dxa(width)).attr('w:h',this.file.cm2dxa(height))
	}

	margin(margin){
		const {top,right,bottom,left}=dom.Unknown.MarginShape.normalize(margin)
		const pgMar=this.got("w:pgMar")
		top!=undefined && pgMar.attr('w:top',this.file.px2dxa(top))
		right!=undefined && pgMar.attr('w:right',this.file.px2dxa(right))
		bottom!=undefined && pgMar.attr('w:bottom',this.file.px2dxa(bottom))
		left!=undefined && pgMar.attr('w:left',this.file.px2dxa(left))
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