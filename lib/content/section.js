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
        key: "compose",
        value: function compose() {
            _get(Object.getPrototypeOf(Section.prototype), "compose", this).call(this);
            var composed = this.composed;

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
            var composed = this.composed;

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
        key: "replaceAvaibleSpace",
        value: function replaceAvaibleSpace(reference, required) {
            var _required$width2 = required.width;
            var minRequiredW = _required$width2 === undefined ? 0 : _required$width2;
            var _required$height2 = required.height;
            var minRequiredH = _required$height2 === undefined ? 0 : _required$height2;
            var composed = this.composed;

            var _foundLine2 = this._foundLine(reference);

            var currentPage = _foundLine2.page;
            var currentColumn = _foundLine2.column;
            var line = _foundLine2.line;
            var occupiedHeight = _foundLine2.occupiedHeight;
            var _currentPage2 = currentPage;
            var columns = _currentPage2.columns;
            var _currentColumn2 = currentColumn;
            var width = _currentColumn2.width;
            var height = _currentColumn2.height;
            var children = _currentColumn2.children;

            var availableHeight = height - occupiedHeight;

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
        key: "_foundLine",
        value: function _foundLine(line) {
            //return {page, column, line, occupiedHeight}
        }
    }, {
        key: "appendComposed",
        value: function appendComposed(line) {
            var composed = this.composed;

            var currentPage = composed[composed.length - 1];
            var _currentPage3 = currentPage;
            var columns = _currentPage3.columns;

            var currentColumn = columns[columns.length - 1];
            var _currentColumn3 = currentColumn;
            var width = _currentColumn3.width;
            var height = _currentColumn3.height;
            var children = _currentColumn3.children;

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
                    var composed = _this2.composed;
                    var canvas = _this2.context.canvas;
                    var width = _this2.props.page.width;


                    var y = 0;
                    var pages = composed.map(function (page, i) {
                        var width = page.width;
                        var height = page.height;

                        var newPage = _react2.default.createElement(
                            _group2.default,
                            { x: (canvas.width - width) / 2, y: y += canvas.pageGap, key: i },
                            _react2.default.createElement(_page2.default, page)
                        );
                        y += height;
                        return newPage;
                    });

                    _this2.context.parent.appendComposed(_react2.default.createElement(
                        _group2.default,
                        { height: y, width: width },
                        pages
                    ));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7a0NBS1I7QUFDTCx1Q0FOYSwrQ0FNYixDQURLO2dCQUVFLFdBQVUsS0FBVixTQUZGOztBQUdMLHFCQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQUhLOzs7Ozs7Ozs7bUNBU0UsR0FBRTs4QkFDMEIsS0FBSyxLQUFMLENBQTVCLEtBREU7Z0JBQ0ksMEJBREo7Z0JBQ1UsNEJBRFY7Z0JBQ2lCOzs7QUFEakIsbUJBSUY7QUFDSCxtQkFBRSxNQUFGO0FBQ0EsbUJBQUUsTUFBRjtBQUNBLHVCQUFPLFFBQU0sSUFBRSxNQUFGO0FBQ2Isd0JBQU8sU0FBTyxJQUFFLE1BQUY7QUFDZCwwQkFBUyxFQUFUO2FBTEosQ0FKUzs7Ozs7Ozs7O2lDQWdCSixHQUFFOytCQUM0QixLQUFLLEtBQUwsQ0FBNUIsS0FEQTtnQkFDTSwyQkFETjtnQkFDWSw2QkFEWjtnQkFDbUIsNkJBRG5COztBQUVQLG1CQUFPO0FBQ0gsNEJBREc7QUFFSCw4QkFGRztBQUdILDhCQUhHO0FBSUgseUJBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFSO0FBQ0Esd0JBQU8sSUFBUDtBQUNBLHdCQUFPLElBQVA7YUFOSixDQUZPOzs7OzZDQVlvQjtnQkFBWixpRUFBUyxrQkFBRztrQ0FDd0IsU0FBNUMsTUFEb0I7Z0JBQ2QsK0NBQWEsb0JBREM7bUNBQ3dCLFNBQXZCLE9BREQ7Z0JBQ1EsZ0RBQWEscUJBRHJCO2dCQUVwQixXQUFVLEtBQVYsU0FGb0I7O0FBRzNCLGdCQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FIdUI7K0JBSWIsWUFKYTtnQkFJdEIsK0JBSnNCOztBQUszQixnQkFBSSxnQkFBYyxRQUFRLFFBQVEsTUFB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cUJBQVYsQ0FBbkI7O0FBT2IsMkJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUM7OzBCQUFPLFFBQVEsQ0FBUixFQUFXLE9BQU8sS0FBUCxFQUFsQjt3QkFBaUMsS0FBakM7cUJBQW5DOztBQUVBOzJCQUFPO3FCQUFQO29CQWZ5Qjs7O2FBQXBCOztBQWtCTixtQkFBTyxLQUFQLENBbkJZOzs7O1dBM0hPOzs7UUFDVixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQzlCLFlBQVEsaUJBQVUsTUFBVjtDQURRLEVBRWpCLGNBQUksWUFBSjtBQUhjLFFBaUpiLGVBQWE7QUFDbkIsVUFBTTtBQUNMLGVBQU8sR0FBUDtBQUNBLGdCQUFRLEdBQVI7QUFDQSxnQkFBUSxFQUFSO0tBSEQ7O2tCQWxKbUIiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZS9wYWdlXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSwgQW55LmNvbnRleHRUeXBlcylcblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgc3VwZXIuY29tcG9zZSgpXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgLy9AVE9ETzpcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDptYXJnaW4sXG4gICAgICAgICAgICB5Om1hcmdpbixcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aC0yKm1hcmdpbixcbiAgICAgICAgICAgIGhlaWdodDpoZWlnaHQtMiptYXJnaW4sXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcbiAgICAgKi9cbiAgICBfbmV3UGFnZShpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG1hcmdpbixcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXG4gICAgICAgICAgICBoZWFkZXI6bnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjpudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGF2b2lkSW5maW5pdGVMb29wKytcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cdFxuXHRyZXBsYWNlQXZhaWJsZVNwYWNlKHJlZmVyZW5jZSwgcmVxdWlyZWQpe1xuXHRcdGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBsZXQge3BhZ2U6Y3VycmVudFBhZ2UsIGNvbHVtbjpjdXJyZW50Q29sdW1uLCBsaW5lLCBvY2N1cGllZEhlaWdodH09dGhpcy5fZm91bmRMaW5lKHJlZmVyZW5jZSlcbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1oZWlnaHQtb2NjdXBpZWRIZWlnaHRcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgYXZvaWRJbmZpbml0ZUxvb3ArK1xuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuXHR9XG5cdFxuXHRfZm91bmRMaW5lKGxpbmUpe1xuXHRcdC8vcmV0dXJuIHtwYWdlLCBjb2x1bW4sIGxpbmUsIG9jY3VwaWVkSGVpZ2h0fVxuXHR9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0+e2xpbmV9PC9Hcm91cD4pXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgIH1cblxuICAgIGZpbmlzaGVkKCl7XG4gICAgICAgIGlmKHN1cGVyLmZpbmlzaGVkKCkpe1xuXHRcdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0XHRjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcblx0XHRcdGNvbnN0IHtwYWdlOnt3aWR0aH19PXRoaXMucHJvcHNcblxuICAgICAgICAgICAgbGV0IHk9MFxuICAgICAgICAgICAgbGV0IHBhZ2VzPWNvbXBvc2VkLm1hcCgocGFnZSxpKT0+e1xuICAgICAgICAgICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT1wYWdlXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BhZ2U9KDxHcm91cCB4PXsoY2FudmFzLndpZHRoLXdpZHRoKS8yfSB5PXt5Kz1jYW52YXMucGFnZUdhcH0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuICAgICAgICAgICAgICAgIHkrPWhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdQYWdlXG4gICAgICAgICAgICB9KVxuXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKDxHcm91cCBoZWlnaHQ9e3l9IHdpZHRoPXt3aWR0aH0+e3BhZ2VzfTwvR3JvdXA+KVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRwYWdlOiB7XG5cdFx0XHR3aWR0aDogMzAwLFxuXHRcdFx0aGVpZ2h0OiA0MDAsXG5cdFx0XHRtYXJnaW46IDIwXG5cdFx0fVxuXHR9XG59XG4iXX0=