const SCOPE="/fonts/"
const scope=path=>`${path}/`.replace("//","/")

/**
 * get cached font names
 */
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
    const {data:{action,familyName, data, src, scope}}=e
    switch(action){
        case "fontCache":{//load all fonts
            self.caches.open("v1")
            .then(cache=>cache.keys())
            .then(cached=>{
                Promise.all(cached.map(
                    req=>self.caches.match(req)
                    .then(res=>res.arrayBuffer())
                    .then(buffer=>{
                        e.source.postMessage({font:buffer, name: req.url.split("/").pop()})
                    })
                )).finally(()=>e.source.postMessage({done:true}))
            })

            return 
        }
        default:{// cache 
            if(!familyName)
                return 
            self.caches.open("v1").then(cache=>{
                const path=SCOPE+familyName
                if(data)
                    return cache.put(path,new Response(new Blob([data],{type:"application/font"}),{status:200}))

                return fetch(src).then(response=>cache.put(path,response.clone()))
            })
            
        }
    }
})

//list all font names
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


