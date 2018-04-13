import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuetify/dist/vuetify.min.css';
Vue.use(ElementUI);
Vue.use(Vuetify);

new Vue({
    el: '#app',
    components: { App },
    template: '<app/>'
});
