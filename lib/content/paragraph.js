"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

var _line = require("../compose/line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Any) {
	_inherits(Paragraph, _Any);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: "compose",
		value: function compose() {
			var composed = this.state.composed;
			var parent = this.context.parent;

			var _parent$next = parent.next();

			var width = _parent$next.width;
			var height = _parent$next.height;

			this.maxSize = { width: width, height: height };
			composed.push(this._newLine());
		}
	}, {
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.maxSize.width,
				height: 0,
				children: []
			};
		}
	}, {
		key: "next",
		value: function next() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.state.composed;

			var currentLine = composed[composed.length - 1];
			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.maxSize.height > minRequiredH) {
					return this.maxSize;
				} else {
					return this.maxSize = this.context.parent.next(required);
				}
			}
			return { width: availableWidth, height: this.maxSize.height };
		}
	}, {
		key: "append",
		value: function append(text) {
			var composed = this.state.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _text$props = text.props;
			var contentWidth = _text$props.width;
			var contentHeight = _text$props.height;


			var piece = null;
			if (availableWidth >= contentWidth) {
				//not appended to parent
				piece = _react2.default.createElement(
					_group2.default,
					{ x: currentLine.width - availableWidth, width: contentWidth, height: contentHeight },
					text
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				if (availableWidth == contentWidth) {
					parent.append(_react2.default.createElement(_line2.default, currentLine));
					this.maxSize.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.maxSize.height >= contentHeight) {
					composed.push(this._newLine());
					if (contentWidth <= this.maxSize.width) this.append(text);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "finished",
		value: function finished() {
			//need append last non-full-width line to parent
			var composed = this.state.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.append(_react2.default.createElement(_line2.default, currentLine));
			}
			if (_get(Object.getPrototypeOf(Paragraph.prototype), "finished", this).call(this)) {
				this.maxSize = { width: 0, height: 0 };
				return true;
			}

			return false;
		}
	}]);

	return Paragraph;
}(_any2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NEJBQ1I7T0FDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7T0FFRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkY7O3NCQUdnQixPQUFPLElBQVAsR0FIaEI7O09BR0UsMkJBSEY7T0FHUSw2QkFIUjs7QUFJWCxRQUFLLE9BQUwsR0FBYSxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWIsQ0FKVztBQUtMLFlBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBTEs7Ozs7NkJBUUY7QUFDVCxVQUFPO0FBQ0csV0FBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiO0FBQ2hCLFlBQU8sQ0FBUDtBQUNTLGNBQVMsRUFBVDtJQUhWLENBRFM7Ozs7eUJBUVU7T0FBWixpRUFBUyxrQkFBRzt5QkFDc0MsU0FBNUMsTUFETTtPQUNBLCtDQUFhLG9CQURiOzBCQUNzQyxTQUF2QixPQURmO09BQ3NCLGdEQUFhLHFCQURuQztPQUVOLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGTTs7QUFHYixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FIUztPQUlSLFFBQU8sWUFBUCxNQUpROztBQUtiLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixLQUF6RCxDQUFmLENBTFM7QUFNYixPQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUNyQyxRQUFHLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBb0IsWUFBcEIsRUFBaUM7QUFDbkMsWUFBTyxLQUFLLE9BQUwsQ0FENEI7S0FBcEMsTUFFSztBQUNKLFlBQU8sS0FBSyxPQUFMLEdBQWEsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixRQUF6QixDQUFiLENBREg7S0FGTDtJQURLO0FBT0EsVUFBTyxFQUFDLE9BQU0sY0FBTixFQUFzQixRQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBckMsQ0FiYTs7Ozt5QkFnQlYsTUFBSztPQUNELFdBQVUsS0FBSyxLQUFMLENBQVYsU0FEQztPQUVELFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGQzs7O0FBSWQsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSlU7QUFLUixPQUFJLGlCQUFlLFlBQVksUUFBWixDQUFxQixNQUFyQixDQUE0QixVQUFDLElBQUQsRUFBTSxDQUFOO1dBQVUsT0FBSyxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQWYsRUFBNkIsWUFBWSxLQUFaLENBQXhFLENBTEk7cUJBTXVDLEtBQUssS0FBTCxDQU52QztPQU1HLDJCQUFOLE1BTkc7T0FNd0IsNEJBQVAsT0FOakI7OztBQVNkLE9BQUksUUFBTSxJQUFOLENBVFU7QUFVUixPQUFHLGtCQUFnQixZQUFoQixFQUE2Qjs7QUFDNUIsWUFBTzs7T0FBTyxHQUFHLFlBQVksS0FBWixHQUFrQixjQUFsQixFQUFrQyxPQUFPLFlBQVAsRUFBcUIsUUFBUSxhQUFSLEVBQWpFO0tBQXlGLElBQXpGO0tBQVAsQ0FENEI7QUFFNUIsZ0JBQVksUUFBWixDQUFxQixJQUFyQixDQUEwQixLQUExQixFQUY0QjtBQUdyQyxnQkFBWSxNQUFaLEdBQW1CLEtBQUssR0FBTCxDQUFTLFlBQVksTUFBWixFQUFtQixhQUE1QixDQUFuQixDQUhxQztBQUlyQyxRQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUMvQixZQUFPLE1BQVAsQ0FBYyw4Q0FBVSxXQUFWLENBQWQsRUFEK0I7QUFFL0IsVUFBSyxPQUFMLENBQWEsTUFBYixJQUFxQixZQUFZLE1BQVosQ0FGVTtLQUFoQztJQUpLLE1BUUEsSUFBRyxpQkFBZSxZQUFmLEVBQTRCO0FBQ3BDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixJQUFxQixhQUFyQixFQUFtQztBQUNyQyxjQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQURxQztBQUVyQyxTQUFHLGdCQUFjLEtBQUssT0FBTCxDQUFhLEtBQWIsRUFDaEIsS0FBSyxNQUFMLENBQVksSUFBWixFQURELEtBRUk7O01BRko7S0FGRCxNQU9LLEVBUEw7SUFESzs7Ozs2QkFjRzs7T0FDRixXQUFVLEtBQUssS0FBTCxDQUFWLFNBREU7T0FFSSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRko7OztBQUlULE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUpLO0FBS0gsT0FBSSxpQkFBZSxZQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBNEIsVUFBQyxJQUFELEVBQU0sQ0FBTjtXQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtJQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxEO0FBTVQsT0FBRyxpQkFBZSxDQUFmLEVBQWlCO0FBQ25CLFdBQU8sTUFBUCxDQUFjLDhDQUFVLFdBQVYsQ0FBZCxFQURtQjtJQUFwQjtBQUdBLGtDQTFFbUIsa0RBMEVuQixFQUFvQjtBQUNuQixTQUFLLE9BQUwsR0FBYSxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUF2QixDQURtQjtBQUVuQixXQUFPLElBQVAsQ0FGbUI7SUFBcEI7O0FBS0EsVUFBTyxLQUFQLENBZFM7Ozs7UUFqRVUiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2UvbGluZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIEFueXtcbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgY29uc3Qge3dpZHRoLGhlaWdodH09cGFyZW50Lm5leHQoKVxuXHRcdHRoaXMubWF4U2l6ZT17d2lkdGgsaGVpZ2h0fVxuICAgICAgICBjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcbiAgICB9XG5cdFxuXHRfbmV3TGluZSgpe1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5tYXhTaXplLndpZHRoLFxuXHRcdFx0aGVpZ2h0OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblxuICAgIG5leHQocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHQocmVxdWlyZWQpXG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aDphdmFpbGFibGVXaWR0aCwgaGVpZ2h0OnRoaXMubWF4U2l6ZS5oZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kKHRleHQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cdFx0XG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09dGV4dC5wcm9wc1xuICAgICAgICBcblx0XHRcblx0XHRsZXQgcGllY2U9bnVsbFxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPSg8R3JvdXAgeD17Y3VycmVudExpbmUud2lkdGgtYXZhaWxhYmxlV2lkdGh9IHdpZHRoPXtjb250ZW50V2lkdGh9IGhlaWdodD17Y29udGVudEhlaWdodH0+e3RleHR9PC9Hcm91cD4pXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0XHR0aGlzLm1heFNpemUuaGVpZ2h0LT1jdXJyZW50TGluZS5oZWlnaHRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD49Y29udGVudEhlaWdodCl7XG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMubWF4U2l6ZS53aWR0aClcblx0XHRcdFx0XHR0aGlzLmFwcGVuZCh0ZXh0KVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdC8vbmV2ZXIgYmUgaGVyZVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblx0XG5cdGZpbmlzaGVkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXHRcdFxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0cGFyZW50LmFwcGVuZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0fVxuXHRcdGlmKHN1cGVyLmZpbmlzaGVkKCkpe1xuXHRcdFx0dGhpcy5tYXhTaXplPXt3aWR0aDowLCBoZWlnaHQ6MH1cblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIl19