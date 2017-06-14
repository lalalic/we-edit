
//selector,selector
export default function selectors(a,$){
	try{
		let checks=a.split(",").map(k=>unionSelector(k.trim(),$))
		return n=>!!checks.find(f=>f(n))
	}catch(error){
		throw error
	}
}

const UNION=/[\s\[,:<>+~]/
export function isIdSelector(selector){
	return typeof(selector)=="string" 
		&& (selector=selector.trim())[0]=='#' 
		&& !UNION.test(selector)
}

//selector |> selector
const SCOPE={
		">":"parent",
		"<":"children",
		" ":"parents",
		"+":"prev",
		"~":"next"
	}
function unionSelector(a,$){
	let selectors=a.replace(/\s?[><+~]\s?/g,">").split(/(?=[><+~\s])/g)
	let scopes=selectors.slice(1).map(k=>SCOPE[k[0]])
	selectors=selectors.map(k=>k.replace(/^[><+~]/,"")).map(k=>k.trim())
	let nodeSelector=selectors.pop()
	let nodeCheck=selector(nodeSelector)
	let checks=selectors
		.map((a,i)=>{
			let check=selector(a)
			return n=>$(n)[scopes[i]](check).length>0
		})
		.reverse()
	return n=>{
		if(nodeCheck(n)){
			if(!checks.find(f=>!f(n))){
				return true
			}
		}
	}
}

//p#id[k=v], any fail cause fail
function selector(a){
	let checks=a.split(/(?=[#\[\]])/g)
		.map(k=>{
			if(k[0]=="]"){
				return k.substr(1)
			}
			return k
		})
		.filter(a=>!!a)
		.map(k=>{
			switch(k[0]){
				case '#':{
					let id=k.substr(1)
					return n=>n.get("id")==id
				}
				case '[':{
					let [name,v]=k.substr(1).split("=")
					return n=>{
						if(n.hasIn(["props",name])){
							if(typeof(v)=='undefined'){
								return true
							}else{
								v=v.replace(/^['"]/).replace(/$['"]/)
								return n.getIn(["props",name])==v
							}
						}
						return false
					}
				}
				default:{
					return n=>n.get("type")==k
				}
			}
		})
	return n=>!checks.find(f=>!f(n))
}
