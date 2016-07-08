"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _cursor = require("./cursor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Text);

var _class = function (_Super) {
	_inherits(_class, _Super);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _this2 = this;

			var width = props.width;
			var height = props.height;
			var end = props.end;
			var children = props.children;

			var others = _objectWithoutProperties(props, ["width", "height", "end", "children"]);

			var loc = this.state.loc;

			var cursor = null;
			if (typeof loc != 'undefined') {
				if (end - children.length < loc && loc < end) {
					var style = this.getFontStyle();
					var locText = this.state.content.substring(end - children.length, loc);
					var composer = new this.constructor.WordWrapper(locText, style);
					var size = composer.next({ width: Number.MAX_SAFE_INTEGER });
					cursor = _react2.default.createElement(_cursor.Shape, _extends({ key: "cursorshape", ref: function ref(a) {
							return _this2.updateCursor(a);
						} }, size, { style: style }));
				}
			}
			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				cursor,
				_react2.default.createElement(
					"text",
					_extends({}, others, { style: { whiteSpace: "pre" }, onClick: function onClick(e) {
							return _this2.onClick(e, props);
						} }),
					children
				)
			);
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _this3 = this;

			var _event$nativeEvent = event.nativeEvent;
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
			var target = event.target;

			var style = this.getFontStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);
			var loc = composer.next({ width: offsetX }) || { end: 0 };
			var index = text.end - text.children.length + loc.end;
			this.setState({ loc: index }, function () {
				return _this3.reCompose();
			});
		}
	}, {
		key: "updateCursor",
		value: function updateCursor(ref) {
			this.context.cursor().setState({ target: this, shape: ref });
		}
	}, {
		key: "insert",
		value: function insert(str) {
			var _this4 = this;

			var _state = this.state;
			var content = _state.content;
			var loc = _state.loc;

			this.setState({ content: content.splice(loc, 0, str), loc: loc + str.length }, function (e) {
				return _this4.reCompose();
			});
		}
	}, {
		key: "blur",
		value: function blur() {
			this.setState({ loc: undefined });
		}
	}]);

	return _class;
}(Super);

