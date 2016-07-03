"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoChild = exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _reactAddonsShallowCompare = require("react-addons-shallow-compare");

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { content: _react2.default.Children.toArray(_this.props.children), style: { fontFamily: "arial" } }, _this.children = [], _this.composed = [], _this._id = uuid++, _temp), _possibleConstructorReturn(_this, _ret);
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

      return (_context$parent = this.context.parent).nextAvailableSpace.apply(_context$parent, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLE9BQUssQ0FBTDs7SUFDUzs7Ozs7Ozs7Ozs7Ozs7c01BQ1QsUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQixFQUFxRCxPQUFNLEVBQUMsWUFBVyxPQUFYLEVBQVAsVUFDL0QsV0FBUyxVQUNOLFdBQVMsVUFDVCxNQUFJOzs7ZUFKSzs7c0NBV1E7QUFDYixhQUFPO0FBQ1osZ0JBQVEsSUFBUjtBQUNTLGVBQU8sS0FBSyxLQUFMLENBQVcsS0FBWDtPQUZYLENBRGE7Ozs7NkJBT1o7bUJBQ3FCLEtBQUssS0FBTCxDQURyQjtVQUNBLDJCQURBOztVQUNhLHdEQURiOztVQUVBLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFGQTs7QUFHRCxhQUFPOztRQUFXLEtBQUssS0FBTDtRQUFhLE9BQXhCO09BQVAsQ0FIQzs7Ozs7Ozs7O3lDQVNlO0FBQ2hCLFdBQUssT0FBTCxHQURnQjs7Ozs7Ozs7Ozs4QkFRZDtBQUNSLFdBQUssZUFBTCxHQUFxQixLQUFLLEdBQUwsRUFBckIsQ0FEUTs7Ozs7Ozs7OzttQ0FRUyxNQUFLOzs7Ozs7Ozs7eUNBUTRCO1VBQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7OztxQ0FTL0IsT0FBTTtBQUNuQixjQUFRLElBQVIsaUJBQTJCLE1BQU0sV0FBTixVQUFxQixNQUFNLFdBQU4sSUFBbUIsTUFBbkIsVUFBZ0MsTUFBTSxLQUFOLENBQVksSUFBWixJQUFrQixNQUFNLEtBQU4sQ0FBWSxRQUFaLENBQWxELEdBQTJFLEVBQTNFLENBQWhELEVBRG1CO0FBRW5CLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsRUFGbUI7QUFHekIsVUFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLElBQTJCLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBcUI7QUFDbEQsYUFBSyxxQkFBTCxHQURrRDtPQUFuRDs7Ozs0Q0FLc0I7QUFDdEIsY0FBUSxHQUFSLENBQWUsS0FBSyxXQUFMLFNBQW9CLEtBQUssR0FBTCwyQkFBNkIsS0FBSyxHQUFMLEtBQVcsS0FBSyxlQUFMLFFBQTNFLEVBRHNCOzs7O1NBcEVYOzs7U0FNRixvQkFBa0I7QUFDM0IsVUFBUSxpQkFBVSxNQUFWO0FBQ0YsU0FBTyxpQkFBVSxNQUFWOzs7SUFpRU07Ozs7Ozs7Ozs7Ozs7O3NOQUNqQixjQUFZOzs7ZUFESzs7Ozs7Ozt5Q0FTRzs7O0FBQ2hCLGFBQU8sd0JBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0Isa0JBQXBCLHdCQUEwQyxTQUExQyxDQUFQLENBRGdCOzs7Ozs7Ozs7O3FDQVFKOzs7QUFDWixhQUFPLHlCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGNBQXBCLHlCQUFzQyxTQUF0QyxDQUFQLENBRFk7Ozs7NENBSUk7QUFDdEIsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFEc0I7QUFFdEIsaUNBdkJtQix1RUF1Qm5CLENBRnNCOzs7O1NBckJIO0VBQTBCOztBQUExQixrQkFFVixlQUFhO0FBQ2hCLFVBQVEsaUJBQVUsTUFBVjs7a0JBSEs7O0lBMkJSOzs7QUFDVCxXQURTLE9BQ1QsR0FBYTswQkFESixTQUNJOzt3RUFESixxQkFFRixZQURNOztBQUVmLFdBQU8sTUFBUCxDQUFjLE9BQUssS0FBTCxFQUFXLEVBQUMsU0FBUSxPQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQWxDLEVBRmU7QUFHVCxXQUFPLE1BQVAsQ0FBYyxPQUFLLFFBQUwsQ0FBZDtBQUhTO0dBQWI7O2VBRFM7OzZCQU9EO0FBQ1YsYUFBTyxJQUFQLENBRFU7Ozs7OEJBSUM7QUFDTCxVQUFJLFdBQVMsS0FBSyxtQkFBTCxFQUFULENBREM7O1VBR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOztBQUlMLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFKSztBQUtMLGFBQU8sY0FBUCxDQUFzQixRQUF0QixFQUxLO0FBTUwsYUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQU5LOzs7Ozs7Ozs7d0NBWVcsT0FBTTtBQUN0QixhQUFPLElBQVAsQ0FEc0I7Ozs7U0F2QmpCO0VBQWdCIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgc2hhbGxvd0NvbXBhcmUgZnJvbSAncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZSdcblxudmFyIHV1aWQ9MFxuZXhwb3J0IGNsYXNzIEhhc0NoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtjb250ZW50OlJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHN0eWxlOntmb250RmFtaWx5OlwiYXJpYWxcIn19XG5cdGNoaWxkcmVuPVtdXG4gICAgY29tcG9zZWQ9W11cbiAgICBfaWQ9dXVpZCsrXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLnN0YXRlLnN0eWxlXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfT57Y29udGVudH08L0dyb3VwPlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBvc2Ugb24gY2xpZW50IG9yIHNlcnZlclxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVzdWFsbHkgTm9DaGlsZCBjb250ZW50IHNob3VsZCBiZSBjb21wb3NlZCBhY2NvcmRpbmcgdG8gbmV4dEF2YWlsYWJsZVNwYWNlLFxuICAgICAqIGFuZCB0aGVuIGFwcGVuZCB0byBpdHNlbGYuY29tcG9zZWRbXSBhbmQgcGFyZW50LmFwcGVuZENvbXBvc2VkXG4gICAgICovXG5cdGNvbXBvc2UoKXtcblx0XHR0aGlzLl9zdGFydENvbXBvc2VBdD1EYXRlLm5vdygpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcbiAgICAgICAgY29uc29sZS5pbmZvKGBjb21wb3NlZCBhICR7Y2hpbGQuZGlzcGxheU5hbWV9ICR7Y2hpbGQuZGlzcGxheU5hbWU9PSd0ZXh0JyA/IGA6JHtjaGlsZC5zdGF0ZS50ZXh0fHxjaGlsZC5wcm9wcy5jaGlsZHJlbn1gIDogJyd9YClcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdGNvbnNvbGUubG9nKGAke3RoaXMuZGlzcGxheU5hbWV9KCR7dGhpcy5faWR9KSBjb21wb3NlZCB3aXRoaW4gJHtEYXRlLm5vdygpLXRoaXMuX3N0YXJ0Q29tcG9zZUF0fW1zYClcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNQYXJlbnRBbmRDaGlsZCBleHRlbmRzIEhhc0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiY29udGVudFwiXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb0NoaWxkIGV4dGVuZHMgSGFzUGFyZW50QW5kQ2hpbGR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjb250ZW50OnRoaXMucHJvcHMuY2hpbGRyZW59KVxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuY2hpbGRyZW4pLy9ubyBjaGlsZHJlblxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cbiAgICBjb21wb3NlKCl7XG4gICAgICAgIGxldCBjb21wb3NlZD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UoKVxuXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICB0aGlzLmNvbXBvc2VkLnB1c2goY29tcG9zZWQpXG4gICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb21wb3NlZClcbiAgICAgICAgcGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogYWZ0ZXIgZmlndXJlIG91dCBwcm9wcywgeW91J2QgYmV0dGVyIGNhbGwgdGhpcyB0byBjcmVhdGUgRWxlbWVudFxuICAgICAqL1xuICAgIGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn1cbiJdfQ==