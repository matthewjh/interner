// Karma configuration
// Generated on Sun May 17 2015 21:35:03 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/requirejs/require.js',

      {pattern: 'node_modules/es6-shim/es6-shim.js', included: false},
      {pattern: 'src/**/*.ts', included: false},

      'test_main.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['typescript']
    },

    typescriptPreprocessor: {
      // options passed to the typescript compiler 
      options: { 
        module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd' 
        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type. 
      },
      // extra typing definitions to pass to the compiler (globs allowed) 
      typings: [
        'typings/**/*.d.ts',
      ],
      // transforming the filenames 
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeCanary'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
