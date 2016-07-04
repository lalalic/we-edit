"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

			var others = _objectWithoutProperties(_props, ["x", "y"]);

			if (x || y) others.transform = "translate(" + (x || 0) + " " + (y || 0) + ")";
			return _react2.default.createElement("g", others);
		}
	}]);

	return Group;
}(_react.Component);

exports.default = Group;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9ncm91cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7aU1BQ3BCLFFBQU0sRUFBQyxjQUFhLElBQUksSUFBSixHQUFXLFFBQVgsRUFBYjs7O2NBRGE7OzJCQUVUO0FBQ1YsT0FBSSxNQUFJLE9BQU8sSUFBUCxDQUFZLEtBQUssS0FBTCxDQUFaLENBQXdCLE1BQXhCLENBREU7QUFFVixPQUFHLE9BQUssQ0FBTCxFQUNGLE9BQU8sSUFBUCxDQURELEtBRUssSUFBRyxPQUFLLENBQUwsSUFBVSxnQkFBTSxRQUFOLENBQWUsS0FBZixDQUFxQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQXJCLElBQTJDLENBQTNDLEVBQTZDO0FBQzlELFdBQU8sZ0JBQU0sUUFBTixDQUFlLElBQWYsQ0FBb0IsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUF2QixDQUE0QyxDQUE1QyxDQUFwQixDQUFQLENBRDhEO0lBQTFEOztnQkFJZ0IsS0FBSyxLQUFMLENBUlg7T0FRTCxhQVJLO09BUUgsYUFSRzs7T0FRRyxzREFSSDs7QUFTVixPQUFHLEtBQUcsQ0FBSCxFQUNGLE9BQU8sU0FBUCxtQkFBOEIsS0FBRyxDQUFILFdBQVEsS0FBRyxDQUFILE9BQXRDLENBREQ7QUFFQSxVQUFPLG1DQUFRLE1BQVIsQ0FBUCxDQVhVOzs7O1FBRlMiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtjb21wb3NlZFRpbWU6bmV3IERhdGUoKS50b1N0cmluZygpfVxuICAgIHJlbmRlcigpe1xuXHRcdGxldCBsZW49T2JqZWN0LmtleXModGhpcy5wcm9wcykubGVuZ3RoXG5cdFx0aWYobGVuPT0wKVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKGxlbj09MSAmJiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09MSl7XG5cdFx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pWzBdKVxuXHRcdH1cblx0XHRcblx0XHRsZXQge3gseSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0aWYoeHx8eSlcblx0XHRcdG90aGVycy50cmFuc2Zvcm09YHRyYW5zbGF0ZSgke3h8fDB9ICR7eXx8MH0pYFxuXHRcdHJldHVybiA8ZyAgey4uLm90aGVyc30vPlxuICAgIH1cbn1cbiJdfQ==