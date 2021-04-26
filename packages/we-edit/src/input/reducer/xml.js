import Event from "./event"

export default class XDocEvents extends Event{
    static Editor=class extends super.Editor{
        /**
         * find or create a>b>c>d
         * @param {*} nodeName 
         * @param {*} tagContent 
         * @param {*} tagPr 
         * @returns 
         */
        got(nodeName,tagContent, tagPr){
            const [first,...nodes]=[tagContent,tagPr,nodeName].filter(a=>!!a).join(">").split(">")
            const elFirst=this.node[tagContent ? "closest" : "find"](first.replace(":","\\:")).eq(0)
            return nodes.reduce((current,node)=>{
                let next=current.children(node.replace(":","\\:")).eq(0)
                if(next.length)
                    return next
                return current.append(`<${node}/>`).children().last()
            },elFirst)
        }
    
        trim(xml){
            return xml.replace(/>\s+/g,">").replace(/\s+</g,"<")
        }
    }

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