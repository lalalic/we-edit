const SCOPE="/fonts/"
const scope=path=>`${path}/`.replace("//","/")
function getFonts(){
    return self.caches.open("v1")
    .then(cache=>cache.keys())
    .then(cached=>{
        const fonts=new Set()
        cached.forEach(a=>{
            const path=new URL(a.url).pathname
            if(path.startsWith(SCOPE)){
                const name=path.split("/").pop()
                if(name && name!="index.html"){
                    fonts.add(name)
                    console.debug(`service[font]: font[${name}]=${path}`)
                }
            }
        })
        return Array.from(fonts)
    })
}



self.addEventListener("install",function(){
    console.log(`service[font]: installed font service`)
})

self.addEventListener("message", function(e){
    const {data:{action,familyName, src, scope}}=e
    if(action=="fontCache"){
        self.caches.open("v1")
        .then(cache=>cache.keys())
        .then(cached=>{
            Promise.all(cached.map(req=>self.caches.match(req)
                .then(res=>res.arrayBuffer())
                .then(buffer=>e.source.postMessage({font:buffer}))
            )).finally(()=>e.source.postMessage({done:true}))
        })

        return 
    }

    if(familyName && src){
        const names=Array.isArray(familyName) ? familyName : [familyName]
        self.caches.open("v1").then(cache=>{
            return fetch(src)
            .then(response=>{
                names.forEach(a=>cache.put(SCOPE+a,response.clone()))
                if(src.startsWith("blob:http")){
                    URL.revokeObjectURL(src)
                }
                console.debug(`service[font]: ${names.join(",")} at ${src}`)
            })
        })
    }
})

self.addEventListener("fetch", function(e){
    const path=new URL(e.request.url).pathname
    console.log(`service[font]: ${path} is fetching`)
    if(!scope(path).startsWith(SCOPE)){
        return
    }
    
    return e.respondWith(self.caches.match(e.request.url).then(function(cached){
        if(scope(path)==SCOPE){
            return getFonts()
                .then(fonts=>new Response(fonts,{status:200,headers:{"content-type":"application/json"}}))
        }

        return cached||fetch(e.request)
    }))
})


