"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoChild = exports.HasChild = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.styleInheritable = styleInheritable;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasChild = exports.HasChild = function (_Component) {
    (0, _inherits3.default)(HasChild, _Component);

    function HasChild() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, HasChild);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HasChild.__proto__ || (0, _getPrototypeOf2.default)(HasChild)).call.apply(_ref, [this].concat(args))), _this), _this.computed = { children: [], composed: [] }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(HasChild, [{
        key: "getChildContext",
        value: function getChildContext() {
            var self = this;
            return {
                parent: this,
                prevSibling: function prevSibling(me) {
                    var siblings = self.computed.children;

                    var found = siblings.indexOf(me);
                    if (found == -1) {
                        //not found, current should not be composed
                        return siblings[siblings.length - 1];
                    } else {
                        return siblings[found - 1];
                    }
                }
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
            var required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { width: 0, height: 0 };
        }

        /**
         *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
         *  return
         *  	true: parent's all children composed
         */

    }, {
        key: "on1ChildComposed",
        value: function on1ChildComposed(child) {
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
    parent: _react.PropTypes.object,
    prevSibling: _react.PropTypes.func
};

var HasParentAndChild = function (_HasChild) {
    (0, _inherits3.default)(HasParentAndChild, _HasChild);

    function HasParentAndChild() {
        (0, _classCallCheck3.default)(this, HasParentAndChild);
        return (0, _possibleConstructorReturn3.default)(this, (HasParentAndChild.__proto__ || (0, _getPrototypeOf2.default)(HasParentAndChild)).apply(this, arguments));
    }

    (0, _createClass3.default)(HasParentAndChild, [{
        key: "nextAvailableSpace",

        /**
         * children should call before composing line,
         * return next line rect {*width, [height], [greedy(text)=true], [wordy(text)=true]}
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
            (0, _get3.default)(HasParentAndChild.prototype.__proto__ || (0, _getPrototypeOf2.default)(HasParentAndChild.prototype), "onAllChildrenComposed", this).call(this);
        }
    }]);
    return HasParentAndChild;
}(HasChild);

HasParentAndChild.displayName = "content";
HasParentAndChild.contextTypes = {
    parent: _react.PropTypes.object,
    prevSibling: _react.PropTypes.func
};
exports.default = HasParentAndChild;

var NoChild = exports.NoChild = function (_HasParentAndChild) {
    (0, _inherits3.default)(NoChild, _HasParentAndChild);

    function NoChild() {
        (0, _classCallCheck3.default)(this, NoChild);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (NoChild.__proto__ || (0, _getPrototypeOf2.default)(NoChild)).apply(this, arguments));

        (0, _freeze2.default)(_this3.computed.children); //no children
        return _this3;
    }

    (0, _createClass3.default)(NoChild, [{
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
        (0, _inherits3.default)(StyleContainer, _Content);

        function StyleContainer() {
            (0, _classCallCheck3.default)(this, StyleContainer);
            return (0, _possibleConstructorReturn3.default)(this, (StyleContainer.__proto__ || (0, _getPrototypeOf2.default)(StyleContainer)).apply(this, arguments));
        }

        (0, _createClass3.default)(StyleContainer, [{
            key: "getChildContext",
            value: function getChildContext() {
                var _props$directStyle = this.props.directStyle,
                    directStyle = _props$directStyle === undefined ? this.defaultStyle : _props$directStyle;
                var inheritedStyle = this.context.inheritedStyle;


                if (!directStyle) debugger;

                return (0, _assign2.default)((0, _get3.default)(StyleContainer.prototype.__proto__ || (0, _getPrototypeOf2.default)(StyleContainer.prototype), "getChildContext", this).call(this), {
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
                var _props$directStyle2 = this.props.directStyle,
                    directStyle = _props$directStyle2 === undefined ? this.defaultStyle : _props$directStyle2;
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
    }(Content), _class.childContextTypes = (0, _assign2.default)({
        inheritedStyle: _react.PropTypes.object
    }, Content.childContextTypes), _class.contextTypes = (0, _assign2.default)({
        inheritedStyle: _react.PropTypes.object,
        getDefaultStyle: _react.PropTypes.func
    }, Content.contextTypes), _temp2;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6WyJzdHlsZUluaGVyaXRhYmxlIiwiSGFzQ2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiY29tcG9zZWQiLCJzZWxmIiwicGFyZW50IiwicHJldlNpYmxpbmciLCJtZSIsInNpYmxpbmdzIiwiZm91bmQiLCJpbmRleE9mIiwibGVuZ3RoIiwiZ2V0Q29udGVudCIsImNvbXBvc2UiLCJpc0VtcHR5IiwiY29udGV4dCIsIm9uMUNoaWxkQ29tcG9zZWQiLCJDaGlsZHJlbiIsImNvdW50IiwicHJvcHMiLCJnZXRDb250ZW50Q291bnQiLCJsaW5lIiwicmVxdWlyZWQiLCJ3aWR0aCIsImhlaWdodCIsImNoaWxkIiwicHVzaCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIm9uQWxsQ2hpbGRyZW5Db21wb3NlZCIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIkhhc1BhcmVudEFuZENoaWxkIiwiYXZhaWxhYmxlU3BhY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJhcmd1bWVudHMiLCJhcHBlbmRDb21wb3NlZCIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwiTm9DaGlsZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIkNvbnRlbnQiLCJkaXJlY3RTdHlsZSIsImRlZmF1bHRTdHlsZSIsImluaGVyaXRlZFN0eWxlIiwiZ2V0IiwicGF0aCIsInYiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsImdldERlZmF1bHRTdHlsZSIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF5SmdCQSxnQixHQUFBQSxnQjs7QUF6SmhCOzs7O0FBQ0E7Ozs7OztJQUVhQyxRLFdBQUFBLFE7Ozs7Ozs7Ozs7Ozs7O29OQUNUQyxRLEdBQVcsRUFBRUMsVUFBVSxFQUFaLEVBQWdCQyxVQUFVLEVBQTFCLEU7Ozs7OzBDQU9P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QUFDQSxvQkFBSUMsU0FBU0YsU0FBYixFQUNJRSxRQUFRTixlQUFlQyxHQUFmLENBQW1CSSxHQUFuQixDQUFSO0FBQ0osdUJBQU9DLEtBQVA7QUFDSDtBQXJDTDtBQUFBO0FBQUEsZ0NBdUN1QjtBQUNmLHVCQUFPLEtBQUtuQyxPQUFMLENBQWFvQyxlQUFiLENBQTZCLEtBQUtDLFdBQUwsQ0FBaUJmLFdBQTlDLENBQVA7QUFDSDtBQXpDTDtBQUFBO0FBQUEsTUFBb0NJLE9BQXBDLFVBQ1daLGlCQURYLEdBQytCLHNCQUFjO0FBQ3JDZSx3QkFBZ0IsaUJBQVVkO0FBRFcsS0FBZCxFQUV4QlcsUUFBUVosaUJBRmdCLENBRC9CLFNBeUJXUyxZQXpCWCxHQXlCMEIsc0JBQWM7QUFDaENNLHdCQUFnQixpQkFBVWQsTUFETTtBQUVoQ3FCLHlCQUFpQixpQkFBVXBCO0FBRkssS0FBZCxFQUduQlUsUUFBUUgsWUFIVyxDQXpCMUI7QUEyQ0giLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29tcHV0ZWQgPSB7IGNoaWxkcmVuOiBbXSwgY29tcG9zZWQ6IFtdIH1cclxuXHJcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XHJcbiAgICAgICAgLHByZXZTaWJsaW5nOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoaWxkQ29udGV4dCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgIHByZXZTaWJsaW5nKG1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7Y2hpbGRyZW46IHNpYmxpbmdzfSA9IHNlbGYuY29tcHV0ZWRcclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IHNpYmxpbmdzLmluZGV4T2YobWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gLTEpIHsvL25vdCBmb3VuZCwgY3VycmVudCBzaG91bGQgbm90IGJlIGNvbXBvc2VkXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmdzW3NpYmxpbmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWJsaW5nc1tmb3VuZCAtIDFdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cdFx0cmV0dXJuIDxkaXY+e3RoaXMuZ2V0Q29udGVudCgpfTwvZGl2PlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXHJcbiAgICAgKiBhbmQgdGhlbiBhcHBlbmQgdG8gaXRzZWxmLmNvbXBvc2VkW10gYW5kIHBhcmVudC5hcHBlbmRDb21wb3NlZFxyXG4gICAgICovXHJcbiAgICBjb21wb3NlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29udGVudENvdW50KCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKVxyXG4gICAgfVxyXG5cclxuICAgIGdldENvbnRlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHlsZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKSA9PSAwXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XHJcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXHJcbiAgICAgKi9cclxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXHJcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XHJcbiAgICAgKi9cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9KSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxyXG5cdCAqICByZXR1cm5cclxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBhbGwgY2hpbGRyZW4gY29tcG9zZWRcclxuXHQgKi9cclxuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpIHtcclxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnB1c2goY2hpbGQpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpID09IHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcykge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZCB7XHJcbiAgICBzdGF0aWMgZGlzcGxheU5hbWUgPSBcImNvbnRlbnRcIlxyXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcclxuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgcHJldlNpYmxpbmc6IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcclxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XSwgW2dyZWVkeSh0ZXh0KT10cnVlXSwgW3dvcmR5KHRleHQpPXRydWVdfVxyXG4gICAgICovXHJcbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2UgPSB0aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XHJcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXHJcbiAgICAgKi9cclxuICAgIGFwcGVuZENvbXBvc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcclxuICAgIH1cclxuXHJcbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICAgICAgc3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICBjb21wb3NlKCkge1xyXG4gICAgICAgIGxldCBjb21wb3NlZCA9IHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KClcclxuXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH0gPSB0aGlzLmNvbnRleHRcclxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXHJcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxyXG4gICAgICAgIHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpIHtcclxuICAgIHJldHVybiBjbGFzcyBTdHlsZUNvbnRhaW5lciBleHRlbmRzIENvbnRlbnQge1xyXG4gICAgICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAgICBpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgICAgIH0sIENvbnRlbnQuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG4gICAgICAgIGdldENoaWxkQ29udGV4dCgpIHtcclxuICAgICAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlID0gdGhpcy5kZWZhdWx0U3R5bGV9ID0gdGhpcy5wcm9wc1xyXG4gICAgICAgICAgICBjb25zdCB7aW5oZXJpdGVkU3R5bGV9ID0gdGhpcy5jb250ZXh0XHJcblxyXG4gICAgICAgICAgICBpZiAoIWRpcmVjdFN0eWxlKVxyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCksIHtcclxuICAgICAgICAgICAgICAgIGluaGVyaXRlZFN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBkaXJlY3RTdHlsZS5nZXQocGF0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaGVyaXRlZFN0eWxlLmdldChwYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgaW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcclxuICAgICAgICB9LCBDb250ZW50LmNvbnRleHRUeXBlcylcclxuXHJcbiAgICAgICAgc3R5bGUoa2V5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtkaXJlY3RTdHlsZSA9IHRoaXMuZGVmYXVsdFN0eWxlfSA9IHRoaXMucHJvcHNcclxuICAgICAgICAgICAgY29uc3Qge2luaGVyaXRlZFN0eWxlfSA9IHRoaXMuY29udGV4dFxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBkaXJlY3RTdHlsZS5nZXQoa2V5KVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpbmhlcml0ZWRTdHlsZS5nZXQoa2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBkZWZhdWx0U3R5bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKHRoaXMuY29uc3RydWN0b3IuZGlzcGxheU5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==