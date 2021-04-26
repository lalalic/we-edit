export default class {
    static pt2px(pt){
		return pt*96/72
	}
	static cm2px(cm){
		return this.pt2px(cm*28.3464567)
	}
    static mm2px(mm){
        return this.cm2px(mm/10)
    }
    static m2px(m){
        return this.cm2px(m*100)
    }
    static in2px(inch){
        return this.pt2px(inch * 72)
    }
    static ft2px(ft){
        return this.pt2px(ft*864)
    }
    static dxa2px(a){
		return this.pt2px(a/20.0)
	}
	static emu2px(a){
		return this.pt2px(a/12700)
	}

    static px2pt(px){
        return 72*px/96
    }

    static px2cm(px){
        return this.px2pt(px)/28.3464567
    }

    static px2mm(px){
        return this.px2cm(px)*10
    }

    static px2m(px){
        return this.px2cm(px)/100
    }

    static px2in(px){
        return this.px2pt(px)/72
    }

    static px2ft(px){
        return this.pt2px(px)/864
    }

    static px2dxa(px){
        return this.px2pt(px)*20
    }

    static px2emu(px){
        return this.px2pt(px)*12700
    }
}