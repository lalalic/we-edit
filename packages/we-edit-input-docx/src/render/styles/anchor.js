import Style from "./base"
import {fromJS} from "immutable"

export default class extends Style{
    constructor(node, styles, selector){
        super(...arguments)
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

        let wrap="TopAndBottom,Square,Tight,Through,None"
            .split(",")
            .reduce((wrap,a)=>wrap || find(`wp:wrap${a}`),null)
        if(wrap){
            this.wrap=selector.selectValue(wrap)
        }

        this.effectExtent=selector.effectExtent(find("wp:effectExtent"))
    }

    flat(){
        const {distance,x,y,wrap,width,height,effectExtent}=this
        return this.__clear({distance,x,y,wrap,width,height,effectExtent},undefined)
    }

    __clear(o,v=undefined){
		for(let k in o){
			if(o[k]===v){
				delete o[k]
			}
		}
		return o
	}

    hashCode(){
		return fromJS(this.flat()).hashCode()
	}
}
