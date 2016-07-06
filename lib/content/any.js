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

var uuid = 0;

var HasChild = exports.HasChild = function (_Component) {
  _inherits(HasChild, _Component);

  function HasChild() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, HasChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { content: _react2.default.Children.toArray(_this.props.children), style: _this.props.style }, _this.children = [], _this.composed = [], _this._id = uuid++, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HasChild, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        parent: this,
        style: this.state.style
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
      this._startComposeAt = Date.now();
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
      console.info("composed a " + child.displayName + " " + (child.displayName == 'text' ? ":" + (child.state.text || child.props.children) : ''));
      this.children.push(child);
      if (this.state.content.length == this.children.length) {
        this.onAllChildrenComposed();
      }
    }
  }, {
    key: "onAllChildrenComposed",
    value: function onAllChildrenComposed() {
      console.log(this.displayName + "(" + this._id + ") composed within " + (Date.now() - this._startComposeAt) + "ms");
    }
  }]);

  return HasChild;
}(_react.Component);

HasChild.childContextTypes = {
  parent: _react.PropTypes.object,
  style: _react.PropTypes.object
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
  parent: _react.PropTypes.object,
  style: _react.PropTypes.object
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
    _inherits(Togglable, _Content);

    function Togglable() {
      _classCallCheck(this, Togglable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Togglable).apply(this, arguments));
    }

    _createClass(Togglable, [{
      key: "getChildContext",
      value: function getChildContext() {
        var mine = this.props.contentStyle.inline;
        var parent = this.context.toggleStyles;

        var toggles = {};
        return Object.assign({
          toggleStyles: toggles
        }, _get(Object.getPrototypeOf(Togglable.prototype), "getChildContext", this).call(this));
      }
    }]);

    return Togglable;
  }(Content), _class.childContextTypes = Object.assign({
    toggleStyles: _react.PropTypes.object
  }, Content.childContextTypes), _class.contextTypes = Object.assign({
    toggleStyles: _react.PropTypes.object
  }, Content.contextTypes), _temp3;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztRQXVJZ0I7O0FBdkloQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQUksT0FBSyxDQUFMOztJQUNTOzs7Ozs7Ozs7Ozs7OztzTUFDVCxRQUFNLEVBQUMsU0FBUSxnQkFBTSxRQUFOLENBQWUsT0FBZixDQUF1QixNQUFLLEtBQUwsQ0FBVyxRQUFYLENBQS9CLEVBQXFELE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxVQUNyRSxXQUFTLFVBQ04sV0FBUyxVQUNULE1BQUk7OztlQUpLOztzQ0FXUTtBQUNiLGFBQU87QUFDWixnQkFBUSxJQUFSO0FBQ1MsZUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYO09BRlgsQ0FEYTs7Ozs2QkFPWjttQkFDcUIsS0FBSyxLQUFMLENBRHJCO1VBQ0EsMkJBREE7O1VBQ2Esd0RBRGI7O1VBRUEsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUZBOztBQUdELGFBQU87O1FBQVcsS0FBSyxLQUFMO1FBQWEsT0FBeEI7T0FBUCxDQUhDOzs7Ozs7Ozs7eUNBU2U7QUFDaEIsV0FBSyxPQUFMLEdBRGdCOzs7Ozs7Ozs7OzhCQVFkO0FBQ1IsV0FBSyxlQUFMLEdBQXFCLEtBQUssR0FBTCxFQUFyQixDQURRO0FBRVIsVUFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLElBQTJCLENBQTNCLEVBQ0YsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFERDs7Ozs7Ozs7OzttQ0FRaUIsTUFBSzs7Ozs7Ozs7O3lDQVE0QjtVQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozs7cUNBUy9CLE9BQU07QUFDbkIsY0FBUSxJQUFSLGlCQUEyQixNQUFNLFdBQU4sVUFBcUIsTUFBTSxXQUFOLElBQW1CLE1BQW5CLFVBQWdDLE1BQU0sS0FBTixDQUFZLElBQVosSUFBa0IsTUFBTSxLQUFOLENBQVksUUFBWixDQUFsRCxHQUEyRSxFQUEzRSxDQUFoRCxFQURtQjtBQUVuQixXQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRm1CO0FBR3pCLFVBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELGFBQUsscUJBQUwsR0FEa0Q7T0FBbkQ7Ozs7NENBS3NCO0FBQ3RCLGNBQVEsR0FBUixDQUFlLEtBQUssV0FBTCxTQUFvQixLQUFLLEdBQUwsMkJBQTZCLEtBQUssR0FBTCxLQUFXLEtBQUssZUFBTCxRQUEzRSxFQURzQjs7OztTQXRFWDs7O1NBTUYsb0JBQWtCO0FBQzNCLFVBQVEsaUJBQVUsTUFBVjtBQUNGLFNBQU8saUJBQVUsTUFBVjs7O0lBbUVNOzs7Ozs7Ozs7Ozs7OztzTkFDakIsY0FBWTs7O2VBREs7Ozs7Ozs7eUNBVUc7OztBQUNoQixhQUFPLEtBQUssY0FBTCxHQUFvQix3QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixrQkFBcEIsd0JBQTBDLFNBQTFDLENBQXBCLENBRFM7Ozs7Ozs7Ozs7cUNBUUo7OztBQUNaLGFBQU8seUJBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0IsY0FBcEIseUJBQXNDLFNBQXRDLENBQVAsQ0FEWTs7Ozs0Q0FJSTtBQUN0QixXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQURzQjtBQUV0QixpQ0F4Qm1CLHVFQXdCbkIsQ0FGc0I7Ozs7U0F0Qkg7RUFBMEI7O0FBQTFCLGtCQUVWLGVBQWE7QUFDaEIsVUFBUSxpQkFBVSxNQUFWO0FBQ2QsU0FBTyxpQkFBVSxNQUFWOztrQkFKWTs7SUE0QlI7OztBQUNULFdBRFMsT0FDVCxHQUFhOzBCQURKLFNBQ0k7O3dFQURKLHFCQUVGLFlBRE07O0FBRWYsV0FBTyxNQUFQLENBQWMsT0FBSyxLQUFMLEVBQVcsRUFBQyxTQUFRLE9BQUssS0FBTCxDQUFXLFFBQVgsRUFBbEMsRUFGZTtBQUdULFdBQU8sTUFBUCxDQUFjLE9BQUssUUFBTCxDQUFkO0FBSFM7R0FBYjs7ZUFEUzs7NkJBT0Q7QUFDVixhQUFPLElBQVAsQ0FEVTs7Ozs4QkFJQztBQUNMLFVBQUksV0FBUyxLQUFLLG1CQUFMLEVBQVQsQ0FEQzs7VUFHRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BSEY7O0FBSUwsV0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixRQUFuQixFQUpLO0FBS0wsYUFBTyxjQUFQLENBQXNCLFFBQXRCLEVBTEs7QUFNTCxhQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBTks7Ozs7Ozs7Ozt3Q0FZVyxPQUFNO0FBQ3RCLGFBQU8sSUFBUCxDQURzQjs7OztTQXZCakI7RUFBZ0I7O0FBNEJ0QixTQUFTLFNBQVQsQ0FBbUIsT0FBbkIsRUFBMkI7OztBQUNqQztjQUFhOzs7Ozs7Ozs7O3dDQUtLO1lBQ0YsT0FBTSxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQWIsT0FEUztZQUVJLFNBQVEsS0FBSyxPQUFMLENBQXJCLGFBRlM7O0FBR2hCLFlBQUksVUFBUSxFQUFSLENBSFk7QUFNaEIsZUFBTyxPQUFPLE1BQVAsQ0FBYztBQUNuQix3QkFBYyxPQUFkO1NBREssNkJBWEkseURBV0osQ0FBUCxDQU5nQjs7OztXQUxMO0lBQWtCLGlCQUN2QixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDckMsa0JBQWMsaUJBQVUsTUFBVjtHQURTLEVBRXRCLFFBQVEsaUJBQVIsVUFhSSxlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2hDLGtCQUFjLGlCQUFVLE1BQVY7R0FESSxFQUVqQixRQUFRLFlBQVIsU0FsQkosQ0FEaUM7Q0FBM0IiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxudmFyIHV1aWQ9MFxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtjb250ZW50OlJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHN0eWxlOnRoaXMucHJvcHMuc3R5bGV9XG5cdGNoaWxkcmVuPVtdXG4gICAgY29tcG9zZWQ9W11cbiAgICBfaWQ9dXVpZCsrXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLnN0YXRlLnN0eWxlXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfT57Y29udGVudH08L0dyb3VwPlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHR0aGlzLl9zdGFydENvbXBvc2VBdD1EYXRlLm5vdygpXG5cdFx0aWYodGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aD09MClcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQoKSB0byBub3RpZnkgcGFyZW50IDEgY2hpbGQgY29tcG9zZWRcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBhbGwgY2hpbGRyZW4gY29tcG9zZWRcblx0ICovXG4gICAgb24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgY29tcG9zZWQgYSAke2NoaWxkLmRpc3BsYXlOYW1lfSAke2NoaWxkLmRpc3BsYXlOYW1lPT0ndGV4dCcgPyBgOiR7Y2hpbGQuc3RhdGUudGV4dHx8Y2hpbGQucHJvcHMuY2hpbGRyZW59YCA6ICcnfWApXG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZClcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT10aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHRjb25zb2xlLmxvZyhgJHt0aGlzLmRpc3BsYXlOYW1lfSgke3RoaXMuX2lkfSkgY29tcG9zZWQgd2l0aGluICR7RGF0ZS5ub3coKS10aGlzLl9zdGFydENvbXBvc2VBdH1tc2ApXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50QW5kQ2hpbGQgZXh0ZW5kcyBIYXNDaGlsZHtcbiAgICBkaXNwbGF5TmFtZT1cImNvbnRlbnRcIlxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjb250ZW50OnRoaXMucHJvcHMuY2hpbGRyZW59KVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGxldCBjb21wb3NlZD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogYWZ0ZXIgZmlndXJlIG91dCBwcm9wcywgeW91J2QgYmV0dGVyIGNhbGwgdGhpcyB0byBjcmVhdGUgRWxlbWVudFxuICAgICAqL1xuICAgIGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsYWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIFRvZ2dsYWJsZSBleHRlbmRzIENvbnRlbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdFx0XHR0b2dnbGVTdHlsZXM6IFByb3BUeXBlcy5vYmplY3RcdFxuXHRcdFx0fSxDb250ZW50LmNoaWxkQ29udGV4dFR5cGVzKVxuXHRcdFxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdFx0Y29uc3Qge2lubGluZTptaW5lfT10aGlzLnByb3BzLmNvbnRlbnRTdHlsZVxuXHRcdFx0Y29uc3Qge3RvZ2dsZVN0eWxlczpwYXJlbnR9PXRoaXMuY29udGV4dFxuXHRcdFx0bGV0IHRvZ2dsZXM9e1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHtcblx0XHRcdFx0XHR0b2dnbGVTdHlsZXM6IHRvZ2dsZXNcblx0XHRcdFx0fSwgc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkpXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0dG9nZ2xlU3R5bGVzOiBQcm9wVHlwZXMub2JqZWN0XHRcblx0XHRcdH0sQ29udGVudC5jb250ZXh0VHlwZXMpXG5cdH1cbn1cbiJdfQ==