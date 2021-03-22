import React from "react"
import {Emitter} from "we-edit"
import {render, Document, Page} from "./renderer"

export default class PDFEmitter extends Emitter.Format.Base{
    static displayName="PDF"
	static defaultProps={
		type:"pdf",
		name:"PDF Document",
		ext:"pdf",
		representation: "pagination"
	}

    emit(){
		const {document:{pages, props}}=this.props
		const ContextProvider=this.ContextProvider
		const pdf=render(
			<ContextProvider>
				<Document {...props}>
					{pages.map((a,i)=><Page key={i} {...a.props}>{a.createComposed2Parent()}</Page>)}
				</Document>
			</ContextProvider>
		)

		pdf.pipe(this.stream)
    }
}

