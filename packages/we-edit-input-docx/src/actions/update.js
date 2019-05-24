import Backspace from "./backspace"
import {Text} from "../dom/edit"

export default class extends Backspace{
    update_text({id,changing}){
        const editor=new Text(this.file)
        editor.update({id},changing)
    }
}
