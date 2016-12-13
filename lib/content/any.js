"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoChild = exports.HasChild = undefined;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6WyJIYXNDaGlsZCIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJjb21wb3NlZCIsInNlbGYiLCJwYXJlbnQiLCJwcmV2U2libGluZyIsIm1lIiwic2libGluZ3MiLCJmb3VuZCIsImluZGV4T2YiLCJsZW5ndGgiLCJnZXRDb250ZW50IiwiY29tcG9zZSIsImlzRW1wdHkiLCJjb250ZXh0Iiwib24xQ2hpbGRDb21wb3NlZCIsIkNoaWxkcmVuIiwiY291bnQiLCJwcm9wcyIsInN0eWxlIiwiZ2V0Q29udGVudENvdW50IiwibGluZSIsInJlcXVpcmVkIiwid2lkdGgiLCJoZWlnaHQiLCJjaGlsZCIsInB1c2giLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJvbkFsbENoaWxkcmVuQ29tcG9zZWQiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJIYXNQYXJlbnRBbmRDaGlsZCIsImF2YWlsYWJsZVNwYWNlIiwibmV4dEF2YWlsYWJsZVNwYWNlIiwiYXJndW1lbnRzIiwiYXBwZW5kQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIk5vQ2hpbGQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRWFBLFEsV0FBQUEsUTs7Ozs7Ozs7Ozs7Ozs7b05BQ1RDLFEsR0FBVyxFQUFFQyxVQUFVLEVBQVosRUFBZ0JDLFVBQVUsRUFBMUIsRTs7Ozs7MENBT087QUFDZCxnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsbUJBQU87QUFDSEMsd0JBQVEsSUFETDtBQUVIQywyQkFGRyx1QkFFU0MsRUFGVCxFQUVhO0FBQUEsd0JBQ0tDLFFBREwsR0FDaUJKLEtBQUtILFFBRHRCLENBQ0xDLFFBREs7O0FBRVosd0JBQUlPLFFBQVFELFNBQVNFLE9BQVQsQ0FBaUJILEVBQWpC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QixRQUE1QjtBQUNBRSxtQkFBT2dDLGNBQVAsQ0FBc0JsQyxRQUF0QjtBQUNBRSxtQkFBT1csZ0JBQVAsQ0FBd0IsSUFBeEI7QUFDSDs7O0VBakJ3QmlCLGlCIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb21wdXRlZCA9IHsgY2hpbGRyZW46IFtdLCBjb21wb3NlZDogW10gfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICAgICAgLHByZXZTaWJsaW5nOiBQcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgICAgICAgICBwcmV2U2libGluZyhtZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtjaGlsZHJlbjogc2libGluZ3N9ID0gc2VsZi5jb21wdXRlZFxuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IHNpYmxpbmdzLmluZGV4T2YobWUpXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IC0xKSB7Ly9ub3QgZm91bmQsIGN1cnJlbnQgc2hvdWxkIG5vdCBiZSBjb21wb3NlZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2libGluZ3Nbc2libGluZ3MubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2libGluZ3NbZm91bmQgLSAxXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblx0XHRyZXR1cm4gPGRpdj57dGhpcy5nZXRDb250ZW50KCl9PC9kaXY+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG4gICAgY29tcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc3R5bGVcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKSA9PSAwXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9KSB7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXG4gICAgICAgIGlmICh0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0FsbENoaWxkcmVuQ29tcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpID09IHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoXG4gICAgfVxuXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCkge1xuICAgIH1cblxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcykge1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxkIHtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWUgPSBcImNvbnRlbnRcIlxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgcHJldlNpYmxpbmc6IFByb3BUeXBlcy5mdW5jXG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF0sIFtncmVlZHkodGV4dCk9dHJ1ZV0sIFt3b3JkeSh0ZXh0KT10cnVlXX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlID0gdGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29tcG9zZSgpIHtcbiAgICAgICAgbGV0IGNvbXBvc2VkID0gdGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9ID0gdGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cbn1cbiJdfQ==