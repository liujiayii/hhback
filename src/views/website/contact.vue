<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" disabled>添加</Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{row}" slot="action">
        <Button type="primary" size="small" @click="show(row)">修改</Button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
    <Drawer
            title="编辑"
            v-model="drawerShow"
            @on-close="closeDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Form :model="formData" ref="formData" :rules="ruleValidate">
        <FormItem label="地址" prop="address">
          <Input v-model="formData.address" size="large"/>
        </FormItem>
        <FormItem label="邮箱" prop="enterprise_email">
          <Input v-model="formData.enterprise_email" size="large"/>
        </FormItem>
        <FormItem label="联系方式" prop="phone">
          <Input v-model="formData.phone" size="large"/>
        </FormItem>
        <FormItem label="备案" prop="record">
          <Input v-model="formData.record" size="large"/>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="submit('formData')">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from "../../plugins/utils";

  export default {
    name: "Stock",
    data() {
      return {
        drawerShow: false,
        styles: {
          height: "calc(100% - 55px)",
          overflow: "auto",
          paddingBottom: "53px",
          position: "static"
        },
        formData: {},
        ruleValidate,
        columns: [
          {
            title: "地址",
            key: "address"
          },
          {
            title: "邮箱",
            key: "enterprise_email"
          },
          {
            title: "联系方式",
            key: "phone"
          },
          {
            title: "备案",
            key: "record"
          },
          {
            title: "操作",
            slot: "action",
            width: 150,
            align: "center"
          }
        ],
        tableData: {
          data: [],
          count: 0
        },
        currPage: 1
      };
    },
    methods: {
      closeDrawer() {
        this.formData = {};
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formData._index;
            delete this.formData._rowKey;
            this.$ajax({
              method: "post",
              url: 'updateContactUs',
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.drawerShow = false;
                  this.pageChange(this.currPage);
                } else {
                  this.$Notice.error({
                    title: res.data.msg
                  });
                }
              })
              .catch(res => {
                this.$Notice.error({
                  title: res.data.msg
                });
              });
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      show(row) {
        this.formData = row;
        this.drawerShow = true;
      },
      pageChange(page) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: "selectAllContactUsListPage",
          data: {page, limit: 10}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.tableData = res.data;
            } else {
              this.$Notice.error({
                title: res.data.msg
              });
            }
          })
          .catch(res => {
            this.$Notice.error({
              title: res.data.msg
            });
          });
      }
    },
    mounted() {
      this.pageChange(1);
    }
  };
</script>

<style scoped>

</style>
