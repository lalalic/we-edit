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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9ncm91cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozt1TUFDcEIsUUFBTSxFQUFDLGNBQWEsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFiOzs7aUJBRGE7O2lDQUVUO3lCQUNpQixLQUFLLEtBQUwsQ0FEakI7Z0JBQ0MsYUFERDtnQkFDRyxhQURIOztnQkFDUyxzREFEVDs7QUFFSixtQkFBTyw4Q0FBRywyQkFBd0IsS0FBRyxDQUFILFdBQVEsS0FBRyxDQUFILE9BQWhDLElBQTZDLE9BQWhELENBQVAsQ0FGSTs7OztXQUZTIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17Y29tcG9zZWRUaW1lOm5ldyBEYXRlKCkudG9TdHJpbmcoKX1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHt4LHksIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7eHx8MH0gJHt5fHwwfSlgfSB7Li4ub3RoZXJzfS8+XG4gICAgfVxufVxuIl19