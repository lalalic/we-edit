import cheerio from "cheerio"
import transactify from "../src/tools/cheerio"

describe("transactify cheerio",()=>{
    const load=content=>{
        return cheerio.load(content||`
            <div>
                <ul>
                    <li class="apple">hello</li>
                    <li class="tomato" good="ok">hello</li>
                </ul>
                <p>
                    <span style="">hello world</span>
                    <i>I like it!</i>
                </p>
                <input type="text" value=""></input>
            </div>
        `,{xmlMode:true})
    }

    it("path",()=>{
        const $=transactify(load())
        expect($.path($("div").path()).is("div")).toBe(true)
        expect($.path($("i").path()).is("i")).toBe(true)
        expect($.path($("li.tomato").path()).is("li.tomato")).toBe(true)

        expect($.path([1,0]).get(0)).toMatchObject({type:"text"})

        expect($.path([0,1,5]).length).toBe(0)
        expect($.path([10,1,5]).length).toBe(0)
        expect($.path([]).length).toBe(1)
        expect($.path([]).get(0).type).toBe("root")
        expect($.path().length).toBe(1)
    })

    it("transaction functions",()=>{
        const $=transactify(load())
        expect($.startTransaction&&$.commit&&$.rollback).toBeTruthy()
    })

    it('trap only within transaction',()=>{
		const trap={}
        const $=transactify(load(),trap)
        const attrPatch=trap.attrPatch=jest.fn()
        $('div').attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(0)

        $.startTransaction()
        $('div').attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(1)
        $.commit()

        $('div').attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(1)

        $.startTransaction()
        $('div').attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(2)
        $.rollback()
        $('div').attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(2)

        const $div=$('div')
        $div.attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(2)

        $.startTransaction()
        $div.attr('x','1')
        expect(attrPatch).toHaveBeenCalledTimes(3)
    })

	it("save trap for all missing specific function trap",()=>{
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

    describe("commit, rollback",()=>{
        it.each([
            ["attr"],
            ["data"],
            ["prop"],
            ["css"]
        ])("%s",op=>{
            const $=transactify(load())
    		$.startTransaction()
            expect($("li.tomato")[op]("x","1")[op]("x")).toBe("1")
            const patches=$.commit()
            expect(patches.length).toBe(1)
            $.rollback(patches)
            expect($("li.tomato")[op]("x")).toBeFalsy()
        })

        it("text",()=>{
            const $=transactify(load())
    		$.startTransaction()
            const text=$("li.tomato").text()
            expect($("li.tomato").text("x").text()).toBe("x")
            const patches=$.commit()
            expect(patches.length).toBe(1)
            $.rollback(patches)
            expect($("li.tomato").text()).toBe(text)
        })

        it("removeAttr",()=>{
            const $=transactify(load())
    		$.startTransaction()
            const good=$("li.tomato").attr("good")
            expect($("li.tomato").removeAttr("good").attr("good")).toBe(undefined)
            const patches=$.commit()
            expect(patches.length).toBe(1)
            $.rollback(patches)
            expect($("li.tomato").attr("good")).toBe(good)
        })

        it("addClass, toggleClass, removeClass",()=>{
            const $=transactify(load())
            const $li=$("li.tomato")
    		$.startTransaction()
            expect($li.addClass("good").hasClass("good")).toBe(true)
            expect($li.hasClass("tomato")).toBe(true)
            const patches=$.commit()
            expect(patches.length).toBe(1)
            $.rollback(patches)
            expect($li.hasClass("good")).not.toBe(true)
            expect($li.hasClass("tomato")).toBe(true)

            $.startTransaction()
            expect($li.removeClass("tomato").hasClass("tomato")).not.toBe(true)
            $.rollback()
            expect($li.hasClass("tomato")).toBe(true)

            $.startTransaction()
            expect($li.toggleClass("tomato").hasClass("tomato")).not.toBe(true)
            $.rollback()
            expect($li.hasClass("tomato")).toBe(true)

            $.startTransaction()
            expect($li.toggleClass("good").hasClass("good")).toBe(true)
            $.rollback()
            expect($li.hasClass("good")).not.toBe(true)
        })

        xit("val",()=>{
            const $=transactify(load(`<input value="2"></input>`))
    		$.startTransaction()
            const $input=$("input")
            const value=$input.val()
            debugger
            expect($input.val("x").val()).toBe("x")

            const patches=$.commit()
            expect(patches.length).toBe(1)
            $.rollback(patches)
            expect($input.val()).toBe(value)
        })
        describe("new block construction",()=>{
            it("append, prepend",()=>{
                const $=transactify(load())
                var patches=null

        		$.startTransaction()
                $('div').append("<b/>")
                expect($('div b').length).toBe(1)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('div b').length).toBe(0)

                $.startTransaction()
                $('div').prepend("<b/>")
                expect($('div b').length).toBe(1)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('div b').length).toBe(0)
            })

            it("appendTo, prependTo",()=>{
                const $=transactify(load())
                var patches=null
                const html=$.html()

                $.startTransaction()
                $("<b/>").appendTo($('ul'))
                expect($('ul').contents().last().is("b")).toBe(true)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($.html()).toBe(html)

                $.startTransaction()
                $("<b/>").prependTo($('ul'))
                expect($('ul').contents().first().is("b")).toBe(true)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($.html()).toBe(html)
            })

            it("after, before",()=>{
                const $=transactify(load())
                var patches=null
                const html=$.html()

                $.startTransaction()
                $('ul').after("<b/>","<b/>")
                expect($('ul').next().next().is("b")).toBe(true)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('div b').length).toBe(0)
                expect($.html()).toBe(html)

                $.startTransaction()
                $('ul').before("<b/>","<b/>")
                expect($('ul').prev().prev().is("b")).toBe(true)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($.html()).toBe(html)
            })

            it("insertAfter, insertBefore",()=>{
                const $=transactify(load())
                var patches=null
                const html=$.html()

                $.startTransaction()
                $("<b/>").insertAfter($('ul'))
                expect($('ul').next().is("b")).toBe(true)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('div b').length).toBe(0)
                expect($.html()).toBe(html)

                $.startTransaction()
                $("<b/>").insertBefore($('ul'))
                expect($('ul').prev().is("b")).toBe(true)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($.html()).toBe(html)
            })

            it("replaceWith, empty, html, wrap",()=>{
                const $=transactify(load())
                var patches=null

        		$.startTransaction()
                $('li.tomato').replaceWith("<b/>")
                expect($('div b').length).toBe(1)
                expect($('li.tomato').length).toBe(0)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('li.tomato').length).toBe(1)

                $.startTransaction()
                $('ul').empty()
                expect($('li').length).toBe(0)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('li').length).toBe(2)

                $.startTransaction()
                $('ul').html("<b/>")
                expect($('li').length).toBe(0)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('li').length).toBe(2)

                $.startTransaction()
                $('ul').wrap("<b/>")
                expect($('b>ul').length).toBe(1)
                patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($('b>ul').length).toBe(0)
            })
        })

        describe("existing node construction",()=>{
            it("append",()=>{
                const $=transactify(load())
                var patches=null
                const html=$.html()
                $.startTransaction()
                $("p").append($("li"))
                patches=$.commit()
                expect($("p").is(":has(li)")).toBe(true)
                $.rollback(patches)
                expect($.html()).toBe(html)
            })
        })

        it("remove",()=>{
            const $=transactify(load())
            var patches=null
            const $li=$('li')
            const ulHtml=$('ul').html()
            $.startTransaction()
            $li.remove()
            patches=$.commit()
            expect(patches.length).toBe($li.length)
            $.rollback(patches)
            expect($("li").length).toBe($li.length)
            expect($("li").eq(0).attr("class")).toBe($li.eq(0).attr("class"))
            expect($("li").eq(1).attr("class")).toBe($li.eq(1).attr("class"))
            expect($('ul').html()).toBe(ulHtml)

            $.startTransaction()
            $("li.tomato").remove()
            $("li").remove()
            patches=$.commit()
            expect(patches.length).toBe($li.length)
            $.rollback(patches)
            expect($("li").length).toBe($li.length)
            expect($("li").eq(0).attr("class")).toBe($li.eq(0).attr("class"))
            expect($("li").eq(1).attr("class")).toBe($li.eq(1).attr("class"))

        })

        it("a serias action",()=>{
            const $=transactify(load())
            const html=$('div').html()
            $.startTransaction()
            $('p').addClass("section").attr("closed","1").data("arial","d").append("<span>hello world</span>")

            $('p span').wrap('<div/>')

            $('li.apple').empty().append("<span>good apple</span>")

            $('ul').replaceWith('<ol><li class="tomato"></li></ol>')

            $('ul').append($('p'))

            const patches=$.commit()
            expect($('div').html()).not.toBe(html)
            $.rollback(patches)
            expect($('div').html()).toBe(html)
        })
    })

    describe("compress patches in a transaction", ()=>{
        describe("action on same path",()=>{
            it.each([
                ["text",$=>$("span").text("god").text("good").text("yuk")],
                ["val",$=>$("input").val("god").val("good").val("yuk")],
                ["replaceWith",$=>($("span").replaceWith("<b>god</b>"),$("b").replaceWith("<strong>he</strong>"))],
                ["html",$=>($("span").html("<b>god</b>").html("<strong>he</strong>"))],
                ["wrap",$=>($("span").wrap("<b>god</b>"), $("b").wrap("<strong>he</strong>"))],
                ["empty",$=>($("span").empty("<b>god</b>"), $("b").empty("<strong>he</strong>"))],
                ["any order of replaceWith,wrap,empty,html", $=>{
                    $("span").replaceWith("<b/>")
                    $("b").wrap("<span/>")
                    $("span").html("hello god")
                    $("span").empty()
                }],
                ["attr on same key",$=>$("span").attr("x",1).attr("x",2).attr("x",3)],
                ["css on same key",$=>$("span").css("size",1).css("size",2).css("size",3)],
                ["data on same key", $=>$("span").data("arial",1).data("arial",2).data("arial",3)],
                ["prop on same key",$=>$("span").prop("g",1).prop("g",2).prop("g",3)],
            ])("%s",(name, actions)=>{
                const $=transactify(load())
                const html=$.html()
                $.startTransaction()

                actions($)

                const patches=$.commit()
                expect(patches.length).toBe(1)
                $.rollback(patches)
                expect($.html()).toBe(html)
            })
        })

        xit("anything can be ignore, if parent was ever replaced",()=>{
            const $=transactify(load())
            const html=$.html()
            $.startTransaction()

            $("div").wrap("body")
            $("span").attr("x",1).css("x",1).data("x",1).prop("g",1)
            $("ul").remove()
            $('i').html("<b/>")

            const patches=$.commit()
            expect(patches.length).toBe(1)
            $.rollback(patches)
            expect($.html()).toBe(html)
        })
    })
})
