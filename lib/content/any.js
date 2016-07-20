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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBOElnQjtRQU9BOztBQXJKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFdBQVMsRUFBQyxVQUFTLEVBQVQsRUFBYSxVQUFTLEVBQVQ7OztlQURkOztzQ0FPUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO09BREssQ0FEYTs7Ozs2QkFNWjtBQUNELGFBQU87OztRQUFNLEtBQUssVUFBTCxFQUFOO09BQVAsQ0FEQzs7Ozs7Ozs7O3lDQU9lO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFVBQUcsS0FBSyxPQUFMLEVBQUgsRUFDQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7O3NDQUlnQjtBQUNoQixhQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBNUIsQ0FEZ0I7Ozs7aUNBSUw7QUFDWCxhQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESTs7OzsrQkFJQzs7OzhCQUlKO0FBQ1IsYUFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUN6QixXQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEtBQTVCLEVBRHlCO0FBRXpCLFVBQUcsS0FBSyxxQkFBTCxFQUFILEVBQWdDO0FBQy9CLGFBQUsscUJBQUwsR0FEK0I7T0FBaEM7Ozs7NENBS3lCO0FBQ25CLGFBQU8sS0FBSyxlQUFMLE1BQXdCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FEWjs7Ozs0Q0FJ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TyxLQUFQLENBTk07Ozs7V0FuQ0o7SUFBdUIsaUJBQzVCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNyQyxvQkFBZ0IsaUJBQVUsTUFBVjtHQURPLEVBRXRCLFFBQVEsaUJBQVIsVUEyQkksZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxpQkFBYSxpQkFBVSxJQUFWO0FBQ0osb0JBQWdCLGlCQUFVLE1BQVY7R0FGTixFQUdsQixRQUFRLFlBQVIsU0FqQ0gsQ0FEd0M7Q0FBbEMiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXB1dGVkPXtjaGlsZHJlbjpbXSwgY29tcG9zZWQ6W119XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuXHRcdFx0cGFyZW50OiB0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8ZGl2Pnt0aGlzLmdldENvbnRlbnQoKX08L2Rpdj5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c3VhbGx5IE5vQ2hpbGQgY29udGVudCBzaG91bGQgYmUgY29tcG9zZWQgYWNjb3JkaW5nIHRvIG5leHRBdmFpbGFibGVTcGFjZSxcbiAgICAgKiBhbmQgdGhlbiBhcHBlbmQgdG8gaXRzZWxmLmNvbXBvc2VkW10gYW5kIHBhcmVudC5hcHBlbmRDb21wb3NlZFxuICAgICAqL1xuXHRjb21wb3NlKCl7XG5cdFx0aWYodGhpcy5pc0VtcHR5KCkpXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cblx0Z2V0Q29udGVudENvdW50KCl7XG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pXG5cdH1cblxuXHRnZXRDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0fVxuXG4gICAgZ2V0U3R5bGUoKXtcbiAgICAgICAgXG4gICAgfVxuXG5cdGlzRW1wdHkoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09MFxuXHR9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuXHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcblx0XHRpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXG4gICAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpPT10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aFxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblxuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgZGlzcGxheU5hbWU9XCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxke1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGxldCBjb21wb3NlZD10aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cbn1cblxuY29uc3QgVE9HR0xFUz0nYixpLHZhbmlzaCcuc3BsaXQoJywnKVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb2dnbGVTdHlsZShzdHlsZVBhdGgpe1xuXHRsZXQgW2lubGluZSxrZXldPXN0eWxlUGF0aC5zcGxpdCgnLicpXG5cdGlmKGlubGluZSE9J2lubGluZScpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHJldHVybiBUT0dHTEVTLmluZGV4T2Yoa2V5KSE9LTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlSW5oZXJpdGFibGUoQ29udGVudCl7XG5cdHJldHVybiBjbGFzcyBTdHlsZUNvbnRhaW5lciBleHRlbmRzIENvbnRlbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdFx0fSxDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgICAgICBjb25zdCB7Y29udGVudFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7Y29udGFpbmVyU3R5bGV9PXRoaXMuY29udGV4dFxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG5cdFx0XHRcdFx0Y29udGFpbmVyU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWNvbnRlbnRTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2PT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlzVG9nZ2xlU3R5bGUocGF0aCkgJiYgdj09LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlcz1jb250YWluZXJTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKHRvZ2dsZXMpPT0nbnVtYmVyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0b2dnbGVzPDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdGNyZWF0ZVN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdFx0fSxDb250ZW50LmNvbnRleHRUeXBlcylcblxuICAgICAgICBzdHlsZShrZXkpe1xuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIGxldCB2YWx1ZT1jb250ZW50U3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIGlmKHZhbHVlPT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdmFsdWU9Y29udGFpbmVyU3R5bGUuZ2V0KGtleSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG5cdH1cbn1cbiJdfQ==