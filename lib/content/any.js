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
        key: "next",
        value: function next() {}

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
        key: "next",


        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */
        value: function next() {
            _get(Object.getPrototypeOf(Content.prototype), "next", this).call(this);
            var parent = this.context.parent;

            return parent.next();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7Ozs7OzswTUFLVixZQUFVOzs7aUJBTEE7OzBDQU9RO0FBQ2IsbUJBQU87QUFDSCx3QkFBTyxJQUFQO2FBREosQ0FEYTs7Ozs7Ozs7OzsrQkFVWDs7Ozs7Ozs7OytCQVFDLE1BQUs7OzttQ0FJRjtBQUNOLGlCQUFLLFNBQUwsR0FETTtBQUVaLG1CQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsS0FBSyxTQUFMLENBRnRDOzs7O1dBN0JEOzs7U0FDRixvQkFBa0I7QUFDckIsWUFBUSxpQkFBVSxNQUFWLENBQWlCLFVBQWpCOzs7SUFpQ0s7Ozs7Ozs7Ozs7Ozs7O2dOQUNsQixRQUFNLEVBQUMsVUFBUyxFQUFUOzs7aUJBRFc7OzZDQUdHO0FBQ2hCLGlCQUFLLE9BQUwsR0FEZ0I7Ozs7a0RBSU0sV0FBVTtBQUNoQyxtQkFBTyxVQUFVLFFBQVYsSUFBb0IsS0FBSyxLQUFMLENBQVcsUUFBWCxDQURLOzs7O2lDQUk1QjtBQUNKLG1CQUFPLCtDQUFXLEtBQUssS0FBTCxDQUFsQixDQURJOzs7O2tDQUlDOzs7Ozs7Ozs7K0JBWUg7QUFDRix1Q0E1QmEsNENBNEJiLENBREU7Z0JBRUssU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZMOztBQUdGLG1CQUFPLE9BQU8sSUFBUCxFQUFQLENBSEU7Ozs7Ozs7Ozs7K0JBVUMsTUFBSztBQUNSLHVDQXRDYSwrQ0FzQ0EsS0FBYixDQURRO0FBRVIsbUJBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUFQLENBRlE7Ozs7bUNBS0w7QUFDVCwyQ0EzQ21CLGdEQTJDbkIsRUFBb0I7QUFDbkIscUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsR0FEbUI7QUFFbkIsdUJBQU8sSUFBUCxDQUZtQjthQUFwQjtBQUlBLG1CQUFPLEtBQVAsQ0FMUzs7OztXQTFDVTtFQUFnQjs7QUFBaEIsUUFtQlYsZUFBYTtBQUNoQixZQUFRLGlCQUFVLE1BQVY7O2tCQXBCSyIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgIH1cblxuICAgX2ZpbmlzaGVkPTA7XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDp0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHQoKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgZmluaXNoZWQoKXtcbiAgICAgICAgdGhpcy5fZmluaXNoZWQrK1xuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09dGhpcy5fZmluaXNoZWRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgIHN0YXRlPXtjb21wb3NlZDpbXX1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgcmV0dXJuIG5leHRQcm9wcy5jaGlsZHJlbiE9dGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfS8+XG4gICAgfVxuXG4gICAgY29tcG9zZSgpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dCgpe1xuICAgICAgICBzdXBlci5uZXh0KClcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHJldHVybiBwYXJlbnQubmV4dCgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmQobGluZSl7XG4gICAgICAgIHN1cGVyLmFwcGVuZChsaW5lKVxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFwcGVuZChsaW5lKVxuICAgIH1cblx0XG5cdGZpbmlzaGVkKCl7XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoKSl7XG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmZpbmlzaGVkKClcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG4iXX0=