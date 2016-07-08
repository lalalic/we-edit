"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Document: _document2.default,
    Section: _section2.default,
    Paragraph: _paragraph2.default,
    Inline: _inline2.default,
    Text: _text2.default,
    Frame: _frame2.default,
    Image: _image2.default,
    Table: _table2.default,
    Row: _row2.default,
    Cell: _cell2.default
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFHZTtBQUNYLGdDQURXO0FBRVgsOEJBRlc7QUFHWCxrQ0FIVztBQUlYLDRCQUpXO0FBS1gsd0JBTFc7QUFNWCwwQkFOVztBQU9YLDBCQVBXO0FBUVgsMEJBUlc7QUFTZCxzQkFUYztBQVVkLHdCQVZjIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIlxuaW1wb3J0IFBhcmFncmFwaCBmcm9tIFwiLi9wYXJhZ3JhcGhcIlxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXG5pbXBvcnQgRnJhbWUgZnJvbSBcIi4vZnJhbWVcIlxuaW1wb3J0IEltYWdlIGZyb20gXCIuL2ltYWdlXCJcbmltcG9ydCBUYWJsZSBmcm9tIFwiLi90YWJsZVwiXG5pbXBvcnQgUm93IGZyb20gXCIuL3Jvd1wiXG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9jZWxsXCJcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgRG9jdW1lbnQsXG4gICAgU2VjdGlvbixcbiAgICBQYXJhZ3JhcGgsXG4gICAgSW5saW5lLFxuICAgIFRleHQsXG4gICAgRnJhbWUsXG4gICAgSW1hZ2UsXG4gICAgVGFibGUsXG5cdFJvdyxcblx0Q2VsbFxufVxuIl19