import LineBreaker from "linebreak"

export default function opportunities(items,getText=a=>a,breakable=a=>true, reviver=a=>a){
    let commit=(state,i)=>{
        if(state.text.length==0)
            return state
        
        let {text,opportunities,indexes}=state
        let str=text.join("")
        let breaker=new LineBreaker(str)
        let op, word
        let start={itemIndex:state.start,i:0,indexOfStr:0}
        let found=(a,op,j)=>{
            if(a.itemIndex==j)
                a.i=a.i+op.position-a.indexOfStr
            else
                a.i=op.position-a.indexOfStr
                
            a.itemIndex=j
            a.indexOfStr=op.position
        }
        while(op=breaker.nextBreak()){
            word=str.slice(start.indexOfStr,op.position)

            let end=indexes.reduce((a,len,j)=>{
                if(j<start.itemIndex){

                }else {
                    if(j==start.itemIndex)
                        len=len-start.i
                    
                    if(a.indexOfStr+len<op.position){
                        a.indexOfStr+=len
                    }else if(a.indexOfStr+len>op.position){
                        if(a.indexOfStr==op.position){

                        }else{
                            found(a,op,j)
                        }
                    }else if(a.indexOfStr+len==op.position){
                        found(a,op,j)
                    } 
                }
                
                return a
            },{...start})

            opportunities.push(reviver({
                    start:{itemIndex:start.itemIndex,at:start.i},
                    end:{itemIndex:end.itemIndex,at:end.i},
                    word
                }))
            start=end
            
        }
       text.splice(0,text.length)
       return state
    }
    return commit(items.reduce((state, piece, i)=>{
        let {text,opportunities,indexes}=state
        if(breakable(piece)){
            let t=getText(piece)
            text.push(t)
            indexes[i]=t.length
        }else{
            commit(state,i)
            opportunities.push({start:{itemIndex:i}})
            state.start=i+1
        }
        return state
    },{start:0, text:[], opportunities:[], indexes:[]}))
        .opportunities
}