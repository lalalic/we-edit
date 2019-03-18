export default function($, trap={}){
    const patches=[]
    var inTransaction=false
    $.prototype=new Proxy($.prototype,{
        get(target,key, ctx){
            var got=Reflect.get(...arguments)
            if(!inTransaction){
                return got
            }
            
            switch(key){
                case "save":
                    return function(){
                        if(!trap.save){
                            console.warn(`saving for ${key}, no implementation`)
                            return
                        }
                        return trap.save.call(ctx, ...arguments)
                    }
                case "css":
                case "data":
                case "prop":
                case "attr":
                    return function(){
                        if(arguments.length==2){
                            ctx.save(key)
                        }
                        return got.call(ctx,...arguments)
                    }
                case "text":
                case "val":
                    return function(){
                        if(arguments.length==1){
                            ctx.save(key)
                        }
                        return got.call(ctx,...arguments)
                    }
                case 'removeAttr':
                case 'removeClass': case 'addClass':case 'toggleClass':
                case 'append':
                case 'prepend':
                case 'after':
                case 'before':
                case 'replaceWith':
                case 'empty':
                    return function(){
                        ctx.save(key)
                        return got.call(ctx,...arguments)
                    }
                case 'appendTo':
                    return function(target){
                        $(target).append(ctx)
                    }
                case 'prependTo':
                    return function(target){
                        $(target).prepend(ctx)
                    }
                case 'insertAfter':
                    return function(target){
                        $(target).after(ctx)
                    }
                case 'insertBefore':
                    return function(target){
                        $(target).before(ctx)
                    }
                case 'remove':
                    return function(selector){
                        if(arguments.length==1){
                            ctx.filter(selector).remove()
                            return ctx
                        }else{
                            ctx.save(key)
                            return got.call(ctx)
                        }
                    }
                case 'html':
                    return function(){
                        if(arguments.length>0){
                            return ctx.empty().append(...arguments)
                        }else{
                            return got.call(ctx)
                        }
                    }
                case 'wrap':
                    return function(){
                        ctx.parent().save(key)
                        return got.call(this,...arguments)
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
            trap.patch.call($, myPatches)
            return myPatches.splice(0,myPatches.length)
        }
    })
}
