<template>
    <div>
        <form class="mainform">
        <h1>New Course</h1>
        <label class="form-label">College name</label>
        <input
            class="form-control"
            type="text"
            placeholder="Collage"
            required
            v-model="coll_name"
        />
        <button type="button" class="btn btn-primary" @click="checkcoll">Enter</button>

        <label class="form-label">Course name</label>
        <input
            class="form-control"
            type="text"
            placeholder="Course"
            required
            v-model="course_name"
        />
        <label class="form-label">Course Information</label>
        <textarea class="form-control" rows="3" v-model="course_info"></textarea>
        <label class="form-label">Site link</label>
        <input
            class="form-control"
            type="text"
            placeholder="Site Link"
            required
            v-model="course_link"
        />
        <div class="alert alert-success d-flex align-items-center" role="alert">
            <h4><i class="far fa-thumbs-up"></i></h4>
            <div>
            Data added successfully
            </div>
        </div>
        <button
            v-on:click="addCourse"
            class="w-100 btn btn-lg btn-primary"
            type="submit"
        >
            Submit
        </button>
        </form>
        <router-link type="button" class="btn btn-success" to="/adminDashboard">Add New Record</router-link>
        <router-link type="button" class="btn btn-success" to="/addcollege">Add New College</router-link>
        <router-link type="button" class="btn btn-success disabled" to="/addcourse" >Add New course</router-link>
  </div>
</template>

<script>
import db from '../components/firebaseinit.js'
export default {
    name:'addcourse',
    data(){
        return{
            coll_name:"",
            course_name:"",
            course_info:"",
            course_link:"",
            coll_id: parseInt("")

        }
    },
    methods:{
            checkcoll(){
                db.collection("college")
                .where('name', '==', this.coll_name)
                .get()
                .then((querry) => {
                    querry.forEach((doc) => {
                    this.coll_id = doc.data().coll_id;
                    });
                });
            },

            addCourse(){
                db.collection("course")
                .add({
                name_course: this.course_name,
                coll_id: this.coll_id,
                info: this.course_info,
                link: this.course_link,
                })
                .then(() => {
                    document.querySelector(".alert.alert-success").style.opacity = 1 ;
                    document.querySelector(".alert.alert-success").style.position = "relative";
                setTimeout(function() {
                        location.reload();
                    }, 1500);
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