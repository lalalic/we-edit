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
						index: this.children.length,
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
				(function () {
					var index = currentLine.children[found].props.index;
					_this2.children.forEach(function (a, i) {
						if (i > index) {
							a._removeAllFrom();
						}
					});
					_this2.children.splice(index);

					_this2.context.parent._removeAllFrom(currentLine);

					currentLine.children.splice(found);

					//current line's height should be max height of all children
					currentLine.height = currentLine.children.reduce(function (prev, a) {
						return Math.max(prev, a.props.height);
					}, 0);
				})();
			} else {
				throw new Error("you should find the text from paragraph, but not");
			}
		}
	}, {
		key: "finished",
		value: function finished(child) {
			//need append last non-full-width line to parent
			if (_get(Object.getPrototypeOf(Paragraph.prototype), "finished", this).call(this, child)) {
				var composed = this.composed;
				var parent = this.context.parent;


				var currentLine = composed[composed.length - 1];
				var availableWidth = currentLine.children.reduce(function (prev, a) {
					return prev - a.props.width;
				}, currentLine.width);
				if (availableWidth > 0) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
				} else if (availableWidth == 0) {
					//already appended to parent in appendComposed
				}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxDQUFOOztJQUVpQjs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU07OztjQURjOzs0QkFHUjtBQUNYLDhCQUptQixpREFJbkIsQ0FEVztPQUVFLFdBQVUsS0FBVixTQUZGO09BR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOzsrQkFJZ0IsT0FBTyxrQkFBUCxHQUpoQjs7T0FJRSxvQ0FKRjtPQUlRLHNDQUpSOztBQUtYLFFBQUssT0FBTCxHQUFhLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBYixDQUxXO0FBTUwsT0FBRyxLQUFHLFNBQVMsTUFBVCxFQUNYLFNBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBREs7Ozs7NkJBSUc7QUFDVCxVQUFPO0FBQ0csV0FBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiO0FBQ2hCLFNBQUksT0FBSjtBQUNBLFlBQU8sQ0FBUDtBQUNTLGNBQVMsRUFBVDtJQUpWLENBRFM7Ozs7dUNBU3dCO09BQVosaUVBQVMsa0JBQUc7eUJBQ3dCLFNBQTVDLE1BRG9CO09BQ2QsK0NBQWEsb0JBREM7MEJBQ3dCLFNBQXZCLE9BREQ7T0FDUSxnREFBYSxxQkFEckI7T0FFcEIsV0FBVSxLQUFWLFNBRm9COztBQUczQixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FIdUI7T0FJdEIsUUFBTyxZQUFQLE1BSnNCOztBQUszQixPQUFJLGlCQUFlLFlBQVksUUFBWixDQUFxQixNQUFyQixDQUE0QixVQUFDLElBQUQsRUFBTSxDQUFOO1dBQVUsT0FBSyxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQWYsRUFBNkIsS0FBekQsQ0FBZixDQUx1QjtBQU0zQixPQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUNyQyxR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UUFBTyxDQUFQLEVBQXZCLENBWndCO0FBYXhCLFdBQU8sSUFBUCxDQWJ3QjtJQUF6Qjs7QUFnQkEsVUFBTyxLQUFQLENBakJjOzs7O1FBMUhLIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlL2xpbmVcIlxuXG52YXIgcHV1aWQ9MC8vdGhlIGxpbmUgaW4gcGFyYWdyYXBoICE9IHRoZSBsaW5lIGluIHNlY3Rpb24gcGFnZSwgc28gdXNlIGlkXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIEFueXtcblx0c3RhdGU9e31cblxuICAgIGNvbXBvc2UoKXtcblx0XHRzdXBlci5jb21wb3NlKClcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7d2lkdGgsaGVpZ2h0fT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcblx0XHR0aGlzLm1heFNpemU9e3dpZHRoLGhlaWdodH1cbiAgICAgICAgaWYoMD09Y29tcG9zZWQubGVuZ3RoKVxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG4gICAgfVxuXG5cdF9uZXdMaW5lKCl7XG5cdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLm1heFNpemUud2lkdGgsXG5cdFx0XHRfaWQ6cHV1aWQrKyxcblx0XHRcdGhlaWdodDowLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5tYXhTaXplLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZCh0ZXh0KXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09dGV4dC5wcm9wc1xuXG5cblx0XHRsZXQgcGllY2U9bnVsbFxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXAgXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGluZGV4PXt0aGlzLmNoaWxkcmVuLmxlbmd0aH1cblx0XHRcdFx0XHRcdHdpZHRoPXtjb250ZW50V2lkdGh9IFxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cblx0XHRcdFx0XHRcdHt0ZXh0fVxuXHRcdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFx0KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPT1jb250ZW50V2lkdGgpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0XHR0aGlzLm1heFNpemUuaGVpZ2h0LT1jdXJyZW50TGluZS5oZWlnaHRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD49Y29udGVudEhlaWdodCl7XG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMubWF4U2l6ZS53aWR0aClcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKHRleHQpXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly9uZXZlciBiZSBoZXJlXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblx0XG5cdF9yZW1vdmVBbGxGcm9tKHRleHQpe1xuXHRcdGlmKCF0ZXh0KXtcblx0XHRcdHRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRsZXQgZm91bmQ9LTFcblx0XHR3aGlsZSgtMT09KGZvdW5kPWN1cnJlbnRMaW5lLmNoaWxkcmVuLmZpbmRJbmRleChncm91cD0+e1xuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuPT10ZXh0XG5cdFx0fSkpKXtcblx0XHRcdGNvbXBvc2VkLnBvcCgpXG5cdFx0XHRpZihjb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0XHRjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRpZihmb3VuZCE9LTEpe1xuXHRcdFx0bGV0IGluZGV4PWN1cnJlbnRMaW5lLmNoaWxkcmVuW2ZvdW5kXS5wcm9wcy5pbmRleFxuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChhLGkpPT57XG5cdFx0XHRcdGlmKGk+aW5kZXgpe1xuXHRcdFx0XHRcdGEuX3JlbW92ZUFsbEZyb20oKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgpXG5cdFx0XHRcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuX3JlbW92ZUFsbEZyb20oY3VycmVudExpbmUpXG5cdFx0XHRcblx0XHRcdGN1cnJlbnRMaW5lLmNoaWxkcmVuLnNwbGljZShmb3VuZClcblx0XHRcdFxuXHRcdFx0Ly9jdXJyZW50IGxpbmUncyBoZWlnaHQgc2hvdWxkIGJlIG1heCBoZWlnaHQgb2YgYWxsIGNoaWxkcmVuXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+TWF0aC5tYXgocHJldiwgYS5wcm9wcy5oZWlnaHQpLDApXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0fWVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYHlvdSBzaG91bGQgZmluZCB0aGUgdGV4dCBmcm9tIHBhcmFncmFwaCwgYnV0IG5vdGApXG5cdFx0fVxuXHR9XG5cblx0ZmluaXNoZWQoY2hpbGQpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGlmKHN1cGVyLmZpbmlzaGVkKGNoaWxkKSl7XG5cdFx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cdFx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcblx0XHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0aGlzLm1heFNpemU9e3dpZHRoOjAsIGhlaWdodDowfVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cbiJdfQ==