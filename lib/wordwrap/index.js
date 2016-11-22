'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.isChar = isChar;
exports.isWhitespace = isWhitespace;

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
            fontSize: this.size + 'pt',
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
            var len = _ref.len,
                maxWidth = _ref.width,
                _ref$greedy = _ref.greedy,
                greedy = _ref$greedy === undefined ? function (a) {
                return true;
            } : _ref$greedy,
                _ref$wordy = _ref.wordy,
                wordy = _ref$wordy === undefined ? function (a) {
                return true;
            } : _ref$wordy;

            var info = null,
                text = void 0,
                width = void 0;
            if (len) {
                //specified char length
                text = this.text.substr(this.composed, len);
                width = this.stringWidth(text);
                info = { width: width, children: text, contentWidth: width, end: this.composed += len };
            } else {
                //specified width
                if (maxWidth == undefined) throw new Error("no max width specified when composing text");

                if (this.composed == this.text.length) return null;

                var startAt = Date.now();

                width = this.stringWidth(text = this.text.substr(this.composed));
                if (width <= maxWidth) {
                    info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
                } else {
                    {
                        //how can we quickly measure
                        var smartTypeText = text.substr(0, Math.floor(text.length * maxWidth / width));
                        if (smartTypeText.length > 0) {
                            width = this.stringWidth(text = smartTypeText);
                        }

                        if (width < maxWidth) {
                            var index = this.composed + text.length,
                                _len = this.text.length;
                            while (width < maxWidth && index < _len) {
                                width = this.stringWidth(text += this.text.charAt(index++));
                            }
                        }

                        if (width > maxWidth) {
                            while (width > maxWidth && text.length) {
                                width = this.stringWidth(text = text.slice(0, -1));
                            }
                        }
                    };

                    if (text.length) {
                        var end = this.composed + text.length;
                        if (end < this.text.length && greedy(text)) {
                            //greedy
                            var chr = void 0;
                            while (!isChar(chr = this.text.charAt(end))) {
                                text += chr;
                                end++;
                            }
                        }

                        //wordy
                        if (wordy(text, this.composed + text.length == this.text.length)) {
                            while (text.length && isChar(text.charAt(text.length - 1))) {
                                text = text.substr(0, text.length - 1);
                            }
                            if (text.length == 0) width = 0;
                        }

                        info = { width: maxWidth, contentWidth: width, end: this.composed += text.length, children: text };
                    } else {
                        //@TODO: the space is too small
                        info = { width: maxWidth, contentWidth: 0, end: this.composed += text.length, children: text };
                    }
                }
            }

            info.width = Math.ceil(info.width);
            return (0, _extends3.default)({}, this.defaultStyle, info);
        }
    }, {
        key: 'rollback',
        value: function rollback(len) {
            this.composed -= len;
        }
    }]);
    return WordWrapper;
}();

exports.default = WordWrapper;
function isChar(chr) {
    return " \t\n\r,.".indexOf(chr) == -1;
}

