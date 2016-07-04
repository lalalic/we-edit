"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
    _inherits(_class, _Model);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "visit",
        value: function visit() {
            var blob = this.wordModel.getImage();
            this.props.src = URL.createObjectURL(new Blob(blob), { type: "image/*" });
            this.props.width = 200;
            this.props.height = 200;
        }
    }]);

    return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2ltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUdXO0FBQ0gsZ0JBQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQUwsQ0FERDtBQUVILGlCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWUsSUFBSSxlQUFKLENBQW9CLElBQUksSUFBSixDQUFTLElBQVQsQ0FBcEIsRUFBbUMsRUFBQyxNQUFLLFNBQUwsRUFBcEMsQ0FBZixDQUZHO0FBR0gsaUJBQUssS0FBTCxDQUFXLEtBQVgsR0FBaUIsR0FBakIsQ0FIRztBQUlILGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLEdBQWxCLENBSkciLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWwgZnJvbSBcIi4vYW55XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcbiAgICB2aXNpdCgpe1xuICAgICAgICBsZXQgYmxvYj10aGlzLndvcmRNb2RlbC5nZXRJbWFnZSgpO1xuICAgICAgICB0aGlzLnByb3BzLnNyYz1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKGJsb2IpLHt0eXBlOlwiaW1hZ2UvKlwifSlcbiAgICAgICAgdGhpcy5wcm9wcy53aWR0aD0yMDBcbiAgICAgICAgdGhpcy5wcm9wcy5oZWlnaHQ9MjAwXG4gICAgfVxufVxuIl19