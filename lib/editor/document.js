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

var _cursor = require("./cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Document);

var _class = function (_Super) {
	_inherits(_class, _Super);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "more",
		value: function more() {
			return _react2.default.createElement(_cursor2.default, { ref: "cursor" });
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return Object.assign(_get(Object.getPrototypeOf(_class.prototype), "getChildContext", this).call(this), {
				cursor: function cursor() {
					return self.refs.cursor;
				}
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			_get(Object.getPrototypeOf(_class.prototype), "componentDidMount", this).call(this);

			this.inputReady();

			this.focusCursor();
		}
	}, {
		key: "inputReady",
		value: function inputReady() {
			var _this2 = this;

			document.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 8:
						e.preventDefault();
						_this2.refs.cursor.backspace();
						break;
					case 32:
						e.preventDefault();
					default:
						_this2.refs.cursor.insert(e.key);
				}
			});
		}
	}, {
		key: "focusCursor",
		value: function focusCursor() {
			var firstText = _reactDom2.default.findDOMNode(this).querySelector('svg text');
			var event = document.createEvent("SVGEvents");
			event.initEvent("click", true, true);
			firstText.dispatchEvent(event);
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed(child) {
			if (!this.children.includes(child)) _get(Object.getPrototypeOf(_class.prototype), "on1ChildComposed", this).call(this, child);
		}
	}]);

	return _class;
}(Super);

_class.childContextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sMENBQU47Ozs7Ozs7Ozs7Ozs7eUJBRUc7QUFDTCxVQUFPLGtEQUFRLEtBQUksUUFBSixFQUFSLENBQVAsQ0FESzs7OztvQ0FTVztBQUNoQixPQUFJLE9BQUssSUFBTCxDQURZO0FBRWhCLFVBQU8sT0FBTyxNQUFQLG9GQUFzQztBQUM1Qyw4QkFBUTtBQUNQLFlBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQURBO0tBRG9DO0lBQXRDLENBQVAsQ0FGZ0I7Ozs7c0NBU0U7QUFDbEIsdUZBRGtCOztBQUdsQixRQUFLLFVBQUwsR0FIa0I7O0FBS2xCLFFBQUssV0FBTCxHQUxrQjs7OzsrQkFRUDs7O0FBQ1gsWUFBUyxnQkFBVCxDQUEwQixTQUExQixFQUFvQyxhQUFHO0FBQ3RDLFlBQU8sRUFBRSxPQUFGO0FBQ1AsVUFBSyxDQUFMO0FBQ0MsUUFBRSxjQUFGLEdBREQ7QUFFQyxhQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLFNBQWpCLEdBRkQ7QUFHQSxZQUhBO0FBREEsVUFLSyxFQUFMO0FBQ0MsUUFBRSxjQUFGLEdBREQ7QUFMQTtBQVFDLGFBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBakIsQ0FBd0IsRUFBRSxHQUFGLENBQXhCLENBREQ7QUFQQSxLQURzQztJQUFILENBQXBDLENBRFc7Ozs7Z0NBZUM7QUFDWixPQUFJLFlBQVUsbUJBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQixhQUEzQixDQUF5QyxVQUF6QyxDQUFWLENBRFE7QUFFWixPQUFJLFFBQVEsU0FBUyxXQUFULENBQXFCLFdBQXJCLENBQVIsQ0FGUTtBQUdaLFNBQU0sU0FBTixDQUFnQixPQUFoQixFQUF3QixJQUF4QixFQUE2QixJQUE3QixFQUhZO0FBSVosYUFBVSxhQUFWLENBQXdCLEtBQXhCLEVBSlk7Ozs7bUNBT0ksT0FBTTtBQUN0QixPQUFHLENBQUMsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixLQUF2QixDQUFELEVBQ0YsbUZBQXVCLE1BQXZCLENBREQ7Ozs7O0VBbEQyQjs7T0FNckIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3RDLFNBQVEsaUJBQVUsSUFBVjtDQURnQixFQUV2QixNQUFNLGlCQUFOIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcblxyXG5pbXBvcnQge0RvY3VtZW50fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4vY3Vyc29yXCJcclxuXHJcbmxldCBTdXBlcj1lZGl0YWJsZShEb2N1bWVudClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gPEN1cnNvciByZWY9XCJjdXJzb3JcIi8+XHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y3Vyc29yOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sU3VwZXIuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0dmFyIHNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjdXJzb3IoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5yZWZzLmN1cnNvclxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcclxuXHRcdFxyXG5cdFx0dGhpcy5pbnB1dFJlYWR5KClcclxuXHRcdFxyXG5cdFx0dGhpcy5mb2N1c0N1cnNvcigpXHJcblx0fVxyXG5cdFxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4OlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuYmFja3NwYWNlKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAzMjpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChlLmtleSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0Zm9jdXNDdXJzb3IoKXtcclxuXHRcdGxldCBmaXJzdFRleHQ9UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3Rvcignc3ZnIHRleHQnKVxyXG5cdFx0bGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJTVkdFdmVudHNcIilcclxuXHRcdGV2ZW50LmluaXRFdmVudChcImNsaWNrXCIsdHJ1ZSx0cnVlKVxyXG5cdFx0Zmlyc3RUZXh0LmRpc3BhdGNoRXZlbnQoZXZlbnQpXHJcblx0fVxyXG5cdFxyXG5cdG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xyXG5cdFx0aWYoIXRoaXMuY2hpbGRyZW4uaW5jbHVkZXMoY2hpbGQpKVxyXG5cdFx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKGNoaWxkKVxyXG5cdH1cclxufVxyXG4iXX0=