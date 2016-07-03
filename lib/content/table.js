"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _container = require("./container");

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Container) {
    _inherits(Table, _Container);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
    }

    _createClass(Table, [{
        key: "compose",
        value: function compose() {}
    }], [{
        key: "Tr",
        get: function get() {
            return function (_Container2) {
                _inherits(_class, _Container2);

                function _class() {
                    _classCallCheck(this, _class);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
                }

                _createClass(_class, [{
                    key: "compose",
                    value: function compose() {}
                }]);

                return _class;
            }(_container2.default);
        }
    }, {
        key: "Td",
        get: function get() {
            return function (_Container3) {
                _inherits(_class2, _Container3);

                function _class2() {
                    _classCallCheck(this, _class2);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
                }

                _createClass(_class2, [{
                    key: "compose",
                    value: function compose() {}
                }]);

                return _class2;
            }(_container2.default);
        }
    }]);

    return Table;
}(_container2.default);

exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztrQ0FDUjs7OzRCQUtNO0FBQ1g7Ozs7Ozs7Ozs7OzhDQUNhOzs7O2tDQURiLENBRFc7Ozs7NEJBUUE7QUFDWDs7Ozs7Ozs7Ozs7OENBQ2E7Ozs7a0NBRGIsQ0FEVzs7OztXQWRFIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgQ29udGFpbmVye1xuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2V0IFRyKCl7XG4gICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIENvbnRhaW5lcntcbiAgICAgICAgICAgIGNvbXBvc2UoKXtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBUZCgpe1xuICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250YWluZXJ7XG4gICAgICAgICAgICBjb21wb3NlKCl7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==