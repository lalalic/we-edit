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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  
 *  
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */

var Table = function (_Container) {
	_inherits(Table, _Container);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	}

	_createClass(Table, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var availableSpace = this.context.parent.nextAvailableSpace(required);
			return { width: this.props.width, height: availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(colGroups) {
			var _props = this.props;
			var width = _props.width;
			var cols = _props.cols;

			var height = 0,
			    self = this;

			var x = 0,
			    rowNo = this.children.length - 1;
			var groupsWithXY = colGroups.map(function (lines, colNo) {
				var _self$children$rowNo$ = self.children[rowNo].children[colNo].getStyle();

				var border = _self$children$rowNo$.border;
				var margin = _self$children$rowNo$.margin;
				var spacing = _self$children$rowNo$.spacing;
				var background = _self$children$rowNo$.background;

				var y = 0;
				var grouped = lines.map(function (line) {
					var a = _react2.default.createElement(
						_group2.default,
						{ y: y },
						line
					);
					y += line.props.height;
					return a;
				});
				y += spacing * .5 + border.top.sz + margin.top + margin.bottom + border.bottom.sz + spacing * .5;
				var cell = _react2.default.createElement(
					Cell,
					{ height: y, x: x, width: cols[colNo], background: background },
					_react2.default.createElement(
						Spacing,
						{ x: spacing / 2, y: spacing / 2 },
						_react2.default.createElement(
							Border,
							{ border: border, spacing: spacing },
							_react2.default.createElement(
								Margin,
								{ x: margin.left, y: margin.top },
								grouped
							)
						)
					)
				);
				x += cols[colNo];
				height = Math.max(height, y);
				return cell;
			});

			this.context.parent.appendComposed(this.createComposed2Parent({ width: width, height: height, children: groupsWithXY }));
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(Row, props);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var children = this.children;
			var content = this.state.content;
			return Object.assign(_get(Object.getPrototypeOf(Table.prototype), "getChildContext", this).call(this), {
				tableStyle: this.props.contentStyle,
				isFirstRow: function isFirstRow() {
					return children.length == 0;
				},
				isLastRow: function isLastRow() {
					return children.length == content.length - 1;
				}
			});
		}
	}]);

	return Table;
}(_container2.default);

Table.displayName = "table";
Table.childContextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func
}, _container2.default.childContextTypes);
exports.default = Table;

var Spacing = function (_Group) {
	_inherits(Spacing, _Group);

	function Spacing() {
		_classCallCheck(this, Spacing);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Spacing).apply(this, arguments));
	}

	return Spacing;
}(_group2.default);

var Margin = function (_Group2) {
	_inherits(Margin, _Group2);

	function Margin() {
		_classCallCheck(this, Margin);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Margin).apply(this, arguments));
	}

	return Margin;
}(_group2.default);

var Cell = function (_Group3) {
	_inherits(Cell, _Group3);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).apply(this, arguments));
	}

	_createClass(Cell, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				cellSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props;
			var width = _props2.width;
			var height = _props2.height;
			var background = _props2.background;
			var children = _props2.children;

			var others = _objectWithoutProperties(_props2, ["width", "height", "background", "children"]);

			return _react2.default.createElement(
				_group2.default,
				others,
				background && _react2.default.createElement("rect", { width: width, height: height, fill: background }),
				children
			);
		}
	}]);

	return Cell;
}(_group2.default);

Cell.contextTypes = {
	cellSize: _react.PropTypes.object
};
Cell.childContextTypes = {
	cellSize: _react.PropTypes.object
};

var Row = function (_Group4) {
	_inherits(Row, _Group4);

	function Row() {
		_classCallCheck(this, Row);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
	}

	_createClass(Row, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				rowSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}]);

	return Row;
}(_group2.default);

Row.childContextTypes = {
	rowSize: _react.PropTypes.object
};

