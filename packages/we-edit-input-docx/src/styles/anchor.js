export default class{
    constructor(node, styles, selector){
        const find=name=>node.children.find(a=>a.name===name)

        this.margin="Right,Left,Bottom,Top".split(",").reduce((margin,a)=>{
                margin[a.toLowerCase()]=selector.docx.cm2Px(node.attribs[`dist${a[0]}`])
                return margin
            },{})

        Object.assign(this,selector.selectValue(find("wp:extent")))//width,height

        switch(node.attribs["simplePos"]){//x,y
            case "1":
                Object.assign(this,selector.selectValue(find("wp:simplePos")))
                break
            case "0":
            default:
                Object.assign(this,selector.select([find("wp:positionH"),find("wp:positionV")],{positionH:"x", positionV:"y"}))
        }

        let wrap="TopAndBottom,Square,Tight,Through"
            .split(",")
            .reduce((wrap,a)=>wrap || find(`wp:wrap${a}`),null)
        if(wrap){
            this.wrap=selector.selectValue(wrap)
        }
    }

    flat(){
        const {margin,x,y,wrap,width,height}=this
        return {margin,x,y,wrap,width,height}
    }
}
