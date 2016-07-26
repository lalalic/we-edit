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

var _header = require("./header");

var _header2 = _interopRequireDefault(_header);

var _footer = require("./footer");

var _footer2 = _interopRequireDefault(_footer);

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
   List: _list2.default,
   Header: _header2.default,
   Footer: _footer2.default
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBR2U7QUFDZCxRQUFLLHNDQUFMO0FBQ0csK0JBRlc7QUFHWCw2QkFIVztBQUlYLGlDQUpXO0FBS1gsMkJBTFc7QUFNWCx1QkFOVztBQU9YLHlCQVBXO0FBUVgseUJBUlc7QUFTWCx5QkFUVztBQVVkLHFCQVZjO0FBV2QsdUJBWGM7QUFZWCx1QkFaVztBQWFkLDJCQWJjO0FBY2QsMkJBZGMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi4vY29udGVudC9hbnlcIlxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIlxuaW1wb3J0IFBhcmFncmFwaCBmcm9tIFwiLi9wYXJhZ3JhcGhcIlxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXG5pbXBvcnQgRnJhbWUgZnJvbSBcIi4vZnJhbWVcIlxuaW1wb3J0IEltYWdlIGZyb20gXCIuL2ltYWdlXCJcbmltcG9ydCBUYWJsZSBmcm9tIFwiLi90YWJsZVwiXG5pbXBvcnQgUm93IGZyb20gXCIuL3Jvd1wiXG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9jZWxsXCJcbmltcG9ydCBMaXN0IGZyb20gXCIuL2xpc3RcIlxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9oZWFkZXJcIlxuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi9mb290ZXJcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0QW55OiBlZGl0YWJsZShBbnkpLFxuICAgIERvY3VtZW50LFxuICAgIFNlY3Rpb24sXG4gICAgUGFyYWdyYXBoLFxuICAgIElubGluZSxcbiAgICBUZXh0LFxuICAgIEZyYW1lLFxuICAgIEltYWdlLFxuICAgIFRhYmxlLFxuXHRSb3csXG5cdENlbGwsXG4gICAgTGlzdCxcblx0SGVhZGVyLFxuXHRGb290ZXJcbn1cbiJdfQ==