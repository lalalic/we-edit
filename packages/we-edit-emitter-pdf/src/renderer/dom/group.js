import Element from "./element";
export default class Group extends Element {
    parseRGB(rgb) {
        rgb = rgb || "000000";
        let a = rgb.trim(),
            len = a.length;
        if (a == "black") a = "000000";
        const color = [
            parseInt(a.substring(len - 6, len - 4), 16),
            parseInt(a.substring(len - 4, len - 2), 16),
            parseInt(a.substring(len - 2, len), 16),
        ];
        return color.map((a) => (a / 255.0).toFixed(2));
    }
    
    number(n) {
        if (n > -1e21 && n < 1e21) {
            return Math.round(n * 1e6) / 1e6;
        }
    }

    _transform(str) {
        str.split(")")
            .filter((a) => !!a.trim())
            .map((a) => {
                const [op, ...ps] = a.trim().split(/[\(\,\s+]/);
                return [op, ...ps.filter((a) => !!a).map((b) => parseFloat(b))];
            })
            .map(([f, ...args]) => this[`_${f}`]?.(...args));
    }

    __transform(m11, m12, m21, m22, dx, dy) {
        this.addContent(
            [m11, m12, m21, m22, dx, dy].map(this.number).join(" ") + " cm"
        );
    }

    _translate(x, y) {
        return this.__transform(1, 0, 0, 1, x, y);
    }

    _rotate(angle, options = {}) {
        let y;
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        let x = (y = 0);

        if (options.origin != null) {
            [x, y] = options.origin;
            const x1 = x * cos - y * sin;
            const y1 = x * sin + y * cos;
            x -= x1;
            y -= y1;
        }

        return this.__transform(cos, sin, -sin, cos, x, y);
    }

    _scale(xFactor, yFactor, options = {}) {
        let y;
        if (yFactor == null) {
            yFactor = xFactor;
        }
        if (typeof yFactor === "object") {
            options = yFactor;
            yFactor = xFactor;
        }

        let x = (y = 0);
        if (options.origin != null) {
            [x, y] = options.origin;
            x -= xFactor * x;
            y -= yFactor * y;
        }

        return this.__transform(xFactor, 0, 0, yFactor, x, y);
    }

    _fill(rgb) {
        const [r = 0, g = 0, b = 0] = this.parseRGB(rgb);
        this.addContent(`${r} ${g} ${b} rg ${r} ${g} ${b} RG`);
    }

    _stroke(color) {
        this.addContent(`DeviceRGB CS ${this.parseRGB(color).join(" ")} SCN`);
    }

    _strokeWidth(v) {
        this.addContent(`${v} w`);
    }
}


