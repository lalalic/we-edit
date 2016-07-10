"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoChild = exports.HasChild = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.togglable = togglable;

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
            if (this.state.content.length == this.children.length) {
                this.onAllChildrenComposed();
            }
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

var TOGGLES = 'b,i,u'.split(',');
function isToggle(stylePath) {
    var _stylePath$split = stylePath.split('.');

    var _stylePath$split2 = _slicedToArray(_stylePath$split, 2);

    var inline = _stylePath$split2[0];
    var key = _stylePath$split2[1];

    if (inline != 'inline') return false;
    return TOGGLES.indexOf(key) != -1;
}
function togglable(Content) {
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


                return Object.assign({
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
                }, _get(Object.getPrototypeOf(StyleContainer.prototype), "getChildContext", this).call(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBdUlnQjs7QUF2SWhCOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7OzBNQUNULFFBQU0sRUFBQyxTQUFRLGdCQUFNLFFBQU4sQ0FBZSxPQUFmLENBQXVCLE1BQUssS0FBTCxDQUFXLFFBQVgsQ0FBL0IsRUFBcUQsT0FBTSxNQUFLLEtBQUwsQ0FBVyxLQUFYLFVBQ3JFLFdBQVMsVUFDTixXQUFTOzs7aUJBSEE7OzBDQVNRO0FBQ2IsbUJBQU87QUFDWix3QkFBUSxJQUFSO2FBREssQ0FEYTs7OztpQ0FNWjt5QkFDcUIsS0FBSyxLQUFMLENBRHJCO2dCQUNBLDJCQURBOztnQkFDYSx3REFEYjs7Z0JBRUEsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUZBOztBQUdELG1CQUFPOztnQkFBVyxLQUFLLEtBQUw7Z0JBQWEsT0FBeEI7YUFBUCxDQUhDOzs7Ozs7Ozs7NkNBU2U7QUFDaEIsaUJBQUssT0FBTCxHQURnQjs7Ozs7Ozs7OztrQ0FRZDtBQUNSLGdCQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBMkIsQ0FBM0IsRUFDRixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7Ozs7Ozs7O3VDQVFpQixNQUFLOzs7Ozs7Ozs7NkNBUTRCO2dCQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozs7eUNBUy9CLE9BQU07QUFDbkIsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsRUFEbUI7QUFFekIsZ0JBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELHFCQUFLLHFCQUFMLEdBRGtEO2FBQW5EOzs7O2dEQUtzQjs7O1dBakVYOzs7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QUFDaEMscUJBQWEsaUJBQVUsSUFBVjtBQUNELHdCQUFnQixpQkFBVSxNQUFWO0tBRlYsRUFHakIsUUFBUSxZQUFSLFNBakNKLENBRGlDO0NBQTNCIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17Y29udGVudDpSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCBzdHlsZTp0aGlzLnByb3BzLnN0eWxlfVxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuXHRcdFx0cGFyZW50OiB0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfT57Y29udGVudH08L0dyb3VwPlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT0wKVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgICBkaXNwbGF5TmFtZT1cImNvbnRlbnRcIlxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjb250ZW50OnRoaXMucHJvcHMuY2hpbGRyZW59KVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGxldCBjb21wb3NlZD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogYWZ0ZXIgZmlndXJlIG91dCBwcm9wcywgeW91J2QgYmV0dGVyIGNhbGwgdGhpcyB0byBjcmVhdGUgRWxlbWVudFxuICAgICAqL1xuICAgIGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn1cblxuY29uc3QgVE9HR0xFUz0nYixpLHUnLnNwbGl0KCcsJylcbmZ1bmN0aW9uIGlzVG9nZ2xlKHN0eWxlUGF0aCl7XG4gICAgbGV0IFtpbmxpbmUsa2V5XT1zdHlsZVBhdGguc3BsaXQoJy4nKVxuICAgIGlmKGlubGluZSE9J2lubGluZScpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBUT0dHTEVTLmluZGV4T2Yoa2V5KSE9LTEgICAgXG59XG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRcdGNvbnRhaW5lclN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1jb250ZW50U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpc1RvZ2dsZVN0eWxlKHBhdGgpICYmIHY9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvZ2dsZXM9Y29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0b2dnbGVzKT09J251bWJlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodG9nZ2xlczwwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlcy0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9LCBzdXBlci5nZXRDaGlsZENvbnRleHQoKSlcblx0XHR9XG5cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRjcmVhdGVTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cdH1cbn1cbiJdfQ==