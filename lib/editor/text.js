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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
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
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLHNDQUFOOzs7Ozs7Ozs7Ozs7O3dDQUVtQixPQUFNOzs7QUFDM0IsT0FBSSxvR0FBd0MsVUFBeEMsQ0FEdUI7eUJBRVEsU0FBUyxLQUFULENBRlI7T0FFdEIsOEJBRnNCO09BRWYsZ0NBRmU7T0FFRSx1QkFBVCxTQUZPOztBQUczQixVQUFLLGdCQUFNLFlBQU4sQ0FBbUIsSUFBbkIsRUFBd0IsRUFBQyxTQUFRO1lBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLEtBQWY7S0FBSCxFQUFqQyxDQUFMLENBSDJCOztBQUszQixPQUFJLEtBQUcsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFILENBTHVCO09BTXBCLE1BQTBCLE1BQTFCLElBTm9CO09BTUwsWUFBVyxNQUFyQixTQU5lOzs7QUFRM0IsT0FBSSxTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsTUFBdUIsRUFBQyxPQUFNLEVBQU4sRUFBeEIsQ0FSZ0I7dUJBU0QsT0FBTyxLQUFQLENBVEM7T0FTdEIsOEJBVHNCO09BU1gseUJBQUosR0FUZTs7O0FBVzNCLE9BQUcsVUFBUSxJQUFSLElBQWdCLE1BQUksVUFBVSxNQUFWLEdBQWlCLFFBQXJCLElBQWlDLFlBQVUsR0FBVixFQUFjO0FBQ2pFLE9BQUcsR0FBSCxHQUFPLGFBQUc7QUFDVCxTQUFJLE9BQUssbUJBQVMsV0FBVCxDQUFxQixDQUFyQixDQUFMLENBREs7QUFFVCxTQUFJLE9BQUssVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW1CLFlBQVUsTUFBSSxVQUFVLE1BQVYsQ0FBZCxDQUF4QixDQUZLO0FBR1QsU0FBSSxRQUFNLE9BQUssUUFBTCxFQUFOLENBSEs7QUFJVCxTQUFJLFdBQVMsSUFBSSxPQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsSUFBakMsRUFBdUMsS0FBdkMsQ0FBVCxDQUpLOztnQkFLc0IsU0FBUyxJQUFULENBQWMsRUFBQyxZQUFELEVBQWQsS0FBd0IsRUFBQyxLQUFJLENBQUosRUFBekIsQ0FMdEI7O1NBS0osaUNBTEk7U0FLVSw2QkFMVjs7QUFNVCxZQUFPLFFBQVAsQ0FBZ0I7QUFDZixvQkFEZTtBQUVmLFVBQUcsUUFBSDtBQUNBLGdCQUhlO0FBSWYsYUFBTSxZQUFOO0FBQ0EsY0FBTyxTQUFTLE1BQVQsRUFBaUIsWUFMVCxFQUFoQixFQU5TO0tBQUgsQ0FEMEQ7QUFjM0QsV0FDTDtBQUFDLHVCQUFEO0tBQXdCLEVBQXhCO0tBQ0UsSUFERjtLQURLLENBZDJEO0lBQWxFLE1BbUJNO0FBQ0wsV0FDQzs7T0FBTyxRQUFRLE1BQVIsRUFBZ0IsT0FBTyxLQUFQLEVBQXZCO0tBQ0MsSUFERDtLQURELENBREs7SUFuQk47Ozs7MEJBNEJVLE9BQU8sTUFBSzs0QkFDeUIsTUFBeEMsWUFEZTtPQUNGLHFDQURFO09BQ08scUNBRFA7T0FDaUIsU0FBUSxNQUFSLE9BRGpCOztBQUVoQixPQUFJLFFBQU0sS0FBSyxRQUFMLEVBQU4sQ0FGWTtBQUdoQixPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFMLEVBQWUsS0FBaEQsQ0FBVCxDQUhZOztlQUlPLFNBQVMsSUFBVCxDQUFjLEVBQUMsT0FBTSxPQUFOLEVBQWYsS0FBZ0MsRUFBQyxLQUFJLENBQUosRUFBTSxjQUFhLENBQWIsRUFBdkMsQ0FKUDs7T0FJWCxrQ0FKVztPQUlFLGdCQUpGOztBQUtoQixPQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixHQUE5QixDQUxNO0FBTXRCLE9BQUksU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQVAsQ0FOa0I7QUFPdEIsVUFBTyxRQUFQLENBQWdCO0FBQ2YsWUFBTyxJQUFQO0FBQ0EsUUFBSSxLQUFKO0FBQ0EsVUFBSyxPQUFPLFVBQVA7QUFDTCxXQUFNLEtBQUssSUFBTCxDQUFVLFlBQVYsQ0FBTjtBQUNBLFlBQU8sU0FBUyxNQUFUO0FBQ1AsZ0JBTmUsRUFBaEIsRUFQc0I7Ozs7eUJBZ0JoQixPQUFPLFFBQVEsS0FBSTs7O09BQ2xCLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEa0I7O0FBRXpCLFFBQUssUUFBTCxDQUFjLEVBQUMsU0FBUSxRQUFRLE1BQVIsQ0FBZSxLQUFmLEVBQXFCLE1BQXJCLEVBQTRCLEdBQTVCLENBQVIsRUFBZixFQUF5RCxhQUFHO0FBQzNELFdBQUssU0FBTCxHQUQyRDtJQUFILENBQXpELENBRnlCOzs7OztFQXhERTs7T0ErRHJCLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsU0FBUSxpQkFBVSxJQUFWO0NBRFcsRUFFbEIsTUFBTSxZQUFOOzs7SUFHRzs7Ozs7Ozs7Ozs7MkJBQ0c7Z0JBQ3FCLEtBQUssS0FBTCxDQURyQjtPQUNBLDJCQURBOztPQUNhLHdEQURiOztBQUVQLFVBQVEsK0NBQVcsTUFBWCxDQUFSLENBRk87Ozs7eUNBSWM7QUFDckIsV0FBUSxJQUFSLENBQWEsNEJBQWIsRUFEcUI7Ozs7c0NBR0g7Ozs7O3VDQUlDOzs7OztRQVpmIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCB7U2hhcGUgYXMgQ3Vyc29yU2hhcGV9IGZyb20gXCIuL2N1cnNvclwiXG5cbmxldCBTdXBlcj1lZGl0YWJsZShUZXh0KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRsZXQgY29tcG9zZWQ9c3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KC4uLmFyZ3VtZW50cylcblx0XHRsZXQge3dpZHRoLCBoZWlnaHQsIGNoaWxkcmVuOnRleHR9PWNvbXBvc2VkLnByb3BzXG5cdFx0dGV4dD1SZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7b25DbGljazplPT50aGlzLm9uQ2xpY2soZSxwcm9wcyl9KVxuXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHR9XG5cdFx0Y29uc3Qge2VuZCwgY2hpbGRyZW46IHRleHRwaWVjZX09cHJvcHNcblxuXHRcdGxldCBjdXJzb3I9dGhpcy5jb250ZXh0LmN1cnNvcigpfHx7c3RhdGU6e319XG5cdFx0bGV0IHt0YXJnZXQsYXQ6IGN1cnNvckF0fT1jdXJzb3Iuc3RhdGVcblx0XHRcblx0XHRpZih0YXJnZXQ9PXRoaXMgJiYgZW5kLXRleHRwaWVjZS5sZW5ndGg8Y3Vyc29yQXQgJiYgY3Vyc29yQXQ8PWVuZCl7XG5cdFx0XHRwcy5yZWY9YT0+e1xuXHRcdFx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZShhKVxuXHRcdFx0XHRsZXQgdGV4dD10ZXh0cGllY2Uuc3Vic3RyKDAsY3Vyc29yQXQtKGVuZC10ZXh0cGllY2UubGVuZ3RoKSlcblx0XHRcdFx0bGV0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxuXHRcdFx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dCwgc3R5bGUpXG5cdFx0XHRcdGxldCB7Y29udGVudFdpZHRoLCBmb250RmFtaWx5fT1jb21wb3Nlci5uZXh0KHt3aWR0aH0pfHx7ZW5kOjB9XG5cdFx0XHRcdGN1cnNvci5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0dGFyZ2V0OnRoaXMsXG5cdFx0XHRcdFx0YXQ6Y3Vyc29yQXQsXG5cdFx0XHRcdFx0bm9kZSxcblx0XHRcdFx0XHR3aWR0aDpjb250ZW50V2lkdGgsXG5cdFx0XHRcdFx0aGVpZ2h0OmNvbXBvc2VyLmhlaWdodCwgc3R5bGV9KVxuXHRcdFx0fVxuXHQgICAgICAgIHJldHVybiAoXG5cdFx0XHRcdDxDdXJzb3JGb2N1c2VkR3JvdXAgey4uLnBzfT5cblx0XHRcdFx0XHR7dGV4dH1cblx0XHRcdFx0PC9DdXJzb3JGb2N1c2VkR3JvdXA+XG5cdFx0XHQpXG5cdFx0fWVsc2Uge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEdyb3VwIGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxuXHRcdFx0XHR7dGV4dH1cblx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdClcblx0XHR9XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XG5cdFx0Y29uc3Qge25hdGl2ZUV2ZW50OntvZmZzZXRYLCBvZmZzZXRZfSwgdGFyZ2V0fT1ldmVudFxuICAgICAgICBsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcih0ZXh0LmNoaWxkcmVuLCBzdHlsZSlcbiAgICAgICAgbGV0IHtjb250ZW50V2lkdGgsZW5kfT1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cbiAgICAgICAgbGV0IGluZGV4PXRleHQuZW5kLXRleHQuY2hpbGRyZW4ubGVuZ3RoK2VuZFxuXHRcdGxldCBjdXJzb3I9dGhpcy5jb250ZXh0LmN1cnNvcigpXG5cdFx0Y3Vyc29yLnNldFN0YXRlKHtcblx0XHRcdHRhcmdldDp0aGlzLFxuXHRcdFx0YXQ6IGluZGV4LFxuXHRcdFx0bm9kZTp0YXJnZXQucGFyZW50Tm9kZSxcblx0XHRcdHdpZHRoOk1hdGguY2VpbChjb250ZW50V2lkdGgpLFxuXHRcdFx0aGVpZ2h0OmNvbXBvc2VyLmhlaWdodCxcblx0XHRcdHN0eWxlIH0pXG4gICAgfVxuXG5cdHNwbGljZShzdGFydCwgbGVuZ3RoLCBzdHIpe1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGVudDpjb250ZW50LnNwbGljZShzdGFydCxsZW5ndGgsc3RyKX0sZT0+e1xuXHRcdFx0dGhpcy5yZUNvbXBvc2UoKVx0XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0Y3Vyc29yOiBQcm9wVHlwZXMuZnVuY1xuXHR9LFN1cGVyLmNvbnRleHRUeXBlcylcbn1cblxuY2xhc3MgQ3Vyc29yRm9jdXNlZEdyb3VwIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtvblVwZGF0ZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuICg8R3JvdXAgey4uLm90aGVyc30vPilcblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdGNvbnNvbGUuaW5mbyhcImEgY3Vyc29yIHdpbGwgYmUgdW5tb3VudGVkXCIpXG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHQvL3RoaXMucHJvcHMub25VcGRhdGUodGhpcylcblx0fVxuXHRcblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0Ly90aGlzLnByb3BzLm9uVXBkYXRlKHRoaXMpXG5cdH1cbn1cbiJdfQ==