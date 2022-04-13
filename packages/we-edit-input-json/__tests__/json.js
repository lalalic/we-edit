import Document from "../src/type/json"

const JSON_FILE=`${__dirname}/doc.wed.json`
describe("json document",()=>{
    const FILE={
        name:JSON_FILE,
        data:require("fs").readFileSync(JSON_FILE)
    }

    it("support '.wed.json'",()=>{
        expect(!!Document.support(FILE)).toBe(true)
    })

    it("can convert json to cheerio",()=>{
        const $=new Document().parse(FILE)
        expect($('paragraph').length>0).toBe(true)
        expect($('text').length>0).toBe(true)
    })

    it("can convert doc to object",()=>{
        const doc=new Document()
        const $=doc.parse(FILE)
        const serialized=doc.nodeToString($.root().children().get(0))
        const $1=doc.parse({data:serialized})
        expect($('text').length).toBe($1("text").length)
        expect($('paragraph').length).toBe($1("paragraph").length)
    })
})