"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadFont = undefined;

var _fonts = require("./fonts");

Object.defineProperty(exports, "loadFont", {
	enumerable: true,
	get: function get() {
		return _fonts.loadFont;
	}
});
exports.edit = edit;
exports.compose = compose;
exports.preview = preview;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

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

var _input = require("./input/");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
	String.prototype.splice = function (start, delCount) {
		var newSubStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};
}

function edit(input, container) {
	_editor2.default.Text.WordWrapper = _canvas2.default;
	_reactDom2.default.unmountComponentAtNode(container);
	return _input2.default.load(input, _editor2.default).then(function (doc) {
		return _reactDom2.default.render(doc, container);
	});
}

function compose(input) {
	_content2.default.Text.WordWrapper = _node2.default;
	return _input2.default.load(input, _content2.default).then(function (doc) {
		return _server2.default.renderToStaticMarkup(doc);
	});
}

function preview(input, container) {
	_reactDom2.default.unmountComponentAtNode(container);
	return _input2.default.load(input, _content2.default).then(function (doc) {
		return _reactDom2.default.render(doc, container);
	});
}

/*
export function test(){
	let A=Content
    //Text.WordWrapper=NodeWordWrapper
	loadFont().then(fonts=>
		ReactDOM.render((
			<A.Document>
				<A.Section>
					<A.Paragraph>
						<A.Inline><A.Text>{Array(1).fill("over").join(" ")}</A.Text></A.Inline>
						<A.Image width={100} height={100}
							src="http://n.sinaimg.cn/news/transform/20160629/gbf3-fxtniax8255947.jpg"/>

						<A.Inline><A.Text>{Array(100).fill("hello1, let's edit").join(" ")}</A.Text></A.Inline>

						<A.Inline><A.Text>{Array(1).fill("over").join(" ")}</A.Text></A.Inline>
					</A.Paragraph>
				</A.Section>
			</A.Document>
		),document.querySelector('#app'))
	)
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkRm9udCIsImVkaXQiLCJjb21wb3NlIiwicHJldmlldyIsIlN0cmluZyIsInByb3RvdHlwZSIsInNwbGljZSIsInN0YXJ0IiwiZGVsQ291bnQiLCJuZXdTdWJTdHIiLCJzbGljZSIsIk1hdGgiLCJhYnMiLCJpbnB1dCIsImNvbnRhaW5lciIsIlRleHQiLCJXb3JkV3JhcHBlciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJsb2FkIiwidGhlbiIsInJlbmRlciIsImRvYyIsInJlbmRlclRvU3RhdGljTWFya3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVFBLFE7OztRQVVRQyxJLEdBQUFBLEk7UUFPQUMsTyxHQUFBQSxPO1FBTUFDLE8sR0FBQUEsTzs7QUEzQmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQ0MsT0FBT0MsU0FBUCxDQUFpQkMsTUFBdEIsRUFBOEI7QUFDMUJGLFFBQU9DLFNBQVAsQ0FBaUJDLE1BQWpCLEdBQTBCLFVBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQXdDO0FBQUEsTUFBZEMsU0FBYyx1RUFBSixFQUFJOztBQUM5RCxTQUFPLEtBQUtDLEtBQUwsQ0FBVyxDQUFYLEVBQWNILEtBQWQsSUFBdUJFLFNBQXZCLEdBQW1DLEtBQUtDLEtBQUwsQ0FBV0gsUUFBUUksS0FBS0MsR0FBTCxDQUFTSixRQUFULENBQW5CLENBQTFDO0FBQ0gsRUFGRDtBQUdIOztBQWdCTSxTQUFTUCxJQUFULENBQWNZLEtBQWQsRUFBb0JDLFNBQXBCLEVBQThCO0FBQ3BDLGtCQUFPQyxJQUFQLENBQVlDLFdBQVo7QUFDRyxvQkFBU0Msc0JBQVQsQ0FBZ0NILFNBQWhDO0FBQ0gsUUFBTyxnQkFBTUksSUFBTixDQUFXTCxLQUFYLG9CQUNMTSxJQURLLENBQ0E7QUFBQSxTQUFLLG1CQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQlAsU0FBckIsQ0FBTDtBQUFBLEVBREEsQ0FBUDtBQUVBOztBQUVNLFNBQVNaLE9BQVQsQ0FBaUJXLEtBQWpCLEVBQXVCO0FBQzdCLG1CQUFRRSxJQUFSLENBQWFDLFdBQWI7QUFDQSxRQUFPLGdCQUFNRSxJQUFOLENBQVdMLEtBQVgscUJBQ0xNLElBREssQ0FDQTtBQUFBLFNBQUssaUJBQWVHLG9CQUFmLENBQW9DRCxHQUFwQyxDQUFMO0FBQUEsRUFEQSxDQUFQO0FBRUE7O0FBRU0sU0FBU2xCLE9BQVQsQ0FBaUJVLEtBQWpCLEVBQXVCQyxTQUF2QixFQUFpQztBQUNwQyxvQkFBU0csc0JBQVQsQ0FBZ0NILFNBQWhDO0FBQ0gsUUFBTyxnQkFBTUksSUFBTixDQUFXTCxLQUFYLHFCQUNMTSxJQURLLENBQ0E7QUFBQSxTQUFLLG1CQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQlAsU0FBckIsQ0FBTDtBQUFBLEVBREEsQ0FBUDtBQUVBOztBQUVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cj1cIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxyXG5cclxuZXhwb3J0IHtsb2FkRm9udH0gZnJvbSBcIi4vZm9udHNcIlxyXG5pbXBvcnQgQ29udGVudCwge1RleHR9IGZyb20gXCIuL2NvbnRlbnRcIlxyXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXHJcblxyXG5pbXBvcnQgU1ZHV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvc3ZnXCJcclxuaW1wb3J0IENhbnZhc1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL2NhbnZhc1wiXHJcbmltcG9ydCBOb2RlV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvbm9kZVwiXHJcblxyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vaW5wdXQvXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0KGlucHV0LGNvbnRhaW5lcil7XHJcblx0RWRpdG9yLlRleHQuV29yZFdyYXBwZXI9Q2FudmFzV29yZFdyYXBwZXJcclxuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoY29udGFpbmVyKVxyXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0LCBFZGl0b3IpXHJcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MsIGNvbnRhaW5lcikpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlKGlucHV0KXtcclxuXHRDb250ZW50LlRleHQuV29yZFdyYXBwZXI9Tm9kZVdvcmRXcmFwcGVyXHJcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIENvbnRlbnQpXHJcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYykpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XHJcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcilcclxuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dCwgQ29udGVudClcclxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYywgY29udGFpbmVyKSlcclxufVxyXG5cclxuLypcclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcclxuXHRsZXQgQT1Db250ZW50XHJcbiAgICAvL1RleHQuV29yZFdyYXBwZXI9Tm9kZVdvcmRXcmFwcGVyXHJcblx0bG9hZEZvbnQoKS50aGVuKGZvbnRzPT5cclxuXHRcdFJlYWN0RE9NLnJlbmRlcigoXHJcblx0XHRcdDxBLkRvY3VtZW50PlxyXG5cdFx0XHRcdDxBLlNlY3Rpb24+XHJcblx0XHRcdFx0XHQ8QS5QYXJhZ3JhcGg+XHJcblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxyXG5cdFx0XHRcdFx0XHQ8QS5JbWFnZSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH1cclxuXHRcdFx0XHRcdFx0XHRzcmM9XCJodHRwOi8vbi5zaW5haW1nLmNuL25ld3MvdHJhbnNmb3JtLzIwMTYwNjI5L2diZjMtZnh0bmlheDgyNTU5NDcuanBnXCIvPlxyXG5cclxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEwMCkuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxyXG5cclxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XHJcblx0XHRcdFx0XHQ8L0EuUGFyYWdyYXBoPlxyXG5cdFx0XHRcdDwvQS5TZWN0aW9uPlxyXG5cdFx0XHQ8L0EuRG9jdW1lbnQ+XHJcblx0XHQpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcclxuXHQpXHJcbn1cclxuKi9cclxuIl19