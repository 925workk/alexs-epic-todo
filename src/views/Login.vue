<template>
    <div class="loginContainer">
        <top-header></top-header>
        <div class="boxContainer mt-5">
            <div class="container">
                
                <div class="pt-5 pb-3">
                    <img src="../../public/images/logo.png" alt="logo" style="width: 30px;" class="d-inline mr-3 logo">
                    <h2 class="d-inline">Login</h2>
                </div>
                <hr/>
                <form @submit.prevent="pressed">
                    <div class="login">
                        <p class="header">Email Address:</p>
                        <input type="email" placeholder="email" v-model="email" maxlength = "50">
                    </div>
                    <div class="password">
                        <p class="header">Password:</p>
                        <input  type="password" v-model="password" placeholder="password" maxlength = "50">
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg mb-4 mt-4">Log In</button>
                </form>
                <div class="error" v-if="error">{{error.message}}</div>
                <span>Need an account? Click here to <router-link to="/register">register</router-link></span>
                <br />
                <h6 v-if="loggedIn" class="d-inline">You are ALREADY logged in. <router-link to="/todoapp" class="todoLink">Click here</router-link> to go to your To-do list!</h6>
                <h6 v-else class="d-inline"></h6>

            </div>
        </div>
    </div>
</template>

<script>
import TopHeader from "../components/Top-Header"
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
            email: "",
            password: "",
            error:"",
            loggedIn: false
        }
    },
    components:{
        'top-header': TopHeader
    },
    methods:{
        async pressed(){
            try{
                const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                console.log(val)
                this.$router.replace({name: "todoapp"})
            } catch(err){
                console.log(err)
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    .logo{
        position: relative;
        bottom: 7px;
    }

    p{
        text-align: left;
        position: relative;
        left:40px;
        top: 16px;
    }

    .loginContainer{
        min-height: 685px;
        width: 100vw;
        height: 100vh;
        background-image: url("../../public/images/dark_snow.png");
        background-repeat: repeat;
        font-family: 'Merriweather', serif;
    }
    h2{
        font-family: 'Oswald', sans-serif;
    }
    .error {
        color: red;
        font-size: 18px;
    }
    input {
        width: 80%;
        padding: 5px;
        margin: 0px;
        font-size: 20px;
        border: 1px black solid;
    }
    button {
        width: 40%;
        height: 40px;
        font-size: 15px;
    }

    .todoLink{
        color: red !important;
        text-decoration: underline;
    }

    .todoLink:hover{
        color: rgb(145, 0, 0) !important;
        text-decoration: underline;
    }

    .header{
        font-family: 'Oswald', sans-serif;
        font-size: 20px;
    }

    h6{
        position: relative;
        color: red;
        top: 10px;
        font-size: 16px;
    }

    .boxContainer{
        border-radius: 3%;
        width: 400px;
        height: 80%;
        background-image: url("../../public/images/nice_snow.png");
        background-repeat: repeat;
        margin: auto;
        box-shadow: 6px 6px #1c2348; 
    }

    @media only screen and (max-width: 401px) {
        .boxContainer{
            width: 80%;
            height: 80%;
        }
    }
</style>