"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _any = require("../content/any");

var _any2 = _interopRequireDefault(_any);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _section = require("./section");

var _section2 = _interopRequireDefault(_section);

var _paragraph = require("./paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _frame = require("./frame");

var _frame2 = _interopRequireDefault(_frame);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

var _row = require("./row");

var _row2 = _interopRequireDefault(_row);

var _cell = require("./cell");

var _cell2 = _interopRequireDefault(_cell);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
   Any: (0, _editable2.default)(_any2.default),
   Document: _document2.default,
   Section: _section2.default,
   Paragraph: _paragraph2.default,
   Inline: _inline2.default,
   Text: _text2.default,
   Frame: _frame2.default,
   Image: _image2.default,
   Table: _table2.default,
   Row: _row2.default,
   Cell: _cell2.default,
   List: _list2.default
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFHZTtBQUNkLFFBQUssc0NBQUw7QUFDRywrQkFGVztBQUdYLDZCQUhXO0FBSVgsaUNBSlc7QUFLWCwyQkFMVztBQU1YLHVCQU5XO0FBT1gseUJBUFc7QUFRWCx5QkFSVztBQVNYLHlCQVRXO0FBVWQscUJBVmM7QUFXZCx1QkFYYztBQVlYLHVCQVpXIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcbmltcG9ydCBBbnkgZnJvbSBcIi4uL2NvbnRlbnQvYW55XCJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCJcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSBcIi4vcGFyYWdyYXBoXCJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxuaW1wb3J0IEZyYW1lIGZyb20gXCIuL2ZyYW1lXCJcbmltcG9ydCBJbWFnZSBmcm9tIFwiLi9pbWFnZVwiXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vdGFibGVcIlxuaW1wb3J0IFJvdyBmcm9tIFwiLi9yb3dcIlxuaW1wb3J0IENlbGwgZnJvbSBcIi4vY2VsbFwiXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9saXN0XCJcblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdEFueTogZWRpdGFibGUoQW55KSxcbiAgICBEb2N1bWVudCxcbiAgICBTZWN0aW9uLFxuICAgIFBhcmFncmFwaCxcbiAgICBJbmxpbmUsXG4gICAgVGV4dCxcbiAgICBGcmFtZSxcbiAgICBJbWFnZSxcbiAgICBUYWJsZSxcblx0Um93LFxuXHRDZWxsLFxuICAgIExpc3Rcbn1cbiJdfQ==