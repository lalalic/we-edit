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
			var maxWidth = _ref.width;

			var info = null;
			if (maxWidth == undefined) throw new Error("no max width specified when composing text");

			if (this.composed == this.text.length) return null;

			//let {text, width}=this.measure(this.text,this.composed,maxWidth)
			var text = void 0,
			    width = void 0;
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
						    len = this.text.length;
						while (width < maxWidth && index < len) {
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
					info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
				} else {
					//@TODO: the space is too small
					info = { width: maxWidth, contentWidth: 0, end: this.composed += text.length, children: text };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc0NoYXIiLCJpc1doaXRlc3BhY2UiLCJmaW5kIiwidGVzdEFsbCIsImlzV29yZCIsIl90ZXh0Q29tcG9zZXJUaW1lIiwiV29yZFdyYXBwZXIiLCJ0ZXh0Iiwic3R5bGUiLCJyRm9udHMiLCJmb250U2l6ZSIsInN6IiwiZm9udEZhbWlseSIsIm1hcCIsImEiLCJmaWx0ZXIiLCJqb2luIiwic2l6ZSIsImxpbmVIZWlnaHQiLCJoZWlnaHQiLCJkZXNjZW50IiwiTWF0aCIsImNlaWwiLCJjb21wb3NlZCIsImRlZmF1bHRTdHlsZSIsIndoaXRlU3BhY2UiLCJmb250V2VpZ2h0IiwiYiIsImZvbnRTdHlsZSIsImkiLCJjb2xvciIsImZpbGwiLCJzdHJpbmciLCJtYXhXaWR0aCIsIndpZHRoIiwiaW5mbyIsInVuZGVmaW5lZCIsIkVycm9yIiwibGVuZ3RoIiwic3RyaW5nV2lkdGgiLCJzdWJzdHIiLCJjb250ZW50V2lkdGgiLCJlbmQiLCJjaGlsZHJlbiIsInNtYXJ0VHlwZVRleHQiLCJmbG9vciIsImluZGV4IiwibGVuIiwiY2hhckF0Iiwic2xpY2UiLCJzdHIiLCJzdGFydCIsIl9tZWFzdXJlQnlSYXRpbyIsImNociIsImluZGV4T2YiLCJjb25kaXRpb24iLCJyZWR1Y2UiLCJzdGF0ZSIsImZvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlIZ0JBLE0sR0FBQUEsTTtRQUlBQyxZLEdBQUFBLFk7UUFJQUMsSSxHQUFBQSxJO1FBWUFDLE8sR0FBQUEsTztRQUlBQyxNLEdBQUFBLE07Ozs7QUF6SWhCLElBQUlDLG9CQUFrQixDQUF0Qjs7SUFDcUJDLFc7QUFDakIsc0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXdCO0FBQUE7QUFBQSxNQUNuQkMsTUFEbUIsR0FDRUQsS0FERixDQUNuQkMsTUFEbUI7QUFBQSxNQUNSQyxRQURRLEdBQ0VGLEtBREYsQ0FD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LE1BQUksR0FBSixJQUFTQSxNQUFJLElBQWIsSUFBcUJBLE1BQUksSUFBekIsSUFBaUNBLE1BQUksSUFBNUM7QUFDSDs7QUFFTSxTQUFTWixJQUFULENBQWNnRCxHQUFkLEVBQWtCSyxTQUFsQixFQUE0QjtBQUNsQyxRQUFPLDJDQUFJTCxHQUFKLEdBQVNNLE1BQVQsQ0FBZ0IsVUFBQ0MsS0FBRCxFQUFPM0MsQ0FBUCxFQUFXO0FBQ2pDLE1BQUcsQ0FBQzJDLE1BQU1mLEdBQVYsRUFBYztBQUNiLE9BQUdhLFVBQVV6QyxDQUFWLENBQUgsRUFDQzJDLE1BQU1DLEtBQU4sSUFBYTVDLENBQWIsQ0FERCxLQUdDMkMsTUFBTWYsR0FBTixHQUFVLElBQVY7QUFDRDtBQUNELFNBQU9lLEtBQVA7QUFDQSxFQVJNLEVBUUwsRUFBQ0MsT0FBTSxFQUFQLEVBQVVoQixLQUFJLEtBQWQsRUFSSyxFQVFpQmdCLEtBUnhCO0FBU0E7O0FBRU0sU0FBU3ZELE9BQVQsQ0FBaUIrQyxHQUFqQixFQUFzQkssU0FBdEIsRUFBZ0M7QUFDdEMsUUFBTywyQ0FBSUwsR0FBSixHQUFTTSxNQUFULENBQWdCLFVBQUNDLEtBQUQsRUFBTzNDLENBQVA7QUFBQSxTQUFXMkMsU0FBT0YsVUFBVXpDLENBQVYsQ0FBbEI7QUFBQSxFQUFoQixFQUErQyxJQUEvQyxDQUFQO0FBQ0E7O0FBRU0sU0FBU1YsTUFBVCxDQUFnQjhDLEdBQWhCLEVBQW9CO0FBQzFCLFFBQU8vQyxRQUFRK0MsR0FBUixFQUFZbEQsTUFBWixDQUFQO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JkV3JhcHBlcntcclxuICAgIGNvbnN0cnVjdG9yKHRleHQsIHN0eWxlKXtcclxuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxyXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxyXG4gICAgICAgIHRoaXMudGV4dD10ZXh0XHJcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3R5cGVvZihyRm9udHNbYV0pPT0nc3RyaW5nJz8gckZvbnRzW2FdIDogJyd9YClcclxuICAgICAgICAgICAgLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxyXG5cdFx0dGhpcy5zaXplPWZvbnRTaXplXHJcblx0XHRjb25zdCB7aGVpZ2h0LCBkZXNjZW50fT10aGlzLmxpbmVIZWlnaHQoKVxyXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXHJcblx0XHR0aGlzLmRlc2NlbnQ9TWF0aC5jZWlsKGRlc2NlbnQpXHJcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXHJcblxyXG5cdFx0dGhpcy5kZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHt0aGlzLnNpemV9cHRgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IHRoaXMuZGVzY2VudCxcclxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0dGhpcy5kZWZhdWx0U3R5bGUuZmlsbD1zdHlsZS5jb2xvclxyXG4gICAgfVxyXG5cclxuXHRsaW5lSGVpZ2h0KCl7XHJcblx0XHRyZXR1cm4ge2hlaWdodDoyNSxkZXNjZW50OjJ9XHJcblx0fVxyXG5cclxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xyXG5cdFx0cmV0dXJuIDIwMFxyXG5cdH1cclxuXHJcbiAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xyXG4gICAgICAgIGxldCBpbmZvPW51bGxcclxuXHRcdGlmKG1heFdpZHRoPT11bmRlZmluZWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxyXG5cclxuXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcclxuXHRcdC8vbGV0IHt0ZXh0LCB3aWR0aH09dGhpcy5tZWFzdXJlKHRoaXMudGV4dCx0aGlzLmNvbXBvc2VkLG1heFdpZHRoKVxyXG5cdFx0bGV0IHRleHQsd2lkdGhcclxuXHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpKVxyXG5cdFx0aWYod2lkdGg8PW1heFdpZHRoKXtcclxuXHRcdFx0aW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDp3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHsvL2hvdyBjYW4gd2UgcXVpY2tseSBtZWFzdXJlXHJcblx0XHRcdFx0bGV0IHNtYXJ0VHlwZVRleHQ9dGV4dC5zdWJzdHIoMCxNYXRoLmZsb29yKHRleHQubGVuZ3RoKm1heFdpZHRoL3dpZHRoKSlcclxuXHRcdFx0XHRpZihzbWFydFR5cGVUZXh0Lmxlbmd0aD4wKXtcclxuXHRcdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYod2lkdGg8bWF4V2lkdGgpe1xyXG5cdFx0XHRcdFx0bGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXHJcblx0XHRcdFx0XHR3aGlsZSh3aWR0aDxtYXhXaWR0aCAmJiBpbmRleDxsZW4pXHJcblx0XHRcdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9dGhpcy50ZXh0LmNoYXJBdChpbmRleCsrKSlcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHdpZHRoPm1heFdpZHRoKXtcclxuXHRcdFx0XHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZih0ZXh0Lmxlbmd0aCl7XHJcblx0XHRcdFx0aW5mbz17d2lkdGg6d2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuXHRcdFx0fWVsc2V7Ly9AVE9ETzogdGhlIHNwYWNlIGlzIHRvbyBzbWFsbFxyXG5cdFx0XHRcdGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6MCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcclxuICAgICAgICByZXR1cm4gey4uLnRoaXMuZGVmYXVsdFN0eWxlLC4uLmluZm99XHJcbiAgICB9XHJcblx0XHJcblx0bWVhc3VyZShzdHIsIHN0YXJ0LCBtYXhXaWR0aCl7XHJcblx0XHRsZXQgdGV4dD1zdHIuc3Vic3RyKHN0YXJ0KVxyXG5cdFx0bGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dClcclxuXHRcdGlmKHdpZHRoPD1tYXhXaWR0aClcclxuXHRcdFx0cmV0dXJuIHt0ZXh0LHdpZHRofVxyXG5cdFx0cmV0dXJuIHRoaXMuX21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aClcclxuXHR9XHJcblx0XHJcblx0X21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aCl7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0aWYod2lkdGg9PXVuZGVmaW5lZClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aChzdHIpXHJcblx0XHRcclxuXHRcdGxldCB0ZXh0PXN0ci5zdWJzdHIoMCxNYXRoLmZsb29yKHN0ci5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxyXG5cdFx0aWYodGV4dC5sZW5ndGg+MClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0KVxyXG5cdFx0XHJcblxyXG5cdFx0aWYod2lkdGg8bWF4V2lkdGgpe1xyXG5cdFx0XHRsZXQgaW5kZXg9c3RhcnQrdGV4dC5sZW5ndGgsIGxlbj1zdHIubGVuZ3RoXHJcblx0XHRcdHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcclxuXHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXN0cltpbmRleCsrXSlcclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXHJcblx0XHRcclxuXHRcdHJldHVybiB7dGV4dCx3aWR0aH1cclxuXHR9XHJcblxyXG4gICAgcm9sbGJhY2sobGVuKXtcclxuICAgICAgICB0aGlzLmNvbXBvc2VkLT1sZW5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhcihjaHIpe1xyXG5cdHJldHVybiBcIiBcXHRcXG5cXHIsLlwiLmluZGV4T2YoY2hyKT09LTFcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShhKXtcclxuICAgIHJldHVybiBhPT09JyAnfHxhPT09J1xcdCcgfHwgYT09PSdcXG4nIHx8IGE9PT0nXFxyJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZChzdHIsY29uZGl0aW9uKXtcclxuXHRyZXR1cm4gWy4uLnN0cl0ucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0aWYoIXN0YXRlLmVuZCl7XHJcblx0XHRcdGlmKGNvbmRpdGlvbihhKSlcclxuXHRcdFx0XHRzdGF0ZS5mb3VuZCs9YVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0c3RhdGUuZW5kPXRydWVcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdGF0ZVxyXG5cdH0se2ZvdW5kOlwiXCIsZW5kOmZhbHNlfSkuZm91bmRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RBbGwoc3RyLCBjb25kaXRpb24pe1xyXG5cdHJldHVybiBbLi4uc3RyXS5yZWR1Y2UoKHN0YXRlLGEpPT5zdGF0ZSYmY29uZGl0aW9uKGEpLHRydWUpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1dvcmQoc3RyKXtcclxuXHRyZXR1cm4gdGVzdEFsbChzdHIsaXNDaGFyKVxyXG59XHJcbiJdfQ==