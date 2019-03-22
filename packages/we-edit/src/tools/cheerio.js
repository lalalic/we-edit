function path(el,routes=[]){
    routes.unshift((el.parent||el.root).children.indexOf(el))
    if(el.parent){
        path(el.parent,routes)
    }
    return routes
}

function canIgnore(A, B){
    debugger
    if(A.path.join(",")==B.path.join(",")){
        if(A.op==B.op){
            switch(A.op){
                case "attr":
                case "data":
                case "css":
                case "prop":
                case "val":
                case "text":
                case "replaceWith":
                    return true
            }
        }
    }
    return false
}

const DefaultTrap={
    save(){

    },

    applyPatch(patches){

    },

    mergePatches(patch, patches){
        if(!Array.isArray(patch)){
            patch=[patch]
        }
        if(patch.length==1){
            if(patches.length>0){
                if(canIgnore(patch[0], patches[patches.length-1])){
                    return
                }
            }
        }
        patches.splice(patches.length, 0, ...patch)
    },

    attrPatch(key,value){
        return this.map((i,el)=>({op:"attr",path:path(el,[key]), value:this.eq(i).attr(key)})).get()
    },

    attrApplyPatch({path, value=null, key=path.pop()}){
        this.path(path).attr(key,value)
    },

    cssPatch(key, value){
        return this.map((i,el)=>({op:"css",path:path(el,[key]), value:typeof(key)=="string" && this.eq(i).css(key)})).get()
    },

    cssApplyPatch({path,value="",key=path.pop()}){
        const args=[key]
        if(typeof(key)=="string")
            args.push(value)
        this.path(path).css(...args)
    },

    propPatch(key,value){
        return this.map((i,el)=>({op:"prop",path:path(el,[key]), value:this.eq(i).prop(key)})).get()
    },

    propApplyPatch({path,value=null,key=path.pop()}){
        this.path(path).prop(key,value)
    },


    dataPatch(key,value){
        return this.map((i,el)=>({op:"data",path:path(el,[key]), value:this.eq(i).data(key)})).get()
    },

    dataApplyPatch({path,value=null,key=path.pop()}){
        this.path(path).data(key,value)
    },


    textPatch(value){
        return this.map((i,el)=>({op:"text",path:path(el), value:this.eq(i).text()})).get()
    },

    textApplyPatch({path,value=""}){
        this.path(path).text(value)
    },


    valPatch(value){//val() actually use attr() at backend, so it can be ignored
        return this.map((i,el)=>({op:"val",path:path(el), value:this.eq(i).val()})).get()
    },

    valApplyPatch({path,value=""}){
        this.path(path).val(value)
    },


    removeAttrPatch(key){
        return DefaultTrap.attrPatch.call(this,key, null)
    },

    removeClassPatch(value){
        return DefaultTrap.attrPatch.call(this,"class")
    },

    toggleClassPatch(value){
        return DefaultTrap.attrPatch.call(this,"class")
    },

    addClassPatch(value){
        return DefaultTrap.attrPatch.call(this,"class")
    },

    appendPatch(value){
        return this.map((i,el)=>({op:"splice",path:path(el,[(el.children||[]).length])})).get()
    },

    spliceApplyPatch({path, from=path.pop(), value:to}){
        const target=this.path(path).contents()
        target.slice(from,typeof(to)=="function" ? to(target.length) : to)
            .remove()
    },

    prependPatch(){
        return this.map((i,el)=>({op:"splice",path:path(el,[0]), value:-(el.children||[]).length})).get()
    },

    afterPatch(){
        return this.map((i,el)=>{
            const route=path(el)
            const isRootChild=route.length==1
            const from=route[route.length-1]=route[route.length-1]+1
            const length=(isRootChild ? this.constructor.root() : this.eq(i).parent()).contents().length
            return {op:"splice",path:route, value:postLength=>from+postLength-length}
        }).get()
    },

    beforePatch(){
        return this.map((i,el)=>{
            const route=path(el)
            const isRootChild=route.length==1
            const from=route[route.length-1]
            const length=(isRootChild ? this.constructor.root() : this.eq(i).parent()).contents().length
            return {op:"splice",path:route, value:postLength=>from+postLength-length}
        }).get()
    },

    insertAfterPatch(target){
        const removed=el=>el.parent ? removed(el.parent) : this.constructor.root().contents().index(el)==-1
        return DefaultTrap.afterPatch.call(this.constructor(target).filter((i,el)=>!removed(el)))
    },

    insertBeforePatch(target){
        const removed=el=>el.parent ? removed(el.parent) : this.constructor.root().contents().index(el)==-1
        return DefaultTrap.beforePatch.call(this.constructor(target).filter((i,el)=>!removed(el)))
    },

    replaceWithPatch(len){
        return this.map((i,el)=>{
            return {op:"replaceWith",path:path(el), value: this.eq(i).clone(), len}
        }).get()
    },

    replaceWithApplyPatch({path, value, len=1}){
        const target=this.path(path)
        if(len>1){
            new Array(len-1).fill(0)
                .forEach(i=>{
                    target.next().remove()
                })
        }
        target.replaceWith(value)

    },

    emptyPatch(){
        return DefaultTrap.replaceWithPatch.bind(this)()
    },

    htmlPatch(){
        return DefaultTrap.replaceWithPatch.bind(this)()
    },

    wrapPatch(fn){

        return DefaultTrap.replaceWithPatch.bind(this)()
    },

    removePatch(selector){
        return (arguments.length==1 ? this.filter(selector) : this).map((i,el)=>{
            return {op:"insert", path:path(el), value:this.eq(i).clone()}
        }).get()
    },

    insertApplyPatch({path, value, index=path.pop()}){
        const target=this.path(path)
        const contents=target.contents()
        if(contents.length-1>=index){
            contents.eq(index).before(value)
        }else if(contents.length==0){
            target.append(value)
        }else{
            contents.eq(index-1).after(value)
        }
    }
}

