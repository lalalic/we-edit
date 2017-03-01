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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibWF4V2lkdGgiLCJ3aWR0aCIsInVuZGVmaW5lZCIsIkVycm9yIiwibGVuZ3RoIiwic3RhcnRBdCIsIkRhdGUiLCJub3ciLCJpbmZvIiwic3RyaW5nV2lkdGgiLCJzdWJzdHIiLCJjb250ZW50V2lkdGgiLCJlbmQiLCJjaGlsZHJlbiIsInNtYXJ0VHlwZVRleHQiLCJmbG9vciIsImluZGV4IiwibGVuIiwiY2hhckF0Iiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLG9CQUFrQixDQUF0Qjs7SUFDcUJDLFc7QUFDakIseUJBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXdCO0FBQUE7QUFBQSxZQUNuQkMsTUFEbUIsR0FDRUQsS0FERixDQUNuQkMsTUFEbUI7QUFBQSxZQUNSQyxRQURRLEdBQ0VGLEtBREYsQ0FDWEcsRUFEVzs7QUFFMUIsYUFBS0gsS0FBTCxHQUFXQSxLQUFYO0FBQ00sYUFBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsYUFBS0ssVUFBTCxHQUFnQixvQkFBWUgsTUFBWixFQUFvQkksR0FBcEIsQ0FBd0I7QUFBQSx5QkFBTSxPQUFPSixPQUFPSyxDQUFQLENBQVAsSUFBbUIsUUFBbkIsR0FBNkJMLE9BQU9LLENBQVAsQ0FBN0IsR0FBeUMsRUFBL0M7QUFB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aUJuQyxRQUFNLEtBQUtBLElBQUwsQ0FBVTRDLE1BQVYsQ0FBaUJGLE9BQWpCLENBQXZCLENBQU47QUFESjtBQUVILGlCQUpLLE1BSUM7QUFDSCwyQkFBTWYsUUFBTUQsUUFBTixJQUFrQjFCLEtBQUs4QixNQUE3QjtBQUNJSCxnQ0FBTSxLQUFLUSxXQUFMLENBQWlCbkMsT0FBS0EsS0FBSzZDLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFkLENBQXRCLENBQU47QUFESjtBQUVIOztBQUVELG9CQUFHN0MsS0FBSzhCLE1BQVIsRUFBZTtBQUNYSSwyQkFBSyxFQUFDUCxPQUFNRCxRQUFQLEVBQWlCVyxjQUFjVixLQUEvQixFQUFzQ1csS0FBSSxLQUFLdEIsUUFBTCxJQUFlaEIsS0FBSzhCLE1BQTlELEVBQXNFUyxVQUFTdkMsSUFBL0UsRUFBTDtBQUNILGlCQUZELE1BRUs7QUFBQztBQUNGa0MsMkJBQUssRUFBQ1AsT0FBTUQsUUFBUCxFQUFpQlcsY0FBYSxDQUE5QixFQUFpQ0MsS0FBSSxLQUFLdEIsUUFBTCxJQUFlaEIsS0FBSzhCLE1BQXpELEVBQWlFUyxVQUFTdkMsSUFBMUUsRUFBTDtBQUNIO0FBQ0o7O0FBRVBrQyxpQkFBS1AsS0FBTCxHQUFXYixLQUFLQyxJQUFMLENBQVVtQixLQUFLUCxLQUFmLENBQVg7QUFDTSxtQkFBTyxzQkFBY08sSUFBZCxFQUFtQixLQUFLakIsWUFBeEIsQ0FBUDtBQUNIOzs7OztrQkExRWdCbEIsVyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xyXG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xyXG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEpLmpvaW4oXCIgXCIpXHJcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXHJcbiAgICAgICAgdGhpcy5oZWlnaHQ9TWF0aC5jZWlsKGhlaWdodClcclxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcclxuXHRcdFxyXG5cdFx0dGhpcy5kZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHt0aGlzLnNpemV9cHhgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IHRoaXMuZGVzY2VudCxcclxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoc3R5bGUuY29sb3IpXHJcblx0XHRcdHRoaXMuZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcclxuICAgIH1cclxuXHJcblx0bGluZUhlaWdodCgpe1xyXG5cdFx0cmV0dXJuIHtoZWlnaHQ6MjUsZGVzY2VudDoyfVxyXG5cdH1cclxuXHJcblx0c3RyaW5nV2lkdGgoc3RyaW5nKXtcclxuXHRcdHJldHVybiAyMDBcclxuXHR9XHJcblxyXG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcclxuICAgICAgICBpZihtYXhXaWR0aD09dW5kZWZpbmVkKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBtYXggd2lkdGggc3BlY2lmaWVkIHdoZW4gY29tcG9zaW5nIHRleHRcIilcclxuXHJcblx0XHRpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG5cclxuICAgICAgICBsZXQgc3RhcnRBdD1EYXRlLm5vdygpXHJcblxyXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXHJcbiAgICAgICAgbGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpKVxyXG4gICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XHJcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHNtYXJ0VHlwZVRleHQ9dGV4dC5zdWJzdHIoMCxNYXRoLmZsb29yKHRleHQubGVuZ3RoKm1heFdpZHRoL3dpZHRoKSlcclxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXNtYXJ0VHlwZVRleHQpXHJcblx0XHRcdH1cclxuXHJcbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aCwgY29udGVudFdpZHRoOiB3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcclxuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICAgICAgfWVsc2V7Ly9AVE9ETzogdGhlIHNwYWNlIGlzIHRvbyBzbWFsbCwgZ2l2ZSBhIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHRpbmZvLndpZHRoPU1hdGguY2VpbChpbmZvLndpZHRoKVxyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGluZm8sdGhpcy5kZWZhdWx0U3R5bGUpXHJcbiAgICB9XHJcbn1cclxuIl19