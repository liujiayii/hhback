<template>
  <div>
    <div class="top">
      <div></div>
      <a-button type="primary" shape="circle" icon="plus" @click="drawerShow=true">更新</a-button>
    </div>
    <Table border :columns="columns" :data="tableData.data"></Table>
    <Drawer
            title="编辑"
            v-model="drawerShow"
            @on-close="closeDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Form :model="formData" ref="formData" :rules="ruleValidate">
        <FormItem label="版本" prop="app_type">
          <Select v-model="formData.app_type" size="large">
            <Option :value="0">安卓</Option>
            <Option :value="1">IOS</Option>
          </Select>
        </FormItem>
        <FormItem label="版本号" prop="app_version">
          <Input v-model="formData.app_version" size="large"/>
        </FormItem>
        <FormItem label="名称" prop="app_name">
          <Input v-model="formData.app_name" size="large"/>
        </FormItem>
        <FormItem label="上传文件" v-show="formData.app_type!=1">
          <Upload action="" :before-upload="handleUpload" :show-upload-list="false">
            <a-button icon="upload">
              上传文件
            </a-button>
          </Upload>
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
    name: "version",
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
            title: "安装包类型",
            key: "app_type"
          },
          {
            title: "名称",
            key: "app_name"
          },
          {
            title: "内部版本号",
            key: "app_cood"
          },
          {
            title: "路径",
            key: "app_url"
          },
          {
            title: "版本",
            key: "app_version"
          }
        ],
        tableData: {
          data: [],
          count: 0
        },
        file: []
      };
    },
    methods: {
      handleUpload(file) {
        this.file = file;
        return false;
      },
      closeDrawer() {
        this.formData = {};
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let newForm = new FormData()
            if(this.formData.app_version == 0){
              newForm.append('pic', this.file)
            }
            newForm.append('app_version',this.formData.app_version)
            newForm.append('app_name',this.formData.app_name)
            newForm.append('app_type',this.formData.app_type)
            newForm.append('app_cood',1)
            this.$ajaxImg({
              method: "post",
              url: "t_app/inserttapp",
              data: newForm
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.drawerShow = false;
                  this.formData = {}
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
      getTable() {
        this.$ajax({
          method: "post",
          url: "t_app/insertlist",
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
      this.getTable();
    }
  }
</script>

<style scoped>

</style>
