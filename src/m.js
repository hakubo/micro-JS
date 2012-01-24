/**
 * micro JS framework
 *
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 * @author Jakub Olek <https://plus.google.com/112565259111817320425>
 */
(function(context){
	//TODO: speed up case m.ANY/undefined (http://jsperf.com/micro-js-selector-comparison)
	var d = document,
		byQry = d.querySelector || false,
		byQryAll = d.querySelectorAll || false;

	/**
	* selects one element from the DOM
	*
	* @param {String} selector The CSS selector for the element to be selected
	* @param {Integer} type (optional) The selector type used to speed up the selection, one of m.ID, m.CLASS, m.NAME, m.TAG, m.ANY or undefined
	* @param {Boolean} errorIfMissing (optional) Throws an exception if the selector doesn't match any element
	*
	* @returns {HTMLElement} the selected element or undefined
	*/
	var m = context.m = function(selector, type, errorOnMissing){
		errorOnMissing = (errorOnMissing == true);
		var selected;

		switch(type){
			case m.ID:
				selected = d.getElementById(selector);
				break;
			case m.CLASS:
				selected = d.getElementsByClassName(selector)[0];
				break;
			case m.NAME:
				selected = d.getElementsByName(selector)[0];
				break;
			case m.TAG:
				selected = d.getElementsByTagName(selector)[0];
				break;
			case m.ANY:
			default:
				selected = (byQry) ? d.querySelector(selector) : false;
		}

		if(!selected && errorOnMissing)
			throw new MSelectorError(selector, type);

		//consistently return undefined if no selection
		return (selected) ? selected : undefined;
	};

	m.ID = 'id';
	m.CLASS = 'class';
	m.NAME = 'name';
	m.TAG = 'tag';
	m.ANY;//alias for undefined

	/**
	* selects a set of  elements from the DOM
	*
	* @param {String} selector The CSS selector for the elements to be selected
	* @param {Integer} type (optional) The selector type used to speed up the selection, one of m.ID, m.CLASS, m.NAME, m.TAG, m.ANY or undefined
	* @param {Boolean} errorIfMissing (optional) Throws an exception if the selector doesn't match any element
	*
	* @returns {HTMLCollection or NodeList} the selected elements or undefined
	*/
	context.mm = function(selector, type, errorOnMissing){
		errorOnMissing = (errorOnMissing == true);
		var selected;

		switch(type){
			case m.CLASS:
				selected = d.getElementsByClassName(selector);
				break;
			case m.NAME:
				selected = d.getElementsByName(selector);
				break;
			case m.TAG:
				selected = d.getElementsByTagName(selector);
				break;
			case m.ID:
				selector = '#' + selector;
			case m.ANY:
			default:
				selected = (byQryAll) ? d.querySelectorAll(selector) : false;
		}

		if(!selected && errorOnMissing)
			throw new MSelectorError(selector, type);

		//consistently return undefined if no selection
		return (selected) ? selected : undefined;
	};

	var MSelectorError = context.MSelectorError = function(selector, type){
		this.message = "No matches";
		this.selector = selector;
		this.type = type
	}

	MSelectorError.prototype = new Error();
	
	MSelectorError.prototype.toString = function(){
		return this.message + " for '" + this.selector + "'" + ((this.type) ? " filtering by " + this.type : "");
	}
})(this);