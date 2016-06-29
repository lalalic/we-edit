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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Inline)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "inline", _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Inline, [{
        key: "render",
        value: function render() {
            return null;
        }
    }, {
        key: "compose",
        value: function compose() {
            var _this2 = this;

            _get(Object.getPrototypeOf(Inline.prototype), "compose", this).call(this);
            var composed = this.composed;
            var parent = this.context.parent;
            var rawContent = this.props.children;
            var modifiedContent = this.state.text;

            var composer = new this.constructor.TextComposer(modifiedContent || rawContent);
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
            this.finished(this);
        }
    }, {
        key: "onClick",
        value: function onClick(event, text) {
            var offsetX = event.nativeEvent.offsetX;

            var composer = new this.constructor.TextComposer(text.children);
            var loc = composer.next({ width: offsetX }) || { end: 0 };
            var index = text.end - text.children.length + loc.end;
            this.composed.splice(0);
            this.children.splice(0);
            this.setState({ cursor: index, text: "Raymond changed it" });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.reCompose();
        }

        /**
         *  a simple text composer
         */

    }]);

    return Inline;
}(_any2.default);

Inline.TextComposer = function () {
    function _class2(text, style) {
        _classCallCheck(this, _class2);

        if (!this.constructor.el) document.body.appendChild(this.constructor.el = document.createElement('span'));
        this.text = text;
        this.style = style;
        this.tester = this.constructor.el;
        this.composed = 0;
        console.log("compose inline text : " + text);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3dNQUNqQixjQUFZOzs7aUJBREs7O2lDQUdaO0FBQ1AsbUJBQU8sSUFBUCxDQURPOzs7O2tDQUlJOzs7QUFDWCx1Q0FSbUIsOENBUW5CLENBRFc7Z0JBRUUsV0FBVSxLQUFWLFNBRkY7Z0JBR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGO2dCQUlNLGFBQVksS0FBSyxLQUFMLENBQXRCLFNBSkk7Z0JBS0Usa0JBQWlCLEtBQUssS0FBTCxDQUF2QixLQUxJOztBQU1MLGdCQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FBOEIsbUJBQWlCLFVBQWpCLENBQTNDLENBTkM7QUFPTCxnQkFBSSxPQUFLLElBQUwsQ0FQQzs7O0FBU1Ysb0JBQU0sT0FBSyxJQUFMO0FBQ04scUJBQUssT0FBTCxHQUFhOzJCQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxJQUFmO2lCQUFIO0FBQ2Isb0JBQUksVUFBUyxzQ0FBVSxJQUFWLENBQVQ7QUFDSyx5QkFBUyxJQUFULENBQWMsT0FBZDtBQUNBLHVCQUFPLGNBQVAsQ0FBc0IsT0FBdEI7Y0FiQzs7QUFRTCxtQkFBTSxPQUFLLFNBQVMsSUFBVCxDQUFjLE9BQU8sa0JBQVAsRUFBZCxDQUFMLEVBQWdEOzthQUF0RDtBQU9OLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLEVBZlc7Ozs7Z0NBbUJELE9BQU8sTUFBSztnQkFDZixVQUFTLE1BQU0sV0FBTixDQUFULFFBRGU7O0FBRXRCLGdCQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FBOEIsS0FBSyxRQUFMLENBQTNDLENBRmtCO0FBR3RCLGdCQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUhjO0FBSXRCLGdCQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixJQUFJLEdBQUosQ0FKbEI7QUFLaEIsaUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFMZ0I7QUFNaEIsaUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFOZ0I7QUFPaEIsaUJBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxLQUFQLEVBQWMsTUFBSyxvQkFBTCxFQUE3QixFQVBnQjs7Ozs2Q0FVQTtBQUNoQixpQkFBSyxTQUFMLEdBRGdCOzs7Ozs7Ozs7V0FwQ0g7OztPQTJDVjtBQUdILHFCQUFZLElBQVosRUFBa0IsS0FBbEIsRUFBd0I7OztBQUNwQixZQUFHLENBQUMsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEVBQ0EsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFdBQUwsQ0FBaUIsRUFBakIsR0FBb0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCLENBQTFCLENBREo7QUFFQSxhQUFLLElBQUwsR0FBVSxJQUFWLENBSG9CO0FBSTdCLGFBQUssS0FBTCxHQUFXLEtBQVgsQ0FKNkI7QUFLcEIsYUFBSyxNQUFMLEdBQVksS0FBSyxXQUFMLENBQWlCLEVBQWpCLENBTFE7QUFNcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQU5vQjtBQU9wQixnQkFBUSxHQUFSLDRCQUFxQyxJQUFyQyxFQVBvQjtLQUF4Qjs7OzttQ0FVc0I7Z0JBQVYsZ0JBQU4sTUFBZ0I7O0FBQ2xCLGdCQUFHLEtBQUssUUFBTCxJQUFlLEtBQUssSUFBTCxDQUFVLE1BQVYsRUFDZCxPQUFPLElBQVAsQ0FESjs7QUFHQSxpQkFBSyxNQUFMLENBQVksS0FBWixHQUFrQiw0REFBbEIsQ0FKa0I7O0FBTWxCLGdCQUFJLE9BQUssS0FBSyxNQUFMLENBQVksU0FBWixHQUFzQixLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssUUFBTCxDQUF2QyxDQU5TOzt3Q0FRQyxLQUFLLE1BQUwsQ0FBWSxxQkFBWixHQVJEOztnQkFRYixvQ0FSYTtnQkFRUCxzQ0FSTzs7QUFTbEIsZ0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsdUJBQU8sRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFlLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQXRELENBRGU7YUFBbkIsTUFFSztBQUNiLHVCQUFNLFFBQU0sUUFBTixJQUFrQixLQUFLLE1BQUwsRUFBWTtBQUNuQywyQkFBSyxLQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXNCLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQUQsQ0FBbkMsQ0FEOEI7O2lEQUVsQixLQUFLLE1BQUwsQ0FBWSxxQkFBWixHQUZrQjs7QUFFakMseURBRmlDO0FBRTFCLDJEQUYwQjtpQkFBcEM7QUFJQSxvQkFBRyxLQUFLLE1BQUwsRUFBWTtBQUNkLDJCQUFPLEVBQUMsT0FBTSxRQUFOLEVBQWUsY0FBaEIsRUFBd0IsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBL0QsQ0FEYztpQkFBZixNQUVLOztpQkFGTDthQVBROzs7Ozs7O2tCQWpFUyIsImZpbGUiOiJpbmxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZSBleHRlbmRzIEFueXtcbiAgICBkaXNwbGF5TmFtZT1cImlubGluZVwiXG5cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuXHRcdHN1cGVyLmNvbXBvc2UoKVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge2NoaWxkcmVuOiByYXdDb250ZW50fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3RleHQ6IG1vZGlmaWVkQ29udGVudH09dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuVGV4dENvbXBvc2VyKG1vZGlmaWVkQ29udGVudHx8cmF3Q29udGVudClcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XG5cdFx0XHRjb25zdCBpbmZvPXRleHRcblx0XHRcdHRleHQub25DbGljaz1lPT50aGlzLm9uQ2xpY2soZSxpbmZvKVxuXHRcdFx0bGV0IGNvbnRlbnQ9KDx0ZXh0IHsuLi50ZXh0fS8+KVxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXG4gICAgICAgIH1cblx0XHR0aGlzLmZpbmlzaGVkKHRoaXMpXG4gICAgfVxuXG5cbiAgICBvbkNsaWNrKGV2ZW50LCB0ZXh0KXtcblx0XHRjb25zdCB7b2Zmc2V0WH09ZXZlbnQubmF0aXZlRXZlbnRcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuVGV4dENvbXBvc2VyKHRleHQuY2hpbGRyZW4pXG5cdFx0bGV0IGxvYz1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MH1cblx0XHRsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrbG9jLmVuZFxuICAgICAgICB0aGlzLmNvbXBvc2VkLnNwbGljZSgwKVxuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgwKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjdXJzb3I6aW5kZXgsIHRleHQ6XCJSYXltb25kIGNoYW5nZWQgaXRcIn0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG4gICAgICAgIHRoaXMucmVDb21wb3NlKClcbiAgICB9XG5cblx0LyoqXG5cdCAqICBhIHNpbXBsZSB0ZXh0IGNvbXBvc2VyXG5cdCAqL1xuICAgIHN0YXRpYyBUZXh0Q29tcG9zZXI9Y2xhc3N7XG4gICAgICAgIHN0YXRpYyBlbDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XG4gICAgICAgICAgICBpZighdGhpcy5jb25zdHJ1Y3Rvci5lbClcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29uc3RydWN0b3IuZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKVxuICAgICAgICAgICAgdGhpcy50ZXh0PXRleHRcblx0XHRcdHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgICAgIHRoaXMudGVzdGVyPXRoaXMuY29uc3RydWN0b3IuZWxcbiAgICAgICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgICAgICAgICAgY29uc29sZS5sb2coYGNvbXBvc2UgaW5saW5lIHRleHQgOiAke3RleHR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHQoe3dpZHRoOm1heFdpZHRofSl7XG4gICAgICAgICAgICBpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgICAgIHRoaXMudGVzdGVyLnN0eWxlPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXG5cbiAgICAgICAgICAgIGxldCB0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpXG5cbiAgICAgICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLnRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2V7XG5cdFx0XHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKXtcblx0XHRcdFx0XHR0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10ZXh0LnNsaWNlKDAsLTEpO1xuXHRcdFx0XHRcdCh7d2lkdGgsIGhlaWdodH09dGhpcy50ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGV4dC5sZW5ndGgpe1xuXHRcdFx0XHRcdHJldHVybiB7d2lkdGg6bWF4V2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdC8vQFRPRE9cblx0XHRcdFx0fVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxufVxuIl19