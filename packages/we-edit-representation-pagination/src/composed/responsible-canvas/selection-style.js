import memoize from "memoize-one"

export default class SelectionStyle {
    constructor(position, positioning, start, end) {
        this.position = position;
        this.positioning = positioning;
        this.getComposer = a => positioning.getComposer(a);
        this.getContent = a => positioning.getContent(a);
        this.start = start;
        this.end = end;
        if (start.id != end.id) {
            if (this.getContent(start.id).forwardFirst(`#${end.id}`).length == 0) {
                this.start = end;
                this.end = start;
            }
        }
        this.isCursor=start.id==end.id && start.at==end.at
        this.isFocusable=start.id==end.id && positioning.getComposer(start.id).focusable
        this.isRange=!this.isCursor && !this.isFocusable
    }
    toJSON() {
        return "Selection.Style";
    }
    props=memoize((type, getFromContent = true)=>{
        if (type.toLowerCase() == "page") {
            return this.pageProps();
        }
        else if (type.toLowerCase() == "layout") {
            return this.layoutProps();
        }
        const props=(()=>{
            if (getFromContent) {
                return this.content(type).props
            }
            const { id: typed } = this.content(type);
            if (typed) {
                const composer = this.getComposer(typed);
                if (composer) {
                    return composer.props
                }
            }
        })();
        if(!props)
            return props
        const {hash,id,content,children,...a}=props
        return a
    })

    layoutProps=memoize(()=>{
        if (!this.positioning.ready)
            return null;
        const page = this.positioning.pages.find(a => a.props.I == this.position.page);
        if (!page) {
            return null;
        }
        
        return page.layoutOf(this.position)
    })

    /**
     * x, y of page,line,column
     * size, margin
     */
    pageProps=memoize(()=>{
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

    content=memoize((type)=>{
        if (this.start.id != this.end.id) {
            var targets = this.getContent(this.start.id).forwardUntil(`#${this.end.id}`);
            targets = targets.add('#' + this.end.id).add('#' + this.start.id, "unshift");
            targets = targets.filter(type);
            if (targets.length > 0) {
                return targets.props().toJS();
            }
            else {
                return { props: null };
            }
        }
        else {
            let $ = this.getContent(this.position.id);
            let props = $.is(type) ? $.props() : $.closest(type).props();
            return props ? props.toJS() : { props: null };
        }
    })
}
