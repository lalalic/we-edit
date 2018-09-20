if(!Array.prototype.findLast){
    Array.prototype.findLast=function(){
        return Array.from(this).reverse().find(...arguments)
    }
}
