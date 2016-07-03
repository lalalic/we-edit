import React, {Component, PropTypes} from "react"
import Container from "./container"

export default class Table extends Container{
    compose(){
        
    }


    static get Tr(){
        return class extends Container{
            compose(){

            }
        }
    }

    static get Td(){
        return class extends Container{
            compose(){

            }
        }
    }
}