module.exports=function($, trap=DefaultTrap){
    const patches=[]
    var inTransaction=false
    const removed=el=>el.parent ? removed(el.parent) : $.root().contents().index(el)==-1
    const save=(ctx, op, ...args)=>{
        ctx=ctx.filter((i,el)=>!removed(el))//don't record patch for removed elements
        var patch=null
        if(trap[`${op}Patch`]){
            patch=trap[`${op}Patch`].call(ctx, ...args)||[]
        }else{
            patch=trap.save.call(ctx, op, ...args)||[]
        }

        if(trap.mergePatches){
            trap.mergePatches(patch, patches)
        }
    }

    const applyPatch=function({op}){
        if(trap[`${op}ApplyPatch`]){
            trap[`${op}ApplyPatch`].call($,...arguments)
        }else{
            trap.applyPatch.call($,...arguments)
        }
    }


    Object.assign($.prototype,{
        path(){
            return path(this.get(0))
        }
    })

    $.prototype=new Proxy($.prototype,{
        get(target,key, ctx){
            var got=Reflect.get(...arguments)
            if(!inTransaction){
                return got
            }

            switch(key){
                case "css":
                case "data":
                case "prop":
                case "attr":
                    return function(name,value){
                        if(value===undefined && typeof(name)=="object" && !Array.isArray(name)){
                            Object.keys(name).forEach(k=>ctx[key](k, name[k]))
                            return ctx
                        }

                        if(value!=undefined){
                            debugger
                            save(ctx, key, ...arguments)
                            if("css,data,prop".split(",").includes(key)){
                                try{//to avoid save attr op
                                    inTransaction=false
                                    debugger
                                    return got.call(ctx,...arguments)
                                }finally{
                                    inTransaction=true
                                }
                            }
                        }

                        return got.call(ctx,...arguments)
                    }
                case "val":
                    return function(){
                        if(arguments.length){
                            save(ctx, key,...arguments)
                            try{//to avoid save attr op
                                inTransaction=false
                                return got.call(ctx,...arguments)
                            }finally{
                                inTransaction=true
                            }
                        }
                        return got.call(ctx, ...arguments)
                    }
                    //index would not be changed, so path would not be changed
                case "text":
                case 'removeAttr':
                case 'removeClass':
                case 'addClass':
                case 'toggleClass':
                case 'wrap':
                    return function(){
                        if(arguments.length){
                            save(ctx, key,...arguments)
                        }
                        return got.call(ctx, ...arguments)
                    }

                case 'html':
                case 'append':
                case 'prepend':
                case 'after':
                case 'before':
                    return function(){
                        if(arguments.length){
                            $(arguments[0]).remove()
                            if(ctx.length==1){
                                save(ctx, key,...arguments)
                            }else if(ctx.length>1){
                                save(ctx.parent(),"replaceWith",...arguments)
                            }
                        }
                        return got.call(ctx, ...arguments)
                    }
                case 'replaceWith':
                    return function(){
                        if(arguments.length){
                            const len=$(arguments[0]).remove().length
                            if(ctx.length==1){
                                save(ctx, key,len)
                            }else if(ctx.length>1){
                                save(ctx.parent(),"replaceWith",...arguments)
                            }
                        }
                        return got.call(ctx, ...arguments)
                    }

                case 'insertAfter':
                    return function(){
                        if(arguments.length){
                            const len=ctx.length
                            const target=$(arguments[0])
                            target.after(ctx)
                            return $(target.map(i=>
                                new Array(len-1).fill(0)
                                    .reduce((c,i)=>c.add(c.last().next()),target.eq(i).next())
                                    .toArray()
                            ).get())
                        }
                        return got.call(ctx, ...arguments)
                    }
                case 'insertBefore':
                    return function(){
                        if(arguments.length){
                            const len=ctx.length
                            const target=$(arguments[0])
                            target.before(ctx)
                            return $(target.map(i=>
                                new Array(len-1).fill(0)
                                    .reduce((c,i)=>c.add(c.last().prev()),target.eq(i).prev())
                                    .toArray()
                            ).get())
                        }
                        return got.call(ctx, ...arguments)
                    }
                case 'empty':
                    return function(){
                        save(ctx, key,...arguments)
                        return got.call(ctx, ...arguments)
                    }
                case 'remove':
                    return function(){
                        if(arguments.length){
                            ctx.filter(...arguments).remove()
                        }else{
                            ctx.each((i,el)=>{
                                const $el=ctx.eq(i)
                                save($el, key)
                                return got.call($el)
                            })
                        }
                        return ctx
                    }
                default:{
                    return got;
                }
            }
        }
    })

    return Object.assign($,{
        path(route){
            if(!route || route.length==0)
                return $.root()
            return route.reduce((current, i)=>current.contents().eq(i), $.root())
        },

        startTransaction(){
            inTransaction=true
        },

        commit(){
            inTransaction=false
            return patches.splice(0,patches.length)
        },

        rollback(myPatches){
            inTransaction=false
			myPatches=myPatches||patches
            myPatches.reverse().forEach(a=>applyPatch(a))
            return myPatches.splice(0,myPatches.length)
        }
    })
}
