<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" class="top-nav" @on-select="menuSelect">
          <div class="layout-logo"><img src="../../assets/images/logo.png" height="47" width="150"/></div>
          <Submenu name="1">
            <template slot="title">
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
            </template>
            <MenuItem name="1-1">退出</MenuItem>
          </Submenu>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="$route.name" theme="light" width="auto" :open-names="[$route.meta.title]" accordion>
            <template v-for="(item,index) in menu">
              <template v-if="item.name!==''">
                <Submenu :name="item.name" :key="index+99">
                  <template slot="title">
                    <Icon :type="item.Ico"/>
                    {{item.name}}
                  </template>
                  <MenuItem v-for="(item_c,index_c) in item.children" :name="item_c.name"
                            :to="item.path+'/'+item_c.path" :key="index_c">
                    {{item_c.name}}
                  </MenuItem>
                </Submenu>
              </template>
              <template v-else>
                <MenuItem v-for="(item_c,index_c) in item.children" :name="item_c.name" :to="item_c.path"
                          :key="index_c+index">
                  <Icon :type="item_c.Ico"/>
                  {{item_c.name}}
                </MenuItem>
              </template>
            </template>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <template v-if="!$route.meta.bread">
              <BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
              <BreadcrumbItem>{{$route.name}}</BreadcrumbItem>
            </template>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <transition name="main" mode="out-in">
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
    name: 'layout',
    data() {
      return {
        menu: []
      }
    },
    methods: {
      menuSelect(menu) {
        if (menu) {
          window.sessionStorage.removeItem('userName')
          this.$router.push({path: '/login'})
        }
      },
      getMenu() {
        this.menu = JSON.parse(window.sessionStorage.getItem("SkyLarkBack"))
      }
    },
    mounted() {
      this.getMenu()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 20px;
  }

  .top-nav {
    display: flex;
    justify-content: space-between;
  }

  .layout-logo {
    margin-top: 6px;
  }

</style>
