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
		var newSubStr = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};
}

function edit(input, container) {
	_editor2.default.Text.WordWrapper = _svg2.default;
	_reactDom2.default.unmountComponentAtNode(container);
	return _input2.default.load(input).then(function (doc) {
		return _reactDom2.default.render(doc.createReactElement(_editor2.default), container);
	});
}

function compose(input) {
	return _input2.default.load(input).then(function (doc) {
		return _server2.default.renderToStaticMarkup(element);
	});
}

function preview(input, container) {
	_reactDom2.default.unmountComponentAtNode(container);
	return _input2.default.load(input).then(function (doc) {
		return _reactDom2.default.render(doc.createReactElement(_content2.default), container);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBT0E7UUFLQTs7QUExQmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsUUFBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUF3QztNQUFkLGtFQUFVLGtCQUFJOztBQUM5RCxTQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRHVEO0VBQXhDLENBREE7Q0FBOUI7O0FBb0JPLFNBQVMsSUFBVCxDQUFjLEtBQWQsRUFBb0IsU0FBcEIsRUFBOEI7QUFDcEMsa0JBQU8sSUFBUCxDQUFZLFdBQVosaUJBRG9DO0FBRWpDLG9CQUFTLHNCQUFULENBQWdDLFNBQWhDLEVBRmlDO0FBR3BDLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsRUFDTCxJQURLLENBQ0E7U0FBSyxtQkFBUyxNQUFULENBQWdCLElBQUksa0JBQUosa0JBQWhCLEVBQWdELFNBQWhEO0VBQUwsQ0FEUCxDQUhvQztDQUE5Qjs7QUFPQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBdUI7QUFDN0IsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxFQUNMLElBREssQ0FDQTtTQUFLLGlCQUFlLG9CQUFmLENBQW9DLE9BQXBDO0VBQUwsQ0FEUCxDQUQ2QjtDQUF2Qjs7QUFLQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBdUIsU0FBdkIsRUFBaUM7QUFDcEMsb0JBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFEb0M7QUFFdkMsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxFQUNMLElBREssQ0FDQTtTQUFLLG1CQUFTLE1BQVQsQ0FBZ0IsSUFBSSxrQkFBSixtQkFBaEIsRUFBaUQsU0FBakQ7RUFBTCxDQURQLENBRnVDO0NBQWpDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHI9XCJcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcbiAgICB9O1xufVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXG5cbmV4cG9ydCB7bG9hZEZvbnR9IGZyb20gXCIuL2ZvbnRzXCJcbmltcG9ydCBDb250ZW50LCB7VGV4dH0gZnJvbSBcIi4vY29udGVudFwiXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXG5cbmltcG9ydCBTVkdXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9zdmdcIlxuaW1wb3J0IENhbnZhc1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL2NhbnZhc1wiXG5pbXBvcnQgTm9kZVdvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL25vZGVcIlxuXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vaW5wdXQvXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXQoaW5wdXQsY29udGFpbmVyKXtcblx0RWRpdG9yLlRleHQuV29yZFdyYXBwZXI9U1ZHV29yZFdyYXBwZXJcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcilcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChFZGl0b3IpLCBjb250YWluZXIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZShpbnB1dCl7XG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdGF0aWNNYXJrdXAoZWxlbWVudCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoQ29udGVudCksIGNvbnRhaW5lcikpXG59XG5cblxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcblx0bGV0IEE9Q29udGVudFxuICAgIC8vVGV4dC5Xb3JkV3JhcHBlcj1Ob2RlV29yZFdyYXBwZXJcblx0bG9hZEZvbnQoKS50aGVuKGZvbnRzPT5cblx0XHRSZWFjdERPTS5yZW5kZXIoKFxuXHRcdFx0PEEuRG9jdW1lbnQ+XG5cdFx0XHRcdDxBLlNlY3Rpb24+XG5cdFx0XHRcdFx0PEEuUGFyYWdyYXBoPlxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cdFx0XHRcdFx0XHQ8QS5JbWFnZSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH1cblx0XHRcdFx0XHRcdFx0c3JjPVwiaHR0cDovL24uc2luYWltZy5jbi9uZXdzL3RyYW5zZm9ybS8yMDE2MDYyOS9nYmYzLWZ4dG5pYXg4MjU1OTQ3LmpwZ1wiLz5cblxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEwMCkuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblx0XHRcdFx0XHQ8L0EuUGFyYWdyYXBoPlxuXHRcdFx0XHQ8L0EuU2VjdGlvbj5cblx0XHRcdDwvQS5Eb2N1bWVudD5cblx0XHQpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcblx0KVxufVxuKi9cbiJdfQ==