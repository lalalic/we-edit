import JSONDocument from "../src/type/json"
import JSXDocument from "../src/type/jsx"
import XMLDocument from "../src/type/xml"

const JSON_FILE=`${__dirname}/doc.wed.json`
const XML_FILE=`${__dirname}/doc.wed.xml`
const JSX_FILE=`${__dirname}/doc.wed.jsx`
describe("types",()=>{
    describe("json type",()=>{
        const FILE={
            name:JSON_FILE,
            data:require("fs").readFileSync(JSON_FILE)
        }

        it("support '.wed.json'",()=>{
            expect(!!JSONDocument.support(FILE)).toBe(true)
        })

        it("can convert json to cheerio",()=>{
            const $=new JSONDocument().parse(FILE)
            expect($('paragraph').length>0).toBe(true)
            expect($('text').length>0).toBe(true)
        })

        it("can convert doc to object",()=>{
            const doc=new JSONDocument()
            const $=doc.parse(FILE)
            const serialized=doc.nodeToString($.root().children().get(0))
            const $1=doc.parse({data:serialized})
            expect($('text').length).toBe($1("text").length)
            expect($('paragraph').length).toBe($1("paragraph").length)
        })
    })

    it("support .wed.jsx",()=>{
        expect(!!JSXDocument.support({name:JSX_FILE})).toBe(true)
        return new JSXDocument()
            .parse({name:JSX_FILE, data:require("fs").readFileSync(JSX_FILE)})
            .then(doc=>{
                expect(doc.props).toBeDefined()
            })
    })

    it("support .wed.xml",()=>{
        expect(!!XMLDocument.support({name:XML_FILE})).toBe(true)
        return Promise.resolve(
                new XMLDocument()
                    .parse({name:XML_FILE, data:require("fs").readFileSync(XML_FILE)})
            )
            .then(doc=>{
                expect(doc).toBeDefined()
            })
    })
})