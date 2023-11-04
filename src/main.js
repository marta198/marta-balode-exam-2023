import './assets/main.scss'
import HeaderComponent from './components/HeaderComponent.vue'
import AudioPlayerComponent from './components/AudioPlayerComponent.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

app.component('HeaderComponent', HeaderComponent);
app.component('AudioPlayerComponent', AudioPlayerComponent);