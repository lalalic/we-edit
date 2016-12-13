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

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _list = require("../../content/list");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_List) {
	(0, _inherits3.default)(_class, _List);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
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
	return _class;
}(_list2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2xpc3QuanMiXSwibmFtZXMiOlsiZGlyZWN0U3R5bGUiLCJwcm9wcyIsImxhYmVsIiwiZ2V0IiwiaW5oZXJpdGVkU3R5bGUiLCJjb250ZXh0Iiwic3R5bGUiLCJzcGxpdCIsInJlZHVjZSIsImtleSIsInN0eWxlUGF0aCIsInZhbHVlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzZCQUdXO0FBQUEsT0FDRkEsV0FERSxHQUNXLEtBQUtDLEtBRGhCLENBQ0ZELFdBREU7O0FBRVQsT0FBSUUsUUFBTUYsWUFBWUcsR0FBWixDQUFnQixPQUFoQixDQUFWOztBQUZTLE9BSUZDLGNBSkUsR0FJYyxLQUFLQyxPQUpuQixDQUlGRCxjQUpFOzs7QUFNVCxPQUFJRSxRQUFNLDZCQUE2QkMsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0NDLE1BQXhDLENBQStDLFVBQUNGLEtBQUQsRUFBUUcsR0FBUixFQUFjO0FBQzdELFFBQUlDLHFCQUFpQkQsR0FBckI7QUFDVCxRQUFJRSxRQUFNWCxZQUFZRyxHQUFaLENBQWdCLFdBQVNPLFNBQXpCLENBQVY7QUFDQSxRQUFHQyxTQUFPQyxTQUFWLEVBQ0NELFFBQU1QLGVBQWVELEdBQWYsQ0FBbUJPLFNBQW5CLENBQU47O0FBRVEsUUFBR0MsU0FBT0MsU0FBVixFQUFvQjtBQUNoQk4sV0FBTUcsR0FBTixJQUFXRSxLQUFYO0FBQ1o7QUFDUSxXQUFPTCxLQUFQO0FBQ0gsSUFWRyxFQVVGLEVBVkUsQ0FBVjs7QUFZQSxVQUFPLEVBQUNKLFlBQUQsRUFBT0ksWUFBUCxFQUFQO0FBQ0EiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaXN0IGZyb20gXCIuLi8uLi9jb250ZW50L2xpc3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIExpc3R7XG5cdGdldExhYmVsKCl7XG5cdFx0Y29uc3Qge2RpcmVjdFN0eWxlfT10aGlzLnByb3BzXG5cdFx0bGV0IGxhYmVsPWRpcmVjdFN0eWxlLmdldChcImxhYmVsXCIpXG5cblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IHN0eWxlPSdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXG5cdFx0XHRsZXQgdmFsdWU9ZGlyZWN0U3R5bGUuZ2V0KFwibGFiZWwuXCIrc3R5bGVQYXRoKVxuXHRcdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcblx0XHRcdFx0dmFsdWU9aW5oZXJpdGVkU3R5bGUuZ2V0KHN0eWxlUGF0aClcblxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxuXHRcdFx0fVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlXG4gICAgICAgIH0se30pXG5cblx0XHRyZXR1cm4ge2xhYmVsLHN0eWxlfVxuXHR9XG59XG4iXX0=