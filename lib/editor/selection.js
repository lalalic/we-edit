"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Selection = exports.reducer = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DOMAIN = "selection";
var ACTION = exports.ACTION = {
	SELECT: function SELECT(start, at) {
		var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;
		var endAt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : at;
		return {
			type: DOMAIN + "/selected",
			payload: {
				start: {
					id: start,
					at: at
				},
				end: {
					id: end,
					at: endAt
				}
			}
		};
	},
	MOVE_RIGHT: function MOVE_RIGHT(a) {
		return { type: DOMAIN + "/MOVE_RIGHT" };
	},
	MOVE_LEFT: function MOVE_LEFT(a) {
		return { type: DOMAIN + "/MOVE_LEFT" };
	},
	MOVE_UP: function MOVE_UP(a) {
		return { type: DOMAIN + "/MOVE_UP" };
	},
	MOVE_DOWN: function MOVE_DOWN(a) {
		return { type: DOMAIN + "/MOVE_DOWN" };
	}

};
var INIT_STATE = {
	start: {
		id: 0,
		at: 0
	},
	end: {
		id: 0,
		at: 0
	}
};
var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case DOMAIN + "/selected":
			return _extends({}, state, payload);
		case DOMAIN + "/MOVE_DOWN":
		case DOMAIN + "/MOVE_RIGHT":
			{
				var _state$start = state.start,
				    id = _state$start.id,
				    at = _state$start.at,
				    end = state.end;

				var target = (0, _selector.getContent)(id);
				var text = target.getContent();
				if (text.length > at + 1) {
					at++;
				} else {
					target = (0, _selector.getNextTextOf)(id);
					if (target) {
						id = target.id;
						at = 0;
					} else {
						//keep cursor at end of current target
					}
				}
				return { start: { id: id, at: at }, end: { id: id, at: at } };
			}
		case DOMAIN + "/MOVE_UP":
		case DOMAIN + "/MOVE_LEFT":
			{
				var _state$start2 = state.start,
				    _id = _state$start2.id,
				    _at = _state$start2.at,
				    _end = state.end;

				if (_at > 0) {
					_at--;
				} else {
					var _target = (0, _selector.getPrevTextOf)(_id);
					if (_target) {
						_id = _target.id;
						_at = _target.getContent().length - 1;
					} else {
						//keep cursor at end of current target
					}
				}
				return { start: { id: _id, at: _at }, end: { id: _id, at: _at } };
			}
	}
	return state;
};

var Selection = exports.Selection = function (_Component) {
	_inherits(Selection, _Component);

	function Selection() {
		_classCallCheck(this, Selection);

		return _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).apply(this, arguments));
	}

	_createClass(Selection, [{
		key: "render",
		value: function render() {
			return null;
		}
	}]);

	return Selection;
}(_react.Component);

