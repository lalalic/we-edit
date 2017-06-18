import React, {Component, PropTypes} from "react"
import get from "lodash.get"

export default function(Models){
	return class extends Models.Section{
		static displayName=`docx-${Models.Section.displayName}`
		static propTypes={
			...Models.Section.propTypes,
			titlePg:PropTypes.bool
		}

		static contextTypes={
			...Models.Section.contextTypes,
			evenAndOddHeaders: PropTypes.bool
		}

		//check http://officeopenxml.com/WPsectionFooterReference.php
		getPageHeaderFooter(category, pageNo){
			category=this.computed[`${category}s`]
			var type='default', target
			if(typeof(pageNo)=="string")
				type=pageNo
			else if(pageNo==1 && this.props.titlePg)
				type="first"
			else if(this.context.evenAndOddHeaders)
				type=pageNo%2==0 ? 'even' : 'default'

			if(type)
				target=get(category,type)

			if(target)
				return target

			let prevSection=this.context.prevSibling(this)
			if(!prevSection)
				return

			return prevSection.getPageHeaderFooter(category,type)
		}
	}
}
