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


***Layout Engine
Anchor/Wrap

*** paragraph[done]
** space provide anchor() to provide x,y[done]

*** move cache from section to fissionable
** remove children() to normalize render, so we can use Layout to compose render
** immutable space, so we can compare space to decide if component should be recomposed
** dynamic composed text, such as numbering, page number, ..., whose width should be pre-defined
** another simple way to positioning cursor and range, 
***fully based on locatable layouted block and inline[done]