export default new Proxy({
    date:(date,formats)=>{//@
        const {picture, calendar, others}=formats.reduce((f,a)=>{
            switch(a[0]){
                case '@':
                    f.picture=a.substring(1).trim().replace(/\"/g,"")
                    break
                case 'h':
                    f.calendar="islamic"
                    break
                case 's':
                    f.calendar="indian"
                    break
                case 'u':
                    f.calendar="ethiopic"
                    break
                case 'l':
                    break
                default:
                    f.others.push(a)
            }
            return f
        },{picture:"M/d/yy",calendar:"iso8601",others:[]})
        formats.splice(0,formats.length, ...others)
        return date.format(picture, calendar)
    },
    numeric:(value, formats)=>{//#
        const {picture, others}=formats.reduce((f,a)=>{
            switch(a[0]){
                case '#':
                    f.picture=a.substring(1).trim().replace(/\"/g,"")
                    break
                default:
                    f.others.push(a)
            }
            return f
        },{picture:"M/d/yy",others:[]})
        formats.splice(0,formats.length, ...others)
        return value=String(value)
        let fraction=false, offset=-1
        picture=picture.replace(/('.*?')|(\.[0#]*x)|(x[0#]+)/gi,function(m, text, round, drop){
            if(drop){
                const i=value.indexOf(".")
                value=value.substr(i+1,drop.length)+value.substring(0,i+1)
                return drop.replace(/x$/gi,"#")
            }
            if(round){
                value=String(Math.round(parseFloat(value),round.length-1))
                return round.replace(/^x/,"#")
            }
            return m
        })
        picture.replace(/('.*?')(\.)/gi,(m,t,point,i)=>point && (offset=i),"")
        const [intg="", frac=""]=value.split("."), lessThan0=value[0]=='-'
        const _intg=picuture.substring(0,offset).replace(/('.*?')|([0#])|(,)|([-+])/gi,function(m,text,ph,se,sign,i){
            if(text){
                return text
            }
            if(sign){
                return lessThan0 ? '-' : (sign=="+"?"+":"")
            }
            if(ph){

            }
            return m
        })


    },
    //subsequent update
    MERGEFORMAT(){
        return arguments[0]
    },
    CHARFORMAT(){
        return arguments[0]
    },
    //number
    Arabic(i){
        return String(arguments[0])
    },
    CardText(){//One, Two
        return String(arguments[0])
    },
    DollarText(){//$
        return String(arguments[0])
    },
    Ordinal(){//
        return String(arguments[0])
    },
    OrdText(){//First, Second
        return String(arguments[0])
    },
    Roman(i){
        return ["I","II","III","IV","V","VI","VII","VIII","IX"][parseInt(i)-1]
    },
    roman(){
        return this.Roman(...arguments).toLowerCase()
    },
    //text
    Caps(v){
        return this.FirstCap(v.replace(/(\s+.)/gi,m=>m.substring(0,m.length-2)+m[m.length-1].toUpperCase()))
    },
    FirstCap(v){
        return v[0].toUpperCase()+v.substring(1)
    },
    Lower(v){
        return v.toLowerCase()
    },
    Upper(v){
        return v.toUpperCase()
    }
},{
    get(format,k, receiver){
        switch(k){
            case "Date":
                return DateFormat
            case "Numeric":
                return NumericFormat
            case "Text":
            case "General":
                return Object.keys(format).filter(a=>["date","numeric","MERGEFORMAT","CHARFORMAT"].indexOf(a)==-1)
            case "upperRoman":return v=>format.Roman(v)
            case "lowerRoman": return v=>format.roman(v)
            case "cardinalText": return v=>format.CardText(v)
            case "decimal": return v=>format.Arabic(v)
            case "ordinalText": return v=>format.OrdText(v)
            /*
                case "lowerLetter": return v=>parseInt(v,26)
                case "upperLetter": 
                decimalEnclosedCircle,
                decimalEnclosedFullstop,
                decimalEnclosedParen,
                decimalZero,
                none,
                */
            default:
                return Reflect.get(...arguments)
        }
    }
})

const DateFormat=
        `M/d/yyyy
        dddd, MMMM dd, yyyy
        MMMM d, yyyy
        M/d/yy
        yyyy-MM-dd
        d-MMM-yy
        M.d.yyyy
        MMM. d, yy
        d MMMM yyyy
        MMMM yy
        M/d/yyyy h:mm am/pm
        M/d/yyyy h:mm:ss am/pm
        h:mm am/pm
        HH:mm
        'Today is 'HH:mm:ss`.split(/[\r\n]/).filter(a=>!!a).map(a=>a.trim())

const NumericFormat=
        `#,##0
        #,##0.00
        $#,##0.00
        0
        0.00
        0.00%
        0%`.split(/[\r\n]/).filter(a=>!!a).map(a=>a.trim())


if(!Date.prototype.format){
    Object.assign(Date.prototype,{
            format(picture="", calendar){
                return picture.replace(/('.*?')|(am\/pm)|([ydmhs]{1,4})/gi,(m, t, apm, p)=>{
                    if(t){
                        return t
                    }
                    if(apm){
                        const hour=new Intl.DateTimeFormat(undefined,{calendar,hour:"numeric",hour12:false}).format(this)
                        return parseInt(hour)>11 ? 'PM' : 'AM'
                    }
                    if(p && p in this){
                        return this[p](calendar)
                    }
                    return m
                })
            },
            yyyy(calendar){
                return parseInt(new Intl.DateTimeFormat(undefined,{calendar, year:"numeric"}).format(this))
            },
            yy(calendar){
                return String(parseInt(new Intl.DateTimeFormat(undefined,{calendar, year:"2-digit"}).format(this))).padStart(2,'0')
            },
            M(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,month:"numeric"}).format(this)
            },
            MM(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,month:"2-digit"}).format(this)
            },
            MMM(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,month:"short"}).format(this)
            },
            MMMM(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,month:"long"}).format(this)
            },
            W(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,weekday:"short"}).format(this)
            },
            d(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,day:"numeric"}).format(this)
            },
            dd(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,day:"2-digit"}).format(this)
            },
            ddd(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,weekday:"short"}).format(this)
            },
            dddd(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,weekday:"long"}).format(this)
            },
            H(calendar){
                return parseInt(new Intl.DateTimeFormat(undefined,{calendar,hour:"numeric",}).format(this))
            },
            HH(calendar){
                return String(parseInt(new Intl.DateTimeFormat(undefined,{calendar,hour:"2-digit"}).format(this))).padStart(2,'0')
            },
            h(calendar){
                return parseInt(new Intl.DateTimeFormat(undefined,{calendar,hour:"numeric",hour12:true}).format(this))
            },
            hh(calendar){
                return String(parseInt(new Intl.DateTimeFormat(undefined,{calendar,hour:"2-digit",hour12:true}).format(this))).padStart(2,'0')
            },
            m(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,minute:"numeric",}).format(this)
            },
            mm(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,minute:"2-digit"}).format(this).padStart(2,'0')
            },
            s(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,second:"numeric",}).format(this)
            },
            ss(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar,second:"2-digit"}).format(this).padStart(2,'0')
            },
    })
}
