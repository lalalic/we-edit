"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _html = require("./html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * why it's slower than html
 */
var tester = null;

var SVGWordWrapper = function (_WordWrapper) {
  _inherits(SVGWordWrapper, _WordWrapper);

  function SVGWordWrapper() {
    _classCallCheck(this, SVGWordWrapper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SVGWordWrapper).apply(this, arguments));
  }

  _createClass(SVGWordWrapper, [{
    key: "lineHeight",
    value: function lineHeight() {
      if (!tester) {
        var container = document.createElement("div");
        container.style = "position:absolute;top:-1000";
        document.body.appendChild(container);
        var _window = window;
        var screenX = _window.screenX;
        var screenY = _window.screenY;

        container.innerHTML = "\n\t\t\t<svg width=\"" + screenX + "\" height=\"" + screenY + "\" viewBox=\"0 0 " + screenX + " " + screenY + "\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<text>*</text>\n\t\t\t</svg>\n\t\t\t";
        tester = container.querySelector('text');
      }
      tester.style = "white-space:pre;\n            font-family:" + this.fontFamily + ";\n            font-size:" + this.size + "px;\n            font-weight:" + (this.style.b ? "700" : "400") + ";\n            font-style:" + (this.style.i ? "italic" : "normal") + ";\n            ";
      return _get(Object.getPrototypeOf(SVGWordWrapper.prototype), "lineHeight", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsSUFBSSxTQUFPLElBQVA7O0lBQ2lCOzs7Ozs7Ozs7OztpQ0FDTDtBQUNkLFVBQUcsQ0FBQyxNQUFELEVBQVE7QUFDVixZQUFJLFlBQVUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVYsQ0FETTtBQUVWLGtCQUFVLEtBQVYsR0FBZ0IsNkJBQWhCLENBRlU7QUFHVixpQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixTQUExQixFQUhVO3NCQUllLE9BSmY7WUFJSCwwQkFKRztZQUlNLDBCQUpOOztBQUtWLGtCQUFVLFNBQVYsNkJBRWMsMkJBQW9CLGdDQUF5QixnQkFBVyxrR0FGdEUsQ0FMVTtBQVdWLGlCQUFPLFVBQVUsYUFBVixDQUF3QixNQUF4QixDQUFQLENBWFU7T0FBWDtBQWFBLGFBQU8sS0FBUCxrREFDd0IsS0FBSyxVQUFMLGlDQUNGLEtBQUssSUFBTCxzQ0FDRSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsS0FBZixHQUF1QixLQUF2QixvQ0FDRCxLQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsUUFBZixHQUEwQixRQUExQixxQkFKdkIsQ0FkYztBQW9CUix3Q0FyQmEseURBcUJiLENBcEJROzs7O2dDQXVCQSxNQUFLO0FBQ2IsYUFBTyxVQUFQLENBQWtCLElBQWxCLEdBQXVCLElBQXZCLENBRGE7QUFFYixhQUFPLE9BQU8scUJBQVAsR0FBK0IsS0FBL0IsQ0FGTTs7OztTQXhCQSIsImZpbGUiOiJzdmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29yZFdyYXBwZXIgZnJvbSBcIi4vaHRtbFwiXG5cbi8qKlxuICpcbiAqIHdoeSBpdCdzIHNsb3dlciB0aGFuIGh0bWxcbiAqL1xubGV0IHRlc3Rlcj1udWxsXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdXb3JkV3JhcHBlciBleHRlbmRzIFdvcmRXcmFwcGVye1xuICAgIGxpbmVIZWlnaHQoKXtcblx0XHRpZighdGVzdGVyKXtcblx0XHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0Y29udGFpbmVyLnN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMDAwXCJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXHRcdFx0Y29uc3Qge3NjcmVlblgsIHNjcmVlbll9PXdpbmRvd1xuXHRcdFx0Y29udGFpbmVyLmlubmVySFRNTD1cblx0XHRcdGBcblx0XHRcdDxzdmcgd2lkdGg9XCIke3NjcmVlblh9XCIgaGVpZ2h0PVwiJHtzY3JlZW5ZfVwiIHZpZXdCb3g9XCIwIDAgJHtzY3JlZW5YfSAke3NjcmVlbll9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHQ8dGV4dD4qPC90ZXh0PlxuXHRcdFx0PC9zdmc+XG5cdFx0XHRgXG5cdFx0XHR0ZXN0ZXI9Y29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3RleHQnKVxuXHRcdH1cblx0XHR0ZXN0ZXIuc3R5bGU9YHdoaXRlLXNwYWNlOnByZTtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZToke3RoaXMuc2l6ZX1weDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiR7dGhpcy5zdHlsZS5iID8gXCI3MDBcIiA6IFwiNDAwXCJ9O1xuICAgICAgICAgICAgZm9udC1zdHlsZToke3RoaXMuc3R5bGUuaSA/IFwiaXRhbGljXCIgOiBcIm5vcm1hbFwifTtcbiAgICAgICAgICAgIGBcbiAgICAgICAgcmV0dXJuIHN1cGVyLmxpbmVIZWlnaHQoKVxuICAgIH1cblxuICAgIHN0cmluZ1dpZHRoKHdvcmQpe1xuICAgICAgICB0ZXN0ZXIuZmlyc3RDaGlsZC5kYXRhPXdvcmRcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgIH1cbn1cbiJdfQ==