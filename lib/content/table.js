"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
			var _this2 = this;

			var _props = this.props;
			var width = _props.width;
			var cols = _props.cols;

			var height = 0;

			var x = 0,
			    rowNo = this.children.length;
			var groupsWithXY = colGroups.map(function (lines, colNo) {
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
				var cell = _react2.default.createElement(
					_group2.default,
					{ height: y, x: x },
					grouped
				);
				x += cols[colNo];
				height = Math.max(height, y);
				return cell;
			});

			x = 0;
			var borders = groupsWithXY.map(function (a, colNo) {
				return _this2.borders(rowNo, colNo, cols[colNo], height, x, x += cols[colNo]);
			});

			this.context.parent.appendComposed(_react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				borders,
				groupsWithXY
			));
		}
	}, {
		key: "borders",
		value: function borders(rowNo, colNo, width, height, x) {
			return _react2.default.createElement(
				_group2.default,
				{ x: x },
				_react2.default.createElement("path", {
					strokeWidth: 1,
					stroke: "black",
					fill: "none",
					d: "M0 0 L" + width + " 0 L" + width + " " + height + " L0 " + height + " L0 0" })
			);
		}
	}]);

	return Table;
}(_container2.default);

exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3FDQUNELFVBQVM7QUFDM0IsT0FBSSxpQkFBZSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFmLENBRHVCO0FBRTNCLFVBQU8sRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsUUFBUSxlQUFlLE1BQWYsRUFBekMsQ0FGMkI7Ozs7aUNBSWIsV0FBVTs7O2dCQUNKLEtBQUssS0FBTCxDQURJO09BQ2pCLHFCQURpQjtPQUNWLG1CQURVOztBQUV4QixPQUFJLFNBQU8sQ0FBUCxDQUZvQjs7QUFJeEIsT0FBSSxJQUFFLENBQUY7T0FBSyxRQUFNLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FKUztBQUt4QixPQUFJLGVBQWEsVUFBVSxHQUFWLENBQWMsVUFBQyxLQUFELEVBQU8sS0FBUCxFQUFlO0FBQzdDLFFBQUksSUFBRSxDQUFGLENBRHlDO0FBRTdDLFFBQUksVUFBUSxNQUFNLEdBQU4sQ0FBVSxnQkFBTTtBQUMxQixTQUFJLElBQUU7O1FBQU8sR0FBRyxDQUFILEVBQVA7TUFBYyxJQUFkO01BQUYsQ0FEc0I7QUFFMUIsVUFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBRnVCO0FBRzFCLFlBQU8sQ0FBUCxDQUgwQjtLQUFOLENBQWxCLENBRnlDO0FBTzdDLFFBQUksT0FBTTs7T0FBTyxRQUFRLENBQVIsRUFBVyxHQUFHLENBQUgsRUFBbEI7S0FBeUIsT0FBekI7S0FBTixDQVB5QztBQVE3QyxTQUFHLEtBQUssS0FBTCxDQUFILENBUjZDO0FBUzdDLGFBQU8sS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFnQixDQUFoQixDQUFQLENBVDZDO0FBVTdDLFdBQU8sSUFBUCxDQVY2QztJQUFmLENBQTNCLENBTG9COztBQWtCeEIsT0FBRSxDQUFGLENBbEJ3QjtBQW1CeEIsT0FBSSxVQUFRLGFBQWEsR0FBYixDQUFpQixVQUFDLENBQUQsRUFBRyxLQUFIO1dBQVcsT0FBSyxPQUFMLENBQWEsS0FBYixFQUFvQixLQUFwQixFQUEyQixLQUFLLEtBQUwsQ0FBM0IsRUFBd0MsTUFBeEMsRUFBK0MsQ0FBL0MsRUFBa0QsS0FBRyxLQUFLLEtBQUwsQ0FBSDtJQUE3RCxDQUF6QixDQW5Cb0I7O0FBcUJ4QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DOztNQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFyQjtJQUFzQyxPQUF0QztJQUErQyxZQUEvQztJQUFuQyxFQXJCd0I7Ozs7MEJBd0JqQixPQUFPLE9BQU8sT0FBTyxRQUFRLEdBQUU7QUFDdEMsVUFBUTs7TUFBTyxHQUFHLENBQUgsRUFBUDtJQUFhO0FBQ3BCLGtCQUFhLENBQWI7QUFDQSxhQUFPLE9BQVA7QUFDQSxXQUFLLE1BQUw7QUFDQSxtQkFBWSxpQkFBWSxjQUFTLGtCQUFhLGdCQUE5QyxFQUpvQixDQUFiO0lBQVIsQ0FEc0M7Ozs7UUE3Qm5CIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb250YWluZXJ7XG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XG5cdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHR9XG5cdGFwcGVuZENvbXBvc2VkKGNvbEdyb3Vwcyl7XG5cdFx0Y29uc3Qge3dpZHRoLCBjb2xzfT10aGlzLnByb3BzXG5cdFx0bGV0IGhlaWdodD0wXG5cdFx0XG5cdFx0bGV0IHg9MCwgcm93Tm89dGhpcy5jaGlsZHJlbi5sZW5ndGhcblx0XHRsZXQgZ3JvdXBzV2l0aFhZPWNvbEdyb3Vwcy5tYXAoKGxpbmVzLGNvbE5vKT0+e1xuXHRcdFx0bGV0IHk9MFxuXHRcdFx0bGV0IGdyb3VwZWQ9bGluZXMubWFwKGxpbmU9Pntcblx0XHRcdFx0XHRsZXQgYT08R3JvdXAgeT17eX0+e2xpbmV9PC9Hcm91cD5cblx0XHRcdFx0XHR5Kz1saW5lLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdH0pXG5cdFx0XHRsZXQgY2VsbD0oPEdyb3VwIGhlaWdodD17eX0geD17eH0+e2dyb3VwZWR9PC9Hcm91cD4pXG5cdFx0XHR4Kz1jb2xzW2NvbE5vXVxuXHRcdFx0aGVpZ2h0PU1hdGgubWF4KGhlaWdodCx5KVxuXHRcdFx0cmV0dXJuIGNlbGxcblx0XHR9KVxuXHRcdFxuXHRcdHg9MFxuXHRcdGxldCBib3JkZXJzPWdyb3Vwc1dpdGhYWS5tYXAoKGEsY29sTm8pPT50aGlzLmJvcmRlcnMocm93Tm8sIGNvbE5vLCBjb2xzW2NvbE5vXSwgaGVpZ2h0LHgsIHgrPWNvbHNbY29sTm9dKSlcblxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pntib3JkZXJzfXtncm91cHNXaXRoWFl9PC9Hcm91cD4pXG5cdH1cblx0XG5cdGJvcmRlcnMocm93Tm8sIGNvbE5vLCB3aWR0aCwgaGVpZ2h0LCB4KXtcblx0XHRyZXR1cm4gKDxHcm91cCB4PXt4fT48cGF0aCBcblx0XHRcdHN0cm9rZVdpZHRoPXsxfSBcblx0XHRcdHN0cm9rZT1cImJsYWNrXCJcblx0XHRcdGZpbGw9XCJub25lXCJcblx0XHRcdGQ9e2BNMCAwIEwke3dpZHRofSAwIEwke3dpZHRofSAke2hlaWdodH0gTDAgJHtoZWlnaHR9IEwwIDBgfS8+PC9Hcm91cD4pXG5cdH1cbn1cbiJdfQ==