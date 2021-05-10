<template>
  <div>
    <form class="mainform">
      <h1>New Record</h1>
      <label class="form-label">Country name</label>
      <input
        class="form-control"
        type="text"
        placeholder="Country"
        required
        v-model="count_name"
      />
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
      <label class="form-label">Course name</label>
      <input
        class="form-control"
        type="text"
        placeholder="Course"
        required
        v-model="course_name"
      />
      <label class="form-label">Course Information</label>
      <textarea class="form-control" rows="3" v-model="c_info"></textarea>
      <label class="form-label">Course Site link</label>
      <input
        class="form-control"
        type="text"
        placeholder="Site Link"
        required
        v-model="course_site"
      />
      <div class="alert alert-success d-flex align-items-center" role="alert">
        <h4><i class="far fa-thumbs-up"></i></h4>
        <div>
          Data added successfully
        </div>
      </div>
      <button
        v-on:click="add"
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >
        Submit
      </button>
    </form>
        <router-link type="button" class="btn btn-success disabled" to="/adminDashboard">Add New Record</router-link>
        <router-link type="button" class="btn btn-success " to="/addcollege">Add New College</router-link>
        <router-link type="button" class="btn btn-success " to="/addcourse" >Add New course</router-link>
  </div>
</template>

<script>
import db from "../components/firebaseinit.js";
export default {
  name: "adminDashboard",
  data() {
    return {
      count_name: "",
      coll_name: "",
      coll_info: "",
      coll_img: "",
      course_name: "",
      c_info: "",
      course_site: "",
      cont_id: parseInt(""),
      coll_id: parseInt(""),
    };
  },
  created() {
    db.collection("Country")
      .orderBy("cont_id")
      .get()
      .then((querry) => {
        querry.forEach((doc) => {
          this.cont_id = doc.data().cont_id;
        });
      });
    db.collection("college")
      .orderBy("coll_id")
      .get()
      .then((querry) => {
        querry.forEach((doc) => {
          this.coll_id = doc.data().coll_id;
        });
      });
  },
  methods: {
    add: function (e) {
      //country entry
      db.collection("Country")
        .add({
          name: this.count_name,
          cont_id: this.cont_id + 1,
        })
        .catch((err) => console.log(err));

      // college entry
      db.collection("college")
        .add({
          name: this.coll_name,
          cont_id: this.cont_id + 1,
          coll_id: this.coll_id + 1,
          info: this.coll_info,
          pic: this.coll_img,
        })
        .catch((err) => console.log(err));

      // course entry
      db.collection("course")
        .add({
          name_course: this.course_name,
          coll_id: this.coll_id + 1,
          info: this.c_info,
          link: this.course_site,
        })
        .then(() => {
            document.querySelector(".alert.alert-success").style.opacity = 1 ;
            document.querySelector(".alert.alert-success").style.position = "relative";
          setTimeout(function() {
                location.reload();
            }, 1200);
        })
        .catch((err) => console.log(err));

      e.preventDefault();
    },
  },
};
</script>

<style scoped>
.mainform {
  margin: auto;
  width: 600px;
}
.mainform .form-control {
  margin-bottom: 20px;
}
.alert.alert-success{
    opacity: 0;
    background-color: #9ede73;
    position: absolute;
}
.btn.btn-success{
    padding: 15px;
    margin: 40px 0 30px 250px;
}
.disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>