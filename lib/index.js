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
	String.prototype.splice = function (start, delCount, newSubStr) {
		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};
}

function edit(input, container) {
	_editor2.default.Text.WordWrapper = _canvas2.default;
	return _input2.default.load(input).then(function (doc) {
		return _reactDom2.default.render(doc.createReactElement(_editor2.default), container);
	});
}

function compose(input) {
	return _input2.default.load(input).then(function (doc) {
		return _server2.default.renderToStaticMarkup(doc.createReactElement(_content2.default));
	});
}

function preview(input, container) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBTUE7UUFLQTs7QUF6QmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsUUFBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQixTQUExQixFQUFxQztBQUMzRCxTQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRG9EO0VBQXJDLENBREE7Q0FBOUI7O0FBb0JPLFNBQVMsSUFBVCxDQUFjLEtBQWQsRUFBb0IsU0FBcEIsRUFBOEI7QUFDcEMsa0JBQU8sSUFBUCxDQUFZLFdBQVosb0JBRG9DO0FBRXBDLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsRUFDTCxJQURLLENBQ0E7U0FBSyxtQkFBUyxNQUFULENBQWdCLElBQUksa0JBQUosa0JBQWhCLEVBQWdELFNBQWhEO0VBQUwsQ0FEUCxDQUZvQztDQUE5Qjs7QUFNQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBdUI7QUFDN0IsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxFQUNMLElBREssQ0FDQTtTQUFLLGlCQUFlLG9CQUFmLENBQW9DLElBQUksa0JBQUosbUJBQXBDO0VBQUwsQ0FEUCxDQUQ2QjtDQUF2Qjs7QUFLQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBdUIsU0FBdkIsRUFBaUM7QUFDdkMsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxFQUNMLElBREssQ0FDQTtTQUFLLG1CQUFTLE1BQVQsQ0FBZ0IsSUFBSSxrQkFBSixtQkFBaEIsRUFBaUQsU0FBakQ7RUFBTCxDQURQLENBRHVDO0NBQWpDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuXG5leHBvcnQge2xvYWRGb250fSBmcm9tIFwiLi9mb250c1wiXG5pbXBvcnQgQ29udGVudCwge1RleHR9IGZyb20gXCIuL2NvbnRlbnRcIlxuaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9lZGl0b3JcIlxuXG5pbXBvcnQgU1ZHV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvc3ZnXCJcbmltcG9ydCBDYW52YXNXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9jYW52YXNcIlxuaW1wb3J0IE5vZGVXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9ub2RlXCJcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2lucHV0L1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0KGlucHV0LGNvbnRhaW5lcil7XG5cdEVkaXRvci5UZXh0LldvcmRXcmFwcGVyPUNhbnZhc1dvcmRXcmFwcGVyXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoRWRpdG9yKSwgY29udGFpbmVyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2UoaW5wdXQpe1xuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoQ29udGVudCkpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldmlldyhpbnB1dCxjb250YWluZXIpe1xuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MuY3JlYXRlUmVhY3RFbGVtZW50KENvbnRlbnQpLCBjb250YWluZXIpKVxufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcblx0bGV0IEE9Q29udGVudFxuICAgIC8vVGV4dC5Xb3JkV3JhcHBlcj1Ob2RlV29yZFdyYXBwZXJcblx0bG9hZEZvbnQoKS50aGVuKGZvbnRzPT5cblx0XHRSZWFjdERPTS5yZW5kZXIoKFxuXHRcdFx0PEEuRG9jdW1lbnQ+XG5cdFx0XHRcdDxBLlNlY3Rpb24+XG5cdFx0XHRcdFx0PEEuUGFyYWdyYXBoPlxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cdFx0XHRcdFx0XHQ8QS5JbWFnZSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH1cblx0XHRcdFx0XHRcdFx0c3JjPVwiaHR0cDovL24uc2luYWltZy5jbi9uZXdzL3RyYW5zZm9ybS8yMDE2MDYyOS9nYmYzLWZ4dG5pYXg4MjU1OTQ3LmpwZ1wiLz5cblxuXHRcdFx0XHRcdFx0PEEuSW5saW5lPjxBLlRleHQ+e0FycmF5KDEwMCkuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblx0XHRcdFx0XHQ8L0EuUGFyYWdyYXBoPlxuXHRcdFx0XHQ8L0EuU2VjdGlvbj5cblx0XHRcdDwvQS5Eb2N1bWVudD5cblx0XHQpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcblx0KVxufVxuKi9cbiJdfQ==