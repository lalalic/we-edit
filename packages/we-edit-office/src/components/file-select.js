var input;


export default function select(accept){
    if(input==null){
        input=document.createElement('input')
        input.type="file"
        input.style.position='absolute'
        input.style.left='-9999px'		
        document.body.appendChild(input)
    }

	input.setAttribute("accept",accept||"")

    return new Promise((resolve,reject)=>{
        input.onchange=function(){
            var file=this.files[0];
			input.value=""
            if(file==null)
                reject()
            else
                resolve(URL.createObjectURL(file))
        }
        input.click()
    })
}

