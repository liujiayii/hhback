<template>
  <div>
    <forumTable :forum-name="'喔家房产'" />
  </div>
</template>

<script>
  import forumTable from './components/forumTable'

  export default {
    name: "WoJia",
    components: {forumTable}
  }
</script>

<style scoped>

</style>
