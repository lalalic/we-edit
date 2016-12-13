"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function (_Any) {
	(0, _inherits3.default)(Row, _Any);

	function Row() {
		(0, _classCallCheck3.default)(this, Row);
		return (0, _possibleConstructorReturn3.default)(this, (Row.__proto__ || (0, _getPrototypeOf2.default)(Row)).apply(this, arguments));
	}

	(0, _createClass3.default)(Row, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"tr",
				null,
				this.getContent()
			);
		}
	}, {
		key: "appendComposed",
		value: function appendComposed() {}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed() {
			this.computed.composed.push([]);
			(0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "on1ChildComposed", this).apply(this, arguments);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var w = 0,
			    h = 0;
			var positionedCells = this.computed.children.map(function (cell, i) {
				var composedCell = cell.createComposed2Parent();
				var _composedCell$props = composedCell.props,
				    width = _composedCell$props.width,
				    height = _composedCell$props.height;

				h = Math.max(h, height);
				var positionedCell = _react2.default.createElement(
					_group2.default,
					{ x: w, key: i },
					composedCell
				);

				w += width;
				return positionedCell;
			});

			return _react2.default.createElement(
				ComposedRow,
				{ width: w, height: h },
				positionedCells
			);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			this.computed.composed.splice(this.computed.children.length); //on1ChildComposed will always add 1
			(0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);
	return Row;
}(_any2.default);

Row.displayName = "row";
exports.default = Row;

var ComposedRow = function (_Group) {
	(0, _inherits3.default)(ComposedRow, _Group);

	function ComposedRow() {
		(0, _classCallCheck3.default)(this, ComposedRow);
		return (0, _possibleConstructorReturn3.default)(this, (ComposedRow.__proto__ || (0, _getPrototypeOf2.default)(ComposedRow)).apply(this, arguments));
	}

	(0, _createClass3.default)(ComposedRow, [{
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
	return ComposedRow;
}(_group2.default);

ComposedRow.childContextTypes = {
	rowSize: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6WyJSb3ciLCJnZXRDb250ZW50IiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInB1c2giLCJhcmd1bWVudHMiLCJ3IiwiaCIsInBvc2l0aW9uZWRDZWxscyIsImNoaWxkcmVuIiwibWFwIiwiY2VsbCIsImkiLCJjb21wb3NlZENlbGwiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJwcm9wcyIsIndpZHRoIiwiaGVpZ2h0IiwiTWF0aCIsIm1heCIsInBvc2l0aW9uZWRDZWxsIiwic3BsaWNlIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJDb21wb3NlZFJvdyIsInJvd1NpemUiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7MkJBRVo7QUFDUCxVQUFPO0FBQUE7QUFBQTtBQUFLLFNBQUtDLFVBQUw7QUFBTCxJQUFQO0FBQ0E7OzttQ0FFZSxDQUVmOzs7cUNBR2lCO0FBQ2pCLFFBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsSUFBdkIsQ0FBNEIsRUFBNUI7QUFDQSxxSUFBMEJDLFNBQTFCO0FBQ0E7OzswQ0FFc0I7QUFDdEIsT0FBSUMsSUFBRSxDQUFOO0FBQUEsT0FBUUMsSUFBRSxDQUFWO0FBQ0EsT0FBSUMsa0JBQWdCLEtBQUtOLFFBQUwsQ0FBY08sUUFBZCxDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFNQyxDQUFOLEVBQVU7QUFDeEQsUUFBSUMsZUFBYUYsS0FBS0cscUJBQUwsRUFBakI7QUFEd0QsOEJBRW5DRCxhQUFhRSxLQUZzQjtBQUFBLFFBRWpEQyxLQUZpRCx1QkFFakRBLEtBRmlEO0FBQUEsUUFFM0NDLE1BRjJDLHVCQUUzQ0EsTUFGMkM7O0FBR3hEVixRQUFFVyxLQUFLQyxHQUFMLENBQVNaLENBQVQsRUFBV1UsTUFBWCxDQUFGO0FBQ0EsUUFBSUcsaUJBQ0g7QUFBQTtBQUFBLE9BQU8sR0FBR2QsQ0FBVixFQUFhLEtBQUtNLENBQWxCO0FBQ0VDO0FBREYsS0FERDs7QUFNQVAsU0FBR1UsS0FBSDtBQUNBLFdBQU9JLGNBQVA7QUFDQSxJQVptQixDQUFwQjs7QUFjQSxVQUNDO0FBQUMsZUFBRDtBQUFBLE1BQWEsT0FBT2QsQ0FBcEIsRUFBdUIsUUFBUUMsQ0FBL0I7QUFDRUM7QUFERixJQUREO0FBS0E7OzswQ0FFc0I7QUFDdEIsUUFBS04sUUFBTCxDQUFjQyxRQUFkLENBQXVCa0IsTUFBdkIsQ0FBOEIsS0FBS25CLFFBQUwsQ0FBY08sUUFBZCxDQUF1QmEsTUFBckQsRUFEc0IsQ0FDc0M7QUFDNUQ7QUFDQTs7Ozs7QUExQ21CdEIsRyxDQUNidUIsVyxHQUFZLEs7a0JBREN2QixHOztJQThDZndCLFc7Ozs7Ozs7Ozs7b0NBS1k7QUFDaEIsVUFBTztBQUNOQyxhQUFTO0FBQ1JULFlBQU8sS0FBS0QsS0FBTCxDQUFXQyxLQURWO0FBRVJDLGFBQVEsS0FBS0YsS0FBTCxDQUFXRTtBQUZYO0FBREgsSUFBUDtBQU1BOzs7OztBQVpJTyxXLENBQ0VFLGlCLEdBQWtCO0FBQ3hCRCxVQUFRLGlCQUFVRTtBQURNLEMiLCJmaWxlIjoicm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgQW55e1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInJvd1wiXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHRyPnt0aGlzLmdldENvbnRlbnQoKX08L3RyPlxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQoKXtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQoKXtcclxuXHRcdGxldCB3PTAsaD0wXHJcblx0XHRsZXQgcG9zaXRpb25lZENlbGxzPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubWFwKChjZWxsLGkpPT57XHJcblx0XHRcdGxldCBjb21wb3NlZENlbGw9Y2VsbC5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxyXG5cdFx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0fT1jb21wb3NlZENlbGwucHJvcHNcclxuXHRcdFx0aD1NYXRoLm1heChoLGhlaWdodClcclxuXHRcdFx0bGV0IHBvc2l0aW9uZWRDZWxsPShcclxuXHRcdFx0XHQ8R3JvdXAgeD17d30ga2V5PXtpfT5cclxuXHRcdFx0XHRcdHtjb21wb3NlZENlbGx9XHJcblx0XHRcdFx0PC9Hcm91cD5cclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0dys9d2lkdGhcclxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uZWRDZWxsXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxDb21wb3NlZFJvdyB3aWR0aD17d30gaGVpZ2h0PXtofT5cclxuXHRcdFx0XHR7cG9zaXRpb25lZENlbGxzfVxyXG5cdFx0XHQ8L0NvbXBvc2VkUm93PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnNwbGljZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aCkvL29uMUNoaWxkQ29tcG9zZWQgd2lsbCBhbHdheXMgYWRkIDFcclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgQ29tcG9zZWRSb3cgZXh0ZW5kcyBHcm91cHtcclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0cm93U2l6ZTpQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJvd1NpemU6IHtcclxuXHRcdFx0XHR3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19