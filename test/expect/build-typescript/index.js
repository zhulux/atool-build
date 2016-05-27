webpackJsonp([1,0],[
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var Greeter = function () {
	    function Greeter(greeting) {
	        this.greeting = greeting;
	    }
	    Greeter.prototype.greet = function () {
	        return "<h1>" + this.greeting + "</h1>";
	    };
	    return Greeter;
	}();
	var greeter = new Greeter('Hello, world!');
	document.body.innerHTML = greeter.greet();

/***/ }
]);