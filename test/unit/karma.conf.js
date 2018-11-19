var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: ['specs/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    webpack: webpackConfig,
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'text-summary'}
      ]
    },
    browsers: ['Chrome']
  })
}
