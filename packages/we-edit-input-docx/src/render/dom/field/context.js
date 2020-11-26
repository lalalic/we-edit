import {getFile, getStatistics, getSelectionStyle} from "we-edit"

export default class {
    constructor(state, id){
        this.doc=getFile(state)
        this.selection=getSelectionStyle(state)
        this.docx=this.doc.doc
        this.id=id
    }

    coreDocProp(key){
        return this.docx.getObjectPart("docProps/core.xml")(key.replace(":","\\:")).text()
    }

    appDocProp(key){
        return this.docx.getObjectPart("docProps/app.xml")(key.replace(":","\\:")).text()
    }

    customDocProp(key){
        return this.docx.getObjectPart("docProps/custom.xml")(key.replace(":","\\:")).text()
    }
}