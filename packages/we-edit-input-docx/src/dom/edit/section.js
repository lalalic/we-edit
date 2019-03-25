import Base from "./base"

export class Section extends Base{
	create({kind}, reducer, target){
		const source=target.closest("section")
		this.template=a=>`<w:p><w:pPr>${source}</w:pPr></w:p>`
		
		const [p0,p1]=reducer.splitAtUpto(reducer.selection.start,"paragraph")
		
		super.create(...arguments)
		
		this.node.remove("w\\:sectPr>w\\:type")
		
		this.file
			.getNode(p0.attr('id'))
			.after(this.node)
			
		if(kind){
			this.file.getNode(source.attr('id'))
				.prepend(`<w:type w:val="${kind}"/>`)
		}
			
		reducer.renderChanged('root')
		
		
		let cursor=p1.findFirst('text').attr('id')
		return {id:cursor,at:0}
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