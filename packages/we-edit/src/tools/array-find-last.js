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

if(!Array.prototype.flat){
  Array.prototype.flat=function(){
    return this.reduce((flat,a)=>{
      if(Array.isArray(a)){
        flat.splice(flat.length,0,...a.flat())
      }else{
        flat.push(a)
      }
      return flat
    },[])
  }
}
