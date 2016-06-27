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
					return this.maxSize = this.context.parent.nextAvailableSpace(required);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NEJBQ1I7T0FDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7T0FFRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkY7OytCQUdnQixPQUFPLGtCQUFQLEdBSGhCOztPQUdFLG9DQUhGO09BR1Esc0NBSFI7O0FBSVgsUUFBSyxPQUFMLEdBQWEsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFiLENBSlc7QUFLTCxZQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQUxLOzs7OzZCQVFGO0FBQ1QsVUFBTztBQUNHLFdBQU8sS0FBSyxPQUFMLENBQWEsS0FBYjtBQUNoQixZQUFPLENBQVA7QUFDUyxjQUFTLEVBQVQ7SUFIVixDQURTOzs7O3VDQVF3QjtPQUFaLGlFQUFTLGtCQUFHO3lCQUN3QixTQUE1QyxNQURvQjtPQUNkLCtDQUFhLG9CQURDOzBCQUN3QixTQUF2QixPQUREO09BQ1EsZ0RBQWEscUJBRHJCO09BRXBCLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGb0I7O0FBRzNCLE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUh1QjtPQUl0QixRQUFPLFlBQVAsTUFKc0I7O0FBSzNCLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixLQUF6RCxDQUFmLENBTHVCO0FBTTNCLE9BQUcsa0JBQWdCLFlBQWhCLEVBQTZCO0FBQ3JDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFvQixZQUFwQixFQUFpQztBQUNuQyxZQUFPLEtBQUssT0FBTCxDQUQ0QjtLQUFwQyxNQUVLO0FBQ0osWUFBTyxLQUFLLE9BQUwsR0FBYSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFiLENBREg7S0FGTDtJQURLO0FBT0EsVUFBTyxFQUFDLE9BQU0sY0FBTixFQUFzQixRQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBckMsQ0FiMkI7Ozs7eUJBZ0J4QixNQUFLO09BQ0QsV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURDO09BRUQsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZDOzs7QUFJZCxPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FKVTtBQUtSLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixZQUFZLEtBQVosQ0FBeEUsQ0FMSTtxQkFNdUMsS0FBSyxLQUFMLENBTnZDO09BTUcsMkJBQU4sTUFORztPQU13Qiw0QkFBUCxPQU5qQjs7O0FBU2QsT0FBSSxRQUFNLElBQU4sQ0FUVTtBQVVSLE9BQUcsa0JBQWdCLFlBQWhCLEVBQTZCOztBQUM1QixZQUFPOztPQUFPLEdBQUcsWUFBWSxLQUFaLEdBQWtCLGNBQWxCLEVBQWtDLE9BQU8sWUFBUCxFQUFxQixRQUFRLGFBQVIsRUFBakU7S0FBeUYsSUFBekY7S0FBUCxDQUQ0QjtBQUU1QixnQkFBWSxRQUFaLENBQXFCLElBQXJCLENBQTBCLEtBQTFCLEVBRjRCO0FBR3JDLGdCQUFZLE1BQVosR0FBbUIsS0FBSyxHQUFMLENBQVMsWUFBWSxNQUFaLEVBQW1CLGFBQTVCLENBQW5CLENBSHFDO0FBSXJDLFFBQUcsa0JBQWdCLFlBQWhCLEVBQTZCO0FBQy9CLFlBQU8sTUFBUCxDQUFjLDhDQUFVLFdBQVYsQ0FBZCxFQUQrQjtBQUUvQixVQUFLLE9BQUwsQ0FBYSxNQUFiLElBQXFCLFlBQVksTUFBWixDQUZVO0tBQWhDO0lBSkssTUFRQSxJQUFHLGlCQUFlLFlBQWYsRUFBNEI7QUFDcEMsUUFBRyxLQUFLLE9BQUwsQ0FBYSxNQUFiLElBQXFCLGFBQXJCLEVBQW1DO0FBQ3JDLGNBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRHFDO0FBRXJDLFNBQUcsZ0JBQWMsS0FBSyxPQUFMLENBQWEsS0FBYixFQUNoQixLQUFLLE1BQUwsQ0FBWSxJQUFaLEVBREQsS0FFSTs7TUFGSjtLQUZELE1BT0ssRUFQTDtJQURLOzs7OzZCQWNHOztPQUNGLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FERTtPQUVJLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGSjs7O0FBSVQsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSks7QUFLSCxPQUFJLGlCQUFlLFlBQVksUUFBWixDQUFxQixNQUFyQixDQUE0QixVQUFDLElBQUQsRUFBTSxDQUFOO1dBQVUsT0FBSyxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQWYsRUFBNkIsWUFBWSxLQUFaLENBQXhFLENBTEQ7QUFNVCxPQUFHLGlCQUFlLENBQWYsRUFBaUI7QUFDbkIsV0FBTyxNQUFQLENBQWMsOENBQVUsV0FBVixDQUFkLEVBRG1CO0lBQXBCO0FBR0Esa0NBMUVtQixrREEwRW5CLEVBQW9CO0FBQ25CLFNBQUssT0FBTCxHQUFhLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLEVBQXZCLENBRG1CO0FBRW5CLFdBQU8sSUFBUCxDQUZtQjtJQUFwQjs7QUFLQSxVQUFPLEtBQVAsQ0FkUzs7OztRQWpFVSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZS9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgQW55e1xuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7d2lkdGgsaGVpZ2h0fT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcblx0XHR0aGlzLm1heFNpemU9e3dpZHRoLGhlaWdodH1cbiAgICAgICAgY29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG4gICAgfVxuXHRcblx0X25ld0xpbmUoKXtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMubWF4U2l6ZS53aWR0aCxcblx0XHRcdGhlaWdodDowLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5tYXhTaXplLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmQodGV4dCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0fT10ZXh0LnByb3BzXG4gICAgICAgIFxuXHRcdFxuXHRcdGxldCBwaWVjZT1udWxsXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpey8vbm90IGFwcGVuZGVkIHRvIHBhcmVudFxuICAgICAgICAgICAgcGllY2U9KDxHcm91cCB4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH0gd2lkdGg9e2NvbnRlbnRXaWR0aH0gaGVpZ2h0PXtjb250ZW50SGVpZ2h0fT57dGV4dH08L0dyb3VwPilcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2gocGllY2UpXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9TWF0aC5tYXgoY3VycmVudExpbmUuaGVpZ2h0LGNvbnRlbnRIZWlnaHQpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0XHRcdHRoaXMubWF4U2l6ZS5oZWlnaHQtPWN1cnJlbnRMaW5lLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLm1heFNpemUuaGVpZ2h0Pj1jb250ZW50SGVpZ2h0KXtcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9dGhpcy5tYXhTaXplLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKHRleHQpXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly9uZXZlciBiZSBoZXJlXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXHRcblx0ZmluaXNoZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cdFx0XG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+MCl7XG5cdFx0XHRwYXJlbnQuYXBwZW5kKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHR9XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoKSl7XG5cdFx0XHR0aGlzLm1heFNpemU9e3dpZHRoOjAsIGhlaWdodDowfVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG4iXX0=