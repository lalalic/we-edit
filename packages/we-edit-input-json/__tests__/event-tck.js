import tck from "we-edit/__tests__/input-event-tck"
import JSXDocument from "../src/type/jsx"

console.debug=console.log=a=>a
tck(JSXDocument, `${__dirname}/doc.wejsx`)