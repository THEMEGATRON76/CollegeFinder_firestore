<template>
    <main class="form-signin">
  <form > 
    <h1 class="h3 mb-3 fw-normal">Admin Sign In</h1>
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
      <label for="floatingPassword">Password</label>
    </div>
     <div class="alert alert-danger d-flex align-items-center" role="alert">
    <h4><i class="fas fa-exclamation-circle"></i></h4> 
  <div>
     {{err}}
  </div>
</div>
    <button v-on:click="login" class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    
  </form>
</main>
</template>

<script>
import firebase from 'firebase';
export default {
    name:'admin',
    data(){
        return{
            username:"",
            err:"",
            email:"",
            password:""
        }


    },
    methods:{
        login: function(e){
            
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() =>{
                this.$router.go({path: this.$router.path});
            },
            err =>{
              
                
                this.err = err.message 
                document.querySelector(".alert.alert-danger").style.opacity = 1 ;
                document.querySelector(".alert.alert-danger").style.position = "relative";
            }
          );
          e.preventDefault();
        }
    }    
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin:  100px auto;
  position: relative;
}


.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-top: 20px;
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 30px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.alert.alert-danger{
    opacity: 0;
    height: 50px;
    background-color: #ff9292;
    position: absolute;
}


</style>