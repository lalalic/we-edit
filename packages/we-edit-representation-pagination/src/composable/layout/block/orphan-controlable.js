import PropTypes from "prop-types"
import Anchorable from "./anchorable"
/**
 * widow and orpahn control layout
 * there must be prevLayout, otherwise it's not supported
 * it support line.props.pagination={
 * widow, boolean, identify if widow is supported
 * orphan, boolean, identify if orphan is supported
 * keepLines, boolean, identify if all lines should be layouted together
 *
 * //this layout also depends on following line indicator:
 * last, boolean, identify if it's last line of paragraph
 * i: number[start from i], identify if it's nth line of paragraph
 * }
 */
export default class OrphanControlable extends Anchorable {
	static contextTypes = {
		...Anchorable.contextTypes,
		prevLayout: PropTypes.func,
	};
	defineProperties() {
		super.defineProperties();
		Object.defineProperties(this, {
			prev: {
				enumerable: false,
				configurable: true,
				get() {
					var { parent, prevLayout } = this.context;
					prevLayout = prevLayout || (parent && parent.context && parent.context.prevLayout) || (a => null);
					return prevLayout(this);
				}
			}
		});
	}

    /**
     * how many last lines from same paragraph of input line
     * @param {*} line
     */
	orphanCount(line = this.lastLine) {
		const pid = getLineParagraphId(line, '[data-type="paragraph"]');
		if (!pid)
			return 0;
		const lines = this.lines;
		const i = lines.findLastIndex(a => getLineParagraphId(a) !== pid);
		return i == -1 ? lines.length : i + 1;
	}
    /**
     * start from new layout
     * @param {} line
     */
	appendComposed(line) {
		if (this.isEmpty() && this.prev) {
            /**
             * current line must be recomposed if any rollback happens
             */
			const { pagination = {} } = line.props;
			const { widow, orphan, keepLines, last } = pagination;
			if (keepLines) {
				if (this.prev.shouldKeepLinesWith(line)) { //i!=1
					let lineCount = this.prev.orphanCount();
					this.prev.rollbackLines(lineCount);
					return lineCount + 1;
				}
			}
			else {
				if (orphan) {
					if (this.prev.orphanCount(line) == 1 && this.prev.lines.length > 1) {
						this.prev.rollbackLines(1);
						return 1 + 1;
					}
				}
				if (widow) {
					if (last) {
						const orphanCount = this.prev.orphanCount(line);
						if (orphanCount > 0 && this.prev.lines.length > orphanCount) {
							this.prev.rollbackLines(1);
							if (orphan) {
								if (orphanCount == 2) {
									this.prev.rollbackLines(1);
									return 2 + 1;
								}
							}
							return 1 + 1;
						}
					}
				}
			}
			if (this.prev.shouldKeepWithNext(line)) {
				let removedLines = this.prev.rollbackLines(this.prev.orphanCount());
				//re-submit last paragraph
				const pid = getLineParagraphId(removedLines[0]);
				this.context.getComposer(pid).recommit();
				return 0 + 1;
			}
		}
		return super.appendComposed(...arguments);
	}
	shouldKeepLinesWith(line) {
		const pid = getLineParagraphId(line);
		return getLineParagraphId(this.lastLine) == pid &&
			getLineParagraphId(this.firstLine) != pid;
	}
	shouldKeepWithNext(line) {
		const should = (this.lastLine.props.pagination || {}).keepWithNext &&
			this.orphanCount(line) == 0 &&
			getLineParagraphId(this.firstLine) !== getLineParagraphId(this.lastLine);
		return should;
	}
	static Fixed = OrphanControlable;
}

const getLineParagraphId=line=>new ReactQuery(line).findFirst(`[data-type="paragraph"]`).attr("data-content")
