"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = function (_Any) {
    _inherits(Inline, _Any);

    function Inline() {
        _classCallCheck(this, Inline);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Inline).apply(this, arguments));
    }

    _createClass(Inline, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("g", null);
        }
    }, {
        key: "compose",
        value: function compose() {
            var _this2 = this;

            var composed = this.state.composed;
            var parent = this.context.parent;

            var composer = new Inline.TextComposer(this);
            var text = null;

            var _loop = function _loop() {
                var info = text;
                text.onClick = function (e) {
                    return _this2.onClick(e, info);
                };
                var content = _react2.default.createElement("text", text);
                composed.push(content);
                parent.appendComposed(content);
            };

            while (text = composer.next(parent.nextAvailableSpace())) {
                _loop();
            }
            parent.finished();
        }
    }, {
        key: "onClick",
        value: function onClick(event, text) {
            var offsetX = event.nativeEvent.offsetX;

            var composer = new Inline.TextComposer(_react2.default.cloneElement(this, { children: text.children }));
            var loc = composer.next({ width: offsetX }) || { end: 0 };
            var index = text.end - text.children.length + loc.end;
            var parent = this.context.parent;

            parent.setState({ id: 0, index: index, append: "ABC" });

            console.log("clicked on text");
        }

        /**
         *  a simple text composer
         */

    }]);

    return Inline;
}(_any2.default);

Inline.TextComposer = function () {
    function _class2(content) {
        _classCallCheck(this, _class2);

        if (!this.constructor.el) document.body.appendChild(this.constructor.el = document.createElement('span'));
        var text = content.props.children;

        this.text = text;
        this.tester = this.constructor.el;
        this.composed = 0;
    }

    _createClass(_class2, [{
        key: "next",
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (this.composed == this.text.length) return null;

            this.tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

            var text = this.tester.innerHTML = this.text.substr(this.composed);

            var _tester$getBoundingCl = this.tester.getBoundingClientRect();

            var width = _tester$getBoundingCl.width;
            var height = _tester$getBoundingCl.height;

            if (width <= maxWidth) {
                return { width: width, height: height, end: this.composed += text.length, children: text };
            } else {
                while (width > maxWidth && text.length) {
                    text = this.tester.innerHTML = text.slice(0, -1);

                    var _tester$getBoundingCl2 = this.tester.getBoundingClientRect();

                    width = _tester$getBoundingCl2.width;
                    height = _tester$getBoundingCl2.height;
                }
                if (text.length) {
                    return { width: maxWidth, height: height, end: this.composed += text.length, children: text };
                } else {
                    //@TODO
                }
            }
        }
    }]);

    return _class2;
}();

