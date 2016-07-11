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

			var style = this.getStyle();

			var cursor = null;
			if (typeof loc != 'undefined') {
				if (end - children.length < loc && loc <= end) {
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
					_extends({}, others, { onClick: function onClick(e) {
							return _this2.onClick(e, props);
						} }),
					children
				)
			);
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _event$nativeEvent = event.nativeEvent;
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
			var target = event.target;

			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);
			var loc = composer.next({ width: offsetX }) || { end: 0 };
			var index = text.end - text.children.length + loc.end;
			this.setState({ loc: index });
		}
	}, {
		key: "updateCursor",
		value: function updateCursor(ref) {
			this.context.cursor().setState({ target: this, shape: ref });
		}
	}, {
		key: "insert",
		value: function insert(str) {
			var _this3 = this;

			var _state = this.state;
			var content = _state.content;
			var loc = _state.loc;

			this.setState({ content: content.splice(loc, 0, str), loc: loc + str.length }, function (e) {
				return _this3.reCompose();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxzQ0FBTjs7Ozs7Ozs7Ozs7OztzQ0FFb0IsT0FBTTs7O09BQ3JCLFFBQXlDLE1BQXpDLE1BRHFCO09BQ2QsU0FBa0MsTUFBbEMsT0FEYztPQUNOLE1BQTBCLE1BQTFCLElBRE07T0FDRCxXQUFxQixNQUFyQixTQURDOztPQUNZLGtDQUFRLCtDQURwQjs7T0FFckIsTUFBSyxLQUFLLEtBQUwsQ0FBTCxJQUZxQjs7QUFHdEIsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSGtCOztBQUs1QixPQUFJLFNBQU8sSUFBUCxDQUx3QjtBQU01QixPQUFHLE9BQU8sR0FBUCxJQUFhLFdBQWIsRUFBeUI7QUFDM0IsUUFBRyxNQUFJLFNBQVMsTUFBVCxHQUFnQixHQUFwQixJQUEyQixPQUFLLEdBQUwsRUFBUztBQUN0QyxTQUFJLFVBQVEsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixTQUFuQixDQUE2QixNQUFJLFNBQVMsTUFBVCxFQUFpQixHQUFsRCxDQUFSLENBRGtDO0FBRXRDLFNBQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixPQUFqQyxFQUEwQyxLQUExQyxDQUFULENBRmtDO0FBR3RDLFNBQUksT0FBSyxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTyxnQkFBUCxFQUFyQixDQUFMLENBSGtDO0FBSXRDLGNBQU8sd0RBQWEsS0FBSSxhQUFKLEVBQWtCLEtBQUs7Y0FBRyxPQUFLLFlBQUwsQ0FBa0IsQ0FBbEI7T0FBSCxJQUE2QixRQUFNLE9BQU8sS0FBUCxHQUF2RSxDQUFQLENBSnNDO0tBQXZDO0lBREQ7O0FBU00sVUFDTDs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFDRSxNQURGO0lBRUM7O2tCQUFVLFVBQVEsU0FBUztjQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxLQUFmO09BQUgsR0FBM0I7S0FBc0QsUUFBdEQ7S0FGRDtJQURLLENBZnNCOzs7OzBCQXVCbEIsT0FBTyxNQUFLOzRCQUN5QixNQUF4QyxZQURlO09BQ0YscUNBREU7T0FDTyxxQ0FEUDtPQUNpQixTQUFRLE1BQVIsT0FEakI7O0FBRWhCLE9BQUksUUFBTSxLQUFLLFFBQUwsRUFBTixDQUZZO0FBR2hCLE9BQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixLQUFLLFFBQUwsRUFBZSxLQUFoRCxDQUFULENBSFk7QUFJaEIsT0FBSSxNQUFJLFNBQVMsSUFBVCxDQUFjLEVBQUMsT0FBTSxPQUFOLEVBQWYsS0FBZ0MsRUFBQyxLQUFJLENBQUosRUFBakMsQ0FKUTtBQUtoQixPQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixJQUFJLEdBQUosQ0FMeEI7QUFNdEIsUUFBSyxRQUFMLENBQWMsRUFBQyxLQUFJLEtBQUosRUFBZixFQU5zQjs7OzsrQkFTVixLQUFJO0FBQ2hCLFFBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsUUFBdEIsQ0FBK0IsRUFBQyxRQUFPLElBQVAsRUFBYSxPQUFNLEdBQU4sRUFBN0MsRUFEZ0I7Ozs7eUJBSVYsS0FBSTs7O2dCQUNXLEtBQUssS0FBTCxDQURYO09BQ0gseUJBREc7T0FDTSxpQkFETjs7QUFFVixRQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsUUFBUSxNQUFSLENBQWUsR0FBZixFQUFtQixDQUFuQixFQUFxQixHQUFyQixDQUFSLEVBQW1DLEtBQUksTUFBSSxJQUFJLE1BQUosRUFBMUQsRUFBc0U7V0FBRyxPQUFLLFNBQUw7SUFBSCxDQUF0RSxDQUZVOzs7O3lCQUtMO0FBQ0wsUUFBSyxRQUFMLENBQWMsRUFBQyxLQUFJLFNBQUosRUFBZixFQURLOzs7OztFQTFDc0I7O09BOENyQixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLFNBQVEsaUJBQVUsSUFBVjtDQURXLEVBRWxCLE1BQU0sWUFBTiIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHR9IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IHtTaGFwZSBhcyBDdXJzb3JTaGFwZX0gZnJvbSBcIi4vY3Vyc29yXCJcblxubGV0IFN1cGVyPWVkaXRhYmxlKFRleHQpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFN1cGVye1xuICAgIGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBlbmQsIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXByb3BzXG5cdFx0Y29uc3Qge2xvY309dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXG5cblx0XHRsZXQgY3Vyc29yPW51bGxcblx0XHRpZih0eXBlb2YobG9jKSE9J3VuZGVmaW5lZCcpe1xuXHRcdFx0aWYoZW5kLWNoaWxkcmVuLmxlbmd0aDxsb2MgJiYgbG9jPD1lbmQpe1xuXHRcdFx0XHRsZXQgbG9jVGV4dD10aGlzLnN0YXRlLmNvbnRlbnQuc3Vic3RyaW5nKGVuZC1jaGlsZHJlbi5sZW5ndGgsIGxvYylcblx0XHRcdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGxvY1RleHQsIHN0eWxlKVxuXHRcdFx0XHRsZXQgc2l6ZT1jb21wb3Nlci5uZXh0KHt3aWR0aDpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUn0pXG5cdFx0XHRcdGN1cnNvcj08Q3Vyc29yU2hhcGUga2V5PVwiY3Vyc29yc2hhcGVcIiByZWY9e2E9PnRoaXMudXBkYXRlQ3Vyc29yKGEpfSB7Li4uc2l6ZX0gc3R5bGU9e3N0eWxlfS8+XG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG5cdFx0XHRcdHtjdXJzb3J9XG5cdFx0XHRcdDx0ZXh0IHsuLi5vdGhlcnN9IG9uQ2xpY2s9e2U9PnRoaXMub25DbGljayhlLHByb3BzKX0+e2NoaWxkcmVufTwvdGV4dD5cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuXHRcdGNvbnN0IHtuYXRpdmVFdmVudDp7b2Zmc2V0WCwgb2Zmc2V0WX0sIHRhcmdldH09ZXZlbnRcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbiwgc3R5bGUpXG4gICAgICAgIGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XG4gICAgICAgIGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bG9jOmluZGV4fSlcbiAgICB9XG5cblx0dXBkYXRlQ3Vyc29yKHJlZil7XG5cdFx0dGhpcy5jb250ZXh0LmN1cnNvcigpLnNldFN0YXRlKHt0YXJnZXQ6dGhpcywgc2hhcGU6cmVmfSlcblx0fVxuXG5cdGluc2VydChzdHIpe1xuXHRcdGNvbnN0IHtjb250ZW50LCBsb2N9PXRoaXMuc3RhdGVcblx0XHR0aGlzLnNldFN0YXRlKHtjb250ZW50OmNvbnRlbnQuc3BsaWNlKGxvYywwLHN0ciksIGxvYzpsb2Mrc3RyLmxlbmd0aH0sZT0+dGhpcy5yZUNvbXBvc2UoKSlcblx0fVxuXG5cdGJsdXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtsb2M6dW5kZWZpbmVkfSlcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0Y3Vyc29yOiBQcm9wVHlwZXMuZnVuY1xuXHR9LFN1cGVyLmNvbnRleHRUeXBlcylcbn1cbiJdfQ==