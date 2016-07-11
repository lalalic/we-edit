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

			var _getStyle = this.getStyle();

			var border = _getStyle.border;
			var margin = _getStyle.margin;
			var spacing = _getStyle.spacing;

			width = width - border.right.sz - border.left.sz - margin.right - margin.left - spacing * 1.5;

			height = height - border.top.sz - border.bottom.sz - margin.top - margin.bottom - spacing;
			return { width: width, height: height };
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			var _context = this.context;
			var tableStyle = _context.tableStyle;
			var rowStyle = _context.rowStyle;
			var rowConditions = _context.conditions;
			var contentStyle = this.props.contentStyle;

			var conditions = (contentStyle.cell.cnfStyle || []).concat(rowConditions);

			contentStyle.metadata.basedOn = tableStyle;
			var border = {};
			"left,right,top,bottom,insideH,insideV".split(",").forEach(function (a) {
				return border[a] = contentStyle.get("border." + a, conditions) || { sz: 0 };
			});

			var margin = {};
			"left,right,top,bottom".split(",").forEach(function (a) {
				return margin[a] = contentStyle.get("margin." + a) || 0;
			});

			rowStyle.metadata.basedOn = tableStyle;
			var spacing = rowStyle.get("spacing") || 0;

			rowStyle.metadata.basedOn = undefined;
			contentStyle.metadata.basedOn = undefined;

			return { border: border, margin: margin, spacing: spacing };
		}
	}]);

	return Cell;
}(Super);