function isWhitespace(a) {
    return a === ' ' || a === '\t' || a === '\n' || a === '\r';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc0NoYXIiLCJpc1doaXRlc3BhY2UiLCJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibGVuIiwibWF4V2lkdGgiLCJ3aWR0aCIsImdyZWVkeSIsIndvcmR5IiwiaW5mbyIsInN1YnN0ciIsInN0cmluZ1dpZHRoIiwiY2hpbGRyZW4iLCJjb250ZW50V2lkdGgiLCJlbmQiLCJ1bmRlZmluZWQiLCJFcnJvciIsImxlbmd0aCIsInN0YXJ0QXQiLCJEYXRlIiwibm93Iiwic21hcnRUeXBlVGV4dCIsImZsb29yIiwiaW5kZXgiLCJjaGFyQXQiLCJzbGljZSIsImNociIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2R2dCQSxNLEdBQUFBLE07UUFJQUMsWSxHQUFBQSxZOzs7O0FBakhoQixJQUFJQyxvQkFBa0IsQ0FBdEI7O0lBQ3FCQyxXO0FBQ2pCLHlCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF3QjtBQUFBO0FBQUEsWUFDbkJDLE1BRG1CLEdBQ0VELEtBREYsQ0FDbkJDLE1BRG1CO0FBQUEsWUFDUkMsUUFEUSxHQUNFRixLQURGLENBQ1hHLEVBRFc7O0FBRTFCLGFBQUtILEtBQUwsR0FBV0EsS0FBWDtBQUNNLGFBQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLGFBQUtLLFVBQUwsR0FBZ0Isb0JBQVlILE1BQVosRUFBb0JJLEdB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Q0FBQyxDQUFsQztBQUNBOztBQUVNLFNBQVNuRCxZQUFULENBQXNCVSxDQUF0QixFQUF3QjtBQUMzQixXQUFPQSxNQUFJLEdBQUosSUFBU0EsTUFBSSxJQUFiLElBQXFCQSxNQUFJLElBQXpCLElBQWlDQSxNQUFJLElBQTVDO0FBQ0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3R5cGVvZihyRm9udHNbYV0pPT0nc3RyaW5nJz8gckZvbnRzW2FdIDogJyd9YClcbiAgICAgICAgICAgIC5maWx0ZXIoYT0+YSkuam9pbihcIiBcIilcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcblx0XHRjb25zdCB7aGVpZ2h0LCBkZXNjZW50fT10aGlzLmxpbmVIZWlnaHQoKVxuICAgICAgICB0aGlzLmhlaWdodD1NYXRoLmNlaWwoaGVpZ2h0KVxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXG5cblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxuXHRcdFx0Zm9udFNpemU6YCR7dGhpcy5zaXplfXB0YCxcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuXHRcdFx0ZGVzY2VudDogdGhpcy5kZXNjZW50LFxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcblx0XHR9XG5cblx0XHRpZihzdHlsZS5jb2xvcilcblx0XHRcdHRoaXMuZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcbiAgICB9XG5cblx0bGluZUhlaWdodCgpe1xuXHRcdHJldHVybiB7aGVpZ2h0OjI1LGRlc2NlbnQ6Mn1cblx0fVxuXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XG5cdFx0cmV0dXJuIDIwMFxuXHR9XG5cbiAgICBuZXh0KHtsZW4sIHdpZHRoOm1heFdpZHRoLCBncmVlZHk9YT0+dHJ1ZSwgd29yZHk9YT0+dHJ1ZX0pe1xuICAgICAgICBsZXQgaW5mbz1udWxsLCB0ZXh0LCB3aWR0aFxuICAgICAgICBpZihsZW4pey8vc3BlY2lmaWVkIGNoYXIgbGVuZ3RoXG4gICAgICAgICAgICB0ZXh0PXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZCxsZW4pXG4gICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQpXG4gICAgICAgICAgICBpbmZvPXt3aWR0aCxjaGlsZHJlbjp0ZXh0LCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz1sZW59XG4gICAgICAgIH1lbHNley8vc3BlY2lmaWVkIHdpZHRoXG4gICAgICAgICAgICBpZihtYXhXaWR0aD09dW5kZWZpbmVkKVxuICAgIFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXG4gICAgXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDp3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgXHRcdFx0ey8vaG93IGNhbiB3ZSBxdWlja2x5IG1lYXN1cmVcbiAgICBcdFx0XHRcdGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXG4gICAgXHRcdFx0XHRpZihzbWFydFR5cGVUZXh0Lmxlbmd0aD4wKXtcbiAgICBcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXNtYXJ0VHlwZVRleHQpXG4gICAgXHRcdFx0XHR9XG5cbiAgICBcdFx0XHRcdGlmKHdpZHRoPG1heFdpZHRoKXtcbiAgICBcdFx0XHRcdFx0bGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgXHRcdFx0XHRcdHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcbiAgICBcdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXG4gICAgXHRcdFx0XHR9XG5cbiAgICBcdFx0XHRcdGlmKHdpZHRoPm1heFdpZHRoKXtcbiAgICBcdFx0XHRcdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXG4gICAgXHRcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fTtcblxuICAgICAgICAgICAgICAgIGlmKHRleHQubGVuZ3RoKXtcbiAgICBcdFx0XHRcdGxldCBlbmQ9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aFxuICAgIFx0XHRcdFx0aWYoZW5kPHRoaXMudGV4dC5sZW5ndGggJiYgZ3JlZWR5KHRleHQpKXtcbiAgICBcdFx0XHRcdFx0Ly9ncmVlZHlcbiAgICBcdFx0XHRcdFx0bGV0IGNoclxuICAgIFx0XHRcdFx0XHR3aGlsZSghaXNDaGFyKGNocj10aGlzLnRleHQuY2hhckF0KGVuZCkpKXtcbiAgICBcdFx0XHRcdFx0XHR0ZXh0Kz1jaHJcbiAgICBcdFx0XHRcdFx0XHRlbmQrK1xuICAgIFx0XHRcdFx0XHR9XG4gICAgXHRcdFx0XHR9XG5cbiAgICBcdFx0XHRcdC8vd29yZHlcbiAgICBcdFx0XHRcdGlmKHdvcmR5KHRleHQsIHRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGg9PXRoaXMudGV4dC5sZW5ndGgpKXtcbiAgICBcdFx0XHRcdFx0d2hpbGUodGV4dC5sZW5ndGggJiYgaXNDaGFyKHRleHQuY2hhckF0KHRleHQubGVuZ3RoLTEpKSl7XG4gICAgXHRcdFx0XHRcdFx0dGV4dD10ZXh0LnN1YnN0cigwLHRleHQubGVuZ3RoLTEpXG4gICAgXHRcdFx0XHRcdH1cbiAgICBcdFx0XHRcdFx0aWYodGV4dC5sZW5ndGg9PTApXG4gICAgXHRcdFx0XHRcdFx0d2lkdGg9MFxuICAgIFx0XHRcdFx0fVxuXG4gICAgICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICAgICAgfWVsc2V7Ly9AVE9ETzogdGhlIHNwYWNlIGlzIHRvbyBzbWFsbFxuICAgICAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGluZm8ud2lkdGg9TWF0aC5jZWlsKGluZm8ud2lkdGgpXG4gICAgICAgIHJldHVybiB7Li4udGhpcy5kZWZhdWx0U3R5bGUsLi4uaW5mb31cbiAgICB9XG5cbiAgICByb2xsYmFjayhsZW4pe1xuICAgICAgICB0aGlzLmNvbXBvc2VkLT1sZW5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NoYXIoY2hyKXtcblx0cmV0dXJuIFwiIFxcdFxcblxcciwuXCIuaW5kZXhPZihjaHIpPT0tMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGEpe1xuICAgIHJldHVybiBhPT09JyAnfHxhPT09J1xcdCcgfHwgYT09PSdcXG4nIHx8IGE9PT0nXFxyJ1xufVxuIl19