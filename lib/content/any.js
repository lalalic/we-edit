"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoChild = exports.HasChild = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isToggleStyle = isToggleStyle;
exports.styleInheritable = styleInheritable;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { content: _react2.default.Children.toArray(_this.props.children), style: _this.props.style }, _this.children = [], _this.composed = [], _temp), _possibleConstructorReturn(_this, _ret);
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
            var _props = this.props;
            var children = _props.children;

            var others = _objectWithoutProperties(_props, ["children"]);

            var content = this.state.content;

            return _react2.default.createElement(
                "div",
                null,
                content
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
            if (this.state.content.length == 0) this.context.parent.on1ChildComposed(this);
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
            this.children.push(child);
            if (this.isAllChildrenComposed()) {
                this.onAllChildrenComposed();
            }
        }
    }, {
        key: "isAllChildrenComposed",
        value: function isAllChildrenComposed() {
            return this.state.content.length == this.children.length;
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
        var _Object$getPrototypeO2;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, HasParentAndChild);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(HasParentAndChild)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.displayName = "content", _temp2), _possibleConstructorReturn(_this2, _ret2);
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

HasParentAndChild.contextTypes = {
    parent: _react.PropTypes.object
};
exports.default = HasParentAndChild;

var NoChild = exports.NoChild = function (_HasParentAndChild) {
    _inherits(NoChild, _HasParentAndChild);

    function NoChild() {
        _classCallCheck(this, NoChild);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(NoChild).apply(this, arguments));

        Object.assign(_this3.state, { content: _this3.props.children });
        Object.freeze(_this3.children); //no children
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
            var composed = this.createComposedPiece();

            var parent = this.context.parent;

            this.composed.push(composed);
            parent.appendComposed(composed);
            parent.on1ChildComposed(this);
        }

        /***
         * after figure out props, you'd better call this to create Element
         */

    }, {
        key: "createComposedPiece",
        value: function createComposedPiece(props) {
            return null;
        }
    }]);

    return NoChild;
}(HasParentAndChild);

var TOGGLES = 'b,i,vanish'.split(',');

function isToggleStyle(stylePath) {
    var _stylePath$split = stylePath.split('.');

    var _stylePath$split2 = _slicedToArray(_stylePath$split, 2);

    var inline = _stylePath$split2[0];
    var key = _stylePath$split2[1];

    if (inline != 'inline') return false;
    return TOGGLES.indexOf(key) != -1;
}

