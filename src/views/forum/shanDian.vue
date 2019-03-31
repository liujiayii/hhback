<template>
  <div>
    <forumTable :forum-name="'闪电传媒'" />
  </div>
</template>

<script>
  import forumTable from '../../components/forumTable'

  export default {
    name: "ShanDian",
    components: {forumTable}
  }
</script>

<style scoped>

</style>
