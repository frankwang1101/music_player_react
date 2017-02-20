webpackJsonp([1],{

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _fetchJsonp = __webpack_require__(267);

	var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

	var _reactRedux = __webpack_require__(158);

	var _redux = __webpack_require__(169);

	var _ListRow = __webpack_require__(281);

	var _ListRow2 = _interopRequireDefault(_ListRow);

	var _Config = __webpack_require__(266);

	var _Action = __webpack_require__(265);

	var Actions = _interopRequireWildcard(_Action);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function List(props) {
		var id = props.id;
		return _react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				{ className: 'top-li' },
				_react2.default.createElement(
					'div',
					{ className: 'music-div' },
					'\u6B4C\u540D'
				),
				_react2.default.createElement(
					'div',
					{ className: 'music-div' },
					'\u6B4C\u624B'
				),
				_react2.default.createElement(
					'div',
					{ className: 'music-div' },
					'\u4E13\u8F91'
				)
			),
			props.list.map(function (obj, idx) {
				return _react2.default.createElement(_ListRow2.default, _extends({ key: idx, list_index: idx }, obj));
			})
		);
	}

	var MusicList = function (_React$Component) {
		_inherits(MusicList, _React$Component);

		function MusicList() {
			_classCallCheck(this, MusicList);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _possibleConstructorReturn(this, (MusicList.__proto__ || Object.getPrototypeOf(MusicList)).call(this, args));
		}

		_createClass(MusicList, [{
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var id = this.props.params.id;
				this.props.action.fetchChannelList(id);
			}
			//这里的next是下一个状态的意思，所以要获取列表要从下一个状态里取值判断

		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(next) {
				var id = this.props.params.id;
				if (next.params.id != id) {
					this.props.action.fetchChannelList(next.params.id);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				console.log('...');
				var list = this.props.list;

				return _react2.default.createElement(List, { id: this.props.params.id, list: list });
			}
		}]);

		return MusicList;
	}(_react2.default.Component);

	function map1(state) {
		var list = state.reducer.list || [];

		return {
			list: list
		};
	}
	var map2 = function map2(dispatch, ownProps) {
		return {
			action: (0, _redux.bindActionCreators)(Actions, dispatch)

		};
	};

	exports.default = (0, _reactRedux.connect)(map1, map2)(MusicList);

/***/ }

});