_class.contextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxzQ0FBTjs7Ozs7Ozs7Ozs7OztzQ0FFb0IsT0FBTTs7O09BQ3JCLFFBQXlDLE1BQXpDLE1BRHFCO09BQ2QsU0FBa0MsTUFBbEMsT0FEYztPQUNOLE1BQTBCLE1BQTFCLElBRE07T0FDRCxXQUFxQixNQUFyQixTQURDOztPQUNZLGtDQUFRLCtDQURwQjs7T0FFckIsTUFBSyxLQUFLLEtBQUwsQ0FBTCxJQUZxQjs7QUFHNUIsT0FBSSxTQUFPLElBQVAsQ0FId0I7QUFJNUIsT0FBRyxPQUFPLEdBQVAsSUFBYSxXQUFiLEVBQXlCO0FBQzNCLFFBQUcsTUFBSSxTQUFTLE1BQVQsR0FBZ0IsR0FBcEIsSUFBMkIsTUFBSSxHQUFKLEVBQVE7QUFDckMsU0FBSSxRQUFNLEtBQUssWUFBTCxFQUFOLENBRGlDO0FBRXJDLFNBQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFNBQW5CLENBQTZCLE1BQUksU0FBUyxNQUFULEVBQWlCLEdBQWxELENBQVIsQ0FGaUM7QUFHckMsU0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FIaUM7QUFJckMsU0FBSSxPQUFLLFNBQVMsSUFBVCxDQUFjLEVBQUMsT0FBTSxPQUFPLGdCQUFQLEVBQXJCLENBQUwsQ0FKaUM7QUFLckMsY0FBTyx3REFBYSxLQUFJLGFBQUosRUFBa0IsS0FBSztjQUFHLE9BQUssWUFBTCxDQUFrQixDQUFsQjtPQUFILElBQTZCLFFBQU0sT0FBTyxLQUFQLEdBQXZFLENBQVAsQ0FMcUM7S0FBdEM7SUFERDtBQVNBLFVBQ0M7O01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQXJCO0lBQ0UsTUFERjtJQUVDOztrQkFBVSxVQUFRLE9BQU8sRUFBQyxZQUFXLEtBQVgsRUFBUixFQUEyQixTQUFTO2NBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLEtBQWY7T0FBSCxHQUF0RDtLQUFpRixRQUFqRjtLQUZEO0lBREQsQ0FiNEI7Ozs7MEJBcUJsQixPQUFPLE1BQUs7Ozs0QkFDeUIsTUFBeEMsWUFEZTtPQUNGLHFDQURFO09BQ08scUNBRFA7T0FDaUIsU0FBUSxNQUFSLE9BRGpCOztBQUVoQixPQUFJLFFBQU0sS0FBSyxZQUFMLEVBQU4sQ0FGWTtBQUdoQixPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFMLEVBQWUsS0FBaEQsQ0FBVCxDQUhZO0FBSWhCLE9BQUksTUFBSSxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTixFQUFmLEtBQWdDLEVBQUMsS0FBSSxDQUFKLEVBQWpDLENBSlE7QUFLaEIsT0FBSSxRQUFNLEtBQUssR0FBTCxHQUFTLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBcUIsSUFBSSxHQUFKLENBTHhCO0FBTXRCLFFBQUssUUFBTCxDQUFjLEVBQUMsS0FBSSxLQUFKLEVBQWYsRUFBMkI7V0FBSSxPQUFLLFNBQUw7SUFBSixDQUEzQixDQU5zQjs7OzsrQkFTVixLQUFJO0FBQ2hCLFFBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsUUFBdEIsQ0FBK0IsRUFBQyxRQUFPLElBQVAsRUFBYSxPQUFNLEdBQU4sRUFBN0MsRUFEZ0I7Ozs7eUJBTVYsS0FBSTs7O2dCQUNXLEtBQUssS0FBTCxDQURYO09BQ0gseUJBREc7T0FDTSxpQkFETjs7QUFFVixRQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsUUFBUSxNQUFSLENBQWUsR0FBZixFQUFtQixDQUFuQixFQUFxQixHQUFyQixDQUFSLEVBQW1DLEtBQUksTUFBSSxJQUFJLE1BQUosRUFBMUQsRUFBc0U7V0FBRyxPQUFLLFNBQUw7SUFBSCxDQUF0RSxDQUZVOzs7O3lCQUtMO0FBQ0wsUUFBSyxRQUFMLENBQWMsRUFBQyxLQUFJLFNBQUosRUFBZixFQURLOzs7OztFQTFDc0I7O09BOENyQixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLFNBQVEsaUJBQVUsSUFBVjtDQURXLEVBRWxCLE1BQU0sWUFBTiIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHR9IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IHtTaGFwZSBhcyBDdXJzb3JTaGFwZX0gZnJvbSBcIi4vY3Vyc29yXCJcblxubGV0IFN1cGVyPWVkaXRhYmxlKFRleHQpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFN1cGVye1xuICAgIGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBlbmQsIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXByb3BzXG5cdFx0Y29uc3Qge2xvY309dGhpcy5zdGF0ZVxuXHRcdGxldCBjdXJzb3I9bnVsbFxuXHRcdGlmKHR5cGVvZihsb2MpIT0ndW5kZWZpbmVkJyl7XG5cdFx0XHRpZihlbmQtY2hpbGRyZW4ubGVuZ3RoPGxvYyAmJiBsb2M8ZW5kKXtcblx0XHRcdFx0bGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcblx0XHRcdFx0bGV0IGxvY1RleHQ9dGhpcy5zdGF0ZS5jb250ZW50LnN1YnN0cmluZyhlbmQtY2hpbGRyZW4ubGVuZ3RoLCBsb2MpXG5cdFx0XHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihsb2NUZXh0LCBzdHlsZSlcblx0XHRcdFx0bGV0IHNpemU9Y29tcG9zZXIubmV4dCh7d2lkdGg6TnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJ9KVxuXHRcdFx0XHRjdXJzb3I9PEN1cnNvclNoYXBlIGtleT1cImN1cnNvcnNoYXBlXCIgcmVmPXthPT50aGlzLnVwZGF0ZUN1cnNvcihhKX0gey4uLnNpemV9IHN0eWxlPXtzdHlsZX0vPlxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuXHRcdFx0XHR7Y3Vyc29yfVxuXHRcdFx0XHQ8dGV4dCB7Li4ub3RoZXJzfSBzdHlsZT17e3doaXRlU3BhY2U6XCJwcmVcIn19IG9uQ2xpY2s9e2U9PnRoaXMub25DbGljayhlLHByb3BzKX0+e2NoaWxkcmVufTwvdGV4dD5cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuXHRcdGNvbnN0IHtuYXRpdmVFdmVudDp7b2Zmc2V0WCwgb2Zmc2V0WX0sIHRhcmdldH09ZXZlbnRcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQuY2hpbGRyZW4sIHN0eWxlKVxuICAgICAgICBsZXQgbG9jPWNvbXBvc2VyLm5leHQoe3dpZHRoOm9mZnNldFh9KXx8e2VuZDowfVxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrbG9jLmVuZFxuXHRcdHRoaXMuc2V0U3RhdGUoe2xvYzppbmRleH0sICgpPT50aGlzLnJlQ29tcG9zZSgpKVxuICAgIH1cblx0XG5cdHVwZGF0ZUN1cnNvcihyZWYpe1xuXHRcdHRoaXMuY29udGV4dC5jdXJzb3IoKS5zZXRTdGF0ZSh7dGFyZ2V0OnRoaXMsIHNoYXBlOnJlZn0pXG5cdH1cblx0XG5cdFxuXHRcblx0aW5zZXJ0KHN0cil7XG5cdFx0Y29uc3Qge2NvbnRlbnQsIGxvY309dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe2NvbnRlbnQ6Y29udGVudC5zcGxpY2UobG9jLDAsc3RyKSwgbG9jOmxvYytzdHIubGVuZ3RofSxlPT50aGlzLnJlQ29tcG9zZSgpKVxuXHR9XG5cdFxuXHRibHVyKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bG9jOnVuZGVmaW5lZH0pXG5cdH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0Y3Vyc29yOiBQcm9wVHlwZXMuZnVuY1xuXHR9LFN1cGVyLmNvbnRleHRUeXBlcylcbn1cbiJdfQ==