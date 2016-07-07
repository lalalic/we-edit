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
	}]);

	return _class;
}(Super);

_class.childContextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLDBDQUFOOzs7Ozs7Ozs7Ozs7O3lCQUVHO0FBQ0wsVUFBTyxrREFBUSxLQUFJLFFBQUosRUFBUixDQUFQLENBREs7Ozs7b0NBU1c7QUFDaEIsT0FBSSxPQUFLLElBQUwsQ0FEWTtBQUVoQixVQUFPLE9BQU8sTUFBUCxvRkFBc0M7QUFDNUMsOEJBQVE7QUFDUCxZQUFPLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FEQTtLQURvQztJQUF0QyxDQUFQLENBRmdCOzs7OztFQVZXOztPQU1yQixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDdEMsU0FBUSxpQkFBVSxJQUFWO0NBRGdCLEVBRXZCLE1BQU0saUJBQU4iLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQge0RvY3VtZW50fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4vY3Vyc29yXCJcclxuXHJcbmxldCBTdXBlcj1lZGl0YWJsZShEb2N1bWVudClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gPEN1cnNvciByZWY9XCJjdXJzb3JcIi8+XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cdFxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0dmFyIHNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjdXJzb3IoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5yZWZzLmN1cnNvclxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufSJdfQ==