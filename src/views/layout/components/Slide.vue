<template>
  <div class="menu">
    <div class="logo" :style="{marginLeft:collapsed?'26px':'16px'}"></div>
    <a-menu
      mode="inline"
      :defaultSelectedKeys="['/home']"
      :style="{ borderRight: 0 }"
      :open-keys="openKeys"
      @openChange="onOpenChange"
      @click="()=>$emit('changeVisible', false)"
    >
      <template v-for="(item) in Menu">
        <a-sub-menu v-if="item.path!=='/'" :key="item.path">
          <span slot="title"><a-icon :type="item.Ico"/><span>{{ $t(`routerName.${item.name}`) }}</span>
          </span>
          <a-menu-item v-for="(item_c) in item.children" :key="item_c.path">
            <router-link :to="item_c.path">{{ $t(`routerName.${item_c.name}`)}}</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.children[0].path">
          <router-link :to="item.children[0].path">
            <a-icon :type="item.Ico"/>
            <span>{{ $t(`routerName.${item.children[0].name}`) }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: "Slide",
    props: ['collapsed'],
    data() {
      return {
        openKeys: [],
        Menu: this.$store.state.menu,
      }
    },
    mounted() {
      this.openKeys.push("/" + this.$route.path.split("/")[1]);
      console.log(this.$store.state.menu)
    },
    methods: {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(
          key => this.openKeys.indexOf(key) === -1
        );
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      },
    }
  }
</script>

<style lang="less" scoped>
  .logo {
    height: 32px;
    background: url("../../../assets/images/logo.png") no-repeat;
    background-size: cover;
    margin: 16px;
    transition: all 0.5s;
  }
</style>
