import React, { Component, PropTypes } from "react"
import Group from "../composed/group"

export class HasChild extends Component {
    computed = { children: [], composed: [] }

    static childContextTypes = {
        parent: PropTypes.object
        ,prevSibling: PropTypes.func
    }

    getChildContext() {
        let self = this
        return {
            parent: this,
            prevSibling(me) {
                const {children: siblings} = self.computed
                let found = siblings.indexOf(me)
                if (found == -1) {//not found, current should not be composed
                    return siblings[siblings.length - 1]
                } else {
                    return siblings[found - 1]
                }
            }
        }
    }

    render() {
		return <div>{this.getContent()}</div>
    }

    /**
     * compose on client or server
     */
    componentWillMount() {
        this.compose()
    }

    /**
     * usually NoChild content should be composed according to nextAvailableSpace,
     * and then append to itself.composed[] and parent.appendComposed
     */
    compose() {
        if (this.isEmpty()) {
            this.context.parent.on1ChildComposed(this)
        }
    }

    getContentCount() {
        return React.Children.count(this.props.children)
    }

    getContent() {
        return this.props.children
    }

    getStyle() {

    }

    isEmpty() {
        return this.getContentCount() == 0
    }

    /**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    appendComposed(line) {

    }

    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    nextAvailableSpace(required = { width: 0, height: 0 }) {

    }

	/**
	 *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
	 *  return
	 *  	true: parent's all children composed
	 */
    on1ChildComposed(child) {
        this.computed.children.push(child)

        if (this.isAllChildrenComposed()) {
            this.onAllChildrenComposed()
        }
    }

    isAllChildrenComposed() {
        return this.getContentCount() == this.computed.children.length
    }

    onAllChildrenComposed() {
    }

    createComposed2Parent(props) {

    }
}

export default class HasParentAndChild extends HasChild {
    static displayName = "content"
    static contextTypes = {
        parent: PropTypes.object,
        prevSibling: PropTypes.func
    }
    /**
     * children should call before composing line,
     * return next line rect {*width, [height], [greedy(text)=true], [wordy(text)=true]}
     */
    nextAvailableSpace() {
        return this.availableSpace = this.context.parent.nextAvailableSpace(...arguments)
    }

    /**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    appendComposed() {
        return this.context.parent.appendComposed(...arguments)
    }

    onAllChildrenComposed() {
        this.context.parent.on1ChildComposed(this)
        super.onAllChildrenComposed()
    }
}

export class NoChild extends HasParentAndChild {
    constructor() {
        super(...arguments)
        Object.freeze(this.computed.children)//no children
    }

    render() {
        return null
    }

    compose() {
        let composed = this.createComposed2Parent()

        const {parent} = this.context
        this.computed.composed.push(composed)
        parent.appendComposed(composed)
        parent.on1ChildComposed(this)
    }
}

export function styleInheritable(Content) {
    return class StyleContainer extends Content {
        static childContextTypes = Object.assign({
            inheritedStyle: PropTypes.object
        }, Content.childContextTypes)

        getChildContext() {
            const {directStyle = this.defaultStyle} = this.props
            const {inheritedStyle} = this.context

            if (!directStyle)
                debugger;


            return Object.assign(super.getChildContext(), {
                inheritedStyle: {
                    get(path) {
                        let v = directStyle.get(path)
                        if (v == undefined)
                            return inheritedStyle.get(path)
                        return v
                    }
                }
            })
        }

        static contextTypes = Object.assign({
            inheritedStyle: PropTypes.object,
            getDefaultStyle: PropTypes.func
        }, Content.contextTypes)

        style(key) {
            const {directStyle = this.defaultStyle} = this.props
            const {inheritedStyle} = this.context
            let value = directStyle.get(key)
            if (value == undefined)
                value = inheritedStyle.get(key)
            return value
        }

        get defaultStyle() {
            return this.context.getDefaultStyle(this.constructor.displayName)
        }
    }
}
