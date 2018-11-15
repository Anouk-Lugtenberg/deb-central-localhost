var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: ['specs/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'cobertura', subdir: 'cobertura'}
      ]
    },
    browsers: ['Chrome']
  })
}
