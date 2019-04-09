<template>
  <div id="app">
    <transition
            name="fade"
            mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #app {
    height: 100%;
    width: 100%;
  }

  .ivu-layout, .layout {
    height: 100%;
  }



  .ivu-menu-submenu-title {
    color: #fff !important;
  }

  .main-enter, .main-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .main-enter-active {
    transition: all 0.2s;
  }

  .main-leave-active {
    position: absolute;
    transition: all 0.3s;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  /*抽屉底部*/
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

  /*分页盒子*/
  .page-box {
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }

  /*数字输入框按钮*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield
  }
</style>
