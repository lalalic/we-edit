import immutable from "immutable"
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import {Provider, connect} from "react-redux"
import thunk from "redux-thunk"

const store=createStore()

