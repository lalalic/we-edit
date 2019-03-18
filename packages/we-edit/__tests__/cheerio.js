import cheerio from "cheerio"
import transactify from "../src/tools/cheerio"

describe("transactify cheerio",()=>{
    const load=content=>{
        return cheerio.load(content||`
            <div>
                <ul>
                    <li class="apple">hello</li>
                    <li class="tomato">hello</li>
                </ul>
                <p>
                    <span>hello world</span>
                    <i>I like it!</i>
                </p>
            </div>
        `)
    }

    it("transaction functions",()=>{
        const $=transactify(load())
        expect($.startTransaction&&$.commit&&$.rollback).toBeTruthy()
    })

    it('save only within transaction',()=>{
		const trap={}
        const $=transactify(load(),trap)
        expect($('div').save).toBeUndefined()

        $.startTransaction()
        expect($('div').save).toBeDefined()
        $.commit()
        expect($('div').save).toBeUndefined()

        $.startTransaction()
        expect($('div').save).toBeDefined()
        const patch=trap.patch=jest.fn()
        $.rollback()
        expect(patch).toHaveBeenCalled()
        expect($('div').save).toBeUndefined()

        const $div=$('div')
        expect($div.save).toBeUndefined()
        $.startTransaction()
        expect($div.save).toBeDefined()
    })

    it('save must be injected',()=>{
        const trap={}
        const $=transactify(load(),trap)
        const $div=$('div')
		$.startTransaction()
        trap.save=jest.fn()
        trap.patch=jest.fn()

        $div.save()
        expect(trap.save).toHaveBeenCalledTimes(1)

        $('div').save()
        expect(trap.save).toHaveBeenCalledTimes(2)
    })
	
	it("manipuating still works",()=>{
		const trap={}
		const $=transactify(load(),trap)
		const save=trap.save=jest.fn()
        const $div=$('div')
		$div.attr('x',"1")
		expect($div.attr('x')).toBe("1")
		expect(save).not.toHaveBeenCalled()
		
		$.startTransaction()
		$div.attr('x',"2")
		expect($div.attr('x')).toBe("2")
		expect(save).toHaveBeenCalledTimes(1)
		
		
	})
})
