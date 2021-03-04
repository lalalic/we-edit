import JSZip from 'jszip'

export function parseFile(data){
    const raw=new JSZip(data),parts={}
	raw.filter((path,file)=>parts[path]=file)
    return parts
}