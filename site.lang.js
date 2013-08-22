/* global _:false */

var Site = Site || {};

Site.Lang = function() {

	var messages = {},
		defaultLang = "en",
		version = "0.1",

	init = function (  ) {

		var arg = arguments;

		if ( ! _.isArguments ( arg ) || _.size( arg ) === 0 ) {

			return false;

		}

		return __init.apply( this, arg );

	},

	__init = function (  ) {

		var value;

		if ( typeof arguments[1] !== 'undefined' && _.isObject ( arguments[1] ) ) {

			value = arguments[1];

		} else if ( typeof arguments[0] !== 'undefined' && _.isObject ( arguments[0] ) ) {

			value = arguments[0];
			arguments[0] = undefined;

		}

		messages[ ( _.isString ( arguments[0] ) ) ? arguments[0] : defaultLang ] = value;

		return true;

	},



	getMessages = function (  ) {

		if ( ! _.isArguments ( arguments ) || _.size( arguments ) === 0 ) {

			return __getMessages (  );

		}

		return __getMessages.apply( this, arguments );

	},

	__getMessages = function (  ) {

		if ( _.size ( messages ) === 0 ) {

			return false;

		}

		if ( ! _.isArguments ( arguments ) || _.size( arguments ) === 0 ) {

			return __clone ( messages );

		}

		var lang = arguments[0];

		if ( _.isString ( lang ) && _.has ( messages, lang ) ) {

			return __clone ( messages[lang] );

		}

		return __clone ( messages );

	},



	getLangs = function (  ) {

		return __getLangs();

	},

	__getLangs = function (  ) {

		if ( typeof messages === 'undefined' || ! _.isObject ( messages ) || _.size( messages ) === 0 ) {

			return false;

		}

		return _.keys ( messages );

	},



	get = function (  ) {

		if ( ! _.isArguments ( arguments ) || _.size( arguments ) === 0 ) {

			return false;

		}

		return __get.apply( this, arguments );

	},

	__get = function (  ) {

		if ( _.size( arguments ) === 2 ) {

			return messages[ arguments[0] ][ arguments[1] ];

		}

		if ( _.has( messages, arguments[0]) ) {

			return messages[ arguments[0] ];

		}

		var arg = arguments[0],
			data = {};

		_.each(messages, function ( value, key ) {

			if ( _.has( value, arg ) ) {

				data[key] = { "message": value[arg] };

			}

		});

		return data;

	},



	set = function (  ) {

		if ( ! _.isArguments ( arguments ) || _.size( arguments ) === 0 ) {

			return false;

		}

		return __set.apply( this, arguments );

	},

	__set = function (  ) {

		var lang, key, value;

		if ( arguments.length === 3 )
		{

			lang	= arguments[0];
			key		= arguments[1];
			value	= arguments[2];

			messages[lang][key] = value;

			return true;

		}
		else if ( arguments.length === 2 )
		{

			key		= arguments[0];
			value	= arguments[1];

			for ( lang in messages ) {

				if ( messages.hasOwnProperty( lang ) ) {

					messages[lang][key] = value;

				}

			}

			return true;

		}

		return false;

	},
	


	//


	


	__clone = function ( src ) {

		function mixin( dest, source, copyFunc ) {

			var name, s, empty = {};

			for ( name in source ) {

				s = source[name];

				if ( ! ( name in dest ) || ( dest[name] !== s && ( ! ( name in empty ) || empty[name] !== s ) ) ) {

					dest[name] = copyFunc ? copyFunc(s) : s;

				}

			}

			return dest;

		}

		if ( ! src || typeof src !== "object" || Object.prototype.toString.call( src ) === "[object Function]" ) {

			// null, undefined, any non-object, or function
			return src;	// anything

		}

		if ( src.nodeType && "cloneNode" in src ) {

			// DOM Node
			return src.cloneNode ( true );

		}

		if ( src instanceof Date ) {

			// Date
			return new Date ( src.getTime() );

		}

		if ( src instanceof RegExp ) {
			// RegExp
			return new RegExp ( src );
		}

		var r, i, l;

		if ( src instanceof Array) {

			// array
			r = [];

			for ( i = 0, l = src.length; i < l; ++i ) {
			
				if ( i in src ) {
					r.push( __clone( src[i] ) );
				}
			}

		// we don't clone functions for performance reasons
		//} else if(d.isFunction(src)) {
			// function
			//r = function(){ return src.apply(this, arguments); };

		} else {

			// generic objects
			r = src.constructor ? new src.constructor() : {};
		}

		return mixin ( r, src, __clone );

	};

	// Public
	return {
		init: init,
		set: set,
		get: get,
		getLangs: getLangs,
		getMessages: getMessages,
		
		version: version
	};

}();