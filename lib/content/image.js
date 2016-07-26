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
            var _props$extent = _props.extent;
            var width = _props$extent.width;
            var height = _props$extent.height;

            var others = _objectWithoutProperties(_props, ["src", "extent"]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztnREFFTTt5QkFDMkIsS0FBSyxLQUFMLENBRDNCO2dCQUNaLGlCQURZO3VDQUNQLE9BRE87Z0JBQ0MsNEJBREQ7Z0JBQ08sOEJBRFA7O2dCQUNtQiw2REFEbkI7O0FBRW5CLGdCQUFJLGlCQUFlLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLENBQXVDLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBdkMsQ0FBZixDQUZlO0FBR25CLG1CQUFPLHVDQUFXO0FBQ1YsNEJBRFU7QUFFViw4QkFGVTtBQUdWLDJCQUFXLEdBQVg7QUFDQSxtQkFBRSxDQUFDLE1BQUQ7YUFKSCxDQUFQLENBSG1COzs7O1dBRk47OztNQUNWLGNBQVk7a0JBREYiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2UgZXh0ZW5kcyBOb0NoaWxke1xuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cImltYWdlXCJcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQoKXtcbiAgICAgICAgY29uc3Qge3NyYywgZXh0ZW50Ont3aWR0aCxoZWlnaHR9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHt3aWR0aCxoZWlnaHR9KVxuICAgICAgICByZXR1cm4gPGltYWdlIHsuLi57XG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHhsaW5rSHJlZjogc3JjLFxuICAgICAgICAgICAgICAgIHk6LWhlaWdodFxuICAgICAgICAgICAgfX0gLz5cbiAgICB9XG59XG4iXX0=