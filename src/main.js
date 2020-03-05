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
  apiKey: "AIzaSyB3gVeRZwKt_DXJej_V1HBe3MzCNq9Nvg4",
  authDomain: "todo-c1c1c.firebaseapp.com",
  databaseURL: "https://todo-c1c1c.firebaseio.com",
  projectId: "todo-c1c1c",
  storageBucket: "todo-c1c1c.appspot.com",
  messagingSenderId: "652730197561",
  appId: "1:652730197561:web:99da64ae1a7dc708994fe8",
  measurementId: "G-6GB37CHL79"
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