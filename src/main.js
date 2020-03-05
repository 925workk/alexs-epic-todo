import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import firebase from 'firebase'
import 'firebase/firestore'
import './plugins/bootstrap-vue'
require ("firebase/firestore")

Vue.prototype.$axios = axios;
Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: "AIzaSyB9-_--3deCY1AWUkF-j0o57MvU81qiOuc",
  authDomain: "vant4ge-todo-69453.firebaseapp.com",
  databaseURL: "https://vant4ge-todo-69453.firebaseio.com",
  projectId: "vant4ge-todo-69453",
  storageBucket: "vant4ge-todo-69453.appspot.com",
  messagingSenderId: "554180825237",
  appId: "1:554180825237:web:22159c4bbaecb08d890b9c",
  measurementId: "G-7W74R6Q3RD"
};

firebase.initializeApp(firebaseConfig);
  Vue.prototype.$firebase = firebase;
  const db=firebase.firestore();
  let app;

  firebase.auth().onAuthStateChanged(user=>{
    console.log(user);
    if (!app){
      app= new Vue({
        router,
        store,
        render: h => h(App)
        }).$mount('#app')
    }
  })

  const collection = db.collection('tasks');

  collection.get().then(snapshot => {

  snapshot.forEach(doc => {

    console.log( doc.data() );    

  });

});

export {db}