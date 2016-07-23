"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoChild = exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.styleInheritable = styleInheritable;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.computed = { children: [], composed: [] }, _temp), _possibleConstructorReturn(_this, _ret);
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
            return _react2.default.createElement(
                "div",
                null,
                this.getContent()
            );
        }

        /**
         * compose on client or server
         */

    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.compose();
        }

        /**
         * usually NoChild content should be composed according to nextAvailableSpace,
         * and then append to itself.composed[] and parent.appendComposed
         */

    }, {
        key: "compose",
        value: function compose() {
            if (this.isEmpty()) {
                this.context.parent.on1ChildComposed(this);
            }
        }
    }, {
        key: "getContentCount",
        value: function getContentCount() {
            return _react2.default.Children.count(this.props.children);
        }
    }, {
        key: "getContent",
        value: function getContent() {
            return this.props.children;
        }
    }, {
        key: "getStyle",
        value: function getStyle() {}
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.getContentCount() == 0;
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */

    }, {
        key: "appendComposed",
        value: function appendComposed(line) {}

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
         *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
         *  return
         *  	true: parent's all children composed
         */

    }, {
        key: "on1ChildComposed",
        value: function on1ChildComposed(child) {
            console.log("a " + child.constructor.displayName + " composed");
            this.computed.children.push(child);

            if (this.isAllChildrenComposed()) {
                this.onAllChildrenComposed();
            }
        }
    }, {
        key: "isAllChildrenComposed",
        value: function isAllChildrenComposed() {
            return this.getContentCount() == this.computed.children.length;
        }
    }, {
        key: "onAllChildrenComposed",
        value: function onAllChildrenComposed() {}
    }, {
        key: "createComposed2Parent",
        value: function createComposed2Parent(props) {}
    }]);

    return HasChild;
}(_react.Component);

HasChild.childContextTypes = {
    parent: _react.PropTypes.object
};

var HasParentAndChild = function (_HasChild) {
    _inherits(HasParentAndChild, _HasChild);

    function HasParentAndChild() {
        _classCallCheck(this, HasParentAndChild);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HasParentAndChild).apply(this, arguments));
    }

    _createClass(HasParentAndChild, [{
        key: "nextAvailableSpace",

        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */
        value: function nextAvailableSpace() {
            var _context$parent;

            return this.availableSpace = (_context$parent = this.context.parent).nextAvailableSpace.apply(_context$parent, arguments);
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
        key: "onAllChildrenComposed",
        value: function onAllChildrenComposed() {
            this.context.parent.on1ChildComposed(this);
            _get(Object.getPrototypeOf(HasParentAndChild.prototype), "onAllChildrenComposed", this).call(this);
        }
    }]);

    return HasParentAndChild;
}(HasChild);

HasParentAndChild.displayName = "content";
HasParentAndChild.contextTypes = {
    parent: _react.PropTypes.object
};
exports.default = HasParentAndChild;

var NoChild = exports.NoChild = function (_HasParentAndChild) {
    _inherits(NoChild, _HasParentAndChild);

    function NoChild() {
        _classCallCheck(this, NoChild);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(NoChild).apply(this, arguments));

        Object.freeze(_this3.computed.children); //no children
        return _this3;
    }

    _createClass(NoChild, [{
        key: "render",
        value: function render() {
            return null;
        }
    }, {
        key: "compose",
        value: function compose() {
            var composed = this.createComposed2Parent();

            var parent = this.context.parent;

            this.computed.composed.push(composed);
            parent.appendComposed(composed);
            parent.on1ChildComposed(this);
        }
    }]);

    return NoChild;
}(HasParentAndChild);

