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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.computed = { children: [], composed: [] }, _temp), _possibleConstructorReturn(_this, _ret);
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
      if (this.isEmpty()) this.context.parent.on1ChildComposed(this);
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
        var _props$directStyle = this.props.directStyle;
        var directStyle = _props$directStyle === undefined ? this.defaultStyle : _props$directStyle;
        var inheritedStyle = this.context.inheritedStyle;


        return Object.assign(_get(Object.getPrototypeOf(StyleContainer.prototype), "getChildContext", this).call(this), {
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
        var _props$directStyle2 = this.props.directStyle;
        var directStyle = _props$directStyle2 === undefined ? this.defaultStyle : _props$directStyle2;
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
  }(Content), _class.childContextTypes = Object.assign({
    inheritedStyle: _react.PropTypes.object
  }, Content.childContextTypes), _class.contextTypes = Object.assign({
    inheritedStyle: _react.PropTypes.object,
    getDefaultStyle: _react.PropTypes.func
  }, Content.contextTypes), _temp3;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBOElnQjtRQU9BOztBQXJKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFdBQVMsRUFBQyxVQUFTLEVBQVQsRUFBYSxVQUFTLEVBQVQ7OztlQURkOztzQ0FPUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO09BREssQ0FEYTs7Ozs2QkFNWjtBQUNELGFBQU87OztRQUFNLEtBQUssVUFBTCxFQUFOO09BQVAsQ0FEQzs7Ozs7Ozs7O3lDQU9lO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFVBQUcsS0FBSyxPQUFMLEVBQUgsRUFDQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7O3NDQUlnQjtBQUNoQixhQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBNUIsQ0FEZ0I7Ozs7aUNBSUw7QUFDWCxhQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESTs7OzsrQkFJQzs7OzhCQUlKO0FBQ1IsYUFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUN6QixXQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEtBQTVCLEVBRHlCO0FBRXpCLFVBQUcsS0FBSyxxQkFBTCxFQUFILEVBQWdDO0FBQy9CLGFBQUsscUJBQUwsR0FEK0I7T0FBaEM7Ozs7NENBS3lCO0FBQ25CLGFBQU8sS0FBSyxlQUFMLE1BQXdCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FEWjs7Ozs0Q0FJ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QUV0QixRQUFRLGlCQUFSLFVBa0JJLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsb0JBQWdCLGlCQUFVLE1BQVY7QUFDUCxxQkFBaUIsaUJBQVUsSUFBVjtHQUZQLEVBR2xCLFFBQVEsWUFBUixTQXhCSCxDQUR3QztDQUFsQyIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcHV0ZWQ9e2NoaWxkcmVuOltdLCBjb21wb3NlZDpbXX1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG5cdFx0XHRwYXJlbnQ6IHRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxkaXY+e3RoaXMuZ2V0Q29udGVudCgpfTwvZGl2PlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHRpZih0aGlzLmlzRW1wdHkoKSlcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuXHRnZXRDb250ZW50Q291bnQoKXtcblx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcblx0fVxuXG5cdGdldENvbnRlbnQoKXtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuXHR9XG5cbiAgICBnZXRTdHlsZSgpe1xuXG4gICAgfVxuXG5cdGlzRW1wdHkoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09MFxuXHR9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuXHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcblx0XHRpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXG4gICAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpPT10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aFxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblxuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgZGlzcGxheU5hbWU9XCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxke1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGxldCBjb21wb3NlZD10aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cbn1cblxuY29uc3QgVE9HR0xFUz0nYixpLHZhbmlzaCcuc3BsaXQoJywnKVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb2dnbGVTdHlsZShzdHlsZVBhdGgpe1xuXHRsZXQgW2lubGluZSxrZXldPXN0eWxlUGF0aC5zcGxpdCgnLicpXG5cdGlmKGlubGluZSE9J2lubGluZScpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHJldHVybiBUT0dHTEVTLmluZGV4T2Yoa2V5KSE9LTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlSW5oZXJpdGFibGUoQ29udGVudCl7XG5cdHJldHVybiBjbGFzcyBTdHlsZUNvbnRhaW5lciBleHRlbmRzIENvbnRlbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdFx0fSxDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGU9dGhpcy5kZWZhdWx0U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdFx0XHRpbmhlcml0ZWRTdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHY9ZGlyZWN0U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5oZXJpdGVkU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9KVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcblx0XHR9LENvbnRlbnQuY29udGV4dFR5cGVzKVxuXG4gICAgICAgIHN0eWxlKGtleSl7XG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGU9dGhpcy5kZWZhdWx0U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICBsZXQgdmFsdWU9ZGlyZWN0U3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIGlmKHZhbHVlPT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdmFsdWU9aW5oZXJpdGVkU3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGRlZmF1bHRTdHlsZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUodGhpcy5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSlcbiAgICAgICAgfVxuXHR9XG59XG4iXX0=