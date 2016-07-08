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

Table.displayName = "table";
exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3FDQUVELFVBQVM7QUFDM0IsT0FBSSxpQkFBZSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFmLENBRHVCO0FBRTNCLFVBQU8sRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsUUFBUSxlQUFlLE1BQWYsRUFBekMsQ0FGMkI7Ozs7aUNBSWIsV0FBVTs7O2dCQUNKLEtBQUssS0FBTCxDQURJO09BQ2pCLHFCQURpQjtPQUNWLG1CQURVOztBQUV4QixPQUFJLFNBQU8sQ0FBUCxDQUZvQjs7QUFJeEIsT0FBSSxJQUFFLENBQUY7T0FBSyxRQUFNLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FKUztBQUt4QixPQUFJLGVBQWEsVUFBVSxHQUFWLENBQWMsVUFBQyxLQUFELEVBQU8sS0FBUCxFQUFlO0FBQzdDLFFBQUksSUFBRSxDQUFGLENBRHlDO0FBRTdDLFFBQUksVUFBUSxNQUFNLEdBQU4sQ0FBVSxnQkFBTTtBQUMxQixTQUFJLElBQUU7O1FBQU8sR0FBRyxDQUFILEVBQVA7TUFBYyxJQUFkO01BQUYsQ0FEc0I7QUFFMUIsVUFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBRnVCO0FBRzFCLFlBQU8sQ0FBUCxDQUgwQjtLQUFOLENBQWxCLENBRnlDO0FBTzdDLFFBQUksT0FBTTs7T0FBTyxRQUFRLENBQVIsRUFBVyxHQUFHLENBQUgsRUFBbEI7S0FBeUIsT0FBekI7S0FBTixDQVB5QztBQVE3QyxTQUFHLEtBQUssS0FBTCxDQUFILENBUjZDO0FBUzdDLGFBQU8sS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFnQixDQUFoQixDQUFQLENBVDZDO0FBVTdDLFdBQU8sSUFBUCxDQVY2QztJQUFmLENBQTNCLENBTG9COztBQWtCeEIsT0FBRSxDQUFGLENBbEJ3QjtBQW1CeEIsT0FBSSxVQUFRLGFBQWEsR0FBYixDQUFpQixVQUFDLENBQUQsRUFBRyxLQUFIO1dBQVcsT0FBSyxPQUFMLENBQWEsS0FBYixFQUFvQixLQUFwQixFQUEyQixLQUFLLEtBQUwsQ0FBM0IsRUFBd0MsTUFBeEMsRUFBK0MsQ0FBL0MsRUFBa0QsS0FBRyxLQUFLLEtBQUwsQ0FBSDtJQUE3RCxDQUF6QixDQW5Cb0I7O0FBcUJ4QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DOztNQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFyQjtJQUFzQyxPQUF0QztJQUErQyxZQUEvQztJQUFuQyxFQXJCd0I7Ozs7MEJBd0JqQixPQUFPLE9BQU8sT0FBTyxRQUFRLEdBQUU7QUFDdEMsVUFBUTs7TUFBTyxHQUFHLENBQUgsRUFBUDtJQUFhO0FBQ3BCLGtCQUFhLENBQWI7QUFDQSxhQUFPLE9BQVA7QUFDQSxXQUFLLE1BQUw7QUFDQSxtQkFBWSxpQkFBWSxjQUFTLGtCQUFhLGdCQUE5QyxFQUpvQixDQUFiO0lBQVIsQ0FEc0M7Ozs7UUE5Qm5COzs7TUFDYixjQUFZO2tCQURDIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb250YWluZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRhYmxlXCJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcblx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0cmV0dXJuIHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiBhdmFpbGFibGVTcGFjZS5oZWlnaHR9XG5cdH1cblx0YXBwZW5kQ29tcG9zZWQoY29sR3JvdXBzKXtcblx0XHRjb25zdCB7d2lkdGgsIGNvbHN9PXRoaXMucHJvcHNcblx0XHRsZXQgaGVpZ2h0PTBcblxuXHRcdGxldCB4PTAsIHJvd05vPXRoaXMuY2hpbGRyZW4ubGVuZ3RoXG5cdFx0bGV0IGdyb3Vwc1dpdGhYWT1jb2xHcm91cHMubWFwKChsaW5lcyxjb2xObyk9Pntcblx0XHRcdGxldCB5PTBcblx0XHRcdGxldCBncm91cGVkPWxpbmVzLm1hcChsaW5lPT57XG5cdFx0XHRcdFx0bGV0IGE9PEdyb3VwIHk9e3l9PntsaW5lfTwvR3JvdXA+XG5cdFx0XHRcdFx0eSs9bGluZS5wcm9wcy5oZWlnaHRcblx0XHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0XHR9KVxuXHRcdFx0bGV0IGNlbGw9KDxHcm91cCBoZWlnaHQ9e3l9IHg9e3h9Pntncm91cGVkfTwvR3JvdXA+KVxuXHRcdFx0eCs9Y29sc1tjb2xOb11cblx0XHRcdGhlaWdodD1NYXRoLm1heChoZWlnaHQseSlcblx0XHRcdHJldHVybiBjZWxsXG5cdFx0fSlcblxuXHRcdHg9MFxuXHRcdGxldCBib3JkZXJzPWdyb3Vwc1dpdGhYWS5tYXAoKGEsY29sTm8pPT50aGlzLmJvcmRlcnMocm93Tm8sIGNvbE5vLCBjb2xzW2NvbE5vXSwgaGVpZ2h0LHgsIHgrPWNvbHNbY29sTm9dKSlcblxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pntib3JkZXJzfXtncm91cHNXaXRoWFl9PC9Hcm91cD4pXG5cdH1cblxuXHRib3JkZXJzKHJvd05vLCBjb2xObywgd2lkdGgsIGhlaWdodCwgeCl7XG5cdFx0cmV0dXJuICg8R3JvdXAgeD17eH0+PHBhdGhcblx0XHRcdHN0cm9rZVdpZHRoPXsxfVxuXHRcdFx0c3Ryb2tlPVwiYmxhY2tcIlxuXHRcdFx0ZmlsbD1cIm5vbmVcIlxuXHRcdFx0ZD17YE0wIDAgTCR7d2lkdGh9IDAgTCR7d2lkdGh9ICR7aGVpZ2h0fSBMMCAke2hlaWdodH0gTDAgMGB9Lz48L0dyb3VwPilcblx0fVxufVxuIl19