function styleInheritable(Content) {
    var _class, _temp2;

    return _temp2 = _class = function (_Content) {
        _inherits(StyleContainer, _Content);

        function StyleContainer() {
            _classCallCheck(this, StyleContainer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(StyleContainer).apply(this, arguments));
        }

        _createClass(StyleContainer, [{
            key: "getChildContext",
            value: function getChildContext() {
                var _props$directStyle = this.props.directStyle;
                var directStyle = _props$directStyle === undefined ? this.defaultStyle : _props$directStyle;
                var inheritedStyle = this.context.inheritedStyle;


                if (!directStyle) debugger;

                return Object.assign(_get(Object.getPrototypeOf(StyleContainer.prototype), "getChildContext", this).call(this), {
                    inheritedStyle: {
                        get: function get(path) {
                            var v = directStyle.get(path);
                            if (v == undefined) return inheritedStyle.get(path);
                            return v;
                        }
                    }
                });
            }
        }, {
            key: "style",
            value: function style(key) {
                var _props$directStyle2 = this.props.directStyle;
                var directStyle = _props$directStyle2 === undefined ? this.defaultStyle : _props$directStyle2;
                var inheritedStyle = this.context.inheritedStyle;

                var value = directStyle.get(key);
                if (value == undefined) value = inheritedStyle.get(key);
                return value;
            }
        }, {
            key: "defaultStyle",
            get: function get() {
                return this.context.getDefaultStyle(this.constructor.displayName);
            }
        }]);

        return StyleContainer;
    }(Content), _class.childContextTypes = Object.assign({
        inheritedStyle: _react.PropTypes.object
    }, Content.childContextTypes), _class.contextTypes = Object.assign({
        inheritedStyle: _react.PropTypes.object,
        getDefaultStyle: _react.PropTypes.func
    }, Content.contextTypes), _temp2;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztRQThJZ0I7O0FBOUloQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFYTs7Ozs7Ozs7Ozs7Ozs7ME1BQ1QsV0FBUyxFQUFDLFVBQVMsRUFBVCxFQUFhLFVBQVMsRUFBVDs7O2lCQURkOzswQ0FPUTtBQUNiLG1CQUFPO0FBQ1osd0JBQVEsSUFBUjthQURLLENBRGE7Ozs7aUNBTVo7QUFDRCxtQkFBTzs7O2dCQUFNLEtBQUssVUFBTCxFQUFOO2FBQVAsQ0FEQzs7Ozs7Ozs7OzZDQU9lO0FBQ2hCLGlCQUFLLE9BQUwsR0FEZ0I7Ozs7Ozs7Ozs7a0NBUWQ7QUFDUixnQkFBRyxLQUFLLE9BQUwsRUFBSCxFQUFrQjtBQUNSLHFCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQURRO2FBQWxCOzs7OzBDQUtnQjtBQUNoQixtQkFBTyxnQkFBTSxRQUFOLENBQWUsS0FBZixDQUFxQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQTVCLENBRGdCOzs7O3FDQUlMO0FBQ1gsbUJBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxDQURJOzs7O21DQUlDOzs7a0NBSUo7QUFDUixtQkFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7Ozt1Q0FRUyxNQUFLOzs7Ozs7Ozs7NkNBUTRCO2dCQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozs7eUNBUy9CLE9BQU07QUFDbkIsb0JBQVEsR0FBUixRQUFpQixNQUFNLFdBQU4sQ0FBa0IsV0FBbEIsY0FBakIsRUFEbUI7QUFFekIsaUJBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsS0FBNUIsRUFGeUI7O0FBSXpCLGdCQUFHLEtBQUsscUJBQUwsRUFBSCxFQUFnQztBQUMvQixxQkFBSyxxQkFBTCxHQUQrQjthQUFoQzs7Oztn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Q0FEd0M7Q0FBbEMiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXB1dGVkPXtjaGlsZHJlbjpbXSwgY29tcG9zZWQ6W119XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuXHRcdFx0cGFyZW50OiB0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8ZGl2Pnt0aGlzLmdldENvbnRlbnQoKX08L2Rpdj5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c3VhbGx5IE5vQ2hpbGQgY29udGVudCBzaG91bGQgYmUgY29tcG9zZWQgYWNjb3JkaW5nIHRvIG5leHRBdmFpbGFibGVTcGFjZSxcbiAgICAgKiBhbmQgdGhlbiBhcHBlbmQgdG8gaXRzZWxmLmNvbXBvc2VkW10gYW5kIHBhcmVudC5hcHBlbmRDb21wb3NlZFxuICAgICAqL1xuXHRjb21wb3NlKCl7XG5cdFx0aWYodGhpcy5pc0VtcHR5KCkpe1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgICAgIH1cbiAgICB9XG5cblx0Z2V0Q29udGVudENvdW50KCl7XG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pXG5cdH1cblxuXHRnZXRDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0fVxuXG4gICAgZ2V0U3R5bGUoKXtcblxuICAgIH1cblxuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PTBcblx0fVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcbiAgICAgICAgY29uc29sZS5sb2coYGEgJHtjaGlsZC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZX0gY29tcG9zZWRgKVxuXHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcblxuXHRcdGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cbiAgICBpc0FsbENoaWxkcmVuQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBsZXQgY29tcG9zZWQ9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlPXRoaXMuZGVmYXVsdFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxuXG4gICAgICAgICAgICBpZighZGlyZWN0U3R5bGUpXG5cdFx0XHRcdGRlYnVnZ2VyO1xuXG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdFx0XHRpbmhlcml0ZWRTdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHY9ZGlyZWN0U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5oZXJpdGVkU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9KVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcblx0XHR9LENvbnRlbnQuY29udGV4dFR5cGVzKVxuXG4gICAgICAgIHN0eWxlKGtleSl7XG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGU9dGhpcy5kZWZhdWx0U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICBsZXQgdmFsdWU9ZGlyZWN0U3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIGlmKHZhbHVlPT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdmFsdWU9aW5oZXJpdGVkU3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGRlZmF1bHRTdHlsZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUodGhpcy5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSlcbiAgICAgICAgfVxuXHR9XG59XG4iXX0=