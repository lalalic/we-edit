'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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
exports.find = find;
exports.testAll = testAll;
exports.isWord = isWord;

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

      var info = null;
      if (len) {
        //by char length
        var text = this.text.substr(this.composed, len);
        var width = this.stringWidth(text);
        info = { width: width, children: text, contentWidth: width, end: this.composed += len };
      } else {
        //by width
        if (maxWidth == undefined) throw new Error("no max width specified when composing text");

        if (this.composed == this.text.length) return null;

        //let {text, width}=this.measure(this.text,this.composed,maxWidth)
        var _text = void 0,
            _width = void 0;
        _width = this.stringWidth(_text = this.text.substr(this.composed));
        if (_width <= maxWidth) {
          info = { width: _width, contentWidth: _width, end: this.composed += _text.length, children: _text };
        } else {
          {
            //how can we quickly measure
            var smartTypeText = _text.substr(0, Math.floor(_text.length * maxWidth / _width));
            if (smartTypeText.length > 0) {
              _width = this.stringWidth(_text = smartTypeText);
            }

            if (_width < maxWidth) {
              var index = this.composed + _text.length,
                  _len = this.text.length;
              while (_width < maxWidth && index < _len) {
                _width = this.stringWidth(_text += this.text.charAt(index++));
              }
            }

            if (_width > maxWidth) {
              while (_width > maxWidth && _text.length) {
                _width = this.stringWidth(_text = _text.slice(0, -1));
              }
            }
          };

          if (_text.length) {
            var end = this.composed + _text.length;
            if (end < this.text.length && greedy(_text)) {
              //greedy
              var chr = void 0;
              while (!isChar(chr = this.text.charAt(end))) {
                _text += chr;
                end++;
              }
            }

            //wordy
            if (wordy(_text, this.composed + _text.length == this.text.length)) {
              while (_text.length && isChar(_text.charAt(_text.length - 1))) {
                _text = _text.substr(0, _text.length - 1);
              }
              if (_text.length == 0) _width = 0;
            }

            info = { width: _width, contentWidth: _width, end: this.composed += _text.length, children: _text };
          } else {
            //@TODO: the space is too small
            info = { width: maxWidth, contentWidth: 0, end: this.composed += _text.length, children: _text };
          }
        }
      }

      info.width = Math.ceil(info.width);
      return (0, _extends3.default)({}, this.defaultStyle, info);
    }
  }, {
    key: 'measure',
    value: function measure(str, start, maxWidth) {
      var text = str.substr(start);
      var width = this.stringWidth(text);
      if (width <= maxWidth) return { text: text, width: width };
      return this._measureByRatio(str, start, maxWidth, width);
    }
  }, {
    key: '_measureByRatio',
    value: function _measureByRatio(str, start, maxWidth, width) {
      //how can we quickly measure
      if (width == undefined) width = this.stringWidth(str);

      var text = str.substr(0, Math.floor(str.length * maxWidth / width));
      if (text.length > 0) width = this.stringWidth(text);

      if (width < maxWidth) {
        var index = start + text.length,
            len = str.length;
        while (width < maxWidth && index < len) {
          width = this.stringWidth(text += str[index++]);
        }
      }

      while (width > maxWidth && text.length) {
        width = this.stringWidth(text = text.slice(0, -1));
      }return { text: text, width: width };
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

function find(str, condition) {
  return [].concat((0, _toConsumableArray3.default)(str)).reduce(function (state, a) {
    if (!state.end) {
      if (condition(a)) state.found += a;else state.end = true;
    }
    return state;
  }, { found: "", end: false }).found;
}

function testAll(str, condition) {
  return [].concat((0, _toConsumableArray3.default)(str)).reduce(function (state, a) {
    return state && condition(a);
  }, true);
}

function isWord(str) {
  return testAll(str, isChar);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc0NoYXIiLCJpc1doaXRlc3BhY2UiLCJmaW5kIiwidGVzdEFsbCIsImlzV29yZCIsIl90ZXh0Q29tcG9zZXJUaW1lIiwiV29yZFdyYXBwZXIiLCJ0ZXh0Iiwic3R5bGUiLCJyRm9udHMiLCJmb250U2l6ZSIsInN6IiwiZm9udEZhbWlseSIsIm1hcCIsImEiLCJmaWx0ZXIiLCJqb2luIiwic2l6ZSIsImxpbmVIZWlnaHQiLCJoZWlnaHQiLCJkZXNjZW50IiwiTWF0aCIsImNlaWwiLCJjb21wb3NlZCIsImRlZmF1bHRTdHlsZSIsIndoaXRlU3BhY2UiLCJmb250V2VpZ2h0IiwiYiIsImZvbnRTdHlsZSIsImkiLCJjb2xvciIsImZpbGwiLCJzdHJpbmciLCJsZW4iLCJtYXhXaWR0aCIsIndpZHRoIiwiZ3JlZWR5Iiwid29yZHkiLCJpbmZvIiwic3Vic3RyIiwic3RyaW5nV2lkdGgiLCJjaGlsZHJlbiIsImNvbnRlbnRXaWR0aCIsImVuZCIsInVuZGVmaW5lZCIsIkVycm9yIiwibGVuZ3RoIiwic21hcnRUeXBlVGV4dCIsImZsb29yIiwiaW5kZXgiLCJjaGFyQXQiLCJzbGljZSIsImNociIsInN0ciIsInN0YXJ0IiwiX21lYXN1cmVCeVJhdGlvIiwiaW5kZXhPZiIsImNvbmRpdGlvbiIsInJlZHVjZSIsInN0YXRlIiwiZm91bmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBMElnQkEsTSxHQUFBQSxNO1FBSUFDLFksR0FBQUEsWTtRQUlBQyxJLEdBQUFBLEk7UUFZQUMsTyxHQUFBQSxPO1FBSUFDLE0sR0FBQUEsTTs7OztBQWxLaEIsSUFBSUMsb0JBQWtCLENBQXRCOztJQUNxQkMsVztBQUNqQix1QkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBd0I7QUFBQTtBQUFBLFFBQ25CQyxNQURtQixHQUNFRCxLQURGLENBQ25CQyxNQURtQjtBQUFBLFFBQ1JDLFFB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dCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JkV3JhcHBlcntcclxuICAgIGNvbnN0cnVjdG9yKHRleHQsIHN0eWxlKXtcclxuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxyXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxyXG4gICAgICAgIHRoaXMudGV4dD10ZXh0XHJcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3R5cGVvZihyRm9udHNbYV0pPT0nc3RyaW5nJz8gckZvbnRzW2FdIDogJyd9YClcclxuICAgICAgICAgICAgLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxyXG5cdFx0dGhpcy5zaXplPWZvbnRTaXplXHJcblx0XHRjb25zdCB7aGVpZ2h0LCBkZXNjZW50fT10aGlzLmxpbmVIZWlnaHQoKVxyXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXHJcblx0XHR0aGlzLmRlc2NlbnQ9TWF0aC5jZWlsKGRlc2NlbnQpXHJcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXHJcblxyXG5cdFx0dGhpcy5kZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHt0aGlzLnNpemV9cHRgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IHRoaXMuZGVzY2VudCxcclxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0dGhpcy5kZWZhdWx0U3R5bGUuZmlsbD1zdHlsZS5jb2xvclxyXG4gICAgfVxyXG5cclxuXHRsaW5lSGVpZ2h0KCl7XHJcblx0XHRyZXR1cm4ge2hlaWdodDoyNSxkZXNjZW50OjJ9XHJcblx0fVxyXG5cclxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xyXG5cdFx0cmV0dXJuIDIwMFxyXG5cdH1cclxuXHJcbiAgICBuZXh0KHtsZW4sIHdpZHRoOm1heFdpZHRoLCBncmVlZHk9YT0+dHJ1ZSwgd29yZHk9YT0+dHJ1ZX0pe1xyXG4gICAgICAgIGxldCBpbmZvPW51bGxcclxuICAgICAgICBpZihsZW4pey8vYnkgY2hhciBsZW5ndGhcclxuICAgICAgICAgICAgbGV0IHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkLGxlbilcclxuICAgICAgICAgICAgbGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dClcclxuICAgICAgICAgICAgaW5mbz17d2lkdGgsY2hpbGRyZW46dGV4dCwgY29udGVudFdpZHRoOndpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9bGVufVxyXG4gICAgICAgIH1lbHNley8vYnkgd2lkdGhcclxuICAgICAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcclxuICAgIFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxyXG5cclxuICAgIFx0XHRpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuXHRcdFx0XHJcblx0XHRcdC8vbGV0IHt0ZXh0LCB3aWR0aH09dGhpcy5tZWFzdXJlKHRoaXMudGV4dCx0aGlzLmNvbXBvc2VkLG1heFdpZHRoKVxyXG5cdFx0XHRsZXQgdGV4dCx3aWR0aFxyXG4gICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcclxuICAgICAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICBcdFx0XHR7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG4gICAgXHRcdFx0XHRsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxyXG4gICAgXHRcdFx0XHRpZihzbWFydFR5cGVUZXh0Lmxlbmd0aD4wKXtcclxuICAgIFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9c21hcnRUeXBlVGV4dClcclxuICAgIFx0XHRcdFx0fVxyXG5cclxuICAgIFx0XHRcdFx0aWYod2lkdGg8bWF4V2lkdGgpe1xyXG4gICAgXHRcdFx0XHRcdGxldCBpbmRleD10aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoLCBsZW49dGhpcy50ZXh0Lmxlbmd0aFxyXG4gICAgXHRcdFx0XHRcdHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcclxuICAgIFx0XHRcdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9dGhpcy50ZXh0LmNoYXJBdChpbmRleCsrKSlcclxuICAgIFx0XHRcdFx0fVxyXG5cclxuICAgIFx0XHRcdFx0aWYod2lkdGg+bWF4V2lkdGgpe1xyXG4gICAgXHRcdFx0XHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxyXG4gICAgXHRcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXHJcbiAgICBcdFx0XHRcdH1cclxuICAgIFx0XHRcdH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xyXG4gICAgXHRcdFx0XHRsZXQgZW5kPXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGhcclxuICAgIFx0XHRcdFx0aWYoZW5kPHRoaXMudGV4dC5sZW5ndGggJiYgZ3JlZWR5KHRleHQpKXtcclxuICAgIFx0XHRcdFx0XHQvL2dyZWVkeVxyXG4gICAgXHRcdFx0XHRcdGxldCBjaHJcclxuICAgIFx0XHRcdFx0XHR3aGlsZSghaXNDaGFyKGNocj10aGlzLnRleHQuY2hhckF0KGVuZCkpKXtcclxuICAgIFx0XHRcdFx0XHRcdHRleHQrPWNoclxyXG4gICAgXHRcdFx0XHRcdFx0ZW5kKytcclxuICAgIFx0XHRcdFx0XHR9XHJcbiAgICBcdFx0XHRcdH1cclxuXHJcbiAgICBcdFx0XHRcdC8vd29yZHlcclxuICAgIFx0XHRcdFx0aWYod29yZHkodGV4dCwgdGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aD09dGhpcy50ZXh0Lmxlbmd0aCkpe1xyXG4gICAgXHRcdFx0XHRcdHdoaWxlKHRleHQubGVuZ3RoICYmIGlzQ2hhcih0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aC0xKSkpe1xyXG4gICAgXHRcdFx0XHRcdFx0dGV4dD10ZXh0LnN1YnN0cigwLHRleHQubGVuZ3RoLTEpXHJcbiAgICBcdFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0XHRcdGlmKHRleHQubGVuZ3RoPT0wKVxyXG4gICAgXHRcdFx0XHRcdFx0d2lkdGg9MFxyXG4gICAgXHRcdFx0XHR9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOndpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDowLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcclxuICAgICAgICByZXR1cm4gey4uLnRoaXMuZGVmYXVsdFN0eWxlLC4uLmluZm99XHJcbiAgICB9XHJcblx0XHJcblx0bWVhc3VyZShzdHIsIHN0YXJ0LCBtYXhXaWR0aCl7XHJcblx0XHRsZXQgdGV4dD1zdHIuc3Vic3RyKHN0YXJ0KVxyXG5cdFx0bGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dClcclxuXHRcdGlmKHdpZHRoPD1tYXhXaWR0aClcclxuXHRcdFx0cmV0dXJuIHt0ZXh0LHdpZHRofVxyXG5cdFx0cmV0dXJuIHRoaXMuX21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aClcclxuXHR9XHJcblx0XHJcblx0X21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aCl7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0aWYod2lkdGg9PXVuZGVmaW5lZClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aChzdHIpXHJcblx0XHRcclxuXHRcdGxldCB0ZXh0PXN0ci5zdWJzdHIoMCxNYXRoLmZsb29yKHN0ci5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxyXG5cdFx0aWYodGV4dC5sZW5ndGg+MClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0KVxyXG5cdFx0XHJcblxyXG5cdFx0aWYod2lkdGg8bWF4V2lkdGgpe1xyXG5cdFx0XHRsZXQgaW5kZXg9c3RhcnQrdGV4dC5sZW5ndGgsIGxlbj1zdHIubGVuZ3RoXHJcblx0XHRcdHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcclxuXHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXN0cltpbmRleCsrXSlcclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXHJcblx0XHRcclxuXHRcdHJldHVybiB7dGV4dCx3aWR0aH1cclxuXHR9XHJcblxyXG4gICAgcm9sbGJhY2sobGVuKXtcclxuICAgICAgICB0aGlzLmNvbXBvc2VkLT1sZW5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhcihjaHIpe1xyXG5cdHJldHVybiBcIiBcXHRcXG5cXHIsLlwiLmluZGV4T2YoY2hyKT09LTFcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShhKXtcclxuICAgIHJldHVybiBhPT09JyAnfHxhPT09J1xcdCcgfHwgYT09PSdcXG4nIHx8IGE9PT0nXFxyJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZChzdHIsY29uZGl0aW9uKXtcclxuXHRyZXR1cm4gWy4uLnN0cl0ucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0aWYoIXN0YXRlLmVuZCl7XHJcblx0XHRcdGlmKGNvbmRpdGlvbihhKSlcclxuXHRcdFx0XHRzdGF0ZS5mb3VuZCs9YVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0c3RhdGUuZW5kPXRydWVcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdGF0ZVxyXG5cdH0se2ZvdW5kOlwiXCIsZW5kOmZhbHNlfSkuZm91bmRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RBbGwoc3RyLCBjb25kaXRpb24pe1xyXG5cdHJldHVybiBbLi4uc3RyXS5yZWR1Y2UoKHN0YXRlLGEpPT5zdGF0ZSYmY29uZGl0aW9uKGEpLHRydWUpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1dvcmQoc3RyKXtcclxuXHRyZXR1cm4gdGVzdEFsbChzdHIsaXNDaGFyKVxyXG59XHJcbiJdfQ==