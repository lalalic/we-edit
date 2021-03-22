import { Readable } from "stream";
import {Trailer,Catalog,Pages,Group,Text,Path,Image,Page,Font, XRef,} from "./dom";
import {isName, isDict, isRef, Name, isStream} from "./dom/primitives"
import { deflateSync } from "zlib";

/**
 * Trailer:{Root:{Pages:{[Pages|Page]}}}
 * xref is building as emitting, entry {num,gen, obj|offset}
 * offset presented: already emitted 
 * obj presented: not emitted
 *  obj:
 *  promise: loading
 * there are 2 mode to emit
 * 1. top->down : catalog->pages->page->content
 * 2. page->top : page->pages->catalog
 *  > page tree need parent, so it can't emit itself until parent created
 *  > while render createinstance from bottom to top 
 */
export default class PDFWriter extends Readable {
    constructor() {
        super(...arguments);
        this.xref = new XRef();
        this.trailer = new Trailer(this.xref)
        this.count=0

        let current = null;
        Object.defineProperties(this, {
            current: {
                get() {
                    if (!current) {
                        current=new Page(this)
                        this.xref.getNewRef(current)
                        this.count++
                    }
                    return current;
                },
                set(v) {
                    current = null;
                },
            },
        });

        this.fontManager = Font.createManager(this.xref);
        this.imageManager = Image.createManager(this.xref);

        this.offset=0
        this._line("%PDF-1.7");
        this._line("%\xFF\xFF\xFF\xFF");
    }

    appendChild(catalog) {
        this.trailer.set("Root",catalog.ref)
    }

    push(data) {
        if (data) {
            this.offset += data.length;
        }
        super.push(...arguments);
    }

    _line(data) {
        this.push(Buffer.from(data + "\n", "binary"));
    }

    _read() {
        if (this.alreadyPushedAll) 
            return;
        return this.alreadyPushedAll=Promise.resolve()
            .finally(()=>{
                const entries=this.xref.entries
                const pushAllObjects = (pushes = []) => {
                    for (let i = 0; i < entries.length; i++) {
                        const entry=entries[i]
                        if(!entry.offset){
                            pushes.push(Promise.resolve(entry.obj).then(ob=>{
                                entry.obj=ob
                                entry.emit(this)
                            }))
                        }
                    }
                    return Promise.all(pushes).then(() => {
                        if (entries.find(a=>!a.offset))
                            return pushAllObjects();
                    })
                }


                return Promise.resolve(pushAllObjects())
                    .finally(()=>{
                        this.xref.startxref=this.offset
                        this._line("xref");
                        this._line(`0 ${entries.length}`);
                        this._line("0000000000 65535 f ");
                        entries.slice(1).forEach(a=>this._line(`${a.offset}`.padStart(10, "0") + " 00000 n "))
                    })
            })
            .finally(()=>{
                this.trailer.set("Size",this.xref.entries.length)
                this._line("trailer")
                return this.writeDict(this.trailer)
            })
            .finally(()=>{
                this._line("\nstartxref")
                this._line(`${this.xref.startxref}`)
                this._line("%%EOF")
                this.push(null)
            })
    }

    /**
     * maybe stream,
     */
    deflate(streamOrContent) {
        if(streamOrContent.on){
            return new Promise(resolve=>{
                const data=[]
                streamOrContent.on('data',chunk=>data.push(chunk))
                streamOrContent.on('end',()=>{
                    new Blob(data)
                        .arrayBuffer()
                        .then(buffer=>resolve(this.deflate(buffer)))
                })
            })
        }

        if(typeof(streamOrContent)=="string"){
            streamOrContent=Uint8Array.from(streamOrContent, a=>a.charCodeAt(0)&0xff)
        }
        const buffer=Buffer.from(streamOrContent)
        
        const deflated = buffer//deflateSync(buffer)
        const bytes=this.filter(deflated)
        return {
            dict:this.xref.getNewDict({
                //Filter: Name.get("FlateDecode"),
                Length: bytes.length,
                //Length1:buffer.length
            }),
            getBytes:()=>{
                return bytes
            },
        }
    }

    /**
     * encrypt
     * @param {*} a
     * @returns
     */
    filter(a) {
        return a;
    }

    writeDict(dict) {
        this.push("<<");

        for (const key of dict.getKeys()) {
            const value=dict.getRaw(key)
            if(value==null || value==undefined || value.length===0)
                continue
            this.push(` /${key} `);
            this.writeValue(value);
        }

        this.push(">>");
    }

    writeStream(stream) {
        this.writeDict(stream.dict);
        this._line("")
        this._line("stream")
        this.push(stream.getBytes())
        this._line("")
        this._line("endstream")
    }

    writeArray(array) {
        this.push("[");
        let first = true;

        for (const val of array) {
            if (!first) {
                this.push(" ");
            } else {
                first = false;
            }

            this.writeValue(val);
        }

        this.push("]");
    }

    writeValue(value) {
        if (isName(value)) {
            this.push(`/${value.name}`);
        } else if (isRef(value)) {
            this.push(`${value.num} ${value.gen} R`);
        } else if (Array.isArray(value)) {
            this.writeArray(value);
        } else if (typeof value === "string") {
            this.push(`(${this.filter(escapeString(value))})`);
        } else if (typeof value === "number") {
            this.push(numberToString(value));
        } else if (isStream(value)) {
            this.writeStream(value);
        } else if (isDict(value)) {
            this.writeDict(value);
        } else if (typeof value === "boolean") {
            this.push(`${value}`);
        }
    }

    /**
     * instances are created from bottom to top
     */
    createInstance(type, props) {
        console.log(`creating ${type}`);
        switch (type) {
            case "Document":{
                this.props = props;
                return this.xref.getNewRef(
                    new Catalog({
                        Pages: this.xref.getNewRef(new Pages())
                    })
                ).obj
            }
            case "Pages":
                return this.xref.getNewRef(new Pages()).obj
            case "Page": {//@Note:create first, so here just clear current
                this.current.props = props
                const current = this.current
                this.current = null
                return current
            }
            case "g":
                return props.children?.length > 0 ? new Group(props, this.current) : null;
            case "text":
            case "tspan":
                return hasText(props) ? new Text(props, this.current) : null
            case "image":
                return new Image(props, this.current);
            case "path":
                return new Path(props, this.current);
        }
    }
}

const hasText = ({ children, className }) => children?.length > 0 && className != "ender" && typeof children == "string";

function numberToString(value) {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    const roundedValue = Math.round(value * 100);

    if (roundedValue % 100 === 0) {
        return (roundedValue / 100).toString();
    }

    if (roundedValue % 10 === 0) {
        return value.toFixed(1);
    }

    return value.toFixed(2);
}


function escapeString(str) {
    return str.replace(/([\(\)\\])/g, "\\$1");
}
