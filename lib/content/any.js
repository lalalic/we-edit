"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoChild = exports.HasChild = undefined;

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
              if (v == undefined) return containerStyle.get(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztRQWdJZ0I7O0FBaEloQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7Ozs7OztzTUFDVCxRQUFNLEVBQUMsU0FBUSxnQkFBTSxRQUFOLENBQWUsT0FBZixDQUF1QixNQUFLLEtBQUwsQ0FBVyxRQUFYLENBQS9CLEVBQXFELE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxVQUNyRSxXQUFTLFVBQ04sV0FBUzs7O2VBSEE7O3NDQVNRO0FBQ2IsYUFBTztBQUNaLGdCQUFRLElBQVI7T0FESyxDQURhOzs7OzZCQU1aO21CQUNxQixLQUFLLEtBQUwsQ0FEckI7VUFDQSwyQkFEQTs7VUFDYSx3REFEYjs7VUFFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsYUFBTzs7UUFBVyxLQUFLLEtBQUw7UUFBYSxPQUF4QjtPQUFQLENBSEM7Ozs7Ozs7Ozt5Q0FTZTtBQUNoQixXQUFLLE9BQUwsR0FEZ0I7Ozs7Ozs7Ozs7OEJBUWQ7QUFDUixVQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBMkIsQ0FBM0IsRUFDRixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7Ozs7Ozs7O21DQVFpQixNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUNuQixXQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRG1CO0FBRXpCLFVBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELGFBQUsscUJBQUwsR0FEa0Q7T0FBbkQ7Ozs7NENBS3NCOzs7U0FqRVg7OztTQUtGLG9CQUFrQjtBQUMzQixVQUFRLGlCQUFVLE1BQVY7OztJQWdFVzs7Ozs7Ozs7Ozs7Ozs7c05BQ2pCLGNBQVk7OztlQURLOzs7Ozs7O3lDQVNHOzs7QUFDaEIsYUFBTyxLQUFLLGNBQUwsR0FBb0Isd0JBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0Isa0JBQXBCLHdCQUEwQyxTQUExQyxDQUFwQixDQURTOzs7Ozs7Ozs7O3FDQVFKOzs7QUFDWixhQUFPLHlCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGNBQXBCLHlCQUFzQyxTQUF0QyxDQUFQLENBRFk7Ozs7NENBSUk7QUFDdEIsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFEc0I7QUFFdEIsaUNBdkJtQix1RUF1Qm5CLENBRnNCOzs7O1NBckJIO0VBQTBCOztBQUExQixrQkFFVixlQUFhO0FBQ2hCLFVBQVEsaUJBQVUsTUFBVjs7a0JBSEs7O0lBMkJSOzs7QUFDVCxXQURTLE9BQ1QsR0FBYTswQkFESixTQUNJOzt3RUFESixxQkFFRixZQURNOztBQUVmLFdBQU8sTUFBUCxDQUFjLE9BQUssS0FBTCxFQUFXLEVBQUMsU0FBUSxPQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQWxDLEVBRmU7QUFHVCxXQUFPLE1BQVAsQ0FBYyxPQUFLLFFBQUwsQ0FBZDtBQUhTO0dBQWI7O2VBRFM7OzZCQU9EO0FBQ1YsYUFBTyxJQUFQLENBRFU7Ozs7OEJBSUM7QUFDTCxVQUFJLFdBQVMsS0FBSyxtQkFBTCxFQUFULENBREM7O1VBR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOztBQUlMLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFKSztBQUtMLGFBQU8sY0FBUCxDQUFzQixRQUF0QixFQUxLO0FBTUwsYUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQU5LOzs7Ozs7Ozs7d0NBWVcsT0FBTTtBQUN0QixhQUFPLElBQVAsQ0FEc0I7Ozs7U0F2QmpCO0VBQWdCOztBQTRCdEIsU0FBUyxTQUFULENBQW1CLE9BQW5CLEVBQTJCOzs7QUFDakM7Y0FBYTs7Ozs7Ozs7Ozt3Q0FLSztZQUNBLGVBQWMsS0FBSyxLQUFMLENBQWQsYUFEQTtZQUVBLGlCQUFnQixLQUFLLE9BQUwsQ0FBaEIsZUFGQTs7O0FBSVAsZUFBTyxPQUFPLE1BQVAsQ0FBYztBQUM1QiwwQkFBZTtBQUNJLDhCQUFJLE1BQUs7QUFDTCxrQkFBSSxJQUFFLGFBQWEsR0FBYixDQUFpQixJQUFqQixDQUFGLENBREM7QUFFTCxrQkFBRyxLQUFHLFNBQUgsRUFDQyxPQUFPLGVBQWUsR0FBZixDQUFtQixJQUFuQixDQUFQLENBREo7QUFFQSxxQkFBTyxDQUFQLENBSks7YUFEYjtXQUFmO1NBRGMsNkJBVEwsOERBU0ssQ0FBUCxDQUpPOzs7O1dBTEw7SUFBdUIsaUJBQzVCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNyQyxvQkFBZ0IsaUJBQVUsTUFBVjtHQURPLEVBRXRCLFFBQVEsaUJBQVIsVUFrQkksZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNoQyxpQkFBYSxpQkFBVSxJQUFWO0FBQ0Qsb0JBQWdCLGlCQUFVLE1BQVY7R0FGVixFQUdqQixRQUFRLFlBQVIsU0F4QkosQ0FEaUM7Q0FBM0IiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtjb250ZW50OlJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHN0eWxlOnRoaXMucHJvcHMuc3R5bGV9XG5cdGNoaWxkcmVuPVtdXG4gICAgY29tcG9zZWQ9W11cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7XG5cdFx0XHRwYXJlbnQ6IHRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Pntjb250ZW50fTwvR3JvdXA+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cblx0Y29tcG9zZSgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PTApXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aD09dGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbn0pXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgbGV0IGNvbXBvc2VkPXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBhZnRlciBmaWd1cmUgb3V0IHByb3BzLCB5b3UnZCBiZXR0ZXIgY2FsbCB0aGlzIHRvIGNyZWF0ZSBFbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgU3R5bGVDb250YWluZXIgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRcdGNvbnRhaW5lclN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1jb250ZW50U3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyU3R5bGUuZ2V0KHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9LCBzdXBlci5nZXRDaGlsZENvbnRleHQoKSlcblx0XHR9XG5cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHRjcmVhdGVTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcblx0XHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cdH1cbn1cbiJdfQ==