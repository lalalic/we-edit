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
            value=Format.number(value, formats, context)
        }

        formats.forEach(k=>{
            if(k in Format){
                value=Format[k](value, formats, context)
            }
        })

        return value
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
}
