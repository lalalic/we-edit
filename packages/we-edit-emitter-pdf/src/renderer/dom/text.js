import Group from "./group"
export default class Text extends Group{
    postChildCommand(){
        const {fontSize, "data-postscriptname":postscriptName, children}=this.props
        const font=this.page.font(postscriptName)
        const text=(Array.isArray(children) ? children.join("") : children).trim()
        text && this.addContent(`
            BT
            1 0 0 -1 0 0 Tm 
            /${font.id} ${parseInt(fontSize)} Tf
            [(${font.include(text)})] TJ
            ET
        `)
    }
}