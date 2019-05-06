<template>
  <div>
    <a-tabs @change="callback">
      <a-tab-pane tab="首页轮播图" key="1">
        <sort_1/>
      </a-tab-pane>
      <a-tab-pane tab="商品专区" key="2" forceRender>
        <sort_2/>
      </a-tab-pane>
      <a-tab-pane tab="一级分类" key="3">
        <sort_3/>
      </a-tab-pane>
      <a-tab-pane tab="二级分类" key="4">
        <sort_4/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

  import sort_1 from './components/sort_1'
  import sort_2 from './components/sort_2'
  import sort_3 from './components/sort_3'
  import sort_4 from './components/sort_4'

  export default {
    name: "Sort",
    components: {sort_1, sort_2, sort_3, sort_4},
    methods: {
      callback(key) {
      },
    },
    mounted() {

    }
  };
</script>

<style scoped>

</style>
