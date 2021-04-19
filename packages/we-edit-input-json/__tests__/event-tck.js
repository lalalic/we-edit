import tck from "we-edit/__tests__/input-event-tck"
import JSONType from "../src/type/json"
import XMLType from "../src/type/xml"

console.debug=console.log=a=>a
tck(JSONType, `${__dirname}/doc.wed.json`,false)