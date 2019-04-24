<template>
  <div>
    <div class="top">
      <div></div>
      <a-button type="primary" icon="plus" @click="drawerShow=true" shape="circle">添加</a-button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{row}" slot="action">
        <a-button type="primary" size="small" style="margin-right: 5px" @click="show(row)">修改</a-button>
        <a-button type="danger" size="small" @click="remove(row)">删除</a-button>
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
          <Input v-model="formData.title" size="large"/>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input v-model="formData.content" type="textarea" size="large"/>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <a-button type="primary" @click="submit('formData')">保存</a-button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from "../../config/utils";

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
            title: "编号",
            key: "id"
          },
          {
            title: "标题",
            key: "title"
          },
          {
            title: "内容",
            key: "content"
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
              url: this.formData.id ? 'updateOurAdvantages' : "saveOurAdvantages",
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
      remove(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "deleteOurAdvantagesById",
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
        this.data6.splice(row, 1);
      },
      pageChange(page) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: "selectAllOurAdvantagesPage",
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
