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

var _fonts = require("./fonts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

if (!String.prototype.splice) {
	String.prototype.splice = function (start, delCount, newSubStr) {
		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};
}

function edit() {}

//Text.WordWrapper=NodeWordWrapper

var A = _content2.default;
function test() {
	//loadFont().then(fonts=>
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
	), document.body);
	//)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFXd0I7UUFpQlI7O0FBMUJoQjs7OztBQUNBOzs7O0FBWUE7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBdkJBLFFBQVEsZ0JBQVI7O0FBS0EsSUFBSSxDQUFDLE9BQU8sU0FBUCxDQUFpQixNQUFqQixFQUF5QjtBQUMxQixRQUFPLFNBQVAsQ0FBaUIsTUFBakIsR0FBMEIsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCLFNBQTFCLEVBQXFDO0FBQzNELFNBQU8sS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLEtBQWQsSUFBdUIsU0FBdkIsR0FBbUMsS0FBSyxLQUFMLENBQVcsUUFBUSxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQVIsQ0FBOUMsQ0FEb0Q7RUFBckMsQ0FEQTtDQUE5Qjs7QUFNZSxTQUFTLElBQVQsR0FBZSxFQUFmOzs7O0FBZ0JmLElBQUkscUJBQUo7QUFDTyxTQUFTLElBQVQsR0FBZTs7QUFFcEIsb0JBQVMsTUFBVCxDQUNDO0FBQUMsSUFBRSxRQUFIOztFQUNDO0FBQUMsS0FBRSxPQUFIOztHQUNDO0FBQUMsTUFBRSxTQUFIOztJQUNDO0FBQUMsT0FBRSxNQUFIOztLQUFVO0FBQUMsUUFBRSxJQUFIOztNQUFTLE1BQU0sR0FBTixFQUFXLElBQVgsQ0FBZ0Isb0JBQWhCLEVBQXNDLElBQXRDLENBQTJDLEdBQTNDLENBQVQ7TUFBVjtLQUREO0lBRUMsOEJBQUMsRUFBRSxLQUFILElBQVMsT0FBTyxHQUFQLEVBQVksUUFBUSxHQUFSO0FBQ3BCLFVBQUkscUVBQUosRUFERCxDQUZEO0lBS0M7QUFBQyxPQUFFLE1BQUg7O0tBQVU7QUFBQyxRQUFFLElBQUg7O01BQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsQ0FBMkIsR0FBM0IsQ0FBVDtNQUFWO0tBTEQ7SUFERDtHQUREO0VBREQsRUFZRSxTQUFTLElBQVQsQ0FaRjs7QUFGb0IsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdCgpe1xuXG59XG5cbmltcG9ydCBDb250ZW50LCB7VGV4dH0gZnJvbSBcIi4vY29udGVudFwiXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXG5cblxuaW1wb3J0IFNWR1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL3N2Z1wiXG5pbXBvcnQgQ2FudmFzV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvY2FudmFzXCJcbmltcG9ydCBOb2RlV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvbm9kZVwiXG5cbmltcG9ydCB7bG9hZEZvbnR9IGZyb20gXCIuL2ZvbnRzXCJcblxuLy9UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXG5sZXQgQT1Db250ZW50XG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIC8vbG9hZEZvbnQoKS50aGVuKGZvbnRzPT5cblx0XHRSZWFjdERPTS5yZW5kZXIoKFxuXHRcdFx0PEEuRG9jdW1lbnQ+XG5cdFx0XHRcdDxBLlNlY3Rpb24+XG5cdFx0XHRcdFx0PEEuUGFyYWdyYXBoPlxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEwMCkuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdFx0PEEuSW1hZ2Ugd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9XG5cdFx0XHRcdFx0XHRcdHNyYz1cImh0dHA6Ly9uLnNpbmFpbWcuY24vbmV3cy90cmFuc2Zvcm0vMjAxNjA2MjkvZ2JmMy1meHRuaWF4ODI1NTk0Ny5qcGdcIi8+XG5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdDwvQS5QYXJhZ3JhcGg+XG5cdFx0XHRcdDwvQS5TZWN0aW9uPlxuXHRcdFx0PC9BLkRvY3VtZW50PlxuXHRcdCksZG9jdW1lbnQuYm9keSlcblx0Ly8pXG59XG4iXX0=