exports.default = Selection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIlNFTEVDVCIsInN0YXJ0IiwiYXQiLCJlbmQiLCJlbmRBdCIsInR5cGUiLCJwYXlsb2FkIiwiaWQiLCJNT1ZFX1JJR0hUIiwiTU9WRV9MRUZUIiwiTU9WRV9VUCIsIk1PVkVfRE9XTiIsIklOSVRfU1RBVEUiLCJyZWR1Y2VyIiwic3RhdGUiLCJ0YXJnZXQiLCJ0ZXh0IiwiZ2V0Q29udGVudCIsImxlbmd0aCIsIlNlbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBTyxXQUFiO0FBQ08sSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLEtBQUQsRUFBUUMsRUFBUjtBQUFBLE1BQVlDLEdBQVosdUVBQWdCRixLQUFoQjtBQUFBLE1BQXVCRyxLQUF2Qix1RUFBNkJGLEVBQTdCO0FBQUEsU0FBbUM7QUFDMUNHLFNBQVFQLE1BQVIsY0FEMEM7QUFFekNRLFlBQVM7QUFDVEwsV0FBTTtBQUNMTSxTQUFHTixLQURFO0FBRUpDO0FBRkksS0FERztBQUtSQyxTQUFJO0FBQ0pJLFNBQUdKLEdBREM7QUFFSEQsU0FBR0U7QUFGQTtBQUxJO0FBRmdDLEdBQW5DO0FBQUEsRUFEVztBQWNsQkksYUFBWTtBQUFBLFNBQUksRUFBQ0gsTUFBUVAsTUFBUixnQkFBRCxFQUFKO0FBQUEsRUFkTTtBQWVsQlcsWUFBVztBQUFBLFNBQUksRUFBQ0osTUFBUVAsTUFBUixlQUFELEVBQUo7QUFBQSxFQWZPO0FBZ0JsQlksVUFBUztBQUFBLFNBQUksRUFBQ0wsTUFBUVAsTUFBUixhQUFELEVBQUo7QUFBQSxFQWhCUztBQWlCbEJhLFlBQVc7QUFBQSxTQUFJLEVBQUNOLE1BQVFQLE1BQVIsZUFBRCxFQUFKO0FBQUE7O0FBakJPLENBQWI7QUFvQlAsSUFBTWMsYUFBVztBQUNoQlgsUUFBTTtBQUNMTSxNQUFHLENBREU7QUFFSkwsTUFBRztBQUZDLEVBRFU7QUFLZkMsTUFBSTtBQUNKSSxNQUFHLENBREM7QUFFSEwsTUFBRztBQUZBO0FBTFcsQ0FBakI7QUFVTyxJQUFNVyw0QkFBUSxTQUFSQSxPQUFRLEdBQW9DO0FBQUEsS0FBbkNDLEtBQW1DLHVFQUE3QkYsVUFBNkI7QUFBQTtBQUFBLEtBQWhCUCxJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxLQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQ3hELFNBQU9ELElBQVA7QUFDQSxPQUFRUCxNQUFSO0FBQ0MsdUJBQVlnQixLQUFaLEVBQXNCUixPQUF0QjtBQUNELE9BQVFSLE1BQVI7QUFDQSxPQUFRQSxNQUFSO0FBQTRCO0FBQUEsdUJBQ0ZnQixLQURFLENBQ3JCYixLQURxQjtBQUFBLFFBQ2RNLEVBRGMsZ0JBQ2RBLEVBRGM7QUFBQSxRQUNYTCxFQURXLGdCQUNYQSxFQURXO0FBQUEsUUFDUEMsR0FETyxHQUNGVyxLQURFLENBQ1BYLEdBRE87O0FBRTFCLFFBQUlZLFNBQU8sMEJBQVdSLEVBQVgsQ0FBWDtBQUNBLFFBQU1TLE9BQUtELE9BQU9FLFVBQVAsRUFBWDtBQUNBLFFBQUdELEtBQUtFLE1BQUwsR0FBWWhCLEtBQUcsQ0FBbEIsRUFBb0I7QUFDbkJBO0FBQ0EsS0FGRCxNQUVLO0FBQ0phLGNBQU8sNkJBQWNSLEVBQWQsQ0FBUDtBQUNBLFNBQUdRLE1BQUgsRUFBVTtBQUNUUixXQUFHUSxPQUFPUixFQUFWO0FBQ0FMLFdBQUcsQ0FBSDtBQUNBLE1BSEQsTUFHSztBQUNKO0FBQ0E7QUFDRDtBQUNELFdBQU8sRUFBQ0QsT0FBTSxFQUFDTSxNQUFELEVBQUlMLE1BQUosRUFBUCxFQUFnQkMsS0FBSSxFQUFDSSxNQUFELEVBQUlMLE1BQUosRUFBcEIsRUFBUDtBQUNBO0FBQ0YsT0FBUUosTUFBUjtBQUNBLE9BQVFBLE1BQVI7QUFBMkI7QUFBQSx3QkFDRGdCLEtBREMsQ0FDcEJiLEtBRG9CO0FBQUEsUUFDYk0sR0FEYSxpQkFDYkEsRUFEYTtBQUFBLFFBQ1ZMLEdBRFUsaUJBQ1ZBLEVBRFU7QUFBQSxRQUNOQyxJQURNLEdBQ0RXLEtBREMsQ0FDTlgsR0FETTs7QUFFekIsUUFBR0QsTUFBRyxDQUFOLEVBQVE7QUFDUEE7QUFDQSxLQUZELE1BRUs7QUFDSixTQUFJYSxVQUFPLDZCQUFjUixHQUFkLENBQVg7QUFDQSxTQUFHUSxPQUFILEVBQVU7QUFDVFIsWUFBR1EsUUFBT1IsRUFBVjtBQUNBTCxZQUFHYSxRQUFPRSxVQUFQLEdBQW9CQyxNQUFwQixHQUEyQixDQUE5QjtBQUNBLE1BSEQsTUFHSztBQUNKO0FBQ0E7QUFDRDtBQUNELFdBQU8sRUFBQ2pCLE9BQU0sRUFBQ00sT0FBRCxFQUFJTCxPQUFKLEVBQVAsRUFBZ0JDLEtBQUksRUFBQ0ksT0FBRCxFQUFJTCxPQUFKLEVBQXBCLEVBQVA7QUFDQTtBQXBDRjtBQXNDQSxRQUFPWSxLQUFQO0FBQ0EsQ0F4Q007O0lBMENNSyxTLFdBQUFBLFM7Ozs7Ozs7Ozs7OzJCQUNKO0FBQ1AsVUFBTyxJQUFQO0FBQ0E7Ozs7OztrQkFHYUEsUyIsImZpbGUiOiJzZWxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtnZXRDb250ZW50LCBnZXROZXh0VGV4dE9mLCBnZXRQcmV2VGV4dE9mfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5jb25zdCBET01BSU49XCJzZWxlY3Rpb25cIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRTRUxFQ1Q6IChzdGFydCwgYXQsIGVuZD1zdGFydCwgZW5kQXQ9YXQpPT4oe1xyXG5cdFx0dHlwZTpgJHtET01BSU59L3NlbGVjdGVkYFxyXG5cdFx0LHBheWxvYWQ6IHtcclxuXHRcdFx0c3RhcnQ6e1xyXG5cdFx0XHRcdGlkOnN0YXJ0XHJcblx0XHRcdFx0LGF0XHJcblx0XHRcdH1cclxuXHRcdFx0LGVuZDp7XHJcblx0XHRcdFx0aWQ6ZW5kXHJcblx0XHRcdFx0LGF0OmVuZEF0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG5cdCxNT1ZFX1JJR0hUOiBhPT4oe3R5cGU6YCR7RE9NQUlOfS9NT1ZFX1JJR0hUYH0pXHJcblx0LE1PVkVfTEVGVDogYT0+KHt0eXBlOmAke0RPTUFJTn0vTU9WRV9MRUZUYH0pXHJcblx0LE1PVkVfVVA6IGE9Pih7dHlwZTpgJHtET01BSU59L01PVkVfVVBgfSlcclxuXHQsTU9WRV9ET1dOOiBhPT4oe3R5cGU6YCR7RE9NQUlOfS9NT1ZFX0RPV05gfSlcclxuXHJcbn1cclxuY29uc3QgSU5JVF9TVEFURT17XHJcblx0c3RhcnQ6e1xyXG5cdFx0aWQ6MFxyXG5cdFx0LGF0OjBcclxuXHR9XHJcblx0LGVuZDp7XHJcblx0XHRpZDowXHJcblx0XHQsYXQ6MFxyXG5cdH1cclxufVxyXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUscGF5bG9hZH0pPT57XHJcblx0c3dpdGNoKHR5cGUpe1xyXG5cdGNhc2UgYCR7RE9NQUlOfS9zZWxlY3RlZGA6XHJcblx0XHRyZXR1cm4gKHsuLi5zdGF0ZSwgLi4ucGF5bG9hZH0pXHJcblx0Y2FzZSBgJHtET01BSU59L01PVkVfRE9XTmA6XHJcblx0Y2FzZSBgJHtET01BSU59L01PVkVfUklHSFRgOntcclxuXHRcdFx0bGV0IHtzdGFydDp7aWQsYXR9LGVuZH09c3RhdGVcclxuXHRcdFx0bGV0IHRhcmdldD1nZXRDb250ZW50KGlkKVxyXG5cdFx0XHRjb25zdCB0ZXh0PXRhcmdldC5nZXRDb250ZW50KClcclxuXHRcdFx0aWYodGV4dC5sZW5ndGg+YXQrMSl7XHJcblx0XHRcdFx0YXQrK1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0YXJnZXQ9Z2V0TmV4dFRleHRPZihpZClcclxuXHRcdFx0XHRpZih0YXJnZXQpe1xyXG5cdFx0XHRcdFx0aWQ9dGFyZ2V0LmlkXHJcblx0XHRcdFx0XHRhdD0wXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHQvL2tlZXAgY3Vyc29yIGF0IGVuZCBvZiBjdXJyZW50IHRhcmdldFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4ge3N0YXJ0OntpZCxhdH0sIGVuZDp7aWQsYXR9fVxyXG5cdFx0fVxyXG5cdGNhc2UgYCR7RE9NQUlOfS9NT1ZFX1VQYDpcclxuXHRjYXNlIGAke0RPTUFJTn0vTU9WRV9MRUZUYDp7XHJcblx0XHRcdGxldCB7c3RhcnQ6e2lkLGF0fSxlbmR9PXN0YXRlXHJcblx0XHRcdGlmKGF0PjApe1xyXG5cdFx0XHRcdGF0LS1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IHRhcmdldD1nZXRQcmV2VGV4dE9mKGlkKVxyXG5cdFx0XHRcdGlmKHRhcmdldCl7XHJcblx0XHRcdFx0XHRpZD10YXJnZXQuaWRcclxuXHRcdFx0XHRcdGF0PXRhcmdldC5nZXRDb250ZW50KCkubGVuZ3RoLTFcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdC8va2VlcCBjdXJzb3IgYXQgZW5kIG9mIGN1cnJlbnQgdGFyZ2V0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB7c3RhcnQ6e2lkLGF0fSwgZW5kOntpZCxhdH19XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvblxyXG4iXX0=