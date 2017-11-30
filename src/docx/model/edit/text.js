import Base from "./base"

export class Text extends Base{
    update({id,children}){
        if(children!=undefined){
            return this.file.getNode(id).text(children).get(0)
        }else{
            
        }
    }
}
