jest.mock("../src/office",()=>jest.fn())

import tck from "we-edit/__tests__/input-event-tck"
import DocType from "../src"

console.debug=console.log=a=>a
tck(DocType, `${__dirname}/basic.docx`)