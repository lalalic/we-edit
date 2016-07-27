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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var header = function (_Any) {
	_inherits(header, _Any);

	function header() {
		_classCallCheck(this, header);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(header).apply(this, arguments));
	}

	_createClass(header, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var _context$parent$props = this.context.parent.props;
			var width = _context$parent$props.pgSz.width;
			var _context$parent$props2 = _context$parent$props.pgMar;
			var right = _context$parent$props2.right;
			var left = _context$parent$props2.left;

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
			_get(Object.getPrototypeOf(header.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var composed = this.computed.composed;

			var size = composed.reduce(function (p, _ref) {
				var _ref$props = _ref.props;
				var width = _ref$props.width;
				var height = _ref$props.height;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2hlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3VDQUVBOytCQUNzQixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQXBCLENBRHRCO09BQ04sOEJBQU4sS0FBTSxNQURNO3NEQUNFLE1BREY7T0FDUyxxQ0FEVDtPQUNlLG1DQURmOztBQUVuQixVQUFPLEVBQUMsT0FBTSxRQUFNLEtBQU4sR0FBWSxJQUFaLEVBQWlCLFFBQU8sT0FBTyxTQUFQLEVBQXRDLENBRm1COzs7O2lDQUtMLE1BQUs7QUFDbkIsUUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixFQURtQjs7OzswQ0FJRztBQUN0Qiw4QkFabUIsNERBWW5CLENBRHNCOzs7OzBDQUlBO09BQ2YsV0FBVSxLQUFLLFFBQUwsQ0FBVixTQURlOztBQUV0QixPQUFJLE9BQUssU0FBUyxNQUFULENBQ1IsVUFBQyxDQUFEOzBCQUFLO1FBQU87UUFBTTtXQUFZLEVBQUMsT0FBTSxLQUFLLEdBQUwsQ0FBUyxFQUFFLEtBQUYsRUFBUyxLQUFsQixDQUFOLEVBQStCLFFBQU8sRUFBRSxNQUFGLEdBQVMsTUFBVDtJQUFyRSxFQUNDLEVBQUMsT0FBTSxDQUFOLEVBQVEsUUFBTyxDQUFQLEVBRkYsQ0FBTCxDQUZrQjtBQU10QixVQUFROztJQUFXLElBQVg7SUFBa0IsUUFBbEI7SUFBUixDQU5zQjs7OztRQWZIOzs7T0FDYixjQUFZO2tCQURDIiwiZmlsZSI6ImhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWRlciBleHRlbmRzIEFueXtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJoZWFkZXJcIlxyXG5cdG5leHRBdmFpbGFibGVTcGFjZSgpe1xyXG5cdFx0Y29uc3Qge3BnU3o6e3dpZHRofSwgcGdNYXI6e3JpZ2h0LGxlZnR9fT10aGlzLmNvbnRleHQucGFyZW50LnByb3BzXHJcblx0XHRyZXR1cm4ge3dpZHRoOndpZHRoLXJpZ2h0LWxlZnQsaGVpZ2h0Ok51bWJlci5NQVhfVkFMVUV9XHJcblx0fVxyXG5cdFxyXG5cdGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKGxpbmUpXHJcblx0fVxyXG5cdFxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblx0XHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGxldCBzaXplPWNvbXBvc2VkLnJlZHVjZShcclxuXHRcdFx0KHAsIHtwcm9wczp7d2lkdGgsaGVpZ2h0fX0pPT4oe3dpZHRoOk1hdGgubWF4KHAud2lkdGgsIHdpZHRoKSxoZWlnaHQ6cC5oZWlnaHQraGVpZ2h0fSlcclxuXHRcdFx0LHt3aWR0aDowLGhlaWdodDowfVxyXG5cdFx0KVxyXG5cdFx0cmV0dXJuICg8R3JvdXAgey4uLnNpemV9Pntjb21wb3NlZH08L0dyb3VwPilcclxuXHR9XHJcbn1cclxuIl19