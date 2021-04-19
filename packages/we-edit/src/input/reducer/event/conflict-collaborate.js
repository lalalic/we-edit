export default {
    conflict_collaborating_type_text_at_text_for_text({cursor=this.cursor, conflict, action:{payload}}){
        if(cursor.id==conflict.id && cursor.at<=conflict.at){
            return {...conflict, at:conflict.at+payload.length}
        }
    },

    conflict_collaborating_delete_text_at_text_for_text({cursor=this.cursor, conflict}){
        if(cursor.id==conflict.id && cursor.at<=conflict.at){
            return {...conflict, at:conflict.at-1}
        }
    },

    conflict_collaborating_backspace_text_at_text_for_text({cursor=this.cursor, conflict}){
        if(cursor.id==conflict.id && cursor.at<=conflict.at){
            return {...conflict, at:conflict.at-1}
        }
    },
}