import React from "react"
import {Emitter} from "we-edit"
import {render, Document, Page, PDFRenderer, Writer} from "./renderer"

export default class PDFEmitter extends Emitter.Format.Base{
    static displayName="PDF"
	static Renderer=PDFRenderer
	static Writer=Writer
	static defaultProps={
		type:"pdf",
		name:"PDF Document",
		ext:"pdf",
		representation: "pagination"
	}

    emit(){
		const {props:{document:{pages, props}}, constructor:{Renderer,Writer}}=this
		const ContextProvider=this.ContextProvider
		const pdf=render(
			<ContextProvider>
				<Document {...props}>
					{pages.map((a,i)=><Page key={i} {...a.props}>{a.createComposed2Parent()}</Page>)}
				</Document>
			</ContextProvider>,
			{Renderer, Writer}
		)

		pdf.pipe(this.stream)
    }
}

