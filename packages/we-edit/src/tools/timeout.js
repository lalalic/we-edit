function createCancelId(o){
    return 
}

export function cancel(id){
    cancelAnimationFrame(id.value)
    id.resolve && id.resolve()
}

export function requestTimeout(fn, time){
    let current
    const start=performance.now()
    const id={
        get value(){
            return current
        }
    }
    function step(timestamp){
        if(timestamp-start>=time){
            fn()
        }else{
            current=requestAnimationFrame(step)
        }
    }
    current=requestAnimationFrame(step)
    return id
}

export const cancelTimeout=cancel

export function every(t, fn, data, start=0){
    data=Array.from(data)
    var current, done, i=start
    return Object.assign(Object.defineProperty(new Promise(resolve=>{
        done=resolve
        let last
        function step(timestamp){
            if((timestamp-last)>=t && i<data.length){
                fn(data[i],i)
                i++
                last=performance.now()
            }
            if(i<data.length){
                current=requestAnimationFrame(step)
            }else{
                resolve(i)
            }
        }

        current=requestAnimationFrame(timestamp=>{
            last=timestamp-t
            step(timestamp)
        })
    }),'value',{get:a=>current}),{resolve:()=>done(i)})
}

export const cancelEvery=cancel

export function tick(duration, a, b, fn){
    var current, done
    return Object.assign(Object.defineProperty(new Promise(resolve=>{
        done=resolve
        let starttime, dist=a-b
        function step(timestamp){
            let runtime = timestamp - starttime
            fn(a-dist * Math.min(runtime / duration, 1))
            if (runtime < duration){
                current=requestAnimationFrame(step)
            }else{
                resolve()
            }
        }
        
        current=requestAnimationFrame(timestamp=>{
            starttime = timestamp
            step(timestamp)
        })
    }),'value',{get:a=>current}),{resolve:done})
}

export const cancelTick=cancel

export function wait(t){
    var current, done
    return Object.assign(Object.defineProperty(new Promise(resolve=>{
        done=resolve
        const start=performance.now()
        const step=timestamp=>{
            if(timestamp-start>=t){
                resolve()
            }else{
                current=requestAnimationFrame(step)
            }
        }
        current=requestAnimationFrame(step)
    }),'value',{get:a=>current}),{resolve:done})
}

export const cancelWait=cancel
