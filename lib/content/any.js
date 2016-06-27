"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HasChild = exports.HasChild = function (_Component) {
    _inherits(HasChild, _Component);

    function HasChild() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, HasChild);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._finished = 0, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(HasChild, [{
        key: "getChildContext",
        value: function getChildContext() {
            return {
                parent: this
            };
        }

        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */

    }, {
        key: "nextAvailableSpace",
        value: function nextAvailableSpace() {}

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */

    }, {
        key: "append",
        value: function append(line) {}
    }, {
        key: "finished",
        value: function finished() {
            this._finished++;
            return _react2.default.Children.count(this.props.children) == this._finished;
        }
    }]);

    return HasChild;
}(_react.Component);

HasChild.childContextTypes = {
    parent: _react.PropTypes.object.isRequired
};

var Content = function (_HasChild) {
    _inherits(Content, _HasChild);

    function Content() {
        var _Object$getPrototypeO2;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, Content);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(Content)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.state = { composed: [] }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    _createClass(Content, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.compose();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            return nextProps.children != this.props.children;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_group2.default, this.props);
        }
    }, {
        key: "compose",
        value: function compose() {}
    }, {
        key: "nextAvailableSpace",


        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */
        value: function nextAvailableSpace() {
            _get(Object.getPrototypeOf(Content.prototype), "nextAvailableSpace", this).call(this);
            var parent = this.context.parent;

            return parent.nextAvailableSpace();
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */

    }, {
        key: "append",
        value: function append(line) {
            _get(Object.getPrototypeOf(Content.prototype), "append", this).call(this, line);
            return this.context.append(line);
        }
    }, {
        key: "finished",
        value: function finished() {
            if (_get(Object.getPrototypeOf(Content.prototype), "finished", this).call(this)) {
                this.context.parent.finished();
                return true;
            }
            return false;
        }
    }]);

    return Content;
}(HasChild);

Content.contextTypes = {
    parent: _react.PropTypes.object
};
exports.default = Content;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7Ozs7OzswTUFLVixZQUFVOzs7aUJBTEE7OzBDQU9RO0FBQ2IsbUJBQU87QUFDSCx3QkFBTyxJQUFQO2FBREosQ0FEYTs7Ozs7Ozs7Ozs2Q0FVRzs7Ozs7Ozs7OytCQVFiLE1BQUs7OzttQ0FJRjtBQUNOLGlCQUFLLFNBQUwsR0FETTtBQUVaLG1CQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsS0FBSyxTQUFMLENBRnRDOzs7O1dBN0JEOzs7U0FDRixvQkFBa0I7QUFDckIsWUFBUSxpQkFBVSxNQUFWLENBQWlCLFVBQWpCOzs7SUFpQ0s7Ozs7Ozs7Ozs7Ozs7O2dOQUNsQixRQUFNLEVBQUMsVUFBUyxFQUFUOzs7aUJBRFc7OzZDQUdHO0FBQ2hCLGlCQUFLLE9BQUwsR0FEZ0I7Ozs7a0RBSU0sV0FBVTtBQUNoQyxtQkFBTyxVQUFVLFFBQVYsSUFBb0IsS0FBSyxLQUFMLENBQVcsUUFBWCxDQURLOzs7O2lDQUk1QjtBQUNKLG1CQUFPLCtDQUFXLEtBQUssS0FBTCxDQUFsQixDQURJOzs7O2tDQUlDOzs7Ozs7Ozs7NkNBWVc7QUFDaEIsdUNBNUJhLDBEQTRCYixDQURnQjtnQkFFVCxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRlM7O0FBR2hCLG1CQUFPLE9BQU8sa0JBQVAsRUFBUCxDQUhnQjs7Ozs7Ozs7OzsrQkFVYixNQUFLO0FBQ1IsdUNBdENhLCtDQXNDQSxLQUFiLENBRFE7QUFFUixtQkFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQVAsQ0FGUTs7OzttQ0FLTDtBQUNULDJDQTNDbUIsZ0RBMkNuQixFQUFvQjtBQUNuQixxQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixRQUFwQixHQURtQjtBQUVuQix1QkFBTyxJQUFQLENBRm1CO2FBQXBCO0FBSUEsbUJBQU8sS0FBUCxDQUxTOzs7O1dBMUNVO0VBQWdCOztBQUFoQixRQW1CVixlQUFhO0FBQ2hCLFlBQVEsaUJBQVUsTUFBVjs7a0JBcEJLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgfVxuXG4gICBfZmluaXNoZWQ9MDtcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFyZW50OnRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZChsaW5lKXtcblxuICAgIH1cblxuICAgIGZpbmlzaGVkKCl7XG4gICAgICAgIHRoaXMuX2ZpbmlzaGVkKytcblx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PXRoaXMuX2ZpbmlzaGVkXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG4gICBzdGF0ZT17Y29tcG9zZWQ6W119XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMuY2hpbGRyZW4hPXRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30vPlxuICAgIH1cblxuICAgIGNvbXBvc2UoKXtcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICBzdXBlci5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kKGxpbmUpe1xuICAgICAgICBzdXBlci5hcHBlbmQobGluZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hcHBlbmQobGluZSlcbiAgICB9XG5cdFxuXHRmaW5pc2hlZCgpe1xuXHRcdGlmKHN1cGVyLmZpbmlzaGVkKCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5maW5pc2hlZCgpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufVxuIl19