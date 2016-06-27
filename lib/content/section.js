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
        key: "nextAvailableSpace",
        value: function nextAvailableSpace() {
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
        key: "appendComposed",
        value: function appendComposed(line) {
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

                    _this2.context.parent.appendComposed({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBS1Q7Z0JBQ0csV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURIO2dCQUVHLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGSDs7QUFHSixnQkFBSSxJQUFFLENBQUYsQ0FIQTtBQUlKLG1CQUNJOzs7Z0JBQ0k7O3NCQUFPLEtBQUksU0FBSixFQUFQO29CQUNLLEtBQUssS0FBTCxDQUFXLFFBQVg7aUJBRlQ7Z0JBSUk7O3NCQUFPLEtBQUksVUFBSixFQUFQO29CQUNLLFNBQVMsR0FBVCxDQUFhLFVBQUMsSUFBRCxFQUFNLENBQU4sRUFBVTs0QkFDZixRQUFjLEtBQWQsTUFEZTs0QkFDVCxTQUFRLEtBQVIsT0FEUzs7QUFFcEIsNEJBQUksVUFBUzs7OEJBQU8sR0FBRyxDQUFDLE9BQU8sS0FBUCxHQUFhLEtBQWIsQ0FBRCxHQUFxQixDQUFyQixFQUF3QixHQUFHLEtBQUcsT0FBTyxPQUFQLEVBQWdCLEtBQUssQ0FBTCxFQUF4RDs0QkFBZ0UsOENBQVUsSUFBVixDQUFoRTt5QkFBVCxDQUZnQjtBQUdwQiw2QkFBRyxNQUFILENBSG9CO0FBSXBCLCtCQUFPLE9BQVAsQ0FKb0I7cUJBQVYsQ0FEbEI7aUJBSko7YUFESixDQUpJOzs7O2tDQXFCQztnQkFDRSxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREY7O0FBRUwscUJBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRks7Ozs7Ozs7OzttQ0FRRSxHQUFFOzhCQUMwQixLQUFLLEtBQUwsQ0FBNUIsS0FERTtnQkFDSSwwQkFESjtnQkFDVSw0QkFEVjtnQkFDaUI7OztBQURqQixtQkFJRjtBQUNILG1CQUFFLE1BQUY7QUFDQSxtQkFBRSxNQUFGO0FBQ0EsdUJBQU8sUUFBTSxJQUFFLE1BQUY7QUFDYix3QkFBTyxTQUFPLElBQUUsTUFBRjtBQUNkLDBCQUFTLEVBQVQ7YUFMSixDQUpTOzs7Ozs7Ozs7aUNBZ0JKLEdBQUU7K0JBQzRCLEtBQUssS0FBTCxDQUE1QixLQURBO2dCQUNNLDJCQUROO2dCQUNZLDZCQURaO2dCQUNtQiw2QkFEbkI7O0FBRVAsbUJBQU87QUFDSCw0QkFERztBQUVILDhCQUZHO0FBR0gsOEJBSEc7QUFJSCx5QkFBUSxDQUFDLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFELENBQVI7QUFDQSx3QkFBTyxJQUFQO0FBQ0Esd0JBQU8sSUFBUDthQU5KLENBRk87Ozs7NkNBWW9CO2dCQUFaLGlFQUFTLGtCQUFHO2tDQUN3QixTQUE1QyxNQURvQjtnQkFDZCwrQ0FBYSxvQkFEQzttQ0FDd0IsU0FBdkIsT0FERDtnQkFDUSxnREFBYSxxQkFEckI7Z0JBRXBCLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGb0I7O0FBRzNCLGdCQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FIdUI7K0JBSWIsWUFKYTtnQkFJdEIsK0JBSnNCOztBQUszQixnQkFBSSxnQkFBYyxRQUFRLFFBQVEsTUFBUixHQUFlLENBQWYsQ0FBdEIsQ0FMdUI7aUNBTUUsY0FORjtnQkFNdEIsNkJBTnNCO2dCQU1oQiwrQkFOZ0I7Z0JBTVIsbUNBTlE7O0FBTzNCLGdCQUFJLGtCQUFnQixTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDt1QkFBVyxPQUFLLEVBQUUsS0FBRixDQUFRLE1BQVI7YUFBaEIsRUFBK0IsTUFBL0MsQ0FBaEI7OztBQVB1QixtQkFVckIsbUJBQWlCLFlBQWpCLElBQWlDLFFBQU0sWUFBTixFQUFtQjtBQUN0RCxvQkFBRyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLE9BQWhCLEdBQXdCLFFBQVEsTUFBUixFQUFlOztBQUN0Qyw0QkFBUSxJQUFSLENBQWEsZ0JBQWMsS0FBSyxVQUFMLENBQWdCLFFBQVEsTUFBUixDQUE5QixDQUFiLENBRHNDO2lCQUExQyxNQUVLOztBQUNELHdDQURDO0FBRUQsNkJBQVMsSUFBVCxDQUFjLGNBQVksS0FBSyxRQUFMLENBQWMsU0FBUyxNQUFULENBQTFCLENBQWQsQ0FGQztBQUdELG9DQUFjLFlBQVksT0FBWixDQUFvQixDQUFwQixDQUFkLENBSEM7aUJBRkw7QUFPQSx3QkFBTSxjQUFjLEtBQWQsQ0FSZ0Q7QUFTdEQseUJBQU8sY0FBYyxNQUFkLENBVCtDO0FBVXRELGtDQUFnQixjQUFjLE1BQWQsQ0FWc0M7YUFBMUQ7QUFZQSxtQkFBTyxFQUFDLFlBQUQsRUFBUSxRQUFPLGVBQVAsRUFBZixDQXRCMkI7Ozs7dUNBeUJoQixNQUFLO2dCQUNULFdBQVUsS0FBSyxLQUFMLENBQVYsU0FEUzs7QUFFaEIsZ0JBQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUZZO2dDQUdGLFlBSEU7Z0JBR1gsZ0NBSFc7O0FBSWhCLGdCQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUpZO2tDQUthLGNBTGI7Z0JBS1gsOEJBTFc7Z0JBS0wsZ0NBTEs7Z0JBS0csb0NBTEg7O0FBTWhCLGdCQUFJLGtCQUFnQixTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDt1QkFBVyxPQUFLLEVBQUUsS0FBRixDQUFRLE1BQVI7YUFBaEIsRUFBK0IsTUFBL0MsQ0FBaEIsQ0FOWTs7Z0JBUUYsZ0JBQWUsS0FBSyxLQUFMLENBQXRCLE9BUlM7OztBQVV0QixnQkFBRyxnQkFBYyxlQUFkLEVBQThCO0FBQ3ZCLG9CQUFHLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsT0FBaEIsR0FBd0IsUUFBUSxNQUFSLEVBQWU7O0FBQ3RDLDRCQUFRLElBQVIsQ0FBYSxnQkFBYyxLQUFLLFVBQUwsQ0FBZ0IsUUFBUSxNQUFSLENBQTlCLENBQWIsQ0FEc0M7aUJBQTFDLE1BRUs7O0FBQ0QsNkJBQVMsSUFBVCxDQUFjLGNBQVksS0FBSyxRQUFMLENBQWMsU0FBUyxNQUFULENBQTFCLENBQWQsQ0FEQztBQUVELG9DQUFjLFlBQVksT0FBWixDQUFvQixDQUFwQixDQUFkLENBRkM7aUJBRkw7QUFNQSxrQ0FBZ0IsY0FBYyxNQUFkOzs7O0FBUE8sd0JBV3ZCLEdBQVMsY0FBYyxRQUFkLENBWGM7YUFBakM7O0FBY0EscUJBQVMsSUFBVCxDQUFjOztrQkFBTyxHQUFHLFNBQU8sZUFBUCxFQUF3QixRQUFRLGFBQVIsRUFBbEM7Z0JBQTBELElBQTFEO2FBQWQ7O0FBeEJzQjs7O21DQTRCVjs7O0FBQ04sMkNBcEhhLGdEQW9IYixFQUFvQjs7d0JBQ2xCLFdBQVUsT0FBSyxLQUFMLENBQVY7d0JBQ0EsU0FBUSxPQUFLLE9BQUwsQ0FBUjt3QkFDTSxRQUFRLE9BQUssS0FBTCxDQUFkLEtBQU07O0FBQ2IsMkJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUM7QUFDbEMsK0JBQU8sS0FBUDtBQUNBLGdDQUFPLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTSxDQUFOO21DQUFVLE9BQUssRUFBRSxNQUFGLEdBQVMsT0FBTyxPQUFQO3lCQUF4QixFQUF1QyxDQUF2RCxDQUFQO3FCQUZEO0FBSUE7MkJBQU87cUJBQVA7b0JBUnlCOzs7YUFBcEI7O0FBV04sbUJBQU8sS0FBUCxDQVpZOzs7O1dBbkhPOzs7UUFDVixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQzlCLFlBQVEsaUJBQVUsTUFBVjtDQURRLEVBRWpCLGNBQUksWUFBSjtBQUhjLFFBa0liLGVBQWE7QUFDbkIsVUFBTTtBQUNMLGVBQU8sR0FBUDtBQUNBLGdCQUFRLEdBQVI7QUFDQSxnQkFBUSxFQUFSO0tBSEQ7O2tCQW5JbUIiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZS9wYWdlXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSwgQW55LmNvbnRleHRUeXBlcylcblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge2NhbnZhc309dGhpcy5jb250ZXh0XG4gICAgICAgIGxldCB5PTBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cD5cbiAgICAgICAgICAgICAgICA8R3JvdXAgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgICAgIDxHcm91cCByZWY9XCJjb21wb3NlZFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29tcG9zZWQubWFwKChwYWdlLGkpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQge3dpZHRoLGhlaWdodH09cGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BhZ2U9KDxHcm91cCB4PXsoY2FudmFzLndpZHRoLXdpZHRoKS8yfSB5PXt5Kz1jYW52YXMucGFnZUdhcH0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuICAgICAgICAgICAgICAgICAgICAgICAgeSs9aGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3UGFnZVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGk6IGNvbHVtbiBub1xuICAgICAqL1xuICAgIF9uZXdDb2x1bW4oaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICAvL0BUT0RPOlxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4Om1hcmdpbixcbiAgICAgICAgICAgIHk6bWFyZ2luLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLTIqbWFyZ2luLFxuICAgICAgICAgICAgaGVpZ2h0OmhlaWdodC0yKm1hcmdpbixcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgbWFyZ2luLFxuICAgICAgICAgICAgY29sdW1uczpbdGhpcy5fbmV3Q29sdW1uKDApXSxcbiAgICAgICAgICAgIGhlYWRlcjpudWxsLFxuICAgICAgICAgICAgZm9vdGVyOm51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgYXZvaWRJbmZpbml0ZUxvb3ArK1xuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cdFx0XG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuICAgICAgICBcblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcblxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXG5cbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cbiAgICAgICAgfVxuXHRcdFxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0+e2xpbmV9PC9Hcm91cD4pXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgIH1cblxuICAgIGZpbmlzaGVkKCl7XG4gICAgICAgIGlmKHN1cGVyLmZpbmlzaGVkKCkpe1xuXHRcdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLnN0YXRlXG5cdFx0XHRjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcblx0XHRcdGNvbnN0IHtwYWdlOnt3aWR0aH19PXRoaXMucHJvcHNcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoe1xuXHRcdFx0XHR3aWR0aDogd2lkdGgsXG5cdFx0XHRcdGhlaWdodDpjb21wb3NlZC5yZWR1Y2UoKHByZXYsYSk9PnByZXYrYS5oZWlnaHQrY2FudmFzLnBhZ2VHYXAsMClcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gZmFsc2VcbiAgICB9XG5cdFxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRwYWdlOiB7XG5cdFx0XHR3aWR0aDogMzAwLFxuXHRcdFx0aGVpZ2h0OiA0MDAsXG5cdFx0XHRtYXJnaW46IDIwXG5cdFx0fVxuXHR9XG59XG4iXX0=