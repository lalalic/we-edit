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

var Content = function (_HasChild) {
    _inherits(Content, _HasChild);

    function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
    }

    _createClass(Content, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            return nextProps.children != this.props.children;
        }
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
        key: "appendComposed",
        value: function appendComposed(line) {
            _get(Object.getPrototypeOf(Content.prototype), "appendComposed", this).call(this, line);
            return this.context.appendComposed(line);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7OzswQ0FLUTtBQUNiLG1CQUFPO0FBQ0gsd0JBQU8sSUFBUDthQURKLENBRGE7Ozs7NkNBTUc7QUFDaEIsaUJBQUssT0FBTCxHQURnQjs7OztrQ0FJWDtBQUNMLGlCQUFLLFNBQUwsR0FBZSxDQUFmLENBREs7QUFFTCxpQkFBSyxRQUFMLEdBQWMsRUFBZCxDQUZLOzs7O2lDQUtEO0FBQ0osbUJBQU8sK0NBQVcsS0FBSyxLQUFMLENBQWxCLENBREk7Ozs7Ozs7Ozs7NkNBUVk7Ozs7Ozs7Ozt1Q0FRTCxNQUFLOzs7Ozs7Ozs7O21DQVNWO0FBQ04saUJBQUssU0FBTCxHQURNO0FBRVosbUJBQU8sZ0JBQU0sUUFBTixDQUFlLEtBQWYsQ0FBcUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFyQixJQUEyQyxLQUFLLFNBQUwsQ0FGdEM7Ozs7V0E3Q0Q7OztTQUNGLG9CQUFrQjtBQUNyQixZQUFRLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7OztJQWlESzs7Ozs7Ozs7Ozs7a0RBQ1EsV0FBVTtBQUMvQixtQkFBTyxVQUFVLFFBQVYsSUFBb0IsS0FBSyxLQUFMLENBQVcsUUFBWCxDQURJOzs7Ozs7Ozs7OzZDQVlmO0FBQ2hCLHVDQWRhLDBEQWNiLENBRGdCO2dCQUVULFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGUzs7QUFHaEIsbUJBQU8sT0FBTyxrQkFBUCxFQUFQLENBSGdCOzs7Ozs7Ozs7O3VDQVVMLE1BQUs7QUFDaEIsdUNBeEJhLHVEQXdCUSxLQUFyQixDQURnQjtBQUVoQixtQkFBTyxLQUFLLE9BQUwsQ0FBYSxjQUFiLENBQTRCLElBQTVCLENBQVAsQ0FGZ0I7Ozs7bUNBS2I7QUFDVCwyQ0E3Qm1CLGdEQTZCbkIsRUFBb0I7QUFDbkIscUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsR0FEbUI7QUFFbkIsdUJBQU8sSUFBUCxDQUZtQjthQUFwQjtBQUlBLG1CQUFPLEtBQVAsQ0FMUzs7OztXQTVCVTtFQUFnQjs7QUFBaEIsUUFLVixlQUFhO0FBQ2hCLFlBQVEsaUJBQVUsTUFBVjs7a0JBTksiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDp0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIHRoaXMuX2ZpbmlzaGVkPTBcbiAgICAgICAgdGhpcy5jb21wb3NlZD1bXVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfS8+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5maW5pc2hlZCgpIHRvIG5vdGlmeSBwYXJlbnQgZmluaXNoZWQgY29tcG9zZWQgaXRzZWxmXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgY2hpbGRyZW4gYWxsIGNvbXBvc2VkLCB1c3VhbGx5IHRvIG5vdGlmeSBwYXJlbnQncyBwYXJlbnRcblx0ICovXG4gICAgZmluaXNoZWQoKXtcbiAgICAgICAgdGhpcy5fZmluaXNoZWQrK1xuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09dGhpcy5fZmluaXNoZWRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgcmV0dXJuIG5leHRQcm9wcy5jaGlsZHJlbiE9dGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICBzdXBlci5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIHN1cGVyLmFwcGVuZENvbXBvc2VkKGxpbmUpXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYXBwZW5kQ29tcG9zZWQobGluZSlcbiAgICB9XG5cblx0ZmluaXNoZWQoKXtcblx0XHRpZihzdXBlci5maW5pc2hlZCgpKXtcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuZmluaXNoZWQoKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cbiJdfQ==