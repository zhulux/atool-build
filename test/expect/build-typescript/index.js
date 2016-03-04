webpackJsonp([1,0],[
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function sendMessage(to, message) {
	  function _ref(_id) {
	    if (!(typeof _id === 'boolean')) {
	      throw new TypeError("Function \"sendMessage\" return value violates contract, expected bool got " + (_id === null ? 'null' : (typeof _id === "undefined" ? "undefined" : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === "undefined" ? "undefined" : _typeof(_id)));
	    }

	    return _id;
	  }

	  if (!(to instanceof User)) {
	    throw new TypeError("Value of argument \"to\" violates contract, expected User got " + (to === null ? 'null' : (typeof to === "undefined" ? "undefined" : _typeof(to)) === 'object' && to.constructor ? to.constructor.name || '[Unknown Object]' : typeof to === "undefined" ? "undefined" : _typeof(to)));
	  }

	  if (!(typeof message === 'string')) {
	    throw new TypeError("Value of argument \"message\" violates contract, expected string got " + (message === null ? 'null' : (typeof message === "undefined" ? "undefined" : _typeof(message)) === 'object' && message.constructor ? message.constructor.name || '[Unknown Object]' : typeof message === "undefined" ? "undefined" : _typeof(message)));
	  }

	  return _ref(socket.send(to, message));
	}

	function sendMessage2(to, message) {
	  return socket.send(to, message);
	}

/***/ }
]);