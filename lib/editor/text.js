"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, _class);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._refs = new Map(), _temp), _possibleConstructorReturn(_this, _ret);
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

			return _react2.default.createElement(
				CursorableText,
				{
					ref: function ref(a) {
						return _this2._refs.set(props, a);
					},
					width: width, height: height,
					createCursor: function createCursor(a) {
						return _this2.createCursorElement(props);
					} },
				text
			);
		}
	}, {
		key: "createCursorElement",
		value: function createCursorElement(props) {
			var end = props.end;
			var textpiece = props.children;
			var _state = this.state;
			var cursorAt = _state.cursorAt;
			var content = _state.content;

			var style = this.getStyle();

			if (cursorAt == undefined) return null;

			if (end - textpiece.length < cursorAt && cursorAt <= end) {
				var locText = content.substring(end - textpiece.length, cursorAt);
				var composer = new this.constructor.WordWrapper(locText, style);
				var size = composer.next({ width: Number.MAX_SAFE_INTEGER });
				size.height = composer.height;
				return _react2.default.createElement(_cursor.Shape, _extends({}, size, { style: style }));
			}

			return null;
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _this3 = this;

			var _event$nativeEvent = event.nativeEvent;
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
			var target = event.target;

			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);
			var loc = composer.next({ width: offsetX }) || { end: 0 };
			var index = text.end - text.children.length + loc.end;
			this.setState({ cursorAt: index }, function (a) {
				var cursor = _this3.context.cursor();
				cursor.setState({ target: _this3, textpiece: text }, function (a) {
					var ref = _this3._refs.get(text);
					if (ref) ref.setState({ composedAt: new Date().toString() });
				});
			});
		}
	}, {
		key: "insert",
		value: function insert(str) {
			var _this4 = this;

			var _state2 = this.state;
			var content = _state2.content;
			var cursorAt = _state2.cursorAt;

			this.setState({
				content: content.splice(cursorAt, 0, str),
				cursorAt: cursorAt + str.length }, function (e) {
				_this4.reCompose();
			});
		}
	}, {
		key: "blur",
		value: function blur(text) {
			var _this5 = this;

			console.log("blured " + JSON.stringify(text));
			this.setState({ cursorAt: undefined }, function (a) {
				var ref = _this5._refs.get(text);
				if (ref) ref.setState({ composedAt: new Date().toString() });
			});
		}
	}]);

	return _class;
}(Super);

_class.contextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;

