<template>
  <div>
    <forumTable :forum-name="'智来云'"></forumTable>
  </div>
</template>

<script>
  import forumTable from '../../components/forumTable'

  export default {
    name: "zhiLaiYun",
    components: {forumTable}
  }
</script>

<style scoped>

</style>
