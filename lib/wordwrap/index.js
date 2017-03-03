'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _textComposerTime = 0;

var WordWrapper = function () {
	function WordWrapper(text, style) {
		_classCallCheck(this, WordWrapper);

		var rFonts = style.rFonts,
		    fontSize = style.sz;

		this.style = style;
		this.text = text;
		this.fontFamily = Object.keys(rFonts).map(function (a) {
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
			return _extends({}, this.defaultStyle, info);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiYSIsImZpbHRlciIsImpvaW4iLCJzaXplIiwibGluZUhlaWdodCIsImhlaWdodCIsImRlc2NlbnQiLCJNYXRoIiwiY2VpbCIsImNvbXBvc2VkIiwiZGVmYXVsdFN0eWxlIiwid2hpdGVTcGFjZSIsImZvbnRXZWlnaHQiLCJiIiwiZm9udFN0eWxlIiwiaSIsImNvbG9yIiwiZmlsbCIsInN0cmluZyIsIm1heFdpZHRoIiwid2lkdGgiLCJpbmZvIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJsZW5ndGgiLCJzdHJpbmdXaWR0aCIsInN1YnN0ciIsImNvbnRlbnRXaWR0aCIsImVuZCIsImNoaWxkcmVuIiwic21hcnRUeXBlVGV4dCIsImZsb29yIiwiaW5kZXgiLCJsZW4iLCJjaGFyQXQiLCJzbGljZSIsInN0ciIsInN0YXJ0IiwiX21lYXN1cmVCeVJhdGlvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxvQkFBa0IsQ0FBdEI7O0lBQ3FCQyxXO0FBQ2pCLHNCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF3QjtBQUFBOztBQUFBLE1BQ25CQyxNQURtQixHQUNFRCxLQURGLENBQ25CQyxNQURtQjtBQUFBLE1BQ1JDLFFBRFEsR0FDRUYsS0FERixDQUNYRyxFQURXOztBQUUxQixPQUFLSCxLQUFMLEdBQVdBLEtBQVg7QUFDTSxPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLSyxVQUFMLEdBQWdCQyxPQUFPQyxJQUFQLENBQVlMLE1BQVosRUFBb0JNLEdBQXBCLENBQXdCO0FBQUEsZ0JBQU0sT0FBT04sT0FBT08sQ0FBUCxDQUFQLElBQW1CLFFBQW5CLEdBQTZCUCxPQUFPTyxD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LEtBQUwsQ0FBV0ssSUFBSVosTUFBSixHQUFXTCxRQUFYLEdBQW9CQyxLQUEvQixDQUFiLENBQVQ7QUFDQSxPQUFHN0IsS0FBS2lDLE1BQUwsR0FBWSxDQUFmLEVBQ0NKLFFBQU0sS0FBS0ssV0FBTCxDQUFpQmxDLElBQWpCLENBQU47O0FBR0QsT0FBRzZCLFFBQU1ELFFBQVQsRUFBa0I7QUFDakIsUUFBSWEsUUFBTUssUUFBTTlDLEtBQUtpQyxNQUFyQjtBQUFBLFFBQTZCUyxNQUFJRyxJQUFJWixNQUFyQztBQUNBLFdBQU1KLFFBQU1ELFFBQU4sSUFBa0JhLFFBQU1DLEdBQTlCO0FBQ0NiLGFBQU0sS0FBS0ssV0FBTCxDQUFpQmxDLFFBQU02QyxJQUFJSixPQUFKLENBQXZCLENBQU47QUFERDtBQUVBOztBQUVELFVBQU1aLFFBQU1ELFFBQU4sSUFBa0I1QixLQUFLaUMsTUFBN0I7QUFDQ0osWUFBTSxLQUFLSyxXQUFMLENBQWlCbEMsT0FBS0EsS0FBSzRDLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFkLENBQXRCLENBQU47QUFERCxJQUdBLE9BQU8sRUFBQzVDLFVBQUQsRUFBTTZCLFlBQU4sRUFBUDtBQUNBOzs7MkJBRVdhLEcsRUFBSTtBQUNULFFBQUt4QixRQUFMLElBQWV3QixHQUFmO0FBQ0g7Ozs7OztrQkE3R2dCM0MsVyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xyXG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xyXG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7dHlwZW9mKHJGb250c1thXSk9PSdzdHJpbmcnPyByRm9udHNbYV0gOiAnJ31gKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEpLmpvaW4oXCIgXCIpXHJcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXHJcbiAgICAgICAgdGhpcy5oZWlnaHQ9TWF0aC5jZWlsKGhlaWdodClcclxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcclxuXHJcblx0XHR0aGlzLmRlZmF1bHRTdHlsZT17XHJcblx0XHRcdHdoaXRlU3BhY2U6J3ByZScsXHJcblx0XHRcdGZvbnRTaXplOmAke3RoaXMuc2l6ZX1wdGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuXHRcdFx0ZGVzY2VudDogdGhpcy5kZXNjZW50LFxyXG5cdFx0XHRmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHN0eWxlLmNvbG9yKVxyXG5cdFx0XHR0aGlzLmRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcbiAgICB9XHJcblxyXG5cdGxpbmVIZWlnaHQoKXtcclxuXHRcdHJldHVybiB7aGVpZ2h0OjI1LGRlc2NlbnQ6Mn1cclxuXHR9XHJcblxyXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XHJcblx0XHRyZXR1cm4gMjAwXHJcblx0fVxyXG5cclxuICAgIG5leHQoe3dpZHRoOm1heFdpZHRofSl7XHJcbiAgICAgICAgbGV0IGluZm89bnVsbFxyXG5cdFx0aWYobWF4V2lkdGg9PXVuZGVmaW5lZClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gbWF4IHdpZHRoIHNwZWNpZmllZCB3aGVuIGNvbXBvc2luZyB0ZXh0XCIpXHJcblxyXG5cdFx0aWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHJcblx0XHQvL2xldCB7dGV4dCwgd2lkdGh9PXRoaXMubWVhc3VyZSh0aGlzLnRleHQsdGhpcy5jb21wb3NlZCxtYXhXaWR0aClcclxuXHRcdGxldCB0ZXh0LHdpZHRoXHJcblx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcclxuXHRcdGlmKHdpZHRoPD1tYXhXaWR0aCl7XHJcblx0XHRcdGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0XHRcdGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXHJcblx0XHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9c21hcnRUeXBlVGV4dClcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHdpZHRoPG1heFdpZHRoKXtcclxuXHRcdFx0XHRcdGxldCBpbmRleD10aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoLCBsZW49dGhpcy50ZXh0Lmxlbmd0aFxyXG5cdFx0XHRcdFx0d2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxyXG5cdFx0XHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZih3aWR0aD5tYXhXaWR0aCl7XHJcblx0XHRcdFx0XHR3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpe1xyXG5cdFx0XHRcdGluZm89e3dpZHRoOndpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcblx0XHRcdH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGxcclxuXHRcdFx0XHRpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGluZm8ud2lkdGg9TWF0aC5jZWlsKGluZm8ud2lkdGgpXHJcbiAgICAgICAgcmV0dXJuIHsuLi50aGlzLmRlZmF1bHRTdHlsZSwuLi5pbmZvfVxyXG4gICAgfVxyXG5cclxuXHRtZWFzdXJlKHN0ciwgc3RhcnQsIG1heFdpZHRoKXtcclxuXHRcdGxldCB0ZXh0PXN0ci5zdWJzdHIoc3RhcnQpXHJcblx0XHRsZXQgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0KVxyXG5cdFx0aWYod2lkdGg8PW1heFdpZHRoKVxyXG5cdFx0XHRyZXR1cm4ge3RleHQsd2lkdGh9XHJcblx0XHRyZXR1cm4gdGhpcy5fbWVhc3VyZUJ5UmF0aW8oc3RyLCBzdGFydCwgbWF4V2lkdGgsIHdpZHRoKVxyXG5cdH1cclxuXHJcblx0X21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aCl7Ly9ob3cgY2FuIHdlIHF1aWNrbHkgbWVhc3VyZVxyXG5cdFx0aWYod2lkdGg9PXVuZGVmaW5lZClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aChzdHIpXHJcblxyXG5cdFx0bGV0IHRleHQ9c3RyLnN1YnN0cigwLE1hdGguZmxvb3Ioc3RyLmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXHJcblx0XHRpZih0ZXh0Lmxlbmd0aD4wKVxyXG5cdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQpXHJcblxyXG5cclxuXHRcdGlmKHdpZHRoPG1heFdpZHRoKXtcclxuXHRcdFx0bGV0IGluZGV4PXN0YXJ0K3RleHQubGVuZ3RoLCBsZW49c3RyLmxlbmd0aFxyXG5cdFx0XHR3aGlsZSh3aWR0aDxtYXhXaWR0aCAmJiBpbmRleDxsZW4pXHJcblx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0Kz1zdHJbaW5kZXgrK10pXHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXHJcblx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxyXG5cclxuXHRcdHJldHVybiB7dGV4dCx3aWR0aH1cclxuXHR9XHJcblxyXG4gICAgcm9sbGJhY2sobGVuKXtcclxuICAgICAgICB0aGlzLmNvbXBvc2VkLT1sZW5cclxuICAgIH1cclxufVxyXG4iXX0=