
module.exports={
    themes: (ctx=>{
        const keys=ctx.keys()
        const values=keys.map(a=>ctx(a).default)
        return keys.reduce((o, k, i) => { 
            o[k.substring(2).split(".")[0]] = values[i]; 
            return o; 
        }, {});
    })(require.context("codemirror/theme",false,/\.css$/)),
    modes: (ctx=>{
        ctx.keys().forEach(ctx)
        const codemirror=require("codemirror")
        return codemirror.modeInfo
    })(require.context("codemirror/mode",true,/\.js$/)) 
}