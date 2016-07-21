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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBSSxZQUFVLGdCQUFWO2tCQUNXO0FBQ2QscUJBQUssTUFBSztBQUNULE1BQUksUUFBTSxVQUFVLElBQVYsQ0FBZTtVQUFNLEtBQUssT0FBTCxDQUFhLElBQWI7R0FBTixDQUFyQixDQURLO0FBRVQsTUFBRyxLQUFILEVBQVM7OztBQUNSLFVBQU8sWUFBSSxLQUFKLElBQVksSUFBWixhQUFvQixTQUFwQixDQUFQLENBRFE7R0FBVCxNQUVLO0FBQ0osNkNBREk7R0FGTDtFQUhhIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3ggZnJvbSBcIi4vZG9jeFwiXHJcblxyXG5sZXQgc3VwcG9ydGVkPVtkb2N4XVxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0bG9hZChkYXRhKXtcclxuXHRcdGxldCBGb3VuZD1zdXBwb3J0ZWQuZmluZChUWVBFPT5UWVBFLnN1cHBvcnQoZGF0YSkpXHJcblx0XHRpZihGb3VuZCl7XHJcblx0XHRcdHJldHVybiBuZXcgRm91bmQoKS5sb2FkKC4uLmFyZ3VtZW50cylcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRhbGVydChgd2UgY2Fubm90IGVkaXQgdGhpcyB0eXBlIG9mIGZpbGVgKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=