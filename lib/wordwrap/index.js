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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJtYXAiLCJhIiwiZmlsdGVyIiwiam9pbiIsInNpemUiLCJsaW5lSGVpZ2h0IiwiaGVpZ2h0IiwiZGVzY2VudCIsIk1hdGgiLCJjZWlsIiwiY29tcG9zZWQiLCJkZWZhdWx0U3R5bGUiLCJ3aGl0ZVNwYWNlIiwiZm9udFdlaWdodCIsImIiLCJmb250U3R5bGUiLCJpIiwiY29sb3IiLCJmaWxsIiwic3RyaW5nIiwibWF4V2lkdGgiLCJ3aWR0aCIsImluZm8iLCJ1bmRlZmluZWQiLCJFcnJvciIsImxlbmd0aCIsInN0cmluZ1dpZHRoIiwic3Vic3RyIiwiY29udGVudFdpZHRoIiwiZW5kIiwiY2hpbGRyZW4iLCJzbWFydFR5cGVUZXh0IiwiZmxvb3IiLCJpbmRleCIsImxlbiIsImNoYXJBdCIsInNsaWNlIiwic3RyIiwic3RhcnQiLCJfbWVhc3VyZUJ5UmF0aW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLG9CQUFrQixDQUF0Qjs7SUFDcUJDLFc7QUFDakIsc0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXdCO0FBQUE7QUFBQSxNQUNuQkMsTUFEbUIsR0FDRUQsS0FERixDQUNuQkMsTUFEbUI7QUFBQSxNQUNSQyxRQURRLEdBQ0VGLEtBREYsQ0FDWEcsRUFEVzs7QUFFMUIsT0FBS0gsS0FBTCxHQUFXQSxLQUFYO0FBQ00sT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0ssVUFBTCxHQUFnQixvQkFBWUgsTUFBWixFQUFvQkksR0FBcEIsQ0FBd0I7QUFBQSxnQkFBTSxPQUFPSixPQUFPSyxDQUFQLENBQVAsSUFBbUIsUUFBbkIsR0FBNkJMLE9BQU9LLENBQVAsQ0FBN0IsR0FBeUMs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LE1BQUosR0FBV0wsUUFBWCxHQUFvQkMsS0FBL0IsQ0FBYixDQUFUO0FBQ0EsT0FBRzNCLEtBQUsrQixNQUFMLEdBQVksQ0FBZixFQUNDSixRQUFNLEtBQUtLLFdBQUwsQ0FBaUJoQyxJQUFqQixDQUFOOztBQUdELE9BQUcyQixRQUFNRCxRQUFULEVBQWtCO0FBQ2pCLFFBQUlhLFFBQU1LLFFBQU01QyxLQUFLK0IsTUFBckI7QUFBQSxRQUE2QlMsTUFBSUcsSUFBSVosTUFBckM7QUFDQSxXQUFNSixRQUFNRCxRQUFOLElBQWtCYSxRQUFNQyxHQUE5QjtBQUNDYixhQUFNLEtBQUtLLFdBQUwsQ0FBaUJoQyxRQUFNMkMsSUFBSUosT0FBSixDQUF2QixDQUFOO0FBREQ7QUFFQTs7QUFFRCxVQUFNWixRQUFNRCxRQUFOLElBQWtCMUIsS0FBSytCLE1BQTdCO0FBQ0NKLFlBQU0sS0FBS0ssV0FBTCxDQUFpQmhDLE9BQUtBLEtBQUswQyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQUMsQ0FBZCxDQUF0QixDQUFOO0FBREQsSUFHQSxPQUFPLEVBQUMxQyxVQUFELEVBQU0yQixZQUFOLEVBQVA7QUFDQTs7OzJCQUVXYSxHLEVBQUk7QUFDVCxRQUFLeEIsUUFBTCxJQUFld0IsR0FBZjtBQUNIOzs7OztrQkE3R2dCekMsVyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xyXG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xyXG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEpLmpvaW4oXCIgXCIpXHJcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXHJcbiAgICAgICAgdGhpcy5oZWlnaHQ9TWF0aC5jZWlsKGhlaWdodClcclxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcclxuXHJcblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XHJcblx0XHRcdHdoaXRlU3BhY2U6J3ByZScsXHJcblx0XHRcdGZvbnRTaXplOmAke3RoaXMuc2l6ZX1wdGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuXHRcdFx0ZGVzY2VudDogdGhpcy5kZXNjZW50LFxyXG5cdFx0XHRmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHN0eWxlLmNvbG9yKVxyXG5cdFx0XHR0aGlzLmRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcbiAgICB9XHJcblxyXG5cdGxpbmVIZWlnaHQoKXtcclxuXHRcdHJldHVybiB7aGVpZ2h0OjI1LGRlc2NlbnQ6Mn1cclxuXHR9XHJcblxyXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XHJcblx0XHRyZXR1cm4gMjAwXHJcblx0fVxyXG5cclxuICAgIG5leHQoe3dpZHRoOm1heFdpZHRofSl7XHJcbiAgICAgICAgbGV0IGluZm89bnVsbFxyXG5cdFx0aWYobWF4V2lkdGg9PXVuZGVmaW5lZClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gbWF4IHdpZHRoIHNwZWNpZmllZCB3aGVuIGNvbXBvc2luZyB0ZXh0XCIpXHJcblxyXG5cdFx0aWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHJcblx0XHQvL2xldCB7dGV4dCwgd2lkdGh9PXRoaXMubWVhc3VyZSh0aGlzLnRleHQsdGhpcy5jb21wb3NlZCxtYXhXaWR0aClcclxuXHRcdGxldCB0ZXh0LHdpZHRoXHJcblx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcclxuXHRcdGlmKHdpZHRoPD1tYXhXaWR0aCl7XHJcblx0XHRcdGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0XHRcdGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXHJcblx0XHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9c21hcnRUeXBlVGV4dClcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHdpZHRoPG1heFdpZHRoKXtcclxuXHRcdFx0XHRcdGxldCBpbmRleD10aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoLCBsZW49dGhpcy50ZXh0Lmxlbmd0aFxyXG5cdFx0XHRcdFx0d2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxyXG5cdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZih3aWR0aD5tYXhXaWR0aCl7XHJcblx0XHRcdFx0XHR3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpe1xyXG5cdFx0XHRcdGluZm89e3dpZHRoOndpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcblx0XHRcdH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGxcclxuXHRcdFx0XHRpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGluZm8ud2lkdGg9TWF0aC5jZWlsKGluZm8ud2lkdGgpXHJcbiAgICAgICAgcmV0dXJuIHsuLi50aGlzLmRlZmF1bHRTdHlsZSwuLi5pbmZvfVxyXG4gICAgfVxyXG5cclxuXHRtZWFzdXJlKHN0ciwgc3RhcnQsIG1heFdpZHRoKXtcclxuXHRcdGxldCB0ZXh0PXN0ci5zdWJzdHIoc3RhcnQpXHJcblx0XHRsZXQgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0KVxyXG5cdFx0aWYod2lkdGg8PW1heFdpZHRoKVxyXG5cdFx0XHRyZXR1cm4ge3RleHQsd2lkdGh9XHJcblx0XHRyZXR1cm4gdGhpcy5fbWVhc3VyZUJ5UmF0aW8oc3RyLCBzdGFydCwgbWF4V2lkdGgsIHdpZHRoKVxyXG5cdH1cclxuXHJcblx0X21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aCl7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0aWYod2lkdGg9PXVuZGVmaW5lZClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aChzdHIpXHJcblxyXG5cdFx0bGV0IHRleHQ9c3RyLnN1YnN0cigwLE1hdGguZmxvb3Ioc3RyLmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXHJcblx0XHRpZih0ZXh0Lmxlbmd0aD4wKVxyXG5cdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQpXHJcblxyXG5cclxuXHRcdGlmKHdpZHRoPG1heFdpZHRoKXtcclxuXHRcdFx0bGV0IGluZGV4PXN0YXJ0K3RleHQubGVuZ3RoLCBsZW49c3RyLmxlbmd0aFxyXG5cdFx0XHR3aGlsZSh3aWR0aDxtYXhXaWR0aCAmJiBpbmRleDxsZW4pXHJcblx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0Kz1zdHJbaW5kZXgrK10pXHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXHJcblx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxyXG5cclxuXHRcdHJldHVybiB7dGV4dCx3aWR0aH1cclxuXHR9XHJcblxyXG4gICAgcm9sbGJhY2sobGVuKXtcclxuICAgICAgICB0aGlzLmNvbXBvc2VkLT1sZW5cclxuICAgIH1cclxufVxyXG4iXX0=