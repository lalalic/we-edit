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
		key: "append",
		value: function append(size) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLFVBQVMsRUFBVCxFQUFhLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVg7OztjQUQvQjs7MkJBRVQ7Z0JBQ3NCLEtBQUssS0FBTCxDQUR0QjtPQUNILDJCQURHO09BQ08scUJBRFA7T0FDYyx1QkFEZDtnQkFFa0IsS0FBSyxLQUFMLENBRmxCO09BRUgsMkJBRkc7O09BRVUsd0RBRlY7O0FBR1YsT0FBSSxJQUFFLENBQUYsQ0FITTtBQUlKLFVBQ0w7O2lCQUFTLFVBQVEsT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBQS9DO0lBRUUsZ0JBQU0sUUFBTixDQUFlLEdBQWYsQ0FBbUIsUUFBbkIsRUFBNkIsVUFBQyxPQUFELEVBQVUsQ0FBVixFQUFjO2dCQUM3QixTQUFTLENBQVQsS0FBYSxFQUFiLENBRDZCOztTQUNyQyxxQkFEcUM7O0FBRTFDLFNBQUksSUFBRzs7UUFBTyxLQUFLLENBQUwsRUFBUSxHQUFHLENBQUgsRUFBZjtNQUFzQixPQUF0QjtNQUFILENBRnNDO0FBRzFDLFVBQUcsTUFBSCxDQUgwQztBQUkxQyxZQUFPLENBQVAsQ0FKMEM7S0FBZCxDQUYvQjtJQURLLENBSkk7Ozs7b0NBbUJTO2lCQUNpQixLQUFLLEtBQUwsQ0FEakI7T0FDTixzQkFETTtPQUNBLHdCQURBO09BQ1EsMEJBRFI7O0FBRWIsVUFBTyxPQUFPLE1BQVAsNEJBdkJNLHdEQXVCTixFQUFzQztBQUN6QyxZQUFRLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBZSxnQkFBZixFQUFSO0lBREcsQ0FBUCxDQUZhOzs7O3lCQVdiLE1BQUs7aUJBQ21CLEtBQUssS0FBTCxDQURuQjtPQUNOLDRCQURNO09BQ0ksc0JBREo7T0FDVyx3QkFEWDs7QUFFWCxZQUFTLElBQVQsQ0FBYyxJQUFkLEVBRlc7O0FBSVgsT0FBSSxXQUFTLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsS0FBSyxHQUFMLENBQVMsSUFBVCxFQUFlLEVBQUUsS0FBRjtJQUExQixFQUFtQyxDQUFuRCxDQUFULENBSk87QUFLWCxPQUFJLFlBQVUsU0FBUyxNQUFULENBQWdCLFVBQUMsSUFBRCxFQUFPLENBQVA7V0FBVyxPQUFLLEVBQUUsTUFBRjtJQUFoQixFQUF5QixDQUF6QyxDQUFWLENBTE87O0FBT1gsT0FBRyxXQUFTLEtBQVQsRUFDRixRQUFNLFFBQU4sQ0FERDs7QUFHQSxPQUFHLFlBQVUsTUFBVixFQUNGLFNBQU8sWUFBVSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRGxCOztBQUdBLFFBQUssUUFBTCxDQUFjLEVBQUMsa0JBQUQsRUFBVyxZQUFYLEVBQWtCLGNBQWxCLEVBQWQsRUFiVzs7OztRQWhDUTs7O1NBNEJWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxTQUFRLGlCQUFVLE1BQVY7Q0FEYSxFQUV2QixjQUFTLGlCQUFUO0FBOUJlLFNBZ0RiLGVBQWE7QUFDbkIsUUFBTyxHQUFQO0FBQ0EsU0FBTyxHQUFQO0FBQ0EsVUFBUyxFQUFUO0FBQ0EsUUFBTztBQUNOLGNBQVcsV0FBWDtFQUREOztrQkFwRG1CIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGU9e2NvbXBvc2VkOltdLCB3aWR0aDp0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6dGhpcy5wcm9wcy5oZWlnaHR9XG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbXBvc2VkLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRsZXQgeT0wXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8c3ZnIHsuLi5vdGhlcnN9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChzZWN0aW9uLCBpKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHtoZWlnaHR9PWNvbXBvc2VkW2ldfHx7fVxuXHRcdFx0XHRcdFx0bGV0IGE9KDxHcm91cCBrZXk9e2l9IHk9e3l9PntzZWN0aW9ufTwvR3JvdXA+KVxuXHRcdFx0XHRcdFx0eSs9aGVpZ2h0XG5cdFx0XHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdDwvc3ZnPlxuXHRcdClcblx0XHRcdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCB7d2lkdGgsaGVpZ2h0LCBwYWdlR2FwfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGNhbnZhczoge3dpZHRoLGhlaWdodCwgcGFnZUdhcH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cdFxuXHRhcHBlbmQoc2l6ZSl7XG5cdFx0bGV0IHtjb21wb3NlZCwgd2lkdGgsIGhlaWdodH09dGhpcy5zdGF0ZVxuXHRcdGNvbXBvc2VkLnB1c2goc2l6ZSlcblx0XHRcblx0XHRsZXQgbWluV2lkdGg9Y29tcG9zZWQucmVkdWNlKChwcmV2LCBhKT0+TWF0aC5tYXgocHJldiwgYS53aWR0aCksMClcblx0XHRsZXQgbWluSGVpZ2h0PWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9PnByZXYrYS5oZWlnaHQsMClcblx0XHRcblx0XHRpZihtaW5XaWR0aD53aWR0aClcblx0XHRcdHdpZHRoPW1pbldpZHRoXG5cdFx0XG5cdFx0aWYobWluSGVpZ2h0PmhlaWdodClcblx0XHRcdGhlaWdodD1taW5IZWlnaHQrdGhpcy5wcm9wcy5wYWdlR2FwXG5cdFx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29tcG9zZWQsIHdpZHRoLCBoZWlnaHR9KVxuXHR9XG5cdFxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogNjAwLFxuXHRcdGhlaWdodDo4MDAsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuIl19