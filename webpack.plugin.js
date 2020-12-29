module.exports=base=>{
    return "input-docx,input-json,variant".split(",")
		.map(a=>`we-edit-${a}`)
		.map(a=>({
            ...base,
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`index.js`,
				path:`${__dirname}/packages/${a}`,
				libraryTarget:"commonjs2"//important
			},
			plugins:[
                ...base.plugins,
                new LocalReference()
            ].filter(a=>a),
            
			devtool:"inline-source-map",
            externals:"react,react-dom,material-ui,prop-types,we-edit,react-redux,recompose,stream, readable-stream, we-edit-office, we-edit-representation-pagination"
				.split(",")
				.reduce((cols,a)=>{
					a=a.trim()
					cols[a]="commonjs2 "+a
					return cols
				},{})
        }))
}

class LocalReference{
    apply(compiler){
        compiler.hooks.emit.tap("localize we-edit-", compilation=>{
            let fileName=compilation.options.output.filename
            let asset=compilation.assets[fileName]
            let content=asset.source()
            let revised=content.replace(/require\("we-edit-/g,'require("we-edit/')
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