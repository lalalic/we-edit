"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _frame = require("../composed/frame");

var _frame2 = _interopRequireDefault(_frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Any) {
    (0, _inherits3.default)(_class, _Any);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: "_newColumn",


        /**
         * i: column no
         */
        value: function _newColumn(i) {
            var _props = this.props,
                _props$size = _props.size,
                width = _props$size.width,
                height = _props$size.height,
                _props$margin = _props.margin,
                top = _props$margin.top,
                bottom = _props$margin.bottom,
                left = _props$margin.left,
                right = _props$margin.right,
                _props$cols = _props.cols,
                _props$cols$num = _props$cols.num,
                num = _props$cols$num === undefined ? 1 : _props$cols$num,
                space = _props$cols.space,
                data = _props$cols.data;

            var info = {
                y: 0,
                height: height - bottom - top,
                children: []
            };
            var availableWidth = width - left - right;

            if (num == 1) {
                info.width = availableWidth;
                info.x = 0;
            } else if (data) {
                info.x = data.reduce(function (p, a, j) {
                    return j < i ? p + a.width + a.space : p;
                }, 0);
                info.width = data[i].width;
            } else {
                var colWidth = (availableWidth - (num - 1) * space) / num;
                info.x = i * (colWidth + space);
                info.width = colWidth;
            }
            return info;
        }
    }, {
        key: "compose",
        value: function compose() {
            this.computed.composed.push(this._newColumn());
        }
    }, {
        key: "nextAvailableSpace",
        value: function nextAvailableSpace() {
            var required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _required$width = required.width,
                minRequiredW = _required$width === undefined ? 0 : _required$width,
                _required$height = required.height,
                minRequiredH = _required$height === undefined ? 0 : _required$height;
            var composed = this.computed.composed;
            var _props$cols$num2 = this.props.cols.num,
                allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

            var currentColumn = composed[composed.length - 1];
            var _currentColumn = currentColumn,
                width = _currentColumn.width,
                height = _currentColumn.height,
                children = _currentColumn.children;

            var availableHeight = children.reduce(function (prev, a) {
                return prev - a.props.height;
            }, height);

            //@TODO: what if never can find min area
            while (availableHeight <= minRequiredH || width < minRequiredW) {
                if (allowedColumns > columns.length) {
                    // new column
                    columns.push(currentColumn = this._newColumn(columns.length));
                } else {
                    return { width: 0, height: 0 };
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
            var composed = this.computed.composed;
            var _props$cols$num3 = this.props.cols.num,
                allowedColumns = _props$cols$num3 === undefined ? 1 : _props$cols$num3;

            var currentPage = composed[composed.length - 1];
            var columns = currentPage.columns;

            var currentColumn = columns[columns.length - 1];
            var _currentColumn2 = currentColumn,
                width = _currentColumn2.width,
                height = _currentColumn2.height,
                children = _currentColumn2.children;

            var availableHeight = children.reduce(function (prev, a) {
                return prev - a.props.height;
            }, height);

            var contentHeight = line.props.height;


            if (contentHeight > availableHeight) {
                if (allowedColumns > columns.length) {
                    // new column
                    columns.push(currentColumn = this._newColumn(columns.length));
                } else {
                    return;
                }
                availableHeight = currentColumn.height;

                //@TODO: what if currentColumn.width!=line.width

                children = currentColumn.children;
            }

            children.push(this.createComposed2Parent({ children: line, height: contentHeight, y: height - availableHeight }));
            //@TODO: what if contentHeight still > availableHeight
        }

        /**
         *  section needn't append to document, but give chance for extension
         */

    }, {
        key: "createComposed2Parent",
        value: function createComposed2Parent(props) {
            return _react2.default.createElement(Group, props);
        }
    }, {
        key: "onAllChildrenComposed",
        value: function onAllChildrenComposed() {
            var _props2 = this.props,
                _props2$size = _props2.size,
                width = _props2$size.width,
                height = _props2$size.height,
                margin = _props2.margin;

            this.context.parent.appendComposed(_react2.default.createElement(_frame2.default, { width: width, height: height, margin: margin, columns: this.composed }));
            (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "onAllChildrenComposed", this).call(this);
        }
    }]);
    return _class;
}(_any2.default);

