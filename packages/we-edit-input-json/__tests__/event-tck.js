import tck from "we-edit/__tests__/input-event-tck"
import JSONType from "../src/type/json"
import XMLType from "../src/type/xml"
import JSXDocument from "../src/type/jsx"

//console.debug=console.log=a=>a
tck(JSXDocument, `${__dirname}/doc.wejsx`,true)