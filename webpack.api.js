const path=require("path")
const nodeExternals=require("webpack-node-externals")
/**
*NOTE: since all plugins are with in we-edit project,
you should set dependencies of plugin as optionalDependencies of packages/we-edit,
so project depends on we-edit can use built plugin without big bundle into built plugin
*/
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
                a=="we-edit-representation-pagination" ? new CopyFontService() : null
            ].filter(a=>a),
            target:"node",
            externals:[nodeExternals()],
            mode:"development"
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

class CopyFontService{
    apply(compiler){
        compiler.plugin("emit", function(compilation,done){
            const fs=require("fs")
            fs.createReadStream(path.resolve(__dirname, 'packages/we-edit-representation-pagination/src/fonts/font-service.js'))
                .pipe(fs.createWriteStream(path.resolve(compilation.options.output.path,"font-service.js")))

            fs.createReadStream(path.resolve(__dirname, 'packages/we-edit-representation-pagination/src/fonts/Arial'))
                .pipe(fs.createWriteStream(path.resolve(compilation.options.output.path,"Arial")))
            done()
        })
    }
}
