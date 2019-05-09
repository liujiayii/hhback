<template>
  <div>
    <forumTable :forum-name="'智来云'" />
  </div>
</template>

<script>
  import forumTable from './components/forumTable'

  export default {
    name: "ZhiLaiYun",
    components: {forumTable}
  }
</script>
