import Format from "./format"

function describe(f){
    const text=f.toString(), props={switches:{}}
    let i=0,j=0
    while(-1!=(i=text.indexOf("/**",i))){
        j=text.indexOf("*/",i)
        const [k,v,d]=text.substring(i+3,j).split(":")
        d ? props[k][v]=d : props[k]=v
        i=j+2
    }
    return props
}

export default new Proxy({
    "Date and Time":{ 
        DATE(formats){
            /**desc:Today's date*/
            /**formula:[\@ "Date-Time Picture"] [switches]*/
            /**switches:@:Date-Time display options(date-time picture switch)*/
            /**switches:h:Uses the Hijri/Lunar calendar*/
            /**switches:l:inserts the date with last format chosen using the Date and Time command*/
            /**switches:s:Uses the Saka Era calendar*/
            /**switches:u:Uses the Um-al-Qura calendar*/
            const {picture, calendar, others}=formats.reduce((f,a)=>{
                switch(a[0]){
                    case '@':
                        f.picture=a.substring(1).trim().replace(/\"/g,"")
                        break
                    case 'h':
                        f.calendar="chinese"
                        break
                    case 's':
                        f.calendar="buddhist"
                        break
                    case 'u':
                        f.calendar="hebrew"
                        break
                    case 'l':
                        break
                    default:
                        f.others.push(a)
                }
                return f
            },{picture:"M/d/yy",calendar:"iso8601",others:[]})
            const date=new Date().format(picture, calendar)
            return others.reduce((d,format)=>{
                switch(format[0]){
                    case '#':
                        return Format[format[0]](d, format.substring(1))
                    case '*':
                    default:
                }
                return d
            },date)
        }, 
        CREATEDATE(){
            /**desc:Today's date*/
            /**formula:[\@ "Date-Time Picture"]*/
        }, 
        EDITTIME(){
            /**desc:Today's date*/
            /**formula:[\@ "Date-Time Picture"]*/
        }, 
        PRINTDATE(){
            /**desc:Today's date*/
            /**formula:[\@ "Date-Time Picture"]*/
        }, 
        SAVEDATE(){
            /**desc:Today's date*/
            /**formula:[\@ "Date-Time Picture"]*/
        }, 
        TIME(){
        /**desc:Today's date*/
        /**formula:[\@ "Date-Time Picture"]*/
            return this.DATE(...arguments)
        },
    },
    "Document Automation":{ 
        COMPARE(){}, 
        DOCVARIABLE(){}, 
        GOTOBUTTON(){}, 
        IF(){}, 
        MACROBUTTON(){}, 
        PRINT(){},
    },
    "Document Information":{ 
        AUTHOR(){}, 
        COMMENTS(){}, 
        DOCPROPERTY(){}, 
        FILENAME(){}, 
        FILESIZE(){}, 
        KEYWORDS(){}, 
        LASTSAVEDBY(){}, 
        NUMCHARS(){}, 
        NUMPAGES(){}, 
        NUMWORDS(){}, 
        SUBJECT(){}, 
        TEMPLATE(){}, 
        TITLE(){},
    },
    "Equations and Formulas":{ 
        ['='](){}, 
        ADVANCE(){}, 
        SYMBOL(){},
    },
    "Form Fields":{ 
        FORMCHECKBOX(){}, 
        FORMDROPDOWN(){}, 
        FORMTEXT(){},
    },
    "Index and Tables":{ 
        INDEX(){}, 
        /**identifies a file to include when creating a table of contents table of authorities(){}, or an index*/
        RD(){}, 
        /**text and page number for a table of authorities entry*/
        TA(){}, 
        /**text and page number for a table of contents entry*/
        TC(){},
        /**table of contents*/ 
        TOC(){}, 
        /**text and page number for an index entry*/
        XE(){},
    },
    "Links and References":{ 
        AUTOTEXT(){}, 
        AUTOTEXTLIST(){}, 
        BIBLIOGRAPHY(){}, 
        CITATION(){}, 
        HYPERLINK(){}, 
        INCLUDEPICTURE(){}, 
        INCLUDETEXT(){}, 
        LINK(){}, 
        NOTEREF(){}, 
        PAGEREF(){}, 
        QUOTE(){}, 
        REF(){}, 
        STYLEREF(){},
    },
    "Mail merge":{ 
        ADDRESSBLOCK(){}, 
        ASK(){}, 
        COMPARE(){}, 
        DATABASE(){}, 
        FILLIN(){}, 
        GREETINGLINE(){}, 
        IF(){}, 
        MERGEFIELD(){}, 
        MERGEREC(){}, 
        MERGESEQ(){}, 
        NEXT(){}, 
        NEXTIF(){},
        SET(){}, 
        SKIPIF(){},
    },
    "Numbering":{ 
        AUTONUM(){

        },
        LISTNUM(){}, 
        PAGE(){}, 
        REVNUM(){}, 
        SECTION(){}, 
        SECTIONPAGES(){}, 
        SEQ(){},
    },
    "User Information":{ 
        USERADDRESS(){}, 
        USERINITIALS(){}, 
        USERNAME(){},
    }
},{
    get(cates, k, proxy){
        switch(k){
            case "Categories"://all category names
                return ["(All)",...Object.keys(cates).sort()]
            case "getCategory"://get f's category name
                return f=>Object.keys(cates).find(c=>cates[c][f])||"(All)"
            case "(All)"://all function name
                return Array.from(new Set(Object.keys(cates).reduce((all,cat)=>[...all,...Object.keys(cates[cat])],[]))).sort()
            case "filter"://all function name of category c
                return c=>c in cates ? Object.keys(cates[c]).sort() : proxy[c]
            case "Format"://all formats
                return Format
            case "describe"://describe f
                return f=>describe(cates[Object.keys(cates).find(c=>cates[c][f])][f])
            case "invoke"://execute a parsed command
                return ({command,parameters,formats, switches})=>{
                    const cat=proxy.getCategory(command)
                    return cates[cat][command](formats,parameters)
                }
            default:
                return Reflect.get(...arguments)
        }
    }
})