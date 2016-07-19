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
			var descent = _composed$props.descent;
			var text = _composed$props.children;

			text = _react2.default.cloneElement(text, { onClick: function onClick(e) {
					return _this2.onClick(e, props);
				} });

			var ps = { width: width, height: height, descent: descent };
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
						height: composer.height,
						descent: composer.descent,
						style: style });
				};
			}
			return _react2.default.createElement(
				_group2.default,
				ps,
				text
			);
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
				descent: composer.descent,
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxzQ0FBTjs7Ozs7QUFFSCxtQkFBYTs7O3lGQUNILFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVcsT0FBTyxNQUFQLENBQWMsaUVBQWEsRUFBYixFQUFnQixFQUFDLFNBQVEsTUFBSyxLQUFMLENBQVcsUUFBWCxFQUF2QyxDQUFYLENBRlk7O0VBQWI7Ozs7b0NBS2lCO0FBQ2hCLFVBQU8sQ0FBUCxDQURnQjs7Ozt3Q0FJSyxPQUFNOzs7QUFDM0IsT0FBSSxvR0FBd0MsVUFBeEMsQ0FEdUI7eUJBRWlCLFNBQVMsS0FBVCxDQUZqQjtPQUV0Qiw4QkFGc0I7T0FFZixnQ0FGZTtPQUVQLGtDQUZPO09BRVcsdUJBQVQsU0FGRjs7QUFHM0IsVUFBSyxnQkFBTSxZQUFOLENBQW1CLElBQW5CLEVBQXdCLEVBQUMsU0FBUTtZQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxLQUFmO0tBQUgsRUFBakMsQ0FBTCxDQUgyQjs7QUFLM0IsT0FBSSxLQUFHLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBYyxnQkFBZCxFQUFILENBTHVCO09BTXBCLE1BQTBCLE1BQTFCLElBTm9CO09BTUwsWUFBVyxNQUFyQixTQU5lOzs7QUFRM0IsT0FBSSxTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsTUFBdUIsRUFBQyxPQUFNLEVBQU4sRUFBeEIsQ0FSZ0I7dUJBU0QsT0FBTyxLQUFQLENBVEM7T0FTdEIsOEJBVHNCO09BU1gseUJBQUosR0FUZTs7O0FBVzNCLE9BQUcsVUFBUSxJQUFSLElBQWdCLE1BQUksVUFBVSxNQUFWLEdBQWlCLFFBQXJCLElBQWlDLFlBQVUsR0FBVixFQUFjO0FBQ2pFLE9BQUcsR0FBSCxHQUFPLGFBQUc7QUFDVCxTQUFJLE9BQUssbUJBQVMsV0FBVCxDQUFxQixDQUFyQixDQUFMLENBREs7QUFFVCxTQUFJLE9BQUssVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW1CLFlBQVUsTUFBSSxVQUFVLE1BQVYsQ0FBZCxDQUF4QixDQUZLO0FBR1QsU0FBSSxRQUFNLE9BQUssUUFBTCxFQUFOLENBSEs7QUFJVCxTQUFJLFdBQVMsSUFBSSxPQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsSUFBakMsRUFBdUMsS0FBdkMsQ0FBVCxDQUpLOztnQkFLc0IsU0FBUyxJQUFULENBQWMsRUFBQyxZQUFELEVBQWQsS0FBd0IsRUFBQyxLQUFJLENBQUosRUFBekIsQ0FMdEI7O1NBS0osaUNBTEk7U0FLVSw2QkFMVjs7QUFNVCxZQUFPLFFBQVAsQ0FBZ0I7QUFDZixvQkFEZTtBQUVmLFVBQUcsUUFBSDtBQUNBLGdCQUhlO0FBSWYsYUFBTSxZQUFOO0FBQ0EsY0FBTyxTQUFTLE1BQVQ7QUFDUCxlQUFTLFNBQVMsT0FBVDtBQUNULGtCQVBlLEVBQWhCLEVBTlM7S0FBSCxDQUQwRDtJQUFsRTtBQWlCQSxVQUNDOztJQUFXLEVBQVg7SUFDQyxJQUREO0lBREQsQ0E1QjJCOzs7OzBCQW1DakIsT0FBTyxNQUFLOzRCQUM2QixNQUE1QyxZQURlO2tEQUNGLFFBREU7T0FDRixnREFBUSwwQkFETjttREFDUyxRQURUO09BQ1MsaURBQVEsMkJBRGpCO09BQ3FCLFNBQVEsTUFBUixPQURyQjs7QUFFaEIsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBRlk7QUFHaEIsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxFQUFlLEtBQWhELENBQVQsQ0FIWTs7ZUFJTyxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTixFQUFmLEtBQWdDLEVBQUMsS0FBSSxDQUFKLEVBQU0sY0FBYSxDQUFiLEVBQXZDLENBSlA7O09BSVgsa0NBSlc7T0FJRSxnQkFKRjs7QUFLaEIsT0FBSSxRQUFNLEtBQUssR0FBTCxHQUFTLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBcUIsR0FBOUIsQ0FMTTtBQU10QixPQUFJLFNBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixFQUFQLENBTmtCO0FBT3RCLFVBQU8sUUFBUCxDQUFnQjtBQUNmLFlBQU8sSUFBUDtBQUNBLFFBQUksS0FBSjtBQUNBLFVBQUssT0FBTyxVQUFQO0FBQ0wsV0FBTSxLQUFLLElBQUwsQ0FBVSxZQUFWLENBQU47QUFDQSxZQUFPLFNBQVMsTUFBVDtBQUNQLGFBQVMsU0FBUyxPQUFUO0FBQ1QsZ0JBUGUsRUFBaEIsRUFQc0I7Ozs7eUJBaUJoQixPQUFPLFFBQVEsS0FBSTs7O09BQ2xCLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEa0I7O0FBRXpCLFFBQUssUUFBTCxDQUFjLEVBQUMsU0FBUSxRQUFRLE1BQVIsQ0FBZSxLQUFmLEVBQXFCLE1BQXJCLEVBQTRCLEdBQTVCLENBQVIsRUFBZixFQUF5RCxhQUFHO0FBQzNELFdBQUssU0FBTCxHQUQyRDtJQUFILENBQXpELENBRnlCOzs7OztFQTlERTs7T0FxRXJCLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsU0FBUSxpQkFBVSxJQUFWO0NBRFcsRUFFbEIsTUFBTSxZQUFOIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCB7U2hhcGUgYXMgQ3Vyc29yU2hhcGV9IGZyb20gXCIuL2N1cnNvclwiXG5cbmxldCBTdXBlcj1lZGl0YWJsZShUZXh0KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcblx0fVxuXHRcblx0Z2V0Q29udGVudENvdW50KCl7XG5cdFx0cmV0dXJuIDFcblx0fVxuXHRcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRsZXQgY29tcG9zZWQ9c3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KC4uLmFyZ3VtZW50cylcblx0XHRsZXQge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIGNoaWxkcmVuOnRleHR9PWNvbXBvc2VkLnByb3BzXG5cdFx0dGV4dD1SZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7b25DbGljazplPT50aGlzLm9uQ2xpY2soZSxwcm9wcyl9KVxuXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHQsZGVzY2VudH1cblx0XHRjb25zdCB7ZW5kLCBjaGlsZHJlbjogdGV4dHBpZWNlfT1wcm9wc1xuXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKCl8fHtzdGF0ZTp7fX1cblx0XHRsZXQge3RhcmdldCxhdDogY3Vyc29yQXR9PWN1cnNvci5zdGF0ZVxuXHRcdFxuXHRcdGlmKHRhcmdldD09dGhpcyAmJiBlbmQtdGV4dHBpZWNlLmxlbmd0aDxjdXJzb3JBdCAmJiBjdXJzb3JBdDw9ZW5kKXtcblx0XHRcdHBzLnJlZj1hPT57XG5cdFx0XHRcdGxldCBub2RlPVJlYWN0RE9NLmZpbmRET01Ob2RlKGEpXG5cdFx0XHRcdGxldCB0ZXh0PXRleHRwaWVjZS5zdWJzdHIoMCxjdXJzb3JBdC0oZW5kLXRleHRwaWVjZS5sZW5ndGgpKVxuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXG5cdFx0XHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcih0ZXh0LCBzdHlsZSlcblx0XHRcdFx0bGV0IHtjb250ZW50V2lkdGgsIGZvbnRGYW1pbHl9PWNvbXBvc2VyLm5leHQoe3dpZHRofSl8fHtlbmQ6MH1cblx0XHRcdFx0Y3Vyc29yLnNldFN0YXRlKHtcblx0XHRcdFx0XHR0YXJnZXQ6dGhpcyxcblx0XHRcdFx0XHRhdDpjdXJzb3JBdCxcblx0XHRcdFx0XHRub2RlLFxuXHRcdFx0XHRcdHdpZHRoOmNvbnRlbnRXaWR0aCxcblx0XHRcdFx0XHRoZWlnaHQ6Y29tcG9zZXIuaGVpZ2h0LCBcblx0XHRcdFx0XHRkZXNjZW50OiBjb21wb3Nlci5kZXNjZW50LCBcblx0XHRcdFx0XHRzdHlsZX0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgey4uLnBzfT5cblx0XHRcdHt0ZXh0fVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XG5cdFx0Y29uc3Qge25hdGl2ZUV2ZW50OntvZmZzZXRYPTAsIG9mZnNldFk9MH0sIHRhcmdldH09ZXZlbnRcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbiwgc3R5bGUpXG4gICAgICAgIGxldCB7Y29udGVudFdpZHRoLGVuZH09Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjAsY29udGVudFdpZHRoOjB9XG4gICAgICAgIGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtlbmRcblx0XHRsZXQgY3Vyc29yPXRoaXMuY29udGV4dC5jdXJzb3IoKVxuXHRcdGN1cnNvci5zZXRTdGF0ZSh7XG5cdFx0XHR0YXJnZXQ6dGhpcyxcblx0XHRcdGF0OiBpbmRleCxcblx0XHRcdG5vZGU6dGFyZ2V0LnBhcmVudE5vZGUsXG5cdFx0XHR3aWR0aDpNYXRoLmNlaWwoY29udGVudFdpZHRoKSxcblx0XHRcdGhlaWdodDpjb21wb3Nlci5oZWlnaHQsXG5cdFx0XHRkZXNjZW50OiBjb21wb3Nlci5kZXNjZW50LFxuXHRcdFx0c3R5bGUgfSlcbiAgICB9XG5cblx0c3BsaWNlKHN0YXJ0LCBsZW5ndGgsIHN0cil7XG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcblx0XHR0aGlzLnNldFN0YXRlKHtjb250ZW50OmNvbnRlbnQuc3BsaWNlKHN0YXJ0LGxlbmd0aCxzdHIpfSxlPT57XG5cdFx0XHR0aGlzLnJlQ29tcG9zZSgpXHRcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19