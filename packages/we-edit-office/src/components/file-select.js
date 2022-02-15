var input;


export default function select(props){
    if(input==null){
        input=document.createElement('input')
        input.type="file"
        input.style.position='absolute'
        input.style.left='-9999px'		
        document.body.appendChild(input)
    }
    const {accept, multiple, returnInput}=typeof(props)=="string" ? {accept:props} : props
	input.setAttribute("accept",accept||"")
    if(multiple)
        input.setAttribute("multiple","")
    else
        input.removeAttribute("multiple")
        

    return new Promise((resolve,reject)=>{
        input.onchange=function(e){
            var file=this.files[0];
			input.value=""
            if(file==null)
                reject()
            else
                resolve(returnInput ? input : URL.createObjectURL(file))
        }
        input.click()
    })
}

