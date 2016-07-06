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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBS0E7UUFLQTs7QUF4QmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsUUFBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQixTQUExQixFQUFxQztBQUMzRCxTQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRG9EO0VBQXJDLENBREE7Q0FBOUI7O0FBb0JPLFNBQVMsSUFBVCxDQUFjLEtBQWQsRUFBb0IsU0FBcEIsRUFBOEI7QUFDcEMsUUFBTyxnQkFBTSxJQUFOLENBQVcsS0FBWCxFQUNMLElBREssQ0FDQTtTQUFLLG1CQUFTLE1BQVQsQ0FBZ0IsSUFBSSxrQkFBSixrQkFBaEIsRUFBZ0QsU0FBaEQ7RUFBTCxDQURQLENBRG9DO0NBQTlCOztBQUtBLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF1QjtBQUM3QixRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQ0wsSUFESyxDQUNBO1NBQUssaUJBQWUsb0JBQWYsQ0FBb0MsSUFBSSxrQkFBSixtQkFBcEM7RUFBTCxDQURQLENBRDZCO0NBQXZCOztBQUtBLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF1QixTQUF2QixFQUFpQztBQUN2QyxRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQ0wsSUFESyxDQUNBO1NBQUssbUJBQVMsTUFBVCxDQUFnQixJQUFJLGtCQUFKLG1CQUFoQixFQUFpRCxTQUFqRDtFQUFMLENBRFAsQ0FEdUM7Q0FBakMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cikge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcbiAgICB9O1xufVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXG5cbmV4cG9ydCB7bG9hZEZvbnR9IGZyb20gXCIuL2ZvbnRzXCJcbmltcG9ydCBDb250ZW50LCB7VGV4dH0gZnJvbSBcIi4vY29udGVudFwiXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiXG5cbmltcG9ydCBTVkdXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9zdmdcIlxuaW1wb3J0IENhbnZhc1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL2NhbnZhc1wiXG5pbXBvcnQgTm9kZVdvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL25vZGVcIlxuXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vaW5wdXQvXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXQoaW5wdXQsY29udGFpbmVyKXtcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQpXG5cdFx0LnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChFZGl0b3IpLCBjb250YWluZXIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZShpbnB1dCl7XG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdGF0aWNNYXJrdXAoZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChDb250ZW50KSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoQ29udGVudCksIGNvbnRhaW5lcikpXG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuXHRsZXQgQT1Db250ZW50XG4gICAgLy9UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXHRsb2FkRm9udCgpLnRoZW4oZm9udHM9PlxuXHRcdFJlYWN0RE9NLnJlbmRlcigoXG5cdFx0XHQ8QS5Eb2N1bWVudD5cblx0XHRcdFx0PEEuU2VjdGlvbj5cblx0XHRcdFx0XHQ8QS5QYXJhZ3JhcGg+XG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblx0XHRcdFx0XHRcdDxBLkltYWdlIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfVxuXHRcdFx0XHRcdFx0XHRzcmM9XCJodHRwOi8vbi5zaW5haW1nLmNuL25ld3MvdHJhbnNmb3JtLzIwMTYwNjI5L2diZjMtZnh0bmlheDgyNTU5NDcuanBnXCIvPlxuXG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMTAwKS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdDwvQS5QYXJhZ3JhcGg+XG5cdFx0XHRcdDwvQS5TZWN0aW9uPlxuXHRcdFx0PC9BLkRvY3VtZW50PlxuXHRcdCksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxuXHQpXG59XG4qL1xuIl19