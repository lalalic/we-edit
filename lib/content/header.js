"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var header = function (_Any) {
	_inherits(header, _Any);

	function header() {
		_classCallCheck(this, header);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(header).apply(this, arguments));
	}

	_createClass(header, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			return { width: this.props.availableWidth, height: Number.MAX_VALUE };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
			this.composed.append(line);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			_get(Object.getPrototypeOf(header.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return header;
}(_any2.default);

header.displayName = "header";
exports.default = header;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2hlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt1Q0FFQTtBQUNuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUwsQ0FBVyxjQUFYLEVBQTBCLFFBQU8sT0FBTyxTQUFQLEVBQS9DLENBRG1COzs7O2lDQUlMLE1BQUs7QUFDbkIsUUFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixJQUFyQixFQURtQjs7OzswQ0FJRztBQUN0Qiw4QkFYbUIsNERBV25CLENBRHNCOzs7O1FBVkg7OztPQUNiLGNBQVk7a0JBREMiLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFkZXIgZXh0ZW5kcyBBbnl7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiaGVhZGVyXCJcclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UoKXtcclxuXHRcdHJldHVybiB7d2lkdGg6dGhpcy5wcm9wcy5hdmFpbGFibGVXaWR0aCxoZWlnaHQ6TnVtYmVyLk1BWF9WQUxVRX1cclxuXHR9XHJcblx0XHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHR0aGlzLmNvbXBvc2VkLmFwcGVuZChsaW5lKVxyXG5cdH1cclxuXHRcclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG59XHJcbiJdfQ==