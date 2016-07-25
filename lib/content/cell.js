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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.styleInheritable)(_any2.default);

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

			var margin = _getStyle.margin;

			width = width - margin.right - margin.left;

			height = height - margin.top - margin.bottom;

			return { width: width, height: height };
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			if (this._style) return this._style;

			var conditions = this.conditions;

			var _context = this.context;
			var tableStyle = _context.tableStyle;
			var rowStyle = _context.rowStyle;
			var directStyle = this.props.directStyle;


			directStyle.basedOn = rowStyle;
			rowStyle.basedOn = tableStyle;

			var border = directStyle.getBorder(conditions);

			var margin = {};
			"left,right,top,bottom".split(",").forEach(function (a) {
				return margin[a] = directStyle.get("margin." + a) || 0;
			});

			var spacing = rowStyle.get("spacing") || 0;

			var background = directStyle.get('shd', conditions);

			return this._style = { border: border, margin: margin, spacing: spacing, background: background };
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			var _context2 = this.context;
			var tableStyle = _context2.tableStyle;
			var rowStyle = _context2.rowStyle;
			var inheritedStyle = _context2.inheritedStyle;
			var directStyle = this.props.directStyle;

			return Object.assign(_get(Object.getPrototypeOf(Cell.prototype), "getChildContext", this).call(this), {
				inheritedStyle: {
					get: function get(path) {
						directStyle.basedOn = rowStyle;
						rowStyle.basedOn = tableStyle;
						var conditions = self.confitions;
						var v = directStyle.get(path, conditions);
						if (v == undefined) return inheritedStyle.get(path, conditions);
						return v;
					}
				}
			});
		}
	}, {
		key: "conditions",
		get: function get() {
			var _this2 = this;

			return "seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert".split(",").filter(function (cond) {
				return _this2.context["is" + cond.charAt(0).toUpperCase() + cond.substr(1)]();
			});
		}
	}]);

	return Cell;
}(Super);

