import React, {Component} from "react"
import PropTypes from "prop-types"

import {Image as ComposedImage,Frame} from "./composed"

import {NoChild} from "./composable"
import {models} from "we-edit"
const {Template:Base}=models

const Super=NoChild(Base)
export default class Template extends Super{
    static defaultProps={
        ...Super.defaultProps,
    }
}
