"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

                        var newPage = _react2.default.createElement(
                            _group2.default,
                            { x: (canvas.width - width) / 2, y: y += canvas.pageGap, key: i },
                            _react2.default.createElement(_page2.default, page)
                        );
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
            var minRequiredW = _required$width === undefined ? 0 : _required$width;
            var _required$height = required.height;
            var minRequiredH = _required$height === undefined ? 0 : _required$height;
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
                return prev - a.props.height;
            }, height);

            //@TODO: what if never can find min area
            while (availableHeight <= minRequiredH || width < minRequiredW) {
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
                return prev - a.props.height;
            }, height);

            var contentHeight = line.props.height;


            if (contentHeight > availableHeight) {
                if (this.props.page.columns > columns.length) {
                    // new column
                    columns.push(currentColumn = this._newColumn(columns.length));
                } else {
                    //new page
                    composed.push(currentPage = this._newPage(composed.length));
                    currentColumn = currentPage.columns[0];
                }
                availableHeight = currentColumn.height;

                //@TODO: what if currentColumn.width!=line.width

                children = currentColumn.children;
            }

            children.push(_react2.default.createElement(
                _group2.default,
                { y: height - availableHeight, height: contentHeight },
                line
            ));
            //@TODO: what if contentHeight still > availableHeight
        }
    }, {
        key: "finished",
        value: function finished() {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(Section.prototype), "finished", this).call(this)) {
                var _ret = function () {
                    var composed = _this2.state.composed;
                    var canvas = _this2.context.canvas;
                    var width = _this2.props.page.width;

                    _this2.context.parent.append({
                        width: width,
                        height: composed.reduce(function (prev, a) {
                            return prev + a.height + canvas.pageGap;
                        }, 0)
                    });
                    return {
                        v: true
                    };
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            }

            return false;
        }
    }]);

    return Section;
}(_any2.default);

