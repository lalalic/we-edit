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
              if (v == undefined) return inheritedStyle.get(path);else if (isToggleStyle(path) && v == -1) {
                var toggles = inheritedStyle.get(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBOElnQjtRQU9BOztBQXJKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFdBQVMsRUFBQyxVQUFTLEVBQVQsRUFBYSxVQUFTLEVBQVQ7OztlQURkOztzQ0FPUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO09BREssQ0FEYTs7Ozs2QkFNWjtBQUNELGFBQU87OztRQUFNLEtBQUssVUFBTCxFQUFOO09BQVAsQ0FEQzs7Ozs7Ozs7O3lDQU9lO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFVBQUcsS0FBSyxPQUFMLEVBQUgsRUFDQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7O3NDQUlnQjtBQUNoQixhQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBNUIsQ0FEZ0I7Ozs7aUNBSUw7QUFDWCxhQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESTs7OzsrQkFJQzs7OzhCQUlKO0FBQ1IsYUFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUN6QixXQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEtBQTVCLEVBRHlCO0FBRXpCLFVBQUcsS0FBSyxxQkFBTCxFQUFILEVBQWdDO0FBQy9CLGFBQUsscUJBQUwsR0FEK0I7T0FBaEM7Ozs7NENBS3lCO0FBQ25CLGFBQU8sS0FBSyxlQUFMLE1BQXdCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FEWjs7Ozs0Q0FJ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RUFDQyxRQUFNLGVBQWUsR0FBZixDQUFtQixHQUFuQixDQUFOLENBREo7QUFFQSxlQUFPLEtBQVAsQ0FOTTs7OzswQkFTUTtBQUNkLGVBQU8sS0FBSyxPQUFMLENBQWEsZUFBYixDQUE2QixLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBcEMsQ0FEYzs7OztXQTVDWjtJQUF1QixpQkFDNUIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3JDLG9CQUFnQixpQkFBVSxNQUFWO0dBRE8sRUFFdEIsUUFBUSxpQkFBUixVQTJCSSxlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLG9CQUFnQixpQkFBVSxNQUFWO0FBQ1AscUJBQWlCLGlCQUFVLElBQVY7R0FGUCxFQUdsQixRQUFRLFlBQVIsU0FqQ0gsQ0FEd0M7Q0FBbEMiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXB1dGVkPXtjaGlsZHJlbjpbXSwgY29tcG9zZWQ6W119XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuXHRcdFx0cGFyZW50OiB0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8ZGl2Pnt0aGlzLmdldENvbnRlbnQoKX08L2Rpdj5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wb3NlIG9uIGNsaWVudCBvciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c3VhbGx5IE5vQ2hpbGQgY29udGVudCBzaG91bGQgYmUgY29tcG9zZWQgYWNjb3JkaW5nIHRvIG5leHRBdmFpbGFibGVTcGFjZSxcbiAgICAgKiBhbmQgdGhlbiBhcHBlbmQgdG8gaXRzZWxmLmNvbXBvc2VkW10gYW5kIHBhcmVudC5hcHBlbmRDb21wb3NlZFxuICAgICAqL1xuXHRjb21wb3NlKCl7XG5cdFx0aWYodGhpcy5pc0VtcHR5KCkpXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cblx0Z2V0Q29udGVudENvdW50KCl7XG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pXG5cdH1cblxuXHRnZXRDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0fVxuXG4gICAgZ2V0U3R5bGUoKXtcblxuICAgIH1cblxuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PTBcblx0fVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcblx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuICAgIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cblx0fVxuXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBsZXQgY29tcG9zZWQ9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG59XG5cbmNvbnN0IFRPR0dMRVM9J2IsaSx2YW5pc2gnLnNwbGl0KCcsJylcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9nZ2xlU3R5bGUoc3R5bGVQYXRoKXtcblx0bGV0IFtpbmxpbmUsa2V5XT1zdHlsZVBhdGguc3BsaXQoJy4nKVxuXHRpZihpbmxpbmUhPSdpbmxpbmUnKVxuXHRcdHJldHVybiBmYWxzZVxuXHRyZXR1cm4gVE9HR0xFUy5pbmRleE9mKGtleSkhPS0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlPXRoaXMuZGVmYXVsdFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG5cdFx0XHRcdFx0aW5oZXJpdGVkU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWRpcmVjdFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHY9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaGVyaXRlZFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaXNUb2dnbGVTdHlsZShwYXRoKSAmJiB2PT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2dnbGVzPWluaGVyaXRlZFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YodG9nZ2xlcyk9PSdudW1iZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvZ2dsZXM8MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXMtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdFx0fSxDb250ZW50LmNvbnRleHRUeXBlcylcblxuICAgICAgICBzdHlsZShrZXkpe1xuICAgICAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlPXRoaXMuZGVmYXVsdFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxuICAgICAgICAgICAgbGV0IHZhbHVlPWRpcmVjdFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICBpZih2YWx1ZT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBkZWZhdWx0U3R5bGUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKHRoaXMuY29uc3RydWN0b3IuZGlzcGxheU5hbWUpXG4gICAgICAgIH1cblx0fVxufVxuIl19