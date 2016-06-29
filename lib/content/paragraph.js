"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

var _line = require("../compose/line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var puuid = 0; //the line in paragraph != the line in section page, so use id

var Paragraph = function (_Any) {
	_inherits(Paragraph, _Any);

	function Paragraph() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Paragraph);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Paragraph)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Paragraph, [{
		key: "compose",
		value: function compose() {
			_get(Object.getPrototypeOf(Paragraph.prototype), "compose", this).call(this);
			var composed = this.composed;
			var parent = this.context.parent;

			var _parent$nextAvailable = parent.nextAvailableSpace();

			var width = _parent$nextAvailable.width;
			var height = _parent$nextAvailable.height;

			this.maxSize = { width: width, height: height };
			if (0 == composed.length) composed.push(this._newLine());
		}
	}, {
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.maxSize.width,
				_id: puuid++,
				height: 0,
				children: []
			};
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.composed;

			var currentLine = composed[composed.length - 1];
			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.maxSize.height > minRequiredH) {
					return this.maxSize;
				} else {
					return this.maxSize = this.context.parent.nextAvailableSpace(required);
				}
			}
			return { width: availableWidth, height: this.maxSize.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(text) {
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _text$props = text.props;
			var contentWidth = _text$props.width;
			var contentHeight = _text$props.height;


			var piece = null;
			if (availableWidth >= contentWidth) {
				//not appended to parent
				piece = _react2.default.createElement(
					_group2.default,
					{
						x: currentLine.width - availableWidth,
						index: this._finished,
						width: contentWidth,
						height: contentHeight },
					text
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				if (availableWidth == contentWidth) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					this.maxSize.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.maxSize.height >= contentHeight) {
					composed.push(this._newLine());
					if (contentWidth <= this.maxSize.width) this.appendComposed(text);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "_removeAllFrom",
		value: function _removeAllFrom(text) {
			var _this2 = this;

			if (!text) {
				this.composed.splice(0);
				this._finished = 0;
				this.children.splice(0);
				return;
			}

			var composed = this.composed;

			var currentLine = composed[composed.length - 1];
			var found = -1;
			while (-1 == (found = currentLine.children.findIndex(function (group) {
				return group.props.children == text;
			}))) {
				composed.pop();
				if (composed.length) {
					currentLine = composed[composed.length - 1];
				} else {
					break;
				}
			}

			if (found != -1) {
				this._finished = currentLine.children[found].props.index;
				this.children.forEach(function (a, i) {
					if (i > _this2._finished) {
						a._removeAllFrom();
					}
				});
				this.children.splice(this._finished + 1);

				this.context.parent._removeAllFrom(currentLine);

				currentLine.children.splice(found);

				//current line's height should be max height of all children
				currentLine.height = currentLine.children.reduce(function (prev, a) {
					return Math.max(prev, a.props.height);
				}, 0);
			} else {
				throw new Error("you should find the text from paragraph, but not");
			}
		}
	}, {
		key: "finished",
		value: function finished(child) {
			//need append last non-full-width line to parent
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
			}
			if (_get(Object.getPrototypeOf(Paragraph.prototype), "finished", this).call(this, child)) {
				this.maxSize = { width: 0, height: 0 };
				return true;
			}

			return false;
		}
	}]);

	return Paragraph;
}(_any2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxDQUFOOztJQUVpQjs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU07OztjQURjOzs0QkFHUjtBQUNYLDhCQUptQixpREFJbkIsQ0FEVztPQUVFLFdBQVUsS0FBVixTQUZGO09BR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOzsrQkFJZ0IsT0FBTyxrQkFBUCxHQUpoQjs7T0FJRSxvQ0FKRjtPQUlRLHNDQUpSOztBQUtYLFFBQUssT0FBTCxHQUFhLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBYixDQUxXO0FBTUwsT0FBRyxLQUFHLFNBQVMsTUFBVCxFQUNYLFNBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBREs7Ozs7NkJBSUc7QUFDVCxVQUFPO0FBQ0csV0FBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiO0FBQ2hCLFNBQUksT0FBSjtBQUNBLFlBQU8sQ0FBUDtBQUNTLGNBQVMsRUFBVDtJQUpWLENBRFM7Ozs7dUNBU3dCO09BQVosaUVBQVMsa0JBQUc7eUJBQ3dCLFNBQTVDLE1BRG9CO09BQ2QsK0NBQWEsb0JBREM7MEJBQ3dCLFNBQXZCLE9BREQ7T0FDUSxnREFBYSxxQkFEckI7T0FFcEIsV0FBVSxLQUFWLFNBRm9COztBQUczQixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FIdUI7T0FJdEIsUUFBTyxZQUFQLE1BSnNCOztBQUszQixPQUFJLGlCQUFlLFlBQVksUUFBWixDQUFxQixNQUFyQixDQUE0QixVQUFDLElBQUQsRUFBTSxDQUFOO1dBQVUsT0FBSyxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQWYsRUFBNkIsS0FBekQsQ0FBZixDQUx1QjtBQU0zQixPQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUNyQyxR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LE9BQUwsR0FBYSxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUF2QixDQUR3QjtBQUV4QixXQUFPLElBQVAsQ0FGd0I7SUFBekI7O0FBS0EsVUFBTyxLQUFQLENBZGM7Ozs7UUEzSEsiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2UvbGluZVwiXG5cbnZhciBwdXVpZD0wLy90aGUgbGluZSBpbiBwYXJhZ3JhcGggIT0gdGhlIGxpbmUgaW4gc2VjdGlvbiBwYWdlLCBzbyB1c2UgaWRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgQW55e1xuXHRzdGF0ZT17fVxuXG4gICAgY29tcG9zZSgpe1xuXHRcdHN1cGVyLmNvbXBvc2UoKVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHR9PXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdHRoaXMubWF4U2l6ZT17d2lkdGgsaGVpZ2h0fVxuICAgICAgICBpZigwPT1jb21wb3NlZC5sZW5ndGgpXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcbiAgICB9XG5cblx0X25ld0xpbmUoKXtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMubWF4U2l6ZS53aWR0aCxcblx0XHRcdF9pZDpwdXVpZCsrLFxuXHRcdFx0aGVpZ2h0OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XG5cdFx0XHRpZih0aGlzLm1heFNpemUuaGVpZ2h0Pm1pblJlcXVpcmVkSCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLm1heFNpemVcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLm1heFNpemUuaGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKHRleHQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0fT10ZXh0LnByb3BzXG5cblxuXHRcdGxldCBwaWVjZT1udWxsXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpey8vbm90IGFwcGVuZGVkIHRvIHBhcmVudFxuICAgICAgICAgICAgcGllY2U9KFxuXHRcdFx0XHRcdDxHcm91cCBcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuX2ZpbmlzaGVkfVxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH0gXG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9PlxuXHRcdFx0XHRcdFx0e3RleHR9XG5cdFx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdFx0XHQpXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0XHRcdHRoaXMubWF4U2l6ZS5oZWlnaHQtPWN1cnJlbnRMaW5lLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLm1heFNpemUuaGVpZ2h0Pj1jb250ZW50SGVpZ2h0KXtcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9dGhpcy5tYXhTaXplLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQodGV4dClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXHRcblx0X3JlbW92ZUFsbEZyb20odGV4dCl7XG5cdFx0aWYoIXRleHQpe1xuXHRcdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHRcdHRoaXMuX2ZpbmlzaGVkPTBcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdGxldCBmb3VuZD0tMVxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudExpbmUuY2hpbGRyZW4uZmluZEluZGV4KGdyb3VwPT57XG5cdFx0XHRyZXR1cm4gZ3JvdXAucHJvcHMuY2hpbGRyZW49PXRleHRcblx0XHR9KSkpe1xuXHRcdFx0Y29tcG9zZWQucG9wKClcblx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRcdGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGlmKGZvdW5kIT0tMSl7XG5cdFx0XHR0aGlzLl9maW5pc2hlZD1jdXJyZW50TGluZS5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcblx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRpZihpPnRoaXMuX2ZpbmlzaGVkKXtcblx0XHRcdFx0XHRhLl9yZW1vdmVBbGxGcm9tKClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKHRoaXMuX2ZpbmlzaGVkKzEpXG5cdFx0XHRcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuX3JlbW92ZUFsbEZyb20oY3VycmVudExpbmUpXG5cdFx0XHRcblx0XHRcdGN1cnJlbnRMaW5lLmNoaWxkcmVuLnNwbGljZShmb3VuZClcblx0XHRcdFxuXHRcdFx0Ly9jdXJyZW50IGxpbmUncyBoZWlnaHQgc2hvdWxkIGJlIG1heCBoZWlnaHQgb2YgYWxsIGNoaWxkcmVuXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+TWF0aC5tYXgocHJldiwgYS5wcm9wcy5oZWlnaHQpLDApXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0fWVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYHlvdSBzaG91bGQgZmluZCB0aGUgdGV4dCBmcm9tIHBhcmFncmFwaCwgYnV0IG5vdGApXG5cdFx0fVxuXHR9XG5cblx0ZmluaXNoZWQoY2hpbGQpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHR9XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoY2hpbGQpKXtcblx0XHRcdHRoaXMubWF4U2l6ZT17d2lkdGg6MCwgaGVpZ2h0OjB9XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIl19