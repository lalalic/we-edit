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

var Super = (0, _any.togglable)(_any2.default);

var Inline = function (_Super) {
    _inherits(Inline, _Super);

    function Inline() {
        _classCallCheck(this, Inline);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Inline).apply(this, arguments));
    }

    _createClass(Inline, [{
        key: "getChildContext",
        value: function getChildContext() {
            var contentStyle = this.props.contentStyle;
            var toggles = this.context.toggles;

            var style = Object.assign(contentStyle.inline, toggles);

            return Object.assign(_get(Object.getPrototypeOf(Inline.prototype), "getChildContext", this).call(this), {
                style: style
            });
        }
    }]);

    return Inline;
}(Super);

Inline.displayName = "inline";
Inline.childContextTypes = Object.assign({
    style: _react.PropTypes.object
}, Super.childContextTypes);
exports.default = Inline;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLGtDQUFOOztJQUNpQjs7Ozs7Ozs7Ozs7MENBT0E7Z0JBQ04sZUFBYyxLQUFLLEtBQUwsQ0FBZCxhQURNO2dCQUVOLFVBQVMsS0FBSyxPQUFMLENBQVQsUUFGTTs7QUFHYixnQkFBSSxRQUFNLE9BQU8sTUFBUCxDQUFjLGFBQWEsTUFBYixFQUFvQixPQUFsQyxDQUFOLENBSFM7O0FBS2IsbUJBQU8sT0FBTyxNQUFQLDRCQVpNLHNEQVlOLEVBQXNDO0FBQ3pDLDRCQUR5QzthQUF0QyxDQUFQLENBTGE7Ozs7V0FQQTtFQUFlOztBQUFmLE9BQ1YsY0FBWTtBQURGLE9BR1Ysb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLFdBQU8saUJBQVUsTUFBVjtDQURjLEVBRXRCLE1BQU0saUJBQU47a0JBTGMiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55LCB7dG9nZ2xhYmxlfSBmcm9tIFwiLi9hbnlcIlxuXG5sZXQgU3VwZXI9dG9nZ2xhYmxlKEFueSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZSBleHRlbmRzIFN1cGVye1xuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cImlubGluZVwiXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSwgU3VwZXIuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7dG9nZ2xlc309dGhpcy5jb250ZXh0XG4gICAgICAgIGxldCBzdHlsZT1PYmplY3QuYXNzaWduKGNvbnRlbnRTdHlsZS5pbmxpbmUsdG9nZ2xlcylcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBzdHlsZVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==