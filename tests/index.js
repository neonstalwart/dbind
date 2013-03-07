/*jshint node:true */
if (typeof process !== 'undefined' && typeof define === 'undefined') {
    var path = require('path'),
        baseUrl = path.resolve(__dirname, '..', '..');

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
        deps: [ 'dbind/tests/index' ]
    };
    require(path.join(baseUrl, 'teststack', 'dojo', 'dojo'));
}
else {
    define([
        'require',
        'teststack/lib/args'
    ], function (require, args) {
        if (!args.suites) {
            args.suites = [ 'dbind/tests/all' ];
        }

        if (!args.config) {
            args.config = 'dbind/tests/teststack';
        }

        require([ 'teststack/client' ]);
    });
}