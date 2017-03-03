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

var _frame = require("../composed/frame");

var _frame2 = _interopRequireDefault(_frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Any) {
    _inherits(_class, _Any);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
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
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onAllChildrenComposed", this).call(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ZyYW1lLmpzIl0sIm5hbWVzIjpbImkiLCJwcm9wcyIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbiIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNvbHMiLCJudW0iLCJzcGFjZSIsImRhdGEiLCJpbmZvIiwieSIsImNoaWxkcmVuIiwiYXZhaWxhYmxlV2lkdGgiLCJ4IiwicmVkdWNlIiwicCIsImEiLCJqIiwiY29sV2lkdGgiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsIl9uZXdDb2x1bW4iLCJyZXF1aXJlZCIsIm1pblJlcXVpcmVkVyIsIm1pblJlcXVpcmVkSCIsImFsbG93ZWRDb2x1bW5zIiwiY3VycmVudENvbHVtbiIsImxlbmd0aCIsImF2YWlsYWJsZUhlaWdodCIsInByZXYiLCJjb2x1bW5zIiwibGluZSIsImN1cnJlbnRQYWdlIiwiY29udGVudEhlaWdodCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwic2hhcGUiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0k7OzttQ0FHV0EsQyxFQUFFO0FBQUEseUJBQ21GLEtBQUtDLEtBRHhGO0FBQUEscUNBQ0ZDLElBREU7QUFBQSxnQkFDSUMsS0FESixlQUNJQSxLQURKO0FBQUEsZ0JBQ1dDLE1BRFgsZUFDV0EsTUFEWDtBQUFBLHVDQUNxQkMsTUFEckI7QUFBQSxnQkFDNkJDLEdBRDdCLGlCQUM2QkEsR0FEN0I7QUFBQSxnQkFDa0NDLE1BRGxDLGlCQUNrQ0EsTUFEbEM7QUFBQSxnQkFDMENDLElBRDFDLGlCQUMwQ0EsSUFEMUM7QUFBQSxnQkFDZ0RDLEtBRGhE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LEVBRkE7QUFHTkgsYUFBSSxFQUhFO0FBSU5DLGdCQUFPO0FBSkQ7QUFMZSxDIiwiZmlsZSI6ImZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEZyYW1lIGZyb20gXCIuLi9jb21wb3NlZC9mcmFtZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFueXtcclxuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cImZyYW1lXCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIGk6IGNvbHVtbiBub1xyXG4gICAgICovXHJcbiAgICBfbmV3Q29sdW1uKGkpe1xyXG4gICAgICAgIGNvbnN0IHtzaXplOnt3aWR0aCwgaGVpZ2h0fSwgIG1hcmdpbjp7dG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0fSwgY29sczp7bnVtPTEsIHNwYWNlLCBkYXRhfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBpbmZvPXtcclxuICAgICAgICAgICAgeTowLFxyXG4gICAgICAgICAgICBoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD13aWR0aC1sZWZ0LXJpZ2h0XHJcblxyXG4gICAgICAgIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgIGluZm8ud2lkdGg9YXZhaWxhYmxlV2lkdGhcclxuICAgICAgICAgICAgaW5mby54PTBcclxuICAgICAgICB9ZWxzZSBpZihkYXRhKXtcclxuICAgICAgICAgICAgaW5mby54PWRhdGEucmVkdWNlKChwLCBhLCBqKT0+KGo8aSA/IHArYS53aWR0aCthLnNwYWNlIDogcCksMClcclxuICAgICAgICAgICAgaW5mby53aWR0aD1kYXRhW2ldLndpZHRoXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvbnVtXHJcbiAgICAgICAgICAgIGluZm8ueD1pKihjb2xXaWR0aCtzcGFjZSlcclxuICAgICAgICAgICAgaW5mby53aWR0aD1jb2xXaWR0aFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5mb1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3Q29sdW1uKCkpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcclxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxyXG5cclxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXHJcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcclxuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt3aWR0aDowLGhlaWdodDowfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcclxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXHJcblxyXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xyXG5cclxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcclxuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcblxyXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcclxuXHJcbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cclxuICAgICAgICB9XHJcblxyXG5cdFx0Y2hpbGRyZW4ucHVzaCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Y2hpbGRyZW46bGluZSwgaGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHk6IGhlaWdodC1hdmFpbGFibGVIZWlnaHR9KSlcclxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogIHNlY3Rpb24gbmVlZG4ndCBhcHBlbmQgdG8gZG9jdW1lbnQsIGJ1dCBnaXZlIGNoYW5jZSBmb3IgZXh0ZW5zaW9uXHJcblx0ICovXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG4gICAgICAgIGNvbnN0IHtzaXplOnt3aWR0aCxoZWlnaHR9LCBtYXJnaW59PXRoaXMucHJvcHNcclxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKDxGcmFtZSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBtYXJnaW49e21hcmdpbn0gY29sdW1ucz17dGhpcy5jb21wb3NlZH0vPilcclxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xyXG5cdFx0c2l6ZTogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcclxuXHRcdH0pLFxyXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRyaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRib3R0b206IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHR9KSxcclxuXHRcdGNvbHM6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRzaXplOiB7XHJcblx0XHRcdHdpZHRoOiAzMDAsXHJcblx0XHRcdGhlaWdodDogNDAwXHJcblx0XHR9LFxyXG5cdFx0bWFyZ2luOntcclxuXHRcdFx0bGVmdDoyMCxcclxuXHRcdFx0cmlnaHQ6MjAsXHJcblx0XHRcdHRvcDoyMCxcclxuXHRcdFx0Ym90dG9tOjIwXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==