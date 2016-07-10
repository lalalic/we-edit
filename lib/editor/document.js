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
			var _this2 = this;

			_get(Object.getPrototypeOf(_class.prototype), "componentDidMount", this).call(this);
			document.addEventListener("keypress", function (e) {
				_this2.refs.cursor.replaceFocusedContent(e.key);
				if (e.key == " ") e.preventDefault();
				return false;
			});
		}
	}]);

	return _class;
}(Super);

_class.childContextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLDBDQUFOOzs7Ozs7Ozs7Ozs7O3lCQUVHO0FBQ0wsVUFBTyxrREFBUSxLQUFJLFFBQUosRUFBUixDQUFQLENBREs7Ozs7b0NBU1c7QUFDaEIsT0FBSSxPQUFLLElBQUwsQ0FEWTtBQUVoQixVQUFPLE9BQU8sTUFBUCxvRkFBc0M7QUFDNUMsOEJBQVE7QUFDUCxZQUFPLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FEQTtLQURvQztJQUF0QyxDQUFQLENBRmdCOzs7O3NDQVNFOzs7QUFDbEIsdUZBRGtCO0FBRWxCLFlBQVMsZ0JBQVQsQ0FBMEIsVUFBMUIsRUFBcUMsYUFBRztBQUN2QyxXQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLHFCQUFqQixDQUF1QyxFQUFFLEdBQUYsQ0FBdkMsQ0FEdUM7QUFFdkMsUUFBRyxFQUFFLEdBQUYsSUFBTyxHQUFQLEVBQ0YsRUFBRSxjQUFGLEdBREQ7QUFFQSxXQUFPLEtBQVAsQ0FKdUM7SUFBSCxDQUFyQyxDQUZrQjs7Ozs7RUFuQlM7O09BTXJCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUN0QyxTQUFRLGlCQUFVLElBQVY7Q0FEZ0IsRUFFdkIsTUFBTSxpQkFBTiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7RG9jdW1lbnR9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi9jdXJzb3JcIlxyXG5cclxubGV0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFN1cGVye1xyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiA8Q3Vyc29yIHJlZj1cImN1cnNvclwiLz5cclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXHJcblx0fSxTdXBlci5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHR2YXIgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdGN1cnNvcigpe1xyXG5cdFx0XHRcdHJldHVybiBzZWxmLnJlZnMuY3Vyc29yXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsZT0+e1xyXG5cdFx0XHR0aGlzLnJlZnMuY3Vyc29yLnJlcGxhY2VGb2N1c2VkQ29udGVudChlLmtleSlcclxuXHRcdFx0aWYoZS5rZXk9PVwiIFwiKVxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==