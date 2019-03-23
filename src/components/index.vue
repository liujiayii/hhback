<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                  
                </Menu>
            </Header>
            <Layout class="flex">
                <Sider hide-trigger :style="{background: '#fff'}" class="navbox">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1"><router-link tag="p"  :to="{path:'aa1'}" >选项1</router-link></MenuItem>
                            <MenuItem name="1-2"><router-link tag="p"   :to="{path:'aa2'}" >选项2</router-link></MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}" class="cont-box">
                    
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>


<script>
//import leftnav from"../page/leftnav"
export default {
  name: 'index',
  data () {
    return {
     
    }
  },
  components:{    
    //leftnav
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbox{position: fixed;top: 60px;bottom: 0;left: 0;max-width: 220px!important;width: 220px!important;}
.cont-box{width: calc(100% - 200px);position: fixed;top:60px;bottom: 0;right: 0;}
</style>