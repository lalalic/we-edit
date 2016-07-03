"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = edit;
exports.test = test;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _content = require("./content");

var _content2 = _interopRequireDefault(_content);

var _editor = require("./editor");

var _editor2 = _interopRequireDefault(_editor);

var _svg = require("./wordwrap/svg");

var _svg2 = _interopRequireDefault(_svg);

var _canvas = require("./wordwrap/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

var _node = require("./wordwrap/node");

var _node2 = _interopRequireDefault(_node);

var _fonts = require("./wordwrap/fonts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

function edit() {}

_content.Text.WordWrapper = _node2.default;

var A = _content2.default;
function test() {
    (0, _fonts.loadFont)();

    _reactDom2.default.render(_react2.default.createElement(
        A.Document,
        null,
        _react2.default.createElement(
            A.Section,
            null,
            _react2.default.createElement(
                A.Paragraph,
                null,
                _react2.default.createElement(
                    A.Inline,
                    null,
                    _react2.default.createElement(
                        A.Text,
                        null,
                        Array(100).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(A.Image, { width: 100, height: 100,
                    src: "http://n.sinaimg.cn/news/transform/20160629/gbf3-fxtniax8255947.jpg" }),
                _react2.default.createElement(
                    A.Inline,
                    null,
                    _react2.default.createElement(
                        A.Text,
                        null,
                        Array(1).fill("over").join(" ")
                    )
                )
            )
        )
    ), document.querySelector('#app'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFTd0I7UUFpQlI7O0FBMUJoQjs7OztBQUNBOzs7O0FBWUE7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsV0FBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQixTQUExQixFQUFxQztBQUMzRCxlQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRG9EO0tBQXJDLENBREE7Q0FBOUI7O0FBTWUsU0FBUyxJQUFULEdBQWUsRUFBZjs7QUFjZixjQUFLLFdBQUw7O0FBRUEsSUFBSSxxQkFBSjtBQUNPLFNBQVMsSUFBVCxHQUFlO0FBQ2xCLDJCQURrQjs7QUFHbEIsdUJBQVMsTUFBVCxDQUNJO0FBQUMsVUFBRSxRQUFIOztRQUNJO0FBQUMsY0FBRSxPQUFIOztZQUNJO0FBQUMsa0JBQUUsU0FBSDs7Z0JBQ0k7QUFBQyxzQkFBRSxNQUFIOztvQkFBVTtBQUFDLDBCQUFFLElBQUg7O3dCQUFTLE1BQU0sR0FBTixFQUFXLElBQVgsQ0FBZ0Isb0JBQWhCLEVBQXNDLElBQXRDLENBQTJDLEdBQTNDLENBQVQ7cUJBQVY7aUJBREo7Z0JBRUksOEJBQUMsRUFBRSxLQUFILElBQVMsT0FBTyxHQUFQLEVBQVksUUFBUSxHQUFSO0FBQ2pCLHlCQUFJLHFFQUFKLEVBREosQ0FGSjtnQkFLSTtBQUFDLHNCQUFFLE1BQUg7O29CQUFVO0FBQUMsMEJBQUUsSUFBSDs7d0JBQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsQ0FBMkIsR0FBM0IsQ0FBVDtxQkFBVjtpQkFMSjthQURKO1NBREo7S0FESixFQVlFLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQVpGLEVBSGtCO0NBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdCgpe1xuXG59XG5cbmltcG9ydCBDb250ZW50LCB7VGV4dH0gZnJvbSBcIi4vY29udGVudFwiXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXG5cblxuaW1wb3J0IFNWR1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL3N2Z1wiXG5pbXBvcnQgQ2FudmFzV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvY2FudmFzXCJcbmltcG9ydCBOb2RlV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvbm9kZVwiXG5cbmltcG9ydCB7bG9hZEZvbnR9IGZyb20gXCIuL3dvcmR3cmFwL2ZvbnRzXCJcblxuVGV4dC5Xb3JkV3JhcHBlcj1Ob2RlV29yZFdyYXBwZXJcblxubGV0IEE9Q29udGVudFxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcbiAgICBsb2FkRm9udCgpXG5cbiAgICBSZWFjdERPTS5yZW5kZXIoKFxuICAgICAgICA8QS5Eb2N1bWVudD5cbiAgICAgICAgICAgIDxBLlNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPEEuUGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMTAwKS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDxBLkltYWdlIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL24uc2luYWltZy5jbi9uZXdzL3RyYW5zZm9ybS8yMDE2MDYyOS9nYmYzLWZ4dG5pYXg4MjU1OTQ3LmpwZ1wiLz5cblxuICAgICAgICAgICAgICAgICAgICA8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cbiAgICAgICAgICAgICAgICA8L0EuUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9BLlNlY3Rpb24+XG4gICAgICAgIDwvQS5Eb2N1bWVudD5cbiAgICApLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcbn1cbiJdfQ==