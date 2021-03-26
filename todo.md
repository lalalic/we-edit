> variants
> recompose for available space
> no word wrap on html editing 

editing
>drap and drop
>click on selection
>copy and paste
>undo and redo

compose
>layer

cursor up/down to x

docx:
> continuous section not supportting editing yet


* Layout Engine
    * Anchor/Wrap[done]

* paragraph[done]
    * space provide anchor() to provide x,y[done]

* move cache from section to fissionable[NO]
* remove children() to normalize render, so we can use Layout to compose render[done]
* immutable space, so we can compare space to decide if component should be recomposed
* dynamic composed text, such as numbering, page number, ..., whose width should be pre-defined[done]
*fully based on locatable layouted block and inline[done]
* merge fissionable to section[done]
* Inheritance VS composition: so composer and content are always synced [done]
* Shape[done]
* atom builder mergeOpportunity[done]
* inline level cache: AtomCollector/isInlineContainer && Atom cache[done]
* block level cache
* move composedY to final canvas[done]
* edit tests
* delay createDocument to compose phase to Type render layer
* next/prev line based on original clientX????
* support z :frame sort content and anchor by z [done]
* precision
* merge border
* remove content search from positioning, use composer search up[done]
* focus shape in composed [done]
* layer: content [done]
* ctrl+->:line end, ctrl+<-: line start, 
* connect cursor shape and selection shape to selectionStyle, instead of locator[done]
* positioning in different layer, such as header/footer
    * nextLine
    * prevLine
* Canvas
* topBlock makes inline layout confusion, spaceTopBlock, lineTopBlock: can topBlock concept be removed?
* exclusive space of wrappee => available inline segments, is it possible to calc available space directly from space?
* findInlineSegments() should support minimum inline size to support big wrapper hold whole line[done]
* **Positioning NOT rely on composer.computed.lastComposed**
    * it's heavy to maintain composers vs composed
        * template
        * autofit
        * cache??
    * the following rely on 
        * positionInInline(id,at,composedLine)
        * aroundInInline(composedLine, offset)
        * __findFirstParagraphInTarget(any target)

* mono width font, such as chinese font
* text fonts maybe a few for different 

# Notes
* immutable 4.0 would deadloop

