"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _page = require("../compose/page");

var _page2 = _interopRequireDefault(_page);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Any) {
    _inherits(Section, _Any);

    function Section() {
        _classCallCheck(this, Section);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
    }

    _createClass(Section, [{
        key: "render",
        value: function render() {
            var composed = this.state.composed;
            var canvas = this.context.canvas;
            var _props$gap = this.props.gap;
            var gap = _props$gap === undefined ? 20 : _props$gap;

            var y = 0;
            return _react2.default.createElement(
                _group2.default,
                null,
                _react2.default.createElement(
                    _group2.default,
                    { ref: "content" },
                    this.props.children
                ),
                _react2.default.createElement(
                    _group2.default,
                    { ref: "composed" },
                    composed.map(function (page, i) {
                        var width = page.width;
                        var height = page.height;

                        var newPage = _react2.default.createElement(_page2.default, _extends({ key: i, x: (canvas.width - width) / 2, y: y += gap }, page));
                        y += height;
                        return newPage;
                    })
                )
            );
        }
    }, {
        key: "compose",
        value: function compose() {
            var composed = this.state.composed;

            composed.push(this._newPage());
        }

        /**
         * i: column no
         */

    }, {
        key: "_newColumn",
        value: function _newColumn(i) {
            var _props$page = this.props.page;
            var width = _props$page.width;
            var height = _props$page.height;
            var margin = _props$page.margin;
            //@TODO:

            return {
                x: margin,
                y: margin,
                width: width - 2 * margin,
                height: height - 2 * margin,
                children: []
            };
        }

        /**
         * i : page No, for first, even, odd page
         */

    }, {
        key: "_newPage",
        value: function _newPage(i) {
            var _props$page2 = this.props.page;
            var width = _props$page2.width;
            var height = _props$page2.height;
            var margin = _props$page2.margin;

            return {
                width: width,
                height: height,
                margin: margin,
                columns: [this._newColumn(0)],
                header: null,
                footer: null
            };
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

            var currentPage = composed[composed.length - 1];
            var _currentPage = currentPage;
            var columns = _currentPage.columns;

            var currentColumn = columns[columns.length - 1];
            var _currentColumn = currentColumn;
            var width = _currentColumn.width;
            var height = _currentColumn.height;
            var children = _currentColumn.children;

            var availableHeight = children.reduce(function (prev, a) {
                return prev - a.height;
            }, height);

            //@TODO: what if never can find min area
            var avoidInfiniteLoop = 0;
            while (availableHeight <= minH || width < minW) {
                if (avoidInfiniteLoop == 2) {
                    //can't find min area, cheat with min area
                    return arguments[0];
                }

                if (this.props.page.columns > columns.length) {
                    // new column
                    columns.push(currentColumn = this._newColumn(columns.length));
                } else {
                    //new page
                    avoidInfiniteLoop++;
                    composed.push(currentPage = this._newPage(composed.length));
                    currentColumn = currentPage.columns[0];
                }
                width = currentColumn.width;
                height = currentColumn.height;
                availableHeight = currentColumn.height;
            }
            return { width: width, height: availableHeight };
        }
    }, {
        key: "append",
        value: function append(line) {
            var composed = this.state.composed;

            var currentPage = composed[composed.length - 1];
            var _currentPage2 = currentPage;
            var columns = _currentPage2.columns;

            var currentColumn = columns[columns.length - 1];
            var _currentColumn2 = currentColumn;
            var width = _currentColumn2.width;
            var height = _currentColumn2.height;
            var children = _currentColumn2.children;

            var availableHeight = children.reduce(function (prev, a) {
                return prev - a.height;
            }, height);
            var contentHeight = line.height;

            if (contentHeight > availableHeight) {
                if (this.props.page.columns > columns.length) {
                    // new column
                    columns.push(currentColumn = this._newColumn(columns.length));
                } else {
                    //new page
                    avoidInfiniteLoop++;
                    composed.push(currentPage = this._newPage(composed.length));
                    currentColumn = currentPage.columns[0];
                }
                availableHeight = currentColumn.height;

                //@TODO: what if currentColumn.width!=line.width

                children = currentColumn.children;
            }
            //@TODO: what if contentHeight still > availableHeight
            children.push(line);
        }
    }, {
        key: "finished",
        value: function finished() {
            _get(Object.getPrototypeOf(Section.prototype), "finished", this).call(this);
            var composed = this.state.composed;

            this.setState({ composed: composed });
        }
    }]);

    return Section;
}(_any2.default);

