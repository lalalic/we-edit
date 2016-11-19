"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_editable) {
	(0, _inherits3.default)(_class, _editable);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			this.computed.composed.push(props);
			var row = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "createComposed2Parent", this).call(this, props);
			var _row$props = row.props,
			    width = _row$props.width,
			    height = _row$props.height;

			var ps = { width: width, height: height };
			if (this.computed.composed.length == 1) //that's why fill this.computed.composed in appendComposed
				ps.id = this.id;
			return _react2.default.createElement(
				_group2.default,
				ps,
				row
			);
		}
	}, {
		key: "_isLastComposedFitIntoParent",
		value: function _isLastComposedFitIntoParent() {
			return true;
		}

		/**
   *  isAllChildrenComposed will affect last line height, so here we need make it right
   */

	}, {
		key: "appendLastComposed",
		value: function appendLastComposed() {
			var _this2 = this;

			var _nextAvailableSpace = this.nextAvailableSpace(),
			    width = _nextAvailableSpace.width,
			    height = _nextAvailableSpace.height;

			var _computed$lastCompose = (0, _slicedToArray3.default)(this.computed.lastComposed, 1),
			    tableWidth = _computed$lastCompose[0].width;

			var tableHeight = this.computed.lastComposed.reduce(function (prev, line) {
				return prev + line.height;
			}, 0);
			if (tableHeight <= height && tableWidth <= width) {
				(function () {
					var parent = _this2.context.parent;

					_this2.computed.lastComposed.forEach(function (line) {
						return parent.appendComposed(_this2.createComposed2Parent(line));
					});
				})();
			} else {
				var children = this.computed.children.splice(0);
				children.forEach(function (row) {
					row.onAllChildrenComposed();
				});
			}

			this.computed.lastComposed = null;
			(0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);
	return _class;
}((0, _editable3.default)(_content.Table));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOlsicHJvcHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsInJvdyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJsZW5ndGgiLCJpZCIsIm5leHRBdmFpbGFibGVTcGFjZSIsImxhc3RDb21wb3NlZCIsInRhYmxlV2lkdGgiLCJ0YWJsZUhlaWdodCIsInJlZHVjZSIsInByZXYiLCJsaW5lIiwicGFyZW50IiwiY29udGV4dCIsImZvckVhY2giLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImNoaWxkcmVuIiwic3BsaWNlIiwib25BbGxDaGlsZHJlbkNvbXBvc2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O3dDQUd1QkEsSyxFQUFNO0FBQzNCLFFBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsSUFBdkIsQ0FBNEJILEtBQTVCO0FBQ0EsT0FBSUksa0pBQWdDSixLQUFoQyxDQUFKO0FBRjJCLG9CQUdSSSxJQUFJSixLQUhJO0FBQUEsT0FHdEJLLEtBSHNCLGNBR3RCQSxLQUhzQjtBQUFBLE9BR2hCQyxNQUhnQixjQUdoQkEsTUFIZ0I7O0FBSTNCLE9BQUlDLEtBQUcsRUFBQ0YsWUFBRCxFQUFPQyxjQUFQLEVBQVA7QUFDQSxPQUFHLEtBQUtMLFFBQUwsQ0FBY0MsUUFBZCxDQUF1Qk0sTUFBdkIsSUFBK0IsQ0FBbEMsRUFBb0M7QUFDbkNELE9BQUdFLEVBQUgsR0FBTSxLQUFLQSxFQUFYO0FBQ0QsVUFBTztBQUFBO0FBQVdGLE1BQVg7QUFBZ0JIO0FBQWhCLElBQVA7QUFDQTs7O2lEQUU2QjtBQUM3QixVQUFPLElBQVA7QUFDQTs7QUFFRDs7Ozs7O3VDQUdvQjtBQUFBOztBQUFBLDZCQUNBLEtBQUtNLGtCQUFMLEVBREE7QUFBQSxPQUNkTCxLQURjLHVCQUNkQSxLQURjO0FBQUEsT0FDUkMsTUFEUSx1QkFDUkEsTUFEUTs7QUFBQSw0REFFTSxLQUFLTCxRQUFMLENBQWNVLFlBRnBCO0FBQUEsT0FFUEMsVUFGTyw0QkFFYlAsS0FGYTs7QUFHbkIsT0FBSVEsY0FBWSxLQUFLWixRQUFMLENBQWNVLFlBQWQsQ0FBMkJHLE1BQTNCLENBQWtDLFVBQUNDLElBQUQsRUFBT0MsSUFBUDtBQUFBLFdBQWNELE9BQUtDLEtBQUtWLE1BQXhCO0FBQUEsSUFBbEMsRUFBaUUsQ0FBakUsQ0FBaEI7QUFDQSxPQUFHTyxlQUFhUCxNQUFiLElBQXVCTSxjQUFZUCxLQUF0QyxFQUE0QztBQUFBO0FBQUEsU0FDcENZLE1BRG9DLEdBQzVCLE9BQUtDLE9BRHVCLENBQ3BDRCxNQURvQzs7QUFFM0MsWUFBS2hCLFFBQUwsQ0FBY1UsWUFBZCxDQUEyQlEsT0FBM0IsQ0FBbUM7QUFBQSxhQUFNRixPQUFPRyxjQUFQLENBQXNCLE9BQUtDLHFCQUFMLENBQTJCTCxJQUEzQixDQUF0QixDQUFOO0FBQUEsTUFBbkM7QUFGMkM7QUFHM0MsSUFIRCxNQUdLO0FBQ0osUUFBSU0sV0FBUyxLQUFLckIsUUFBTCxDQUFjcUIsUUFBZCxDQUF1QkMsTUFBdkIsQ0FBOEIsQ0FBOUIsQ0FBYjtBQUNBRCxhQUFTSCxPQUFULENBQWlCLGVBQUs7QUFDckJmLFNBQUlvQixxQkFBSjtBQUNBLEtBRkQ7QUFHQTs7QUFFRCxRQUFLdkIsUUFBTCxDQUFjVSxZQUFkLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTs7O0VBbEMyQix1QyIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmltcG9ydCB7VGFibGV9IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoVGFibGUpe1xuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChwcm9wcylcblx0XHRsZXQgcm93PXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcylcblx0XHRsZXQge3dpZHRoLGhlaWdodH09cm93LnByb3BzXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHR9XG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTEpLy90aGF0J3Mgd2h5IGZpbGwgdGhpcy5jb21wdXRlZC5jb21wb3NlZCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdFx0cHMuaWQ9dGhpcy5pZFxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57cm93fTwvR3JvdXA+XG5cdH1cblxuXHRfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KCl7XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG5cdC8qKlxuXHQgKiAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHdpbGwgYWZmZWN0IGxhc3QgbGluZSBoZWlnaHQsIHNvIGhlcmUgd2UgbmVlZCBtYWtlIGl0IHJpZ2h0XG5cdCAqL1xuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcblx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdGxldCBbe3dpZHRoOnRhYmxlV2lkdGh9XT10aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZFxuXHRcdGxldCB0YWJsZUhlaWdodD10aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5yZWR1Y2UoKHByZXYsIGxpbmUpPT5wcmV2K2xpbmUuaGVpZ2h0LDApXG5cdFx0aWYodGFibGVIZWlnaHQ8PWhlaWdodCAmJiB0YWJsZVdpZHRoPD13aWR0aCl7XG5cdFx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmZvckVhY2gobGluZT0+cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGxpbmUpKSlcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdFx0Y2hpbGRyZW4uZm9yRWFjaChyb3c9Pntcblx0XHRcdFx0cm93Lm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG4iXX0=