'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _textComposerTime = 0;

var WordWrapper = function () {
    function WordWrapper(text, style) {
        _classCallCheck(this, WordWrapper);

        var rFonts = style.rFonts;
        var fontSize = style.sz;

        this.style = style;
        this.text = text;
        this.fontFamily = Object.keys(rFonts).map(function (a) {
            return '' + (typeof rFonts[a] == 'string' ? rFonts[a] : '');
        }).filter(function (a) {
            return a;
        }).join(" ");
        this.size = fontSize;

        var _lineHeight = this.lineHeight();

        var height = _lineHeight.height;
        var descent = _lineHeight.descent;

        this.height = Math.ceil(height);
        this.descent = Math.ceil(descent);
        this.composed = 0;

        this.defaultStyle = {
            whiteSpace: 'pre',
            fontSize: this.size + 'px',
            fontWeight: style.b ? 700 : 400,
            fontStyle: style.i ? "italic" : "normal",
            height: this.height,
            descent: this.descent,
            fontFamily: this.fontFamily
        };

        if (style.color) this.defaultStyle.fill = style.color;
    }

    _createClass(WordWrapper, [{
        key: 'lineHeight',
        value: function lineHeight() {
            return { height: 25, descent: 2 };
        }
    }, {
        key: 'stringWidth',
        value: function stringWidth(string) {
            return 200;
        }
    }, {
        key: 'next',
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (maxWidth == undefined) throw new Error("no max width specified when composing text");

            if (this.composed == this.text.length) return null;

            var startAt = Date.now();

            var text = null,
                info = null;
            var width = this.stringWidth(text = this.text.substr(this.composed));
            if (width <= maxWidth) {
                info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
            } else {
                var smartTypeText = text.substr(0, Math.floor(text.length * maxWidth / width));
                if (smartTypeText.length > 0) {
                    width = this.stringWidth(text = smartTypeText);
                }

                if (width == maxWidth) {
                    info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width < maxWidth && index < len) {
                        width = this.stringWidth(text += this.text.charAt(index++));
                    }
                } else {
                    while (width > maxWidth && text.length) {
                        width = this.stringWidth(text = text.slice(0, -1));
                    }
                }

                if (text.length) {
                    info = { width: maxWidth, contentWidth: width, end: this.composed += text.length, children: text };
                } else {
                    //@TODO: the space is too small, give a placeholder
                    info = { width: maxWidth, contentWidth: 0, end: this.composed += text.length, children: text };
                }
            }

            info.width = Math.ceil(info.width);
            return Object.assign(info, this.defaultStyle);
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7eUJBQU0sT0FBTyxPQUFPLENBQVAsQ0FBUCxJQUFtQixRQUFuQixHQUE2QixPQUFPLENBQVAsQ0FBN0IsR0FBeUMsRUFBekM7U0FBTixDQUF4QixDQUNYLE1BRFcsQ0FDSjttQkFBRztTQUFILENBREksQ0FDRSxJQURGLENBQ08sR0FEUCxDQUFoQixDQUpvQjtBQU0xQixhQUFLLElBQUwsR0FBVSxRQUFWLENBTjBCOzswQkFPRixLQUFLLFVBQUwsR0FQRTs7WUFPbkIsNEJBUG1CO1lBT1gsOEJBUFc7O0FBUXBCLGFBQUssTUFBTCxHQUFZLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBWixDQVJvQjtBQVMxQixhQUFLLE9BQUwsR0FBYSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWIsQ0FUMEI7QUFVcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQVZvQjs7QUFZMUIsYUFBSyxZQUFMLEdBQWtCO0FBQ2pCLHdCQUFXLEtBQVg7QUFDQSxzQkFBWSxLQUFLLElBQUwsT0FBWjtBQUNBLHdCQUFXLE1BQU0sQ0FBTixHQUFVLEdBQVYsR0FBZ0IsR0FBaEI7QUFDWCx1QkFBVSxNQUFNLENBQU4sR0FBVSxRQUFWLEdBQXFCLFFBQXJCO0FBQ1Ysb0JBQVEsS0FBSyxNQUFMO0FBQ1IscUJBQVMsS0FBSyxPQUFM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b250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JkV3JhcHBlcntcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxuICAgICAgICB0aGlzLnRleHQ9dGV4dFxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxuICAgICAgICAgICAgLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxuXHRcdHRoaXMuc2l6ZT1mb250U2l6ZVxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXG5cdFx0dGhpcy5kZXNjZW50PU1hdGguY2VpbChkZXNjZW50KVxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcblx0XHRcblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxuXHRcdFx0Zm9udFNpemU6YCR7dGhpcy5zaXplfXB4YCxcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuXHRcdFx0ZGVzY2VudDogdGhpcy5kZXNjZW50LFxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcblx0XHR9XG5cdFx0XG5cdFx0aWYoc3R5bGUuY29sb3IpXG5cdFx0XHR0aGlzLmRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXG4gICAgfVxuXG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4ge2hlaWdodDoyNSxkZXNjZW50OjJ9XG5cdH1cblxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xuXHRcdHJldHVybiAyMDBcblx0fVxuXG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXG5cdFx0aWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XG5cdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxuXHRcdFx0fVxuXG4gICAgICAgICAgICBpZih3aWR0aD09bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsLCBnaXZlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oaW5mbyx0aGlzLmRlZmF1bHRTdHlsZSlcbiAgICB9XG59XG4iXX0=