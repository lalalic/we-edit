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

var Super = (0, _any.togglable)(_container2.default);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx3Q0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3FDQUVELFVBQVM7K0NBRlIseURBRzRCLFdBRHBCOztPQUN0Qix5QkFEc0I7T0FDaEI7Ozs7QUFEZ0I7QUFLM0IsVUFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQVAsQ0FMMkI7Ozs7cUNBUVY7QUFDakIsVUFBTztBQUNOLGFBQVEsRUFBUjtBQUdBLFlBQU8sRUFBUDtJQUpELENBRGlCOzs7O1FBVkU7RUFBYTs7QUFBYixLQUNiLGNBQVk7a0JBREMiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcclxuaW1wb3J0IHt0b2dnbGFibGV9IGZyb20gXCIuL2FueVwiXHJcblxyXG5sZXQgU3VwZXI9dG9nZ2xhYmxlKENvbnRhaW5lcilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImNlbGxcIlxyXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09c3VwZXIubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcclxuXHRcdC8vbGV0IHtib3JkZXIsIHBhZGRpbmd9PXRoaXMuZ2V0Qm9yZGVyUGFkZGluZygpXHJcblx0XHQvL3dpZHRoPXdpZHRoLWJvcmRlci5yaWdodC1ib3JkZXIubGVmdC1wYWRkaW5nLnJpZ2h0LXBhZGRpbmctbGVmdFxyXG5cdFx0Ly9oZWlnaHQ9aGVpZ2h0LWJvcmRlci50b3AtYm9yZGVyLmJvdHRvbS1wYWRkaW5nLnRvcC1wYWRkaW5nLmJvdHRvbVxyXG5cdFx0cmV0dXJuIHt3aWR0aCxoZWlnaHR9XHJcblx0fVxyXG5cclxuXHRnZXRCb3JkZXJQYWRkaW5nKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRwYWRkaW5nOntcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdGJvcmRlcjp7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iXX0=