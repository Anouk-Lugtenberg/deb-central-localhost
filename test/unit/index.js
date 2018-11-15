// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

const srcContext = require.context('src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
