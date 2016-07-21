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
        }
    }]);

    return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUlXO0FBQ0gsb0ZBREc7Z0JBRWlCLFFBQU8sS0FBcEIsYUFGSjs7O0FBSUgsa0JBQU0sS0FBTixHQUFZLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBWixDQUpHO0FBS0gsa0JBQU0sS0FBTixHQUFZLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBWixDQUxHIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWwgZnJvbSAnLi9hbnknXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XG4gICAgdmlzaXQoKXtcbiAgICAgICAgc3VwZXIudmlzaXQoKVxuICAgICAgICBjb25zdCB7Y29udGVudFByb3BzOnByb3BzfT10aGlzXG5cbiAgICAgICAgcHJvcHMubGV2ZWw9dGhpcy53b3JkTW9kZWwuZ2V0TGV2ZWwoKVxuICAgICAgICBwcm9wcy5udW1JZD10aGlzLndvcmRNb2RlbC5nZXROdW1iZXJpbmdJZCgpXG4gICAgfVxufVxuIl19