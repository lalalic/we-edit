export default function extract(data){
    return new Promise((resolve, reject)=>{
        let props={}
        let img=new Image()
        img.onload=e=>{
            let {width,height}=img
            resolve({...props, width,height})
        }
        img.onerror=reject

        if(typeof(data)=='string'){//file name
            props.data=img.src=data
        }else if(data instanceof Blob){
            let reader=new FileReader()
            reader.onload=function(e){
                props.data=e.target.result
                if(data.name)
                    props.name=data.name
                img.src=btoa(props.data)
            }
            reader.readAsArrayBuffer(data);
        }
    })
}
