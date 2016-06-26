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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { finished: { count: 0 } }, _temp), _possibleConstructorReturn(_this, _ret);
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
            var finished = this.state.finished;

            finished.count++;
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
        _classCallCheck(this, Content);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));

        _this2.state = Object.assign({ composed: [] }, _this2.state);
        return _this2;
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
            var parent = this.context.parent;

            return parent.append(line);
        }
    }, {
        key: "finished",
        value: function finished() {
            _get(Object.getPrototypeOf(Content.prototype), "finished", this).call(this);

            var children = this.props.children;
            var finished = this.state.finished;


            if (_react2.default.Children.count(children) == finished.count) {
                var parent = this.context.parent;

                parent.finished();
            }
        }
    }]);

    return Content;
}(HasChild);

Content.contextTypes = {
    parent: _react.PropTypes.object
};
exports.default = Content;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7Ozs7OzswTUFLVCxRQUFNLEVBQUMsVUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFWOzs7aUJBTEU7OzBDQU9RO0FBQ2IsbUJBQU87QUFDSCx3QkFBTyxJQUFQO2FBREosQ0FEYTs7Ozs7Ozs7OzsrQkFVWDs7Ozs7Ozs7OytCQVFDLE1BQUs7OzttQ0FJRjtnQkFDRCxXQUFVLEtBQUssS0FBTCxDQUFWLFNBREM7O0FBRU4scUJBQVMsS0FBVCxHQUZNOzs7O1dBN0JEOzs7U0FDRixvQkFBa0I7QUFDckIsWUFBUSxpQkFBVSxNQUFWLENBQWlCLFVBQWpCOzs7SUFpQ0s7OztBQUNqQixhQURpQixPQUNqQixHQUFhOzhCQURJLFNBQ0o7OzRFQURJLHFCQUVKLFlBREE7O0FBRVQsZUFBSyxLQUFMLEdBQVcsT0FBTyxNQUFQLENBQWMsRUFBQyxVQUFTLEVBQVQsRUFBZixFQUE0QixPQUFLLEtBQUwsQ0FBdkMsQ0FGUzs7S0FBYjs7aUJBRGlCOzs2Q0FNRztBQUNoQixpQkFBSyxPQUFMLEdBRGdCOzs7O2tEQUlNLFdBQVU7QUFDaEMsbUJBQU8sVUFBVSxRQUFWLElBQW9CLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESzs7OztpQ0FJNUI7QUFDSixtQkFBTywrQ0FBVyxLQUFLLEtBQUwsQ0FBbEIsQ0FESTs7OztrQ0FJQzs7Ozs7Ozs7OytCQVlIO0FBQ0YsdUNBL0JhLDRDQStCYixDQURFO2dCQUVLLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGTDs7QUFHRixtQkFBTyxPQUFPLElBQVAsRUFBUCxDQUhFOzs7Ozs7Ozs7OytCQVVDLE1BQUs7QUFDUix1Q0F6Q2EsK0NBeUNBLEtBQWIsQ0FEUTtnQkFFRCxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkM7O0FBR1IsbUJBQU8sT0FBTyxNQUFQLENBQWMsSUFBZCxDQUFQLENBSFE7Ozs7bUNBTUY7QUFDTix1Q0EvQ2EsZ0RBK0NiLENBRE07O2dCQUdDLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FIRDtnQkFJQyxXQUFVLEtBQUssS0FBTCxDQUFWLFNBSkQ7OztBQU1OLGdCQUFHLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLFFBQXJCLEtBQWdDLFNBQVMsS0FBVCxFQUFlO29CQUN2QyxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRHVDOztBQUU5Qyx1QkFBTyxRQUFQLEdBRjhDO2FBQWxEOzs7O1dBcERhO0VBQWdCOztBQUFoQixRQXNCVixlQUFhO0FBQ2hCLFlBQVEsaUJBQVUsTUFBVjs7a0JBdkJLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgfVxuXG4gICAgc3RhdGU9e2ZpbmlzaGVkOntjb3VudDowfX1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFyZW50OnRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dCgpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmQobGluZSl7XG5cbiAgICB9XG5cbiAgICBmaW5pc2hlZCgpe1xuICAgICAgICBsZXQge2ZpbmlzaGVkfT10aGlzLnN0YXRlXG4gICAgICAgIGZpbmlzaGVkLmNvdW50KytcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHRoaXMuc3RhdGU9T2JqZWN0LmFzc2lnbih7Y29tcG9zZWQ6W119LHRoaXMuc3RhdGUpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICByZXR1cm4gbmV4dFByb3BzLmNoaWxkcmVuIT10aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBjb21wb3NlKCl7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0KCl7XG4gICAgICAgIHN1cGVyLm5leHQoKVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZChsaW5lKXtcbiAgICAgICAgc3VwZXIuYXBwZW5kKGxpbmUpXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZChsaW5lKVxuICAgIH1cblxuICAgIGZpbmlzaGVkKCl7XG4gICAgICAgIHN1cGVyLmZpbmlzaGVkKClcblxuICAgICAgICBjb25zdCB7Y2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgY29uc3Qge2ZpbmlzaGVkfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pPT1maW5pc2hlZC5jb3VudCl7XG4gICAgICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIHBhcmVudC5maW5pc2hlZCgpXG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==