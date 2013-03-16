define([
	'teststack!object',
	'teststack/assert',
	'dbind/bind'
], function (test, assert, bind) {

	var Binding = bind.Binding;
	// TODO: generate a suite of tests for each of the other binding types (StatefulBinding,
	// StatefulPropertyBinding, ElementBinding, ArrayBinding, PropertyBinding, FunctionBinding).

	return test({
		name: 'Binding',

		'Core API': {
			'#to': {
				'binds to source': function () {
					var value = {},
						source = new Binding(value),
						bound = new Binding(),
						updated = {},
						results;

					bound.to(source);
					results = bound.getValue();

					assert.strictEqual(value, results, 'binding should get initial value from source');

					source.put(updated);
					results = bound.getValue();

					assert.strictEqual(updated, results, 'binding should update with source');
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

					assert.strictEqual(value, results, 'binding should get initial value from source key');

					source.get('key').put(updated);
					results = source.get('key').getValue();

					assert.strictEqual(updated, results, 'binding should update with source key');
				}
			},

			'#is': {
				'updates binding without updating source': function () {
					var value = {},
						source = new Binding(value),
						bound = new Binding(),
						updated = {};

					bound.to(source);

					bound.is(updated);

					assert.strictEqual(value, source.getValue(), 'is should not update source');
					assert.strictEqual(updated, bound.getValue(), 'is should update binding');
				}
			},

			'#put': {
				'updates binding and source': function () {
					var value = {},
						source = new Binding(value),
						bound = new Binding(),
						updated = {};

					bound.to(source);

					bound.put(updated);

					assert.strictEqual(updated, source.getValue(), 'put should update source');
					assert.strictEqual(updated, bound.getValue(), 'put should update binding');
				}
			},

			'#get': {
				'returns binding to value for existing key': function () {
					var value = {},
						bound = new Binding({
							key: value
						}),
						results = bound.get('key');

					assert.strictEqual(results, bind(results), 'result is a bindable object');
					assert.strictEqual(value, results.getValue(), 'binding should represent value for existing key');
				},

				'returns binding to value for non-existent key': function () {
					var value = {},
						bound = new Binding(value),
						results = bound.get('key'),
						keyValue = {},
						updated = {
							key: keyValue
						};

					assert.strictEqual(undefined, results.getValue(), 'initial value for non-existent binding is undefined');

					bound.is(updated);

					assert.strictEqual(keyValue, results.getValue(), 'binding to non-existent key should receive value when key is set');
				}
			},

			'#getValue': {
				'calls callback with value': function () {
					function callback(value) {
						results = value;
					}

					var results,
						a = {},
						value = {},
						bound = new Binding(value);

					bound.getValue(callback);
					assert.strictEqual(results, value, 'callback should be called with initial value');

					bound.put(a);
					assert.strictEqual(results, value, 'callback is only called once for getValue');

					bound.getValue(callback);
					assert.strictEqual(results, a, 'callback should receive current value');
				},

				'returns value': function () {
					var value = {},
						bound = new Binding(value),
						results = bound.getValue();

					assert.strictEqual(results, value, 'getValue should return value');
				}
			},

			'#receive': {
				'notifies callbacks of value changes': function () {
					function callback(value) {
						results = value;
					}

					var results,
						a = {},
						b = {},
						value = {},
						bound = new Binding(value);

					bound.receive(callback);
					assert.strictEqual(results, value, 'callback is called with initial value');

					bound.put(a);
					assert.strictEqual(results, a, 'callback is called for `put` value');

					bound.is(b);
					assert.strictEqual(results, b, 'callback is called for `is` value');
				},

				// TODO: is this the desired behavior?
				'descendant changes do not trigger callbacks in ancestors': function () {
					function callback(value) {
						called++;
						results = value;
					}

					var results,
						called = 0,
						value = {
							nested: {}
						},
						changed = {},
						bound = new Binding(value);

					bound.receive(callback);
					assert.strictEqual(1, called, 'callback is called with initial value');

					bound.get('nested').put(changed);
					assert.strictEqual(1, called, 'callback is called for nested value changes');
				}
			},

			'#keys': {
				// TODO:
			}
		}
	});
});