<template>
  <div class="layout">
    <BackTop></BackTop>
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" class="top-nav" @on-select="menuSelect">
          <div class="layout-logo"/>
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
          <Menu :active-name="$route.name" theme="light" width="auto" :open-names="[$route.meta.name]" accordion>
            <MenuItem name="首页" to="/home">
              <Icon type="md-home"/>
              首页
            </MenuItem>
            <Submenu name="forum">
              <template slot="title">
                <Icon type="md-paw"/>
                云阙论坛
              </template>
              <MenuItem name="讴业普惠" to="/forum/ouYe">
                讴业普惠
              </MenuItem>
              <MenuItem name="智莱云" to="/forum/zhiLaiYun">
                智莱云
              </MenuItem>
              <MenuItem name="喔家房产" to="/forum/woJia">
                喔家房产
              </MenuItem>
              <MenuItem name="喔驰汽车" to="/forum/woChi">
                喔驰汽车
              </MenuItem>
              <MenuItem name="玉琼斋餐饮" to="/forum/yuQiong">
                玉琼斋餐饮
              </MenuItem>
              <MenuItem name="闪电传媒" to="/forum/shanDian">
                闪电传媒
              </MenuItem>
            </Submenu>
            <Submenu name="mall">
              <template slot="title">
                <Icon type="md-basket"/>
                商城
              </template>
              <MenuItem name="商品列表">
                商品列表
              </MenuItem>
              <MenuItem name="订单处理">
                订单处理
              </MenuItem>
              <MenuItem name="客户档案">
                客户档案
              </MenuItem>
            </Submenu>
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
    name: 'Index',
    data() {
      return {}
    },
    methods: {
      menuSelect(menu) {
        if (menu == '1-1') {
          this.$router.push({path: '/'})
        }
      }
    },
    components: {},
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
    align-items: center;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: url("/mock/home/logo.png");
    background-size: cover;
    border-radius: 3px;
  }

</style>
