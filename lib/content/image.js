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
        key: "createComposedPiece",
        value: function createComposedPiece() {
            var _props = this.props;
            var src = _props.src;
            var _props$contentStyle$e = _props.contentStyle.extent;
            var width = _props$contentStyle$e.width;
            var height = _props$contentStyle$e.height;

            var others = _objectWithoutProperties(_props, ["src", "contentStyle"]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs4Q0FFSTt5QkFDNEMsS0FBSyxLQUFMLENBRDVDO2dCQUNWLGlCQURVOytDQUNMLGFBQWMsT0FEVDtnQkFDaUIsb0NBRGpCO2dCQUN1QixzQ0FEdkI7O2dCQUNvQyxtRUFEcEM7O0FBRWpCLGdCQUFJLGlCQUFlLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLENBQXVDLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBdkMsQ0FBZixDQUZhO0FBR2pCLG1CQUFPLHVDQUFXO0FBQ1YsNEJBRFU7QUFFViw4QkFGVTtBQUdWLDJCQUFXLEdBQVg7QUFDQSxtQkFBRSxDQUFDLE1BQUQ7YUFKSCxDQUFQLENBSGlCOzs7O1dBRko7OztNQUNWLGNBQVk7a0JBREYiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2UgZXh0ZW5kcyBOb0NoaWxke1xuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cImltYWdlXCJcbiAgICBjcmVhdGVDb21wb3NlZFBpZWNlKCl7XG4gICAgICAgIGNvbnN0IHtzcmMsIGNvbnRlbnRTdHlsZTp7ZXh0ZW50Ont3aWR0aCxoZWlnaHR9fSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGxldCBhdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7d2lkdGgsaGVpZ2h0fSlcbiAgICAgICAgcmV0dXJuIDxpbWFnZSB7Li4ue1xuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICB4bGlua0hyZWY6IHNyYyxcbiAgICAgICAgICAgICAgICB5Oi1oZWlnaHRcbiAgICAgICAgICAgIH19IC8+XG4gICAgfVxufVxuIl19