Section.contextTypes = Object.assign({
    canvas: _react.PropTypes.object
}, _any2.default.contextTypes);
Section.defaultProps = {
    page: {
        width: 300,
        height: 400,
        margin: 20
    }
};
exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBS1Q7Z0JBQ0csV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURIO2dCQUVHLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGSDs7QUFHSixnQkFBSSxJQUFFLENBQUYsQ0FIQTtBQUlKLG1CQUNJOzs7Z0JBQ0k7O3NCQUFPLEtBQUksU0FBSixFQUFQO29CQUNLLEtBQUssS0FBTCxDQUFXLFFBQVg7aUJBRlQ7Z0JBSUk7O3NCQUFPLEtBQUksVUFBSixFQUFQO29CQUNLLFNBQVMsR0FBVCxDQUFhLFVBQUMsSUFBRCxFQUFNLENBQU4sRUFBVTs0QkFDZixRQUFjLEtBQWQsTUFEZTs0QkFDVCxTQUFRLEtBQVIsT0FEUzs7QUFFcEIsNEJBQUksVUFBUzs7OEJBQU8sR0FBRyxDQUFDLE9BQU8sS0FBUCxHQUFhLEtBQWIsQ0FBRCxHQUFxQixDQUFyQixFQUF3QixHQUFHLEtBQUcsT0FBTyxPQUFQLEVBQWdCLEtBQUssQ0FBTCxFQUF4RDs0QkFBZ0UsOENBQVUsSUFBVixDQUFoRTt5QkFBVCxDQUZnQjtBQUdwQiw2QkFBRyxNQUFILENBSG9CO0FBSXBCLCtCQUFPLE9BQVAsQ0FKb0I7cUJBQVYsQ0FEbEI7aUJBSko7YUFESixDQUpJOzs7O2tDQXFCQztnQkFDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7O0FBRUwscUJBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRks7Ozs7Ozs7OzttQ0FRRSxHQUFFOzhCQUMwQixLQUFLLEtBQUwsQ0FBNUIsS0FERTtnQkFDSSwwQkFESjtnQkFDVSw0QkFEVjtnQkFDaUI7OztBQURqQixtQkFJRjtBQUNILG1CQUFFLE1BQUY7QUFDQSxtQkFBRSxNQUFGO0FBQ0EsdUJBQU8sUUFBTSxJQUFFLE1BQUY7QUFDYix3QkFBTyxTQUFPLElBQUUsTUFBRjtBQUNkLDBCQUFTLEVBQVQ7YUFMSixDQUpTOzs7Ozs7Ozs7aUNBZ0JKLEdBQUU7K0JBQzRCLEtBQUssS0FBTCxDQUE1QixLQURBO2dCQUNNLDJCQUROO2dCQUNZLDZCQURaO2dCQUNtQiw2QkFEbkI7O0FBRVAsbUJBQU87QUFDSCw0QkFERztBQUVILDhCQUZHO0FBR0gsOEJBSEc7QUFJSCx5QkFBUSxDQUFDLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFELENBQVI7QUFDQSx3QkFBTyxJQUFQO0FBQ0Esd0JBQU8sSUFBUDthQU5KLENBRk87Ozs7K0JBWU07Z0JBQVosaUVBQVMsa0JBQUc7a0NBQ3NDLFNBQTVDLE1BRE07Z0JBQ0EsK0NBQWEsb0JBRGI7bUNBQ3NDLFNBQXZCLE9BRGY7Z0JBQ3NCLGdEQUFhLHFCQURuQztnQkFFTixXQUFVLEtBQUssS0FBTCxDQUFWLFNBRk07O0FBR2IsZ0JBQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUhTOytCQUlDLFlBSkQ7Z0JBSVIsK0JBSlE7O0FBS2IsZ0JBQUksZ0JBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBTFM7aUNBTWdCLGNBTmhCO2dCQU1SLDZCQU5RO2dCQU1GLCtCQU5FO2dCQU1NLG1DQU5OOztBQU9iLGdCQUFJLGtCQUFnQixTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDt1QkFBVyxPQUFLLEVBQUUsS0FBRixDQUFRLE1BQVI7YUFBaEIsRUFBK0IsTUFBL0MsQ0FBaEI7OztBQVBTLG1CQVVQLG1CQUFpQixZQUFqQixJQUFpQyxRQUFNLFlBQU4sRUFBbUI7QUFDdEQsb0JBQUcsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixPQUFoQixHQUF3QixRQUFRLE1BQVIsRUFBZTs7QUFDdEMsNEJBQVEsSUFBUixDQUFhLGdCQUFjLEtBQUssVUFBTCxDQUFnQixRQUFRLE1BQVIsQ0FBOUIsQ0FBYixDQURzQztpQkFBMUMsTUFFSzs7QUFDRCx3Q0FEQztBQUVELDZCQUFTLElBQVQsQ0FBYyxjQUFZLEtBQUssUUFBTCxDQUFjLFNBQVMsTUFBVCxDQUExQixDQUFkLENBRkM7QUFHRCxvQ0FBYyxZQUFZLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBZCxDQUhDO2lCQUZMO0FBT0Esd0JBQU0sY0FBYyxLQUFkLENBUmdEO0FBU3RELHlCQUFPLGNBQWMsTUFBZCxDQVQrQztBQVV0RCxrQ0FBZ0IsY0FBYyxNQUFkLENBVnNDO2FBQTFEO0FBWUEsbUJBQU8sRUFBQyxZQUFELEVBQVEsUUFBTyxlQUFQLEVBQWYsQ0F0QmE7Ozs7K0JBeUJWLE1BQUs7Z0JBQ0QsV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURDOztBQUVSLGdCQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FGSTtnQ0FHTSxZQUhOO2dCQUdILGdDQUhHOztBQUlSLGdCQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUpJO2tDQUtxQixjQUxyQjtnQkFLSCw4QkFMRztnQkFLRyxnQ0FMSDtnQkFLVyxvQ0FMWDs7QUFNUixnQkFBSSxrQkFBZ0IsU0FBUyxNQUFULENBQWdCLFVBQUMsSUFBRCxFQUFPLENBQVA7dUJBQVcsT0FBSyxFQUFFLEtBQUYsQ0FBUSxNQUFSO2FBQWhCLEVBQStCLE1BQS9DLENBQWhCLENBTkk7O2dCQVFNLGdCQUFlLEtBQUssS0FBTCxDQUF0QixPQVJDOzs7QUFVZCxnQkFBRyxnQkFBYyxlQUFkLEVBQThCO0FBQ3ZCLG9CQUFHLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsT0FBaEIsR0FBd0IsUUFBUSxNQUFSLEVBQWU7O0FBQ3RDLDRCQUFRLElBQVIsQ0FBYSxnQkFBYyxLQUFLLFVBQUwsQ0FBZ0IsUUFBUSxNQUFSLENBQTlCLENBQWIsQ0FEc0M7aUJBQTFDLE1BRUs7O0FBQ0QsNkJBQVMsSUFBVCxDQUFjLGNBQVksS0FBSyxRQUFMLENBQWMsU0FBUyxNQUFULENBQTFCLENBQWQsQ0FEQztBQUVELG9DQUFjLFlBQVksT0FBWixDQUFvQixDQUFwQixDQUFkLENBRkM7aUJBRkw7QUFNQSxrQ0FBZ0IsY0FBYyxNQUFkOzs7O0FBUE8sd0JBV3ZCLEdBQVMsY0FBYyxRQUFkLENBWGM7YUFBakM7O0FBY0EscUJBQVMsSUFBVCxDQUFjOztrQkFBTyxHQUFHLFNBQU8sZUFBUCxFQUF3QixRQUFRLGFBQVIsRUFBbEM7Z0JBQTBELElBQTFEO2FBQWQ7O0FBeEJjOzs7bUNBNEJGOzs7QUFDTiwyQ0FwSGEsZ0RBb0hiLEVBQW9COzt3QkFDbEIsV0FBVSxPQUFLLEtBQUwsQ0FBVjt3QkFDQSxTQUFRLE9BQUssT0FBTCxDQUFSO3dCQUNNLFFBQVEsT0FBSyxLQUFMLENBQWQsS0FBTTs7QUFDYiwyQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixNQUFwQixDQUEyQjtBQUMxQiwrQkFBTyxLQUFQO0FBQ0EsZ0NBQU8sU0FBUyxNQUFULENBQWdCLFVBQUMsSUFBRCxFQUFNLENBQU47bUNBQVUsT0FBSyxFQUFFLE1BQUYsR0FBUyxPQUFPLE9BQVA7eUJBQXhCLEVBQXVDLENBQXZELENBQVA7cUJBRkQ7QUFJQTsyQkFBTztxQkFBUDtvQkFSeUI7OzthQUFwQjs7QUFXTixtQkFBTyxLQUFQLENBWlk7Ozs7V0FuSE87OztRQUNWLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDOUIsWUFBUSxpQkFBVSxNQUFWO0NBRFEsRUFFakIsY0FBSSxZQUFKO0FBSGMsUUFrSWIsZUFBYTtBQUNuQixVQUFNO0FBQ0wsZUFBTyxHQUFQO0FBQ0EsZ0JBQVEsR0FBUjtBQUNBLGdCQUFRLEVBQVI7S0FIRDs7a0JBbkltQiIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlL3BhZ2VcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LCBBbnkuY29udGV4dFR5cGVzKVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcbiAgICAgICAgbGV0IHk9MFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICAgIDxHcm91cCByZWY9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICAgICAgPEdyb3VwIHJlZj1cImNvbXBvc2VkXCI+XG4gICAgICAgICAgICAgICAgICAgIHtjb21wb3NlZC5tYXAoKHBhZ2UsaSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT1wYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UGFnZT0oPEdyb3VwIHg9eyhjYW52YXMud2lkdGgtd2lkdGgpLzJ9IHk9e3krPWNhbnZhcy5wYWdlR2FwfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG4gICAgICAgICAgICAgICAgICAgICAgICB5Kz1oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdQYWdlXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIC8vQFRPRE86XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6bWFyZ2luLFxuICAgICAgICAgICAgeTptYXJnaW4sXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgtMiptYXJnaW4sXG4gICAgICAgICAgICBoZWlnaHQ6aGVpZ2h0LTIqbWFyZ2luLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dChyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgYXZvaWRJbmZpbml0ZUxvb3ArK1xuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXHRcdFxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmUucHJvcHNcbiAgICAgICAgXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblx0XHRcblx0XHRjaGlsZHJlbi5wdXNoKDxHcm91cCB5PXtoZWlnaHQtYXZhaWxhYmxlSGVpZ2h0fSBoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9PntsaW5lfTwvR3JvdXA+KVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cbiAgICBmaW5pc2hlZCgpe1xuICAgICAgICBpZihzdXBlci5maW5pc2hlZCgpKXtcblx0XHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuXHRcdFx0Y29uc3Qge2NhbnZhc309dGhpcy5jb250ZXh0XG5cdFx0XHRjb25zdCB7cGFnZTp7d2lkdGh9fT10aGlzLnByb3BzXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZCh7XG5cdFx0XHRcdHdpZHRoOiB3aWR0aCxcblx0XHRcdFx0aGVpZ2h0OmNvbXBvc2VkLnJlZHVjZSgocHJldixhKT0+cHJldithLmhlaWdodCtjYW52YXMucGFnZUdhcCwwKVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZVxuICAgIH1cblx0XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHBhZ2U6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9XG5cdH1cbn1cbiJdfQ==