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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6WyJzdHlsZUluaGVyaXRhYmxlIiwiSGFzQ2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiY29tcG9zZWQiLCJzZWxmIiwicGFyZW50IiwicHJldlNpYmxpbmciLCJtZSIsInNpYmxpbmdzIiwiZm91bmQiLCJpbmRleE9mIiwibGVuZ3RoIiwiaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCIsImdldENvbnRlbnRDb3VudCIsImdldENvbnRlbnQiLCJjb21wb3NlIiwiaXNFbXB0eSIsImNvbnRleHQiLCJvbjFDaGlsZENvbXBvc2VkIiwiQ2hpbGRyZW4iLCJjb3VudCIsInByb3BzIiwibGluZSIsInJlcXVpcmVkIiwid2lkdGgiLCJoZWlnaHQiLCJjaGlsZCIsInB1c2giLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJvbkFsbENoaWxkcmVuQ29tcG9zZWQiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJIYXNQYXJlbnRBbmRDaGlsZCIsImF2YWlsYWJsZVNwYWNlIiwibmV4dEF2YWlsYWJsZVNwYWNlIiwiYXJndW1lbnRzIiwiYXBwZW5kQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIk5vQ2hpbGQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJDb250ZW50IiwiZGlyZWN0U3R5bGUiLCJkZWZhdWx0U3R5bGUiLCJpbmhlcml0ZWRTdHlsZSIsImdldCIsInBhdGgiLCJ2IiwidW5kZWZpbmVkIiwia2V5IiwidmFsdWUiLCJnZXREZWZhdWx0U3R5bGUiLCJjb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOEpnQkEsZ0IsR0FBQUEsZ0I7O0FBOUpoQjs7OztBQUNBOzs7Ozs7SUFFYUMsUSxXQUFBQSxROzs7Ozs7Ozs7Ozs7OztvTkFDVEMsUSxHQUFXLEVBQUVDLFVBQVUsRUFB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O0FBQUEsa0NBOEJVRSxHQTlCVixFQThCZTtBQUFBLDBDQUNtQyxLQUFLN0IsS0FEeEMsQ0FDQXNCLFdBREE7QUFBQSxvQkFDQUEsV0FEQSx1Q0FDYyxLQUFLQyxZQURuQjtBQUFBLG9CQUVBQyxjQUZBLEdBRWtCLEtBQUs1QixPQUZ2QixDQUVBNEIsY0FGQTs7QUFHUCxvQkFBSU0sUUFBUVIsWUFBWUcsR0FBWixDQUFnQkksR0FBaEIsQ0FBWjtBQUNBLG9CQUFJQyxTQUFTRixTQUFiLEVBQ0lFLFFBQVFOLGVBQWVDLEdBQWYsQ0FBbUJJLEdBQW5CLENBQVI7QUFDSix1QkFBT0MsS0FBUDtBQUNIO0FBckNMO0FBQUE7QUFBQSxnQ0F1Q3VCO0FBQ2YsdUJBQU8sS0FBS2xDLE9BQUwsQ0FBYW1DLGVBQWIsQ0FBNkIsS0FBS0MsV0FBTCxDQUFpQmYsV0FBOUMsQ0FBUDtBQUNIO0FBekNMO0FBQUE7QUFBQSxNQUFvQ0ksT0FBcEMsVUFDV1osaUJBRFgsR0FDK0Isc0JBQWM7QUFDckNlLHdCQUFnQixpQkFBVWQ7QUFEVyxLQUFkLEVBRXhCVyxRQUFRWixpQkFGZ0IsQ0FEL0IsU0F5QldTLFlBekJYLEdBeUIwQixzQkFBYztBQUNoQ00sd0JBQWdCLGlCQUFVZCxNQURNO0FBRWhDcUIseUJBQWlCLGlCQUFVcEI7QUFGSyxLQUFkLEVBR25CVSxRQUFRSCxZQUhXLENBekIxQjtBQTJDSCIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb21wdXRlZCA9IHsgY2hpbGRyZW46IFtdLCBjb21wb3NlZDogW10gfVxyXG5cclxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IHtcclxuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcclxuICAgICAgICAscHJldlNpYmxpbmc6IFByb3BUeXBlcy5mdW5jXHJcblx0XHQsaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudDogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGlsZENvbnRleHQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGFyZW50OiB0aGlzLFxyXG4gICAgICAgICAgICBwcmV2U2libGluZyhtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge2NoaWxkcmVuOiBzaWJsaW5nc30gPSBzZWxmLmNvbXB1dGVkXHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBzaWJsaW5ncy5pbmRleE9mKG1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IC0xKSB7Ly9ub3QgZm91bmQsIGN1cnJlbnQgc2hvdWxkIG5vdCBiZSBjb21wb3NlZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2libGluZ3NbZm91bmQgLSAxXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdCxpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblx0XHRyZXR1cm4gPGRpdj57dGhpcy5nZXRDb250ZW50KCl9PC9kaXY+XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9zZSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1c3VhbGx5IE5vQ2hpbGQgY29udGVudCBzaG91bGQgYmUgY29tcG9zZWQgYWNjb3JkaW5nIHRvIG5leHRBdmFpbGFibGVTcGFjZSxcclxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXHJcbiAgICAgKi9cclxuICAgIGNvbXBvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDb250ZW50Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0eWxlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpID09IDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcclxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcclxuICAgICAqL1xyXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcclxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cclxuICAgICAqL1xyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pIHtcclxuXHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXHJcblx0ICogIHJldHVyblxyXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxyXG5cdCAqL1xyXG4gICAgb24xQ2hpbGRDb21wb3NlZChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0FsbENoaWxkcmVuQ29tcG9zZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCkgPT0gdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxkIHtcclxuICAgIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiY29udGVudFwiXHJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xyXG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBwcmV2U2libGluZzogUHJvcFR5cGVzLmZ1bmNcclxuXHRcdCxpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50OiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXHJcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF0sIFtncmVlZHkodGV4dCk9dHJ1ZV0sIFt3b3JkeSh0ZXh0KT10cnVlXX1cclxuICAgICAqL1xyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlID0gdGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxyXG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxyXG4gICAgICovXHJcbiAgICBhcHBlbmRDb21wb3NlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcbiAgICB9XHJcblxyXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgICAgIHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jb21wdXRlZC5jaGlsZHJlbikvL25vIGNoaWxkcmVuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9zZSgpIHtcclxuICAgICAgICBsZXQgY29tcG9zZWQgPSB0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpXHJcblxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9ID0gdGhpcy5jb250ZXh0XHJcbiAgICAgICAgdGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKGNvbXBvc2VkKVxyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcclxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVJbmhlcml0YWJsZShDb250ZW50KSB7XHJcbiAgICByZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50IHtcclxuICAgICAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgaW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuICAgICAgICB9LCBDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuICAgICAgICBnZXRDaGlsZENvbnRleHQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtkaXJlY3RTdHlsZSA9IHRoaXMuZGVmYXVsdFN0eWxlfSA9IHRoaXMucHJvcHNcclxuICAgICAgICAgICAgY29uc3Qge2luaGVyaXRlZFN0eWxlfSA9IHRoaXMuY29udGV4dFxyXG5cclxuICAgICAgICAgICAgaWYgKCFkaXJlY3RTdHlsZSlcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLCB7XHJcbiAgICAgICAgICAgICAgICBpbmhlcml0ZWRTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZGlyZWN0U3R5bGUuZ2V0KHBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmhlcml0ZWRTdHlsZS5nZXQocGF0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgY29udGV4dFR5cGVzID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgIGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXHJcbiAgICAgICAgfSwgQ29udGVudC5jb250ZXh0VHlwZXMpXHJcblxyXG4gICAgICAgIHN0eWxlKGtleSkge1xyXG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGUgPSB0aGlzLmRlZmF1bHRTdHlsZX0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX0gPSB0aGlzLmNvbnRleHRcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZGlyZWN0U3R5bGUuZ2V0KGtleSlcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gaW5oZXJpdGVkU3R5bGUuZ2V0KGtleSlcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgZGVmYXVsdFN0eWxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldERlZmF1bHRTdHlsZSh0aGlzLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=