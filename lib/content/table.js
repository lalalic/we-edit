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
				y += border.top.sz + border.bottom.sz + margin.top + margin.bottom + spacing;
				var cell = _react2.default.createElement(
					_group2.default,
					{ height: y, x: x },
					_react2.default.createElement(
						_group2.default,
						{ x: spacing, y: spacing / 2 },
						_react2.default.createElement(
							_group2.default,
							{ x: border.left ? border.left.sz : 0, y: border.left ? border.left.sz : 0 },
							_react2.default.createElement("path", { strokeWidth: border.top.sz, stroke: border.top.color, d: "M0 0 L" + (cols[colNo] - spacing * 0.5) + " 0" }),
							_react2.default.createElement("path", { strokeWidth: border.bottom.sz, stroke: border.bottom.color, d: "M0 " + (y - spacing * 0.5) + " L" + (cols[colNo] - spacing * 0.5) + " " + (y - spacing * 0.5) }),
							_react2.default.createElement("path", { strokeWidth: border.right.sz, stroke: border.right.color, d: "M" + (cols[colNo] - spacing * 0.5) + " 0 L" + (cols[colNo] - spacing * 0.5) + " " + (y - spacing * 0.5) }),
							_react2.default.createElement("path", { strokeWidth: border.left.sz, stroke: border.left.color, d: "M0 0 L0 " + (y - spacing * 0.5) }),
							_react2.default.createElement(
								_group2.default,
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

			this.context.parent.appendComposed(_react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				groupsWithXY
			));
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {

			return Object.assign(_get(Object.getPrototypeOf(Table.prototype), "getChildContext", this).call(this), {
				tableStyle: this.props.contentStyle
			});
		}
	}]);

	return Table;
}(_container2.default);

