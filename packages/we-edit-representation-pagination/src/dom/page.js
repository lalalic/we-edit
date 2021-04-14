import {dom} from "we-edit"
import Frame from "./frame"
import {HasParentAndChild} from "../composable"

const Page=HasParentAndChild(dom.Page)

export default class extends Frame{
    static displayName=this.switchTypeTo(Page)
    static defaultProps={
        ...Frame.defaultProps,
        ...Page.defaultProps,
        autoCompose2Parent:false
    }
}