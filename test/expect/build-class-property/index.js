webpackJsonp([1,0],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var A = (_temp = _class = function () {
	  function A() {
	    _classCallCheck(this, A);
	  }

	  _createClass(A, [{
	    key: 'foo',
	    value: function foo() {
	      console.log('foo');
	    }
	  }]);

	  return A;
	}(), _class.propTypes = 1, _temp);


	var a = new A();
	a.foo();

/***/ }
]);