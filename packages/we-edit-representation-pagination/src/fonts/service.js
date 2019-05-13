const SCOPE="/fonts/"
self.addEventListener("message", function({data:{familyName, src, scope}}){
    self.caches.open("v1").then(cache=>{
        return fetch(src).then(response=>{
                cache.put(SCOPE+familyName,response.clone())
            })
    })
})

self.addEventListener("fetch", function(e){
    return e.respondWith(self.caches.match(e.request.url).then(function(cached){
        const path=new URL(e.request.url).pathname
        if(path+"/"==SCOPE){
            return fetch(e.request).then(function(response){
                if(!response.ok){
                    if(cached){
                        return cached.clone().text()
                    }
                }
                return response.text()
            })
            .then(withCached)
            .then(fonts=>{
                return new Response(fonts.join(","))
            })
        }

        if(cached!=undefined && path.startsWith(SCOPE)){
            return cached
        }else{
            return fetch(e.request)
        }
    }))
})

function withCached(fonts){
    fonts=new Set(fonts.split(",").filter(a=>!!a))
    return self.caches.open("v1")
        .then(cache=>cache.keys())
        .then(cached=>{
            cached.forEach(a=>{
                const path=new URL(a.url).pathname
                if(path.startsWith(SCOPE)){
                    const name=path.split("/").pop()
                    if(name && name!="index.html"){
                        fonts.add(name)
                    }
                }
            })
            return Array.from(fonts)
        })
}
