<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
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
</style>
