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
		this.fontFamily = typeof rFonts == "string" ? rFonts : Object.keys(rFonts).map(function (a) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdGV4dENvbXBvc2VyVGltZSIsIldvcmRXcmFwcGVyIiwidGV4dCIsInN0eWxlIiwickZvbnRzIiwiZm9udFNpemUiLCJzeiIsImZvbnRGYW1pbHkiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiYSIsImZpbHRlciIsImpvaW4iLCJzaXplIiwibGluZUhlaWdodCIsImhlaWdodCIsImRlc2NlbnQiLCJNYXRoIiwiY2VpbCIsImNvbXBvc2VkIiwiZGVmYXVsdFN0eWxlIiwid2hpdGVTcGFjZSIsImZvbnRXZWlnaHQiLCJiIiwiZm9udFN0eWxlIiwiaSIsImNvbG9yIiwiZmlsbCIsInN0cmluZyIsIm1heFdpZHRoIiwid2lkdGgiLCJpbmZvIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJsZW5ndGgiLCJzdHJpbmdXaWR0aCIsInN1YnN0ciIsImNvbnRlbnRXaWR0aCIsImVuZCIsImNoaWxkcmVuIiwic21hcnRUeXBlVGV4dCIsImZsb29yIiwiaW5kZXgiLCJsZW4iLCJjaGFyQXQiLCJzbGljZSIsInN0ciIsInN0YXJ0IiwiX21lYXN1cmVCeVJhdGlvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxvQkFBa0IsQ0FBdEI7O0lBQ3FCQyxXO0FBQ2pCLHNCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF3QjtBQUFBOztBQUFBLE1BQ25CQyxNQURtQixHQUNFRCxLQURGLENBQ25CQyxNQURtQjtBQUFBLE1BQ1JDLFFBRFEsR0FDRUYsS0FERixDQUNYRyxFQURXOztBQUUxQixPQUFLSCxLQUFMLEdBQVdBLEtBQVg7QUFDTSxPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLSyxVQUFMLEdBQWdCLE9BQU9ILE1BQVAsSUFBZ0IsUUFBaEIsR0FBMkJBLE1BQTNCLEdBQW9DSSxPQUFPQyxJQUFQLENBQVlMLE1BQVosRUFBb0JNLEdBQXBCLENBQXdCO0FBQUEsZ0JBQU0sT0FBT04s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RCxPQUFJN0MsT0FBSzZDLElBQUlWLE1BQUosQ0FBVyxDQUFYLEVBQWFuQixLQUFLd0IsS0FBTCxDQUFXSyxJQUFJWixNQUFKLEdBQVdMLFFBQVgsR0FBb0JDLEtBQS9CLENBQWIsQ0FBVDtBQUNBLE9BQUc3QixLQUFLaUMsTUFBTCxHQUFZLENBQWYsRUFDQ0osUUFBTSxLQUFLSyxXQUFMLENBQWlCbEMsSUFBakIsQ0FBTjs7QUFHRCxPQUFHNkIsUUFBTUQsUUFBVCxFQUFrQjtBQUNqQixRQUFJYSxRQUFNSyxRQUFNOUMsS0FBS2lDLE1BQXJCO0FBQUEsUUFBNkJTLE1BQUlHLElBQUlaLE1BQXJDO0FBQ0EsV0FBTUosUUFBTUQsUUFBTixJQUFrQmEsUUFBTUMsR0FBOUI7QUFDQ2IsYUFBTSxLQUFLSyxXQUFMLENBQWlCbEMsUUFBTTZDLElBQUlKLE9BQUosQ0FBdkIsQ0FBTjtBQUREO0FBRUE7O0FBRUQsVUFBTVosUUFBTUQsUUFBTixJQUFrQjVCLEtBQUtpQyxNQUE3QjtBQUNDSixZQUFNLEtBQUtLLFdBQUwsQ0FBaUJsQyxPQUFLQSxLQUFLNEMsS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQWQsQ0FBdEIsQ0FBTjtBQURELElBR0EsT0FBTyxFQUFDNUMsVUFBRCxFQUFNNkIsWUFBTixFQUFQO0FBQ0E7OzsyQkFFV2EsRyxFQUFJO0FBQ1QsUUFBS3hCLFFBQUwsSUFBZXdCLEdBQWY7QUFDSDs7Ozs7O2tCQTdHZ0IzQyxXIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF90ZXh0Q29tcG9zZXJUaW1lPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XHJcblx0XHRjb25zdCB7ckZvbnRzLCBzejpmb250U2l6ZX09c3R5bGVcclxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcclxuICAgICAgICB0aGlzLnRleHQ9dGV4dFxyXG4gICAgICAgIHRoaXMuZm9udEZhbWlseT10eXBlb2YockZvbnRzKT09XCJzdHJpbmdcIiA/IHJGb250cyA6IE9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3R5cGVvZihyRm9udHNbYV0pPT0nc3RyaW5nJz8gckZvbnRzW2FdIDogJyd9YClcclxuICAgICAgICAgICAgLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxyXG5cdFx0dGhpcy5zaXplPWZvbnRTaXplXHJcblx0XHRjb25zdCB7aGVpZ2h0LCBkZXNjZW50fT10aGlzLmxpbmVIZWlnaHQoKVxyXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXHJcblx0XHR0aGlzLmRlc2NlbnQ9TWF0aC5jZWlsKGRlc2NlbnQpXHJcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXHJcblxyXG5cdFx0dGhpcy5kZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHt0aGlzLnNpemV9cHRgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IHRoaXMuZGVzY2VudCxcclxuXHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHlcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0dGhpcy5kZWZhdWx0U3R5bGUuZmlsbD1zdHlsZS5jb2xvclxyXG4gICAgfVxyXG5cclxuXHRsaW5lSGVpZ2h0KCl7XHJcblx0XHRyZXR1cm4ge2hlaWdodDoyNSxkZXNjZW50OjJ9XHJcblx0fVxyXG5cclxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xyXG5cdFx0cmV0dXJuIDIwMFxyXG5cdH1cclxuXHJcbiAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xyXG4gICAgICAgIGxldCBpbmZvPW51bGxcclxuXHRcdGlmKG1heFdpZHRoPT11bmRlZmluZWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxyXG5cclxuXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblxyXG5cdFx0Ly9sZXQge3RleHQsIHdpZHRofT10aGlzLm1lYXN1cmUodGhpcy50ZXh0LHRoaXMuY29tcG9zZWQsbWF4V2lkdGgpXHJcblx0XHRsZXQgdGV4dCx3aWR0aFxyXG5cdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZCkpXHJcblx0XHRpZih3aWR0aDw9bWF4V2lkdGgpe1xyXG5cdFx0XHRpbmZvPXt3aWR0aCwgY29udGVudFdpZHRoOndpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0ey8vaG93IGNhbiB3ZSBxdWlja2x5IG1lYXN1cmVcclxuXHRcdFx0XHRsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxyXG5cdFx0XHRcdGlmKHNtYXJ0VHlwZVRleHQubGVuZ3RoPjApe1xyXG5cdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXNtYXJ0VHlwZVRleHQpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZih3aWR0aDxtYXhXaWR0aCl7XHJcblx0XHRcdFx0XHRsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcclxuXHRcdFx0XHRcdHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcclxuXHRcdFx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0Kz10aGlzLnRleHQuY2hhckF0KGluZGV4KyspKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYod2lkdGg+bWF4V2lkdGgpe1xyXG5cdFx0XHRcdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXHJcblx0XHRcdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKHRleHQubGVuZ3RoKXtcclxuXHRcdFx0XHRpbmZvPXt3aWR0aDp3aWR0aCwgY29udGVudFdpZHRoOiB3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG5cdFx0XHR9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsXHJcblx0XHRcdFx0aW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDowLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpbmZvLndpZHRoPU1hdGguY2VpbChpbmZvLndpZHRoKVxyXG4gICAgICAgIHJldHVybiB7Li4udGhpcy5kZWZhdWx0U3R5bGUsLi4uaW5mb31cclxuICAgIH1cclxuXHJcblx0bWVhc3VyZShzdHIsIHN0YXJ0LCBtYXhXaWR0aCl7XHJcblx0XHRsZXQgdGV4dD1zdHIuc3Vic3RyKHN0YXJ0KVxyXG5cdFx0bGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dClcclxuXHRcdGlmKHdpZHRoPD1tYXhXaWR0aClcclxuXHRcdFx0cmV0dXJuIHt0ZXh0LHdpZHRofVxyXG5cdFx0cmV0dXJuIHRoaXMuX21lYXN1cmVCeVJhdGlvKHN0ciwgc3RhcnQsIG1heFdpZHRoLCB3aWR0aClcclxuXHR9XHJcblxyXG5cdF9tZWFzdXJlQnlSYXRpbyhzdHIsIHN0YXJ0LCBtYXhXaWR0aCwgd2lkdGgpey8vaG93IGNhbiB3ZSBxdWlja2x5IG1lYXN1cmVcclxuXHRcdGlmKHdpZHRoPT11bmRlZmluZWQpXHJcblx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgoc3RyKVxyXG5cclxuXHRcdGxldCB0ZXh0PXN0ci5zdWJzdHIoMCxNYXRoLmZsb29yKHN0ci5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxyXG5cdFx0aWYodGV4dC5sZW5ndGg+MClcclxuXHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0KVxyXG5cclxuXHJcblx0XHRpZih3aWR0aDxtYXhXaWR0aCl7XHJcblx0XHRcdGxldCBpbmRleD1zdGFydCt0ZXh0Lmxlbmd0aCwgbGVuPXN0ci5sZW5ndGhcclxuXHRcdFx0d2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxyXG5cdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9c3RyW2luZGV4KytdKVxyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxyXG5cdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcclxuXHJcblx0XHRyZXR1cm4ge3RleHQsd2lkdGh9XHJcblx0fVxyXG5cclxuICAgIHJvbGxiYWNrKGxlbil7XHJcbiAgICAgICAgdGhpcy5jb21wb3NlZC09bGVuXHJcbiAgICB9XHJcbn1cclxuIl19