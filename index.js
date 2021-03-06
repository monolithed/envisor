/**
 * Envisor
 *
 * @author: Alexander Abashkin <monolithed@gmail.com>
 * @license: MIT, 2015
 */

'use strict';

module.exports = Object.defineProperties({}, {
	/**
	 * Sets the `value` for the specified `key`.
	 *
	 * @param {string|Object} key
	 * @param {*} value
	 */
	set: {
		value: function (key, value) {
			if (key) {
				var set = function (key, value) {
					process.env[this.key(key)] = JSON.stringify(value) || '';
				};

				if (key instanceof Object) {
					for (var name in key) {
						if (Object.prototype.hasOwnProperty.call(key, name)) {
							set.call(this, name, key[name]);
						}
					}
				}
				else {
					set.call(this, key, value);
				}
			}
		}
	},

	/**
	 * Retrieves the value for the specified key
	 *
	 * @param {string} key
	 * @returns {*}
	 */
	get: {
		value: function (key) {
			try {
				return JSON.parse(process.env[this.key(key)]);
			}
			catch (error) {
				return '';
			}
		}
	},

	/**
	 * Sets the prefix for the specified key
	 *
	 * @param {string} prefix
	 */
	use: {
		value: function (prefix) {
			if (prefix) {
				this.prefix = prefix + '__';
			}
			else {
				delete this.prefix;
			}
		}
	},

	/**
	 * Removes the value for the specified `key`
	 *
	 * @param {string} key
	 */
	remove: {
		value: function (key) {
			delete process.env[this.key(key)];
		}
	} ,

	/**
	 * Checks an environment variable
	 *
	 * @param {string} key
	 * @returns {boolean}
	 */
	has: {
		value: function (key) {
			return this.key(key) in process.env;
		}
	},

	/**
	 * Returns used namespace with the key
	 *
	 * @private
	 * @param {string} key
	 * @param {string}
	 */
	key: {
		value: function (key) {
			if (this.prefix) {
				key = this.prefix + key;
			}

			return key;
		}
	},

	/**
	 * Returns all environment variables
	 *
	 * @returns {Object}
	 */
	all: {
		value: function () {
			return process.env;
		}
	}
});
