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

                        info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc0NoYXIiLCJpc1doaXRlc3BhY2UiLCJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibGVuIiwibWF4V2lkdGgiLCJ3aWR0aCIsImdyZWVkeSIsIndvcmR5IiwiaW5mbyIsInN1YnN0ciIsInN0cmluZ1dpZHRoIiwiY2hpbGRyZW4iLCJjb250ZW50V2lkdGgiLCJlbmQiLCJ1bmRlZmluZWQiLCJFcnJvciIsImxlbmd0aCIsInN0YXJ0QXQiLCJEYXRlIiwibm93Iiwic21hcnRUeXBlVGV4dCIsImZsb29yIiwiaW5kZXgiLCJjaGFyQXQiLCJzbGljZSIsImNociIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2R2dCQSxNLEdBQUFBLE07UUFJQUMsWSxHQUFBQSxZOzs7O0FBakhoQixJQUFJQyxvQkFBa0IsQ0FBdEI7O0lBQ3FCQyxXO0FBQ2pCLHlCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF3QjtBQUFBO0FBQUEsWUFDbkJDLE1BRG1CLEdBQ0VELEtBREYsQ0FDbkJDLE1BRG1CO0FBQUEsWUFDUkMsUUFEUSxHQUNFRixLQURGLENBQ1hHLEVBRFc7O0FBRTFCLGFBQUtILEtBQUwsR0FBV0EsS0FBWDtBQUNNLGFBQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLGFBQUtLLFVBQUwsR0FBZ0Isb0JBQVlILE1BQVosRUFBb0JJLEdB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QUFDLENBQWxDO0FBQ0E7O0FBRU0sU0FBU25ELFlBQVQsQ0FBc0JVLENBQXRCLEVBQXdCO0FBQzNCLFdBQU9BLE1BQUksR0FBSixJQUFTQSxNQUFJLElBQWIsSUFBcUJBLE1BQUksSUFBekIsSUFBaUNBLE1BQUksSUFBNUM7QUFDSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xyXG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xyXG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEpLmpvaW4oXCIgXCIpXHJcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXHJcbiAgICAgICAgdGhpcy5oZWlnaHQ9TWF0aC5jZWlsKGhlaWdodClcclxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcclxuXHJcblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XHJcblx0XHRcdHdoaXRlU3BhY2U6J3ByZScsXHJcblx0XHRcdGZvbnRTaXplOmAke3RoaXMuc2l6ZX1wdGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuXHRcdFx0ZGVzY2VudDogdGhpcy5kZXNjZW50LFxyXG5cdFx0XHRmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHN0eWxlLmNvbG9yKVxyXG5cdFx0XHR0aGlzLmRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcbiAgICB9XHJcblxyXG5cdGxpbmVIZWlnaHQoKXtcclxuXHRcdHJldHVybiB7aGVpZ2h0OjI1LGRlc2NlbnQ6Mn1cclxuXHR9XHJcblxyXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XHJcblx0XHRyZXR1cm4gMjAwXHJcblx0fVxyXG5cclxuICAgIG5leHQoe2xlbiwgd2lkdGg6bWF4V2lkdGgsIGdyZWVkeT1hPT50cnVlLCB3b3JkeT1hPT50cnVlfSl7XHJcbiAgICAgICAgbGV0IGluZm89bnVsbCwgdGV4dCwgd2lkdGhcclxuICAgICAgICBpZihsZW4pey8vc3BlY2lmaWVkIGNoYXIgbGVuZ3RoXHJcbiAgICAgICAgICAgIHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkLGxlbilcclxuICAgICAgICAgICAgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0KVxyXG4gICAgICAgICAgICBpbmZvPXt3aWR0aCxjaGlsZHJlbjp0ZXh0LCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz1sZW59XHJcbiAgICAgICAgfWVsc2V7Ly9zcGVjaWZpZWQgd2lkdGhcclxuICAgICAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcclxuICAgIFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxyXG5cclxuICAgIFx0XHRpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydEF0PURhdGUubm93KClcclxuXHJcbiAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpKVxyXG4gICAgICAgICAgICBpZih3aWR0aDw9bWF4V2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDp3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgIFx0XHRcdHsvL2hvdyBjYW4gd2UgcXVpY2tseSBtZWFzdXJlXHJcbiAgICBcdFx0XHRcdGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXHJcbiAgICBcdFx0XHRcdGlmKHNtYXJ0VHlwZVRleHQubGVuZ3RoPjApe1xyXG4gICAgXHRcdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxyXG4gICAgXHRcdFx0XHR9XHJcblxyXG4gICAgXHRcdFx0XHRpZih3aWR0aDxtYXhXaWR0aCl7XHJcbiAgICBcdFx0XHRcdFx0bGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXHJcbiAgICBcdFx0XHRcdFx0d2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxyXG4gICAgXHRcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0Kz10aGlzLnRleHQuY2hhckF0KGluZGV4KyspKVxyXG4gICAgXHRcdFx0XHR9XHJcblxyXG4gICAgXHRcdFx0XHRpZih3aWR0aD5tYXhXaWR0aCl7XHJcbiAgICBcdFx0XHRcdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXHJcbiAgICBcdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcclxuICAgIFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XHJcbiAgICBcdFx0XHRcdGxldCBlbmQ9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aFxyXG4gICAgXHRcdFx0XHRpZihlbmQ8dGhpcy50ZXh0Lmxlbmd0aCAmJiBncmVlZHkodGV4dCkpe1xyXG4gICAgXHRcdFx0XHRcdC8vZ3JlZWR5XHJcbiAgICBcdFx0XHRcdFx0bGV0IGNoclxyXG4gICAgXHRcdFx0XHRcdHdoaWxlKCFpc0NoYXIoY2hyPXRoaXMudGV4dC5jaGFyQXQoZW5kKSkpe1xyXG4gICAgXHRcdFx0XHRcdFx0dGV4dCs9Y2hyXHJcbiAgICBcdFx0XHRcdFx0XHRlbmQrK1xyXG4gICAgXHRcdFx0XHRcdH1cclxuICAgIFx0XHRcdFx0fVxyXG5cclxuICAgIFx0XHRcdFx0Ly93b3JkeVxyXG4gICAgXHRcdFx0XHRpZih3b3JkeSh0ZXh0LCB0aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoPT10aGlzLnRleHQubGVuZ3RoKSl7XHJcbiAgICBcdFx0XHRcdFx0d2hpbGUodGV4dC5sZW5ndGggJiYgaXNDaGFyKHRleHQuY2hhckF0KHRleHQubGVuZ3RoLTEpKSl7XHJcbiAgICBcdFx0XHRcdFx0XHR0ZXh0PXRleHQuc3Vic3RyKDAsdGV4dC5sZW5ndGgtMSlcclxuICAgIFx0XHRcdFx0XHR9XHJcbiAgICBcdFx0XHRcdFx0aWYodGV4dC5sZW5ndGg9PTApXHJcbiAgICBcdFx0XHRcdFx0XHR3aWR0aD0wXHJcbiAgICBcdFx0XHRcdH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6d2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGxcclxuICAgICAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHRpbmZvLndpZHRoPU1hdGguY2VpbChpbmZvLndpZHRoKVxyXG4gICAgICAgIHJldHVybiB7Li4udGhpcy5kZWZhdWx0U3R5bGUsLi4uaW5mb31cclxuICAgIH1cclxuXHJcbiAgICByb2xsYmFjayhsZW4pe1xyXG4gICAgICAgIHRoaXMuY29tcG9zZWQtPWxlblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGFyKGNocil7XHJcblx0cmV0dXJuIFwiIFxcdFxcblxcciwuXCIuaW5kZXhPZihjaHIpPT0tMVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGEpe1xyXG4gICAgcmV0dXJuIGE9PT0nICd8fGE9PT0nXFx0JyB8fCBhPT09J1xcbicgfHwgYT09PSdcXHInXHJcbn1cclxuIl19