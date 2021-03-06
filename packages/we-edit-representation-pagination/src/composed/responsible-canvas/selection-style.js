import {SelectionStyle} from "we-edit"
import memoize from "memoize-one"
import Test from "./test"

/**
 * Selection type:
 *  cursor
 *  range
 *  focusable: not range, not cursor, just an object, such as image
 */
export default class PaginationSelectionStyle extends SelectionStyle{
    constructor(position, start, end,positioning) {
        super(position, start, end)
        this.positioning=positioning
        if (start.id != end.id) {
            if (this.getContent(start.id).forwardFirst(`#${end.id}`).length == 0) {
                this.start = end;
                this.end = start;
            }
        }
        const target=positioning.getComposer(start.id)
        this.isFocusable=start.id==end.id && target && target.focusable
        this.isRange=!this.isCursor && !this.isFocusable
    }

    isSelectionChanged(b){
        return !b || !(b.start.id==this.start.id && b.start.at==this.start.at && b.end.id==this.end.id && b.end.at==this.end.at)
    }

    getComposer(){
       return this.positioning.getComposer(...arguments)
    }

    getContent(){
        return this.positioning.getContent(...arguments)
    }

    getRangeRects(){
        return this.__getRangeRects(this.start,this.end)
    }

    __getRangeRects=memoize((start, end)=>{
        if(this.isRange){
            return this.positioning.getRangeRects(start, end)
        }
        return super.getRangeRects()
    })

    props=memoize((type, getFromContent = true)=>{
        const props=super.props(type,getFromContent)
        if(!props)
            return props
        const {hash,id,content,children,...a}=props
        return a
    })

    _layoutProps=memoize(()=>{
        if (!this.positioning.ready)
            return null;
        const page = this.positioning.pages.find(a => a.props.I == this.position.page);
        if (!page) {
            return null;
        }
        
        return page.layoutOf(this.position)
    })

    _textProps=memoize((type,getFromContent)=>{
        const textProps=this._props(type,getFromContent)
        if(!textProps)
            return textProps
        const composer=this.getComposer(this.end.id)
        if(composer.getComposeType()=="text"){
            const char=composer.props.children.substr(this.end.at,1)
            return {...textProps, fonts:composer.measure.getCharFontFamily(char)}
        }
        
        return textProps
    })

    _cellProps=memoize((type,getFromContent)=>{
        const cellProps=this._props(type,getFromContent)
        if(!cellProps || getFromContent)
            return cellProps
        const composer=this.positioning.responsible.getComposer(cellProps.id)
        if(!composer)
            return cellProps
        const props=composer.computed.composed[0].props
        return {...cellProps, ...props}
    })

    /**
     * x, y of page,line,column
     * size, margin
     */
    _pageProps=memoize(()=>{
        if (!this.positioning.ready)
            return null;
        const page = this.positioning.pages.find(a => a.props.I == this.position.page);
        if (!page) {
            return null;
        }
        const pageY = () => this.positioning.pageXY(this.position.page).y;
        const line = () => this.position.line
        const column = () => page.columnIndexOf(line(),this.position);
        const cols = () => [...page.cols];
        const { margin, width, height } = page.props;
        return {
            ...this.position,
            get pageY() {
                return pageY();
            },
            get line() {
                return line();
            },
            get column() {
                return column();
            },
            get cols() {
                return cols();
            },
            get size() {
                return { width, height };
            },
            get margin() {
                return margin;
            }
        };
    })

    getTestDocument(store){
        return new Test(store)
    }
}
