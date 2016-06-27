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

            var composer = new this.constructor.Composer(this);
            var text = null;
            while (text = composer.next()) {
                Object.assign(text, { onClick: function onClick(e) {
                        return _this2.onClick(e, composer, text);
                    } });
                var content = _react2.default.createElement("text", text);
                composed.push(content);
                parent.append(content);
            }
            parent.finished();
        }
    }, {
        key: "onClick",
        value: function onClick(event, composer, text) {
            console.log("clicked on text");
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
        this.composed = 0;
    }

    _createClass(_class2, [{
        key: "next",
        value: function next() {
            if (this.composed == this.text.length) return null;

            this.tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

            var _parent$next = this.parent.next();

            var maxWidth = _parent$next.width;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLG1CQUFPLHdDQUFQLENBREk7Ozs7a0NBSUM7OztnQkFDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7Z0JBRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdMLGdCQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBOUIsQ0FBVCxDQUhDO0FBSUwsZ0JBQUksT0FBSyxJQUFMLENBSkM7QUFLTCxtQkFBTSxPQUFLLFNBQVMsSUFBVCxFQUFMLEVBQXFCO0FBQ3ZCLHVCQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLEVBQUMsU0FBUTsrQkFBRyxPQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsUUFBZixFQUF3QixJQUF4QjtxQkFBSCxFQUE1QixFQUR1QjtBQUVoQyxvQkFBSSxVQUFTLHNDQUFVLElBQVYsQ0FBVCxDQUY0QjtBQUd2Qix5QkFBUyxJQUFULENBQWMsT0FBZCxFQUh1QjtBQUl2Qix1QkFBTyxNQUFQLENBQWMsT0FBZCxFQUp1QjthQUEzQjtBQU1BLG1CQUFPLFFBQVAsR0FYSzs7OztnQ0FjRCxPQUFPLFVBQVUsTUFBSztBQUMzQixvQkFBUSxHQUFSLG9CQUQyQjs7OztXQW5CYjs7O09BdUJWO0FBR0gscUJBQVksT0FBWixFQUFvQjs7O0FBQ2hCLFlBQUcsQ0FBQyxLQUFLLFdBQUwsQ0FBaUIsRUFBakIsRUFDQSxTQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQUssV0FBTCxDQUFpQixFQUFqQixHQUFvQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEIsQ0FBMUIsQ0FESjtZQUVnQixPQUFNLFFBQVEsS0FBUixDQUFmLFNBSFM7WUFJVCxTQUFRLFFBQVEsT0FBUixDQUFSLE9BSlM7O0FBS2hCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FMZ0I7QUFNaEIsYUFBSyxNQUFMLEdBQVksTUFBWixDQU5nQjtBQU9oQixhQUFLLE1BQUwsR0FBWSxLQUFLLFdBQUwsQ0FBaUIsRUFBakIsQ0FQSTtBQVFoQixhQUFLLFFBQUwsR0FBYyxDQUFkLENBUmdCO0tBQXBCOzs7OytCQVdNO0FBQ0YsZ0JBQUcsS0FBSyxRQUFMLElBQWUsS0FBSyxJQUFMLENBQVUsTUFBVixFQUNkLE9BQU8sSUFBUCxDQURKOztBQUdBLGlCQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLDREQUFsQixDQUpFOzsrQkFLcUIsS0FBSyxNQUFMLENBQVksSUFBWixHQUxyQjs7Z0JBS1csd0JBQU4sTUFMTDs7QUFNRixnQkFBSSxPQUFLLEtBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdkMsQ0FOUDs7d0NBUWlCLEtBQUssTUFBTCxDQUFZLHFCQUFaLEdBUmpCOztnQkFRRyxvQ0FSSDtnQkFRUyxzQ0FSVDs7QUFTRixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBdEQsQ0FEZTthQUFuQixNQUVLO0FBQ2IsdUJBQU0sUUFBTSxRQUFOLElBQWtCLEtBQUssTUFBTCxFQUFZO0FBQ25DLDJCQUFLLEtBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQUMsQ0FBRCxDQUFuQyxDQUQ4Qjs7aURBRWxCLEtBQUssTUFBTCxDQUFZLHFCQUFaLEdBRmtCOztBQUVqQyx5REFGaUM7QUFFMUIsMkRBRjBCO2lCQUFwQztBQUlBLG9CQUFHLEtBQUssTUFBTCxFQUFZO0FBQ2QsMkJBQU8sRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUEvRCxDQURjO2lCQUFmLE1BRUs7O2lCQUZMO2FBUFE7Ozs7Ozs7a0JBOUNTIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgQW55e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGcvPlxuICAgIH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuQ29tcG9zZXIodGhpcylcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQoKSl7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRleHQse29uQ2xpY2s6ZT0+dGhpcy5vbkNsaWNrKGUsY29tcG9zZXIsdGV4dCl9KVxuXHRcdFx0bGV0IGNvbnRlbnQ9KDx0ZXh0IHsuLi50ZXh0fS8+KVxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZChjb250ZW50KVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5maW5pc2hlZCgpXG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCwgY29tcG9zZXIsIHRleHQpe1xuICAgICAgIGNvbnNvbGUubG9nKGBjbGlja2VkIG9uIHRleHRgKVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21wb3Nlcj1jbGFzc3tcbiAgICAgICAgc3RhdGljIGVsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQpe1xuICAgICAgICAgICAgaWYoIXRoaXMuY29uc3RydWN0b3IuZWwpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnN0cnVjdG9yLmVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSlcbiAgICAgICAgICAgIGNvbnN0IHtjaGlsZHJlbjp0ZXh0fT1jb250ZW50LnByb3BzXG4gICAgICAgICAgICBjb25zdCB7cGFyZW50fT1jb250ZW50LmNvbnRleHRcbiAgICAgICAgICAgIHRoaXMudGV4dD10ZXh0XG4gICAgICAgICAgICB0aGlzLnBhcmVudD1wYXJlbnRcbiAgICAgICAgICAgIHRoaXMudGVzdGVyPXRoaXMuY29uc3RydWN0b3IuZWxcbiAgICAgICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpe1xuICAgICAgICAgICAgaWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgICAgICB0aGlzLnRlc3Rlci5zdHlsZT1cIm1hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0xMDAwcHhcIlxuICAgICAgICAgICAgY29uc3Qge3dpZHRoOm1heFdpZHRofT10aGlzLnBhcmVudC5uZXh0KClcbiAgICAgICAgICAgIGxldCB0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpXG5cbiAgICAgICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLnRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2V7XG5cdFx0XHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKXtcblx0XHRcdFx0XHR0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10ZXh0LnNsaWNlKDAsLTEpO1xuXHRcdFx0XHRcdCh7d2lkdGgsIGhlaWdodH09dGhpcy50ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGV4dC5sZW5ndGgpe1xuXHRcdFx0XHRcdHJldHVybiB7d2lkdGg6bWF4V2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdC8vQFRPRE9cblx0XHRcdFx0fVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxufVxuIl19