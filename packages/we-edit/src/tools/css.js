//selector,selector
const VAR=/^____(\d+)$/
export default function selectors(a,$,basic){
	try{
		//at first remove "",''
		const vars=[]
		a=a.replace(/('.*?')|(".*?")/gu,m=>{
			vars.push(m.substring(1,m.length-1))
			return `____${vars.length-1}`
		})
		return n=>!!a.split(",").map(k=>unionSelector(k.trim(),$, basic,vars)).find(f=>f(n)) ? true : undefined
	}catch(error){
		debugger
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
		"~":"next",

	}
const UNION=/[\s\[,:<>+~]/
function unionSelector(a,$, basic,vars){
	try{
		let selectors=a.split(/(?=[><+~\s])/g)
		const scopes=selectors.slice(1).map(k=>{
			return SCOPE[k[0]]
		})
		selectors=selectors.map(k=>k.replace(/^[><+~]/,"")).map(k=>k.trim())
		const nodeSelector=selectors.pop()
		const nodeCheck=basicSelectors(nodeSelector,basic,vars)
		const checks=selectors.map((a,i)=>{
			const check=basicSelectors(a,basic, vars)
			return n=>$(n)[scopes[i]](check).length>0
		}).reverse()
		return n=>{
			if(nodeCheck(n)){
				if(!checks.find(f=>!f(n))){
					return true
				}
			}
		}
	}catch(e){
		console.log({e,a})
		debugger
	}
}

//p#id[k=v], any fail cause fail
//id=\w{.*}
//[k="vddd.*H"]
function basicSelectors(a,basic=basic,vars){
	//[a=""],#23{god.sidd,ck}
	const checks=a.split(/(?<![\{\[][^\{\}\[\]]*)(?=[#.\[\*])/g)
		.filter(a=>!!a)
		.reduce((ds,a)=>{//flat
			let i=0
			if(a[0]=="[" && (i=a.lastIndexOf("]"))!=-1 && !a.endsWith("]")){
				ds.push(a.substring(0,i+1))	
				ds.push(a.substring(i+1))
			}else if(a[0]=="#" && (i=a.lastIndexOf("}"))!=-1 && !a.endsWith("}")){
				ds.push(a.substring(0,i+1))	
				ds.push(a.substring(i+1))
			}else{
				ds.push(a)
			}
			return ds
		},[])
		.map(k=>{
			switch(k[0]){
				case '#':
					return basic["#"](k.substr(1))
				case '[':{
					const args=k.substr(1,k.length-2).split("=")
					if(args.length==2){
						const [,i]=args[1].match(VAR)||[]
						if(i){
							args[1]=vars[parseInt(i)]
						}
					}
					return basic["["](...args)
				}
				case ".":
					return basic["."](k.substr(1))
				case "*":
					if(k=="*"){
						return n=>!!n
					}
				default:
					return basic.type(k)
			}
		})
	return n=>!checks.find(f=>!f(n))
}

