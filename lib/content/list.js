"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _paragraph = require("./paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _text = require("./text");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = function (_Paragraph) {
	(0, _inherits3.default)(list, _Paragraph);

	function list() {
		(0, _classCallCheck3.default)(this, list);
		return (0, _possibleConstructorReturn3.default)(this, (list.__proto__ || (0, _getPrototypeOf2.default)(list)).apply(this, arguments));
	}

	(0, _createClass3.default)(list, [{
		key: "_newLine",
		value: function _newLine() {
			var line = (0, _get3.default)(list.prototype.__proto__ || (0, _getPrototypeOf2.default)(list.prototype), "_newLine", this).call(this);

			if (this.computed.composed.length == 0) {
				var _getStyle = this.getStyle(),
				    indent = _getStyle.indent;

				var _getLabel = this.getLabel(),
				    label = _getLabel.label,
				    style = _getLabel.style;

				var wordWrapper = new _text.WordWrapper(label, style);
				var height = wordWrapper.height,
				    descent = wordWrapper.descent;

				var text = wordWrapper.next({ width: indent.hanging });
				line.children.push(_react2.default.createElement(
					_group2.default,
					{
						x: 0,
						index: -1,
						descent: descent,
						width: indent.hanging,
						height: height },
					_react2.default.createElement(
						_group2.default,
						{ width: indent.hanging, height: height },
						_react2.default.createElement("text", text)
					)
				));

				line.width -= indent.hanging;
				line.height = height;
				line.descent = descent;
			}
			return line;
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			var directStyle = this.props.directStyle;

			var label = directStyle.get("label");

			var inheritedStyle = this.context.inheritedStyle;


			var style = 'rFonts,sz,color,b,i,vanish'.split(",").reduce(function (style, key) {
				var stylePath = "rPr." + key;
				var value = directStyle.get("label." + stylePath);
				if (value == undefined) value = inheritedStyle.get(stylePath);

				if (value != undefined) {
					style[key] = value;
				}
				return style;
			}, {});

			return { label: label, style: style };
		}
	}]);
	return list;
}(_paragraph2.default);

