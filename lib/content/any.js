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

var _reactAddonsShallowCompare = require("react-addons-shallow-compare");

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.children = [], _this.composed = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(HasChild, [{
        key: "getChildContext",
        value: function getChildContext() {
            return {
                parent: this,
                composedTime: this.state.composedTime || this.context.composedTime
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
        value: function compose() {}

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

        /**
         *  child calls context.parent.finished() to notify parent finished composed itself
         *  return
         *  	true: parent's children all composed, usually to notify parent's parent
         */

    }, {
        key: "finished",
        value: function finished(child) {
            this.children.push(child);
            return _react2.default.Children.count(this.props.children) == this.children.length;
        }
    }]);

    return HasChild;
}(_react.Component);

HasChild.childContextTypes = {
    parent: _react.PropTypes.object.isRequired,
    composedTime: _react.PropTypes.string.isRequired
};


var uuid = 0;

var HasParent = function (_HasChild) {
    _inherits(HasParent, _HasChild);

    function HasParent() {
        var _Object$getPrototypeO2;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, HasParent);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(HasParent)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2._id = uuid++, _temp2), _possibleConstructorReturn(_this2, _ret2);
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

        /**
         *  it's a very complicated job, so we need a very simple design, one sentence described solution. options:
         *  1. remove all composed, and re-compose all
         *  	- need find a time to recompose
         *  	- logic is most simple
         *  	- performance is most bad
         *
         *  2. remove all composed from this content, and re-compose removals
         *  	- Need locate composed of this content in page
         *  	- Need find a time to recompose
         *  		> componentDidUpdate
         *  			. any state update,
         *  			. and carefully tuned shouldComponentUpdate(nextProps, nextState, nextContext)
         *  	- performance is better than #1
         *
         *  3. recompose this content, and check if new composed fits last composed space (hit ratio is low)
         *  	- Yes: just replace
         *  	- No: #1, or #2
         *  	- and then loop with all following content with the same logic
         *
         *  	3.a: recompose this content line by line ..., much logics here
         */

    }, {
        key: "reCompose",
        value: function reCompose() {
            this.composed[0] && this._reComposeFrom(this.composed[0]); //#2 solution
        }
    }, {
        key: "_reComposeFrom",
        value: function _reComposeFrom(reference) {
            //#2
            this.composed.splice(0);
            this.children.splice(0);
            this._removeAllFrom.apply(this, arguments);
        }
    }, {
        key: "_removeAllFrom",
        value: function _removeAllFrom(reference) {
            console.log("remove all from " + this.displayName + " " + (reference ? "" : "not") + " including child, and parent");
            if (reference) this.children.forEach(function (a) {
                return a._removeAllFrom();
            });

            this.composed.splice(0);
            this.children.splice(0);

            if (reference) this.context.parent._removeAllFrom(this);
        }
        /**
         * only no composed should be re-compose
         */

    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            console.log("shouldComponentUpdate on " + this.displayName + ", with " + (this.composed.length == 0));
            if (this.composed.length == 0) {
                //this.compose()
                return true;
            }
            return false;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.compose();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps() {
            console.log("componentWillReceiveProps on " + this.displayName);
        }
    }, {
        key: "finished",
        value: function finished(child) {
            if (_get(Object.getPrototypeOf(HasParent.prototype), "finished", this).call(this, child)) {
                this.context.parent.finished(this);
                return true;
            }
            return false;
        }
    }]);

    return HasParent;
}(HasChild);

