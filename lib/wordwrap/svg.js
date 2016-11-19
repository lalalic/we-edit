"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _html = require("./html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * why it's slower than html
 */
var tester = null;

var SVGWordWrapper = function (_WordWrapper) {
  (0, _inherits3.default)(SVGWordWrapper, _WordWrapper);

  function SVGWordWrapper() {
    (0, _classCallCheck3.default)(this, SVGWordWrapper);
    return (0, _possibleConstructorReturn3.default)(this, (SVGWordWrapper.__proto__ || (0, _getPrototypeOf2.default)(SVGWordWrapper)).apply(this, arguments));
  }

  (0, _createClass3.default)(SVGWordWrapper, [{
    key: "lineHeight",
    value: function lineHeight() {
      if (!tester) {
        var container = document.createElement("div");
        container.style = "position:absolute;top:-1000";
        document.body.appendChild(container);
        var _window = window,
            screenX = _window.screenX,
            screenY = _window.screenY;

        container.innerHTML = "\n\t\t\t<svg width=\"" + screenX + "\" height=\"" + screenY + "\" viewBox=\"0 0 " + screenX + " " + screenY + "\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<text>*</text>\n\t\t\t</svg>\n\t\t\t";
        tester = container.querySelector('text');
      }
      tester.style = "white-space:pre;\n            font-family:" + this.fontFamily + ";\n            font-size:" + this.size + "px;\n            font-weight:" + (this.style.b ? "700" : "400") + ";\n            font-style:" + (this.style.i ? "italic" : "normal") + ";\n            ";
      return (0, _get3.default)(SVGWordWrapper.prototype.__proto__ || (0, _getPrototypeOf2.default)(SVGWordWrapper.prototype), "lineHeight", this).call(this);
    }
  }, {
    key: "stringWidth",
    value: function stringWidth(word) {
      tester.firstChild.data = word;
      return tester.getBoundingClientRect().width;
    }
  }]);
  return SVGWordWrapper;
}(_html2.default);

exports.default = SVGWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOlsidGVzdGVyIiwiU1ZHV29yZFdyYXBwZXIiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsInNjcmVlblgiLCJzY3JlZW5ZIiwiaW5uZXJIVE1MIiwicXVlcnlTZWxlY3RvciIsImZvbnRGYW1pbHkiLCJzaXplIiwiYiIsImkiLCJ3b3JkIiwiZmlyc3RDaGlsZCIsImRhdGEiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7O0FBSUEsSUFBSUEsU0FBTyxJQUFYOztJQUNxQkMsYzs7Ozs7Ozs7OztpQ0FDTDtBQUNkLFVBQUcsQ0FBQ0QsTUFBSixFQUFXO0FBQ1YsWUFBSUUsWUFBVUMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0FGLGtCQUFVRyxLQUFWLEdBQWdCLDZCQUFoQjtBQUNBRixpQkFBU0csSUFBVCxDQUFjQyxXQUFkLENBQTBCTCxTQUExQjtBQUhVLHNCQUllTSxNQUpmO0FBQUEsWUFJSEMsT0FKRyxXQUlIQSxPQUpHO0FBQUEsWUFJTUMsT0FKTixXQUlNQSxPQUpOOztBQUtWUixrQkFBVVMsU0FBViw2QkFFY0YsT0FGZCxvQkFFa0NDLE9BRmxDLHlCQUUyREQsT0FGM0QsU0FFc0VDLE9BRnRFO0FBTUFWLGlCQUFPRSxVQUFVVSxhQUFWLENBQXdCLE1BQXhCLENBQVA7QUFDQTtBQUNEWixhQUFPSyxLQUFQLGtEQUN3QixLQUFLUSxVQUQ3QixpQ0FFc0IsS0FBS0MsSUFGM0Isc0NBR3dCLEtBQUtULEtBQUwsQ0FBV1UsQ0FBWCxHQUFlLEtBQWYsR0FBdUIsS0FIL0Msb0NBSXVCLEtBQUtWLEtBQUwsQ0FBV1csQ0FBWCxHQUFlLFFBQWYsR0FBMEIsUUFKakQ7QUFNTTtBQUNIOzs7Z0NBRVdDLEksRUFBSztBQUNiakIsYUFBT2tCLFVBQVAsQ0FBa0JDLElBQWxCLEdBQXVCRixJQUF2QjtBQUNBLGFBQU9qQixPQUFPb0IscUJBQVAsR0FBK0JDLEtBQXRDO0FBQ0g7Ozs7O2tCQTNCZ0JwQixjIiwiZmlsZSI6InN2Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLi9odG1sXCJcblxuLyoqXG4gKlxuICogd2h5IGl0J3Mgc2xvd2VyIHRoYW4gaHRtbFxuICovXG5sZXQgdGVzdGVyPW51bGxcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWR1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XG4gICAgbGluZUhlaWdodCgpe1xuXHRcdGlmKCF0ZXN0ZXIpe1xuXHRcdFx0bGV0IGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHRjb250YWluZXIuc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwMDBcIlxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cdFx0XHRjb25zdCB7c2NyZWVuWCwgc2NyZWVuWX09d2luZG93XG5cdFx0XHRjb250YWluZXIuaW5uZXJIVE1MPVxuXHRcdFx0YFxuXHRcdFx0PHN2ZyB3aWR0aD1cIiR7c2NyZWVuWH1cIiBoZWlnaHQ9XCIke3NjcmVlbll9XCIgdmlld0JveD1cIjAgMCAke3NjcmVlblh9ICR7c2NyZWVuWX1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdDx0ZXh0Pio8L3RleHQ+XG5cdFx0XHQ8L3N2Zz5cblx0XHRcdGBcblx0XHRcdHRlc3Rlcj1jb250YWluZXIucXVlcnlTZWxlY3RvcigndGV4dCcpXG5cdFx0fVxuXHRcdHRlc3Rlci5zdHlsZT1gd2hpdGUtc3BhY2U6cHJlO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6JHt0aGlzLmZvbnRGYW1pbHl9O1xuICAgICAgICAgICAgZm9udC1zaXplOiR7dGhpcy5zaXplfXB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6JHt0aGlzLnN0eWxlLmIgPyBcIjcwMFwiIDogXCI0MDBcIn07XG4gICAgICAgICAgICBmb250LXN0eWxlOiR7dGhpcy5zdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCJ9O1xuICAgICAgICAgICAgYFxuICAgICAgICByZXR1cm4gc3VwZXIubGluZUhlaWdodCgpXG4gICAgfVxuXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XG4gICAgICAgIHRlc3Rlci5maXJzdENoaWxkLmRhdGE9d29yZFxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgfVxufVxuIl19