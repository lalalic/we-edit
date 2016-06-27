"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
	_inherits(Document, _HasChild);

	function Document() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Document);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { composed: [], width: _this.props.width, height: _this.props.height }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var _state = this.state;
			var composed = _state.composed;
			var width = _state.width;
			var height = _state.height;
			var _props = this.props;
			var children = _props.children;

			var others = _objectWithoutProperties(_props, ["children"]);

			var y = 0;
			return _react2.default.createElement(
				"svg",
				_extends({}, others, { width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				_react2.default.Children.map(children, function (section, i) {
					var _ref = composed[i] || {};

					var height = _ref.height;

					var a = _react2.default.createElement(
						_group2.default,
						{ key: i, y: y },
						section
					);
					y += height;
					return a;
				})
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _props2 = this.props;
			var width = _props2.width;
			var height = _props2.height;
			var pageGap = _props2.pageGap;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, height: height, pageGap: pageGap }
			});
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(size) {
			var _state2 = this.state;
			var composed = _state2.composed;
			var width = _state2.width;
			var height = _state2.height;

			composed.push(size);

			var minWidth = composed.reduce(function (prev, a) {
				return Math.max(prev, a.width);
			}, 0);
			var minHeight = composed.reduce(function (prev, a) {
				return prev + a.height;
			}, 0);

			if (minWidth > width) width = minWidth;

			if (minHeight > height) height = minHeight + this.props.pageGap;

			this.setState({ composed: composed, width: width, height: height });
		}
	}]);

	return Document;
}(_any.HasChild);

Document.childContextTypes = Object.assign({
	canvas: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: 600,
	height: 800,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLFVBQVMsRUFBVCxFQUFhLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVg7OztjQUQvQjs7MkJBRVQ7Z0JBQ3NCLEtBQUssS0FBTCxDQUR0QjtPQUNILDJCQURHO09BQ08scUJBRFA7T0FDYyx1QkFEZDtnQkFFa0IsS0FBSyxLQUFMLENBRmxCO09BRUgsMkJBRkc7O09BRVUsd0RBRlY7O0FBR1YsT0FBSSxJQUFFLENBQUYsQ0FITTtBQUlKLFVBQ0w7O2lCQUFTLFVBQVEsT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBQS9DO0lBRUUsZ0JBQU0sUUFBTixDQUFlLEdBQWYsQ0FBbUIsUUFBbkIsRUFBNkIsVUFBQyxPQUFELEVBQVUsQ0FBVixFQUFjO2dCQUM3QixTQUFTLENBQVQsS0FBYSxFQUFiLENBRDZCOztTQUNyQyxxQkFEcUM7O0FBRTFDLFNBQUksSUFBRzs7UUFBTyxLQUFLLENBQUwsRUFBUSxHQUFHLENBQUgsRUFBZjtNQUFzQixPQUF0QjtNQUFILENBRnNDO0FBRzFDLFVBQUcsTUFBSCxDQUgwQztBQUkxQyxZQUFPLENBQVAsQ0FKMEM7S0FBZCxDQUYvQjtJQURLLENBSkk7Ozs7b0NBbUJTO2lCQUNpQixLQUFLLEtBQUwsQ0FEakI7T0FDTixzQkFETTtPQUNBLHdCQURBO09BQ1EsMEJBRFI7O0FBRWIsVUFBTyxPQUFPLE1BQVAsNEJBdkJNLHdEQXVCTixFQUFzQztBQUN6QyxZQUFRLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBZSxnQkFBZixFQUFSO0lBREcsQ0FBUCxDQUZhOzs7O2lDQVdMLE1BQUs7aUJBQ1csS0FBSyxLQUFMLENBRFg7T0FDZCw0QkFEYztPQUNKLHNCQURJO09BQ0csd0JBREg7O0FBRW5CLFlBQVMsSUFBVCxDQUFjLElBQWQsRUFGbUI7O0FBSW5CLE9BQUksV0FBUyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLEtBQUssR0FBTCxDQUFTLElBQVQsRUFBZSxFQUFFLEtBQUY7SUFBMUIsRUFBbUMsQ0FBbkQsQ0FBVCxDQUplO0FBS25CLE9BQUksWUFBVSxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLE9BQUssRUFBRSxNQUFGO0lBQWhCLEVBQXlCLENBQXpDLENBQVYsQ0FMZTs7QUFPbkIsT0FBRyxXQUFTLEtBQVQsRUFDRixRQUFNLFFBQU4sQ0FERDs7QUFHQSxPQUFHLFlBQVUsTUFBVixFQUNGLFNBQU8sWUFBVSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRGxCOztBQUdBLFFBQUssUUFBTCxDQUFjLEVBQUMsa0JBQUQsRUFBVyxZQUFYLEVBQWtCLGNBQWxCLEVBQWQsRUFibUI7Ozs7UUFoQ0E7OztTQTRCVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0NBRGEsRUFFdkIsY0FBUyxpQkFBVDtBQTlCZSxTQWdEYixlQUFhO0FBQ25CLFFBQU8sR0FBUDtBQUNBLFNBQU8sR0FBUDtBQUNBLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBcERtQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRlPXtjb21wb3NlZDpbXSwgd2lkdGg6dGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OnRoaXMucHJvcHMuaGVpZ2h0fVxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZCwgd2lkdGgsIGhlaWdodH09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0bGV0IHk9MFxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PHN2ZyB7Li4ub3RoZXJzfSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoc2VjdGlvbiwgaSk9Pntcblx0XHRcdFx0XHRcdGxldCB7aGVpZ2h0fT1jb21wb3NlZFtpXXx8e31cblx0XHRcdFx0XHRcdGxldCBhPSg8R3JvdXAga2V5PXtpfSB5PXt5fT57c2VjdGlvbn08L0dyb3VwPilcblx0XHRcdFx0XHRcdHkrPWhlaWdodFxuXHRcdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG5cdFx0XHRcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgY29uc3Qge3dpZHRoLGhlaWdodCwgcGFnZUdhcH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBjYW52YXM6IHt3aWR0aCxoZWlnaHQsIHBhZ2VHYXB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXHRcblx0YXBwZW5kQ29tcG9zZWQoc2l6ZSl7XG5cdFx0bGV0IHtjb21wb3NlZCwgd2lkdGgsIGhlaWdodH09dGhpcy5zdGF0ZVxuXHRcdGNvbXBvc2VkLnB1c2goc2l6ZSlcblx0XHRcblx0XHRsZXQgbWluV2lkdGg9Y29tcG9zZWQucmVkdWNlKChwcmV2LCBhKT0+TWF0aC5tYXgocHJldiwgYS53aWR0aCksMClcblx0XHRsZXQgbWluSGVpZ2h0PWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9PnByZXYrYS5oZWlnaHQsMClcblx0XHRcblx0XHRpZihtaW5XaWR0aD53aWR0aClcblx0XHRcdHdpZHRoPW1pbldpZHRoXG5cdFx0XG5cdFx0aWYobWluSGVpZ2h0PmhlaWdodClcblx0XHRcdGhlaWdodD1taW5IZWlnaHQrdGhpcy5wcm9wcy5wYWdlR2FwXG5cdFx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29tcG9zZWQsIHdpZHRoLCBoZWlnaHR9KVxuXHR9XG5cdFxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogNjAwLFxuXHRcdGhlaWdodDo4MDAsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuIl19