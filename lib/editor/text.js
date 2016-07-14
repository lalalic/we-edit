"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		_this.state = Object.assign(_get(Object.getPrototypeOf(_class.prototype), "state", _this) || {}, { content: _this.props.children });
		return _this;
	}

	_createClass(_class, [{
		key: "getContentCount",
		value: function getContentCount() {
			return 1;
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var _this2 = this;

			var composed = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _composed$props = composed.props;
			var width = _composed$props.width;
			var height = _composed$props.height;
			var text = _composed$props.children;

			text = _react2.default.cloneElement(text, { onClick: function onClick(e) {
					return _this2.onClick(e, props);
				} });

			var ps = { width: width, height: height };
			var end = props.end;
			var textpiece = props.children;


			var cursor = this.context.cursor() || { state: {} };
			var _cursor$state = cursor.state;
			var target = _cursor$state.target;
			var cursorAt = _cursor$state.at;


			if (target == this && end - textpiece.length < cursorAt && cursorAt <= end) {
				ps.ref = function (a) {
					var node = _reactDom2.default.findDOMNode(a);
					var text = textpiece.substr(0, cursorAt - (end - textpiece.length));
					var style = _this2.getStyle();
					var composer = new _this2.constructor.WordWrapper(text, style);

					var _ref = composer.next({ width: width }) || { end: 0 };

					var contentWidth = _ref.contentWidth;
					var fontFamily = _ref.fontFamily;

					cursor.setState({
						target: _this2,
						at: cursorAt,
						node: node,
						width: contentWidth,
						height: composer.height, style: style });
				};
				return _react2.default.createElement(
					CursorFocusedGroup,
					ps,
					text
				);
			} else {
				return _react2.default.createElement(
					_group2.default,
					{ height: height, width: width },
					text
				);
			}
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _event$nativeEvent = event.nativeEvent;
			var _event$nativeEvent$of = _event$nativeEvent.offsetX;
			var offsetX = _event$nativeEvent$of === undefined ? 0 : _event$nativeEvent$of;
			var _event$nativeEvent$of2 = _event$nativeEvent.offsetY;
			var offsetY = _event$nativeEvent$of2 === undefined ? 0 : _event$nativeEvent$of2;
			var target = event.target;

			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);

			var _ref2 = composer.next({ width: offsetX }) || { end: 0, contentWidth: 0 };

			var contentWidth = _ref2.contentWidth;
			var end = _ref2.end;

			var index = text.end - text.children.length + end;
			var cursor = this.context.cursor();
			cursor.setState({
				target: this,
				at: index,
				node: target.parentNode,
				width: Math.ceil(contentWidth),
				height: composer.height,
				style: style });
		}
	}, {
		key: "splice",
		value: function splice(start, length, str) {
			var _this3 = this;

			var content = this.state.content;

			this.setState({ content: content.splice(start, length, str) }, function (e) {
				_this3.reCompose();
			});
		}
	}]);

	return _class;
}(Super);

_class.contextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;

