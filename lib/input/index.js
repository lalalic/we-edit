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
			return new Found().load(data);
		} else {
			alert("we cannot edit this type of file");
		}
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBSSxZQUFVLGdCQUFWO2tCQUNXO0FBQ2QscUJBQUssTUFBSztBQUNULE1BQUksUUFBTSxVQUFVLElBQVYsQ0FBZTtVQUFNLEtBQUssT0FBTCxDQUFhLElBQWI7R0FBTixDQUFyQixDQURLO0FBRVQsTUFBRyxLQUFILEVBQVM7QUFDUixVQUFPLElBQUksS0FBSixHQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBUCxDQURRO0dBQVQsTUFFSztBQUNKLDZDQURJO0dBRkw7RUFIYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4IGZyb20gXCIuL2RvY3hcIlxyXG5cclxubGV0IHN1cHBvcnRlZD1bZG9jeF1cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxvYWQoZGF0YSl7XHJcblx0XHRsZXQgRm91bmQ9c3VwcG9ydGVkLmZpbmQoVFlQRT0+VFlQRS5zdXBwb3J0KGRhdGEpKVxyXG5cdFx0aWYoRm91bmQpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IEZvdW5kKCkubG9hZChkYXRhKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGFsZXJ0KGB3ZSBjYW5ub3QgZWRpdCB0aGlzIHR5cGUgb2YgZmlsZWApXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==