var Border = function (_Component) {
	_inherits(Border, _Component);

	function Border() {
		_classCallCheck(this, Border);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Border).apply(this, arguments));
	}

	_createClass(Border, [{
		key: "render",
		value: function render() {
			var _props3 = this.props;
			var spacing = _props3.spacing;
			var _props3$border = _props3.border;
			var left = _props3$border.left;
			var right = _props3$border.right;
			var bottom = _props3$border.bottom;
			var top = _props3$border.top;
			var children = _props3.children;

			var others = _objectWithoutProperties(_props3, ["spacing", "border", "children"]);

			var _context = this.context;
			var height = _context.rowSize.height;
			var width = _context.cellSize.width;

			width -= spacing;
			height -= spacing;
			return _react2.default.createElement(
				_group2.default,
				others,
				top.sz && _react2.default.createElement("path", { strokeWidth: top.sz, stroke: top.color, d: "M0 0 L" + width + " 0" }),
				bottom.sz && _react2.default.createElement("path", { strokeWidth: bottom.sz, stroke: bottom.color, d: "M0 " + height + " L" + width + " " + height }),
				right.sz && _react2.default.createElement("path", { strokeWidth: right.sz, stroke: right.color, d: "M" + width + " 0 L" + width + " " + height }),
				left.sz && _react2.default.createElement("path", { strokeWidth: left.sz, stroke: left.color, d: "M0 0 L0 " + height }),
				_react2.default.createElement(
					_group2.default,
					{ x: left.sz, y: top.sz },
					children
				)
			);
		}
	}]);

	return Border;
}(_react.Component);

