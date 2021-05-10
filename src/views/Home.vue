<template>
  <div class="home">
    <h1 class="main">Find Your College</h1>
   <form @submit.prevent="find" class="form">
     <input type="text" class="form-control box" v-model="name" placeholder="Enter Country" required>
        <button type="submit" class="btn-primary but ">Go</button>
   </form>
  </div>
</template>

<script>
import db from '../components/firebaseinit'
export default {
  name: 'Home',
  data(){
    return{
      name:null,
      cont_id: null
    }
  },
  methods:{
    find(){
        db.collection('Country').where("name", "==", this.name.toLowerCase()).get().
        then(querry =>{
          querry.forEach(doc =>{
              this.cont_id = doc.data().cont_id
              this.$router.push({name:'colleges', params:{cont_id: this.cont_id }})
          })

        }).catch(err => console.log(err))
        
       


    }
  }
}
</script>

<style scoped>
.box{
  width: 60%;
  height:100%;
  margin:auto ;
  display: inline-block;
  font-size: 1.5rem;
  border-right: none ;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.form{
    text-align: center;
    margin-top: 100px;
}
.but{
  
  height: 100% ;
  width: 100px;
  border-left: none;
  padding: 6px;
  font-size: 1.5rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  
}
.main{
  font-weight: 900;
  color: #3d84b8;
  text-align: center;
  margin-top: 100px;
  }
</style>
