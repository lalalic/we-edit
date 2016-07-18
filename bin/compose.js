var compose=require("../lib/").compose

var filename = process.argv[2]

console.log(`composing ${filename}`)
compose(filename).then(svg=>console.log(svg))