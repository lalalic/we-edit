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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBT0E7UUFNQTs7QUEzQmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsUUFBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUF3QztNQUFkLGtFQUFVLGtCQUFJOztBQUM5RCxTQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRHVEO0VBQXhDLENBREE7Q0FBOUI7O0FBb0JPLFNBQVMsSUFBVCxDQUFjLEtBQWQsRUFBb0IsU0FBcEIsRUFBOEI7QUFDcEMsa0JBQU8sSUFBUCxDQUFZLFdBQVosb0JBRG9DO0FBRWpDLG9CQUFTLHNCQUFULENBQWdDLFNBQWhDLEVBRmlDO0FBR3BDLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsb0JBQ0wsSUFESyxDQUNBO1NBQUssbUJBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQixTQUFyQjtFQUFMLENBRFAsQ0FIb0M7Q0FBOUI7O0FBT0EsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXVCO0FBQzdCLG1CQUFRLElBQVIsQ0FBYSxXQUFiLGtCQUQ2QjtBQUU3QixRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLHFCQUNMLElBREssQ0FDQTtTQUFLLGlCQUFlLG9CQUFmLENBQW9DLEdBQXBDO0VBQUwsQ0FEUCxDQUY2QjtDQUF2Qjs7QUFNQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBdUIsU0FBdkIsRUFBaUM7QUFDcEMsb0JBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFEb0M7QUFFdkMsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxxQkFDTCxJQURLLENBQ0E7U0FBSyxtQkFBUyxNQUFULENBQWdCLEdBQWhCLEVBQXFCLFNBQXJCO0VBQUwsQ0FEUCxDQUZ1QztDQUFqQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICghU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uKHN0YXJ0LCBkZWxDb3VudCwgbmV3U3ViU3RyPVwiXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuXG5leHBvcnQge2xvYWRGb250fSBmcm9tIFwiLi9mb250c1wiXG5pbXBvcnQgQ29udGVudCwge1RleHR9IGZyb20gXCIuL2NvbnRlbnRcIlxuaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9lZGl0b3JcIlxuXG5pbXBvcnQgU1ZHV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvc3ZnXCJcbmltcG9ydCBDYW52YXNXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9jYW52YXNcIlxuaW1wb3J0IE5vZGVXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9ub2RlXCJcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2lucHV0L1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0KGlucHV0LGNvbnRhaW5lcil7XG5cdEVkaXRvci5UZXh0LldvcmRXcmFwcGVyPUNhbnZhc1dvcmRXcmFwcGVyXG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0LCBFZGl0b3IpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLCBjb250YWluZXIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZShpbnB1dCl7XG5cdENvbnRlbnQuVGV4dC5Xb3JkV3JhcHBlcj1Ob2RlV29yZFdyYXBwZXJcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIENvbnRlbnQpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY01hcmt1cChkb2MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldmlldyhpbnB1dCxjb250YWluZXIpe1xuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoY29udGFpbmVyKVxuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dCwgQ29udGVudClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MsIGNvbnRhaW5lcikpXG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuXHRsZXQgQT1Db250ZW50XG4gICAgLy9UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXHRsb2FkRm9udCgpLnRoZW4oZm9udHM9PlxuXHRcdFJlYWN0RE9NLnJlbmRlcigoXG5cdFx0XHQ8QS5Eb2N1bWVudD5cblx0XHRcdFx0PEEuU2VjdGlvbj5cblx0XHRcdFx0XHQ8QS5QYXJhZ3JhcGg+XG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblx0XHRcdFx0XHRcdDxBLkltYWdlIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfVxuXHRcdFx0XHRcdFx0XHRzcmM9XCJodHRwOi8vbi5zaW5haW1nLmNuL25ld3MvdHJhbnNmb3JtLzIwMTYwNjI5L2diZjMtZnh0bmlheDgyNTU5NDcuanBnXCIvPlxuXG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMTAwKS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdDwvQS5QYXJhZ3JhcGg+XG5cdFx0XHRcdDwvQS5TZWN0aW9uPlxuXHRcdFx0PC9BLkRvY3VtZW50PlxuXHRcdCksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxuXHQpXG59XG4qL1xuIl19