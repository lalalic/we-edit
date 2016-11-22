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

exports.isChar = isChar;

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
			var maxWidth = _ref.width,
			    _ref$greedy = _ref.greedy,
			    greedy = _ref$greedy === undefined ? function (a) {
				return true;
			} : _ref$greedy,
			    _ref$wordy = _ref.wordy,
			    wordy = _ref$wordy === undefined ? function (a) {
				return true;
			} : _ref$wordy;

			if (maxWidth == undefined) throw new Error("no max width specified when composing text");

			if (this.composed == this.text.length) return null;

			var startAt = Date.now();

			var text = null,
			    info = null;
			var width = this.stringWidth(text = this.text.substr(this.composed));
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

			info.width = Math.ceil(info.width);
			return (0, _assign2.default)(info, this.defaultStyle);
		}
	}]);
	return WordWrapper;
}();

exports.default = WordWrapper;
function isChar(chr) {
	return " \t\n\r,.".indexOf(chr) == -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc0NoYXIiLCJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibWF4V2lkdGgiLCJ3aWR0aCIsImdyZWVkeSIsIndvcmR5IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJsZW5ndGgiLCJzdGFydEF0IiwiRGF0ZSIsIm5vdyIsImluZm8iLCJzdHJpbmdXaWR0aCIsInN1YnN0ciIsImNvbnRlbnRXaWR0aCIsImVuZCIsImNoaWxkcmVuIiwic21hcnRUeXBlVGV4dCIsImZsb29yIiwiaW5kZXgiLCJsZW4iLCJjaGFyQXQiLCJzbGljZSIsImNociIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtR2dCQSxNLEdBQUFBLE07Ozs7QUFuR2hCLElBQUlDLG9CQUFrQixDQUF0Qjs7SUFDcUJDLFc7QUFDakIsc0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXdCO0FBQUE7QUFBQSxNQUNuQkMsTUFEbUIsR0FDRUQsS0FERixDQUNuQkMsTUFEbUI7QUFBQSxNQUNSQyxRQURRLEdBQ0VGLEtBREYsQ0FDWEcsRUFEVzs7QUFFMUIsT0FBS0gsS0FBTCxHQUFXQSxLQUFYO0FBQ00sT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0ssVUFBTCxHQUFnQixvQkFBWUgsTUFBWixFQUFvQkksR0FBcEIsQ0FBd0I7QUFBQSxnQkFBTSxPQUFPSixPQUFP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O0FBRVdTLFlBQUssRUFBQ1QsT0FBTUQsUUFBUCxFQUFpQmEsY0FBY1osS0FBL0IsRUFBc0NhLEtBQUksS0FBS3hCLFFBQUwsSUFBZWhCLEtBQUtnQyxNQUE5RCxFQUFzRVMsVUFBU3pDLElBQS9FLEVBQUw7QUFDSCxLQXJCRCxNQXFCSztBQUFDO0FBQ0ZvQyxZQUFLLEVBQUNULE9BQU1ELFFBQVAsRUFBaUJhLGNBQWEsQ0FBOUIsRUFBaUNDLEtBQUksS0FBS3hCLFFBQUwsSUFBZWhCLEtBQUtnQyxNQUF6RCxFQUFpRVMsVUFBU3pDLElBQTFFLEVBQUw7QUFDSDtBQUNKOztBQUVQb0MsUUFBS1QsS0FBTCxHQUFXYixLQUFLQyxJQUFMLENBQVVxQixLQUFLVCxLQUFmLENBQVg7QUFDTSxVQUFPLHNCQUFjUyxJQUFkLEVBQW1CLEtBQUtuQixZQUF4QixDQUFQO0FBQ0g7Ozs7O2tCQS9GZ0JsQixXO0FBa0dkLFNBQVNGLE1BQVQsQ0FBZ0JtRCxHQUFoQixFQUFvQjtBQUMxQixRQUFPLFlBQVlDLE9BQVosQ0FBb0JELEdBQXBCLEtBQTBCLENBQUMsQ0FBbEM7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xyXG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xyXG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEpLmpvaW4oXCIgXCIpXHJcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXHJcbiAgICAgICAgdGhpcy5oZWlnaHQ9TWF0aC5jZWlsKGhlaWdodClcclxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcclxuXHRcdFxyXG5cdFx0dGhpcy5kZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHt0aGlzLnNpemV9cHRgLCBcclxuXHRcdFx0Zm9udFdlaWdodDpzdHlsZS5iID8gNzAwIDogNDAwLFxyXG5cdFx0XHRmb250U3R5bGU6c3R5bGUuaSA/IFwiaXRhbGljXCIgOiBcIm5vcm1hbFwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG5cdFx0XHRkZXNjZW50OiB0aGlzLmRlc2NlbnQsXHJcblx0XHRcdGZvbnRGYW1pbHk6dGhpcy5mb250RmFtaWx5XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHN0eWxlLmNvbG9yKVxyXG5cdFx0XHR0aGlzLmRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcbiAgICB9XHJcblxyXG5cdGxpbmVIZWlnaHQoKXtcclxuXHRcdHJldHVybiB7aGVpZ2h0OjI1LGRlc2NlbnQ6Mn1cclxuXHR9XHJcblxyXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XHJcblx0XHRyZXR1cm4gMjAwXHJcblx0fVxyXG5cclxuICAgIG5leHQoe3dpZHRoOm1heFdpZHRoLCBncmVlZHk9YT0+dHJ1ZSwgd29yZHk9YT0+dHJ1ZX0pe1xyXG4gICAgICAgIGlmKG1heFdpZHRoPT11bmRlZmluZWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxyXG5cclxuXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcblxyXG4gICAgICAgIGxldCBzdGFydEF0PURhdGUubm93KClcclxuXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbCxpbmZvPW51bGxcclxuICAgICAgICBsZXQgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZCkpXHJcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcclxuICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDp3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG4gICAgICAgIH1lbHNle1xyXG5cdFx0XHR7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0XHRcdGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXHJcblx0XHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9c21hcnRUeXBlVGV4dClcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHdpZHRoPG1heFdpZHRoKXtcclxuXHRcdFx0XHRcdGxldCBpbmRleD10aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoLCBsZW49dGhpcy50ZXh0Lmxlbmd0aFxyXG5cdFx0XHRcdFx0d2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxyXG5cdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHdpZHRoPm1heFdpZHRoKXtcclxuXHRcdFx0XHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XHJcblx0XHRcdFx0bGV0IGVuZD10aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoXHJcblx0XHRcdFx0aWYoZW5kPHRoaXMudGV4dC5sZW5ndGggJiYgZ3JlZWR5KHRleHQpKXtcclxuXHRcdFx0XHRcdC8vZ3JlZWR5XHJcblx0XHRcdFx0XHRsZXQgY2hyXHJcblx0XHRcdFx0XHR3aGlsZSghaXNDaGFyKGNocj10aGlzLnRleHQuY2hhckF0KGVuZCkpKXtcclxuXHRcdFx0XHRcdFx0dGV4dCs9Y2hyXHJcblx0XHRcdFx0XHRcdGVuZCsrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vd29yZHlcclxuXHRcdFx0XHRpZih3b3JkeSh0ZXh0LCB0aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoPT10aGlzLnRleHQubGVuZ3RoKSl7XHJcblx0XHRcdFx0XHR3aGlsZSh0ZXh0Lmxlbmd0aCAmJiBpc0NoYXIodGV4dC5jaGFyQXQodGV4dC5sZW5ndGgtMSkpKXtcclxuXHRcdFx0XHRcdFx0dGV4dD10ZXh0LnN1YnN0cigwLHRleHQubGVuZ3RoLTEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZih0ZXh0Lmxlbmd0aD09MClcclxuXHRcdFx0XHRcdFx0d2lkdGg9MFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGxcclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6MCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdGluZm8ud2lkdGg9TWF0aC5jZWlsKGluZm8ud2lkdGgpXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oaW5mbyx0aGlzLmRlZmF1bHRTdHlsZSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhcihjaHIpe1xyXG5cdHJldHVybiBcIiBcXHRcXG5cXHIsLlwiLmluZGV4T2YoY2hyKT09LTFcclxufSJdfQ==