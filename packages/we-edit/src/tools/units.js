export default {
    pt2px(pt){
		return pt*96/72
	},
	cm2px(cm){
		return this.pt2px(cm*28.3464567)
	},
    mm2px(mm){
        return this.cm2px(mm/10)
    },
    m2px(m){
        return this.cm2px(m*100)
    },
    in2px(inch){
        return this.pt2px(inch * 72)
    },
    ft2px(ft){
        return this.pt2px(ft*864)
    },
    dxa2Px(a){
		return this.pt2px(a/20.0)
	},
	emu2Px(a){
		return this.pt2px(a/12700)
	},
}