<template>
  <div>
H11
{{ getCount }}
<button @click="add">++</button>
  </div>
</template>

<script>
import {getCount, mapState} from 'vuex'
export default {
  name: 'H11',
  data () {
    return {
   name:"haha"
    }
  },
	computed:{
    getCount(){
    	return this.$store.getters.getstate;
      //return this.$store.state.count;
		}
	},
	methods:{
		add(){
			this.$store.commit("increment");
		}
	}
}
</script>
<style scoped>
</style>