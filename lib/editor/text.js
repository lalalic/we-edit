"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

			var cursor = this.context.cursor() || { state: {} };
			var _cursor$state = cursor.state;
			var target = _cursor$state.target;
			var cursorAt = _cursor$state.at;

			if (target != this) {
				return _react2.default.createElement(
					_group2.default,
					{ height: height, width: width },
					text
				);
			}

			var ps = { width: width, height: height };
			var end = props.end;
			var textpiece = props.children;


			if (end - textpiece.length < cursorAt && cursorAt <= end) {
				ps.ref = function (a) {
					var node = ReactDOM.findDOMNode(a);
					var text = textpiece.substr(0, cursorAt - (end - textpiece.length));
					var composer = new _this2.constructor.WordWrapper(text, style);

					var _ref = composer.next({ width: width }) || { end: 0 };

					var contentWidth = _ref.contentWidth;
					var fontFamily = _ref.fontFamily;

					var style = _this2.getStyle();
					cursor.setState({
						target: _this2,
						at: cursorAt,
						node: node,
						width: contentWidth,
						height: composer.height, style: style });
				};
				return _react2.default.createElement(
					_group2.default,
					ps,
					text
				);
			} else {
				return composed;
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
				node: event.target.parentNode,
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
				return _this3.reCompose();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sc0NBQU47Ozs7Ozs7Ozs7Ozs7d0NBRW1CLE9BQU07OztBQUMzQixPQUFJLG9HQUF3QyxVQUF4QyxDQUR1Qjt5QkFFUSxTQUFTLEtBQVQsQ0FGUjtPQUV0Qiw4QkFGc0I7T0FFZixnQ0FGZTtPQUVFLHVCQUFULFNBRk87O0FBRzNCLFVBQUssZ0JBQU0sWUFBTixDQUFtQixJQUFuQixFQUF3QixFQUFDLFNBQVE7WUFBRyxPQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsS0FBZjtLQUFILEVBQWpDLENBQUwsQ0FIMkI7O0FBSzNCLE9BQUksU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLE1BQXVCLEVBQUMsT0FBTSxFQUFOLEVBQXhCLENBTGdCO3VCQU1ELE9BQU8sS0FBUCxDQU5DO09BTXRCLDhCQU5zQjtPQU1YLHlCQUFKLEdBTmU7O0FBTzNCLE9BQUcsVUFBUSxJQUFSLEVBQWE7QUFDZixXQUNDOztPQUFPLFFBQVEsTUFBUixFQUFnQixPQUFPLEtBQVAsRUFBdkI7S0FDQyxJQUREO0tBREQsQ0FEZTtJQUFoQjs7QUFRQSxPQUFJLEtBQUcsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFILENBZnVCO09BZ0JwQixNQUEwQixNQUExQixJQWhCb0I7T0FnQkwsWUFBVyxNQUFyQixTQWhCZTs7O0FBa0IzQixPQUFHLE1BQUksVUFBVSxNQUFWLEdBQWlCLFFBQXJCLElBQWlDLFlBQVUsR0FBVixFQUFjO0FBQ2pELE9BQUcsR0FBSCxHQUFPLGFBQUc7QUFDVCxTQUFJLE9BQUssU0FBUyxXQUFULENBQXFCLENBQXJCLENBQUwsQ0FESztBQUVULFNBQUksT0FBSyxVQUFVLE1BQVYsQ0FBaUIsQ0FBakIsRUFBbUIsWUFBVSxNQUFJLFVBQVUsTUFBVixDQUFkLENBQXhCLENBRks7QUFHVCxTQUFJLFdBQVMsSUFBSSxPQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsSUFBakMsRUFBdUMsS0FBdkMsQ0FBVCxDQUhLOztnQkFJc0IsU0FBUyxJQUFULENBQWMsRUFBQyxZQUFELEVBQWQsS0FBd0IsRUFBQyxLQUFJLENBQUosRUFBekIsQ0FKdEI7O1NBSUosaUNBSkk7U0FJVSw2QkFKVjs7QUFLVCxTQUFJLFFBQU0sT0FBSyxRQUFMLEVBQU4sQ0FMSztBQU1ULFlBQU8sUUFBUCxDQUFnQjtBQUNmLG9CQURlO0FBRWYsVUFBRyxRQUFIO0FBQ0EsZ0JBSGU7QUFJZixhQUFNLFlBQU47QUFDQSxjQUFPLFNBQVMsTUFBVCxFQUFpQixZQUxULEVBQWhCLEVBTlM7S0FBSCxDQUQwQztBQWMzQyxXQUNMOztLQUFXLEVBQVg7S0FDRSxJQURGO0tBREssQ0FkMkM7SUFBbEQsTUFtQk07QUFDTCxXQUFPLFFBQVAsQ0FESztJQW5CTjs7OzswQkF3QlUsT0FBTyxNQUFLOzRCQUN5QixNQUF4QyxZQURlO09BQ0YscUNBREU7T0FDTyxxQ0FEUDtPQUNpQixTQUFRLE1BQVIsT0FEakI7O0FBRWhCLE9BQUksUUFBTSxLQUFLLFFBQUwsRUFBTixDQUZZO0FBR2hCLE9BQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixLQUFLLFFBQUwsRUFBZSxLQUFoRCxDQUFULENBSFk7O2VBSU8sU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFNLGNBQWEsQ0FBYixFQUF2QyxDQUpQOztPQUlYLGtDQUpXO09BSUUsZ0JBSkY7O0FBS2hCLE9BQUksUUFBTSxLQUFLLEdBQUwsR0FBUyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLEdBQTlCLENBTE07QUFNdEIsT0FBSSxTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBUCxDQU5rQjtBQU90QixVQUFPLFFBQVAsQ0FBZ0I7QUFDZixZQUFPLElBQVA7QUFDQSxRQUFJLEtBQUo7QUFDQSxVQUFLLE1BQU0sTUFBTixDQUFhLFVBQWI7QUFDTCxXQUFNLEtBQUssSUFBTCxDQUFVLFlBQVYsQ0FBTjtBQUNBLFlBQU8sU0FBUyxNQUFUO0FBQ1AsZ0JBTmUsRUFBaEIsRUFQc0I7Ozs7eUJBZ0JoQixPQUFPLFFBQVEsS0FBSTs7O09BQ2xCLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEa0I7O0FBRXpCLFFBQUssUUFBTCxDQUFjLEVBQUMsU0FBUSxRQUFRLE1BQVIsQ0FBZSxLQUFmLEVBQXFCLE1BQXJCLEVBQTRCLEdBQTVCLENBQVIsRUFBZixFQUF5RDtXQUFHLE9BQUssU0FBTDtJQUFILENBQXpELENBRnlCOzs7OztFQTNERTs7T0FnRXJCLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsU0FBUSxpQkFBVSxJQUFWO0NBRFcsRUFFbEIsTUFBTSxZQUFOIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQge1NoYXBlIGFzIEN1cnNvclNoYXBlfSBmcm9tIFwiLi9jdXJzb3JcIlxuXG5sZXQgU3VwZXI9ZWRpdGFibGUoVGV4dClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3VwZXJ7XG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0bGV0IGNvbXBvc2VkPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0LCBjaGlsZHJlbjp0ZXh0fT1jb21wb3NlZC5wcm9wc1xuXHRcdHRleHQ9UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse29uQ2xpY2s6ZT0+dGhpcy5vbkNsaWNrKGUscHJvcHMpfSlcblxuXHRcdGxldCBjdXJzb3I9dGhpcy5jb250ZXh0LmN1cnNvcigpfHx7c3RhdGU6e319XG5cdFx0bGV0IHt0YXJnZXQsYXQ6IGN1cnNvckF0fT1jdXJzb3Iuc3RhdGVcblx0XHRpZih0YXJnZXQhPXRoaXMpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEdyb3VwIGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxuXHRcdFx0XHR7dGV4dH1cblx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdClcblx0XHR9XG5cblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cblx0XHRjb25zdCB7ZW5kLCBjaGlsZHJlbjogdGV4dHBpZWNlfT1wcm9wc1xuXG5cdFx0aWYoZW5kLXRleHRwaWVjZS5sZW5ndGg8Y3Vyc29yQXQgJiYgY3Vyc29yQXQ8PWVuZCl7XG5cdFx0XHRwcy5yZWY9YT0+e1xuXHRcdFx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZShhKVxuXHRcdFx0XHRsZXQgdGV4dD10ZXh0cGllY2Uuc3Vic3RyKDAsY3Vyc29yQXQtKGVuZC10ZXh0cGllY2UubGVuZ3RoKSlcblx0XHRcdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQsIHN0eWxlKVxuXHRcdFx0XHRsZXQge2NvbnRlbnRXaWR0aCwgZm9udEZhbWlseX09Y29tcG9zZXIubmV4dCh7d2lkdGh9KXx8e2VuZDowfVxuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXG5cdFx0XHRcdGN1cnNvci5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0dGFyZ2V0OnRoaXMsXG5cdFx0XHRcdFx0YXQ6Y3Vyc29yQXQsXG5cdFx0XHRcdFx0bm9kZSxcblx0XHRcdFx0XHR3aWR0aDpjb250ZW50V2lkdGgsXG5cdFx0XHRcdFx0aGVpZ2h0OmNvbXBvc2VyLmhlaWdodCwgc3R5bGV9KVxuXHRcdFx0fVxuXHQgICAgICAgIHJldHVybiAoXG5cdFx0XHRcdDxHcm91cCB7Li4ucHN9PlxuXHRcdFx0XHRcdHt0ZXh0fVxuXHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0KVxuXHRcdH1lbHNlIHtcblx0XHRcdHJldHVybiBjb21wb3NlZFxuXHRcdH1cbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50LCB0ZXh0KXtcblx0XHRjb25zdCB7bmF0aXZlRXZlbnQ6e29mZnNldFgsIG9mZnNldFl9LCB0YXJnZXR9PWV2ZW50XG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQuY2hpbGRyZW4sIHN0eWxlKVxuICAgICAgICBsZXQge2NvbnRlbnRXaWR0aCxlbmR9PWNvbXBvc2VyLm5leHQoe3dpZHRoOm9mZnNldFh9KXx8e2VuZDowLGNvbnRlbnRXaWR0aDowfVxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrZW5kXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKClcblx0XHRjdXJzb3Iuc2V0U3RhdGUoe1xuXHRcdFx0dGFyZ2V0OnRoaXMsXG5cdFx0XHRhdDogaW5kZXgsXG5cdFx0XHRub2RlOmV2ZW50LnRhcmdldC5wYXJlbnROb2RlLFxuXHRcdFx0d2lkdGg6TWF0aC5jZWlsKGNvbnRlbnRXaWR0aCksXG5cdFx0XHRoZWlnaHQ6Y29tcG9zZXIuaGVpZ2h0LFxuXHRcdFx0c3R5bGUgfSlcbiAgICB9XG5cblx0c3BsaWNlKHN0YXJ0LCBsZW5ndGgsIHN0cil7XG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcblx0XHR0aGlzLnNldFN0YXRlKHtjb250ZW50OmNvbnRlbnQuc3BsaWNlKHN0YXJ0LGxlbmd0aCxzdHIpfSxlPT50aGlzLnJlQ29tcG9zZSgpKVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19