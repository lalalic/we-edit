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
        DATE(){
            /**desc:Today's date*/
            /**formula:[\@ "Date-Time Picture"] [switches]*/
            /**switches:@:Date-Time display options(date-time picture switch)*/
            /**switches:h:Uses the Hijri/Lunar calendar*/
            /**switches:l:inserts the date with last format chosen using the Date and Time command*/
            /**switches:s:Uses the Saka Era calendar*/
            /**switches:u:Uses the Um-al-Qura calendar*/
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
            case "Categories":
                return ["(All)",...Object.keys(cates).sort()]
            case "getCategory":
                return f=>Object.keys(cates).find(c=>cates[c][f])||"(All)"
            case "(All)":
                return Array.from(new Set(Object.keys(cates).reduce((all,cat)=>[...all,...Object.keys(cates[cat])],[]))).sort()
            case "filter":
                return c=>c in cates ? Object.keys(cates[c]).sort() : proxy[c]
            case "Format":
                return Format
            case "describe":
                return f=>describe(cates[Object.keys(cates).find(c=>cates[c][f])][f])
            default:{
                return Reflect.get(...arguments)
            }
        }
    }
})