var CursorableText = function (_Group) {
	_inherits(CursorableText, _Group);

	function CursorableText() {
		_classCallCheck(this, CursorableText);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CursorableText).apply(this, arguments));
	}

	_createClass(CursorableText, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var children = _props.children;
			var createCursor = _props.createCursor;


			var cursor = createCursor();
			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				createCursor(),
				children
			);
		}
	}]);

	return CursorableText;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxzQ0FBTjs7Ozs7Ozs7Ozs7Ozs7OztrTUFFSCxRQUFNLElBQUksR0FBSjs7Ozs7d0NBRW1CLE9BQU07OztBQUM5QixPQUFJLG9HQUF3QyxVQUF4QyxDQUQwQjt5QkFFSyxTQUFTLEtBQVQsQ0FGTDtPQUV6Qiw4QkFGeUI7T0FFbEIsZ0NBRmtCO09BRUQsdUJBQVQsU0FGVTs7QUFHOUIsVUFBSyxnQkFBTSxZQUFOLENBQW1CLElBQW5CLEVBQXdCLEVBQUMsU0FBUTtZQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxLQUFmO0tBQUgsRUFBakMsQ0FBTCxDQUg4Qjs7QUFLeEIsVUFDTDtBQUFDLGtCQUFEOztBQUNDLFVBQUs7YUFBRyxPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixFQUFxQixDQUFyQjtNQUFIO0FBQ0wsWUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSO0FBQ2QsbUJBQWM7YUFBRyxPQUFLLG1CQUFMLENBQXlCLEtBQXpCO01BQUgsRUFIZjtJQUlFLElBSkY7SUFESyxDQUx3Qjs7OztzQ0FlWCxPQUFNO09BQ2xCLE1BQTBCLE1BQTFCLElBRGtCO09BQ0gsWUFBVyxNQUFyQixTQURhO2dCQUVDLEtBQUssS0FBTCxDQUZEO09BRWxCLDJCQUZrQjtPQUVSLHlCQUZROztBQUduQixPQUFJLFFBQU0sS0FBSyxRQUFMLEVBQU4sQ0FIZTs7QUFLekIsT0FBRyxZQUFVLFNBQVYsRUFDRixPQUFPLElBQVAsQ0FERDs7QUFHQSxPQUFHLE1BQUksVUFBVSxNQUFWLEdBQWlCLFFBQXJCLElBQWlDLFlBQVUsR0FBVixFQUFjO0FBQ2pELFFBQUksVUFBUSxRQUFRLFNBQVIsQ0FBa0IsTUFBSSxVQUFVLE1BQVYsRUFBa0IsUUFBeEMsQ0FBUixD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eXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQge1NoYXBlIGFzIEN1cnNvclNoYXBlfSBmcm9tIFwiLi9jdXJzb3JcIlxuXG5sZXQgU3VwZXI9ZWRpdGFibGUoVGV4dClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3VwZXJ7XG5cdF9yZWZzPW5ldyBNYXAoKVxuXHRcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdGxldCBjb21wb3NlZD1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQoLi4uYXJndW1lbnRzKVxuXHRcdGxldCB7d2lkdGgsIGhlaWdodCwgY2hpbGRyZW46dGV4dH09Y29tcG9zZWQucHJvcHNcblx0XHR0ZXh0PVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtvbkNsaWNrOmU9PnRoaXMub25DbGljayhlLHByb3BzKX0pXG5cdFx0XG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8Q3Vyc29yYWJsZVRleHQgXG5cdFx0XHRcdHJlZj17YT0+dGhpcy5fcmVmcy5zZXQocHJvcHMsYSl9XG5cdFx0XHRcdHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IFxuXHRcdFx0XHRjcmVhdGVDdXJzb3I9e2E9PnRoaXMuY3JlYXRlQ3Vyc29yRWxlbWVudChwcm9wcyl9PlxuXHRcdFx0XHR7dGV4dH1cblx0XHRcdDwvQ3Vyc29yYWJsZVRleHQ+XG5cdFx0KVxuICAgIH1cblx0XG5cdGNyZWF0ZUN1cnNvckVsZW1lbnQocHJvcHMpe1xuXHRcdGNvbnN0IHtlbmQsIGNoaWxkcmVuOiB0ZXh0cGllY2V9PXByb3BzXG5cdFx0Y29uc3Qge2N1cnNvckF0LCBjb250ZW50fT10aGlzLnN0YXRlXG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcblxuXHRcdGlmKGN1cnNvckF0PT11bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdFxuXHRcdGlmKGVuZC10ZXh0cGllY2UubGVuZ3RoPGN1cnNvckF0ICYmIGN1cnNvckF0PD1lbmQpe1xuXHRcdFx0bGV0IGxvY1RleHQ9Y29udGVudC5zdWJzdHJpbmcoZW5kLXRleHRwaWVjZS5sZW5ndGgsIGN1cnNvckF0KVxuXHRcdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGxvY1RleHQsIHN0eWxlKVxuXHRcdFx0bGV0IHNpemU9Y29tcG9zZXIubmV4dCh7d2lkdGg6TnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJ9KVxuXHRcdFx0c2l6ZS5oZWlnaHQ9Y29tcG9zZXIuaGVpZ2h0XG5cdFx0XHRyZXR1cm4gPEN1cnNvclNoYXBlIHsuLi5zaXplfSBzdHlsZT17c3R5bGV9Lz5cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XG5cdFx0Y29uc3Qge25hdGl2ZUV2ZW50OntvZmZzZXRYLCBvZmZzZXRZfSwgdGFyZ2V0fT1ldmVudFxuICAgICAgICBsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcih0ZXh0LmNoaWxkcmVuLCBzdHlsZSlcbiAgICAgICAgbGV0IGxvYz1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MH1cbiAgICAgICAgbGV0IGluZGV4PXRleHQuZW5kLXRleHQuY2hpbGRyZW4ubGVuZ3RoK2xvYy5lbmRcblx0XHR0aGlzLnNldFN0YXRlKHtjdXJzb3JBdDppbmRleH0sIGE9Pntcblx0XHRcdGxldCBjdXJzb3I9dGhpcy5jb250ZXh0LmN1cnNvcigpXG5cdFx0XHRjdXJzb3Iuc2V0U3RhdGUoe3RhcmdldDp0aGlzLCB0ZXh0cGllY2U6dGV4dH0sIGE9Pntcblx0XHRcdFx0bGV0IHJlZj10aGlzLl9yZWZzLmdldCh0ZXh0KVxuXHRcdFx0XHRpZihyZWYpXG5cdFx0XHRcdFx0cmVmLnNldFN0YXRlKHtjb21wb3NlZEF0Om5ldyBEYXRlKCkudG9TdHJpbmcoKX0pXG5cdFx0XHR9KVxuXHRcdH0pXG4gICAgfVxuXG5cdGluc2VydChzdHIpe1xuXHRcdGNvbnN0IHtjb250ZW50LCBjdXJzb3JBdH09dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y29udGVudDpjb250ZW50LnNwbGljZShjdXJzb3JBdCwwLHN0ciksIFxuXHRcdFx0Y3Vyc29yQXQ6Y3Vyc29yQXQrc3RyLmxlbmd0aH0sZT0+e1xuXHRcdFx0XHR0aGlzLnJlQ29tcG9zZSgpXG5cdFx0XHR9KVxuXHR9XG5cblx0Ymx1cih0ZXh0KXtcblx0XHRjb25zb2xlLmxvZyhgYmx1cmVkICR7SlNPTi5zdHJpbmdpZnkodGV4dCl9YClcblx0XHR0aGlzLnNldFN0YXRlKHtjdXJzb3JBdDp1bmRlZmluZWR9LCBhPT57XG5cdFx0XHRsZXQgcmVmPXRoaXMuX3JlZnMuZ2V0KHRleHQpXG5cdFx0XHRpZihyZWYpXG5cdFx0XHRcdHJlZi5zZXRTdGF0ZSh7Y29tcG9zZWRBdDogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuXG5jbGFzcyBDdXJzb3JhYmxlVGV4dCBleHRlbmRzIEdyb3Vwe1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgY2hpbGRyZW4sIGNyZWF0ZUN1cnNvcn09dGhpcy5wcm9wc1xuXHRcdFxuXHRcdGxldCBjdXJzb3I9Y3JlYXRlQ3Vyc29yKClcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuXHRcdFx0XHR7Y3JlYXRlQ3Vyc29yKCl9XG5cdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG59XG4iXX0=