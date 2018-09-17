import html from "we-edit-representation-html"
import pagination from "we-edit-representation-pagination"
import text from "we-edit-representation-text"

import iDocx from "we-edit-input-docx"
import iJson from "we-edit-input-json"
import ioFile from "we-edit-loader-stream-file"
import ioBrowser from "we-edit-loader-stream-browser"
import SVG from "we-edit-output-svg"
import PDF from "we-edit-output-pdf"

import Variant from "we-edit-variant"

iDocx.install({
	template:"/templates/normal.docx"
})
iJson.install()
ioFile.install()
ioBrowser.install()
SVG.install()
PDF.install()

Variant.install()
