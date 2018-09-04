const path=require("path")
const webpack=require("webpack")
const nodeExternals=require("webpack-node-externals")

module.exports=base=>{
    return require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
        .map(a=>({
            ...base,
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`${a.substr("we-edit".length+1)||"index"}.js`,
    			path:path.resolve(__dirname, 'packages/we-edit'),
                libraryTarget:"commonjs2"
    		},
            plugins:[
                ...base.plugins,
                new LocalReference(),
            ],
            target:"node",
            externals:[nodeExternals()]
        }))
}

class LocalReference{
    apply(compiler){
        compiler.plugin("emit",function(compilation,done){
            let fileName=compilation.options.output.filename
            let asset=compilation.assets[fileName]
            let content=asset.source()
            let revised=content.replace(/require\("we-edit-/g,'require("./')
            if(content!=revised){
                compilation.assets[fileName]={
                    source(){
                        return revised
                    },
                    size(){
                        return revised.length
                    }
                }
            }
            done()
        })
    }
}
