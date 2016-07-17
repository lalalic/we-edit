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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.computed = { children: [], composed: [], contentStyle: _this.props.contentStyle }, _temp), _possibleConstructorReturn(_this, _ret);
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
        { style: { display: "none" } },
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

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(HasParentAndChild)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.displayName = "*", _temp2), _possibleConstructorReturn(_this2, _ret2);
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
        var contentStyle = this.computed.contentStyle;
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
        var contentStyle = this.computed.contentStyle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBMElnQjtRQU9BOztBQWpKaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFdBQVMsRUFBQyxVQUFTLEVBQVQsRUFBYSxVQUFTLEVBQVQsRUFBYSxjQUFhLE1BQUssS0FBTCxDQUFXLFlBQVg7OztlQUR4Qzs7c0NBT1E7QUFDYixhQUFPO0FBQ1osZ0JBQVEsSUFBUjtPQURLLENBRGE7Ozs7NkJBTVo7QUFDRCxhQUFPOztVQUFLLE9BQU8sRUFBQyxTQUFRLE1BQVIsRUFBUixFQUFMO1FBQStCLEtBQUssVUFBTCxFQUEvQjtPQUFQLENBREM7Ozs7Ozs7Ozt5Q0FPZTtBQUNoQixXQUFLLE9BQUwsR0FEZ0I7Ozs7Ozs7Ozs7OEJBUWQ7QUFDUixVQUFHLEtBQUssT0FBTCxFQUFILEVBQ0MsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFERDs7OztzQ0FJZ0I7QUFDaEIsYUFBTyxnQkFBTSxRQUFOLENBQWUsS0FBZixDQUFxQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQTVCLENBRGdCOzs7O2lDQUlMO0FBQ1gsYUFBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBREk7Ozs7OEJBSUg7QUFDUixhQUFPLEtBQUssZUFBTCxNQUF3QixDQUF4QixDQURDOzs7Ozs7Ozs7O21DQVFTLE1BQUs7Ozs7Ozs7Ozt5Q0FRNEI7VUFBN0IsaUVBQVMsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsa0JBQVU7Ozs7Ozs7Ozs7O3FDQVMvQixPQUFNO0FBQ3pCLFdBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsS0FBNUIsRUFEeUI7QUFFekIsVUFBRyxLQUFLLHFCQUFMLEVBQUgsRUFBZ0M7QUFDL0IsYUFBSyxxQkFBTCxHQUQrQjtPQUFoQzs7Ozs0Q0FLeUI7QUFDbkIsYUFBTyxL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QUFPLFNBQVAsRUFDQyxRQUFNLGVBQWUsR0FBZixDQUFtQixHQUFuQixDQUFOLENBREo7QUFFQSxlQUFPLEtBQVAsQ0FOTTs7OztXQW5DSjtJQUF1QixpQkFDNUIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3JDLG9CQUFnQixpQkFBVSxNQUFWO0dBRE8sRUFFdEIsUUFBUSxpQkFBUixVQTJCSSxlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGlCQUFhLGlCQUFVLElBQVY7QUFDSixvQkFBZ0IsaUJBQVUsTUFBVjtHQUZOLEVBR2xCLFFBQVEsWUFBUixTQWpDSCxDQUR3QztDQUFsQyIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcHV0ZWQ9e2NoaWxkcmVuOltdLCBjb21wb3NlZDpbXSwgY29udGVudFN0eWxlOnRoaXMucHJvcHMuY29udGVudFN0eWxlfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHBhcmVudDogdGhpc1xuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJub25lXCJ9fT57dGhpcy5nZXRDb250ZW50KCl9PC9kaXY+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cblx0Y29tcG9zZSgpe1xuXHRcdGlmKHRoaXMuaXNFbXB0eSgpKVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKVxuXHR9XG5cblx0Z2V0Q29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG5cdH1cblxuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudENvdW50KCk9PTBcblx0fVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcblx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuICAgIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50Q291bnQoKT09dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cblx0fVxuXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiKlwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBsZXQgY29tcG9zZWQ9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG59XG5cbmNvbnN0IFRPR0dMRVM9J2IsaSx2YW5pc2gnLnNwbGl0KCcsJylcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9nZ2xlU3R5bGUoc3R5bGVQYXRoKXtcblx0bGV0IFtpbmxpbmUsa2V5XT1zdHlsZVBhdGguc3BsaXQoJy4nKVxuXHRpZihpbmxpbmUhPSdpbmxpbmUnKVxuXHRcdHJldHVybiBmYWxzZVxuXHRyZXR1cm4gVE9HR0xFUy5pbmRleE9mKGtleSkhPS0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUluaGVyaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5jb21wdXRlZFxuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuXHRcdFx0XHRcdGNvbnRhaW5lclN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1jb250ZW50U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpc1RvZ2dsZVN0eWxlKHBhdGgpICYmIHY9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvZ2dsZXM9Y29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0b2dnbGVzKT09J251bWJlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodG9nZ2xlczwwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY9dG9nZ2xlcy0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9KVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRjcmVhdGVTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cbiAgICAgICAgc3R5bGUoa2V5KXtcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMuY29tcHV0ZWRcbiAgICAgICAgICAgIGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICBsZXQgdmFsdWU9Y29udGVudFN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICBpZih2YWx1ZT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHZhbHVlPWNvbnRhaW5lclN0eWxlLmdldChrZXkpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuXHR9XG59XG4iXX0=