Table.displayName = "table";
Table.childContextTypes = Object.assign({
	tableStyle: _react.PropTypes.object
}, _container2.default.childContextTypes);
exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9xQjs7Ozs7Ozs7Ozs7cUNBRUQsVUFBUztBQUMzQixPQUFJLGlCQUFlLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLENBQXVDLFFBQXZDLENBQWYsQ0FEdUI7QUFFM0IsVUFBTyxFQUFDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFRLGVBQWUsTUFBZixFQUF6QyxDQUYyQjs7OztpQ0FLYixXQUFVO2dCQUNKLEtBQUssS0FBTCxDQURJO09BQ2pCLHFCQURpQjtPQUNWLG1CQURVOztBQUV4QixPQUFJLFNBQU8sQ0FBUDtPQUFVLE9BQUssSUFBTCxDQUZVOztBQUl4QixPQUFJLElBQUUsQ0FBRjtPQUFLLFFBQU0sS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixDQUFyQixDQUpTO0FBS3hCLE9BQUksZUFBYSxVQUFVLEdBQVYsQ0FBYyxVQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWU7Z0NBQ2YsS0FBSyxRQUFMLENBQWMsS0FBZCxFQUFxQixRQUFyQixDQUE4QixLQUE5QixFQUFxQyxRQUFyQyxHQURlOztRQUN4QyxzQ0FEd0M7UUFDaEMsc0NBRGdDO1FBQ3hCLHdDQUR3Qjs7QUFFN0MsUUFBSSxJQUFFLENBQUYsQ0FGeUM7QUFHN0MsUUFBSSxVQUFRLE1BQU0sR0FBTixDQUFVLGdCQUFNO0FBQzFCLFNBQUksSUFBRTs7UUFBTyxHQUFHLENBQUgsRUFBUDtNQUFjLElBQWQ7TUFBRixDQURzQjtBQUUxQixVQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FGdUI7QUFHMUIsWUFBTyxDQUFQLENBSDBCO0tBQU4sQ0FBbEIsQ0FIeUM7QUFRN0MsU0FBSSxPQUFPLEdBQVAsQ0FBVyxFQUFYLEdBQ0YsT0FBTyxNQUFQLENBQWMsRUFBZCxHQUNBLE9BQU8sR0FBUCxHQUNBLE9BQU8sTUFBUCxHQUNBLE9BSkUsQ0FSeUM7QUFhN0MsUUFBSSxPQUNIOztPQUFPLFFBQVEsQ0FBUixFQUFXLEdBQUcsQ0FBSCxFQUFsQjtLQUNDOztRQUFPLEdBQUcsT0FBSCxFQUFZLEdBQUcsVUFBUSxDQUFSLEVBQXRCO01BQ0M7O1NBQU8sR0FBRyxPQUFPLElBQVAsR0FBYyxPQUFPLElBQVAsQ0FBWSxFQUFaLEdBQWlCLENBQS9CLEVBQWtDLEdBQUcsT0FBTyxJQUFQLEdBQWMsT0FBTyxJQUFQLENBQVksRUFBWixHQUFpQixDQUEvQixFQUEvQztPQUNFLHdDQUFNLGFBQWEsT0FBTyxHQUFQLENBQVcsRUFBWCxFQUFlLFFBQVEsT0FBTyxHQUFQLENBQVcsS0FBWCxFQUFrQixlQUFZLEtBQUssS0FBTCxJQUFZLFVBQVEsR0FBUixRQUF4QixFQUE1RCxDQURGO09BRUUsd0NBQU0sYUFBYSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLFFBQVEsT0FBTyxNQUFQLENBQWMsS0FBZCxFQUFxQixZQUFTLElBQUUsVUFBUSxHQUFSLFlBQWdCLEtBQUssS0FBTCxJQUFZLFVBQVEsR0FBUixXQUFlLElBQUUsVUFBUSxHQUFSLENBQXhELEVBQWxFLENBRkY7T0FHRSx3Q0FBTSxhQUFhLE9BQU8sS0FBUCxDQUFhLEVBQWIsRUFBaUIsUUFBUSxPQUFPLEtBQVAsQ0FBYSxLQUFiLEVBQW9CLFVBQU8sS0FBSyxLQUFMLElBQVksVUFBUSxHQUFSLGNBQWtCLEtBQUssS0FBTCxJQUFZLFVBQVEsR0FBUixXQUFlLElBQUUsVUFBUSxHQUFSLENBQWxFLEVBQWhFLENBSEY7T0FJRSx3Q0FBTSxhQUFhLE9BQU8sSUFBUCxDQUFZLEVBQVosRUFBZ0IsUUFBUSxPQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLGlCQUFjLElBQUUsVUFBUSxHQUFSLENBQWhCLEVBQTlELENBSkY7T0FLQzs7VUFBTyxHQUFHLE9BQU8sSUFBUCxFQUFhLEdBQUcsT0FBTyxHQUFQLEVBQTFCO1FBQ0UsT0FERjtRQUxEO09BREQ7TUFERDtLQURHLENBYnlDO0FBNEI3QyxTQUFHLEtBQUssS0FBTCxDQUFILENBNUI2QztBQTZCN0MsYUFBTyxLQUFLLEdBQUwsQ0FBUyxNQUFULEVBQWdCLENBQWhCLENBQVAsQ0E3QjZDO0FBOEI3QyxXQUFPLElBQVAsQ0E5QjZDO0lBQWYsQ0FBM0IsQ0FMb0I7O0FBc0N4QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DOztNQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFyQjtJQUFzQyxZQUF0QztJQUFuQyxFQXRDd0I7Ozs7b0NBNkNSOztBQUVoQixVQUFPLE9BQU8sTUFBUCw0QkF0RFkscURBc0RaLEVBQXNDO0FBQzVDLGdCQUFZLEtBQUssS0FBTCxDQUFXLFlBQVg7SUFETixDQUFQLENBRmdCOzs7O1FBcERHOzs7TUFDYixjQUFZO0FBREMsTUFnRGIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3RDLGFBQVksaUJBQVUsTUFBVjtDQURZLEVBRXRCLG9CQUFVLGlCQUFWO2tCQWxEaUIiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG4vKipcbiAqICBcbiAqICBcbiAqICBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb250YWluZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRhYmxlXCJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcblx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0cmV0dXJuIHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiBhdmFpbGFibGVTcGFjZS5oZWlnaHR9XG5cdH1cblx0XG5cdGFwcGVuZENvbXBvc2VkKGNvbEdyb3Vwcyl7XG5cdFx0Y29uc3Qge3dpZHRoLCBjb2xzfT10aGlzLnByb3BzXG5cdFx0bGV0IGhlaWdodD0wLCBzZWxmPXRoaXNcblx0XHRcblx0XHRsZXQgeD0wLCByb3dObz10aGlzLmNoaWxkcmVuLmxlbmd0aC0xXG5cdFx0bGV0IGdyb3Vwc1dpdGhYWT1jb2xHcm91cHMubWFwKChsaW5lcyxjb2xObyk9Pntcblx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmd9PXNlbGYuY2hpbGRyZW5bcm93Tm9dLmNoaWxkcmVuW2NvbE5vXS5nZXRTdHlsZSgpXG5cdFx0XHRsZXQgeT0wXG5cdFx0XHRsZXQgZ3JvdXBlZD1saW5lcy5tYXAobGluZT0+e1xuXHRcdFx0XHRcdGxldCBhPTxHcm91cCB5PXt5fT57bGluZX08L0dyb3VwPlxuXHRcdFx0XHRcdHkrPWxpbmUucHJvcHMuaGVpZ2h0XG5cdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0fSlcblx0XHRcdHkrPShib3JkZXIudG9wLnN6XG5cdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XG5cdFx0XHRcdCttYXJnaW4udG9wXG5cdFx0XHRcdCttYXJnaW4uYm90dG9tXG5cdFx0XHRcdCtzcGFjaW5nKVxuXHRcdFx0bGV0IGNlbGw9KFxuXHRcdFx0XHQ8R3JvdXAgaGVpZ2h0PXt5fSB4PXt4fT5cblx0XHRcdFx0XHQ8R3JvdXAgeD17c3BhY2luZ30geT17c3BhY2luZy8yfT5cblx0XHRcdFx0XHRcdDxHcm91cCB4PXtib3JkZXIubGVmdCA/IGJvcmRlci5sZWZ0LnN6IDogMH0geT17Ym9yZGVyLmxlZnQgPyBib3JkZXIubGVmdC5zeiA6IDB9PlxuXHRcdFx0XHRcdFx0XHR7PHBhdGggc3Ryb2tlV2lkdGg9e2JvcmRlci50b3Auc3p9IHN0cm9rZT17Ym9yZGVyLnRvcC5jb2xvcn0gZD17YE0wIDAgTCR7Y29sc1tjb2xOb10tc3BhY2luZyowLjV9IDBgfS8+fVxuXHRcdFx0XHRcdFx0XHR7PHBhdGggc3Ryb2tlV2lkdGg9e2JvcmRlci5ib3R0b20uc3p9IHN0cm9rZT17Ym9yZGVyLmJvdHRvbS5jb2xvcn0gZD17YE0wICR7eS1zcGFjaW5nKjAuNX0gTCR7Y29sc1tjb2xOb10tc3BhY2luZyowLjV9ICR7eS1zcGFjaW5nKjAuNX1gfS8+fVxuXHRcdFx0XHRcdFx0XHR7PHBhdGggc3Ryb2tlV2lkdGg9e2JvcmRlci5yaWdodC5zen0gc3Ryb2tlPXtib3JkZXIucmlnaHQuY29sb3J9IGQ9e2BNJHtjb2xzW2NvbE5vXS1zcGFjaW5nKjAuNX0gMCBMJHtjb2xzW2NvbE5vXS1zcGFjaW5nKjAuNX0gJHt5LXNwYWNpbmcqMC41fWB9Lz59XG5cdFx0XHRcdFx0XHRcdHs8cGF0aCBzdHJva2VXaWR0aD17Ym9yZGVyLmxlZnQuc3p9IHN0cm9rZT17Ym9yZGVyLmxlZnQuY29sb3J9IGQ9e2BNMCAwIEwwICR7eS1zcGFjaW5nKjAuNX1gfS8+fVxuXHRcdFx0XHRcdFx0XHQ8R3JvdXAgeD17bWFyZ2luLmxlZnR9IHk9e21hcmdpbi50b3B9PlxuXHRcdFx0XHRcdFx0XHRcdHtncm91cGVkfVxuXHRcdFx0XHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0XHQ8L0dyb3VwPlx0XG5cdFx0XHQpO1xuXHRcdFx0eCs9Y29sc1tjb2xOb11cblx0XHRcdGhlaWdodD1NYXRoLm1heChoZWlnaHQseSlcblx0XHRcdHJldHVybiBjZWxsXG5cdFx0fSlcblxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pntncm91cHNXaXRoWFl9PC9Hcm91cD4pXG5cdH1cblx0XG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdH0sIENvbnRhaW5lci5jaGlsZENvbnRleHRUeXBlcylcblx0XG5cdGdldENoaWxkQ29udGV4dCgpe1xuXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuXHRcdFx0dGFibGVTdHlsZTogdGhpcy5wcm9wcy5jb250ZW50U3R5bGVcblx0XHR9KVxuXHR9XG59XG4iXX0=