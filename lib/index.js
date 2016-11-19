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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkRm9udCIsImVkaXQiLCJjb21wb3NlIiwicHJldmlldyIsIlN0cmluZyIsInByb3RvdHlwZSIsInNwbGljZSIsInN0YXJ0IiwiZGVsQ291bnQiLCJuZXdTdWJTdHIiLCJzbGljZSIsIk1hdGgiLCJhYnMiLCJpbnB1dCIsImNvbnRhaW5lciIsIlRleHQiLCJXb3JkV3JhcHBlciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJsb2FkIiwidGhlbiIsInJlbmRlciIsImRvYyIsInJlbmRlclRvU3RhdGljTWFya3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVFBLFE7OztRQVVRQyxJLEdBQUFBLEk7UUFPQUMsTyxHQUFBQSxPO1FBTUFDLE8sR0FBQUEsTzs7QUEzQmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQ0MsT0FBT0MsU0FBUCxDQUFpQkMsTUFBdEIsRUFBOEI7QUFDMUJGLFFBQU9DLFNBQVAsQ0FBaUJDLE1BQWpCLEdBQTBCLFVBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQXdDO0FBQUEsTUFBZEMsU0FBYyx1RUFBSixFQUFJOztBQUM5RCxTQUFPLEtBQUtDLEtBQUwsQ0FBVyxDQUFYLEVBQWNILEtBQWQsSUFBdUJFLFNBQXZCLEdBQW1DLEtBQUtDLEtBQUwsQ0FBV0gsUUFBUUksS0FBS0MsR0FBTCxDQUFTSixRQUFULENBQW5CLENBQTFDO0FBQ0gsRUFGRDtBQUdIOztBQWdCTSxTQUFTUCxJQUFULENBQWNZLEtBQWQsRUFBb0JDLFNBQXBCLEVBQThCO0FBQ3BDLGtCQUFPQyxJQUFQLENBQVlDLFdBQVo7QUFDRyxvQkFBU0Msc0JBQVQsQ0FBZ0NILFNBQWhDO0FBQ0gsUUFBTyxnQkFBTUksSUFBTixDQUFXTCxLQUFYLG9CQUNMTSxJQURLLENBQ0E7QUFBQSxTQUFLLG1CQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQlAsU0FBckIsQ0FBTDtBQUFBLEVBREEsQ0FBUDtBQUVBOztBQUVNLFNBQVNaLE9BQVQsQ0FBaUJXLEtBQWpCLEVBQXVCO0FBQzdCLG1CQUFRRSxJQUFSLENBQWFDLFdBQWI7QUFDQSxRQUFPLGdCQUFNRSxJQUFOLENBQVdMLEtBQVgscUJBQ0xNLElBREssQ0FDQTtBQUFBLFNBQUssaUJBQWVHLG9CQUFmLENBQW9DRCxHQUFwQyxDQUFMO0FBQUEsRUFEQSxDQUFQO0FBRUE7O0FBRU0sU0FBU2xCLE9BQVQsQ0FBaUJVLEtBQWpCLEVBQXVCQyxTQUF2QixFQUFpQztBQUNwQyxvQkFBU0csc0JBQVQsQ0FBZ0NILFNBQWhDO0FBQ0gsUUFBTyxnQkFBTUksSUFBTixDQUFXTCxLQUFYLHFCQUNMTSxJQURLLENBQ0E7QUFBQSxTQUFLLG1CQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQlAsU0FBckIsQ0FBTDtBQUFBLEVBREEsQ0FBUDtBQUVBOztBQUVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHI9XCJcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcbiAgICB9O1xufVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXG5cbmV4cG9ydCB7bG9hZEZvbnR9IGZyb20gXCIuL2ZvbnRzXCJcbmltcG9ydCBDb250ZW50LCB7VGV4dH0gZnJvbSBcIi4vY29udGVudFwiXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXG5cbmltcG9ydCBTVkdXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9zdmdcIlxuaW1wb3J0IENhbnZhc1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL2NhbnZhc1wiXG5pbXBvcnQgTm9kZVdvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL25vZGVcIlxuXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vaW5wdXQvXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXQoaW5wdXQsY29udGFpbmVyKXtcblx0RWRpdG9yLlRleHQuV29yZFdyYXBwZXI9Q2FudmFzV29yZFdyYXBwZXJcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcilcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIEVkaXRvcilcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MsIGNvbnRhaW5lcikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlKGlucHV0KXtcblx0Q29udGVudC5UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dCwgQ29udGVudClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0LCBDb250ZW50KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYywgY29udGFpbmVyKSlcbn1cblxuLypcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG5cdGxldCBBPUNvbnRlbnRcbiAgICAvL1RleHQuV29yZFdyYXBwZXI9Tm9kZVdvcmRXcmFwcGVyXG5cdGxvYWRGb250KCkudGhlbihmb250cz0+XG5cdFx0UmVhY3RET00ucmVuZGVyKChcblx0XHRcdDxBLkRvY3VtZW50PlxuXHRcdFx0XHQ8QS5TZWN0aW9uPlxuXHRcdFx0XHRcdDxBLlBhcmFncmFwaD5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdFx0PEEuSW1hZ2Ugd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9XG5cdFx0XHRcdFx0XHRcdHNyYz1cImh0dHA6Ly9uLnNpbmFpbWcuY24vbmV3cy90cmFuc2Zvcm0vMjAxNjA2MjkvZ2JmMy1meHRuaWF4ODI1NTk0Ny5qcGdcIi8+XG5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxMDApLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cdFx0XHRcdFx0PC9BLlBhcmFncmFwaD5cblx0XHRcdFx0PC9BLlNlY3Rpb24+XG5cdFx0XHQ8L0EuRG9jdW1lbnQ+XG5cdFx0KSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpXG5cdClcbn1cbiovXG4iXX0=