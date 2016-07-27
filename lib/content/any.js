"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoChild = exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      var self = this;
      return {
        parent: this,
        prevSibling: function prevSibling(me) {
          var siblings = self.computed.children;

          var found = siblings.indexOf(me);
          if (found == -1) {
            //not found, current should no be composed
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
  parent: _react.PropTypes.object,
  prevSibling: _react.PropTypes.func
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
  parent: _react.PropTypes.object,
  prevSibling: _react.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztRQXlKZ0I7O0FBekpoQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFYTs7Ozs7Ozs7Ozs7Ozs7c01BQ1QsV0FBUyxFQUFDLFVBQVMsRUFBVCxFQUFhLFVBQVMsRUFBVDs7O2VBRGQ7O3NDQVFRO0FBQ25CLFVBQUksT0FBSyxJQUFMLENBRGU7QUFFYixhQUFPO0FBQ1osZ0JBQVEsSUFBUjtBQUNBLDBDQUFZLElBQUc7Y0FDRSxXQUFVLEtBQUssUUFBTCxDQUFuQixTQURPOztBQUVkLGNBQUksUUFBTSxTQUFTLE9BQVQsQ0FBaUIsRUFBakIsQ0FBTixDQUZVO0FBR2QsY0FBRyxTQUFPLENBQUMsQ0FBRCxFQUFHOztBQUNaLG1CQUFPLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQWhCLENBRFk7V0FBYixNQUVLO0FBQ0osbUJBQU8sU0FBUyxRQUFNLENBQU4sQ0FBaEIsQ0FESTtXQUZMO1NBTFc7T0FBUCxDQUZhOzs7OzZCQWdCWjtBQUNELGFBQU87OztRQUFNLEtBQUssVUFBTCxFQUFOO09BQVAsQ0FEQzs7Ozs7Ozs7O3lDQU9lO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFVBQUcsS0FBSyxPQUFMLEVBQUgsRUFBa0I7QUFDUixhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQURRO09BQWxCOzs7O3NDQUtnQjtBQUNoQixhQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBNUIsQ0FEZ0I7Ozs7aUNBSUw7QUFDWCxhQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESTs7OzsrQkFJQzs7OzhCQUlKO0FBQ1IsYUFBTyxLQUFLLGVBQUwsTUFBd0IsQ0FBeEIsQ0FEQzs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdC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QWpCLENBQXBDLENBRGM7Ozs7V0F2Q1o7SUFBdUIsaUJBQzVCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNyQyxvQkFBZ0IsaUJBQVUsTUFBVjtHQURPLEVBRXRCLFFBQVEsaUJBQVIsVUFzQkksZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxvQkFBZ0IsaUJBQVUsTUFBVjtBQUNQLHFCQUFpQixpQkFBVSxJQUFWO0dBRlAsRUFHbEIsUUFBUSxZQUFSLFNBNUJILENBRHdDO0NBQWxDIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wdXRlZD17Y2hpbGRyZW46W10sIGNvbXBvc2VkOltdfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0cHJldlNpYmxpbmc6IFByb3BUeXBlcy5mdW5jXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0bGV0IHNlbGY9dGhpc1xuICAgICAgICByZXR1cm4ge1xuXHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0cHJldlNpYmxpbmcobWUpe1xuXHRcdFx0XHRjb25zdCB7Y2hpbGRyZW46c2libGluZ3N9PXNlbGYuY29tcHV0ZWRcblx0XHRcdFx0bGV0IGZvdW5kPXNpYmxpbmdzLmluZGV4T2YobWUpXG5cdFx0XHRcdGlmKGZvdW5kPT0tMSl7Ly9ub3QgZm91bmQsIGN1cnJlbnQgc2hvdWxkIG5vIGJlIGNvbXBvc2VkXG5cdFx0XHRcdFx0cmV0dXJuIHNpYmxpbmdzW3NpYmxpbmdzLmxlbmd0aC0xXVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gc2libGluZ3NbZm91bmQtMV1cblx0XHRcdFx0fVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdj57dGhpcy5nZXRDb250ZW50KCl9PC9kaXY+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cblx0Y29tcG9zZSgpe1xuXHRcdGlmKHRoaXMuaXNFbXB0eSgpKXtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgICAgICB9XG4gICAgfVxuXG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKVxuXHR9XG5cblx0Z2V0Q29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG5cdH1cblxuICAgIGdldFN0eWxlKCl7XG5cbiAgICB9XG5cblx0aXNFbXB0eSgpe1xuXHRcdHJldHVybiB0aGlzLmdldENvbnRlbnRDb3VudCgpPT0wXG5cdH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQoKSB0byBub3RpZnkgcGFyZW50IDEgY2hpbGQgY29tcG9zZWRcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBhbGwgY2hpbGRyZW4gY29tcG9zZWRcblx0ICovXG4gICAgb24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XG4gICAgICAgIHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucHVzaChjaGlsZClcblxuXHRcdGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cbiAgICBpc0FsbENoaWxkcmVuQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRwcmV2U2libGluZzogUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jb21wdXRlZC5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgbGV0IGNvbXBvc2VkPXRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KClcblxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgdGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVJbmhlcml0YWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIFN0eWxlQ29udGFpbmVyIGV4dGVuZHMgQ29udGVudHtcblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdFx0XHR9LENvbnRlbnQuY2hpbGRDb250ZXh0VHlwZXMpXG5cblx0XHRnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgICAgIGNvbnN0IHtkaXJlY3RTdHlsZT10aGlzLmRlZmF1bHRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2luaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgaWYoIWRpcmVjdFN0eWxlKVxuXHRcdFx0XHRkZWJ1Z2dlcjtcblxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG5cdFx0XHRcdFx0aW5oZXJpdGVkU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWRpcmVjdFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHY9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaGVyaXRlZFN0eWxlLmdldChwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdFx0fSxDb250ZW50LmNvbnRleHRUeXBlcylcblxuICAgICAgICBzdHlsZShrZXkpe1xuICAgICAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlPXRoaXMuZGVmYXVsdFN0eWxlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxuICAgICAgICAgICAgbGV0IHZhbHVlPWRpcmVjdFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICBpZih2YWx1ZT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBkZWZhdWx0U3R5bGUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKHRoaXMuY29uc3RydWN0b3IuZGlzcGxheU5hbWUpXG4gICAgICAgIH1cblx0fVxufVxuIl19