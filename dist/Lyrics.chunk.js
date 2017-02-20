webpackJsonp([3],{

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(158);

	var _Action = __webpack_require__(265);

	var Action = _interopRequireWildcard(_Action);

	var _redux = __webpack_require__(169);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function ArrToList(props) {
		var arr = props.arr,
		    pos = props.pos;
		// let arr = [[1,'a'],[2,'b']]

		if (arr && arr.length > 0) {
			var k = arr.map(function (item, idx) {
				// item[1] = item[1].length == 0 ? ' ':item[1]
				if (item[1].length == 0) {
					return null;
				}
				console.log('enter pos ...' + props.pos);
				return _react2.default.createElement(
					'li',
					{ className: item[0] == pos[1] ? 'target-lyric' : '', key: item[0] + 'asd' + idx },
					item[1]
				);
			});

			return _react2.default.createElement(
				'ul',
				{ style: { 'top': props.lyricTop } },
				k
			);
		} else {
			return _react2.default.createElement('span', null);
		}
	}

	var Lyric = function (_React$Component) {
		_inherits(Lyric, _React$Component);

		function Lyric() {
			_classCallCheck(this, Lyric);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _possibleConstructorReturn(this, (Lyric.__proto__ || Object.getPrototypeOf(Lyric)).call(this, args));
		}

		_createClass(Lyric, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.actions.fetchSongLyric(this.props.song_id);
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(next) {
				if (!this.props.isFetch && !this.props.success || this.props.song_id !== next.song_id) {
					this.props.actions.fetchSongLyric(next.song_id);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props,
				    arr = _props.arr,
				    title = _props.title,
				    pic_b = _props.pic_b,
				    album_title = _props.album_title,
				    author = _props.author,
				    lyricTop = _props.lyricTop,
				    pos = _props.pos;

				return _react2.default.createElement(
					'div',
					{ className: 'lyric-wrap' },
					_react2.default.createElement(
						'div',
						{ className: 'music-area' },
						_react2.default.createElement(
							'div',
							{ className: 'album-area' },
							_react2.default.createElement('img', { src: pic_b })
						),
						_react2.default.createElement(
							'div',
							{ className: 'music-info' },
							_react2.default.createElement(
								'div',
								{ className: 'music-title' },
								title
							),
							_react2.default.createElement(
								'div',
								{ className: 'music-author' },
								author
							),
							_react2.default.createElement(
								'div',
								{ className: 'music-album' },
								album_title
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'lyric-area' },
						_react2.default.createElement(
							'div',
							{ className: 'lyric' },
							_react2.default.createElement(ArrToList, { arr: arr, lyricTop: lyricTop, pos: pos })
						)
					)
				);
			}
		}]);

		return Lyric;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
		var info = state.panelReducer.info;
		var lyric_info = state.lyricsReducer.lyric_info;
		var pic_b = info.pic_b,
		    lyric = info.lyric,
		    title = info.title,
		    album_title = info.album_title,
		    author = info.author,
		    id = info.id,
		    currTime = info.currTime;
		var isFetch = lyric_info.isFetch,
		    success = lyric_info.success,
		    arr = lyric_info.arr;

		var pos = [];
		if (!isFetch && success && arr.length > 0) {
			var timeline = [];
			for (var k in arr) {
				if (arr[k][1].length && arr[k][1].length > 0) {
					timeline.push(arr[k]);
				}
			}
			pos = findIndex(currTime, timeline);
		}
		var lyricTop = 'inherit';
		if (pos.length > 0 && pos[1] != -1) {
			// console.log(pos);
			lyricTop = -pos[0] * 25 + 60 + 'px';
		}
		return {
			pic_b: pic_b, title: title, album_title: album_title, author: author, lyric: lyric, song_id: id, arr: arr, lyricTop: lyricTop, pos: pos, success: success, isFetch: isFetch
		};
	}

	function findIndex(time, line) {
		var start = 0;
		var end = line.length - 1;
		var res = -1;
		while (start < end) {
			if (line[start][0] > time) {
				res = start > 0 ? Math.abs(line[start][0] - time) - Math.abs(line[start - 1][0] - time) ? start - 1 : start : 0;
				break;
			}
			if (line[end][0] < time) {
				res = end < line.length ? Math.abs(line[end][0] - time) - Math.abs(line[end + 1][0] - time) ? end + 1 : end : end;
				break;
			}
			start++;
			end--;
		}
		return [res, res == -1 ? res : line[res][0]];
	}

	function mapDispatchToProps(dispatch, ownProps) {
		return {
			actions: (0, _redux.bindActionCreators)(Action, dispatch)
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Lyric);

/***/ }

});