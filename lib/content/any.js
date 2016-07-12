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
                _group2.default,
                this.props,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBc0lnQjtRQU9BOztBQTdJaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFYTs7Ozs7Ozs7Ozs7Ozs7ME1BQ1QsUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQixFQUFxRCxPQUFNLE1BQUssS0FBTCxDQUFXLEtBQVgsVUFDckUsV0FBUyxVQUNOLFdBQVM7OztpQkFIQTs7MENBU1E7QUFDYixtQkFBTztBQUNaLHdCQUFRLElBQVI7YUFESyxDQURhOzs7O2lDQU1aO3lCQUNxQixLQUFLLEtBQUwsQ0FEckI7Z0JBQ0EsMkJBREE7O2dCQUNhLHdEQURiOztnQkFFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsbUJBQU87O2dCQUFXLEtBQUssS0FBTDtnQkFBYSxPQUF4QjthQUFQLENBSEM7Ozs7Ozs7Ozs2Q0FTZTtBQUNoQixpQkFBSyxPQUFMLEdBRGdCOzs7Ozs7Ozs7O2tDQVFkO0FBQ1IsZ0JBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixDQUEzQixFQUNGLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBREQ7Ozs7Ozs7Ozs7dUNBUWlCLE1BQUs7Ozs7Ozs7Ozs2Q0FRNEI7Z0JBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7Ozt5Q0FTL0IsT0FBTTtBQUNuQixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQURtQjtBQUV6QixnQkFBRyxLQUFLLHFCQUFMLEVBQUgsRUFBZ0M7QUFDL0IscUJBQUsscUJBQUwsR0FEK0I7YUFBaEM7Ozs7Z0RBS3lCO0FBQ25CLG1CQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFB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LEtBQUssT0FBTCxDQUFoQixlQUZEOztBQUdOLG9CQUFJLFFBQU0sYUFBYSxHQUFiLENBQWlCLEdBQWpCLENBQU4sQ0FIRTtBQUlOLG9CQUFHLFNBQU8sU0FBUCxFQUNDLFFBQU0sZUFBZSxHQUFmLENBQW1CLEdBQW5CLENBQU4sQ0FESjtBQUVBLHVCQUFPLEtBQVAsQ0FOTTs7OztlQW5DSjtNQUF1QixpQkFDNUIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3JDLHdCQUFnQixpQkFBVSxNQUFWO0tBRE8sRUFFdEIsUUFBUSxpQkFBUixVQTJCSSxlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLHFCQUFhLGlCQUFVLElBQVY7QUFDSix3QkFBZ0IsaUJBQVUsTUFBVjtLQUZOLEVBR2xCLFFBQVEsWUFBUixTQWpDSCxDQUR3QztDQUFsQyIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2NvbnRlbnQ6UmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSwgc3R5bGU6dGhpcy5wcm9wcy5zdHlsZX1cblx0Y2hpbGRyZW49W11cbiAgICBjb21wb3NlZD1bXVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHBhcmVudDogdGhpc1xuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30+e2NvbnRlbnR9PC9Hcm91cD5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c3VhbGx5IE5vQ2hpbGQgY29udGVudCBzaG91bGQgYmUgY29tcG9zZWQgYWNjb3JkaW5nIHRvIG5leHRBdmFpbGFibGVTcGFjZSxcbiAgICAgKiBhbmQgdGhlbiBhcHBlbmQgdG8gaXRzZWxmLmNvbXBvc2VkW10gYW5kIHBhcmVudC5hcHBlbmRDb21wb3NlZFxuICAgICAqL1xuXHRjb21wb3NlKCl7XG5cdFx0aWYodGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aD09MClcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQoKSB0byBub3RpZnkgcGFyZW50IDEgY2hpbGQgY29tcG9zZWRcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBhbGwgY2hpbGRyZW4gY29tcG9zZWRcblx0ICovXG4gICAgb24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZClcblx0XHRpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXG4gICAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT10aGlzLmNoaWxkcmVuLmxlbmd0aFxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgZGlzcGxheU5hbWU9XCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxke1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBsZXQgY29tcG9zZWQ9dGhpcy5jcmVhdGVDb21wb3NlZFBpZWNlKClcblxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgdGhpcy5jb21wb3NlZC5wdXNoKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIGFmdGVyIGZpZ3VyZSBvdXQgcHJvcHMsIHlvdSdkIGJldHRlciBjYWxsIHRoaXMgdG8gY3JlYXRlIEVsZW1lbnRcbiAgICAgKi9cbiAgICBjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG59XG5cbmNvbnN0IFRPR0dMRVM9J2IsaSx2YW5pc2gnLnNwbGl0KCcsJylcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9nZ2xlU3R5bGUoc3R5bGVQYXRoKXtcblx0bGV0IFtpbmxpbmUsa2V5XT1zdHlsZVBhdGguc3BsaXQoJy4nKVxuXHRpZihpbmxpbmUhPSdpbmxpbmUnKVxuXHRcdHJldHVybiBmYWxzZVxuXHRyZXR1cm4gVE9HR0xFUy5pbmRleE9mKGtleSkhPS0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuXHRcdFx0XHRcdGNvbnRhaW5lclN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1jb250ZW50U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpc1RvZ2dsZVN0eWxlKHBhdGgpICYmIHY9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvZ2dsZXM9Y29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0b2dnbGVzKT09J251bWJlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodG9nZ2xlczwwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlcy0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9KVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRjcmVhdGVTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cbiAgICAgICAgc3R5bGUoa2V5KXtcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICBsZXQgdmFsdWU9Y29udGVudFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICBpZih2YWx1ZT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHZhbHVlPWNvbnRhaW5lclN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuXHR9XG59XG4iXX0=