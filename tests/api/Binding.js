define([
	'teststack!object',
	'teststack/assert',
	'dbind/bind'
], function (test, assert, bind) {

	var Binding = bind.Binding;

	return test({
		name: 'Binding API',

		'Binding#to': {
			'binds to source': function () {
				var value = {},
					source = new Binding(value),
					bound = new Binding(),
					updated = {},
					results;

				bound.to(source);
				results = bound.getValue();

				assert.equal(results, value, 'binding should get initial value from source');

				source.put(updated);
				results = bound.getValue();

				assert.equal(results, updated, 'binding should update with source');
			},

			'binds to property in source': function () {
				var value = {},
					source = new Binding({
						key: value
					}),
					bound = new Binding(),
					updated = {},
					results;

				bound.to(source, 'key');
				results = bound.getValue();

				assert.equal(results, value, 'binding should get initial value from source key');

				source.get('key').put(updated);
				results = source.get('key').getValue();

				assert.equal(results, updated, 'binding should update with source key');
			}
		},

		'Binding#is': {
			'updates binding without updating source': function () {
				var value = {},
					source = new Binding(value),
					bound = new Binding(),
					updated = {};

				bound.to(source);

				bound.is(updated);

				assert.equal(source.getValue(), value, 'is should not update source');
				assert.equal(bound.getValue(), updated, 'is should update binding');
			}
		},

		'Binding#put': {
			'updates binding and source': function () {
				var value = {},
					source = new Binding(value),
					bound = new Binding(),
					updated = {};

				bound.to(source);

				bound.put(updated);

				assert.equal(source.getValue(), updated, 'put should update source');
				assert.equal(bound.getValue(), updated, 'put should update binding');
			}
		},

		'Binding#get': {
			'returns binding to value for existing key': function () {
				var value = {},
					bound = new Binding({
						key: value
					}),
					results = bound.get('key');

				assert.equal(bind(results), results, 'result is a bindable object');
				assert.equal(results.getValue(), value, 'binding should represent value for existing key');
			}
		},

		'Binding#getValue': {
			'calls callback with value': function () {
				function callback(value) {
					results = value;
				}

				var results,
					a = {},
					value = {},
					bound = new Binding(value);

				bound.getValue(callback);
				assert.equal(results, value, 'callback should be called with initial value');

				bound.put(a);
				assert.equal(results, value, 'callback is only called once for getValue');

				bound.getValue(callback);
				assert.equal(results, a, 'callback should receive current value');
			},

			'returns value': function () {
				var value = {},
					bound = new Binding(value),
					results = bound.getValue();

				assert.equal(results, value, 'getValue should return value');
			}
		},

		'Binding#then': {
			'notifies callbacks of changes': function () {
				function callback(value) {
					results = value;
				}

				var results,
					a = {},
					b = {},
					value = {},
					bound = new Binding(value);

				bound.then(callback);
				assert.equal(results, value, 'callback is called with initial value');

				bound.put(a);
				assert.equal(results, a, 'callback is called for `put` value');

				bound.is(b);
				assert.equal(results, b, 'callback is called for `is` value');
			}
		}
	});
});