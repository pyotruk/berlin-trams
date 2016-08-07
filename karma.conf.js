module.exports = function (config) {

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'config.js',
            'app/**/*.js',
            'test/**/*.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
};
