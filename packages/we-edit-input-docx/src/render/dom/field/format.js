export default new Proxy({
    '@':()=>{
    
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
