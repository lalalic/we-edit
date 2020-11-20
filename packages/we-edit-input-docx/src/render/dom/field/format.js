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
    number:()=>{//#

    },
    //subsequent update
    MERGEFORMAT(){

    },
    CHARFORMAT(){

    },
    //number
    Arabic(){

    },
    CardText(){

    },
    DollarText(){

    },
    Ordinal(){
        
    },
    OrdText(){
        
    },
    Roman(){
        
    },
    roman(){
        
    },
    //text
    Caps(){
        
    },
    FirstCap(){
        
    },
    Lower(){
        
    },
    Upper(){
        
    }
},{
    get(format,k, receiver){
        switch(k){
            case "Date":
                return DateFormat
            case "Numeric":
            case "Text":
            case "General":
                return []
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
        'Today is 'HH:mm:ss`.split(/[\r\n]/).filter(a=>!!a)


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
