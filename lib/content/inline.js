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

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = function (_Any) {
    _inherits(Inline, _Any);

    function Inline() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Inline);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Inline)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Inline, [{
        key: "compose",
        value: function compose() {
            var _this2 = this;

            _get(Object.getPrototypeOf(Inline.prototype), "compose", this).call(this);
            var composed = this.composed;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3dNQUNqQixRQUFNOzs7aUJBRFc7O2tDQUdSOzs7QUFDTCx1Q0FKYSw4Q0FJYixDQURLO2dCQUVFLFdBQVUsS0FBVixTQUZGO2dCQUdFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIRjs7QUFJTCxnQkFBSSxXQUFTLElBQUksT0FBTyxZQUFQLENBQW9CLElBQXhCLENBQVQsQ0FKQztBQUtMLGdCQUFJLE9BQUssSUFBTCxDQUxDOzs7QUFPVixvQkFBTSxPQUFLLElBQUw7QUFDTixxQkFBSyxPQUFMLEdBQWE7MkJBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLElBQWY7aUJBQUg7QUFDYixvQkFBSSxVQUFTLHNDQUFVLElBQVYsQ0FBVDtBQUNLLHlCQUFTLElBQVQsQ0FBYyxPQUFkO0FBQ0EsdUJBQU8sY0FBUCxDQUFzQixPQUF0QjtjQVhDOztBQU1MLG1CQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7O2FBQXREO0FBT0EsbUJBQU8sUUFBUCxHQWJLOzs7O2dDQWdCRCxPQUFPLE1BQUs7Z0JBQ2YsVUFBUyxNQUFNLFdBQU4sQ0FBVCxRQURlOztBQUV0QixnQkFBSSxXQUFTLElBQUksT0FBTyxZQUFQLENBQW9CLGdCQUFNLFlBQU4sQ0FBbUIsSUFBbkIsRUFBd0IsRUFBQyxVQUFTLEtBQUssUUFBTCxFQUFsQyxDQUF4QixDQUFULENBRmtCO0FBR3RCLGdCQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUhjO0FBSXRCLGdCQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixJQUFJLEdBQUosQ0FKbEI7O0FBT3RCLG9CQUFRLEdBQVIsb0JBUHNCOzs7Ozs7Ozs7V0FuQkg7OztPQWdDVjtBQUdILHFCQUFZLE9BQVosRUFBb0I7OztBQUNoQixZQUFHLENBQUMsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEVBQ0EsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFdBQUwsQ0FBaUIsRUFBakIsR0FBb0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCLENBQTFCLENBREo7WUFFZ0IsT0FBTSxRQUFRLEtBQVIsQ0FBZixTQUhTOztBQUloQixhQUFLLElBQUwsR0FBVSxJQUFWLENBSmdCO0FBS2hCLGFBQUssTUFBTCxHQUFZLEtBQUssV0FBTCxDQUFpQixFQUFqQixDQUxJO0FBTWhCLGFBQUssUUFBTCxHQUFjLENBQWQsQ0FOZ0I7S0FBcEI7Ozs7bUNBU3NCO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ2QsT0FBTyxJQUFQLENBREo7O0FBR0EsaUJBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsNERBQWxCLENBSmtCOztBQU1sQixnQkFBSSxPQUFLLEtBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdkMsQ0FOUzs7d0NBUUMsS0FBSyxNQUFMLENBQVkscUJBQVosR0FSRDs7Z0JBUWIsb0NBUmE7Z0JBUVAsc0NBUk87O0FBU2xCLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHVCQUFPLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBZSxLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUF0RCxDQURlO2FBQW5CLE1BRUs7QUFDYix1QkFBTSxRQUFNLFFBQU4sSUFBa0IsS0FBSyxNQUFMLEVBQVk7QUFDbkMsMkJBQUssS0FBSyxNQUFMLENBQVksU0FBWixHQUFzQixLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELENBQW5DLENBRDhCOztpREFFbEIsS0FBSyxNQUFMLENBQVkscUJBQVosR0FGa0I7O0FBRWpDLHlEQUZpQztBQUUxQiwyREFGMEI7aUJBQXBDO0FBSUEsb0JBQUcsS0FBSyxNQUFMLEVBQVk7QUFDZCwyQkFBTyxFQUFDLE9BQU0sUUFBTixFQUFlLGNBQWhCLEVBQXdCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQS9ELENBRGM7aUJBQWYsTUFFSzs7aUJBRkw7YUFQUTs7Ozs7OztrQkFyRFMiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmUgZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGU9e31cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgc3VwZXIuY29tcG9zZSgpXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyBJbmxpbmUuVGV4dENvbXBvc2VyKHRoaXMpXG4gICAgICAgIGxldCB0ZXh0PW51bGxcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xuXHRcdFx0Y29uc3QgaW5mbz10ZXh0XG5cdFx0XHR0ZXh0Lm9uQ2xpY2s9ZT0+dGhpcy5vbkNsaWNrKGUsaW5mbylcblx0XHRcdGxldCBjb250ZW50PSg8dGV4dCB7Li4udGV4dH0vPilcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5maW5pc2hlZCgpXG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XG5cdFx0Y29uc3Qge29mZnNldFh9PWV2ZW50Lm5hdGl2ZUV2ZW50XG5cdFx0bGV0IGNvbXBvc2VyPW5ldyBJbmxpbmUuVGV4dENvbXBvc2VyKFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLHtjaGlsZHJlbjp0ZXh0LmNoaWxkcmVufSkpXG5cdFx0bGV0IGxvYz1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MH1cblx0XHRsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrbG9jLmVuZFxuXG5cblx0XHRjb25zb2xlLmxvZyhgY2xpY2tlZCBvbiB0ZXh0YClcbiAgICB9XG5cblx0LyoqXG5cdCAqICBhIHNpbXBsZSB0ZXh0IGNvbXBvc2VyXG5cdCAqL1xuICAgIHN0YXRpYyBUZXh0Q29tcG9zZXI9Y2xhc3N7XG4gICAgICAgIHN0YXRpYyBlbDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50KXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvbnN0cnVjdG9yLmVsKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb25zdHJ1Y3Rvci5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpXG4gICAgICAgICAgICBjb25zdCB7Y2hpbGRyZW46dGV4dH09Y29udGVudC5wcm9wc1xuICAgICAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgICAgIHRoaXMudGVzdGVyPXRoaXMuY29uc3RydWN0b3IuZWxcbiAgICAgICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAgICAgdGhpcy50ZXN0ZXIuc3R5bGU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4XCJcblxuICAgICAgICAgICAgbGV0IHRleHQ9dGhpcy50ZXN0ZXIuaW5uZXJIVE1MPXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZClcblxuICAgICAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMudGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBpZih3aWR0aDw9bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB7d2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXtcblx0XHRcdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpe1xuXHRcdFx0XHRcdHRleHQ9dGhpcy50ZXN0ZXIuaW5uZXJIVE1MPXRleHQuc2xpY2UoMCwtMSk7XG5cdFx0XHRcdFx0KHt3aWR0aCwgaGVpZ2h0fT10aGlzLnRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0ZXh0Lmxlbmd0aCl7XG5cdFx0XHRcdFx0cmV0dXJuIHt3aWR0aDptYXhXaWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Ly9AVE9ET1xuXHRcdFx0XHR9XG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=