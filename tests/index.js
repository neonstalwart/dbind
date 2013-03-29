/*jshint node:true */
if (typeof process !== 'undefined' && typeof define === 'undefined') {
    var path = require('path'),
        baseUrl = path.resolve(__dirname, '..', '..');

    global.dojoConfig = {
        async: 1,
        baseUrl: baseUrl,
        tlmSiblingOfDojo: 0,
        packages: [
            'intern'
        ],
        map: {
            intern: {
                'dojo-ts': 'intern/dojo'
            }
        },
        deps: [ 'dbind/tests/index' ]
    };
    require(path.join(baseUrl, 'intern', 'dojo', 'dojo'));
}
else {
    define([
        'require',
        'intern/lib/args'
    ], function (require, args) {
        if (!args.suites) {
            args.suites = [ 'dbind/tests/all' ];
        }

        if (!args.config) {
            args.config = 'dbind/tests/intern';
        }

        require([ 'intern/client' ]);
    });
}