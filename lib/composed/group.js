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
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Group);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Group.__proto__ || Object.getPrototypeOf(Group)).call.apply(_ref, [this].concat(args))), _this), _this.state = { composedTime: new Date().toString() }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Group, [{
		key: "render",
		value: function render() {
			var len = Object.keys(this.props).length;
			if (len == 0) return null;else if (len == 1 && _react2.default.Children.count(this.props.children) == 1) {
				return _react2.default.Children.only(_react2.default.Children.toArray(this.props.children)[0]);
			}

			var _props = this.props,
			    x = _props.x,
			    y = _props.y,
			    width = _props.width,
			    height = _props.height,
			    index = _props.index,
			    others = _objectWithoutProperties(_props, ["x", "y", "width", "height", "index"]);

			if (x || y) others.transform = "translate(" + (x || 0) + " " + (y || 0) + ")";
			return _react2.default.createElement("g", _extends({ x: x, y: y }, others));
		}
	}]);

	return Group;
}(_react.Component);

exports.default = Group;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9ncm91cC5qcyJdLCJuYW1lcyI6WyJHcm91cCIsInN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwibGVuIiwiT2JqZWN0Iiwia2V5cyIsInByb3BzIiwibGVuZ3RoIiwiQ2hpbGRyZW4iLCJjb3VudCIsImNoaWxkcmVuIiwib25seSIsInRvQXJyYXkiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiaW5kZXgiLCJvdGhlcnMiLCJ0cmFuc2Zvcm0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O2tMQUNwQkMsSyxHQUFNLEVBQUNDLGNBQWEsSUFBSUMsSUFBSixHQUFXQyxRQUFYLEVBQWQsRTs7Ozs7MkJBQ0s7QUFDVixPQUFJQyxNQUFJQyxPQUFPQyxJQUFQLENBQVksS0FBS0MsS0FBakIsRUFBd0JDLE1BQWhDO0FBQ0EsT0FBR0osT0FBSyxDQUFSLEVBQ0MsT0FBTyxJQUFQLENBREQsS0FFSyxJQUFHQSxPQUFLLENBQUwsSUFBVSxnQkFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLEtBQUtILEtBQUwsQ0FBV0ksUUFBaEMsS0FBMkMsQ0FBeEQsRUFBMEQ7QUFDOUQsV0FBTyxnQkFBTUYsUUFBTixDQUFlRyxJQUFmLENBQW9CLGdCQUFNSCxRQUFOLENBQWVJLE9BQWYsQ0FBdUIsS0FBS04sS0FBTCxDQUFXSSxRQUFsQyxFQUE0QyxDQUE1QyxDQUFwQixDQUFQO0FBQ0E7O0FBTlMsZ0JBUWlDLEtBQUtKLEtBUnRDO0FBQUEsT0FRTE8sQ0FSSyxVQVFMQSxDQVJLO0FBQUEsT0FRSEMsQ0FSRyxVQVFIQSxDQVJHO0FBQUEsT0FRQUMsS0FSQSxVQVFBQSxLQVJBO0FBQUEsT0FRT0MsTUFSUCxVQVFPQSxNQVJQO0FBQUEsT0FRZUMsS0FSZixVQVFlQSxLQVJmO0FBQUEsT0FReUJDLE1BUnpCOztBQVNWLE9BQUdMLEtBQUdDLENBQU4sRUFDQ0ksT0FBT0MsU0FBUCxtQkFBOEJOLEtBQUcsQ0FBakMsV0FBc0NDLEtBQUcsQ0FBekM7QUFDRCxVQUFPLDhDQUFHLEdBQUdELENBQU4sRUFBUyxHQUFHQyxDQUFaLElBQW1CSSxNQUFuQixFQUFQO0FBQ0c7Ozs7OztrQkFkZ0JwQixLIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17Y29tcG9zZWRUaW1lOm5ldyBEYXRlKCkudG9TdHJpbmcoKX1cclxuICAgIHJlbmRlcigpe1xyXG5cdFx0bGV0IGxlbj1PYmplY3Qua2V5cyh0aGlzLnByb3BzKS5sZW5ndGhcclxuXHRcdGlmKGxlbj09MClcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdGVsc2UgaWYobGVuPT0xICYmIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pPT0xKXtcclxuXHRcdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkoUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVswXSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IHt4LHksIHdpZHRoLCBoZWlnaHQsIGluZGV4LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGlmKHh8fHkpXHJcblx0XHRcdG90aGVycy50cmFuc2Zvcm09YHRyYW5zbGF0ZSgke3h8fDB9ICR7eXx8MH0pYFxyXG5cdFx0cmV0dXJuIDxnIHg9e3h9IHk9e3l9IHsuLi5vdGhlcnN9Lz5cclxuICAgIH1cclxufVxyXG4iXX0=