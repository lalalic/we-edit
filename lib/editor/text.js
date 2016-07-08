"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Text);

var _class = function (_Super) {
	_inherits(_class, _Super);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _this2 = this;

			var width = props.width;
			var height = props.height;
			var end = props.end;
			var children = props.children;
			var loc = this.state.loc;

			var cursor = null;
			if (typeof loc != 'undefined') {
				if (end - children.length < loc && loc < end) {
					var style = this.getFontStyle();
					var locText = children.substring(end - children.length, loc);
					var composer = new this.constructor.WordWrapper(locText, style);

					var _composer$next = composer.next({ width: Number.MAX_SAFE_INTEGER });

					var _width = _composer$next.width;
					var _height = _composer$next.height;

					cursor = _react2.default.createElement(
						Cursor,
						null,
						_react2.default.createElement(
							_group2.default,
							{ x: _width, y: _height },
							_react2.default.createElement("line", {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: -_height,
								strokeWidth: 1,
								stroke: style.color || "black"
							})
						)
					);
				}
			}
			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				cursor,
				_react2.default.createElement("text", _extends({}, props, { onClick: function onClick(e) {
						return _this2.onClick(e, props);
					} }))
			);
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _event$nativeEvent = event.nativeEvent;
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
			var target = event.target;

			var style = this.getFontStyle();
			var composer = new this.constructor.WordWrapper(this.state.content, style);
			var loc = composer.next({ width: offsetX }) || { end: 0 };
			var index = text.end - text.children.length + loc.end;
			var cursor = this.context.cursor();

			cursor.setState({ target: this, loc: index });
		}
	}, {
		key: "getAbsoluteXY",
		value: function getAbsoluteXY(node) {
			var x = 0,
			    y = 0;
			var viewportElement = node.viewportElement;
			while (node && node != viewportElement) {
				if (node.nodeName == 'g') {
					x += parseFloat(node.getAttribute("x") || "0");
					y += parseFloat(node.getAttribute("y") || "0");
				}
				node = node.parentNode;
			}
			return { x: x, y: y };
		}
	}, {
		key: "insert",
		value: function insert(loc, str) {
			var _this3 = this;

			var content = this.state.content;

			this.setState({ content: content.splice(loc, 0, str), loc: loc }, function (e) {
				return _this3.reCompose();
			});
		}
	}, {
		key: "blur",
		value: function blur() {
			this.setState({ loc: undefined });
		}
	}]);

	return _class;
}(Super);

