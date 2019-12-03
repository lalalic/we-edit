import Positioning from "./base"

/**
 * It utilize composer to do positioning, 
 * so each composer must implement itself positioning methods, which actually make composer complex
 * Can we make a pure positioning isolated from composer???
 * 
 */
export default class ReactPositioning extends Positioning {
    position(id, at) {
        const composer = this.getComposer(id);
        if (!composer) {
            return super.position(...arguments);
        }
        const { page, x, y, ...position } = composer.position(id, at) || {};
        if (page != undefined) {
            const { x: x0, y: y0 } = this.pageXY(page);
            return {
                id, at,
                x: x0 + x, y: y0 + y,
                ...this.asViewportPoint({ x: x0 + x, y: y0 + y }),
                page,
                ...position,
            };
        }
        else {
        }
    }
    nextLine(id, at) {
        return this.getComposer(id).nextLine(id, at) || {};
    }
    prevLine(id, at) {
        return this.getComposer(id).prevLine(id, at) || {};
    }
    around(left, top) {
        const { page, x, y } = (() => {
            let { x, y } = this.asCanvasPoint({ left, top }), xy;
            const page = this.pages.find(({ props: { width, height, I } }) => {
                xy = this.pageXY(I);
                return x >= xy.x && x <= xy.x + width && y >= xy.y && y <= xy.y + height;
            });
            return { page, x: x - xy.x, y: y - xy.y };
        })();
        return page ? page.positionFromPoint(x, y) : {};
    }
    extendSelection(start, end) {
        if (start.id == end.id)
            return { start, end };
        const framesA = this.getComposer(start.id).composeFrames();
        const framesB = this.getComposer(end.id).composeFrames();
        const i = framesA.findLastIndex((a, i) => a == framesB[i]);
        if (i != -1) {
            framesA.splice(0, i + 1);
            framesB.splice(0, i + 1);
        }
        if (framesA[0]) {
            start = { id: framesA[0], at: 1 };
        }
        if (framesB[0]) {
            end = { id: framesB[0], at: 1 };
        }
        return { start, end };
    }
    getRangeRects(start, end) {
        try {
            ({ start, end } = this.extendSelection(start, end));
            const frame = this.getComposer(start.id).closest(a => !!a.getRangeRects && a.props.id != start.id);
            const rects = frame.getRangeRects(start, end, page => this.pageXY(page.props.I));
            if (end.at == 1) {
                const endComposer = this.getComposer(end.id);
                if (endComposer.getComposeType() == "paragraph") {
                    rects[rects.length - 1].right += endComposer.enderWidth;
                }
            }
            return rects;
        }
        catch (e) {
            return [];
        }
    }
}