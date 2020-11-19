export default new Proxy({
    '@':(date,picture)=>{
        return date.format(picture)
    },
    '#':()=>{

    },
    '*':{
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

const DateFormat=`M/d/yyyy
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
                        return this.getHours()>11 ? 'PM' : 'AM'
                    }
                    if(p && p in this){
                        return this[p](calendar)
                    }
                    return m
                })
            },
            yyyy(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar, year:"numeric"}).format(this)
            },
            yy(calendar){
                return new Intl.DateTimeFormat(undefined,{calendar, year:"2-digit"}).format(this)
            },
            M(){
                return this.getMonth()+1
            },
            MM(){
                return String(this.M()).padStart(2,'0')
            },
            MMM(){
                return new Intl.DateTimeFormat(undefined,{month:"short"}).format(this)
            },
            MMMM(){
                return new Intl.DateTimeFormat(undefined,{month:"long"}).format(this)
            },
            W(){
                return new Intl.DateTimeFormat(undefined,{weekday:"short"}).format(this)
            },
            d(){
                return this.getDate()
            },
            dd(){
                return String(this.getDate()).padStart(2,'0')
            },
            ddd(){
                return new Intl.DateTimeFormat(undefined,{weekday:"short"}).format(this)
            },
            dddd(){
                return new Intl.DateTimeFormat(undefined,{weekday:"long"}).format(this)
            },
            H(){
                return this.getHours()
            },
            HH(){
                return String(this.getHours()).padStart(2,'0')
            },
            h(){
                return this.H()%12
            },
            hh(){
                return String(this.h()).padStart(2,'0')
            },
            m(){
                return this.getMinutes()
            },
            mm(){
                return String(this.getMinutes()).padStart(2,'0')
            },
            s(){
                return this.getSeconds()
            },
            ss(){
                return String(this.getSeconds()).padStart(2,'0')
            },
    })
}
