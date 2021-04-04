import Group from "./group"
import Path from "./path"

export default class Vector extends Group{
    closePath() {
        return this.addContent('h');
    }

    moveTo(x, y) {
        return this.addContent(`${this.number(x)} ${this.number(y)} m`);
    }

    lineTo(x, y) {
        return this.addContent(`${this.number(x)} ${this.number(y)} l`);
    }

    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        return this.addContent(
            `${this.number(cp1x)} ${this.number(cp1y)} ${this.number(cp2x)} ${this.number(cp2y)} ${this.number(
            x
            )} ${this.number(y)} c`
        );
    }

    quadraticCurveTo(cpx, cpy, x, y) {
        return this.addContent(
            `${this.number(cpx)} ${this.number(cpy)} ${this.number(x)} ${this.number(y)} v`
        );
    }

    rect(x, y, w, h) {
        return this.addContent(
            `${this.number(x)} ${this.number(y)} ${this.number(w)} ${this.number(h)} re`
        );
    }

    roundedRect(x, y, w, h, r) {
        if (r == null) {
            r = 0;
        }
        r = Math.min(r, 0.5 * w, 0.5 * h);

        // amount to inset control points from corners (see `ellipse`)
        const c = r * (1.0 - KAPPA);

        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.bezierCurveTo(x + w - c, y, x + w, y + c, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.bezierCurveTo(x + w, y + h - c, x + w - c, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.bezierCurveTo(x + c, y + h, x, y + h - c, x, y + h - r);
        this.lineTo(x, y + r);
        this.bezierCurveTo(x, y + c, x + c, y, x + r, y);
        return this.closePath();
        }

        ellipse(x, y, r1, r2) {
        // based on http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas/2173084#2173084
        if (r2 == null) {
            r2 = r1;
        }
        x -= r1;
        y -= r2;
        const ox = r1 * KAPPA;
        const oy = r2 * KAPPA;
        const xe = x + r1 * 2;
        const ye = y + r2 * 2;
        const xm = x + r1;
        const ym = y + r2;

        this.moveTo(x, ym);
        this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        return this.closePath();
    }

    circle(x, y, radius) {
        return this.ellipse(x, y, radius);
    }

    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        if (anticlockwise == null) {
            anticlockwise = false;
        }
        const TWO_PI = 2.0 * Math.PI;
        const HALF_PI = 0.5 * Math.PI;

        let deltaAng = endAngle - startAngle;

        if (Math.abs(deltaAng) > TWO_PI) {
            // draw only full circle if more than that is specified
            deltaAng = TWO_PI;
        } else if (deltaAng !== 0 && anticlockwise !== deltaAng < 0) {
            // necessary to flip direction of rendering
            const dir = anticlockwise ? -1 : 1;
            deltaAng = dir * TWO_PI + deltaAng;
        }

        const numSegs = Math.ceil(Math.abs(deltaAng) / HALF_PI);
        const segAng = deltaAng / numSegs;
        const handleLen = (segAng / HALF_PI) * KAPPA * radius;
        let curAng = startAngle;

        // component distances between anchor point and control point
        let deltaCx = -Math.sin(curAng) * handleLen;
        let deltaCy = Math.cos(curAng) * handleLen;

        // anchor point
        let ax = x + Math.cos(curAng) * radius;
        let ay = y + Math.sin(curAng) * radius;

        // calculate and render segments
        this.moveTo(ax, ay);

        for (let segIdx = 0; segIdx < numSegs; segIdx++) {
            // starting control point
            const cp1x = ax + deltaCx;
            const cp1y = ay + deltaCy;

            // step angle
            curAng += segAng;

            // next anchor point
            ax = x + Math.cos(curAng) * radius;
            ay = y + Math.sin(curAng) * radius;

            // next control point delta
            deltaCx = -Math.sin(curAng) * handleLen;
            deltaCy = Math.cos(curAng) * handleLen;

            // ending control point
            const cp2x = ax - deltaCx;
            const cp2y = ay - deltaCy;

            // render segment
            this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ax, ay);
        }

        return this;
    }

    polygon(...points) {
        this.moveTo(...(points.shift() || []));
        for (let point of points) {
            this.lineTo(...(point || []));
        }
        return this.closePath();
    }
}