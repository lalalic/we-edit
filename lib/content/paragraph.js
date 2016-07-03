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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Paragraph)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "paragraph", _temp), _possibleConstructorReturn(_this, _ret);
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
}(_any2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLGNBQVk7OztjQURROzs2QkFHVjtBQUNULFVBQU87QUFDRyxXQUFPLEtBQUssY0FBTCxDQUFvQixLQUFwQjtBQUNoQixTQUFJLEtBQUssR0FBTDtBQUNKLFlBQU8sQ0FBUDtBQUNTLGNBQVMsRUFBVDtJQUpWLENBRFM7Ozs7dUNBU3dCO09BQVosaUVBQVMsa0JBQUc7eUJBQ3dCLFNBQTVDLE1BRG9CO09BQ2QsK0NBQWEsb0JBREM7MEJBQ3dCLFNBQXZCLE9BREQ7T0FDUSxnREFBYSxxQkFEckI7T0FFcEIsV0FBVSxLQUFWLFNBRm9COztBQUdqQyxPQUFHLEtBQUcsU0FBUyxNQUFULEVBQWdCO2dDQUNGLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLEdBREU7O1FBQ2hCLHFDQURnQjtRQUNWLHNDQURVOztBQUVyQixTQUFLLGNBQUwsR0FBb0IsRUFBQyxhQUFELEVBQU8sY0FBUCxFQUFwQixDQUZxQjtBQUdyQixhQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQUhxQjtJQUF0QjtBQUtNLE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQVJ1Qjs7T0FVdEIsUUFBTyxZQUFQLE1BVnNCOztBQVczQixPQUFJLGlCQUFlLFlBQVksUUFBWixDQUFxQixNQUFyQixDQUE0QixVQUFDLElBQUQsRUFBTSxDQUFOO1dBQVUsT0FBSyxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQWYsRUFBNkIsS0FBekQsQ0FBZixDQVh1QjtBQVkzQixPQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUNyQyxRQUFHLEtBQUssY0FBTCxDQUFvQixNQUFwQixHQUEyQixZQUEzQixFQUF3QztBQUMxQyxZQUFPLEtBQUssY0FBTCxDQURtQztLQUEzQyxNQUVLO0FBQ0osWUFBTyxLQUFLLGNBQUwsR0FBb0IsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsQ0FBdUMsUUFBdkMsQ0FBcEIsQ0FESDtLQUZMO0lBREs7QUFPQSxVQUFPLEVBQUMsT0FBTSxjQUFOLEVBQXNCLFFBQU8sS0FBSyxjQUFMLENBQW9CLE1BQXBCLEVBQXJDLENBbkIyQjs7OztpQ0FzQmhCLFNBQVE7O09BQ1osV0FBVSxLQUFWLFNBRFk7T0FFWixTQUFRLEtBQUssT0FBTCxDQUFSLE9BRlk7OztBQUl6QixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FKcUI7QUFLbkIsT0FBSSxpQkFBZSxZQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBNEIsVUFBQyxJQUFELEVBQU0sQ0FBTjtXQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtJQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxlO3dCQU00QixRQUFRLEtBQVIsQ0FONUI7T0FNUiw4QkFBTixNQU5jO09BTWEsK0JBQVAsT0FOTjs7O0FBU3pCLE9BQUksUUFBTSxJQUFOLENBVHFCO0FBVXpCLE9BQUcsa0JBQWdCLENBQWhCLEVBQWtCO0FBQ3BCLGFBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRG9CO0FBRXBCLFNBQUssY0FBTCxDQUFvQixPQUFwQixFQUZvQjtJQUFyQixNQUdNLElBQUcsa0JBQWdCLFlBQWhCLEVBQTZCOztBQUM1QixZQUNQOzs7QUFDQyxTQUFHLFlBQVksS0FBWixHQUFrQixjQUFsQjtBQUNILGFBQU8sS0FBSyxRQUFMLENBQWMsTUFBZDtBQUNQLGFBQU8sWUFBUDtBQUNBLGNBQVEsYUFBUixFQUpEO0tBS0UsT0FMRjtLQURPLENBRDRCO0FBVTVCLGdCQUFZLFFBQVosQ0FBcUIsSUFBckIsQ0FBMEIsS0FBMUIsRUFWNEI7QUFXckMsZ0JBQVksTUFBWixHQUFtQixLQUFLLEdBQUwsQ0FBUyxZQUFZLE1BQVosRUFBbUIsYUFBNUIsQ0FBbkIsQ0FYcUM7QUFZckMsUUFBRyxrQkFBZ0IsWUFBaEIsRUFBNkI7QUFDL0IsWUFBTyxjQUFQLENBQXNCLDhDQUFVLFdBQVYsQ0FBdEIsRUFEK0I7QUFFL0IsVUFBSyxjQUFMLENBQW9CLE1BQXBCLElBQTRCLFlBQVksTUFBWixDQUZHO0tBQWhDO0lBWkssTUFnQkEsSUFBRyxpQkFBZSxZQUFmLEVBQTRCO0FBQ3BDLFFBQUcsS0FBSyxjQUFMLENBQW9CLE1BQXBCLElBQTRCLFlBQVksTUFBWixFQUFtQjtBQUNqRCxZQUFPLGNBQVAsQ0FBc0IsOENBQVUsV0FBVixDQUF0QixFQURpRDtBQUVqRCxjQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQUZpRDs7QUFJakQsU0FBRyxnQkFBYyxLQUFLLGNBQUwsQ0FBb0IsS0FBcEIsRUFDaEIsS0FBSyxjQUFMLENBQW9CLE9BQXBCLEVBREQsS0FFSTs7TUFGSjtLQUpELE1BU0ssRUFUTDtJQURLOzs7OzBDQWdCZ0I7O09BQ2YsV0FBVSxLQUFWLFNBRGU7T0FFZixTQUFRLEtBQUssT0FBTCxDQUFSLE9BRmU7OztBQUl0QixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FKa0I7QUFLdEIsT0FBSSxpQkFBZSxZQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBNEIsVUFBQyxJQUFELEVBQU0sQ0FBTjtXQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtJQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxrQjtBQU10QixPQUFHLGlCQUFlLENBQWYsRUFBaUI7QUFDbkIsV0FBTyxjQUFQLENBQXNCLDhDQUFVLFdBQVYsQ0FBdEIsRUFEbUI7SUFBcEIsTUFFTSxJQUFHLGtCQUFnQixDQUFoQixFQUFrQjs7SUFBckI7O0FBSU4sUUFBSyxjQUFMLEdBQW9CLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLEVBQTlCLENBWnNCOztBQWN0Qiw4QkE3Rm1CLCtEQTZGbkIsQ0Fkc0I7Ozs7UUEvRUgiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgQW55e1xuXHRkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cblx0X25ld0xpbmUoKXtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgsXG5cdFx0XHRfaWQ6dGhpcy5faWQsXG5cdFx0XHRoZWlnaHQ6MCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cblx0fVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+bWluUmVxdWlyZWRIKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2Vcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0fT1jb250ZW50LnByb3BzXG5cblxuXHRcdGxldCBwaWVjZT1udWxsXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7Ly9ub3QgYXBwZW5kZWQgdG8gcGFyZW50XG4gICAgICAgICAgICBwaWVjZT0oXG5cdFx0XHRcdFx0PEdyb3VwXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGluZGV4PXt0aGlzLmNoaWxkcmVuLmxlbmd0aH1cblx0XHRcdFx0XHRcdHdpZHRoPXtjb250ZW50V2lkdGh9XG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9PlxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdFx0XHQpXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LT1jdXJyZW50TGluZS5oZWlnaHRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+PWN1cnJlbnRMaW5lLmhlaWdodCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aClcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly9uZXZlciBiZSBoZXJlXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+MCl7XG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcblx0XHRcdC8vYWxyZWFkeSBhcHBlbmRlZCB0byBwYXJlbnQgaW4gYXBwZW5kQ29tcG9zZWRcblx0XHR9XG5cblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cblxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cbiJdfQ==