var CursorFocusedGroup = function (_Group) {
	_inherits(CursorFocusedGroup, _Group);

	function CursorFocusedGroup() {
		_classCallCheck(this, CursorFocusedGroup);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CursorFocusedGroup).apply(this, arguments));
	}

	_createClass(CursorFocusedGroup, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var onUpdate = _props.onUpdate;

			var others = _objectWithoutProperties(_props, ["onUpdate"]);

			return _react2.default.createElement(_group2.default, others);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			console.info("a cursor will be unmounted");
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			//this.props.onUpdate(this)
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			//this.props.onUpdate(this)
		}
	}]);

	return CursorFocusedGroup;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLHNDQUFOOzs7OztBQUVILG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixRQUFLLEtBQUwsR0FBVyxPQUFPLE1BQVAsQ0FBYyxpRUFBYSxFQUFiLEVBQWdCLEVBQUMsU0FBUSxNQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXZDLENBQVgsQ0FGWTs7RUFBYjs7OztvQ0FLaUI7QUFDaEIsVUFBTyxDQUFQLENBRGdCOzs7O3dDQUlLLE9BQU07OztBQUMzQixPQUFJLG9HQUF3QyxVQUF4QyxDQUR1Qjt5QkFFUSxTQUFTLEtBQVQsQ0FGUjtPQUV0Qiw4QkFGc0I7T0FFZixnQ0FGZTtPQUVFLHVCQUFULFNBRk87O0FBRzNCLFVBQUssZ0JBQU0sWUFBTixDQUFtQixJQUFuQixFQUF3QixFQUFDLFNBQVE7WUFBRyxPQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsS0FBZjtLQUFILEVBQWpDLENBQUwsQ0FIMkI7O0FBSzNCLE9BQUksS0FBRyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQUgsQ0FMdUI7T0FNcEIsTUFBMEIsTUFBMUIsSUFOb0I7T0FNTCxZQUFXLE1BQXJCLFNBTmU7OztBQVEzQixPQUFJLFNBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixNQUF1QixFQUFDLE9BQU0sRUFBTixFQUF4QixDQVJnQjt1QkFTRCxPQUFPLEtBQVAsQ0FUQztPQVN0Qiw4QkFUc0I7T0FTWCx5QkFBSixHQVRlOzs7QUFXM0IsT0FBRyxVQUFRLElBQVIsSUFBZ0IsTUFBSSxVQUFVLE1BQVYsR0FBaUIsUUFBckIsSUFBaUMsWUFBVSxHQUFWLEVBQWM7QUFDakUsT0FBRyxHQUFILEdBQU8sYUFBRztBQUNULFNBQUksT0FBSyxtQkFBUyxXQUFULENBQXFCLENBQXJCLENBQUwsQ0FESztBQUVULFNBQUksT0FBSyxVQUFVLE1BQVYsQ0FBaUIsQ0FBakIsRUFBbUIsWUFBVSxNQUFJLFVBQVUsTUFBVixDQUFkLENBQXhCLENBRks7QUFHVCxTQUFJLFFBQU0sT0FBSyxRQUFMLEVBQU4sQ0FISztBQUlULFNBQUksV0FBUyxJQUFJLE9BQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixJQUFqQyxFQUF1QyxLQUF2QyxDQUFULENBSks7O2dCQUtzQixTQUFTLElBQVQsQ0FBYyxFQUFDLFlBQUQsRUFBZCxLQUF3QixFQUFDLEtBQUksQ0FBSixFQUF6QixDQUx0Qjs7U0FLSixpQ0FMSTtTQUtVLDZCQUxWOztBQU1ULFlBQU8sUUFBUCxDQUFnQjtBQUNmLG9CQURlO0FBRWYsVUFBRyxRQUFIO0FBQ0EsZ0JBSGU7QUFJZixhQUFNLFlBQU47QUFDQSxjQUFPLFNBQVMsTUFBVCxFQUFpQixZQUxULEVBQWhCLEVBTlM7S0FBSCxDQUQwRDtBQWMzRCxXQUNMO0FBQUMsdUJBQUQ7S0FBd0IsRUFBeEI7S0FDRSxJQURGO0tBREssQ0FkMkQ7SUFBbEUsTUFtQk07QUFDTCxXQUNDOztPQUFPLFFBQVEsTUFBUixFQUFnQixPQUFPLEtBQVAsRUFBdkI7S0FDQyxJQUREO0tBREQsQ0FESztJQW5CTjs7OzswQkE0QlUsT0FBTyxNQUFLOzRCQUM2QixNQUE1QyxZQURlO2tEQUNGLFFBREU7T0FDRixnREFBUSwwQkFETjttREFDUyxRQURUO09BQ1MsaURBQVEsMkJBRGpCO09BQ3FCLFNBQVEsTUFBUixPQURyQjs7QUFFaEIsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBRlk7QUFHaEIsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxFQUFlLEtBQWhELENBQVQsQ0FIWTs7ZUFJTyxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTixFQUFmLEtBQWdDLEVBQUMsS0FBSSxDQUFKLEVBQU0sY0FBYSxDQUFiLEVBQXZDLENBSlA7O09BSVgsa0NBSlc7T0FJRSxnQkFKRjs7QUFLaEIsT0FBSSxRQUFNLEtBQUssR0FBTCxHQUFTLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBcUIsR0FBOUIsQ0FMTTtBQU10QixPQUFJLFNBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixFQUFQLENBTmtCO0FBT3RCLFVBQU8sUUFBUCxDQUFnQjtBQUNmLFlBQU8sSUFBUDtBQUNBLFFBQUksS0FBSjtBQUNBLFVBQUssT0FBTyxVQUFQO0FBQ0wsV0FBTSxLQUFLLElBQUwsQ0FBVSxZQUFWLENBQU47QUFDQSxZQUFPLFNBQVMsTUFBVDtBQUNQLGdCQU5lLEVBQWhCLEVBUHNCOzs7O3lCQWdCaEIsT0FBTyxRQUFRLEtBQUk7OztPQUNsQixVQUFTLEtBQUssS0FBTCxDQUFULFFBRGtCOztBQUV6QixRQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsUUFBUSxNQUFSLENBQWUsS0FBZixFQUFxQixNQUFyQixFQUE0QixHQUE1QixDQUFSLEVBQWYsRUFBeUQsYUFBRztBQUMzRCxXQUFLLFNBQUwsR0FEMkQ7SUFBSCxDQUF6RCxDQUZ5Qjs7Ozs7RUFqRUU7O09Bd0VyQixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLFNBQVEsaUJBQVUsSUFBVjtDQURXLEVBRWxCLE1BQU0sWUFBTjs7O0lBR0c7Ozs7Ozs7Ozs7OzJCQUNHO2dCQUNxQixLQUFLLEtBQUwsQ0FEckI7T0FDQSwyQkFEQTs7T0FDYSx3REFEYjs7QUFFUCxVQUFRLCtDQUFXLE1BQVgsQ0FBUixDQUZPOzs7O3lDQUljO0FBQ3JCLFdBQVEsSUFBUixDQUFhLDRCQUFiLEVBRHFCOzs7O3NDQUdIOzs7Ozt1Q0FJQzs7Ozs7UUFaZiIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQge1NoYXBlIGFzIEN1cnNvclNoYXBlfSBmcm9tIFwiLi9jdXJzb3JcIlxuXG5sZXQgU3VwZXI9ZWRpdGFibGUoVGV4dClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3VwZXJ7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9T2JqZWN0LmFzc2lnbihzdXBlci5zdGF0ZXx8e30se2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbn0pXG5cdH1cblx0XG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiAxXG5cdH1cblx0XG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0bGV0IGNvbXBvc2VkPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0LCBjaGlsZHJlbjp0ZXh0fT1jb21wb3NlZC5wcm9wc1xuXHRcdHRleHQ9UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse29uQ2xpY2s6ZT0+dGhpcy5vbkNsaWNrKGUscHJvcHMpfSlcblxuXHRcdGxldCBwcz17d2lkdGgsaGVpZ2h0fVxuXHRcdGNvbnN0IHtlbmQsIGNoaWxkcmVuOiB0ZXh0cGllY2V9PXByb3BzXG5cblx0XHRsZXQgY3Vyc29yPXRoaXMuY29udGV4dC5jdXJzb3IoKXx8e3N0YXRlOnt9fVxuXHRcdGxldCB7dGFyZ2V0LGF0OiBjdXJzb3JBdH09Y3Vyc29yLnN0YXRlXG5cdFx0XG5cdFx0aWYodGFyZ2V0PT10aGlzICYmIGVuZC10ZXh0cGllY2UubGVuZ3RoPGN1cnNvckF0ICYmIGN1cnNvckF0PD1lbmQpe1xuXHRcdFx0cHMucmVmPWE9Pntcblx0XHRcdFx0bGV0IG5vZGU9UmVhY3RET00uZmluZERPTU5vZGUoYSlcblx0XHRcdFx0bGV0IHRleHQ9dGV4dHBpZWNlLnN1YnN0cigwLGN1cnNvckF0LShlbmQtdGV4dHBpZWNlLmxlbmd0aCkpXG5cdFx0XHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcblx0XHRcdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQsIHN0eWxlKVxuXHRcdFx0XHRsZXQge2NvbnRlbnRXaWR0aCwgZm9udEZhbWlseX09Y29tcG9zZXIubmV4dCh7d2lkdGh9KXx8e2VuZDowfVxuXHRcdFx0XHRjdXJzb3Iuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdHRhcmdldDp0aGlzLFxuXHRcdFx0XHRcdGF0OmN1cnNvckF0LFxuXHRcdFx0XHRcdG5vZGUsXG5cdFx0XHRcdFx0d2lkdGg6Y29udGVudFdpZHRoLFxuXHRcdFx0XHRcdGhlaWdodDpjb21wb3Nlci5oZWlnaHQsIHN0eWxlfSlcblx0XHRcdH1cblx0ICAgICAgICByZXR1cm4gKFxuXHRcdFx0XHQ8Q3Vyc29yRm9jdXNlZEdyb3VwIHsuLi5wc30+XG5cdFx0XHRcdFx0e3RleHR9XG5cdFx0XHRcdDwvQ3Vyc29yRm9jdXNlZEdyb3VwPlxuXHRcdFx0KVxuXHRcdH1lbHNlIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxHcm91cCBoZWlnaHQ9e2hlaWdodH0gd2lkdGg9e3dpZHRofT5cblx0XHRcdFx0e3RleHR9XG5cdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHQpXG5cdFx0fVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuXHRcdGNvbnN0IHtuYXRpdmVFdmVudDp7b2Zmc2V0WD0wLCBvZmZzZXRZPTB9LCB0YXJnZXR9PWV2ZW50XG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQuY2hpbGRyZW4sIHN0eWxlKVxuICAgICAgICBsZXQge2NvbnRlbnRXaWR0aCxlbmR9PWNvbXBvc2VyLm5leHQoe3dpZHRoOm9mZnNldFh9KXx8e2VuZDowLGNvbnRlbnRXaWR0aDowfVxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrZW5kXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKClcblx0XHRjdXJzb3Iuc2V0U3RhdGUoe1xuXHRcdFx0dGFyZ2V0OnRoaXMsXG5cdFx0XHRhdDogaW5kZXgsXG5cdFx0XHRub2RlOnRhcmdldC5wYXJlbnROb2RlLFxuXHRcdFx0d2lkdGg6TWF0aC5jZWlsKGNvbnRlbnRXaWR0aCksXG5cdFx0XHRoZWlnaHQ6Y29tcG9zZXIuaGVpZ2h0LFxuXHRcdFx0c3R5bGUgfSlcbiAgICB9XG5cblx0c3BsaWNlKHN0YXJ0LCBsZW5ndGgsIHN0cil7XG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcblx0XHR0aGlzLnNldFN0YXRlKHtjb250ZW50OmNvbnRlbnQuc3BsaWNlKHN0YXJ0LGxlbmd0aCxzdHIpfSxlPT57XG5cdFx0XHR0aGlzLnJlQ29tcG9zZSgpXHRcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuXG5jbGFzcyBDdXJzb3JGb2N1c2VkR3JvdXAgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge29uVXBkYXRlLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKDxHcm91cCB7Li4ub3RoZXJzfS8+KVxuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0Y29uc29sZS5pbmZvKFwiYSBjdXJzb3Igd2lsbCBiZSB1bm1vdW50ZWRcIilcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdC8vdGhpcy5wcm9wcy5vblVwZGF0ZSh0aGlzKVxuXHR9XG5cdFxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHQvL3RoaXMucHJvcHMub25VcGRhdGUodGhpcylcblx0fVxufVxuIl19