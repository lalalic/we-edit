export default function(o, {removeKeys,clone=false, nullable=a=>a==undefined, emptyAsUndefined=false}={}){
    if(typeof(o)!="object")
        return o
    
    if(clone){
        o={...o}
    }

    if(nullable && typeof(nullable)!="function"){
        nullable=(values=>Array.isArray(values) ? a=>values.includes(a) : a=>a===values)(nullable)
    }

    for(let k in o){
        if(o.hasOwnProperty(k) && (removeKeys ? removeKeys.includes(k) : nullable(o[k]))){
            delete o[k]
        }
    }

    if(emptyAsUndefined && Object.keys(o).length==0){
        return 
    }

    return o
}