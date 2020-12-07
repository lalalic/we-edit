# we-edit-input-docx
It's to support docx with input and workspace. **It should be moved as an extension later.**

## Design
* Document
* Section
    * header/footer decide content start
        * should it be a template component?
    * Continuous section may change margin/column in a **PAGE**
* 
## In Mind
* Field
    * Field in content should be updated on demand
    * NOT support toggle code/value (**to simplify input reducer**)
    * Page/Numpages in header/footer should be updated in time
        * reframe header/footer: works for viewer/emitter
        * NUMPAGES
            * Not trigger recompose, but render to dynamic that will be resolved during view
            * or response to ACTION.statistics to update content, then trigger recompose if necessary
        * PAGE
            * 
    * Special Rep-Canvas to indicate field area when focused
    * TOC: as whole to edit/remove, no Field
    * TOA
* Hover: representation layer hasn't supportted yet
    * Field
    * Image
    * Shape
    * ...
* Region: possible move to we-edit
* Selection/Cursor refine: rep should support. currently input reducer can do the job, but *it's too late*.
    * readonly can't be cursored
    * object not editable in canvas can't be partially selected, can't be cursored inside


