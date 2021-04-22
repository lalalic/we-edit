const path=require("path")
const nodeExternals=require("webpack-node-externals")
const fs=require('fs')
/**
*NOTE: since all plugins are with in we-edit project,
you should set dependencies of plugin as optionalDependencies of packages/we-edit,
so project depends on we-edit can use built plugin without big bundle into built plugin
*/
module.exports=base=>{
    return fs
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
            devtool:"inline-source-map",
            plugins:[
                ...base.plugins,
                new LocalReference(),
                a!=="we-edit" ? new CopyReadme() : null,
                a=="we-edit-representation-pagination" ? new CopyFontService() : null
            ].filter(a=>a),
            target:"node",
            externals:[nodeExternals({
                whitelist:[/codemirror/]
            })]
        }))
}

class LocalReference{
    apply(compiler){
        compiler.hooks.emit.tap("localize we-edit-", compilation=>{
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
        })
    }
}

class CopyFontService{
    apply(compiler){
        compiler.hooks.emit.tap("copy font service", function(compilation){
            if(compilation.options.mode!=="production")
                return
            fs.createReadStream(path.resolve(__dirname, 'packages/we-edit-representation-pagination/src/fonts/font-service.js'))
                .pipe(fs.createWriteStream(path.resolve(compilation.options.output.path,"font-service.js")))

            fs.createReadStream(path.resolve(__dirname, 'packages/we-edit-representation-pagination/src/fonts/Arial'))
                .pipe(fs.createWriteStream(path.resolve(compilation.options.output.path,"Arial")))
        })
    }
}

class CopyReadme{
    apply(compiler){
        compiler.hooks.emit.tap("copy readme", function(compilation){
            if(compilation.options.mode!=="production")
                return 
            const project=compilation.options.entry.split("/").reverse()[2]
            const files=fs.readdirSync(compilation.options.output.path,{withFileTypes:true})
            const excludes=["package.json","readme.md","design.dot"]
            files.forEach(a=>{
                if(a.isFile && excludes.find(b=>a.name.toLowerCase()==b)==-1){
                    fs.rmSync(path.resolve(compilation.options.output.path,a.name))
                }
            })

            fs.createReadStream(path.resolve(__dirname, `packages/${project}/README.md`))
                .pipe(fs.createWriteStream(path.resolve(compilation.options.output.path,project.replace("we-edit-","")+".md")))
        })
    }
}

