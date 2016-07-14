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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.children = [], _this.composed = [], _temp), _possibleConstructorReturn(_this, _ret);
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
      this.children.push(child);
      if (this.isAllChildrenComposed()) {
        this.onAllChildrenComposed();
      }
    }
  }, {
    key: "isAllChildrenComposed",
    value: function isAllChildrenComposed() {
      return this.getContentCount() == this.children.length;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBbUpnQjtRQU9BOztBQTFKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFFBQU0sVUFDVCxXQUFTLFVBQ04sV0FBUzs7O2VBSEE7O3NDQVNRO0FBQ2IsYUFBTztBQUNaLGdCQUFRLElBQVI7T0FESyxDQURhOzs7OzZCQU1aO0FBQ0QsYUFBTzs7O1FBQU0sS0FBSyxVQUFMLEVBQU47T0FBUCxDQURDOzs7Ozs7Ozs7eUNBT2U7QUFDaEIsV0FBSyxPQUFMLEdBRGdCOzs7Ozs7Ozs7OzhCQVFkO0FBQ1IsVUFBRyxLQUFLLE9BQUwsRUFBSCxFQUNDLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBREQ7Ozs7c0NBSWdCO0FBQ2hCLGFBQU8sZ0JBQU0sUUFBTixDQUFlLEtBQWYsQ0FBcUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUE1QixDQURnQjs7OztpQ0FJTDtBQUNYLGFBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxDQURJOzs7OzhCQUlIO0FBQ1IsYUFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUN6QixXQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRHlCO0FBRXpCLFVBQUcsS0FBSyxxQkFBTCxFQUFILEVBQWdDO0FBQy9CLGFBQUsscUJBQUwsR0FEK0I7T0FBaEM7Ozs7NENBS3lCO0FBQ25CLGFBQU8sS0FBSyxlQUFMLE1BQXdCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FEWjs7Ozs0Q0FJSDs7OzBDQUlELE9BQU07OztTQW5GaEI7OztTQUtGLG9CQUFrQjtBQUMz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SUFBdUIsaUJBQzVCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNyQyxvQkFBZ0IsaUJBQVUsTUFBVjtHQURPLEVBRXRCLFFBQVEsaUJBQVIsVUEyQkksZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxpQkFBYSxpQkFBVSxJQUFWO0FBQ0osb0JBQWdCLGlCQUFVLE1BQVY7R0FGTixFQUdsQixRQUFRLFlBQVIsU0FqQ0gsQ0FEd0M7Q0FBbEMiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt9XG5cdGNoaWxkcmVuPVtdXG4gICAgY29tcG9zZWQ9W11cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG5cdFx0XHRwYXJlbnQ6IHRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxkaXY+e3RoaXMuZ2V0Q29udGVudCgpfTwvZGl2PlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHRpZih0aGlzLmlzRW1wdHkoKSlcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblx0XG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKVxuXHR9XG5cdFxuXHRnZXRDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0fVxuXHRcblx0aXNFbXB0eSgpe1xuXHRcdHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpPT0wXG5cdH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQoKSB0byBub3RpZnkgcGFyZW50IDEgY2hpbGQgY29tcG9zZWRcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBhbGwgY2hpbGRyZW4gY29tcG9zZWRcblx0ICovXG4gICAgb24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XG5cdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cbiAgICBpc0FsbENoaWxkcmVuQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXG5cdH1cblx0XG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgICBkaXNwbGF5TmFtZT1cImNvbnRlbnRcIlxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgbGV0IGNvbXBvc2VkPXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBhZnRlciBmaWd1cmUgb3V0IHByb3BzLCB5b3UnZCBiZXR0ZXIgY2FsbCB0aGlzIHRvIGNyZWF0ZSBFbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuXG5jb25zdCBUT0dHTEVTPSdiLGksdmFuaXNoJy5zcGxpdCgnLCcpXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RvZ2dsZVN0eWxlKHN0eWxlUGF0aCl7XG5cdGxldCBbaW5saW5lLGtleV09c3R5bGVQYXRoLnNwbGl0KCcuJylcblx0aWYoaW5saW5lIT0naW5saW5lJylcblx0XHRyZXR1cm4gZmFsc2Vcblx0cmV0dXJuIFRPR0dMRVMuaW5kZXhPZihrZXkpIT0tMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVJbmhlcml0YWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIFN0eWxlQ29udGFpbmVyIGV4dGVuZHMgQ29udGVudHtcblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRcdGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdFx0XHR9LENvbnRlbnQuY2hpbGRDb250ZXh0VHlwZXMpXG5cblx0XHRnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdFx0XHRjb250YWluZXJTdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHY9Y29udGVudFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHY9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lclN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaXNUb2dnbGVTdHlsZShwYXRoKSAmJiB2PT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2dnbGVzPWNvbnRhaW5lclN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YodG9nZ2xlcyk9PSdudW1iZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvZ2dsZXM8MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXMtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0Y3JlYXRlU3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHR9LENvbnRlbnQuY29udGV4dFR5cGVzKVxuXG4gICAgICAgIHN0eWxlKGtleSl7XG4gICAgICAgICAgICBjb25zdCB7Y29udGVudFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7Y29udGFpbmVyU3R5bGV9PXRoaXMuY29udGV4dFxuICAgICAgICAgICAgbGV0IHZhbHVlPWNvbnRlbnRTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgaWYodmFsdWU9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB2YWx1ZT1jb250YWluZXJTdHlsZS5nZXQoa2V5KVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cblx0fVxufVxuIl19