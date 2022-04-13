module.exports = ({types: t}) => {
  return {
    visitor: {
      MemberExpression(path) {
        const node = path.node;
        if (t.isCallExpression(path.parent) &&
          t.isIdentifier(node.object, { name: 'require' }) &&
          t.isIdentifier(node.property, { name: 'context' }) &&
          !path.scope.hasOwnBinding('require')) {
              debugger
                const code=path.parentPath.toString()
                const filename=this.filename
                eval(`require=>${code}`)({context(request, useSubPath, regexp, mode){
                    if(mode!=="x")
                        return 
                    const fs=require("fs")
                    const segs=request.split("!"), last=segs.length-1, context=segs[last]
                    const root=(ctx=>{
                        if(ctx.startsWith("/")){
                            return ""
                        }else{
                            const segs=((segs,name=segs.pop())=>segs)(filename.split("/"))
                            if(ctx.startsWith(".")){
                                return segs.join("/")
                            }else{
                                const moduleName=context.split("/")[0]
                                while(segs.length>0 && !fs.existsSync(`${segs.join("/")}/node_modules/${moduleName}`)){
                                    segs.pop()
                                }
                                if(segs.length>0){
                                    return segs.join("/")+"/node_modules"
                                }
                            }
                        }
                    })(context);
                    
                    const imports=(function getFiles(target="",imports=[]){
                        fs.readdirSync(root+"/"+context+"/"+target).forEach(a=>{
                            const current=`${target}${a}`
                            if(fs.statSync(root+"/"+context+"/"+current).isDirectory()){
                                if(useSubPath){
                                    getFiles(current+"/",imports)
                                }
                            }else if(!regexp || regexp.test(current)){
                                imports.push(current)
                            }
                        })
                        return imports
                    })();
                    const newCode=`
                        (function(){
                            const map={
                            ${imports.map((a,i)=>{
                                segs[last]=`${context}/${a}`
                                return `"${a}":require("${segs.join("!")}")`
                            }).join(",\n")}
                            };
                            function req(a){
                                return map[a];
                            }
                            req.keys=function(){
                                return Object.keys(map);
                            }

                            req.resolve= function(key){
                                return "${root+"/"}"+key;
                            }
                            
                            return req;
                        })()
                    `
                    path.parentPath.replaceWithSourceString(newCode)
                    
                }})
        }
      }
    }
  }
};