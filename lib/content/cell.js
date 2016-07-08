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

			var _getBorderPadding = this.getBorderPadding();

			var border = _getBorderPadding.border;
			var padding = _getBorderPadding.padding;

			width = width - border.right - border.left - padding.right - padding - left;
			height = height - border.top - border.bottom - padding.top - padding.bottom;
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

exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx3Q0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3FDQUNELFVBQVM7K0NBRFIseURBRTRCLFdBRHBCOztPQUN0Qix5QkFEc0I7T0FDaEIsMkJBRGdCOzsyQkFFTCxLQUFLLGdCQUFMLEdBRks7O09BRXRCLGtDQUZzQjtPQUVkLG9DQUZjOztBQUczQixXQUFNLFFBQU0sT0FBTyxLQUFQLEdBQWEsT0FBTyxJQUFQLEdBQVksUUFBUSxLQUFSLEdBQWMsT0FBN0MsR0FBcUQsSUFBckQsQ0FIcUI7QUFJM0IsWUFBTyxTQUFPLE9BQU8sR0FBUCxHQUFXLE9BQU8sTUFBUCxHQUFjLFFBQVEsR0FBUixHQUFZLFFBQVEsTUFBUixDQUp4QjtBQUszQixVQUFPLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBUCxDQUwyQjs7OztxQ0FRVjtBQUNqQixVQUFPO0FBQ04sYUFBUSxFQUFSO0FBR0EsWUFBTyxFQUFQO0lBSkQsQ0FEaUI7Ozs7UUFURTtFQUFhOztrQkFBYiIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIlxyXG5pbXBvcnQge3RvZ2dsYWJsZX0gZnJvbSBcIi4vYW55XCJcclxuXHJcbmxldCBTdXBlcj10b2dnbGFibGUoQ29udGFpbmVyKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsIGV4dGVuZHMgU3VwZXJ7XHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1zdXBlci5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0bGV0IHtib3JkZXIsIHBhZGRpbmd9PXRoaXMuZ2V0Qm9yZGVyUGFkZGluZygpXHJcblx0XHR3aWR0aD13aWR0aC1ib3JkZXIucmlnaHQtYm9yZGVyLmxlZnQtcGFkZGluZy5yaWdodC1wYWRkaW5nLWxlZnRcclxuXHRcdGhlaWdodD1oZWlnaHQtYm9yZGVyLnRvcC1ib3JkZXIuYm90dG9tLXBhZGRpbmcudG9wLXBhZGRpbmcuYm90dG9tXHJcblx0XHRyZXR1cm4ge3dpZHRoLGhlaWdodH1cclxuXHR9XHJcblx0XHJcblx0Z2V0Qm9yZGVyUGFkZGluZygpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cGFkZGluZzp7XHJcblx0XHRcdFx0XHJcblx0XHRcdH0sXHJcblx0XHRcdGJvcmRlcjp7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcbn0iXX0=