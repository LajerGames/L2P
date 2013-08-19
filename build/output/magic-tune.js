
/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );

define('browserdetect',[],function () {
	var	AC	= {};

	AC.Detector = {
	    getAgent: function () {
	        return navigator.userAgent.toLowerCase()
	    },
	    isMac: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/mac/i)
	    },
	    isSnowLeopard: function (c) {
	        if (typeof console != "undefined") {
	            console.warn('Instead of AC.Detector.isSnowLeopard, please use AC.Detector.macOSAtLeastVersion("10.6").')
	        }
	        var d = c || this.getAgent();
	        return !!d.match(/mac os x 10_6/i)
	    },
	    macOSVersion: function (g) {
	        var h = g || this.getAgent();
	        if (!this.isMac(h)) {
	            return null
	        }
	        var f = h.match(/(mac os x )([\d\._]*)/i);
	        if (f == null) {
	            return f
	        }
	        if ( !! f[2].match(/\./)) {
	            f = f[2].split(".")
	        } else {
	            f = f[2].split("_")
	        }
	        for (var e = 0; e < f.length;
	        e++) {
	            f[e] = parseInt(f[e])
	        }
	        return f
	    },
	    macOSAtLeastVersion: function (h, i) {
	        if (typeof h == "undefined") {
	            return false
	        }
	        var g = this.macOSVersion(i);
	        if (g == null) {
	            return false
	        }
	        if (typeof h == "string") {
	            h = h.replace(".", "_").split("_")
	        }
	        for (var j = 0; j < h.length; j++) {
	            var f = parseInt(g[j]);
	            if (isNaN(f)) {
	                f = 0
	            }
	            if (parseInt(h[j]) > f) {
	                return false
	            }
	        }
	        return true
	    },
	    isWin: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/win/i)
	    },
	    winVersion: function (f) {
	        var d = f || this.getAgent();
	        if (this.isWin(d)) {
	            var e = d.match(/nt\s*([\d\.]*)/);
	            if (e && e[1]) {
	                return parseFloat(e[1])
	            }
	            return true
	        }
	        return false
	    },
	    winAtLeastVersion: function (f, d) {
	        if (typeof f == "undefined") {
	            return false
	        }
	        f = parseFloat(f);
	        if (f === NaN) {
	            return false
	        }
	        var e = this.winVersion(d);
	        if (e === null || e === false || e === true) {
	            return false
	        }
	        return (f <= e)
	    },
	    isWin2k: function (c) {
	        var d = c || this.getAgent();
	        return this.isWin(d) && (d.match(/nt\s*5/i))
	    },
	    isWinVista: function (c) {
	        var d = c || this.getAgent();
	        return this.isWin(d) && (d.match(/nt\s*6\.0([0-9]{0,2})?/i))
	    },
	    isWebKit: function (c) {
	        if (this._isWebKit === undefined) {
	            var d = c || this.getAgent();
	            this._isWebKit = !! d.match(/AppleWebKit/i);
	            this.isWebKit = function () {
	                return this._isWebKit
	            }
	        }
	        return this._isWebKit
	    },
	    isSafari2: function (f) {
	        if (typeof console != "undefined") {
	            console.warn("Instead of AC.Detector.isSafari2(), please use AC.Detector.isWebKit().")
	        }
	        var d = f || this.getAgent();
	        if (this._isSafari2 === undefined) {
	            if (!this.isWebKit(d)) {
	                this._isSafari2 = false
	            } else {
	                var e = parseInt(parseFloat(d.substring(d.lastIndexOf("safari/") + 7)), 10);
	                this._isSafari2 = (e >= 419)
	            }
	            this.isSafari2 = function () {
	                return this._isSafari2
	            }
	        }
	        return this._isSafari2
	    },
	    isChrome: function (c) {
	        if (this._isChrome === undefined) {
	            var d = c || this.getAgent();
	            this._isChrome = !! d.match(/Chrome/i);
	            this.isChrome = function () {
	                return this._isChrome
	            }
	        }
	        return this._isChrome
	    },
	    isiPhone: function (c) {
	        if (typeof console != "undefined") {
	            console.warn("Instead of AC.Detector.isiPhone(), please use AC.Detector.isMobile().")
	        }
	        var d = c || this.getAgent();
	        return this.isMobile(d)
	    },
	    iPhoneOSVersion: function (k) {
	        if (typeof console != "undefined") {
	            console.warn("Instead of AC.Detector.iPhoneOSVersion(), please use AC.Detector.iOSVersion().")
	        }
	        var l = k || this.getAgent(),
	            h = this.isMobile(l),
	            j, i, g;
	        if (h) {
	            var j = l.match(/.*CPU ([\w|\s]+) like/i);
	            if (j && j[1]) {
	                i = j[1].split(" ");
	                g = i[2].split("_");
	                return g
	            } else {
	                return [1]
	            }
	        }
	        return null
	    },
	    isiPad: function (c) {
	        var d = c || this.getAgent();
	        return !!(this.isWebKit(d) && d.match(/ipad/i))
	    },
	    isMobile: function (c) {
	        var d = c || this.getAgent();
	        return this.isWebKit(d) && (d.match(/Mobile/i) && !this.isiPad(d))
	    },
	    _iOSVersion: null,
	    iOSVersion: function () {
	        if (this._iOSVersion === null) {
	            this._iOSVersion = (AC.Detector.isMobile() || AC.Detector.isiPad()) ? parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_", ".")) : false
	        }
	        return this._iOSVersion
	    },
	    isOpera: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/opera/i)
	    },
	    isIE: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/msie/i)
	    },
	    isIEStrict: function (c) {
	        var d = c || this.getAgent();
	        return d.match(/msie/i) && !this.isOpera(d)
	    },
	    isIE8: function (f) {
	        var d = f || this.getAgent();
	        var e = d.match(/msie\D*([\.\d]*)/i);
	        if (e && e[1]) {
	            version = e[1]
	        }
	        return (+version >= 8)
	    },
	    isFirefox: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/firefox/i)
	    },
	    isiTunesOK: function (c) {
	        var d = c || this.getAgent();
	        if (this.isMac(d)) {
	            return true
	        }
	        if (this.winAtLeastVersion(5.1, d)) {
	            return true
	        }
	        return false
	    },
	    _isQTInstalled: undefined,
	    isQTInstalled: function () {
	        if (this._isQTInstalled === undefined) {
	            var e = false;
	            if (navigator.plugins && navigator.plugins.length) {
	                for (var d = 0; d < navigator.plugins.length;
	                d++) {
	                    var f = navigator.plugins[d];
	                    if (f.name.indexOf("QuickTime") > -1) {
	                        e = true
	                    }
	                }
	            } else {
	                if (typeof (execScript) != "undefined") {
	                    qtObj = false;
	                    execScript('on error resume next: qtObj = IsObject(CreateObject("QuickTimeCheckObject.QuickTimeCheck.1"))', "VBScript");
	                    e = qtObj
	                }
	            }
	            this._isQTInstalled = e
	        }
	        return this._isQTInstalled
	    },
	    getQTVersion: function () {
	        var f = "0";
	        if (navigator.plugins && navigator.plugins.length) {
	            for (var h = 0; h < navigator.plugins.length;
	            h++) {
	                var g = navigator.plugins[h];
	                var e = g.name.match(/quicktime\D*([\.\d]*)/i);
	                if (e && e[1]) {
	                    f = e[1]
	                }
	            }
	        } else {
	            if (typeof (execScript) != "undefined") {
	                ieQTVersion = null;
	                execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion', "VBScript");
	                if (ieQTVersion) {
	                    f = ieQTVersion.toString(16);
	                    f = [f.charAt(0), f.charAt(1), f.charAt(2)].join(".")
	                }
	            }
	        }
	        return f
	    },
	    isQTCompatible: function (j, h) {
	        function f(c, a) {
	            var d = parseInt(c[0], 10);
	            if (isNaN(d)) {
	                d = 0
	            }
	            var b = parseInt(a[0], 10);
	            if (isNaN(b)) {
	                b = 0
	            }
	            if (d === b) {
	                if (c.length > 1) {
	                    return f(c.slice(1), a.slice(1))
	                } else {
	                    return true
	                }
	            } else {
	                if (d < b) {
	                    return true
	                } else {
	                    return false
	                }
	            }
	        }
	        var i = j.split(/\./);
	        var g = h ? h.split(/\./) : this.getQTVersion().split(/\./);
	        return f(i, g)
	    },
	    isValidQTAvailable: function (b) {
	        return this.isQTInstalled() && this.isQTCompatible(b)
	    },
	    isSBVDPAvailable: function (b) {
	        return false
	    },
	    _svgAsBackground: null,
	    svgAsBackground: function (f) {
	        if (this._svgAsBackground === null) {
	            var d = function () {
	                    AC.Detector._svgAsBackground = true;
	                    if (typeof (f) == "function") {
	                        f()
	                    }
	                };
	            var e = document.createElement("img");
	            e.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
	            if (e.complete) {
	                e.style.visibility = "hidden";
	                e.style.position = "absolute";
	                document.body.appendChild(e);
	                window.setTimeout(function () {
	                    AC.Detector._svgAsBackground = false;
	                    if (e.width >= 100) {
	                        document.body.removeChild(e);
	                        d()
	                    } else {
	                        document.body.removeChild(e)
	                    }
	                }, 1)
	            } else {
	                this._svgAsBackground = false;
	                e.onload = d
	            }
	        } else {
	            if (this._svgAsBackground && typeof (f) == "function") {
	                f()
	            }
	        }
	        return this._svgAsBackground
	    },
	    _style: null,
	    _prefixes: null,
	    _preFixes: null,
	    _css: null,
	    isCSSAvailable: function (i) {
	        if (!this._style) {
	            this._style = document.createElement("browserdetect").style
	        }
	        if (!this._prefixes) {
	            this._prefixes = "-webkit- -moz- -o- -ms- -khtml- ".split(" ")
	        }
	        if (!this._preFixes) {
	            this._preFixes = "Webkit Moz O ms Khtml ".split(" ")
	        }
	        if (!this._css) {
	            this._css = {}
	        }
	        i = i.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, "").toLowerCase();
	        switch (i) {
	        case "gradient":
	            if (this._css.gradient !== undefined) {
	                return this._css.gradient
	            }
	            var i = "background-image:",
	                l = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
	                m = "linear-gradient(left top,#9f9, white);";
	            this._style.cssText = (i + this._prefixes.join(l + i) + this._prefixes.join(m + i)).slice(0, -i.length);
	            this._css.gradient = (this._style.backgroundImage.indexOf("gradient") !== -1);
	            return this._css.gradient;
	        case "inset-box-shadow":
	            if (this._css["inset-box-shadow"] !== undefined) {
	                return this._css["inset-box-shadow"]
	            }
	            var i = "box-shadow:",
	                j = "#fff 0 1px 1px inset;";
	            this._style.cssText = this._prefixes.join(i + j);
	            this._css["inset-box-shadow"] = (this._style.cssText.indexOf("inset") !== -1);
	            return this._css["inset-box-shadow"];
	        default:
	            var n = i.split("-"),
	                r = n.length,
	                o, p, q;
	            if (n.length > 0) {
	                i = n[0];
	                for (p = 1; p < r; p++) {
	                    i += n[p].substr(0, 1).toUpperCase() + n[p].substr(1)
	                }
	            }
	            o = i.substr(0, 1).toUpperCase() + i.substr(1);
	            if (this._css[i] !== undefined) {
	                return this._css[i]
	            }
	            for (q = this._preFixes.length - 1; q >= 0; q--) {
	                if (this._style[this._preFixes[q] + i] !== undefined || this._style[this._preFixes[q] + o] !== undefined) {
	                    this._css[i] = true;
	                    return true
	                }
	            }
	            return false
	        }
	        return false
	    },
	    _supportsThreeD: false,
	    supportsThreeD: function () {
	        try {
	            this._supportsThreeD = false;
	            if ("styleMedia" in window) {
	                this._supportsThreeD = window.styleMedia.matchMedium("(-webkit-transform-3d)")
	            } else {
	                if ("media" in window) {
	                    this._supportsThreeD = window.media.matchMedium("(-webkit-transform-3d)")
	                }
	            }
	            if (!this._supportsThreeD) {
	                if (!document.getElementById("supportsThreeDStyle")) {
	                    var d = document.createElement("style");
	                    d.id = "supportsThreeDStyle";
	                    d.textContent = "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
	                    document.querySelector("head").appendChild(d)
	                }
	                if (!(div = document.querySelector("#supportsThreeD"))) {
	                    div = document.createElement("div");
	                    div.id = "supportsThreeD";
	                    document.body.appendChild(div)
	                }
	                this._supportsThreeD = (div.offsetHeight === 3)
	            }
	            return this._supportsThreeD
	        } catch (c) {
	            return false
	        }
	    },
	    _hasGyro: null,
	    _testingForGyro: false,
	    hasGyro: function () {
	        if (this._hasGyro !== null) {
	            return this._hasGyro
	        }
	        if ("DeviceOrientationEvent" in window && window.DeviceOrientationEvent !== null) {
	            if (this._testingForGyro === false) {
	                this._testingForGyro = true;
	                var b = this;
	                this.boundTestingForGyro = function (a) {
	                    b.testingForGyro(a)
	                };
	                window.addEventListener("deviceorientation", this.boundTestingForGyro, true);
	                this._testGyroTimeout = window.setTimeout(function () {
	                    this._hasGyro = false
	                }.bind(this), 250)
	            }
	            return this._hasGyro
	        } else {
	            return this._hasGyro = false
	        }
	    },
	    testingForGyro: function (b) {
	        if (this._hasGyro === false) {
	            return this._hasGyro
	        } else {
	            if (typeof b.gamma !== "undefined" && typeof b.beta !== "undefined") {
	                this._hasGyro = true
	            } else {
	                this._hasGyro = false
	            }
	            window.clearTimeout(this._testGyroTimeout);
	            window.removeEventListener("deviceorientation", this.boundTestingForGyro, true);
	            delete this.boundTestingForGyro
	        }
	    },
	    _isiPadWithGyro: null,
	    isiPadWithGyro: function () {
	        if (this._isiPadWithGyro === false || !this.isiPad()) {
	            return false
	        } else {
	            return this._isiPadWithGyro = this.hasGyro()
	        }
	    },
	    _hasLocalStorage: null,
	    hasLocalStorage: function () {
	        if (this._hasLocalStorage !== null) {
	            return this._hasLocalStorage
	        }
	        try {
	            if (typeof localStorage !== "undefined" && "setItem" in localStorage) {
	                localStorage.setItem("ac_browser_detect", "test");
	                this._hasLocalStorage = true;
	                localStorage.removeItem("ac_browser_detect", "test")
	            } else {
	                this._hasLocalStorage = false
	            }
	        } catch (b) {
	            this._hasLocalStorage = false
	        }
	        return this._hasLocalStorage
	    },
	    _hasSessionStorage: null,
	    hasSessionStorage: function () {
	        if (this._hasSessionStorage !== null) {
	            return this._hasSessionStorage
	        }
	        try {
	            if (typeof sessionStorage !== "undefined" && "setItem" in sessionStorage) {
	                sessionStorage.setItem("ac_browser_detect", "test");
	                this._hasSessionStorage = true;
	                sessionStorage.removeItem("ac_browser_detect", "test")
	            } else {
	                this._hasSessionStorage = false
	            }
	        } catch (b) {
	            this._hasSessionStorage = false
	        }
	        return this._hasSessionStorage
	    },
	    _hasCookies: null,
	    hasCookies: function () {
	        if (this._hasCookies !== null) {
	            return this._hasCookies
	        }
	        this._hasCookies = ("cookie" in document && !! navigator.cookieEnabled) ? true : false;
	        return this._hasCookies
	    }
	};

	return AC;
});
/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { 

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);

define("bootstrap", function(){});

define('fM',['jquery'], function ($) {
	var	link = (function () {
		var	his			= [],
			lastState	= null,
			that		= {},
			$that		= $(that);
		that.get	= function () {
			var a = window.location.search.substr(1).split('&'),
				r = {};
			for(var i = 0; i < a.length; i += 1) {
				var US = a[i].split('=');
				r[US[0]] = US[1];
			}

			return r;
		}
		that.fileName	= function () {
			return location.pathname.substr(1);
		}
		that.navigate	= function (url, title, obj) {
			title		= title || 'Magic Tune';
			obj			= obj || {};
			obj.title	= obj.title || title;

			if(lastState) {
				his.splice(lastState._id + 1);
			}
			his.push(obj);
			obj._id	= his.length - 1;

			if(url) {
				window.history.pushState(obj, title, url);
			}

			// console.log('fm-nav', url, obj);

			$(window).trigger('popstate', ['fM']);
		}
		that.navigated	= function (url, title, obj) {
			document.title	= title;

			obj				= $.extend(history.state, obj);
			obj.title		= title;
			obj.pathname	= document.location.pathname;

			if(obj._id !== undefined) {
				his[obj._id]	= obj;
				window.history.replaceState(obj, title, document.location.pathname);
				lastState	= obj;

				if(_gaq) {
					_gaq.push(['_trackPageview', document.location.pathname]);
				}

				$that.trigger('navigate-done', [lastState]);
			} else {
				// console.log('no nav id', obj);
			}
		};
		that.replaceUrl	= function (url) {
			var	current	= this.getCurrent();
			window.history.replaceState(current, current.title, url);
		};
		that.getHistory	= function () {
			return his;
		};
		that.getParentHistory	= function () {
			return his.slice(0, lastState._id);
		};
		that.getParent	= function () {
			return lastState && lastState._id ? his[lastState._id - 1] : undefined;
		};
		that.getCurrent	= function () {
			return lastState ? his[lastState._id] : undefined;
		};
		that.getCurrentNavigate	= function () {
			return lastState ? his[lastState._id + 1] : (his.length === 1 ? his[0] : undefined);
		};
		that.getLatest	= function () {
			return his[his.length - 1];
		};

		return that;
	}());

	var	requestAnimationFrame	= (function () {
		if(window.requestAnimationFrame) {
			return 'requestAnimationFrame';
		} else if(window.webkitRequestAnimationFrame) {
			return 'webkitRequestAnimationFrame';
		} else if(window.msRequestAnimationFrame) {
			return 'msRequestAnimationFrame';
		} else if(window.mozRequestAnimationFrame) {
			return 'mozRequestAnimationFrame';
		} else if(window.oRequestAnimationFrame) {
			return 'oRequestAnimationFrame';
		} else {
			return false;
		}
	}());
	var	audioContext	= (function () {
		if(window.audioContext) {
			return 'audioContext';
		} else if(window.webkitAudioContext) {
			return 'webkitAudioContext';
		} else if(window.msAudioContext) {
			return 'msAudioContext';
		} else if(window.mozAudioContext) {
			return 'mozAudioContext';
		} else if(window.oAudioContext) {
			return 'oAudioContext';
		} else {
			return false;
		}
	}());

	var	visibility	= (function () {
		var	status	= {},
			hidden,
			visibilityChange;
		if (typeof(document.hidden) !== "undefined") {
			hidden				= 'hidden';
			visibilityChange	= 'visibilitychange';
		} else if (typeof document.mozHidden !== 'undefined') {
			hidden				= 'mozHidden';
			visibilityChange	= 'mozvisibilitychange';
		} else if (typeof document.msHidden !== 'undefined') {
			hidden				= 'msHidden';
			visibilityChange	= 'msvisibilitychange';
		} else if (typeof document.webkitHidden !== 'undefined') {
			hidden				= 'webkitHidden';
			visibilityChange	= 'webkitvisibilitychange';
		}

		function setStatus() {
			status.hidden	= document[hidden];
			$(status).trigger('change', status);
		}
		$(document).on(visibilityChange, setStatus);
		setStatus();

		return status;
	}());

	var form	= (function () {
		function autofocus(form) {
			if(!form.find) {
				form	= $(form);
			}
			if(form.find('[autofocus]').length === 0) {
				if(form.find('[data-original-title]') !== 0) {
					form.find('[data-original-title]').first().focus();
				} else {
					form.find('input, select, button').first().focus();
				}
			} else {
				form.find('[autofocus]').focus();
			}
		}

		function getElements() {
			var	i,
				elements	= this.elements || this.querySelectorAll('input, select'),
				element,
				value,
				obj			= {};

			for(i = 0; i < elements.length; i += 1) {
				element	= elements[i];
				if(element.type === 'checkbox') {
					value	= element.checked;
				} else if(element.nodeName === 'SELECT' && element.multiple) {
					value = [];
					for(var iOption = 0; iOption < element.options.length; iOption += 1) {
						if(element.options[iOption].selected) {
							value.push(element.options[iOption].value);
						}
					}
				} else {
					value	= is.float(element.value) ? parseFloat(element.value) : (element.value || '');
				}
				obj	= stringToArray(element.name, value, obj);
			}

			return obj;
		}

		return {
			autofocus:		autofocus,
			getElements:	getElements
		};
	}());

	var is = (function () {
		function float(value) {
			return (parseFloat(value) == value);
		}
		function mail(value) {
			return (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(value);
		}

		return {
			float:	float,
			mail:	mail
		};
	}());

	var	stringToArray = (function () {
		function stringToArray(string, value, mixin) {
			var	us,
				r	= us = mixin || {},
				pre,
				arr	= string.split(/[\[\]]/);

			if(value == undefined || value == null) {
				value = {};
			}

			for(var i = 0; i < arr.length; i += 1) {
				if(arr[i] == '') {
					continue;
				}
				pre	= us;
				us	= us[arr[i]] = us[arr[i]] || {};
			}
			if(arr.length > 1) {
				pre[arr[i-2]] = value;
			} else {
				r[arr[0]] = value;
			}

			return r;
		}

		return stringToArray;
	}());

	return {
		link:					link,
		requestAnimationFrame:	requestAnimationFrame,
		audioContext:			audioContext,
		visibility:				visibility,
		form:					form
	};
});
define('api',['jquery'], function ($) {
	var systemFolder    = '';

	function _apiGetter( url, data ) {
		function then( func ) {
			$.get(systemFolder + '/api/get.' + url, data, func);
		}
		return {
			then:    then
		};
	}
	function _apiSetter( url, data, cache ) {
		function then( func ) {
			$.ajax({
				url:    systemFolder + '/api/save.' + url,
				type:   'post',
				cache:  cache || false,
				data:   data,
				success:func
			});
		}
		return {
			then:    then
		};
	}
	var get = {
		games:  function ( callback ) {
			new _apiGetter( 'games.php', {

			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		game_info:	function ( callback, permlink, octave ) {
			new	_apiGetter( 'game.info.php', {
				permlink:	permlink,
				octave:		octave
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		lang:	function ( callback, keys ) {
			new	_apiGetter( 'lang.php', {
				keys:	keys
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		statistic_uuid:	function ( callback, search ) {
			new _apiGetter( 'statistic.search.uuid.php', {
				search:	search
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		illustrations:	function ( callback, octave, tone_name ) {
			new	_apiGetter( 'illustrations.php', {
				octave:		octave,
				note_name:	tone_name
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		game_generation_duration:	function ( callback, data ) {
			new	_apiGetter( 'game.generation.duration.php', data )
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		}
	};

	var save = {
		playlist:	function ( playlist_id, playlist_name, games, callback ) {
			new	_apiSetter( 'playlist.php', {
				playlist_id:	playlist_id,
				playlist_name:	playlist_name,
				games:			games
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		}
	};

	return  {
		get:    get,
		save:   save
	};
});
define('game/options',[],function () {
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	var	toneNames	= [
			[9, 'C', true, true],
			[7, 'D', true, true],
			[5, 'E', true, true],
			[4, 'F', false, true],
			[2, 'G', true, true],
			[0, 'A', true, true],
			[-2, 'B', true, false]
		],
		tones	= [
			{name:	'',		hz: 0,			pos: 1000,	octav:	0}
		];

	var options = {
		leftMargin:		180,
		markerPos:		100,
		topPos:			100,
		lineHeight:		25,
		waitTime:		30,
		nodeLineExtra:	3,
		gameImageNodeType:	'image',
		gameImagePath:	'img/game/',
		gameImageType:	'.svg',
		noteSlurPos:	{
			x:	-10,
			y:	0,
			z:	50
		},
		svgStartContainerPosSharp: ['F', 'C', 'G', 'D', 'A', 'E'],
		svgStartContainerPosFlat: ['B', 'E', 'A', 'D', 'G', 'C'],
		tones:	{},
		tacts:	{
			types:		{
				quarter:	{
					name:	'quarter',
					length:	1,
					nodes:	4,
					id:		1
				},
				threeForth:	{
					name:	'threeForth',
					length:	3/4,
					nodes:	3,
					id:		2
				},
				fiveForth:	{
					name:	'fiveForth',
					length:	5/4,
					nodes:	5,
					id:		3
				},
				sixForth:	{
					name:	'sixForth',
					length:	6/4,
					nodes:	6,
					id:		4
				},
				twoForth:	{
					name:	'twoForth',
					length:	2/4,
					nodes:	2,
					id:		5
				}
			}
		},
		nodes:	{
			types:	{
				whole:	{
					name:	'whole',
					length:	1/1,
					img:	true,
					width:	16,
					id:		1,
					factor:	1.85
				},
				half:	{
					name:	'half',
					length:	1/2,
					img:	true,
					width:	14,
					id:		2,
					factor:	1.5
				},
				halfPeriod:	{
					name:	'halfPeriod',
					length:	1/2 * 1.5,
					img:	true,
					width:	14,
					id:		3,
					factor:	1.72
				},
				quarter:	{
					name:	'quarter',
					length:	1/4,
					img:	true,
					width:	14,
					id:		4,
					factor:	1
				},
				quarterPeriod:	{
					name:	'quarterPeriod',
					length:	1/4 * 1.5,
					img:	true,
					width:	14,
					id:		5,
					factor:	1.15
				},
				eighth:	{
					name:	'eighth',
					length:	1/8,
					img:	true,
					width:	14,
					id:		6,
					factor:	0.85
				},
				eighthPeriod:	{
					name:	'eighthPeriod',
					length:	1/8 * 1.5,
					img:	true,
					width:	14,
					id:		7,
					factor:	0.97
				},
				sixteenth:	{
					name:	'sixteenth',
					length:	1/16,
					img:	true,
					width:	14,
					id:		8,
					factor:	0.7
				},
				sixteenthPeriod:	{
					name:	'sixteenthPeriod',
					length:	1/16 * 1.5,
					img:	true,
					width:	14,
					id:		9,
					factor:	80
				},
				rest:	{}
			}
		},
		generateTones:	function () {
			options.tones	= {
				all:	[],
				names:	{
					0:	{},
					1:	{},
					2:	{},
					3:	{},
					4:	{},
					5:	{},
					6:	{},
					7:	{},
					8:	{}
				},
				hertz:	{},
				pos:	{},
				rest:	{
					pos:	3
				}

			};

			options.tones.all.push({
				name:	'',
				hz: 	0,
				pos: 	1000,
				octav:	0
			});

			var	freq	= L2P_global.concert_pitch || 442;
			for(var octave = 0; octave <= 8; octave++) {
				var relOctave	= octave - 4;

				toneNames.forEach(function (toneInfo, toneNo) {
					var	pos			= toneInfo[0]
						name		= toneInfo[1],
						useFlat		= toneInfo[2],
						useSharp	= toneInfo[3],
						n			= relOctave * 12 - pos,
						toneFreq	= freq * Math.pow(2, n / 12);

					if(useFlat) {
						options.tones.all.push({
							name:	name+'b',
							hz:		freq * Math.pow(2, (n - 1) / 12),
							pos:	-relOctave * 7 - toneNo + 6,
							octav:	octave
						});
					}

					options.tones.all.push({
						name:	name,
						hz:		freq * Math.pow(2, n / 12),
						pos:	-relOctave * 7 - toneNo + 6,
						octav:	octave
					});

					if(useSharp) {
						options.tones.all.push({
							name:	name+'#',
							hz:		freq * Math.pow(2, (n + 1) / 12),
							pos:	-relOctave * 7 - toneNo + 6,
							octav:	octave
						});
					}
				});
			}

			options.tones.all.push({name:	'',		hz: 8000,		pos: -1000,	octav:	0});

			options.tones.all.forEach(function (tone) {
				options.tones.names[tone.octav][tone.name]	= tone;
				options.tones.hertz[tone.hz]	= tone;

				options.tones.pos[tone.pos]	= options.tones.pos[tone.pos] || {};
				options.tones.pos[tone.pos][tone.name.substr(1)]	= tone;
			});

			function getClosestTone(tone, lower) {
				var	pos	= options.tones.all.indexOf(tone),
					t;

				if((pos === 0 && lower) || (pos === (options.tones.all.length - 1) && !lower)) {
					return null;
				}
				if(lower) {
					t	= options.tones.all[pos - 1];
					if(t.hz === tone.hz) {
						t	= options.tones.all[pos - 2]
					}
				} else {
					t	= options.tones.all[pos + 1];
					if(t.hz === tone.hz) {
						t	= options.tones.all[pos + 2]
					}
				}

				return t;
			}

			options.tones.all.forEach(function (tone) {
				tone.close	= {
					lower:	getClosestTone(tone, true),
					higher:	getClosestTone(tone, false)
				};
			});
		}
	};

	function makeRestNodes() {
		for(var name in options.nodes.types) {
			if(name !== 'rest' && name !== 'whole' && name !== 'half' && name.indexOf('Period') === -1) {
				var rest		= $.extend(true, {}, options.nodes.types[name]);
				rest.isRest	= true;
				rest.name		= 'rest' + capitaliseFirstLetter(name);
				rest.img		= true;
				rest.hasPlayed  = true;

				options.nodes.types.rest[name]	= rest;
			}
		}
	}
	makeRestNodes();

	options.generateTones();

	return options;
});
define('text!templates/game.html',[],function () { return '<div id="game_container_div" style="width: 100%;height: 500px;overflow: hidden;position: relative;">\n\t<svg height="500" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg_container" version="1.1">\n\t\t<defs>\n\t\t\t<g id="pointer" transform="scale(0.1875)">\n\t\t\t\t<path id="svg_1" d="m0,0l0,100l86,-50l-87,-50"/>\n\t\t\t</g>\n\t\t</defs>\n\t\t<g id="background"></g>\n\t\t<g id="notes"></g>\n\t\t<g id="start"></g>\n\t</svg>\n\t<svg height="500" style="-webkit-transform: translate3d(0, -501px, 0);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg_container_notes" version="1.1">\n\t</svg>\n</div>';});

define('svg',[],function () {
	var	nameSpace	= {
		svg:	'http://www.w3.org/2000/svg',
		xlink:	'http://www.w3.org/1999/xlink'
	};

	function createSVGElement(nodeName) {
		return document.createElementNS(nameSpace.svg, nodeName);
	}

	var	SVGElement	= function (node) {
		this.node;
		this.ref;
		this.options	= {};
		this.x			= 0;
		this.y			= 0;
		this.width		= 0;
		this.height		= 0;
		this.x1			= 0;
		this.y1			= 0;
		this.x2			= 0;
		this.y2			= 0;
		this.cx			= 0;
		this.cy			= 0;
		this.r			= 0;
		this.rx			= 0;
		this.ry			= 0;
		this.link		= {
			href:	''
		};
		this.fill		= '';
		this.stroke			= '';
		this.strokeWidth	= 0;
		this.d				= '';
		this.innerText		= '';
		this.fontSize		= 0;
		this.fontWeight		= '';
		this.borderRadius	= [];
		this.text			= '';

		this.setNode(node);
	};
	SVGElement.prototype.setNode	= function (node) {
		if(node && node.nodeName) {
			this.node	= node;
		} else if(node) {
			this.node	= createSVGElement(node);
		}
		if(this.node) {
			this.node.SVGElement	= this;
		}

		return this;
	};
	SVGElement.prototype.setRef	= function (ref) {
		this.ref	= ref;

		return this;
	};
	SVGElement.prototype.removeChildNodes = function () {
		var	that	= this;
		while(this.node.childElementCount !== 0) {
			this.node.removeChild(this.node.childNodes[0]);
		}
	};
	SVGElement.prototype.setPos	= function (x, y) {
		this.node.setAttributeNS(null, 'x', x);
		this.node.setAttributeNS(null, 'y', y);

		this.x	= x;
		this.y	= y;

		return this;
	};
	SVGElement.prototype.setDimensions	= function (width, height) {
		this.node.setAttributeNS(null, 'width', width);
		this.node.setAttributeNS(null, 'height', height);

		this.width	= width;
		this.height	= height;

		return this;
	};
	SVGElement.prototype.setLine	= function (x1, y1, x2, y2) {
		this.node.setAttributeNS(null, 'x1', x1);
		this.node.setAttributeNS(null, 'y1', y1);
		this.node.setAttributeNS(null, 'x2', x2);
		this.node.setAttributeNS(null, 'y2', y2);

		this.x1	= x1;
		this.y1	= y1;
		this.x2	= x2;
		this.y2	= y2;

		return this;
	};
	SVGElement.prototype.setCircle	= function (cx, cy, r) {
		this.node.setAttributeNS(null, 'cx', cx);
		this.node.setAttributeNS(null, 'cy', cy);
		this.node.setAttributeNS(null, 'r', r);

		this.cx	= cx;
		this.cy	= cy;
		this.r	= r;

		return this;
	};
	SVGElement.prototype.setEllipse	= function (cx, cy, rx, ry) {
		this.node.setAttributeNS(null, 'cx', cx);
		this.node.setAttributeNS(null, 'cy', cy);
		this.node.setAttributeNS(null, 'rx', rx);
		this.node.setAttributeNS(null, 'ry', ry);

		this.cx	= cx;
		this.cy	= cy;
		this.rx	= rx;
		this.ry	= ry;

		return this;
	};
	SVGElement.prototype.setLink	= function (url) {
		this.node.setAttributeNS(nameSpace.xlink, 'xlink:href', url);

		this.link.href	= url;

		return this;
	};
	SVGElement.prototype.setFill	= function (fill) {
		this.node.setAttributeNS(null, 'fill', fill);

		this.fill	= '';

		return this;
	};
	SVGElement.prototype.setStroke	= function (stroke, width) {
		this.node.setAttributeNS(null, 'stroke', stroke);
		if(width) {
			this.setStrokeWidth(width);
		}

		this.stroke	= stroke;

		return this;
	};
	SVGElement.prototype.setStrokeWidth	= function (strokeWidth) {
		this.node.setAttributeNS(null, 'stroke-width', strokeWidth);

		this.strokeWidth	= strokeWidth;

		return this;
	};
	SVGElement.prototype.setAttribute	= function (name, value) {
		this.node.setAttributeNS(null, name, value);

		this[name]	= value;

		return this;
	};
	SVGElement.prototype.setLinkAttribute	= function (name, value) {
		this.node.setAttributeNS(nameSpace.xlink, 'xlink:'+name, value);

		this.link[name]	= value;

		return this;
	};
	SVGElement.prototype.setOpacity	= function (opacity) {
		this.node.style.opacity	= opacity;

		return this;
	}
	SVGElement.prototype.setPath	= function (path) {
		this.node.setAttributeNS(null, 'd', path);

		this.d	= path;

		return this;
	};
	SVGElement.prototype.setInnerText	= function (text, fontSize, fontWeight) {
		var	textNode	= document.createTextNode(text);
		this.node.appendChild(textNode);

		this.innerText	= text;

		if(fontSize) {
			this.setFontSize(fontSize);
		}
		if(fontWeight) {
			this.setFontWeight(fontWeight);
		}

		return this;
	};
	SVGElement.prototype.setFontSize	= function (size) {
		this.node.style.fontSize	= size + 'px';

		this.fontSize	= size;

		return this;
	};
	SVGElement.prototype.setFontWeight	= function (weight) {
		this.node.style.fontWeight	= weight;

		this.fontWeight	= weight;

		return this;
	};
	SVGElement.prototype.setBorderRadius	= function (rx, ry) {
		if(ry === undefined) {
			ry	= rx;
		}
		this.node.setAttributeNS(null, 'rx', rx);
		this.node.setAttributeNS(null, 'ry', ry);

		this.borderRadius	= [rx, ry];

		return this;
	};
	SVGElement.prototype.setText	= function (text) {
		this.node.textContent	= text;

		this.text	= text;

		return this;
	}
	SVGElement.prototype.animateAbs	= function (x, y, duration, callback) {
		var	that		= this,
			secPrPx		= duration / x || 0,
			relativeX	= x - this.getPos().x,
			relativeDuration	= secPrPx * relativeX;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translate3d('+x+'px,'+y+'px,0px)';

		if(callback) {
			$(this.node).off('webkitTransitionEnd').on('webkitTransitionEnd', function (e) {
				$(that.node).off('webkitTransitionEnd');
				callback.call(this, e);
			});
		}

		return this;
	};
	SVGElement.prototype.animateX	= function (x, duration, callback) {
		var	that		= this,
			secPrPx		= duration / x,
			relativeX	= x - this.getPos().x,
			relativeDuration	= secPrPx * relativeX;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translate3d('+x+'px,0px,0px)';

		if(callback) {
			$(this.node).on('webkitTransitionEnd', function (e) {
				$(that.node).off('webkitTransitionEnd');
				callback.call(this, e);
			});
		}

		return this;
	};
	SVGElement.prototype.animateStopX	= function () {
		this.node.style.webkitTransition	= 'all 0s linear';
		this.node.style.webkitTransform		= 'translateX('+this.getPos().x+'px)';

		return this;
	};
	SVGElement.prototype.animateStop	= function () {
		var	pos	= this.getPos();

		this.node.style.webkitTransition	= 'all 0s linear';
		this.node.style.webkitTransform		= 'translate3d('+pos.x+'px,'+pos.y+'px,0px)';

		return this;
	};
	SVGElement.prototype.animateY	= function (y, duration) {
		var	secPrPx		= duration / y,
			relativeY	= y - this.getPos().y,
			relativeDuration	= secPrPx * relativeY;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translateY('+y+'px)';

		return this;
	};
	SVGElement.prototype.getPos	= function () {
		var CTM	= this.node.getCTM();

		return {
			x:	CTM.e,
			y:	CTM.f
		};
	};
	SVGElement.prototype.getAbsolutePos	= function () {
		var BBox	= this.node.getBBox();

		return {
			x:	BBox.x,
			y:	BBox.y,
			xr:	BBox.x + BBox.width,
			yb:	BBox.y + BBox.height,
			xc:	BBox.x + BBox.width / 2,
			yc:	BBox.y + BBox.height / 2
		};
	};
	SVGElement.prototype.addClass	= function (className) {
		this.node.classList.add(className);

		return this;
	}
	SVGElement.prototype.removeClass	= function (className) {
		this.node.classList.remove(className);

		return this;
	}
	SVGElement.prototype.appendTo	= function (elem) {
		if(elem.constructor === SVGElement) {
			elem.node.appendChild(this.node);
		} else {
			elem.appendChild(this.node);
		}

		return this;
	};
	SVGElement.prototype.getX		= function () {
		return this.node.x.baseVal.value;
	};
	SVGElement.prototype.getY		= function () {
		return this.node.y.baseVal.value;
	};
	SVGElement.prototype.hide		= function () {
		this.node.style.display	= 'none';
		return this;
	};
	SVGElement.prototype.show		= function () {
		this.node.style.display	= '';
		return this;
	};

	return SVGElement;
});
define('game/tick',[],function () {
	function Tick(freq, toneDiff) {
		this.time		= Date.now();
		this.freq		= freq;
		this.toneDiff	= toneDiff;

		if(this.toneDiff.diffAbs >= 10) {
			this.percent	= 0;
		} else {
			this.percent	= ((10 - this.toneDiff.diffAbs) / 10) * 100;
		}
	}
	return Tick;
});
define('game/game',['game/options', 'fM'], function (options, fM) {
	var	Game	= function (speed) {
		this.defaultSpeed	= speed;
		this.startOctave	= 4;
		this.factor		= 1;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
		this.tacts		= [];
		this.running	= false;
		this.frame		= -1;
		this.length		= 0;
		this.speed;
		this.secPrNode;
		this.startTime;
		this.stopTime;
		this.convasControl;
		this.sound;
		this.nodePlaying;
		this.stopTimeout;
		this.controller;
		this.title		= '';
		this.duration	= -1;
		this.width		= -1;

		this.sharps		= {};
		this.flats		= {};

		this.setSpeed(speed);
	}
	Game.prototype.setSharp = function (toneName, isTrue) {
		this.sharps[toneName]	= isTrue === 'toggle' ? (this.sharps[toneName] ? false : true) : (isTrue === false ? false : true);
	};
	Game.prototype.setFlat = function (toneName, isTrue) {
		this.flats[toneName]	= isTrue === 'toggle' ? (this.flats[toneName] ? false : true) : (isTrue === false ? false : true);
	};
	Game.prototype.setSpeed = function (speed) {
		if(!this.running) {
			this.speed		= speed;
			this.secPrNode	= 60 / this.speed;
		}
	};
	Game.prototype.addTact = function(tact) {
		tact.fill();
		tact.setKeys(this.sharps, this.flats);
		this.tacts.push(tact);
		this.length	+= tact.type.length;
		this.width	= -1;
	};
	Game.prototype.reset = function () {
		this.tacts.forEach(function (tact) {
			tact.svgElement	= null;
			tact.hasPlayed	= false;
			tact.nodes.forEach(function (note) {
				note.svgElement	= null;
				note.hasPlayed  = false;
				note.img        = note.type.img;
				note.ticks		= [];
				note.kiddieModeAccepted	= false;
			});
		});
	};
	Game.prototype.start = function () {
		this.startTime	= Date.now();

		this.running	= true;
	};
	Game.prototype.stop = function () {
		this.stopTime	= Date.now();

		this.running = false;
	};
	Game.prototype.getWidth = function () {
		if(this.width === -1) {
			var	that	= this,
				width	= options.leftMargin + this.defWidth;
			this.tacts.forEach(function (tact) {
				width	+= tact.type.length * that.defWidth;
			});

			this.width	= width;
		}

		return this.width;
	};
	Game.prototype.getDuration = function () {
		if(this.duration === -1) {
			var	that		= this,
				duration	= 4 * this.secPrNode;

			this.tacts.forEach(function (tact) {
				duration	+= tact.type.nodes * that.secPrNode;
			});

			// console.log(this.secPrNode, duration);

			this.duration	= duration;
		}

		return this.duration;
	};
	Game.prototype.runAtPos = function (x) {
		var	that	= this;
		this.tacts.forEach(function (tact) {
			if(tact.hasPlayed) {
				return;
			}
			tact.nodes.forEach(function (note) {
				if(note.hasPlayed) {
					return;
				}
				if(note.svgElement.node.getBBox().x - x < options.markerPos + options.leftMargin + 10) {
					that.controller.playNote(note);
				}
			});
		});
	};
	Game.prototype.userPlayNode = function (feq) {
		if(this.nodePlaying.tone.hz === feq) {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'True'];
		} else {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'False'];
		}
		// console.log(this.nodePlaying.tone.hz, feq);
	};

	return Game;
});
define('game/note',[],function() {
	var Note = (function () {
		var	steps	= [
			{
				percent:	95,
				factor:		1,
				text:		'Perfect',
				color:		'#090'
			},
			{
				percent:	80,
				factor:		0.95,
				text:		'Good',
				color:		'#0D0'
			},
			{
				percent:	60,
				factor:		0.9,
				text:		'Fair',
				color:		'#FF0'
			},
			{
				percent:	45,
				factor:		0.8,
				text:		'Average',
				color:		'#990'
			},
			{
				percent:	30,
				factor:		0.65,
				text:		'Poor',
				color:		'#F90'
			},
			{
				percent:	10,
				factor:		0.65,
				text:		'Rubbish',
				color:		'#C60'
			},
			{
				percent:	0,
				factor:		0.65,
				text:		'Miserable',
				color:		'#900'
			}
		];
		function Note(type, tone, isRemoveKey, isSlur) {
			if (typeof isRemoveKey === "undefined") { isRemoveKey = false; }
			if (typeof isSlur === "undefined") { isSlur = false; }
			this.type			= type;
			this.tone			= tone;
			this.isRemoveKey	= isRemoveKey;
			this.isSlur			= isSlur;
			this.hasPlayed		= false;
			this.length			= this.type.length;
			this.img			= this.type.img;
			this.isSharp		= this.tone.name && this.tone.name.substr(1) === '#';
			this.isFlat			= this.tone.name && this.tone.name.substr(1) === 'b';
			this.isPeriod		= this.type.name.indexOf('Period') !== -1;
			this.isRest 		= this.type.isRest;
			this.ticks			= [];
			this.stepPercent	= 0;
			this.stepFactor;
			this.points			= 0;
			this.kiddieModeAccepted	= false;
			this.isFocus		= false;
		}
		Note.prototype.calculatePoints	= function (gameController) {
			var	that			= this,
				totalPercent	= 0,
				speedFactor		= 1 + (gameController.game.speed - gameController.game.defaultSpeed) / 200,
				factor;

			this.ticks.forEach(function (tick) {
				totalPercent	+= Math.max(tick.percent, 0);
			});

			this.stepPercent	= totalPercent / this.ticks.length;

			steps.forEach(function (step) {
				if(!that.stepFactor && that.stepPercent >= step.percent) {
					that.stepFactor	= step;
				}
			});

			factor	= this.stepFactor && this.stepFactor.factor || 0;

			this.points	= +((this.stepPercent * 100).toFixed(0) * factor * speedFactor * this.type.factor * 0.1).toFixed(0) || 0;
			$(gameController).trigger('notePoints', [this]);
		};
		return Note;
	})();
	return Note;
});

define('game/tact',['jquery', 'game/options', 'game/note'], function ($, options, Node) {
	var	Tact	= function (type) {
		this.type		= type;
		this.length		= this.type.length;
		this.remaining	= this.length;
		this.nodes		= [];
		this.points		= 0;
		this.done		= false;

		this.noteLength		= 0;
		this.notePercent	= 0;

		this.stepFactor;
	}
	Tact.prototype.addNode = function(node) {
		if(this.remaining >= node.length) {
			node.tact	= this;
			this.nodes.push(node);
			this.remaining	-= node.length;
			return true;
		} else {
			return false;
		}
	};
	Tact.prototype.fill = function () {
		while(this.remaining > 0) {
			if(this.remaining % (1/4) === 0) {
				this.addNode(new Node(options.nodes.types.rest.quarter, options.tones.rest));
			} else if(this.remaining % (1/8) === 0) {
				this.addNode(new Node(options.nodes.types.rest.eighth, options.tones.rest));
			} else if(this.remaining % (1/16) === 0) {
				this.addNode(new Node(options.nodes.types.rest.sixteenth, options.tones.rest));
			}
		}
	};
	Tact.prototype.setKeys = function (sharps, flats) {
		var sharps	= $.extend({}, sharps);
		var flats	= $.extend({}, flats);
		this.nodes.forEach(function (node) {
			if(node.type.isRest) {
				return;
			}
			if(node.isRemoveKey) {
				delete sharps[node.tone.name];
				delete flats[node.tone.name];
			} else {
				if(node.isSharp) {
					sharps[node.tone.name.substr(0,1)]	= true;
				}
				if(node.isFlat) {
					flats[node.tone.name.substr(0,1)]	= true;
				}
				if(!node.isSharp && sharps[node.tone.name]) {
					node.tone	= options.tones.names[node.tone.octav][node.tone.name+'#'];
				}
				if(!node.isFlat && flats[node.tone.name]) {
					node.tone	= options.tones.names[node.tone.octav][node.tone.name+'b'];
				}
			}
		});
	};
	Tact.prototype.calculatePoints	= function (gameController, getStepFactor) {
		var	tact		= this,
			noteLength	= 0,
			notePercent	= 0;

		this.points		= 0;

		this.nodes.forEach(function (note) {
			if(!note.isRest) {
				note.calculatePoints(gameController);

				notePercent	+= note.stepPercent * note.length;
				noteLength	+= note.length;
				tact.points	+= note.points || 0;
			}
		});

		this.stepFactor	= getStepFactor(notePercent / noteLength);
	};

	return Tact;
});
define('game/game-controller',['jquery', 'svg', 'game/options', 'fM', 'api', 'l2p', 'game/tick'], function ($, SVGElement, options, fM, api, L2P, Tick) {
	function getImagePath(note, connect, coloredNotes, colorName) {
		var	path		= options.gameImagePath;

		colorName		= colorName	|| '';
		coloredNotes	= coloredNotes || [];

		if(note.isRest) {
			path	+= note.type.name.substr(4, 1).toLowerCase() + note.type.name.substr(5) + 'rest';
		} else if(note.isPeriod) {
			path	+= note.type.name.substr(0, note.type.name.length - 6) + 'note-period';
		} else {
			if(connect) {
				path	+= 'quarternote';
			} else {
				path	+= note.type.name + 'note';
			}
		}

		if(!note.isRest && colorName === '') {
			for(var colorNo = 0; colorNo < coloredNotes.length; colorNo += 1) {
				if(coloredNotes[colorNo].pos <= note.tone.pos) {
					colorName	= coloredNotes[colorNo].color;
					break;
				}
			}
		}

		return path + colorName + options.gameImageType;
	}
	function flipNote(note) {
		note.svgElement.setPos(note.svgElement.getX(), -175 - note.svgElement.getY() + 2 * 4);
		note.svgElement.node.style.webkitTransform	= 'scaleY(-1)';
		note.svgElement.options.flip				= true;
	}
	function unFlipNote(note) {
		note.svgElement.setPos(note.svgElement.getX(), note.svgElement.options.defY);
		note.svgElement.node.style.webkitTransform	= 'scaleY(1)';
		note.svgElement.options.flip				= false;
	}

	var	GameController	= function (svg) {
		var	that	= this;
		this.$this			= $(this);
		this.svg			= svg;
		this.svgBackground	= svg.querySelector('#background');
		this.SVGBackground	= new SVGElement(this.svgBackground);
		this.svgNotes		= svg.querySelector('#notes');
		this.svgNotes		= document.getElementById('svg_container_notes');
		this.gameContainerDiv	= document.getElementById('game_container_div');
		this.pointContainerDiv	= document.createElement('div');
		this.pointContainerDiv.style.width				= '130px';
		this.pointContainerDiv.style.height				= '40px';
		this.pointContainerDiv.style.borderRadius		= '5px';
		this.pointContainerDiv.style.position			= 'absolute';
		this.pointContainerDiv.style.top				= '0';
		this.pointContainerDiv.style.textAlign			= 'center';
		this.pointContainerDiv.style.padding			= '15px 0';
		this.pointContainerDiv.style.webkitTransform	= 'translate3d(145px, 150px, 0)';
		this.SVGNotes		= new SVGElement(this.svgNotes);
		this.svgStart		= svg.querySelector('#start');
		this.SVGStart		= new SVGElement(this.svgStart);
		this.permlink		= '';
		this.sound;
		this.game;
		this.lastPos		= 0;
		this.playSound		= true;
		this.useCountdown	= true;
		this.currentNote;
		this.currentTact;
		this.paused			= false;
		this.lastLeft		= -1;
		this.isEdit			= false;
		this.fingerpos		= null;

		$(fM.visibility).on('change', function (e, visibility) {
			if(visibility.hidden) {
				that.stopGame();
			}
		});

		for(var i = 50 + options.lineHeight; i <= 50 + options.lineHeight * 5; i += options.lineHeight) {
			var	g	= new SVGElement('g')
				.appendTo(this.svgBackground);

			g.node.setAttribute('transform', 'translate(0, '+(i + options.topPos)+')');
			new SVGElement('line')
				.setLine(0, 0, '100%', 0)
				.setStroke('#000')
				.appendTo(g);
		}
		new SVGElement('image')
			.setLink('/img/game/g-key.svg')
			.setPos(5, options.topPos + options.lineHeight)
			.setDimensions(63, 190)
			.appendTo(this.svgStart);
		this.svgStartContainer =
			new SVGElement('g')
				.appendTo(this.svgStart);
		var	g	=
			new SVGElement('g')
				.appendTo(this.svgStart);
		g.node.setAttribute('transform', 'translate('+(options.leftMargin + options.markerPos)+', '+(options.topPos + 25 + options.lineHeight)+')');
		this.svgLine =
			new SVGElement('line')
				.setLine(0, 0, 0, options.topPos + 50 + options.lineHeight * 6 - (options.topPos + 25 + options.lineHeight))
				.setStroke('#090', 3)
				.appendTo(g);
		this.svgPointer	=
			new SVGElement('use')
				.setLink('#pointer')
				.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (4 / 2 - 0.5) - 0.85 * options.lineHeight * 0.5 + 1.5)
				.setFill('#090')
				.appendTo(this.svgStart);
		new SVGElement('rect')
				.setPos(200, 200)
				.setDimensions(50, 50)
				.setFill('#000')
				.setOpacity(0)
				.addClass('animate-spinning-infinite')
				.appendTo(this.svgStart);

		this.setPointerPos(1);

		this.factor;
		this.defWidth;
		this.startPos;
		this.setFactor(1);
	};
	GameController.prototype.showPointBox	= function (points, stepFactor) {
		var	div						= this.pointContainerDiv.cloneNode();
		stepFactor					= stepFactor || L2P.steps[L2P.steps.length - 1];
		div.innerHTML				= stepFactor.text+'<br>'+points+' Points';
		div.style.backgroundColor	= stepFactor.color;
		div.style.webkitTransition	= '1s';
		setTimeout(function () {
			div.style.webkitTransform	= 'translate3d(145px, 100px, 0)';
			div.style.opacity			= '0';
			setTimeout(function () {
				div.remove();
			}, 1000);
		}, 0);

		this.gameContainerDiv.appendChild(div);
	};
	GameController.prototype.setFactor	= function (factor) {
		this.factor		= factor;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
	};
	GameController.prototype.setGame	= function (game) {
		game.controller	= this;
		this.game		= game;
		this.point		= 0;
		this.pointCon	= $('#pointContainer');
		this.currentNote	= undefined;

		// console.log(this.game);
		this.game.reset();

		this.SVGNotes.animateAbs(0, -505, 0);

		// console.log('reset-pos', this.SVGNotes.node.style.webkitTransition, this.SVGNotes.node.style.webkitTransform);
		this.initView();

		this.$this.trigger('gameLoadSpeedChange', this.game.speed);
	};
	GameController.prototype.startGame	= function (nextSong) {
		var	that		= this,
			firstNote;

		if(this.game) {
			this.game.tacts.forEach(function (tact) {
				if(firstNote) {
					return;
				}
				tact.nodes.forEach(function (note) {
					if(firstNote) {
						return;
					}
					if(!note.isRest) {
						firstNote	= note;
					}
				});
			});

			if(L2P_global.blind_mode && that.compass.enabled) {
				that.compass.setTone(options.tones.names[4]['A']);
				that.compass.disable();
			} else if(!L2P_global.blind_mode && !that.compass.enabled) {
				that.compass.enable();
			}
			if(L2P_global.blind_mode) {
				that.svgPointer.hide();
			}

			if(this.useCountdown) {
				api.get.lang(function (data) {
					api.get.illustrations(function (illustration) {
						L2P.countdown(L2P_global.countdown_time || 3, data.game_start, that.game.title, illustration.illustration, function () {
							that.game.start();
							that.$this.trigger('gameStart');

							that.runGame();
						});
					}, firstNote.tone.octav, firstNote.tone.name);
				}, ['game_start']);
			} else {
				that.game.start();
				that.$this.trigger('gameStart');

				that.SVGNotes.node.style.webkitTransition	= '';
				that.SVGNotes.node.style.webkitTransform	= '';

				that.runGame();
			}
		}
	};
	GameController.prototype.runGame	= function () {
		var	gameController		= this,
			totalWidth			= this.game.getWidth() - gameController.defWidth / 4,
			totalDuration		= this.game.getDuration(),
			currentLeft			= -this.svgNotes.getClientRects()[0].left,
			relativeDuration	= totalDuration * (totalWidth - currentLeft) / totalWidth,
			pulse				= 60 / gameController.game.speed * 1000;

		gameController.paused	= false;

		gameController.SVGNotes.node.style.width	= (totalWidth + gameController.defWidth / 4)+'px';

		gameController.SVGNotes.animateAbs(-totalWidth, -505, relativeDuration, this.gameDone.bind(this));

		$(gameController.svgLine.node).on('webkitAnimationEnd', function () {
			gameController.svgLine.node.classList.remove('pulse');
		});

		if(L2P_global.metronome && !L2P_global.kiddie_mode) {
			var lastPulse	= Date.now(),
				pulseFunc	= function () {
					if(gameController.game && gameController.game.running) {
						gameController.svgLine.node.classList.add('pulse');

						setTimeout(pulseFunc, pulse - ((Date.now() - lastPulse) % pulse));
					}
				};

			if(currentLeft === 0) {
				setTimeout(function () {
					gameController.svgLine.node.classList.add('pulse');
					lastPulse	= Date.now();
					setTimeout(pulseFunc, pulse);
				}, pulse / 2 + pulse / 10);
			} else {
				gameController.svgLine.node.classList.add('pulse');
				lastPulse	= Date.now();
				setTimeout(pulseFunc, pulse);
			}
		}
	};
	GameController.prototype.pauseGame	= function () {
		if(L2P_global.kiddie_mode) {
			this.SVGNotes.animateAbs(-this.currentLeft() + 30, -505, 0);
		} else {
			this.SVGNotes.animateAbs((-Math.floor(this.currentLeft() / (this.defWidth / 4)) + 0.5) * (this.defWidth / 4) - 20, -505, 0);
		}
		this.paused	= true;
	};
	GameController.prototype.stopGame	= function () {
		this.compass.enable();
		this.svgPointer.show();
		if(this.game && this.game.running) {
			this.game.stop();

			this.pauseGame();

			this.$this.trigger('gameStop');
			this.sound.clearSound();
		}
	};
	GameController.prototype.drawSlur	= function (from, to) {
		var	fromPos	= from.svgElement.getAbsolutePos(),
			toPos	= to.svgElement.getAbsolutePos();

		if(from.svgElement.options.flip && !to.svgElement.options.flip) {
			fromPos.yc	= -fromPos.yc - 45;
		}

		var	slur	=
			new SVGElement('path')
				.setPath('M '+(fromPos.xc + options.noteSlurPos.x)+' '+(fromPos.yb + options.noteSlurPos.y)+' q '+((toPos.xc - fromPos.xc) / 2)+' '+options.noteSlurPos.z+' '+(toPos.xc - fromPos.xc)+' '+(toPos.yc - fromPos.yc))
				.setStroke('#000', 2)
				.setFill('none')
				.appendTo(from.tact.svgElement.node);

		if(from.svgElement.options.flip) {
			slur.node.style.webkitTransform			= 'scaleY(-1)';
		}
	};
	GameController.prototype.initView	= function (dontResetPos) {
		var	that		= this,
			gameController	= this,
			game		= this.game,
			tactLeftPos	= 0,
			firstSlur,
			lastSlur,
			svgStartContainerPos	= 0;

		this.svgStartContainer.removeChildNodes();
		options.svgStartContainerPosSharp.forEach(function (toneName) {
			if(game.sharps[toneName]) {
				new SVGElement('text')
					.setInnerText('\u266F', 36, 'bold')
					.setPos(80 + svgStartContainerPos * 15, options.topPos + (options.lineHeight * (5.5 + options.tones.names[5][toneName].pos / 2)) - 2)
					.appendTo(that.svgStartContainer);

				svgStartContainerPos	+= 1;
			}
		});
		options.svgStartContainerPosFlat.forEach(function (toneName, i) {
			if(game.flats[toneName]) {
				new SVGElement('text')
					.setInnerText('\u266D', 36, 'bold')
					.setPos(80 + svgStartContainerPos * 15, options.topPos + (options.lineHeight * (5.5 + options.tones.names[i === 0 || i === 2 ? 4 : 5][toneName].pos / 2)) - 5)
					.appendTo(that.svgStartContainer);

				svgStartContainerPos	+= 1;
			}
		});

		if(dontResetPos !== true) {
			this.SVGNotes.animateAbs(0, -505, 0);
		}
		this.SVGNotes.removeChildNodes();

		var	coloredNotes	= [];
		if(L2P_global.colored_notes && !gameController.isEdit) {
			coloredNotes.push({
				pos:	options.tones.names[4]['C#'].pos,
				color:	'-yellow'
			});
			coloredNotes.push({
				pos:	options.tones.names[4]['G#'].pos,
				color:	'-green'
			});
			coloredNotes.push({
				pos:	options.tones.names[5]['D#'].pos,
				color:	'-red'
			});
			coloredNotes.push({
				pos:	-10000,
				color:	'-blue'
			});
		}

		if(this.game) {
			var	lastNote;
			this.game.tacts.forEach(function (tact) {
				var tactWidth	= tact.type.length * that.defWidth,
					tactPos		= that.startPos + tactLeftPos,
					noteLeftPos	= 0,
					lastNote	= null,
					noteTime	= 0,
					connections	= [];

				tactLeftPos	+= tactWidth;

				tact.svgElement	= new SVGElement('g').appendTo(that.svgNotes);
				new SVGElement('line')
					.setLine(tactPos, 75 + options.topPos, tactPos, options.lineHeight * 6 + 25 + options.topPos)
					.setStroke('#000', 2)
					.appendTo(tact.svgElement.node);

				tact.nodes.forEach(function (note) {
					var noteWidth	= note.type.length * that.defWidth,
						notePos		= tactPos + that.defWidth / 16 + noteLeftPos - 20,
						tonePos 	= (note.tone.pos + 11) * options.lineHeight / 2 + 4,
						connect		= false;

					noteTime	+= note.type.length;

					noteLeftPos	+= noteWidth;
					svgElement	= null;

					if(note.type.img) {
						if(note.length <= 1/8 && !note.isRest) {
							connections.push(note);
						}

						note.svgElement	= new SVGElement(options.gameImageNodeType)
											.setRef(note)
											.setLink('/'+getImagePath(note, connect, coloredNotes, note.isFocus ? '-green' : ''))
											.setPos(notePos, tonePos)
											.setDimensions(50, 100)
											.appendTo(tact.svgElement.node);

						note.svgElement.options.defY	= tonePos;

						if(note.isSharp || note.isFlat || note.isRemoveKey) {
							var	text	= '',
								y		= 95;
							if(note.isSharp) {
								text	= '\u266F';
							} else if(note.isFlat) {
								text	= '\u266D';
								y		= 90;
							} else if(note.isRemoveKey) {
								text	= '\u266E';
							}
							new SVGElement('text')
								.setInnerText(text, 36, 'bold')
								.setPos(notePos - 25, tonePos + y)
								.appendTo(tact.svgElement.node);
						}
						if(note.isPeriod) {
							new	SVGElement('circle')
								.setCircle(notePos + 25 + 10, tonePos + 90 - 8, 3)
								.appendTo(tact.svgElement.node);
								/*
							new SVGElement('text')
								.setInnerText('◘', 36, 'bold')
								.setPos(notePos + 25, tonePos + 90)
								.appendTo(tact.svgElement.node);*/
						}

						if(note.tone.pos <= 0) {
							flipNote(note);
						}

						var	extraLine;
						for(extraLine = -6; extraLine >= note.tone.pos; extraLine -= 2) {
							var	y	= options.topPos + (extraLine / 2 + 5) * options.lineHeight;
							new SVGElement('line')
								.setLine(notePos - 5, y, notePos + 32, y)
								.setStroke('#000')
								.appendTo(tact.svgElement.node)
						}
						for(extraLine = 6; extraLine <= note.tone.pos; extraLine += 2) {
							var	y	= options.topPos + (extraLine / 2 + 5) * options.lineHeight;
							new SVGElement('line')
								.setLine(notePos - 5, y, notePos + 32, y)
								.setStroke('#000')
								.appendTo(tact.svgElement.node)
						}
					}
					if(note.isSlur) {
						lastSlur	= note;
					} else {
						if(lastSlur) {
							that.drawSlur(firstSlur, lastSlur);
							lastSlur	= null;
						}
						firstSlur	= note;
					}

					while(noteTime >= 1/4) {
						if(connections.length > 1) {
							(function (connections) {
								var	first	= connections[0],
									last	= connections[connections.length - 1],
									flip	= first.svgElement.options.flip;

								connections.forEach(function (note) {
									note.svgElement.setLink('/'+getImagePath(note, true, coloredNotes, note.isFocus ? '-green' : ''));
									if(note !== first) {
										if(flip && !note.svgElement.options.flip) {
											flipNote(note);
										} else if(!flip && note.svgElement.options.flip) {
											unFlipNote(note);
										}
									}
								});

								var	y1		= first.svgElement.options.defY + 11 + (flip ? 147 : 0),
									y2		= last.svgElement.options.defY + 11 + (flip ? 147 : 0),
									x		= last.length - first.length,
									a		= (y2 - y1) / x,
									moveY	= 0;

								if(connections.length > 2) {
									var	notePos		= 0 - first.length;
									connections.forEach(function (note) {
										var	realY	= note.svgElement.options.defY + 11 + (flip ? 147 : 0),
											diffY	= y1 - realY;

										if(flip && diffY < 0 && diffY < -moveY) {
											moveY	= -diffY;
										} else if(!flip && diffY > 0 && diffY > -moveY) {
											moveY	= -diffY;
										}

										notePos	+= note.length;
									});

									connections.forEach(function (note) {
										if(note.svgElement.getY() !== y1 + moveY) {
											new SVGElement('line')
												.setLine(note.svgElement.getX() + 25, note.svgElement.options.defY + 11 + (flip ? 147 : 0), note.svgElement.getX() + 25, y1 + moveY)
												.setStroke('#000', 2)
												.appendTo(tact.svgElement.node);
										}
									});

									y2	= y1;
								}

								var	lastNote	= null;
								connections.forEach(function (note) {
									if(lastNote) {
										if(lastNote.length === 1/16 && note.length === 1/16) {
											new	SVGElement('line')
												.setRef(connections)
												.setLine(lastNote.svgElement.getX() + 24, y1 + moveY + (flip ? -10 : +10), note.svgElement.getX() + 26, y2 + moveY + (flip ? -10 : +10))
												.setStroke('#000', 5)
												.appendTo(tact.svgElement.node);
										}
										new	SVGElement('line')
											.setRef(connections)
											.setLine(lastNote.svgElement.getX() + 24, y1 + moveY, note.svgElement.getX() + 26, y2 + moveY)
											.setStroke('#000', 5)
											.appendTo(tact.svgElement.node);
									}
									lastNote	= note;
								});
							}(connections));
						}
						connections	= [];
						noteTime	-= 1/4;
					}
				});
			});
		}

		var	gameController		= this,
			totalWidth			= gameController.game.getWidth() - gameController.defWidth / 4;

		gameController.SVGNotes.node.style.width	= (totalWidth + gameController.defWidth / 4)+'px';
	};
	GameController.prototype.playNote	= function (note) {
		note.hasPlayed	= true;
		if(note.type.isRest) {
			this.sound.playRest();
		} else if(this.sound) {
			this.sound.play(note.tone.hz, note.isSlur);
		}
	};
	GameController.prototype.setGameSpeed	= function (speed) {
		if(this.game) {
			this.game.setSpeed(speed);
		}
	};
	GameController.prototype.importGame	= function (gameInfo, title, defaultOctave, fingerpos) {
		var	that	= this;

		this.fingerpos	= fingerpos;

		require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Node, options) {
			var game        = new Game(gameInfo[0]),
				octave		= defaultOctave || gameInfo[1][0];

			game.title			= title;
			game.startOctave	= octave;

			if(gameInfo[3]) {
				gameInfo[3].forEach(function (toneName) {
					game.setSharp(toneName);
				});
			}
			if(gameInfo[4]) {
				gameInfo[4].forEach(function (toneName) {
					game.setFlat(toneName);
				});
			}

			function findInObject(obj, id) {
				var valud;
				for(name in obj) {
					value = obj[name];
					if(value.id === id) {
						return value;
					}
				}
			}

			function createNote(id, octave, nodeName, isRemoveKey, isSlur) {
				return new Node(findInObject(options.nodes.types, id), options.tones.names[octave][nodeName], isRemoveKey === 1 ? true : false, isSlur === 1 ? true : false);
			}
			function createRest(id) {
				return new Node(findInObject(options.nodes.types.rest, id), options.tones.rest);
			}
			function applyTact(id, notes) {
				var tact    = new Tact(findInObject(options.tacts.types, id));

				notes.forEach(function (noteInfo) {
					if(!noteInfo[1]) {
						tact.addNode(createRest(noteInfo[0]));
					} else {
						tact.addNode(createNote(noteInfo[0], noteInfo[2] + octave, noteInfo[1], noteInfo[3], noteInfo[4]));
					}
				});

				game.addTact(tact);

				return;
			}

			gameInfo[2].forEach(function (tact) {
				applyTact(tact[0], tact[1]);
			});

			that.setGame(game);
		});
	};
	GameController.prototype.exportGame	= function () {
		var ex = [
			this.game.speed,
			[this.game.startOctave],
			[],
			[],
			[]
		];

		for(var toneName in this.game.sharps) {
			ex[3].push(toneName);
		}
		for(var toneName in this.game.flats) {
			ex[4].push(toneName);
		}

		this.game.tacts.forEach(function (tact) {
			var exTact = [
				tact.type.id,
				[]
			];
			tact.nodes.forEach(function (node) {
				var exNode  = [
					node.type.id,
					node.tone.name,
					node.tone.octav - ex[1][0],
					node.isRemoveKey ? 1 : 0,
					node.isSlur ? 1: 0
				];
				exTact[1].push(exNode);
			});
			ex[2].push(exTact);
		});

		return ex;
	};
	GameController.prototype.getTactX	= function (tact, callback) {
		var	gameController	= this,
			tacts			= gameController.game.tacts;

		require(['game/tact', 'game/options'], function (Tact, options) {
			var	i	= tact instanceof Tact ? tacts.indexOf(tact) : tact,
				x	= gameController.defWidth;

			x	-= options.markerPos;

			for(var j = 0; j < i; j += 1) {
				x	+= gameController.defWidth * tacts[j].length;
			}

			callback(x);
		});
	};
	GameController.prototype.getNoteX	= function (note, callback) {
		var	gameController	= this,
			tact			= note.tact;

		require(['game/note', 'game/options'], function (Note, options) {
			var	i	= tact.nodes.indexOf(note),
				x	= 0;

			for(var j = 0; j < i; j += 1) {
				x	+= gameController.defWidth * tact.nodes[j].length;
			}

			callback(x);
		});
	};
	GameController.prototype.moveToTact	= function (tact) {
		var	gameController	= this;

		if(tact === -1) {
			gameController.SVGNotes.animateAbs(0, -505, 0);
		} else {
			gameController.getTactX(tact, function (x) {
				gameController.SVGNotes.animateAbs(-x, -505, 0);
			});
		}
	};
	GameController.prototype.moveToNote	= function (note) {
		var	gameController	= this;

		gameController.getNoteX(note, function (noteX) {
			gameController.getTactX(note.tact, function (tactX) {
				gameController.SVGNotes.animateAbs(-(noteX + tactX), -505, 0);
			});
		});
	};
	GameController.prototype.isRunning	= function () {
		return this.game && this.game.running;
	};
	GameController.prototype.setPointerPos = function (pos) {
		this.svgPointer
			.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (pos / 2 + 3) - 0.85 * options.lineHeight * 0.5 + 1.5);
	};
	GameController.prototype.generatePercentColor	= function (colorPercent) {
		var	colorGreen	= 0,
			colorRed	= 0,
			colorBlue	= 0;

		if(colorPercent <= 0.15) {
			colorGreen	= Math.round(200 - 60 * colorPercent/0.15);
		} else if(colorPercent <= 0.95) {
			colorGreen	= Math.round(240 - 70 * (colorPercent - 0.15)/(0.95-0.15));
			colorRed	= Math.round(240 - 70 * (colorPercent - 0.15)/(0.95-0.15));
		} else {
			colorRed	= 170;
		}
		return 'rgb('+colorRed+', '+colorGreen+', '+colorBlue+')';
	};
	GameController.prototype.tactDone	= function () {
		if(this.currentTact) {
			this.currentTact.calculatePoints(this, L2P.funcs.tones.getStepFactor);

			this.point	+= this.currentTact.points;
			this.pointCon.text(this.point);
			this.showPointBox(this.currentTact.points, this.currentTact.stepFactor);
		}
	};
	GameController.prototype.currentLeft	= function () {
		var	gameController	= this,
			left			= -gameController.svgNotes.getBoundingClientRect().left + 45,
			useLeft			= left,
			timeRunning,
			factor;

		if(left === gameController.lastLeft && !gameController.paused) {
			timeRunning	= Date.now() - gameController.game.startTime;
			factor		= timeRunning / (gameController.game.getDuration() * 1000);
			//useLeft		= gameController.game.getWidth() * factor + 2;
		}
		gameController.lastLeft	= left;

		return useLeft;
	};
	GameController.prototype.soundInput = function (e, freq, tone, diff) {
		var	that			= this,
			gameController	= this,
			ratio;

		if(this.game && this.game.running) {
			var	newPos	= gameController.currentLeft();
			// console.log(newPos);

			this.game.tacts.forEach(function (tact) {
				if(tact.hasPlayed) {
					return;
				}
				tact.nodes.forEach(function (note) {
					var	relWidth		= (750 / 4) * (gameController.game.speed / 60) * 0.1,

						noteLeftPos		= note.svgElement.getX() - newPos + 20,
						noteLeftPosRel	= noteLeftPos + relWidth,

						noteRightPos	= noteLeftPos + note.type.length * that.defWidth,
						noteRightPosRel	= noteLeftPosRel + note.type.length * that.defWidth,

						currentPos		= options.markerPos + options.leftMargin + 10,
						relNotePosLeft	= currentPos - noteLeftPosRel,
						relNotePosRight	= noteRightPosRel - currentPos,

						otherNote;

					// Play the current note
					if(noteLeftPos <= currentPos && noteRightPos > currentPos) {
						if(!note.hasPlayed && gameController.playSound) {
							that.playNote(note);
						}
					}

					// Check the current note + the relative width
					if(noteLeftPosRel <= currentPos && noteRightPosRel > currentPos) {
						// We check weither we can use the note before or after
						var	noteIndex	= note.tact.nodes.indexOf(note),
							tactIndex,
							otherTact;

						if(relNotePosLeft < relWidth * 2) {
							if(noteIndex === 0) {
								tactIndex	= gameController.game.tacts.indexOf(note.tact);
								if(tactIndex > 0) {
									otherTact	= gameController.game.tacts[tactIndex - 1];
									otherNote	= otherTact.nodes[otherTact.nodes.length - 1];
								}
							} else {
								otherNote	= note.tact.nodes[noteIndex - 1];
							}
						} else if(relNotePosRight < relWidth * 2) {
							if(noteIndex === note.tact.nodes.length - 1) {
								tactIndex	= gameController.game.tacts.indexOf(note.tact);
								if(tactIndex < gameController.game.tacts.length - 1) {
									otherTact	= gameController.game.tacts[tactIndex + 1];
									otherNote	= otherTact.nodes[0];
								}
							} else {
								otherNote	= note.tact.nodes[noteIndex + 1];
							}
						}
						if(otherNote) {
							if(otherNote.isRest) {
								otherNote	= undefined;
							} else {
								if(otherNote.tone === tone) {
									note	= otherNote;
								}
							}
						}

						// If we got to a new note
						if(that.currentNote !== note) {
							if(!L2P_global.kiddie_mode && that.currentTact !== note.tact) {
								gameController.tactDone();
							}
							that.currentNote	= note;
							that.currentTact	= tact;
						}

						// Find the closest tone
						var	closeTone	= L2P.funcs.tones.getCloseTone(freq, tone, note.tone);
						freq		= closeTone.freq;
						tone		= closeTone.tone;
						toneDiff	= L2P.funcs.tones.freqDiffToTone(note.tone, freq, 0);

						// Update the compass
						if(that.compass) {
							that.compass.setTone(note.tone);
							that.compass.setFreq(freq);
						}

						// If we have kiddiemode enabled, we check for the correct tone
						if(L2P_global.kiddie_mode) {
							if(!note.isRest && (toneDiff.ratioRel > 0.15 || freq === -1) && !note.kiddieModeAccepted) {
								if(!gameController.paused) {
									gameController.pauseGame();
								}
								return;
							} else if(gameController.paused) {
								gameController.runGame();
							}
							note.kiddieModeAccepted	= true;
						}

						// Add the tick
						if(!note.isRest) {
							note.ticks.push(new Tick(freq, toneDiff));
						}

						var	colorPercent	= note.isRest ? 0 : Math.min(toneDiff.ratioRel, 1),
							color			= that.generatePercentColor(colorPercent);

						if(!L2P_global.blind_mode) {
							that.svgPointer.setFill(color);
							that.svgLine.setStroke(color, 3);
						}
					}
				});
			});
		} else {
			this.compass.setTone(tone);
			this.compass.setFreq(freq);
		}

		if(tone) {
			var	pos	= options.tones.all.indexOf(tone);
			if(pos === -1) {
				return;
			}
			if(diff > 0) {
				var	toneAbove	= options.tones.all[pos + 1],
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				if(toneDiffs === 0) {
					toneAbove	= options.tones.all[pos + 2];
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				}
				var	ratio		= diff / toneDiffs;
			} else {
				var	toneAbove	= options.tones.all[pos - 1],
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				if(toneDiffs === 0) {
					toneAbove	= options.tones.all[pos - 2];
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				}
				var	ratio		= diff / toneDiffs;
			}

			that.setPointerPos(tone.pos - ratio);
		}
	};
	GameController.prototype.expectedTone	= function () {
		return this.currentNote && this.currentNote.tone;
	};
	GameController.prototype.generateGameData	= function () {
		var	data	= [
			1.1,					// 0	_v
			this.game.speed,		// 1	speed
			[],						// 2	tacts
			this.point,				// 3	points
			[						// 4	time
				this.game.startTime,						// 0	start
				this.game.stopTime -this.game.startTime,	// 1	stop
				this.game.getDuration()						// 2	game duration
			],
			this.permlink,			// 5	permlink
			this.game.startOctave,	// 6	startOctave
			this.fingerpos			// 7	fingerpos
		];

		this.game.tacts.forEach(function (tact) {
			var	tactData	= [
				[]		// notes
			];
			tact.nodes.forEach(function (note) {
				var	noteData	= [
					[],					// 0	ticks
					note.stepFactor,	// 1	stepFactor
					note.points,		// 2	points
					note.tone.name,		// 3	toneName
					note.tone.octav		// 4	toneOctav
				];
				note.ticks.forEach(function (tick) {
					var	tickData	= [
						tick.percent,			// 0	percent
						+tick.freq.toFixed(2),	// 1	freq
						tick.time - data[4][0]	// 2	time
					];
					noteData[0].push(tickData);
				});
				tactData[0].push(noteData);
			});

			data[2].push(JSON.stringify(tactData));
		});

		return JSON.stringify(data);
	};
	GameController.prototype.gameDone	= function () {
		if(!L2P_global.kiddie_mode && this.currentTact) {
			this.tactDone();
		}

		this.stopGame();

		if(L2P_global.kiddie_mode) {
			return;
		}
		var	data	= this.generateGameData(),
			that	= this;
		$.post('/api/save.game.php', {
			data:	data
		}, function (gameInfo) {
			that.$this.trigger('gameEnd', {
				game_history_id:	gameInfo.game_history_id
			});
		});
	};

	return GameController;
});
define('game/sound',['game/options', 'fM'], function (options, fM) {
	var	Sound	= function () {
		var	sound		= this;
		this.waitTime	= options.waitTime;

		this.playAfterTimeout	= false;
		this.gain				= 2;

		if(fM.audioContext) {
			this.ctx    	= new window[fM.audioContext]();
			this.oscillator	= this.ctx.createOscillator();
			this.gainNode	= this.ctx.createGainNode();
			this.gainNode.gain.value		= 0;

			this.oscillator.connect(this.gainNode);
			this.gainNode.connect(this.ctx.destination);

			this.oscillator.start(0);
		}
	}
	Sound.prototype.play = function (freq, isSlur) {
		if(!fM.audioContext) {
			return;
		}
		var sound    = this;

		if(!isSlur) {
			this.clearSound();
		}

		this.playAfterTimeout	= true;
		setTimeout(function () {
			if(sound.playAfterTimeout) {
				sound.gainNode.gain.setValueAtTime(sound.gain, 0);
				sound.oscillator.frequency.setValueAtTime(freq, 0);
			}
		}, this.waitTime);
	};
	Sound.prototype.playRest = function () {
		if(!fM.audioContext) {
			return;
		}
		setTimeout(this.clearSound.bind(this), this.waitTime);
	};
	Sound.prototype.clearSound = function () {
		if(!fM.audioContext) {
			return;
		}
		this.playAfterTimeout		= false;
		this.gainNode.gain.setValueAtTime(0, 0);
	};

	return Sound;
});
/*
 *  DSP.js - a comprehensive digital signal processing  library for javascript
 *
 *  Created by Corban Brook <corbanbrook@gmail.com> on 2010-01-01.
 *  Copyright 2010 Corban Brook. All rights reserved.
 *
 */

////////////////////////////////////////////////////////////////////////////////
//                                  CONSTANTS                                 //
////////////////////////////////////////////////////////////////////////////////

/**
 * DSP is an object which contains general purpose utility functions and constants
 */
define('dsp',[],function () {
	var DSP = {
	  // Channels
	  LEFT:           0,
	  RIGHT:          1,
	  MIX:            2,

	  // Waveforms
	  SINE:           1,
	  TRIANGLE:       2,
	  SAW:            3,
	  SQUARE:         4,

	  // Filters
	  LOWPASS:        0,
	  HIGHPASS:       1,
	  BANDPASS:       2,
	  NOTCH:          3,

	  // Window functions
	  BARTLETT:       1,
	  BARTLETTHANN:   2,
	  BLACKMAN:       3,
	  COSINE:         4,
	  GAUSS:          5,
	  HAMMING:        6,
	  HANN:           7,
	  LANCZOS:        8,
	  RECTANGULAR:    9,
	  TRIANGULAR:     10,

	  // Loop modes
	  OFF:            0,
	  FW:             1,
	  BW:             2,
	  FWBW:           3,

	  // Math
	  TWO_PI:         2*Math.PI
	};

	// Setup arrays for platforms which do not support byte arrays
	function setupTypedArray(name, fallback) {
	  // check if TypedArray exists
	  // typeof on Minefield and Chrome return function, typeof on Webkit returns object.
	  if (typeof this[name] !== "function" && typeof this[name] !== "object") {
		// nope.. check if WebGLArray exists
		if (typeof this[fallback] === "function" && typeof this[fallback] !== "object") {
		  this[name] = this[fallback];
		} else {
		  // nope.. set as Native JS array
		  this[name] = function(obj) {
			if (obj instanceof Array) {
			  return obj;
			} else if (typeof obj === "number") {
			  return new Array(obj);
			}
		  };
		}
	  }
	}

	setupTypedArray("Float32Array", "WebGLFloatArray");
	setupTypedArray("Int32Array",   "WebGLIntArray");
	setupTypedArray("Uint16Array",  "WebGLUnsignedShortArray");
	setupTypedArray("Uint8Array",   "WebGLUnsignedByteArray");


	////////////////////////////////////////////////////////////////////////////////
	//                            DSP UTILITY FUNCTIONS                           //
	////////////////////////////////////////////////////////////////////////////////

	/**
	 * Inverts the phase of a signal
	 *
	 * @param {Array} buffer A sample buffer
	 *
	 * @returns The inverted sample buffer
	 */
	DSP.invert = function(buffer) {
	  for (var i = 0, len = buffer.length; i < len; i++) {
		buffer[i] *= -1;
	  }

	  return buffer;
	};

	/**
	 * Converts split-stereo (dual mono) sample buffers into a stereo interleaved sample buffer
	 *
	 * @param {Array} left  A sample buffer
	 * @param {Array} right A sample buffer
	 *
	 * @returns The stereo interleaved buffer
	 */
	DSP.interleave = function(left, right) {
	  if (left.length !== right.length) {
		throw "Can not interleave. Channel lengths differ.";
	  }

	  var stereoInterleaved = new Float32Array(left.length * 2);

	  for (var i = 0, len = left.length; i < len; i++) {
		stereoInterleaved[2*i]   = left[i];
		stereoInterleaved[2*i+1] = right[i];
	  }

	  return stereoInterleaved;
	};

	/**
	 * Converts a stereo-interleaved sample buffer into split-stereo (dual mono) sample buffers
	 *
	 * @param {Array} buffer A stereo-interleaved sample buffer
	 *
	 * @returns an Array containing left and right channels
	 */
	DSP.deinterleave = (function() {
	  var left, right, mix, deinterleaveChannel = [];

	  deinterleaveChannel[DSP.MIX] = function(buffer) {
		for (var i = 0, len = buffer.length/2; i < len; i++) {
		  mix[i] = (buffer[2*i] + buffer[2*i+1]) / 2;
		}
		return mix;
	  };

	  deinterleaveChannel[DSP.LEFT] = function(buffer) {
		for (var i = 0, len = buffer.length/2; i < len; i++) {
		  left[i]  = buffer[2*i];
		}
		return left;
	  };

	  deinterleaveChannel[DSP.RIGHT] = function(buffer) {
		for (var i = 0, len = buffer.length/2; i < len; i++) {
		  right[i]  = buffer[2*i+1];
		}
		return right;
	  };

	  return function(channel, buffer) {
		left  = left  || new Float32Array(buffer.length/2);
		right = right || new Float32Array(buffer.length/2);
		mix   = mix   || new Float32Array(buffer.length/2);

		if (buffer.length/2 !== left.length) {
		  left  = new Float32Array(buffer.length/2);
		  right = new Float32Array(buffer.length/2);
		  mix   = new Float32Array(buffer.length/2);
		}

		return deinterleaveChannel[channel](buffer);
	  };
	}());

	/**
	 * Separates a channel from a stereo-interleaved sample buffer
	 *
	 * @param {Array}  buffer A stereo-interleaved sample buffer
	 * @param {Number} channel A channel constant (LEFT, RIGHT, MIX)
	 *
	 * @returns an Array containing a signal mono sample buffer
	 */
	DSP.getChannel = DSP.deinterleave;

	/**
	 * Helper method (for Reverb) to mix two (interleaved) samplebuffers. It's possible
	 * to negate the second buffer while mixing and to perform a volume correction
	 * on the final signal.
	 *
	 * @param {Array} sampleBuffer1 Array containing Float values or a Float32Array
	 * @param {Array} sampleBuffer2 Array containing Float values or a Float32Array
	 * @param {Boolean} negate When true inverts/flips the audio signal
	 * @param {Number} volumeCorrection When you add multiple sample buffers, use this to tame your signal ;)
	 *
	 * @returns A new Float32Array interleaved buffer.
	 */
	DSP.mixSampleBuffers = function(sampleBuffer1, sampleBuffer2, negate, volumeCorrection){
	  var outputSamples = new Float32Array(sampleBuffer1);

	  for(var i = 0; i<sampleBuffer1.length; i++){
		outputSamples[i] += (negate ? -sampleBuffer2[i] : sampleBuffer2[i]) / volumeCorrection;
	  }

	  return outputSamples;
	};

	// Biquad filter types
	DSP.LPF = 0;                // H(s) = 1 / (s^2 + s/Q + 1)
	DSP.HPF = 1;                // H(s) = s^2 / (s^2 + s/Q + 1)
	DSP.BPF_CONSTANT_SKIRT = 2; // H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
	DSP.BPF_CONSTANT_PEAK = 3;  // H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
	DSP.NOTCH = 4;              // H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
	DSP.APF = 5;                // H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
	DSP.PEAKING_EQ = 6;         // H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
	DSP.LOW_SHELF = 7;          // H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
	DSP.HIGH_SHELF = 8;         // H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)

	// Biquad filter parameter types
	DSP.Q = 1;
	DSP.BW = 2; // SHARED with BACKWARDS LOOP MODE
	DSP.S = 3;

	// Find RMS of signal
	DSP.RMS = function(buffer) {
	  var total = 0;

	  for (var i = 0, n = buffer.length; i < n; i++) {
		total += buffer[i] * buffer[i];
	  }

	  return Math.sqrt(total / n);
	};

	// Find Peak of signal
	DSP.Peak = function(buffer) {
	  var peak = 0;

	  for (var i = 0, n = buffer.length; i < n; i++) {
		peak = (Math.abs(buffer[i]) > peak) ? Math.abs(buffer[i]) : peak;
	  }

	  return peak;
	};

	// Fourier Transform Module used by DFT, FFT, RFFT
	function FourierTransform(bufferSize, sampleRate) {
	  this.bufferSize = bufferSize;
	  this.sampleRate = sampleRate;
	  this.bandwidth  = 2 / bufferSize * sampleRate / 2;

	  this.spectrum   = new Float32Array(bufferSize/2);
	  this.real       = new Float32Array(bufferSize);
	  this.imag       = new Float32Array(bufferSize);

	  this.peakBand   = 0;
	  this.peak       = 0;

	  /**
	   * Calculates the *middle* frequency of an FFT band.
	   *
	   * @param {Number} index The index of the FFT band.
	   *
	   * @returns The middle frequency in Hz.
	   */
	  this.getBandFrequency = function(index) {
		return this.bandwidth * index + this.bandwidth / 2;
	  };

	  this.calculateSpectrum = function() {
		var spectrum  = this.spectrum,
			real      = this.real,
			imag      = this.imag,
			bSi       = 2 / this.bufferSize,
			sqrt      = Math.sqrt,
			rval,
			ival,
			mag;

		for (var i = 0, N = bufferSize/2; i < N; i++) {
		  rval = real[i];
		  ival = imag[i];
		  mag = bSi * sqrt(rval * rval + ival * ival);

		  if (mag > this.peak) {
			this.peakBand = i;
			this.peak = mag;
		  }

		  spectrum[i] = mag;
		}
	  };
	}

	/**
	 * DFT is a class for calculating the Discrete Fourier Transform of a signal.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */
	function DFT(bufferSize, sampleRate) {
	  FourierTransform.call(this, bufferSize, sampleRate);

	  var N = bufferSize/2 * bufferSize;
	  var TWO_PI = 2 * Math.PI;

	  this.sinTable = new Float32Array(N);
	  this.cosTable = new Float32Array(N);

	  for (var i = 0; i < N; i++) {
		this.sinTable[i] = Math.sin(i * TWO_PI / bufferSize);
		this.cosTable[i] = Math.cos(i * TWO_PI / bufferSize);
	  }
	}

	/**
	 * Performs a forward transform on the sample buffer.
	 * Converts a time domain signal to frequency domain spectra.
	 *
	 * @param {Array} buffer The sample buffer
	 *
	 * @returns The frequency spectrum array
	 */
	DFT.prototype.forward = function(buffer) {
	  var real = this.real,
		  imag = this.imag,
		  rval,
		  ival;

	  for (var k = 0; k < this.bufferSize/2; k++) {
		rval = 0.0;
		ival = 0.0;

		for (var n = 0; n < buffer.length; n++) {
		  rval += this.cosTable[k*n] * buffer[n];
		  ival += this.sinTable[k*n] * buffer[n];
		}

		real[k] = rval;
		imag[k] = ival;
	  }

	  return this.calculateSpectrum();
	};


	/**
	 * FFT is a class for calculating the Discrete Fourier Transform of a signal
	 * with the Fast Fourier Transform algorithm.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed. Must be power of 2
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */
	function FFT(bufferSize, sampleRate) {
	  FourierTransform.call(this, bufferSize, sampleRate);

	  this.reverseTable = new Uint32Array(bufferSize);

	  var limit = 1;
	  var bit = bufferSize >> 1;

	  var i;

	  while (limit < bufferSize) {
		for (i = 0; i < limit; i++) {
		  this.reverseTable[i + limit] = this.reverseTable[i] + bit;
		}

		limit = limit << 1;
		bit = bit >> 1;
	  }

	  this.sinTable = new Float32Array(bufferSize);
	  this.cosTable = new Float32Array(bufferSize);

	  for (i = 0; i < bufferSize; i++) {
		this.sinTable[i] = Math.sin(-Math.PI/i);
		this.cosTable[i] = Math.cos(-Math.PI/i);
	  }
	}

	/**
	 * Performs a forward transform on the sample buffer.
	 * Converts a time domain signal to frequency domain spectra.
	 *
	 * @param {Array} buffer The sample buffer. Buffer Length must be power of 2
	 *
	 * @returns The frequency spectrum array
	 */
	FFT.prototype.forward = function(buffer) {
	  // Locally scope variables for speed up
	  var bufferSize      = this.bufferSize,
		  cosTable        = this.cosTable,
		  sinTable        = this.sinTable,
		  reverseTable    = this.reverseTable,
		  real            = this.real,
		  imag            = this.imag,
		  spectrum        = this.spectrum;

	  var k = Math.floor(Math.log(bufferSize) / Math.LN2);

	  if (Math.pow(2, k) !== bufferSize) { throw "Invalid buffer size, must be a power of 2."; }
	  if (bufferSize !== buffer.length)  { throw "Supplied buffer is not the same size as defined FFT. FFT Size: " + bufferSize + " Buffer Size: " + buffer.length; }

	  var halfSize = 1,
		  phaseShiftStepReal,
		  phaseShiftStepImag,
		  currentPhaseShiftReal,
		  currentPhaseShiftImag,
		  off,
		  tr,
		  ti,
		  tmpReal,
		  i;

	  for (i = 0; i < bufferSize; i++) {
		real[i] = buffer[reverseTable[i]];
		imag[i] = 0;
	  }

	  while (halfSize < bufferSize) {
		//phaseShiftStepReal = Math.cos(-Math.PI/halfSize);
		//phaseShiftStepImag = Math.sin(-Math.PI/halfSize);
		phaseShiftStepReal = cosTable[halfSize];
		phaseShiftStepImag = sinTable[halfSize];

		currentPhaseShiftReal = 1;
		currentPhaseShiftImag = 0;

		for (var fftStep = 0; fftStep < halfSize; fftStep++) {
		  i = fftStep;

		  while (i < bufferSize) {
			off = i + halfSize;
			tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
			ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

			real[off] = real[i] - tr;
			imag[off] = imag[i] - ti;
			real[i] += tr;
			imag[i] += ti;

			i += halfSize << 1;
		  }

		  tmpReal = currentPhaseShiftReal;
		  currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
		  currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
		}

		halfSize = halfSize << 1;
	  }

	  return this.calculateSpectrum();
	};

	FFT.prototype.inverse = function(real, imag) {
	  // Locally scope variables for speed up
	  var bufferSize      = this.bufferSize,
		  cosTable        = this.cosTable,
		  sinTable        = this.sinTable,
		  reverseTable    = this.reverseTable,
		  spectrum        = this.spectrum;

		  real = real || this.real;
		  imag = imag || this.imag;

	  var halfSize = 1,
		  phaseShiftStepReal,
		  phaseShiftStepImag,
		  currentPhaseShiftReal,
		  currentPhaseShiftImag,
		  off,
		  tr,
		  ti,
		  tmpReal,
		  i;

	  for (i = 0; i < bufferSize; i++) {
		imag[i] *= -1;
	  }

	  var revReal = new Float32Array(bufferSize);
	  var revImag = new Float32Array(bufferSize);

	  for (i = 0; i < real.length; i++) {
		revReal[i] = real[reverseTable[i]];
		revImag[i] = imag[reverseTable[i]];
	  }

	  real = revReal;
	  imag = revImag;

	  while (halfSize < bufferSize) {
		phaseShiftStepReal = cosTable[halfSize];
		phaseShiftStepImag = sinTable[halfSize];
		currentPhaseShiftReal = 1;
		currentPhaseShiftImag = 0;

		for (var fftStep = 0; fftStep < halfSize; fftStep++) {
		  i = fftStep;

		  while (i < bufferSize) {
			off = i + halfSize;
			tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
			ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

			real[off] = real[i] - tr;
			imag[off] = imag[i] - ti;
			real[i] += tr;
			imag[i] += ti;

			i += halfSize << 1;
		  }

		  tmpReal = currentPhaseShiftReal;
		  currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
		  currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
		}

		halfSize = halfSize << 1;
	  }

	  var buffer = new Float32Array(bufferSize); // this should be reused instead
	  for (i = 0; i < bufferSize; i++) {
		buffer[i] = real[i] / bufferSize;
	  }

	  return buffer;
	};

	/**
	 * RFFT is a class for calculating the Discrete Fourier Transform of a signal
	 * with the Fast Fourier Transform algorithm.
	 *
	 * This method currently only contains a forward transform but is highly optimized.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed. Must be power of 2
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */

	// lookup tables don't really gain us any speed, but they do increase
	// cache footprint, so don't use them in here

	// also we don't use sepearate arrays for real/imaginary parts

	// this one a little more than twice as fast as the one in FFT
	// however I only did the forward transform

	// the rest of this was translated from C, see http://www.jjj.de/fxt/
	// this is the real split radix FFT

	function RFFT(bufferSize, sampleRate) {
	  FourierTransform.call(this, bufferSize, sampleRate);

	  this.trans = new Float32Array(bufferSize);

	  this.reverseTable = new Uint32Array(bufferSize);

	  // don't use a lookup table to do the permute, use this instead
	  this.reverseBinPermute = function (dest, source) {
		var bufferSize  = this.bufferSize,
			halfSize    = bufferSize >>> 1,
			nm1         = bufferSize - 1,
			i = 1, r = 0, h;

		dest[0] = source[0];

		do {
		  r += halfSize;
		  dest[i] = source[r];
		  dest[r] = source[i];

		  i++;

		  h = halfSize << 1;
		  while (h = h >> 1, !((r ^= h) & h));

		  if (r >= i) {
			dest[i]     = source[r];
			dest[r]     = source[i];

			dest[nm1-i] = source[nm1-r];
			dest[nm1-r] = source[nm1-i];
		  }
		  i++;
		} while (i < halfSize);
		dest[nm1] = source[nm1];
	  };

	  this.generateReverseTable = function () {
		var bufferSize  = this.bufferSize,
			halfSize    = bufferSize >>> 1,
			nm1         = bufferSize - 1,
			i = 1, r = 0, h;

		this.reverseTable[0] = 0;

		do {
		  r += halfSize;

		  this.reverseTable[i] = r;
		  this.reverseTable[r] = i;

		  i++;

		  h = halfSize << 1;
		  while (h = h >> 1, !((r ^= h) & h));

		  if (r >= i) {
			this.reverseTable[i] = r;
			this.reverseTable[r] = i;

			this.reverseTable[nm1-i] = nm1-r;
			this.reverseTable[nm1-r] = nm1-i;
		  }
		  i++;
		} while (i < halfSize);

		this.reverseTable[nm1] = nm1;
	  };

	  this.generateReverseTable();
	}


	// Ordering of output:
	//
	// trans[0]     = re[0] (==zero frequency, purely real)
	// trans[1]     = re[1]
	//             ...
	// trans[n/2-1] = re[n/2-1]
	// trans[n/2]   = re[n/2]    (==nyquist frequency, purely real)
	//
	// trans[n/2+1] = im[n/2-1]
	// trans[n/2+2] = im[n/2-2]
	//             ...
	// trans[n-1]   = im[1]

	RFFT.prototype.forward = function(buffer) {
	  var n         = this.bufferSize,
		  spectrum  = this.spectrum,
		  x         = this.trans,
		  TWO_PI    = 2*Math.PI,
		  sqrt      = Math.sqrt,
		  i         = n >>> 1,
		  bSi       = 2 / n,
		  n2, n4, n8, nn,
		  t1, t2, t3, t4,
		  i1, i2, i3, i4, i5, i6, i7, i8,
		  st1, cc1, ss1, cc3, ss3,
		  e,
		  a,
		  rval, ival, mag;

	  this.reverseBinPermute(x, buffer);

	  /*
	  var reverseTable = this.reverseTable;

	  for (var k = 0, len = reverseTable.length; k < len; k++) {
		x[k] = buffer[reverseTable[k]];
	  }
	  */

	  for (var ix = 0, id = 4; ix < n; id *= 4) {
		for (var i0 = ix; i0 < n; i0 += id) {
		  //sumdiff(x[i0], x[i0+1]); // {a, b}  <--| {a+b, a-b}
		  st1 = x[i0] - x[i0+1];
		  x[i0] += x[i0+1];
		  x[i0+1] = st1;
		}
		ix = 2*(id-1);
	  }

	  n2 = 2;
	  nn = n >>> 1;

	  while((nn = nn >>> 1)) {
		ix = 0;
		n2 = n2 << 1;
		id = n2 << 1;
		n4 = n2 >>> 2;
		n8 = n2 >>> 3;
		do {
		  if(n4 !== 1) {
			for(i0 = ix; i0 < n; i0 += id) {
			  i1 = i0;
			  i2 = i1 + n4;
			  i3 = i2 + n4;
			  i4 = i3 + n4;

			  //diffsum3_r(x[i3], x[i4], t1); // {a, b, s} <--| {a, b-a, a+b}
			  t1 = x[i3] + x[i4];
			  x[i4] -= x[i3];
			  //sumdiff3(x[i1], t1, x[i3]);   // {a, b, d} <--| {a+b, b, a-b}
			  x[i3] = x[i1] - t1;
			  x[i1] += t1;

			  i1 += n8;
			  i2 += n8;
			  i3 += n8;
			  i4 += n8;

			  //sumdiff(x[i3], x[i4], t1, t2); // {s, d}  <--| {a+b, a-b}
			  t1 = x[i3] + x[i4];
			  t2 = x[i3] - x[i4];

			  t1 = -t1 * Math.SQRT1_2;
			  t2 *= Math.SQRT1_2;

			  // sumdiff(t1, x[i2], x[i4], x[i3]); // {s, d}  <--| {a+b, a-b}
			  st1 = x[i2];
			  x[i4] = t1 + st1;
			  x[i3] = t1 - st1;

			  //sumdiff3(x[i1], t2, x[i2]); // {a, b, d} <--| {a+b, b, a-b}
			  x[i2] = x[i1] - t2;
			  x[i1] += t2;
			}
		  } else {
			for(i0 = ix; i0 < n; i0 += id) {
			  i1 = i0;
			  i2 = i1 + n4;
			  i3 = i2 + n4;
			  i4 = i3 + n4;

			  //diffsum3_r(x[i3], x[i4], t1); // {a, b, s} <--| {a, b-a, a+b}
			  t1 = x[i3] + x[i4];
			  x[i4] -= x[i3];

			  //sumdiff3(x[i1], t1, x[i3]);   // {a, b, d} <--| {a+b, b, a-b}
			  x[i3] = x[i1] - t1;
			  x[i1] += t1;
			}
		  }

		  ix = (id << 1) - n2;
		  id = id << 2;
		} while (ix < n);

		e = TWO_PI / n2;

		for (var j = 1; j < n8; j++) {
		  a = j * e;
		  ss1 = Math.sin(a);
		  cc1 = Math.cos(a);

		  //ss3 = sin(3*a); cc3 = cos(3*a);
		  cc3 = 4*cc1*(cc1*cc1-0.75);
		  ss3 = 4*ss1*(0.75-ss1*ss1);

		  ix = 0; id = n2 << 1;
		  do {
			for (i0 = ix; i0 < n; i0 += id) {
			  i1 = i0 + j;
			  i2 = i1 + n4;
			  i3 = i2 + n4;
			  i4 = i3 + n4;

			  i5 = i0 + n4 - j;
			  i6 = i5 + n4;
			  i7 = i6 + n4;
			  i8 = i7 + n4;

			  //cmult(c, s, x, y, &u, &v)
			  //cmult(cc1, ss1, x[i7], x[i3], t2, t1); // {u,v} <--| {x*c-y*s, x*s+y*c}
			  t2 = x[i7]*cc1 - x[i3]*ss1;
			  t1 = x[i7]*ss1 + x[i3]*cc1;

			  //cmult(cc3, ss3, x[i8], x[i4], t4, t3);
			  t4 = x[i8]*cc3 - x[i4]*ss3;
			  t3 = x[i8]*ss3 + x[i4]*cc3;

			  //sumdiff(t2, t4);   // {a, b} <--| {a+b, a-b}
			  st1 = t2 - t4;
			  t2 += t4;
			  t4 = st1;

			  //sumdiff(t2, x[i6], x[i8], x[i3]); // {s, d}  <--| {a+b, a-b}
			  //st1 = x[i6]; x[i8] = t2 + st1; x[i3] = t2 - st1;
			  x[i8] = t2 + x[i6];
			  x[i3] = t2 - x[i6];

			  //sumdiff_r(t1, t3); // {a, b} <--| {a+b, b-a}
			  st1 = t3 - t1;
			  t1 += t3;
			  t3 = st1;

			  //sumdiff(t3, x[i2], x[i4], x[i7]); // {s, d}  <--| {a+b, a-b}
			  //st1 = x[i2]; x[i4] = t3 + st1; x[i7] = t3 - st1;
			  x[i4] = t3 + x[i2];
			  x[i7] = t3 - x[i2];

			  //sumdiff3(x[i1], t1, x[i6]);   // {a, b, d} <--| {a+b, b, a-b}
			  x[i6] = x[i1] - t1;
			  x[i1] += t1;

			  //diffsum3_r(t4, x[i5], x[i2]); // {a, b, s} <--| {a, b-a, a+b}
			  x[i2] = t4 + x[i5];
			  x[i5] -= t4;
			}

			ix = (id << 1) - n2;
			id = id << 2;

		  } while (ix < n);
		}
	  }

	  while (--i) {
		rval = x[i];
		ival = x[n-i-1];
		mag = bSi * sqrt(rval * rval + ival * ival);

		if (mag > this.peak) {
		  this.peakBand = i;
		  this.peak = mag;
		}

		spectrum[i] = mag;
	  }

	  spectrum[0] = bSi * x[0];

	  return spectrum;
	};

	function Sampler(file, bufferSize, sampleRate, playStart, playEnd, loopStart, loopEnd, loopMode) {
	  this.file = file;
	  this.bufferSize = bufferSize;
	  this.sampleRate = sampleRate;
	  this.playStart  = playStart || 0; // 0%
	  this.playEnd    = playEnd   || 1; // 100%
	  this.loopStart  = loopStart || 0;
	  this.loopEnd    = loopEnd   || 1;
	  this.loopMode   = loopMode  || DSP.OFF;
	  this.loaded     = false;
	  this.samples    = [];
	  this.signal     = new Float32Array(bufferSize);
	  this.frameCount = 0;
	  this.envelope   = null;
	  this.amplitude  = 1;
	  this.rootFrequency = 110; // A2 110
	  this.frequency  = 550;
	  this.step       = this.frequency / this.rootFrequency;
	  this.duration   = 0;
	  this.samplesProcessed = 0;
	  this.playhead   = 0;

	  var audio = /* new Audio();*/ document.createElement("AUDIO");
	  var self = this;

	  this.loadSamples = function(event) {
		var buffer = DSP.getChannel(DSP.MIX, event.frameBuffer);
		for ( var i = 0; i < buffer.length; i++) {
		  self.samples.push(buffer[i]);
		}
	  };

	  this.loadComplete = function() {
		// convert flexible js array into a fast typed array
		self.samples = new Float32Array(self.samples);
		self.loaded = true;
	  };

	  this.loadMetaData = function() {
		self.duration = audio.duration;
	  };

	  audio.addEventListener("MozAudioAvailable", this.loadSamples, false);
	  audio.addEventListener("loadedmetadata", this.loadMetaData, false);
	  audio.addEventListener("ended", this.loadComplete, false);
	  audio.muted = true;
	  audio.src = file;
	  audio.play();
	}

	Sampler.prototype.applyEnvelope = function() {
	  this.envelope.process(this.signal);
	  return this.signal;
	};

	Sampler.prototype.generate = function() {
	  var frameOffset = this.frameCount * this.bufferSize;

	  var loopWidth = this.playEnd * this.samples.length - this.playStart * this.samples.length;
	  var playStartSamples = this.playStart * this.samples.length; // ie 0.5 -> 50% of the length
	  var playEndSamples = this.playEnd * this.samples.length; // ie 0.5 -> 50% of the length
	  var offset;

	  for ( var i = 0; i < this.bufferSize; i++ ) {
		switch (this.loopMode) {
		  case DSP.OFF:
			this.playhead = Math.round(this.samplesProcessed * this.step + playStartSamples);
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			} else {
			  this.signal[i] = 0;
			}
			break;

		  case DSP.FW:
			this.playhead = Math.round((this.samplesProcessed * this.step) % loopWidth + playStartSamples);
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			}
			break;

		  case DSP.BW:
			this.playhead = playEndSamples - Math.round((this.samplesProcessed * this.step) % loopWidth);
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			}
			break;

		  case DSP.FWBW:
			if ( Math.floor(this.samplesProcessed * this.step / loopWidth) % 2 === 0 ) {
			  this.playhead = Math.round((this.samplesProcessed * this.step) % loopWidth + playStartSamples);
			} else {
			  this.playhead = playEndSamples - Math.round((this.samplesProcessed * this.step) % loopWidth);
			}
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			}
			break;
		}
		this.samplesProcessed++;
	  }

	  this.frameCount++;

	  return this.signal;
	};

	Sampler.prototype.setFreq = function(frequency) {
		var totalProcessed = this.samplesProcessed * this.step;
		this.frequency = frequency;
		this.step = this.frequency / this.rootFrequency;
		this.samplesProcessed = Math.round(totalProcessed/this.step);
	};

	Sampler.prototype.reset = function() {
	  this.samplesProcessed = 0;
	  this.playhead = 0;
	};

	/**
	 * Oscillator class for generating and modifying signals
	 *
	 * @param {Number} type       A waveform constant (eg. DSP.SINE)
	 * @param {Number} frequency  Initial frequency of the signal
	 * @param {Number} amplitude  Initial amplitude of the signal
	 * @param {Number} bufferSize Size of the sample buffer to generate
	 * @param {Number} sampleRate The sample rate of the signal
	 *
	 * @contructor
	 */
	function Oscillator(type, frequency, amplitude, bufferSize, sampleRate) {
	  this.frequency  = frequency;
	  this.amplitude  = amplitude;
	  this.bufferSize = bufferSize;
	  this.sampleRate = sampleRate;
	  //this.pulseWidth = pulseWidth;
	  this.frameCount = 0;

	  this.waveTableLength = 2048;

	  this.cyclesPerSample = frequency / sampleRate;

	  this.signal = new Float32Array(bufferSize);
	  this.envelope = null;

	  switch(parseInt(type, 10)) {
		case DSP.TRIANGLE:
		  this.func = Oscillator.Triangle;
		  break;

		case DSP.SAW:
		  this.func = Oscillator.Saw;
		  break;

		case DSP.SQUARE:
		  this.func = Oscillator.Square;
		  break;

		default:
		case DSP.SINE:
		  this.func = Oscillator.Sine;
		  break;
	  }

	  this.generateWaveTable = function() {
		Oscillator.waveTable[this.func] = new Float32Array(2048);
		var waveTableTime = this.waveTableLength / this.sampleRate;
		var waveTableHz = 1 / waveTableTime;

		for (var i = 0; i < this.waveTableLength; i++) {
		  Oscillator.waveTable[this.func][i] = this.func(i * waveTableHz/this.sampleRate);
		}
	  };

	  if ( typeof Oscillator.waveTable === 'undefined' ) {
		Oscillator.waveTable = {};
	  }

	  if ( typeof Oscillator.waveTable[this.func] === 'undefined' ) {
		this.generateWaveTable();
	  }

	  this.waveTable = Oscillator.waveTable[this.func];
	}

	/**
	 * Set the amplitude of the signal
	 *
	 * @param {Number} amplitude The amplitude of the signal (between 0 and 1)
	 */
	Oscillator.prototype.setAmp = function(amplitude) {
	  if (amplitude >= 0 && amplitude <= 1) {
		this.amplitude = amplitude;
	  } else {
		throw "Amplitude out of range (0..1).";
	  }
	};

	/**
	 * Set the frequency of the signal
	 *
	 * @param {Number} frequency The frequency of the signal
	 */
	Oscillator.prototype.setFreq = function(frequency) {
	  this.frequency = frequency;
	  this.cyclesPerSample = frequency / this.sampleRate;
	};

	// Add an oscillator
	Oscillator.prototype.add = function(oscillator) {
	  for ( var i = 0; i < this.bufferSize; i++ ) {
		//this.signal[i] += oscillator.valueAt(i);
		this.signal[i] += oscillator.signal[i];
	  }

	  return this.signal;
	};

	// Add a signal to the current generated osc signal
	Oscillator.prototype.addSignal = function(signal) {
	  for ( var i = 0; i < signal.length; i++ ) {
		if ( i >= this.bufferSize ) {
		  break;
		}
		this.signal[i] += signal[i];

		/*
		// Constrain amplitude
		if ( this.signal[i] > 1 ) {
		  this.signal[i] = 1;
		} else if ( this.signal[i] < -1 ) {
		  this.signal[i] = -1;
		}
		*/
	  }
	  return this.signal;
	};

	// Add an envelope to the oscillator
	Oscillator.prototype.addEnvelope = function(envelope) {
	  this.envelope = envelope;
	};

	Oscillator.prototype.applyEnvelope = function() {
	  this.envelope.process(this.signal);
	};

	Oscillator.prototype.valueAt = function(offset) {
	  return this.waveTable[offset % this.waveTableLength];
	};

	Oscillator.prototype.generate = function() {
	  var frameOffset = this.frameCount * this.bufferSize;
	  var step = this.waveTableLength * this.frequency / this.sampleRate;
	  var offset;

	  for ( var i = 0; i < this.bufferSize; i++ ) {
		//var step = (frameOffset + i) * this.cyclesPerSample % 1;
		//this.signal[i] = this.func(step) * this.amplitude;
		//this.signal[i] = this.valueAt(Math.round((frameOffset + i) * step)) * this.amplitude;
		offset = Math.round((frameOffset + i) * step);
		this.signal[i] = this.waveTable[offset % this.waveTableLength] * this.amplitude;
	  }

	  this.frameCount++;

	  return this.signal;
	};

	Oscillator.Sine = function(step) {
	  return Math.sin(DSP.TWO_PI * step);
	};

	Oscillator.Square = function(step) {
	  return step < 0.5 ? 1 : -1;
	};

	Oscillator.Saw = function(step) {
	  return 2 * (step - Math.round(step));
	};

	Oscillator.Triangle = function(step) {
	  return 1 - 4 * Math.abs(Math.round(step) - step);
	};

	Oscillator.Pulse = function(step) {
	  // stub
	};

	function ADSR(attackLength, decayLength, sustainLevel, sustainLength, releaseLength, sampleRate) {
	  this.sampleRate = sampleRate;
	  // Length in seconds
	  this.attackLength  = attackLength;
	  this.decayLength   = decayLength;
	  this.sustainLevel  = sustainLevel;
	  this.sustainLength = sustainLength;
	  this.releaseLength = releaseLength;
	  this.sampleRate    = sampleRate;

	  // Length in samples
	  this.attackSamples  = attackLength  * sampleRate;
	  this.decaySamples   = decayLength   * sampleRate;
	  this.sustainSamples = sustainLength * sampleRate;
	  this.releaseSamples = releaseLength * sampleRate;

	  // Updates the envelope sample positions
	  this.update = function() {
		this.attack         =                this.attackSamples;
		this.decay          = this.attack  + this.decaySamples;
		this.sustain        = this.decay   + this.sustainSamples;
		this.release        = this.sustain + this.releaseSamples;
	  };

	  this.update();

	  this.samplesProcessed = 0;
	}

	ADSR.prototype.noteOn = function() {
	  this.samplesProcessed = 0;
	  this.sustainSamples = this.sustainLength * this.sampleRate;
	  this.update();
	};

	// Send a note off when using a sustain of infinity to let the envelope enter the release phase
	ADSR.prototype.noteOff = function() {
	  this.sustainSamples = this.samplesProcessed - this.decaySamples;
	  this.update();
	};

	ADSR.prototype.processSample = function(sample) {
	  var amplitude = 0;

	  if ( this.samplesProcessed <= this.attack ) {
		amplitude = 0 + (1 - 0) * ((this.samplesProcessed - 0) / (this.attack - 0));
	  } else if ( this.samplesProcessed > this.attack && this.samplesProcessed <= this.decay ) {
		amplitude = 1 + (this.sustainLevel - 1) * ((this.samplesProcessed - this.attack) / (this.decay - this.attack));
	  } else if ( this.samplesProcessed > this.decay && this.samplesProcessed <= this.sustain ) {
		amplitude = this.sustainLevel;
	  } else if ( this.samplesProcessed > this.sustain && this.samplesProcessed <= this.release ) {
		amplitude = this.sustainLevel + (0 - this.sustainLevel) * ((this.samplesProcessed - this.sustain) / (this.release - this.sustain));
	  }

	  return sample * amplitude;
	};

	ADSR.prototype.value = function() {
	  var amplitude = 0;

	  if ( this.samplesProcessed <= this.attack ) {
		amplitude = 0 + (1 - 0) * ((this.samplesProcessed - 0) / (this.attack - 0));
	  } else if ( this.samplesProcessed > this.attack && this.samplesProcessed <= this.decay ) {
		amplitude = 1 + (this.sustainLevel - 1) * ((this.samplesProcessed - this.attack) / (this.decay - this.attack));
	  } else if ( this.samplesProcessed > this.decay && this.samplesProcessed <= this.sustain ) {
		amplitude = this.sustainLevel;
	  } else if ( this.samplesProcessed > this.sustain && this.samplesProcessed <= this.release ) {
		amplitude = this.sustainLevel + (0 - this.sustainLevel) * ((this.samplesProcessed - this.sustain) / (this.release - this.sustain));
	  }

	  return amplitude;
	};

	ADSR.prototype.process = function(buffer) {
	  for ( var i = 0; i < buffer.length; i++ ) {
		buffer[i] *= this.value();

		this.samplesProcessed++;
	  }

	  return buffer;
	};


	ADSR.prototype.isActive = function() {
	  if ( this.samplesProcessed > this.release || this.samplesProcessed === -1 ) {
		return false;
	  } else {
		return true;
	  }
	};

	ADSR.prototype.disable = function() {
	  this.samplesProcessed = -1;
	};

	function IIRFilter(type, cutoff, resonance, sampleRate) {
	  this.sampleRate = sampleRate;

	  switch(type) {
		case DSP.LOWPASS:
		case DSP.LP12:
		  this.func = new IIRFilter.LP12(cutoff, resonance, sampleRate);
		  break;
	  }
	}

	IIRFilter.prototype.__defineGetter__('cutoff',
	  function() {
		return this.func.cutoff;
	  }
	);

	IIRFilter.prototype.__defineGetter__('resonance',
	  function() {
		return this.func.resonance;
	  }
	);

	IIRFilter.prototype.set = function(cutoff, resonance) {
	  this.func.calcCoeff(cutoff, resonance);
	};

	IIRFilter.prototype.process = function(buffer) {
	  this.func.process(buffer);
	};

	// Add an envelope to the filter
	IIRFilter.prototype.addEnvelope = function(envelope) {
	  if ( envelope instanceof ADSR ) {
		this.func.addEnvelope(envelope);
	  } else {
		throw "Not an envelope.";
	  }
	};

	IIRFilter.LP12 = function(cutoff, resonance, sampleRate) {
	  this.sampleRate = sampleRate;
	  this.vibraPos   = 0;
	  this.vibraSpeed = 0;
	  this.envelope = false;

	  this.calcCoeff = function(cutoff, resonance) {
		this.w = 2.0 * Math.PI * cutoff / this.sampleRate;
		this.q = 1.0 - this.w / (2.0 * (resonance + 0.5 / (1.0 + this.w)) + this.w - 2.0);
		this.r = this.q * this.q;
		this.c = this.r + 1.0 - 2.0 * Math.cos(this.w) * this.q;

		this.cutoff = cutoff;
		this.resonance = resonance;
	  };

	  this.calcCoeff(cutoff, resonance);

	  this.process = function(buffer) {
		for ( var i = 0; i < buffer.length; i++ ) {
		  this.vibraSpeed += (buffer[i] - this.vibraPos) * this.c;
		  this.vibraPos   += this.vibraSpeed;
		  this.vibraSpeed *= this.r;

		  /*
		  var temp = this.vibraPos;

		  if ( temp > 1.0 ) {
			temp = 1.0;
		  } else if ( temp < -1.0 ) {
			temp = -1.0;
		  } else if ( temp != temp ) {
			temp = 1;
		  }

		  buffer[i] = temp;
		  */

		  if (this.envelope) {
			buffer[i] = (buffer[i] * (1 - this.envelope.value())) + (this.vibraPos * this.envelope.value());
			this.envelope.samplesProcessed++;
		  } else {
			buffer[i] = this.vibraPos;
		  }
		}
	  };
	};

	IIRFilter.LP12.prototype.addEnvelope = function(envelope) {
	  this.envelope = envelope;
	};

	function IIRFilter2(type, cutoff, resonance, sampleRate) {
	  this.type = type;
	  this.cutoff = cutoff;
	  this.resonance = resonance;
	  this.sampleRate = sampleRate;

	  this.f = Float32Array(4);
	  this.f[0] = 0.0; // lp
	  this.f[1] = 0.0; // hp
	  this.f[2] = 0.0; // bp
	  this.f[3] = 0.0; // br

	  this.calcCoeff = function(cutoff, resonance) {
		this.freq = 2 * Math.sin(Math.PI * Math.min(0.25, cutoff/(this.sampleRate*2)));
		this.damp = Math.min(2 * (1 - Math.pow(resonance, 0.25)), Math.min(2, 2/this.freq - this.freq * 0.5));
	  };

	  this.calcCoeff(cutoff, resonance);
	}

	IIRFilter2.prototype.process = function(buffer) {
	  var input, output;
	  var f = this.f;

	  for ( var i = 0; i < buffer.length; i++ ) {
		input = buffer[i];

		// first pass
		f[3] = input - this.damp * f[2];
		f[0] = f[0] + this.freq * f[2];
		f[1] = f[3] - f[0];
		f[2] = this.freq * f[1] + f[2];
		output = 0.5 * f[this.type];

		// second pass
		f[3] = input - this.damp * f[2];
		f[0] = f[0] + this.freq * f[2];
		f[1] = f[3] - f[0];
		f[2] = this.freq * f[1] + f[2];
		output += 0.5 * f[this.type];

		if (this.envelope) {
		  buffer[i] = (buffer[i] * (1 - this.envelope.value())) + (output * this.envelope.value());
		  this.envelope.samplesProcessed++;
		} else {
		  buffer[i] = output;
		}
	  }
	};

	IIRFilter2.prototype.addEnvelope = function(envelope) {
	  if ( envelope instanceof ADSR ) {
		this.envelope = envelope;
	  } else {
		throw "This is not an envelope.";
	  }
	};

	IIRFilter2.prototype.set = function(cutoff, resonance) {
	  this.calcCoeff(cutoff, resonance);
	};



	function WindowFunction(type, alpha) {
	  this.alpha = alpha;

	  switch(type) {
		case DSP.BARTLETT:
		  this.func = WindowFunction.Bartlett;
		  break;

		case DSP.BARTLETTHANN:
		  this.func = WindowFunction.BartlettHann;
		  break;

		case DSP.BLACKMAN:
		  this.func = WindowFunction.Blackman;
		  this.alpha = this.alpha || 0.16;
		  break;

		case DSP.COSINE:
		  this.func = WindowFunction.Cosine;
		  break;

		case DSP.GAUSS:
		  this.func = WindowFunction.Gauss;
		  this.alpha = this.alpha || 0.25;
		  break;

		case DSP.HAMMING:
		  this.func = WindowFunction.Hamming;
		  break;

		case DSP.HANN:
		  this.func = WindowFunction.Hann;
		  break;

		case DSP.LANCZOS:
		  this.func = WindowFunction.Lanczoz;
		  break;

		case DSP.RECTANGULAR:
		  this.func = WindowFunction.Rectangular;
		  break;

		case DSP.TRIANGULAR:
		  this.func = WindowFunction.Triangular;
		  break;
	  }
	}

	WindowFunction.prototype.process = function(buffer) {
	  var length = buffer.length;
	  for ( var i = 0; i < length; i++ ) {
		buffer[i] *= this.func(length, i, this.alpha);
	  }
	  return buffer;
	};

	WindowFunction.Bartlett = function(length, index) {
	  return 2 / (length - 1) * ((length - 1) / 2 - Math.abs(index - (length - 1) / 2));
	};

	WindowFunction.BartlettHann = function(length, index) {
	  return 0.62 - 0.48 * Math.abs(index / (length - 1) - 0.5) - 0.38 * Math.cos(DSP.TWO_PI * index / (length - 1));
	};

	WindowFunction.Blackman = function(length, index, alpha) {
	  var a0 = (1 - alpha) / 2;
	  var a1 = 0.5;
	  var a2 = alpha / 2;

	  return a0 - a1 * Math.cos(DSP.TWO_PI * index / (length - 1)) + a2 * Math.cos(4 * Math.PI * index / (length - 1));
	};

	WindowFunction.Cosine = function(length, index) {
	  return Math.cos(Math.PI * index / (length - 1) - Math.PI / 2);
	};

	WindowFunction.Gauss = function(length, index, alpha) {
	  return Math.pow(Math.E, -0.5 * Math.pow((index - (length - 1) / 2) / (alpha * (length - 1) / 2), 2));
	};

	WindowFunction.Hamming = function(length, index) {
	  return 0.54 - 0.46 * Math.cos(DSP.TWO_PI * index / (length - 1));
	};

	WindowFunction.Hann = function(length, index) {
	  return 0.5 * (1 - Math.cos(DSP.TWO_PI * index / (length - 1)));
	};

	WindowFunction.Lanczos = function(length, index) {
	  var x = 2 * index / (length - 1) - 1;
	  return Math.sin(Math.PI * x) / (Math.PI * x);
	};

	WindowFunction.Rectangular = function(length, index) {
	  return 1;
	};

	WindowFunction.Triangular = function(length, index) {
	  return 2 / length * (length / 2 - Math.abs(index - (length - 1) / 2));
	};

	function sinh (arg) {
	  // Returns the hyperbolic sine of the number, defined as (exp(number) - exp(-number))/2
	  //
	  // version: 1004.2314
	  // discuss at: http://phpjs.org/functions/sinh    // +   original by: Onno Marsman
	  // *     example 1: sinh(-0.9834330348825909);
	  // *     returns 1: -1.1497971402636502
	  return (Math.exp(arg) - Math.exp(-arg))/2;
	}

	/*
	 *  Biquad filter
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 */
	// Implementation based on:
	// http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt
	function Biquad(type, sampleRate) {
	  this.Fs = sampleRate;
	  this.type = type;  // type of the filter
	  this.parameterType = DSP.Q; // type of the parameter

	  this.x_1_l = 0;
	  this.x_2_l = 0;
	  this.y_1_l = 0;
	  this.y_2_l = 0;

	  this.x_1_r = 0;
	  this.x_2_r = 0;
	  this.y_1_r = 0;
	  this.y_2_r = 0;

	  this.b0 = 1;
	  this.a0 = 1;

	  this.b1 = 0;
	  this.a1 = 0;

	  this.b2 = 0;
	  this.a2 = 0;

	  this.b0a0 = this.b0 / this.a0;
	  this.b1a0 = this.b1 / this.a0;
	  this.b2a0 = this.b2 / this.a0;
	  this.a1a0 = this.a1 / this.a0;
	  this.a2a0 = this.a2 / this.a0;

	  this.f0 = 3000;   // "wherever it's happenin', man."  Center Frequency or
						// Corner Frequency, or shelf midpoint frequency, depending
						// on which filter type.  The "significant frequency".

	  this.dBgain = 12; // used only for peaking and shelving filters

	  this.Q = 1;       // the EE kind of definition, except for peakingEQ in which A*Q is
						// the classic EE Q.  That adjustment in definition was made so that
						// a boost of N dB followed by a cut of N dB for identical Q and
						// f0/Fs results in a precisely flat unity gain filter or "wire".

	  this.BW = -3;     // the bandwidth in octaves (between -3 dB frequencies for BPF
						// and notch or between midpoint (dBgain/2) gain frequencies for
						// peaking EQ

	  this.S = 1;       // a "shelf slope" parameter (for shelving EQ only).  When S = 1,
						// the shelf slope is as steep as it can be and remain monotonically
						// increasing or decreasing gain with frequency.  The shelf slope, in
						// dB/octave, remains proportional to S for all other values for a
						// fixed f0/Fs and dBgain.

	  this.coefficients = function() {
		var b = [this.b0, this.b1, this.b2];
		var a = [this.a0, this.a1, this.a2];
		return {b: b, a:a};
	  };

	  this.setFilterType = function(type) {
		this.type = type;
		this.recalculateCoefficients();
	  };

	  this.setSampleRate = function(rate) {
		this.Fs = rate;
		this.recalculateCoefficients();
	  };

	  this.setQ = function(q) {
		this.parameterType = DSP.Q;
		this.Q = Math.max(Math.min(q, 115.0), 0.001);
		this.recalculateCoefficients();
	  };

	  this.setBW = function(bw) {
		this.parameterType = DSP.BW;
		this.BW = bw;
		this.recalculateCoefficients();
	  };

	  this.setS = function(s) {
		this.parameterType = DSP.S;
		this.S = Math.max(Math.min(s, 5.0), 0.0001);
		this.recalculateCoefficients();
	  };

	  this.setF0 = function(freq) {
		this.f0 = freq;
		this.recalculateCoefficients();
	  };

	  this.setDbGain = function(g) {
		this.dBgain = g;
		this.recalculateCoefficients();
	  };

	  this.recalculateCoefficients = function() {
		var A;
		if (type === DSP.PEAKING_EQ || type === DSP.LOW_SHELF || type === DSP.HIGH_SHELF ) {
		  A = Math.pow(10, (this.dBgain/40));  // for peaking and shelving EQ filters only
		} else {
		  A  = Math.sqrt( Math.pow(10, (this.dBgain/20)) );
		}

		var w0 = DSP.TWO_PI * this.f0 / this.Fs;

		var cosw0 = Math.cos(w0);
		var sinw0 = Math.sin(w0);

		var alpha = 0;

		switch (this.parameterType) {
		  case DSP.Q:
			alpha = sinw0/(2*this.Q);
			break;

		  case DSP.BW:
			alpha = sinw0 * sinh( Math.LN2/2 * this.BW * w0/sinw0 );
			break;

		  case DSP.S:
			alpha = sinw0/2 * Math.sqrt( (A + 1/A)*(1/this.S - 1) + 2 );
			break;
		}

		/**
			FYI: The relationship between bandwidth and Q is
				 1/Q = 2*sinh(ln(2)/2*BW*w0/sin(w0))     (digital filter w BLT)
			or   1/Q = 2*sinh(ln(2)/2*BW)             (analog filter prototype)

			The relationship between shelf slope and Q is
				 1/Q = sqrt((A + 1/A)*(1/S - 1) + 2)
		*/

		var coeff;

		switch (this.type) {
		  case DSP.LPF:       // H(s) = 1 / (s^2 + s/Q + 1)
			this.b0 =  (1 - cosw0)/2;
			this.b1 =   1 - cosw0;
			this.b2 =  (1 - cosw0)/2;
			this.a0 =   1 + alpha;
			this.a1 =  -2 * cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.HPF:       // H(s) = s^2 / (s^2 + s/Q + 1)
			this.b0 =  (1 + cosw0)/2;
			this.b1 = -(1 + cosw0);
			this.b2 =  (1 + cosw0)/2;
			this.a0 =   1 + alpha;
			this.a1 =  -2 * cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.BPF_CONSTANT_SKIRT:       // H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
			this.b0 =   sinw0/2;
			this.b1 =   0;
			this.b2 =  -sinw0/2;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.BPF_CONSTANT_PEAK:       // H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
			this.b0 =   alpha;
			this.b1 =   0;
			this.b2 =  -alpha;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.NOTCH:     // H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
			this.b0 =   1;
			this.b1 =  -2*cosw0;
			this.b2 =   1;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.APF:       // H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
			this.b0 =   1 - alpha;
			this.b1 =  -2*cosw0;
			this.b2 =   1 + alpha;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.PEAKING_EQ:  // H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
			this.b0 =   1 + alpha*A;
			this.b1 =  -2*cosw0;
			this.b2 =   1 - alpha*A;
			this.a0 =   1 + alpha/A;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha/A;
			break;

		  case DSP.LOW_SHELF:   // H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
			coeff = sinw0 * Math.sqrt( (A^2 + 1)*(1/this.S - 1) + 2*A );
			this.b0 =    A*((A+1) - (A-1)*cosw0 + coeff);
			this.b1 =  2*A*((A-1) - (A+1)*cosw0);
			this.b2 =    A*((A+1) - (A-1)*cosw0 - coeff);
			this.a0 =       (A+1) + (A-1)*cosw0 + coeff;
			this.a1 =   -2*((A-1) + (A+1)*cosw0);
			this.a2 =       (A+1) + (A-1)*cosw0 - coeff;
			break;

		  case DSP.HIGH_SHELF:   // H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)
			coeff = sinw0 * Math.sqrt( (A^2 + 1)*(1/this.S - 1) + 2*A );
			this.b0 =    A*((A+1) + (A-1)*cosw0 + coeff);
			this.b1 = -2*A*((A-1) + (A+1)*cosw0);
			this.b2 =    A*((A+1) + (A-1)*cosw0 - coeff);
			this.a0 =       (A+1) - (A-1)*cosw0 + coeff;
			this.a1 =    2*((A-1) - (A+1)*cosw0);
			this.a2 =       (A+1) - (A-1)*cosw0 - coeff;
			break;
		}

		this.b0a0 = this.b0/this.a0;
		this.b1a0 = this.b1/this.a0;
		this.b2a0 = this.b2/this.a0;
		this.a1a0 = this.a1/this.a0;
		this.a2a0 = this.a2/this.a0;
	  };

	  this.process = function(buffer) {
		  //y[n] = (b0/a0)*x[n] + (b1/a0)*x[n-1] + (b2/a0)*x[n-2]
		  //       - (a1/a0)*y[n-1] - (a2/a0)*y[n-2]

		  var len = buffer.length;
		  var output = new Float32Array(len);

		  for ( var i=0; i<buffer.length; i++ ) {
			output[i] = this.b0a0*buffer[i] + this.b1a0*this.x_1_l + this.b2a0*this.x_2_l - this.a1a0*this.y_1_l - this.a2a0*this.y_2_l;
			this.y_2_l = this.y_1_l;
			this.y_1_l = output[i];
			this.x_2_l = this.x_1_l;
			this.x_1_l = buffer[i];
		  }

		  return output;
	  };

	  this.processStereo = function(buffer) {
		  //y[n] = (b0/a0)*x[n] + (b1/a0)*x[n-1] + (b2/a0)*x[n-2]
		  //       - (a1/a0)*y[n-1] - (a2/a0)*y[n-2]

		  var len = buffer.length;
		  var output = new Float32Array(len);

		  for (var i = 0; i < len/2; i++) {
			output[2*i] = this.b0a0*buffer[2*i] + this.b1a0*this.x_1_l + this.b2a0*this.x_2_l - this.a1a0*this.y_1_l - this.a2a0*this.y_2_l;
			this.y_2_l = this.y_1_l;
			this.y_1_l = output[2*i];
			this.x_2_l = this.x_1_l;
			this.x_1_l = buffer[2*i];

			output[2*i+1] = this.b0a0*buffer[2*i+1] + this.b1a0*this.x_1_r + this.b2a0*this.x_2_r - this.a1a0*this.y_1_r - this.a2a0*this.y_2_r;
			this.y_2_r = this.y_1_r;
			this.y_1_r = output[2*i+1];
			this.x_2_r = this.x_1_r;
			this.x_1_r = buffer[2*i+1];
		  }

		  return output;
	  };
	}

	/*
	 *  Magnitude to decibels
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 *  @buffer array of magnitudes to convert to decibels
	 *
	 *  @returns the array in decibels
	 *
	 */
	DSP.mag2db = function(buffer) {
	  var minDb = -120;
	  var minMag = Math.pow(10.0, minDb / 20.0);

	  var log = Math.log;
	  var max = Math.max;

	  var result = Float32Array(buffer.length);
	  for (var i=0; i<buffer.length; i++) {
		result[i] = 20.0*log(max(buffer[i], minMag));
	  }

	  return result;
	};

	/*
	 *  Frequency response
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 *  Calculates the frequency response at the given points.
	 *
	 *  @b b coefficients of the filter
	 *  @a a coefficients of the filter
	 *  @w w points (normally between -PI and PI) where to calculate the frequency response
	 *
	 *  @returns the frequency response in magnitude
	 *
	 */
	DSP.freqz = function(b, a, w) {
	  var i, j;

	  if (!w) {
		w = Float32Array(200);
		for (i=0;i<w.length; i++) {
		  w[i] = DSP.TWO_PI/w.length * i - Math.PI;
		}
	  }

	  var result = Float32Array(w.length);

	  var sqrt = Math.sqrt;
	  var cos = Math.cos;
	  var sin = Math.sin;

	  for (i=0; i<w.length; i++) {
		var numerator = {real:0.0, imag:0.0};
		for (j=0; j<b.length; j++) {
		  numerator.real += b[j] * cos(-j*w[i]);
		  numerator.imag += b[j] * sin(-j*w[i]);
		}

		var denominator = {real:0.0, imag:0.0};
		for (j=0; j<a.length; j++) {
		  denominator.real += a[j] * cos(-j*w[i]);
		  denominator.imag += a[j] * sin(-j*w[i]);
		}

		result[i] =  sqrt(numerator.real*numerator.real + numerator.imag*numerator.imag) / sqrt(denominator.real*denominator.real + denominator.imag*denominator.imag);
	  }

	  return result;
	};

	/*
	 *  Graphical Equalizer
	 *
	 *  Implementation of a graphic equalizer with a configurable bands-per-octave
	 *  and minimum and maximum frequencies
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 */
	function GraphicalEq(sampleRate) {
	  this.FS = sampleRate;
	  this.minFreq = 40.0;
	  this.maxFreq = 16000.0;

	  this.bandsPerOctave = 1.0;

	  this.filters = [];
	  this.freqzs = [];

	  this.calculateFreqzs = true;

	  this.recalculateFilters = function() {
		var bandCount = Math.round(Math.log(this.maxFreq/this.minFreq) * this.bandsPerOctave/ Math.LN2);

		this.filters = [];
		for (var i=0; i<bandCount; i++) {
		  var freq = this.minFreq*(Math.pow(2, i/this.bandsPerOctave));
		  var newFilter = new Biquad(DSP.PEAKING_EQ, this.FS);
		  newFilter.setDbGain(0);
		  newFilter.setBW(1/this.bandsPerOctave);
		  newFilter.setF0(freq);
		  this.filters[i] = newFilter;
		  this.recalculateFreqz(i);
		}
	  };

	  this.setMinimumFrequency = function(freq) {
		this.minFreq = freq;
		this.recalculateFilters();
	  };

	  this.setMaximumFrequency = function(freq) {
		this.maxFreq = freq;
		this.recalculateFilters();
	  };

	  this.setBandsPerOctave = function(bands) {
		this.bandsPerOctave = bands;
		this.recalculateFilters();
	  };

	  this.setBandGain = function(bandIndex, gain) {
		if (bandIndex < 0 || bandIndex > (this.filters.length-1)) {
		  throw "The band index of the graphical equalizer is out of bounds.";
		}

		if (!gain) {
		  throw "A gain must be passed.";
		}

		this.filters[bandIndex].setDbGain(gain);
		this.recalculateFreqz(bandIndex);
	  };

	  this.recalculateFreqz = function(bandIndex) {
		if (!this.calculateFreqzs) {
		  return;
		}

		if (bandIndex < 0 || bandIndex > (this.filters.length-1)) {
		  throw "The band index of the graphical equalizer is out of bounds. " + bandIndex + " is out of [" + 0 + ", " + this.filters.length-1 + "]";
		}

		if (!this.w) {
		  this.w = Float32Array(400);
		  for (var i=0; i<this.w.length; i++) {
			 this.w[i] = Math.PI/this.w.length * i;
		  }
		}

		var b = [this.filters[bandIndex].b0, this.filters[bandIndex].b1, this.filters[bandIndex].b2];
		var a = [this.filters[bandIndex].a0, this.filters[bandIndex].a1, this.filters[bandIndex].a2];

		this.freqzs[bandIndex] = DSP.mag2db(DSP.freqz(b, a, this.w));
	  };

	  this.process = function(buffer) {
		var output = buffer;

		for (var i = 0; i < this.filters.length; i++) {
		  output = this.filters[i].process(output);
		}

		return output;
	  };

	  this.processStereo = function(buffer) {
		var output = buffer;

		for (var i = 0; i < this.filters.length; i++) {
		  output = this.filters[i].processStereo(output);
		}

		return output;
	  };
	}

	/**
	 * MultiDelay effect by Almer Thie (http://code.almeros.com).
	 * Copyright 2010 Almer Thie. All rights reserved.
	 * Example: http://code.almeros.com/code-examples/delay-firefox-audio-api/
	 *
	 * This is a delay that feeds it's own delayed signal back into its circular
	 * buffer. Also known as a CombFilter.
	 *
	 * Compatible with interleaved stereo (or more channel) buffers and
	 * non-interleaved mono buffers.
	 *
	 * @param {Number} maxDelayInSamplesSize Maximum possible delay in samples (size of circular buffer)
	 * @param {Number} delayInSamples Initial delay in samples
	 * @param {Number} masterVolume Initial master volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} delayVolume Initial feedback delay volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 *
	 * @constructor
	 */
	function MultiDelay(maxDelayInSamplesSize, delayInSamples, masterVolume, delayVolume) {
	  this.delayBufferSamples   = new Float32Array(maxDelayInSamplesSize); // The maximum size of delay
	  this.delayInputPointer     = delayInSamples;
	  this.delayOutputPointer   = 0;

	  this.delayInSamples   = delayInSamples;
	  this.masterVolume     = masterVolume;
	  this.delayVolume     = delayVolume;
	}

	/**
	 * Change the delay time in samples.
	 *
	 * @param {Number} delayInSamples Delay in samples
	 */
	MultiDelay.prototype.setDelayInSamples = function (delayInSamples) {
	  this.delayInSamples = delayInSamples;

	  this.delayInputPointer = this.delayOutputPointer + delayInSamples;

	  if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		this.delayInputPointer = this.delayInputPointer - this.delayBufferSamples.length;
	  }
	};

	/**
	 * Change the master volume.
	 *
	 * @param {Number} masterVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	MultiDelay.prototype.setMasterVolume = function(masterVolume) {
	  this.masterVolume = masterVolume;
	};

	/**
	 * Change the delay feedback volume.
	 *
	 * @param {Number} delayVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	MultiDelay.prototype.setDelayVolume = function(delayVolume) {
	  this.delayVolume = delayVolume;
	};

	/**
	 * Process a given interleaved or mono non-interleaved float value Array and adds the delayed audio.
	 *
	 * @param {Array} samples Array containing Float values or a Float32Array
	 *
	 * @returns A new Float32Array interleaved or mono non-interleaved as was fed to this function.
	 */
	MultiDelay.prototype.process = function(samples) {
	  // NB. Make a copy to put in the output samples to return.
	  var outputSamples = new Float32Array(samples.length);

	  for (var i=0; i<samples.length; i++) {
		// delayBufferSamples could contain initial NULL's, return silence in that case
		var delaySample = (this.delayBufferSamples[this.delayOutputPointer] === null ? 0.0 : this.delayBufferSamples[this.delayOutputPointer]);

		// Mix normal audio data with delayed audio
		var sample = (delaySample * this.delayVolume) + samples[i];

		// Add audio data with the delay in the delay buffer
		this.delayBufferSamples[this.delayInputPointer] = sample;

		// Return the audio with delay mix
		outputSamples[i] = sample * this.masterVolume;

		// Manage circulair delay buffer pointers
		this.delayInputPointer++;
		if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		  this.delayInputPointer = 0;
		}

		this.delayOutputPointer++;
		if (this.delayOutputPointer >= this.delayBufferSamples.length-1) {
		  this.delayOutputPointer = 0;
		}
	  }

	  return outputSamples;
	};

	/**
	 * SingleDelay effect by Almer Thie (http://code.almeros.com).
	 * Copyright 2010 Almer Thie. All rights reserved.
	 * Example: See usage in Reverb class
	 *
	 * This is a delay that does NOT feeds it's own delayed signal back into its
	 * circular buffer, neither does it return the original signal. Also known as
	 * an AllPassFilter(?).
	 *
	 * Compatible with interleaved stereo (or more channel) buffers and
	 * non-interleaved mono buffers.
	 *
	 * @param {Number} maxDelayInSamplesSize Maximum possible delay in samples (size of circular buffer)
	 * @param {Number} delayInSamples Initial delay in samples
	 * @param {Number} delayVolume Initial feedback delay volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 *
	 * @constructor
	 */

	function SingleDelay(maxDelayInSamplesSize, delayInSamples, delayVolume) {
	  this.delayBufferSamples = new Float32Array(maxDelayInSamplesSize); // The maximum size of delay
	  this.delayInputPointer  = delayInSamples;
	  this.delayOutputPointer = 0;

	  this.delayInSamples     = delayInSamples;
	  this.delayVolume        = delayVolume;
	}

	/**
	 * Change the delay time in samples.
	 *
	 * @param {Number} delayInSamples Delay in samples
	 */
	SingleDelay.prototype.setDelayInSamples = function(delayInSamples) {
	  this.delayInSamples = delayInSamples;
	  this.delayInputPointer = this.delayOutputPointer + delayInSamples;

	  if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		this.delayInputPointer = this.delayInputPointer - this.delayBufferSamples.length;
	  }
	};

	/**
	 * Change the return signal volume.
	 *
	 * @param {Number} delayVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	SingleDelay.prototype.setDelayVolume = function(delayVolume) {
	  this.delayVolume = delayVolume;
	};

	/**
	 * Process a given interleaved or mono non-interleaved float value Array and
	 * returns the delayed audio.
	 *
	 * @param {Array} samples Array containing Float values or a Float32Array
	 *
	 * @returns A new Float32Array interleaved or mono non-interleaved as was fed to this function.
	 */
	SingleDelay.prototype.process = function(samples) {
	  // NB. Make a copy to put in the output samples to return.
	  var outputSamples = new Float32Array(samples.length);

	  for (var i=0; i<samples.length; i++) {

		// Add audio data with the delay in the delay buffer
		this.delayBufferSamples[this.delayInputPointer] = samples[i];

		// delayBufferSamples could contain initial NULL's, return silence in that case
		var delaySample = this.delayBufferSamples[this.delayOutputPointer];

		// Return the audio with delay mix
		outputSamples[i] = delaySample * this.delayVolume;

		// Manage circulair delay buffer pointers
		this.delayInputPointer++;

		if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		  this.delayInputPointer = 0;
		}

		this.delayOutputPointer++;

		if (this.delayOutputPointer >= this.delayBufferSamples.length-1) {
		  this.delayOutputPointer = 0;
		}
	  }

	  return outputSamples;
	};

	/**
	 * Reverb effect by Almer Thie (http://code.almeros.com).
	 * Copyright 2010 Almer Thie. All rights reserved.
	 * Example: http://code.almeros.com/code-examples/reverb-firefox-audio-api/
	 *
	 * This reverb consists of 6 SingleDelays, 6 MultiDelays and an IIRFilter2
	 * for each of the two stereo channels.
	 *
	 * Compatible with interleaved stereo buffers only!
	 *
	 * @param {Number} maxDelayInSamplesSize Maximum possible delay in samples (size of circular buffers)
	 * @param {Number} delayInSamples Initial delay in samples for internal (Single/Multi)delays
	 * @param {Number} masterVolume Initial master volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} mixVolume Initial reverb signal mix volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} delayVolume Initial feedback delay volume for internal (Single/Multi)delays. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} dampFrequency Initial low pass filter frequency. 0 to 44100 (depending on your maximum sampling frequency)
	 *
	 * @constructor
	 */
	function Reverb(maxDelayInSamplesSize, delayInSamples, masterVolume, mixVolume, delayVolume, dampFrequency) {
	  this.delayInSamples   = delayInSamples;
	  this.masterVolume     = masterVolume;
	  this.mixVolume       = mixVolume;
	  this.delayVolume     = delayVolume;
	  this.dampFrequency     = dampFrequency;

	  this.NR_OF_MULTIDELAYS = 6;
	  this.NR_OF_SINGLEDELAYS = 6;

	  this.LOWPASSL = new IIRFilter2(DSP.LOWPASS, dampFrequency, 0, 44100);
	  this.LOWPASSR = new IIRFilter2(DSP.LOWPASS, dampFrequency, 0, 44100);

	  this.singleDelays = [];

	  var i, delayMultiply;

	  for (i = 0; i < this.NR_OF_SINGLEDELAYS; i++) {
		delayMultiply = 1.0 + (i/7.0); // 1.0, 1.1, 1.2...
		this.singleDelays[i] = new SingleDelay(maxDelayInSamplesSize, Math.round(this.delayInSamples * delayMultiply), this.delayVolume);
	  }

	  this.multiDelays = [];

	  for (i = 0; i < this.NR_OF_MULTIDELAYS; i++) {
		delayMultiply = 1.0 + (i/10.0); // 1.0, 1.1, 1.2...
		this.multiDelays[i] = new MultiDelay(maxDelayInSamplesSize, Math.round(this.delayInSamples * delayMultiply), this.masterVolume, this.delayVolume);
	  }
	}

	/**
	 * Change the delay time in samples as a base for all delays.
	 *
	 * @param {Number} delayInSamples Delay in samples
	 */
	Reverb.prototype.setDelayInSamples = function (delayInSamples){
	  this.delayInSamples = delayInSamples;

	  var i, delayMultiply;

	  for (i = 0; i < this.NR_OF_SINGLEDELAYS; i++) {
		delayMultiply = 1.0 + (i/7.0); // 1.0, 1.1, 1.2...
		this.singleDelays[i].setDelayInSamples( Math.round(this.delayInSamples * delayMultiply) );
	  }

	  for (i = 0; i < this.NR_OF_MULTIDELAYS; i++) {
		delayMultiply = 1.0 + (i/10.0); // 1.0, 1.1, 1.2...
		this.multiDelays[i].setDelayInSamples( Math.round(this.delayInSamples * delayMultiply) );
	  }
	};

	/**
	 * Change the master volume.
	 *
	 * @param {Number} masterVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	Reverb.prototype.setMasterVolume = function (masterVolume){
	  this.masterVolume = masterVolume;
	};

	/**
	 * Change the reverb signal mix level.
	 *
	 * @param {Number} mixVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	Reverb.prototype.setMixVolume = function (mixVolume){
	  this.mixVolume = mixVolume;
	};

	/**
	 * Change all delays feedback volume.
	 *
	 * @param {Number} delayVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	Reverb.prototype.setDelayVolume = function (delayVolume){
	  this.delayVolume = delayVolume;

	  var i;

	  for (i = 0; i<this.NR_OF_SINGLEDELAYS; i++) {
		this.singleDelays[i].setDelayVolume(this.delayVolume);
	  }

	  for (i = 0; i<this.NR_OF_MULTIDELAYS; i++) {
		this.multiDelays[i].setDelayVolume(this.delayVolume);
	  }
	};

	/**
	 * Change the Low Pass filter frequency.
	 *
	 * @param {Number} dampFrequency low pass filter frequency. 0 to 44100 (depending on your maximum sampling frequency)
	 */
	Reverb.prototype.setDampFrequency = function (dampFrequency){
	  this.dampFrequency = dampFrequency;

	  this.LOWPASSL.set(dampFrequency, 0);
	  this.LOWPASSR.set(dampFrequency, 0);
	};

	/**
	 * Process a given interleaved float value Array and copies and adds the reverb signal.
	 *
	 * @param {Array} samples Array containing Float values or a Float32Array
	 *
	 * @returns A new Float32Array interleaved buffer.
	 */
	Reverb.prototype.process = function (interleavedSamples){
	  // NB. Make a copy to put in the output samples to return.
	  var outputSamples = new Float32Array(interleavedSamples.length);

	  // Perform low pass on the input samples to mimick damp
	  var leftRightMix = DSP.deinterleave(interleavedSamples);
	  this.LOWPASSL.process( leftRightMix[DSP.LEFT] );
	  this.LOWPASSR.process( leftRightMix[DSP.RIGHT] );
	  var filteredSamples = DSP.interleave(leftRightMix[DSP.LEFT], leftRightMix[DSP.RIGHT]);

	  var i;

	  // Process MultiDelays in parallel
	  for (i = 0; i<this.NR_OF_MULTIDELAYS; i++) {
		// Invert the signal of every even multiDelay
		outputSamples = DSP.mixSampleBuffers(outputSamples, this.multiDelays[i].process(filteredSamples), 2%i === 0, this.NR_OF_MULTIDELAYS);
	  }

	  // Process SingleDelays in series
	  var singleDelaySamples = new Float32Array(outputSamples.length);
	  for (i = 0; i<this.NR_OF_SINGLEDELAYS; i++) {
		// Invert the signal of every even singleDelay
		singleDelaySamples = DSP.mixSampleBuffers(singleDelaySamples, this.singleDelays[i].process(outputSamples), 2%i === 0, 1);
	  }

	  // Apply the volume of the reverb signal
	  for (i = 0; i<singleDelaySamples.length; i++) {
		singleDelaySamples[i] *= this.mixVolume;
	  }

	  // Mix the original signal with the reverb signal
	  outputSamples = DSP.mixSampleBuffers(singleDelaySamples, interleavedSamples, 0, 1);

	  // Apply the master volume to the complete signal
	  for (i = 0; i<outputSamples.length; i++) {
		outputSamples[i] *= this.masterVolume;
	  }

	  return outputSamples;
	};

	return {
		DSP:				DSP,
		setupTypedArray:	setupTypedArray,
		FourierTransform:	FourierTransform,
		DFT:				DFT,
		FFT:				FFT,
		RFFT:				RFFT,
		Sampler:			Sampler,
		Oscillator:			Oscillator,
		ADSR:				ADSR,
		IIRFilter:			IIRFilter,
		IIRFilter2:			IIRFilter2,
		WindowFunction:		WindowFunction,
		sinh:				sinh,
		Biquad:				Biquad,
		GraphicalEq:		GraphicalEq,
		MultiDelay:			MultiDelay,
		SingleDelay:		SingleDelay,
		Reverb:				Reverb
	};
});
define('sound-input',['jquery', 'dsp', 'game/options', 'l2p'], function ($, dsp, options, L2P) {
	var	DSP	= dsp.DSP,
		setupTypedArray		= dsp.setupTypedArray,
		FourierTransform	= dsp.FourierTransform,
		DFT					= dsp.DFT,
		FFT					= dsp.FFT,
		RFFT				= dsp.RFFT,
		Sampler				= dsp.Sampler,
		Oscillator			= dsp.Oscillator,
		ADSR				= dsp.ADSR,
		IIRFilter			= dsp.IIRFilter,
		IIRFilter2			= dsp.IIRFilter2,
		WindowFunction		= dsp.WindowFunction,
		sinh				= dsp.sinh,
		Biquad				= dsp.Biquad,
		GraphicalEq			= dsp.GraphicalEq,
		MultiDelay			= dsp.MultiDelay,
		SingleDelay			= dsp.SingleDelay,
		Reverb				= dsp.Reverb,
		abekat = 0;

	var Tuner,
		frequencies,
		root,
		__hasProp = {}.hasOwnProperty;

		frequencies	= [];
	options.tones.all.forEach(function (tone) {
		frequencies[tone.name+tone.octav]	= tone;
	});

	window.requestAnimationFrame	= (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function () {};
	}());

	function Tuner(err, toneChange, expectedTone) {
		var	tuner	= this,
			countdown;

		tuner.$tuner			= $(tuner);
		tuner.noiseCount		= 0;
		tuner.noiseThreshold	= -Infinity

		var audioContext, bufferFillSize, bufferFiller, error, hp, i, lp, success;
		window.AudioContext = (function() {
			return window.AudioContext || window.mozAudioContext || window.webkitAudioContext || window.msAudioContext || window.oAudioContext;
		})();
		if (!window.AudioContext) {
			return err('audioContext');
		}
		navigator.getUserMedia = (function() {
			return navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
		})();
		if (!navigator.getUserMedia) {
			return err('getUserMedia');
		}
		audioContext = new AudioContext();
		tuner.sampleRate = audioContext.sampleRate;
		tuner.fftSize = 8192;
		tuner.fft = new FFT(tuner.fftSize, tuner.sampleRate / 4);
		tuner.buffer = (function() {
			var _i, _results;
			_results = [];
			for (i = _i = 0; 0 <= tuner.fftSize ? _i < tuner.fftSize : _i > tuner.fftSize; i = 0 <= tuner.fftSize ? ++_i : --_i) {
				_results.push(0);
			}
			return _results;
		})();

		bufferFillSize = 2048;
		bufferFiller = audioContext.createJavaScriptNode(bufferFillSize, 1, 1);
		bufferFiller.onaudioprocess = function(e) {
			var b, input, _i, _j, _ref, _ref1, _results;
			input = e.inputBuffer.getChannelData(0);
			for (b = _i = bufferFillSize, _ref = tuner.buffer.length; bufferFillSize <= _ref ? _i < _ref : _i > _ref; b = bufferFillSize <= _ref ? ++_i : --_i) {
				tuner.buffer[b - bufferFillSize] = tuner.buffer[b];
			}
			_results = [];
			for (b = _j = 0, _ref1 = input.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; b = 0 <= _ref1 ? ++_j : --_j) {
				_results.push(tuner.buffer[tuner.buffer.length - bufferFillSize + b] = input[b]);
			}
			return _results;
		};
		tuner.gauss = new WindowFunction(DSP.GAUSS);
		lp = audioContext.createBiquadFilter();
		lp.type = lp.LOWPASS;
		lp.frequency = 8000;
		lp.Q = 0.1;
		hp = audioContext.createBiquadFilter();
		hp.type = hp.HIGHPASS;
		hp.frequency = 20;
		hp.Q = 0.1;
		success = function(stream) {
			if(countdown) {
				countdown.kill();
			}
			var src;
			tuner.resetNoise();
			try {
				src = audioContext.createMediaStreamSource(stream);
				src.connect(lp);
				lp.connect(hp);
				hp.connect(bufferFiller);
				bufferFiller.connect(audioContext.destination);
			} catch (e) {
				error(e);
			}

			tuner.tickDone(-1);
		};
		error = function(e) {
			// console.log(e);

			if(countdown) {
				countdown.kill();
			}

			countdown	= L2P.countdown(0, [
				{
					text:	L2P_global.lang.game_permission_denied,
					sec:	1,
					type:	'none',
					css:	{
						'font-size':	'4vw'
					}
				}
			], '', '', function () {
				//this.reload();
			}, {
				lazyHide:			true,
				bottom:				'<a href="#" style="position: relative;z-index: 101;">Refresh<br><img src="/img/icons/refresh_white.svg" /></a>',
				background_color:	'#71C211'
			});

			$('#overlay .countdown .bottom a').click(function (e) {
				e.preventDefault();
				location.href	= location.origin;
			})
		};

		countdown = L2P.countdown(0, [
			{
				text:	L2P_global.lang.game_permission_ask_initial,
				sec:	15,
				type:	'long'
			}
		], L2P_global.lang.game_permission_ask, '', function () {
			countdown	= L2P.countdown(0, [
				{
					text:	L2P_global.lang.game_permission_ask_helpful,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_helpful_2,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_helpful_3,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_impatient,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_impatient_sigh,
					sec:	5,
					type:	'long'
				}
			], L2P_global.lang.game_permission_ask, '', function () {
				this.reload();
			}, {
				classList:	[
					'microphone-permission'
				],
				lazyHide:	true
			});
		}, {
			classList:	[
				'microphone-permission'
			]
		});
		return navigator.getUserMedia({
			audio: true
		}, success, error);
	};
	Tuner.prototype.process		= function () {
		var	tuner	= this,
			b, bufferCopy, diff, downsampled, firstFreq, freq, interp, left, note, p, peak, peaks, q, right, s, secondFreq, spectrumPoints, thirdFreq, upsampled, x, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;

		bufferCopy = (function() {
			var _i, _len, _results;
			_results = [];
			for (_i = 0, _len = tuner.buffer.length; _i < _len; _i++) {
				b = tuner.buffer[_i];
				_results.push(b);
			}
			return _results;
		})();
		tuner.gauss.process(bufferCopy);
		downsampled = [];
		for (s = _i = 0, _ref = bufferCopy.length; _i < _ref; s = _i += 4) {
			downsampled.push(bufferCopy[s]);
		}
		upsampled = [];
		for (_j = 0, _len = downsampled.length; _j < _len; _j++) {
			s = downsampled[_j];
			upsampled.push(s);
			upsampled.push(0);
			upsampled.push(0);
			upsampled.push(0);
		}
		tuner.fft.forward(upsampled);
		if (tuner.noiseCount < 50) {
			tuner.noiseThreshold = _.reduce(tuner.fft.spectrum, (function(max, next) {
				if (next > max) {
					return next;
				} else {
					return max;
				}
			}), tuner.noiseThreshold);
			tuner.noiseThreshold = tuner.noiseThreshold > 0.001 ? 0.001 : tuner.noiseThreshold;
			tuner.noiseCount++;
		}
		spectrumPoints = (function() {
			var _k, _ref1, _results;
			_results = [];
			for (x = _k = 0, _ref1 = tuner.fft.spectrum.length / 4; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; x = 0 <= _ref1 ? ++_k : --_k) {
				_results.push({
					x: x,
					y: tuner.fft.spectrum[x]
				});
			}
			return _results;
		})();
		spectrumPoints.sort(function(a, b) {
			return b.y - a.y;
		});
		peaks = [];
		for (p = _k = 0; _k < 8; p = ++_k) {
			if (spectrumPoints[p].y > tuner.noiseThreshold * 5) {
				peaks.push(spectrumPoints[p]);
			}
		}
		if (peaks.length > 0) {
			for (p = _l = 0, _ref1 = peaks.length; 0 <= _ref1 ? _l < _ref1 : _l > _ref1; p = 0 <= _ref1 ? ++_l : --_l) {
				if (peaks[p] != null) {
					for (q = _m = 0, _ref2 = peaks.length; 0 <= _ref2 ? _m < _ref2 : _m > _ref2; q = 0 <= _ref2 ? ++_m : --_m) {
						if (p !== q && (peaks[q] != null)) {
							if (Math.abs(peaks[p].x - peaks[q].x) < 5) {
								peaks[q] = null;
							}
						}
					}
				}
			}
			peaks = (function() {
				var _len1, _n, _results;
				_results = [];
				for (_n = 0, _len1 = peaks.length; _n < _len1; _n++) {
					p = peaks[_n];
					if (p != null) {
						_results.push(p);
					}
				}
				return _results;
			})();
			peaks.sort(function(a, b) {
				return a.x - b.x;
			});
			tuner.maxPeaks = tuner.maxPeaks < peaks.length ? peaks.length : tuner.maxPeaks;
			peak = null;
			firstFreq = peaks[0].x * (tuner.sampleRate / tuner.fftSize);
			if (peaks.length > 1) {
				secondFreq = peaks[1].x * (tuner.sampleRate / tuner.fftSize);
				if ((1.4 < (_ref3 = firstFreq / secondFreq) && _ref3 < 1.6)) {
					peak = peaks[1];
				}
			}
			if (peaks.length > 2) {
				thirdFreq = peaks[2].x * (tuner.sampleRate / tuner.fftSize);
				if ((1.4 < (_ref4 = firstFreq / thirdFreq) && _ref4 < 1.6)) {
					peak = peaks[2];
				}
			}
			/*peak	= (function (expectedTone, peaks) {
				var	diff,
					closestPeak	= null;
				if(peaks.length === 0 || expectedTone === undefined) {
					return null;
				}

				peaks.forEach(function (peak) {
					peak.hz	= peak.x * (tuner.sampleRate / tuner.fftSize);
					if(Math.abs(expectedTone.hz - peak.hz) < diff || diff === undefined) {
						diff		= Math.abs(expectedTone.hz - peak.hz);
						closestPeak	= peak;
					}
				});

				return closestPeak;
			}(expectedTone(), peaks));*/
			peaks.sort(function (a, b) {
				return a.y < b.y;
			});

			if (peaks.length > 1 || tuner.maxPeaks === 1 || tuner.maxPeaks === 2 || tuner.maxPeaks === 3) {
				if (!(peak != null)) {
					peak = peaks[0];
				}
				left = {
					x: peak.x - 1,
					y: Math.log(tuner.fft.spectrum[peak.x - 1])
				};
				peak = {
					x: peak.x,
					y: Math.log(tuner.fft.spectrum[peak.x])
				};
				right = {
					x: peak.x + 1,
					y: Math.log(tuner.fft.spectrum[peak.x + 1])
				};
				interp = 0.5 * ((left.y - right.y) / (left.y - (2 * peak.y) + right.y)) + peak.x;
				freq = interp * (tuner.sampleRate / tuner.fftSize);
				_ref5 = tuner.getPitch(freq), note = _ref5[0], diff = _ref5[1];
				tuner.tickDone(freq, note, diff);
			} else {
				tuner.tickDone(-1);
			}
		} else {
			tuner.maxPeaks = 0;
			tuner.tickDone(-1);
		}
	};
	Tuner.prototype.tickDone	= function (freq, note, diff) {
		var	tuner	= this;

		requestAnimationFrame($.proxy(tuner.process, tuner));
		tuner.$tuner.trigger('tick', [freq, note, diff]);
	};
	Tuner.prototype.resetNoise	= function () {
		var	tuner	= this;

		L2P.countdown(0, [
			{
				text:	L2P_global.lang.game_measuring,
				sec:	2,
				type:	'long',
				css:	{
					'font-size':	'9vw'
				}
			}
		], '', '', function () {
			L2P.countdown(3, null, L2P_global.lang.game_measuring_quiet, '', function () {
				setTimeout(function () {
					tuner.noiseCount		= 0;
					tuner.noiseThreshold	= -Infinity;
					tuner.maxPeaks			= 0;
				}, 1000);

				L2P.countdown(0, [
					{
						text:	L2P_global.lang.game_measuring_shh,
						sec:	2,
						type:	'long'
					},
					{
						text:	L2P_global.lang.game_measuring_done,
						sec:	2,
						type:	'long',
						css:	{
							'font-size':	L2P_global.lang.game_measuring_done.length <= 15 ? '12vw' : '7.5vw'
						}
					}
				], '', '', function () {
					tuner.$tuner.trigger('noise_ok', []);
				});
			});
		})
	};
	Tuner.prototype.getPitch	= function (freq) {
		var	tuner	= this,
			diff	= Infinity,
			key,
			minDiff	= Infinity,
			tone,
			toneFound;

		for (key in frequencies) {
			if (!__hasProp.call(frequencies, key)) continue;

			tone = frequencies[key];
			if (Math.abs(freq - tone.hz) < minDiff) {
				minDiff		= Math.abs(freq - tone.hz);
				diff		= freq - tone.hz;
				toneFound	= tone;
			}
		}
		return [toneFound, diff];
	};

	return Tuner;
});
define('compass',['jquery', 'game/options', 'l2p'], function ($, options, L2P) {
	function Compass($box) {
		var existing	= $box.data('l2p-compass');
		if(existing) {
			return existing;
		} else {
			$box.data('l2p-compass', this);
		}

		this.toneBefore;
		this.tone;
		this.toneAfter;
		this.hz			= -1;
		this.$box		= $box;
		this.enabled	= true;

		this.$toneBefore	= this.$box.find('.ContentBoxGameCompass-tone-before');
		this.$tone			= this.$box.find('.ContentBoxGameCompass-tone-current');
		this.$toneAfter		= this.$box.find('.ContentBoxGameCompass-tone-after');
		this.$arrow			= this.$box.find('.ContentBoxGameCompass-line');
	}
	Compass.prototype.setTone	= function (tone) {
		if(this.enabled && this.tone !== tone && tone) {
			this.tone		= tone;

			this.toneBefore	= L2P.funcs.tones.getClosestTone(tone, true);
			this.toneAfter	= L2P.funcs.tones.getClosestTone(tone, false);

			this.$toneBefore.text(this.toneBefore ? this.toneBefore.name : '');
			this.$tone.text(this.tone.name || '');
			this.$toneAfter.text(this.toneAfter.name || '');

			this.setFreq(this.tone.hz);
		}
	};
	Compass.prototype.setFreq	= function (hz) {
		if(this.enabled && this.hz !== hz && hz !== -1) {
			this.hz	= hz;
			var	toneDiff	= L2P.funcs.tones.freqDiffToTone(this.tone, hz, 0),
				ratio1		= toneDiff.ratio > 0 ? Math.min(toneDiff.ratio, 1) : Math.max(toneDiff.ratio, -1),
				arrowPos	= 50 + 50 * -ratio1;

			this.$arrow.css('margin-left', arrowPos+'%');
		}
	};
	Compass.prototype.enable	= function () {
		this.enabled	= true;

		this.$box.removeClass('disabled');
	};
	Compass.prototype.disable	= function () {
		this.enabled	= false;

		this.$box.addClass('disabled');
	};

	return Compass;
});
//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
define("underscore-min", function(){});

define('playlist',['jquery', 'l2p', 'api', 'fM'], function ($, L2P, api, fM) {
	function Playlist(options, id, name) {
		var	that		= this;
		this.$this		= $(this);
		this.id			= id || Date.now();
		this.name		= name;
		this.games		= [];
		this.options	= $.extend({
			mode:	'countdown',
			loop:	0
		}, options);

		this.firstPlay	= true;
		this.playing	= false;
		this.playNow	= -1;
		this.loop		= -1;
		this.game_history_ids	= [];
		this.gameController;

		this.storage	= new L2P.storage('PlayList');
		this.storage.$this.on('update', function (e, name) {
			if(name === that.id) {
				that.load(true);
			}
		});
		this.load(false, name);
	}
	Playlist.prototype.load			= function (doReload, name) {
		var	that	= this,
			info	= this.storage.get(this.id, doReload);

		if(!info && !name) {
			api.get.lang(function (lang) {
				that.name	= lang.browse_my_playlist;
				that.games	= [];

				that.$this.trigger('update', []);
			}, ['browse_my_playlist']);
		} else {
			if(info) {
				this.name	= name || info.name;
				this.games	= info.games;
				if(name) {
					this.save();
				}
			} else {
				this.name	= name || '';
				this.games	= [];
			}
			this.$this.trigger('update', []);
		}
	};
	Playlist.prototype.save			= function () {
		if(this.games.length === 0) {
			this.storage.set(this.id, null);
		} else {
			this.storage.set(this.id, {
				name:	this.name,
				games:	this.games
			});
		}
		this.$this.trigger('update', []);
	};
	Playlist.prototype.addGame		= function (url, title) {
		var	game	= {url: url, title: title},
			i		= this.games.push(game);

		this.save();
		this.$this.trigger('add game', [game, i]);
		this.$this.trigger('addgame', [game, i]);
	};
	Playlist.prototype.removeGame	= function (game) {
		var	i	= this.games.indexOf(game),
			game;
		if(i !== -1) {
			game	= this.games.splice(i, 1);

			this.save();
			this.$this.trigger('remove game', [game, i]);
		}
	};
	Playlist.prototype.start		= function () {
		this.game_history_ids	= [];
		this.loop				= -1;
		this.restart();
	};
	Playlist.prototype.restart		= function () {
		this.playing			= true;
		this.playNow			= -1;
		this.loop				+= 1;
		this.nextGame();
	};
	Playlist.prototype.startGame	= function (game) {
		var	that		= this,
			linkObject	= {
				title:			game.title,
				from_playlist:	true,
				autostart:		!this.firstPlay,
				use_countdown:	this.options.mode === 'countdown'
			};

		if(!this.gameController) {
			linkObject.onstart	= 'gameStart-'+Date.now();
			$(L2P).on(linkObject.onstart, function (e, gameController) {
				// console.log(that, 'got new gameController');
				that.gameController	= gameController;

				$(that.gameController).on('gameEnd', function (e, gameInfo) {
					// console.log('gameEnd', gameInfo.points, gameInfo);
					that.game_history_ids.push(gameInfo.game_history_id);
					that.nextGame();
				});
			});
		}
		fM.link.navigate(game.url, game.title, linkObject);
	};
	Playlist.prototype.nextGame		= function () {
		this.playNow	+= 1;
		var	game	= this.games[this.playNow];
		// console.log('nextGame', game, this.playNow, this.games);
		if(game) {
			this.startGame(game);
			this.firstPlay	= false;
		} else {
			this.playNow	= -1;
			this.playing	= false;
			this.firstPlay	= true;

			if(this.options.loop === -1 || this.loop < this.options.loop) {
				this.firstPlay	= false;
				this.restart();
			} else {
				// console.log('playlist done', this.game_history_ids, this);
				api.get.statistic_uuid(function (data) {
					fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
				}, {
					game_history_ids:	this.game_history_ids.join(',')
				});
			}
		}
	};
	Playlist.prototype.clear		= function () {
		this.games	= [];
		this.storage.set(this.id, this.games);

		this.save();
		this.$this.trigger('clear', []);
	};

	return Playlist;
});
/* ===========================================================
# bootstrap-tour - v0.5.1
# http://bootstraptour.com
# ==============================================================
# Copyright 2012-2013 Ulrich Sossou
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
(function() {
  (function($, window) {
    var Tour, document;
    document = window.document;
    Tour = (function() {
      function Tour(options) {
        this._options = $.extend({
          name: 'tour',
          container: 'body',
          keyboard: true,
          storage: window.localStorage,
          debug: false,
          backdrop: false,
          redirect: true,
          basePath: '',
          template: "<div class='popover tour'>          <div class='arrow'></div>          <h3 class='popover-title'></h3>          <div class='popover-content'></div>          <nav class='popover-navigation'>            <div class='btn-group'>              <button class='btn btn-default' data-role='prev'>&laquo; Prev</button>              <button class='btn btn-default' data-role='next'>Next &raquo;</button>            </div>            <button class='btn btn-default' data-role='end'>End tour</button>          </nav>        </div>",
          afterSetState: function(key, value) {},
          afterGetState: function(key, value) {},
          afterRemoveState: function(key) {},
          onStart: function(tour) {},
          onEnd: function(tour) {},
          onShow: function(tour) {},
          onShown: function(tour) {},
          onHide: function(tour) {},
          onHidden: function(tour) {},
          onNext: function(tour) {},
          onPrev: function(tour) {}
        }, options);
        this._steps = [];
        this.setCurrentStep();
        this.backdrop = {
          overlay: null,
          step: null,
          background: null
        };
      }

      Tour.prototype.setState = function(key, value) {
        var keyName;
        keyName = "" + this._options.name + "_" + key;
        this._options.storage.setItem(keyName, value);
        return this._options.afterSetState(keyName, value);
      };

      Tour.prototype.removeState = function(key) {
        var keyName;
        keyName = "" + this._options.name + "_" + key;
        this._options.storage.removeItem(keyName);
        return this._options.afterRemoveState(keyName);
      };

      Tour.prototype.getState = function(key) {
        var keyName, value;
        keyName = "" + this._options.name + "_" + key;
        value = this._options.storage.getItem(keyName);
        if (value === void 0 || value === "null") {
          value = null;
        }
        this._options.afterGetState(key, value);
        return value;
      };

      Tour.prototype.addSteps = function(steps) {
        var step, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = steps.length; _i < _len; _i++) {
          step = steps[_i];
          _results.push(this.addStep(step));
        }
        return _results;
      };

      Tour.prototype.addStep = function(step) {
        return this._steps.push(step);
      };

      Tour.prototype.getStep = function(i) {
        if (this._steps[i] != null) {
          return $.extend({
            id: "step-" + i,
            path: "",
            placement: "right",
            title: "",
            content: "<p></p>",
            next: i === this._steps.length - 1 ? -1 : i + 1,
            prev: i - 1,
            animation: true,
            container: this._options.container,
            backdrop: this._options.backdrop,
            redirect: this._options.redirect,
            template: this._options.template,
            onShow: this._options.onShow,
            onShown: this._options.onShown,
            onHide: this._options.onHide,
            onHidden: this._options.onHidden,
            onNext: this._options.onNext,
            onPrev: this._options.onPrev
          }, this._steps[i]);
        }
      };

      Tour.prototype.start = function(force) {
        var promise,
          _this = this;
        if (force == null) {
          force = false;
        }
        if (this.ended() && !force) {
          return this._debug("Tour ended, start prevented.");
        }
        $(document).off("click.bootstrap-tour", ".popover *[data-role=next]").on("click.bootstrap-tour", ".popover *[data-role=next]:not(.disabled)", function(e) {
          e.preventDefault();
          return _this.next();
        });
        $(document).off("click.bootstrap-tour", ".popover *[data-role=prev]").on("click.bootstrap-tour", ".popover *[data-role=prev]:not(.disabled)", function(e) {
          e.preventDefault();
          return _this.prev();
        });
        $(document).off("click.bootstrap-tour", ".popover *[data-role=end]").on("click.bootstrap-tour", ".popover *[data-role=end]", function(e) {
          e.preventDefault();
          return _this.end();
        });
        this._onResize(function() {
          return _this.showStep(_this._current);
        });
        this._setupKeyboardNavigation();
        promise = this._makePromise(this._options.onStart != null ? this._options.onStart(this) : void 0);
        return this._callOnPromiseDone(promise, this.showStep, this._current);
      };

      Tour.prototype.next = function() {
        var promise;
        if (this.ended()) {
          return this._debug("Tour ended, next prevented.");
        }
        promise = this.hideStep(this._current);
        return this._callOnPromiseDone(promise, this._showNextStep);
      };

      Tour.prototype.prev = function() {
        var promise;
        if (this.ended()) {
          return this._debug("Tour ended, prev prevented.");
        }
        promise = this.hideStep(this._current);
        return this._callOnPromiseDone(promise, this._showPrevStep);
      };

      Tour.prototype.goto = function(i) {
        var promise;
        if (this.ended()) {
          return this._debug("Tour ended, goto prevented.");
        }
        promise = this.hideStep(this._current);
        return this._callOnPromiseDone(promise, this.showStep, i);
      };

      Tour.prototype.end = function() {
        var endHelper, hidePromise,
          _this = this;
        endHelper = function(e) {
          $(document).off("click.bootstrap-tour");
          $(document).off("keyup.bootstrap-tour");
          $(window).off("resize.bootstrap-tour");
          _this.setState("end", "yes");
          if (_this._options.onEnd != null) {
            return _this._options.onEnd(_this);
          }
        };
        hidePromise = this.hideStep(this._current);
        return this._callOnPromiseDone(hidePromise, endHelper);
      };

      Tour.prototype.ended = function() {
        return !!this.getState("end");
      };

      Tour.prototype.restart = function() {
        this.removeState("current_step");
        this.removeState("end");
        this.setCurrentStep(0);
        return this.start();
      };

      Tour.prototype.hideStep = function(i) {
        var hideStepHelper, promise, step,
          _this = this;
        step = this.getStep(i);
        promise = this._makePromise((step.onHide != null ? step.onHide(this, i) : void 0));
        hideStepHelper = function(e) {
          var $element;
          $element = $(step.element).popover("destroy");
          if (step.reflex) {
            $element.css("cursor", "").off("click.bootstrap-tour");
          }
          if (step.backdrop) {
            _this._hideBackdrop();
          }
          if (step.onHidden != null) {
            return step.onHidden(_this);
          }
        };
        this._callOnPromiseDone(promise, hideStepHelper);
        return promise;
      };

      Tour.prototype.showStep = function(i) {
        var promise, showStepHelper, step,
          _this = this;
        step = this.getStep(i);
        if (!step) {
          return;
        }
        promise = this._makePromise((step.onShow != null ? step.onShow(this, i) : void 0));
        showStepHelper = function(e) {
          var current_path, path;
          _this.setCurrentStep(i);
          path = $.isFunction(step.path) ? step.path.call() : _this._options.basePath + step.path;
          current_path = [document.location.pathname, document.location.hash].join('');
          if (_this._isRedirect(path, current_path)) {
            _this._redirect(step, path);
            return;
          }
          if (!((step.element != null) && $(step.element).length !== 0 && $(step.element).is(":visible"))) {
            _this._debug("Skip the step " + (_this._current + 1) + ". The element does not exist or is not visible.");
            _this._showNextStep();
            return;
          }
          if (step.backdrop) {
            _this._showBackdrop(step);
          }
          _this._showPopover(step, i);
          if (step.onShown != null) {
            step.onShown(_this);
          }
          return _this._debug("Step " + (_this._current + 1) + " of " + _this._steps.length);
        };
        return this._callOnPromiseDone(promise, showStepHelper);
      };

      Tour.prototype.setCurrentStep = function(value) {
        if (value != null) {
          this._current = value;
          return this.setState("current_step", value);
        } else {
          this._current = this.getState("current_step");
          if (this._current === null) {
            return this._current = 0;
          } else {
            return this._current = parseInt(this._current);
          }
        }
      };

      Tour.prototype._showNextStep = function() {
        var promise, showNextStepHelper, step,
          _this = this;
        step = this.getStep(this._current);
        showNextStepHelper = function(e) {
          return _this.showStep(step.next);
        };
        promise = this._makePromise((step.onNext != null ? step.onNext(this) : void 0));
        return this._callOnPromiseDone(promise, showNextStepHelper);
      };

      Tour.prototype._showPrevStep = function() {
        var promise, showPrevStepHelper, step,
          _this = this;
        step = this.getStep(this._current);
        showPrevStepHelper = function(e) {
          return _this.showStep(step.prev);
        };
        promise = this._makePromise((step.onPrev != null ? step.onPrev(this) : void 0));
        return this._callOnPromiseDone(promise, showPrevStepHelper);
      };

      Tour.prototype._debug = function(text) {
        if (this._options.debug) {
          return window.console.log("Bootstrap Tour '" + this._options.name + "' | " + text);
        }
      };

      Tour.prototype._isRedirect = function(path, currentPath) {
        return (path != null) && path !== "" && path.replace(/\?.*$/, "").replace(/\/?$/, "") !== currentPath.replace(/\/?$/, "");
      };

      Tour.prototype._redirect = function(step, path) {
        if ($.isFunction(step.redirect)) {
          return step.redirect.call(this, path);
        } else if (step.redirect === true) {
          this._debug("Redirect to " + path);
          return document.location.href = path;
        }
      };

      Tour.prototype._renderNavigation = function(step, i, options) {
        var navigation, template;
        template = $.isFunction(step.template) ? $(step.template(i, step)) : $(step.template);
        navigation = template.find(".popover-navigation");
        if (step.prev < 0) {
          navigation.find("*[data-role=prev]").addClass("disabled");
        }
        if (step.next < 0) {
          navigation.find("*[data-role=next]").addClass("disabled");
        }
        return template.clone().wrap("<div>").parent().html();
      };

      Tour.prototype._showPopover = function(step, i) {
        var $element, $tip, options, rendered,
          _this = this;
        options = $.extend({}, this._options);
        if (step.options) {
          $.extend(options, step.options);
        }
        if (step.reflex) {
          $(step.element).css("cursor", "pointer").on("click.bootstrap-tour", function(e) {
            if (_this._current < _this._steps.length - 1) {
              return _this.next();
            } else {
              return _this.end();
            }
          });
        }
        rendered = this._renderNavigation(step, i, options);
        $element = $(step.element);
        $element.popover({
          placement: step.placement,
          trigger: "manual",
          title: step.title,
          content: step.content,
          html: true,
          animation: step.animation,
          container: step.container,
          template: rendered,
          selector: step.element
        }).popover("show");
        $tip = $element.data("bs.popover") ? $element.data("bs.popover").tip() : $element.data("popover").tip();
        $tip.attr("id", step.id);
        this._scrollIntoView($element);
        this._scrollIntoView($tip);
        return this._reposition($tip, step);
      };

      Tour.prototype._reposition = function(tip, step) {
        var offsetBottom, offsetRight, original_left, original_offsetHeight, original_offsetWidth, original_top, tipOffset;
        original_offsetWidth = tip[0].offsetWidth;
        original_offsetHeight = tip[0].offsetHeight;
        tipOffset = tip.offset();
        original_left = tipOffset.left;
        original_top = tipOffset.top;
        offsetBottom = $(document).outerHeight() - tipOffset.top - $(tip).outerHeight();
        if (offsetBottom < 0) {
          tipOffset.top = tipOffset.top + offsetBottom;
        }
        offsetRight = $("html").outerWidth() - tipOffset.left - $(tip).outerWidth();
        if (offsetRight < 0) {
          tipOffset.left = tipOffset.left + offsetRight;
        }
        if (tipOffset.top < 0) {
          tipOffset.top = 0;
        }
        if (tipOffset.left < 0) {
          tipOffset.left = 0;
        }
        tip.offset(tipOffset);
        if (step.placement === 'bottom' || step.placement === 'top') {
          if (original_left !== tipOffset.left) {
            return this._replaceArrow(tip, (tipOffset.left - original_left) * 2, original_offsetWidth, 'left');
          }
        } else {
          if (original_top !== tipOffset.top) {
            return this._replaceArrow(tip, (tipOffset.top - original_top) * 2, original_offsetHeight, 'top');
          }
        }
      };

      Tour.prototype._replaceArrow = function(tip, delta, dimension, position) {
        return tip.find(".arrow").css(position, delta ? 50 * (1 - delta / dimension) + "%" : '');
      };

      Tour.prototype._scrollIntoView = function(tip) {
        var tipRect;
        tipRect = tip.get(0).getBoundingClientRect();
        if (!(tipRect.top >= 0 && tipRect.bottom < $(window).height() && tipRect.left >= 0 && tipRect.right < $(window).width())) {
          return tip.get(0).scrollIntoView(true);
        }
      };

      Tour.prototype._onResize = function(callback, timeout) {
        return $(window).on("resize.bootstrap-tour", function() {
          clearTimeout(timeout);
          return timeout = setTimeout(callback, 100);
        });
      };

      Tour.prototype._setupKeyboardNavigation = function() {
        var _this = this;
        if (this._options.keyboard) {
          return $(document).on("keyup.bootstrap-tour", function(e) {
            if (!e.which) {
              return;
            }
            switch (e.which) {
              case 39:
                e.preventDefault();
                if (_this._current < _this._steps.length - 1) {
                  return _this.next();
                } else {
                  return _this.end();
                }
                break;
              case 37:
                e.preventDefault();
                if (_this._current > 0) {
                  return _this.prev();
                }
                break;
              case 27:
                e.preventDefault();
                return _this.end();
            }
          });
        }
      };

      Tour.prototype._makePromise = function(result) {
        if (result && $.isFunction(result.then)) {
          return result;
        } else {
          return null;
        }
      };

      Tour.prototype._callOnPromiseDone = function(promise, cb, arg) {
        var _this = this;
        if (promise) {
          return promise.then(function(e) {
            return cb.call(_this, arg);
          });
        } else {
          return cb.call(this, arg);
        }
      };

      Tour.prototype._showBackdrop = function(step) {
        if (this.backdrop.overlay !== null) {
          return;
        }
        this._showOverlay(step);
        return this._showOverlayElement(step);
      };

      Tour.prototype._hideBackdrop = function() {
        if (this.backdrop.overlay === null) {
          return;
        }
        this._hideOverlayElement();
        return this._hideOverlay();
      };

      Tour.prototype._showOverlay = function(step) {
        this.backdrop = $('<div/>');
        this.backdrop.addClass('tour-backdrop');
        if(step.container !== 'body') {
			this.backdrop.addClass('tour-backdrop-modal');
        }
        this.backdrop.height(step.container !== 'body' ? $(step.container).innerHeight() : $(document).innerHeight());
		this.backdrop.appendTo(step.container || 'body');

        return;
      };

      Tour.prototype._hideOverlay = function() {
        this.backdrop.remove();
        return this.backdrop.overlay = null;
      };

      Tour.prototype._showOverlayElement = function(step) {
        var background, offset, $step;
        $step = $(step.element);
        offset = $step.offset();
        offset.top = offset.top;
        offset.left = offset.left;
        background = $('<div/>');
        background.width($step.innerWidth()).height($step.innerHeight()).addClass('tour-step-background').offset(offset);
        $step.addClass('tour-step-backdrop');
        //$(step.container || 'body').append(background);
        this.backdrop.step = $step;
        return this.backdrop.background = background;
      };

      Tour.prototype._hideOverlayElement = function() {
        this.backdrop.step.removeClass('tour-step-backdrop');
        this.backdrop.background.remove();
        this.backdrop.step = null;
        return this.backdrop.background = null;
      };

      return Tour;

    })();
    return window.Tour = Tour;
  })(jQuery, window);

}).call(this);

define("tour", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Tour;
    };
}(this)));

define('l2p',['jquery', 'api', 'game/options', 'facebook', 'bootstrap'], function ($, api, options) {
	function goBack(e, doGoBack) {
		if(doGoBack !== false) {
			window.history.back();
		}
	}
	function getAjax(urlAjax, data, callback) {
		if(data) {
			$.post(urlAjax, data, callback);
		} else {
			$.get(urlAjax, callback);
		}
	}

	function FBAuth(response) {
		// console.log('fbAuth', response);
		fbUser	= response;
		if(response.status === 'connected') {
			if(+response.authResponse.userID !== L2P_global.fb_id) {
				var hasTriedAutologin	= sessionStorage.getItem('l2p_fb_autologin');
				if(hasTriedAutologin !== 'true') {
					require(['fM'], function (fM) {
						FB.api('/me', function (user) {
							// console.log('tryLogin', user);
							fM.link.navigate('/user/create/', 'Magic-Tune', {
								title:	'Magic-Tune',
								data:	{
									mode:			'login',
									type:			'fb',
									user:			user,
									accessToken:	fbUser.authResponse.accessToken
								}
							});
						});
					});
				} else {
					// console.log('skipped autologin');
				}

				sessionStorage.setItem('l2p_fb_autologin', 'true');
			} else {
				FB.api('/me', function (user) {
					// console.log('logged in', user);
				});
			}
		}

		FB.Event.subscribe('auth.authResponseChange', FBAuth);
	}

	FB.init({
    	appId      : '178214939022167',
    	channelUrl : '//magic-tune.com/channel.php',
    	status:		true,
    	cookie:		true
  	});
  	FB.getLoginStatus(FBAuth);

	var	gameController,
		svgContainer,
		tuner,
		sound,
		playlist,
		socket,
		$controller,
		$toggleGame,
		tour,
		fbUser	= {};

	function Render($container, loader, render, kill) {
		this.$container	= $container;
		this.loader		= loader;
		this.render		= render;
		this.kill		= kill;
		this.updates	= [];

		this.loader.call(this);
	}
	Render.prototype.reload	= function () {
		var	render	= this;
		this.render.call(this);
		this.updates.forEach(function (update) {
			update.call(render);
		});
	};
	Render.prototype.kill	= function () {
		this.kill.call(this);
	};
	Render.prototype.onUpdate	= function (func) {
		this.updates.push(func);
	};

	function ControllerSet(type) {
		if($toggleGame === undefined) {
			if($controller === undefined) {
				$controller	= $('.ContentBoxGameControl');
			}
			$toggleGame	= $controller.find('td[data-action="toggle-game"]');
		}
		if(type === 'play') {
			$toggleGame.removeClass('can_pause');
		} else if(type === 'restart') {
			$toggleGame.removeClass('can_pause');
		} else if(type === 'pause') {
			$toggleGame.addClass('can_pause');
		}
	}

	var	L2P	= {
		$modal:	undefined,
		gameController:	undefined,
		dialog:	{
			action:	function (url, title, html, color, submitText, script) {
				var	requireScripts	= ['fM', 'text!templates/modal.html'];
				if(script) {
					requireScripts.push('dialog/action/'+script);
				}
				require(requireScripts, function (fM, modalText, infoScript) {
					L2P.$modal	= $(modalText).addClass('modal-action');
					L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
					L2P.$modal.find('.modal-body').html(html);
					if(submitText === '') {
						L2P.$modal.find('.modal-footer button.btn-primary').remove();
					} else {
						L2P.$modal.find('.modal-footer button.btn-primary').html(submitText);
					}
					L2P.$modal.find('button.btn[data-dismiss]').text(L2P_global.lang.global_button_close);

					FB.XFBML.parse(L2P.$modal.find('.modal-body')[0]);

					var	action	= url || document.location.pathname;
					if(location.search.substring(1) !== '')
					{
						action += "?" + location.search.substring(1);
					}

					L2P.$modal.attr('action', action).attr('method', 'post');

					function onSubmit(e) {
						e.preventDefault();

						var	data	= fM.form.getElements.call(this);

						L2P.$modal.off('hide.bs.modal');
						fM.link.navigate(L2P.$modal.attr('action'), 'Magic Tune', {
							title:	'Magic Tune',
							data:	data
						});
					}

					L2P.$modal
						.on('submit', onSubmit);

					var	pathname	= location.pathname;
					L2P.$modal
						.on('hide.bs.modal', function (e) {
							if(!$(e.target).hasClass('tour-step-backdrop')) {
								fM.link.navigate('/');
							}
						})
						.on('shown.bs.modal', function (e) {
							$('.modal-backdrop').on('click', function (e) {
								L2P.$modal.modal('hide');
							});
						});

					fM.form.autofocus(L2P.$modal);

					fM.link.navigated(url, title, {
						is_dialog:	true
					});
					var	parent	= fM.link.getParent();
					if(parent && parent.is_dialog) {
						L2P.$modal
							.find('.modal-header-back-icon')
								.addClass('modal-header-back-icon--clickable')
								.on('click', function () {
									window.history.back();
								});
					}

					L2P.$modal.modal('show');

					L2P.form.inputValidation.error();
					if(infoScript) {
						infoScript(L2P.$modal);
					}

					if(tour && tour.tour) {
						tour.tour.next();
					}
				});
			},
			info: function (url, title, html, color, buttons, script) {
				var	requireScripts	= ['fM', 'text!templates/info.html'];
				if(script) {
					requireScripts.push('dialog/info/'+script);
				}
				require(requireScripts, function (fM, modalText, infoScript) {
					L2P.$modal	= $(modalText).addClass('modal-info');
					L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
					L2P.$modal.find('.modal-body').html(html);
					var	$modalFooter	= L2P.$modal.find('.modal-footer');
					if(buttons) {
						buttons.forEach(function (button) {
							$modalFooter.prepend('<button class="btn btn-default">'+button+'</button>');
						});
					}
					L2P.$modal.find('button.btn[data-dismiss]').text(L2P_global.lang.global_button_close);

					var	pathname	= location.pathname;

					fM.link.navigated(url, title, {
						is_dialog:	true
					});

					var	current	= fM.link.getCurrent();
					L2P.$modal
						.on('hide.bs.modal', function (e) {
							L2P.$modal.off('hide.bs.modal');

							if(!$(e.target).hasClass('tour-step-backdrop')) {
								fM.link.navigate('/');
							}
						})
						.on('shown.bs.modal', function (e) {
							$('.modal-backdrop').on('click', function (e) {
								L2P.$modal.modal('hide');
							});
						});

					var	parent	= fM.link.getParent();
					if(parent && parent.is_dialog) {
						L2P.$modal
							.find('.modal-header-back-icon')
								.addClass('modal-header-back-icon--clickable')
								.on('click', function () {
									window.history.back();
								});
					}

					L2P.$modal.modal('show');

					if(infoScript) {
						infoScript(L2P.$modal);
					}
					if(tour && tour.tour) {
						tour.tour.next();
					}
				});
			},
			game: function (url, title, data, type, octave, callback) {
				var	$body_container	= $('body'),
					$game_container	= $('#game_container'),
					then;

				require(['fM', 'text!templates/game.html', 'game/game-controller', 'game/sound', 'sound-input', 'compass', 'underscore-min'], function (fM, gameText, GameController, Sound, SoundInput, Compass) {
					var	generate	= !L2P.gameController,
						$compassBox	= $('div.ContentBoxGameCompass'),
						compass		= new Compass($compassBox),
						state		= fM.link.getCurrentNavigate() || {},
						urlItems	= (url || location.href).split('/'),
						fingerpos	= urlItems.length >= 5 ? (/[0-9]+/.test(urlItems[4]) ? +/[0-9]+/.exec(urlItems[4])[0] : null) : null;

					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));

					state.is_game	= true;

					if(generate) {
						$game_container.html(gameText);
					}
					$body_container.addClass('ShowGame');
					$body_container.addClass(type);
					$body_container.removeClass(type === 'song' ? 'scale' : 'song');

					svgContainer	= $game_container.find('#svg_container')[0];
					if($controller === undefined) {
						$controller	= $('.ContentBoxGameControl');
					}
					if($toggleGame === undefined) {
						$toggleGame	= $controller.find('td[data-action="toggle-game"]');
					}
					var	$speed		= $controller.find('input[name="bpm"]'),
						$speedShow	= $game_container.find('#speedShow'),
						$startGame	= $game_container.find('#startGame'),
						$stopGame	= $game_container.find('#stopGame'),
						$game_title	= type === 'song' ? $('#song_title') : $('#scale_title');

					$game_title.html(title);

					if(generate) {
						if(!sound) {
							sound	= new Sound();
						}

						L2P.gameController			= new GameController(svgContainer);
						L2P.gameController.sound	= sound;
					}

					L2P.gameController.isEdit	= false;

					compass.setTone(options.tones.names[4]['A']);
					compass.enable();
					L2P.gameController.compass	= compass;

					$speed.on('change', function () {
						L2P.gameController.setGameSpeed(+this.value);
					});
					if(generate) {
						$(L2P.gameController).on({
							gameLoadSpeedChange:	function (e, speed) {
								$speed.val(speed).trigger('change');
							},
							gameStart:	function () {},
							gameEnd:	function (e, gameInfo) {
								var	currentState	= fM.link.getCurrent() || {};

								if(!currentState || !currentState.from_playlist) {
									api.get.statistic_uuid(function (data) {
										fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
									}, {
										game_history_ids:	gameInfo.game_history_id
									});
								}
								ControllerSet('restart');
							},
							notePoints:	function (note) {

							}
						});

						$startGame.on('click', $.proxy(L2P.gameController.startGame, L2P.gameController));
						$stopGame.on('click', $.proxy(L2P.gameController.stopGame, L2P.gameController));
						$toggleGame.on('click', function (e) {
							if(L2P.gameController.game && !L2P.gameController.game.running) {
								L2P.gameController.startGame();

								ControllerSet('pause');
							} else {
								L2P.gameController.stopGame();

								ControllerSet('play');
							}
						});
					}

					ControllerSet('play');

					L2P.gameController.importGame(data, title, octave, fingerpos);
					if(url) {
						L2P.gameController.permlink	= url.match(/\/game\/([^\/]+)/g)[0].substr(6);
					} else {
						L2P.gameController.permlink	= location.href.match(/\/game\/([^\/]+)/g)[0].substr(6);
					}

					if(generate) {
						tuner	= new SoundInput(function (e) {
							// console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController), $.proxy(L2P.gameController.expectedTone, L2P.gameController));
						$(tuner).on('tick', $.proxy(L2P.gameController.soundInput, L2P.gameController));

						$(L2P).trigger('got_tuner', [tuner]);
					}

					state.is_game	= true;
					fM.link.navigated(url, title, state);

					if(state) {
						if(state.autostart) {
							L2P.gameController.useCountdown	= state.use_countdown || state.use_countdown === undefined;
							L2P.gameController.startGame();
						}
						if(state.onstart) {
							$(L2P).trigger(state.onstart, [L2P.gameController]);
						}
					}

					if(urlItems[3] === 'edit') {
						L2P.create();
					}

					if(callback) {
						callback(L2P.gameController);
					}
				});
			}
		},
		facebook:	{
			login:	function (callback) {
				FB.login(function (response) {
					fbUser	= response;
					callback(fbUser);
				}, {scope: 'email'});
			},
			api:	FB.api
		},
		form:	{
			inputValidation:	{
				error:	function (inputName) {
					$('input[data-content][data-content!=""]' + (inputName ? '[name="'+inputName+'"]' : '')).each(function () {
						var	that		= this,
							clientRects	= this.getClientRects();

						if(clientRects.length > 0) {
							var	placement	= (clientRects[0].right + 240) > document.width ? 'left' : 'right';

							$(this).popover({
								trigger:	'focus',
								placement:	placement,
								template:	'<div class="popover validation-error"><div class="arrow"></div><div class="popover-content"><p></p></div></div>'
							}).popover('show');
						} else { // We most sure have a dialog
							if(inputName === undefined) { // Only do this once
								setTimeout(function () {
									L2P.form.inputValidation.error(that.name);
								}, 200);
							}
						}
					});
				}
			}
		},
		resetBoxText:	function ($box) {
			$box.html($box.attr('data-default-text'));
		},
		navigate:	{
			home:	function (e) {
				var	$body_container		= $('body'),
					$CenteringContainer	= $('#CenteringContainer'),
					title				= $CenteringContainer.attr('data-default-title');

				require(['fM'], function (fM) {
					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));
					$body_container.removeClass('ShowGame');
					$body_container.removeClass('song');
					$body_container.removeClass('scale');

					fM.link.navigated('/', title, {
						title:	title
					});
				});

				if(tour && !tour.callback('/')) {
					tour.kill();
				} else if(tour && tour.tour) {
					tour.tour.next();
				}
			},
			guided_tour:	function (e) {
				var	$body_container		= $('body');

				L2P.resetBoxText($('#song_title'));
				L2P.resetBoxText($('#scale_title'));
				$body_container.removeClass('ShowGame');
				$body_container.removeClass('song');
				$body_container.removeClass('scale');

				L2P.guided_tour();
			},
			url:	function (url, data) {
				var	that	= this,
					urlAjax	= '/dialog'+url;

				require(['fM'], function (fM) {
					var	current	= fM.link.getCurrentNavigate();
					data	= data || current && current.data;

					getAjax(urlAjax, data, function (data) {
						switch(data.dialogType) {
							case 'action':
								if(tour && !tour.callback(url)) {
									tour.kill();
								}

								L2P.dialog.action(url, data.title, data.body, data.color, data.submitText, data.script);
								break;
							case 'info':
								if(tour && !tour.callback(url)) {
									tour.kill();
								}

								L2P.dialog.info(url, data.title, data.body, data.color, data.buttons, data.script);
								break;
							case 'game':
								if(tour && !tour.callback(url)) {
									tour.kill();
								}

								if(that && that.nodeName === 'IMG') {
									L2P.get.playlist(null, function () {
										playlist.addGame(url, data.title, data.data, data.type);
									});
								} else {
									L2P.dialog.game(url, data.title, data.data, data.type, data.octave);
								}
								break;
							case 'redirect':
								if(L2P_global.language_code !== data.user.language_code || data.force_reload) {
									location.href	= data.url;
									return;
								} else {
									var	concert_pitch	= L2P_global.concert_pitch !== data.user.concert_pitch;

									$.each(data.user, function (key, value) {
										L2P_global[key]	= value;
									});

									if(concert_pitch) {
										options.generateTones();
									}
								}
								fM.link.navigate(data.url, 'Magic Tune');
								break;
						}
					});
				});
			}
		},
		countdown: function (sec, text, next, illustration, callback, options) {
			var	$overlay	= $('#overlay').css('background-color', ''),
				$countdown	= $('<div class="countdown"></div>'),
				items		= [],
				delay		= 0,
				done		= false,
				countdown	= {
					kill:	function () {
						if(done) {
							return;
						}
						done	= true;
						$overlay
							.on('webkitAnimationEnd', function () {
								$countdown.remove();
							})
							.addClass('hide');
					},
					reload:	function () {
						$overlay
							.find('div.number')
								.removeClass('run')
						setTimeout(function () {
							$overlay
								.find('div.number')
									.addClass('run');
						}, 0);
					}
				};

			options	= options || {};

			if(options.background_color) {
				$overlay
					.css('background-color', options.background_color);
			}
			if(options.css) {
				$.each(options.css, function (name, value) {
					$countdown.css(name, value);
				});
			}
			if(options.classList && options.classList.length > 0) {
				options.classList.forEach(function (className) {
					$countdown.addClass(className);
				});
			}

			for(var i = sec; i > 0; i -= 1) {
				items.push({
					text:	i,
					sec:	1
				});
			}
			if($.isArray(text)) {
				items	= items.concat(text);
			} else if(text && text.text) {
				items.push(text);
			} else if(text) {
				items.push({
					text:	text,
					sec:	1
				});
			}

			items.forEach(function (item, i) {
				var	$elem;

				item.sec	= item.sec || 1;

				$elem	=
					$('<div class="number"></div>')
						.html(item.text)
						.css('-webkit-animation-delay', delay+'s')
						.css('-webkit-animation-duration', item.sec+'s')
						.css('-webkit-transition-delay', delay+'s')
						.css('-webkit-transition-duration', item.sec+'s')
						.appendTo($countdown);

				if(item.type) {
					$elem.addClass('countdown-type--'+item.type);
				}
				if(item.css) {
					$.each(item.css, function (name, value) {
						$elem.css(name, value);
					});
				}
				if(i === items.length - 1) {
					$elem.on('webkitAnimationEnd', function () {
						done	= true;
						if(!options.lazyHide || !callback) {
							$overlay.addClass('hide');
						}

						if(callback) {
							callback.call(countdown, function () {
								$overlay.addClass('hide');
							});
						}
					});
				}

				delay	+= item.sec;
			});

			if(next) {
				if(next.text) {
					var	$elem	=
						$('<div class="next"></div>')
							.text(next.text)
							.appendTo($countdown);
					if(next.css) {
						$.each(next.css, function (name, value) {
							$elem.css(name, value);
						});
					}
					if(next.classList) {
						next.classList.forEach(function (className) {
							$elem.addClass(className);
						});
					}
				} else {
					$('<div class="next"></div>')
						.text(next)
						.appendTo($countdown);
				}
			}
			if(options.bottom) {
				$('<div class="bottom"></div>')
					.html(options.bottom)
					.appendTo($countdown);
			}

			if(illustration) {
				$('<div class="illustration"></div>')
					.html(illustration)
					.appendTo($countdown);
			}

			$overlay
				.empty()
				.append($countdown)
				.removeClass('hide');

			countdown.reload();

			return countdown;
		},
		funcs:	{
			tones:	{
				freqDiffToTone: function (tone, freq, rel) {
					var	diff		= tone.hz - freq,
						diffAbs		= Math.abs(diff),
						otherTone,
						toneDiffs,
						ratio,
						ratioRel;

					otherTone	= L2P.funcs.tones.getClosestTone(tone, diff < 0);

					toneDiffs	= Math.abs(otherTone.hz - tone.hz),
					ratio		= diff / toneDiffs,
					ratioRel	= (diffAbs - rel) / (toneDiffs - rel);

					return {
						toneAbove:	diff < 0,
						diff:		diff,
						diffAbs:	diffAbs,
						otherTone:	otherTone,
						toneDiffs:	toneDiffs,
						ratio:		ratio,
						ratioRel:	ratioRel
					}
				},
				getClosestTone:	function (tone, higher) {
					var	pos	= options.tones.all.indexOf(tone),
						t;

					if(higher) {
						t	= options.tones.all[pos - 1];
						if(t) {
							if(t.hz === tone.hz) {
								t	= options.tones.all[pos - 2]
							}
						} else {
							t	= tone;
						}
					} else {
						t	= options.tones.all[pos + 1];
						if(t) {
							if(t.hz === tone.hz) {
								t	= options.tones.all[pos + 2]
							}
						} else {
							t	= tone;
						}
					}

					return t;
				},
				getCloseTone:	function (freq, defTone, tone) {
					var	octav, tempTone, diff, closestTone, closestDiff, closestFreq, newTone, newFreq, octavDiff, defToneType, defTonePos, defToneClose;

					if(defTone && tone && defTone.name !== tone.name && defTone.name.length === 2) {
						defToneType	= defTone.name.substr(1, 1);
						defTonePos	= options.tones.all.indexOf(defTone);

						if(defToneType === '#') {
							defToneClose	= options.tones.all[defTonePos + 1];
						} else if(defToneType === 'b') {
							defToneClose	= options.tones.all[defTonePos - 1];
						}

						if(defToneClose.name === tone.name) {
							defTone	= defToneClose;
						}
					}

					for(octav = 3; octav <= 6; octav += 1) {
						tempTone	= options.tones.names[octav][tone.name];
						if(tempTone) {
							diff	= Math.abs(tempTone.hz - freq);
							if(closestDiff === undefined || diff < closestDiff) {
								closestDiff	= diff;
								closestTone	= tempTone;
							}
						}
					}

					if(closestTone && defTone) {
						octavDiff	= tone.octav - closestTone.octav;
						if(options.tones.names[defTone.octav + octavDiff] === undefined) {
							console.error('TONE NOT FOUND', defTone.octav, octavDiff, defTone.octav + octavDiff);
						}
						newTone	= options.tones.names[defTone.octav + octavDiff][defTone.name];
						newFreq	= freq * Math.pow(2, octavDiff)
					}

					return {
						tone:	newTone || defTone,
						freq:	newFreq || freq
					}
				},
				getStepFactor:	function (percent) {
					var	stepFactor;
					L2P.steps.forEach(function (step) {
						if(!stepFactor && percent >= step.percent) {
							stepFactor	= step;
						}
					});

					return stepFactor;
				}
			}
		},
		storage: (function () {
			var	containers	= {},
				lastPing	= 0;

			function ping() {
				var	namespaces	= [],
					namespace;
				for(namespace in containers) {
					if(containers.hasOwnProperty(namespace)) {
						namespaces.push(namespace);
					}
				}

				if(namespaces.length > 0) {
					$.get('/api/get.storage.php', {
						namespaces:	namespaces
					}, function (data) {
						var	name;
						for(namespace in data) {
							if(data.hasOwnProperty(namespace)) {
								for(name in data[namespace]) {
									containers[namespace][0][0].set(name, data[namespace][name], true);
								}
							}
						}
					});
				}
			}
			setInterval(ping, 2000);

			function Storage(namespace) {
				this.namespace	= namespace;
				this.$this		= $(this);
				this.reload();
			}
			Storage.prototype.reload	= function () {
				this._storage	= JSON.parse(localStorage.getItem(this.namespace) || '{}');
			};
			Storage.prototype.set		= function (name, value, fromPing) {
				var	that				= this;

				if(value === null) {
					delete this._storage[name];
				} else {
					this._storage[name]		= value;
				}

				if(fromPing && localStorage.getItem(this.namespace) === JSON.stringify(this._storage)) {
					return;
				}
				// console.log('save', fromPing, this._storage);
				localStorage.setItem(this.namespace, JSON.stringify(this._storage));

				containers[this.namespace].forEach(function ($storage, i) {
					if($storage !== that.$this || fromPing) {
						$storage[0].reload();
						$storage.trigger('update', [name]);
					}
				});

				if(!fromPing) {
					$.post('/api/save.storage.php', {
						namespace:	this.namespace,
						data:		this._storage
					});
				}

				return this;
			};
			Storage.prototype.get		= function (name, doReload) {
				if(doReload) {
					this.reload();
				}
				return this._storage[name];
			};
			Storage.prototype.getAll	= function (doReload) {
				if(doReload) {
					this.reload();
				}
				return this._storage;
			};

			var	storage	= (function (namespace) {
				var	storage				= new Storage(namespace),
					storageContainer	= containers[namespace] || [];

				storageContainer.push(storage.$this);

				containers[namespace]	= storageContainer;

				return storage;
			});

			return storage;
		}()),
		render:	{
			playlist:	function (playlist, $container) {
				return new Render($container, function () {
					var	that	= this,
						lang	= {};
					this.$container
						.html([
							'<div>',
								'<div></div>',
								'<table>',
									'<tbody>',
									'</tbody>',
								'</table>',
							'</div>',
							'<form class="form-inline" name="play_options">',
								'<label></label>',
								'<select name="loops"></select>',
							'</div>'
						].join(''));

					this.$tbody	= $container.find('tbody');
					this.$tbody.on('click', '.removeFromPlaylist', function () {
						var	$this	= $(this),
							game	= $this.parents('tr').data('game');

						if($this.parents('.tour-step-backdrop').length > 0) {
							return;
						}

						playlist.removeGame(game);
					});

					var	$loops	= this.$container.find('[name="loops"]');
					for(var loop_no = 1; loop_no <= 10; loop_no += 1) {
						$('<option></option>')
							.attr('value', loop_no)
							.text(loop_no)
							.appendTo($loops);
					}

					api.get.lang(function (lang) {
						that.lang			= lang;

						that.$container
							.find('form[name="play_options"] label').text(lang.browse_loops);

						that.render.call(that);
					}, ['global_delete', 'browse_loops']);

					that.reloadProxy	= $.proxy(that.reload, that);

					playlist.$this.on('update', this.reloadProxy);
				}, function () {
					var	that	= this;
					this.$tbody.empty();

					this.$container
						.find('div > div')
						.text(playlist.name);

					playlist.games.forEach(function (game) {
						var	urlInfo	= game.url.split('/'),
							octave	= urlInfo[3] || 0;
						$([
							'<tr>',
								'<td>',
									'<a data-dialog="game">',
										'<span class="octave"></span>',
										'<span class="title"></span>',
									'</a>',
								'</td>',
								'<td><img src="/img/icons/trash.svg" class="removeFromPlaylist" /></td>',
							'</tr>',
						].join(''))
						.data('game', game)
						.appendTo(that.$tbody)
						.find('a[data-dialog="game"]')
							.attr('href', game.url)
							.find('span.octave')
								.text(octave === 0 ? '' : '(Octave '+octave+') ')
								.end()
							.find('span.title')
								.text(game.title)
								.end()
							.end()
						.find('img.removeFromPlaylist')
							.attr('title', that.lang.global_delete)
							.end();
					});
				}, function () {
					playlist.$this.off('update', this.reloadProxy);
				});
			}
		},
		click:	{
			on:		function (e) {
				e.preventDefault();
				e.stopPropagation();
				var	$elem	= $(this),
					$item	= $elem.is('a') ? $elem : $elem.parents('a').first(),
					data	= $item.data(),
					is_add	= $elem.is('[data-action="add-to-playlist"]'),
					urlRaw	= $item.attr('href'),
					url		= urlRaw+(urlRaw.indexOf('?') === -1 ? (urlRaw.substr(urlRaw.length - 1, 1) === '/' ? '' : '/') : ''),
					title	= data.title,
					is_guided_tour_item	= $item.is('a[data-dialog="game"]') && ($item.is('.tour-step-backdrop') || $item.parents('.tour-step-backdrop').length > 0);

				if(is_add) {
					L2P.get.playlist(null, function () {
						playlist.addGame(url, title);
					});
				} else if(!is_guided_tour_item) {
					require(['fM'], function (fM) {
						fM.link.navigate(url, 'Magic Tune', {
							title:	'Magic Tune'
						});
					});
				}
			},
			set:	function ($container) {
				$container.on('click', 'a[data-dialog], [data-action="add-to-playlist"]', L2P.click.on);
			}
		},
		get:	{
			playlist:	function (id, callback, name) {
				require(['playlist'], function (Playlist) {
					if(!playlist || id) {
						if(id === 'new') {
							id	= undefined;
						} else if(!playlist) {
							var	playlists	= L2P.get.playlists();
							for(id in playlists) {
								break;
							}
						}
						playlist	= new Playlist({}, id, name);
					}

					callback(playlist);
				});
			},
			playlists:	function () {
				var	storage	= L2P.storage('PlayList');

				return storage.getAll(true);
			}
		},
		io:		function () {
			if(!socket) {
				socket	= io.connect('http://l2p.fmads.dk:10001');
			}

			return socket;
		},
		steps: [
			{
				percent:	95,
				factor:		1,
				text:		L2P_global.lang.game_grade_perfect,
				color:		'#090'
			},
			{
				percent:	80,
				factor:		0.95,
				text:		L2P_global.lang.game_grade_good,
				color:		'#0D0'
			},
			{
				percent:	60,
				factor:		0.9,
				text:		L2P_global.lang.game_grade_fair,
				color:		'#DD0'
			},
			{
				percent:	45,
				factor:		0.8,
				text:		L2P_global.lang.game_grade_average,
				color:		'#990'
			},
			{
				percent:	30,
				factor:		0.65,
				text:		L2P_global.lang.game_grade_poor,
				color:		'#F90'
			},
			{
				percent:	10,
				factor:		0.65,
				text:		L2P_global.lang.game_grade_rubbish,
				color:		'#C60'
			},
			{
				percent:	0,
				factor:		0.65,
				text:		L2P_global.lang.game_grade_miserable,
				color:		'#900'
			}
		],
		guided_tour:	function () {
			require(['fM', 'tour', 'json!lang/guided_tour.php'], function (fM, Tour, lang) {
				if(tour && tour.tour) {
					tour.tour.start();
					return;
				}
				tour	= (function () {
					var	empty		= function (url) {
							return url === '/guided_tour/';
						},
						controller	= {};

					function tourGame(tuner) {
						tuner.$tuner.one('noise_ok', function () {
							controller.tour.removeState('end');
							controller.tour.start(true);
						});
					}
					function tourGameTick(e, freq) {
						if(freq !== -1) {
							$(tuner).off('tick', tourGameTick);

							controller.tour.next();
						}
					}

					controller.callback	= empty;
					controller.kill		= function () {
						if(controller.tour) {
							controller.tour.end();
							controller.tour	= null;
						}
					};
					controller.tour		= new Tour({
						useLocalStorage:	true,
						container:			'body',
						debug:				true,
						labels:		{
							next:	'<button class="btn btn-primary">'+lang.tour_button_got_it+'</button>',
							prev:	'',
							end:	'<button class="btn btn-default">'+lang.tour_button_end_tour+'</button>',
						},
						keyboard:	false,
						template:	function (i, step) {
							if(step.labelsOff) {
								return [
									'<div class="popover tour">',
										'<div class="arrow"></div>',
										'<h3 class="popover-title"></h3>',
										'<div class="popover-content-box">',
											'<div class="popover-content"></div>',
											'<div class="popover-content-buttons">',
												'<button class="btn btn-default" data-role="end">'+lang.tour_button_end_tour+'</button>',
											'</div>',
										'</div>',
									'</div>'
								].join('');
							} else {
								return [
									'<div class="popover tour">',
										'<div class="arrow"></div>',
										'<h3 class="popover-title"></h3>',
										'<div class="popover-content-box">',
											'<div class="popover-content"></div>',
											'<div class="popover-content-buttons">',
												'<button class="btn btn-default" data-role="end">'+lang.tour_button_end_tour+'</button>',
												'<button class="btn btn-primary pull-right" data-role="next">'+lang.tour_button_got_it+'</button>',
											'</div>',
										'</div>',
									'</div>'
								].join('');
							}
						},
						onShow:		function (tour) {
							controller.callback	= empty;
						},
						onEnd:		function (tour) {
							if(empty(location.pathname)) {
								fM.link.navigate('/');
							}
						}
					});

					controller.tour.addStep({
						element:	'#guide',
						title:		lang.tour_0_0_title,
						content:	lang.tour_0_0,
						placement:	'bottom',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'a[href="/user/settings/"]',
						title:		lang.tour_1_0_title,
						content:	lang.tour_1_0,
						placement:	'left',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							controller.callback	= function (url) {
								if(url === '/user/settings/') {
									tour.hideStep(tour._current);

									return true;
								}
								return false;
							}
						}
					});

					(function (tour) {
						[null, 'concert_pitch', 'color_nodes', 'language', 'kiddie_mode', 'countdown_time', 'metronome', 'blind_mode'].forEach(function (name, i) {
							if(name) {
								tour.addStep({
									element:	'.modal-action.in table.FormTable [name="'+name+'"]',
									title:		lang['tour_1_'+i+'_title'],
									content:	lang['tour_1_'+i],
									placement:	'right',
									container:	'.modal-action.in',
									backdrop:	true
								});
							}
						});
					}(controller.tour));

					controller.tour.addStep({
						element:	'.modal-action.in .modal-footer .btn.btn-primary',
						title:		lang.tour_1_8_title,
						content:	lang.tour_1_8,
						placement:	'top',
						container:	'.modal-action.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							controller.callback	= function (url) {
								// console.log('callback test', url, url === '/');
								if(url === '/') {
									return true;
								}
								return false;
							}
						}
					});

					controller.tour.addStep({
						element:	'a[href="/browse/scales/position1/"]',
						title:		lang.tour_2_0_title,
						content:	lang.tour_2_0,
						placement:	'left',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							controller.callback	= function (url) {
								if(url === '/browse/scales/position1/') {
									tour.hideStep(tour._current);
									L2P.get.playlist('new', function (playlist) {
									}, lang.tour_0_0_title);

									return true;
								}
								return false;
							}
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #list a[href="/game/a-major/4/1"]',
						title:		lang.tour_2_1_title,
						content:	lang.tour_2_1,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							L2P.get.playlist(null, function (playlist) {
								playlist.$this.one('addgame', function () {
									controller.tour.next();
								});
							});
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #PlaylistContainer #PlaylistItems > div',
						title:		lang.tour_2_2_title,
						content:	lang.tour_2_2,
						placement:	'left',
						container:	'.modal-info.in',
						backdrop:	true,
						onShow:		function () {
							$('.modal-info.in #PlaylistContainer #PlaylistInfoContainerInner').addClass('tour-step-backdrop');
						},
						onHide:		function () {
							$('.modal-info.in #PlaylistContainer #PlaylistInfoContainerInner').removeClass('tour-step-backdrop');
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #info div[data-box="illustration"]',
						title:		lang.tour_2_3_title,
						content:	lang.tour_2_3,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'.modal-info.in #list a[href="/game/b-major/4/1"]',
						title:		lang.tour_2_4_title,
						content:	lang.tour_2_4,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							L2P.get.playlist(null, function (playlist) {
								playlist.$this.one('addgame', function () {
									controller.tour.next();
								});
							});
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #PlaylistContainer img.playPlaylist',
						title:		lang.tour_2_5_title,
						content:	lang.tour_2_5,
						placement:	'left',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							$('.modal-info.in #PlaylistItems [name="loops"]').val(1);
							controller.callback = function (url) {
								if(url === '/game/a-major/4/1/') {
									if(tuner) {
										controller.tour.next();
									} else {
										controller.tour.end();

										$(L2P).one('got_tuner', function (e, tuner) {
											tourGame(tuner);
										});
									}

									return true;
								}
								return false;
							};
						}
					});

					controller.tour.addStep({
						element:	'div.ContentBoxGameCompass',
						title:		lang.tour_4_0_title,
						content:	lang.tour_4_0,
						placement:	'right',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							var	current		= tour.current;
							setTimeout(function () {
								if(tour.current === current) {
									$('div.ContentBoxGameCompass')
										.data('bs.popover')
											.$tip
												.find('.popover-content span')
													.show();
								}
							}, 4000);

							$(tuner).on('tick', tourGameTick);
						}
					});

					controller.tour.addStep({
						element:	'div.ContentBoxGameCompass',
						title:		lang.tour_4_1_title,
						content:	lang.tour_4_1,
						placement:	'right',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'div.ContentBoxGameCompass',
						title:		lang.tour_5_0_title,
						content:	lang.tour_5_0,
						placement:	'right',
						backdrop:	true
					});

					controller.tour.removeState('end');
					controller.tour.setCurrentStep(0);
					controller.tour.start(true);

					return controller;
				}());
			});
		},
		create: function () {
			require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Note, options) {
				var gameController	= L2P.gameController,
					game			= gameController.game,
					octave			= game.startOctave;

				gameController.isEdit	= true;

				function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
					return new Note(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey ? true : false, isSlur ? true : false);
				}
				function createRest(type) {
					return new Note(options.nodes.types.rest[type], options.tones.rest);
				}
				function addTact(notes) {
					var	tact	= new Tact(options.tacts.types.quarter);
					notes.forEach(function (note) {
						tact.addNode(note);
					});
					tact.fill();

					game.addTact(tact);
				}

				var	currentTact	= game.tacts[0],
					currentNote,
					currentInfo	= [
						octave + 0,
						'A'
					];

				function updateNote(relPos) {
					var	toneI	= options.tones.all.indexOf(currentNote.tone),
						newTone	= options.tones.all[toneI - relPos],
						newNote	= createNote(currentNote.type.name, newTone.octav, newTone.name, currentNote.isRemoveKey, currentNote.isSlur);

					replaceNote(newNote);
				}
				function replaceNote(newNote) {
					var	newTact		= new Tact(currentTact.type),
						hasReplaced	= false,
						restNotes	= [],
						resetFocus	= false;

					currentTact.nodes.forEach(function (note, i) {
						var	thisReplace	= false,
							added;
						if(note === currentNote) {
							note		= newNote;
							hasReplaced	= true;
							thisReplace	= true;
						}

						if(!thisReplace && hasReplaced && note.isRest) {
							restNotes.push(note);
						} else {
							if(hasReplaced) {
								restNotes.forEach(function (note) {
									newTact.addNode(note);
								});
								restNotes	= [];
							}
							added	= newTact.addNode(note);
						}

						if(thisReplace && !added) {
							resetFocus	= true;
						}
					});

					newTact.fill();

					game.tacts.splice(game.tacts.indexOf(currentTact), 1, newTact);

					newNote.isFocus	= true;
					currentNote	= newNote;
					currentTact	= newTact;

					if(!currentNote.isRest) {
						currentInfo	= [currentNote.tone.octav, currentNote.tone.name];
					}

					if(resetFocus) {
						setFocus(currentTact.nodes[currentTact.nodes.length - 1]);
					}

					gameController.initView(true);
				}
				function updateNoteSize(bigger) {
					var	noteI			= currentTact.nodes.indexOf(currentNote),
						newTact			= new Tact(currentTact.type),
						newNote,
						types			= [
							'whole',
							'halfPeriod',
							'half',
							'quarterPeriod',
							'quarter',
							'eighthPeriod',
							'eighth',
							//'sixteenthPeriod',
							'sixteenth'
						],
						typesRest		= [
							'restQuarter',
							'restEighth',
							'restSixteenth'
						],
						typesRestConverted	= [
							'quarter',
							'eighth',
							'sixteenth'
						],
						currentTypeI	= currentNote.isRest ? typesRest.indexOf(currentNote.type.name) : types.indexOf(currentNote.type.name),
						lastNote		= true;

					if(bigger) {
						if(currentTypeI > 0) {
							if(currentNote.isRest) {
								newNote	= createRest(typesRestConverted[currentTypeI - 1]);
							} else {
								newNote	= createNote(types[currentTypeI - 1], currentNote.tone.octav, currentNote.tone.name, currentNote.isRemoveKey, currentNote.isSlur);
							}
						}
					} else {
						if(currentNote.isRest) {
							if(currentTypeI < (typesRest.length - 1)) {
								newNote	= createRest(typesRestConverted[currentTypeI + 1]);
							}
						} else {
							if(currentTypeI < (types.length - 1)) {
								newNote	= createNote(types[currentTypeI + 1], currentNote.tone.octav, currentNote.tone.name, currentNote.isRemoveKey, currentNote.isSlur);
							}
						}
					}

					if(newNote) {
						replaceNote(newNote);
					}
				}
				function setRest() {
					var	name;

					if(!currentNote.isRest) {
						replaceNote(createRest(currentNote.type.name));
					} else {
						name	= currentNote.type.name.substr(4).split('').map(function (s, i) {
							if(i === 0) {
								s	= s.toLowerCase();
							}
							return s;
						}).join('');
						replaceNote(createNote(name, currentInfo[0], currentInfo[1], false, false));
					}
				}
				function setFocus(note) {
					if(currentNote) {
						currentNote.isFocus	= false;
					}
					note.isFocus	= true;
					currentNote		= note;

					if(!note.isRest) {
						currentInfo	= [note.tone.octav, note.tone.name];
					}

					gameController.initView(true);
				}
				function moveFocus(right) {
					var	noteI	= currentTact.nodes.indexOf(currentNote),
						tactI,
						focusNote,
						tactUpdate	= false;
					if(right) {
						if(noteI >= (currentTact.nodes.length - 1)) {
							tactI	= game.tacts.indexOf(currentTact);
							if(tactI >= (game.tacts.length - 1)) {
								addTact([]);
							}
							currentTact	= game.tacts[tactI + 1];
							tactUpdate	= true;

							noteI		= -1;
						}
						focusNote	= currentTact.nodes[noteI + 1];
					} else {
						if(noteI === 0) {
							tactI	= game.tacts.indexOf(currentTact);
							if(tactI > 0) {
								currentTact	= game.tacts[tactI - 1];
								tactUpdate	= true;
								noteI		= currentTact.nodes.length;
							}
						}
						focusNote	= currentTact.nodes[noteI - 1];
					}

					if(focusNote) {
						setFocus(focusNote);
					}
					if(tactUpdate) {
						gameController.moveToTact(currentTact);
					}
				}
				function setSlur() {
					if(!currentNote.isRest) {
						replaceNote(createNote(currentNote.type.name, currentNote.tone.octav, currentNote.tone.name, currentNote.isRemoveKey, !currentNote.isSlur));
					}
				}
				function setSharp() {
					if(!currentNote.isRest) {
						var	toneName	= currentNote.tone.name.substr(0, 1);

						game.setSharp(toneName, 'toggle');

						gameController.initView(true);
					}
				}
				function setFlat() {
					if(!currentNote.isRest) {
						var	toneName	= currentNote.tone.name.substr(0, 1);

						game.setFlat(toneName, 'toggle');

						gameController.initView(true);
					}
				}

				setFocus(currentTact.nodes[0]);

				function onKeydown(e) {
					switch(e.which) {
					case 37:	// ArrowLeft
						e.preventDefault();
						moveFocus(false);
						break;
					case 38:	// ArrowUp
						e.preventDefault();
						updateNote(-1);
						break;
					case 39:	// ArrowRight
						e.preventDefault();
						moveFocus(true);
						break;
					case 40:	// ArrowDown
						e.preventDefault();
						updateNote(1);
						break;
					case 107:	// NumPad+
					case 187:	// +
						e.preventDefault();
						updateNoteSize(true);
						break;
					case 109:	// NumPad-
					case 189:	// -
						e.preventDefault();
						updateNoteSize(false);
						break;
					case 70:	// f
						e.preventDefault();
						setFlat();
						break;
					case 76:	// l
						e.preventDefault();
						setSlur();
						break;
					case 82:	// r
						e.preventDefault();
						setRest();
						break;
					case 83:	// s
						e.preventDefault();
						setSharp();
						break;
					case 88:	// x
						e.preventDefault();

						require(['fM'], function (fM) {
							$(window).off('keydown', onKeydown);
							fM.link.navigate('/game/'+gameController.permlink+'/save/', 'Magic Tune', {
								title:	'Magic Tune',
								data:	{
									data:	JSON.stringify(gameController.exportGame())
								}
							});
						});
						// console.log(JSON.stringify(gameController.exportGame()));
						break;
					default:
						// console.log(e.which);
						break;
					}
				}

				$(window).on('keydown', onKeydown);

				gameController.moveToTact(0);
			});
		}
	};

	function login(e) {
		e.preventDefault();

		sessionStorage.removeItem('l2p_fb_autologin');

		L2P.facebook.login(function (user) {
			L2P.$modal.off('hide');
		});
	}
	$('#frontpage_container [name="facebook_login"]').on('click', function (e) {
		e.preventDefault();

		sessionStorage.removeItem('l2p_fb_autologin');

		L2P.facebook.login(function () {});
	});
	$('#frontpage_container [name="custom_login"]').on('click', function (e) {
		e.preventDefault();

		$(this).parents('#LoginContainer').first().addClass('login-container-custom');
	});
	$('#frontpage_container [name="custom_login_back"]').on('click', function (e) {
		e.preventDefault();

		$(this).parents('#LoginContainer').first().removeClass('login-container-custom');
	});

	return L2P;
});
define('fragments/game',['jquery', 'api', 'game/game-controller', 'game/sound', 'sound-input'], function ($, api, GameController, Sound, SoundInput) {
	var	games			= [],
		svgContainer,
		gameController;

	function loadGame(e) {
		var gameId  = +this.getAttribute('data-game-id'),
			game    = games.filter(function (game) { return game.id == gameId; })[0];

		gameController.importGame(game.game);
	}

	$(document).ready(function () {
		svgContainer			= document.getElementById('svg_container');
		gameController			= new GameController(svgContainer);
		gameController.sound	= new Sound();

		$('#gamesBox').on('click', 'a[data-game-id]', loadGame);
		$('#startGame').on('click', $.proxy(gameController.startGame, gameController));
		$('#stopGame').on('click', $.proxy(gameController.stopGame, gameController));
		$('#exportGame').on('click', function () {
			// console.log(JSON.stringify(gameController.exportGame()));
		});
		$('#speed').on('change', function () {
			gameController.setGameSpeed(+this.value);
			$('#speedShow').html(+this.value);
		});
		$(gameController).on({
			gameLoadSpeedChange:	function (e, speed) {
				$('#speed').val(speed).trigger('change');
			}
		});

		api.get.games(function (gotGames) {
			var gamesBox    = document.getElementById('gamesBox'),
				html        = '';

			games   = gotGames;

			var html = Array.prototype.map.call(gotGames, function (game) {
				return '<a href="#/' + game.id + '" data-game-id="' + game.id + '">' + game.title + '</a>';
			}).join(',&nbsp;');

			gamesBox.innerHTML  = html;
		});
	});

	return gameController;
});
if(typeof DEBUG === 'undefined') {
	var	DEBUG	= true;
}
if(DEBUG) {
	var	l2p,
		fm;
}
require.config({
	paths:	{
		'jquery':		'jquery-2.0.3',
		'tour':			'bootstrap-tour',
		'json':			'requirejs/json',
		'facebook':		'//connect.facebook.net/en_US/all'
	},
	shim:	{
		highcharts:	{
			exports:	'Highcharts'
		},
		tour:		{
			exports:	'Tour'
		},
		facebook:	{
			exports:	'FB'
		}
	}
});
require(['jquery', 'browserdetect'], function ($, AC) {
	var	$intro,
		wait	= 0;
	if(!AC.Detector.isChrome() || (AC.Detector.isWin() && !AC.Detector.winAtLeastVersion(6))) {
		require(['bootstrap'], function () {
			if(['l2p.fmads.dk','l3p.fmads.dk','l2p.magic-tune.com','l3p.magic-tune.com'].indexOf(location.host) === -1) {
				$([
					'<div id="system_requirements">',
						'<h1>System Requirements</h1>',
						'<ul>',
							'<li>Windows Vista or newer</li>',
							'<li>Chrome version 27 or newer</li>',
						'</ul>',
					'</div>'
				].join('')).modal({
					backdrop:	'static',
					keyboard:	false,
					show:		true
				});
				return;
			}
		});
	}
	$intro	= $('#intro');

	if($intro.length > 0) {
		$intro.addClass('ready');

		setTimeout(function () {
			$intro.remove();
		}, 2000);
	}

	require(['fM', 'l2p'], function (fM, L2P) {
		DEBUG && (l2p	= L2P);
		DEBUG && (fm	= fM);
		switch(fM.link.fileName()) {
			case 'game.php':
				require(['fragments/game']);
				break;
		}

		$(function () {
			var	$CenteringContainer	= $('#CenteringContainer');
			L2P.click.set($CenteringContainer);

			$CenteringContainer.on('click', 'a[data-internal-navigation]', function (e) {
				e.preventDefault();
				var	$this		= $(this),
					navigateTo	= $this.attr('data-internal-navigation'),
					url			= $this.attr('href');

				fM.link.navigate(url, 'Magic Tune', {
					title:	'Magic Tune'
				});

				return false;
			});
			function popstateTitle(e) {
				var	state;
				if(e && e.originalEvent && e.originalEvent.state) {
					state	= e.originalEvent.state;
					if(state.title === true) {
					} else if(state.title) {
						document.title	= state.title;
					} else {
						document.title	= $CenteringContainer.attr('data-default-title');
					}
				} else {
					document.title	= $CenteringContainer.attr('data-default-title');
				}
			}
			$(window).on('popstate', function (e, from) {
				if(e.originalEvent && !e.originalEvent.state) {
					return;
				}
				//console.log('pop', location.href, e, from);
				e.preventDefault();
				e.stopPropagation();

				if(L2P.$modal && L2P.$modal.is(':visible')) {
					L2P.$modal.off('hide.bs.modal').modal('hide');
				}
				$('.popover.validation-error:visible').remove();

				popstateTitle(e);

				switch(document.location.pathname) {
					case '/':
						L2P.navigate.home(e);
						break;
					case '/guided_tour/':
						L2P.navigate.guided_tour(e);
					default:
						L2P.navigate.url(location.pathname);
						break;
				}
			});
			$(window).trigger('popstate', ['main.js']);

			L2P.form.inputValidation.error();
			$('form:first').each(function () {
				fM.form.autofocus(this);
			});
		});
	});
});
define("main", function(){});

define('dialog/action/user_create',['jquery', 'l2p'], function ($, L2P) {
	return (function ($dialog) {
		function login(e) {
			e.preventDefault();

			sessionStorage.removeItem('l2p_fb_autologin');

			L2P.facebook.login(function (user) {
				L2P.$modal.off('hide');
			});
		}
		$dialog.find('[name="facebook_button"]').on('click', login);
	});
});
define('dialog/info/browse',['jquery', 'l2p', 'playlist', 'api', 'fM'], function ($, L2P, Playlist, api, fM) {
	return (function ($dialog) {
		$dialog.find('.modal-body').css('overflow', 'hidden');
		var	render,
			$info			= $dialog.find('#info'),
			showInfoFor		= null,
			$playlistInner	= $dialog.find('#PlaylistInfoContainerInner'),
			$playlistList	= $playlistInner.find('#PlaylistList'),
			$primaVistaForm	= $dialog.find('.browse-submode--prima-vista form'),
			$primaVistaDurationBox;

		L2P.get.playlist(null, function (playlist) {
			render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
			render.onUpdate(function () {
				$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
			});
		});
		L2P.click.set($dialog);

		function showInfo() {
			var	that	= this;
			showInfoFor	= this;
			setTimeout(function () {
				if(showInfoFor === that) {
					var	$this		= $(that),
						url			= $this.attr('href'),
						urlInfo		= url.split('/'),
						permlink	= urlInfo[2],
						octave		= urlInfo[3] || 0;

					api.get.game_info(function (data) {
						$info
							.find('[data-content="title"]').text(data.title).end()
							.find('[data-content="octave"]').text(L2P_global.lang.global_octave+' '+octave).end()
							.find('[data-content="author"]').text(data.author).end()
							.find('[data-content="year"]').text(data.year === 0 ? '' : data.year).end()
							.find('[data-content="difficulty"]').text(data.difficulty).end()
							.find('[data-box="illustration"]').html(data.illustration).end()
							.find('a[data-content="statistics"]').attr('href', '/user/'+L2P_global.username+'/statistics/'+data.statistics_uuid+'/').end()
							.show();
					}, permlink, octave);
				}
			}, 100);
		}

		$dialog.find('img.listPlaylist').on('click', function () {
			$playlistInner.css('webkit-transform', 'translate3d(0, 0, 0)');

			$playlistList.load('/ajax/browse.render.playlists.php');
		});
		$dialog.find('img.playPlaylist').on('click', function () {
			var	data	= fM.form.getElements.call($playlistInner.find('form[name="play_options"]')[0]);

			L2P.get.playlist(null, function (playlist) {
				playlist.options.loop	= data.loops - 1;
				playlist.start();
			});
		});

		$dialog
			.find('#list, #PlaylistItems')
				.on('mouseover', 'a', showInfo);

		(function () {
			var	$title	= $dialog.find('#musicSearch'),
				$genre	= $dialog.find('#SongContainer select[name="genre"]');

			function searchMusic() {
				$dialog.find("#list").load("/ajax/browse.render.music.php", {
					searchstring:	$title.val(),
					genre_id:		$genre.val(),
					type:			'song'
				});
			}

			$title.on('keyup', searchMusic);
			$genre.on('change', searchMusic);
		}());

		$playlistList
			.on('click', 'div[data-playlist_id]', function (e) {
				var	$this		= $(this),
					data		= $this.data(),
					$target		= $(e.target),
					targetData	= $target.data();

				switch(e.target.nodeName) {
					case 'INPUT':
						break;
					case 'IMG':
						if(data.playlist_id === 'new') {
							L2P.get.playlist('new', function (playlist) {
								render && render.kill();
								render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
								render.onUpdate(function () {
									$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
								});
							}, $this.find('input').val());

							$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
						} else if(targetData.action === 'edit') {
							var	name	= $this.text().trim();

							$this
								.html([
									'<input type="text" />',
									'<img src="/img/icons/save.svg" data-action="save" />'
								].join(''))
								.find('input')
									.val(name);
						} else if(targetData.action === 'save') {
							var	name	= $this.find('input').val();

							L2P.get.playlist(data.playlist_id, function (playlist) {
								render && render.kill();
								render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
								render.onUpdate(function () {
									$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
								});
							}, name);

							$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
						}
						break;
					case 'DIV':
					default:
						if($this.find('input').length > 0) {
							return;
						}
						L2P.get.playlist(data.playlist_id, function (playlist) {
							render && render.kill();
							render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
							render.onUpdate(function () {
								$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
							});
						});

						$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
						break;
				}
			});

		function submodeOpen() {
			var	$submodeContent	= $(this),
				$submode		= $submodeContent.parents('.browse-submode').first();

			$submode.addClass('browse-submode--focus');

			$submodeContent.off('webkitTransitionEnd', submodeOpen);
		}

		$dialog
			.find('#list')
				.on('click', '.browse-submode-title', function (e) {
					var	$title		= $(this),
						$submode	= $title.parents('.browse-submode').first(),
						$list		= $submode.parents('#list').first();

					$list.find('.browse-submode').each(function () {
						var	$thisSubmode	= $(this),
							submode			= $thisSubmode.data().submode,
							height;

						if($thisSubmode.is($submode) && !$thisSubmode.hasClass('browse-submode--focus')) {
							fM.link.replaceUrl('/browse/scales/'+submode+'/');

							height	= $thisSubmode.find('.browse-submode-content-inner').height();
							$thisSubmode
								.find('.browse-submode-content')
									.on('webkitTransitionEnd', submodeOpen)
									.css('height', height);
						} else {
							if($thisSubmode.hasClass('browse-submode--focus')) {
								if($thisSubmode.is($submode)) {
									fM.link.replaceUrl('/browse/scales/');
								}

								$thisSubmode
									.removeClass('browse-submode--focus');

								$thisSubmode
									.find('.browse-submode-content')
										.css('height', '0px');
							}
						}
					});
				});

		function updateGameGenerationDuration() {
			var	data	= fM.form.getElements.call($primaVistaForm[0]);

			api.get.game_generation_duration(function (data) {
				if(!$primaVistaDurationBox) {
					$primaVistaDurationBox	= $primaVistaForm.find('[name="qduration"]').parent();
				}

				$primaVistaDurationBox.text(data.duration.toFixed(0)+' '+data.sec);
			}, data);
		}

		$primaVistaForm
			.on('submit', function (e) {
				e.preventDefault();

				var	data	= fM.form.getElements.call(this);

				L2P.$modal.off('hide.bs.modal');
				fM.link.navigate($primaVistaForm.attr('action'), 'Magic Tune', {
					title:	'Magic Tune',
					data:	data
				});
			})
			.on('change', 'select', updateGameGenerationDuration);

		updateGameGenerationDuration();
	});
});
/*
 Highcharts JS v2.3.5 (2012-12-19)

 (c) 2009-2012 Torstein Hønsi

 License: www.highcharts.com/license
*/
(function(){function x(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function ia(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}function z(a,b){return parseInt(a,b||10)}function ja(a){return typeof a==="string"}function Y(a){return typeof a==="object"}function Ia(a){return Object.prototype.toString.call(a)==="[object Array]"}function Da(a){return typeof a==="number"}function ka(a){return K.log(a)/K.LN10}function aa(a){return K.pow(10,a)}function ta(a,b){for(var c=a.length;c--;)if(a[c]===
b){a.splice(c,1);break}}function r(a){return a!==A&&a!==null}function w(a,b,c){var d,e;if(ja(b))r(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(r(b)&&Y(b))for(d in b)a.setAttribute(d,b[d]);return e}function la(a){return Ia(a)?a:[a]}function n(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],typeof c!=="undefined"&&c!==null)return c}function I(a,b){if(Ea&&b&&b.opacity!==A)b.filter="alpha(opacity="+b.opacity*100+")";x(a.style,b)}function T(a,b,c,d,e){a=C.createElement(a);
b&&x(a,b);e&&I(a,{padding:0,border:Q,margin:0});c&&I(a,c);d&&d.appendChild(a);return a}function ba(a,b){var c=function(){};c.prototype=new a;x(c.prototype,b);return c}function Ja(a,b,c,d){var e=N.lang,f=a;b===-1?(b=(a||0).toString(),a=b.indexOf(".")>-1?b.split(".")[1].length:0):a=isNaN(b=M(b))?2:b;var b=a,c=c===void 0?e.decimalPoint:c,d=d===void 0?e.thousandsSep:d,e=f<0?"-":"",a=String(z(f=M(+f||0).toFixed(b))),g=a.length>3?a.length%3:0;return e+(g?a.substr(0,g)+d:"")+a.substr(g).replace(/(\d{3})(?=\d)/g,
"$1"+d)+(b?c+M(f-a).toFixed(b).slice(2):"")}function ua(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function hb(a,b,c,d){var e,c=n(c,1);e=a/c;b||(b=[1,2,2.5,5,10],d&&d.allowDecimals===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2)break;a*=c;return a}function Ab(a,b){var c=b||[[Bb,[1,2,5,10,20,25,50,100,200,500]],[ib,[1,2,5,10,15,30]],[Va,[1,2,5,10,15,30]],[Ka,[1,2,3,4,6,8,12]],[ma,[1,2]],[Wa,[1,2]],[La,[1,2,3,4,6]],[va,null]],d=
c[c.length-1],e=D[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=D[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+D[c[g+1][0]])/2)break;e===D[va]&&a<5*e&&(f=[1,2,5]);e===D[va]&&a<5*e&&(f=[1,2,5]);c=hb(a/e,f);return{unitRange:e,count:c,unitName:d[0]}}function Cb(a,b,c,d){var e=[],f={},g=N.global.useUTC,h,i=new Date(b),j=a.unitRange,k=a.count;if(r(b)){j>=D[ib]&&(i.setMilliseconds(0),i.setSeconds(j>=D[Va]?0:k*U(i.getSeconds()/k)));if(j>=D[Va])i[Db](j>=D[Ka]?0:k*U(i[jb]()/k));if(j>=D[Ka])i[Eb](j>=D[ma]?
0:k*U(i[kb]()/k));if(j>=D[ma])i[lb](j>=D[La]?1:k*U(i[Ma]()/k));j>=D[La]&&(i[Fb](j>=D[va]?0:k*U(i[Xa]()/k)),h=i[Ya]());j>=D[va]&&(h-=h%k,i[Gb](h));if(j===D[Wa])i[lb](i[Ma]()-i[mb]()+n(d,1));b=1;h=i[Ya]();for(var d=i.getTime(),l=i[Xa](),m=i[Ma](),i=g?0:(864E5+i.getTimezoneOffset()*6E4)%864E5;d<c;)e.push(d),j===D[va]?d=Za(h+b*k,0):j===D[La]?d=Za(h,l+b*k):!g&&(j===D[ma]||j===D[Wa])?d=Za(h,l,m+b*k*(j===D[ma]?1:7)):(d+=j*k,j<=D[Ka]&&d%D[ma]===i&&(f[d]=ma)),b++;e.push(d)}e.info=x(a,{higherRanks:f,totalRange:j*
k});return e}function Hb(){this.symbol=this.color=0}function Ib(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,c){d=b(a,c);return d===0?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function Fa(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function wa(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Ga(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Na(a){$a||($a=T(ga));a&&$a.appendChild(a);$a.innerHTML=
""}function Oa(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;else L.console&&console.log(c)}function da(a){return parseFloat(a.toPrecision(14))}function xa(a,b){Pa=n(a,b.animation)}function Jb(){var a=N.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";Za=a?Date.UTC:function(a,b,c,g,h,i){return(new Date(a,b,n(c,1),n(g,0),n(h,0),n(i,0))).getTime()};jb=b+"Minutes";kb=b+"Hours";mb=b+"Day";Ma=b+"Date";Xa=b+"Month";Ya=b+"FullYear";Db=c+"Minutes";Eb=c+"Hours";lb=c+"Date";
Fb=c+"Month";Gb=c+"FullYear"}function ya(){}function Qa(a,b,c){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;c||this.addLabel()}function nb(a,b){this.axis=a;if(b)this.options=b,this.id=b.id;return this}function Kb(a,b,c,d,e,f){var g=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.stack=e;this.percent=f==="percent";this.alignOptions={align:b.align||(g?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(g?"middle":c?"bottom":"top"),y:n(b.y,g?4:c?14:-6),x:n(b.x,
g?c?-6:6:0)};this.textAlign=b.textAlign||(g?c?"right":"left":"center")}function ob(){this.init.apply(this,arguments)}function pb(a,b){var c=b.borderWidth,d=b.style,e=z(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape,null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).hide().add();V||this.label.shadow(b.shadow);this.shared=
b.shared}function qb(a,b){var c=V?"":b.chart.zoomType;this.zoomX=/x/.test(c);this.zoomY=/y/.test(c);this.options=b;this.chart=a;this.init(a,b.tooltip)}function rb(a){this.init(a)}function sb(){this.init.apply(this,arguments)}var A,C=document,L=window,K=Math,u=K.round,U=K.floor,za=K.ceil,s=K.max,O=K.min,M=K.abs,W=K.cos,Z=K.sin,Aa=K.PI,ab=Aa*2/360,na=navigator.userAgent,Lb=L.opera,Ea=/msie/i.test(na)&&!Lb,Ra=C.documentMode===8,bb=/AppleWebKit/.test(na),cb=/Firefox/.test(na),Mb=/(Mobile|Android|Windows Phone)/.test(na),
oa="http://www.w3.org/2000/svg",ca=!!C.createElementNS&&!!C.createElementNS(oa,"svg").createSVGRect,Sb=cb&&parseInt(na.split("Firefox/")[1],10)<4,V=!ca&&!Ea&&!!C.createElement("canvas").getContext,Sa,Ba=C.documentElement.ontouchstart!==A,Nb={},tb=0,$a,N,db,Pa,ub,D,pa=function(){},Ha=[],ga="div",Q="none",vb="rgba(192,192,192,"+(ca?1.0E-4:0.002)+")",Bb="millisecond",ib="second",Va="minute",Ka="hour",ma="day",Wa="week",La="month",va="year",wb="stroke-width",Za,jb,kb,mb,Ma,Xa,Ya,Db,Eb,lb,Fb,Gb,$={};L.Highcharts=
{};db=function(a,b,c){if(!r(b)||isNaN(b))return"Invalid date";var a=n(a,"%Y-%m-%d %H:%M:%S"),d=new Date(b),e,f=d[kb](),g=d[mb](),h=d[Ma](),i=d[Xa](),j=d[Ya](),k=N.lang,l=k.weekdays,b={a:l[g].substr(0,3),A:l[g],d:ua(h),e:h,b:k.shortMonths[i],B:k.months[i],m:ua(i+1),y:j.toString().substr(2,2),Y:j,H:ua(f),I:ua(f%12||12),l:f%12||12,M:ua(d[jb]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:ua(d.getSeconds()),L:ua(u(b%1E3),3)};for(e in b)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,b[e]);return c?a.substr(0,1).toUpperCase()+
a.substr(1):a};Hb.prototype={wrapColor:function(a){if(this.color>=a)this.color=0},wrapSymbol:function(a){if(this.symbol>=a)this.symbol=0}};D=ia(Bb,1,ib,1E3,Va,6E4,Ka,36E5,ma,864E5,Wa,6048E5,La,26784E5,va,31556952E3);ub={init:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h,i,j=function(a){for(g=a.length;g--;)a[g]==="M"&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(j(b),j(c));a.isArea&&(h=b.splice(b.length-6,6),i=c.splice(c.length-6,6));if(d<=
c.length/f)for(;d--;)c=[].concat(c).splice(0,f).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);h&&(b=b.concat(h),c=c.concat(i));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===b.length&&c<1)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){L.HighchartsAdapter=L.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,
e,f=a.Tween,g=f&&f.propHooks;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur","_default","width","height"],function(a,b){var e=d,k,l;b==="cur"?e=c.prototype:b==="_default"&&f&&(e=g[b],b="set");(k=e[b])&&(e[b]=function(c){c=a?c:this;l=c.elem;return l.attr?l.attr(c.prop,b==="cur"?A:c.now):k.apply(this,arguments)})});e=function(a){var c=a.elem,d;if(!a.started)d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0;c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};
f?g.d={set:e}:d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},merge:function(){var b=arguments;return a.extend(!0,null,b[0],b[1],b[2],b[3])},offset:function(b){return a(b).offset()},
addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=C.removeEventListener?"removeEventListener":"detachEvent";C[e]&&!b[e]&&(b[e]=function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),g="detached"+c,h;!Ea&&d&&(delete d.layerX,delete d.layerY);x(f,d);b[c]&&(b[g]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){b==="preventDefault"&&(h=!0)}}});a(b).trigger(f);b[g]&&(b[c]=b[g],b[g]=
null);e&&!f.isDefaultPrevented()&&!h&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;if(c.pageX===A)c.pageX=a.pageX,c.pageY=a.pageY;return c},animate:function(b,c,d){var e=a(b);if(c.d)b.toD=c.d,c.d=1;e.stop();e.animate(c,d)},stop:function(b){a(b).stop()}}})(L.jQuery);var ea=L.HighchartsAdapter,G=ea||{};ea&&ea.init.call(ea,ub);var eb=G.adapterRun,Tb=G.getScript,Ub=G.inArray,o=G.each,Ob=G.grep,Vb=G.offset,Ta=G.map,B=G.merge,J=G.addEvent,R=G.removeEvent,F=G.fireEvent,Pb=G.washMouseEvent,xb=
G.animate,fb=G.stop,G={enabled:!0,align:"center",x:0,y:15,style:{color:"#666",fontSize:"11px",lineHeight:"14px"}};N={colors:"#4572A7,#AA4643,#89A54E,#80699B,#3D96AE,#DB843D,#92A8CD,#A47D7C,#B5CA92".split(","),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,canvasToolsURL:"http://code.highcharts.com/2.3.5/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/2.3.5/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacingTop:10,spacingRight:10,spacingBottom:15,spacingLeft:10,style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",y:15,style:{color:"#3E576F",fontSize:"16px"}},subtitle:{text:"",align:"center",y:30,style:{color:"#6D869F"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,shadow:!0,marker:{enabled:!0,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",
lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:B(G,{enabled:!1,formatter:function(){return this.y},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,showInLegend:!0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:!0}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#3E576F",inactiveColor:"#CCC"},
shadow:!1,itemStyle:{cursor:"pointer",color:"#3E576F",fontSize:"12px"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolWidth:16,symbolPadding:5,verticalAlign:"bottom",x:0,y:0},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:2,borderRadius:5,
dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:!0,shared:V,snap:Mb?25:10,style:{color:"#333333",fontSize:"12px",padding:"5px",whiteSpace:"nowrap"}},credits:{enabled:!0,
text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"10px"}}};var X=N.plotOptions,ea=X.line;Jb();var qa=function(a){var b=[],c;(function(a){(c=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a))?b=[z(c[1]),z(c[2]),z(c[3]),parseFloat(c[4],10)]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))&&(b=[z(c[1],16),z(c[2],16),z(c[3],
16),1])})(a);return{get:function(c){return b&&!isNaN(b[0])?c==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":c==="a"?b[3]:"rgba("+b.join(",")+")":a},brighten:function(a){if(Da(a)&&a!==0){var c;for(c=0;c<3;c++)b[c]+=z(a*255),b[c]<0&&(b[c]=0),b[c]>255&&(b[c]=255)}return this},setOpacity:function(a){b[3]=a;return this}}};ya.prototype={init:function(a,b){this.element=b==="span"?T(b):C.createElementNS(oa,b);this.renderer=a;this.attrSetters={}},animate:function(a,b,c){b=n(b,Pa,!0);fb(this);if(b){b=B(b);if(c)b.complete=
c;xb(this,a,b)}else this.attr(a),c&&c()},attr:function(a,b){var c,d,e,f,g=this.element,h=g.nodeName.toLowerCase(),i=this.renderer,j,k=this.attrSetters,l=this.shadows,m,q,p=this;ja(a)&&r(b)&&(c=a,a={},a[c]=b);if(ja(a))c=a,h==="circle"?c={x:"cx",y:"cy"}[c]||c:c==="strokeWidth"&&(c="stroke-width"),p=w(g,c)||this[c]||0,c!=="d"&&c!=="visibility"&&(p=parseFloat(p));else for(c in a)if(j=!1,d=a[c],e=k[c]&&k[c].call(this,d,c),e!==!1){e!==A&&(d=e);if(c==="d")d&&d.join&&(d=d.join(" ")),/(NaN| {2}|^$)/.test(d)&&
(d="M 0 0");else if(c==="x"&&h==="text"){for(e=0;e<g.childNodes.length;e++)f=g.childNodes[e],w(f,"x")===w(g,"x")&&w(f,"x",d);this.rotation&&w(g,"transform","rotate("+this.rotation+" "+d+" "+z(a.y||w(g,"y"))+")")}else if(c==="fill")d=i.color(d,g,c);else if(h==="circle"&&(c==="x"||c==="y"))c={x:"cx",y:"cy"}[c]||c;else if(h==="rect"&&c==="r")w(g,{rx:d,ry:d}),j=!0;else if(c==="translateX"||c==="translateY"||c==="rotation"||c==="verticalAlign")j=q=!0;else if(c==="stroke")d=i.color(d,g,c);else if(c==="dashstyle")if(c=
"stroke-dasharray",d=d&&d.toLowerCase(),d==="solid")d=Q;else{if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=d.length;e--;)d[e]=z(d[e])*a["stroke-width"];d=d.join(",")}}else if(c==="isTracker")this[c]=d;else if(c==="width")d=z(d);else if(c==="align")c="text-anchor",d={left:"start",center:"middle",right:"end"}[d];
else if(c==="title")e=g.getElementsByTagName("title")[0],e||(e=C.createElementNS(oa,"title"),g.appendChild(e)),e.textContent=d;c==="strokeWidth"&&(c="stroke-width");if(c==="stroke-width"&&d===0&&(bb||i.forExport))d=1.0E-6;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(m||(this.symbolAttr(a),m=!0),j=!0);if(l&&/^(width|height|visibility|x|y|d|transform)$/.test(c))for(e=l.length;e--;)w(l[e],c,c==="height"?s(d-(l[e].cutHeight||0),0):d);if((c==="width"||c==="height")&&
h==="rect"&&d<0)d=0;this[c]=d;q&&this.updateTransform();c==="text"?(d!==this.textStr&&delete this.bBox,this.textStr=d,this.added&&i.buildText(this)):j||w(g,c,d)}return p},symbolAttr:function(a){var b=this;o("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=n(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":Q)},crisp:function(a,b,c,d,e){var f,g=
{},h={},i,a=a||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;i=u(a)%2/2;h.x=U(b||this.x||0)+i;h.y=U(c||this.y||0)+i;h.width=U((d||this.width||0)-2*i);h.height=U((e||this.height||0)-2*i);h.strokeWidth=a;for(f in h)this[f]!==h[f]&&(this[f]=g[f]=h[f]);return g},css:function(a){var b=this.element,b=a&&a.width&&b.nodeName.toLowerCase()==="text",c,d="",e=function(a,b){return"-"+b.toLowerCase()};if(a&&a.color)a.fill=a.color;this.styles=a=x(this.styles,a);V&&b&&delete a.width;if(Ea&&!ca)b&&delete a.width,
I(this.element,a);else{for(c in a)d+=c.replace(/([A-Z])/g,e)+":"+a[c]+";";this.attr({style:d})}b&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){if(Ba&&a==="click")this.element.ontouchstart=function(a){a.preventDefault();b()};this.element["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=a;return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},
htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=x(this.styles,a);I(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position="absolute";b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=
this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=g&&g!=="left",j=this.shadows;if(c||d)I(b,{marginLeft:c,marginTop:d}),j&&o(j,function(a){I(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&o(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var k,l,j=this.rotation,m,q=0,p=1,q=0,y;m=z(this.textWidth);var t=this.xCorr||0,H=this.yCorr||0,ra=[j,g,b.innerHTML,this.textWidth].join(",");k={};if(ra!==this.cTT){if(r(j))a.isSVG?(t=Ea?
"-ms-transform":bb?"-webkit-transform":cb?"MozTransform":Lb?"-o-transform":"",k[t]=k.transform="rotate("+j+"deg)"):(q=j*ab,p=W(q),q=Z(q),k.filter=j?["progid:DXImageTransform.Microsoft.Matrix(M11=",p,", M12=",-q,", M21=",q,", M22=",p,", sizingMethod='auto expand')"].join(""):Q),I(b,k);k=n(this.elemWidth,b.offsetWidth);l=n(this.elemHeight,b.offsetHeight);if(k>m&&/[ \-]/.test(b.textContent||b.innerText))I(b,{width:m+"px",display:"block",whiteSpace:"normal"}),k=m;m=a.fontMetrics(b.style.fontSize).b;t=
p<0&&-k;H=q<0&&-l;y=p*q<0;t+=q*m*(y?1-h:h);H-=p*m*(j?y?h:1-h:1);i&&(t-=k*h*(p<0?-1:1),j&&(H-=l*h*(q<0?-1:1)),I(b,{textAlign:g}));this.xCorr=t;this.yCorr=H}I(b,{left:e+t+"px",top:f+H+"px"});if(bb)l=b.offsetHeight;this.cTT=ra}}else this.alignOnAdd=!0},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.inverted,d=this.rotation,e=[];c&&(a+=this.attr("width"),b+=this.attr("height"));(a||b)&&e.push("translate("+a+","+b+")");c?e.push("rotate(90) scale(-1,1)"):d&&e.push("rotate("+
d+" "+(this.x||0)+" "+(this.y||0)+")");e.length&&w(this.element,"transform",e.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){a?(this.alignOptions=a,this.alignByTranslate=b,c||this.renderer.alignedObjects.push(this)):(a=this.alignOptions,b=this.alignByTranslate);var c=n(c,this.renderer),d=a.align,e=a.verticalAlign,f=(c.x||0)+(a.x||0),g=(c.y||0)+(a.y||0),h={};if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];
h[b?"translateX":"x"]=u(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=u(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d=this.rotation;c=this.element;var e=this.styles,f=d*ab;if(!a){if(c.namespaceURI===oa||b.forExport){try{a=c.getBBox?x({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(g){}if(!a||a.width<0)a={width:0,height:0}}else a=
this.htmlGetBBox();if(b.isSVG){b=a.width;c=a.height;if(Ea&&e&&e.fontSize==="11px"&&c===22.700000762939453)a.height=c=14;if(d)a.width=M(c*Z(f))+M(b*W(f)),a.height=M(c*W(f))+M(b*Z(f))}this.bBox=a}return a},show:function(){return this.attr({visibility:"visible"})},hide:function(){return this.attr({visibility:"hidden"})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=d.childNodes,f=this.element,g=w(f,"zIndex"),h;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==
void 0&&b.buildText(this);if(g)c.handleZ=!0,g=z(g);if(c.handleZ)for(c=0;c<e.length;c++)if(a=e[c],b=w(a,"zIndex"),a!==f&&(z(b)>g||!r(g)&&r(b))){d.insertBefore(f,a);h=!0;break}h||d.appendChild(f);this.added=!0;F(this,"add");return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d,e;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=null;fb(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(e=0;e<a.stops.length;e++)a.stops[e]=
a.stops[e].destroy();a.stops=null}a.safeRemoveChild(b);c&&o(c,function(b){a.safeRemoveChild(b)});ta(a.renderer.alignedObjects,a);for(d in a)delete a[d];return null},empty:function(){for(var a=this.element,b=a.childNodes,c=b.length;c--;)a.removeChild(b[c])},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=n(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+n(a.offsetX,1)+", "+n(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;w(f,{isShadow:"true",
stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:Q});if(c)w(f,"height",s(w(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this}};var sa=function(){this.init.apply(this,arguments)};sa.prototype={Element:ya,init:function(a,b,c,d){var e=location,f;f=this.createElement("svg").attr({xmlns:oa,version:"1.1"});a.appendChild(f.element);this.isSVG=!0;this.box=f.element;this.boxWrapper=f;this.alignedObjects=
[];this.url=(cb||bb)&&C.getElementsByTagName("base").length?e.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.defs=this.createElement("defs").add();this.forExport=d;this.gradients={};this.setSize(b,c,!1);var g;if(cb&&a.getBoundingClientRect)this.subPixelFix=b=function(){I(a,{left:0,top:0});g=a.getBoundingClientRect();I(a,{left:za(g.left)-g.left+"px",top:za(g.top)-g.top+"px"})},b(),J(L,"resize",b)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Ga(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&R(L,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=n(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,
"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),d=b.childNodes,e=/style="([^"]+)"/,f=/href="([^"]+)"/,g=w(b,"x"),h=a.styles,i=h&&h.width&&z(h.width),j=h&&h.lineHeight,k,h=d.length,l=[];h--;)b.removeChild(d[h]);i&&!a.added&&this.box.appendChild(b);c[c.length-1]===""&&c.pop();o(c,function(c,d){var h,y=0,t,c=c.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");h=c.split("|||");o(h,function(c){if(c!==""||h.length===1){var m={},n=C.createElementNS(oa,"tspan"),o;e.test(c)&&
(o=c.match(e)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),w(n,"style",o));f.test(c)&&(w(n,"onclick",'location.href="'+c.match(f)[1]+'"'),I(n,{cursor:"pointer"}));c=(c.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");n.appendChild(C.createTextNode(c));y?m.dx=3:m.x=g;if(!y){if(d){!ca&&a.renderer.forExport&&I(n,{display:"block"});t=L.getComputedStyle&&z(L.getComputedStyle(k,null).getPropertyValue("line-height"));if(!t||isNaN(t)){var r;if(!(r=j))if(!(r=k.offsetHeight))l[d]=b.getBBox?
b.getBBox().height:a.renderer.fontMetrics(b.style.fontSize).h,r=u(l[d]-(l[d-1]||0))||18;t=r}w(n,"dy",t)}k=n}w(n,m);b.appendChild(n);y++;if(i)for(var c=c.replace(/([^\^])-/g,"$1- ").split(" "),E=[];c.length||E.length;)delete a.bBox,r=a.getBBox().width,m=r>i,!m||c.length===1?(c=E,E=[],c.length&&(n=C.createElementNS(oa,"tspan"),w(n,{dy:j||16,x:g}),o&&w(n,"style",o),b.appendChild(n),r>i&&(i=r))):(n.removeChild(n.firstChild),E.unshift(c.pop())),c.length&&n.appendChild(C.createTextNode(c.join(" ").replace(/- /g,
"-")))}})})},button:function(a,b,c,d,e,f,g){var h=this.label(a,b,c),i=0,j,k,l,m,q,a={x1:0,y1:0,x2:0,y2:1},e=B(ia(wb,1,"stroke","#999","fill",ia("linearGradient",a,"stops",[[0,"#FFF"],[1,"#DDD"]]),"r",3,"padding",3,"style",ia("color","black")),e);l=e.style;delete e.style;f=B(e,ia("stroke","#68A","fill",ia("linearGradient",a,"stops",[[0,"#FFF"],[1,"#ACF"]])),f);m=f.style;delete f.style;g=B(e,ia("stroke","#68A","fill",ia("linearGradient",a,"stops",[[0,"#9BD"],[1,"#CDF"]])),g);q=g.style;delete g.style;
J(h.element,"mouseenter",function(){h.attr(f).css(m)});J(h.element,"mouseleave",function(){j=[e,f,g][i];k=[l,m,q][i];h.attr(j).css(k)});h.setState=function(a){(i=a)?a===2&&h.attr(g).css(q):h.attr(e).css(l)};return h.on("click",function(){d.call(h)}).attr(e).css(x({cursor:"default"},l))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=u(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=u(a[2])+b%2/2);return a},path:function(a){var b={fill:Q};Ia(a)?b.d=a:Y(a)&&x(b,a);return this.createElement("path").attr(b)},circle:function(a,
b,c){a=Y(a)?a:{x:a,y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,e,f){if(Y(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;return this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0})},rect:function(a,b,c,d,e,f){e=Y(a)?a.r:e;e=this.createElement("rect").attr({rx:e,ry:e,fill:Q});return e.attr(Y(a)?a:e.crisp(f,a,b,s(c,0),s(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[n(c,!0)?"animate":
"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return r(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:Q};arguments.length>1&&x(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g,h=this.symbols[a],h=h&&h(u(b),u(c),d,e,
f),i=/^url\((.*?)\)$/,j,k;h?(g=this.path(h),x(g,{symbolName:a,x:b,y:c,width:d,height:e}),f&&x(g,f)):i.test(a)&&(k=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(u((d-b[0])/2),u((e-b[1])/2)))},j=a.match(i)[1],a=Nb[j],g=this.image(j).attr({x:b,y:c}),a?k(g,a):(g.attr({width:0,height:0}),T("img",{onload:function(){k(g,Nb[j]=[this.width,this.height])},src:j})));return g},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,
a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-1.0E-6,d=e.innerR,h=e.open,i=W(f),j=Z(f),k=W(g),g=Z(g),e=e.end-f<Aa?0:1;return["M",a+c*i,b+c*j,"A",c,c,
0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]}},clipRect:function(a,b,c,d){var e="highcharts-"+tb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},color:function(a,b,c){var d=this,e,f=/^rgba/,g,h,i,j,k,l,m,q=[];a&&a.linearGradient?g="linearGradient":a&&a.radialGradient&&(g="radialGradient");if(g){c=a[g];h=d.gradients;j=a.stops;b=b.radialReference;Ia(c)&&(a[g]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],
gradientUnits:"userSpaceOnUse"});g==="radialGradient"&&b&&!r(c.gradientUnits)&&x(c,{cx:b[0]-b[2]/2+c.cx*b[2],cy:b[1]-b[2]/2+c.cy*b[2],r:c.r*b[2],gradientUnits:"userSpaceOnUse"});for(m in c)m!=="id"&&q.push(m,c[m]);for(m in j)q.push(j[m]);q=q.join(",");h[q]?a=h[q].id:(c.id=a="highcharts-"+tb++,h[q]=i=d.createElement(g).attr(c).add(d.defs),i.stops=[],o(j,function(a){f.test(a[1])?(e=qa(a[1]),k=e.get("rgb"),l=e.get("a")):(k=a[1],l=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":k,"stop-opacity":l}).add(i);
i.stops.push(a)}));return"url("+d.url+"#"+a+")"}else return f.test(a)?(e=qa(a),w(b,c+"-opacity",e.get("a")),e.get("rgb")):(b.removeAttribute(c+"-opacity"),a)},text:function(a,b,c,d){var e=N.chart.style,f=V||!ca&&this.forExport;if(d&&!this.forExport)return this.html(a,b,c);b=u(n(b,0));c=u(n(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:e.fontFamily,fontSize:e.fontSize});f&&a.css({position:"absolute"});a.x=b;a.y=c;return a},html:function(a,b,c){var d=N.chart.style,e=this.createElement("span"),
f=e.attrSetters,g=e.element,h=e.renderer;f.text=function(a){a!==g.innerHTML&&delete this.bBox;g.innerHTML=a;return!1};f.x=f.y=f.align=function(a,b){b==="align"&&(b="textAlign");e[b]=a;e.htmlUpdateTransform();return!1};e.attr({text:a,x:u(b),y:u(c)}).css({position:"absolute",whiteSpace:"nowrap",fontFamily:d.fontFamily,fontSize:d.fontSize});e.css=e.htmlCss;if(h.isSVG)e.add=function(a){var b,c=h.box.parentNode,d=[];if(a){if(b=a.div,!b){for(;a;)d.push(a),a=a.parentGroup;o(d.reverse(),function(a){var d;
b=a.div=a.div||T(ga,{className:w(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;x(a.attrSetters,{translateX:function(a){d.left=a+"px"},translateY:function(a){d.top=a+"px"},visibility:function(a,b){d[b]=a}})})}}else b=c;b.appendChild(g);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e};return e},fontMetrics:function(a){var a=z(a||11),a=a<24?a+4:u(a*1.2),b=u(a*0.8);return{h:a,b:b}},label:function(a,b,c,d,e,f,g,h,i){function j(){var a;
a=y.element.style;H=(s===void 0||yb===void 0||p.styles.textAlign)&&y.getBBox();p.width=(s||H.width||0)+2*v;p.height=(yb||H.height||0)+2*v;zb=v+q.fontMetrics(a&&a.fontSize).b;if(z){if(!n)a=h?-zb:0,p.box=n=d?q.symbol(d,-ra*v,a,p.width,p.height):q.rect(-ra*v,a,p.width,p.height,0,w[wb]),n.add(p);n.attr(B({width:p.width,height:p.height},w));w=null}}function k(){var a=p.styles,a=a&&a.textAlign,b=v*(1-ra),c;c=h?0:zb;if(r(s)&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(s-H.width);(b!==y.x||c!==
y.y)&&y.attr({x:b,y:c});y.x=b;y.y=c}function l(a,b){n?n.attr(a,b):w[a]=b}function m(){y.add(p);p.attr({text:a,x:b,y:c});n&&r(e)&&p.attr({anchorX:e,anchorY:f})}var q=this,p=q.g(i),y=q.text("",0,0,g).attr({zIndex:1}),n,H,ra=0,v=3,s,yb,E,S,Qb=0,w={},zb,g=p.attrSetters,z;J(p,"add",m);g.width=function(a){s=a;return!1};g.height=function(a){yb=a;return!1};g.padding=function(a){r(a)&&a!==v&&(v=a,k());return!1};g.align=function(a){ra={left:0,center:0.5,right:1}[a];return!1};g.text=function(a,b){y.attr(b,a);
j();k();return!1};g[wb]=function(a,b){z=!0;Qb=a%2/2;l(b,a);return!1};g.stroke=g.fill=g.r=function(a,b){b==="fill"&&(z=!0);l(b,a);return!1};g.anchorX=function(a,b){e=a;l(b,a+Qb-E);return!1};g.anchorY=function(a,b){f=a;l(b,a-S);return!1};g.x=function(a){p.x=a;a-=ra*((s||H.width)+v);E=u(a);p.attr("translateX",E);return!1};g.y=function(a){S=p.y=u(a);p.attr("translateY",a);return!1};var C=p.css;return x(p,{css:function(a){if(a){var b={},a=B({},a);o("fontSize,fontWeight,fontFamily,color,lineHeight,width".split(","),
function(c){a[c]!==A&&(b[c]=a[c],delete a[c])});y.css(b)}return C.call(p,a)},getBBox:function(){return{width:H.width+2*v,height:H.height+2*v,x:H.x-v,y:H.y-v}},shadow:function(a){n&&n.shadow(a);return p},destroy:function(){R(p,"add",m);R(p.element,"mouseenter");R(p.element,"mouseleave");y&&(y=y.destroy());n&&(n=n.destroy());ya.prototype.destroy.call(p);p=q=j=k=l=m=null}})}};Sa=sa;var ha;if(!ca&&!V){ha={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"];(b===
"shape"||b===ga)&&d.push("left:0;top:0;width:1px;height:1px;");Ra&&d.push("visibility: ",b===ga?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=b===ga||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=T(c);this.renderer=a;this.attrSetters={}},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();F(this,"add");return this},
updateTransform:ya.prototype.htmlUpdateTransform,attr:function(a,b){var c,d,e,f=this.element||{},g=f.style,h=f.nodeName,i=this.renderer,j=this.symbolName,k,l=this.shadows,m,q=this.attrSetters,p=this;ja(a)&&r(b)&&(c=a,a={},a[c]=b);if(ja(a))c=a,p=c==="strokeWidth"||c==="stroke-width"?this.strokeweight:this[c];else for(c in a)if(d=a[c],m=!1,e=q[c]&&q[c].call(this,d,c),e!==!1&&d!==null){e!==A&&(d=e);if(j&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))k||(this.symbolAttr(a),k=!0),m=
!0;else if(c==="d"){d=d||[];this.d=d.join(" ");e=d.length;for(m=[];e--;)m[e]=Da(d[e])?u(d[e]*10)-5:d[e]==="Z"?"x":d[e];d=m.join(" ")||"x";f.path=d;if(l)for(e=l.length;e--;)l[e].path=l[e].cutOff?this.cutOffPath(d,l[e].cutOff):d;m=!0}else if(c==="visibility"){if(l)for(e=l.length;e--;)l[e].style[c]=d;h==="DIV"&&(d=d==="hidden"?"-999em":0,c="top");g[c]=d;m=!0}else if(c==="zIndex")d&&(g[c]=d),m=!0;else if(c==="width"||c==="height")d=s(0,d),this[c]=d,this.updateClipping?(this[c]=d,this.updateClipping()):
g[c]=d,m=!0;else if(c==="x"||c==="y")this[c]=d,g[{x:"left",y:"top"}[c]]=d;else if(c==="class")f.className=d;else if(c==="stroke")d=i.color(d,f,c),c="strokecolor";else if(c==="stroke-width"||c==="strokeWidth")f.stroked=d?!0:!1,c="strokeweight",this[c]=d,Da(d)&&(d+="px");else if(c==="dashstyle")(f.getElementsByTagName("stroke")[0]||T(i.prepVML(["<stroke/>"]),null,null,f))[c]=d||"solid",this.dashstyle=d,m=!0;else if(c==="fill")if(h==="SPAN")g.color=d;else{if(h!=="IMG")f.filled=d!==Q?!0:!1,d=i.color(d,
f,c,this),c="fillcolor"}else if(h==="shape"&&c==="rotation")this[c]=d,f.style.left=-u(Z(d*ab)+1)+"px",f.style.top=u(W(d*ab))+"px";else if(c==="translateX"||c==="translateY"||c==="rotation")this[c]=d,this.updateTransform(),m=!0;else if(c==="text")this.bBox=null,f.innerHTML=d,m=!0;m||(Ra?f[c]=d:w(f,c,d))}return p},clip:function(a){var b=this,c,d=b.element,e=d.parentNode;a?(c=a.members,ta(c,b),c.push(b),b.destroyClip=function(){ta(c,b)},e&&e.className==="highcharts-tracker"&&!Ra&&I(d,{visibility:"hidden"}),
a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:Ra?"inherit":"rect(auto)"});return b.css(a)},css:ya.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Na(a)},destroy:function(){this.destroyClip&&this.destroyClip();return ya.prototype.destroy.apply(this)},empty:function(){for(var a=this.element.childNodes,b=a.length,c;b--;)c=a[b],c.parentNode.removeChild(c)},on:function(a,b){this.element["on"+a]=function(){var a=L.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,
b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=z(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,q,p;k&&typeof k.value!=="string"&&(k="x");m=k;if(a){q=n(a.width,3);p=(a.opacity||0.15)/q;for(e=1;e<=3;e++){l=q*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=T(g.prepVML(j),null,
{left:z(i.left)+n(a.offsetX,1),top:z(i.top)+n(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',p*e,'"/>'];T(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this}};ha=ba(ya,ha);var fa={Element:ha,isIE8:na.indexOf("MSIE 8.0")>-1,init:function(a,b,c){var d,e;this.alignedObjects=[];d=this.createElement(ga);e=d.element;e.style.position="relative";a.appendChild(d.element);this.box=e;this.boxWrapper=d;
this.setSize(b,c,!1);if(!C.namespaces.hcv)C.namespaces.add("hcv","urn:schemas-microsoft-com:vml"),C.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=Y(a);return x(e,{members:[],left:f?a.x:a,top:f?a.y:b,width:f?a.width:c,height:f?a.height:d,getCSS:function(a){var b=a.inverted,c=this.top,d=this.left,e=d+this.width,
f=c+this.height,c={clip:"rect("+u(b?d:c)+"px,"+u(b?f:e)+"px,"+u(b?e:f)+"px,"+u(b?c:d)+"px)"};!b&&Ra&&a.element.nodeName!=="IMG"&&x(c,{width:e+"px",height:f+"px"});return c},updateClipping:function(){o(e.members,function(a){a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j=Q;a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,q,p,n,t,H,r="",a=a.stops,v,s=[],u=function(){h=['<fill colors="'+s.join(",")+'" opacity="',
n,'" o:opacity2="',p,'" type="',i,'" ',r,'focus="100%" method="any" />'];T(e.prepVML(h),null,null,b)};q=a[0];v=a[a.length-1];q[0]>0&&a.unshift([0,q[1]]);v[0]<1&&a.push([1,v[1]]);o(a,function(a,b){g.test(a[1])?(f=qa(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);s.push(a[0]*100+"% "+k);b?(n=l,t=k):(p=l,H=k)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,q=m.x2||m[2]||0,m=m.y2||m[3]||0,r='angle="'+(90-K.atan((m-a)/(q-c))*180/Aa)+'"',u();else{var j=m.r,E=j*2,S=j*2,x=m.cx,A=m.cy,w=
b.radialReference,z,j=function(){w&&(z=d.getBBox(),x+=(w[0]-z.x)/z.width-0.5,A+=(w[1]-z.y)/z.height-0.5,E*=w[2]/z.width,S*=w[2]/z.height);r='src="'+N.global.VMLRadialGradientURL+'" size="'+E+","+S+'" origin="0.5,0.5" position="'+x+","+A+'" color2="'+H+'" ';u()};d.added?j():J(d,"add",j);j=t}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=qa(a),h=["<",c,' opacity="',f.get("a"),'"/>'],T(this.prepVML(h),null,null,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);if(j.length)j[0].opacity=1;j=a}return j},
prepVML:function(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:sa.prototype.html,path:function(a){var b={coordsize:"10 10"};Ia(a)?b.d=a:Y(a)&&x(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){return this.symbol("circle").attr({x:a-
c,y:b-c,width:2*c,height:2*c})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(ga).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},rect:function(a,b,c,d,e,f){if(Y(a))b=a.y,c=a.width,d=a.height,f=a.strokeWidth,a=a.x;var g=this.symbol("rect");g.r=e;return g.attr(g.crisp(f,a,b,s(c,0),s(d,0)))},invertChild:function(a,b){var c=b.style;I(a,{flip:"x",
left:z(c.width)-1,top:z(c.height)-1,rotation:-90})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=W(f),d=Z(f),i=W(g),j=Z(g),k=e.innerR,l=0.08/h,m=k&&0.1/k||0;if(g-f===0)return["x"];else 2*Aa-g+f<l?i=-l:g-f<m&&(i=W(f+m));f=["wa",a-h,b-h,a+h,b+h,a+h*c,b+h*d,a+h*i,b+h*j];e.open&&!k&&f.push("e","M",a,b);f.push("at",a-k,b-k,a+k,b+k,a+k*i,b+k*j,a+k*c,b+k*d,"x","e");return f},circle:function(a,b,c,d){return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){var f=
a+c,g=b+d,h;!r(e)||!e.r?f=sa.prototype.symbols.square.apply(0,arguments):(h=O(e.r,c,d),f=["M",a+h,b,"L",f-h,b,"wa",f-2*h,b,f,b+2*h,f-h,b,f,b+h,"L",f,g-h,"wa",f-2*h,g-2*h,f,g,f,g-h,f-h,g,"L",a+h,g,"wa",a,g-2*h,a+2*h,g,a+h,g,a,g-h,"L",a,b+h,"wa",a,b,a+2*h,b+2*h,a,b+h,a+h,b,"x","e"]);return f}}};ha=function(){this.init.apply(this,arguments)};ha.prototype=B(sa.prototype,fa);Sa=ha}var gb,Rb;if(V)gb=function(){oa="http://www.w3.org/1999/xhtml"},gb.prototype.symbols={},Rb=function(){function a(){var a=b.length,
d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){b.length===0&&Tb(d,a);b.push(c)}}}();Sa=ha||gb||sa;Qa.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=this.pos,g=b.labels,h=a.tickPositions,d=e&&d&&e.length&&!g.step&&!g.staggerLines&&!g.rotation&&c.plotWidth/h.length||!d&&c.plotWidth/2,i=f===h[0],j=f===h[h.length-1],k=e&&r(e[f])?e[f]:f,e=this.label,h=h.info,l;a.isDatetimeAxis&&h&&(l=b.dateTimeLabelFormats[h.higherRanks[f]||h.unitName]);
this.isFirst=i;this.isLast=j;b=a.labelFormatter.call({axis:a,chart:c,isFirst:i,isLast:j,dateTimeLabelFormat:l,value:a.isLog?da(aa(k)):k});f=d&&{width:s(1,u(d-2*(g.padding||10)))+"px"};f=x(f,g.style);if(r(e))e&&e.attr({text:b}).css(f);else{d={align:g.align};if(Da(g.rotation))d.rotation=g.rotation;this.label=r(b)&&g.enabled?c.renderer.text(b,0,0,g.useHTML).attr(d).css(f).add(a.labelGroup):null}},getLabelSize:function(){var a=this.label,b=this.axis;return a?(this.labelBBox=a.getBBox())[b.horiz?"height":
"width"]:0},getLabelSides:function(){var a=this.axis.options.labels,b=this.labelBBox.width,a=b*{left:0,center:0.5,right:1}[a.align]-a.x;return[-a,b-a]},handleOverflow:function(a,b){var c=!0,d=this.axis,e=d.chart,f=this.isFirst,g=this.isLast,h=b.x,i=d.reversed,j=d.tickPositions;if(f||g){var k=this.getLabelSides(),l=k[0],k=k[1],e=e.plotLeft,m=e+d.len,j=(d=d.ticks[j[a+(f?1:-1)]])&&d.label.xy&&d.label.xy.x+d.getLabelSides()[f?0:1];f&&!i||g&&i?h+l<e&&(h=e-l,d&&h+k>j&&(c=!1)):h+k>m&&(h=m-k,d&&h+l<j&&(c=
!1));b.x=h}return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,i=i.staggerLines,a=a+e.x-(f&&d?f*j*(k?-1:1):0),b=b+e.y-(f&&!d?f*j*(k?1:-1):0);r(e.y)||
(b+=z(c.styles.lineHeight)*0.9-c.getBBox().height/2);i&&(b+=g/(h||1)%i*16);return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b){var c=this.axis,d=c.options,e=c.chart.renderer,f=c.horiz,g=this.type,h=this.label,i=this.pos,j=d.labels,k=this.gridLine,l=g?g+"Grid":"grid",m=g?g+"Tick":"tick",q=d[l+"LineWidth"],p=d[l+"LineColor"],y=d[l+"LineDashStyle"],t=d[m+"Length"],l=d[m+"Width"]||0,o=d[m+"Color"],r=d[m+"Position"],m=this.mark,
v=j.step,s=!0,u=c.tickmarkOffset,E=this.getPosition(f,i,u,b),S=E.x,E=E.y,x=c.staggerLines;if(q){i=c.getPlotLinePath(i+u,q,b);if(k===A){k={stroke:p,"stroke-width":q};if(y)k.dashstyle=y;if(!g)k.zIndex=1;this.gridLine=k=q?e.path(i).attr(k).add(c.gridGroup):null}if(!b&&k&&i)k[this.isNew?"attr":"animate"]({d:i})}if(l&&t)r==="inside"&&(t=-t),c.opposite&&(t=-t),g=this.getMarkPath(S,E,t,l,f,e),m?m.animate({d:g}):this.mark=e.path(g).attr({stroke:o,"stroke-width":l}).add(c.axisGroup);if(h&&!isNaN(S))h.xy=E=
this.getLabelPosition(S,E,h,f,j,u,a,v),this.isFirst&&!n(d.showFirstLabel,1)||this.isLast&&!n(d.showLastLabel,1)?s=!1:!x&&f&&j.overflow==="justify"&&!this.handleOverflow(a,E)&&(s=!1),v&&a%v&&(s=!1),s?(h[this.isNew?"attr":"animate"](E),this.isNew=!1):h.attr("y",-9999)},destroy:function(){Ga(this,this.axis)}};nb.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||0)/2,e=a.options,f=e.label,g=a.label,h=e.width,i=e.to,j=e.from,k=r(j)&&r(i),l=e.value,m=e.dashStyle,q=a.svgElem,p=
[],y,t=e.color,o=e.zIndex,u=e.events,v=b.chart.renderer;b.isLog&&(j=ka(j),i=ka(i),l=ka(l));if(h){if(p=b.getPlotLinePath(l,h),d={stroke:t,"stroke-width":h},m)d.dashstyle=m}else if(k){if(j=s(j,b.min-d),i=O(i,b.max+d),p=b.getPlotBandPath(j,i,e),d={fill:t},e.borderWidth)d.stroke=e.borderColor,d["stroke-width"]=e.borderWidth}else return;if(r(o))d.zIndex=o;if(q)p?q.animate({d:p},null,q.onGetPath):(q.hide(),q.onGetPath=function(){q.show()});else if(p&&p.length&&(a.svgElem=q=v.path(p).attr(d).add(),u))for(y in e=
function(b){q.on(b,function(c){u[b].apply(a,[c])})},u)e(y);if(f&&r(f.text)&&p&&p.length&&b.width>0&&b.height>0){f=B({align:c&&k&&"center",x:c?!k&&4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},f);if(!g)a.label=g=v.text(f.text,0,0).attr({align:f.textAlign||f.align,rotation:f.rotation,zIndex:o}).css(f.style).add();b=[p[1],p[4],n(p[6],p[1])];p=[p[2],p[5],n(p[7],p[2])];c=Fa(b);k=Fa(p);g.align(f,!1,{x:c,y:k,width:wa(b)-c,height:wa(p)-k});g.show()}else g&&g.hide();return a},destroy:function(){ta(this.axis.plotLinesAndBands,
this);Ga(this,this.axis)}};Kb.prototype={destroy:function(){Ga(this,this.axis)},setTotal:function(a){this.cum=this.total=a},render:function(a){var b=this.options.formatter.call(this);this.label?this.label.attr({text:b,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(b,0,0).css(this.options.style).attr({align:this.textAlign,rotation:this.options.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=this.isNegative,g=c.translate(this.percent?
100:this.total,0,0,0,1),c=c.translate(0),c=M(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e.attr({visibility:this.options.crop===!1||d.isInsidePlot(f.x,f.y)?ca?"inherit":"visible":"hidden"})}};ob.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},
endOnTick:!1,gridLineColor:"#C0C0C0",labels:G,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#6D869F",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,
tickPixelInterval:72,showLastLabel:!0,labels:{align:"right",x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Y-values"},stackLabels:{enabled:!1,formatter:function(){return this.total},style:G.style}},defaultLeftAxisOptions:{labels:{align:"right",x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{align:"left",x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{align:"center",x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{align:"center",
x:0,y:-5},title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.xOrY=(this.isXAxis=c)?"x":"y";this.opposite=b.opposite;this.side=this.horiz?this.opposite?0:2:this.opposite?1:3;this.setOptions(b);var d=this.options,e=d.type,f=e==="datetime";this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.staggerLines=this.horiz&&d.labels.staggerLines;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.categories=d.categories;this.isLog=
e==="logarithmic";this.isLinked=r(d.linkedTo);this.isDatetimeAxis=f;this.tickmarkOffset=d.categories&&d.tickmarkPlacement==="between"?0.5:0;this.ticks={};this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.min=this.max=null;var g,d=this.options.events;a.axes.push(this);a[c?"xAxis":"yAxis"].push(this);this.series=[];if(a.inverted&&c&&this.reversed===A)this.reversed=
!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;this.addPlotLine=this.addPlotBand=this.addPlotBandOrLine;for(g in d)J(this,g,d[g]);if(this.isLog)this.val2lin=ka,this.lin2val=aa},setOptions:function(a){this.options=B(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],B(N[this.isXAxis?"xAxis":"yAxis"],a))},defaultLabelFormatter:function(){var a=
this.axis,b=this.value,c=this.dateTimeLabelFormat,d=N.lang.numericSymbols,e=d&&d.length,f,g=a.isLog?b:a.tickInterval;if(a.categories)f=b;else if(c)f=db(c,b);else if(e&&g>=1E3)for(;e--&&f===A;)a=Math.pow(1E3,e+1),g>=a&&d[e]!==null&&(f=Ja(b/a,-1)+d[e]);f===A&&(f=b>=1E3?Ja(b,0):Ja(b,-1));return f},getSeriesExtremes:function(){var a=this,b=a.chart,c=a.stacks,d=[],e=[],f;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;o(a.series,function(g){if(g.visible||!b.options.chart.ignoreHiddenSeries){var h=g.options,
i,j,k,l,m,q,p,y,t,o=h.threshold,u,v=[],x=0;a.hasVisibleSeries=!0;if(a.isLog&&o<=0)o=h.threshold=null;if(a.isXAxis){if(h=g.xData,h.length)a.dataMin=O(n(a.dataMin,h[0]),Fa(h)),a.dataMax=s(n(a.dataMax,h[0]),wa(h))}else{var z,E,S,w=g.cropped,B=g.xAxis.getExtremes(),C=!!g.modifyValue;i=h.stacking;a.usePercentage=i==="percent";if(i)m=h.stack,l=g.type+n(m,""),q="-"+l,g.stackKey=l,j=d[l]||[],d[l]=j,k=e[q]||[],e[q]=k;if(a.usePercentage)a.dataMin=0,a.dataMax=99;h=g.processedXData;p=g.processedYData;u=p.length;
for(f=0;f<u;f++)if(y=h[f],t=p[f],i&&(E=(z=t<o)?k:j,S=z?q:l,r(E[y])?(E[y]=da(E[y]+t),t=[t,E[y]]):E[y]=t,c[S]||(c[S]={}),c[S][y]||(c[S][y]=new Kb(a,a.options.stackLabels,z,y,m,i)),c[S][y].setTotal(E[y])),t!==null&&t!==A&&(C&&(t=g.modifyValue(t)),w||(h[f+1]||y)>=B.min&&(h[f-1]||y)<=B.max))if(y=t.length)for(;y--;)t[y]!==null&&(v[x++]=t[y]);else v[x++]=t;if(!a.usePercentage&&v.length)a.dataMin=O(n(a.dataMin,v[0]),Fa(v)),a.dataMax=s(n(a.dataMax,v[0]),wa(v));if(r(o))if(a.dataMin>=o)a.dataMin=o,a.ignoreMinPadding=
!0;else if(a.dataMax<o)a.dataMax=o,a.ignoreMaxPadding=!0}}})},translate:function(a,b,c,d,e,f){var g=this.len,h=1,i=0,j=d?this.oldTransA:this.transA,d=d?this.oldMin:this.min,e=this.options.ordinal||this.isLog&&e;if(!j)j=this.transA;c&&(h*=-1,i=g);this.reversed&&(h*=-1,i-=h*g);b?(this.reversed&&(a=g-a),a=a/j+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),a=h*(a-d)*j+i+h*this.minPixelPadding+(f?j*this.pointRange/2:0));return a},getPlotLinePath:function(a,b,c){var d=this.chart,e=this.left,f=this.top,
g,h,i,a=this.translate(a,null,null,c),j=c&&d.oldChartHeight||d.chartHeight,k=c&&d.oldChartWidth||d.chartWidth,l;g=this.transB;c=h=u(a+g);g=i=u(j-a-g);if(isNaN(a))l=!0;else if(this.horiz){if(g=f,i=j-this.bottom,c<e||c>e+this.width)l=!0}else if(c=e,h=k-this.right,g<f||g>f+this.height)l=!0;return l?null:d.renderer.crispLine(["M",c,g,"L",h,i],b||0)},getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},getLinearTickPositions:function(a,
b,c){for(var d,b=da(U(b/a)*a),c=da(za(c/a)*a),e=[];b<=c;){e.push(b);b=da(b+a);if(b===d)break;d=b}return e},getLogTickPositions:function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=u(a),g=this.getLinearTickPositions(a,b,c);else if(a>=0.08)for(var f=U(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=ka(aa(f)*e[h]),j>b&&g.push(k),k>c&&(l=!0),k=j}else if(b=aa(b),c=aa(c),a=e[d?"minorTickInterval":
"tickInterval"],a=n(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=hb(a,null,K.pow(10,U(K.log(a)/K.LN10))),g=Ta(this.getLinearTickPositions(a,b,c),ka),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog){e=b.length;for(a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0))}else if(this.isDatetimeAxis&&
a.minorTickInterval==="auto")d=d.concat(Cb(Ab(c),this.min,this.max,a.startOfWeek));else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,j;if(this.isXAxis&&this.minRange===A&&!this.isLog)r(a.min)||r(a.max)?this.minRange=null:(o(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===A||h<f)f=h}),this.minRange=O(f*5,
this.dataMax-this.dataMin));if(c-b<this.minRange){var k=this.minRange;d=(k-c+b)/2;d=[b-d,n(a.min,b-d)];if(e)d[2]=this.dataMin;b=wa(d);c=[b+k,n(a.max,b+k)];if(e)c[2]=this.dataMax;c=Fa(c);c-b<k&&(d[0]=c-k,d[1]=n(a.min,c-k),b=wa(d))}this.min=b;this.max=c},setAxisTranslation:function(){var a=this.max-this.min,b=0,c,d=0,e=0,f=this.linkedParent,g=this.transA;if(this.isXAxis)f?(d=f.minPointOffset,e=f.pointRangePadding):o(this.series,function(a){var f=a.pointRange,g=a.options.pointPlacement,k=a.closestPointRange;
b=s(b,f);d=s(d,g?0:f/2);e=s(e,g==="on"?0:f);!a.noSharedTooltip&&r(k)&&(c=r(c)?O(c,k):k)}),this.minPointOffset=d,this.pointRangePadding=e,this.pointRange=b,this.closestPointRange=c;this.oldTransA=g;this.translationSlope=this.transA=g=this.len/(a+e||1);this.transB=this.horiz?this.left:this.bottom;this.minPixelPadding=g*d},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=b.options.tickPositioner,j=d.maxPadding,k=d.minPadding,l=d.tickInterval,
m=d.minTickInterval,q=d.tickPixelInterval,p=b.categories;h?(b.linkedParent=c[g?"xAxis":"yAxis"][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=n(c.min,c.dataMin),b.max=n(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&Oa(11,1)):(b.min=n(b.userMin,d.min,b.dataMin),b.max=n(b.userMax,d.max,b.dataMax));if(e)!a&&O(b.min,n(b.dataMin,b.min))<=0&&Oa(10,1),b.min=da(ka(b.min)),b.max=da(ka(b.max));if(b.range&&(b.userMin=b.min=s(b.min,b.max-b.range),b.userMax=b.max,a))b.range=null;b.adjustForMinRange();
if(!p&&!b.usePercentage&&!h&&r(b.min)&&r(b.max)&&(c=b.max-b.min)){if(!r(d.min)&&!r(b.userMin)&&k&&(b.dataMin<0||!b.ignoreMinPadding))b.min-=c*k;if(!r(d.max)&&!r(b.userMax)&&j&&(b.dataMax>0||!b.ignoreMaxPadding))b.max+=c*j}b.tickInterval=b.min===b.max||b.min===void 0||b.max===void 0?1:h&&!l&&q===b.linkedParent.options.tickPixelInterval?b.linkedParent.tickInterval:n(l,p?1:(b.max-b.min)*q/(b.len||1));g&&!a&&o(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(a);
b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(!l&&b.tickInterval<m)b.tickInterval=m;if(!f&&!e&&(a=K.pow(10,U(K.log(b.tickInterval)/K.LN10)),!l))b.tickInterval=hb(b.tickInterval,null,a,d);b.minorTickInterval=d.minorTickInterval==="auto"&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=i=d.tickPositions||i&&i.apply(b,[b.min,b.max]);if(!i)i=f?(b.getNonLinearTimeTicks||Cb)(Ab(b.tickInterval,
d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):e?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),b.tickPositions=i;if(!h)e=i[0],f=i[i.length-1],h=b.minPointOffset||0,d.startOnTick?b.min=e:b.min-h>e&&i.shift(),d.endOnTick?b.max=f:b.max+h<f&&i.pop(),i.length===1&&(b.min-=1.0E-9,b.max+=1.0E-9)},setMaxTicks:function(){var a=this.chart,b=a.maxTicks,c=this.tickPositions,d=this.xOrY;b||(b={x:0,y:0});if(!this.isLinked&&
!this.isDatetimeAxis&&c.length>b[d]&&this.options.alignTicks!==!1)b[d]=c.length;a.maxTicks=b},adjustTickAmount:function(){var a=this.xOrY,b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&this.options.alignTicks!==!1){var d=this.tickAmount,e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(da(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}if(r(d)&&a!==d)this.isDirty=!0}},setScale:function(){var a=
this.stacks,b,c,d,e;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==this.oldAxisLength;o(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax)if(this.getSeriesExtremes(),this.setTickPositions(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,!this.isDirty)this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax;if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].cum=
a[b][c].total;this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=n(c,!0),e=x(e,{min:a,max:b});F(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.isDirtyExtremes=!0;c&&g.redraw(d)})},zoom:function(a,b){this.setExtremes(a,b,!1,A,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=b.offsetRight||0;this.left=n(b.left,a.plotLeft+c);this.top=n(b.top,a.plotTop);this.width=n(b.width,a.plotWidth-c+d);this.height=n(b.height,a.plotHeight);
this.bottom=a.chartHeight-this.height-this.top;this.right=a.chartWidth-this.width-this.left;this.len=s(this.horiz?this.width:this.height,0)},getExtremes:function(){var a=this.isLog;return{min:a?da(aa(this.min)):this.min,max:a?da(aa(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?aa(this.min):this.min,b=b?aa(this.max):this.max;c>a||a===null?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},addPlotBandOrLine:function(a){a=
(new nb(this,a)).render();this.plotLinesAndBands.push(a);return a},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i,j=0,k,l=0,m=d.title,q=d.labels,p=0,y=b.axisOffset,t=[-1,1,1,-1][h],H;a.hasData=b=a.hasVisibleSeries||r(a.min)&&r(a.max)&&!!e;a.showAxis=i=b||n(d.showEmpty,!0);if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:q.zIndex||
7}).add();if(b||a.isLinked)o(e,function(b){f[b]?f[b].addLabel():f[b]=new Qa(a,b)}),o(e,function(a){if(h===0||h===2||{1:"left",3:"right"}[h]===q.align)p=s(f[a].getLabelSize(),p)}),a.staggerLines&&(p+=(a.staggerLines-1)*16);else for(H in f)f[H].destroy(),delete f[H];if(m&&m.text){if(!a.axisTitle)a.axisTitle=c.text(m.text,0,0,m.useHTML).attr({zIndex:7,rotation:m.rotation||0,align:m.textAlign||{low:"left",middle:"center",high:"right"}[m.align]}).css(m.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(i)j=
a.axisTitle.getBBox()[g?"height":"width"],l=n(m.margin,g?5:10),k=m.offset;a.axisTitle[i?"show":"hide"]()}a.offset=t*n(d.offset,y[h]);a.axisTitleMargin=n(k,p+l+(h!==2&&p&&t*d.labels[g?"y":"x"]));y[h]=s(y[h],a.axisTitleMargin+j+t*a.offset)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d;this.lineTop=c=b.chartHeight-this.bottom-(c?this.height:0)+d;return b.renderer.crispLine(["M",e?this.left:f,e?c:this.top,"L",e?b.chartWidth-this.right:
f,e?c:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=z(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?i:0);return{x:a?d:b+(g?this.width:0)+h+(e.x||0),y:a?b-(g?this.height:0)+h:d+(e.y||0)}},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,
g=a.tickPositions,h=a.axisTitle,i=a.stacks,j=a.ticks,k=a.minorTicks,l=a.alternateBands,m=d.stackLabels,q=d.alternateGridColor,p=a.tickmarkOffset,n=d.lineWidth,t,H=b.hasRendered&&r(a.oldMin)&&!isNaN(a.oldMin),u=a.showAxis,v,s;if(a.hasData||f)if(a.minorTickInterval&&!a.categories&&o(a.getMinorTickPositions(),function(b){k[b]||(k[b]=new Qa(a,b,"minor"));H&&k[b].isNew&&k[b].render(null,!0);k[b].isActive=!0;k[b].render()}),g.length&&o(g.slice(1).concat([g[0]]),function(b,c){c=c===g.length-1?0:c+1;if(!f||
b>=a.min&&b<=a.max)j[b]||(j[b]=new Qa(a,b)),H&&j[b].isNew&&j[b].render(c,!0),j[b].isActive=!0,j[b].render(c)}),q&&o(g,function(b,c){if(c%2===0&&b<a.max)l[b]||(l[b]=new nb(a)),v=b+p,s=g[c+1]!==A?g[c+1]+p:a.max,l[b].options={from:e?aa(v):v,to:e?aa(s):s,color:q},l[b].render(),l[b].isActive=!0}),!a._addedPlotLB)o((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0;o([j,k,l],function(a){for(var b in a)a[b].isActive?a[b].isActive=!1:(a[b].destroy(),delete a[b])});
if(n)t=a.getLinePath(n),a.axisLine?a.axisLine.animate({d:t}):a.axisLine=c.path(t).attr({stroke:d.lineColor,"stroke-width":n,zIndex:7}).add(a.axisGroup),a.axisLine[u?"show":"hide"]();if(h&&u)h[h.isNew?"attr":"animate"](a.getTitlePosition()),h.isNew=!1;if(m&&m.enabled){var x,E,d=a.stackTotalGroup;if(!d)a.stackTotalGroup=d=c.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();d.translate(b.plotLeft,b.plotTop);for(x in i)for(E in b=i[x],b)b[E].render(d)}a.isDirty=!1},removePlotBandOrLine:function(a){for(var b=
this.plotLinesAndBands,c=b.length;c--;)b[c].id===a&&b[c].destroy()},setTitle:function(a,b){var c=this.chart,d=this.options,e=this.axisTitle;d.title=B(d.title,a);this.axisTitle=e&&e.destroy();this.isDirty=!0;n(b,!0)&&c.redraw()},redraw:function(){var a=this.chart;a.tracker.resetTracker&&a.tracker.resetTracker(!0);this.render();o(this.plotLinesAndBands,function(a){a.render()});o(this.series,function(a){a.isDirty=!0})},setCategories:function(a,b){var c=this.chart;this.categories=this.userOptions.categories=
a;o(this.series,function(a){a.translate();a.setTooltipPoints(!0)});this.isDirty=!0;n(b,!0)&&c.redraw()},destroy:function(){var a=this,b=a.stacks,c;R(a);for(c in b)Ga(b[c]),b[c]=null;o([a.ticks,a.minorTicks,a.alternateBands,a.plotLinesAndBands],function(a){Ga(a)});o("stackTotalGroup,axisLine,axisGroup,gridGroup,labelGroup,axisTitle".split(","),function(b){a[b]&&(a[b]=a[b].destroy())})}};pb.prototype={destroy:function(){o(this.crosshairs,function(a){a&&a.destroy()});if(this.label)this.label=this.label.destroy()},
move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden;x(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:g?(2*f.anchorX+c)/3:c,anchorY:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g&&(M(a-f.x)>1||M(b-f.y)>1))clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32)},hide:function(){if(!this.isHidden){var a=this.chart.hoverPoints;this.label.hide();a&&o(a,function(a){a.setState()});this.chart.hoverPoints=null;this.isHidden=!0}},hideCrosshairs:function(){o(this.crosshairs,
function(a){a&&a.hide()})},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=0,g=0,h,a=la(a);c=a[0].tooltipPos;c||(o(a,function(a){h=a.series.yAxis;f+=a.plotX;g+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&h?h.top-d.plotTop:0)}),f/=a.length,g/=a.length,c=[e?d.plotWidth-g:f,this.shared&&!e&&a.length>1&&b?b.chartY-d.plotTop:e?d.plotHeight-f:g]);return Ta(c,u)},getPosition:function(a,b,c){var d=this.chart,e=d.plotLeft,f=d.plotTop,g=d.plotWidth,h=d.plotHeight,i=n(this.options.distance,12),
j=c.plotX,c=c.plotY,d=j+e+(d.inverted?i:-a-i),k=c-b+f+15,l;d<7&&(d=e+s(j,0)+i);d+a>e+g&&(d-=d+a-(e+g),k=c-b+f-i,l=!0);k<f+5&&(k=f+5,l&&c>=k&&c<=k+b&&(k=c+f+i));k+b>f+h&&(k=s(f,f+h-b-i));return{x:d,y:k}},refresh:function(a,b){function c(){var a=this.points||la(this),b=a[0].series,c;c=[b.tooltipHeaderFormatter(a[0].key)];o(a,function(a){b=a.series;c.push(b.tooltipFormatter&&b.tooltipFormatter(a)||a.point.tooltipFormatter(b.tooltipOptions.pointFormat))});c.push(f.footerFormat||"");return c.join("")}
var d=this.chart,e=this.label,f=this.options,g,h,i,j={},k,l=[];k=f.formatter||c;var j=d.hoverPoints,m,q=f.crosshairs;i=this.shared;h=this.getAnchor(a,b);g=h[0];h=h[1];i&&(!a.series||!a.series.noSharedTooltip)?(d.hoverPoints=a,j&&o(j,function(a){a.setState()}),o(a,function(a){a.setState("hover");l.push(a.getLabelConfig())}),j={x:a[0].category,y:a[0].y},j.points=l,a=a[0]):j=a.getLabelConfig();k=k.call(j);j=a.series;i=i||!j.isCartesian||j.tooltipOutsidePlot||d.isInsidePlot(g,h);k===!1||!i?this.hide():
(this.isHidden&&e.show(),e.attr({text:k}),m=f.borderColor||a.color||j.color||"#606060",e.attr({stroke:m}),e=(f.positioner||this.getPosition).call(this,e.width,e.height,{plotX:g,plotY:h}),this.move(u(e.x),u(e.y),g+d.plotLeft,h+d.plotTop),this.isHidden=!1);if(q){q=la(q);for(e=q.length;e--;)if(i=a.series[e?"yAxis":"xAxis"],q[e]&&i)if(i=i.getPlotLinePath(e?n(a.stackY,a.y):a.x,1),this.crosshairs[e])this.crosshairs[e].attr({d:i,visibility:"visible"});else{j={"stroke-width":q[e].width||1,stroke:q[e].color||
"#C0C0C0",zIndex:q[e].zIndex||2};if(q[e].dashStyle)j.dashstyle=q[e].dashStyle;this.crosshairs[e]=d.renderer.path(i).attr(j).add()}}F(d,"tooltipRefresh",{text:k,x:g+d.plotLeft,y:h+d.plotTop,borderColor:m})}};qb.prototype={normalizeMouseEvent:function(a){var b,c,d,a=a||L.event;if(!a.target)a.target=a.srcElement;a=Pb(a);d=a.touches?a.touches.item(0):a;this.chartPosition=b=Vb(this.chart.container);d.pageX===A?(c=a.x,b=a.y):(c=d.pageX-b.left,b=d.pageY-b.top);return x(a,{chartX:u(c),chartY:u(b)})},getMouseCoordinates:function(a){var b=
{xAxis:[],yAxis:[]},c=this.chart;o(c.axes,function(d){var e=d.isXAxis;b[e?"xAxis":"yAxis"].push({axis:d,value:d.translate(((c.inverted?!e:e)?a.chartX-c.plotLeft:d.top+d.len-a.chartY)-d.minPixelPadding,!0)})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},onmousemove:function(a){var b=this.chart,c=b.series,d=b.tooltip,e,f=b.hoverPoint,g=b.hoverSeries,h,i,j=b.chartWidth,k=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!g||
!g.noSharedTooltip)){e=[];h=c.length;for(i=0;i<h;i++)if(c[i].visible&&c[i].options.enableMouseTracking!==!1&&!c[i].noSharedTooltip&&c[i].tooltipPoints&&c[i].tooltipPoints.length)b=c[i].tooltipPoints[k],b._dist=M(k-b[c[i].xAxis.tooltipPosName||"plotX"]),j=O(j,b._dist),e.push(b);for(h=e.length;h--;)e[h]._dist>j&&e.splice(h,1);if(e.length&&e[0].plotX!==this.hoverX)d.refresh(e,a),this.hoverX=e[0].plotX}if(g&&g.tracker&&(b=g.tooltipPoints[k])&&b!==f)b.onMouseOver()},resetTracker:function(a){var b=this.chart,
c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,b=e&&e.shared?b.hoverPoints:d;(a=a&&e&&b)&&la(b)[0].plotX===A&&(a=!1);if(a)e.refresh(b);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&(e.hide(),e.hideCrosshairs());this.hoverX=null}},setDOMEvents:function(){function a(){if(b.selectionMarker){var f={xAxis:[],yAxis:[]},g=b.selectionMarker.getBBox(),h=g.x-c.plotLeft,l=g.y-c.plotTop,m;e&&(o(c.axes,function(a){if(a.options.zoomEnabled!==!1){var b=a.isXAxis,d=c.inverted?!b:b,e=a.translate(d?h:c.plotHeight-l-
g.height,!0,0,0,1),d=a.translate((d?h+g.width:c.plotHeight-l)-2*a.minPixelPadding,!0,0,0,1);!isNaN(e)&&!isNaN(d)&&(f[b?"xAxis":"yAxis"].push({axis:a,min:O(e,d),max:s(e,d)}),m=!0)}}),m&&F(c,"selection",f,function(a){c.zoom(a)}));b.selectionMarker=b.selectionMarker.destroy()}if(c)I(d,{cursor:"auto"}),c.cancelClick=e,c.mouseIsDown=e=!1;R(C,"mouseup",a);Ba&&R(C,"touchend",a)}var b=this,c=b.chart,d=c.container,e,f=b.zoomX&&!c.inverted||b.zoomY&&c.inverted,g=b.zoomY&&!c.inverted||b.zoomX&&c.inverted;b.hideTooltipOnMouseMove=
function(a){a=Pb(a);b.chartPosition&&c.hoverSeries&&c.hoverSeries.isCartesian&&!c.isInsidePlot(a.pageX-b.chartPosition.left-c.plotLeft,a.pageY-b.chartPosition.top-c.plotTop)&&b.resetTracker()};b.hideTooltipOnMouseLeave=function(){b.resetTracker();b.chartPosition=null};d.onmousedown=function(d){d=b.normalizeMouseEvent(d);d.type.indexOf("touch")===-1&&d.preventDefault&&d.preventDefault();c.mouseIsDown=!0;c.cancelClick=!1;c.mouseDownX=b.mouseDownX=d.chartX;b.mouseDownY=d.chartY;J(C,"mouseup",a);Ba&&
J(C,"touchend",a)};var h=function(a){if(!a||!(a.touches&&a.touches.length>1)){var a=b.normalizeMouseEvent(a),d=a.type,h=a.chartX,l=a.chartY,m=!c.isInsidePlot(h-c.plotLeft,l-c.plotTop);if(d.indexOf("touch")===-1)a.returnValue=!1;d==="touchstart"&&(w(a.target,"isTracker")?c.runTrackerClick||a.preventDefault():!c.runChartClick&&!m&&a.preventDefault());if(m)h<c.plotLeft?h=c.plotLeft:h>c.plotLeft+c.plotWidth&&(h=c.plotLeft+c.plotWidth),l<c.plotTop?l=c.plotTop:l>c.plotTop+c.plotHeight&&(l=c.plotTop+c.plotHeight);
if(c.mouseIsDown&&d!=="touchstart"&&(e=Math.sqrt(Math.pow(b.mouseDownX-h,2)+Math.pow(b.mouseDownY-l,2)),e>10)){d=c.isInsidePlot(b.mouseDownX-c.plotLeft,b.mouseDownY-c.plotTop);if(c.hasCartesianSeries&&(b.zoomX||b.zoomY)&&d&&!b.selectionMarker)b.selectionMarker=c.renderer.rect(c.plotLeft,c.plotTop,f?1:c.plotWidth,g?1:c.plotHeight,0).attr({fill:b.options.chart.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();if(b.selectionMarker&&f){var q=h-b.mouseDownX;b.selectionMarker.attr({width:M(q),
x:(q>0?0:q)+b.mouseDownX})}b.selectionMarker&&g&&(l-=b.mouseDownY,b.selectionMarker.attr({height:M(l),y:(l>0?0:l)+b.mouseDownY}));d&&!b.selectionMarker&&b.options.chart.panning&&c.pan(h)}if(!m)b.onmousemove(a);return m||!c.hasCartesianSeries}};if(!/Android 4\.0/.test(na))d.onmousemove=h;J(d,"mouseleave",b.hideTooltipOnMouseLeave);Ba||J(C,"mousemove",b.hideTooltipOnMouseMove);d.ontouchstart=function(a){if(b.zoomX||b.zoomY)d.onmousedown(a);h(a)};d.ontouchmove=h;d.ontouchend=function(){e&&b.resetTracker()};
d.onclick=function(a){var d=c.hoverPoint,e,f,a=b.normalizeMouseEvent(a);a.cancelBubble=!0;if(!c.cancelClick)d&&(w(a.target,"isTracker")||w(a.target.parentNode,"isTracker"))?(e=d.plotX,f=d.plotY,x(d,{pageX:b.chartPosition.left+c.plotLeft+(c.inverted?c.plotWidth-f:e),pageY:b.chartPosition.top+c.plotTop+(c.inverted?c.plotHeight-e:f)}),F(d.series,"click",x(a,{point:d})),d.firePointEvent("click",a)):(x(a,b.getMouseCoordinates(a)),c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)&&F(c,"click",a))}},
destroy:function(){var a=this.chart,b=a.container;if(a.trackerGroup)a.trackerGroup=a.trackerGroup.destroy();R(b,"mouseleave",this.hideTooltipOnMouseLeave);R(C,"mousemove",this.hideTooltipOnMouseMove);b.onclick=b.onmousedown=b.onmousemove=b.ontouchstart=b.ontouchend=b.ontouchmove=null;clearInterval(this.tooltipTimeout)},init:function(a,b){if(!a.trackerGroup)a.trackerGroup=a.renderer.g("tracker").attr({zIndex:9}).add();if(b.enabled)a.tooltip=new pb(a,b);this.setDOMEvents()}};rb.prototype={init:function(a){var b=
this,c=b.options=a.options.legend;if(c.enabled){var d=c.itemStyle,e=n(c.padding,8),f=c.itemMarginTop||0;b.baseline=z(d.fontSize)+3+f;b.itemStyle=d;b.itemHiddenStyle=B(d,c.itemHiddenStyle);b.itemMarginTop=f;b.padding=e;b.initialItemX=e;b.initialItemY=e-5;b.maxItemWidth=0;b.chart=a;b.itemHeight=0;b.lastLineHeight=0;b.render();J(b.chart,"endResize",function(){b.positionCheckboxes()})}},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,
c=b?c.itemStyle.color:g,h=b?a.color:g,g=a.options&&a.options.marker,i={stroke:h,fill:h},j;d&&d.css({fill:c});e&&e.attr({stroke:h});if(f){if(g)for(j in g=a.convertAttribs(g),g)d=g[j],d!==A&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;o(["legendItem","legendLine","legendSymbol",
"legendGroup"],function(b){a[b]&&a[b].destroy()});b&&Na(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight;if(b)c=b.translateY,o(this.allItems,function(e){var f=e.checkbox,g;f&&(g=c+f.y+(a||0)+3,I(f,{left:b.translateX+e.legendItemWidth+f.x-20+"px",top:g+"px",display:g>c-6&&g<c+d-6?"":Q}))})},renderItem:function(a){var p;var b=this,c=b.chart,
d=c.renderer,e=b.options,f=e.layout==="horizontal",g=e.symbolWidth,h=e.symbolPadding,i=b.itemStyle,j=b.itemHiddenStyle,k=b.padding,l=!e.rtl,m=e.width,q=e.itemMarginBottom||0,n=b.itemMarginTop,o=b.initialItemX,t=a.legendItem,r=a.series||a,u=r.options,v=u.showCheckbox,x=e.useHTML;if(!t&&(a.legendGroup=d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup),r.drawLegendSymbol(b,a),a.legendItem=t=d.text(e.labelFormatter.call(a),l?g+h:-h,b.baseline,x).css(B(a.visible?i:j)).attr({align:l?"left":"right",
zIndex:2}).add(a.legendGroup),(x?t:a.legendGroup).on("mouseover",function(){a.setState("hover");t.css(b.options.itemHoverStyle)}).on("mouseout",function(){t.css(a.visible?i:j);a.setState()}).on("click",function(b){var c=function(){a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):F(a,"legendItemClick",b,c)}),b.colorizeItem(a,a.visible),u&&v))a.checkbox=T("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},e.itemCheckboxStyle,c.container),
J(a.checkbox,"click",function(b){F(a,"checkboxClick",{checked:b.target.checked},function(){a.select()})});d=t.getBBox();p=a.legendItemWidth=e.itemWidth||g+h+d.width+k+(v?20:0),e=p;b.itemHeight=g=d.height;if(f&&b.itemX-o+e>(m||c.chartWidth-2*k-o))b.itemX=o,b.itemY+=n+b.lastLineHeight+q,b.lastLineHeight=0;b.maxItemWidth=s(b.maxItemWidth,e);b.lastItemY=n+b.itemY+q;b.lastLineHeight=s(g,b.lastLineHeight);a._legendItemPos=[b.itemX,b.itemY];f?b.itemX+=e:(b.itemY+=n+g+q,b.lastLineHeight=g);b.offsetWidth=
m||s(f?b.itemX-o:e,b.offsetWidth)},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup),a.clipRect=c.clipRect(0,0,9999,b.chartHeight),a.contentGroup.clip(a.clipRect);e=[];o(b.series,function(a){var b=a.options;
b.showInLegend&&(e=e.concat(a.legendItems||(b.legendType==="point"?a.data:a)))});Ib(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;o(e,function(b){a.renderItem(b)});g=j.width||a.offsetWidth;h=a.lastItemY+a.lastLineHeight;h=a.handleOverflow(h);if(l||m){g+=k;h+=k;if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp(null,null,null,g,h)),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,
l||0).attr({stroke:j.borderColor,"stroke-width":l||0,fill:m||Q}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;o(e,function(b){a.positionItem(b)});f&&d.align(x({width:g,height:h},j),!0,b.spacingBox);b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h=this.clipRect,i=e.navigation,j=n(i.animation,!0),k=
i.arrowSize||12,l=this.nav;e.layout==="horizontal"&&(f/=2);g&&(f=O(f,g));if(a>f){this.clipHeight=c=f-20;this.pageCount=za(a/c);this.currentPage=n(this.currentPage,1);this.fullHeight=a;h.attr({height:c});if(!l)this.nav=l=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,k,k).on("click",function(){b.scroll(-1,j)}).add(l),this.pager=d.text("",15,10).css(i.style).add(l),this.down=d.symbol("triangle-down",0,0,k,k).on("click",function(){b.scroll(1,j)}).add(l);b.scroll(0);a=f}else if(l)h.attr({height:c.chartHeight}),
l.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pageCount,d=this.currentPage+a,e=this.clipHeight,f=this.options.navigation,g=f.activeColor,h=f.inactiveColor,f=this.pager,i=this.padding;d>c&&(d=c);if(d>0)b!==A&&xa(b,this.chart),this.nav.attr({translateX:i,translateY:e+7,visibility:"visible"}),this.up.attr({fill:d===1?h:g}).css({cursor:d===1?"default":"pointer"}),f.attr({text:d+"/"+this.pageCount}),this.down.attr({x:18+this.pager.getBBox().width,
fill:d===c?h:g}).css({cursor:d===c?"default":"pointer"}),e=-O(e*(d-1),this.fullHeight-e+i)+1,this.scrollGroup.animate({translateY:e}),f.attr({text:d+"/"+c}),this.currentPage=d,this.positionCheckboxes(e)}};sb.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=B(N,a);c.series=a.series=d;var d=c.chart,e=d.margin,e=Y(e)?e:[e,e,e,e];this.optionsMarginTop=n(d.marginTop,e[0]);this.optionsMarginRight=n(d.marginRight,e[1]);this.optionsMarginBottom=n(d.marginBottom,e[2]);this.optionsMarginLeft=
n(d.marginLeft,e[3]);this.runChartClick=(e=d.events)&&!!e.click;this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f;this.index=Ha.length;Ha.push(this);d.reflow!==!1&&J(this,"load",this.initReflow);if(e)for(f in e)J(this,f,e[f]);this.xAxis=[];this.yAxis=[];this.animation=V?!1:n(d.animation,!0);this.pointCount=0;this.counters=new Hb;this.firstRender()},initSeries:function(a){var b=this.options.chart,b=new $[a.type||b.type||b.defaultSeriesType];
b.init(this,a);return b},addSeries:function(a,b,c){var d,e=this;a&&(xa(c,e),b=n(b,!0),F(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;b&&e.redraw()}));return d},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},adjustTickAmounts:function(){this.options.chart.alignTicks!==!1&&o(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.tracker,e=this.legend,
f=this.isDirtyLegend,g,h=this.isDirtyBox,i=c.length,j=i,k=this.renderer,l=k.isHidden(),m=[];xa(a,this);for(l&&this.cloneRenderTo();j--;)if(a=c[j],a.isDirty&&a.options.stacking){g=!0;break}if(g)for(j=i;j--;)if(a=c[j],a.options.stacking)a.isDirty=!0;o(c,function(a){a.isDirty&&a.options.legendType==="point"&&(f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;if(this.hasCartesianSeries){if(!this.isResizing)this.maxTicks=null,o(b,function(a){a.setScale()});this.adjustTickAmounts();this.getMargins();
o(b,function(a){if(a.isDirtyExtremes)a.isDirtyExtremes=!1,m.push(function(){F(a,"afterSetExtremes",a.getExtremes())});if(a.isDirty||h||g)a.redraw(),h=!0})}h&&this.drawChartBox();o(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.resetTracker&&d.resetTracker(!0);k.draw();F(this,"redraw");l&&this.cloneRenderTo(!0);o(m,function(a){a.call()})},showLoading:function(a){var b=this.options,c=this.loadingDiv,d=b.loading;if(!c)this.loadingDiv=c=T(ga,{className:"highcharts-loading"},
x(d.style,{left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px",zIndex:10,display:Q}),this.container),this.loadingSpan=T("span",null,d.labelStyle,c);this.loadingSpan.innerHTML=a||b.lang.loading;if(!this.loadingShown)I(c,{opacity:0,display:""}),xb(c,{opacity:d.style.opacity},{duration:d.showDuration||0}),this.loadingShown=!0},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&xb(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){I(b,
{display:Q})}});this.loadingShown=!1},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis||{},b=b.yAxis||{},c=la(c);o(c,function(a,b){a.index=b;a.isX=!0});b=la(b);o(b,function(a,b){a.index=b});c=c.concat(b);o(c,function(b){new ob(a,
b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];o(this.series,function(b){a=a.concat(Ob(b.points,function(a){return a.selected}))});return a},getSelectedSeries:function(){return Ob(this.series,function(a){return a.selected})},showResetZoom:function(){var a=this,b=N.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,
title:b.resetZoomTitle}).add().align(c.position,!1,a[f]);this.resetZoomButton.alignTo=f},zoomOut:function(){var a=this,b=a.resetZoomButton;F(a,"selection",{resetSelection:!0},function(){a.zoom()});if(b)a.resetZoomButton=b.destroy()},zoom:function(a){var b=this,c;!a||a.resetSelection?o(b.axes,function(a){c=a.zoom()}):o(a.xAxis.concat(a.yAxis),function(a){var e=a.axis;if(b.tracker[e.isXAxis?"zoomX":"zoomY"])c=e.zoom(a.min,a.max)});b.resetZoomButton||b.showResetZoom();c&&b.redraw(n(b.options.chart.animation,
b.pointCount<100))},pan:function(a){var b=this.xAxis[0],c=this.mouseDownX,d=b.pointRange/2,e=b.getExtremes(),f=b.translate(c-a,!0)+d,c=b.translate(c+this.plotWidth-a,!0)-d;(d=this.hoverPoints)&&o(d,function(a){a.setState()});b.series.length&&f>O(e.dataMin,e.min)&&c<s(e.dataMax,e.max)&&b.setExtremes(f,c,!0,!1,{trigger:"pan"});this.mouseDownX=a;I(this.container,{cursor:"move"})},setTitle:function(a,b){var c=this,d=c.options,e;c.chartTitleOptions=e=B(d.title,a);c.chartSubtitleOptions=d=B(d.subtitle,
b);o([["title",a,e],["subtitle",b,d]],function(a){var b=a[0],d=c[b],e=a[1],a=a[2];d&&e&&(c[b]=d=d.destroy());a&&a.text&&!d&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add().align(a,!1,c.spacingBox))})},getChartSize:function(){var a=this.options.chart,b=this.renderToClone||this.renderTo;this.containerWidth=eb(b,"width");this.containerHeight=eb(b,"height");this.chartWidth=s(0,n(a.width,this.containerWidth,600));this.chartHeight=
s(0,n(a.height,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Na(b),delete this.renderToClone):(c&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),I(b,{position:"absolute",top:"-9999px",display:"block"}),C.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,e;this.renderTo=a=b.renderTo;e="highcharts-"+tb++;if(ja(a))this.renderTo=
a=C.getElementById(a);a||Oa(13,!0);c=z(w(a,"data-highcharts-chart"));!isNaN(c)&&Ha[c]&&Ha[c].destroy();w(a,"data-highcharts-chart",this.index);a.innerHTML="";a.offsetWidth||this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=T(ga,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},x({position:"relative",overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0},b.style),this.renderToClone||a);this.renderer=
b.forExport?new sa(a,c,d,!0):new Sa(a,c,d);V&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.options.chart,b=a.spacingTop,c=a.spacingRight,d=a.spacingBottom,a=a.spacingLeft,e,f=this.legend,g=this.optionsMarginTop,h=this.optionsMarginLeft,i=this.optionsMarginRight,j=this.optionsMarginBottom,k=this.chartTitleOptions,l=this.chartSubtitleOptions,m=this.options.legend,q=n(m.margin,10),p=m.x,y=m.y,t=m.align,u=m.verticalAlign;this.resetMargins();e=this.axisOffset;if((this.title||this.subtitle)&&
!r(this.optionsMarginTop))if(l=s(this.title&&!k.floating&&!k.verticalAlign&&k.y||0,this.subtitle&&!l.floating&&!l.verticalAlign&&l.y||0))this.plotTop=s(this.plotTop,l+n(k.margin,15)+b);if(f.display&&!m.floating)if(t==="right"){if(!r(i))this.marginRight=s(this.marginRight,f.legendWidth-p+q+c)}else if(t==="left"){if(!r(h))this.plotLeft=s(this.plotLeft,f.legendWidth+p+q+a)}else if(u==="top"){if(!r(g))this.plotTop=s(this.plotTop,f.legendHeight+y+q+b)}else if(u==="bottom"&&!r(j))this.marginBottom=s(this.marginBottom,
f.legendHeight-y+q+d);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&o(this.axes,function(a){a.getOffset()});r(h)||(this.plotLeft+=e[3]);r(g)||(this.plotTop+=e[0]);r(j)||(this.marginBottom+=e[2]);r(i)||(this.marginRight+=e[1]);this.setChartSize()},initReflow:function(){function a(a){var g=c.width||eb(d,"width"),h=c.height||eb(d,"height"),a=a?a.target:L;if(!b.hasUserSize&&g&&h&&(a===L||a===C)){if(g!==
b.containerWidth||h!==b.containerHeight)clearTimeout(e),b.reflowTimeout=e=setTimeout(function(){if(b.container)b.setSize(g,h,!1),b.hasUserSize=null},100);b.containerWidth=g;b.containerHeight=h}}var b=this,c=b.options.chart,d=b.renderTo,e;J(L,"resize",a);J(b,"destroy",function(){R(L,"resize",a)})},setSize:function(a,b,c){var d=this,e,f,g=d.resetZoomButton,h=d.title,i=d.subtitle,j;d.isResizing+=1;j=function(){d&&F(d,"endResize",null,function(){d.isResizing-=1})};xa(c,d);d.oldChartHeight=d.chartHeight;
d.oldChartWidth=d.chartWidth;if(r(a))d.chartWidth=e=s(0,u(a)),d.hasUserSize=!!e;if(r(b))d.chartHeight=f=s(0,u(b));I(d.container,{width:e+"px",height:f+"px"});d.renderer.setSize(e,f,c);d.plotWidth=e-d.plotLeft-d.marginRight;d.plotHeight=f-d.plotTop-d.marginBottom;d.maxTicks=null;o(d.axes,function(a){a.isDirty=!0;a.setScale()});o(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.getMargins();a=d.spacingBox;h&&h.align(null,null,a);i&&i.align(null,null,a);g&&g.align&&g.align(null,
null,d[g.alignTo]);d.redraw(c);d.oldChartHeight=null;F(d,"resize");Pa===!1?j():setTimeout(j,Pa&&Pa.duration||500)},setChartSize:function(){var a=this.inverted,b=this.chartWidth,c=this.chartHeight,d=this.options.chart,e=d.spacingTop,f=d.spacingRight,g=d.spacingBottom,h=d.spacingLeft,i,j,k,l;this.plotLeft=i=u(this.plotLeft);this.plotTop=j=u(this.plotTop);this.plotWidth=k=s(0,u(b-i-this.marginRight));this.plotHeight=l=s(0,u(c-j-this.marginBottom));this.plotSizeX=a?l:k;this.plotSizeY=a?k:l;this.plotBorderWidth=
a=d.plotBorderWidth||0;this.spacingBox={x:h,y:e,width:b-h-f,height:c-e-g};this.plotBox={x:i,y:j,width:k,height:l};this.clipBox={x:a/2,y:a/2,width:this.plotSizeX-a,height:this.plotSizeY-a};o(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.options.chart,b=a.spacingRight,c=a.spacingBottom,d=a.spacingLeft;this.plotTop=n(this.optionsMarginTop,a.spacingTop);this.marginRight=n(this.optionsMarginRight,b);this.marginBottom=n(this.optionsMarginBottom,c);this.plotLeft=
n(this.optionsMarginLeft,d);this.axisOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,n,p=this.plotLeft,o=this.plotTop,t=this.plotWidth,r=this.plotHeight,u=this.plotBox,v=this.clipRect,s=this.clipBox;n=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp(null,
null,null,c-n,d-n));else{e={fill:j||Q};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(n/2,n/2,c-n,d-n,a.borderRadius,i).attr(e).add().shadow(a.shadow)}if(k)f?f.animate(u):this.plotBackground=b.rect(p,o,t,r,0).attr({fill:k}).add().shadow(a.plotShadow);if(l)h?h.animate(u):this.plotBGImage=b.image(l,p,o,t,r).add();v?v.animate({width:s.width,height:s.height}):this.clipRect=b.clipRect(s);if(m)g?g.animate(g.crisp(null,p,o,t,r)):this.plotBorder=b.rect(p,o,t,r,0,m).attr({stroke:a.plotBorderColor,
"stroke-width":m,zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;o(["inverted","angular","polar"],function(g){c=$[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=$[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},render:function(){var a=this,b=a.axes,c=a.renderer,d=a.options,e=d.labels,d=d.credits,f;a.setTitle();a.legend=new rb(a);o(b,function(a){a.setScale()});a.getMargins();a.maxTicks=null;
o(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&o(b,function(a){a.render()});if(!a.seriesGroup)a.seriesGroup=c.g("series-group").attr({zIndex:3}).add();o(a.series,function(a){a.translate();a.setTooltipPoints();a.render()});e.items&&o(e.items,function(b){var d=x(e.style,b.style),f=z(d.left)+a.plotLeft,j=z(d.top)+a.plotTop+12;delete d.left;delete d.top;c.text(b.html,f,j).attr({zIndex:2}).css(d).add()});if(d.enabled&&
!a.credits)f=d.href,a.credits=c.text(d.text,0,0).on("click",function(){if(f)location.href=f}).attr({align:d.position.align,zIndex:8}).css(d.style).add().align(d.position);a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;F(a,"destroy");Ha[a.index]=A;a.renderTo.removeAttribute("data-highcharts-chart");R(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();o("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,tracker,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),
function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",R(d),f&&Na(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!ca&&L==L.top&&C.readyState!=="complete"||V&&!L.canvg?(V?Rb.push(function(){a.firstRender()},a.options.global.canvasToolsURL):C.attachEvent("onreadystatechange",function(){C.detachEvent("onreadystatechange",a.firstRender);C.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;if(a.isReadyToRender()){a.getContainer();
F(a,"init");if(Highcharts.RangeSelector&&b.rangeSelector.enabled)a.rangeSelector=new Highcharts.RangeSelector(a);a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();o(b.series||[],function(b){a.initSeries(b)});if(Highcharts.Scroller&&(b.navigator.enabled||b.scrollbar.enabled))a.scroller=new Highcharts.Scroller(a);a.tracker=new qb(a,b);a.render();a.renderer.draw();c&&c.apply(a,[a]);o(a.callbacks,function(b){b.apply(a,[a])});a.cloneRenderTo(!0);F(a,"load")}}};sb.prototype.callbacks=[];
var Ua=function(){};Ua.prototype={init:function(a,b,c){var d=a.chart.counters;this.series=a;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint)b=a.chart.options.colors,this.color=this.color||b[d.color++],d.wrapColor(b.length);a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=typeof a;this.config=a;if(d==="number"||a===null)this.y=a;else if(typeof a[0]==="number")this.x=a[0],this.y=a[1];else if(d==="object"&&typeof a.length!=="number"){x(this,a);this.options=
a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}else if(typeof a[0]==="string")this.name=a[0],this.y=a[1];if(this.x===A)this.x=b===A?c.autoIncrement():b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),ta(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)R(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a=
"graphic,tracker,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series.chart,a=n(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=a;c.setState(a&&"select");b||o(d.getSelectedPoints(),
function(a){if(a.selected&&a!==c)a.selected=!1,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(){var a=this.series,b=a.chart,c=b.tooltip,d=b.hoverPoint;if(d&&d!==this)d.onMouseOut();this.firePointEvent("mouseOver");c&&(!c.shared||a.noSharedTooltip)&&c.refresh(this);this.setState("hover");b.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;if(!b||Ub(this,b)===-1)this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null},tooltipFormatter:function(a){var b=
this.series,c=b.tooltipOptions,d=a.match(/\{(series|point)\.[a-zA-Z]+\}/g),e=/[{\.}]/,f,g,h,i,j={y:0,open:0,high:0,low:0,close:0,percentage:1,total:1};c.valuePrefix=c.valuePrefix||c.yPrefix;c.valueDecimals=n(c.valueDecimals,c.yDecimals);c.valueSuffix=c.valueSuffix||c.ySuffix;for(i in d)g=d[i],ja(g)&&g!==a&&(h=(" "+g).split(e),f={point:this,series:b}[h[1]],h=h[2],f===this&&j.hasOwnProperty(h)?(f=j[h]?h:"value",f=(c[f+"Prefix"]||"")+Ja(this[h],n(c[f+"Decimals"],-1))+(c[f+"Suffix"]||"")):f=f[h],a=a.replace(g,
f));return a},update:function(a,b,c){var d=this,e=d.series,f=d.graphic,g,h=e.data,i=h.length,j=e.chart,b=n(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);Y(a)&&(e.getAttribs(),f&&f.attr(d.pointAttr[e.state]));for(g=0;g<i;g++)if(h[g]===d){e.xData[g]=d.x;e.yData[g]=d.toYData?d.toYData():d.y;e.options.data[g]=a;break}e.isDirty=!0;e.isDirtyData=!0;b&&j.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.chart,f,g=d.data,h=g.length;xa(b,e);a=n(a,!0);c.firePointEvent("remove",
null,function(){for(f=0;f<h;f++)if(g[f]===c){g.splice(f,1);d.options.data.splice(f,1);d.xData.splice(f,1);d.yData.splice(f,1);break}c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&e.redraw()})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});F(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=
B(this.series.options.point,this.options).events,b;this.events=a;for(b in a)J(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a){var b=this.plotX,c=this.plotY,d=this.series,e=d.options.states,f=X[d.type].marker&&d.options.marker,g=f&&!f.enabled,h=f&&f.states[a],i=h&&h.enabled===!1,j=d.stateMarkerGraphic,k=d.chart,l=this.pointAttr,a=a||"";if(!(a===this.state||this.selected&&a!=="select"||e[a]&&e[a].enabled===!1||a&&(i||g&&!h.enabled))){if(this.graphic)e=f&&this.graphic.symbolName&&l[a].r,
this.graphic.attr(B(l[a],e?{x:b-e,y:c-e,width:2*e,height:2*e}:{}));else{if(a&&h)e=h.radius,j?j.attr({x:b-e,y:c-e}):d.stateMarkerGraphic=j=k.renderer.symbol(d.symbol,b-e,c-e,2*e,2*e).attr(l[a]).add(d.markerGroup);if(j)j[a&&k.isInsidePlot(b,c)?"show":"hide"]()}this.state=a}}};var P=function(){};P.prototype={isCartesian:!0,type:"line",pointClass:Ua,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},init:function(a,b){var c,d;this.chart=
a;this.options=b=this.setOptions(b);this.bindAxes();x(this,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(V)b.animation=!1;d=b.events;for(c in d)J(this,c,d[c]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;this.getColor();this.getSymbol();this.setData(b.data,!1);if(this.isCartesian)a.hasCartesianSeries=!0;a.series.push(this);Ib(a.series,function(a,b){return(a.options.index||0)-(b.options.index||0)});o(a.series,
function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;a.isCartesian&&o(["xAxis","yAxis"],function(e){o(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]===A&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0})})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=n(b,a.pointStart,0);this.pointInterval=n(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],
c,d=this.points,e=d.length;if(e)if(this.options.connectNulls){for(c=e;c--;)d[c].y===null&&d.splice(c,1);d.length&&(b=[d])}else o(d,function(c,g){c.y===null?(g>a+1&&b.push(d.slice(a+1,g)),a=g):g===e-1&&b.push(d.slice(a+1,g+1))});this.segments=b},setOptions:function(a){var b=this.chart.options,c=b.plotOptions,d=c[this.type],e=a.data;a.data=null;c=B(d,c.series,a);c.data=a.data=e;this.tooltipOptions=B(b.tooltip,c.tooltip);d.marker===null&&delete c.marker;return c},getColor:function(){var a=this.options,
b=this.chart.options.colors,c=this.chart.counters;this.color=a.color||!a.colorByPoint&&b[c.color++]||"gray";c.wrapColor(b.length)},getSymbol:function(){var a=this.options.marker,b=this.chart,c=b.options.symbols,b=b.counters;this.symbol=a.symbol||c[b.symbol++];if(/^url/.test(this.symbol))a.radius=0;b.wrapSymbol(c.length)},drawLegendSymbol:function(a){var b=this.options,c=b.marker,d=a.options.symbolWidth,e=this.chart.renderer,f=this.legendGroup,a=a.baseline,g;if(b.lineWidth){g={"stroke-width":b.lineWidth};
if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=e.path(["M",0,a-4,"L",d,a-4]).attr(g).add(f)}if(c&&c.enabled)b=c.radius,this.legendSymbol=e.symbol(this.symbol,d/2-b,a-4-b,2*b,2*b).add(f)},addPoint:function(a,b,c,d){var e=this.options,f=this.data,g=this.graph,h=this.area,i=this.chart,j=this.xData,k=this.yData,l=g&&g.shift||0,m=e.data,q=this.pointClass.prototype;xa(d,i);if(g&&c)g.shift=l+1;if(h){if(c)h.shift=l+1;h.isArea=!0}b=n(b,!0);d={series:this};q.applyOptions.apply(d,[a]);j.push(d.x);k.push(q.toYData?
q.toYData.call(d):d.y);m.push(a);e.legendType==="point"&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),j.shift(),k.shift(),m.shift()));this.getAttribs();this.isDirtyData=this.isDirty=!0;b&&i.redraw()},setData:function(a,b){var c=this.points,d=this.options,e=this.initialColor,f=this.chart,g=null,h=this.xAxis,i,j=this.pointClass.prototype;this.xIncrement=null;this.pointRange=h&&h.categories?1:d.pointRange;if(r(e))f.counters.color=e;var e=[],k=[],l=a?a.length:[],m=(i=this.pointArrayMap)&&
i.length;if(l>(d.turboThreshold||1E3)){for(i=0;g===null&&i<l;)g=a[i],i++;if(Da(g)){j=n(d.pointStart,0);d=n(d.pointInterval,1);for(i=0;i<l;i++)e[i]=j,k[i]=a[i],j+=d;this.xIncrement=j}else if(Ia(g))if(m)for(i=0;i<l;i++)d=a[i],e[i]=d[0],k[i]=d.slice(1,m+1);else for(i=0;i<l;i++)d=a[i],e[i]=d[0],k[i]=d[1]}else for(i=0;i<l;i++)d={series:this},j.applyOptions.apply(d,[a[i]]),e[i]=d.x,k[i]=j.toYData?j.toYData.call(d):d.y;this.requireSorting&&e.length>1&&e[1]<e[0]&&Oa(15);ja(k[0])&&Oa(14,!0);this.data=[];this.options.data=
a;this.xData=e;this.yData=k;for(i=c&&c.length||0;i--;)c[i]&&c[i].destroy&&c[i].destroy();if(h)h.minRange=h.userMinRange;this.isDirty=this.isDirtyData=f.isDirtyBox=!0;n(b,!0)&&f.redraw(!1)},remove:function(a,b){var c=this,d=c.chart,a=n(a,!0);if(!c.isRemoving)c.isRemoving=!0,F(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;a&&d.redraw(b)});c.isRemoving=!1},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e=0,f=d,g,h,i=this.xAxis,j=this.options,k=j.cropThreshold,
l=this.isCartesian;if(l&&!this.isDirty&&!i.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(l&&this.sorted&&(!k||d>k||this.forceCrop))if(a=i.getExtremes(),i=a.min,k=a.max,b[d-1]<i||b[0]>k)b=[],c=[];else if(b[0]<i||b[d-1]>k){for(a=0;a<d;a++)if(b[a]>=i){e=s(0,a-1);break}for(;a<d;a++)if(b[a]>k){f=a+1;break}b=b.slice(e,f);c=c.slice(e,f);g=!0}for(a=b.length-1;a>0;a--)if(d=b[a]-b[a-1],d>0&&(h===A||d<h))h=d;this.cropped=g;this.cropStart=e;this.processedXData=b;this.processedYData=c;if(j.pointRange===null)this.pointRange=
h||1;this.closestPointRange=h},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,j?l[m]=(new f).init(this,[d[m]].concat(la(e[m]))):(b[i]?k=b[i]:a[i]!==A&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k);if(b&&(g!==(c=b.length)||j))for(m=0;m<c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),
b[m].plotX=A;this.data=b;this.points=l},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.chart,b=this.options,c=b.stacking,d=this.xAxis,e=d.categories,f=this.yAxis,g=this.points,h=g.length,i=!!this.modifyValue,j,k=f.series,l=k.length,m=b.pointPlacement==="between";l--;)if(k[l].visible){k[l]===this&&(j=!0);break}for(l=0;l<h;l++){var k=g[l],q=k.x,p=k.y,o=k.low,t=f.stacks[(p<b.threshold?"-":"")+this.stackKey];k.plotX=d.translate(q,0,0,0,1,m);if(c&&this.visible&&
t&&t[q])o=t[q],q=o.total,o.cum=o=o.cum-p,p=o+p,j&&(o=n(b.threshold,f.min)),f.isLog&&o<=0&&(o=null),c==="percent"&&(o=q?o*100/q:0,p=q?p*100/q:0),k.percentage=q?k.y*100/q:0,k.total=k.stackTotal=q,k.stackY=p;k.yBottom=r(o)?f.translate(o,0,1,0,1):null;i&&(p=this.modifyValue(p,k));k.plotY=typeof p==="number"?u(f.translate(p,0,1,0,1)*10)/10:A;k.clientX=a.inverted?a.plotHeight-k.plotX:k.plotX;k.category=e&&e[k.x]!==A?e[k.x]:k.x}this.getSegments()},setTooltipPoints:function(a){var b=[],c,d,e=(c=this.xAxis)?
c.tooltipLen||c.len:this.chart.plotSizeX,f=c&&c.tooltipPosName||"plotX",g,h,i=[];if(this.options.enableMouseTracking!==!1){if(a)this.tooltipPoints=null;o(this.segments||this.points,function(a){b=b.concat(a)});c&&c.reversed&&(b=b.reverse());a=b.length;for(h=0;h<a;h++){g=b[h];c=b[h-1]?d+1:0;for(d=b[h+1]?s(0,U((g[f]+(b[h+1]?b[h+1][f]:e))/2)):e;c>=0&&c<=d;)i[c++]=g}this.tooltipPoints=i}},tooltipHeaderFormatter:function(a){var b=this.tooltipOptions,c=b.xDateFormat,d=this.xAxis,e=d&&d.options.type==="datetime",
f;if(e&&!c)for(f in D)if(D[f]>=d.closestPointRange){c=b.dateTimeLabelFormats[f];break}return b.headerFormat.replace("{point.key}",e&&Da(a)?db(c,a):a).replace("{series.name}",this.name).replace("{series.color}",this.color)},onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&F(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;if(d)d.onMouseOut();
this&&a.events.mouseOut&&F(this,"mouseOut");c&&!a.stickyTracking&&!c.shared&&c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=this,c=b.chart,d=c.renderer,e;e=b.options.animation;var f=c.clipBox,g=c.inverted,h;if(e&&!Y(e))e=X[b.type].animation;h="_sharedClip"+e.duration+e.easing;if(a)a=c[h],e=c[h+"m"],a||(c[h]=a=d.clipRect(x(f,{width:0})),c[h+"m"]=e=d.clipRect(-99,g?-c.plotLeft:-c.plotTop,99,g?c.chartWidth:c.chartHeight)),b.group.clip(a),b.markerGroup.clip(e),b.sharedClipKey=
h;else{if(a=c[h])a.animate({width:c.plotSizeX},e),c[h+"m"].animate({width:c.plotSizeX+99},e);b.animate=null;b.animationTimeout=setTimeout(function(){b.afterAnimate()},e.duration)}},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group,d=this.trackerGroup;c&&this.options.clip!==!1&&(c.clip(a.clipRect),d&&d.clip(a.clipRect),this.markerGroup.clip());setTimeout(function(){b&&a[b]&&(a[b]=a[b].destroy(),a[b+"m"]=a[b+"m"].destroy())},100)},drawPoints:function(){var a,b=this.points,c=
this.chart,d,e,f,g,h,i,j,k,l=this.options.marker,m,o=this.markerGroup;if(l.enabled||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=g.plotX,e=g.plotY,k=g.graphic,i=g.marker||{},a=l.enabled&&i.enabled===A||i.enabled,m=c.isInsidePlot(d,e,c.inverted),a&&e!==A&&!isNaN(e))if(a=g.pointAttr[g.selected?"select":""],h=a.r,i=n(i.symbol,this.symbol),j=i.indexOf("url")===0,k)k.attr({visibility:m?ca?"inherit":"visible":"hidden"}).animate(x({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(m&&
(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h).attr(a).add(o)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=n(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=X[a.type].marker?a.options.marker:a.options,c=b.states,d=c.hover,e,f=a.color,g={stroke:f,fill:f},h=a.points||[],i=[],j,k=a.pointAttrToOptions,l;a.options.marker?(d.radius=d.radius||b.radius+2,d.lineWidth=
d.lineWidth||b.lineWidth+1):d.color=d.color||qa(d.color||f).brighten(d.brightness).get();i[""]=a.convertAttribs(b,g);o(["hover","select"],function(b){i[b]=a.convertAttribs(c[b],i[""])});a.pointAttr=i;for(f=h.length;f--;){g=h[f];if((b=g.options&&g.options.marker||g.options)&&b.enabled===!1)b.radius=0;e=a.options.colorByPoint;if(g.options)for(l in k)r(b[k[l]])&&(e=!0);if(e){b=b||{};j=[];c=b.states||{};e=c.hover=c.hover||{};if(!a.options.marker)e.color=qa(e.color||g.color).brighten(e.brightness||d.brightness).get();
j[""]=a.convertAttribs(x({color:g.color},b),i[""]);j.hover=a.convertAttribs(c.hover,i.hover,j[""]);j.select=a.convertAttribs(c.select,i.select,j[""])}else j=i;g.pointAttr=j}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(na),d,e,f=a.data||[],g,h,i;F(a,"destroy");R(a);o(["xAxis","yAxis"],function(b){if(i=a[b])ta(i.series,a),i.isDirty=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);
o("area,graph,dataLabelsGroup,group,markerGroup,tracker,trackerGroup".split(","),function(b){a[b]&&(d=c&&b==="group"?"hide":"destroy",a[b][d]())});if(b.hoverSeries===a)b.hoverSeries=null;ta(b.series,a);for(h in a)delete a[h]},drawDataLabels:function(){var a=this,b=a.options.dataLabels,c=a.points,d,e,f,g;if(b.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(b),g=a.plotGroup("dataLabelsGroup","data-labels",a.visible?"visible":"hidden",b.zIndex||6),e=b,o(c,function(c){var i,j=c.dataLabel,
k,l=!0;d=c.options&&c.options.dataLabels;i=e.enabled||d&&d.enabled;if(j&&!i)c.dataLabel=j.destroy();else if(i){i=b.rotation;b=B(e,d);f=b.formatter.call(c.getLabelConfig(),b);b.style.color=n(b.color,b.style.color,a.color,"black");if(j)j.attr({text:f}),l=!1;else if(r(f)){j={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:i,padding:b.padding,zIndex:1};for(k in j)j[k]===A&&delete j[k];j=c.dataLabel=a.chart.renderer[i?"text":"label"](f,0,-999,null,
null,null,b.useHTML).attr(j).css(b.style).add(g).shadow(b.shadow)}j&&a.alignDataLabel(c,j,b,null,l)}})},alignDataLabel:function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=n(a.plotX,-999),a=n(a.plotY,-999),i=b.getBBox(),d=x({x:g?f.plotWidth-a:h,y:u(g?f.plotHeight-h:a),width:0,height:0},d);x(c,{width:i.width,height:i.height});c.rotation?(d={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](d)):(b.align(c,null,d),d=b.alignAttr);b.attr({visibility:c.crop===!1||f.isInsidePlot(d.x,
d.y)||f.isInsidePlot(h,a,g)?f.renderer.isSVG?"inherit":"visible":"hidden"})},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;o(a,function(e,f){var g=e.plotX,h=e.plotY,i;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,e,f)):(c.push(f?"L":"M"),d&&f&&(i=a[f-1],d==="right"?c.push(i.plotX,h):d==="center"?c.push((i.plotX+g)/2,i.plotY,(i.plotX+g)/2,h):c.push(g,i.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=this,b=[],c,d=[];o(a.segments,function(e){c=a.getSegmentPath(e);
e.length>1?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this.options,b=this.graph,c=this.group,d=a.lineColor||this.color,e=a.lineWidth,f=a.dashStyle,g=this.getGraphPath();if(b)fb(b),b.animate({d:g});else if(e){b={stroke:d,"stroke-width":e,zIndex:1};if(f)b.dashstyle=f;this.graph=this.chart.renderer.path(g).attr(b).add(c).shadow(a.shadow)}},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};o(["group","trackerGroup","markerGroup"],
function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;J(c,"resize",a);J(b,"destroy",function(){R(c,"resize",a)});a();b.invertGroups=a},plotGroup:function(a,b,c,d,e){var f=this[a],g=this.chart,h=this.xAxis,i=this.yAxis;f||(this[a]=f=g.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f.translate(h?h.left:g.plotLeft,i?i.top:g.plotTop);return f},render:function(){var a=this.chart,b,c=this.options,d=c.animation&&!!this.animate,e=this.visible?"visible":"hidden",f=c.zIndex,g=this.hasRendered,
h=a.seriesGroup;b=this.plotGroup("group","series",e,f,h);this.markerGroup=this.plotGroup("markerGroup","markers",e,f,h);d&&this.animate(!0);this.getAttribs();b.inverted=a.inverted;this.drawGraph&&this.drawGraph();this.drawPoints();this.drawDataLabels();this.options.enableMouseTracking!==!1&&this.drawTracker();a.inverted&&this.invertGroups();c.clip!==!1&&!this.sharedClipKey&&!g&&(b.clip(a.clipRect),this.trackerGroup&&this.trackerGroup.clip(a.clipRect));d?this.animate():g||this.afterAnimate();this.isDirty=
this.isDirtyData=!1;this.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.group;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:this.xAxis.left,translateY:this.yAxis.top}));this.translate();this.setTooltipPoints(!0);this.render();b&&F(this,"updatedData")},setState:function(a){var b=this.options,c=this.graph,d=b.states,b=b.lineWidth,a=a||"";if(this.state!==a)this.state=a,d[a]&&d[a].enabled===!1||(a&&(b=d[a].lineWidth||b+1),c&&!c.dashstyle&&
c.attr({"stroke-width":b},a?0:500))},setVisible:function(a,b){var c=this.chart,d=this.legendItem,e=this.group,f=this.tracker,g=this.dataLabelsGroup,h=this.markerGroup,i,j=this.points,k=c.options.chart.ignoreHiddenSeries;i=this.visible;i=(this.visible=a=a===A?!i:a)?"show":"hide";if(e)e[i]();if(h)h[i]();if(f)f[i]();else if(j)for(e=j.length;e--;)if(f=j[e],f.tracker)f.tracker[i]();if(c.hoverSeries===this)this.onMouseOut();if(g)g[i]();d&&c.legend.colorizeItem(this,a);this.isDirty=!0;this.options.stacking&&
o(c.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});if(k)c.isDirtyBox=!0;b!==!1&&c.redraw();F(this,i)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===A?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;F(this,a?"select":"unselect")},drawTracker:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.renderer,h=f.options.tooltip.snap,i=a.tracker,j=b.cursor,
j=j&&{cursor:j},k=a.singlePoints,l=this.isCartesian&&this.plotGroup("trackerGroup",null,"visible",b.zIndex||1,f.trackerGroup),m,n=function(){if(f.hoverSeries!==a)a.onMouseOver()},o=function(){if(!b.stickyTracking)a.onMouseOut()};if(e&&!c)for(m=e+1;m--;)d[m]==="M"&&d.splice(m+1,0,d[m+1]-h,d[m+2],"L"),(m&&d[m]==="M"||m===e)&&d.splice(m,0,"L",d[m-2]+h,d[m-1]);for(m=0;m<k.length;m++)e=k[m],d.push("M",e.plotX-h,e.plotY,"L",e.plotX+h,e.plotY);if(i)i.attr({d:d});else if(a.tracker=i=g.path(d).attr({isTracker:!0,
"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:vb,fill:c?vb:Q,"stroke-width":b.lineWidth+(c?0:2*h)}).on("mouseover",n).on("mouseout",o).css(j).add(l),Ba)i.on("touchstart",n)}};G=ba(P);$.line=G;X.area=B(ea,{threshold:0});G=ba(P,{type:"area",getSegmentPath:function(a){var b=P.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,e=this.options;b.length===3&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;d>=0;d--)d<a.length-1&&e.step&&c.push(a[d+1].plotX,
a[d].yBottom),c.push(a[d].plotX,a[d].yBottom);else this.closeSegment(c,a);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b){var c=this.yAxis.getThreshold(this.options.threshold);a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];P.prototype.drawGraph.apply(this);var a=this.areaPath,b=this.options,c=this.area;c?c.animate({d:a}):this.area=this.chart.renderer.path(a).attr({fill:n(b.fillColor,qa(this.color).setOpacity(b.fillOpacity||0.75).get()),
zIndex:0}).add(this.group)},drawLegendSymbol:function(a,b){b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,a.options.symbolWidth,12,2).attr({zIndex:3}).add(b.legendGroup)}});$.area=G;X.spline=B(ea);fa=ba(P,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],g=a[c+1],h,i,j,k;if(f&&g){a=f.plotY;j=g.plotX;var g=g.plotY,l;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;k=(1.5*e+g)/2.5;l=(k-i)*(j-d)/(j-h)+e-k;i+=l;k+=l;i>a&&i>e?(i=s(a,e),k=2*e-i):i<a&&i<e&&(i=O(a,
e),k=2*e-i);k>g&&k>e?(k=s(g,e),i=2*e-k):k<g&&k<e&&(k=O(g,e),i=2*e-k);b.rightContX=j;b.rightContY=k}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e],f.rightContX=f.rightContY=null):b=["M",d,e];return b}});$.spline=fa;X.areaspline=B(X.area);var Ca=G.prototype,fa=ba(fa,{type:"areaspline",closedStacks:!0,getSegmentPath:Ca.getSegmentPath,closeSegment:Ca.closeSegment,drawGraph:Ca.drawGraph});$.areaspline=fa;X.column=B(ea,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,
marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},threshold:0});fa=ba(P,{type:"column",tooltipOutsidePlot:!0,pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},init:function(){P.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&o(b.series,function(b){if(b.type===
a.type)b.isDirty=!0})},translate:function(){var a=this,b=a.chart,c=a.options,d=c.stacking,e=c.borderWidth,f=0,g=a.xAxis,h=a.yAxis,i=g.reversed,j={},k,l;P.prototype.translate.apply(a);c.grouping===!1?f=1:o(b.series,function(b){var c=b.options;if(b.type===a.type&&b.visible&&a.options.group===c.group)c.stacking?(k=b.stackKey,j[k]===A&&(j[k]=f++),l=j[k]):c.grouping!==!1&&(l=f++),b.columnIndex=l});var m=a.points,g=M(g.transA)*(g.ordinalSlope||c.pointRange||g.closestPointRange||1),q=g*c.groupPadding,p=
(g-2*q)/f,y=c.pointWidth,t=r(y)?(p-y)/2:p*c.pointPadding,u=n(y,p-2*t),x=za(s(u,1+2*e)),v=t+(q+((i?f-(a.columnIndex||0):a.columnIndex)||0)*p-g/2)*(i?-1:1),z=a.translatedThreshold=h.getThreshold(c.threshold),w=n(c.minPointLength,5);o(m,function(c){var f=O(s(-999,c.plotY),h.len+999),g=n(c.yBottom,z),i=c.plotX+v,j=za(O(f,g)),k=za(s(f,g)-j),l=h.stacks[(c.y<0?"-":"")+a.stackKey];d&&a.visible&&l&&l[c.x]&&l[c.x].setOffset(v,x);M(k)<w&&w&&(k=w,j=M(j-z)>w?g-w:z-(f<=z?w:0));c.barX=i;c.pointWidth=u;c.shapeType=
"rect";c.shapeArgs=f=b.renderer.Element.prototype.crisp.call(0,e,i,j,x,k);e%2&&(f.y-=1,f.height+=1);c.trackerArgs=M(k)<3&&B(c.shapeArgs,{height:6,y:j-3})})},getSymbol:pa,drawLegendSymbol:G.prototype.drawLegendSymbol,drawGraph:pa,drawPoints:function(){var a=this,b=a.options,c=a.chart.renderer,d;o(a.points,function(e){var f=e.plotY,g=e.graphic;if(f!==A&&!isNaN(f)&&e.y!==null)d=e.shapeArgs,g?(fb(g),g.animate(B(d))):e.graphic=c[e.shapeType](d).attr(e.pointAttr[e.selected?"select":""]).add(a.group).shadow(b.shadow,
null,b.stacking&&!b.borderRadius);else if(g)e.graphic=g.destroy()})},drawTracker:function(){for(var a=this,b=a.chart,c=b.renderer,d,e,f=+new Date,g=a.options,h=(d=g.cursor)&&{cursor:d},i=a.isCartesian&&a.plotGroup("trackerGroup",null,"visible",g.zIndex||1,b.trackerGroup),j,k,l=a.points,m,n=l.length,o=function(c){j=c.relatedTarget||c.fromElement;if(b.hoverSeries!==a&&w(j,"isTracker")!==f)a.onMouseOver();l[c.target._i].onMouseOver()},r=function(b){if(!g.stickyTracking&&(j=b.relatedTarget||b.toElement,
w(j,"isTracker")!==f))a.onMouseOut()};n--;)if(m=l[n],e=m.tracker,d=m.trackerArgs||m.shapeArgs,k=m.plotY,k=!a.isCartesian||k!==A&&!isNaN(k),delete d.strokeWidth,m.y!==null&&k){if(e)e.attr(d);else if(m.tracker=e=c[m.shapeType](d).attr({isTracker:f,fill:vb,visibility:a.visible?"visible":"hidden"}).on("mouseover",o).on("mouseout",r).css(h).add(m.group||i),Ba)e.on("touchstart",o);e.element._i=n}},alignDataLabel:function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=a.below||a.plotY>n(this.translatedThreshold,
f.plotSizeY),i=this.options.stacking||c.inside;if(a.shapeArgs&&(d=B(a.shapeArgs),g&&(d={x:f.plotWidth-d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!i))g?(d.x+=h?0:d.width,d.width=0):(d.y+=h?d.height:0,d.height=0);c.align=n(c.align,!g||i?"center":h?"right":"left");c.verticalAlign=n(c.verticalAlign,g||i?"middle":h?"top":"bottom");P.prototype.alignDataLabel.call(this,a,b,c,d,e)},animate:function(a){var b=this,c=b.points,d=b.options;if(!a)o(c,function(a){var c=a.graphic,a=a.shapeArgs,
g=b.yAxis,h=d.threshold;c&&(c.attr({height:0,y:r(h)?g.getThreshold(h):g.translate(g.getExtremes().min,0,1,0,1)}),c.animate({height:a.height,y:a.y},d.animation))}),b.animate=null},remove:function(){var a=this,b=a.chart;b.hasRendered&&o(b.series,function(b){if(b.type===a.type)b.isDirty=!0});P.prototype.remove.apply(a,arguments)}});$.column=fa;X.bar=B(X.column);Ca=ba(fa,{type:"bar",inverted:!0});$.bar=Ca;X.scatter=B(ea,{lineWidth:0,states:{hover:{lineWidth:0}},tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}});Ca=ba(P,{type:"scatter",sorted:!1,requireSorting:!1,translate:function(){var a=this;P.prototype.translate.apply(a);o(a.points,function(b){b.shapeType="circle";b.shapeArgs={x:b.plotX,y:b.plotY,r:a.chart.options.tooltip.snap}})},drawTracker:function(){for(var a=this,b=a.options.cursor,b=b&&{cursor:b},c=a.points,d=c.length,e,f=a.markerGroup,g=function(b){a.onMouseOver();if(b.target._i!==A)c[b.target._i].onMouseOver()};d--;)if(e=c[d].graphic)e.element._i=
d;if(a._hasTracking)a._hasTracking=!0;else if(f.attr({isTracker:!0}).on("mouseover",g).on("mouseout",function(){if(!a.options.stickyTracking)a.onMouseOut()}).css(b),Ba)f.on("touchstart",g)},setTooltipPoints:pa});$.scatter=Ca;X.pie=B(ea,{borderColor:"#FFFFFF",borderWidth:1,center:["50%","50%"],colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},legendType:"point",marker:null,size:"75%",showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}}});
pa={type:"pie",isCartesian:!1,pointClass:ba(Ua,{init:function(){Ua.prototype.init.apply(this,arguments);var a=this,b;x(a,{visible:a.visible!==!1,name:n(a.name,"Slice")});b=function(){a.slice()};J(a,"select",b);J(a,"unselect",b);return a},setVisible:function(a){var b=this.series,c=b.chart,d=this.tracker,e=this.dataLabel,f=this.connector,g=this.shadowGroup,h;h=(this.visible=a=a===A?!this.visible:a)?"show":"hide";this.group[h]();if(d)d[h]();if(e)e[h]();if(f)f[h]();if(g)g[h]();this.legendItem&&c.legend.colorizeItem(this,
a);if(!b.isDirty&&b.options.ignoreHiddenPoint)b.isDirty=!0,c.redraw()},slice:function(a,b,c){var d=this.series.chart,e=this.slicedTranslation;xa(c,d);n(b,!0);a=this.sliced=r(a)?a:!this.sliced;a={translateX:a?e[0]:d.plotLeft,translateY:a?e[1]:d.plotTop};this.group.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}}),requireSorting:!1,pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},getColor:function(){this.initialColor=this.chart.counters.color},animate:function(){var a=
this,b=a.startAngleRad;o(a.points,function(c){var d=c.graphic,c=c.shapeArgs;d&&(d.attr({r:a.center[3]/2,start:b,end:b}),d.animate({r:c.r,start:c.start,end:c.end},a.options.animation))});a.animate=null},setData:function(a,b){P.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();n(b,!0)&&this.chart.redraw()},getCenter:function(){var a=this.options,b=this.chart,c=b.plotWidth,d=b.plotHeight,a=a.center.concat([a.size,a.innerSize||0]),e=O(c,d),f;return Ta(a,function(a,b){return(f=
/%$/.test(a))?[c,d,e,e][b]*z(a)/100:a})},translate:function(){this.generatePoints();var a=0,b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g=this.chart,h,i,j,k=this.startAngleRad=Aa/180*((c.startAngle||0)%360-90),l=this.points,m=2*Aa,n=c.dataLabels.distance,o=c.ignoreHiddenPoint,r,t=l.length,s;this.center=f=this.getCenter();this.getX=function(a,b){j=K.asin((a-f[1])/(f[2]/2+n));return f[0]+(b?-1:1)*W(j)*(f[2]/2+n)};for(r=0;r<t;r++)s=l[r],a+=o&&!s.visible?0:s.y;for(r=0;r<t;r++){s=l[r];c=a?
s.y/a:0;h=u((k+b*m)*1E3)/1E3;if(!o||s.visible)b+=c;i=u((k+b*m)*1E3)/1E3;s.shapeType="arc";s.shapeArgs={x:f[0],y:f[1],r:f[2]/2,innerR:f[3]/2,start:h,end:i};j=(i+h)/2;j>0.75*m&&(j-=2*Aa);s.slicedTranslation=Ta([W(j)*d+g.plotLeft,Z(j)*d+g.plotTop],u);h=W(j)*f[2]/2;i=Z(j)*f[2]/2;s.tooltipPos=[f[0]+h*0.7,f[1]+i*0.7];s.half=j<m/4?0:1;s.angle=j;s.labelPos=[f[0]+h+W(j)*n,f[1]+i+Z(j)*n,f[0]+h+W(j)*e,f[1]+i+Z(j)*e,f[0]+h,f[1]+i,n<0?"center":s.half?"right":"left",j];s.percentage=c*100;s.total=a}this.setTooltipPoints()},
render:function(){this.getAttribs();this.drawPoints();this.options.enableMouseTracking!==!1&&this.drawTracker();this.drawDataLabels();this.options.animation&&this.animate&&this.animate();this.isDirty=!1},drawPoints:function(){var a=this,b=a.chart,c=b.renderer,d,e,f,g=a.options.shadow,h,i;o(a.points,function(j){e=j.graphic;i=j.shapeArgs;f=j.group;h=j.shadowGroup;if(g&&!h)h=j.shadowGroup=c.g("shadow").attr({zIndex:4}).add();if(!f)f=j.group=c.g("point").attr({zIndex:5}).add();d=j.sliced?j.slicedTranslation:
[b.plotLeft,b.plotTop];f.translate(d[0],d[1]);h&&h.translate(d[0],d[1]);e?e.animate(i):j.graphic=e=c.arc(i).setRadialReference(a.center).attr(x(j.pointAttr[""],{"stroke-linejoin":"round"})).add(j.group).shadow(g,h);j.visible===!1&&j.setVisible(!1)})},drawDataLabels:function(){var a=this.data,b,c=this.chart,d=this.options.dataLabels,e=n(d.connectorPadding,10),f=n(d.connectorWidth,1),g,h,i=n(d.softConnector,!0),j=d.distance,k=this.center,l=k[2]/2,m=k[1],q=j>0,p=[[],[]],r,t,s,u=2,v,x=function(a,b){return b.y-
a.y},z=function(a,b){a.sort(function(a,c){return(c.angle-a.angle)*b})};if(d.enabled||this._hasPointLabels){P.prototype.drawDataLabels.apply(this);o(a,function(a){a.dataLabel&&p[a.half].push(a)});for(a=p[0][0]&&p[0][0].dataLabel&&(p[0][0].dataLabel.getBBox().height||21);u--;){var w=[],A=[],B=p[u],C=B.length,D;z(B,u-0.5);if(j>0){for(v=m-l-j;v<=m+l+j;v+=a)w.push(v);s=w.length;if(C>s){h=[].concat(B);h.sort(x);for(v=C;v--;)h[v].rank=v;for(v=C;v--;)B[v].rank>=s&&B.splice(v,1);C=B.length}for(v=0;v<C;v++){b=
B[v];h=b.labelPos;b=9999;for(t=0;t<s;t++)g=M(w[t]-h[1]),g<b&&(b=g,D=t);if(D<v&&w[v]!==null)D=v;else for(s<C-v+D&&w[v]!==null&&(D=s-C+v);w[D]===null;)D++;A.push({i:D,y:w[D]});w[D]=null}A.sort(x)}for(v=0;v<C;v++){b=B[v];h=b.labelPos;g=b.dataLabel;s=b.visible===!1?"hidden":"visible";r=h[1];if(j>0){if(t=A.pop(),D=t.i,t=t.y,r>t&&w[D+1]!==null||r<t&&w[D-1]!==null)t=r}else t=r;r=d.justify?k[0]+(u?-1:1)*(l+j):this.getX(D===0||D===w.length-1?r:t,u);g.attr({visibility:s,align:h[6]})[g.moved?"animate":"attr"]({x:r+
d.x+({left:e,right:-e}[h[6]]||0),y:t+d.y-10});g.moved=!0;if(q&&f)g=b.connector,h=i?["M",r+(h[6]==="left"?5:-5),t,"C",r,t,2*h[2]-h[4],2*h[3]-h[5],h[2],h[3],"L",h[4],h[5]]:["M",r+(h[6]==="left"?5:-5),t,"L",h[2],h[3],"L",h[4],h[5]],g?(g.animate({d:h}),g.attr("visibility",s)):b.connector=g=this.chart.renderer.path(h).attr({"stroke-width":f,stroke:d.connectorColor||b.color||"#606060",visibility:s,zIndex:3}).translate(c.plotLeft,c.plotTop).add()}}}},alignDataLabel:pa,drawTracker:fa.prototype.drawTracker,
drawLegendSymbol:G.prototype.drawLegendSymbol,getSymbol:function(){}};pa=ba(P,pa);$.pie=pa;x(Highcharts,{Axis:ob,CanVGRenderer:gb,Chart:sb,Color:qa,Legend:rb,MouseTracker:qb,Point:Ua,Tick:Qa,Tooltip:pb,Renderer:Sa,Series:P,SVGRenderer:sa,VMLRenderer:ha,arrayMin:Fa,arrayMax:wa,charts:Ha,dateFormat:db,pathAnim:ub,getOptions:function(){return N},hasBidiBug:Sb,isTouchDevice:Mb,numberFormat:Ja,seriesTypes:$,setOptions:function(a){N=B(N,a);Jb();return N},addEvent:J,removeEvent:R,createElement:T,discardElement:Na,
css:I,each:o,extend:x,map:Ta,merge:B,pick:n,splat:la,extendClass:ba,pInt:z,wrap:function(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}},svg:ca,canvas:V,vml:!ca&&!V,product:"Highcharts",version:"2.3.5"})})();

define("highcharts", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Highcharts;
    };
}(this)));

define('dialog/info/statistic',['jquery', 'fM', 'l2p', 'api', 'highcharts'], function ($, fM, L2P, api, Highcharts) {
	return (function ($dialog) {
		var	data		= JSON.parse($dialog.find('[data-statistic]').attr('data-statistic')) || {},
			$containers	= $dialog.find('.statistic-graph'),
			$formSearch	= $dialog.find('form[name="search"]'),
            path		= location.pathname.split('/'),
			precision,
			pointsPerMinute,
			precisionPerTact,
			formatter	= function () {
				return '<b>'+this.x+': '+this.y;
			},
			formatterKey	= function () {
				return '<b>'+this.x+': '+this.y+' %</b><br><br>'+this.key;
			};

        $dialog.find('.BottomTableView tr').on('click', function() {
            var	$tr		= $(this),
            	gameid			= $tr.attr('data-gameid'),
            	gamestartoctave	= $tr.attr('data-gamestartoctave'),
            	gamehistoryid	= $tr.attr('data-gamehistoryid'),
            	handposition	= $tr.attr('data-handposition'),
            	isblindmode		= $tr.attr('data-isblindmode');

            if(gameid !== undefined) {
            	$formSearch.find('input[name="game_ids"]').val(gameid);
			}
            if(gamestartoctave !== undefined) {
            	$formSearch.find('input[name="game_startoctave"]').val(gamestartoctave);
			}
            if(gamehistoryid !== undefined) {
            	$formSearch.find('input[name="game_history_ids"]').val(gamehistoryid);
			}
            if(handposition !== undefined) {
            	$formSearch.find('input[name="game_handposition"]').val(handposition);
			}
            if(isblindmode !== undefined) {
            	$formSearch.find('input[name="game_isblindmode"]').val(isblindmode);
			}

           	$dialog.find('.BottomTableView tr').off('click');

            api.get.statistic_uuid(function (data) {
            	var	path	= location.pathname.split('/');
            	path[4]	= data.uuid;
            	path[5]	= '';

            	fM.link.navigate(path.join('/'));
            }, fM.form.getElements.call($formSearch[0]));
        });

        // console.log(data);
        data.forEach(function (graphData, i) {
        	if(!graphData) {
				return;
        	}
			if(graphData.type === 'GamePrecision') {
				precision	= new Highcharts.Chart({
					chart:	{
						renderTo:	$containers[i],
						type:		'column'
					},
					credits: {
						enabled:	false
					},
					legend:	{
						enabled:			graphData.graph.series.length !== 1,
						backgroundColor:	'#FFFFFF',
						layout:				'vertical',
						align:				'right',
						verticalAlign:		'top',
						floating:			true,
						y:					5
					},
					title:	{
						text:		graphData.name
					},
					xAxis:	{
						categories:	graphData.graph.categories
					},
					yAxis:	{
						min:	0,
						max:	100,
						title:	{
							text:	graphData.y
						}
					},
					series:	graphData.graph.series.map(function (serie) {
						serie.data	= serie.data.map(function (y) {
							return +(+y).toFixed(2);
						});
						return serie;
					}),
					tooltip:	{
						formatter:	formatter
					}
				});
			} else if(graphData.type === 'PrecisionPerTact') {
				precisionPerTact	= new Highcharts.Chart({
					chart:	{
						renderTo:	$containers[i],
						type:		'line'
					},
					credits: {
						enabled:	false
					},
					legend:	{
						enabled:			graphData.graph.series.length !== 1,
						backgroundColor:	'#FFFFFF',
						layout:				'vertical',
						align:				'right',
						verticalAlign:		'top',
						floating:			true,
						y:					5
					},
					title:	{
						text:		graphData.name
					},
					xAxis:	{
						categories:	graphData.graph.categories
					},
					yAxis:	{
						min:	0,
						title:	{
							text:	graphData.y
						}
					},
					series:	graphData.graph.series.map(function (serie) {
						serie.data.forEach(function (point) {
							point.y		= +(+point.y).toFixed(2);
							point.name	= $.map(point.notes, function (value, key) {
								return key+': '+(value.toFixed(2))+' %';
							}).join('<br>');
						});

						return serie;
					}),
					tooltip:	{
						formatter:	formatterKey
					}
				});
			} else if(graphData.type === 'PointsPerMinute') {
				pointsPerMinute	= new Highcharts.Chart({
					chart:	{
						renderTo:	$containers[i],
						type:		'line'
					},
					credits: {
						enabled:	false
					},
					legend:	{
						enabled:			graphData.graph.series.length !== 1,
						backgroundColor:	'#FFFFFF',
						layout:				'vertical',
						align:				'right',
						verticalAlign:		'top',
						floating:			true,
						y:					5
					},
					title:	{
						text:		graphData.name
					},
					xAxis:	{
						categories:	graphData.graph.categories
					},
					yAxis:	{
						min:	0,
						title:	{
							text:	graphData.y
						}
					},
					series:	graphData.graph.series.map(function (serie) {
						serie.data	= serie.data.map(function (y) {
							return +(+y).toFixed(2);
						});
						return serie;
					}),
					tooltip:	{
						formatter:	formatter
					}
				});
			}
        });
	});
});