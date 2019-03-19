function path(el,routes=[]){
    routes.unshift((el.parent||el.root).children.indexOf(el))
    if(el.parent){
        path(el.parent,routes)
    }
    return routes
}

const DefaultTrap={
    save(){

    },

    applyPatch(patches){
        (patches||[]).forEach(({op, path, value})=>{

        })
    },

    attrPatch(key,value){
        return this.map((i,el)=>({op:"attr",path:path(el,[key]), value:this.eq(i).attr(key)})).get()
    },

    attrApplyPatch({path, value=null, key=path.pop()}){
        this.path(path).attr(key,value)
    },

    cssPatch(key, value){
        return this.map((i,el)=>({op:"css",path:path(el,[key]), value:this.eq(i).css(key)})).get()
    },

    cssApplyPatch({path,value="",key=path.pop()}){
        this.path(path).css(key,value)
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


    valPatch(value){
        return this.map((i,el)=>({op:"val",path:path(el), value:this.eq(i).val()})).get()
    },

    valApplyPatch({path,value=""}){
        this.path(path).val(value)
    },


    removeAttrPatch(key){
        return DefaultTrap.attrPatch.call(this,key)
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
        return this.map((i,el)=>{
            return {op:"remove",path:path(el,[(el.children||[]).length])}
        }).get()
    },

    removeApplyPatch({path}){
        this.path(path).remove()
    },

    prependPatch(){
        return this.map((i,el)=>{
            return {op:"remove",path:path(el,[0])}
        }).get()
    },

    afterPatch(){
        return this.map((i,el)=>{
            const route=path(el)
            route[route.length-1]=route[route.length-1]+1
            return {op:"remove",path:route}
        }).get()
    },

    beforePatch(){
        return this.map((i,el)=>{
            return {op:"remove",path:path(el)}
        }).get()
    },

    replaceWithPatch(){
        return this.map((i,el)=>{
            return {op:"replaceWith",path:path(el), value: this.eq(i).clone()}
        }).get()
    },

    replaceWithApplyPatch({path, value}){
        this.path(path).replaceWith(value)
    },

    emptyPatch(){
        return DefaultTrap.replaceWithPatch.bind(this)()
    },

    htmlPatch(){
        return DefaultTrap.replaceWithPatch.bind(this)()
    },

    wrapPatch(){
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

export default function($, trap=DefaultTrap){
    const patches=[]
    var inTransaction=false

    const save=(ctx, op, ...args)=>{
        var patch=null
        if(trap[`${op}Patch`]){
            patch=trap[`${op}Patch`].call(ctx, ...args)||[]
        }else{
            patch=trap.save.call(ctx, op, ...args)||[]
        }
        if(!Array.isArray(patch)){
            patch=[patch]
        }
        patches.splice(patches.length, 0, ...patch)
    }

    const applyPatch=function({op}){
        if(trap[`${op}ApplyPatch`]){
            trap[`${op}ApplyPatch`].call($,...arguments)
        }else{
            trap.applyPatch.call($,...arguments)
        }
    }

    $.path=route=>{
        if(!route || route.length==0)
            return $.root().filter(true)
        return route.reduce((current, i)=>current.contents().eq(i), $.root())
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
                    return function(){
                        if(arguments.length==2){
                            save(ctx, key, ...arguments)
                        }
                        return got.call(ctx,...arguments)
                    }
                case "text":
                case "val":
                    return function(){
                        if(arguments.length==1){
                            save(ctx, key,...arguments)
                        }
                        return got.call(ctx,...arguments)
                    }
                case 'removeAttr':
                case 'removeClass': case 'addClass':case 'toggleClass':
                return function(){
                    save(ctx, key,...arguments)
                    return got.call(ctx, ...arguments)
                }
                case 'append':
                case 'prepend':
                case 'after':
                case 'before':
                case 'replaceWith':
                case 'empty':
                case 'html':
                case 'wrap':
                case 'remove':
                    return function(){
                        return ctx.map((i,el)=>{
                            const $el=$(el)
                            save($el, key,...arguments)
                            return got.call($el, ...arguments)
                        })
                    }
                case 'appendTo':
                    return function(target){
                        $(target).append(ctx)
                        return ctx
                    }
                case 'prependTo':
                    return function(target){
                        $(target).prepend(ctx)
                        return ctx
                    }
                case 'insertAfter':
                    return function(target){
                        $(target).after(ctx)
                        return ctx
                    }
                case 'insertBefore':
                    return function(target){
                        $(target).before(ctx)
                        return ctx
                    }
                default:{
                    return got;
                }
            }
        }
    })


    return Object.assign($,{
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
