/**
 * To provide a selection structure to UI layer
 * Represenation layer should implement and dispatch(ACTION.Selection.STYLE(style)) to state
 * UI Layer can use whenSelectionChange to get selection props/style
 * 
 * Selection can be following type:
 * cursor: the selection is collapsed
 * range: a range is selected
 */
export default class SelectionStyle{
    constructor(position,start,end){
        Object.assign(this,{position,start,end})
        this.isCursor=start.id==end.id && start.at==end.at
        this.isRange=!this.isCursor
    }

    toJSON() {
        const {start, end}=this
        return this.isCursor ? `cursor at (${start.id}, ${start.at})` : JSON.stringify({start,end})
    }

    /**
     * 
     * @param {*} type :[page,layout,...any content type, such as text, paragraph] 
     * @param {*} getFromContent: bool, get props from content or composer 
     */
    props(type, getFromContent = true){
        if(`_${type}Props` in this){
            return this[`_${type}Props`](type, getFromContent)
        }
        return this._props(...arguments)
    }

    _props(type, getFromContent = true){
        if (getFromContent) {
            return this._getFromContent(type).props
        }
        const { id: typed } = this._getFromContent(type);
        if (typed) {
            const composer = this.getComposer(typed);
            if (composer) {
                return composer.props
            }
        }
    }

    /**
     * if it's range, return range rects
     * representation layouer should implement it
     */
    getRangeRects(){
        return []
    }

    _getFromContent(type){
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
            const $ = this.getContent(this.position.id);
            const props = $.is(type) ? $.props() : $.closest(type).props();
            return props ? props.toJS() : { props: null };
        }
    }

    getComposer(id){

    }

    getContent(id){

    }

    getTestDocument(store){

    }
}