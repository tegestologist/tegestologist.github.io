/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.onload = function(){
	    __webpack_require__(1);
	    __webpack_require__(3);
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// placeholder hiders

	(function(){
	    var PlaceholderHider = __webpack_require__(2);
	    var newsPHH = new PlaceholderHider('.news-link-container','.news-placeholder-container');
	    newsPHH.gcm(4);
	    newsPHH.hidePlaceholders();

	    posterPHH = new PlaceholderHider('.poster-link-container','.poster-placeholder-container');
	    posterPHH.gcm(4);
	    posterPHH.hidePlaceholders();
	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	function PlaceholderHider(itemClass, placeholderClass){
	    var errors = []
	    if(arguments.length !== 2)
	        throw new Error("Expected two arguments, received " + arguments.length);

	    for(var i in Array.prototype.slice.call(arguments)) {
	        if(document.querySelectorAll(arguments[i]).length === 0)
	            errors.push(arguments[i]);
	    }

	    if(errors.length > 0)
	        throw new Error("Unable to find elements for " + errors.join(', '));

	    this.itemClass = itemClass;
	    this.placeholderClass = placeholderClass;
	    // assuming all placeholders use same initial display
	    this.defaultDisplay = document.querySelectorAll(this.placeholderClass)[0].style.display;
	}

	// use to modify the gcm i.e. to change the numeric value that causes placeholders to disappear
	PlaceholderHider.prototype.gcm = (function(value){
	    var initialValue = 4;

	    return function setter(val){
	        if(typeof arguments[0] === 'number') {
	            setter.gcm = Math.floor(arguments[0]);
	            this.hidePlaceholders();
	        }
	        if(!setter.gcm){
	            return initialValue;
	        }
	        else
	            return setter.gcm;
	    };
	})();

	// unhide placeholders then hide placeholders according to math on gcm
	PlaceholderHider.prototype.hidePlaceholders = function hp() {
	    var i;
	    var items = document.querySelectorAll(this.itemClass);
	    var placeholders = document.querySelectorAll(this.placeholderClass);

	    var j;
	    for(j = 0; j < placeholders.length; j++)
	        placeholders[j].style.display = this.defaultDisplay;

	    var totalElements = items.length + placeholders.length;
	    var k = 0;

	    while(totalElements % this.gcm() !== 0) {
	        placeholders[k].style.display = 'none';
	        totalElements--;
	        k++;
	    }
	};

	module.exports = PlaceholderHider;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Research section slideshow

	(function(){

	    'use strict';

	    var MultiSlideShow = __webpack_require__(4);

	    var aboutMSSSlides = __webpack_require__(5);

	    var aboutMSS = new MultiSlideShow(aboutMSSSlides);

	    aboutMSS.bindElement(
	        [document.getElementById('slideshow-title')],
	        'innerText',
	        'title'
	    );

	    aboutMSS.bindElement(
	        [document.getElementById('slideshow-image')],
	        'src',
	        'imgSrc'
	    );

	    aboutMSS.bindElement(
	        [document.getElementById('slideshow-text')],
	        'innerHTML',
	        'text'
	    );

	    aboutMSS.bindElement(
	        [document.getElementById('slideshow-image')],
	        'alt',
	        'alt'
	    );

	    aboutMSS.bindNextEvent(
	        document.getElementById('about-slideshow-next-button'),
	        'click'
	    );

	    aboutMSS.bindPrevEvent(
	        document.getElementById('about-slideshow-prev-button'),
	        'click'
	    );

	    aboutMSS.setSlide(0);
	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

	var MultiSlideshow;

	(function(){
	    'use strict';
	    MultiSlideshow = function(objectArray) {

	        if(!objectArray)
	            throw new Error('Expect one argument.');

	        if(!(objectArray instanceof Array))
	            throw new TypeError('Expected an array, got ', objectArray, '.');

	        var slides = objectArray;
	        var slideIndex = 0;
	        this.currentSlide = slides[slideIndex];

	        this.elementBindings = [];

	        this.setSlide = (function() {

	            return function(val) {

	                if(val !== undefined) {
	                    slideIndex = val < 0 ?
	                        (val + 1) % slides.length + (slides.length - 1) :
	                        val % slides.length;
	                    this.currentSlide = slides[slideIndex];
	                    this.updateElements();
	                    return slideIndex;
	                }
	                else return slideIndex;
	            }.bind(this);

	        }).apply(this);

	        this.shuffleSlides = (function(){
	            // random number from 0 to max; excluding max
	            // Thanks, Mozilla!

	            var randnum = function(maxval) {
	                var min = Math.ceil(0);
	                var max = Math.floor(maxval);
	                return Math.floor(Math.random() * (max - min)) + min;
	            };

	            return function(){
	                var i;
	                var randomSlides = [];
	                var randomI;

	                for(i = 0; i < slides.length + randomSlides.length; i++) {
	                    randomI = randnum(slides.length);
	                    randomSlides.push(slides[randomI]);
	                    slides.splice(randomI,1);
	                }
	                slides = randomSlides;
	            };
	        })();

	        // this.updateElements = (function(){
	        //     var that = this;
	        //     return function() {
	        //         if(this.elementBindings.length === 0) return;
	        //         var f;
	        //         for(f = 0; f < this.elementBindings.length; f++)
	        //             this.elementBindings[f].apply(that);
	        //     };
	        // }.bind(this))();

	    };

	    MultiSlideshow.prototype.updateElements = function(){
	        if(this.elementBindings.length === 0) return;
	        var f;
	        for(f = 0; f < this.elementBindings.length; f++)
	            this.elementBindings[f].apply(this);
	    };

	    var isString = function(thing){
	        return (typeof thing === 'string' || thing instanceof String);
	    };

	    MultiSlideshow.prototype.bindElement = function(elementArray, property, attribute) {
	        if(!(elementArray instanceof Array))
	            throw new TypeError('Expecting an array for elementArray, got ', elementArray,'.');

	        if (!(isString(property)))
	            throw new TypeError('Expecting a string for property, got', property,'.');

	        if (!(isString(attribute)))
	            throw new TypeError('Expecting a string for attribute, got', attribute,'.');

	        this.elementBindings[this.elementBindings.length] = function(){
	            var i;
	            for(i = 0; i < elementArray.length; i++) {
	                elementArray[i][property] = this.currentSlide[attribute];
	            }
	        };

	    };

	    MultiSlideshow.prototype.bindEvent = function(val, element, event) {

	        if (typeof element !== 'object')
	            throw new TypeError('Expecting an object for element, got ', element,'.');

	        if (!(isString(event)))
	            throw new TypeError('Expecting a string for event, got ', event,'.');

	        if(parseInt(val) === val)
	            element.addEventListener(
	                event,
	                function() { this.setSlide(val); }.bind(this),
	                false);
	        else if(val && Object.prototype.toString.call(val) === '[object Function]')
	            element.addEventListener(
	                event,
	                function(){ this.setSlide(val.apply(this)); }.bind(this),
	                false);
	        else
	            throw new TypeError('Expecting integer or function for val, got ', val,'.');
	    };

	    MultiSlideshow.prototype.bindNextEvent = function(){
	        this.bindEvent.apply(this, [function(){ return this.setSlide() + 1;}].concat(Array.prototype.slice.call(arguments)));
	    };

	    MultiSlideshow.prototype.bindPrevEvent = function(){
	        this.bindEvent.apply(this, [function(){ return this.setSlide() - 1;}].concat(Array.prototype.slice.call(arguments)));
	    };
	})();

	module.exports = MultiSlideshow;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports =
	    [{
	        title: 'Vision',
	        imgSrc: './img/fmri_headgear_closeup.jpg',
	        text: 'Cras posuere quis sem ut tristique. Nam eget condimentum velit. Donec et ornare nisl. Nunc eu libero consectetur, vehicula risus quis, mollis dui. Ut nec interdum nulla, eu hendrerit lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce maximus imperdiet erat et interdum.',
	        alt: 'closeup of Jay preparing fmri head cover on Davi'
	    },{
	        title: 'Non-invasive Brain Stimulation',
	        imgSrc: './img/ultrasound_to_head.png',
	        text: 'Cras posuere quis sem ut tristique. Nam eget condimentum velit. Donec et ornare nisl. Nunc eu libero consectetur, vehicula risus quis, mollis dui. Ut nec interdum nulla, eu hendrerit lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce maximus imperdiet erat et interdum.',
	        alt: 'Jay applying ultrasound to side of volunteer\'s head'
	    },{
	        title: 'Mental Health and Well-being',
	        imgSrc: './img/jay_white_sands_backflip.jpg',
	        text: 'Cras posuere quis sem ut tristique. Nam eget condimentum velit. Donec et ornare nisl. Nunc eu libero consectetur, vehicula risus quis, mollis dui. Ut nec interdum nulla, eu hendrerit lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce maximus imperdiet erat et interdum.',
	        alt: 'Jay performing a back flip at White Sands.'
	    }];


/***/ }
/******/ ]);