Section.contextTypes = Object.assign({
    canvas: _react.PropTypes.object
}, _any2.default.contextTypes);
exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBS1Q7Z0JBQ0csV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURIO2dCQUVHLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGSDs2QkFHVyxLQUFLLEtBQUwsQ0FBUixJQUhIO2dCQUdHLGlDQUFJLGdCQUhQOztBQUlKLGdCQUFJLElBQUUsQ0FBRixDQUpBO0FBS0osbUJBQ0k7OztnQkFDSTs7c0JBQU8sS0FBSSxTQUFKLEVBQVA7b0JBQ0ssS0FBSyxLQUFMLENBQVcsUUFBWDtpQkFGVDtnQkFJSTs7c0JBQU8sS0FBSSxVQUFKLEVBQVA7b0JBQ0ssU0FBUyxHQUFULENBQWEsVUFBQyxJQUFELEVBQU0sQ0FBTixFQUFVOzRCQUNmLFFBQWMsS0FBZCxNQURlOzRCQUNULFNBQVEsS0FBUixPQURTOztBQUVwQiw0QkFBSSxVQUFTLHlEQUFNLEtBQUssQ0FBTCxFQUFRLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFiLENBQUQsR0FBcUIsQ0FBckIsRUFBd0IsR0FBRyxLQUFHLEdBQUgsSUFBWSxLQUF4RCxDQUFULENBRmdCO0FBR3BCLDZCQUFHLE1BQUgsQ0FIb0I7QUFJcEIsK0JBQU8sT0FBUCxDQUpvQjtxQkFBVixDQURsQjtpQkFKSjthQURKLENBTEk7Ozs7a0NBc0JDO2dCQUNFLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FERjs7QUFFTCxxQkFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFGSzs7Ozs7Ozs7O21DQVFFLEdBQUU7OEJBQzBCLEtBQUssS0FBTCxDQUE1QixLQURFO2dCQUNJLDBCQURKO2dCQUNVLDRCQURWO2dCQUNpQjs7O0FBRGpCLG1CQUlGO0FBQ0gsbUJBQUUsTUFBRjtBQUNBLG1CQUFFLE1BQUY7QUFDQSx1QkFBTyxRQUFN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REM7QUFFRCw2QkFBUyxJQUFULENBQWMsY0FBWSxLQUFLLFFBQUwsQ0FBYyxTQUFTLE1BQVQsQ0FBMUIsQ0FBZCxDQUZDO0FBR0Qsb0NBQWMsWUFBWSxPQUFaLENBQW9CLENBQXBCLENBQWQsQ0FIQztpQkFGTDtBQU9BLGtDQUFnQixjQUFjLE1BQWQ7Ozs7QUFSYSx3QkFZN0IsR0FBUyxjQUFjLFFBQWQsQ0Fab0I7YUFBakM7O0FBUlEsb0JBdUJSLENBQVMsSUFBVCxDQUFjLElBQWQsRUF2QlE7Ozs7bUNBMEJGO0FBQ04sdUNBeEhhLGdEQXdIYixDQURNO2dCQUVDLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGRDs7QUFHTixpQkFBSyxRQUFMLENBQWMsRUFBQyxrQkFBRCxFQUFkLEVBSE07Ozs7V0F2SE87OztRQUNWLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDOUIsWUFBUSxpQkFBVSxNQUFWO0NBRFEsRUFFakIsY0FBSSxZQUFKO2tCQUhjIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2UvcGFnZVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHtjYW52YXN9PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7Z2FwPTIwfT10aGlzLnByb3BzXG4gICAgICAgIGxldCB5PTBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cD5cbiAgICAgICAgICAgICAgICA8R3JvdXAgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgICAgIDxHcm91cCByZWY9XCJjb21wb3NlZFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29tcG9zZWQubWFwKChwYWdlLGkpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQge3dpZHRoLGhlaWdodH09cGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BhZ2U9KDxQYWdlIGtleT17aX0geD17KGNhbnZhcy53aWR0aC13aWR0aCkvMn0geT17eSs9Z2FwfSB7Li4ucGFnZX0vPilcbiAgICAgICAgICAgICAgICAgICAgICAgIHkrPWhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1BhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBjb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgLy9AVE9ETzpcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDptYXJnaW4sXG4gICAgICAgICAgICB5Om1hcmdpbixcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aC0yKm1hcmdpbixcbiAgICAgICAgICAgIGhlaWdodDpoZWlnaHQtMiptYXJnaW4sXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcbiAgICAgKi9cbiAgICBfbmV3UGFnZShpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG1hcmdpbixcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXG4gICAgICAgICAgICBoZWFkZXI6bnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjpudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblc9MCxoZWlnaHQ6bWluSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICBsZXQgYXZvaWRJbmZpbml0ZUxvb3A9MFxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pbkggfHwgd2lkdGg8bWluVyl7XG4gICAgICAgICAgICBpZihhdm9pZEluZmluaXRlTG9vcD09Mil7Ly9jYW4ndCBmaW5kIG1pbiBhcmVhLCBjaGVhdCB3aXRoIG1pbiBhcmVhXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgYXZvaWRJbmZpbml0ZUxvb3ArK1xuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5oZWlnaHQsaGVpZ2h0KVxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmVcbiAgICAgICAgaWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGF2b2lkSW5maW5pdGVMb29wKytcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcblxuICAgICAgICAgICAgY2hpbGRyZW49Y3VycmVudENvbHVtbi5jaGlsZHJlblxuICAgICAgICB9XG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgICAgICBjaGlsZHJlbi5wdXNoKGxpbmUpXG4gICAgfVxuXG4gICAgZmluaXNoZWQoKXtcbiAgICAgICAgc3VwZXIuZmluaXNoZWQoKVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9zZWR9KVxuICAgIH1cbn1cbiJdfQ==