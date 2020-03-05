<template>
    <div class="todoAppContainer">
        <top-header></top-header>
        <div>
            <div class="container">
                <div class="row">
                    <div class="addTodoLabel mt-5 col-md-12">
                        <h3 class="d-inline mr-2">Add a To-do: </h3>
                        <input type="text" v-model="name" class="addBox" placeholder="To-do item" maxlength = "50"/> 
                    </div>
                    <div class="col-md-12 mt-3 mb-5">
                        <h4 class="categoryLabel d-inline mr-2">Select a Category: </h4>
                            <select v-model="category" class="mt-2 selector">
                                <option disabled value="">Select option</option>
                                <option value="Books To Read">Books To Read</option>
                                <option value="Self Improvement">Self Improvement</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Home Repair">Home Repair</option>
                            </select>
                        <button @click="addTodo()" class="btn btn-primary addButton mt-2 ml-2">Add Task</button>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="mb-3 mt-5">Task List</h2>

        <div class="container filterSection mt-3 mb-3">
            <div class="row">
                <div class="col-md-6 mt-1">
                    <h4 class="d-inline">Category Filter: </h4>
                    <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Grocery
                        </button>
                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <router-link to="/todoapp" class="dropdown-item">All Categories</router-link>
                            <router-link to="/bookstoread" class="dropdown-item">Books To Read</router-link>
                            <router-link to="/selfimprovement" class="dropdown-item">Self Improvement</router-link>
                            <router-link to="/grocery" class="dropdown-item">Grocery</router-link>
                            <router-link to="/homerepair" class="dropdown-item">Home Repair</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mt-1">
                    <h4 class="d-inline">Completed: </h4>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <button :class="{ active: filter == 'all'}" class="btn btn-outline-primary" @click ="filter = 'all', grabTodos()">All</button>
                        <button :class="{ active: filter == 'active'}" class="btn btn-outline-primary" @click ="filter = 'active', grabTodosActive()">Active</button>
                        <button :class="{ active: filter == 'done'}" class="btn btn-outline-primary" @click ="filter = 'done', grabTodosDone()">Done</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
                <h5 v-for="item in tasksCollection" :key="item.key" class="taskContainer">
                    <div class="container">
                        <div class="row text-center">
                            <div class="col-md-3">
                                <p class="d-inline texts" :class="{completed:item.completed}"><strong> {{item.name}}</strong></p>
                            </div>
                            <div class="col-md-3 mb-2">
                                <small class="d-inline texts" :class="{completed:item.completed}">Category: {{item.category}}</small>
                            </div>
                            <div class="col-md-3 mb-2">
                                <button @click="checkCompleted(item.name)" class="btn btn-outline-dark btn-sm markButton" :class="{completed:item.completed}">Mark Completed</button>
                            </div>
                            <div class="col-md-3">
                                <i @click="$bvModal.show(item.name)" class="fas fa-edit mr-4" :class="{completed:item.completed}"></i>
                                <i @click="removeTodo(item.name)" class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>
                    <b-modal :id="item.name" hide-footer>
                        <template v-slot:modal-title class="text-center">
                            <div class="container">
                                <img src="../../public/images/logo.png" alt="logo" style="width: 30px;" class="d-inline">
                                <h4 class="d-inline modalTitle ml-3">Editing Task: {{item.name}}</h4>
                            </div>
                        </template>
                        <div class="d-block">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12 mt-4">
                                        <p class="d-inline editLabel"><strong>Change Task to:</strong> </p>
                                    </div>
                                    <div class="col-md-12 mb-4">
                                        <input type="text" v-model="nameEdit" class="editBox" placeholder="Updated to-do item" maxlength = "50">
                                    </div>
                                    <div class="col-md-12">
                                        <p class="editCategoryLabel"><strong>Select a Category:</strong></p>
                                    </div>
                                    <div class="col-md-12 mb-4">
                                        <select v-model="categoryEdit" class="editSelector">
                                            <option disabled value="">Select option</option>
                                            <option value="Books To Read">Books To Read</option>
                                            <option value="Self Improvement">Self Improvement</option>
                                            <option value="Grocery">Grocery</option>
                                            <option value="Home Repair">Home Repair</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <b-button class="mt-3 mb-4" variant="primary" @click="editTodo(item.name), $bvModal.hide(item.name)">Save Changes</b-button>
                        </div>
                    </b-modal>
                </h5>
        </div>

    </div>
</template>

<script>
import TopHeader from "../components/Top-Header"
import {db} from '../main';


