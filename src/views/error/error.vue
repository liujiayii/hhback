<template>
  <div class="main">
    <div class="img">
      <img src="../../assets/images/404.png" height="400" width="700"/>
    </div>
    <p class="msg">Error，页面出错啦！！请点击返回首页或者刷新页面~</p>
    <div class="btn-box">
      <Button type="primary" shape="circle" size="large" ghost to="/home">返回首页</Button>
      <Button type="success" shape="circle" size="large" ghost to="/home">刷新试试</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "error"
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .msg {
    font-size: 36px;
    margin: 50px auto;
  }

  .btn-box {
    display: flex;
    justify-content: space-around;
    width: 500px;
  }
</style>
