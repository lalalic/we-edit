import Format from "./format"

export default class Field{
    static create(instr){
        const [field, ...formats]=instr.trim().split("\\")
        const [command,...parameters]=field.split(/\s+/g)
        return new Field(command,parameters.map(a=>a.trim()),formats.map(a=>a.trim()))
    }

    static get Summary(){
        if(!this._summary){
            const summary=this._summary=new Set()
            Object.getOwnPropertyNames(Field.prototype).forEach(k=>{
                const desc=Field.describe(k)
                if(desc.category){
                    summary.add(desc.category);
                    (summary[desc.category]||(summary[desc.category]=[])).push(desc.name)
                }
            })
        }
        return this._summary
    }

    static get Categories(){
        return ["(All)",...Array.from(this.Summary).sort()]
    }

    static filter(cate){
        const summary=this.Summary
        if(cate=="(All)"){
            return Array.from(this.Summary).reduce((all,c)=>[...summary[c],...all],[]).sort()
        }
        return summary[cate]
    }

    static Format=Format

    static describe(command){
        const func=Field.prototype[command]
        if(!func)
            return {switches:{}}

        const extract=()=>{
            const text=func.toString()
            const props={name:func.name, switches:{}}
            let i=0,j=0
            while(-1!=(i=text.indexOf("/**",i))){
                j=text.indexOf("*/",i)
                const [k,v,d]=text.substring(i+3,j).split(":").map(a=>a.trim())
                d ? props[k][v]=d : props[k]=v
                i=j+2
            }
            return props
        }

        return func.desc||(func.desc=extract(func))
    }

    constructor(command,parameters, formats){
        this.command=command
        this.parameters=parameters
        this.formats=formats
    }

    execute(context){
        if(!this[this.command]){
            return "!Error Field Name"
        }
        let value=this[this.command](context)
        let formats=[...this.formats]
        const isDate=value?.getTime, hasNumPicture=formats.find(a=>a.startsWith('# '))
        if(isDate){
            value=Format.date(value, formats, context)
        }

        if(hasNumPicture){
            value=Format.numeric(value, formats, context)
        }

        formats.forEach(k=>{
            if(k.startsWith("* ")){
                k=k.replace(/^\*\s+/g,"")
            }
            if(k in Format){
                value=Format[k](value, formats, context)
            }
        })

        return String(value)
    }

    DATE(){
        /**category: Date and Time */
        /**desc:Today's date*/
        /**formula:[\@ "Date-Time Picture"] [switches]*/
        /**switches:@:Date-Time display options(date-time picture switch)*/
        /**switches:h:Uses the Hijri/Lunar calendar*/
        /**switches:l:inserts the date with last format chosen using the Date and Time command*/
        /**switches:s:Uses the Saka Era calendar*/
        /**switches:u:Uses the Um-al-Qura calendar*/
        return new Date()
    }

    CREATEDATE(context){
        /**category: Date and Time */
        /**desc: the date the document was created*/
        /**formula:[\@ "Date-Time Picture"] [switches]*/
        /**switches:@:Date-Time display options(date-time picture switch)*/
        /**switches:h:Uses the Hijri/Lunar calendar*/
        /**switches:l:inserts the date with last format chosen using the Date and Time command*/
        /**switches:s:Uses the Saka Era calendar*/
        /**switches:u:Uses the Um-al-Qura calendar*/
        const date=context.coreDocProp("dcterms:created")
        return new Date(date)
    }

    EDITTIME(context){
        /**category: Date and Time */
        /**desc: the total document editing time*/
        /**formula:[\# "Number Picture"]*/
        /**switches:#:Numeric display options(number picture switch)*/
        return parseInt(context.appDocProp("TotalTime")||0)
    }

    PRINTDATE(context){
        /**category: Date and Time */
        /**desc: the date the document was last printed*/
        /**formula:[\@ "Date-Time Picture"] [switches]*/
        /**switches:@:Date-Time display options(date-time picture switch)*/
        /**switches:h:Uses the Hijri/Lunar calendar*/
        /**switches:l:inserts the date with last format chosen using the Date and Time command*/
        /**switches:s:Uses the Saka Era calendar*/
        /**switches:u:Uses the Um-al-Qura calendar*/
        const date=context.coreDocProp("dcterms:printed")
        return new Date(date)
    }