export default {
  name: 'Tasks',

  data () {
    return {
        'category': "",
        'completed': false,
        'name': "",
        'uid': "",
        'nameEdit':"",
        'categoryEdit':'',
        'filter': 'all',
        tasksCollection: [],
        userID: []
        }
    },

    components:{
        'top-header': TopHeader
    },

    mounted() {
        this.grabTodos()
        console.log("user id: " + this.$firebase.auth().currentUser.uid);
     },
    methods: {
        grabTodos(){
        const database = this.$firebase.firestore();
        database
        .collection('tasks')
        .where('uid', '==', this.$firebase.auth().currentUser.uid)
        .where('category', '==', 'Grocery')
        // .where('category', '==', 'Home Repair')
        .get()
        .then(snap => {
            const tasksCollection = [];
            snap.forEach(doc => {
            tasksCollection.push(doc.data());
            });
            this.tasksCollection = tasksCollection;
        });
        },
        grabTodosActive(){
        const database = this.$firebase.firestore();
        database
        .collection('tasks')
        .where('uid', '==', this.$firebase.auth().currentUser.uid)
        .where('completed', '==', false)
        .where('category', '==', 'Grocery')
        .get()
        .then(snap => {
            const tasksCollection = [];
            snap.forEach(doc => {
            tasksCollection.push(doc.data());
            });
            this.tasksCollection = tasksCollection;
        });
        },
        grabTodosDone(){
        const database = this.$firebase.firestore();
        database
        .collection('tasks')
        .where('uid', '==', this.$firebase.auth().currentUser.uid)
        .where('completed', '==', true)
        .where('category', '==', 'Grocery')
        .get()
        .then(snap => {
            const tasksCollection = [];
            snap.forEach(doc => {
            tasksCollection.push(doc.data());
            });
            this.tasksCollection = tasksCollection;
        });
        },
        addTodo() {
            db.collection("tasks").add({
                'category': this.category,
                'completed': false,
                'name': this.name,
                'uid': this.$firebase.auth().currentUser.uid
            })
            .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.name=''
            this.grabTodos();
            this.$router.push('/todoapp')
        },
        removeTodo(doc){
            console.log(doc)
            db.collection('tasks')
            .where('name', '==', doc).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete().then(this.grabTodos)
                })
            })
        },
        editTodo(doc){
            console.log(doc)
            db.collection('tasks')
            .where('name', '==', doc).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        'name': this.nameEdit,
                        'category': this.categoryEdit,
                    }).then(this.grabTodos)
                })
            })
        },
        checkCompleted(doc){
            console.log(doc)
            db.collection('tasks')
            .where('name', '==', doc).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        completed: true
                    }).then(this.grabTodos)
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

html{
    background-image: url("../../public/images/nice_snow.png");
    background-repeat: repeat;
}

input{
    padding-left: 7px;
}
.todoAppContainer{
    width: 100%;
    background-image: url("../../public/images/nice_snow.png");
    background-repeat: repeat;
    min-height: 100vh;
    font-family: 'Merriweather', serif;
}

label{
    font-size: 16px;
    position: relative;
    left: 8px;
    top: 2px;
    font-weight: bold;
}

.categoryLabel{
    position: relative;
    top: 20px;
}

.addTodoLabel{
    position: relative;
    top: 25px;
}


.addButton{
    width: 90px;
    height: 32px;
    position: relative;
    top: 15px;
    font-size: 12px;
}

.completed:focus,.completed:active {
   outline: none !important;
   box-shadow: none !important;
   background-color: transparent !important;
}

.addBox{
    height: 36px;
    width: 45%;
    border: black solid 1px;
    position: relative;
    bottom: 3px;
}
.completed{
    text-decoration: line-through;
    color: gray;
    border: gray;
}
.modalTitle{
    position: relative;
    top:3px;
}
.completed:hover{
    background-color: transparent;
    color: gray !important;
    cursor:default;
    text-decoration: line-through;
}

.texts{
    position: relative;
    top: 8px;
}

i{
    color: #007bff;
    position: relative;
    top:9px;
}

.active{
    background-color: #007bff;
    font-weight: bold;
}

.active:focus,.active:active {
outline: none !important;
box-shadow: none !important;
}

.selector{
    position: relative;
    top:20px;
    height: 32px;
    border: rgb(57, 57, 57) solid 1px;
    background-color: white;
}

i:hover{
    cursor: pointer;
    color: #0151a5;
}

.taskContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid lightgray;
    padding-top: 14px;
    padding-bottom: 14px;
}

.editSelector{
    width: 100%;
    height: 40px;
    border: rgb(57, 57, 57) solid 1px;
    background-color: white;
    border-radius: 0px;
}

.editBox{
    width: 100%;
    height: 40px;
    border: rgb(57, 57, 57) solid 1px;
    background-color: white;
}

.editCategoryLabel{
    position: relative;
    top:16px;
}

h3{
    font-family: 'Oswald', sans-serif;
}

h4{
    font-family: 'Oswald', sans-serif;
}

h2{
    font-family: 'Oswald', sans-serif;
}

.btn-group{
    position: relative;
    bottom: 4px;
}

.markButton{
    position: relative;
    top: 7px;
}
</style>