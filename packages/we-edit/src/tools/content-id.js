const pair=/\{[^\{\}]*\}/g
//content Id must be validate ID
export function validateId(id){
    id=id+""
    if(/[\[\],:<>+~*#.!{}\s]/g.test(id.replace(/\{[^\{\}]*\}/,"")))
        throw new Error(`"${id}" is not a valid content id, ([\[\],:<>+~*#.!{}]/g.test(id.replace(/\{[^\{\}]*\}/,"")) must be false)`)
    return true
}

//a.b.c
export function parseIds(path){
    let pairs=[], k=0
    const parsedIds=path.replace(pair,(matched,i,)=>{
        pairs.push([matched,i])
        return " ".repeat(matched.length)
    }).split(".").map((a,i,array,bLast=i==array.length)=>{
        if(pairs[0]?.[1]<k+a.length){
            const [pair]=pairs.shift()
            a=a.replace(" ".repeat(pair.length),pair)
        }   
        k+=(a.length+(bLast?0:1))
        return a.trim()
    })
    if(parsedIds.findIndex(a=>!!!a.trim())!=-1)
        throw new Error(`'${path}' include empty id`)
    if(pairs.length>0)
        throw new Error(`'${path}' is not correct path, please make sure each part is a validated id`)
    return parsedIds
}