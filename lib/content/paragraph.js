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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _line = require("../composed/line");

var _line2 = _interopRequireDefault(_line);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.togglable)(_any2.default);

var Paragraph = function (_Super) {
	_inherits(Paragraph, _Super);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));

		_this.displayName = "paragraph";
		var content = _this.state.content;

		if (content.length == 0) {
			content.push(_react2.default.createElement(
				_inline2.default,
				{ contentStyle: _this.context.getDefaultStyle("inline") },
				_react2.default.createElement(
					_text2.default,
					null,
					" "
				)
			));
		}
		return _this;
	}

	_createClass(Paragraph, [{
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.availableSpace.width,
				_id: this._id,
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

			if (0 == composed.length) {
				var _context$parent$nextA = this.context.parent.nextAvailableSpace();

				var _width = _context$parent$nextA.width;
				var height = _context$parent$nextA.height;

				this.availableSpace = { width: _width, height: height };
				composed.push(this._newLine());
			}
			var currentLine = composed[composed.length - 1];

			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.availableSpace.height > minRequiredH) {
					return this.availableSpace;
				} else {
					return this.availableSpace = this.context.parent.nextAvailableSpace(required);
				}
			}
			return { width: availableWidth, height: this.availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(content) {
			//@TODO: need consider availableSpace
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _content$props = content.props;
			var contentWidth = _content$props.width;
			var contentHeight = _content$props.height;


			var piece = null;
			if (availableWidth == 0) {
				composed.push(this._newLine());
				this.appendComposed(content);
			} else if (availableWidth >= contentWidth) {
				//not appended to parent
				piece = _react2.default.createElement(
					_group2.default,
					{
						x: currentLine.width - availableWidth,
						index: this.children.length,
						width: contentWidth,
						height: contentHeight },
					content
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				if (availableWidth == contentWidth) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					this.availableSpace.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.availableSpace.height >= currentLine.height) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					composed.push(this._newLine());

					if (contentWidth <= this.availableSpace.width) this.appendComposed(content);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//need append last non-full-width line to parent
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
			} else if (availableWidth == 0) {
				//already appended to parent in appendComposed
			}

			this.availableSpace = { width: 0, height: 0 };

			_get(Object.getPrototypeOf(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return Paragraph;
}(Super);

Paragraph.contextTypes = Object.assign({
	getDefaultStyle: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sa0NBQU47O0lBQ2lCOzs7QUFFcEIsVUFGb0IsU0FFcEIsR0FBYTt3QkFGTyxXQUVQOztxRUFGTyx1QkFHVixZQURHOztRQURiLGNBQVksWUFDQztNQUVMLFVBQVMsTUFBSyxLQUFMLENBQVQsUUFGSzs7QUFHWixNQUFHLFFBQVEsTUFBUixJQUFnQixDQUFoQixFQUFrQjtBQUNwQixXQUFRLElBQVIsQ0FBYTs7TUFBUSxjQUFjLE1BQUssT0FBTCxDQUFhLGVBQWIsQ0FBNkIsUUFBN0IsQ0FBZCxFQUFSO0lBQThEOzs7O0tBQTlEO0lBQWIsRUFEb0I7R0FBckI7ZUFIWTtFQUFiOztjQUZvQjs7NkJBVVY7QUFDVCxVQUFPO0FBQ0csV0FBTyxLQUFLLGNBQUwsQ0FBb0IsS0FBcEI7QUFDaEIsU0FBSSxLQUFLLEdBQUw7QUFDSixZQUFPLENBQVA7QUFDUyxjQUFTLEVBQVQ7SUFKVixDQURTOzs7O3VDQVN3QjtPQUFaLGlFQUFTLGtCQUFHO3lCQUN3QixTQUE1QyxNQURvQjtPQUNkLCtDQUFhLG9CQURDOzBCQUN3QixTQUF2QixPQUREO09BQ1EsZ0RBQWEscUJBRHJCO09BRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHakMsT0FBRyxLQUFHLFNBQVMsTUFBVCxFQUFnQjtnQ0FDRixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixHQURFOztRQUNoQixxQ0FEZ0I7UUFDVixzQ0FEVTs7QUFFckIsU0FBSyxjQUFMLEdBQW9CLEVBQUMsYUFBRCxFQUFPLGNBQVAsRUFBcEIsQ0FGcUI7QUFHckIsYUFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFIcUI7SUFBdEI7QUFLTSxPQUFJLGNBQVksU0FBUyxTQUFTLE1B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LEtBQVI7SUFBZixFQUE2QixZQUFZLEtBQVosQ0FBeEUsQ0FMa0I7QUFNdEIsT0FBRyxpQkFBZSxDQUFmLEVBQWlCO0FBQ25CLFdBQU8sY0FBUCxDQUFzQiw4Q0FBVSxXQUFWLENBQXRCLEVBRG1CO0lBQXBCLE1BRU0sSUFBRyxrQkFBZ0IsQ0FBaEIsRUFBa0I7O0lBQXJCOztBQUlOLFFBQUssY0FBTCxHQUFvQixFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUE5QixDQVpzQjs7QUFjdEIsOEJBcEdtQiwrREFvR25CLENBZHNCOzs7O1FBdEZIO0VBQWtCOztBQUFsQixVQXVHYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGtCQUFpQixpQkFBVSxJQUFWO0NBREUsRUFFbEIsTUFBTSxZQUFOO2tCQXpHa0IiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55LCB7dG9nZ2xhYmxlfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXG5cbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxuXG5sZXQgU3VwZXI9dG9nZ2xhYmxlKEFueSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xuXHRkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG5cdFx0aWYoY29udGVudC5sZW5ndGg9PTApe1xuXHRcdFx0Y29udGVudC5wdXNoKDxJbmxpbmUgY29udGVudFN0eWxlPXt0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKFwiaW5saW5lXCIpfT48VGV4dD4gPC9UZXh0PjwvSW5saW5lPilcblx0XHR9XG5cdH1cblxuXHRfbmV3TGluZSgpe1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcblx0XHRcdF9pZDp0aGlzLl9pZCxcblx0XHRcdGhlaWdodDowLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aCwgaGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWNvbnRlbnQucHJvcHNcblxuXG5cdFx0bGV0IHBpZWNlPW51bGxcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXBcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofVxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH1cblx0XHRcdFx0XHRcdGhlaWdodD17Y29udGVudEhlaWdodH0+XG5cdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0XHRcdClcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2gocGllY2UpXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9TWF0aC5tYXgoY3VycmVudExpbmUuaGVpZ2h0LGNvbnRlbnRIZWlnaHQpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWN1cnJlbnRMaW5lLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD49Y3VycmVudExpbmUuaGVpZ2h0KXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cblx0XHRcdFx0aWYoY29udGVudFdpZHRoPD10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcblx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdH1cblxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxuXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19