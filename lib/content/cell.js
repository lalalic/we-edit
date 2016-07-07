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

			var border = {};
			var padding = {};
			width = width - border.right - border.left - padding.right - padding - left;
			height = height - border.top - border.bottom - padding.top - padding.bottom;
			return { width: width, height: height };
		}
	}]);

	return Cell;
}(Super);

exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx3Q0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3FDQUNELFVBQVM7K0NBRFIseURBRTRCLFdBRHBCOztPQUN0Qix5QkFEc0I7T0FDaEIsMkJBRGdCOztBQUUzQixPQUFJLFNBQU8sRUFBUCxDQUZ1QjtBQUczQixPQUFJLFVBQVEsRUFBUixDQUh1QjtBQUkzQixXQUFNLFFBQU0sT0FBTyxLQUFQLEdBQWEsT0FBTyxJQUFQLEdBQVksUUFBUSxLQUFSLEdBQWMsT0FBN0MsR0FBcUQsSUFBckQsQ0FKcUI7QUFLM0IsWUFBTyxTQUFPLE9BQU8sR0FBUCxHQUFXLE9BQU8sTUFBUCxHQUFjLFFBQVEsR0FBUixHQUFZLFFBQVEsTUFBUixDQUx4QjtBQU0zQixVQUFPLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBUCxDQU4yQjs7OztRQURSO0VBQWE7O2tCQUFiIiwiZmlsZSI6ImNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXHJcbmltcG9ydCB7dG9nZ2xhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5cclxubGV0IFN1cGVyPXRvZ2dsYWJsZShDb250YWluZXIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGwgZXh0ZW5kcyBTdXBlcntcclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpe1xyXG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXN1cGVyLm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQgYm9yZGVyPXt9XHJcblx0XHRsZXQgcGFkZGluZz17fVxyXG5cdFx0d2lkdGg9d2lkdGgtYm9yZGVyLnJpZ2h0LWJvcmRlci5sZWZ0LXBhZGRpbmcucmlnaHQtcGFkZGluZy1sZWZ0XHJcblx0XHRoZWlnaHQ9aGVpZ2h0LWJvcmRlci50b3AtYm9yZGVyLmJvdHRvbS1wYWRkaW5nLnRvcC1wYWRkaW5nLmJvdHRvbVxyXG5cdFx0cmV0dXJuIHt3aWR0aCxoZWlnaHR9XHJcblx0fVxyXG5cdFxyXG59Il19