'use strict';

var envisor = require('../index');

exports.tests = {
	'key': function (test) {
		var key = 'foo',
			use = 'bar';

		envisor.set(key);

		test.equal(envisor.key(key), key,
			'empty prefix');

		envisor.use(use);

		test.equal(envisor.key(key), use + '__' + key,
			'used prefix');

		envisor.remove(key);
		envisor.use();

		test.done();
	},

	'get/set': function (test) {
		var key = 'foo';

		envisor.set(key);

		test.equal(envisor.get(key), '',
			'get empty value');

		envisor.set(key, 1);

		test.equal(envisor.get(key), 1,
			'get specified value');

		envisor.set(key, 2);

		test.equal(envisor.get(key), 2,
			'get overridden value');

		envisor.set(key, { foo: 1 });

		test.equal(envisor.get(key).foo, 1,
			'get object value');

		envisor.remove(key);
		envisor.use();

		test.done();
	},

	'use': function (test) {
		var key = 'foo',
			use = 'bar';

		envisor.use(use);
		envisor.set(key);

		test.equal(envisor.get(key), '',
			'get empty value');

		envisor.set(key, 1);

		test.equal(envisor.get(key), 1,
			'get specified value');

		test.equal(process.env[key], undefined,
			'get empty value from process.env');

		test.equal(process.env[use + '__' + key], 1,
			'get specified value from process.env');

		test.equal(process.env[envisor.key(key)], 1,
			'get specified value from process.env by key');

		test.equal(envisor.get(envisor.key(key)), '',
			'get empty value by key');

		envisor.remove(key);
		envisor.use();

		test.done();
	},

	'remove': function (test) {
		var key = 'foo',
			use = 'bar';

		envisor.set(key, 1);

		test.equal(envisor.get(key), 1,
			'get specified value');

		envisor.remove(key);

		test.equal(envisor.get(key), '',
			'get empty value');

		envisor.use(use);
		envisor.set(key, 1);

		test.equal(envisor.get(key), 1,
			'get specified value with namespace');

		envisor.remove(key);

		test.equal(envisor.get(key), '',
			'get empty value after removing');

		test.equal(process.env[key], undefined,
			'get undefined value from process.env');

		test.equal(process.env[envisor.key(key)], undefined,
			'get undefined value from process.env by key');

		envisor.remove(key);
		envisor.use();

		test.done();
	},

	'has': function (test) {
		var key = 'foo',
			use = 'bar';

		envisor.set(key);

		test.equal(envisor.has(key), true,
			'check empty value');

		envisor.remove(key);

		test.equal(envisor.has(key), false,
			'check removed value');

		envisor.use(use);
		envisor.set(key, 1);

		test.equal(envisor.has(key), true,
			'check specified value');

		test.equal(envisor.key(key) in process.env, true,
			'check specified in process.env');

		envisor.remove(key);

		test.equal(envisor.has(key), false,
			'check empty value with namespace');

		test.equal(key in process.env, false,
			'check undefined value in process.env');

		test.equal(envisor.key(key) in process.env, false,
			'check undefined value in process.env (used key)');

		envisor.remove(key);
		envisor.use();

		test.done();
	},

	'all': function (test) {
		var key = 'foo';

		envisor.set(key);

		test.equal(key in envisor.all(key), true);

		envisor.remove(key);
		envisor.use();

		test.done();
	}
};
