import Base from "./base"

export class Section extends Base{
	apply(){
		return this.node
	}
	
	create(props, reducer, target){
		const [p0,p1]=reducer.splitAtUpto(reducer.selection.start,"paragraph")
		const createdNode=super.create(...arguments)
		this.file.getNode(p0.attr('id'))
			.after(createdNode)
			
		reducer.renderChanged('root')
		
		
		let cursor=p1.findFirst('text').attr('id')
		return {id:cursor,at:0}
		
	}
	
	template(props){
		return `
		<w:p w:rsidR="002C1430" w:rsidRDefault="002C1430">
			<w:pPr>
				<w:sectPr w:rsidR="002C1430">
					<w:headerReference w:type="default" r:id="rId7"/>
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