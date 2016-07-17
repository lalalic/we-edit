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
	return _input2.default.load(input, _editor2.default).then(function (doc) {
		return _reactDom2.default.render(doc.createReactElement(_editor2.default), container);
	});
}

function compose(input) {
	_content2.default.Text.WordWrapper = _node2.default;
	return _input2.default.load(input, _content2.default).then(function (doc) {
		return _server2.default.renderToStaticMarkup(doc.createReactElement(_content2.default));
	});
}

function preview(input, container) {
	_reactDom2.default.unmountComponentAtNode(container);
	return _input2.default.load(input, _content2.default).then(function (doc) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBT0E7UUFNQTs7QUEzQmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsUUFBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUF3QztNQUFkLGtFQUFVLGtCQUFJOztBQUM5RCxTQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRHVEO0VBQXhDLENBREE7Q0FBOUI7O0FBb0JPLFNBQVMsSUFBVCxDQUFjLEtBQWQsRUFBb0IsU0FBcEIsRUFBOEI7QUFDcEMsa0JBQU8sSUFBUCxDQUFZLFdBQVosaUJBRG9DO0FBRWpDLG9CQUFTLHNCQUFULENBQWdDLFNBQWhDLEVBRmlDO0FBR3BDLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsb0JBQ0wsSUFESyxDQUNBO1NBQUssbUJBQVMsTUFBVCxDQUFnQixJQUFJLGtCQUFKLGtCQUFoQixFQUFnRCxTQUFoRDtFQUFMLENBRFAsQ0FIb0M7Q0FBOUI7O0FBT0EsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXVCO0FBQzdCLG1CQUFRLElBQVIsQ0FBYSxXQUFiLGtCQUQ2QjtBQUU3QixRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLHFCQUNMLElBREssQ0FDQTtTQUFLLGlCQUFlLG9CQUFmLENBQW9DLElBQUksa0JBQUosbUJBQXBDO0VBQUwsQ0FEUCxDQUY2QjtDQUF2Qjs7QUFNQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBdUIsU0FBdkIsRUFBaUM7QUFDcEMsb0JBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFEb0M7QUFFdkMsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxxQkFDTCxJQURLLENBQ0E7U0FBSyxtQkFBUyxNQUFULENBQWdCLElBQUksa0JBQUosbUJBQWhCLEVBQWlELFNBQWpEO0VBQUwsQ0FEUCxDQUZ1QztDQUFqQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICghU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uKHN0YXJ0LCBkZWxDb3VudCwgbmV3U3ViU3RyPVwiXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuXG5leHBvcnQge2xvYWRGb250fSBmcm9tIFwiLi9mb250c1wiXG5pbXBvcnQgQ29udGVudCwge1RleHR9IGZyb20gXCIuL2NvbnRlbnRcIlxuaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9lZGl0b3JcIlxuXG5pbXBvcnQgU1ZHV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvc3ZnXCJcbmltcG9ydCBDYW52YXNXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9jYW52YXNcIlxuaW1wb3J0IE5vZGVXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9ub2RlXCJcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2lucHV0L1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0KGlucHV0LGNvbnRhaW5lcil7XG5cdEVkaXRvci5UZXh0LldvcmRXcmFwcGVyPVNWR1dvcmRXcmFwcGVyXG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0LCBFZGl0b3IpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChFZGl0b3IpLCBjb250YWluZXIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZShpbnB1dCl7XG5cdENvbnRlbnQuVGV4dC5Xb3JkV3JhcHBlcj1Ob2RlV29yZFdyYXBwZXJcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIENvbnRlbnQpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY01hcmt1cChkb2MuY3JlYXRlUmVhY3RFbGVtZW50KENvbnRlbnQpKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpZXcoaW5wdXQsY29udGFpbmVyKXtcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcilcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIENvbnRlbnQpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChDb250ZW50KSwgY29udGFpbmVyKSlcbn1cblxuLypcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG5cdGxldCBBPUNvbnRlbnRcbiAgICAvL1RleHQuV29yZFdyYXBwZXI9Tm9kZVdvcmRXcmFwcGVyXG5cdGxvYWRGb250KCkudGhlbihmb250cz0+XG5cdFx0UmVhY3RET00ucmVuZGVyKChcblx0XHRcdDxBLkRvY3VtZW50PlxuXHRcdFx0XHQ8QS5TZWN0aW9uPlxuXHRcdFx0XHRcdDxBLlBhcmFncmFwaD5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdFx0PEEuSW1hZ2Ugd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9XG5cdFx0XHRcdFx0XHRcdHNyYz1cImh0dHA6Ly9uLnNpbmFpbWcuY24vbmV3cy90cmFuc2Zvcm0vMjAxNjA2MjkvZ2JmMy1meHRuaWF4ODI1NTk0Ny5qcGdcIi8+XG5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxMDApLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cdFx0XHRcdFx0PC9BLlBhcmFncmFwaD5cblx0XHRcdFx0PC9BLlNlY3Rpb24+XG5cdFx0XHQ8L0EuRG9jdW1lbnQ+XG5cdFx0KSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpXG5cdClcbn1cbiovXG4iXX0=