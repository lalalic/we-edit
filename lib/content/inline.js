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
            while (text = composer.nextAvailableSpace()) {
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
        key: "nextAvailableSpace",
        value: function nextAvailableSpace() {
            if (this.composed == this.text.length) return null;

            this.tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

            var _parent$nextAvailable = this.parent.nextAvailableSpace();

            var maxWidth = _parent$nextAvailable.width;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLG1CQUFPLHdDQUFQLENBREk7Ozs7a0NBSUM7OztnQkFDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7Z0JBRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdMLGdCQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBOUIsQ0FBVCxDQUhDO0FBSUwsZ0JBQUksT0FBSyxJQUFMLENBSkM7QUFLTCxtQkFBTSxPQUFLLFNBQVMsa0JBQVQsRUFBTCxFQUFtQztBQUNyQyx1QkFBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixFQUFDLFNBQVE7K0JBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLFFBQWYsRUFBd0IsSUFBeEI7cUJBQUgsRUFBNUIsRUFEcUM7QUFFOUMsb0JBQUksVUFBUyxzQ0FBVSxJQUFWLENBQVQsQ0FGMEM7QUFHckMseUJBQVMsSUFBVCxDQUFjLE9BQWQsRUFIcUM7QUFJckMsdUJBQU8sTUFBUCxDQUFjLE9BQWQsRUFKcUM7YUFBekM7QUFNQSxtQkFBTyxRQUFQLEdBWEs7Ozs7Z0NBY0QsT0FBTyxVQUFVLE1BQUs7QUFDM0Isb0JBQVEsR0FBUixvQkFEMkI7Ozs7V0FuQmI7OztPQXVCVjtBQUdILHFCQUFZLE9BQVosRUFBb0I7OztBQUNoQixZQUFHLENBQUMsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEVBQ0EsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFdBQUwsQ0FBaUIsRUFBakIsR0FBb0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCLENBQTFCLENBREo7WUFFZ0IsT0FBTSxRQUFRLEtBQVIsQ0FBZixTQUhTO1lBSVQsU0FBUSxRQUFRLE9BQVIsQ0FBUixPQUpTOztBQUtoQixhQUFLLElBQUwsR0FBVSxJQUFWLENBTGdCO0FBTWhCLGFBQUssTUFBTCxHQUFZLE1BQVosQ0FOZ0I7QUFPaEIsYUFBSyxNQUFMLEdBQVksS0FBSyxXQUFMLENBQWlCLEVBQWpCLENBUEk7QUFRaEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQVJnQjtLQUFwQjs7Ozs2Q0FXb0I7QUFDaEIsZ0JBQUcsS0FBSyxRQUFMLElBQWUsS0FBSyxJQUFMLENBQVUsTUFBVixFQUNkLE9BQU8sSUFBUCxDQURKOztBQUdBLGlCQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLDREQUFsQixDQUpnQjs7d0NBS08sS0FBSyxNQUFMLENBQVksa0JBQVosR0FMUDs7Z0JBS0gsaUNBQU4sTUFMUzs7QUFNaEIsZ0JBQUksT0FBSyxLQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXNCLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBSyxRQUFMLENBQXZDLENBTk87O3dDQVFHLEtBQUssTUFBTCxDQUFZLHFCQUFaLEdBUkg7O2dCQVFYLG9DQVJXO2dCQVFMLHNDQVJLOztBQVNoQixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBdEQsQ0FEZTthQUFuQixNQUVLO0FBQ2IsdUJBQU0sUUFBTSxRQUFOLElBQWtCLEtBQUssTUFBTCxFQUFZO0FBQ25DLDJCQUFLLEtBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQUMsQ0FBRCxDQUFuQyxDQUQ4Qjs7aURBRWxCLEtBQUssTUFBTCxDQUFZLHFCQUFaLEdBRmtCOztBQUVqQyx5REFGaUM7QUFFMUIsMkRBRjBCO2lCQUFwQztBQUlBLG9CQUFHLEtBQUssTUFBTCxFQUFZO0FBQ2QsMkJBQU8sRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUEvRCxDQURjO2lCQUFmLE1BRUs7O2lCQUZMO2FBUFE7Ozs7Ozs7a0JBOUNTIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgQW55e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGcvPlxuICAgIH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuQ29tcG9zZXIodGhpcylcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHRBdmFpbGFibGVTcGFjZSgpKXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGV4dCx7b25DbGljazplPT50aGlzLm9uQ2xpY2soZSxjb21wb3Nlcix0ZXh0KX0pXG5cdFx0XHRsZXQgY29udGVudD0oPHRleHQgey4uLnRleHR9Lz4pXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKGNvbnRlbnQpXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kKGNvbnRlbnQpXG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50LmZpbmlzaGVkKClcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50LCBjb21wb3NlciwgdGV4dCl7XG4gICAgICAgY29uc29sZS5sb2coYGNsaWNrZWQgb24gdGV4dGApXG4gICAgfVxuXG4gICAgc3RhdGljIENvbXBvc2VyPWNsYXNze1xuICAgICAgICBzdGF0aWMgZWw7XG5cbiAgICAgICAgY29uc3RydWN0b3IoY29udGVudCl7XG4gICAgICAgICAgICBpZighdGhpcy5jb25zdHJ1Y3Rvci5lbClcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29uc3RydWN0b3IuZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKVxuICAgICAgICAgICAgY29uc3Qge2NoaWxkcmVuOnRleHR9PWNvbnRlbnQucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtwYXJlbnR9PWNvbnRlbnQuY29udGV4dFxuICAgICAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgICAgIHRoaXMucGFyZW50PXBhcmVudFxuICAgICAgICAgICAgdGhpcy50ZXN0ZXI9dGhpcy5jb25zdHJ1Y3Rvci5lbFxuICAgICAgICAgICAgdGhpcy5jb21wb3NlZD0wXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAgICAgdGhpcy50ZXN0ZXIuc3R5bGU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4XCJcbiAgICAgICAgICAgIGNvbnN0IHt3aWR0aDptYXhXaWR0aH09dGhpcy5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcbiAgICAgICAgICAgIGxldCB0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpXG5cbiAgICAgICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLnRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2V7XG5cdFx0XHRcdHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKXtcblx0XHRcdFx0XHR0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10ZXh0LnNsaWNlKDAsLTEpO1xuXHRcdFx0XHRcdCh7d2lkdGgsIGhlaWdodH09dGhpcy50ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGV4dC5sZW5ndGgpe1xuXHRcdFx0XHRcdHJldHVybiB7d2lkdGg6bWF4V2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdC8vQFRPRE9cblx0XHRcdFx0fVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxufVxuIl19