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

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    '*': _any2.default,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztrQkFHZTtBQUNYLHNCQURXO0FBRVgsZ0NBRlc7QUFHWCw4QkFIVztBQUlYLGtDQUpXO0FBS1gsNEJBTFc7QUFNWCx3QkFOVztBQU9YLDBCQVBXO0FBUVgsMEJBUlc7QUFTWCwwQkFUVztBQVVkLHNCQVZjO0FBV2Qsd0JBWGMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL3BhcmFncmFwaFwiXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcbmltcG9ydCBGcmFtZSBmcm9tIFwiLi9mcmFtZVwiXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL3RhYmxlXCJcbmltcG9ydCBSb3cgZnJvbSBcIi4vcm93XCJcbmltcG9ydCBDZWxsIGZyb20gXCIuL2NlbGxcIlxuXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgICcqJzogQW55LFxuICAgIERvY3VtZW50LFxuICAgIFNlY3Rpb24sXG4gICAgUGFyYWdyYXBoLFxuICAgIElubGluZSxcbiAgICBUZXh0LFxuICAgIEZyYW1lLFxuICAgIEltYWdlLFxuICAgIFRhYmxlLFxuXHRSb3csXG5cdENlbGxcbn1cbiJdfQ==