define(['jquery'], function ($) {
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
			title		= title || 'Play.now';
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
			$(window).trigger('popstate');
		}
		that.navigated	= function (url, title, obj) {
			document.title	= title;

			obj			= $.extend(history.state, obj);
			obj.title	= title;

			his[obj._id]	= obj;
			window.history.replaceState(obj, title, document.location.pathname);
			lastState	= obj;

			$that.trigger('navigate-done', [lastState]);
		}
		that.getHistory	= function () {
			return his;
		}
		that.getParentHistory	= function () {
			return his.slice(0, lastState._id);
		}
		that.getParent	= function () {
			return his[lastState._id - 1];
		}
		that.getCurrent	= function () {
			return lastState ? his[lastState._id] : undefined;
		}
		that.getCurrentNavigate	= function () {
			return lastState ? his[lastState._id + 1] : undefined;
		}

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