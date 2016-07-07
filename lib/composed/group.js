"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Group = function (_Component) {
	_inherits(Group, _Component);

	function Group() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Group);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Group)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { composedTime: new Date().toString() }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Group, [{
		key: "render",
		value: function render() {
			var len = Object.keys(this.props).length;
			if (len == 0) return null;else if (len == 1 && _react2.default.Children.count(this.props.children) == 1) {
				return _react2.default.Children.only(_react2.default.Children.toArray(this.props.children)[0]);
			}

			var _props = this.props;
			var x = _props.x;
			var y = _props.y;
			var width = _props.width;
			var height = _props.height;

			var others = _objectWithoutProperties(_props, ["x", "y", "width", "height"]);

			if (x || y) others.transform = "translate(" + (x || 0) + " " + (y || 0) + ")";
			return _react2.default.createElement("g", _extends({ x: x, y: y }, others));
		}
	}]);

	return Group;
}(_react.Component);

exports.default = Group;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9ncm91cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztpTUFDcEIsUUFBTSxFQUFDLGNBQWEsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFiOzs7Y0FEYTs7MkJBRVQ7QUFDVixPQUFJLE1BQUksT0FBTyxJQUFQLENBQVksS0FBSyxLQUFMLENBQVosQ0FBd0IsTUFBeEIsQ0FERTtBQUVWLE9BQUcsT0FBSyxDQUFMLEVBQ0YsT0FBTyxJQUFQLENBREQsS0FFSyxJQUFHLE9BQUssQ0FBTCxJQUFVLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsQ0FBM0MsRUFBNkM7QUFDOUQsV0FBTyxnQkFBTSxRQUFOLENBQWUsSUFBZixDQUFvQixnQkFBTSxRQUFOLENBQWUsT0FBZixDQUF1QixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQXZCLENBQTRDLENBQTVDLENBQXBCLENBQVAsQ0FEOEQ7SUFBMUQ7O2dCQUkrQixLQUFLLEtBQUwsQ0FSMUI7T0FRTCxhQVJLO09BUUgsYUFSRztPQVFBLHFCQVJBO09BUU8sdUJBUlA7O09BUWtCLHlFQVJsQjs7QUFTVixPQUFHLEtBQUcsQ0FBSCxFQUNGLE9BQU8sU0FBUCxtQkFBOEIsS0FBRyxDQUFILFdBQVEsS0FBRyxDQUFILE9BQXRDLENBREQ7QUFFQSxVQUFPLDhDQUFJLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBSCxJQUFVLE9BQXBCLENBQVAsQ0FYVTs7OztRQUZTIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17Y29tcG9zZWRUaW1lOm5ldyBEYXRlKCkudG9TdHJpbmcoKX1cbiAgICByZW5kZXIoKXtcblx0XHRsZXQgbGVuPU9iamVjdC5rZXlzKHRoaXMucHJvcHMpLmxlbmd0aFxuXHRcdGlmKGxlbj09MClcblx0XHRcdHJldHVybiBudWxsXG5cdFx0ZWxzZSBpZihsZW49PTEgJiYgUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PTEpe1xuXHRcdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkoUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVswXSlcblx0XHR9XG5cdFx0XG5cdFx0bGV0IHt4LHksIHdpZHRoLCBoZWlnaHQsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGlmKHh8fHkpXG5cdFx0XHRvdGhlcnMudHJhbnNmb3JtPWB0cmFuc2xhdGUoJHt4fHwwfSAke3l8fDB9KWBcblx0XHRyZXR1cm4gPGcgIHg9e3h9IHk9e3l9IHsuLi5vdGhlcnN9Lz5cbiAgICB9XG59XG4iXX0=