Border.contextTypes = {
	rowSize: _react.PropTypes.object,
	cellSize: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCOzs7Ozs7Ozs7OztxQ0FFRCxVQUFTO0FBQzNCLE9BQUksaUJBQWUsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsQ0FBdUMsUUFBdkMsQ0FBZixDQUR1QjtBQUUzQixVQUFPLEVBQUMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLFFBQVEsZUFBZSxNQUFmLEVBQXpDLENBRjJCOzs7O2lDQUtiLFdBQVU7Z0JBQ0osS0FBSyxLQUFMLENBREk7T0FDakIscUJBRGlCO09BQ1YsbUJBRFU7O0FBRXhCLE9BQUksU0FBTyxDQUFQO09BQVUsT0FBSyxJQUFMLENBRlU7O0FBSXhCLE9BQUksSUFBRSxDQUFGO09BQUssUUFBTSxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLENBQXJCLENBSlM7QUFLeEIsT0FBSSxlQUFhLFVBQVUsR0FBVixDQUFjLFVBQUMsS0FBRCxFQUFPLEtBQVAsRUFBZTtnQ0FDSCxLQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLFFBQXJCLENBQThCLEtBQTlCLEVBQXFDLFFBQXJDLEdBREc7O1FBQ3hDLHNDQUR3QztRQUNoQyxzQ0FEZ0M7UUFDeEIsd0NBRHdCO1FBQ2YsOENBRGU7O0FBRTdDLFFBQUksSUFBRSxDQUFGLENBRnlDO0FBRzdDLFFBQUksVUFBUSxNQUFNLEdBQU4sQ0FBVSxnQkFBTTtBQUMxQixTQUFJLElBQUU7O1FBQU8sR0FBRyxDQUFILEVBQVA7TUFBYyxJQUFkO01BQUYsQ0FEc0I7QUFFMUIsVUFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBRnVCO0FBRzFCLFlBQU8sQ0FBUCxDQUgwQjtLQUFOLENBQWxCLENBSHlDO0FBUTdDLFNBQUksVUFBUSxFQUFSLEdBQ0YsT0FBTyxHQUFQLENBQVcsRUFBWCxHQUNBLE9BQU8s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Q2dCLDJCQURoQjtPQUNxQiw2QkFEckI7T0FDMkIsK0JBRDNCO09BQ2tDLHlCQURsQztPQUN3Qyw0QkFEeEM7O09BQ3FELDhFQURyRDs7a0JBRWtDLEtBQUssT0FBTCxDQUZsQztPQUVPLGtCQUFULFFBQVMsT0FGUDtPQUUwQixpQkFBVixTQUFVLE1BRjFCOztBQUdQLFlBQU8sT0FBUCxDQUhPO0FBSVAsYUFBUSxPQUFSLENBSk87QUFLUCxVQUNDOztJQUFXLE1BQVg7SUFDRSxJQUFJLEVBQUosSUFBVSx3Q0FBTSxhQUFhLElBQUksRUFBSixFQUFRLFFBQVEsSUFBSSxLQUFKLEVBQVcsY0FBWSxZQUFaLEVBQTlDLENBQVY7SUFDQSxPQUFPLEVBQVAsSUFBYSx3Q0FBTSxhQUFhLE9BQU8sRUFBUCxFQUFXLFFBQVEsT0FBTyxLQUFQLEVBQWMsV0FBUyxnQkFBVyxjQUFTLE1BQTdCLEVBQXBELENBQWI7SUFDQSxNQUFNLEVBQU4sSUFBWSx3Q0FBTSxhQUFhLE1BQU0sRUFBTixFQUFVLFFBQVEsTUFBTSxLQUFOLEVBQWEsU0FBTyxpQkFBWSxjQUFTLE1BQTVCLEVBQWxELENBQVo7SUFDQSxLQUFLLEVBQUwsSUFBVyx3Q0FBTSxhQUFhLEtBQUssRUFBTCxFQUFTLFFBQVEsS0FBSyxLQUFMLEVBQVksZ0JBQWMsTUFBZCxFQUFoRCxDQUFYO0lBQ0Q7O09BQU8sR0FBRyxLQUFLLEVBQUwsRUFBUyxHQUFHLElBQUksRUFBSixFQUF0QjtLQUNFLFFBREY7S0FMRDtJQURELENBTE87Ozs7UUFMSDs7O09BQ0UsZUFBYTtBQUNuQixVQUFTLGlCQUFVLE1BQVY7QUFDVCxXQUFVLGlCQUFVLE1BQVYiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG4vKipcbiAqICBcbiAqICBcbiAqICBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb250YWluZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRhYmxlXCJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcblx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0cmV0dXJuIHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiBhdmFpbGFibGVTcGFjZS5oZWlnaHR9XG5cdH1cblx0XG5cdGFwcGVuZENvbXBvc2VkKGNvbEdyb3Vwcyl7XG5cdFx0Y29uc3Qge3dpZHRoLCBjb2xzfT10aGlzLnByb3BzXG5cdFx0bGV0IGhlaWdodD0wLCBzZWxmPXRoaXNcblx0XHRcblx0XHRsZXQgeD0wLCByb3dObz10aGlzLmNoaWxkcmVuLmxlbmd0aC0xXG5cdFx0bGV0IGdyb3Vwc1dpdGhYWT1jb2xHcm91cHMubWFwKChsaW5lcyxjb2xObyk9Pntcblx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmcsIGJhY2tncm91bmR9PXNlbGYuY2hpbGRyZW5bcm93Tm9dLmNoaWxkcmVuW2NvbE5vXS5nZXRTdHlsZSgpXG5cdFx0XHRsZXQgeT0wXG5cdFx0XHRsZXQgZ3JvdXBlZD1saW5lcy5tYXAobGluZT0+e1xuXHRcdFx0XHRcdGxldCBhPTxHcm91cCB5PXt5fT57bGluZX08L0dyb3VwPlxuXHRcdFx0XHRcdHkrPWxpbmUucHJvcHMuaGVpZ2h0XG5cdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0fSlcblx0XHRcdHkrPShzcGFjaW5nKi41XG5cdFx0XHRcdCtib3JkZXIudG9wLnN6XG5cdFx0XHRcdCttYXJnaW4udG9wXG5cdFx0XHRcdCttYXJnaW4uYm90dG9tXG5cdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XG5cdFx0XHRcdCtzcGFjaW5nKi41KVxuXHRcdFx0bGV0IGNlbGw9KFxuXHRcdFx0XHQ8Q2VsbCBoZWlnaHQ9e3l9IHg9e3h9IHdpZHRoPXtjb2xzW2NvbE5vXX0gYmFja2dyb3VuZD17YmFja2dyb3VuZH0+XG5cdFx0XHRcdFx0PFNwYWNpbmcgeD17c3BhY2luZy8yfSB5PXtzcGFjaW5nLzJ9PlxuXHRcdFx0XHRcdFx0PEJvcmRlciBib3JkZXI9e2JvcmRlcn0gc3BhY2luZz17c3BhY2luZ30+XG5cdFx0XHRcdFx0XHRcdDxNYXJnaW4geD17bWFyZ2luLmxlZnR9IHk9e21hcmdpbi50b3B9PlxuXHRcdFx0XHRcdFx0XHRcdHtncm91cGVkfVxuXHRcdFx0XHRcdFx0XHQ8L01hcmdpbj5cblx0XHRcdFx0XHRcdDwvQm9yZGVyPlxuXHRcdFx0XHRcdDwvU3BhY2luZz5cblx0XHRcdFx0PC9DZWxsPlx0XG5cdFx0XHQpO1xuXHRcdFx0eCs9Y29sc1tjb2xOb11cblx0XHRcdGhlaWdodD1NYXRoLm1heChoZWlnaHQseSlcblx0XHRcdHJldHVybiBjZWxsXG5cdFx0fSlcblx0XHRcblx0XHRcblxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoe3dpZHRoLGhlaWdodCxjaGlsZHJlbjpncm91cHNXaXRoWFl9KSlcblx0fVxuXHRcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPFJvdyB7Li4ucHJvcHN9Lz5cblx0fVxuXHRcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0aXNGaXJzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNMYXN0Um93OiBQcm9wVHlwZXMuZnVuY1xuXHR9LCBDb250YWluZXIuY2hpbGRDb250ZXh0VHlwZXMpXG5cdFxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRsZXQgY2hpbGRyZW49dGhpcy5jaGlsZHJlblxuXHRcdGxldCBjb250ZW50PXRoaXMuc3RhdGUuY29udGVudFxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuY29udGVudFN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuLmxlbmd0aD09Y29udGVudC5sZW5ndGgtMVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cbn1cblxuY2xhc3MgU3BhY2luZyBleHRlbmRzIEdyb3Vwe31cbmNsYXNzIE1hcmdpbiBleHRlbmRzIEdyb3Vwe31cblxuY2xhc3MgQ2VsbCBleHRlbmRzIEdyb3Vwe1xuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRjZWxsU2l6ZTogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdFxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdGNlbGxTaXplOlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXHRcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNlbGxTaXplOiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0LCBiYWNrZ3JvdW5kLCBjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB7Li4ub3RoZXJzfT5cblx0XHRcdFx0e2JhY2tncm91bmQgJiYgKDxyZWN0IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9e2JhY2tncm91bmR9Lz4pfVxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXHRcbn1cblxuY2xhc3MgUm93IGV4dGVuZHMgR3JvdXB7XG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cm93U2l6ZTpQcm9wVHlwZXMub2JqZWN0XG5cdH1cblx0XG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRyb3dTaXplOiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIEJvcmRlciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm93U2l6ZTogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRjZWxsU2l6ZTogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzcGFjaW5nLGJvcmRlcjp7bGVmdCxyaWdodCxib3R0b20sdG9wfSwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGxldCB7cm93U2l6ZTp7aGVpZ2h0fSwgY2VsbFNpemU6e3dpZHRofX09dGhpcy5jb250ZXh0XG5cdFx0d2lkdGgtPXNwYWNpbmdcblx0XHRoZWlnaHQtPXNwYWNpbmdcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9Plx0XG5cdFx0XHRcdHt0b3Auc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e3RvcC5zen0gc3Ryb2tlPXt0b3AuY29sb3J9IGQ9e2BNMCAwIEwke3dpZHRofSAwYH0vPn1cblx0XHRcdFx0e2JvdHRvbS5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17Ym90dG9tLnN6fSBzdHJva2U9e2JvdHRvbS5jb2xvcn0gZD17YE0wICR7aGVpZ2h0fSBMJHt3aWR0aH0gJHtoZWlnaHR9YH0vPn1cblx0XHRcdFx0e3JpZ2h0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtyaWdodC5zen0gc3Ryb2tlPXtyaWdodC5jb2xvcn0gZD17YE0ke3dpZHRofSAwIEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxuXHRcdFx0XHR7bGVmdC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17bGVmdC5zen0gc3Ryb2tlPXtsZWZ0LmNvbG9yfSBkPXtgTTAgMCBMMCAke2hlaWdodH1gfS8+fVx0XHRcdFxuXHRcdFx0XHQ8R3JvdXAgeD17bGVmdC5zen0geT17dG9wLnN6fT5cblx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0XHRcblx0fVxufVxuIl19