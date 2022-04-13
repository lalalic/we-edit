const path=require("path")
const nodeExternals=require("webpack-node-externals")
const fs=require('fs')
/**
*NOTE: since all plugins are with in we-edit project,
you should set dependencies of plugin as optionalDependencies of packages/we-edit,
so project depends on we-edit can use built plugin without big bundle into built plugin
*/
module.exports=(base,packages,args)=>{
    return [
        ...packages.map(a=>({
            ...base,
            module:{
                ...base.module,
                noParse:/code-mirror-modes/,
            },
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`${a.substr("we-edit".length+1)||"index"}.js`,
    			chunkFilename: "[name]",
                libraryTarget:"commonjs2"
            },
            devtool:"inline-source-map",
            plugins:[
                ...base.plugins,
                new LocalReference(),
                a!=="we-edit" ? new CopyReadme(a) : null,
                a=="we-edit-representation-pagination" ? new CopyFontService() : null
            ].filter(a=>a),
            target:"node",
            externals:[nodeExternals()]
        }))
    ]
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
        compiler.hooks.emit.tap("copy font service", (compilation)=>{
            fs.createReadStream(path.resolve(__dirname, 'packages/we-edit-representation-pagination/src/fonts/font-service.js'))
                .pipe(fs.createWriteStream(path.join(compilation.options.output.path,"www","font-service.js")))
        })
    }
}

class CopyReadme{
    constructor(project){
        this.project=project
    }
    apply(compiler){
        compiler.hooks.emit.tap("copy readme", (compilation)=>{
            fs.createReadStream(path.resolve(__dirname, `packages/${this.project}/README.md`))
                .pipe(fs.createWriteStream(path.resolve(compilation.options.output.path,this.project.replace("we-edit-","")+".md")))
        })
    }
}

