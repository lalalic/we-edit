export class Name{
    constructor(name){
        this.name=name
    }
    static get(name){
        return new Name(name)
    }
}

export class Ref{
    constructor(num,gen){
        this.num=num
        this.gen=gen
    }

    emit(writer){
        if(this.obj && !this.offset){
            this.offset=writer.offset
            writer._line(`${this.num} ${this.gen} obj`)
            if(this.obj.emit){
                this.obj.emit(writer)
            }else{
                writer.writeValue(this.obj)
            }
            this.obj=null
            writer._line("")
            writer._line(`endobj`)
        }
    }
}

export class Dict{
    constructor(map){
        this._map=Object.create(null)
        if(this.constructor.Type)
            this._map.Type=Name.get(this.constructor.Type)

        map && this.merge(map)

        return new Proxy(this,{
            get(dict,key){
                if(dict.has(key))
                    return dict.get(key)
                return Reflect.get(...arguments)
            }
        })
    }

    get length() {
        return Object.keys(this._map).length;
    }
  
    get(key1, key2, key3) {
        let value = this._map[key1];
  
        if (value === undefined && key2 !== undefined) {
          value = this._map[key2];
  
          if (value === undefined && key3 !== undefined) {
            value = this._map[key3];
          }
        }
  
        if (value instanceof Ref && this.xref) {
          return this.xref.fetch(value)
        }
  
        return value;
    }

    getRaw(key){
        return this._map[key];
    }
    
    getKeys(){
        return Object.keys(this._map)
    }
    
    getRawValues() {
        return Object.values(this._map);
    }
    
    set(key, value) {
        this._map[key] = value;
    }

    has(key) {
        return this._map[key] !== undefined;
    }

    merge(map){
        return map && Object.assign(this._map,map)
    }
}

export function isName(v, name) {
    return v instanceof Name && (name === undefined || v.name === name);
}

export function isDict(v, type) {
    return v instanceof Dict && (type === undefined || isName(v.get("Type"), type));
}

export function isRef(v) {
    return v instanceof Ref;
}

export function isStream(v) {
    return typeof v === "object" && v !== null && v.getBytes !== undefined;
}


