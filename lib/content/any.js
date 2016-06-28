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
        key: "render",
        value: function render() {
            return _react2.default.createElement(_group2.default, this.props);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.compose();
        }
    }, {
        key: "compose",
        value: function compose() {
            this._finished = 0;
            this.composed = [];
        }

        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */

    }, {
        key: "nextAvailableSpace",
        value: function nextAvailableSpace() {
            var required = arguments.length <= 0 || arguments[0] === undefined ? { width: 0, height: 0 } : arguments[0];
        }

        /**
            * children should call after a line composed out
            * a chance to add to self's composed
            */

    }, {
        key: "appendComposed",
        value: function appendComposed(line) {}
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            this.reCompose();
        }
    }, {
        key: "reCompose",
        value: function reCompose() {}
    }, {
        key: "replaceAvailableSpace",
        value: function replaceAvailableSpace(reference) {
            var required = arguments.length <= 1 || arguments[1] === undefined ? { width: 0, height: 0 } : arguments[1];
        }

        /**
         * 
         */

    }, {
        key: "replaceComposed",
        value: function replaceComposed(next, prev) {}

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
            var _context$parent;

            return (_context$parent = this.context.parent).nextAvailableSpace.apply(_context$parent, arguments);
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */

    }, {
        key: "appendComposed",
        value: function appendComposed() {
            var _context$parent2;

            return (_context$parent2 = this.context.parent).appendComposed.apply(_context$parent2, arguments);
        }
    }, {
        key: "replaceComposed",
        value: function replaceComposed() {
            var _context$parent3;

            return (_context$parent3 = this.context.parent).replaceComposed.apply(_context$parent3, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7OzswQ0FLUTtBQUNiLG1CQUFPO0FBQ0gsd0JBQU8sSUFBUDthQURKLENBRGE7Ozs7aUNBTVo7QUFDRCxtQkFBTywrQ0FBVyxLQUFLLEtBQUwsQ0FBbEIsQ0FEQzs7Ozs2Q0FJZTtBQUNoQixpQkFBSyxPQUFMLEdBRGdCOzs7O2tDQUlkO0FBQ1IsaUJBQUssU0FBTCxHQUFlLENBQWYsQ0FEUTtBQUVGLGlCQUFLLFFBQUwsR0FBYyxFQUFkLENBRkU7Ozs7Ozs7Ozs7NkNBUzBDO2dCQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozt1Q0FRakMsTUFBSzs7OzJDQU1ELFdBQVcsV0FBVTtBQUMxQyxpQkFBSyxTQUFMLEdBRDBDOzs7O29DQUloQzs7OzhDQUlXLFdBQXVDO2dCQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7O3dDQU83QyxNQUFNLE1BQUs7Ozs7Ozs7Ozs7bUNBU2Q7QUFDTixpQkFBSyxTQUFMLEdBRE07QUFFWixtQkFBTyxnQkFBTSxRQUFOLENBQWUsS0FBZixDQUFxQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQXJCLElBQTJDLEtBQUssU0FBTCxDQUZ0Qzs7OztXQWxFRDs7O1NBQ0Ysb0JBQWtCO0FBQ3JCLFlBQVEsaUJBQVUsTUFBVixDQUFpQixVQUFqQjs7O0lBc0VLOzs7Ozs7Ozs7Ozs7Ozs7Ozs2Q0FTRzs7O0FBQ2hCLG1CQUFPLHdCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGtCQUFwQix3QkFBMEMsU0FBMUMsQ0FBUCxDQURnQjs7Ozs7Ozs7Ozt5Q0FRSjs7O0FBQ1osbUJBQU8seUJBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0IsY0FBcEIseUJBQXNDLFNBQXRDLENBQVAsQ0FEWTs7OzswQ0FJRjs7O0FBQ2hCLG1CQUFPLHlCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGVBQXBCLHlCQUF1QyxTQUF2QyxDQUFQLENBRGdCOzs7O21DQUlQO0FBQ1QsMkNBMUJtQixrREEwQm5CLEVBQW9CO0FBQ25CLHFCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFFBQXBCLEdBRG1CO0FBRW5CLHVCQUFPLElBQVAsQ0FGbUI7YUFBcEI7QUFJQSxtQkFBTyxLQUFQLENBTFM7Ozs7V0F6QlU7RUFBa0I7O0FBQWxCLFVBQ1YsZUFBYTtBQUNoQixZQUFRLGlCQUFVLE1BQVY7O2tCQUZLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXJlbnQ6dGhpc1xuICAgICAgICB9XG4gICAgfVxuXHRcblx0cmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cdFxuXHRjb21wb3NlKCl7XG5cdFx0dGhpcy5fZmluaXNoZWQ9MFxuICAgICAgICB0aGlzLmNvbXBvc2VkPVtdXG4gICAgfVxuXHRcbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblx0XG5cdC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cdFxuXHRcblx0XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcblx0XHR0aGlzLnJlQ29tcG9zZSgpXG5cdH1cblxuXHRyZUNvbXBvc2UoKXtcblx0XHRcblx0fVxuXG5cdHJlcGxhY2VBdmFpbGFibGVTcGFjZShyZWZlcmVuY2UscmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cdFxuXHQvKipcblx0ICogXG5cdCAqL1xuXHRyZXBsYWNlQ29tcG9zZWQobmV4dCwgcHJldil7XG5cdFx0XG5cdH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50LmZpbmlzaGVkKCkgdG8gbm90aWZ5IHBhcmVudCBmaW5pc2hlZCBjb21wb3NlZCBpdHNlbGZcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBjaGlsZHJlbiBhbGwgY29tcG9zZWQsIHVzdWFsbHkgdG8gbm90aWZ5IHBhcmVudCdzIHBhcmVudFxuXHQgKi9cbiAgICBmaW5pc2hlZCgpe1xuICAgICAgICB0aGlzLl9maW5pc2hlZCsrXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pPT10aGlzLl9maW5pc2hlZFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXHRcblx0cmVwbGFjZUNvbXBvc2VkKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQucmVwbGFjZUNvbXBvc2VkKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdGZpbmlzaGVkKCl7XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoKSl7XG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmZpbmlzaGVkKClcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG4iXX0=