const {rollup} = require('rollup');
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const minify=require("rollup-plugin-uglify")
const less =require('rollup-plugin-less')

const async=require("neo-async")
const {config}=require("../rollup.config.js")

const mode=process.argv[2]||"cjs"

const packages=(function(packages){
	if(packages)
		return packages
	
	let ps=require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
		.sort()
	ps.splice(ps.indexOf("we-edit-office"),1)
	ps.push("we-edit-office")
	ps.splice(ps.indexOf("we-edit-electron"),1)
	return ps
})(process.argv[3] ? process.argv[3].split(",").filter(a=>!!a) : undefined);


async.eachSeries(packages, function(p,done){
	console.log(`---[${mode}.${p}]---`)
	let {output, ...input}=config(p,mode)
	rollup(input)
		.then(bundle=>{
			console.log(`	output...`)
			return bundle.write(output)
		})
		.catch(e=>console.trace(e))
		.then(()=>console.log(`	done`))
		.then(done)
})
