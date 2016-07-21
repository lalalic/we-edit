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
		return _reactDom2.default.render(doc.createReactElement(_editor2.default), container);
	});
}

function compose(input) {
	_content2.default.Text.WordWrapper = _node2.default;
	return _input2.default.load(input).then(function (doc) {
		return _server2.default.renderToStaticMarkup(doc.createReactElement(_content2.default));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBT0E7UUFNQTs7QUEzQmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBbEJBLElBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUI7QUFDMUIsUUFBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUF3QztNQUFkLGtFQUFVLGtCQUFJOztBQUM5RCxTQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxLQUFkLElBQXVCLFNBQXZCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFFBQVEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFSLENBQTlDLENBRHVEO0VBQXhDLENBREE7Q0FBOUI7O0FBb0JPLFNBQVMsSUFBVCxDQUFjLEtBQWQsRUFBb0IsU0FBcEIsRUFBOEI7QUFDcEMsa0JBQU8sSUFBUCxDQUFZLFdBQVosb0JBRG9DO0FBRWpDLG9CQUFTLHNCQUFULENBQWdDLFNBQWhDLEVBRmlDO0FBR3BDLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsb0JBQ0wsSUFESyxDQUNBO1NBQUssbUJBQVMsTUFBVCxDQUFnQixJQUFJLGtCQUFKLGtCQUFoQixFQUFnRCxTQUFoRDtFQUFMLENBRFAsQ0FIb0M7Q0FBOUI7O0FBT0EsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXVCO0FBQzdCLG1CQUFRLElBQVIsQ0FBYSxXQUFiLGtCQUQ2QjtBQUU3QixRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQ0wsSUFESyxDQUNBO1NBQUssaUJBQWUsb0JBQWYsQ0FBb0MsSUFBSSxrQkFBSixtQkFBcEM7RUFBTCxDQURQLENBRjZCO0NBQXZCOztBQU1BLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF1QixTQUF2QixFQUFpQztBQUNwQyxvQkFBUyxzQkFBVCxDQUFnQyxTQUFoQyxFQURvQztBQUV2QyxRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQ0wsSUFESyxDQUNBO1NBQUssbUJBQVMsTUFBVCxDQUFnQixJQUFJLGtCQUFKLG1CQUFoQixFQUFpRCxTQUFqRDtFQUFMLENBRFAsQ0FGdUM7Q0FBakMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cj1cIlwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIHN0YXJ0KSArIG5ld1N1YlN0ciArIHRoaXMuc2xpY2Uoc3RhcnQgKyBNYXRoLmFicyhkZWxDb3VudCkpO1xuICAgIH07XG59XG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCJcblxuZXhwb3J0IHtsb2FkRm9udH0gZnJvbSBcIi4vZm9udHNcIlxuaW1wb3J0IENvbnRlbnQsIHtUZXh0fSBmcm9tIFwiLi9jb250ZW50XCJcbmltcG9ydCBFZGl0b3IgZnJvbSBcIi4vZWRpdG9yXCJcblxuaW1wb3J0IFNWR1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL3N2Z1wiXG5pbXBvcnQgQ2FudmFzV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvY2FudmFzXCJcbmltcG9ydCBOb2RlV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvbm9kZVwiXG5cbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9pbnB1dC9cIlxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdChpbnB1dCxjb250YWluZXIpe1xuXHRFZGl0b3IuVGV4dC5Xb3JkV3JhcHBlcj1DYW52YXNXb3JkV3JhcHBlclxuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoY29udGFpbmVyKVxuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dCwgRWRpdG9yKVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoRWRpdG9yKSwgY29udGFpbmVyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2UoaW5wdXQpe1xuXHRDb250ZW50LlRleHQuV29yZFdyYXBwZXI9Tm9kZVdvcmRXcmFwcGVyXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdGF0aWNNYXJrdXAoZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChDb250ZW50KSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoQ29udGVudCksIGNvbnRhaW5lcikpXG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuXHRsZXQgQT1Db250ZW50XG4gICAgLy9UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXHRsb2FkRm9udCgpLnRoZW4oZm9udHM9PlxuXHRcdFJlYWN0RE9NLnJlbmRlcigoXG5cdFx0XHQ8QS5Eb2N1bWVudD5cblx0XHRcdFx0PEEuU2VjdGlvbj5cblx0XHRcdFx0XHQ8QS5QYXJhZ3JhcGg+XG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblx0XHRcdFx0XHRcdDxBLkltYWdlIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfVxuXHRcdFx0XHRcdFx0XHRzcmM9XCJodHRwOi8vbi5zaW5haW1nLmNuL25ld3MvdHJhbnNmb3JtLzIwMTYwNjI5L2diZjMtZnh0bmlheDgyNTU5NDcuanBnXCIvPlxuXG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMTAwKS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdDwvQS5QYXJhZ3JhcGg+XG5cdFx0XHRcdDwvQS5TZWN0aW9uPlxuXHRcdFx0PC9BLkRvY3VtZW50PlxuXHRcdCksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxuXHQpXG59XG4qL1xuIl19