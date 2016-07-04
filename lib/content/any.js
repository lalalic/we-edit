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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxPQUFLLENBQUw7O0lBQ1M7Ozs7Ozs7Ozs7Ozs7O3NNQUNULFFBQU0sRUFBQyxTQUFRLGdCQUFNLFFBQU4sQ0FBZSxPQUFmLENBQXVCLE1BQUssS0FBTCxDQUFXLFFBQVgsQ0FBL0IsRUFBcUQsT0FBTSxNQUFLLEtBQUwsQ0FBVyxLQUFYLFVBQ3JFLFdBQVMsVUFDTixXQUFTLFVBQ1QsTUFBSTs7O2VBSks7O3NDQVdRO0FBQ2IsYUFBTztBQUNaLGdCQUFRLElBQVI7QUFDUyxlQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7T0FGWCxDQURhOzs7OzZCQU9aO21CQUNxQixLQUFLLEtBQUwsQ0FEckI7VUFDQSwyQkFEQTs7VUFDYSx3REFEYjs7VUFFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsYUFBTzs7UUFBVyxLQUFLLEtBQUw7UUFBYSxPQUF4QjtPQUFQLENBSEM7Ozs7Ozs7Ozt5Q0FTZTtBQUNoQixXQUFLLE9BQUwsR0FEZ0I7Ozs7Ozs7Ozs7OEJBUWQ7QUFDUixXQUFLLGVBQUwsR0FBcUIsS0FBSyxHQUFMLEVBQXJCLENBRFE7Ozs7Ozs7Ozs7bUNBUVMsTUFBSzs7Ozs7Ozs7O3lDQVE0QjtVQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7Ozs7cUNBUy9CLE9BQU07QUFDbkIsY0FBUSxJQUFSLGlCQUEyQixNQUFNLFdBQU4sVUFBcUIsTUFBTSxXQUFOLElBQW1CLE1BQW5CLFVBQWdDLE1BQU0sS0FBTixDQUFZLElBQVosSUFBa0IsTUFBTSxLQUFOLENBQVksUUFBWixDQUFsRCxHQUEyRSxFQUEzRSxDQUFoRCxFQURtQjtBQUVuQixXQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRm1CO0FBR3pCLFVBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELGFBQUsscUJBQUwsR0FEa0Q7T0FBbkQ7Ozs7NENBS3NCO0FBQ3RCLGNBQVEsR0FBUixDQUFlLEtBQUssV0FBTCxTQUFvQixLQUFLLEdBQUwsMkJBQTZCLEtBQUssR0FBTCxLQUFXLEtBQUssZUFBTCxRQUEzRSxFQURzQjs7OztTQXBFWDs7O1NBTUYsb0JBQWtCO0FBQzNCLFVBQVEsaUJBQVUsTUFBVjtBQUNGLFNBQU8saUJBQVUsTUFBVjs7O0lBaUVNOzs7Ozs7Ozs7Ozs7OztzTkFDakIsY0FBWTs7O2VBREs7Ozs7Ozs7eUNBVUc7OztBQUNoQixhQUFPLHdCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGtCQUFwQix3QkFBMEMsU0FBMUMsQ0FBUCxDQURnQjs7Ozs7Ozs7OztxQ0FRSjs7O0FBQ1osYUFBTyx5QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixjQUFwQix5QkFBc0MsU0FBdEMsQ0FBUCxDQURZOzs7OzRDQUlJO0FBQ3RCLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBRHNCO0FBRXRCLGlDQXhCbUIsdUVBd0JuQixDQUZzQjs7OztTQXRCSDtFQUEwQjs7QUFBMUIsa0JBRVYsZUFBYTtBQUNoQixVQUFRLGlCQUFVLE1BQVY7QUFDZCxTQUFPLGlCQUFVLE1BQVY7O2tCQUpZOztJQTRCUjs7O0FBQ1QsV0FEUyxPQUNULEdBQWE7MEJBREosU0FDSTs7d0VBREoscUJBRUYsWUFETTs7QUFFZixXQUFPLE1BQVAsQ0FBYyxPQUFLLEtBQUwsRUFBVyxFQUFDLFNBQVEsT0FBSyxLQUFMLENBQVcsUUFBWCxFQUFsQyxFQUZlO0FBR1QsV0FBTyxNQUFQLENBQWMsT0FBSyxRQUFMLENBQWQ7QUFIUztHQUFiOztlQURTOzs2QkFPRDtBQUNWLGFBQU8sSUFBUCxDQURVOzs7OzhCQUlDO0FBQ0wsVUFBSSxXQUFTLEtBQUssbUJBQUwsRUFBVCxDQURDOztVQUdFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIRjs7QUFJTCxXQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFFBQW5CLEVBSks7QUFLTCxhQUFPLGNBQVAsQ0FBc0IsUUFBdEIsRUFMSztBQU1MLGFBQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUFOSzs7Ozs7Ozs7O3dDQVlXLE9BQU07QUFDdEIsYUFBTyxJQUFQLENBRHNCOzs7O1NBdkJqQjtFQUFnQiIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG52YXIgdXVpZD0wXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2NvbnRlbnQ6UmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSwgc3R5bGU6dGhpcy5wcm9wcy5zdHlsZX1cblx0Y2hpbGRyZW49W11cbiAgICBjb21wb3NlZD1bXVxuICAgIF9pZD11dWlkKytcblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuXHRcdFx0cGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuc3RhdGUuc3R5bGVcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9Pntjb250ZW50fTwvR3JvdXA+XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcG9zZSBvbiBjbGllbnQgb3Igc2VydmVyXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXN1YWxseSBOb0NoaWxkIGNvbnRlbnQgc2hvdWxkIGJlIGNvbXBvc2VkIGFjY29yZGluZyB0byBuZXh0QXZhaWxhYmxlU3BhY2UsXG4gICAgICogYW5kIHRoZW4gYXBwZW5kIHRvIGl0c2VsZi5jb21wb3NlZFtdIGFuZCBwYXJlbnQuYXBwZW5kQ29tcG9zZWRcbiAgICAgKi9cblx0Y29tcG9zZSgpe1xuXHRcdHRoaXMuX3N0YXJ0Q29tcG9zZUF0PURhdGUubm93KClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e3dpZHRoOjAsIGhlaWdodDowfSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuICAgICAgICBjb25zb2xlLmluZm8oYGNvbXBvc2VkIGEgJHtjaGlsZC5kaXNwbGF5TmFtZX0gJHtjaGlsZC5kaXNwbGF5TmFtZT09J3RleHQnID8gYDoke2NoaWxkLnN0YXRlLnRleHR8fGNoaWxkLnByb3BzLmNoaWxkcmVufWAgOiAnJ31gKVxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYodGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aD09dGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0Y29uc29sZS5sb2coYCR7dGhpcy5kaXNwbGF5TmFtZX0oJHt0aGlzLl9pZH0pIGNvbXBvc2VkIHdpdGhpbiAke0RhdGUubm93KCktdGhpcy5fc3RhcnRDb21wb3NlQXR9bXNgKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudEFuZENoaWxkIGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgZGlzcGxheU5hbWU9XCJjb250ZW50XCJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQ2hpbGQgZXh0ZW5kcyBIYXNQYXJlbnRBbmRDaGlsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbn0pXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5jaGlsZHJlbikvL25vIGNoaWxkcmVuXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgbGV0IGNvbXBvc2VkPXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSgpXG5cbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIHRoaXMuY29tcG9zZWQucHVzaChjb21wb3NlZClcbiAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbXBvc2VkKVxuICAgICAgICBwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBhZnRlciBmaWd1cmUgb3V0IHByb3BzLCB5b3UnZCBiZXR0ZXIgY2FsbCB0aGlzIHRvIGNyZWF0ZSBFbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuIl19