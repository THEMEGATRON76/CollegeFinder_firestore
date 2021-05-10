<template>
  <navbar class="space" />
  <router-view/>
</template>

<script>
import navbar from './components/navbar.vue'
export default {
    name:"app",
    components:{
      navbar
    }
}
</script>

<style>
p{
  font-family: 'Nanum Myeongjo', serif;
  font-size: 1.1rem;
  
}
h1{
  font-size: 4rem;
  font-family:'Noto Sans KR', sans-serif;
}
h2,h3,h4,h5,h6{
   font-family:'Noto Sans KR', sans-serif;
}
body{
  background-color: #c7ffd8;
}
.space{
  margin-bottom:60px ;
}
</style>