    SAVEDATE(context){
        /**category: Date and Time */
        /**desc: the date the document as last saved*/
        /**formula:[\@ "Date-Time Picture"] [switches]*/
        /**switches:@:Date-Time display options(date-time picture switch)*/
        /**switches:h:Uses the Hijri/Lunar calendar*/
        /**switches:l:inserts the date with last format chosen using the Date and Time command*/
        /**switches:s:Uses the Saka Era calendar*/
        /**switches:u:Uses the Um-al-Qura calendar*/
        const date=context.coreDocProp("dcterms:modified")
        return new Date(date)
    }

    TIME(context){
        /**category: Date and Time */
        /**desc: the current time*/
        /**formula:[\@ "Date-Time Picture"]*/
        /**switches:@:Date-Time display options(date-time picture)*/
        if(!this.formats.find(a=>a.startsWith("@ "))){
            this.formats.unshift("@ HH:mm:ss")
        }
        return this.DATE()
    }

    //user information - 
    USERADDRESS(){
        /**category: user information */
        /**desc: Address from your office personization options*/
        /**formula:["New Address"]*/
        /**switches:*:text formating switch*/
        return 
    }// USERINITIALS, USERNAME

    //document information
    AUTHOR(context){
        /**category: document information */
        /**desc: the name of the document's author from the document properties*/
        /**formula:["New Author"]*/
        /**switches:*:text formating switch*/
        return context.coreDocProp("dc:creator")
    } //COMMENTS, DOCPROPERTY, FILENAME, FILESIZE, KEYWORDS, LASTSAVEDBY, NUMCHARS, NUMPAGES, NUMWORDS, SUBJECT, TEMPLATE, TITLE
    NUMPAGES(){
        /**category: document information */
        /**desc: the name of the document's author from the document properties*/
        /**formula:["New Author"]*/
        /**switches:*:text formating switch*/
        return context.statistics("totalPages")
    }
    //document automation - COMPARE, DOCVARIABLE, GOTOBUTTON, IF, MACROBUTTON, PRINT
    //equations and formulas - =formula, ADVANCE, SYMBOL
    //form fields - FORMCHECKBOX, FORMDROPDOWN, FORMTEXT
    //index and tables - INDEX, RD (identifies a file to include when creating a table of contents, table of authorities, or an index), TA (text and page number for a table of authorities entry), TC (text and page number for a table of contents entry), TOC (table of contents), XE (text and page number for an index entry)
    //links and references - AUTOTEXT, AUTOTEXTLIST, BIBLIOGRAPHY, CITATION, HYPERLINK, INCLUDEPICTURE, INCLUDETEXT, LINK, NOTEREF, PAGEREF, QUOTE, REF, STYLEREF
    //mail merge - ADDRESSBLOCK, ASK, COMPARE, DATABASE, FILLIN, GREETINGLINE, IF, MERGEFIELD, MERGEREC, MERGESEQ, NEXT, NEXTIF,SET, SKIPIF
    //numbering - LISTNUM, 
    PAGE(context){
        /**category: Numbering */
        /**desc: Insert the total number of pages in the document*/
        /**formula:[\* Format Switch]*/
        /**switches:*:Page number formatting options*/
        const {topFrame:{props:{i=0,I=0}}}=context.selection?.props('page')||{topFrame:{props:{}}}
        const {pgNumType:{fmt="Arabic",start}={}}=context.selection.props('section')
        return ((Format[fmt])||(i=>i))(start!=undefined ? i+parseInt(start) : I+1)
    }//REVNUM, 
    SECTION(){
        /**category: Numbering */
        /**desc: Insert the number of the current section*/
        /**formula:[\* Format Switch]*/
        /**switches:*:number formatting options*/
        return 
    }
    SECTIONPAGES(){
        /**category: Numbering */
        /**desc: Insert the total number of pages in the section*/
        /**formula:[\* Format Switch]*/
        /**switches:*:number formatting options*/
        const {topFrame}=context.selection?.props('page')
        const {allComposed, composed=[]}=topFrame.context.parent.computed
        return composed.length
    }// SEQ

}
