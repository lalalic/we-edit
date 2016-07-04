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
exports.test = test;

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

function test() {
	var A = _content2.default;
	//Text.WordWrapper=NodeWordWrapper
	loadFont().then(function (fonts) {
		return _reactDom2.default.render(_react2.default.createElement(
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
							Array(1).fill("over").join(" ")
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
							Array(100).fill("hello1, let's edit").join(" ")
						)
					),
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
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0JBVVE7OztRQVVRO1FBS0E7UUFLQTtRQUtBOztBQTdCaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFsQkEsSUFBSSxDQUFDLE9BQU8sU0FBUCxDQUFpQixNQUFqQixFQUF5QjtBQUMxQixRQUFPLFNBQVAsQ0FBaUIsTUFBakIsR0FBMEIsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCLFNBQTFCLEVBQXFDO0FBQzNELFNBQU8sS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLEtBQWQsSUFBdUIsU0FBdkIsR0FBbUMsS0FBSyxLQUFMLENBQVcsUUFBUSxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQVIsQ0FBOUMsQ0FEb0Q7RUFBckMsQ0FEQTtDQUE5Qjs7QUFvQk8sU0FBUyxJQUFULENBQWMsS0FBZCxFQUFvQixTQUFwQixFQUE4QjtBQUNwQyxRQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQ0wsSUFESyxDQUNBO1NBQUssbUJBQVMsTUFBVCxDQUFnQixJQUFJLGtCQUFKLGtCQUFoQixFQUFnRCxTQUFoRDtFQUFMLENBRFAsQ0FEb0M7Q0FBOUI7O0FBS0EsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXVCO0FBQzdCLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsRUFDTCxJQURLLENBQ0E7U0FBSyxpQkFBZSxvQkFBZixDQUFvQyxJQUFJLGtCQUFKLG1CQUFwQztFQUFMLENBRFAsQ0FENkI7Q0FBdkI7O0FBS0EsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXVCLFNBQXZCLEVBQWlDO0FBQ3ZDLFFBQU8sZ0JBQU0sSUFBTixDQUFXLEtBQVgsRUFDTCxJQURLLENBQ0E7U0FBSyxtQkFBUyxNQUFULENBQWdCLElBQUksa0JBQUosbUJBQWhCLEVBQWlELFNBQWpEO0VBQUwsQ0FEUCxDQUR1QztDQUFqQzs7QUFLQSxTQUFTLElBQVQsR0FBZTtBQUNyQixLQUFJLHFCQUFKOztBQURxQixTQUdyQixHQUFXLElBQVgsQ0FBZ0I7U0FDZixtQkFBUyxNQUFULENBQ0M7QUFBQyxLQUFFLFFBQUg7O0dBQ0M7QUFBQyxNQUFFLE9BQUg7O0lBQ0M7QUFBQyxPQUFFLFNBQUg7O0tBQ0M7QUFBQyxRQUFFLE1BQUg7O01BQVU7QUFBQyxTQUFFLElBQUg7O09BQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsQ0FBMkIsR0FBM0IsQ0FBVDtPQUFWO01BREQ7S0FFQyw4QkFBQyxFQUFFLEtBQUgsSUFBUyxPQUFPLEdBQVAsRUFBWSxRQUFRLEdBQVI7QUFDcEIsV0FBSSxxRUFBSixFQURELENBRkQ7S0FLQztBQUFDLFFBQUUsTUFBSDs7TUFBVTtBQUFDLFNBQUUsSUFBSDs7T0FBUyxNQUFNLEdBQU4sRUFBVyxJQUFYLENBQWdCLG9CQUFoQixFQUFzQyxJQUF0QyxDQUEyQyxHQUEzQyxDQUFUO09BQVY7TUFMRDtLQU9DO0FBQUMsUUFBRSxNQUFIOztNQUFVO0FBQUMsU0FBRSxJQUFIOztPQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLElBQXRCLENBQTJCLEdBQTNCLENBQVQ7T0FBVjtNQVBEO0tBREQ7SUFERDtHQURELEVBY0UsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBZEY7RUFEZSxDQUFoQixDQUhxQjtDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuXG5leHBvcnQge2xvYWRGb250fSBmcm9tIFwiLi9mb250c1wiXG5pbXBvcnQgQ29udGVudCwge1RleHR9IGZyb20gXCIuL2NvbnRlbnRcIlxuaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9lZGl0b3JcIlxuXG5pbXBvcnQgU1ZHV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvc3ZnXCJcbmltcG9ydCBDYW52YXNXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9jYW52YXNcIlxuaW1wb3J0IE5vZGVXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9ub2RlXCJcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2lucHV0L1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0KGlucHV0LGNvbnRhaW5lcil7XG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoRWRpdG9yKSwgY29udGFpbmVyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2UoaW5wdXQpe1xuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoQ29udGVudCkpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldmlldyhpbnB1dCxjb250YWluZXIpe1xuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MuY3JlYXRlUmVhY3RFbGVtZW50KENvbnRlbnQpLCBjb250YWluZXIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuXHRsZXQgQT1Db250ZW50XG4gICAgLy9UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXHRsb2FkRm9udCgpLnRoZW4oZm9udHM9PlxuXHRcdFJlYWN0RE9NLnJlbmRlcigoXG5cdFx0XHQ8QS5Eb2N1bWVudD5cblx0XHRcdFx0PEEuU2VjdGlvbj5cblx0XHRcdFx0XHQ8QS5QYXJhZ3JhcGg+XG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9BLlRleHQ+PC9BLklubGluZT5cblx0XHRcdFx0XHRcdDxBLkltYWdlIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfVxuXHRcdFx0XHRcdFx0XHRzcmM9XCJodHRwOi8vbi5zaW5haW1nLmNuL25ld3MvdHJhbnNmb3JtLzIwMTYwNjI5L2diZjMtZnh0bmlheDgyNTU5NDcuanBnXCIvPlxuXG5cdFx0XHRcdFx0XHQ8QS5JbmxpbmU+PEEuVGV4dD57QXJyYXkoMTAwKS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvQS5UZXh0PjwvQS5JbmxpbmU+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxBLklubGluZT48QS5UZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L0EuVGV4dD48L0EuSW5saW5lPlxuXHRcdFx0XHRcdDwvQS5QYXJhZ3JhcGg+XG5cdFx0XHRcdDwvQS5TZWN0aW9uPlxuXHRcdFx0PC9BLkRvY3VtZW50PlxuXHRcdCksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxuXHQpXG59XG4iXX0=