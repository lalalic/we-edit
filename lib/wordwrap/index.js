'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _textComposerTime = 0;

var WordWrapper = function () {
    function WordWrapper(text, style) {
        (0, _classCallCheck3.default)(this, WordWrapper);
        var rFonts = style.rFonts,
            fontSize = style.sz;

        this.style = style;
        this.text = text;
        this.fontFamily = (0, _keys2.default)(rFonts).map(function (a) {
            return '' + (typeof rFonts[a] == 'string' ? rFonts[a] : '');
        }).filter(function (a) {
            return a;
        }).join(" ");
        this.size = fontSize;

        var _lineHeight = this.lineHeight(),
            height = _lineHeight.height,
            descent = _lineHeight.descent;

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

    (0, _createClass3.default)(WordWrapper, [{
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
            return (0, _assign2.default)(info, this.defaultStyle);
        }
    }]);
    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibWF4V2lkdGgiLCJ3aWR0aCIsInVuZGVmaW5lZCIsIkVycm9yIiwibGVuZ3RoIiwic3RhcnRBdCIsIkRhdGUiLCJub3ciLCJpbmZvIiwic3RyaW5nV2lkdGgiLCJzdWJzdHIiLCJjb250ZW50V2lkdGgiLCJlbmQiLCJjaGlsZHJlbiIsInNtYXJ0VHlwZVRleHQiLCJmbG9vciIsImluZGV4IiwibGVuIiwiY2hhckF0Iiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLG9CQUFrQixDQUF0Qjs7SUFDcUJDLFc7QUFDakIseUJBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXdCO0FBQUE7QUFBQSxZQUNuQkMsTUFEbUIsR0FDRUQsS0FERixDQUNuQkMsTUFEbUI7QUFBQSxZQUNSQyxRQURRLEdBQ0VGLEtBREYsQ0FDWEcsRUFEVzs7QUFFMUIsYUFBS0gsS0FBTCxHQUFXQSxLQUFYO0FBQ00sYUFBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsYUFBS0ssVUFBTCxHQUFnQixvQkFBWUgsTUFBWixFQUFvQkksR0FBcEIsQ0FBd0I7QUFBQSx5QkFBTSxPQUFPSixPQUFPSyxDQUFQLENBQVAsSUFBbUIsUUFBbkIsR0FBNkJMLE9BQU9LLENBQVAsQ0FBN0IsR0FBeUMsRUFBL0M7QUFB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aUJuQyxRQUFNLEtBQUtBLElBQUwsQ0FBVTRDLE1BQVYsQ0FBaUJGLE9BQWpCLENBQXZCLENBQU47QUFESjtBQUVILGlCQUpLLE1BSUM7QUFDSCwyQkFBTWYsUUFBTUQsUUFBTixJQUFrQjFCLEtBQUs4QixNQUE3QjtBQUNJSCxnQ0FBTSxLQUFLUSxXQUFMLENBQWlCbkMsT0FBS0EsS0FBSzZDLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFkLENBQXRCLENBQU47QUFESjtBQUVIOztBQUVELG9CQUFHN0MsS0FBSzhCLE1BQVIsRUFBZTtBQUNYSSwyQkFBSyxFQUFDUCxPQUFNRCxRQUFQLEVBQWlCVyxjQUFjVixLQUEvQixFQUFzQ1csS0FBSSxLQUFLdEIsUUFBTCxJQUFlaEIsS0FBSzhCLE1BQTlELEVBQXNFUyxVQUFTdkMsSUFBL0UsRUFBTDtBQUNILGlCQUZELE1BRUs7QUFBQztBQUNGa0MsMkJBQUssRUFBQ1AsT0FBTUQsUUFBUCxFQUFpQlcsY0FBYSxDQUE5QixFQUFpQ0MsS0FBSSxLQUFLdEIsUUFBTCxJQUFlaEIsS0FBSzhCLE1BQXpELEVBQWlFUyxVQUFTdkMsSUFBMUUsRUFBTDtBQUNIO0FBQ0o7O0FBRVBrQyxpQkFBS1AsS0FBTCxHQUFXYixLQUFLQyxJQUFMLENBQVVtQixLQUFLUCxLQUFmLENBQVg7QUFDTSxtQkFBTyxzQkFBY08sSUFBZCxFQUFtQixLQUFLakIsWUFBeEIsQ0FBUDtBQUNIOzs7OztrQkExRWdCbEIsVyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JkV3JhcHBlcntcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxuICAgICAgICB0aGlzLnRleHQ9dGV4dFxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxuICAgICAgICAgICAgLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxuXHRcdHRoaXMuc2l6ZT1mb250U2l6ZVxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXG5cdFx0dGhpcy5kZXNjZW50PU1hdGguY2VpbChkZXNjZW50KVxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcblx0XHRcblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxuXHRcdFx0Zm9udFNpemU6YCR7dGhpcy5zaXplfXB4YCxcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuXHRcdFx0ZGVzY2VudDogdGhpcy5kZXNjZW50LFxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcblx0XHR9XG5cdFx0XG5cdFx0aWYoc3R5bGUuY29sb3IpXG5cdFx0XHR0aGlzLmRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXG4gICAgfVxuXG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4ge2hlaWdodDoyNSxkZXNjZW50OjJ9XG5cdH1cblxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xuXHRcdHJldHVybiAyMDBcblx0fVxuXG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXG5cdFx0aWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XG5cdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxuXHRcdFx0fVxuXG4gICAgICAgICAgICBpZih3aWR0aD09bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsLCBnaXZlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oaW5mbyx0aGlzLmRlZmF1bHRTdHlsZSlcbiAgICB9XG59XG4iXX0=