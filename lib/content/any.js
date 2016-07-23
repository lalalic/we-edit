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
      console.log("a " + child.constructor.displayName + " composed");
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
    _classCallCheck(this, HasParentAndChild);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HasParentAndChild).apply(this, arguments));
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

HasParentAndChild.displayName = "content";
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
  var _class, _temp2;

  return _temp2 = _class = function (_Content) {
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


        if (!directStyle) debugger;

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
  }, Content.contextTypes), _temp2;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBZ0pnQjtRQU9BOztBQXZKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFdBQVMsRUFBQyxVQUFTLEVBQVQsRUFBYSxVQUFTLEVBQVQ7OztlQURkOztzQ0FPUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO09BREssQ0FEYTs7Ozs2QkFNWjtBQUNELGFBQU87OztRQUFNLEtBQUssVUFBTCxFQUFOO09BQVAsQ0FEQzs7Ozs7Ozs7O3lDQU9lO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFVBQUcsS0FBSyxPQUFMLEVBQUgsRUFBa0I7QUFDUixhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQURRO09BQWxCOzs7O3NDQUtnQjtBQUNoQixhQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBNUIsQ0FEZ0I7Ozs7aUNBSUw7QUFDWCxhQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESTs7OzsrQkFJQzs7OzhCQUlKO0FBQ1IsYUFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUNuQixjQUFRLEdBQVIsUUFBaUIsTUFBTSxXQUFOLENBQWtCLFdBQWxCLGNBQWpCLEVBRG1CO0FBRXpCLFdBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsS0FBNUIsRUFGeUI7O0FBSXpCLFVBQUcsS0FBSyxxQkFBTCxFQUFILEVBQWdDO0FBQy9CLGFBQUsscUJBQUwsR0FEK0I7T0FBaEM7Ozs7NENBS3lCO0FBQ25CLGFBQU8sS0FBSyxlQUFMLE1BQXdCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FEWjs7Ozs0Q0FJSDs7OzBDQUdELE9BQU07OztTQXZGaEI7OztTQUdGLG9CQUFrQjtBQUMzQixVQUFRLGlCQUFVLE1BQVY7OztJQXdGVzs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FTRzs7O0FBQ2hCLGFBQU8sS0FBSyxjQUFMLEdBQW9CLHdCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGtCQUFwQix3QkFBMEMsU0FBMUMsQ0FBcEIsQ0FEUzs7Ozs7Ozs7OztxQ0FRSjs7O0FBQ1osYUFBTyx5QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixjQUFwQix5QkFBc0MsU0FBdEMsQ0FBUCxDQURZOzs7OzRDQUlJO0FBQ3RCLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBRHNCO0FBRXRCLGlDQXZCbUIsdUVBdUJuQixDQUZzQjs7OztTQXJCSDtFQUEwQjs7QUFBMUIsa0JBQ1YsY0FBWTtBQURGLGtCQUVWLGVBQWE7QUFDaEIsVUFBUSxpQkFBVSxNQUFWOztrQkFISzs7SUEyQlI7OztBQUNULFdBRFMsT0FDVCxHQUFhOzBCQURKLFNBQ0k7O3dFQURKLHFCQUVGLFlBRE07O0FBRVQsV0FBTyxNQUFQLENBQWMsT0FBSyxRQUFMLENBQWMsUUFBZCxDQUFkO0FBRlM7R0FBYjs7ZUFEUzs7NkJBTUQ7QUFDVixhQUFPLElBQVAsQ0FEVTs7Ozs4QkFJQztBQUNMLFVBQUksV0FBUyxLQUFLLHFCQUFMLEVBQVQsQ0FEQzs7VUFHRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BSEY7O0FBSUwsV0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixFQUpLO0FBS0wsYUFBTyxjQUFQLENBQXNCLFFBQXRCLEVBTEs7QUFNTCxhQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBTks7Ozs7U0FWQTtFQUFnQjs7QUFvQjdCLElBQU0sVUFBUSxhQUFhLEtBQWIsQ0FBbUIsR0FBbkIsQ0FBUjs7QUFFQyxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsRUFBaUM7eUJBQ3RCLFVBQVUsS0FBVixDQUFnQixHQUFoQixFQURzQjs7OztNQUNsQyw4QkFEa0M7TUFDM0IsMkJBRDJCOztBQUV2QyxNQUFHLFVBQVEsUUFBUixFQUNGLE9BQU8sS0FBUCxDQUREO0FBRUEsU0FBTyxRQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsS0FBc0IsQ0FBQyxDQUFELENBSlU7Q0FBakM7O0FBT0EsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFrQzs7O0FBQ3hDO2NBQWE7Ozs7Ozs7Ozs7d0NBS0s7aUNBQytCLEtBQUssS0FBTCxDQUEvQixZQURBO1lBQ0EsaURBQVksS0FBSyxZQUFMLHNCQURaO1lBRUEsaUJBQWdCLEtBQUssT0FBTCxDQUFoQixlQUZBOzs7QUFJUCxZQUFHLENBQUMsV0FBRCxFQUNYLFNBRFE7O0FBSUEsZUFBTyxPQUFPLE1BQVAsNEJBYkwsOERBYUssRUFBc0M7QUFDcEQsMEJBQWU7QUFDSSw4QkFBSSxNQUFLO0FBQ0wsa0JBQUksSUFBRSxZQUFZLEdBQVosQ0FBZ0IsSUFBaEIsQ0FBRixDQURDO0FBRUwsa0JBQUcsS0FBRyxTQUFILEVBQ0MsT0FBTyxlQUFlLEdBQWYsQ0FBbUIsSUFBbkIsQ0FBUCxDQURKO0FBRUEscUJBQU8sQ0FBUCxDQUpLO2FBRGI7V0FBZjtTQURjLENBQVAsQ0FSTzs7Ozs0QkF5QkwsS0FBSTtrQ0FDZ0MsS0FBSyxLQUFMLENBQS9CLFlBREQ7WUFDQyxrREFBWSxLQUFLLFlBQUwsdUJBRGI7WUFFQyxpQkFBZ0IsS0FBSyxPQUFMLENBQWhCLGVBRkQ7O0FBR04sWUFBSSxRQUFNLFlBQVksR0FBWixDQUFnQixHQUFoQixDQUFOLENBSEU7QUFJTixZQUFHLFNBQU8sU0FBUCxFQUNDLFFBQU0sZUFBZSxHQUFmLENBQW1CLEdBQW5CLENBQU4sQ0FESjtBQUVBLGVBQU8sS0FBUCxDQU5NOzs7OzBCQVNRO0FBQ2QsZUFBTyxLQUFLLE9BQUwsQ0FBYSxlQUFiLENBQTZCLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUFwQyxDQURjOzs7O1dBdkNaO0lBQXVCLGlCQUM1QixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDckMsb0JBQWdCLGlCQUFVLE1BQVY7R0FETyxFQUV0QixRQUFRLGlCQUFSLFVBc0JJLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsb0JBQWdCLGlCQUFVLE1BQVY7QUFDUCxxQkFBaUIsaUJBQVUsSUFBVjtHQUZQLEVBR2xCLFFBQVEsWUFBUixTQTVCSCxDQUR3QztDQUFsQyIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcHV0ZWQ9e2NoaWxkcmVuOltdLCBjb21wb3NlZDpbXX1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG5cdFx0XHRwYXJlbnQ6IHRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxkaXY+e3RoaXMuZ2V0Q29udGVudCgpfTwvZGl2PlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHRpZih0aGlzLmlzRW1wdHkoKSl7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICAgICAgfVxuICAgIH1cblxuXHRnZXRDb250ZW50Q291bnQoKXtcblx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcblx0fVxuXG5cdGdldENvbnRlbnQoKXtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuXHR9XG5cbiAgICBnZXRTdHlsZSgpe1xuXG4gICAgfVxuXG5cdGlzRW1wdHkoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09MFxuXHR9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuICAgICAgICBjb25zb2xlLmxvZyhgYSAke2NoaWxkLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lfSBjb21wb3NlZGApXG5cdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXG5cdFx0aWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuICAgIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdH1cblxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxke1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGxldCBjb21wb3NlZD10aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cbn1cblxuY29uc3QgVE9HR0xFUz0nYixpLHZhbmlzaCcuc3BsaXQoJywnKVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb2dnbGVTdHlsZShzdHlsZVBhdGgpe1xuXHRsZXQgW2lubGluZSxrZXldPXN0eWxlUGF0aC5zcGxpdCgnLicpXG5cdGlmKGlubGluZSE9J2lubGluZScpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHJldHVybiBUT0dHTEVTLmluZGV4T2Yoa2V5KSE9LTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlSW5oZXJpdGFibGUoQ29udGVudCl7XG5cdHJldHVybiBjbGFzcyBTdHlsZUNvbnRhaW5lciBleHRlbmRzIENvbnRlbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdFx0fSxDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGU9dGhpcy5kZWZhdWx0U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XG5cbiAgICAgICAgICAgIGlmKCFkaXJlY3RTdHlsZSlcblx0XHRcdFx0ZGVidWdnZXI7XG5cblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuXHRcdFx0XHRcdGluaGVyaXRlZFN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1kaXJlY3RTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2PT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmhlcml0ZWRTdHlsZS5nZXQocGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xuXHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cbiAgICAgICAgc3R5bGUoa2V5KXtcbiAgICAgICAgICAgIGNvbnN0IHtkaXJlY3RTdHlsZT10aGlzLmRlZmF1bHRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2luaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIGxldCB2YWx1ZT1kaXJlY3RTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgaWYodmFsdWU9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZGVmYXVsdFN0eWxlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldERlZmF1bHRTdHlsZSh0aGlzLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lKVxuICAgICAgICB9XG5cdH1cbn1cbiJdfQ==