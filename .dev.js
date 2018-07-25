import "we-edit-representation-html"
import "we-edit-representation-pagination"
import "we-edit-representation-text"

import iDocx from "we-edit-input-docx"
import iJson from "we-edit-input-json"
import ioFile from "we-edit-loader-stream-file"
import ioBrowser from "we-edit-loader-stream-browser"
import SVG from "we-edit-output-svg"
import PDF from "we-edit-output-pdf"
import HTML from "we-edit-output-html"


iDocx.install()
iJson.install()
ioFile.install()
ioBrowser.install()
SVG.install()
PDF.install()
HTML.install()
