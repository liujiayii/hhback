<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow=true">添加</Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{row}" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">修改</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
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
        <FormItem label="标题" prop="title">
          <Input v-model="formData.name" size="large"/>
        </FormItem>
        <FormItem label="地址" prop="content">
          <Input v-model="formData.address" size="large"/>
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
    name: "friends",
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
            title: "编号",
            key: "id"
          },
          {
            title: "名称",
            key: "name"
          },
          {
            title: "地址",
            key: "address"
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
            delete this.formData.create_time
            this.$ajax({
              method: "post",
              url: this.formData.id ? 'updateCoopera' : "insertSome",
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.drawerShow = false;
                  this.formData = {}
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
      remove(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "delOne",
              data: {id: row.id}
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(1);
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
          },
          onCancel: () => {
            this.$Message.info("Clicked cancel");
          }
        });
      },
      pageChange(page) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: "selectAllcooperation",
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
