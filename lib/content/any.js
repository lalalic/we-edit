"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoChild = exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, HasChild);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HasChild.__proto__ || Object.getPrototypeOf(HasChild)).call.apply(_ref, [this].concat(args))), _this), _this.computed = { children: [], composed: [] }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(HasChild, [{
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
        value: function getStyle() {
            return this.props.style;
        }
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
    _inherits(HasParentAndChild, _HasChild);

    function HasParentAndChild() {
        _classCallCheck(this, HasParentAndChild);

        return _possibleConstructorReturn(this, (HasParentAndChild.__proto__ || Object.getPrototypeOf(HasParentAndChild)).apply(this, arguments));
    }

    _createClass(HasParentAndChild, [{
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
            _get(HasParentAndChild.prototype.__proto__ || Object.getPrototypeOf(HasParentAndChild.prototype), "onAllChildrenComposed", this).call(this);
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
    _inherits(NoChild, _HasParentAndChild);

    function NoChild() {
        _classCallCheck(this, NoChild);

        var _this3 = _possibleConstructorReturn(this, (NoChild.__proto__ || Object.getPrototypeOf(NoChild)).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6WyJIYXNDaGlsZCIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJjb21wb3NlZCIsInNlbGYiLCJwYXJlbnQiLCJwcmV2U2libGluZyIsIm1lIiwic2libGluZ3MiLCJmb3VuZCIsImluZGV4T2YiLCJsZW5ndGgiLCJnZXRDb250ZW50IiwiY29tcG9zZSIsImlzRW1wdHkiLCJjb250ZXh0Iiwib24xQ2hpbGRDb21wb3NlZCIsIkNoaWxkcmVuIiwiY291bnQiLCJwcm9wcyIsInN0eWxlIiwiZ2V0Q29udGVudENvdW50IiwibGluZSIsInJlcXVpcmVkIiwid2lkdGgiLCJoZWlnaHQiLCJjaGlsZCIsInB1c2giLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJvbkFsbENoaWxkcmVuQ29tcG9zZWQiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJIYXNQYXJlbnRBbmRDaGlsZCIsImF2YWlsYWJsZVNwYWNlIiwibmV4dEF2YWlsYWJsZVNwYWNlIiwiYXJndW1lbnRzIiwiYXBwZW5kQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIk5vQ2hpbGQiLCJPYmplY3QiLCJmcmVlemUiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWFBLFEsV0FBQUEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ1RDLFEsR0FBVyxFQUFFQyxVQUFVLEVBQVosRUFBZ0JDLFVBQVUsRUFBMUIsRTs7Ozs7MENBT087QUFDZCxnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsbUJBQU87QUFDSEMsd0JBQVEsSUFETDtBQUVIQywyQkFGRyx1QkFFU0MsRUFGVCxFQUVhO0FBQUEsd0JBQ0tDLFFBREwsR0FDaUJKLEtBQUtILFFBRHRCLENBQ0xDLFFBREs7O0FBRVosd0JBQUlPLFFBQVFELFNBQVNFLE9BQVQsQ0FBaUJILEVBQWpC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QixJQUF2QixDQUE0QnhCLFFBQTVCO0FBQ0FFLG1CQUFPZ0MsY0FBUCxDQUFzQmxDLFFBQXRCO0FBQ0FFLG1CQUFPVyxnQkFBUCxDQUF3QixJQUF4QjtBQUNIOzs7O0VBakJ3QmlCLGlCIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbXB1dGVkID0geyBjaGlsZHJlbjogW10sIGNvbXBvc2VkOiBbXSB9XHJcblxyXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgICAgICxwcmV2U2libGluZzogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGlsZENvbnRleHQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGFyZW50OiB0aGlzLFxyXG4gICAgICAgICAgICBwcmV2U2libGluZyhtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge2NoaWxkcmVuOiBzaWJsaW5nc30gPSBzZWxmLmNvbXB1dGVkXHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBzaWJsaW5ncy5pbmRleE9mKG1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IC0xKSB7Ly9ub3QgZm91bmQsIGN1cnJlbnQgc2hvdWxkIG5vdCBiZSBjb21wb3NlZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2libGluZ3NbZm91bmQgLSAxXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHRcdHJldHVybiA8ZGl2Pnt0aGlzLmdldENvbnRlbnQoKX08L2Rpdj5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb3NlKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxyXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcclxuICAgICAqL1xyXG4gICAgY29tcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENvbnRlbnRDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc3R5bGVcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpID09IDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcclxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcclxuICAgICAqL1xyXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcclxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cclxuICAgICAqL1xyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pIHtcclxuXHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXHJcblx0ICogIHJldHVyblxyXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxyXG5cdCAqL1xyXG4gICAgb24xQ2hpbGRDb21wb3NlZChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0FsbENoaWxkcmVuQ29tcG9zZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCkgPT0gdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxkIHtcclxuICAgIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiY29udGVudFwiXHJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xyXG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBwcmV2U2libGluZzogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxyXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdLCBbZ3JlZWR5KHRleHQpPXRydWVdLCBbd29yZHkodGV4dCk9dHJ1ZV19XHJcbiAgICAgKi9cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZSA9IHRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcclxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcclxuICAgICAqL1xyXG4gICAgYXBwZW5kQ29tcG9zZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvc2UoKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvc2VkID0gdGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxyXG5cclxuICAgICAgICBjb25zdCB7cGFyZW50fSA9IHRoaXMuY29udGV4dFxyXG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChjb21wb3NlZClcclxuICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29tcG9zZWQpXHJcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxufVxyXG4iXX0=