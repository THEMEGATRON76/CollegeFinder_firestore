<template>
  <div>
    <form class="mainform">
      <h1>New College</h1>
      <label class="form-label">Country name</label>
      <input
        class="form-control"
        type="text"
        placeholder="Country"
        required
        v-model="count_name"
      />
      <button type="button" class="btn btn-primary" @click="checkcount">Enter</button>

      <label class="form-label">College name</label>
      <input
        class="form-control"
        type="text"
        placeholder="College"
        required
        v-model="coll_name"
      />
      <label class="form-label">College Information</label>
      <textarea class="form-control" rows="3" v-model="coll_info"></textarea>
      <label class="form-label">College Image link</label>
      <input
        class="form-control"
        type="text"
        placeholder="Default input"
        required
        v-model="coll_img"
      />
      <div class="alert alert-success d-flex align-items-center" role="alert">
        <h4><i class="far fa-thumbs-up"></i></h4>
        <div>
          Data added successfully
        </div>
      </div>
      <button
        v-on:click="addCol"
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >
        Submit
      </button>
    </form>
        <router-link type="button" class="btn btn-success" to="/adminDashboard">Add New Record</router-link>
        <router-link type="button" class="btn btn-success disabled" to="/addcollege">Add New College</router-link>
        <router-link type="button" class="btn btn-success " to="/addcourse" >Add New course</router-link>

  </div>
</template>

<script>
import db from '../components/firebaseinit.js'

export default {
    name:'addcollege',
    data(){
        return{
            count_name:"",
            coll_name: "",
            coll_info: "",
            coll_img: "",
            cont_id: parseInt(""),
            coll_id: parseInt(""),
        }
    },
    created(){
        
    db.collection("college")
      .orderBy("coll_id")
      .get()
      .then((querry) => {
        querry.forEach((doc) => {
          this.coll_id = doc.data().coll_id;
        });
      });
    },
    methods:{
        checkcount(){

        db.collection("Country")
        .where('name', '==', this.count_name)
        .get()
        .then((querry) => {
        querry.forEach((doc) => {
          this.cont_id = doc.data().cont_id;
        });
      }).catch(err => alert(err.message)) 
        },
        addCol(){
            // college entry
        db.collection("college")
        .add({
          name: this.coll_name,
          cont_id: this.cont_id,
          coll_id: this.coll_id + 1,
          info: this.coll_info,
          pic: this.coll_img,
        })
        .then(() =>{
            document.querySelector(".alert.alert-success").style.opacity = 1 ;
            document.querySelector(".alert.alert-success").style.position = "relative";
          setTimeout(function() {
                location.reload();
            }, 1200);
        })
        .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.mainform {
  margin: auto;
  width: 600px;
}
.alert.alert-success{
    opacity: 0;
    background-color: #9ede73;
    position: absolute;
}
.mainform .form-control {
  margin-bottom: 20px;
}
.btn.btn-success{
    padding: 15px;
    margin: 40px 0 30px 250px;
}
.btn.btn-primary{
    display: block;
    width: 35%;
    margin-bottom: 20px;
}
.disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>