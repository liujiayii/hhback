<template>
  <div>
    <forumTable :forum-name="'闪电传媒'"></forumTable>
  </div>
</template>

<script>
  import forumTable from '../../components/forumTable'

  export default {
    name: "shanDian",
    components: {forumTable}
  }
</script>

<style scoped>

</style>