_class.contextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sc0NBQU47Ozs7Ozs7Ozs7Ozs7c0NBRW9CLE9BQU07OztPQUNyQixRQUE4QixNQUE5QixNQURxQjtPQUNkLFNBQXVCLE1BQXZCLE9BRGM7T0FDTixNQUFlLE1BQWYsSUFETTtPQUNELFdBQVUsTUFBVixTQURDO09BRXJCLE1BQUssS0FBSyxLQUFMLENBQUwsSUFGcUI7O0FBRzVCLE9BQUksU0FBTyxJQUFQLENBSHdCO0FBSTVCLE9BQUcsT0FBTyxHQUFQLElBQWEsV0FBYixFQUF5QjtBQUMzQixRQUFHLE1BQUksU0FBUyxNQUFULEdBQWdCLEdBQXBCLElBQTJCLE1BQUksR0FBSixFQUFRO0FBQ3JDLFNBQUksUUFBTSxLQUFLLFlBQUwsRUFBTixDQURpQztBQUVyQyxTQUFJLFVBQVEsU0FBUyxTQUFULENBQW1CLE1BQUksU0FBUyxNQUFULEVBQWlCLEdBQXhDLENBQVIsQ0FGaUM7QUFHckMsU0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FIaUM7OzBCQUlsQixTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTyxnQkFBUCxFQUFyQixFQUprQjs7U0FJaEMsOEJBSmdDO1NBSTFCLGdDQUowQjs7QUFLckMsY0FBUTtBQUFDLFlBQUQ7O01BQVE7O1NBQU8sR0FBRyxNQUFILEVBQVUsR0FBRyxPQUFILEVBQWpCO09BQTRCO0FBQzNDLFlBQUksQ0FBSjtBQUNBLFlBQUksQ0FBSjtBQUNBLFlBQUksQ0FBSjtBQUNBLFlBQUksQ0FBQyxPQUFEO0FBQ0oscUJBQWEsQ0FBYjtBQUNBLGdCQUFRLE1BQU0sS0FBTixJQUFhLE9BQWI7UUFObUMsQ0FBNUI7T0FBUjtNQUFSLENBTHFDO0tBQXRDO0lBREQ7QUFnQkEsVUFDQzs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFDRSxNQURGO0lBRUMsbURBQVUsU0FBTyxTQUFTO2FBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLEtBQWY7TUFBSCxHQUExQixDQUZEO0lBREQsQ0FwQjRCOzs7OzBCQTRCbEIsT0FBTyxNQUFLOzRCQUN5QixNQUF4QyxZQURlO09BQ0YscUNBREU7T0FDTyxxQ0FEUDtPQUNpQixTQUFRLE1BQVIsT0FEakI7O0FBRWhCLE9BQUksUUFBTSxLQUFLLFlBQUwsRUFBTixDQUZZO0FBR2hCLE9BQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CLEtBQXJELENBQVQsQ0FIWTtBQUloQixPQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUpRO0FBS2hCLE9BQUksUUFBTSxLQUFLLEdBQUwsR0FBUyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLElBQUksR0FBSixDQUx4QjtBQU10QixPQUFJLFNBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixFQUFQLENBTmtCOztBQVFoQixVQUFPLFFBQVAsQ0FBZ0IsRUFBQyxRQUFPLElBQVAsRUFBYSxLQUFLLEtBQUwsRUFBOUIsRUFSZ0I7Ozs7Z0NBV1QsTUFBSztBQUNsQixPQUFJLElBQUUsQ0FBRjtPQUFLLElBQUUsQ0FBRixDQURTO0FBRWxCLE9BQUksa0JBQWdCLEtBQUssZUFBTCxDQUZGO0FBR2xCLFVBQU0sUUFBUSxRQUFNLGVBQU4sRUFBc0I7QUFDbkMsUUFBRyxLQUFLLFFBQUwsSUFBZSxHQUFmLEVBQW1CO0FBQ3JCLFVBQUcsV0FBVyxLQUFLLFlBQUwsQ0FBa0IsR0FBbEIsS0FBd0IsR0FBeEIsQ0FBZCxDQURxQjtBQUVyQixVQUFHLFdBQVcsS0FBSyxZQUFMLENBQWtCLEdBQWxCLEtBQXdCLEdBQXhCLENBQWQsQ0FGcUI7S0FBdEI7QUFJQSxXQUFLLEtBQUssVUFBTCxDQUw4QjtJQUFwQztBQU9BLFVBQU8sRUFBQyxJQUFELEVBQUcsSUFBSCxFQUFQLENBVmtCOzs7O3lCQWFaLEtBQUssS0FBSTs7O09BQ1IsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQURROztBQUVmLFFBQUssUUFBTCxDQUFjLEVBQUMsU0FBUSxRQUFRLE1BQVIsQ0FBZSxHQUFmLEVBQW1CLENBQW5CLEVBQXFCLEdBQXJCLENBQVIsRUFBbUMsUUFBcEMsRUFBZCxFQUF1RDtXQUFHLE9BQUssU0FBTDtJQUFILENBQXZELENBRmU7Ozs7eUJBS1Y7QUFDTCxRQUFLLFFBQUwsQ0FBYyxFQUFDLEtBQUksU0FBSixFQUFmLEVBREs7Ozs7O0VBMURzQjs7T0E4RHJCLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsU0FBUSxpQkFBVSxJQUFWO0NBRFcsRUFFbEIsTUFBTSxZQUFOIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmxldCBTdXBlcj1lZGl0YWJsZShUZXh0KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcbiAgICBjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZW5kLCBjaGlsZHJlbn09cHJvcHNcblx0XHRjb25zdCB7bG9jfT10aGlzLnN0YXRlXG5cdFx0bGV0IGN1cnNvcj1udWxsXG5cdFx0aWYodHlwZW9mKGxvYykhPSd1bmRlZmluZWQnKXtcblx0XHRcdGlmKGVuZC1jaGlsZHJlbi5sZW5ndGg8bG9jICYmIGxvYzxlbmQpe1xuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5nZXRGb250U3R5bGUoKVxuXHRcdFx0XHRsZXQgbG9jVGV4dD1jaGlsZHJlbi5zdWJzdHJpbmcoZW5kLWNoaWxkcmVuLmxlbmd0aCwgbG9jKVxuXHRcdFx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIobG9jVGV4dCwgc3R5bGUpXG5cdFx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1jb21wb3Nlci5uZXh0KHt3aWR0aDpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUn0pXG5cdFx0XHRcdGN1cnNvcj0oPEN1cnNvcj48R3JvdXAgeD17d2lkdGh9IHk9e2hlaWdodH0+PGxpbmUgXG5cdFx0XHRcdFx0eDE9ezB9IFxuXHRcdFx0XHRcdHkxPXswfSBcblx0XHRcdFx0XHR4Mj17MH0gXG5cdFx0XHRcdFx0eTI9ey1oZWlnaHR9IFxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoPXsxfSBcblx0XHRcdFx0XHRzdHJva2U9e3N0eWxlLmNvbG9yfHxcImJsYWNrXCJ9XG5cdFx0XHRcdFx0Lz48L0dyb3VwPjwvQ3Vyc29yPilcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cblx0XHRcdFx0e2N1cnNvcn1cblx0XHRcdFx0PHRleHQgey4uLnByb3BzfSBvbkNsaWNrPXtlPT50aGlzLm9uQ2xpY2soZSxwcm9wcyl9Lz5cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuXHRcdGNvbnN0IHtuYXRpdmVFdmVudDp7b2Zmc2V0WCwgb2Zmc2V0WX0sIHRhcmdldH09ZXZlbnRcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRoaXMuc3RhdGUuY29udGVudCwgc3R5bGUpXG4gICAgICAgIGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XG4gICAgICAgIGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKClcblxuICAgICAgICBjdXJzb3Iuc2V0U3RhdGUoe3RhcmdldDp0aGlzLCBsb2M6IGluZGV4fSlcbiAgICB9XG5cdFxuXHRnZXRBYnNvbHV0ZVhZKG5vZGUpe1xuXHRcdGxldCB4PTAsIHk9MFxuXHRcdGxldCB2aWV3cG9ydEVsZW1lbnQ9bm9kZS52aWV3cG9ydEVsZW1lbnRcblx0XHR3aGlsZShub2RlICYmIG5vZGUhPXZpZXdwb3J0RWxlbWVudCl7XG5cdFx0XHRpZihub2RlLm5vZGVOYW1lPT0nZycpe1xuXHRcdFx0XHR4Kz1wYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKFwieFwiKXx8XCIwXCIpXG5cdFx0XHRcdHkrPXBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoXCJ5XCIpfHxcIjBcIilcblx0XHRcdH1cblx0XHRcdG5vZGU9bm9kZS5wYXJlbnROb2RlXG5cdFx0fVxuXHRcdHJldHVybiB7eCx5fVxuXHR9XG5cdFxuXHRpbnNlcnQobG9jLCBzdHIpe1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGVudDpjb250ZW50LnNwbGljZShsb2MsMCxzdHIpLCBsb2N9LGU9PnRoaXMucmVDb21wb3NlKCkpXG5cdH1cblx0XG5cdGJsdXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtsb2M6dW5kZWZpbmVkfSlcblx0fVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19