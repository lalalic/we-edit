import Event from "./event"

export default class XDocEvents extends Event{
    constructor(){
        super(...arguments)
        Object.defineProperties(this,{
            PARAGRAPH_:{
                configurable:true,
                get(){
                    return this.PARAGRAPH.replace(":","\\:")
                }
            },
            TEXT_:{
                configurable:true,
                get(){
                    return this.TEXT.replace(":","\\:")
                }
            }
        })
    }    
}