<template>
   <nav class="navbar navbar-expand-lg   ps-2">
    
        <router-link to="/" class="navbar-brand head"> Test Project</router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav ms-auto">
                <li v-if="!islogedin" class="nav-item">
                     <router-link to="/admin" class="  btn btn-outline-primary btn-lg">Admin</router-link>
                </li>
                <li v-if="islogedin">
                     <p class="nav-link active">Loged in as {{currentuser}}</p>
                </li>
                <li v-if="islogedin">
                     <router-link to="/admindashboard" class="nav-link active">Dashboard</router-link>
                </li>
                <li v-if="islogedin" class="nav-item">
                    <button type="button" v-on:click="logout" class="btn btn-dark btn-lg">Log out</button>
                </li>
            </ul>
        </div>
     </nav>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'navbar',
    data(){
         return{
          islogedin: false,
          currentuser:""
         }
    } ,
    created(){
         if(firebase.auth().currentUser){
              this.islogedin = true;
              this.currentuser = firebase.auth().currentUser.email;
         }
    },
    methods:{
          logout(){
               firebase.auth().signOut().then(() =>{
                    this.$router.go({path: this.$router.path});
               })
          }
    }
}
</script>
<style scoped>
 .navbar.navbar-expand-lg{
      background-color: #161d6f;
      padding-right: 30px;
 } 
 .navbar-brand.head{
      color: white;
      font-size: 1.5rem;
 } 
 .btn.btn-outline-primary{
     width: 150px;
 }
 .nav-link.active{
      padding-top: 10px;
      color: white;
      font-size: 1.2rem;
      margin-right: 20px;
 }
 
</style>