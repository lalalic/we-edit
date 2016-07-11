"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _container = require("./container");

var _container2 = _interopRequireDefault(_container);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.styleInheritable)(_container2.default);

var Cell = function (_Super) {
	_inherits(Cell, _Super);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).apply(this, arguments));
	}

	_createClass(Cell, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var _get$apply = _get(Object.getPrototypeOf(Cell.prototype), "nextAvailableSpace", this).apply(this, arguments);

			var width = _get$apply.width;
			var height = _get$apply.height;
			//let {border, padding}=this.getBorderPadding()
			//width=width-border.right-border.left-padding.right-padding-left
			//height=height-border.top-border.bottom-padding.top-padding.bottom

			return { width: width, height: height };
		}
	}, {
		key: "getBorderPadding",
		value: function getBorderPadding() {
			return {
				padding: {},
				border: {}
			};
		}
	}]);

	return Cell;
}(Super);

Cell.displayName = "cell";
exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSwrQ0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3FDQUVELFVBQVM7K0NBRlIseURBRzRCLFdBRHBCOztPQUN0Qix5QkFEc0I7T0FDaEI7Ozs7QUFEZ0I7QUFLM0IsVUFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQVAsQ0FMMkI7Ozs7cUNBUVY7QUFDakIsVUFBTztBQUNOLGFBQVEsRUFBUjtBQUdBLFlBQU8sRUFBUDtJQUpELENBRGlCOzs7O1FBVkU7RUFBYTs7QUFBYixLQUNiLGNBQVk7a0JBREMiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcclxuaW1wb3J0IHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5cclxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQ29udGFpbmVyKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY2VsbFwiXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1zdXBlci5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0Ly9sZXQge2JvcmRlciwgcGFkZGluZ309dGhpcy5nZXRCb3JkZXJQYWRkaW5nKClcclxuXHRcdC8vd2lkdGg9d2lkdGgtYm9yZGVyLnJpZ2h0LWJvcmRlci5sZWZ0LXBhZGRpbmcucmlnaHQtcGFkZGluZy1sZWZ0XHJcblx0XHQvL2hlaWdodD1oZWlnaHQtYm9yZGVyLnRvcC1ib3JkZXIuYm90dG9tLXBhZGRpbmcudG9wLXBhZGRpbmcuYm90dG9tXHJcblx0XHRyZXR1cm4ge3dpZHRoLGhlaWdodH1cclxuXHR9XHJcbiBcclxuXHRnZXRCb3JkZXJQYWRkaW5nKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRwYWRkaW5nOntcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdGJvcmRlcjp7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iXX0=