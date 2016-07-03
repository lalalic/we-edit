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

var _fonts = require("./wordwrap/fonts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

function edit() {}

//Text.WordWrapper=CanvasWordWrapper

var A = _editor2.default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFTd0I7UUFnQlI7O0FBekJoQjs7OztBQUNBOzs7O0FBWUE7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQWpCQSxJQUFJLENBQUMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLEVBQXlCO0FBQzFCLFdBQU8sU0FBUCxDQUFpQixNQUFqQixHQUEwQixVQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEIsU0FBMUIsRUFBcUM7QUFDM0QsZUFBTyxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsS0FBZCxJQUF1QixTQUF2QixHQUFtQyxLQUFLLEtBQUwsQ0FBVyxRQUFRLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBUixDQUE5QyxDQURvRDtLQUFyQyxDQURBO0NBQTlCOztBQU1lLFNBQVMsSUFBVCxHQUFlLEVBQWY7Ozs7QUFlZixJQUFJLG9CQUFKO0FBQ08sU0FBUyxJQUFULEdBQWU7QUFDbEIsMkJBRGtCOztBQUdsQix1QkFBUyxNQUFULENBQ0k7QUFBQyxVQUFFLFFBQUg7O1FBQ0k7QUFBQyxjQUFFLE9BQUg7O1lBQ0k7QUFBQyxrQkFBRSxTQUFIOztnQkFDSTtBQUFDLHNCQUFFLE1BQUg7O29CQUFVO0FBQUMsMEJBQUUsSUFBSDs7d0JBQVMsTUFBTSxHQUFOLEVBQVcsSUFBWCxDQUFnQixvQkFBaEIsRUFBc0MsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FBVDtxQkFBVjtpQkFESjtnQkFFSSw4QkFBQyxFQUFFLEtBQUgsSUFBUyxPQUFPLEdBQVAsRUFBWSxRQUFRLEdBQVI7QUFDakIseUJBQUkscUVBQUosRUFESixDQUZKO2dCQUtJO0FBQUMsc0JBQUUsTUFBSDs7b0JBQVU7QUFBQywwQkFBRSxJQUFIOzt3QkFBUyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsTUFBZCxFQUFzQixJQUF0QixDQUEyQixHQUEzQixDQUFUO3FCQUFWO2lCQUxKO2FBREo7U0FESjtLQURKLEVBWUUsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBWkYsRUFIa0I7Q0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cikge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0KCl7XG5cbn1cblxuaW1wb3J0IENvbnRlbnQgZnJvbSBcIi4vY29udGVudFwiXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXG5cblxuaW1wb3J0IFNWR1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL3N2Z1wiXG5pbXBvcnQgQ2FudmFzV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvY2FudmFzXCJcblxuaW1wb3J0IHtsb2FkRm9udH0gZnJvbSBcIi4vd29yZHdyYXAvZm9udHNcIlxuXG4vL1RleHQuV29yZFdyYXBwZXI9Q2FudmFzV29yZFdyYXBwZXJcblxubGV0IEE9RWRpdG9yXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIGxvYWRGb250KClcblxuICAgIFJlYWN0RE9NLnJlbmRlcigoXG4gICAgICAgIDxBLkRvY3VtZW50PlxuICAgICAgICAgICAgPEEuU2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8QS5QYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxBLklubGluZT48QS5UZXh0PntBcnJheSgxMDApLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cbiAgICAgICAgICAgICAgICAgICAgPEEuSW1hZ2Ugd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vbi5zaW5haW1nLmNuL25ld3MvdHJhbnNmb3JtLzIwMTYwNjI5L2diZjMtZnh0bmlheDgyNTU5NDcuanBnXCIvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvQS5QYXJhZ3JhcGg+XG4gICAgICAgICAgICA8L0EuU2VjdGlvbj5cbiAgICAgICAgPC9BLkRvY3VtZW50PlxuICAgICksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxufVxuIl19