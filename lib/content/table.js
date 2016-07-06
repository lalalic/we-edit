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
			var _props = this.props;
			var width = _props.width;
			var cols = _props.cols;


			var groupsWithY = colGroups.map(function (lines) {
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
				return _react2.default.createElement(
					_group2.default,
					{ height: y },
					grouped
				);
			});

			var height = groupsWithY.reduce(function (prev, group) {
				return Math.max(prev, group.props.height);
			}, 0);
			var x = 0;

			var groupsWithX = groupsWithY.map(function (group, i) {
				var a = _react2.default.createElement(
					_group2.default,
					{ x: x },
					group
				);
				x += cols[i];
				return a;
			});

			var line = _react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				groupsWithX
			);

			this.context.parent.appendComposed(line);
		}
	}]);

	return Table;
}(_container2.default);

exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3FDQUNELFVBQVM7QUFDM0IsT0FBSSxpQkFBZSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFmLENBRHVCO0FBRTNCLFVBQU8sRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsUUFBUSxlQUFlLE1BQWYsRUFBekMsQ0FGMkI7Ozs7aUNBSWIsV0FBVTtnQkFDSixLQUFLLEtBQUwsQ0FESTtPQUNqQixxQkFEaUI7T0FDVixtQkFEVTs7O0FBR3hCLE9BQUksY0FBWSxVQUFVLEdBQVYsQ0FBYyxpQkFBTztBQUNuQyxRQUFJLElBQUUsQ0FBRixDQUQrQjtBQUVuQyxRQUFJLFVBQVEsTUFBTSxHQUFOLENBQVUsZ0JBQU07QUFDMUIsU0FBSSxJQUFFOztRQUFPLEdBQUcsQ0FBSCxFQUFQO01BQWMsSUFBZDtNQUFGLENBRHNCO0FBRTFCLFVBQUcsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUZ1QjtBQUcxQixZQUFPLENBQVAsQ0FIMEI7S0FBTixDQUFsQixDQUYrQjtBQU9uQyxXQUFROztPQUFPLFFBQVEsQ0FBUixFQUFQO0tBQW1CLE9BQW5CO0tBQVIsQ0FQbUM7SUFBUCxDQUExQixDQUhvQjs7QUFheEIsT0FBSSxTQUFPLFlBQVksTUFBWixDQUFtQixVQUFDLElBQUQsRUFBTyxLQUFQO1dBQWUsS0FBSyxHQUFMLENBQVMsSUFBVCxFQUFlLE1BQU0sS0FBTixDQUFZLE1BQVo7SUFBOUIsRUFBa0QsQ0FBckUsQ0FBUCxDQWJvQjtBQWN4QixPQUFJLElBQUUsQ0FBRixDQWRvQjs7QUFnQnhCLE9BQUksY0FBWSxZQUFZLEdBQVosQ0FBZ0IsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFXO0FBQzFDLFFBQUksSUFBRTs7T0FBTyxHQUFHLENBQUgsRUFBUDtLQUFjLEtBQWQ7S0FBRixDQURzQztBQUUxQyxTQUFHLEtBQUssQ0FBTCxDQUFILENBRjBDO0FBRzFDLFdBQU8sQ0FBUCxDQUgwQztJQUFYLENBQTVCLENBaEJvQjs7QUFzQnhCLE9BQUksT0FBSzs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFBc0MsV0FBdEM7SUFBTCxDQXRCb0I7O0FBd0J4QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLElBQW5DLEVBeEJ3Qjs7OztRQUxMIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb250YWluZXJ7XG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XG5cdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHR9XG5cdGFwcGVuZENvbXBvc2VkKGNvbEdyb3Vwcyl7XG5cdFx0Y29uc3Qge3dpZHRoLCBjb2xzfT10aGlzLnByb3BzXG5cdFx0XG5cdFx0bGV0IGdyb3Vwc1dpdGhZPWNvbEdyb3Vwcy5tYXAobGluZXM9Pntcblx0XHRcdFx0bGV0IHk9MFxuXHRcdFx0XHRsZXQgZ3JvdXBlZD1saW5lcy5tYXAobGluZT0+e1xuXHRcdFx0XHRcdFx0bGV0IGE9PEdyb3VwIHk9e3l9PntsaW5lfTwvR3JvdXA+XG5cdFx0XHRcdFx0XHR5Kz1saW5lLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRyZXR1cm4gKDxHcm91cCBoZWlnaHQ9e3l9Pntncm91cGVkfTwvR3JvdXA+KVxuXHRcdFx0fSlcblx0XHRcblx0XHRsZXQgaGVpZ2h0PWdyb3Vwc1dpdGhZLnJlZHVjZSgocHJldiwgZ3JvdXApPT5NYXRoLm1heChwcmV2LCBncm91cC5wcm9wcy5oZWlnaHQpLDApXG5cdFx0bGV0IHg9MFxuXHRcdFxuXHRcdGxldCBncm91cHNXaXRoWD1ncm91cHNXaXRoWS5tYXAoKGdyb3VwLGkpPT57XG5cdFx0XHRsZXQgYT08R3JvdXAgeD17eH0+e2dyb3VwfTwvR3JvdXA+XG5cdFx0XHR4Kz1jb2xzW2ldXG5cdFx0XHRyZXR1cm4gYVxuXHRcdH0pXG5cdFx0XG5cdFx0bGV0IGxpbmU9PEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pntncm91cHNXaXRoWH08L0dyb3VwPlxuXHRcdFxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQobGluZSlcblx0fVxufVxuIl19