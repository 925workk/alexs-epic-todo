<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href="/" class="mx-auto nav-item">Home</a>
            <div class="status mx-auto nav-item">
            </div>
            <div class="mx-auto nav-item">
                <a @click="signOut">Sign Out</a>
            </div>
    </nav>
  </div>
</template>

<script>

import * as firebase from "firebase/app";
import "firebase/auth";

export default {

    created(){
        firebase.auth().onAuthStateChanged(user =>{

            this.loggedIn = !!user;

        })
    },
    data(){
        return{
            loggedIn: false
        }
    },
    methods: {
        async signOut() {
            try{
                const data = await firebase.auth().signOut();
                console.log(data)
                this.$router.replace({name: "home"})
            }catch(err){
                console.log(err)
            }
            
        }
    }
  }
</script>

<style lang="scss" scoped>

nav{
    font-family: 'Oswald', sans-serif;
    border-bottom: 1px solid rgb(103, 103, 103);
}
.status {
    color:azure;
    font-size: 14px;
}
a {
    font-weight: bold;
    font-size: 14px;
    color: azure !important;
    text-decoration: none !important;
    cursor: pointer !important;
}

.navbar{
    width: 100% !important;
}
</style>