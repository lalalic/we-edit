"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_NoChild) {
    _inherits(Image, _NoChild);

    function Image() {
        _classCallCheck(this, Image);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Image).apply(this, arguments));
    }

    _createClass(Image, [{
        key: "createComposed2Parent",
        value: function createComposed2Parent() {
            var _props = this.props;
            var src = _props.src;
            var _props$directStyle$ex = _props.directStyle.extent;
            var width = _props$directStyle$ex.width;
            var height = _props$directStyle$ex.height;

            var others = _objectWithoutProperties(_props, ["src", "directStyle"]);

            var availableSpace = this.context.parent.nextAvailableSpace({ width: width, height: height });
            return _react2.default.createElement("image", {
                width: width,
                height: height,
                xlinkHref: src,
                y: -height
            });
        }
    }]);

    return Image;
}(_any.NoChild);

Image.displayName = "image";
exports.default = Image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztnREFFTTt5QkFDeUMsS0FBSyxLQUFMLENBRHpDO2dCQUNaLGlCQURZOytDQUNQLFlBQWEsT0FETjtnQkFDYyxvQ0FEZDtnQkFDb0Isc0NBRHBCOztnQkFDaUMsa0VBRGpDOztBQUVuQixnQkFBSSxpQkFBZSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQXZDLENBQWYsQ0FGZTtBQUduQixtQkFBTyx1Q0FBVztBQUNWLDRCQURVO0FBRVYsOEJBRlU7QUFHViwyQkFBVyxHQUFYO0FBQ0EsbUJBQUUsQ0FBQyxNQUFEO2FBSkgsQ0FBUCxDQUhtQjs7OztXQUZOOzs7TUFDVixjQUFZO2tCQURGIiwiZmlsZSI6ImltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlIGV4dGVuZHMgTm9DaGlsZHtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJpbWFnZVwiXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KCl7XG4gICAgICAgIGNvbnN0IHtzcmMsIGRpcmVjdFN0eWxlOntleHRlbnQ6e3dpZHRoLGhlaWdodH19LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHt3aWR0aCxoZWlnaHR9KVxuICAgICAgICByZXR1cm4gPGltYWdlIHsuLi57XG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHhsaW5rSHJlZjogc3JjLFxuICAgICAgICAgICAgICAgIHk6LWhlaWdodFxuICAgICAgICAgICAgfX0gLz5cbiAgICB9XG59XG4iXX0=