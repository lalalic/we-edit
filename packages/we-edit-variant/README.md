# we-edit-variant

It's to support dynamic content in WE document

# components
* Provider[value]: to provide a variant context
* VariantRepresentation[variants]: a representation supporting variants
* withVariant(dom): a hoc transformer to support variants
* install/unstall: to make default representation dom support variants

# variant types
* $exp
* $if
* $for
* $image
* $script
* $sub
* $type


# examples
```jsx
import react from "react"
import ReactDOM from "react-dom"
import {dom,Editor} from "we-edit"
import {withVariant, VariantRepresentation} from "we-edit/variant"

const {Document,Paragraph, Text, $if, $for, $exp}=withVariant(dom)

const doc=(
    <Document>
        <$if condition="id===1">
            <Paragraph>
                <$for init="var i=0" test="i<3" update="i++">
                    <Text>hello</Text>
                </$for>
                <Text>
                    <$exp expression="firstName"/>
                </Text>
            </Paragraph>
        </$if>
    </Document>
)

ReactDOM.render(
    <Editor>
        <VariantRepresenation variants={{id:"1",firstName:"tester"}} type="pagination">
            {doc}
        </VariantRepresentation>
    </Editor>, 
    document.querySelector("#editor")
)
```