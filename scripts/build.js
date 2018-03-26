const rollup = require('rollup');
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const minify=require("rollup-plugin-uglify")

const packages=(function(){
	let ps=require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
		.sort()
	ps.splice(ps.indexOf("we-edit-office"),1)
	ps.push("we-edit-office")
	return ps
})();

function config(project,mode="production"){
    let base={
      input: `packages/${project}/src/index.js`,
      output:{
    	file: `packages/${project}/cjs/index.${mode}.js`,
    	format: "cjs",
      },
      plugins: [
        resolve({
            browser:true,
        }),

        babel({
    		babelrc:false,
    		presets: [
    			["env", {modules:false}],
    			"react",
    		],
            exclude: "node_modules/**",
    		plugins:[
    			"babel-plugin-external-helpers",
    			//"babel-plugin-add-module-exports",
    			"babel-plugin-transform-object-rest-spread",
    			"babel-plugin-transform-class-properties",
    		]
    	}),

    	commonjs({
    		namedExports:{
    			'node_modules/react/index.js': [
    				'Component', 'PureComponent',
    				'Children', 'createElement',
                    'Fragment', 'createFactory'
    			],
                "node_modules/immutable/dist/immutable.js":[
                    "List","Map","Collection"
                ],
    		}
    	}),


      ]
    }

    if(mode=="production"){
        base.plugins.push(minify())
    }else{
        base.output.sourcemap=true
    }
    console.dir(base)
    return base
}

(async function(){
    packages.forEach((p)=>{
        const {output, ...input}=config(p)
        const bundle=await rollup.rollup(input)
        await bundle.write(output)
        console.log(`${p} done`)
    })
})();
