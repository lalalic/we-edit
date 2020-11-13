export default class{
    constructor(node, styles, selector){
        const find=name=>node.children.find(a=>a.name===name)

        this.distance=selector.toDist(node)

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
        const {distance,x,y,wrap,width,height}=this
        return this.__clear({distance,x,y,wrap,width,height},undefined)
    }
}
