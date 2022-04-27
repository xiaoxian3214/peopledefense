import Toast from './CopydiaTips.vue'
const obj = {
    install: function (Vue) {
        const tipsToastContrustor = Vue.extend(Toast);
        const tipsToast = new tipsToastContrustor();
        tipsToast.$mount(document.createElement('div'))
        document.body.appendChild(tipsToast.$el)
        Vue.prototype.$diaTips = tipsToast
    }
}
export default obj