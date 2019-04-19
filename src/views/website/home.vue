<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow = true">添加</Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{row}" slot="action">
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
        <FormItem label="标题" prop="address">
          <Input v-model="formData.dynamic_title" size="large"/>
        </FormItem>
        <FormItem label="图片">
          <Upload action="" :before-upload="handleUpload" :format="['jpg','jpeg','png']"
                  :on-format-error="handleFormatError"
          >
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
          <p v-if="file!=null">{{file.name}}</p>
        </FormItem>
        <FormItem label="内容" prop="enterprise_email">
          <Input v-model="formData.dynamic_content" size="large" type="textarea"/>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="submit('formData')">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from "../../config/utils";

  export default {
    name: "home",
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
            title: "标题",
            key: "dynamic_title"
          }, {
            title: "图片",
            key: "dynamic_image",
            render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.dynamic_image
                  },
                  style: {
                    width: "50px",
                    height: "50px"
                  }
                })
              ])
            }
          },
          {
            title: "内容",
            key: "dynamic_content"
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
        currPage: 1,
        file: null
      };
    },
    methods: {
      handleUpload(file) {
        this.file = file
        return false;
      },
      handleFormatError() {
        this.$Notice.error({
          title: '文件格式错误'
        });
      },
      closeDrawer() {
        this.formData = {};
        this.file = null
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let newForm = new FormData()
            newForm.append('pic', this.file)
            newForm.append('dynamic_title', this.formData.dynamic_title)
            newForm.append('dynamic_content', this.formData.dynamic_content)
            this.$ajaxImg({
              method: "post",
              url: 't_dynamic/insertDynamic',
              data: newForm
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
      remove(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "t_dynamic/deleteFirst",
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
          url: "t_dynamic/SelectAllDy",
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
