<template>
  <div>
    <Divider orientation="left">一级分类</Divider>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow=true">添加</Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">修改</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
    <Divider orientation="left">二级分类</Divider>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShowSec=true">添加</Button>
    </div>
    <Table border :columns="columnsSec" :data="tableDataSec.data">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editSec(row)">修改</Button>
        <Button type="error" size="small" @click="removeSec(row)">删除</Button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableDataSec.count" @on-change="pageChangeSec" size="small" show-elevator show-total/>
    </div>
    <Drawer title="编辑" v-model="drawerShow" width="720" :mask-closable="false" :styles="styles">
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="一级分类名称">
              <Input v-model="formData.name" size="large"/>
            </FormItem>
          </Col>
        </Row>
        <Upload action="http://192.168.1.110:8080/upload" :on-success="handleUpload">
          <Button icon="ios-cloud-upload-outline">上传图标</Button>
        </Upload>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
        <Button type="primary" @click="submit">保存</Button>
      </div>
    </Drawer>
    <Drawer title="编辑" v-model="drawerShowSec" width="720" :mask-closable="false" :styles="styles">
      <Form :model="formDataSec">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="一级分类名称">
              <Select v-model="formDataSec.classificationId" size="large">
                <Option v-for="(item) in tableData.data" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="二级分类名称">
              <Input v-model="formDataSec.name" size="large"/>
            </FormItem>
          </Col>
        </Row>
        <Upload action="http://192.168.1.110:8080/upload" :on-success="handleUploadSec">
          <Button icon="ios-cloud-upload-outline">上传图标</Button>
        </Upload>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="drawerShowSec = false">取消</Button>
        <Button type="primary" @click="submitSec">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  export default {
    name: "sort",
    data() {
      return {
        drawerShow: false,
        drawerShowSec: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {},
        formDataSec: {},
        columns: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '商品分类名称',
            key: 'name'
          },
          {
            title: '商品分类图片',
            key: 'image'
          },
          {
            title: '创建时间',
            key: 'create_time'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        columnsSec: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '商品一级分类名称',
            key: 'classificationName'
          },
          {
            title: '商品分类名称',
            key: 'name'
          },
          {
            title: '商品分类图片',
            key: 'ioc'
          },
          {
            title: '创建时间',
            key: 'create_time'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        tableData: {
          data: [],
          count: 0
        },
        tableDataSec: {
          data: [],
          count: 0
        }
      }
    },
    methods: {
      submit() {
        this.$ajax({
          method: 'post',
          url: this.formData.id ? 'updateClassification' : 'saveClassification',
          data: this.formData
        }).then((res) => {
          if (res.data.code === 1) {
            this.$Notice.success({
              title: res.data.msg,
            })
            this.drawerShow = false
          } else {
            this.$Notice.error({
              title: res.data.msg,
            })
          }
        }).catch((res) => {
          this.$Notice.error({
            title: res.data.msg,
          })
        })
      },
      submitSec() {
        this.$ajax({
          method: 'post',
          url: this.formDataSec.id ? 'updateProductType' : 'saveProductType',
          data: this.formDataSec
        }).then((res) => {
          if (res.data.code === 1) {
            this.$Notice.success({
              title: res.data.msg,
            })
            this.drawerShowSuc = false
          } else {
            this.$Notice.error({
              title: res.data.msg,
            })
          }
        }).catch((res) => {
          this.$Notice.error({
            title: res.data.msg,
          })
        })
      },
      handleUpload(res, file, fileList) {
        this.formData.image = res.data
      },
      handleUploadSec(res, file, fileList) {
        this.formDataSec.ioc = res.data
      },
      edit(row) {
        Object.assign(this.formData, row)
        this.drawerShow = true
      },
      editSec(row) {
        Object.assign(this.formDataSec, row)
        this.drawerShowSec = true
      },
      remove(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否删除</p>',
          onOk: () => {
            this.$ajax({
              method: 'post',
              url: 'deleteClassificationById',
              data: row
            }).then((res) => {
              if (res.data.code === 1) {
                this.$Notice.success({
                  title: res.data.msg,
                })
              } else {
                this.$Notice.error({
                  title: res.data.msg,
                })
              }
            }).catch((res) => {
              this.$Notice.error({
                title: res.data.msg,
              })
            })
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        });
      },
      removeSec(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否删除</p>',
          onOk: () => {
            this.$ajax({
              method: 'post',
              url: 'deleteProductTypeById',
              data: row
            }).then((res) => {
              if (res.data.code === 1) {
                this.$Notice.success({
                  title: res.data.msg,
                })
              } else {
                this.$Notice.error({
                  title: res.data.msg,
                })
              }
            }).catch((res) => {
              this.$Notice.error({
                title: res.data.msg,
              })
            })
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        })
      },
      pageChangeSec(page) {
        this.$ajax({
          method: 'post',
          url: 'selectAllProductTypeList',
          data: {page, limit: 10}
        }).then((res) => {
          if (res.data.code === 1) {
            this.tableDataSec = res.data
          } else {
            this.$Notice.error({
              title: res.data.msg,
            })
          }
        }).catch((res) => {
          this.$Notice.error({
            title: res.data.msg,
          })
        })
      },
      pageChange(page) {
        this.$ajax({
          method: 'post',
          url: 'listAllClassification',
          data: {page, limit: 10}
        }).then((res) => {
          if (res.data.code === 1) {
            this.tableData = res.data
          } else {
            this.$Notice.error({
              title: res.data.msg,
            })
          }
        }).catch((res) => {
          this.$Notice.error({
            title: res.data.msg,
          })
        })
      }
    },
    mounted() {
      this.pageChange(1)
      this.pageChangeSec(1)
    }
  }
</script>

<style scoped>
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

  .page-box {
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
</style>