Cell.displayName = "cell";
Cell.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	rowStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func,
	isBand1Horz: _react.PropTypes.func,
	isBand2Horz: _react.PropTypes.func,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func,
	isBand1Vert: _react.PropTypes.func,
	isBand2Vert: _react.PropTypes.func,
	isSeCell: _react.PropTypes.func,
	isSwCell: _react.PropTypes.func,
	isNeCell: _react.PropTypes.func,
	isNwCell: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx5Q0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3FDQUVELFVBQVM7K0NBRlIseURBRzRCLFdBRHBCOztPQUN0Qix5QkFEc0I7T0FDaEIsMkJBRGdCOzttQkFHZCxLQUFLLFFBQUwsR0FIYzs7T0FHdEIsMEJBSHNCOztBQUkzQixXQUFNLFFBQ0osT0FBTyxLQUFQLEdBQ0EsT0FBTyxJQUFQLENBTnlCOztBQVEzQixZQUFPLFNBQ0wsT0FBTyxHQUFQLEdBQ0EsT0FBTyxNQUFQLENBVnlCOztBQVkzQixVQUFPLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBUCxDQVoyQjs7Ozs2QkFlbEI7QUFDVCxPQUFHLEtBQUssTUFBTCxFQUNGLE9BQU8sS0FBSyxNQUFMLENBRFI7O0FBR0EsT0FBSSxhQUFXLEtBQUssVUFBTCxDQUpOOztrQkFNb0IsS0FBSyxPQUFMLENBTnBCO09BTUYsaUNBTkU7T0FNVSw2QkFOVjtPQU9GLGNBQWEsS0FBSyxLQUFMLENBQWIsWUFQRTs7O0FBU1QsZUFBWSxPQUFaLEdBQW9CLFFBQXBCLENBVFM7QUFVVCxZQUFTLE9BQVQsR0FBaUIsVUFBakIsQ0FWUzs7QUFZVCxPQUFJLFNBQU8sWUFBWSxTQUFaLENBQXNCLFVBQXRCLENBQVAsQ0FaSzs7QUFjVCxPQUFJLFNBQU8sRUFBUCxDQWRLO0FBZVQsMkJBQXdCLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DLE9BQW5DLENBQTJDO1dBQUcsT0FBTyxDQUFQLElBQVUsWUFBWSxHQUFaLGFBQTBCLENBQTFCLEtBQWdDLENBQWhDO0lBQWIsQ0FBM0MsQ0FmUzs7QUFpQlQsT0FBSSxVQUFRLFNBQVMsR0FBVCxlQUF5QixDQUF6QixDQWpCSDs7QUFtQlQsT0FBSSxhQUFXLFlBQVksR0FBWixDQUFnQixLQUFoQixFQUFzQixVQUF0QixDQUFYLENBbkJLOztBQXFCVCxVQUFPLEtBQUssTUFBTCxHQUFZLEVBQUMsY0FBRCxFQUFTLGNBQVQsRUFBaUIsZ0JBQWpCLEVBQTBCLHNCQUExQixFQUFaLENBckJFOzs7O29DQThDTztBQUNoQixPQUFJLE9BQUssSUFBTCxDQURZO21CQUU2QixLQUFLLE9BQUwsQ0FGN0I7T0FFVCxrQ0FGUztPQUVHLDhCQUZIO09BRWEsMENBRmI7T0FHVCxjQUFhLEtBQUssS0FBTCxDQUFiLFlBSFM7O0FBSVYsVUFBTyxPQUFPLE1BQVAsNEJBbkVNLG9EQW1FTixFQUF1QztBQUNsRCxvQkFBZTtBQUNDLHVCQUFJLE1BQUs7QUFDdkIsa0JBQVksT0FBWixHQUFvQixRQUFwQixDQUR1QjtBQUV2QixlQUFTLE9BQVQsR0FBaUIsVUFBakIsQ0FGdUI7QUFHdkIsVUFBSSxhQUFXLEtBQUssVUFBTCxDQUhRO0FBSUwsVUFBSSxJQUFFLFlBQVksR0FBWixDQUFnQixJQUFoQixFQUFzQixVQUF0QixDQUFGLENBSkM7QUFLTCxVQUFHLEtBQUcsU0FBSCxFQUNDLE9BQU8sZUFBZSxHQUFmLENBQW1CLElBQW5CLEVBQXlCLFVBQXpCLENBQVAsQ0FESjtBQUVBLGFBQU8sQ0FBUCxDQVBLO01BRFY7S0FBZjtJQURXLENBQVAsQ0FKVTs7OztzQkF0QkQ7OztBQUNmLFVBQU8sd0dBQ0wsS0FESyxDQUNDLEdBREQsRUFDTSxNQUROLENBQ2E7V0FBTSxPQUFLLE9BQUwsUUFBa0IsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLFdBQWYsS0FBK0IsS0FBSyxNQUFMLENBQVksQ0FBWixDQUFqRDtJQUFOLENBRHBCLENBRGU7Ozs7UUF6Q0k7RUFBYTs7QUFBYixLQUNiLGNBQVk7QUFEQyxLQThDYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGFBQVksaUJBQVUsTUFBVjtBQUNaLFdBQVUsaUJBQVUsTUFBVjtBQUNWLGFBQVksaUJBQVUsSUFBVjtBQUNaLFlBQVcsaUJBQVUsSUFBVjtBQUNYLGNBQWEsaUJBQVUsSUFBVjtBQUNiLGNBQWEsaUJBQVUsSUFBVjtBQUNiLGFBQVksaUJBQVUsSUFBVjtBQUNaLFlBQVcsaUJBQVUsSUFBVjtBQUNYLGNBQWEsaUJBQVUsSUFBVjtBQUNiLGNBQWEsaUJBQVUsSUFBVjtBQUNiLFdBQVUsaUJBQVUsSUFBVjtBQUNWLFdBQVUsaUJBQVUsSUFBVjtBQUNWLFdBQVUsaUJBQVUsSUFBVjtBQUNWLFdBQVUsaUJBQVUsSUFBVjtDQWRTLEVBZWpCLE1BQU0sWUFBTjtrQkE3RGlCIiwiZmlsZSI6ImNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImNlbGxcIlxyXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09c3VwZXIubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRsZXQge21hcmdpbn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHR3aWR0aD13aWR0aFxyXG5cdFx0XHQtbWFyZ2luLnJpZ2h0XHJcblx0XHRcdC1tYXJnaW4ubGVmdFxyXG5cclxuXHRcdGhlaWdodD1oZWlnaHRcclxuXHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHJcblx0XHRyZXR1cm4ge3dpZHRoLGhlaWdodH1cclxuXHR9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRpZih0aGlzLl9zdHlsZSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N0eWxlXHJcblxyXG5cdFx0bGV0IGNvbmRpdGlvbnM9dGhpcy5jb25kaXRpb25zXHJcblxyXG5cdFx0Y29uc3Qge3RhYmxlU3R5bGUsIHJvd1N0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGRpcmVjdFN0eWxlLmJhc2VkT249cm93U3R5bGVcclxuXHRcdHJvd1N0eWxlLmJhc2VkT249dGFibGVTdHlsZVxyXG5cclxuXHRcdGxldCBib3JkZXI9ZGlyZWN0U3R5bGUuZ2V0Qm9yZGVyKGNvbmRpdGlvbnMpXHJcblxyXG5cdFx0bGV0IG1hcmdpbj17fVxyXG5cdFx0XCJsZWZ0LHJpZ2h0LHRvcCxib3R0b21cIi5zcGxpdChcIixcIikuZm9yRWFjaChhPT5tYXJnaW5bYV09ZGlyZWN0U3R5bGUuZ2V0KGBtYXJnaW4uJHthfWApfHwwKVxyXG5cclxuXHRcdGxldCBzcGFjaW5nPXJvd1N0eWxlLmdldChgc3BhY2luZ2ApfHwwXHJcblxyXG5cdFx0bGV0IGJhY2tncm91bmQ9ZGlyZWN0U3R5bGUuZ2V0KCdzaGQnLGNvbmRpdGlvbnMpXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3N0eWxlPXtib3JkZXIsIG1hcmdpbiwgc3BhY2luZywgYmFja2dyb3VuZH1cclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb25zKCl7XHJcblx0XHRyZXR1cm4gXCJzZUNlbGwsc3dDZWxsLG5lQ2VsbCxud0NlbGwsbGFzdENvbCxmaXJzdENvbCxsYXN0Um93LGZpcnN0Um93LGJhbmQySG9yeixiYW5kMUhvcnosYmFuZDJWZXJ0LGJhbmQxVmVydFwiXHJcblx0XHRcdC5zcGxpdChcIixcIikuZmlsdGVyKGNvbmQ9PnRoaXMuY29udGV4dFtgaXMke2NvbmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtjb25kLnN1YnN0cigxKX1gXSgpKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRyb3dTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Um93OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDFIb3J6OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDJIb3J6OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzRmlyc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDFWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDJWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU2VDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU3dDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTmVDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTndDZWxsOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRjb25zdCB7dGFibGVTdHlsZSwgcm93U3R5bGUsIGluaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdFx0aW5oZXJpdGVkU3R5bGU6e1xyXG4gICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcclxuXHRcdFx0XHRcdFx0ZGlyZWN0U3R5bGUuYmFzZWRPbj1yb3dTdHlsZVxyXG5cdFx0XHRcdFx0XHRyb3dTdHlsZS5iYXNlZE9uPXRhYmxlU3R5bGVcclxuXHRcdFx0XHRcdFx0bGV0IGNvbmRpdGlvbnM9c2VsZi5jb25maXRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWRpcmVjdFN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2PT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5oZXJpdGVkU3R5bGUuZ2V0KHBhdGgsIGNvbmRpdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=