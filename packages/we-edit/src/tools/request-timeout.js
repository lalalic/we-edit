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

export function cancelTimeout(id){
    cancelAnimationFrame(id.value)
}