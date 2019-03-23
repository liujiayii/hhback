<template>
	<div>{{getCount}}	1-2</div>

</template>

<script>
import {getCount, mapState} from 'vuex'
export default {
  name: 'H12',
  data () {
    return {
   
    }
  },
  computed:{
    getCount(){
      return this.$store.state.count;
		}
	},
	
	created(){
        // http://www.wwtliu.com已经在main.js中定义了全局网址了/sxtstu/blueberrypai/login.php   ===  http://www.wwtliu.com/sxtstu/blueberrypai/login.php
          this.$axios.post("/sxtstu/blueberrypai/login.php", {
            user_id:"iwen@qq.com",
            password:"iwen123",
            verification_code:"crfvw"
          })
            .then(res=>{
              console.log(res.data);
            })
            .catch(error=>{
              console.log(error)
            })
      }
}
</script>

<style scoped>
</style>