list.displayName = "list";
exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2xpc3QuanMiXSwibmFtZXMiOlsibGlzdCIsImxpbmUiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJnZXRMYWJlbCIsImxhYmVsIiwic3R5bGUiLCJ3b3JkV3JhcHBlciIsImhlaWdodCIsImRlc2NlbnQiLCJ0ZXh0IiwibmV4dCIsIndpZHRoIiwiaGFuZ2luZyIsImNoaWxkcmVuIiwicHVzaCIsImRpcmVjdFN0eWxlIiwicHJvcHMiLCJnZXQiLCJpbmhlcml0ZWRTdHlsZSIsImNvbnRleHQiLCJzcGxpdCIsInJlZHVjZSIsImtleSIsInN0eWxlUGF0aCIsInZhbHVlIiwidW5kZWZpbmVkIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzZCQUdWO0FBQ0gsT0FBSUMsaUlBQUo7O0FBRU4sT0FBRyxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLElBQStCLENBQWxDLEVBQW9DO0FBQUEsb0JBQ3RCLEtBQUtDLFFBQUwsRUFEc0I7QUFBQSxRQUM5QkMsTUFEOEIsYUFDOUJBLE1BRDhCOztBQUFBLG9CQUVqQixLQUFLQyxRQUFMLEVBRmlCO0FBQUEsUUFFOUJDLEtBRjhCLGFBRTlCQSxLQUY4QjtBQUFBLFFBRXhCQyxLQUZ3QixhQUV4QkEsS0FGd0I7O0FBR25DLFFBQUlDLGNBQVksc0JBQWdCRixLQUFoQixFQUFzQkMsS0FBdEIsQ0FBaEI7QUFIbUMsUUFJOUJFLE1BSjhCLEdBSWRELFdBSmMsQ0FJOUJDLE1BSjhCO0FBQUEsUUFJdkJDLE9BSnVCLEdBSWRGLFdBSmMsQ0FJdkJFLE9BSnVCOztBQUtuQyxRQUFJQyxPQUFLSCxZQUFZSSxJQUFaLENBQWlCLEVBQUNDLE9BQU1ULE9BQU9VLE9BQWQsRUFBakIsQ0FBVDtBQUNBZixTQUFLZ0IsUUFBTCxDQUFjQyxJQUFkLENBQW1CO0FBQUE7QUFBQTtBQUNsQixTQUFHLENBRGU7QUFFbEIsYUFBTyxDQUFDLENBRlU7QUFHbEIsZUFBU04sT0FIUztBQUlsQixhQUFPTixPQUFPVSxPQUpJO0FBS2xCLGNBQVFMLE1BTFU7QUFNbEI7QUFBQTtBQUFBLFFBQU8sT0FBT0wsT0FBT1UsT0FBckIsRUFBOEIsUUFBUUwsTUFBdEM7QUFBOEMsNENBQVVFLElBQVY7QUFBOUM7QUFOa0IsS0FBbkI7O0FBU0FaLFNBQUtjLEtBQUwsSUFBWVQsT0FBT1UsT0FBbkI7QUFDQWYsU0FBS1UsTUFBTCxHQUFZQSxNQUFaO0FBQ0FWLFNBQUtXLE9BQUwsR0FBYUEsT0FBYjtBQUNBO0FBQ0QsVUFBT1gsSUFBUDtBQUNBOzs7NkJBRVM7QUFBQSxPQUNGa0IsV0FERSxHQUNXLEtBQUtDLEtBRGhCLENBQ0ZELFdBREU7O0FBRVQsT0FBSVgsUUFBTVcsWUFBWUUsR0FBWixDQUFnQixPQUFoQixDQUFWOztBQUZTLE9BSUZDLGNBSkUsR0FJYyxLQUFLQyxPQUpuQixDQUlGRCxjQUpFOzs7QUFNVCxPQUFJYixRQUFNLDZCQUE2QmUsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0NDLE1BQXhDLENBQStDLFVBQUNoQixLQUFELEVBQVFpQixHQUFSLEVBQWM7QUFDN0QsUUFBSUMscUJBQWlCRCxHQUFyQjtBQUNULFFBQUlFLFFBQU1ULFlBQVlFLEdBQVosQ0FBZ0IsV0FBU00sU0FBekIsQ0FBVjtBQUNBLFFBQUdDLFNBQU9DLFNBQVYsRUFDQ0QsUUFBTU4sZUFBZUQsR0FBZixDQUFtQk0sU0FBbkIsQ0FBTjs7QUFFUSxRQUFHQyxTQUFPQyxTQUFWLEVBQW9CO0FBQ2hCcEIsV0FBTWlCLEdBQU4sSUFBV0UsS0FBWDtBQUNaO0FBQ1EsV0FBT25CLEtBQVA7QUFDSCxJQVZHLEVBVUYsRUFWRSxDQUFWOztBQVlBLFVBQU8sRUFBQ0QsWUFBRCxFQUFPQyxZQUFQLEVBQVA7QUFDQTs7Ozs7QUEvQ21CVCxJLENBQ1Y4QixXLEdBQVksTTtrQkFERjlCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL3BhcmFncmFwaFwiXHJcbmltcG9ydCB7V29yZFdyYXBwZXJ9IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpc3QgZXh0ZW5kcyBQYXJhZ3JhcGh7XHJcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJsaXN0XCJcclxuXHRcclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIGxldCBsaW5lPXN1cGVyLl9uZXdMaW5lKClcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApe1xyXG5cdFx0XHRsZXQge2luZGVudH09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRcdGxldCB7bGFiZWwsc3R5bGV9PXRoaXMuZ2V0TGFiZWwoKVxyXG5cdFx0XHRsZXQgd29yZFdyYXBwZXI9bmV3IFdvcmRXcmFwcGVyKGxhYmVsLHN0eWxlKVxyXG5cdFx0XHRsZXQge2hlaWdodCxkZXNjZW50fT13b3JkV3JhcHBlclxyXG5cdFx0XHRsZXQgdGV4dD13b3JkV3JhcHBlci5uZXh0KHt3aWR0aDppbmRlbnQuaGFuZ2luZ30pXHJcblx0XHRcdGxpbmUuY2hpbGRyZW4ucHVzaCg8R3JvdXBcclxuXHRcdFx0XHR4PXswfVxyXG5cdFx0XHRcdGluZGV4PXstMX1cclxuXHRcdFx0XHRkZXNjZW50PXtkZXNjZW50fVxyXG5cdFx0XHRcdHdpZHRoPXtpbmRlbnQuaGFuZ2luZ31cclxuXHRcdFx0XHRoZWlnaHQ9e2hlaWdodH0+XHJcblx0XHRcdFx0PEdyb3VwIHdpZHRoPXtpbmRlbnQuaGFuZ2luZ30gaGVpZ2h0PXtoZWlnaHR9Pjx0ZXh0IHsuLi50ZXh0fS8+PC9Hcm91cD5cclxuXHRcdFx0PC9Hcm91cD4pXHJcblx0XHRcdFxyXG5cdFx0XHRsaW5lLndpZHRoLT1pbmRlbnQuaGFuZ2luZ1xyXG5cdFx0XHRsaW5lLmhlaWdodD1oZWlnaHRcclxuXHRcdFx0bGluZS5kZXNjZW50PWRlc2NlbnRcclxuXHRcdH1cclxuXHRcdHJldHVybiBsaW5lXHJcblx0fVxyXG5cdFxyXG5cdGdldExhYmVsKCl7XHJcblx0XHRjb25zdCB7ZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuXHRcdGxldCBsYWJlbD1kaXJlY3RTdHlsZS5nZXQoXCJsYWJlbFwiKVxyXG5cdFx0XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBzdHlsZT0nckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXHJcblx0XHRcdGxldCB2YWx1ZT1kaXJlY3RTdHlsZS5nZXQoXCJsYWJlbC5cIitzdHlsZVBhdGgpXHJcblx0XHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdFx0dmFsdWU9aW5oZXJpdGVkU3R5bGUuZ2V0KHN0eWxlUGF0aClcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0XHRcclxuXHRcdHJldHVybiB7bGFiZWwsc3R5bGV9XHJcblx0fVxyXG59XHJcbiJdfQ==