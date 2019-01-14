// importing components
import formBuilder from '../vue/form-builder.vue'
import fbErrorWrap from '../vue/fb-error-wrap.vue'
import fbInput from '../vue/fb-input.vue'
import fbMultiBlock from '../vue/fb-multi-block.vue'
import fbCheckbox from '../vue/fb-checkbox.vue'
import fbSelect from '../vue/fb-select.vue'
import fbTextarea from '../vue/fb-textarea.vue'
import fbCode from '../vue/fb-code.vue'
import fbCompanySlug from '../vue/fb-company-slug.vue'
import fbAutoCaptcha from '../vue/fb-auto-captcha.vue'
import fbRadioGroup from '../vue/fb-radio-group.vue'

export function install(Vue) {

    if ( this.installed ) return
    this.installed = true

    Vue.component('form-builder', formBuilder)
    Vue.component('fb-error-wrap', fbErrorWrap)
    Vue.component('fb-input', fbInput)
    Vue.component('fb-multi-block', fbMultiBlock)
    Vue.component('fb-checkbox', fbCheckbox)
    Vue.component('fb-select', fbSelect)
    Vue.component('fb-textarea', fbTextarea)
    Vue.component('fb-code', fbCode)
    Vue.component('fb-company-slug', fbCompanySlug)
    Vue.component('fb-auto-captcha', fbAutoCaptcha)
    Vue.component('fb-radio-group', fbRadioGroup)
}

export default {

    installed: false,

    install
}
