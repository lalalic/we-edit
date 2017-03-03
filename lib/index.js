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
exports.create = create;

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

var _input = require("./input");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
				String.prototype.splice = function (start, delCount) {
								var newSubStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

								return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
				};
}

//Editor.Text.WordWrapper=CanvasWordWrapper

function edit(input, container) {
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

function create(container) {
				_reactDom2.default.unmountComponentAtNode(container);
				return _input2.default.create().then(function (doc) {
								return _reactDom2.default.render(doc, container);
				});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkRm9udCIsImVkaXQiLCJjb21wb3NlIiwicHJldmlldyIsImNyZWF0ZSIsIlN0cmluZyIsInByb3RvdHlwZSIsInNwbGljZSIsInN0YXJ0IiwiZGVsQ291bnQiLCJuZXdTdWJTdHIiLCJzbGljZSIsIk1hdGgiLCJhYnMiLCJpbnB1dCIsImNvbnRhaW5lciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJsb2FkIiwidGhlbiIsInJlbmRlciIsImRvYyIsIlRleHQiLCJXb3JkV3JhcHBlciIsInJlbmRlclRvU3RhdGljTWFya3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7c0JBVVFBLFE7OztRQVlRQyxJLEdBQUFBLEk7UUFNQUMsTyxHQUFBQSxPO1FBTUFDLE8sR0FBQUEsTztRQU1BQyxNLEdBQUFBLE07O0FBbENoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQWxCQSxJQUFJLENBQUNDLE9BQU9DLFNBQVAsQ0FBaUJDLE1BQXRCLEVBQThCO0FBQzFCRixXQUFPQyxTQUFQLENBQWlCQyxNQUFqQixHQUEwQixVQUFTQyxLQUFULEVBQWdCQyxRQUFoQixFQUF3QztBQUFBLFlBQWRDLFNBQWMsdUVBQUosRUFBSTs7QUFDOUQsZUFBTyxLQUFLQyxLQUFMLENBQVcsQ0FBWCxFQUFjSCxLQUFkLElBQXVCRSxTQUF2QixHQUFtQyxLQUFLQyxLQUFMLENBQVdILFFBQVFJLEtBQUtDLEdBQUwsQ0FBU0osUUFBVCxDQUFuQixDQUExQztBQUNILEtBRkQ7QUFHSDs7QUFnQkQ7O0FBRU8sU0FBU1IsSUFBVCxDQUFjYSxLQUFkLEVBQW9CQyxTQUFwQixFQUE4QjtBQUNwQyx1QkFBU0Msc0JBQVQsQ0FBZ0NELFNBQWhDO0FBQ0EsV0FBTyxnQkFBTUUsSUFBTixDQUFXSCxLQUFYLG9CQUNMSSxJQURLLENBQ0E7QUFBQSxlQUFLLG1CQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQkwsU0FBckIsQ0FBTDtBQUFBLEtBREEsQ0FBUDtBQUVBOztBQUVNLFNBQVNiLE9BQVQsQ0FBaUJZLEtBQWpCLEVBQXVCO0FBQzdCLHNCQUFRTyxJQUFSLENBQWFDLFdBQWI7QUFDQSxXQUFPLGdCQUFNTCxJQUFOLENBQVdILEtBQVgscUJBQ0xJLElBREssQ0FDQTtBQUFBLGVBQUssaUJBQWVLLG9CQUFmLENBQW9DSCxHQUFwQyxDQUFMO0FBQUEsS0FEQSxDQUFQO0FBRUE7O0FBRU0sU0FBU2pCLE9BQVQsQ0FBaUJXLEtBQWpCLEVBQXVCQyxTQUF2QixFQUFpQztBQUNwQyx1QkFBU0Msc0JBQVQsQ0FBZ0NELFNBQWhDO0FBQ0gsV0FBTyxnQkFBTUUsSUFBTixDQUFXSCxLQUFYLHFCQUNMSSxJQURLLENBQ0E7QUFBQSxlQUFLLG1CQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQkwsU0FBckIsQ0FBTDtBQUFBLEtBREEsQ0FBUDtBQUVBOztBQUVNLFNBQVNYLE1BQVQsQ0FBZ0JXLFNBQWhCLEVBQTBCO0FBQzdCLHVCQUFTQyxzQkFBVCxDQUFnQ0QsU0FBaEM7QUFDSCxXQUFPLGdCQUFNWCxNQUFOLEdBQ0NjLElBREQsQ0FDTTtBQUFBLGVBQUssbUJBQVNDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQW9CTCxTQUFwQixDQUFMO0FBQUEsS0FETixDQUFQO0FBRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uKHN0YXJ0LCBkZWxDb3VudCwgbmV3U3ViU3RyPVwiXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXHJcblxyXG5leHBvcnQge2xvYWRGb250fSBmcm9tIFwiLi9mb250c1wiXHJcbmltcG9ydCBDb250ZW50LCB7VGV4dH0gZnJvbSBcIi4vY29udGVudFwiXHJcbmltcG9ydCBFZGl0b3IgZnJvbSBcIi4vZWRpdG9yXCJcclxuXHJcbmltcG9ydCBTVkdXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9zdmdcIlxyXG5pbXBvcnQgQ2FudmFzV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvY2FudmFzXCJcclxuaW1wb3J0IE5vZGVXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9ub2RlXCJcclxuXHJcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9pbnB1dFwiXHJcblxyXG4vL0VkaXRvci5UZXh0LldvcmRXcmFwcGVyPUNhbnZhc1dvcmRXcmFwcGVyXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWRpdChpbnB1dCxjb250YWluZXIpe1xyXG5cdFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoY29udGFpbmVyKVxyXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0LCBFZGl0b3IpXHJcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MsIGNvbnRhaW5lcikpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlKGlucHV0KXtcclxuXHRDb250ZW50LlRleHQuV29yZFdyYXBwZXI9Tm9kZVdvcmRXcmFwcGVyXHJcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIENvbnRlbnQpXHJcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYykpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XHJcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcilcclxuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dCwgQ29udGVudClcclxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYywgY29udGFpbmVyKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpe1xyXG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXHJcblx0cmV0dXJuIElucHV0LmNyZWF0ZSgpXHJcbiAgICAgICAgLnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLGNvbnRhaW5lcikpXHJcbn1cclxuIl19