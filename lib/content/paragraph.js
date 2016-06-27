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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Paragraph);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Paragraph)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Paragraph, [{
		key: "compose",
		value: function compose() {
			_get(Object.getPrototypeOf(Paragraph.prototype), "compose", this).call(this);
			var composed = this.composed;
			var parent = this.context.parent;

			var _parent$nextAvailable = parent.nextAvailableSpace();

			var width = _parent$nextAvailable.width;
			var height = _parent$nextAvailable.height;

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
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.composed;

			var currentLine = composed[composed.length - 1];
			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.maxSize.height > minRequiredH) {
					return this.maxSize;
				} else {
					return this.maxSize = this.context.parent.nextAvailableSpace(required);
				}
			}
			return { width: availableWidth, height: this.maxSize.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(text) {
			var composed = this.composed;
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
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					this.maxSize.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.maxSize.height >= contentHeight) {
					composed.push(this._newLine());
					if (contentWidth <= this.maxSize.width) this.appendComposed(text);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "finished",
		value: function finished() {
			//need append last non-full-width line to parent
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU07OztjQURjOzs0QkFHUjtBQUNYLDhCQUptQixpREFJbkIsQ0FEVztPQUVFLFdBQVUsS0FBVixTQUZGO09BR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOzsrQkFJZ0IsT0FBTyxrQkFBUCxHQUpoQjs7T0FJRSxvQ0FKRjtPQUlRLHNDQUpSOztBQUtYLFFBQUssT0FBTCxHQUFhLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBYixDQUxXO0FBTUwsWUFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFOSzs7Ozs2QkFTRjtBQUNULFVBQU87QUFDRyxXQUFPLEtBQUssT0FBTCxDQUFhLEtBQWI7QUFDaEIsWUFBTyxDQUFQO0FBQ1MsY0FBUyxFQUFUO0lBSFYsQ0FEUzs7Ozt1Q0FRd0I7T0FBWixpRUFBUyxrQkFBRzt5QkFDd0IsU0FBNUMsTUFEb0I7T0FDZCwrQ0FBYSxvQkFEQzswQkFDd0IsU0FBdkIsT0FERDtPQUNRLGdEQUFhLHFCQURyQjtPQUVwQixXQUFVLEtBQVYsU0FGb0I7O0FBRzNCLE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUh1QjtPQUl0QixRQUFPLFlBQVAsTUFKc0I7O0FBSzNCLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixLQUF6RCxDQUFmLENBTHVCO0FBTTNCLE9BQUcsa0JBQWdCLFlBQWhCLEVBQTZCO0FBQ3JDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFvQixZQUFwQixFQUFpQztBQUNuQyxZQUFPLEtBQUssT0FBTCxDQUQ0QjtLQUFwQyxNQUVLO0FBQ0osWUFBTyxLQUFLLE9BQUwsR0FBYSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFiLENBREg7S0FGTDtJQURLO0FBT0EsVUFBTyxFQUFDLE9BQU0sY0FBTixFQUFzQixRQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBckMsQ0FiMkI7Ozs7aUNBZ0JoQixNQUFLO09BQ1QsV0FBVSxLQUFWLFNBRFM7T0FFVCxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRlM7OztBQUl0QixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FKa0I7QUFLaEIsT0FBSSxpQkFBZSxZQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBNEIsVUFBQyxJQUFELEVBQU0sQ0FBTjtXQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtJQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxZO3FCQU0rQixLQUFLLEtBQUwsQ0FOL0I7T0FNTCwyQkFBTixNQU5XO09BTWdCLDRCQUFQLE9BTlQ7OztBQVN0QixPQUFJLFFBQU0sSUFBTixDQVRrQjtBQVVoQixPQUFHLGtCQUFnQixZQUFoQixFQUE2Qjs7QUFDNUIsWUFBTzs7T0FBTyxHQUFHLFlBQVksS0FBWixHQUFrQixjQUFsQixFQUFrQyxPQUFPLFlBQVAsRUFBcUIsUUFBUSxhQUFSLEVBQWpFO0tBQXlGLElBQXpGO0tBQVAsQ0FENEI7QUFFNUIsZ0JBQVksUUFBWixDQUFxQixJQUFyQixDQUEwQixLQUExQixFQUY0QjtBQUdyQyxnQkFBWSxNQUFaLEdBQW1CLEtBQUssR0FBTCxDQUFTLFlBQVksTUFBWixFQUFtQixhQUE1QixDQUFuQixDQUhxQztBQUlyQyxRQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUMvQixZQUFPLGNBQVAsQ0FBc0IsOENBQVUsV0FBVixDQUF0QixFQUQrQjtBQUUvQixVQUFLLE9BQUwsQ0FBYSxNQUFiLElBQXFCLFlBQVksTUFBWixDQUZVO0tBQWhDO0lBSkssTUFRQSxJQUFHLGlCQUFlLFlBQWYsRUFBNEI7QUFDcEMsUUFBRyxLQUFLLE9BQUwsQ0FBYSxNQUFiLElBQXFCLGFBQXJCLEVBQW1DO0FBQ3JDLGNBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRHFDO0FBRXJDLFNBQUcsZ0JBQWMsS0FBSyxPQUFMLENBQWEsS0FBYixFQUNoQixLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFERCxLQUVJOztNQUZKO0tBRkQsTUFPSyxFQVBMO0lBREs7Ozs7NkJBY0c7O09BQ0YsV0FBVSxLQUFWLFNBREU7T0FFSSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRko7OztBQUlULE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUpLO0FBS0gsT0FBSSxpQkFBZSxZQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBNEIsVUFBQyxJQUFELEVBQU0sQ0FBTjtXQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtJQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxEO0FBTVQsT0FBRyxpQkFBZSxDQUFmLEVBQWlCO0FBQ25CLFdBQU8sY0FBUCxDQUFzQiw4Q0FBVSxXQUFWLENBQXRCLEVBRG1CO0lBQXBCO0FBR0Esa0NBN0VtQixrREE2RW5CLEVBQW9CO0FBQ25CLFNBQUssT0FBTCxHQUFhLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLEVBQXZCLENBRG1CO0FBRW5CLFdBQU8sSUFBUCxDQUZtQjtJQUFwQjs7QUFLQSxVQUFPLEtBQVAsQ0FkUzs7OztRQXBFVSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZS9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgQW55e1xuXHRzdGF0ZT17fVxuXG4gICAgY29tcG9zZSgpe1xuXHRcdHN1cGVyLmNvbXBvc2UoKVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHR9PXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdHRoaXMubWF4U2l6ZT17d2lkdGgsaGVpZ2h0fVxuICAgICAgICBjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcbiAgICB9XG5cblx0X25ld0xpbmUoKXtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMubWF4U2l6ZS53aWR0aCxcblx0XHRcdGhlaWdodDowLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5tYXhTaXplLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZCh0ZXh0KXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09dGV4dC5wcm9wc1xuXG5cblx0XHRsZXQgcGllY2U9bnVsbFxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPSg8R3JvdXAgeD17Y3VycmVudExpbmUud2lkdGgtYXZhaWxhYmxlV2lkdGh9IHdpZHRoPXtjb250ZW50V2lkdGh9IGhlaWdodD17Y29udGVudEhlaWdodH0+e3RleHR9PC9Hcm91cD4pXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0XHRcdHRoaXMubWF4U2l6ZS5oZWlnaHQtPWN1cnJlbnRMaW5lLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLm1heFNpemUuaGVpZ2h0Pj1jb250ZW50SGVpZ2h0KXtcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9dGhpcy5tYXhTaXplLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQodGV4dClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXG5cdGZpbmlzaGVkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+MCl7XG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdH1cblx0XHRpZihzdXBlci5maW5pc2hlZCgpKXtcblx0XHRcdHRoaXMubWF4U2l6ZT17d2lkdGg6MCwgaGVpZ2h0OjB9XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIl19