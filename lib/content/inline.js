"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

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

            var _state = this.state;
            var composed = _state.composed;
            var finished = _state.finished;
            var parent = this.context.parent;

            var composer = new this.constructor.Composer(this);
            var line = null;
            while (line = composer.next()) {
                Object.assign(line, { onClick: function onClick(e) {
                        return _this2.onClick(e, composer, line);
                    } });
                var content = _react2.default.createElement("text", line);
                composed.push(content);
                parent.append(content);
            }
            finished.count = 1;
            parent.finished(this);
        }
    }, {
        key: "onClick",
        value: function onClick(event, composer, line) {
            consoler.log("clicked on \"" + line.children + "\"");
        }
    }]);

    return Inline;
}(_any2.default);

Inline.Composer = function () {
    function _class2(content) {
        _classCallCheck(this, _class2);

        if (!this.constructor.el) document.body.appendChild(this.constructor.el = document.createElement('span'));
        var text = content.props.children;
        var parent = content.context.parent;

        this.text = text;
        this.parent = parent;
        this.tester = this.constructor.el;
        this.last = 0;
    }

    _createClass(_class2, [{
        key: "next",
        value: function next() {
            if (this.last == this.text.length) return null;

            this.tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

            var _parent$next = this.parent.next();

            var maxWidth = _parent$next.width;

            this.tester.innerHTML = this.text;

            var _tester$getBoundingCl = this.tester.getBoundingClientRect();

            var width = _tester$getBoundingCl.width;
            var height = _tester$getBoundingCl.height;

            if (width <= maxWidth) {
                this.last = this.text.length;
                return { width: width, height: height, start: 0, children: this.text, content: this.content };
            }
        }
    }]);

    return _class2;
}();

exports.default = Inline;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7QUFDSixtQkFBTyx3Q0FBUCxDQURJOzs7O2tDQUlDOzs7eUJBQ3NCLEtBQUssS0FBTCxDQUR0QjtnQkFDRSwyQkFERjtnQkFDWSwyQkFEWjtnQkFFRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkY7O0FBR0wsZ0JBQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixRQUFqQixDQUEwQixJQUE5QixDQUFULENBSEM7QUFJTCxnQkFBSSxPQUFLLElBQUwsQ0FKQztBQUtMLG1CQUFNLE9BQUssU0FBUyxJQUFULEVBQUwsRUFBcUI7QUFDdkIsdUJBQU8sTUFBUCxDQUFjLElBQWQsRUFBbUIsRUFBQyxTQUFROytCQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxRQUFmLEVBQXdCLElBQXhCO3FCQUFILEVBQTVCLEVBRHVCO0FBRXZCLG9CQUFJLFVBQVMsc0NBQVUsSUFBVixDQUFULENBRm1CO0FBR3ZCLHlCQUFTLElBQVQsQ0FBYyxPQUFkLEVBSHVCO0FBSXZCLHVCQUFPLE1BQVAsQ0FBYyxPQUFkLEVBSnVCO2FBQTNCO0FBTUEscUJBQVMsS0FBVCxHQUFlLENBQWYsQ0FYSztBQVlMLG1CQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsRUFaSzs7OztnQ0FlRCxPQUFPLFVBQVUsTUFBSztBQUMxQixxQkFBUyxHQUFULG1CQUE0QixLQUFLLFFBQUwsT0FBNUIsRUFEMEI7Ozs7V0FwQmI7OztPQXdCVjtBQUdILHFCQUFZLE9BQVosRUFBb0I7OztBQUNoQixZQUFHLENBQUMsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEVBQ0EsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFdBQUwsQ0FBaUIsRUFBakIsR0FBb0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCLENBQTFCLENBREo7WUFFZ0IsT0FBTSxRQUFRLEtBQVIsQ0FBZixTQUhTO1lBSVQsU0FBUSxRQUFRLE9BQVIsQ0FBUixPQUpTOztBQUtoQixhQUFLLElBQUwsR0FBVSxJQUFWLENBTGdCO0FBTWhCLGFBQUssTUFBTCxHQUFZLE1BQVosQ0FOZ0I7QUFPaEIsYUFBSyxNQUFMLEdBQVksS0FBSyxXQUFMLENBQWlCLEVBQWpCLENBUEk7QUFRaEIsYUFBSyxJQUFMLEdBQVUsQ0FBVixDQVJnQjtLQUFwQjs7OzsrQkFXTTtBQUNGLGdCQUFHLEtBQUssSUFBTCxJQUFXLEtBQUssSUFBTCxDQUFVLE1BQVYsRUFDVixPQUFPLElBQVAsQ0FESjs7QUFHQSxpQkFBSyxNQUFMLENBQVksS0FBWixHQUFrQiw0REFBbEIsQ0FKRTs7K0JBS3FCLEtBQUssTUFBTCxDQUFZLElBQVosR0FMckI7O2dCQUtXLHdCQUFOLE1BTEw7O0FBTUYsaUJBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxJQUFMLENBTnBCOzt3Q0FPbUIsS0FBSyxNQUFMLENBQVkscUJBQVosR0FQbkI7O2dCQU9LLG9DQVBMO2dCQU9XLHNDQVBYOztBQVFGLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHFCQUFLLElBQUwsR0FBVSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBREs7QUFFZix1QkFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsT0FBTSxDQUFOLEVBQVMsVUFBUyxLQUFLLElBQUwsRUFBVyxTQUFRLEtBQUssT0FBTCxFQUEzRCxDQUZlO2FBQW5COzs7Ozs7O2tCQTlDUyIsImZpbGUiOiJpbmxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgQW55e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGcvPlxuICAgIH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkLCBmaW5pc2hlZH09dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLkNvbXBvc2VyKHRoaXMpXG4gICAgICAgIGxldCBsaW5lPW51bGxcbiAgICAgICAgd2hpbGUobGluZT1jb21wb3Nlci5uZXh0KCkpe1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihsaW5lLHtvbkNsaWNrOmU9PnRoaXMub25DbGljayhlLGNvbXBvc2VyLGxpbmUpfSlcbiAgICAgICAgICAgIGxldCBjb250ZW50PSg8dGV4dCB7Li4ubGluZX0vPilcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoY29udGVudClcbiAgICAgICAgfVxuICAgICAgICBmaW5pc2hlZC5jb3VudD0xXG4gICAgICAgIHBhcmVudC5maW5pc2hlZCh0aGlzKVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIGNvbXBvc2VyLCBsaW5lKXtcbiAgICAgICAgY29uc29sZXIubG9nKGBjbGlja2VkIG9uIFwiJHtsaW5lLmNoaWxkcmVufVwiYClcbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tcG9zZXI9Y2xhc3N7XG4gICAgICAgIHN0YXRpYyBlbDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50KXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvbnN0cnVjdG9yLmVsKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb25zdHJ1Y3Rvci5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpXG4gICAgICAgICAgICBjb25zdCB7Y2hpbGRyZW46dGV4dH09Y29udGVudC5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge3BhcmVudH09Y29udGVudC5jb250ZXh0XG4gICAgICAgICAgICB0aGlzLnRleHQ9dGV4dFxuICAgICAgICAgICAgdGhpcy5wYXJlbnQ9cGFyZW50XG4gICAgICAgICAgICB0aGlzLnRlc3Rlcj10aGlzLmNvbnN0cnVjdG9yLmVsXG4gICAgICAgICAgICB0aGlzLmxhc3Q9MFxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpe1xuICAgICAgICAgICAgaWYodGhpcy5sYXN0PT10aGlzLnRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgICAgIHRoaXMudGVzdGVyLnN0eWxlPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXG4gICAgICAgICAgICBjb25zdCB7d2lkdGg6bWF4V2lkdGh9PXRoaXMucGFyZW50Lm5leHQoKVxuICAgICAgICAgICAgdGhpcy50ZXN0ZXIuaW5uZXJIVE1MPXRoaXMudGV4dFxuICAgICAgICAgICAgY29uc3Qge3dpZHRoLGhlaWdodH09dGhpcy50ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0PXRoaXMudGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dpZHRoLGhlaWdodCwgc3RhcnQ6MCwgY2hpbGRyZW46dGhpcy50ZXh0LCBjb250ZW50OnRoaXMuY29udGVudH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==