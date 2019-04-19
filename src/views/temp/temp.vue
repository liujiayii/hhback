<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" active-name="1" class="top-nav" @on-select="menuSelect">
          <div class="layout-logo">
            <img src="../../assets/images/logo.png" height="47" width="150">
          </div>
          <Submenu name="1">
            <template slot="title">
              {{time}}{{userName}}
            </template>
            <MenuItem name="1-1">
              退出
            </MenuItem>
          </Submenu>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu :active-name="$route.name" :open-names="[$route.meta.title]" width="auto" accordion>
            <template v-for="(item,index) in menu">
              <Submenu v-if="item.children.length>1" :name="item.name" :key="index+99">
                <template slot="title">
                  <Icon :type="item.Ico"/>
                  {{ item.name }}
                </template>
                <MenuItem
                        v-for="(item_c,index_c) in item.children"
                        :name="item_c.name"
                        :to="item.path+'/'+item_c.path"
                        :key="index_c"
                >
                  {{ item_c.name }}
                </MenuItem>
              </Submenu>
              <MenuItem v-else
                        v-for="(item_c,index_c) in item.children"
                        :name="item_c.name"
                        :to="item_c.path"
                        :key="index_c+index"
              >
                <Icon :type="item.Ico"/>
                {{ item_c.name }}
              </MenuItem>
            </template>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem to="/home">
              首页
            </BreadcrumbItem>
            <template v-if="$route.name !== '首页'">
              <BreadcrumbItem>{{ $route.meta.title }}</BreadcrumbItem>
              <BreadcrumbItem>{{ $route.name }}</BreadcrumbItem>
            </template>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#f5f7f9'}">
            <transition
                    name="main"
                    mode="out-in"
            >
              <router-view/>
            </transition>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>

  export default {
    name: 'Temp',
    data() {
      return {
        menu: [],
        userName: '',
        time: ''
      }
    },
    methods: {
      menuSelect(menu) {
        if (menu) {
          window.sessionStorage.removeItem('userName')
          window.sessionStorage.removeItem('routerPath')
          window.sessionStorage.removeItem('SkyLarkBack')
          this.$router.push({path: '/login'})
        }
      },
      getMenu() {
        this.menu = JSON.parse(window.sessionStorage.getItem("SkyLarkBack"))
        this.userName = window.sessionStorage.getItem("userName")
      },
      getTimes() {
        let now = new Date(), hour = now.getHours()
        if (hour < 6) {
          this.time = "凌晨好！"
        } else if (hour < 9) {
          this.time = "早上好！"
        } else if (hour < 12) {
          this.time = "上午好！"
        } else if (hour < 14) {
          this.time = "中午好！"
        } else if (hour < 17) {
          this.time = "下午好！"
        } else if (hour < 19) {
          this.time = "傍晚好！"
        } else if (hour < 22) {
          this.time = "晚上好！"
        } else {
          this.time = "夜里好！"
        }
      }
    },
    mounted() {
      this.getMenu()
      this.getTimes()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ivu-layout-header {
    background: #007bbb;
  }

  .ivu-menu-light {
    background: none;
  }

  .ivu-layout-sider {
    background: #007bbb url("../../assets/images/menuBg.png") no-repeat bottom;
  }

  .ivu-menu-horizontal.ivu-menu-light:after {
    background: none;
  }

  .ivu-layout-sider a {
    color: #fff;
  }

  .layout {
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .top-nav {
    display: flex;
    justify-content: space-between;
  }

  .layout-logo {
    margin-top: 6px;
  }

</style>
