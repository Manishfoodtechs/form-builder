import plugin from './plugin'
import lang from './lang.js'
import storeModule from './store-module'

const awesPlugin = {

    modules: {
        'vue': {
            src: 'https://unpkg.com/vue@2.5.21/dist/vue.js',
            cb() {
                // Vue.config.ignoredElements.push('form-builder', /^fb-/)
                Vue.use(plugin)
            }
        },
        'lodash': 'https://unpkg.com/lodash@4.17.11/lodash.min.js',
        'vuex': {
            src: 'https://unpkg.com/vuex@2.5.0/dist/vuex.min.js',
            deps: ['vue'],
            cb() {
                Vue.prototype.$awesForms = new Vuex.Store(storeModule)
            }
        },
        'vue-shortkey': {
            src: 'https://unpkg.com/vue-shortkey@3',
            deps: ['vue'],
            cb() { Vue.use(VueShortkey) }
        },
        'v-tooltip': {
            src: 'https://unpkg.com/v-tooltip@2.0.0-rc.33/dist/v-tooltip.min.js',
            deps: ['vue'],
            cb() {
                VTooltip.default.options.popover = Object.assign(VTooltip.default.options.popover, {
                    defaultPlacement: 'right',
                    defaultAutoHide: false,
                    defaultTrigger: 'manual',
                    defaultPopperOptions: {
                        modifiers: {
                            flip: {
                                behavior: ['right', 'top']
                            }
                        }

                    }
                })
            }
        },
        'vue-multiselect': {
            src: ['https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.js',
                  'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css'],
            deps: ['vue'],
            cb() { 
                Vue.component('multiselect', window.VueMultiselect.default)
            }
        },
        'urlify': 'https://unpkg.com/urlify@0.3.6/dist/urlify.js'
    },

    install() {
        AWES.lang = lang
        if ( AWES._vueRoot && AWES._vueRoot._isMounted ) updateMountedComponents(AWES._vueRoot)
    }
}

if (window && ('AWES' in window)) {
    AWES.use(awesPlugin)
} else {
    window.__awes_plugins_stack__ = window.__awes_plugins_stack__ || []
    window.__awes_plugins_stack__.push(awesPlugin)
}
