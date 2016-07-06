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

var Paragraph = function (_togglable) {
	_inherits(Paragraph, _togglable);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));

		_this.displayName = "paragraph";
		var content = _this.state.content;

		if (content.length == 0) {
			content.push(_react2.default.createElement(
				_inline2.default,
				{ contentStyle: _this.props.contentStyle },
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
}((0, _any.togglable)(_any2.default));

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUVwQixVQUZvQixTQUVwQixHQUFhO3dCQUZPLFdBRVA7O3FFQUZPLHVCQUdWLFlBREc7O1FBRGIsY0FBWSxZQUNDO01BRUwsVUFBUyxNQUFLLEtBQUwsQ0FBVCxRQUZLOztBQUdaLE1BQUcsUUFBUSxNQUFSLElBQWdCLENBQWhCLEVBQWtCO0FBQ3BCLFdBQVEsSUFBUixDQUFhOztNQUFRLGNBQWMsTUFBSyxLQUFMLENBQVcsWUFBWCxFQUF0QjtJQUErQzs7OztLQUEvQztJQUFiLEVBRG9CO0dBQXJCO2VBSFk7RUFBYjs7Y0FGb0I7OzZCQVVWO0FBQ1QsVUFBTztBQUNHLFdBQU8sS0FBSyxjQUFMLENBQW9CLEtBQXBCO0FBQ2hCLFNBQUksS0FBSyxHQUFMO0FBQ0osWUFBTyxDQUFQO0FBQ1MsY0FBUyxFQUFUO0lBSlYsQ0FEUzs7Ozt1Q0FTd0I7T0FBWixpRUFBUyxrQkFBRzt5QkFDd0IsU0FBNUMsTUFEb0I7T0FDZCwrQ0FBYSxvQkFEQzswQkFDd0IsU0FBdkIsT0FERDtPQUNRLGdEQUFhLHFCQURyQjtPQUVwQixXQUFVLEtBQVYsU0FGb0I7O0FBR2pDLE9BQUcsS0FBRyxTQUFTLE1BQVQsRUFBZ0I7Z0NBQ0YsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsR0FERTs7UUFDaEIscUNBRGdCO1FBQ1Ysc0NBRFU7O0FBRXJCLFNBQUssY0FBTCxHQUFvQixFQUFDLGFBQUQsRUFBTyxjQUFQLEVBQXBCLENBRnFCO0FBR3JCLGFBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBSHFCO0lBQXRCO0FBS00sT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBUnVCOztPQVV0QixRQUFP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O0FBTXRCLE9BQUcsaUJBQWUsQ0FBZixFQUFpQjtBQUNuQixXQUFPLGNBQVAsQ0FBc0IsOENBQVUsV0FBVixDQUF0QixFQURtQjtJQUFwQixNQUVNLElBQUcsa0JBQWdCLENBQWhCLEVBQWtCOztJQUFyQjs7QUFJTixRQUFLLGNBQUwsR0FBb0IsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBOUIsQ0Fac0I7O0FBY3RCLDhCQXBHbUIsK0RBb0duQixDQWRzQjs7OztRQXRGSDtFQUFrQjs7a0JBQWxCIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSwge3RvZ2dsYWJsZX0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxuXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgdG9nZ2xhYmxlKEFueSl7XG5cdGRpc3BsYXlOYW1lPVwicGFyYWdyYXBoXCJcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcblx0XHRpZihjb250ZW50Lmxlbmd0aD09MCl7XG5cdFx0XHRjb250ZW50LnB1c2goPElubGluZSBjb250ZW50U3R5bGU9e3RoaXMucHJvcHMuY29udGVudFN0eWxlfT48VGV4dD4gPC9UZXh0PjwvSW5saW5lPilcblx0XHR9XG5cdH1cblxuXHRfbmV3TGluZSgpe1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcblx0XHRcdF9pZDp0aGlzLl9pZCxcblx0XHRcdGhlaWdodDowLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aCwgaGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWNvbnRlbnQucHJvcHNcblxuXG5cdFx0bGV0IHBpZWNlPW51bGxcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXBcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofVxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH1cblx0XHRcdFx0XHRcdGhlaWdodD17Y29udGVudEhlaWdodH0+XG5cdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0XHRcdClcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2gocGllY2UpXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9TWF0aC5tYXgoY3VycmVudExpbmUuaGVpZ2h0LGNvbnRlbnRIZWlnaHQpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWN1cnJlbnRMaW5lLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD49Y3VycmVudExpbmUuaGVpZ2h0KXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cblx0XHRcdFx0aWYoY29udGVudFdpZHRoPD10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcblx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdH1cblxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxuXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuIl19