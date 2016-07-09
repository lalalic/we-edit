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

			var style = this.getFontStyle();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxzQ0FBTjs7Ozs7Ozs7Ozs7OztzQ0FFb0IsT0FBTTs7O09BQ3JCLFFBQXlDLE1BQXpDLE1BRHFCO09BQ2QsU0FBa0MsTUFBbEMsT0FEYztPQUNOLE1BQTBCLE1BQTFCLElBRE07T0FDRCxXQUFxQixNQUFyQixTQURDOztPQUNZLGtDQUFRLCtDQURwQjs7T0FFckIsTUFBSyxLQUFLLEtBQUwsQ0FBTCxJQUZxQjs7QUFHdEIsT0FBSSxRQUFNLEtBQUssWUFBTCxFQUFOLENBSGtCOztBQUs1QixPQUFJLFNBQU8sSUFBUCxDQUx3QjtBQU01QixPQUFHLE9BQU8sR0FBUCxJQUFhLFdBQWIsRUFBeUI7QUFDM0IsUUFBRyxNQUFJLFNBQVMsTUFBVCxHQUFnQixHQUFwQixJQUEyQixPQUFLLEdBQUwsRUFBUztBQUN0QyxTQUFJLFVBQVEsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixTQUFuQixDQUE2QixNQUFJLFNBQVMsTUFBVCxFQUFpQixHQUFsRCxDQUFSLENBRGtDO0FBRXRDLFNBQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixPQUFqQyxFQUEwQyxLQUExQyxDQUFULENBRmtDO0FBR3RDLFNBQUksT0FBSyxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTyxnQkFBUCxFQUFyQixDQUFMLENBSGtDO0FBSXRDLGNBQU8sd0RBQWEsS0FBSSxhQUFKLEVBQWtCLEtBQUs7Y0FBRyxPQUFLLFlBQUwsQ0FBa0IsQ0FBbEI7T0FBSCxJQUE2QixRQUFNLE9BQU8sS0FBUCxHQUF2RSxDQUFQLENBSnNDO0tBQXZDO0lBREQ7O0FBU00sVUFDTDs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFDRSxNQURGO0lBRUM7O2tCQUFVLFVBQVEsU0FBUztjQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxLQUFmO09BQUgsR0FBM0I7S0FBc0QsUUFBdEQ7S0FGRDtJQURLLENBZnNCOzs7OzBCQXVCbEIsT0FBTyxNQUFLOzs7NEJBQ3lCLE1BQXhDLFlBRGU7T0FDRixxQ0FERTtPQUNPLHFDQURQO09BQ2lCLFNBQVEsTUFBUixPQURqQjs7QUFFaEIsT0FBSSxRQUFNLEtBQUssWUFBTCxFQUFOLENBRlk7QUFHaEIsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxFQUFlLEtBQWhELENBQVQsQ0FIWTtBQUloQixPQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUpRO0FBS2hCLE9BQUksUUFBTSxLQUFLLEdBQUwsR0FBUyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLElBQUksR0FBSixDQUx4QjtBQU10QixRQUFLLFFBQUwsQ0FBYyxFQUFDLEtBQUksS0FBSixFQUFmLEVBQTJCO1dBQUksT0FBSyxTQUFMO0lBQUosQ0FBM0IsQ0FOc0I7Ozs7K0JBU1YsS0FBSTtBQUNoQixRQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLFFBQXRCLENBQStCLEVBQUMsUUFBTyxJQUFQLEVBQWEsT0FBTSxHQUFOLEVBQTdDLEVBRGdCOzs7O3lCQUlWLEtBQUk7OztnQkFDVyxLQUFLLEtBQUwsQ0FEWDtPQUNILHlCQURHO09BQ00saUJBRE47O0FBRVYsUUFBSyxRQUFMLENBQWMsRUFBQyxTQUFRLFFBQVEsTUFBUixDQUFlLEdBQWYsRUFBbUIsQ0FBbkIsRUFBcUIsR0FBckIsQ0FBUixFQUFtQyxLQUFJLE1BQUksSUFBSSxNQUFKLEVBQTFELEVBQXNFO1dBQUcsT0FBSyxTQUFMO0lBQUgsQ0FBdEUsQ0FGVTs7Ozt5QkFLTDtBQUNMLFFBQUssUUFBTCxDQUFjLEVBQUMsS0FBSSxTQUFKLEVBQWYsRUFESzs7Ozs7RUExQ3NCOztPQThDckIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxTQUFRLGlCQUFVLElBQVY7Q0FEVyxFQUVsQixNQUFNLFlBQU4iLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCB7U2hhcGUgYXMgQ3Vyc29yU2hhcGV9IGZyb20gXCIuL2N1cnNvclwiXG5cbmxldCBTdXBlcj1lZGl0YWJsZShUZXh0KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcbiAgICBjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZW5kLCBjaGlsZHJlbiwgLi4ub3RoZXJzfT1wcm9wc1xuXHRcdGNvbnN0IHtsb2N9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcblxuXHRcdGxldCBjdXJzb3I9bnVsbFxuXHRcdGlmKHR5cGVvZihsb2MpIT0ndW5kZWZpbmVkJyl7XG5cdFx0XHRpZihlbmQtY2hpbGRyZW4ubGVuZ3RoPGxvYyAmJiBsb2M8PWVuZCl7XG5cdFx0XHRcdGxldCBsb2NUZXh0PXRoaXMuc3RhdGUuY29udGVudC5zdWJzdHJpbmcoZW5kLWNoaWxkcmVuLmxlbmd0aCwgbG9jKVxuXHRcdFx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIobG9jVGV4dCwgc3R5bGUpXG5cdFx0XHRcdGxldCBzaXplPWNvbXBvc2VyLm5leHQoe3dpZHRoOk51bWJlci5NQVhfU0FGRV9JTlRFR0VSfSlcblx0XHRcdFx0Y3Vyc29yPTxDdXJzb3JTaGFwZSBrZXk9XCJjdXJzb3JzaGFwZVwiIHJlZj17YT0+dGhpcy51cGRhdGVDdXJzb3IoYSl9IHsuLi5zaXplfSBzdHlsZT17c3R5bGV9Lz5cblx0XHRcdH1cblx0XHR9XG5cbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxHcm91cCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cblx0XHRcdFx0e2N1cnNvcn1cblx0XHRcdFx0PHRleHQgey4uLm90aGVyc30gb25DbGljaz17ZT0+dGhpcy5vbkNsaWNrKGUscHJvcHMpfT57Y2hpbGRyZW59PC90ZXh0PlxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XG5cdFx0Y29uc3Qge25hdGl2ZUV2ZW50OntvZmZzZXRYLCBvZmZzZXRZfSwgdGFyZ2V0fT1ldmVudFxuICAgICAgICBsZXQgc3R5bGU9dGhpcy5nZXRGb250U3R5bGUoKVxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbiwgc3R5bGUpXG4gICAgICAgIGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XG4gICAgICAgIGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bG9jOmluZGV4fSwgKCk9PnRoaXMucmVDb21wb3NlKCkpXG4gICAgfVxuXG5cdHVwZGF0ZUN1cnNvcihyZWYpe1xuXHRcdHRoaXMuY29udGV4dC5jdXJzb3IoKS5zZXRTdGF0ZSh7dGFyZ2V0OnRoaXMsIHNoYXBlOnJlZn0pXG5cdH1cblxuXHRpbnNlcnQoc3RyKXtcblx0XHRjb25zdCB7Y29udGVudCwgbG9jfT10aGlzLnN0YXRlXG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGVudDpjb250ZW50LnNwbGljZShsb2MsMCxzdHIpLCBsb2M6bG9jK3N0ci5sZW5ndGh9LGU9PnRoaXMucmVDb21wb3NlKCkpXG5cdH1cblxuXHRibHVyKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bG9jOnVuZGVmaW5lZH0pXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcblx0fSxTdXBlci5jb250ZXh0VHlwZXMpXG59XG4iXX0=