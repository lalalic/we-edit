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

var Paragraph = function (_Any) {
    _inherits(Paragraph, _Any);

    function Paragraph() {
        _classCallCheck(this, Paragraph);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
    }

    _createClass(Paragraph, [{
        key: "compose",
        value: function compose() {
            var composed = this.state.composed;
            var parent = this.context.parent;

            var _parent$next = parent.next();

            var width = _parent$next.width;
            var height = _parent$next.height;

            composed.push({
                width: width,
                children: []
            });
        }
    }, {
        key: "next",
        value: function next() {
            var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var _required$width = required.width;
            var minW = _required$width === undefined ? 0 : _required$width;
            var _required$height = required.height;
            var minH = _required$height === undefined ? 0 : _required$height;
            var composed = this.state.composed;

            var currentLine = composed[composed.length - 1];
            var width = currentLine.width;

            var availableWidth = currentLine.children.reduce(function (prev, a) {
                return prev - a.width;
            }, width);
            if (availableWidth <= 0) {
                var parent = this.context.parent;

                var _parent$next2 = parent.next.apply(parent, arguments);

                var _width = _parent$next2.width;
                var height = _parent$next2.height;
                //@TODO: what if paragraph margin, padding, border

                availableHeight = height;
                availableWidth = _width;
                composed.push({});
            }
            return { width: availableWidth };
        }
    }, {
        key: "append",
        value: function append(text) {
            var composed = this.state.composed;

            var currentLine = composed[composed.length - 1];
            var width = currentLine.width;

            var availableWidth = currentLine.children.reduce(function (prev, a) {
                return prev - a.width;
            }, width);
            var _text$props = text.props;
            var contentWidth = _text$props.width;
            var contentHeight = _text$props.height;

            var line = null;
            if (availableWidth >= contentWidth) {
                line = _react2.default.createElement(
                    _group2.default,
                    { x: width - availableWidth, y: 0, width: contentWidth, height: contentHeight },
                    text
                );
                currentLine.children.push(line);
                if (currentLine.height != contentHeight && currentLine.children.length > 1) {
                    //@TODO: what if height not equal
                    var newHeight = Math.max(currentLine.height, contentHeight);
                }
            }
            currentLine.height = contentHeight;
            currentLine.y = contentHeight;
            var parent = this.context.parent;

            parent.append(currentLine);
        }
    }]);

    return Paragraph;
}(_any2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztrQ0FDUjtnQkFDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7Z0JBRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOzsrQkFHZ0IsT0FBTyxJQUFQLEdBSGhCOztnQkFHRSwyQkFIRjtnQkFHUSw2QkFIUjs7QUFJTCxxQkFBUyxJQUFULENBQWM7QUFDViw0QkFEVTtBQUVWLDBCQUFTLEVBQVQ7YUFGSixFQUpLOzs7OytCQVVRO2dCQUFaLGlFQUFTLGtCQUFHO2tDQUNzQixTQUE1QixNQURNO2dCQUNBLHVDQUFLLG9CQURMO21DQUNzQixTQUFmLE9BRFA7Z0JBQ2Msd0NBQUsscUJBRG5CO2dCQUVOLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGTTs7QUFHYixnQkFBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSFM7Z0JBSVIsUUFBTyxZQUFQLE1BSlE7O0FBS2IsZ0JBQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47dUJBQVUsT0FBSyxFQUFFLEtBQUY7YUFBZixFQUF1QixLQUFuRCxDQUFmLENBTFM7QUFNYixnQkFBRyxrQkFBZ0IsQ0FBaEIsRUFBa0I7b0JBQ1YsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQURVOztvQ0FFRyxPQUFPLElBQVAsZUFBZSxTQUFmLEVBRkg7O29CQUVaLDZCQUZZO29CQUVMOztBQUZLO0FBSWpCLGtDQUFnQixNQUFoQixDQUppQjtBQUtqQixpQ0FBZSxNQUFmLENBTGlCO0FBTWpCLHlCQUFTLElBQVQsQ0FBYyxFQUFkLEVBTmlCO2FBQXJCO0FBUUEsbUJBQU8sRUFBQyxPQUFNLGNBQU4sRUFBUixDQWRhOzs7OytCQWlCVixNQUFLO2dCQUNELFdBQVUsS0FBSyxLQUFMLENBQVYsU0FEQzs7QUFFUixnQkFBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBRkk7Z0JBR0gsUUFBTyxZQUFQLE1BSEc7O0FBSVIsZ0JBQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47dUJBQVUsT0FBSyxFQUFFLEtBQUY7YUFBZixFQUF1QixLQUFuRCxDQUFmLENBSkk7OEJBS3VDLEtBQUssS0FBTCxDQUx2QztnQkFLRywyQkFBTixNQUxHO2dCQUt3Qiw0QkFBUCxPQUxqQjs7QUFNUixnQkFBSSxPQUFLLElBQUwsQ0FOSTtBQU9SLGdCQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUM1Qix1QkFBTTs7c0JBQU8sR0FBRyxRQUFNLGNBQU4sRUFBc0IsR0FBRyxDQUFILEVBQU0sT0FBTyxZQUFQLEVBQXFCLFFBQVEsYUFBUixFQUEzRDtvQkFBbUYsSUFBbkY7aUJBQU4sQ0FENEI7QUFFNUIsNEJBQVksUUFBWixDQUFxQixJQUFyQixDQUEwQixJQUExQixFQUY0QjtBQUc1QixvQkFBRyxZQUFZLE1BQVosSUFBb0IsYUFBcEIsSUFBcUMsWUFBWSxRQUFaLENBQXFCLE1BQXJCLEdBQTRCLENBQTVCLEVBQThCOztBQUVsRSx3QkFBSSxZQUFVLEtBQUssR0FBTCxDQUFTLFlBQVksTUFBWixFQUFvQixhQUE3QixDQUFWLENBRjhEO2lCQUF0RTthQUhKO0FBU0Esd0JBQVksTUFBWixHQUFtQixhQUFuQixDQWhCUTtBQWlCUix3QkFBWSxDQUFaLEdBQWMsYUFBZCxDQWpCUTtnQkFrQkQsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQWxCQzs7QUFtQlIsbUJBQU8sTUFBUCxDQUFjLFdBQWQsRUFuQlE7Ozs7V0E1QksiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBBbnl7XG4gICAgY29tcG9zZSgpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHR9PXBhcmVudC5uZXh0KClcbiAgICAgICAgY29tcG9zZWQucHVzaCh7XG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbmV4dChyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5XPTAsaGVpZ2h0Om1pbkg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aH09Y3VycmVudExpbmVcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLndpZHRoLHdpZHRoKVxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDw9MCl7XG4gICAgICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIGxldCB7d2lkdGgsIGhlaWdodH09cGFyZW50Lm5leHQoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBwYXJhZ3JhcGggbWFyZ2luLCBwYWRkaW5nLCBib3JkZXJcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZVdpZHRoPXdpZHRoXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKHt9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGh9XG4gICAgfVxuXG4gICAgYXBwZW5kKHRleHQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEud2lkdGgsd2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09dGV4dC5wcm9wc1xuICAgICAgICBsZXQgbGluZT1udWxsXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpe1xuICAgICAgICAgICAgbGluZT0oPEdyb3VwIHg9e3dpZHRoLWF2YWlsYWJsZVdpZHRofSB5PXswfSB3aWR0aD17Y29udGVudFdpZHRofSBoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9Pnt0ZXh0fTwvR3JvdXA+KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChsaW5lKVxuICAgICAgICAgICAgaWYoY3VycmVudExpbmUuaGVpZ2h0IT1jb250ZW50SGVpZ2h0ICYmIGN1cnJlbnRMaW5lLmNoaWxkcmVuLmxlbmd0aD4xKXtcbiAgICAgICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGhlaWdodCBub3QgZXF1YWxcbiAgICAgICAgICAgICAgICBsZXQgbmV3SGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCwgY29udGVudEhlaWdodClcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRMaW5lLmhlaWdodD1jb250ZW50SGVpZ2h0XG4gICAgICAgIGN1cnJlbnRMaW5lLnk9Y29udGVudEhlaWdodFxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgcGFyZW50LmFwcGVuZChjdXJyZW50TGluZSlcbiAgICB9XG59XG4iXX0=