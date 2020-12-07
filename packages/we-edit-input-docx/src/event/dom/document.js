import Base from "./base"
import TOC from "./toc"

export default class extends Base{
    numpages({canvas}){
        const reducer=this.reducer
        //update TOC page
        if(reducer.$('#ToC').length){
            const toc=new TOC(reducer)
            toc.node=reducer.file.getNode('ToC')
            toc.update({numpages:arguments[0]})
        }
        //update header/footer NUMPAGES
        const pages=String(canvas.pages.length)
        reducer.$('#root')
            .find("header field[command=NUMPAGES],header fieldBegin[command=NUMPAGES],footer field[command=NUMPAGES],footer fieldBegin[command=NUMPAGES]")
            .each((i,field)=>{
                reducer.$(field).attr('display',pages)
                switch(field.get('type')){
                    case 'field':{
                        reducer.$(field).find('text').text(pages)
                        reducer.file.getNode(field.get('id')).find('w\\:t').text(pages)
                        break
                    }
                    case 'fieldBegin':{
                        reducer.file.getNode(field.get('id'))
                            .forwardUntil("w\\:fldChar[w\\:fldCharType=end]","w\\:t")
                            .text(pages)
                        reducer.$(field).forwardFirst('text').text(pages)
                        break
                    }
                }
            })
    }
}