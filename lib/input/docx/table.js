'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
	_inherits(_class, _Model);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'visit',
		value: function visit() {
			_get(Object.getPrototypeOf(_class.prototype), 'visit', this).call(this);

			var _wordModel$getColWidt = this.wordModel.getColWidth();

			var sum = _wordModel$getColWidt.sum;
			var cols = _wordModel$getColWidt.cols;

			Object.assign(this.contentProps, { cols: cols, width: sum });
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBR1E7QUFDTiwyRUFETTs7K0JBRVksS0FBSyxTQUFMLENBQWUsV0FBZixHQUZaOztPQUVDLGdDQUZEO09BRU0sa0NBRk47O0FBR04sVUFBTyxNQUFQLENBQWMsS0FBSyxZQUFMLEVBQWtCLEVBQUMsVUFBRCxFQUFPLE9BQU0sR0FBTixFQUF2QyxFQUhNIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gJy4vYW55J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHR2aXNpdCgpe1xyXG5cdFx0c3VwZXIudmlzaXQoKVxyXG5cdFx0Y29uc3Qge3N1bSwgY29sc309dGhpcy53b3JkTW9kZWwuZ2V0Q29sV2lkdGgoKVxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnRQcm9wcyx7Y29scywgd2lkdGg6c3VtfSlcclxuXHR9XHJcbn1cclxuIl19