const cheerio=require("cheerio")
const $=cheerio.load(`
    <div>
        <span>hello</span>
        <i/>
    </div>
`)

class intercept{
    constructor($){
        
    }
    
    startTransaction(){
        this.patches=[]
    }
    
    commit(){
        this.patches=[]
    }
    
    rollback(patches){
                
    }
    
    attr(){
        
    }
}

revocable($)

$.prototype=new Proxy($.prototype,{
    get(target,key, ctx){
        var got=Reflect.get(...arguments)
        switch(key){
            case "css":
            case "data":
            case "prop":
            case "attr":
                return function(){
                    if(arguments.length==2){
                        ctx.clone4Patch(key)
                    }
                    return got.call(ctx,...arguments)
                }
            case "text":
            case "val":
                return function(){
                    if(arguments.length==1){
                        ctx.clone4Patch(key)
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
                    ctx.clone4Patch(key)
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
                        ctx.clone4Patch(key)
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
                    ctx.parent().clone4Patch(key)
                    return got.call(this,...arguments)
                }    
            default:{
                return got;
            }
        }
    }
})

$.prototype.startTransaction=function(){

}

$.prototype.commit=function(){

}

$.prototype.rollback=function(){

}


$.prototype.clone4Patch=function(key){
    console.log('cloning for '+key)
    this.forEach(function(i,el){
        $(el).closest("['xxid']")
    })
}

$('div').attr('x',1).append('<span/>')

$('<span/>').appendTo('i')



