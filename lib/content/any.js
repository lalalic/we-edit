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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztRQW1JZ0I7O0FBbkloQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7Ozs7OztzTUFDVCxRQUFNLEVBQUMsU0FBUSxnQkFBTSxRQUFOLENBQWUsT0FBZixDQUF1QixNQUFLLEtBQUwsQ0FBVyxRQUFYLENBQS9CLEVBQXFELE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxVQUNyRSxXQUFTLFVBQ04sV0FBUzs7O2VBSEE7O3NDQVVRO0FBQ2IsYUFBTztBQUNaLGdCQUFRLElBQVI7QUFDUyxlQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7T0FGWCxDQURhOzs7OzZCQU9aO21CQUNxQixLQUFLLEtBQUwsQ0FEckI7VUFDQSwyQkFEQTs7VUFDYSx3REFEYjs7VUFFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsYUFBTzs7UUFBVyxLQUFLLEtBQUw7UUFBYSxPQUF4QjtPQUFQLENBSEM7Ozs7Ozs7Ozt5Q0FTZTtBQUNoQixXQUFLLE9BQUwsR0FEZ0I7Ozs7Ozs7Ozs7OEJBUWQ7QUFDUixVQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBMkIsQ0FBM0IsRUFDRixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQUREOzs7Ozs7Ozs7O21DQVFpQixNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUNuQixXQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRG1CO0FBRXpCLFVBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELGFBQUsscUJBQUwsR0FEa0Q7T0FBbkQ7Ozs7NENBS3NCOzs7U0FuRVg7OztTQUtGLG9CQUFrQjtBQUMzQixVQUFRLGlCQUFVLE1BQVY7QUFDRixTQUFPLGlCQUFVLE1BQVY7OztJQWlFTTs7Ozs7Ozs7Ozs7Ozs7c05BQ2pCLGNBQVk7OztlQURLOzs7Ozs7O3lDQVVHOzs7QUFDaEIsYUFBTyxLQUFLLGNBQUwsR0FBb0Isd0JBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0Isa0JBQXBCLHdCQUEwQyxTQUExQyxDQUFwQixDQURTOzs7Ozs7Ozs7O3FDQVFKOzs7QUFDWixhQUFPLHlCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGNBQXBCLHlCQUFzQyxTQUF0QyxDQUFQLENBRFk7Ozs7NENBSUk7QUFDdEIsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFEc0I7QUFFdEIsaUNBeEJtQix1RUF3Qm5CLENBRnNCOzs7O1NBdEJIO0VBQTBCOztBQUExQixrQkFFVixlQUFhO0FBQ2hCLFVBQVEsaUJBQVUsTUFBVjtBQUNkLFNBQU8saUJBQVUsTUFBVjs7a0JBSlk7O0lBNEJSOzs7QUFDVCxXQURTLE9BQ1QsR0FBYTswQkFESixTQUNJOzt3RUFESixxQkFFRixZQURNOztBQUVmLFdBQU8sTUFBUCxDQUFjLE9BQUssS0FBTCxFQUFXLEVBQUMsU0FBUSxPQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQWxDLEVBRmU7QUFHVCxXQUFPLE1BQVAsQ0FBYyxPQUFLLFFBQUwsQ0FBZDtBQUhTO0dBQWI7O2VBRFM7OzZCQU9EO0FBQ1YsYUFBTyxJQUFQLENBRFU7Ozs7OEJBSUM7QUFDTCxVQUFJLFdBQVMsS0FBSyxtQkFBTCxFQUFULENBREM7O1VBR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOztBQUlMLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFKSztBQUtMLGFBQU8sY0FBUCxDQUFzQixRQUF0QixFQUxLO0FBTUwsYUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQU5LOzs7Ozs7Ozs7d0NBWVcsT0FBTTtBQUN0QixhQUFPLElBQVAsQ0FEc0I7Ozs7U0F2QmpCO0VBQWdCOztBQTRCdEIsU0FBUyxTQUFULENBQW1CLE9BQW5CLEVBQTJCOzs7QUFDakM7Y0FBYTs7Ozs7Ozs7Ozt3Q0FLSztZQUNGLE9BQU0sS0FBSyxLQUFMLENBQVcsWUFBWCxDQUFiLE9BRFM7WUFFSSxTQUFRLEtBQUssT0FBTCxDQUFyQixhQUZTOztBQUdoQixZQUFJLFVBQVEsRUFBUixDQUhZO0FBTWhCLGVBQU8sT0FBTyxNQUFQLENBQWM7QUFDbkIsd0JBQWMsT0FBZDtTQURLLDZCQVhJLHlEQVdKLENBQVAsQ0FOZ0I7Ozs7V0FMTDtJQUFrQixpQkFDdkIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3JDLGtCQUFjLGlCQUFVLE1BQVY7R0FEUyxFQUV0QixRQUFRLGlCQUFSLFVBYUksZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNoQyxrQkFBYyxpQkFBVSxNQUFWO0dBREksRUFFakIsUUFBUSxZQUFSLFNBbEJKLENBRGlDO0NBQTNCIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBjbGFzcyBIYXNDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17Y29udGVudDpSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCBzdHlsZTp0aGlzLnByb3BzLnN0eWxlfVxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLnN0YXRlLnN0eWxlXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfT57Y29udGVudH08L0dyb3VwPlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT0wKVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgZGlzcGxheU5hbWU9XCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9DaGlsZCBleHRlbmRzIEhhc1BhcmVudEFuZENoaWxke1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmNoaWxkcmVuKS8vbm8gY2hpbGRyZW5cblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG4gICAgY29tcG9zZSgpe1xuICAgICAgICBsZXQgY29tcG9zZWQ9dGhpcy5jcmVhdGVDb21wb3NlZFBpZWNlKClcblxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcbiAgICAgICAgdGhpcy5jb21wb3NlZC5wdXNoKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIGFmdGVyIGZpZ3VyZSBvdXQgcHJvcHMsIHlvdSdkIGJldHRlciBjYWxsIHRoaXMgdG8gY3JlYXRlIEVsZW1lbnRcbiAgICAgKi9cbiAgICBjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGFibGUoQ29udGVudCl7XG5cdHJldHVybiBjbGFzcyBUb2dnbGFibGUgZXh0ZW5kcyBDb250ZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRcdFx0dG9nZ2xlU3R5bGVzOiBQcm9wVHlwZXMub2JqZWN0XHRcblx0XHRcdH0sQ29udGVudC5jaGlsZENvbnRleHRUeXBlcylcblx0XHRcblx0XHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRcdGNvbnN0IHtpbmxpbmU6bWluZX09dGhpcy5wcm9wcy5jb250ZW50U3R5bGVcblx0XHRcdGNvbnN0IHt0b2dnbGVTdHlsZXM6cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRcdGxldCB0b2dnbGVzPXtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRcdFx0dG9nZ2xlU3R5bGVzOiB0b2dnbGVzXG5cdFx0XHRcdH0sIHN1cGVyLmdldENoaWxkQ29udGV4dCgpKVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0XHRcdHRvZ2dsZVN0eWxlczogUHJvcFR5cGVzLm9iamVjdFx0XG5cdFx0XHR9LENvbnRlbnQuY29udGV4dFR5cGVzKVxuXHR9XG59XG4iXX0=