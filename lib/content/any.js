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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBMElnQjtRQU9BOztBQWpKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFdBQVMsRUFBQyxVQUFTLEVBQVQsRUFBYSxVQUFTLEVBQVQ7OztlQURkOztzQ0FPUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO09BREssQ0FEYTs7Ozs2QkFNWjtBQUNELGFBQU87OztRQUFNLEtBQUssVUFBTCxFQUFOO09BQVAsQ0FEQzs7Ozs7Ozs7O3lDQU9lO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFVBQUcsS0FBSyxPQUFMLEVBQUgsRUFDQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7O3NDQUlnQjtBQUNoQixhQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBNUIsQ0FEZ0I7Ozs7aUNBSUw7QUFDWCxhQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FESTs7Ozs4QkFJSDtBQUNSLGFBQU8sS0FBSyxlQUFMLE1BQXdCLENBQXhCLENBREM7Ozs7Ozs7Ozs7bUNBUVMsTUFBSzs7Ozs7Ozs7O3lDQVE0QjtVQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozs7cUNBUy9CLE9BQU07QUFDekIsV0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixLQUE1QixFQUR5QjtBQUV6QixVQUFHLEtBQUsscUJBQUwsRUFBSCxFQUFnQztBQUMvQixhQUFLLHFCQUFMLEdBRCtCO09BQWhDOzs7OzRDQUt5QjtBQUNuQixhQUFPLEtBQUssZUFBTCxNQUF3QixLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBRFo7Ozs7NENBSUg7OzswQ0FJ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QU5NOzs7O1dBbkNKO0lBQXVCLGlCQUM1QixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDckMsb0JBQWdCLGlCQUFVLE1BQVY7R0FETyxFQUV0QixRQUFRLGlCQUFSLFVBMkJJLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsaUJBQWEsaUJBQVUsSUFBVjtBQUNKLG9CQUFnQixpQkFBVSxNQUFWO0dBRk4sRUFHbEIsUUFBUSxZQUFSLFNBakNILENBRHdDO0NBQWxDIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wdXRlZD17Y2hpbGRyZW46W10sIGNvbXBvc2VkOltdfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHBhcmVudDogdGhpc1xuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdj57dGhpcy5nZXRDb250ZW50KCl9PC9kaXY+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cblx0Y29tcG9zZSgpe1xuXHRcdGlmKHRoaXMuaXNFbXB0eSgpKVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKVxuXHR9XG5cblx0Z2V0Q29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG5cdH1cblxuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PTBcblx0fVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcblx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuICAgIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cblx0fVxuXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBsZXQgY29tcG9zZWQ9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG59XG5cbmNvbnN0IFRPR0dMRVM9J2IsaSx2YW5pc2gnLnNwbGl0KCcsJylcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9nZ2xlU3R5bGUoc3R5bGVQYXRoKXtcblx0bGV0IFtpbmxpbmUsa2V5XT1zdHlsZVBhdGguc3BsaXQoJy4nKVxuXHRpZihpbmxpbmUhPSdpbmxpbmUnKVxuXHRcdHJldHVybiBmYWxzZVxuXHRyZXR1cm4gVE9HR0xFUy5pbmRleE9mKGtleSkhPS0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuXHRcdFx0XHRcdGNvbnRhaW5lclN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1jb250ZW50U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpc1RvZ2dsZVN0eWxlKHBhdGgpICYmIHY9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvZ2dsZXM9Y29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0b2dnbGVzKT09J251bWJlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodG9nZ2xlczwwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlcy0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9KVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRjcmVhdGVTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cbiAgICAgICAgc3R5bGUoa2V5KXtcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICBsZXQgdmFsdWU9Y29udGVudFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICBpZih2YWx1ZT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHZhbHVlPWNvbnRhaW5lclN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuXHR9XG59XG4iXX0=