Cell.displayName = "cell";
Cell.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	conditions: _react.PropTypes.array,
	rowStyle: _react.PropTypes.object
}, Super.contextTypes);
exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSwrQ0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3FDQUVELFVBQVM7K0NBRlIseURBRzRCLFdBRHBCOztPQUN0Qix5QkFEc0I7T0FDaEIsMkJBRGdCOzttQkFHRyxLQUFLLFFBQUwsR0FISDs7T0FHdEIsMEJBSHNCO09BR2QsMEJBSGM7T0FHTiw0QkFITTs7QUFJM0IsV0FBTSxRQUNKLE9BQU8sS0FBUCxDQUFhLEVBQWIsR0FDQSxPQUFPLElBQVAsQ0FBWSxFQUFaLEdBQ0EsT0FBTyxLQUFQLEdBQ0EsT0FBTyxJQUFQLEdBQ0EsVUFBUSxHQUFSLENBVHlCOztBQVczQixZQUFPLFNBQ0wsT0FBTyxHQUFQLENBQVcsRUFBWCxHQUNBLE9BQU8sTUFBUCxDQUFjLEVBQWQsR0FDQSxPQUFPLEdBQVAsR0FDQSxPQUFPLE1BQVAsR0FDQSxPQUxLLENBWG9CO0FBaUIzQixVQUFPLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBUCxDQWpCMkI7Ozs7NkJBb0JsQjtrQkFDOEMsS0FBSyxPQUFMLENBRDlDO09BQ0YsaUNBREU7T0FDVSw2QkFEVjtPQUMrQix5QkFBWCxXQURwQjtPQUVGLGVBQWMsS0FBSyxLQUFMLENBQWQsYUFGRTs7QUFHVCxPQUFJLGFBQVcsQ0FBQyxhQUFhLElBQWIsQ0FBa0IsUUFBbEIsSUFBNEIsRUFBNUIsQ0FBRCxDQUFpQyxNQUFqQyxDQUF3QyxhQUF4QyxDQUFYLENBSEs7O0FBS1QsZ0JBQWEsUUFBYixDQUFzQixPQUF0QixHQUE4QixVQUE5QixDQUxTO0FBTVQsT0FBSSxTQUFPLEVBQVAsQ0FOSztBQU9ULDJDQUF3QyxLQUF4QyxDQUE4QyxHQUE5QyxFQUNFLE9BREYsQ0FDVTtXQUFHLE9BQU8sQ0FBUCxJQUFVLGFBQWEsR0FBYixhQUEyQixDQUEzQixFQUErQixVQUEvQixLQUE0QyxFQUFDLElBQUcsQ0FBSCxFQUE3QztJQUFiLENBRFYsQ0FQUzs7QUFVVCxPQUFJLFNBQU8sRUFBUCxDQVZLO0FBV1QsMkJBQXdCLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DLE9BQW5DLENBQTJDO1dBQUcsT0FBTyxDQUFQLElBQVUsYUFBYSxHQUFiLGFBQTJCLENBQTNCLEtBQWlDLENBQWpDO0lBQWIsQ0FBM0MsQ0FYUzs7QUFjVCxZQUFTLFFBQVQsQ0FBa0IsT0FBbEIsR0FBMEIsVUFBMUIsQ0FkUztBQWVULE9BQUksVUFBUSxTQUFTLEdBQVQsZUFBeUIsQ0FBekIsQ0FmSDs7QUFpQlQsWUFBUyxRQUFULENBQWtCLE9BQWxCLEdBQTBCLFNBQTFCLENBakJTO0FBa0JULGdCQUFhLFFBQWIsQ0FBc0IsT0FBdEIsR0FBOEIsU0FBOUIsQ0FsQlM7O0FBb0JULFVBQU8sRUFBQyxjQUFELEVBQVMsY0FBVCxFQUFpQixnQkFBakIsRUFBUCxDQXBCUzs7OztRQXRCVTtFQUFhOztBQUFiLEtBQ2IsY0FBWTtBQURDLEtBOENiLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsYUFBWSxpQkFBVSxNQUFWO0FBQ1osYUFBWSxpQkFBVSxLQUFWO0FBQ1osV0FBVSxpQkFBVSxNQUFWO0NBSFMsRUFJakIsTUFBTSxZQUFOO2tCQWxEaUIiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcclxuaW1wb3J0IHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5cclxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQ29udGFpbmVyKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY2VsbFwiXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1zdXBlci5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHJcblx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nfT10aGlzLmdldFN0eWxlKClcclxuXHRcdHdpZHRoPXdpZHRoXHJcblx0XHRcdC1ib3JkZXIucmlnaHQuc3pcclxuXHRcdFx0LWJvcmRlci5sZWZ0LnN6XHJcblx0XHRcdC1tYXJnaW4ucmlnaHRcclxuXHRcdFx0LW1hcmdpbi5sZWZ0XHJcblx0XHRcdC1zcGFjaW5nKjEuNVxyXG5cdFx0XHRcclxuXHRcdGhlaWdodD1oZWlnaHRcclxuXHRcdFx0LWJvcmRlci50b3Auc3pcclxuXHRcdFx0LWJvcmRlci5ib3R0b20uc3pcclxuXHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHRcdFx0LXNwYWNpbmdcclxuXHRcdHJldHVybiB7d2lkdGgsaGVpZ2h0fVxyXG5cdH1cclxuXHRcclxuXHRnZXRTdHlsZSgpe1x0XHJcblx0XHRjb25zdCB7dGFibGVTdHlsZSwgcm93U3R5bGUsIGNvbmRpdGlvbnM6cm93Q29uZGl0aW9uc309dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7Y29udGVudFN0eWxlfT10aGlzLnByb3BzXHJcblx0XHRsZXQgY29uZGl0aW9ucz0oY29udGVudFN0eWxlLmNlbGwuY25mU3R5bGV8fFtdKS5jb25jYXQocm93Q29uZGl0aW9ucylcclxuXHRcdFxyXG5cdFx0Y29udGVudFN0eWxlLm1ldGFkYXRhLmJhc2VkT249dGFibGVTdHlsZVxyXG5cdFx0bGV0IGJvcmRlcj17fVxyXG5cdFx0XCJsZWZ0LHJpZ2h0LHRvcCxib3R0b20saW5zaWRlSCxpbnNpZGVWXCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdC5mb3JFYWNoKGE9PmJvcmRlclthXT1jb250ZW50U3R5bGUuZ2V0KGBib3JkZXIuJHthfWAsY29uZGl0aW9ucyl8fHtzejowfSlcclxuXHRcdFx0XHJcblx0XHRsZXQgbWFyZ2luPXt9XHJcblx0XHRcImxlZnQscmlnaHQsdG9wLGJvdHRvbVwiLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGE9Pm1hcmdpblthXT1jb250ZW50U3R5bGUuZ2V0KGBtYXJnaW4uJHthfWApfHwwKVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJvd1N0eWxlLm1ldGFkYXRhLmJhc2VkT249dGFibGVTdHlsZVxyXG5cdFx0bGV0IHNwYWNpbmc9cm93U3R5bGUuZ2V0KGBzcGFjaW5nYCl8fDBcclxuXHRcclxuXHRcdHJvd1N0eWxlLm1ldGFkYXRhLmJhc2VkT249dW5kZWZpbmVkXHJcblx0XHRjb250ZW50U3R5bGUubWV0YWRhdGEuYmFzZWRPbj11bmRlZmluZWRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHtib3JkZXIsIG1hcmdpbiwgc3BhY2luZ31cclxuXHR9XHJcblx0XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRjb25kaXRpb25zOiBQcm9wVHlwZXMuYXJyYXksXHJcblx0XHRyb3dTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIFN1cGVyLmNvbnRleHRUeXBlcylcclxufVxyXG4iXX0=