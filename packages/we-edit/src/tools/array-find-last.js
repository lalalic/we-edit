if(!Array.prototype.findLast){
    Array.prototype.findLast=function(f){
		let len=this.length
        return Array.from(this).reverse().find(function(a,i,...others){
			return f(a,len-i-1,...others)
		})
    }
}
if(!Array.prototype.findLastIndex){
    Array.prototype.findLastIndex=function(f){
		return this.indexOf(this.findLast(...arguments))
    }
}