HasParent.contextTypes = {
    parent: _react.PropTypes.object,
    composedTime: _react.PropTypes.string
};
exports.default = HasParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7OzBNQU1ULFFBQU0sVUFDVCxXQUFTLFVBQ04sV0FBUzs7O2lCQVJBOzswQ0FVUTtBQUNiLG1CQUFPO0FBQ0gsd0JBQU8sSUFBUDtBQUNBLDhCQUFjLEtBQUssS0FBTCxDQUFXLFlBQVgsSUFBMkIsS0FBSyxPQUFMLENBQWEsWUFBYjthQUY3QyxDQURhOzs7O2lDQU9aO0FBQ0QsbUJBQU8sK0NBQVcsS0FBSyxLQUFMLENBQWxCLENBREM7Ozs7NkNBSWU7QUFDaEIsaUJBQUssT0FBTCxHQURnQjs7OztrQ0FJZDs7Ozs7Ozs7OzZDQVEwQztnQkFBN0IsaUVBQVMsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsa0JBQVU7Ozs7Ozs7Ozs7dUNBUWpDLE1BQUs7Ozs7Ozs7Ozs7aUNBU1gsT0FBTTtBQUNqQixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQURpQjtBQUVqQixtQkFBTyxnQkFBTSxRQUFOLENBQWUsS0FBZixDQUFxQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQXJCLElBQTJDLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FGakM7Ozs7V0FsRE47OztTQUNGLG9CQUFrQjtBQUNyQixZQUFRLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7QUFDUixrQkFBYyxpQkFBVSxNQUFWLENBQWlCLFVBQWpCOzs7O0FBcUR0QixJQUFJLE9BQUssQ0FBTDs7SUFDaUI7Ozs7Ozs7Ozs7Ozs7O2tOQU1wQixNQUFJOzs7aUJBTmdCOzs7Ozs7OzZDQVdHOzs7QUFDaEIsbUJBQU8sd0JBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0Isa0JBQXBCLHdCQUEwQyxTQUExQyxDQUFQLENBRGdCOzs7Ozs7Ozs7O3lDQVFKOzs7QUFDWixtQkFBTyx5QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixjQUFwQix5QkFBc0MsU0FBdEMsQ0FBUCxDQURZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQTBCUjtBQUNWLGlCQUFLLFFBQUwsQ0FBYyxDQUFkLEtBQW9CLEtBQUssY0FBTCxDQUFvQixLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQXBCLENBQXBCO0FBRFU7Ozt1Q0FJSSxXQUFVOztBQUN4QixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUR3QjtBQUV4QixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUZ3QjtBQUd4QixpQkFBSyxjQUFMLGFBQXVCLFNBQXZCLEVBSHdCOzs7O3VDQU1WLFdBQVU7QUFDbEIsb0JBQVEsR0FBUixzQkFBK0IsS0FBSyxXQUFMLFVBQW9CLFlBQVksRUFBWixHQUFpQixLQUFqQixrQ0FBbkQsRUFEa0I7QUFFeEIsZ0JBQUcsU0FBSCxFQUNDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0I7dUJBQUcsRUFBRSxjQUFGO2FBQUgsQ0FBdEIsQ0FERDs7QUFHQSxpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUx3QjtBQU14QixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQU53Qjs7QUFReEIsZ0JBQUcsU0FBSCxFQUNDLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFERDs7Ozs7Ozs7OENBTXdCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELG9CQUFRLEdBQVIsK0JBQXdDLEtBQUssV0FBTCxnQkFBMEIsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixDQUFsRSxFQURvRDtBQUVwRCxnQkFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQXdCOztBQUV2Qix1QkFBTyxJQUFQLENBRnVCO2FBQTNCO0FBSUEsbUJBQU8sS0FBUCxDQU5vRDs7Ozs2Q0FTcEM7QUFDaEIsaUJBQUssT0FBTCxHQURnQjs7OztvREFJTztBQUN2QixvQkFBUSxHQUFSLG1DQUE0QyxLQUFLLFdBQUwsQ0FBNUMsQ0FEdUI7Ozs7aUNBTXJCLE9BQU07QUFDZCwyQ0F6Rm1CLG1EQXlGRCxNQUFsQixFQUF5QjtBQUN4QixxQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixRQUFwQixDQUE2QixJQUE3QixFQUR3QjtBQUV4Qix1QkFBTyxJQUFQLENBRndCO2FBQXpCO0FBSUEsbUJBQU8sS0FBUCxDQUxjOzs7O1dBeEZLO0VBQWtCOztBQUFsQixVQUNWLGVBQWE7QUFDaEIsWUFBUSxpQkFBVSxNQUFWO0FBQ1Isa0JBQWMsaUJBQVUsTUFBVjs7a0JBSEQiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IHNoYWxsb3dDb21wYXJlIGZyb20gJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgY29tcG9zZWRUaW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgICB9XG5cbiAgICBzdGF0ZT17fVxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDp0aGlzLFxuICAgICAgICAgICAgY29tcG9zZWRUaW1lOiB0aGlzLnN0YXRlLmNvbXBvc2VkVGltZSB8fCB0aGlzLmNvbnRleHQuY29tcG9zZWRUaW1lXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cblx0Y29tcG9zZSgpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50LmZpbmlzaGVkKCkgdG8gbm90aWZ5IHBhcmVudCBmaW5pc2hlZCBjb21wb3NlZCBpdHNlbGZcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBjaGlsZHJlbiBhbGwgY29tcG9zZWQsIHVzdWFsbHkgdG8gbm90aWZ5IHBhcmVudCdzIHBhcmVudFxuXHQgKi9cbiAgICBmaW5pc2hlZChjaGlsZCl7XG5cdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09dGhpcy5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG59XG5cbnZhciB1dWlkPTBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudCBleHRlbmRzIEhhc0NoaWxke1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNvbXBvc2VkVGltZTogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH1cblxuXHRfaWQ9dXVpZCsrXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0LyoqXG5cdCAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG5cdCAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcblx0ICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuXHQgKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG5cdCAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcblx0ICpcblx0ICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG5cdCAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2Vcblx0ICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuXHQgKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXG5cdCAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXG5cdCAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcblx0ICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuXHQgKlxuXHQgKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXG5cdCAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2Vcblx0ICogIFx0LSBObzogIzEsIG9yICMyXG5cdCAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXG5cdCAqXG5cdCAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXG5cdCAqL1xuXHRyZUNvbXBvc2UoKXtcblx0XHR0aGlzLmNvbXBvc2VkWzBdICYmIHRoaXMuX3JlQ29tcG9zZUZyb20odGhpcy5jb21wb3NlZFswXSkvLyMyIHNvbHV0aW9uXG5cdH1cblxuXHRfcmVDb21wb3NlRnJvbShyZWZlcmVuY2Upey8vIzJcblx0XHR0aGlzLmNvbXBvc2VkLnNwbGljZSgwKVxuXHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0dGhpcy5fcmVtb3ZlQWxsRnJvbSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRfcmVtb3ZlQWxsRnJvbShyZWZlcmVuY2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhgcmVtb3ZlIGFsbCBmcm9tICR7dGhpcy5kaXNwbGF5TmFtZX0gJHtyZWZlcmVuY2UgPyBcIlwiIDogXCJub3RcIn0gaW5jbHVkaW5nIGNoaWxkLCBhbmQgcGFyZW50YClcblx0XHRpZihyZWZlcmVuY2UpXG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fcmVtb3ZlQWxsRnJvbSgpKVxuXG5cdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSgwKVxuXG5cdFx0aWYocmVmZXJlbmNlKVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5fcmVtb3ZlQWxsRnJvbSh0aGlzKVxuXHR9XG4gICAgLyoqXG4gICAgICogb25seSBubyBjb21wb3NlZCBzaG91bGQgYmUgcmUtY29tcG9zZVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpe1xuICAgICAgICBjb25zb2xlLmxvZyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxuICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MCl7XG4gICAgICAgICAgICAvL3RoaXMuY29tcG9zZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcbiAgICAgICAgY29uc29sZS5sb2coYGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgb24gJHt0aGlzLmRpc3BsYXlOYW1lfWApXG5cbiAgICB9XG5cblxuXHRmaW5pc2hlZChjaGlsZCl7XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoY2hpbGQpKXtcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuZmluaXNoZWQodGhpcylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG4iXX0=