import ReactFiberReconciler from "react-reconciler"
export {default as Writer} from "./writer"

const emptyObject = Object.create(null)

export const PDFRenderer = ReactFiberReconciler({
    supportsMutation: true,

    createInstance(type, props, writer) {
        return writer.createInstance(...arguments)
    },

    appendInitialChild(parentInstance, child) {
        parentInstance?.appendChild?.(child);
    },

    createTextInstance(text, rootContainerInstance) {
        console.log(`creating text[${text}]`)
        debugger
    },

    appendChild(parentInstance, child) {
        parentInstance?.appendChild?.(child);
    },

    appendChildToContainer(parentInstance, child) {
        parentInstance?.appendChild?.(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
        parentInstance?.appendChildBefore?.(child, beforeChild);
    },

    removeChild(parentInstance, child) {
        parentInstance?.removeChild?.(child);
    },

    removeChildFromContainer(parentInstance, child) {
        parentInstance?.removeChild?.(child);
    },

    commitTextUpdate(textInstance, oldText, newText) {
        textInstance?.update?.(newText);
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
        instance?.update?.(newProps);
    },

    finalizeInitialChildren(element, type, props) {
        console.log(`finalizeInitialChildren [${type}]`)
        switch(type){
            case 'Page':
                element.emitContent()
                break
        }
        return false;
    },

    getPublicInstance(instance) {
        return instance;
    },

    prepareForCommit() {
        // Noop
    },

    prepareUpdate(element, type, oldProps, newProps) {
        return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit() {
        // Noop
    },

    resetTextContent(element) {
        // Noop
    },

    getRootHostContext() {
        return emptyObject;
    },

    getChildHostContext() {
        return emptyObject;
    },

    shouldSetTextContent(type, props) {
        return type=="text" || type=="tspan"
    },

    now: Date.now,

    useSyncScheduling: true,
})

export const render=(element,{Writer,Renderer}) => {
    const writer=new Writer()
    const root = Renderer.createContainer(writer, 0, false, null)
    Renderer.updateContainer(element, root, null, undefined)
    return writer
}

export const [Document, Page, Pages]=["Document","Page","Pages"]