import memoize from "memoize-one"

export default class SelectionStyle {
    constructor(position, positioning, start, end) {
        this.position = position;
        this.positioning = positioning;
        this.getComposer = a => positioning.getComposer(a);
        this.getContent = a => positioning.getContent(a);
        this.start = start.id;
        this.end = end.id;
        if (start.id != end.id) {
            if (this.getContent(start.id).forwardFirst(`#${end.id}`).length == 0) {
                this.start = end.id;
                this.end = start.id;
            }
        }
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
        const {hash,id,content,...a}=props
        return a
    })

    layoutProps=memoize(()=>{
        if (!this.positioning.ready)
            return undefined;
        const page = this.positioning.pages.find(a => a.props.I == this.position.page);
        if (!page) {
            return undefined;
        }
        return page.layoutOf(page.columnIndexOf(page.lineIndexOf(this.position)));
    })

    pageProps=memoize(()=>{
        if (!this.positioning.ready)
            return undefined;
        const page = this.positioning.pages.find(a => a.props.I == this.position.page);
        if (!page) {
            return undefined;
        }
        const pageY = () => this.positioning.pageXY(this.position.page).y;
        const line = () => page.lineIndexOf(this.position);
        const column = () => page.columnIndexOf(line());
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
        if (this.start != this.end) {
            var targets = this.getContent(this.start).forwardUntil(`#${this.end}`);
            targets = targets.add('#' + this.end).add('#' + this.start, "unshift");
            targets = targets.filter(type);
            if (targets.length > 0) {
                return targets.props().toJS();
            }
            else {
                return { props: undefined };
            }
        }
        else {
            let $ = this.getContent(this.position.id);
            let props = $.is(type) ? $.props() : $.closest(type).props();
            return props ? props.toJS() : { props: undefined };
        }
    })
}
