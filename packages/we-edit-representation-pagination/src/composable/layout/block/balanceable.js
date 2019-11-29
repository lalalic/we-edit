import Columnable from "./columnable"
export default class Balanceable extends Columnable {
	onAllChildrenComposed() {
		if (this.cols && this.cols.length > 1 && this.props.balance && !this.isEmpty()) {
			this.balance();
		}
		super.onAllChildrenComposed(...arguments);
	}
	
	balance() {
		const { balance } = this.props;
		if (typeof (balance) == "function") {
			return balance.call(this);
		}
		const { balanceThreshold = 1 } = this.props;
		const width = this.cols[0].width;
		if (!this.cols.find(a => Math.abs(width - a.width) <= balanceThreshold)) {
			this.equalBalance();
		}
		else {
			this.anyBalance();
		}
	}
    /**
    *just relocate lines between all columns
    */
	equalBalance() {
		const totalHeight = this.lines.reduce((h, { height, y = h }) => y + height, 0);
		const colHeight = totalHeight / this.cols.length - 10;
		this.columns = [];
		this.lines.reduce((state, { props: { height = 0 } }, i) => {
			if (state.h < colHeight) {
				state.h += height;
			}
			else {
				columns.push(i + 1);
				state.h = height;
			}
			return state;
		}, { columns: [0], h: 0 })
			.columns
			.forEach(startIndex => this.createColumn(startIndex));
	}
    /**
     * re-layout by total cols' width to get layout height
     * then use it as each block height to re-layout again
     */
	anyBalance() {
		const createColumn = this.createColumn;
		try {
			//recompose into col with totalWidth to get total height
			const totalWidth = this.cols.reduce((w, a) => w + a.width, 0);
			this.createColumn = () => Object.assign(createColumn.call(this), { width: totalWidth, height: Number.MAX_SAFE_INTEGER });
			this.recompose();
			const totalHeight = this.blockOffset;
			this.createColumn = () => Object.assign(createColumn.call(this), { height: totalHeight });
			this.recompose();
		}
		finally {
			delete this.createColumn;
		}
	}
}