_class.displayName = "frame";
_class.propTypes = {
    size: _react.PropTypes.shape({
        width: _react.PropTypes.number.isRequired,
        height: _react.PropTypes.number.isRequired
    }),
    margin: _react.PropTypes.shape({
        left: _react.PropTypes.number,
        right: _react.PropTypes.number,
        top: _react.PropTypes.number,
        bottom: _react.PropTypes.number
    }),
    cols: _react.PropTypes.object
};
_class.defaultProps = {
    size: {
        width: 300,
        height: 400
    },
    margin: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
    }
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ZyYW1lLmpzIl0sIm5hbWVzIjpbImkiLCJwcm9wcyIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbiIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNvbHMiLCJudW0iLCJzcGFjZSIsImRhdGEiLCJpbmZvIiwieSIsImNoaWxkcmVuIiwiYXZhaWxhYmxlV2lkdGgiLCJ4IiwicmVkdWNlIiwicCIsImEiLCJqIiwiY29sV2lkdGgiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsIl9uZXdDb2x1bW4iLCJyZXF1aXJlZCIsIm1pblJlcXVpcmVkVyIsIm1pblJlcXVpcmVkSCIsImFsbG93ZWRDb2x1bW5zIiwiY3VycmVudENvbHVtbiIsImxlbmd0aCIsImF2YWlsYWJsZUhlaWdodCIsInByZXYiLCJjb2x1bW5zIiwibGluZSIsImN1cnJlbnRQYWdlIiwiY29udGVudEhlaWdodCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwic2hhcGUiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtJOzs7bUNBR1dBLEMsRUFBRTtBQUFBLHlCQUNtRixLQUFLQyxLQUR4RjtBQUFBLHFDQUNGQyxJQURFO0FBQUEsZ0JBQ0lDLEtBREosZUFDSUEsS0FESjtBQUFBLGdCQUNXQyxNQURYLGVBQ1dBLE1BRFg7QUFBQSx1Q0FDcUJDLE1BRHJCO0FBQUEsZ0JBQzZCQyxHQUQ3QixpQkFDNkJBLEdBRDdCO0FBQUEsZ0JBQ2tDQyxNQURsQyxpQkFDa0NBLE1BRGxDO0FBQUEsZ0JBQzBDQyxJQUQxQyxpQkFDMENBLElBRDFDO0FBQUEs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QztBQUVOQyxlQUFNLEVBRkE7QUFHTkgsYUFBSSxFQUhFO0FBSU5DLGdCQUFPO0FBSkQ7QUFMZSxDIiwiZmlsZSI6ImZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEZyYW1lIGZyb20gXCIuLi9jb21wb3NlZC9mcmFtZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFueXtcclxuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cImZyYW1lXCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIGk6IGNvbHVtbiBub1xyXG4gICAgICovXHJcbiAgICBfbmV3Q29sdW1uKGkpe1xyXG4gICAgICAgIGNvbnN0IHtzaXplOnt3aWR0aCwgaGVpZ2h0fSwgIG1hcmdpbjp7dG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0fSwgY29sczp7bnVtPTEsIHNwYWNlLCBkYXRhfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBpbmZvPXtcclxuICAgICAgICAgICAgeTowLFxyXG4gICAgICAgICAgICBoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD13aWR0aC1sZWZ0LXJpZ2h0XHJcblxyXG4gICAgICAgIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgIGluZm8ud2lkdGg9YXZhaWxhYmxlV2lkdGhcclxuICAgICAgICAgICAgaW5mby54PTBcclxuICAgICAgICB9ZWxzZSBpZihkYXRhKXtcclxuICAgICAgICAgICAgaW5mby54PWRhdGEucmVkdWNlKChwLCBhLCBqKT0+KGo8aSA/IHArYS53aWR0aCthLnNwYWNlIDogcCksMClcclxuICAgICAgICAgICAgaW5mby53aWR0aD1kYXRhW2ldLndpZHRoXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvbnVtXHJcbiAgICAgICAgICAgIGluZm8ueD1pKihjb2xXaWR0aCtzcGFjZSlcclxuICAgICAgICAgICAgaW5mby53aWR0aD1jb2xXaWR0aFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5mb1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3Q29sdW1uKCkpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcclxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxyXG5cclxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXHJcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcclxuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt3aWR0aDowLGhlaWdodDowfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcclxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXHJcblxyXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xyXG5cclxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcclxuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcblxyXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcclxuXHJcbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cclxuICAgICAgICB9XHJcblxyXG5cdFx0Y2hpbGRyZW4ucHVzaCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Y2hpbGRyZW46bGluZSwgaGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHk6IGhlaWdodC1hdmFpbGFibGVIZWlnaHR9KSlcclxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogIHNlY3Rpb24gbmVlZG4ndCBhcHBlbmQgdG8gZG9jdW1lbnQsIGJ1dCBnaXZlIGNoYW5jZSBmb3IgZXh0ZW5zaW9uXHJcblx0ICovXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG4gICAgICAgIGNvbnN0IHtzaXplOnt3aWR0aCxoZWlnaHR9LCBtYXJnaW59PXRoaXMucHJvcHNcclxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKDxGcmFtZSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBtYXJnaW49e21hcmdpbn0gY29sdW1ucz17dGhpcy5jb21wb3NlZH0vPilcclxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xyXG5cdFx0c2l6ZTogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcclxuXHRcdH0pLFxyXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRyaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRib3R0b206IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHR9KSxcclxuXHRcdGNvbHM6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRzaXplOiB7XHJcblx0XHRcdHdpZHRoOiAzMDAsXHJcblx0XHRcdGhlaWdodDogNDAwXHJcblx0XHR9LFxyXG5cdFx0bWFyZ2luOntcclxuXHRcdFx0bGVmdDoyMCxcclxuXHRcdFx0cmlnaHQ6MjAsXHJcblx0XHRcdHRvcDoyMCxcclxuXHRcdFx0Ym90dG9tOjIwXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==