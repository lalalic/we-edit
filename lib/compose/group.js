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
            var _props = this.props;
            var x = _props.x;
            var y = _props.y;

            var others = _objectWithoutProperties(_props, ["x", "y"]);

            return _react2.default.createElement("g", _extends({ transform: "translate(" + (x || 0) + " " + (y || 0) + ")" }, others));
        }
    }]);

    return Group;
}(_react.Component);

exports.default = Group;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlL2dyb3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3VNQUNwQixRQUFNLEVBQUMsY0FBYSxJQUFJLElBQUosR0FBVyxRQUFYLEVBQWI7OztpQkFEYTs7aUNBRVQ7eUJBQ2lCLEtBQUssS0FBTCxDQURqQjtnQkFDQyxhQUREO2dCQUNHLGFBREg7O2dCQUNTLHNEQURUOztBQUVKLG1CQUFPLDhDQUFHLDJCQUF3QixLQUFHLENBQUgsV0FBUSxLQUFHLENBQUgsT0FBaEMsSUFBNkMsT0FBaEQsQ0FBUCxDQUZJOzs7O1dBRlMiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtjb21wb3NlZFRpbWU6bmV3IERhdGUoKS50b1N0cmluZygpfVxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge3gseSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4fHwwfSAke3l8fDB9KWB9IHsuLi5vdGhlcnN9Lz5cbiAgICB9XG59XG4iXX0=