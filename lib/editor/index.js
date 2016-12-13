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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvaW5kZXguanMiXSwibmFtZXMiOlsiQW55IiwiRG9jdW1lbnQiLCJTZWN0aW9uIiwiUGFyYWdyYXBoIiwiSW5saW5lIiwiVGV4dCIsIkZyYW1lIiwiSW1hZ2UiLCJUYWJsZSIsIlJvdyIsIkNlbGwiLCJMaXN0IiwiSGVhZGVyIiwiRm9vdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFHZTtBQUNkQSxRQUFLLHNDQURTO0FBRVhDLCtCQUZXO0FBR1hDLDZCQUhXO0FBSVhDLGlDQUpXO0FBS1hDLDJCQUxXO0FBTVhDLHVCQU5XO0FBT1hDLHlCQVBXO0FBUVhDLHlCQVJXO0FBU1hDLHlCQVRXO0FBVWRDLHFCQVZjO0FBV2RDLHVCQVhjO0FBWVhDLHVCQVpXO0FBYWRDLDJCQWJjO0FBY2RDO0FBZGMsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5pbXBvcnQgQW55IGZyb20gXCIuLi9jb250ZW50L2FueVwiXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL3BhcmFncmFwaFwiXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcbmltcG9ydCBGcmFtZSBmcm9tIFwiLi9mcmFtZVwiXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL3RhYmxlXCJcbmltcG9ydCBSb3cgZnJvbSBcIi4vcm93XCJcbmltcG9ydCBDZWxsIGZyb20gXCIuL2NlbGxcIlxuaW1wb3J0IExpc3QgZnJvbSBcIi4vbGlzdFwiXG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL2hlYWRlclwiXG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuL2Zvb3RlclwiXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRBbnk6IGVkaXRhYmxlKEFueSksXG4gICAgRG9jdW1lbnQsXG4gICAgU2VjdGlvbixcbiAgICBQYXJhZ3JhcGgsXG4gICAgSW5saW5lLFxuICAgIFRleHQsXG4gICAgRnJhbWUsXG4gICAgSW1hZ2UsXG4gICAgVGFibGUsXG5cdFJvdyxcblx0Q2VsbCxcbiAgICBMaXN0LFxuXHRIZWFkZXIsXG5cdEZvb3RlclxufSJdfQ==