function styleInheritable(Content) {
    var _class, _temp3;

    return _temp3 = _class = function (_Content) {
        _inherits(StyleContainer, _Content);

        function StyleContainer() {
            _classCallCheck(this, StyleContainer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(StyleContainer).apply(this, arguments));
        }

        _createClass(StyleContainer, [{
            key: "getChildContext",
            value: function getChildContext() {
                var contentStyle = this.props.contentStyle;
                var containerStyle = this.context.containerStyle;


                return Object.assign(_get(Object.getPrototypeOf(StyleContainer.prototype), "getChildContext", this).call(this), {
                    containerStyle: {
                        get: function get(path) {
                            var v = contentStyle.get(path);
                            if (v == undefined) return containerStyle.get(path);else if (isToggleStyle(path) && v == -1) {
                                var toggles = containerStyle.get(path);
                                if (typeof toggles == 'number') {
                                    if (toggles < 0) v = toggles - 1;else v = toggles;
                                }
                            }
                            return v;
                        }
                    }
                });
            }
        }, {
            key: "style",
            value: function style(key) {
                var contentStyle = this.props.contentStyle;
                var containerStyle = this.context.containerStyle;

                var value = contentStyle.get(key);
                if (value == undefined) value = containerStyle.get(key);
                return value;
            }
        }]);

        return StyleContainer;
    }(Content), _class.childContextTypes = Object.assign({
        containerStyle: _react.PropTypes.object
    }, Content.childContextTypes), _class.contextTypes = Object.assign({
        createStyle: _react.PropTypes.func,
        containerStyle: _react.PropTypes.object
    }, Content.contextTypes), _temp3;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBMElnQjtRQU9BOztBQWpKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFYTs7Ozs7Ozs7Ozs7Ozs7ME1BQ1QsUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQixFQUFxRCxPQUFNLE1BQUssS0FBTCxDQUFXLEtBQVgsVUFDckUsV0FBUyxVQUNOLFdBQVM7OztpQkFIQTs7MENBU1E7QUFDYixtQkFBTztBQUNaLHdCQUFRLElBQVI7YUFESyxDQURhOzs7O2lDQU1aO3lCQUNxQixLQUFLLEtBQUwsQ0FEckI7Z0JBQ0EsMkJBREE7O2dCQUNhLHdEQURiOztnQkFFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsbUJBQU87OztnQkFBTSxPQUFOO2FBQVAsQ0FIQzs7Ozs7Ozs7OzZDQVNlO0FBQ2hCLGlCQUFLLE9BQUwsR0FEZ0I7Ozs7Ozs7Ozs7a0NBUWQ7QUFDUixnQkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLElBQTJCLENBQTNCLEVBQ0YsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFERDs7Ozs7Ozs7Ozt1Q0FRaUIsTUFBSzs7Ozs7Ozs7OzZDQVE0QjtnQkFBN0IsaUVBQVMsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsa0JBQVU7Ozs7Ozs7Ozs7O3lDQVMvQixPQUFNO0FBQ3pCLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRHlCO0FBRXpCLGdCQUFHLEtBQUsscUJBQUwsRUFBSCxFQUFnQztBQUMvQixxQkFBSyxxQkFBTCxHQUQrQjthQUFoQzs7OztnREFLeUI7QUFDbkIsbUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FB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QUFLLE9BQUwsQ0FBaEIsZUFGRDs7QUFHTixvQkFBSSxRQUFNLGFBQWEsR0FBYixDQUFpQixHQUFqQixDQUFOLENBSEU7QUFJTixvQkFBRyxTQUFPLFNBQVAsRUFDQyxRQUFNLGVBQWUsR0FBZixDQUFtQixHQUFuQixDQUFOLENBREo7QUFFQSx1QkFBTyxLQUFQLENBTk07Ozs7ZUFuQ0o7TUFBdUIsaUJBQzVCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNyQyx3QkFBZ0IsaUJBQVUsTUFBVjtLQURPLEVBRXRCLFFBQVEsaUJBQVIsVUEyQkksZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxxQkFBYSxpQkFBVSxJQUFWO0FBQ0osd0JBQWdCLGlCQUFVLE1BQVY7S0FGTixFQUdsQixRQUFRLFlBQVIsU0FqQ0gsQ0FEd0M7Q0FBbEMiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtjb250ZW50OlJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHN0eWxlOnRoaXMucHJvcHMuc3R5bGV9XG5cdGNoaWxkcmVuPVtdXG4gICAgY29tcG9zZWQ9W11cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG5cdFx0XHRwYXJlbnQ6IHRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2Pntjb250ZW50fTwvZGl2PlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT0wKVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcblx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuICAgIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aD09dGhpcy5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cblx0fVxuXHRcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbn0pXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgbGV0IGNvbXBvc2VkPXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBhZnRlciBmaWd1cmUgb3V0IHByb3BzLCB5b3UnZCBiZXR0ZXIgY2FsbCB0aGlzIHRvIGNyZWF0ZSBFbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuXG5jb25zdCBUT0dHTEVTPSdiLGksdmFuaXNoJy5zcGxpdCgnLCcpXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RvZ2dsZVN0eWxlKHN0eWxlUGF0aCl7XG5cdGxldCBbaW5saW5lLGtleV09c3R5bGVQYXRoLnNwbGl0KCcuJylcblx0aWYoaW5saW5lIT0naW5saW5lJylcblx0XHRyZXR1cm4gZmFsc2Vcblx0cmV0dXJuIFRPR0dMRVMuaW5kZXhPZihrZXkpIT0tMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVJbmhlcml0YWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIFN0eWxlQ29udGFpbmVyIGV4dGVuZHMgQ29udGVudHtcblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRcdGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdFx0XHR9LENvbnRlbnQuY2hpbGRDb250ZXh0VHlwZXMpXG5cblx0XHRnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdFx0XHRjb250YWluZXJTdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHY9Y29udGVudFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHY9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lclN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaXNUb2dnbGVTdHlsZShwYXRoKSAmJiB2PT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2dnbGVzPWNvbnRhaW5lclN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YodG9nZ2xlcyk9PSdudW1iZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvZ2dsZXM8MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXMtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0Y3JlYXRlU3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHR9LENvbnRlbnQuY29udGV4dFR5cGVzKVxuXG4gICAgICAgIHN0eWxlKGtleSl7XG4gICAgICAgICAgICBjb25zdCB7Y29udGVudFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7Y29udGFpbmVyU3R5bGV9PXRoaXMuY29udGV4dFxuICAgICAgICAgICAgbGV0IHZhbHVlPWNvbnRlbnRTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgaWYodmFsdWU9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB2YWx1ZT1jb250YWluZXJTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cblx0fVxufVxuIl19