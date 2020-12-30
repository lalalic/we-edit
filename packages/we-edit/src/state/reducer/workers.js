export default (workers,{type, payload})=>{
    switch(type){
        case 'we-edit/workers/selection':{
            const {id, selection}=payload
            const i=workers.findIndex(a=>a.id==id)
            if(i==-1){
                return [...workers,payload]
            }else{
                workers.splice(i,1,payload)
                return [...workers]
            }
        }
        case 'we-edit/workers/remove':{
            const id=payload.id
            const i=workers.findIndex(a=>a.id==id)
            if(i!=-1){
                workers.splice(i,1)
            }
            return [...workers]
        }
    }
    return workers
}