exports.default = Inline;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLG1CQUFPLHdDQUFQLENBREk7Ozs7a0NBSUM7OztnQkFDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7Z0JBRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdMLGdCQUFJLFdBQVMsSUFBSSxPQUFPLFlBQVAsQ0FBb0IsSUFBeEIsQ0FBVCxDQUhDO0FBSUwsZ0JBQUksT0FBSyxJQUFMLENBSkM7OztBQU1WLG9CQUFNLE9BQUssSUFBTDtBQUNOLHFCQUFLLE9BQUwsR0FBYTsyQkFBRyxPQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsSUFBZjtpQkFBSDtBQUNiLG9CQUFJLFVBQVMsc0NBQVUsSUFBVixDQUFUO0FBQ0sseUJBQVMsSUFBVCxDQUFjLE9BQWQ7QUFDQSx1QkFBTyxjQUFQLENBQXNCLE9BQXRCO2NBVkM7O0FBS0wsbUJBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDs7YUFBdEQ7QUFPQSxtQkFBTyxRQUFQLEdBWks7Ozs7Z0NBZUQsT0FBTyxNQUFLO2dCQUNmLFVBQVMsTUFBTSxXQUFOLENBQVQsUUFEZTs7QUFFdEIsZ0JBQUksV0FBUyxJQUFJLE9BQU8sWUFBUCxDQUFvQixnQkFBTSxZQUFOLENBQW1CLElBQW5CLEVBQXdCLEVBQUMsVUFBUyxLQUFLLFFBQUwsRUFBbEMsQ0FBeEIsQ0FBVCxDQUZrQjtBQUd0QixnQkFBSSxNQUFJLFNBQVMsSUFBVCxDQUFjLEVBQUMsT0FBTSxPQUFOLEVBQWYsS0FBZ0MsRUFBQyxLQUFJLENBQUosRUFBakMsQ0FIYztBQUl0QixnQkFBSSxRQUFNLEtBQUssR0FBTCxHQUFTLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBcUIsSUFBSSxHQUFKLENBSmxCO2dCQUtmLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FMZTs7QUFNdEIsbUJBQU8sUUFBUCxDQUFnQixFQUFDLElBQUcsQ0FBSCxFQUFLLFlBQU4sRUFBWSxRQUFPLEtBQVAsRUFBNUIsRUFOc0I7O0FBUXRCLG9CQUFRLEdBQVIsb0JBUnNCOzs7Ozs7Ozs7V0FwQkg7OztPQWtDVjtBQUdILHFCQUFZLE9BQVosRUFBb0I7OztBQUNoQixZQUFHLENBQUMsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEVBQ0EsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFdBQUwsQ0FBaUIsRUFBakIsR0FBb0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCLENBQTFCLENBREo7WUFFZ0IsT0FBTSxRQUFRLEtBQVIsQ0FBZixTQUhTOztBQUloQixhQUFLLElBQUwsR0FBVSxJQUFWLENBSmdCO0FBS2hCLGFBQUssTUFBTCxHQUFZLEtBQUssV0FBTCxDQUFpQixFQUFqQixDQUxJO0FBTWhCLGFBQUssUUFBTCxHQUFjLENBQWQsQ0FOZ0I7S0FBcEI7Ozs7bUNBU3NCO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ2QsT0FBTyxJQUFQLENBREo7O0FBR0EsaUJBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsNERBQWxCLENBSmtCOztBQU1sQixnQkFBSSxPQUFLLEtBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdkMsQ0FOUzs7d0NBUUMsS0FBSyxNQUFMLENBQVkscUJBQVosR0FSRDs7Z0JBUWIsb0NBUmE7Z0JBUVAsc0NBUk87O0FBU2xCLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHVCQUFPLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBZSxLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUF0RCxDQURlO2FBQW5CLE1BRUs7QUFDYix1QkFBTSxRQUFNLFFBQU4sSUFBa0IsS0FBSyxNQUFMLEVBQVk7QUFDbkMsMkJBQUssS0FBSyxNQUFMLENBQVksU0FBWixHQUFzQixLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELENBQW5DLENBRDhCOztpREFFbEIsS0FBSyxNQUFMLENBQVkscUJBQVosR0FGa0I7O0FBRWpDLHlEQUZpQztBQUUxQiwyREFGMEI7aUJBQXBDO0FBSUEsb0JBQUcsS0FBSyxNQUFMLEVBQVk7QUFDZCwyQkFBTyxFQUFDLE9BQU0sUUFBTixFQUFlLGNBQWhCLEVBQXdCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQS9ELENBRGM7aUJBQWYsTUFFSzs7aUJBRkw7YUFQUTs7Ozs7OztrQkF2RFMiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmUgZXh0ZW5kcyBBbnl7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8Zy8+XG4gICAgfVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIGxldCBjb21wb3Nlcj1uZXcgSW5saW5lLlRleHRDb21wb3Nlcih0aGlzKVxuICAgICAgICBsZXQgdGV4dD1udWxsXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcblx0XHRcdGNvbnN0IGluZm89dGV4dFxuXHRcdFx0dGV4dC5vbkNsaWNrPWU9PnRoaXMub25DbGljayhlLGluZm8pXG5cdFx0XHRsZXQgY29udGVudD0oPHRleHQgey4uLnRleHR9Lz4pXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKGNvbnRlbnQpXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29udGVudClcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuZmluaXNoZWQoKVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuXHRcdGNvbnN0IHtvZmZzZXRYfT1ldmVudC5uYXRpdmVFdmVudFxuXHRcdGxldCBjb21wb3Nlcj1uZXcgSW5saW5lLlRleHRDb21wb3NlcihSZWFjdC5jbG9uZUVsZW1lbnQodGhpcyx7Y2hpbGRyZW46dGV4dC5jaGlsZHJlbn0pKVxuXHRcdGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XG5cdFx0bGV0IGluZGV4PXRleHQuZW5kLXRleHQuY2hpbGRyZW4ubGVuZ3RoK2xvYy5lbmRcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRwYXJlbnQuc2V0U3RhdGUoe2lkOjAsaW5kZXgsYXBwZW5kOlwiQUJDXCJ9KVxuXHRcdFxuXHRcdGNvbnNvbGUubG9nKGBjbGlja2VkIG9uIHRleHRgKVxuICAgIH1cblxuXHQvKipcblx0ICogIGEgc2ltcGxlIHRleHQgY29tcG9zZXJcblx0ICovXG4gICAgc3RhdGljIFRleHRDb21wb3Nlcj1jbGFzc3tcbiAgICAgICAgc3RhdGljIGVsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQpe1xuICAgICAgICAgICAgaWYoIXRoaXMuY29uc3RydWN0b3IuZWwpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnN0cnVjdG9yLmVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSlcbiAgICAgICAgICAgIGNvbnN0IHtjaGlsZHJlbjp0ZXh0fT1jb250ZW50LnByb3BzXG4gICAgICAgICAgICB0aGlzLnRleHQ9dGV4dFxuICAgICAgICAgICAgdGhpcy50ZXN0ZXI9dGhpcy5jb25zdHJ1Y3Rvci5lbFxuICAgICAgICAgICAgdGhpcy5jb21wb3NlZD0wXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xuICAgICAgICAgICAgaWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgICAgICB0aGlzLnRlc3Rlci5zdHlsZT1cIm1hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0xMDAwcHhcIlxuICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRleHQ9dGhpcy50ZXN0ZXIuaW5uZXJIVE1MPXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZClcblxuICAgICAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMudGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBpZih3aWR0aDw9bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB7d2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXtcblx0XHRcdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpe1xuXHRcdFx0XHRcdHRleHQ9dGhpcy50ZXN0ZXIuaW5uZXJIVE1MPXRleHQuc2xpY2UoMCwtMSk7XG5cdFx0XHRcdFx0KHt3aWR0aCwgaGVpZ2h0fT10aGlzLnRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0ZXh0Lmxlbmd0aCl7XG5cdFx0XHRcdFx0cmV0dXJuIHt3aWR0aDptYXhXaWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Ly9AVE9ET1xuXHRcdFx0XHR9XG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=