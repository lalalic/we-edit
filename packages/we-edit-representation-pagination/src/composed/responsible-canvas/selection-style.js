import {SelectionStyle, dom} from "we-edit"
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

    get precision(){
        return this.positioning.precision
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
        
        const layout=page.layoutOf(this.position)
        return dom.Frame.deprecision(layout, this.precision, page.constructor.propTypes)
    })

    _textProps=memoize((type,getFromContent)=>{
        const textProps=this._props(type,getFromContent)
        if(!textProps){
            const defaultStyle=this._props('paragraph',getFromContent)?.defaultStyle
            return defaultStyle||textProps
        }
        const composer=this.getComposer(this.end.id)
        if(composer.getComposeType()=="text"){
            const char=composer.props.children.substr(this.end.at,1)
            let current=composer.measure.getCharFontFamily(char)
    
            if(current==composer.measure.constructor.fallbackFonts.fallback){
                const {fonts:{hint, ...fonts}}=textProps
                current=fonts[hint]||Object.values(fonts)[0]
            }
            
            return {...textProps, fonts:{...textProps.fonts,current}}
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
        let props=composer.computed.composed[0].props
        props=dom.Frame.deprecision(props,this.precision, composer.constructor.propTypes)
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
        const precision=this.precision
        const deprecision=(props,types=page.constructor.propTypes)=>dom.Frame.deprecision(props,this.precision, types);
        const pageY = () => this.positioning.pageXY(this.position.page).y/precision;
        const line = () => this.position.line
        const column = () => deprecision(page.columnIndexOf(line(),this.position),dom.Frame.ColumnShape);
        const cols = () => [...deprecision(page.cols,page.constructor.propTypes.cols)];
        const { margin, width, height } = deprecision({...page.props});
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
                return { width, height};
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
