import { validateId, parseIds, } from "../src/tools/content-id";

describe('id validation',()=>{
    it.each([
        [12,true],
        [12.3,false],
        ["a12",true],
        ["a{sdfaf}",true],
        ["a{a/b/c.xml}"],
        ["a{a/b/c.xml}}",false],
        ["a{a/{b/c.xml}}",false],
        ["a{{a/b/c.xml}",false],
        ["a{{a/b/c.x}ml}",false],
        ["as[d.f",false],
        ["as[],:<>+~*#.!.f",false],
    ])(`%s`,(id,good=true)=>{
        if(!good){
            expect(()=>validateId(id)).toThrow()
        }else{
            expect(validateId(id)).toBe(true)
        }
    })
})

describe("parse ids joined with '.'",()=>{
    it.each([
        ["a.b.c",["a","b","c"]],
        ["a.   .c",false],
        ["a.b.c.",false],
        ["a.b{}.c",["a","b{}","c"]],
        [".",false],
        ["a.b{.xml}",["a","b{.xml}"]],
        ["a.b{.xml}.c{sdf.xml}",["a","b{.xml}","c{sdf.xml}"]]
    ])('%s',function(path,ids){debugger
        const good=ids!==false
        if(!good){
            expect(()=>parseIds(path)).toThrow()
        }else{
            expect(parseIds(path)).toMatchObject(ids)
        }
    })
})