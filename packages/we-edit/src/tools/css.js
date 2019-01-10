//selector,selector
export default function selectors(a,$,basic){
	try{
		return n=>!!a.split(",").map(k=>unionSelector(k.trim(),$, basic)).find(f=>f(n)) ? true : undefined
	}catch(error){
		throw error
	}
}

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
const UNION=/[\s\[,:<>+~]/
function unionSelector(a,$, basic){
	let selectors=a.replace(/\s?[><+~]\s?/g,">").split(/(?=[><+~\s])/g)
	let scopes=selectors.slice(1).map(k=>SCOPE[k[0]])
	selectors=selectors.map(k=>k.replace(/^[><+~]/,"")).map(k=>k.trim())
	let nodeSelector=selectors.pop()
	let nodeCheck=basicSelectors(nodeSelector,basic)
	let checks=selectors
		.map((a,i)=>{
			let check=basicSelectors(a,basic)
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
function basicSelectors(a,basic=basic){
	let checks=a.split(/(?=[#\.\[\]])/g)
		.map(k=>{
			if(k[0]=="]"){
				return k.substr(1)
			}
			return k
		})
		.filter(a=>!!a)
		.map(k=>{
			switch(k[0]){
				case '#':
					return basic["#"](k.substr(1))
				case '[':{
					const args=k.substr(1).split("=")
					if(args.length==2)
						args[1]=args[1].replace(/^['"]/,"").replace(/['"]$/,"")
					return basic["["](...args)
				}
				case ".":
					return basic["."](k.substr(1))
				default:
					return basic.type(k)
			}
		})
	return n=>!checks.find(f=>!f(n))
}
