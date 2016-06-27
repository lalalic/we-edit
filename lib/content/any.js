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
        _classCallCheck(this, HasChild);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HasChild).apply(this, arguments));
    }

    _createClass(HasChild, [{
        key: "getChildContext",
        value: function getChildContext() {
            return {
                parent: this
            };
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.compose();
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState, nextContext) {}
    }, {
        key: "compose",
        value: function compose() {
            this._finished = 0;
            this.composed = [];
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_group2.default, this.props);
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
        key: "appendComposed",
        value: function appendComposed(line) {}

        /**
         *  child calls context.parent.finished() to notify parent finished composed itself
         *  return
         *  	true: parent's children all composed, usually to notify parent's parent
         */

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

var HasParent = function (_HasChild) {
    _inherits(HasParent, _HasChild);

    function HasParent() {
        _classCallCheck(this, HasParent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HasParent).apply(this, arguments));
    }

    _createClass(HasParent, [{
        key: "nextAvailableSpace",


        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */
        value: function nextAvailableSpace() {
            _get(Object.getPrototypeOf(HasParent.prototype), "nextAvailableSpace", this).call(this);
            var parent = this.context.parent;

            return parent.nextAvailableSpace();
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */

    }, {
        key: "appendComposed",
        value: function appendComposed(line) {
            _get(Object.getPrototypeOf(HasParent.prototype), "appendComposed", this).call(this, line);
            return this.context.parent.appendComposed(line);
        }
    }, {
        key: "finished",
        value: function finished() {
            if (_get(Object.getPrototypeOf(HasParent.prototype), "finished", this).call(this)) {
                this.context.parent.finished();
                return true;
            }
            return false;
        }
    }]);

    return HasParent;
}(HasChild);

HasParent.contextTypes = {
    parent: _react.PropTypes.object
};
exports.default = HasParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7OzswQ0FLUTtBQUNiLG1CQUFPO0FBQ0gsd0JBQU8sSUFBUDthQURKLENBRGE7Ozs7NkNBTUc7QUFDaEIsaUJBQUssT0FBTCxHQURnQjs7Ozs0Q0FJQSxXQUFXLFdBQVcsYUFBWTs7O2tDQUk3QztBQUNMLGlCQUFLLFNBQUwsR0FBZSxDQUFmLENBREs7QUFFTCxpQkFBSyxRQUFMLEdBQWMsRUFBZCxDQUZLOzs7O2lDQUtEO0FBQ0osbUJBQU8sK0NBQVcsS0FBSyxLQUFMLENBQWxCLENBREk7Ozs7Ozs7Ozs7NkNBUVk7Ozs7Ozs7Ozt1Q0FRTCxNQUFLOzs7Ozs7Ozs7O21DQVNWO0FBQ04saUJBQUssU0FBTCxHQURNO0FBRVosbUJBQU8sZ0JBQU0sUUFBTixDQUFlLEtBQWYsQ0FBcUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFyQixJQUEyQyxLQUFLLFNBQUwsQ0FGdEM7Ozs7V0FqREQ7OztTQUNGLG9CQUFrQjtBQUNyQixZQUFRLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7OztJQXFESzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkNBU0c7QUFDaEIsdUNBVmEsNERBVWIsQ0FEZ0I7Z0JBRVQsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZTOztBQUdoQixtQkFBTyxPQUFPLGtCQUFQLEVBQVAsQ0FIZ0I7Ozs7Ozs7Ozs7dUNBVUwsTUFBSztBQUNoQix1Q0FwQmEseURBb0JRLEtBQXJCLENBRGdCO0FBRWhCLG1CQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsQ0FBUCxDQUZnQjs7OzttQ0FLYjtBQUNULDJDQXpCbUIsa0RBeUJuQixFQUFvQjtBQUNuQixxQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixRQUFwQixHQURtQjtBQUVuQix1QkFBTyxJQUFQLENBRm1CO2FBQXBCO0FBSUEsbUJBQU8sS0FBUCxDQUxTOzs7O1dBeEJVO0VBQWtCOztBQUFsQixVQUNWLGVBQWE7QUFDaEIsWUFBUSxpQkFBVSxNQUFWOztrQkFGSyIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFyZW50OnRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcblxuICAgIH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgdGhpcy5fZmluaXNoZWQ9MFxuICAgICAgICB0aGlzLmNvbXBvc2VkPVtdXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Lz5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50LmZpbmlzaGVkKCkgdG8gbm90aWZ5IHBhcmVudCBmaW5pc2hlZCBjb21wb3NlZCBpdHNlbGZcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBjaGlsZHJlbiBhbGwgY29tcG9zZWQsIHVzdWFsbHkgdG8gbm90aWZ5IHBhcmVudCdzIHBhcmVudFxuXHQgKi9cbiAgICBmaW5pc2hlZCgpe1xuICAgICAgICB0aGlzLl9maW5pc2hlZCsrXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pPT10aGlzLl9maW5pc2hlZFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHN1cGVyLm5leHRBdmFpbGFibGVTcGFjZSgpXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICByZXR1cm4gcGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgc3VwZXIuYXBwZW5kQ29tcG9zZWQobGluZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQobGluZSlcbiAgICB9XG5cblx0ZmluaXNoZWQoKXtcblx0XHRpZihzdXBlci5maW5pc2hlZCgpKXtcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuZmluaXNoZWQoKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cbiJdfQ==