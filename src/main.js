import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './components/firebaseinit.js'

let app;
firebase.auth().onAuthStateChanged( () =>{
    if(!app){
        app= createApp(App).use(router).mount('#app')
    }
})


