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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6WyJzdHlsZUluaGVyaXRhYmxlIiwiSGFzQ2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiY29tcG9zZWQiLCJzZWxmIiwicGFyZW50IiwicHJldlNpYmxpbmciLCJtZSIsInNpYmxpbmdzIiwiZm91bmQiLCJpbmRleE9mIiwibGVuZ3RoIiwiZ2V0Q29udGVudCIsImNvbXBvc2UiLCJpc0VtcHR5IiwiY29udGV4dCIsIm9uMUNoaWxkQ29tcG9zZWQiLCJDaGlsZHJlbiIsImNvdW50IiwicHJvcHMiLCJnZXRDb250ZW50Q291bnQiLCJsaW5lIiwicmVxdWlyZWQiLCJ3aWR0aCIsImhlaWdodCIsImNoaWxkIiwicHVzaCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIm9uQWxsQ2hpbGRyZW5Db21wb3NlZCIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIkhhc1BhcmVudEFuZENoaWxkIiwiYXZhaWxhYmxlU3BhY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJhcmd1bWVudHMiLCJhcHBlbmRDb21wb3NlZCIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwiTm9DaGlsZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIkNvbnRlbnQiLCJkaXJlY3RTdHlsZSIsImRlZmF1bHRTdHlsZSIsImluaGVyaXRlZFN0eWxlIiwiZ2V0IiwicGF0aCIsInYiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsImdldERlZmF1bHRTdHlsZSIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF5SmdCQSxnQixHQUFBQSxnQjs7QUF6SmhCOzs7O0FBQ0E7Ozs7OztJQUVhQyxRLFdBQUFBLFE7Ozs7Ozs7Ozs7Ozs7O29OQUNUQyxRLEdBQVcsRUFBRUMsVUFBVSxFQUFaLEVBQWdCQyxVQUFVLEVBQTFCLEU7Ozs7OzBDQU9P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QUFDQSxvQkFBSUMsU0FBU0YsU0FBYixFQUNJRSxRQUFRTixlQUFlQyxHQUFmLENBQW1CSSxHQUFuQixDQUFSO0FBQ0osdUJBQU9DLEtBQVA7QUFDSDtBQXJDTDtBQUFBO0FBQUEsZ0NBdUN1QjtBQUNmLHVCQUFPLEtBQUtuQyxPQUFMLENBQWFvQyxlQUFiLENBQTZCLEtBQUtDLFdBQUwsQ0FBaUJmLFdBQTlDLENBQVA7QUFDSDtBQXpDTDtBQUFBO0FBQUEsTUFBb0NJLE9BQXBDLFVBQ1daLGlCQURYLEdBQytCLHNCQUFjO0FBQ3JDZSx3QkFBZ0IsaUJBQVVkO0FBRFcsS0FBZCxFQUV4QlcsUUFBUVosaUJBRmdCLENBRC9CLFNBeUJXUyxZQXpCWCxHQXlCMEIsc0JBQWM7QUFDaENNLHdCQUFnQixpQkFBVWQsTUFETTtBQUVoQ3FCLHlCQUFpQixpQkFBVXBCO0FBRkssS0FBZCxFQUduQlUsUUFBUUgsWUFIVyxDQXpCMUI7QUEyQ0giLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbXB1dGVkID0geyBjaGlsZHJlbjogW10sIGNvbXBvc2VkOiBbXSB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgcHJldlNpYmxpbmc6IFByb3BUeXBlcy5mdW5jXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIHByZXZTaWJsaW5nKG1lKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2NoaWxkcmVuOiBzaWJsaW5nc30gPSBzZWxmLmNvbXB1dGVkXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gc2libGluZ3MuaW5kZXhPZihtZSlcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gLTEpIHsvL25vdCBmb3VuZCwgY3VycmVudCBzaG91bGQgbm90IGJlIGNvbXBvc2VkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWJsaW5nc1tmb3VuZCAtIDFdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXHRcdHJldHVybiA8ZGl2Pnt0aGlzLmdldENvbnRlbnQoKX08L2Rpdj5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cbiAgICBjb21wb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudENvdW50KCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuXG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCkgPT0gMFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSkge1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcblxuICAgICAgICBpZiAodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKSA9PSB0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aFxuICAgIH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpIHtcbiAgICB9XG5cbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZCB7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lID0gXCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHByZXZTaWJsaW5nOiBQcm9wVHlwZXMuZnVuY1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2UgPSB0aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgICAgIHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb21wb3NlKCkge1xuICAgICAgICBsZXQgY29tcG9zZWQgPSB0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH0gPSB0aGlzLmNvbnRleHRcbiAgICAgICAgdGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVJbmhlcml0YWJsZShDb250ZW50KSB7XG4gICAgcmV0dXJuIGNsYXNzIFN0eWxlQ29udGFpbmVyIGV4dGVuZHMgQ29udGVudCB7XG4gICAgICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgaW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICAgICAgfSwgQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgICAgICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGUgPSB0aGlzLmRlZmF1bHRTdHlsZX0gPSB0aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7aW5oZXJpdGVkU3R5bGV9ID0gdGhpcy5jb250ZXh0XG5cbiAgICAgICAgICAgIGlmICghZGlyZWN0U3R5bGUpXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XG5cblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCksIHtcbiAgICAgICAgICAgICAgICBpbmhlcml0ZWRTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBkaXJlY3RTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5oZXJpdGVkU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xuICAgICAgICB9LCBDb250ZW50LmNvbnRleHRUeXBlcylcblxuICAgICAgICBzdHlsZShrZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHtkaXJlY3RTdHlsZSA9IHRoaXMuZGVmYXVsdFN0eWxlfSA9IHRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX0gPSB0aGlzLmNvbnRleHRcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRpcmVjdFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gaW5oZXJpdGVkU3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGRlZmF1bHRTdHlsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKHRoaXMuY29uc3RydWN0b3IuZGlzcGxheU5hbWUpXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=