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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "_newColumn",


        /**
         * i: column no
         */
        value: function _newColumn(i) {
            var _props = this.props;
            var _props$size = _props.size;
            var width = _props$size.width;
            var height = _props$size.height;
            var _props$margin = _props.margin;
            var top = _props$margin.top;
            var bottom = _props$margin.bottom;
            var left = _props$margin.left;
            var right = _props$margin.right;
            var _props$cols = _props.cols;
            var _props$cols$num = _props$cols.num;
            var num = _props$cols$num === undefined ? 1 : _props$cols$num;
            var space = _props$cols.space;
            var data = _props$cols.data;

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
            var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var _required$width = required.width;
            var minRequiredW = _required$width === undefined ? 0 : _required$width;
            var _required$height = required.height;
            var minRequiredH = _required$height === undefined ? 0 : _required$height;
            var composed = this.computed.composed;
            var _props$cols$num2 = this.props.cols.num;
            var allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

            var currentColumn = composed[composed.length - 1];
            var _currentColumn = currentColumn;
            var width = _currentColumn.width;
            var height = _currentColumn.height;
            var children = _currentColumn.children;

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
            var _props$cols$num3 = this.props.cols.num;
            var allowedColumns = _props$cols$num3 === undefined ? 1 : _props$cols$num3;

            var currentPage = composed[composed.length - 1];
            var columns = currentPage.columns;

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
            var _props2 = this.props;
            var _props2$size = _props2.size;
            var width = _props2$size.width;
            var height = _props2$size.height;
            var margin = _props2.margin;

            this.context.parent.appendComposed(_react2.default.createElement(_frame2.default, { width: width, height: height, margin: margin, columns: this.composed }));
            _get(Object.getPrototypeOf(_class.prototype), "onAllChildrenComposed", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ZyYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBUWUsR0FBRTt5QkFDbUYsS0FBSyxLQUFMLENBRG5GO3FDQUNGLEtBREU7Z0JBQ0ksMEJBREo7Z0JBQ1csNEJBRFg7dUNBQ3FCLE9BRHJCO2dCQUM2Qix3QkFEN0I7Z0JBQ2tDLDhCQURsQztnQkFDMEMsMEJBRDFDO2dCQUNnRCw0QkFEaEQ7cUNBQ3dELEtBRHhEOzhDQUM4RCxJQUQ5RDtnQkFDOEQsc0NBQUksb0JBRGxFO2dCQUNxRSwwQkFEckU7Z0JBQzRFLHdCQUQ1RTs7QUFFVCxnQkFBSSxPQUFLO0FBQ0wsbUJBQUUsQ0FBRjtBQUNBLHdCQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDUCwwQkFBUyxFQUFUO2FBSEEsQ0FGSztBQU9ULGdCQUFJLGlCQUFlLFFBQU0sSUFBTixHQUFXLEtBQVgsQ0FQVjs7QUFTVCxnQkFBRyxPQUFLLENBQUwsRUFBTztBQUNOLHFCQUFLLEtBQUwsR0FBVyxjQUFYLENBRE07QUFFTixxQkFBSyxDQUFMLEdBQU8sQ0FBUCxDQUZNO2FBQVYsTUFHTSxJQUFHLElBQUgsRUFBUTtBQUNWLHFCQUFLLENBQUwsR0FBTyxLQUFLLE1BQUwsQ0FBWSxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUDsyQkFBWSxJQUFFLENBQUYsR0FBTSxJQUFFLEVBQUUsS0FBRixHQUFRLEVBQUUsS0FBRixHQUFVLENBQTFCO2lCQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEVTtBQUVWLHFCQUFLLEtBQUwsR0FBVyxLQUFLLENBQUwsRUFBUSxLQUFSLENBRkQ7YUFBUixNQUdEO0FBQ0Qsb0JBQUksV0FBUyxDQUFDLGlCQUFlLENBQUMsTUFBSSxDQUFKLENBQUQsR0FBUSxLQUFSLENBQWhCLEdBQStCLEdBQS9CLENBRFo7QUFFRCxxQkFBSyxDQUFM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RFk7Z0JBQ04sMkJBRE07Z0JBQ0EsNkJBREE7Z0JBQ1Msd0JBRFQ7O0FBRW5CLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLGlEQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixRQUFRLE1BQVIsRUFBZ0IsU0FBUyxLQUFLLFFBQUwsRUFBOUQsQ0FBbkMsRUFGbUI7QUFHbkIsb0dBSG1COzs7Ozs7O09BMUZoQixjQUFZO09BZ0daLFlBQVU7QUFDbkIsVUFBTSxpQkFBVSxLQUFWLENBQWdCO0FBQ3JCLGVBQU8saUJBQVUsTUFBVixDQUFpQixVQUFqQjtBQUNQLGdCQUFRLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7S0FGSCxDQUFOO0FBSUEsWUFBUSxpQkFBVSxLQUFWLENBQWdCO0FBQ3ZCLGNBQU0saUJBQVUsTUFBVjtBQUNOLGVBQU8saUJBQVUsTUFBVjtBQUNQLGFBQUssaUJBQVUsTUFBVjtBQUNMLGdCQUFRLGlCQUFVLE1BQVY7S0FKRCxDQUFSO0FBTUEsVUFBTSxpQkFBVSxNQUFWOztPQUdHLGVBQWE7QUFDdEIsVUFBTTtBQUNMLGVBQU8sR0FBUDtBQUNBLGdCQUFRLEdBQVI7S0FGRDtBQUlBLFlBQU87QUFDTixjQUFLLEVBQUw7QUFDQSxlQUFNLEVBQU47QUFDQSxhQUFJLEVBQUo7QUFDQSxnQkFBTyxFQUFQO0tBSkQiLCJmaWxlIjoiZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBGcmFtZSBmcm9tIFwiLi4vY29tcG9zZWQvZnJhbWVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFueXtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJmcmFtZVwiXG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuICAgICAgICBjb25zdCB7c2l6ZTp7d2lkdGgsIGhlaWdodH0sICBtYXJnaW46e3RvcCwgYm90dG9tLCBsZWZ0LCByaWdodH0sIGNvbHM6e251bT0xLCBzcGFjZSwgZGF0YX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGluZm89e1xuICAgICAgICAgICAgeTowLFxuICAgICAgICAgICAgaGVpZ2h0OmhlaWdodC1ib3R0b20tdG9wLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9d2lkdGgtbGVmdC1yaWdodFxuXG4gICAgICAgIGlmKG51bT09MSl7XG4gICAgICAgICAgICBpbmZvLndpZHRoPWF2YWlsYWJsZVdpZHRoXG4gICAgICAgICAgICBpbmZvLng9MFxuICAgICAgICB9ZWxzZSBpZihkYXRhKXtcbiAgICAgICAgICAgIGluZm8ueD1kYXRhLnJlZHVjZSgocCwgYSwgaik9PihqPGkgPyBwK2Eud2lkdGgrYS5zcGFjZSA6IHApLDApXG4gICAgICAgICAgICBpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgY29sV2lkdGg9KGF2YWlsYWJsZVdpZHRoLShudW0tMSkqc3BhY2UpL251bVxuICAgICAgICAgICAgaW5mby54PWkqKGNvbFdpZHRoK3NwYWNlKVxuICAgICAgICAgICAgaW5mby53aWR0aD1jb2xXaWR0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3Q29sdW1uKCkpXG4gICAgfVxuXG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dpZHRoOjAsaGVpZ2h0OjB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWR0aD1jdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXG5cblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcblxuICAgICAgICAgICAgY2hpbGRyZW49Y3VycmVudENvbHVtbi5jaGlsZHJlblxuICAgICAgICB9XG5cblx0XHRjaGlsZHJlbi5wdXNoKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHtjaGlsZHJlbjpsaW5lLCBoZWlnaHQ6Y29udGVudEhlaWdodCwgeTogaGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0pKVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cblx0LyoqXG5cdCAqICBzZWN0aW9uIG5lZWRuJ3QgYXBwZW5kIHRvIGRvY3VtZW50LCBidXQgZ2l2ZSBjaGFuY2UgZm9yIGV4dGVuc2lvblxuXHQgKi9cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wcm9wc30vPlxuXHR9XG5cbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcbiAgICAgICAgY29uc3Qge3NpemU6e3dpZHRoLGhlaWdodH0sIG1hcmdpbn09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKDxGcmFtZSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBtYXJnaW49e21hcmdpbn0gY29sdW1ucz17dGhpcy5jb21wb3NlZH0vPilcbiAgICAgICAgc3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRzaXplOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG5cdFx0fSksXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0bGVmdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Ym90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdH0pLFxuXHRcdGNvbHM6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2l6ZToge1xuXHRcdFx0d2lkdGg6IDMwMCxcblx0XHRcdGhlaWdodDogNDAwXG5cdFx0fSxcblx0XHRtYXJnaW46e1xuXHRcdFx0bGVmdDoyMCxcblx0XHRcdHJpZ2h0OjIwLFxuXHRcdFx0dG9wOjIwLFxuXHRcdFx0Ym90dG9tOjIwXG5cdFx0fVxuXHR9XG59XG4iXX0=