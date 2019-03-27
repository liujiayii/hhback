<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow=true">添加</Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{ row, index }" slot="action">
        <iSwitch
                @on-change="stateUpdate(row)"
                :value="row.state"
                size="large"
                style="margin-right: 5px"
                :true-value="1"
                :false-value="2"
        >
          <span slot="open">上架</span>
          <span slot="close">下架</span>
        </iSwitch>
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
    <Drawer title="编辑" v-model="drawerShow" width="720" :mask-closable="false" :styles="styles">
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="商品分类(PC)">
              <Select
                      v-model="formData.producttypeid"
                      placeholder="please select an owner"
                      size="large"
              >
                <Option value="1">一级分类</Option>
                <Option value="2">二级分类</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="品牌">
              <Input v-model="formData.brand" placeholder="please enter user name" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品名称">
              <Input
                      v-model="formData.productName"
                      placeholder="please enter user name"
                      size="large"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品价格">
              <Input v-model="formData.price" placeholder="please enter user name" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="规格">
              <Input
                      v-model="formData.specifications"
                      placeholder="please enter user name"
                      size="large"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="库存">
              <Input v-model="formData.number" placeholder="please enter user name" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品描述">
              <Input v-model="formData.name" placeholder="please enter user name" size="large"/>
            </FormItem>
          </Col>
        </Row>
        <Upload action="http://192.168.1.110:8080/upload" :on-success="handleUpload">
          <Button icon="ios-cloud-upload-outline">上传商品图</Button>
        </Upload>
        <div style="display: flex">
          <div v-for="(item,index) in uploadFile" :key="index" style="height: 100px;width: 100px">
            <img :src="item.data" alt="" style="width: 100%;height: 100%">
          </div>
        </div>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
        <Button type="primary" @click="submit">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  export default {
    name: "ware",
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
        columns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "商品名称",
            key: "productName"
          },
          {
            title: "商品类型",
            key: "producttypename"
          },
          {
            title: "价格(元)",
            key: "price"
          },
          {
            title: "操作",
            slot: "action",
            width: 200,
            align: "center"
          }
        ],
        tableData: {
          data: [],
          count: 0
        },
        uploadFile: []
      };
    },
    methods: {
      handleUpload(res, file, fileList) {
        console.log(res)
        this.uploadFile.push(res)
        console.log(file)
        console.log(fileList)

      },
      show(row) {
        Object(this.formData, row);
        this.drawerShow = true;
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      pageChange(page) {
        this.$ajax({
          method: "post",
          url: "listAllProductById",
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
      },
      stateUpdate(row) {
        this.$ajax({
          method: "post",
          url: "updateProductState",
          data: row
        })
          .then(res => {
            if (res.data.code === 1) {
              this.$Notice.success({
                title: res.data.msg
              });
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
      submit() {
        this.$ajax({
          method: "post",
          url: "saveProduct",
          data: this.formData
        })
          .then(res => {
            if (res.data.code === 1) {
              this.$Notice.success({
                title: res.data.msg
              });
              this.drawerShow = false;
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
