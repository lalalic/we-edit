"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
    _inherits(_class, _Model);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "visit",
        value: function visit() {
            this.children = this.wordModel.getText();
        }
    }, {
        key: "createReactElement",
        value: function createReactElement(namespace) {
            return _react2.default.createElement(namespace[this.type], this.props, this.children);
        }
    }]);

    return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FHVztBQUNILGlCQUFLLFFBQUwsR0FBYyxLQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQWQsQ0FERzs7OzsyQ0FJWSxXQUFVO0FBQ3pCLG1CQUFPLGdCQUFNLGFBQU4sQ0FDWixVQUFVLEtBQUssSUFBTCxDQURFLEVBRVosS0FBSyxLQUFMLEVBQ0EsS0FBSyxRQUFMLENBSEssQ0FEeUIiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XG4gICAgdmlzaXQoKXtcbiAgICAgICAgdGhpcy5jaGlsZHJlbj10aGlzLndvcmRNb2RlbC5nZXRUZXh0KClcbiAgICB9XG5cbiAgICBjcmVhdGVSZWFjdEVsZW1lbnQobmFtZXNwYWNlKXtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRuYW1lc3BhY2VbdGhpcy50eXBlXSxcblx0XHRcdHRoaXMucHJvcHMsXG5cdFx0XHR0aGlzLmNoaWxkcmVuKVxuICAgIH1cbn1cbiJdfQ==