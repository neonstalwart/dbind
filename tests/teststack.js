/*jshint node:true */
if (typeof process !== 'undefined' && typeof define === 'undefined') {
	var path = require('path'),
		baseUrl = path.resolve(__dirname, '..', '..');

	// pre-configure dojo
	global.dojoConfig = {
		async: 1,
		baseUrl: baseUrl,
		tlmSiblingOfDojo: 0,
		packages: [
			'teststack'
		],
		map: {
			teststack: {
				'dojo-ts': 'teststack/dojo'
			}
		},
		deps: [ 'require', 'teststack/lib/args' ],
		callback: function (require, args) {
			if (!args.config) {
				args.config = 'dbind/tests/teststack';
			}
			require([ 'teststack/runner' ]);
		}
	};
	// load teststack's dojo to load everything
	require(path.join(baseUrl, 'teststack', 'dojo', 'dojo'));
}
else {
	define({
		// The port on which the instrumenting proxy will listen
		proxyPort: 9000,

		// A fully qualified URL to the teststack proxy
		proxyUrl: 'http://localhost:9000/',

		// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
		// specified browser environments in the `environments` array below as well. See
		// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
		// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
		// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
		// automatically
		capabilities: {
			// use the current version of selenium
			'selenium-version': '2.30.0',
			// limit test runs to 3 minutes
			'max-duration': 180,
			// timeout if there is no activity for 30 seconds
			'idle-timeout': 30
		},

		// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
		// OnDemand. Available options are browserName, version, platform, and platformVersion
		environments: [
			{ browserName: 'internet explorer', platform: 'Windows 2003', version: ['7', '8'] },
			{ browserName: 'internet explorer', platform: 'Windows 2008', version: '9' },
			// { browserName: 'firefox', version: '19', platform: [ 'Windows 2008', 'Mac 10.6' ] },
			// Sauce Labs recommend not specifying a version of chrome
			{ browserName: 'chrome', platform: [ 'Windows 2008', 'Mac 10.8' ] },
			{ browserName: 'safari', version: '6', platform: 'Mac 10.8' }
		],

		// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
		maxConcurrency: 3,

		// Whether or not to start Sauce Connect before running tests
		useSauceConnect: true,

		// Connection information for the remote WebDriver service. If using Sauce Labs, keep your username and password
		// in the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables.
		webdriver: {
			host: 'localhost',
			port: 4444
		},

		// Configuration options for the module loader; any AMD configuration options supported by the Dojo loader can be
		// used here
		loader: {
			// Packages that should be registered with the loader in each testing environment
			packages: [
				'dbind'
			]
		},

		// Non-functional test suite(s) to run in each browser
		suites: [ 'dbind/tests/all' ],

		// Functional test suite(s) to run in each browser once non-functional tests are completed
		functionalSuites: [ 'dbind/tests/functional' ]
	});
}