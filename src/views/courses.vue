<template>
  <div>
    <h1 class="heading">{{coll_name}} Courses</h1>
     <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col" v-for="cource in cources" :key="cource.id">
            <div class="card mb-4 rounded-3 shadow-sm border-primary">
              <div class="card-header py-3 text-white bg-primary border-primary">
                <h4 class="my-0 fw-normal">{{cource.name_course}}</h4>
              </div>
              <div class="card-body gg">
                <div class="aling">
                  <p>{{cource.info}}</p>
                </div>
                <a v-bind:href="cource.link" class="btn btn-lg btn-primary">Check Out</a>
              </div>
            </div>
          </div>  
        </div>
        <router-link class="btn btn-secondary" :to="{name:'colleges', params:{cont_id: idd}}">Back</router-link>
  </div>
</template>

<script>
import db from '../components/firebaseinit.js'
export default {
  name: 'courses',
  data (){
    return{
      cources:[],
      coll_name:"",
      idd: null
    }
  },
  created(){
    db.collection('course').where('coll_id','==', parseInt(this.$route.params.coll_id)).get().
    then(querry =>{
      querry.forEach(doc =>{
       const data={ 
         "id": doc.id,
         "name_course": doc.data().name_course,
         "info": doc.data().info,
         "link": doc.data().link
       }
       this.cources.push(data)
      })
    }).catch(err => console.log(err))

    db.collection('college').where('coll_id', '==', parseInt(this.$route.params.coll_id)).get().
    then(querry =>{
        querry.forEach(doc =>{
          this.coll_name = doc.data().name
          this.idd = doc.data().cont_id
        })
       
    })
  },
 
}

</script>

<style scoped>
.aling{
  text-align: left;
}
.card.mb-4{
  position: relative;
  height: 470px;
}
.gg{
  position: relative;
}
.btn-lg.btn{
  position:absolute;
  width:90%;
  left: 20px;
  bottom: 10px;
  
}
.row.row-cols-1{
  position: relative;
  padding: 50px;
}
.btn.btn-secondary{
  width: 200px;
  padding: 15px;
  margin-left: 50px;
   margin-top: -20px;
   margin-bottom: 10px;
}
.heading{
  margin-left:50px ;
  margin-bottom: 20px;
}
</style>
