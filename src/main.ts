import Vue from 'vue'
import * as VueMenu from '@hscmap/vue-menu'
import * as VueWindow from '@hscmap/vue-window'
import App from './App.vue'
Vue.use(VueMenu, { prefix: 'menu' })
Vue.use(VueWindow, { prefix: 'window' })


import { root, methods } from "./state"


window.addEventListener('load', e => {
    const el = mountpoint()
    new Vue({
        el,
        methods,
        data: () => root,
        render: h => h(App),
    })
})


function mountpoint() {
    const el = document.createElement('div')
    document.body.appendChild(el)
    return el
}