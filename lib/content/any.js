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
                },
                isComposingLastChildInParent: function isComposingLastChildInParent() {
                    return self.computed.children.length == self.getContentCount() - 1;
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
    prevSibling: _react.PropTypes.func,
    isComposingLastChildInParent: _react.PropTypes.func
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
    prevSibling: _react.PropTypes.func,
    isComposingLastChildInParent: _react.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6WyJzdHlsZUluaGVyaXRhYmxlIiwiSGFzQ2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiY29tcG9zZWQiLCJzZWxmIiwicGFyZW50IiwicHJldlNpYmxpbmciLCJtZSIsInNpYmxpbmdzIiwiZm91bmQiLCJpbmRleE9mIiwibGVuZ3RoIiwiaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCIsImdldENvbnRlbnRDb3VudCIsImdldENvbnRlbnQiLCJjb21wb3NlIiwiaXNFbXB0eSIsImNvbnRleHQiLCJvbjFDaGlsZENvbXBvc2VkIiwiQ2hpbGRyZW4iLCJjb3VudCIsInByb3BzIiwibGluZSIsInJlcXVpcmVkIiwid2lkdGgiLCJoZWlnaHQiLCJjaGlsZCIsInB1c2giLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJvbkFsbENoaWxkcmVuQ29tcG9zZWQiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJIYXNQYXJlbnRBbmRDaGlsZCIsImF2YWlsYWJsZVNwYWNlIiwibmV4dEF2YWlsYWJsZVNwYWNlIiwiYXJndW1lbnRzIiwiYXBwZW5kQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIk5vQ2hpbGQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJDb250ZW50IiwiZGlyZWN0U3R5bGUiLCJkZWZhdWx0U3R5bGUiLCJpbmhlcml0ZWRTdHlsZSIsImdldCIsInBhdGgiLCJ2IiwidW5kZWZpbmVkIiwia2V5IiwidmFsdWUiLCJnZXREZWZhdWx0U3R5bGUiLCJjb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOEpnQkEsZ0IsR0FBQUEsZ0I7O0FBOUpoQjs7OztBQUNBOzs7Ozs7SUFFYUMsUSxXQUFBQSxROzs7Ozs7Ozs7Ozs7OztvTkFDVEMsUSxHQUFXLEVBQUVDLFVBQVUsRUFB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O0FBQUEsa0NBOEJVRSxHQTlCVixFQThCZTtBQUFBLDBDQUNtQyxLQUFLN0IsS0FEeEMsQ0FDQXNCLFdBREE7QUFBQSxvQkFDQUEsV0FEQSx1Q0FDYyxLQUFLQyxZQURuQjtBQUFBLG9CQUVBQyxjQUZBLEdBRWtCLEtBQUs1QixPQUZ2QixDQUVBNEIsY0FGQTs7QUFHUCxvQkFBSU0sUUFBUVIsWUFBWUcsR0FBWixDQUFnQkksR0FBaEIsQ0FBWjtBQUNBLG9CQUFJQyxTQUFTRixTQUFiLEVBQ0lFLFFBQVFOLGVBQWVDLEdBQWYsQ0FBbUJJLEdBQW5CLENBQVI7QUFDSix1QkFBT0MsS0FBUDtBQUNIO0FBckNMO0FBQUE7QUFBQSxnQ0F1Q3VCO0FBQ2YsdUJBQU8sS0FBS2xDLE9BQUwsQ0FBYW1DLGVBQWIsQ0FBNkIsS0FBS0MsV0FBTCxDQUFpQmYsV0FBOUMsQ0FBUDtBQUNIO0FBekNMO0FBQUE7QUFBQSxNQUFvQ0ksT0FBcEMsVUFDV1osaUJBRFgsR0FDK0Isc0JBQWM7QUFDckNlLHdCQUFnQixpQkFBVWQ7QUFEVyxLQUFkLEVBRXhCVyxRQUFRWixpQkFGZ0IsQ0FEL0IsU0F5QldTLFlBekJYLEdBeUIwQixzQkFBYztBQUNoQ00sd0JBQWdCLGlCQUFVZCxNQURNO0FBRWhDcUIseUJBQWlCLGlCQUFVcEI7QUFGSyxLQUFkLEVBR25CVSxRQUFRSCxZQUhXLENBekIxQjtBQTJDSCIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29tcHV0ZWQgPSB7IGNoaWxkcmVuOiBbXSwgY29tcG9zZWQ6IFtdIH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgICAgICxwcmV2U2libGluZzogUHJvcFR5cGVzLmZ1bmNcblx0XHQsaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudDogUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgcHJldlNpYmxpbmcobWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7Y2hpbGRyZW46IHNpYmxpbmdzfSA9IHNlbGYuY29tcHV0ZWRcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBzaWJsaW5ncy5pbmRleE9mKG1lKVxuICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSAtMSkgey8vbm90IGZvdW5kLCBjdXJyZW50IHNob3VsZCBub3QgYmUgY29tcG9zZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmdzW3NpYmxpbmdzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmdzW2ZvdW5kIC0gMV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cdFx0XHQsaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCgpe1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PXNlbGYuZ2V0Q29udGVudENvdW50KCktMVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXHRcdHJldHVybiA8ZGl2Pnt0aGlzLmdldENvbnRlbnQoKX08L2Rpdj5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cbiAgICBjb21wb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudENvdW50KCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuXG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCkgPT0gMFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSkge1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcblxuICAgICAgICBpZiAodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKSA9PSB0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aFxuICAgIH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpIHtcbiAgICB9XG5cbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZCB7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lID0gXCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHByZXZTaWJsaW5nOiBQcm9wVHlwZXMuZnVuY1xuXHRcdCxpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50OiBQcm9wVHlwZXMuZnVuY1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdLCBbZ3JlZWR5KHRleHQpPXRydWVdLCBbd29yZHkodGV4dCk9dHJ1ZV19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZSA9IHRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICAgICAgc3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jb21wdXRlZC5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvc2UoKSB7XG4gICAgICAgIGxldCBjb21wb3NlZCA9IHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KClcblxuICAgICAgICBjb25zdCB7cGFyZW50fSA9IHRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpIHtcbiAgICByZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50IHtcbiAgICAgICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgICAgICB9LCBDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgICAgIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHtkaXJlY3RTdHlsZSA9IHRoaXMuZGVmYXVsdFN0eWxlfSA9IHRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX0gPSB0aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgaWYgKCFkaXJlY3RTdHlsZSlcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcblxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSwge1xuICAgICAgICAgICAgICAgIGluaGVyaXRlZFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldChwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IGRpcmVjdFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmhlcml0ZWRTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgaW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG4gICAgICAgIH0sIENvbnRlbnQuY29udGV4dFR5cGVzKVxuXG4gICAgICAgIHN0eWxlKGtleSkge1xuICAgICAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlID0gdGhpcy5kZWZhdWx0U3R5bGV9ID0gdGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2luaGVyaXRlZFN0eWxlfSA9IHRoaXMuY29udGV4dFxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZGlyZWN0U3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpbmhlcml0ZWRTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZGVmYXVsdFN0eWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUodGhpcy5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSlcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==