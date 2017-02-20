webpackJsonp([2],{

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(158);

	var _Action = __webpack_require__(265);

	var Actions = _interopRequireWildcard(_Action);

	var _redux = __webpack_require__(169);

	var _ListRow = __webpack_require__(281);

	var _ListRow2 = _interopRequireDefault(_ListRow);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function List(props) {
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

	var QueryList = function (_React$Component) {
		_inherits(QueryList, _React$Component);

		function QueryList() {
			_classCallCheck(this, QueryList);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _possibleConstructorReturn(this, (QueryList.__proto__ || Object.getPrototypeOf(QueryList)).call(this, args));
		}

		_createClass(QueryList, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.actions.querySpecialList(this.props.params.keyword);
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(next) {
				if (next.params.keyword != this.props.params.keyword) {
					this.props.actions.querySpecialList(next.params.keyword);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var list = this.props.list;

				return _react2.default.createElement(List, { list: list, play: this.props.play });
			}
		}]);

		return QueryList;
	}(_react2.default.Component);

	function mapPropsToState(state, ownProps) {
		var list = state.queryReducer.queryList;
		return {
			list: list
		};
	}

	function mapDispatchToState(dispatch, ownProps) {
		return {
			actions: (0, _redux.bindActionCreators)(Actions, dispatch)
		};
	}

	exports.default = (0, _reactRedux.connect)(mapPropsToState, mapDispatchToState)(QueryList);

/***/ }

});