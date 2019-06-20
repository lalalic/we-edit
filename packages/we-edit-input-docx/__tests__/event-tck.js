import tck from "we-edit/__tests__/input-event-tck"
import DocxType from "../src"

console.debug=console.log=a=>a
tck(DocxType, `${__dirname}/basic.docx`)