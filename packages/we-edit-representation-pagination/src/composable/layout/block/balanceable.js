import Columnable from "./columnable"
export default class Balanceable extends Columnable {
	defineProperties() {
		super.defineProperties()
		Object.defineProperties(this,{
			balanceable:{
				get(){
					return this.cols && this.cols.length > 1 && this.props.balance && this.lines.length>1
				}
			}
		})
	}

	onAllChildrenComposed() {
		if (this.balanceable) {
			this.balance();
		}
		super.onAllChildrenComposed(...arguments);
	}
	
	balance() {
		const { balance } = this.props;
		if (typeof (balance) == "function") {
			return balance.call(this);
		}
		const { equalBalanceThreshold = 1 } = this.props;
		const width = this.cols[0].width;
		if (!this.cols.find(a => Math.abs(width - a.width) > equalBalanceThreshold)) {
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
		const totalHeight = this.lines.reduce((h, { props:{height=0} }) => h + height, 0);
		const colHeight = totalHeight / this.cols.length;
		this.columns = [];
		const segments=this.lines.reduce((state, { props: { height = 0 } }, i) => {
			if (state.h < colHeight) {
				state.h += height;
			}
			else {
				state.columns.push(i);
				state.h = height;
			}
			return state;
		}, { columns: [0], h: 0 }).columns.slice(0,this.cols.length)
		
		return segments.forEach(startIndex => this.createColumn(startIndex));
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
