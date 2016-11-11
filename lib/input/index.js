"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _docx = require("./docx");

var _docx2 = _interopRequireDefault(_docx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supported = [_docx2.default];
exports.default = {
	load: function load(data) {
		var Found = supported.find(function (TYPE) {
			return TYPE.support(data);
		});
		if (Found) {
			var _ref;

			return (_ref = new Found()).load.apply(_ref, arguments);
		} else {
			alert("we cannot edit this type of file");
		}
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9pbmRleC5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWQiLCJsb2FkIiwiZGF0YSIsIkZvdW5kIiwiZmluZCIsIlRZUEUiLCJzdXBwb3J0IiwiYXJndW1lbnRzIiwiYWxlcnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxZQUFVLGdCQUFkO2tCQUNlO0FBQ2RDLEtBRGMsZ0JBQ1RDLElBRFMsRUFDSjtBQUNULE1BQUlDLFFBQU1ILFVBQVVJLElBQVYsQ0FBZTtBQUFBLFVBQU1DLEtBQUtDLE9BQUwsQ0FBYUosSUFBYixDQUFOO0FBQUEsR0FBZixDQUFWO0FBQ0EsTUFBR0MsS0FBSCxFQUFTO0FBQUE7O0FBQ1IsVUFBTyxZQUFJQSxLQUFKLElBQVlGLElBQVosYUFBb0JNLFNBQXBCLENBQVA7QUFDQSxHQUZELE1BRUs7QUFDSkM7QUFDQTtBQUNEO0FBUmEsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4IGZyb20gXCIuL2RvY3hcIlxyXG5cclxubGV0IHN1cHBvcnRlZD1bZG9jeF1cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxvYWQoZGF0YSl7XHJcblx0XHRsZXQgRm91bmQ9c3VwcG9ydGVkLmZpbmQoVFlQRT0+VFlQRS5zdXBwb3J0KGRhdGEpKVxyXG5cdFx0aWYoRm91bmQpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IEZvdW5kKCkubG9hZCguLi5hcmd1bWVudHMpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0YWxlcnQoYHdlIGNhbm5vdCBlZGl0IHRoaXMgdHlwZSBvZiBmaWxlYClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19