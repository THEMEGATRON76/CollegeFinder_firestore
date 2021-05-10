<template>
  <div class="colleges">
      <div class="container">
        <h1>The Colleges in {{country_name.charAt(0).toUpperCase() + country_name.slice(1)}}</h1>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col adjustment" v-for="college in colleges" :key="college.id">
            <div class="card shadow-sm">
              <img class="colimg" v-bind:src="college.pic" /> 

              <div class="card-body">
                <h4>{{college.collage_name}}</h4>
                <p class="card-text">{{college.info}}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group butt">
                    <router-link class="btn btn-outline-primary btn-lg" v-bind:to="{name:'courses', params:{coll_id: college.coll_id}}"> View cources </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <router-link class="btn btn-secondary" to="/">Back</router-link>
     </div>
  </div>     
</template>

<script>
import db from '../components/firebaseinit.js'
export default {
  name:'colleges',
  data(){
    return{
      colleges:[],
      country_name: ""
    }
  },
  created(){
      db.collection('college').where('cont_id', '==', parseInt(this.$route.params.cont_id)).get().
      then(querry => {
        querry.forEach(doc =>{
          const data = {
             "id": doc.id,
             "coll_id": doc.data().coll_id,
             "cont_id": doc.data().cont_id,
             "collage_name": doc.data().name,
             "pic": doc.data().pic,
             "info":doc.data().info
          }
          this.colleges.push(data)
        })
      }).catch(err => console.log(err))

      db.collection('Country').where('cont_id', '==', parseInt(this.$route.params.cont_id)).get().
      then(querry =>{
        querry.forEach(doc =>{
          this.country_name = doc.data().name
        })
      }).catch(err => console.log(err))

  }
}
</script>
<style scoped>
.colimg{
    width: 90%;
    height: 200px;
    margin:  20px auto;
}
.row.row-cols-1{
  margin-top: 50px;
}
.colleges{
  padding-bottom: 50px;
}
.btn.btn-secondary{
  width: 200px;
  padding: 15px;
  margin-left: 13px;
   margin-top: 40px;
}
.card.shadow-sm{
  height: 600px;
  position: relative;
}
.butt{
  position: absolute;
  bottom: 15px;
}
</style>
