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

var header = function (_Any) {
	(0, _inherits3.default)(header, _Any);

	function header() {
		(0, _classCallCheck3.default)(this, header);
		return (0, _possibleConstructorReturn3.default)(this, (header.__proto__ || (0, _getPrototypeOf2.default)(header)).apply(this, arguments));
	}

	(0, _createClass3.default)(header, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var _context$parent$props = this.context.parent.props,
			    width = _context$parent$props.pgSz.width,
			    _context$parent$props2 = _context$parent$props.pgMar,
			    right = _context$parent$props2.right,
			    left = _context$parent$props2.left;

			return { width: width - right - left, height: Number.MAX_VALUE };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
			this.computed.composed.push(line);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			(0, _get3.default)(header.prototype.__proto__ || (0, _getPrototypeOf2.default)(header.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var composed = this.computed.composed;

			var size = composed.reduce(function (p, _ref) {
				var _ref$props = _ref.props,
				    width = _ref$props.width,
				    height = _ref$props.height;
				return { width: Math.max(p.width, width), height: p.height + height };
			}, { width: 0, height: 0 });
			return _react2.default.createElement(
				_group2.default,
				size,
				composed
			);
		}
	}]);
	return header;
}(_any2.default);

header.displayName = "header";
exports.default = header;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2hlYWRlci5qcyJdLCJuYW1lcyI6WyJoZWFkZXIiLCJjb250ZXh0IiwicGFyZW50IiwicHJvcHMiLCJ3aWR0aCIsInBnU3oiLCJwZ01hciIsInJpZ2h0IiwibGVmdCIsImhlaWdodCIsIk51bWJlciIsIk1BWF9WQUxVRSIsImxpbmUiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsInNpemUiLCJyZWR1Y2UiLCJwIiwiTWF0aCIsIm1heCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozt1Q0FFQTtBQUFBLCtCQUNzQixLQUFLQyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLEtBRDFDO0FBQUEsT0FDTkMsS0FETSx5QkFDWkMsSUFEWSxDQUNORCxLQURNO0FBQUEsc0RBQ0VFLEtBREY7QUFBQSxPQUNTQyxLQURULDBCQUNTQSxLQURUO0FBQUEsT0FDZUMsSUFEZiwwQkFDZUEsSUFEZjs7QUFFbkIsVUFBTyxFQUFDSixPQUFNQSxRQUFNRyxLQUFOLEdBQVlDLElBQW5CLEVBQXdCQyxRQUFPQyxPQUFPQyxTQUF0QyxFQUFQO0FBQ0E7OztpQ0FFY0MsSSxFQUFLO0FBQ25CLFFBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsSUFBdkIsQ0FBNEJILElBQTVCO0FBQ0E7OzswQ0FFc0I7QUFDdEI7QUFDQTs7OzBDQUVzQjtBQUFBLE9BQ2ZFLFFBRGUsR0FDTCxLQUFLRCxRQURBLENBQ2ZDLFFBRGU7O0FBRXRCLE9BQUlFLE9BQUtGLFNBQVNHLE1BQVQsQ0FDUixVQUFDQyxDQUFEO0FBQUEsMEJBQUtmLEtBQUw7QUFBQSxRQUFZQyxLQUFaLGNBQVlBLEtBQVo7QUFBQSxRQUFrQkssTUFBbEIsY0FBa0JBLE1BQWxCO0FBQUEsV0FBOEIsRUFBQ0wsT0FBTWUsS0FBS0MsR0FBTCxDQUFTRixFQUFFZCxLQUFYLEVBQWtCQSxLQUFsQixDQUFQLEVBQWdDSyxRQUFPUyxFQUFFVCxNQUFGLEdBQVNBLE1BQWhELEVBQTlCO0FBQUEsSUFEUSxFQUVQLEVBQUNMLE9BQU0sQ0FBUCxFQUFTSyxRQUFPLENBQWhCLEVBRk8sQ0FBVDtBQUlBLFVBQVE7QUFBQTtBQUFXTyxRQUFYO0FBQWtCRjtBQUFsQixJQUFSO0FBQ0E7Ozs7O0FBdEJtQmQsTSxDQUNicUIsVyxHQUFZLFE7a0JBRENyQixNIiwiZmlsZSI6ImhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWRlciBleHRlbmRzIEFueXtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJoZWFkZXJcIlxyXG5cdG5leHRBdmFpbGFibGVTcGFjZSgpe1xyXG5cdFx0Y29uc3Qge3BnU3o6e3dpZHRofSwgcGdNYXI6e3JpZ2h0LGxlZnR9fT10aGlzLmNvbnRleHQucGFyZW50LnByb3BzXHJcblx0XHRyZXR1cm4ge3dpZHRoOndpZHRoLXJpZ2h0LWxlZnQsaGVpZ2h0Ok51bWJlci5NQVhfVkFMVUV9XHJcblx0fVxyXG5cdFxyXG5cdGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKGxpbmUpXHJcblx0fVxyXG5cdFxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblx0XHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGxldCBzaXplPWNvbXBvc2VkLnJlZHVjZShcclxuXHRcdFx0KHAsIHtwcm9wczp7d2lkdGgsaGVpZ2h0fX0pPT4oe3dpZHRoOk1hdGgubWF4KHAud2lkdGgsIHdpZHRoKSxoZWlnaHQ6cC5oZWlnaHQraGVpZ2h0fSlcclxuXHRcdFx0LHt3aWR0aDowLGhlaWdodDowfVxyXG5cdFx0KVxyXG5cdFx0cmV0dXJuICg8R3JvdXAgey4uLnNpemV9Pntjb21wb3NlZH08L0dyb3VwPilcclxuXHR9XHJcbn1cclxuIl19