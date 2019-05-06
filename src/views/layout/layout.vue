<template>
  <a-layout class="main">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="menu">
      <div class="logo" :style="{marginLeft:collapsed?'26px':'16px'}"></div>
      <a-menu
        mode="inline"
        :default-selected-keys="[$route.path]"
        :style="{ borderRight: 0 }"
        :open-keys="openKeys"
        @openChange="onOpenChange"
        @click="menuClick"
      >
        <template v-for="(item) in Menu">
          <a-sub-menu v-if="item.path!=='/'" :key="item.path">
            <span slot="title">
              <a-icon :type="item.Ico" theme="filled" :spin="item.Ico==='setting'"/>
              <span>{{ item.name}}</span>
            </span>
            <a-menu-item v-for="(item_c) in item.children" :key="item_c.path">{{ item_c.name }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.children[0].path">
            <a-icon :type="item.Ico"/>
            <span>{{ item.children[0].name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{overflow:'hidden',width:'100%'}">
      <a-layout-header class="header" :style="{width: collapsed?'calc(100% - 80px)':'calc(100% - 200px)'}">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <a-dropdown :style="{cursor:'pointer',marginRight:'20px'}">
          <span class="ant-dropdown-link">
            {{getTimes()}}{{userName}}
            <a-icon type="down"/>
          </span>
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a href="https://github.com/jiyiyou/hhback" target="_blank">版本信息</a>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="3" @click="loginOut">退出登录</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-breadcrumb :style="{ margin: '80px 20px 20px' }">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <template v-if="$route.path.split('/').length>2">
          <a-breadcrumb-item>{{ $route.meta.title }}</a-breadcrumb-item>
          <a-breadcrumb-item>{{ $route.name }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
      <a-layout-content :style="{ padding: '0 20px',overflow: 'scroll'}">
        <div :style="{ minHeight: '100%',padding: '24px', background: '#fff'}">
          <transition name="main" mode="out-in">
            <router-view/>
          </transition>
        </div>
        <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  export default {
    name: "Layout",
    data() {
      return {
        collapsed: false,
        openKeys: [],
        Menu: this.$store.state.menu,
        userName: window.sessionStorage.getItem("userName")
      };
    },
    mounted() {
      this.openKeys.push("/" + this.$route.path.split("/")[1]);
      this.getTimes();
    },
    methods: {
      menuClick(item) {
        this.$router.push({path: item.key});
      },
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(
          key => this.openKeys.indexOf(key) === -1
        );
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      },
      loginOut() {
        this.$confirm({
          title: "提示",
          content: "真的要注销登录吗 ?",
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            sessionStorage.clear();
            this.$store.state.menu = [];
            this.$router.push({path: "/login"});
          },
          onCancel: () => {
          }
        });
      },
      getTimes() {
        const time = new Date();
        const hour = time.getHours();
        return hour < 9 ? "早上好," : hour <= 11 ? "上午好," : hour <= 13 ? "中午好," : hour < 20 ? "下午好," : "晚上好,";
      }
    }
  };
</script>

<style lang="less" scoped>
  .main {
    position: fixed;
    width: 100%;
    height: 100%;

    .menu {
      overflow: scroll;
      height: 100vh;
      background: #fff;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

      .logo {
        height: 32px;
        background: url("../../assets/images/logo.png") no-repeat;
        background-size: cover;
        margin: 16px;
        transition: all 0.5s;
      }
    }

    .header {
      background: #fff;
      padding: 0;
      z-index: 2;
      position: absolute;
      top: 0;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      display: flex;
      justify-content: space-between;
      transition: all 0.2s;

      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }

  .ant-layout-sider::-webkit-scrollbar,
  .ant-layout-content::-webkit-scrollbar {
    display: none;
  }

  .main-enter,
  .main-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }

  .main-enter-active {
    transition: all 0.3s;
  }

  .main-leave-active {
    transform: translateX(-30px);
    transition: all 0.1s;
  }
</style>
