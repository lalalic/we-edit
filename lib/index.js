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

var _input = require("./input/");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
				String.prototype.splice = function (start, delCount) {
								var newSubStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

								return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
				};
}

_editor2.default.Text.WordWrapper = _canvas2.default;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkRm9udCIsImVkaXQiLCJjb21wb3NlIiwicHJldmlldyIsImNyZWF0ZSIsIlN0cmluZyIsInByb3RvdHlwZSIsInNwbGljZSIsInN0YXJ0IiwiZGVsQ291bnQiLCJuZXdTdWJTdHIiLCJzbGljZSIsIk1hdGgiLCJhYnMiLCJUZXh0IiwiV29yZFdyYXBwZXIiLCJpbnB1dCIsImNvbnRhaW5lciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJsb2FkIiwidGhlbiIsInJlbmRlciIsImRvYyIsInJlbmRlclRvU3RhdGljTWFya3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7c0JBVVFBLFE7OztRQVlRQyxJLEdBQUFBLEk7UUFNQUMsTyxHQUFBQSxPO1FBTUFDLE8sR0FBQUEsTztRQU1BQyxNLEdBQUFBLE07O0FBbENoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQWxCQSxJQUFJLENBQUNDLE9BQU9DLFNBQVAsQ0FBaUJDLE1BQXRCLEVBQThCO0FBQzFCRixXQUFPQyxTQUFQLENBQWlCQyxNQUFqQixHQUEwQixVQUFTQyxLQUFULEVBQWdCQyxRQUFoQixFQUF3QztBQUFBLFlBQWRDLFNBQWMsdUVBQUosRUFBSTs7QUFDOUQsZUFBTyxLQUFLQyxLQUFMLENBQVcsQ0FBWCxFQUFjSCxLQUFkLElBQXVCRSxTQUF2QixHQUFtQyxLQUFLQyxLQUFMLENBQVdILFFBQVFJLEtBQUtDLEdBQUwsQ0FBU0osUUFBVCxDQUFuQixDQUExQztBQUNILEtBRkQ7QUFHSDs7QUFnQkQsaUJBQU9LLElBQVAsQ0FBWUMsV0FBWjs7QUFFTyxTQUFTZCxJQUFULENBQWNlLEtBQWQsRUFBb0JDLFNBQXBCLEVBQThCO0FBQ3BDLHVCQUFTQyxzQkFBVCxDQUFnQ0QsU0FBaEM7QUFDQSxXQUFPLGdCQUFNRSxJQUFOLENBQVdILEtBQVgsb0JBQ0xJLElBREssQ0FDQTtBQUFBLGVBQUssbUJBQVNDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCTCxTQUFyQixDQUFMO0FBQUEsS0FEQSxDQUFQO0FBRUE7O0FBRU0sU0FBU2YsT0FBVCxDQUFpQmMsS0FBakIsRUFBdUI7QUFDN0Isc0JBQVFGLElBQVIsQ0FBYUMsV0FBYjtBQUNBLFdBQU8sZ0JBQU1JLElBQU4sQ0FBV0gsS0FBWCxxQkFDTEksSUFESyxDQUNBO0FBQUEsZUFBSyxpQkFBZUcsb0JBQWYsQ0FBb0NELEdBQXBDLENBQUw7QUFBQSxLQURBLENBQVA7QUFFQTs7QUFFTSxTQUFTbkIsT0FBVCxDQUFpQmEsS0FBakIsRUFBdUJDLFNBQXZCLEVBQWlDO0FBQ3BDLHVCQUFTQyxzQkFBVCxDQUFnQ0QsU0FBaEM7QUFDSCxXQUFPLGdCQUFNRSxJQUFOLENBQVdILEtBQVgscUJBQ0xJLElBREssQ0FDQTtBQUFBLGVBQUssbUJBQVNDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCTCxTQUFyQixDQUFMO0FBQUEsS0FEQSxDQUFQO0FBRUE7O0FBRU0sU0FBU2IsTUFBVCxDQUFnQmEsU0FBaEIsRUFBMEI7QUFDN0IsdUJBQVNDLHNCQUFULENBQWdDRCxTQUFoQztBQUNILFdBQU8sZ0JBQU1iLE1BQU4sR0FDQ2dCLElBREQsQ0FDTTtBQUFBLGVBQUssbUJBQVNDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQW9CTCxTQUFwQixDQUFMO0FBQUEsS0FETixDQUFQO0FBRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cj1cIlwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIHN0YXJ0KSArIG5ld1N1YlN0ciArIHRoaXMuc2xpY2Uoc3RhcnQgKyBNYXRoLmFicyhkZWxDb3VudCkpO1xuICAgIH07XG59XG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCJcblxuZXhwb3J0IHtsb2FkRm9udH0gZnJvbSBcIi4vZm9udHNcIlxuaW1wb3J0IENvbnRlbnQsIHtUZXh0fSBmcm9tIFwiLi9jb250ZW50XCJcbmltcG9ydCBFZGl0b3IgZnJvbSBcIi4vZWRpdG9yXCJcblxuaW1wb3J0IFNWR1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL3N2Z1wiXG5pbXBvcnQgQ2FudmFzV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvY2FudmFzXCJcbmltcG9ydCBOb2RlV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvbm9kZVwiXG5cbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9pbnB1dC9cIlxuXG5FZGl0b3IuVGV4dC5Xb3JkV3JhcHBlcj1DYW52YXNXb3JkV3JhcHBlclxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdChpbnB1dCxjb250YWluZXIpe1xuXHRSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcilcblx0cmV0dXJuIElucHV0LmxvYWQoaW5wdXQsIEVkaXRvcilcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NLnJlbmRlcihkb2MsIGNvbnRhaW5lcikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlKGlucHV0KXtcblx0Q29udGVudC5UZXh0LldvcmRXcmFwcGVyPU5vZGVXb3JkV3JhcHBlclxuXHRyZXR1cm4gSW5wdXQubG9hZChpbnB1dCwgQ29udGVudClcblx0XHQudGhlbihkb2M9PlJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aWV3KGlucHV0LGNvbnRhaW5lcil7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpXG5cdHJldHVybiBJbnB1dC5sb2FkKGlucHV0LCBDb250ZW50KVxuXHRcdC50aGVuKGRvYz0+UmVhY3RET00ucmVuZGVyKGRvYywgY29udGFpbmVyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpe1xuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoY29udGFpbmVyKVxuXHRyZXR1cm4gSW5wdXQuY3JlYXRlKClcbiAgICAgICAgLnRoZW4oZG9jPT5SZWFjdERPTS5yZW5kZXIoZG9jLGNvbnRhaW5lcikpXG59XG4iXX0=