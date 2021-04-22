import React from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import {render, Document, Page, PDFRenderer, Writer} from "./renderer"

export default class PDFEmitter extends Emitter.Format.Base{
    static displayName="PDF"
	static Renderer=PDFRenderer
	static Writer=Writer
	static Document=Document
	static Page=Page
	static defaultProps={
		type:"pdf",
		name:"PDF Document",
		ext:"pdf",
		representation: "pagination"
	}

	static contextTypes={
		...super.contextTypes,
		doc: PropTypes.object,
	}

    async emit(){
		const {
			props:{document:{pages, props}}, 
			constructor:{Renderer,Writer,Document,Page},
			ContextProvider
		}=this
		const writer=new Writer(this.context.doc)
		await writer.init()

		const pdf=render(
			<ContextProvider>
				<Document {...props}>
					{pages.map((a,i)=><Page key={i} {...a.props}>{a.createComposed2Parent()}</Page>)}
				</Document>
			</ContextProvider>,	
			writer
		)

		pdf.pipe(this.stream)
    }
}

