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

var _cursor = require("../editor/cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { width: _this.props.width, height: _this.props.height }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var composed = this.composed;
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;

			var y = 0;
			return _react2.default.createElement(
				"svg",
				_extends({}, this.props, { width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				this.props.children,
				composed.map(function (a, i) {
					var section = _react2.default.createElement(
						_group2.default,
						{ key: i, y: y },
						a
					);
					y += a.props.height;
					return section;
				}),
				_react2.default.createElement(_cursor2.default, null)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var pageGap = _props.pageGap;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, height: height, pageGap: pageGap }
			});
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(section) {
			var composed = this.composed;
			var _state2 = this.state;
			var width = _state2.width;
			var height = _state2.height;

			composed.push(section);

			var minWidth = composed.reduce(function (prev, a) {
				return Math.max(prev, a.props.width);
			}, 0);
			var minHeight = composed.reduce(function (prev, a) {
				return prev + a.props.height;
			}, 0);

			if (minWidth > width) width = minWidth;

			if (minHeight > height) height = minHeight + this.props.pageGap;

			this.setState({ width: width, height: height });
		}
	}]);

	return Document;
}(_any.HasChild);

Document.childContextTypes = Object.assign({
	canvas: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: 600,
	height: 100,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVg7OztjQURsQjs7MkJBR1Q7T0FDSCxXQUFVLEtBQVYsU0FERztnQkFFWSxLQUFLLEtBQUwsQ0FGWjtPQUVILHFCQUZHO09BRUksdUJBRko7O0FBR1YsT0FBSSxJQUFFLENBQUYsQ0FITTtBQUlKLFVBQ0w7O2lCQUFTLEtBQUssS0FBTCxJQUFZLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixrQkFBZ0IsY0FBUyxNQUF6QixHQUFuRDtJQUNFLEtBQUssS0FBTCxDQUFXLFFBQVg7SUFFQSxTQUFTLEdBQVQsQ0FBYSxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDbkIsU0FBSSxVQUFROztRQUFPLEtBQUssQ0FBTCxFQUFRLEdBQUcsQ0FBSCxFQUFmO01BQXNCLENBQXRCO01BQVIsQ0FEZTtBQUVuQixVQUFHLEVBQUUsS0FBRixDQUFRLE1BQVIsQ0FGZ0I7QUFHbkIsWUFBTyxPQUFQLENBSG1CO0tBQVAsQ0FIZjtJQVNDLHFEQVREO0lBREssQ0FKSTs7OztvQ0FvQlM7Z0JBQ2lCLEtBQUssS0FBTCxDQURqQjtPQUNOLHFCQURNO09BQ0EsdUJBREE7T0FDUSx5QkFEUjs7QUFFYixVQUFPLE9BQU8sTUFBUCw0QkF6Qk0sd0RBeUJOLEVBQXNDO0FBQ3pDLFlBQVEsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFlLGdCQUFmLEVBQVI7SUFERyxDQUFQLENBRmE7Ozs7aUNBV0wsU0FBUTtPQUNmLFdBQVUsS0FBVixTQURlO2lCQUVGLEtBQUssS0FBTCxDQUZFO09BRWpCLHNCQUZpQjtPQUVWLHdCQUZVOztBQUd0QixZQUFTLElBQVQsQ0FBYyxPQUFkLEVBSHNCOztBQUt0QixPQUFJLFdBQVMsU0FBUyxNQUFULENBQWdCLFVBQUMsSUFBRCxFQUFPLENBQVA7V0FBVyxLQUFLLEdBQUwsQ0FBUyxJQUFULEVBQWUsRUFBRSxLQUFGLENBQVEsS0FBUjtJQUExQixFQUF5QyxDQUF6RCxDQUFULENBTGtCO0FBTXRCLE9BQUksWUFBVSxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLE9BQUssRUFBRSxLQUFGLENBQVEsTUFBUjtJQUFoQixFQUErQixDQUEvQyxDQUFWLENBTmtCOztBQVF0QixPQUFHLFdBQVMsS0FBVCxFQUNGLFFBQU0sUUFBTixDQUREOztBQUdBLE9BQUcsWUFBVSxNQUFWLEVBQ0YsU0FBTyxZQUFVLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FEbEI7O0FBR0EsUUFBSyxRQUFMLENBQWMsRUFBQyxZQUFELEVBQVEsY0FBUixFQUFkLEVBZHNCOzs7O1FBbENIOzs7U0E4QlYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLFNBQVEsaUJBQVUsTUFBVjtDQURhLEVBRXZCLGNBQVMsaUJBQVQ7QUFoQ2UsU0FtRGIsZUFBYTtBQUNuQixRQUFPLEdBQVA7QUFDQSxTQUFPLEdBQVA7QUFDQSxVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQXZEbUIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi4vZWRpdG9yL2N1cnNvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRlPXt3aWR0aDp0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6dGhpcy5wcm9wcy5oZWlnaHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodH09dGhpcy5zdGF0ZVxuXHRcdGxldCB5PTBcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxzdmcgey4uLnRoaXMucHJvcHN9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29tcG9zZWQubWFwKChhLGkpPT57XG5cdFx0XHRcdFx0XHRsZXQgc2VjdGlvbj08R3JvdXAga2V5PXtpfSB5PXt5fT57YX08L0dyb3VwPlxuXHRcdFx0XHRcdFx0eSs9YS5wcm9wcy5oZWlnaHRcblx0XHRcdFx0XHRcdHJldHVybiBzZWN0aW9uXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0XHQ8Q3Vyc29yLz5cblx0XHRcdDwvc3ZnPlxuXHRcdClcblxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCB7d2lkdGgsaGVpZ2h0LCBwYWdlR2FwfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGNhbnZhczoge3dpZHRoLGhlaWdodCwgcGFnZUdhcH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cblx0YXBwZW5kQ29tcG9zZWQoc2VjdGlvbil7XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0fT10aGlzLnN0YXRlXG5cdFx0Y29tcG9zZWQucHVzaChzZWN0aW9uKVxuXG5cdFx0bGV0IG1pbldpZHRoPWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9Pk1hdGgubWF4KHByZXYsIGEucHJvcHMud2lkdGgpLDApXG5cdFx0bGV0IG1pbkhlaWdodD1jb21wb3NlZC5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2K2EucHJvcHMuaGVpZ2h0LDApXG5cblx0XHRpZihtaW5XaWR0aD53aWR0aClcblx0XHRcdHdpZHRoPW1pbldpZHRoXG5cblx0XHRpZihtaW5IZWlnaHQ+aGVpZ2h0KVxuXHRcdFx0aGVpZ2h0PW1pbkhlaWdodCt0aGlzLnByb3BzLnBhZ2VHYXBcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3dpZHRoLCBoZWlnaHR9KVxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IDYwMCxcblx0XHRoZWlnaHQ6MTAwLFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cbn1cbiJdfQ==