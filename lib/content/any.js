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
    }]);

    return StyleContainer;
  }(Content), _class.childContextTypes = Object.assign({
    containerStyle: _react.PropTypes.object
  }, Content.childContextTypes), _class.contextTypes = Object.assign({
    createStyle: _react.PropTypes.func,
    containerStyle: _react.PropTypes.object
  }, Content.contextTypes), _temp3;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBa0lnQjtRQU9BOztBQXpJaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFYTs7Ozs7Ozs7Ozs7Ozs7c01BQ1QsUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQixFQUFxRCxPQUFNLE1BQUssS0FBTCxDQUFXLEtBQVgsVUFDckUsV0FBUyxVQUNOLFdBQVM7OztlQUhBOztzQ0FTUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO09BREssQ0FEYTs7Ozs2QkFNWjttQkFDcUIsS0FBSyxLQUFMLENBRHJCO1VBQ0EsMkJBREE7O1VBQ2Esd0RBRGI7O1VBRUEsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUZBOztBQUdELGFBQU87O1FBQVcsS0FBSyxLQUFMO1FBQWEsT0FBeEI7T0FBUCxDQUhDOzs7Ozs7Ozs7eUNBU2U7QUFDaEIsV0FBSyxPQUFMLEdBRGdCOzs7Ozs7Ozs7OzhCQVFkO0FBQ1IsVUFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLElBQTJCLENBQTNCLEVBQ0YsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFERDs7Ozs7Ozs7OzttQ0FRaUIsTUFBSzs7Ozs7Ozs7O3lDQVE0QjtVQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozs7cUNBUy9CLE9BQU07QUFDbkIsV0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQURtQjtBQUV6QixVQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBMkIsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUNsRCxhQUFLLHFCQUFMLEdBRGtEO09BQW5EOzs7OzRDQUtzQjs7O1NBakVYOzs7U0FLRixvQkFB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QUFWO0FBQ0Qsb0JBQWdCLGlCQUFVLE1BQVY7R0FGVixFQUdqQixRQUFRLFlBQVIsU0FqQ0osQ0FEd0M7Q0FBbEMiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtjb250ZW50OlJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHN0eWxlOnRoaXMucHJvcHMuc3R5bGV9XG5cdGNoaWxkcmVuPVtdXG4gICAgY29tcG9zZWQ9W11cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG5cdFx0XHRwYXJlbnQ6IHRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Pntjb250ZW50fTwvR3JvdXA+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cblx0Y29tcG9zZSgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PTApXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aD09dGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbn0pXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgbGV0IGNvbXBvc2VkPXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBhZnRlciBmaWd1cmUgb3V0IHByb3BzLCB5b3UnZCBiZXR0ZXIgY2FsbCB0aGlzIHRvIGNyZWF0ZSBFbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuXG5jb25zdCBUT0dHTEVTPSdiLGksdmFuaXNoJy5zcGxpdCgnLCcpXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RvZ2dsZVN0eWxlKHN0eWxlUGF0aCl7XG5cdGxldCBbaW5saW5lLGtleV09c3R5bGVQYXRoLnNwbGl0KCcuJylcblx0aWYoaW5saW5lIT0naW5saW5lJylcblx0XHRyZXR1cm4gZmFsc2Vcblx0cmV0dXJuIFRPR0dMRVMuaW5kZXhPZihrZXkpIT0tMSAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlSW5oZXJpdGFibGUoQ29udGVudCl7XG5cdHJldHVybiBjbGFzcyBTdHlsZUNvbnRhaW5lciBleHRlbmRzIENvbnRlbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdFx0fSxDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgICAgICBjb25zdCB7Y29udGVudFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7Y29udGFpbmVyU3R5bGV9PXRoaXMuY29udGV4dFxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG5cdFx0XHRcdFx0Y29udGFpbmVyU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWNvbnRlbnRTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2PT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlzVG9nZ2xlU3R5bGUocGF0aCkgJiYgdj09LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlcz1jb250YWluZXJTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKHRvZ2dsZXMpPT0nbnVtYmVyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0b2dnbGVzPDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0Y3JlYXRlU3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdFx0XHR9LENvbnRlbnQuY29udGV4dFR5cGVzKVxuXHR9XG59XG4iXX0=