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
					var end = this.composed + text.length;
					if (end < this.text.length) {
						//greedy
						while (isWhitespace(this.text.charAt(end))) {
							text += " ";
							end++;
						}
					}

					while (text.length && !isWhitespace(text.charAt(text.length - 1))) {
						text = text.substr(0, text.length - 1);
					}

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


function isWhitespace(chr) {
	return chr === ' ' || chr === '\n' || chr === '\r' || chr === '\t';
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibWF4V2lkdGgiLCJ3aWR0aCIsInVuZGVmaW5lZCIsIkVycm9yIiwibGVuZ3RoIiwic3RhcnRBdCIsIkRhdGUiLCJub3ciLCJpbmZvIiwic3RyaW5nV2lkdGgiLCJzdWJzdHIiLCJjb250ZW50V2lkdGgiLCJlbmQiLCJjaGlsZHJlbiIsInNtYXJ0VHlwZVRleHQiLCJmbG9vciIsImluZGV4IiwibGVuIiwiY2hhckF0Iiwic2xpY2UiLCJpc1doaXRlc3BhY2UiLCJjaHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLG9CQUFrQixDQUF0Qjs7SUFDcUJDLFc7QUFDakIsc0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXdCO0FBQUE7QUFBQSxNQUNuQkMsTUFEbUIsR0FDRUQsS0FERixDQUNuQkMsTUFEbUI7QUFBQSxNQUNSQyxRQURRLEdBQ0VGLEtBREYsQ0FDWEcsRUFEVzs7QUFFMUIsT0FBS0gsS0FBTCxHQUFXQSxLQUFYO0FBQ00sT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0ssVUFBTCxHQUFnQixvQkFBWUgsTUFBWixFQUFvQkksR0FBcEIsQ0FBd0I7QUFBQSxnQkFBTSxPQUFPSixPQUFPSyxDQUFQLENBQVAsSUFBbUIsUUFBbkIsR0FBNkJMLE9BQU9LLENBQVAs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QUFMLEdBQVdiLEtBQUtDLElBQUwsQ0FBVW1CLEtBQUtQLEtBQWYsQ0FBWDtBQUNNLFVBQU8sc0JBQWNPLElBQWQsRUFBbUIsS0FBS2pCLFlBQXhCLENBQVA7QUFDSDs7Ozs7a0JBdkZnQmxCLFc7OztBQTBGckIsU0FBUytDLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTBCO0FBQ3pCLFFBQU9BLFFBQU0sR0FBTixJQUNIQSxRQUFNLElBREgsSUFFSEEsUUFBTSxJQUZILElBR0hBLFFBQU0sSUFIVjtBQUlBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF90ZXh0Q29tcG9zZXJUaW1lPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XHJcblx0XHRjb25zdCB7ckZvbnRzLCBzejpmb250U2l6ZX09c3R5bGVcclxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcclxuICAgICAgICB0aGlzLnRleHQ9dGV4dFxyXG4gICAgICAgIHRoaXMuZm9udEZhbWlseT1PYmplY3Qua2V5cyhyRm9udHMpLm1hcChhPT5gJHt0eXBlb2YockZvbnRzW2FdKT09J3N0cmluZyc/IHJGb250c1thXSA6ICcnfWApXHJcbiAgICAgICAgICAgIC5maWx0ZXIoYT0+YSkuam9pbihcIiBcIilcclxuXHRcdHRoaXMuc2l6ZT1mb250U2l6ZVxyXG5cdFx0Y29uc3Qge2hlaWdodCwgZGVzY2VudH09dGhpcy5saW5lSGVpZ2h0KClcclxuICAgICAgICB0aGlzLmhlaWdodD1NYXRoLmNlaWwoaGVpZ2h0KVxyXG5cdFx0dGhpcy5kZXNjZW50PU1hdGguY2VpbChkZXNjZW50KVxyXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxyXG5cdFx0XHJcblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XHJcblx0XHRcdHdoaXRlU3BhY2U6J3ByZScsXHJcblx0XHRcdGZvbnRTaXplOmAke3RoaXMuc2l6ZX1wdGAsIFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IHRoaXMuZGVzY2VudCxcclxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoc3R5bGUuY29sb3IpXHJcblx0XHRcdHRoaXMuZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcclxuICAgIH1cclxuXHJcblx0bGluZUhlaWdodCgpe1xyXG5cdFx0cmV0dXJuIHtoZWlnaHQ6MjUsZGVzY2VudDoyfVxyXG5cdH1cclxuXHJcblx0c3RyaW5nV2lkdGgoc3RyaW5nKXtcclxuXHRcdHJldHVybiAyMDBcclxuXHR9XHJcblxyXG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcclxuICAgICAgICBpZihtYXhXaWR0aD09dW5kZWZpbmVkKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBtYXggd2lkdGggc3BlY2lmaWVkIHdoZW4gY29tcG9zaW5nIHRleHRcIilcclxuXHJcblx0XHRpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG5cclxuICAgICAgICBsZXQgc3RhcnRBdD1EYXRlLm5vdygpXHJcblxyXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXHJcbiAgICAgICAgbGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpKVxyXG4gICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XHJcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHNtYXJ0VHlwZVRleHQ9dGV4dC5zdWJzdHIoMCxNYXRoLmZsb29yKHRleHQubGVuZ3RoKm1heFdpZHRoL3dpZHRoKSlcclxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXNtYXJ0VHlwZVRleHQpXHJcblx0XHRcdH1cclxuXHJcbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aCwgY29udGVudFdpZHRoOiB3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcclxuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xyXG5cdFx0XHRcdGxldCBlbmQ9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aFxyXG5cdFx0XHRcdGlmKGVuZDx0aGlzLnRleHQubGVuZ3RoKXtcclxuXHRcdFx0XHRcdC8vZ3JlZWR5XHJcblx0XHRcdFx0XHR3aGlsZShpc1doaXRlc3BhY2UodGhpcy50ZXh0LmNoYXJBdChlbmQpKSl7XHJcblx0XHRcdFx0XHRcdHRleHQrPVwiIFwiXHJcblx0XHRcdFx0XHRcdGVuZCsrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHdoaWxlKHRleHQubGVuZ3RoICYmICFpc1doaXRlc3BhY2UodGV4dC5jaGFyQXQodGV4dC5sZW5ndGgtMSkpKXtcclxuXHRcdFx0XHRcdHRleHQ9dGV4dC5zdWJzdHIoMCx0ZXh0Lmxlbmd0aC0xKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxyXG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDowLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihpbmZvLHRoaXMuZGVmYXVsdFN0eWxlKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoY2hyKXtcclxuXHRyZXR1cm4gY2hyPT09JyAnXHJcblx0XHR8fCBjaHI9PT0nXFxuJ1xyXG5cdFx0fHwgY2hyPT09J1xccidcclxuXHRcdHx8IGNocj09PSdcXHQnXHJcbn0iXX0=