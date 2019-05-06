<template>
  <div id="app">
    <transition name="fade" mode="out-in">
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
  html, body, #app {
    height: 100%;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  .drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

  .drawer-cont {
    height: calc(100% - 108px);
    overflow: auto;
    padding-bottom: 108px;
  }

  .ant-drawer-body {
    padding-bottom: 60px !important;
  }

  /*数字输入框按钮*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield
  }

  .ant-btn-circle, .ant-btn-circle-outline {
    width: auto !important;
    height: 32px !important;
    padding: 0 15px !important;
    border-radius: 32px !important;
  }
</style>
