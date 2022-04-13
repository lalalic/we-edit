import XMLDocument from "./xml"

export default class __$1 extends XMLDocument{
    static support(file){
		if(!file)//for installer
			return true

		return file.name?.toLowerCase().endsWith(".wed.json")
	}

	static defaultProps={
		type:"json",
		ext:"json",
		name:"We-Edit json document",
		mimeType:"application/json"
    }

    dataToDom(data){
        if(typeof(data)!="string"){
            data=String.fromCharCode.apply(null, new Uint8Array(data))
        }
        data=eval(`(a=>a)(${data})`)
        
        const toNode=({children,type:name="text", props})=>{
            return {
                attribs:props||{}, 
                name, 
                type:"tag", 
                children:
                    name=="text" ? [{data:children||"",type:"text"}] : 
                        (Array.isArray(children) ? children : 
                            (!!children ? [children] : [])
                        ).map(toNode)
            }
        }
        
        const root=toNode(data)

        const connect=(a,parent)=>{
            const siblings=parent ? parent.children : []
            const i=siblings.indexOf(a)
            return Object.assign(a, {
                parent,
                prev:siblings[i-1]||null,
                next:siblings[i+1]||null,
                children:a.type=="text" ? a.children : a.children.map(b=>connect(b,a))
            })
        }
        return connect(root)
    }

    nodeToString(node){
        const toObject=({name:type,attribs:props,children})=>{
            return {
                type,
                props,
                children:type=="text" ? (children||{}).data : (children||[]).map(toObject)
            }
        }
        const data=toObject(node)
        return JSON.stringify(data,(key,value)=>{
			return value
		},4)
    }
}