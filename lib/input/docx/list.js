"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

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
            _get(Object.getPrototypeOf(_class.prototype), "visit", this).call(this);
            var props = this.contentProps;


            props.level = this.wordModel.getLevel();
            props.numId = this.wordModel.getNumberingId();

            return;
            var visitor = new _style2.default(this.wordModel, this.doc);
            var style = this.wordModel.getNumberingStyle();
            style.parse([visitor]);
            props.listStyle = visitor.style;
        }
    }]);

    return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUlXO0FBQ0gsb0ZBREc7Z0JBRWlCLFFBQU8sS0FBcEIsYUFGSjs7O0FBSUgsa0JBQU0sS0FBTixHQUFZLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBWixDQUpHO0FBS0gsa0JBQU0sS0FBTixHQUFZLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBWixDQUxHOztBQU9ILG1CQVBHO0FBUUgsZ0JBQUksVUFBUSxvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQWxDLENBUkQ7QUFTSCxnQkFBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGlCQUFmLEVBQU4sQ0FURDtBQVVILGtCQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsQ0FBWixFQVZHO0FBV0gsa0JBQU0sU0FBTixHQUFnQixRQUFRLEtBQVIsQ0FYYiIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gJy4vYW55J1xuaW1wb3J0IFN0eWxlIGZyb20gXCIuL3N0eWxlXCJcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE1vZGVse1xuICAgIHZpc2l0KCl7XG4gICAgICAgIHN1cGVyLnZpc2l0KClcbiAgICAgICAgY29uc3Qge2NvbnRlbnRQcm9wczpwcm9wc309dGhpc1xuXG4gICAgICAgIHByb3BzLmxldmVsPXRoaXMud29yZE1vZGVsLmdldExldmVsKClcbiAgICAgICAgcHJvcHMubnVtSWQ9dGhpcy53b3JkTW9kZWwuZ2V0TnVtYmVyaW5nSWQoKVxuXG4gICAgICAgIHJldHVybiBcbiAgICAgICAgbGV0IHZpc2l0b3I9bmV3IFN0eWxlKHRoaXMud29yZE1vZGVsLCB0aGlzLmRvYylcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMud29yZE1vZGVsLmdldE51bWJlcmluZ1N0eWxlKClcbiAgICAgICAgc3R5bGUucGFyc2UoW3Zpc2l0b3JdKVxuICAgICAgICBwcm9wcy5saXN0U3R5bGU9dmlzaXRvci5zdHlsZVxuICAgIH1cbn1cbiJdfQ==